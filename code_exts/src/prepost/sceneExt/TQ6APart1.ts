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
import { TMouseEvent } from "thermite/events/TMouseEvent";



export class TQ6APart1 extends TExpSceneTyp1
{
	//************ Stage Symbols
	
	public q6Title1:TObject;
	public q6Title2:TObject;
	public q6Title3:TObject;
	public q6Title4:TObject;
	public q6Title5:TObject;
	
	public q6MarkRight:TObject;
	public q6MarkLeft:TObject;
	
	public q6IFrame1:TObject;
	public q6QFrame1:TObject;
	
	public q6DesignButton:TButton;
	
	public imgToolCq6:TStudyImgTool;
	public imgToolDq6:TStudyImgTool;
	
	public tabControllerCq6:TStudyController;
	public tabControllerDq6:TStudyController;
	
	public q6TextControl1:TTextInput;
	
	public q6Check1:TCircleControl;
	public q6Check2:TCircleControl;
	
	// non-interactive elements
	
	public q6Arrow1:TObject;
	
	public q6FrameA:TObject;
	public q6FrameB:TObject;
	public q6FrameC:TObject;
	public q6FrameD:TObject;
	
	//************ Stage Symbols				
	
	
	constructor()
	{
		super();
		
		CUtil.trace("TQ6APart1:Constructor");

		this.selOneA   = "studyAlone";
		this.selOneB   = "studyFriend";
		this.selTwoA   = "atHome";
		this.selTwoB   = "atLibrary";
		this.selThreeA = "drinkWater";
		this.selThreeB = "drinkSoda";
		
		this.imgTool1		= "imgToolCq6";
		this.imgTool2		= "imgToolDq6";
		this.tabController1	= "tabControllerCq6";
		this.tabController2	= "tabControllerDq6";
			
		// Disable the controllers
		//
		this.imgToolCq6.enableTool(false);			
		this.imgToolDq6.enableTool(false);			
		this.tabControllerCq6.enableTool(false);			
		this.tabControllerDq6.enableTool(false);						
		
		// Initialize the Experimental setups
		//
		this.imgToolCq6["studyAlone"].visible = true;
		this.imgToolCq6["atLibrary"].visible = true;
		this.imgToolCq6["drinkWater"].visible = true;
		
		this.imgToolDq6["studyAlone"].visible = true;
		this.imgToolDq6["atLibrary"].visible = true;
		this.imgToolDq6["drinkWater"].visible = true;
		
		// Initialize the Controller Buttons
		//
		this.tabControllerCq6.this.sel1 = "Sitem1";						
		this.tabControllerCq6.this.StopButton.SsubLabel.text	   = "Alone";
		this.tabControllerCq6.this.StopButton.SsubLabel.visible	   = true;
		
		this.tabControllerCq6.this.sel2 = "Sitem2";						
		this.tabControllerCq6.this.ScenterButton.SsubLabel.text    = "Library";
		this.tabControllerCq6.this.ScenterButton.SsubLabel.visible = true;
		
		this.tabControllerCq6.this.sel3 = "Sitem1";						
		this.tabControllerCq6.this.SbottomButton.SsubLabel.text    = "Water"; 
		this.tabControllerCq6.this.SbottomButton.SsubLabel.visible = true;			
		
		this.tabControllerDq6.this.sel1 = "Sitem1";						
		this.tabControllerDq6.this.StopButton.SsubLabel.text	   = "Alone";
		this.tabControllerDq6.this.StopButton.SsubLabel.visible	   = true;
		
		this.tabControllerDq6.this.sel2 = "Sitem2";						
		this.tabControllerDq6.this.ScenterButton.SsubLabel.text    = "Library";
		this.tabControllerDq6.this.ScenterButton.SsubLabel.visible = true;
		
		this.tabControllerDq6.this.sel3 = "Sitem1";						
		this.tabControllerDq6.this.SbottomButton.SsubLabel.text    = "Water"; 
		this.tabControllerDq6.this.SbottomButton.SsubLabel.visible = true;			
		
	this.q6Check2.setLabel("Bad Way");
		
	this.q6Check1.addEventListener(TMouseEvent.WOZCLICK, this.check1Clicked);			
	this.q6Check2.addEventListener(TMouseEvent.WOZCLICK, this.check2Clicked);		
	}

	
	public check1Clicked(evt:Event)
	{
		//@@ Action Logging
		var logData:any = {'action':'check1Clicked', 'targetid':name, 'label':'Good Way', 'state':this.q6Check1.getChecked()};
		
		this.tutorDoc.log.logActionEvent(logData);			
		//@@ Action Logging
		
		 this.questionFinished(evt);
	}
	
	public check2Clicked(evt:Event)
	{
		//@@ Action Logging
		var logData:any = {'action':'check2Clicked', 'targetid':name, 'label':'Bad Way', 'state':this.q6Check2.getChecked()};
		
		this.tutorDoc.log.logActionEvent(logData);
		//@@ Action Logging
		
		 this.questionFinished(evt);
	}
	
	
//******** Navigation update control		
	
	public questionFinished(evt:Event) : void 
	{
		if(this.q6Check1.getChecked()|| this.q6Check2.getChecked())
			this.fComplete = true;
		else 
			this.fComplete = false;
		
		// Update the Navigation
		//
		this.updateNav();
	}
			
//****** Overridden Behaviors


//*************** Logging state management

	public captureLogState(obj:any = null) : Object
	{
		obj = super.captureLogState(obj);
		
		obj['scene']   = this.name;
		obj['Check1']  = this.q6Check1.captureLogState();
		obj['Check2']  = this.q6Check2.captureLogState();
		
		return obj;											   
	}				
	
	public captureXMLState() :any
	{		
		var sceneState:any = {};
				
		sceneState.appendChild(this.q6Check1.captureXMLState());
		sceneState.appendChild(this.q6Check2.captureXMLState());
														
		return sceneState;											   
	}		

	public restoreXMLState(xmlState:any) : void
	{
	this.q6Check1.restoreXMLState(xmlState.button[0]);
	this.q6Check2.restoreXMLState(xmlState.button[1]);
	}		
	
	public compareXMLState(xmlState:any) :boolean
	{
		var bTest:boolean = true;
		
		if(!this.q6Check1.compareXMLState(xmlState.button[0]) ||
		   !this.q6Check2.compareXMLState(xmlState.button[1]))
														bTest = false;			
		return bTest;			
	}		
	
//*************** Logging state management


	public preExitScene(Direction:string, sceneCurr:number ) :string
	{				
		CUtil.trace("TQ6APart1 Enter Scene Behavior:");
		
		// Maintain global for summative assessment
		
		this.assertGlobal('q6Good', this.q6Check1.captureLOGString);
		this.assertGlobal('q6Bad' , this.q6Check2.captureLOGString);
		
		return("OK");
	}
	
//****** Overridable Behaviors
	
}