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
import { TMouseEvent } from "thermite/events/TMouseEvent";



export class TMemoryImgTool extends TImgTool
{
	//************ Stage Symbols
	
	public lightBright:TButton;
	public lightDim:TButton;
	public cardIcons:TButton;
	public cardWords:TButton;
	public minutesOne:TButton;
	public minutesFive:TButton;
	
	// non-interactive elements
	
	
	//************ Stage Symbols				
	
	
	//@@ Jan 26 2011 - Added support for feature masks (used as lighting overlay in memory controller)
	// This redirects events directed at the mask, whose state is dependent upon a given variable, to a different variable.
	
	public currentEvtTar:Function;
	
	constructor()
	{
		super();
		
		CUtil.trace("TMemoryImgTool:Constructor");
		
		this.feature1A = "lightBright";
		this.feature1B = "lightDim";
		this.feature2A = "cardIcons";
		this.feature2B = "cardWords";
		this.feature3A = "minutesOne";
		this.feature3B = "minutesFive";
		
		this.useFeatureMask = true;
		
		this.featureMaskA = "maskDim";
		this.featureMaskB = "maskBright";
		
		// now that everything is named - wire it up
		//
		this.initListeners();			
	}
	
//*************** Image Mask Management
	
	/**
	 * Jan 26 2011 - Added support for feature masks (used as lighting overlay in memory controller)
	 * 				 This redirects events directed at the mask, whose state is dependent upon a given variable, to a different variable.
	 * 
	 * Should be overridden in child class implementation to provide 
	 * object specific mask functionality
	 * 
	 * @param	target - variable that is becoming visible
	 */
	public manageMasks(target:string) : void
	{			
		if(this.useFeatureMask)
		{
			switch(target)
			{
				case "lightBright":
						this[this.featureMaskA].visible = false;
						this[this.featureMaskB].visible = true;
						break;
						
				case "lightDim":
						this[this.featureMaskA].visible = true;
						this[this.featureMaskB].visible = false;
						break;
				
				case "cardIcons":
						// remove the current event target if any.
						
						if (this.currentEvtTar != null) 
						{
							this[this.featureMaskA].removeEventListener(TMouseEvent.WOZCLICK, this.currentEvtTar);
							this[this.featureMaskB].removeEventListener(TMouseEvent.WOZCLICK, this.currentEvtTar);
						}
						
						this[this.featureMaskA].addEventListener(TMouseEvent.WOZCLICK, this.dofeature2A);
						this[this.featureMaskB].addEventListener(TMouseEvent.WOZCLICK, this.dofeature2A);
						
						this.currentEvtTar = this.dofeature2A;
						break;
				
				case "cardWords":
						// remove the current event target if any.
						
						if (this.currentEvtTar != null) 
						{
							this[this.featureMaskA].removeEventListener(TMouseEvent.WOZCLICK, this.currentEvtTar);
							this[this.featureMaskB].removeEventListener(TMouseEvent.WOZCLICK, this.currentEvtTar);
						}
						
						this[this.featureMaskA].addEventListener(TMouseEvent.WOZCLICK, this.dofeature2B);
						this[this.featureMaskB].addEventListener(TMouseEvent.WOZCLICK, this.dofeature2B);
						
						this.currentEvtTar = this.dofeature2B;
						break;
			}
		}
	}
	
//*************** Image Mask Management
}
