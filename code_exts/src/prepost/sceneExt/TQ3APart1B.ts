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

import { TExpSceneTyp1 } 		from "./TExpSceneTyp1";
import { TRocketImgTool } 		from "../com/TRocketImgTool";
import { TRocketController } 	from "../com/TRocketController";
import { TCircleControl } 		from "../com/common/TCircleControl";
import { TLabelControl } 		from "../com/common/TLabelControl";

import { TRoot }				from "thermite/TRoot";
import { TObject }				from "thermite/TObject";
import { TButton } 				from "thermite/TButton";
import { TTextInput } 			from "thermite/TTextInput";
import { TScene }				from "thermite/TScene";
import { CUtil } 				from "util/CUtil";

import MovieClip     		  = createjs.MovieClip;
import Timeline     		  = createjs.Timeline;
import DisplayObject 		  = createjs.DisplayObject;
import DisplayObjectContainer = createjs.Container;
import { TSelectEvent } from "../com/events/TSelectEvent";


export class TQ3APart1B extends TExpSceneTyp1
{
	//************ Stage Symbols
	
	public q3Title1:TObject;
	public q3Title2:TObject;
	public q3Title3:TObject;
	public q3Title4:TObject;
	public q3Title5:TObject;
	public q3Title6:TObject;
	public q3Title7:TObject;
	public q3Title8:TObject;
	
	public q3MarkRight:TObject;
	public q3MarkLeft:TObject;
	
	public q3IFrame1:TObject;
	public q3QFrame1:TObject;
	public q3QFrame2:TObject;
	
	public q3DesignButton:TButton;
	
	public imgToolAq3:TRocketImgTool;
	public imgToolBq3:TRocketImgTool;
	
	public tabControllerAq3:TRocketController;
	public tabControllerBq3:TRocketController;
	
	public q3TextControl1:TTextInput;
	
	// non-interactive elements
	
	public q3FrameA:TObject;
	public q3FrameB:TObject;
	
	//************ Stage Symbols				
	
	
	public fCompleteA:boolean = false;
	public fCompleteB:boolean = false;
	
	
	
	constructor()
	{
		super();
		
		CUtil.trace("TQ3APart1B:Constructor");			
		
		this.selOneA   = "curvedBody";
		this.selOneB   = "straightBody";
		this.selTwoA   = "oneWindow";
		this.selTwoB   = "fourWindow";
		this.selThreeA = "downEngines";
		this.selThreeB = "tiltEngines";
		
		this.imgTool1		= "imgToolAq3";
		this.imgTool2		= "imgToolBq3";
		this.tabController1	= "tabControllerAq3";
		this.tabController2	= "tabControllerBq3";
	
		this.imgToolAq3.addEventListener(TSelectEvent.WOZIMGSELECT,  this.doImageMapA);			
		this.imgToolBq3.addEventListener(TSelectEvent.WOZIMGSELECT,  this.doImageMapB);			
		this.tabControllerAq3.addEventListener(TSelectEvent.WOZTABSELECT,  this.doTabMapA);
		this.tabControllerBq3.addEventListener(TSelectEvent.WOZTABSELECT,  this.doTabMapB);				  
								
		this.tabControllerAq3.addEventListener("Done",  this.questionFinishedA);			
		this.tabControllerBq3.addEventListener("Done",  this.questionFinishedB);				
	}

	
	public questionFinishedA(evt:Event)
	{			
		CUtil.trace("#### QuestionA finished");
	
		this.fCompleteA = true;
		
		if(this.fCompleteB)
		{
			this.fComplete = true;
			
			// Update the Navigation
			//
			this.updateNav();
		}
	}
	
	public questionFinishedB(evt:Event)
	{
		CUtil.trace("#### QuestionB finished");
		
		this.fCompleteB = true;
		
		if(this.fCompleteA)
		{
			this.fComplete = true;
			
			// Update the Navigation
			//
			this.updateNav();
		}
	}
	
	
//****** Overridden Behaviors

//*************** Logging state management

	public captureLogState(obj:any = null) : Object
	{
		obj = super.captureLogState(obj);
		
		obj['scene']        = this.name;
		obj['Controller1']  = this.tabControllerAq3.captureLogState();
		obj['Controller2']  = this.tabControllerBq3.captureLogState();
		
		return obj;											   
	}				
	
	public captureXMLState() :any
	{		
		var sceneState:any = {};
				
		sceneState.appendChild(this.tabControllerAq3.captureXMLState());
		sceneState.appendChild(this.tabControllerBq3.captureXMLState());
		
		return sceneState;
	}		

	public restoreXMLState(xmlState:any) : void
	{
		this.tabControllerAq3.restoreXMLState(xmlState.controller[0]);
		this.tabControllerBq3.restoreXMLState(xmlState.controller[1]);
	}		
	
	public compareXMLState(xmlState:any) :boolean
	{
		var bTest:boolean = true;
		
		if(!this.tabControllerAq3.compareXMLState(xmlState.controller[0]) ||
			!this.tabControllerBq3.compareXMLState(xmlState.controller[1]))
																bTest = false;			
		return bTest;			
	}		
	
//*************** Logging state management

	public preExitScene(Direction:string, sceneCurr:number ) :string
	{				
		CUtil.trace("TQ3APart1B Enter Scene Behavior:");
		
		// Maintain global for summative assessment
		
		this.assertGlobal('q3CVS', this.encodeExptString("engine direction", "this.sel3", "this.sel1", "this.sel2"));
					
		return("OK");
	}

	
//****** Overridable Behaviors
			
}