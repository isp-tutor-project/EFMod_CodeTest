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
const json5 = require('json5');
const source = "./DOMDocument.xml";
const chars = "0123456789ABCDEF";
function genGUID() {
    let GUID = "";
    for (let i1 = 0; i1 < 32; i1++) {
        GUID += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return GUID;
}
/**
 * THere are 2 points in the AnimateCC EdForge module DOMdocument that require updating to
 * ensure the projects generated GUID is unique.
 *
 * The  fileGUID="A92278A09E00DEC3430093590DA2ADC5" attribute on the XML document itself and
 * in the Module Components parameter data passed to the Module Component on initialization
 * by Animate Component Boot code
 *
 */
function generateModuleGUID(source) {
    // *****************************************************
    // Update the AnimateCC project XMLDocument
    // 
    var DOMParser = require('xmldom').DOMParser;
    var XMLSerializer = require('xmldom').XMLSerializer;
    let parser = new DOMParser();
    let serializer = new XMLSerializer();
    // Read the DOMDocument file and parse it into XML
    // 
    let _document = fs.readFileSync(source, "utf8");
    var doc = parser.parseFromString(_document, 'text/xml');
    var _fileGUID = genGUID();
    console.info(_fileGUID);
    //  Set the guid on the document itself
    doc.documentElement.setAttribute('fileGUID', _fileGUID);
    // There is only one parametersAsXML node in this document
    // TODO: manage other cases
    // 
    var element = doc.documentElement.getElementsByTagName("parametersAsXML");
    // extract the CData 
    var compXML = element[0].childNodes[0].data;
    // Note this is a special case - there is no containing outer document.
    // i.e. it is a list of <property> elements.
    // 
    let cdata = parser.parseFromString(compXML, 'text/xml');
    // Get the Inspectables from the parsed CData and set the defaultValue
    // Note: this is sensitive to the efModule.js AnimateCC custom component 
    // implementation.
    // 
    let inspectables = cdata.documentElement.getElementsByTagName("Inspectable");
    inspectables[0].setAttribute('defaultValue', _fileGUID);
    element[0].childNodes[0].data = serializer.serializeToString(cdata);
    // Generate the new DOMDocument from the XML
    let update = serializer.serializeToString(doc.documentElement);
    console.info(update);
    try {
        fs.writeFileSync(source, update, 'utf8');
    }
    catch (err) {
        if (err) {
            console.error('ERROR:', err);
            return;
        }
    }
    // *****************************************************
    // Update/Add the associated anModule entry in EFDdata/bootloader.json5
    let fProcessed = false;
    let prntName = path.basename(path.resolve(".."));
    let ModName = path.basename(path.resolve("."));
    console.info(ModName);
    let loaderPath = path.resolve("../EFData/bootLoader.json5");
    console.info(loaderPath);
    let loaderJSON = fs.readFileSync(loaderPath, "utf8");
    var loaderDoc = json5.parse(loaderJSON);
    for (let anModule in loaderDoc.anModules) {
        let module = loaderDoc.anModules[anModule];
        if (module.name === ModName) {
            module.compID = _fileGUID;
            fProcessed = true;
            break;
        }
    }
    if (!fProcessed) {
        loaderDoc.anModules[ModName.toUpperCase()] = { name: ModName, parentFldr: prntName, type: "application/javascript", compID: _fileGUID, URL: ModName + '.js' };
    }
    // Generate the new DOMDocument from the XML
    let loaderUpdate = json5.stringify(loaderDoc, null, '\t');
    console.info(loaderUpdate);
    try {
        fs.writeFileSync(loaderPath, loaderUpdate, 'utf8');
    }
    catch (err) {
        if (err) {
            console.error('ERROR:', err);
            return;
        }
    }
    console.info("Update Complete");
}
generateModuleGUID(source);
//# sourceMappingURL=generator.js.map