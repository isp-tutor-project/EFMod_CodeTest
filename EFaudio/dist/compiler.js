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
const fs = require('fs');
const path = require('path');
const RX_SGMLTAGS = /<[^>\r]*>/g;
const RX_DUPWHITESP = /\s+/g;
const RX_WHITESPACE = /\s/g;
const RX_TEMPLATES = /\{\{[^\}]*\}\}/g;
const RX_TEMPLTRIM = /\s*(\{\{[^\}]*\}\})\s*/g;
const RX_TEMPLTAGS = /\{\{|\}\}/g;
const RX_CUEPOINTS = /[^\.\"]/g;
const RX_DUPPUNCT = /\s+([,\.])+\s/g;
const RX_MODULENAME = /EFMod_\w*/;
const ASSETS_PATH = "EFAudio/EFassets";
const ASCII_a = 97;
const ASCII_A = 65;
const ZERO_SEGID = 0;
const TAG_SPEAKSTART = "<speak>";
const TAG_SPEAKEND = "</speak>";
const voicesPath = "EFAudio/EFscripts/languagevoice.json";
const originalPath = "EFAudio/EFscripts/original.json";
const scriptPath = "EFAudio/EFscripts/script.json";
const assetPath = "EFAudio/EFscripts/assets.json";
let voices;
let input;
let templArray;
let cueArray;
let wordArray;
let segmentArray;
let filesRequested = 0;
let filesProcessed = 0;
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
function trimCuePoints(cueArray, inst) {
    let length = inst.text.length;
    // Ensure cue points aren't past the end of the utterance.
    //
    for (let cue of cueArray) {
        if (cue.index > length)
            cue.index = length;
    }
}
function postProcessScript(inst, segID) {
    wordArray = inst.text.split(RX_WHITESPACE);
    templArray = enumerateItems(RX_TEMPLATES, inst.text);
    for (let item of templArray) {
        item[1] = item[0].replace(RX_TEMPLTAGS, "");
    }
    cueArray = enumerateItems(RX_CUEPOINTS, inst.cueSet);
    trimCuePoints(cueArray, inst);
    segmentScript(inst, segID++);
}
function segmentScript(inst, segID) {
    let start = 0;
    let end = inst.text.length;
    if (templArray.length) {
        start = 0;
        // enumerate the templates to segment the text for TTS synthesis and playback
        // 
        for (let templ of templArray) {
            // First add the text before the template if there is any
            // 
            end = templ.index;
            if (start < end)
                addSegment(inst, null, start, end, segID++);
            // then add the template itself
            start = templ.index;
            end = templ.endIndex;
            addSegment(inst, templ, start, end, segID++);
            start = end;
        }
    }
    // Finally add the text after the last template if there is any
    // 
    end = inst.text.length;
    if (start < end)
        addSegment(inst, null, start, end, segID++);
}
function addSegment(inst, templ, start, end, segID) {
    if (templ) {
        try {
            let templVals = inst.templates[templ[1]].values;
            inst.segments.push(composeSegment(templ[1], templVals, start, end, segID));
        }
        catch (error) {
            console.log("Possible missing Template: " + error);
        }
    }
    else {
        let segStr = segID.toString();
        let scriptSeg = inst.text.substring(start, end);
        inst.segments.push(composeSegment("__novar", { __novar: scriptSeg }, start, end, segID));
    }
}
function composeSegment(templVar, templVals, start, end, segID) {
    let seg = { templateVar: templVar };
    let subSegID = ZERO_SEGID;
    for (let templValName in templVals) {
        let text = templVals[templValName];
        let cuePoints = composeCuePoints(text, start, end);
        let segStr = segID.toString() + ((templValName !== "__novar") ? charEncodeSegID(ASCII_a, subSegID++) : "");
        console.log(`Adding Segment: ${text} - id:${segStr}`);
        seg[templValName] = {
            id: segStr,
            SSML: text,
            cues: cuePoints
        };
    }
    return seg;
}
function composeCuePoints(templVar, start, end) {
    let cues = [];
    let length = end - start;
    for (let cuePnt of cueArray) {
        if (cuePnt.index >= start && cuePnt.index <= end) {
            let segCue = {};
            segCue[cuePnt[0]] = ((cuePnt.index - start) / length);
            cues.push(segCue);
        }
    }
    return cues;
}
function charEncodeSegID(charBase, subindex) {
    let result = "";
    if (subindex >= 26)
        result = charEncodeSegID(ASCII_A, subindex / 26);
    result += String.fromCharCode(charBase + subindex % 26);
    return result;
}
function compileScript() {
    let segID = ZERO_SEGID;
    voices = JSON.parse(fs.readFileSync(voicesPath));
    input = JSON.parse(fs.readFileSync(scriptPath));
    rmdirSync(ASSETS_PATH, false);
    let modName = RX_MODULENAME.exec(__dirname);
    // console.log(process.env);
    // console.log(__filename);
    // console.log(__dirname);
    for (let scene in input) {
        for (let track in input[scene].tracks) {
            preProcessScript(input[scene].tracks[track].en);
        }
    }
    updateProcessedScripts(scriptPath);
    for (let scene in input) {
        for (let track in input[scene].tracks) {
            postProcessScript(input[scene].tracks[track].en, segID);
        }
    }
    updateProcessedScripts(assetPath);
    synthesizeSegments(input, voices);
}
function updateProcessedScripts(path) {
    let scriptUpdate = JSON.stringify(input, null, '\t');
    fs.writeFileSync(path, scriptUpdate, 'utf8');
}
function clone(obj) {
    var copy;
    // Handle the 3 simple types, and null or undefined
    if (null == obj || "object" != typeof obj)
        return obj;
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
            if (obj.hasOwnProperty(attr))
                copy[attr] = clone(obj[attr]);
        }
        return copy;
    }
    throw new Error("Unable to copy obj! Its type isn't supported.");
}
function synthesizeSegments(input, languages) {
    let outPath = ASSETS_PATH;
    for (let scene in input) {
        for (let track in input[scene].tracks) {
            for (let lang in input[scene].tracks[track]) {
                for (let seg of input[scene].tracks[track][lang].segments) {
                    for (let segVal in seg) {
                        if (seg[segVal].id) {
                            for (let language in languages) {
                                for (let voice in languages[language]) {
                                    let _request = clone(languages[language][voice].request);
                                    // \\ISP_TUTOR\\<moduleName>\\EFaudio\\EFassets\\<Lang>\\<sceneName>\\<<trackName>_s<segmentid>_v<voiceId>>.mp3
                                    let filePath = outPath + "\\" + lang + "\\" + scene;
                                    let fileName = "\\" + track + "_s" + seg[segVal].id + "_v" + voice + ".mp3";
                                    validatePath(filePath, null);
                                    _request.input.ssml = TAG_SPEAKSTART + seg[segVal].SSML + TAG_SPEAKEND;
                                    filesRequested++;
                                    synthesizeVOICE(_request, filePath + fileName);
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
function synthesizeVOICE(request, outputFile) {
    const textToSpeech = require('@google-cloud/text-to-speech');
    const fs = require('fs');
    const client = new textToSpeech.TextToSpeechClient();
    console.log(`Audio content  : ${request.input.ssml}`);
    console.log(`Written to file: ${outputFile}`);
    client.synthesizeSpeech(request, (err, response) => {
        if (err) {
            console.error('ERROR:', err);
            return;
        }
        filesProcessed++;
        fs.writeFile(outputFile, response.audioContent, 'binary', (err) => {
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
function validatePath(path, folder) {
    let pathArray = path.split("\\");
    try {
        let stat = fs.statSync(path);
        if (stat.isDirectory) {
            if (folder)
                fs.mkdirSync(path + "\\" + folder);
        }
    }
    catch (err) {
        let last = pathArray.pop();
        validatePath(pathArray.join("\\"), last);
        if (folder)
            fs.mkdirSync(path + "\\" + folder);
    }
}
function rmdirSync(dir, delRoot) {
    var list = fs.readdirSync(dir);
    for (var i = 0; i < list.length; i++) {
        var filename = path.join(dir, list[i]);
        var stat = fs.statSync(filename);
        if (filename == "." || filename == "..") {
            // pass these files
        }
        else if (stat.isDirectory()) {
            // rmdir recursively
            rmdirSync(filename, true);
        }
        else {
            // rm fiilename
            fs.unlinkSync(filename);
        }
    }
    if (delRoot)
        fs.rmdirSync(dir);
}
;
compileScript();
//# sourceMappingURL=compiler.js.map