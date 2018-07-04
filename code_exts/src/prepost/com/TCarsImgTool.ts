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

import { TImgTool } from "./common/TImgTool";

import { TRoot }		from "thermite/TRoot";
import { TObject }		from "thermite/TObject";
import { TButton }		from "thermite/TButton";
import { TScene }		from "thermite/TScene";
import { CUtil } 		from "util/CUtil";

import MovieClip     		  = createjs.MovieClip;
import Timeline     		  = createjs.Timeline;
import DisplayObject 		  = createjs.DisplayObject;
import DisplayObjectContainer = createjs.Container;



export class TCarsImgTool extends TImgTool
{
	//************ Stage Symbols
	
	public topClosed:TButton;
	public topOpen:TButton;
	public doorsTwo:TButton;
	public doorsFour:TButton;
	public tiresLarge:TButton;
	public tiresSmall:TButton;
	
	// non-interactive elements
	
	
	//************ Stage Symbols				
	
	
	constructor()
	{
		super();
		
		CUtil.trace("TCarsImgTool:Constructor");
		
		this.feature1A = "topClosed";
		this.feature1B = "topOpen";
		this.feature2A = "doorsTwo";
		this.feature2B = "doorsFour";
		this.feature3A = "tiresLarge";
		this.feature3B = "tiresSmall";
		
		// now that everything is named - wire it up
		//
		this.initListeners();			
	}
	
}