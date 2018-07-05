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

const filesystem = require('fs');

const RX_SGMLTAGS   = /<[^>\r]*>/g;
const RX_DUPWHITESP = /\s+/g;
const RX_WHITESPACE = /\s/g;
const RX_TEMPLATES  = /\{\{[^\}]*\}\}/g;
const RX_TEMPLTRIM  = /\s*(\{\{[^\}]*\}\})\s*/g;
const RX_TEMPLTAGS  = /\{\{|\}\}/g;
const RX_CUEPOINTS  = /[^\.\"]/g;
const RX_DUPPUNCT   = /\s+([,\.])+\s/g;
const ASCII_a       = 97;
const ASCII_A       = 65;
const ZERO_SEGID    = 0;

const TAG_SPEAKSTART = "<speak>";
const TAG_SPEAKEND   = "</speak>";

const voicesPath:string   = "EFscripts/languagevoice.json";
const originalPath:string = "EFscripts/original.json";
const scriptPath:string   = "EFscripts/script.json";
const assetPath:string    = "EFscripts/assets.json";

let voices:any; 
let input:any;

let templArray:Array<findArray>;
let cueArray:Array<findArray>;
let wordArray:Array<string>;
let segmentArray:Array<segment>;



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

            inst.segments.push(composeSegment(templ[1],templVals, start, end, segID));
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

    voices = JSON.parse(filesystem.readFileSync(voicesPath)); 
    input  = JSON.parse(filesystem.readFileSync(scriptPath));
    
    for(let scene in input) {

        for(let script in input[scene]) {

            preProcessScript(input[scene][script].en);
        }        
    }    
    updateProcessedScripts(scriptPath);


    for(let scene in input) {

        for(let script in input[scene]) {

            postProcessScript(input[scene][script].en, segID);
        }        
    }    
     updateProcessedScripts(assetPath);


}


function updateProcessedScripts(path:string) {

    let scriptUpdate:string = JSON.stringify(input, null, '\t');

    filesystem.writeFileSync(path, scriptUpdate, 'utf8');
}


compileScript();