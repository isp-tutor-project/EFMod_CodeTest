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

import { TSelectEvent } from "../com/events/TSelectEvent";
import { TTabTool } 	from "../com/common/TTabTool";

import { TRoot }		from "thermite/TRoot";
import { TObject }		from "thermite/TObject";
import { TScene }		from "thermite/TScene";
import { TMouseEvent } 	from "thermite/events/TMouseEvent";
import { CUtil } 		from "util/CUtil";

import MovieClip     		  = createjs.MovieClip;
import Timeline     		  = createjs.Timeline;
import DisplayObject 		  = createjs.DisplayObject;
import DisplayObjectContainer = createjs.Container;



export class TIntroPart1 extends TScene
{
	constructor()
	{
		super();
		
		CUtil.trace("TIntroPart1:Constructor");
				
		this.imgTool.addEventListener(TSelectEvent.WOZIMGSELECT,  this.doImageMap);			
		this.TabTool.addEventListener(TSelectEvent.WOZTABSELECT,  this.doTabMap);
	}

//***** Clickable image - imgTool actions

	// image map clicked -- spawn a TabTool Tab
	//
	public doImageMap(evt:TSelectEvent)
	{
		switch(evt.selection)
		{
			case "chimneyLeft":
			case "chimneyRight":
					this.tabTool.topClick(new TMouseEvent("", TMouseEvent.WOZCLICK));
					break;
					
			case "pinkPaint":
			case "bluePaint":
					this.tabTool.centerClick(new TMouseEvent("", TMouseEvent.WOZCLICK));
					break;
					
			case "singleDoor":
			case "doubleDoor":
					this.tabTool.bottomClick(new TMouseEvent("", TMouseEvent.WOZCLICK));
					break;
					
		}
	}
	
	public doTabMap(evt:TSelectEvent)
	{
		CUtil.trace(" this.doTabMap: " + evt.selection);
		
		// Turn off both in the set selected
		//
		switch(evt.selection)
		{
			case "chimneyLeft":										
			case "chimneyRight":
					this.imgTool.chimneyLeft.visible = false;
					this.imgTool.chimneyRight.visible = false;
					break;
					
			case "pinkPaint":
			case "bluePaint":
					this.imgTool.pinkPaint.visible = false;
					this.imgTool.bluePaint.visible = false;
					break;
					
			case "singleDoor":
			case "doubleDoor":
					this.imgTool.singleDoor.visible = false;
					this.imgTool.doubleDoor.visible = false;
					break;
			
		}
		
		//  Turn on the one selected from the set
		//
		this.imgTool[evt.selection].visible = true;
		
	}
}