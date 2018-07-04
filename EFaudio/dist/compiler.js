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
const RX_SGMLTAGS = /<[^>\r]*>/g;
const RX_DUPWHITESP = /\s+/g;
const RX_WHITESPACE = /\s/g;
const RX_TEMPLATES = /\{\{[^\}]*\}\}/g;
const RX_TEMPLTRIM = /\s*(\{\{[^\}]*\}\})\s*/g;
const RX_TEMPLTAGS = /\{\{|\}\}/g;
const RX_CUEPOINTS = /[^\.\"]/g;
const RX_DUPPUNCT = /\s+([,\.])+\s/g;
const ASCII_a = 97;
const ASCII_A = 65;
const ZERO_SEGID = 0;
const TAG_SPEAKSTART = "<speak>";
const TAG_SPEAKEND = "</speak>";
const voicesPath = "EFscripts/languagevoice.json";
const scriptPath = "EFscripts/script.json";
const assetPath = "EFscripts/asset.json";
let voices;
let input;
let templArray;
let cueArray;
let wordArray;
let segmentArray;
function enumerateItems(regex, text) {
    let templArray = [];
    let templ;
    while ((templ = regex.exec(text)) !== null) {
        templArray.push(templ);
        templ.endIndex = regex.lastIndex;
        console.log(`Found ${templ[0]} at: ${templ.index} Next starts at ${regex.lastIndex}.`);
    }
    return templArray;
}
function preProcessScript(inst) {
    // Remove all HTML/SSML tags
    inst.text = inst.html.replace(RX_SGMLTAGS, "");
    // Remove duplicate whitespace
    inst.text = inst.text.replace(RX_DUPWHITESP, " ");
    // Remove duplicate punctuation
    inst.text = inst.text.replace(RX_DUPPUNCT, "$1 ");
    // Trim spaces around Templates.
    // This eliminates confusion if the string begins or ends or 
    // is exclusively a template.   e.g. "  {{templatevar}}   "
    //
    inst.text = inst.text.replace(RX_TEMPLTRIM, "$1");
    // trim the templates - don't want extraneous whitespace
    // around template values.
    // 
    for (let item in inst.templates) {
        trimTemplateValues(inst.templates[item]);
    }
}
function trimTemplateValues(templ) {
    for (let item in templ.values) {
        templ.values[item] = templ.values[item].trim();
    }
}
function postProcessScript(inst) {
    wordArray = inst.text.split(RX_WHITESPACE);
    templArray = enumerateItems(RX_TEMPLATES, inst.text);
    for (let item of templArray) {
        item[1] = item[0].replace(RX_TEMPLTAGS, "");
    }
    cueArray = enumerateItems(RX_CUEPOINTS, inst.cueSet);
    segmentScript(inst);
}
function segmentScript(inst) {
    let start = 0;
    let end = inst.text.length;
    let segID = ZERO_SEGID;
    if (templArray.length) {
        start = 0;
        // enumerate the templates to segment the text for TTS synthesis and playback
        // 
        for (let templ of templArray) {
            // First add the text before the template if there is any
            // 
            end = templ.index;
            if (start < end)
                addSegment(inst, start, end, segID++);
            // then add the template itself
            start = templ.index;
            end = templ.endIndex;
            addSegment(inst, start, end, segID++);
            start = end;
        }
    }
    // Finally add the text after the last template if there is any
    // 
    end = inst.text.length;
    if (start < end)
        addSegment(inst, start, end, segID++);
}
function addSegment(inst, start, end, segID) {
    console.log(`Adding Segment: ${inst.text.substring(start, end)} - id:${segID}`);
}
function charEncodeSegID(primeindex, subindex) {
    let result = primeindex >= 0 ? primeindex.toString() : "";
    if (subindex >= 26)
        result = charEncodeSegID(-1, subindex / 26);
    result += String.fromCharCode(97 + primeindex);
    return result;
}
function compileScript() {
    voices = JSON.parse(filesystem.readFileSync(voicesPath));
    input = JSON.parse(filesystem.readFileSync(scriptPath));
    for (let scene in input) {
        for (let script in input[scene]) {
            preProcessScript(input[scene][script].en);
        }
    }
    updateProcessedScripts(scriptPath);
    for (let scene in input) {
        for (let script in input[scene]) {
            postProcessScript(input[scene][script].en);
        }
    }
    // updateProcessedScripts(assetPath);
}
function updateProcessedScripts(path) {
    let scriptUpdate = JSON.stringify(input, null, '\t');
    filesystem.writeFileSync(path, scriptUpdate, 'utf8');
}
compileScript();
//# sourceMappingURL=compiler.js.map