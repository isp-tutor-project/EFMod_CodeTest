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

/// <reference path="../../../../../dist/TutorEngineOne.d.ts" />

//** Imports

import { TImgTool } 	from "./common/TImgTool";

import { TRoot }		from "thermite/TRoot";
import { TObject }		from "thermite/TObject";
import { TButton }		from "thermite/TButton";
import { TScene }		from "thermite/TScene";
import { CUtil } 		from "util/CUtil";

import MovieClip     		  = createjs.MovieClip;
import Timeline     		  = createjs.Timeline;
import DisplayObject 		  = createjs.DisplayObject;
import DisplayObjectContainer = createjs.Container;



export class TStudyImgTool extends TImgTool
{
	//************ Stage Symbols
	
	public studyAlone:TButton;
	public studyFriend:TButton;
	public atHome:TButton;
	public atLibrary:TButton;
	public drinkWater:TButton;
	public drinkSoda:TButton;
	
	// non-interactive elements
	
	
	//************ Stage Symbols				
	
	
	constructor()
	{
		super();
		
		CUtil.trace("TStudyImgTool:Constructor");
		
		this.feature1A = "studyAlone";
		this.feature1B = "studyFriend";
		this.feature2A = "atHome";
		this.feature2B = "atLibrary";
		this.feature3A = "drinkWater";
		this.feature3B = "drinkSoda";
		
		// now that everything is named - wire it up
		//
		this.initListeners();			
	}
	
}