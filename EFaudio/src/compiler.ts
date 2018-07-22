//*********************************************************************************
//
//  Copyright(c) 2008,2018 Kevin Willows. All Rights Reserved
//
//	License: Proprietary
//
//  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
//  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
//  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
//  THE SOFTWARE.
//
//*********************************************************************************

'use strict';

import {convert} from "./converter";

import { findArray, 
         segment, 
         scriptInstance, 
         templVar, 
         templValue, 
         cuePoint, 
         requestType, 
         segmentVal} from "./IAudioTypes";

const fs   = require('fs');
const path = require('path');

const TEMPLATEVAR:string = "templateVar"; 
const LIBRARY_SRC:string = "$$EFL";

const RX_SGMLTAGS   = /<[^>\r]*>/g;
const RX_DUPWHITESP = /\s+/g;
const RX_WHITESPACE = /\s/g;
const RX_TEMPLATES  = /\{\{[^\}]*\}\}/g;
const RX_TEMPLTRIM  = /\s*(\{\{[^\}]*\}\})\s*/g;
const RX_TEMPLTAGS  = /\{\{|\}\}/g;
const RX_CUEPOINTS  = /[^\.\"]/g;
const RX_DUPPUNCT   = /\s+([,\.])+\s/g;
const RX_MODULENAME = /EFMod_\w*/;

const ASSETS_PATH   = "EFAudio/EFassets";
const TYPE_MP3      = ".mp3";
const TYPE_WAV      = ".wav";

const ASCII_a       = 97;
const ASCII_A       = 65;
const ZERO_SEGID    = 0;

const TAG_SPEAKSTART = "<speak>";
const TAG_SPEAKEND   = "</speak>";

const voicesPath:string   = "EFAudio/EFscripts/languagevoice.json";
const originalPath:string = "EFAudio/EFscripts/original.json";
const scriptPath:string   = "EFAudio/EFscripts/script.json";
const assetPath:string    = "EFAudio/EFscripts/script_assets.json";
const libraryPath:string  = "EFdata/data_assets.json";

let lib_Loaded:boolean = false;
let library:any;

let voices:any; 
let input:any;

let templArray:Array<findArray>;
let cueArray:Array<findArray>;
let wordArray:Array<string>;
let segmentArray:Array<segment>;

let filesRequested:number = 0;
let filesProcessed:number = 0;


function compileScript() {

    let segID = ZERO_SEGID;
    let promises;

    voices = JSON.parse(fs.readFileSync(voicesPath)); 
    input  = JSON.parse(fs.readFileSync(scriptPath));
    
    rmdirSync(ASSETS_PATH, false);

    let modName = RX_MODULENAME.exec(__dirname);

    // console.log(process.env);
    // console.log(__filename);
    // console.log(__dirname);

    for(let scene in input) {

        for(let track in input[scene].tracks) {

            preProcessScript(input[scene].tracks[track].en);
        }        
    }    

    for(let scene in input) {

        for(let track in input[scene].tracks) {

            postProcessScript(input[scene].tracks[track].en, segID);
        }        
    }    

    promises = synthesizeSegments(input, voices);

    Promise.all(promises).then(() => {
        updateProcessedScripts(assetPath);
        console.log("Assets Processing Complete!");

        // Strip the segmentation from the script - just to make it easier to read
        // We do this here so that the trim arrary is initialized
        // 
        for(let scene in input) {

            for(let track in input[scene].tracks) {
    
                input[scene].tracks[track].en.segments  = [];
            }        
        }    
        updateProcessedScripts(scriptPath);
        console.log("Script Processing Complete!");    
    });
}


function enumerateItems(regex:RegExp, text:string) : Array<findArray> {

    let templArray:Array<findArray> = [];
    let templ:findArray;

    while((templ = regex.exec(text)) !== null) {

        templArray.push(templ);
        templ.endIndex = regex.lastIndex;
        // console.log(`Found ${templ[0]} at: ${templ.index} Next starts at ${regex.lastIndex}.`);
    }

    return templArray;
}


function load_Library() {

    if(!lib_Loaded) {
        library    = JSON.parse(fs.readFileSync(libraryPath));
        lib_Loaded = true;

    }
}


function resolveSource(inst:scriptInstance) : string {

    let result:string;

    try {
        if(inst.html.startsWith(LIBRARY_SRC)) {

            let srcPath:Array<string> = inst.html.split(".");

            load_Library();

            let libval = library._LIBRARY[srcPath[1]][srcPath[2]];

            result         = libval.html;
            inst.templates = libval.templates || {};
        }
        else {
            result = inst.html;
        }
    }
    catch(err) {

        console.error("Library Load Failed: " + err);
    }

    return result;
}


function preProcessScript(inst:scriptInstance) {

    let html:string = resolveSource(inst);

    // Remove all HTML/SSML tags
    inst.text = html.replace(RX_SGMLTAGS,"");

    // Remove duplicate whitespace
    inst.text = inst.text.replace(RX_DUPWHITESP," ");

    // Remove duplicate punctuation
    inst.text = inst.text.replace(RX_DUPPUNCT,"$1 ");
    
    // Trim spaces around Templates.
    // This eliminates confusion if the string begins or ends or 
    // is exclusively a template.   e.g. "  {{templatevar}}   "
    //
    inst.text = inst.text.replace(RX_TEMPLTRIM,"$1");

    // trim the template values themselves - don't want 
    // extraneous whitespace around template values.
    // 
    for(let item in inst.templates) {
        trimTemplateValues(inst.templates[item]);

        inst.templates[item].volume = inst.templates[item].volume || 1.0;
        inst.templates[item].notes  = inst.templates[item].notes  || "";
    }

    inst.cueSet    = inst.cueSet    || "";
    inst.segments  = [];

    inst.timedSet  = inst.timedSet  || [];
    inst.templates = inst.templates || {};
    inst.trim      = inst.trim      || [];
    inst.volume    = inst.volume    || 1.0;

}

function trimTemplateValues(templ:templVar) {

    for(let item in templ.values) {
        templ.values[item] = templ.values[item].trim();
    }
}

function trimCuePoints(cueArray:Array<findArray>, inst:scriptInstance) {

    let length = inst.text.length;

    // Ensure cue points aren't past the end of the utterance.
    //
    for(let cue of cueArray) {
        if(cue.index > length)
            cue.index = length;
    }
}


function postProcessScript(inst:scriptInstance, segID:number) {
        
    wordArray  = inst.text.split(RX_WHITESPACE);
    templArray = enumerateItems(RX_TEMPLATES, inst.text);

    for(let item of templArray) {
        item[1] = item[0].replace(RX_TEMPLTAGS,"");
    }

    cueArray = enumerateItems(RX_CUEPOINTS, inst.cueSet);
    trimCuePoints(cueArray, inst);

    segmentScript(inst, segID++);

    // Try to maintain user defined segment trims but 
    // If the trim array is empty or doesn't match the 
    // segment count we reset
    // 
    if(inst.trim.length != inst.segments.length) {

        inst.trim = new Array<number>();

        for(let i1 = 0 ; i1 < inst.segments.length ; i1++) {
            inst.trim.push(0);
        }
    }

    // We do a posthoc insertion of the trim values into the script 
    // segments.
    // 
    else {
        for(let i1 = 0 ; i1 < inst.segments.length ; i1++) {

            let segVal = inst.segments[i1];

            for(let segVar in segVal) {

                if(segVar == TEMPLATEVAR) continue;
                segVal[segVar].trim  = inst.trim[i1];
            }
        }
    }
}


function segmentScript(inst:scriptInstance, segID:number) {

    let start:number = 0;
    let end:number   = inst.text.length;

    if(templArray.length) {
        start    = 0;

        // enumerate the templates to segment the text for TTS synthesis and playback
        // 
        for(let templ of templArray) {

            // First add the text before the template if there is any
            // 
            end = templ.index;            
            if(start < end)
                addSegment(inst, null, start, end, segID++ );

            // then add the template itself
            start = templ.index;
            end   = templ.endIndex;

            addSegment(inst, templ, start, end, segID++ );

            start = end;
        }
    }

    // Finally add the text after the last template if there is any
    // 
    end = inst.text.length;            
    if(start < end)
        addSegment(inst, null, start, end, segID++ );
}


function addSegment(inst:scriptInstance, templ:findArray, start:number, end:number, segID:number ) {

    if(templ) {

        try {
            let templVals:templValue = inst.templates[templ[1]].values;
            let templVol:number      = inst.templates[templ[1]].volume;

            inst.segments.push(composeSegment(templ[1], templVals, start, end, segID, templVol));
        }
        catch(error) {

            console.error("Possible missing Template: " + error);
        }
    }
    else {

        let segStr    = segID.toString();
        let scriptSeg = inst.text.substring(start, end);

        inst.segments.push(composeSegment("__novar",{__novar:scriptSeg}, start, end, segID, 1.0));
    }
}


function composeSegment(templVar:string, templVals:templValue, start:number, end:number,  segID:number, segVol:number) : segment {

    let seg:segment     = {templateVar:templVar};
    let subSegID:number = ZERO_SEGID;

    for(let templValName in templVals) {

        let text = templVals[templValName];

        let cuePoints:Array<cuePoint> = composeCuePoints(text,start,end);

        let segStr:string = segID.toString() + ((templValName !== "__novar")? charEncodeSegID(ASCII_a, subSegID++):"");

        // console.log(`Adding Segment: ${text} - id:${segStr}`);

        seg[templValName] = {
            id:segStr,
            SSML:text,
            cues:cuePoints,
            duration:0,
            trim:0,
            volume:segVol
        }
    }

    return seg;
}


function composeCuePoints(templVar:string, start:number, end:number ) : Array<cuePoint> {

    let cues:Array<cuePoint> = [];
    let length:number = end - start - 1;

    for(let cuePnt of cueArray) {
        if(cuePnt.index >= start && cuePnt.index < end) {

            let segCue:cuePoint = {
                name   : cuePnt[0],
                offset : ((cuePnt.index - start) / (length)),
                relTime : 0
            };

            cues.push(segCue);
        }
    }

    return cues;
}


function charEncodeSegID(charBase:number, subindex:number) : string {

    let result:string = "";

    if(subindex >= 26)
        result = charEncodeSegID(ASCII_A, subindex/26);

    result += String.fromCharCode(charBase + subindex % 26);

    return result;
}


function updateProcessedScripts(path:string) {

    let scriptUpdate:string = JSON.stringify(input, null, '\t');

    fs.writeFileSync(path, scriptUpdate, 'utf8');
}


function clone(obj:any):any {
    var copy:any;

    // Handle the 3 simple types, and null or undefined
    if (null == obj || "object" != typeof obj) return obj;

    // Handle Array
    if (obj instanceof Array) {
        copy = [];
        for (var i = 0, len = obj.length; i < len; i++) {
            copy[i] = clone(obj[i]);
        }
        return copy;
    }

    // Handle Object
    if (obj instanceof Object) {
        copy = {};
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
        }
        return copy;
    }

    throw new Error("Unable to copy obj! Its type isn't supported.");
}


function synthesizeSegments(input:any, languages:any) {

    let outPath  = ASSETS_PATH;
    let promises = [];

    for(let scene in input) {

        for(let track in input[scene].tracks) {

            for(let lang in input[scene].tracks[track]) {

                for(let seg of input[scene].tracks[track][lang].segments) {

                    for(let segVal in seg) {

                        if(seg[segVal].id) {

                            for(let language in languages) {

                                for(let voice in languages[language]) {

                                    let _request:requestType = clone(languages[language][voice].request);

                                    // \\ISP_TUTOR\\<moduleName>\\EFaudio\\EFassets\\<Lang>\\<sceneName>\\<<trackName>_s<segmentid>_v<voiceId>>[.mp3]

                                    let filePath = outPath + "\\"  + lang + "\\" + scene;
                                    let fileName = "\\" + track + "_s" + seg[segVal].id + "_v" + voice;

                                    validatePath(filePath, null);

                                    _request.input.ssml = TAG_SPEAKSTART + seg[segVal].SSML + TAG_SPEAKEND;
                                    
                                    filesRequested++;

                                    promises.push(synthesizeVOICE(_request, filePath+fileName, seg[segVal]));
                                }
                            }
                        }
                    }
                }
            }        
        }        
    }    

    return promises;
}


function synthesizeVOICE(request:requestType, outputFile:string, seg:segmentVal)  {

    const textToSpeech = require('@google-cloud/text-to-speech');
    const fs = require('fs');
  
    const client:any = new textToSpeech.TextToSpeechClient();  
    
    console.log(`Processing Script  : ${request.input.ssml} to file: ${outputFile}`);

    let promise = client.synthesizeSpeech(request).then((response:any) => {
    
        filesProcessed++;

        convert(outputFile+TYPE_MP3, response[0].audioContent, seg);

        // console.log(`Audio content  : ${request.input.ssml}`);
        // console.log(`Audio content written to file: ${outputFile}`);
        console.log(`Files Requested: ${filesRequested} -- Files Processed: ${filesProcessed}`);          

        fs.writeFileSync(outputFile+TYPE_WAV, response[0].audioContent, 'binary', (err:string) => {
          if (err) {
            console.error('ERROR:', err);
            return;
          }
        });

    }).catch((err:any) => {
        console.error('ERROR:', err);
        return;
      });

    return promise;
}
 

function validatePath(path:string, folder:string) {

    let pathArray:Array<string> = path.split("\\");

    try {
        let stat = fs.statSync(path);

        if(stat.isDirectory) {

            if(folder)
                fs.mkdirSync(path + "\\" + folder);
        }
    }
    catch(err) {

        let last = pathArray.pop();
        validatePath(pathArray.join("\\"), last);

        if(folder)
            fs.mkdirSync(path + "\\" + folder);
    }
}


function rmdirSync(dir:string, delRoot:boolean) {

	var list = fs.readdirSync(dir);
	for(var i = 0; i < list.length; i++) {
		var filename = path.join(dir, list[i]);
		var stat = fs.statSync(filename);
		
		if(filename == "." || filename == "..") {
			// pass these files
		} else if(stat.isDirectory()) {
			// rmdir recursively
			rmdirSync(filename, true);
		} else {
			// rm fiilename
			fs.unlinkSync(filename);
		}
    }
    if(delRoot)
	    fs.rmdirSync(dir);
};

compileScript();