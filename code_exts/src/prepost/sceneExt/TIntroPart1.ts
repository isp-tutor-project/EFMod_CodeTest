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

import { THouseImgTool } 	from "../com/THouseImgTool";
import { THouseController } from "../com/THouseController";
import { TSelectEvent } 	from "../com/events/TSelectEvent";

import { TRoot }			from "thermite/TRoot";
import { TObject }			from "thermite/TObject";
import { TScene }			from "thermite/TScene";
import { TMouseEvent } 		from "thermite/events/TMouseEvent";
import { CUtil } 			from "util/CUtil";

import MovieClip     		  = createjs.MovieClip;
import Timeline     		  = createjs.Timeline;
import DisplayObject 		  = createjs.DisplayObject;
import DisplayObjectContainer = createjs.Container;



export class TIntroPart1 extends TScene
{
	//************ Stage Symbols
	
	public i1p1imgTool:THouseImgTool;
	public i1p1tabController:THouseController;
	
	// non-interactive elements
	
	
	//************ Stage Symbols				
	
	
	
	constructor()
	{
		super();
		
		CUtil.trace("TIntroPart1:Constructor");
				
		this.i1p1imgTool.addEventListener(TSelectEvent.WOZIMGSELECT,  this.doImageMap);			
		this.i1p1tabController.addEventListener(TSelectEvent.WOZTABSELECT,  this.doTabMap);			
		
		this.i1p1tabController.addEventListener("Done",  this.questionFinished);
	}

//***** Clickable image - this.i1p1imgTool actions

	// image map clicked -- spawn a this.i1p1tabController Tab
	//
	public doImageMap(evt:TSelectEvent)
	{			
		switch(evt.selection)
		{
			case "chimneyLeft":
			case "chimneyRight":
					this.i1p1tabController.topClick(new TMouseEvent("", TMouseEvent.WOZCLICK));
					break;
					
			case "pinkPaint":
			case "bluePaint":
					this.i1p1tabController.centerClick(new TMouseEvent("", TMouseEvent.WOZCLICK));
					break;
					
			case "singleDoor":
			case "doubleDoor":
					this.i1p1tabController.bottomClick(new TMouseEvent("", TMouseEvent.WOZCLICK));
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
					this.i1p1imgTool.chimneyLeft.visible = false;
					this.i1p1imgTool.chimneyRight.visible = false;
					break;
					
			case "pinkPaint":
			case "bluePaint":
					this.i1p1imgTool.pinkPaint.visible = false;
					this.i1p1imgTool.bluePaint.visible = false;
					break;
					
			case "singleDoor":
			case "doubleDoor":
					this.i1p1imgTool.singleDoor.visible = false;
					this.i1p1imgTool.doubleDoor.visible = false;
					break;
			
		}
		
		//  Turn on the one selected from the set
		//
		this.i1p1imgTool[evt.selection].visible = true;			
	}
	
			
//****** Overridden Behaviors

//*************** Logging state management

	public captureLogState(obj:any = null) : Object
	{
		obj = super.captureLogState(obj);
		
		obj['scene']          = this.name;		
		obj['imgTool']  	  = this.i1p1imgTool.captureLogState();
		obj['tabController']  = this.i1p1tabController.captureLogState();
		
		return obj;											   
	}				
	
	public captureXMLState() :any
	{		
		var sceneState:any = {name:this.name};
				
		sceneState.appendChild(this.i1p1imgTool.captureXMLState());
		sceneState.appendChild(this.i1p1tabController.captureXMLState());
		
		return sceneState;
	}		

	public restoreXMLState(xmlState:any) : void
	{
	}		
	
	public compareXMLState(xmlState:any) :boolean
	{
		var bTest:boolean = true;			
		return bTest;			
	}		
	
//*************** Logging state management


	public preExitScene(Direction:string, sceneCurr:number ) :string
	{				
		CUtil.trace("TIntroPart1 Enter Scene Behavior:");
					
		return("OK");
	}

	
	
//****** Overridable Behaviors
	
}