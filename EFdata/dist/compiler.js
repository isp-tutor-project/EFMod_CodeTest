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
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const dom = new JSDOM(`<style id="internalStyle">
div.absolute {
    position: absolute;
    top: 100px;
    left: 100px;
    width: 400px;
    height: 300px;

    padding-left: 40px;
    padding-right: 40px;

    border-radius: 10px;

    border: 3px solid #000000;
    color: #000000;
    box-sizing: border-box;
    background: rgb(255, 255, 255);
    box-shadow: 6px 6px 4px 4px #3a2c2c66;

    text-align: center;

}

div.tablecell {
    display: table-cell;
    box-sizing: border-box;
    height: inherit;
    width: inherit;
    vertical-align: middle;

}

p {
    margin: 0px;
}

.spanclass {
    text-align: left;
    padding-left: 20px;
}
</style>


<div class="absolute">
<div class="tablecell">
<p>This div element has position: absolute;
    <div class="spanclass">
      <ol>
          <li>Humous or <span style="color:blue; font-weight: bold; font-size: 16px">This is a test</span> this is the problem</li>
          <li>Pitta salad</li>
          <li>Green salad</li>
          <li>Halloumi</li>
      </ol>
  </div>
We make the text super long so we can see how the layout works<br><br>Then we see if line breaks make a difference</p>      
</div>
</div>
`);
var elstyle = dom.window.document.querySelector("#internalStyle");
for (let rules of elstyle.sheet.cssRules) {
    let styleset = rules.style;
    console.log("\nSelector: " + rules.selectorText);
    for (let i = styleset.length; i--;) {
        var nameString = styleset[i];
        console.log('style: ' + nameString + ":" + styleset[nameString]);
    }
}
var el = dom.window.document.querySelector(".tablecell");
console.log("\n\n" + el.innerHTML);
//# sourceMappingURL=compiler.js.map