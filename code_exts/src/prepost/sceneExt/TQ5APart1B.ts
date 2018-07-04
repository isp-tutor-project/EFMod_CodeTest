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
import { TStudyImgTool } 		from "../com/TStudyImgTool";
import { TStudyController } 	from "../com/TStudyController";
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



export class TQ5APart1B extends TExpSceneTyp1
{
	//************ Stage Symbols
	
	public q5Title1:TObject;
	public q5Title2:TObject;
	public q5Title3:TObject;
	public q5Title4:TObject;
	public q5Title5:TObject;
	public q5Title6:TObject;
	public q5Title7:TObject;
	public q5Title8:TObject;
	
	public q5MarkRight:TObject;
	public q5MarkLeft:TObject;
	
	public q5IFrame1:TObject;
	public q5QFrame1:TObject;
	public q5QFrame2:TObject;
	
	public q5DesignButton:TButton;
	
	public imgToolAq5:TStudyImgTool;
	public imgToolBq5:TStudyImgTool;
	
	public tabControllerAq5:TStudyController;
	public tabControllerBq5:TStudyController;
	
	public q5TextControl1:TTextInput;
	
	// non-interactive elements
	
	public q5FrameA:TObject;
	public q5FrameB:TObject;
	
	//************ Stage Symbols				
	
	
	public fCompleteA:boolean = false;
	public fCompleteB:boolean = false;
	
	
	
	constructor()
	{
		super();
		
		CUtil.trace("TQ5APart1B:Constructor");
		
		this.selOneA   = "studyAlone";
		this.selOneB   = "studyFriend";
		this.selTwoA   = "atHome";
		this.selTwoB   = "atLibrary";
		this.selThreeA = "drinkWater";
		this.selThreeB = "drinkSoda";
		
		this.imgTool1		= "imgToolAq5";
		this.imgTool2		= "imgToolBq5";
		this.tabController1	= "tabControllerAq5";
		this.tabController2	= "tabControllerBq5";
	
		this.imgToolAq5.addEventListener(TSelectEvent.WOZIMGSELECT,  this.doImageMapA);			
		this.imgToolBq5.addEventListener(TSelectEvent.WOZIMGSELECT,  this.doImageMapB);			
		this.tabControllerAq5.addEventListener(TSelectEvent.WOZTABSELECT,  this.doTabMapA);
		this.tabControllerBq5.addEventListener(TSelectEvent.WOZTABSELECT,  this.doTabMapB);				  
		
		this.tabControllerAq5.addEventListener("Done",  this.questionFinishedA);			
		this.tabControllerBq5.addEventListener("Done",  this.questionFinishedB);				
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
		obj['Controller1']  = this.tabControllerAq5.captureLogState();
		obj['Controller2']  = this.tabControllerBq5.captureLogState();
		
		return obj;											   
	}				
	
	public captureXMLState() :any
	{		
		var sceneState:any = {};
				
		sceneState.appendChild(this.tabControllerAq5.captureXMLState());
		sceneState.appendChild(this.tabControllerBq5.captureXMLState());
		
		return sceneState;
	}		

	public restoreXMLState(xmlState:any) : void
	{
		this.tabControllerAq5.restoreXMLState(xmlState.controller[0]);
		this.tabControllerBq5.restoreXMLState(xmlState.controller[1]);
	}		
	
	public compareXMLState(xmlState:any) :boolean
	{
		var bTest:boolean = true;
		
		if(!this.tabControllerAq5.compareXMLState(xmlState.controller[0]) ||
			!this.tabControllerBq5.compareXMLState(xmlState.controller[1]))
																bTest = false;			
		return bTest;			
	}		
	
//*************** Logging state management

	public preExitScene(Direction:string, sceneCurr:number ) :string
	{				
		CUtil.trace("TQ5APart1B Enter Scene Behavior:");
		
		// Maintain global for summative assessment
		
		this.assertGlobal('q5CVS', this.encodeExptString("study where", "this.sel2", "this.sel1", "this.sel3"));			
					
		return("OK");
	}

	
//****** Overridable Behaviors
			
}