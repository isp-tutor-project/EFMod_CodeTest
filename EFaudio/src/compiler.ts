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

const fs   = require('fs');
const path = require('path');

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

const ASCII_a       = 97;
const ASCII_A       = 65;
const ZERO_SEGID    = 0;

const TAG_SPEAKSTART = "<speak>";
const TAG_SPEAKEND   = "</speak>";

const voicesPath:string   = "EFAudio/EFscripts/languagevoice.json";
const originalPath:string = "EFAudio/EFscripts/original.json";
const scriptPath:string   = "EFAudio/EFscripts/script.json";
const assetPath:string    = "EFAudio/EFscripts/assets.json";

let voices:any; 
let input:any;

let templArray:Array<findArray>;
let cueArray:Array<findArray>;
let wordArray:Array<string>;
let segmentArray:Array<segment>;

let filesRequested:number = 0;
let filesProcessed:number = 0;



interface InputType {
    ssml:string;
    text:string;
}

interface VoiceType {
    name:string;
    languageCode:string;
    ssmlGender:string;
}

interface AudioType {
    audioEncoding:string;
}

interface requestType {
    input:InputType;
    voice:VoiceType;
    audioConfig:AudioType;
}

interface template {

    [key: string]: templVar;
}
interface templVar {

    values: templValue;    
}
interface templValue {

    [key: string]: string;    
}



interface segment {

    templateVar: string;

    [key: string]: segmentVal|string;
}
interface segmentVal {

    id:string;
    SSML: string;
    cues: Array<cuePoint>;
}
interface cuePoint {

    [key: string]: number;
}


interface timedEvents {

    [key: string]: string;

    start:string;
    end:string;
}

interface scriptInstance {
    html:string;
    text:string;
    cueSet:string;
    segments:Array<segment>;
    timedSet:Array<timedEvents>;
    templates: any;
}

interface findArray extends Array<string> {
    index:number;
    endIndex?:number;
}



function enumerateItems(regex:RegExp, text:string) : Array<findArray> {

    let templArray:Array<findArray> = [];
    let templ:findArray;

    while((templ = regex.exec(text)) !== null) {

        templArray.push(templ);
        templ.endIndex = regex.lastIndex;
        console.log(`Found ${templ[0]} at: ${templ.index} Next starts at ${regex.lastIndex}.`);
    }

    return templArray;
}


function preProcessScript(inst:scriptInstance) {
              
    // Remove all HTML/SSML tags
    inst.text = inst.html.replace(RX_SGMLTAGS,"");

    // Remove duplicate whitespace
    inst.text = inst.text.replace(RX_DUPWHITESP," ");

    // Remove duplicate punctuation
    inst.text = inst.text.replace(RX_DUPPUNCT,"$1 ");
    
    // Trim spaces around Templates.
    // This eliminates confusion if the string begins or ends or 
    // is exclusively a template.   e.g. "  {{templatevar}}   "
    //
    inst.text = inst.text.replace(RX_TEMPLTRIM,"$1");

    // trim the templates - don't want extraneous whitespace
    // around template values.
    // 
    for(let item in inst.templates) {
        trimTemplateValues(inst.templates[item]);
    }
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

            inst.segments.push(composeSegment(templ[1], templVals, start, end, segID));
        }
        catch(error) {

            console.log("Possible missing Template: " + error);
        }
    }
    else {

        let segStr    = segID.toString();
        let scriptSeg = inst.text.substring(start, end);

        inst.segments.push(composeSegment("__novar",{__novar:scriptSeg}, start, end, segID));
    }
}


function composeSegment(templVar:string, templVals:templValue, start:number, end:number,  segID:number) : segment {

    let seg:segment     = {templateVar:templVar};
    let subSegID:number = ZERO_SEGID;

    for(let templValName in templVals) {

        let text = templVals[templValName];

        let cuePoints:Array<cuePoint> = composeCuePoints(text,start,end);

        let segStr:string = segID.toString() + ((templValName !== "__novar")? charEncodeSegID(ASCII_a, subSegID++):"");

        console.log(`Adding Segment: ${text} - id:${segStr}`);

        seg[templValName] = {
            id:segStr,
            SSML:text,
            cues:cuePoints
        }
    }

    return seg;
}


function composeCuePoints(templVar:string, start:number, end:number ) : Array<cuePoint> {

    let cues:Array<cuePoint> = [];
    let length:number = end - start;

    for(let cuePnt of cueArray) {
        if(cuePnt.index >= start && cuePnt.index <= end) {

            let segCue:cuePoint = {};

            segCue[cuePnt[0]] = ((cuePnt.index - start)/length);

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


function compileScript() {

    let segID = ZERO_SEGID;

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
    updateProcessedScripts(scriptPath);


    for(let scene in input) {

        for(let track in input[scene].tracks) {

            postProcessScript(input[scene].tracks[track].en, segID);
        }        
    }    
    updateProcessedScripts(assetPath);

    synthesizeSegments(input, voices);
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

    let outPath = ASSETS_PATH;

    for(let scene in input) {

        for(let track in input[scene].tracks) {

            for(let lang in input[scene].tracks[track]) {

                for(let seg of input[scene].tracks[track][lang].segments) {

                    for(let segVal in seg) {

                        if(seg[segVal].id) {

                            for(let language in languages) {

                                for(let voice in languages[language]) {

                                    let _request:requestType = clone(languages[language][voice].request);

                                    // \\ISP_TUTOR\\<moduleName>\\EFaudio\\EFassets\\<Lang>\\<sceneName>\\<<trackName>_s<segmentid>_v<voiceId>>.mp3
                                    let filePath = outPath + "\\"  + lang + "\\" + scene;
                                    let fileName = "\\" + track + "_s" + seg[segVal].id + "_v" + voice + ".mp3";

                                    validatePath(filePath, null);

                                    _request.input.ssml = TAG_SPEAKSTART + seg[segVal].SSML + TAG_SPEAKEND;
                                    
                                    filesRequested++;

                                    synthesizeVOICE(_request, filePath+fileName);
                                }
                            }
                        }
                    }
                }
            }        
        }        
    }    
}


function synthesizeVOICE(request:requestType, outputFile:string) {

    const textToSpeech = require('@google-cloud/text-to-speech');
    const fs = require('fs');
  
    const client:any = new textToSpeech.TextToSpeechClient();  
    
    console.log(`Audio content  : ${request.input.ssml}`);
    console.log(`Written to file: ${outputFile}`);

    client.synthesizeSpeech(request, (err:any, response:any) => {
        if (err) {
          console.error('ERROR:', err);
          return;
        }
    
        filesProcessed++;
        fs.writeFile(outputFile, response.audioContent, 'binary', (err:string) => {
          if (err) {
            console.error('ERROR:', err);
            return;
          }
          console.log(`Audio content  : ${request.input.ssml}`);
          console.log(`Audio content written to file: ${outputFile}`);
          console.log(`Files Requested: ${filesRequested} -- Files Processed: ${filesProcessed}`);          
        });
    });              
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