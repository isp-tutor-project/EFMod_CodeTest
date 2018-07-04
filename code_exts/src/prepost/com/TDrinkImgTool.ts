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
import { TImgTool322 } 	from "./common/TImgTool322";

import { TRoot }		from "thermite/TRoot";
import { TObject }		from "thermite/TObject";
import { TButton }		from "thermite/TButton";
import { TScene }		from "thermite/TScene";
import { CUtil } 		from "util/CUtil";

import MovieClip     		  = createjs.MovieClip;
import Timeline     		  = createjs.Timeline;
import DisplayObject 		  = createjs.DisplayObject;
import DisplayObjectContainer = createjs.Container;


export class TDrinkImgTool extends TImgTool322
{
	//************ Stage Symbols
	
	public clockNoon:TButton;
	public clockThree:TButton;
	public clockSix:TButton;
	public ageYoung:TButton;
	public ageOlder:TButton;
	public drinkLemon:TButton;
	public drinkTea:TButton;		
	
	// non-interactive elements
	
	
	//************ Stage Symbols				
	
	
	constructor()
	{
		super();
		
		CUtil.trace("TDrinkImgTool:Constructor");
		
		this.feature1A = "clockNoon";
		this.feature1B = "clockThree";
		this.feature1C = "clockSix";
		this.feature2A = "ageYoung";
		this.feature2B = "ageOlder";
		this.feature3A = "drinkLemon";
		this.feature3B = "drinkTea";
		
		// now that everything is named - wire it up
		//
		this.initListeners();
	}
	
}