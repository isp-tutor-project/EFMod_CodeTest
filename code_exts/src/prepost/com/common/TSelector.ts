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

/// <reference path="../../../../../../dist/TutorEngineOne.d.ts" />

//** Imports

import { TRoot }		from "thermite/TRoot";
import { TObject }		from "thermite/TObject";
import { TScene }		from "thermite/TScene";
import { TMouseEvent } 	from "thermite/events/TMouseEvent";
import { CUtil } 		from "util/CUtil";

import MovieClip     		  = createjs.MovieClip;
import Timeline     		  = createjs.Timeline;
import DisplayObject 		  = createjs.DisplayObject;
import DisplayObjectContainer = createjs.Container;



export class TSelector extends TObject
{
	constructor()
	{
		super();
		
		CUtil.trace("TSelector:Constructor");
		
		this.button.addEventListener("WOZMOUSE_OVER", this.doButtonOver);
		this.button.addEventListener("WOZMOUSE_CLICK", this.doMouseClick);
		
		
		this.clicker.addEventListener("WOZMOUSE_OVER", this.doMouseOver);
		this.clicker.addEventListener("WOZMOUSE_OUT", this.doMouseOut);
		this.clicker.addEventListener("WOZMOUSE_DOWN", this.doMouseDown);
		this.clicker.addEventListener("WOZMOUSE_CLICK", this.doMouseClick);
	}

	
//***************** Automation *******************************		

	public setAutomation(bFlag:boolean)
	{
		this.bAuto = bFlag;
		
		
		
	}
	
//***************** Automation *******************************		



//***********  WOZ automatable event stream -
	
	
	public doMouseClick(evt:TMouseEvent)
	{
		
	}
	
	public doMouseDown(evt:TMouseEvent)
	{
	}
	
	public doMouseUp(evt:TMouseEvent)
	{
	}

	public doMouseOver(evt:TMouseEvent)
	{
	}
	
	public doMouseOut(evt:TMouseEvent)
	{
	}
	
}