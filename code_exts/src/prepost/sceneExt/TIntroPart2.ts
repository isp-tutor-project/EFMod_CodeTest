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

import { TRoot }		from "thermite/TRoot";
import { TObject }		from "thermite/TObject";
import { TScene }		from "thermite/TScene";
import { TMouseEvent } 	from "thermite/events/TMouseEvent";
import { CUtil } 		from "util/CUtil";

import MovieClip     		  = createjs.MovieClip;
import Timeline     		  = createjs.Timeline;
import DisplayObject 		  = createjs.DisplayObject;
import DisplayObjectContainer = createjs.Container;



export class TIntroPart2 extends TScene
{
	//************ Stage Symbols
	
	public i1p2imgTool:THouseImgTool;
	public i1p2tabController:THouseController;
	
	// non-interactive elements
	
	
	//************ Stage Symbols				
	
		
	public  fInitialized:boolean = false;		
	private  fStateCap:boolean    = false;
	public   expState:any;
	
	
	constructor()
	{
		super();
		
		CUtil.trace("TIntroPart2:Constructor");
					
		// Wire the image and Tab tools
		//
		this.i1p2imgTool.addEventListener(TSelectEvent.WOZIMGSELECT,  this.doImageMap);			
		this.i1p2tabController.addEventListener(TSelectEvent.WOZTABSELECT,  this.doTabMap);
		
		// Display the changed tab if the image does not match the original
		this.i1p2tabController.this.useChanged = true;			
		
		this.i1p2tabController.addEventListener("Done",  this.questionFinished);			
	}

	
	public initHouse():void
	{
		CUtil.trace("TIntroPart2:Constructor");


		// Initialize the House to the opposite of the initial setup
		//
		if(this.tutorAutoObj["Sintro1"].this.i1p1tabController.this.sel1 == "Sitem1")
		{
			this.i1p2imgTool["chimneyRight"].visible = true;
			this.i1p2tabController.this.sel1 = "Sitem2";						
			this.i1p2tabController.this.StopButton.SsubLabel.text	   = "Right Side";
			this.i1p2tabController.this.StopButton.SsubLabel.visible   = true;
		}
		else
		{
			this.i1p2imgTool["chimneyLeft"].visible = true;
			this.i1p2tabController.this.sel1 = "Sitem1";						
			this.i1p2tabController.this.StopButton.SsubLabel.text	   = "Left Side";
			this.i1p2tabController.this.StopButton.SsubLabel.visible   = true;
		}
		
		if(this.tutorAutoObj["Sintro1"].this.i1p1tabController.this.sel2 == "Sitem1")
		{
			this.i1p2imgTool["bluePaint"].visible = true;
			this.i1p2tabController.this.sel2 = "Sitem2";						
			this.i1p2tabController.this.ScenterButton.SsubLabel.text    = "Blue Paint";
			this.i1p2tabController.this.ScenterButton.SsubLabel.visible = true;
		}
		else
		{
			this.i1p2imgTool["pinkPaint"].visible = true;
			this.i1p2tabController.this.sel2 = "Sitem1";						
			this.i1p2tabController.this.ScenterButton.SsubLabel.text    = "Pink Paint";
			this.i1p2tabController.this.ScenterButton.SsubLabel.visible = true;
		}
		
		if(this.tutorAutoObj["Sintro1"].this.i1p1tabController.this.sel3 == "Sitem2")
		{
			this.i1p2imgTool["singleDoor"].visible = true;
			this.i1p2tabController.this.sel3 = "Sitem1";						
			this.i1p2tabController.this.SbottomButton.SsubLabel.text    = "Single Door"; 
			this.i1p2tabController.this.SbottomButton.SsubLabel.visible = true;			
		}
		else
		{
			this.i1p2imgTool["doubleDoor"].visible = true;
			this.i1p2tabController.this.sel3 = "Sitem2";						
			this.i1p2tabController.this.SbottomButton.SsubLabel.text    = "Double Door"; 
			this.i1p2tabController.this.SbottomButton.SsubLabel.visible = true;			
		}		

		// The setup has been initialized
		//
		this.fInitialized = true;
	}

	
//***** Clickable image - this.i1p2imgTool actions

	// image map clicked -- spawn a this.i1p2tabController Tab
	//
	public doImageMap(evt:TSelectEvent)
	{
		switch(evt.selection)
		{
			case "chimneyLeft":
			case "chimneyRight":
					this.i1p2tabController.topClick(new TMouseEvent("", TMouseEvent.WOZCLICK));
					break;
					
			case "pinkPaint":
			case "bluePaint":
					this.i1p2tabController.centerClick(new TMouseEvent("", TMouseEvent.WOZCLICK));
					break;
					
			case "singleDoor":
			case "doubleDoor":
					this.i1p2tabController.bottomClick(new TMouseEvent("", TMouseEvent.WOZCLICK));
					break;
					
		}
	}
	
	public  doTabMap(evt:TSelectEvent)
	{
		CUtil.trace(" this.doTabMap: " + evt.selection);
		
		// Turn off both in the set selected
		//
		switch(evt.selection)
		{
			case "chimneyLeft":										
			case "chimneyRight":
					this.i1p2imgTool.chimneyLeft.visible = false;
					this.i1p2imgTool.chimneyRight.visible = false;
					break;
					
			case "pinkPaint":
			case "bluePaint":
					this.i1p2imgTool.pinkPaint.visible = false;
					this.i1p2imgTool.bluePaint.visible = false;
					break;
					
			case "singleDoor":
			case "doubleDoor":
					this.i1p2imgTool.singleDoor.visible = false;
					this.i1p2imgTool.doubleDoor.visible = false;
					break;
			
		}
		
		//  Turn on the one selected from the set
		//
		this.i1p2imgTool[evt.selection].visible = true;			
	}
	
	
//******** Navigation update control		

	public questionFinished(evt:Event) : void 
	{
		// set labels based upon changes to image
		//
		this.setLabels();
	}
			
	public setLabels()
	{				
		this.fComplete = false;
		
		if(!this.i1p2tabController.compareXMLState(this.expState))
											this.fComplete = true;
			
		// Update the nav based upon the current change state
		//
		this.updateNav();
	}
	
	
//****** Overridden Behaviors

//*************** Logging state management

	public captureLogState(obj:any = null) : Object
	{
		obj = super.captureLogState(obj);
		
		obj['scene']        = this.name;		
		obj['imgTool']  	  = this.i1p2imgTool.captureLogState();
		obj['tabController']  = this.i1p2tabController.captureLogState();
		
		return obj;											   
	}				
	
	public captureXMLState() :any
	{		
		var sceneState:any = {name:this.name}; //<scene name={name}/>;
				
		sceneState.appendChild(this.i1p2imgTool.captureXMLState());
		sceneState.appendChild(this.i1p2tabController.captureXMLState());
		
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

	// Update the Navigation Features on entry
	//
	public preEnterScene(lTutor:any, sceneLabel:string, sceneTitle:string, scenePage:string, Direction:string ) :string
	{
		CUtil.trace("TIntroPart2 Pre-Enter Scene Behavior: " + sceneTitle);		
		
		if(!this.fInitialized)
				this.initHouse();
			
		// Capture the experimental setup state
		//
		if(!this.fStateCap)
		{
			this.expState  = this.i1p2tabController.captureXMLState();
			this.fStateCap = true;				
		}			

		// This should only be done once both controller states have been captured
		this.setLabels();
		
		// Update the Navigation
		//
		this.updateNav();
		
		return super.preEnterScene(lTutor, sceneLabel, sceneTitle, scenePage, Direction );
	}

	
	public preExitScene(Direction:string, sceneCurr:number ) :string
	{				
		CUtil.trace("TIntroPart2 Enter Scene Behavior:");
		
		return("OK");
	}

	
//****** Overridable Behaviors
	
}