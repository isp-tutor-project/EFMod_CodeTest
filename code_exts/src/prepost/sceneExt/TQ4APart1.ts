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
import { TMouseEvent } from "thermite/events/TMouseEvent";



export class TQ4APart1 extends TExpSceneTyp1
{
	//************ Stage Symbols
	
	public q4Title1:TObject;
	public q4Title2:TObject;
	public q4Title3:TObject;
	public q4Title4:TObject;
	public q4Title5:TObject;
	
	public q4MarkRight:TObject;
	public q4MarkLeft:TObject;
	
	public q4IFrame1:TObject;
	public q4QFrame1:TObject;
	
	public q4DesignButton:TButton;
	
	public imgToolCq4:TRocketImgTool;
	public imgToolDq4:TRocketImgTool;
	
	public tabControllerCq4:TRocketController;
	public tabControllerDq4:TRocketController;
	
	public q4TextControl1:TTextInput;
	
	public q4Check1:TCircleControl;
	public q4Check2:TCircleControl;
	
	// non-interactive elements
	
	public q4Arrow1:TObject;
	
	public q4FrameA:TObject;
	public q4FrameB:TObject;
	public q4FrameC:TObject;
	public q4FrameD:TObject;
	
	//************ Stage Symbols				
	
	
	constructor()
	{
		super();
		
		CUtil.trace("TQ4APart1:Constructor");

		this.selOneA   = "curvedBody";
		this.selOneB   = "straightBody";
		this.selTwoA   = "oneWindow";
		this.selTwoB   = "fourWindow";
		this.selThreeA = "downEngines";
		this.selThreeB = "tiltEngines";
		
		this.imgTool1		= "imgToolCq4";
		this.imgTool2		= "imgToolDq4";
		this.tabController1	= "tabControllerCq4";
		this.tabController2	= "tabControllerDq4";
			
		// Disable the controllers
		//
		this.imgToolCq4.enableTool(false);			
		this.imgToolDq4.enableTool(false);			
		this.tabControllerCq4.enableTool(false);			
		this.tabControllerDq4.enableTool(false);						
		
		// Initialize the Experimental setups
		//
		this.imgToolCq4["straightBody"].visible = true;
		this.imgToolCq4["fourWindow"].visible = true;
		this.imgToolCq4["downEngines"].visible = true;
		
		this.imgToolDq4["curvedBody"].visible = true;
		this.imgToolDq4["oneWindow"].visible = true;
		this.imgToolDq4["tiltEngines"].visible = true;
		
		// Initialize the Controller Buttons
		//
		this.tabControllerCq4.this.sel1 = "Sitem2";						
		this.tabControllerCq4.this.StopButton.SsubLabel.text	   = "Straight";
		this.tabControllerCq4.this.StopButton.SsubLabel.visible	   = true;
		
		this.tabControllerCq4.this.sel2 = "Sitem2";						
		this.tabControllerCq4.this.ScenterButton.SsubLabel.text    = "Four";
		this.tabControllerCq4.this.ScenterButton.SsubLabel.visible = true;
		
		this.tabControllerCq4.this.sel3 = "Sitem1";						
		this.tabControllerCq4.this.SbottomButton.SsubLabel.text    = "Down"; 
		this.tabControllerCq4.this.SbottomButton.SsubLabel.visible = true;			
		
		this.tabControllerDq4.this.sel1 = "Sitem1";						
		this.tabControllerDq4.this.StopButton.SsubLabel.text	   = "Curved";
		this.tabControllerDq4.this.StopButton.SsubLabel.visible	   = true;
		
		this.tabControllerDq4.this.sel2 = "Sitem1";						
		this.tabControllerDq4.this.ScenterButton.SsubLabel.text    = "One";
		this.tabControllerDq4.this.ScenterButton.SsubLabel.visible = true;
		
		this.tabControllerDq4.this.sel3 = "Sitem2";						
		this.tabControllerDq4.this.SbottomButton.SsubLabel.text    = "Tilted"; 
		this.tabControllerDq4.this.SbottomButton.SsubLabel.visible = true;			
					
	this.q4Check2.setLabel("Bad Way");
		
	this.q4Check1.addEventListener(TMouseEvent.WOZCLICK, this.check1Clicked);			
	this.q4Check2.addEventListener(TMouseEvent.WOZCLICK, this.check2Clicked);						
	}

	
	public check1Clicked(evt:Event)
	{
		//@@ Action Logging
		var logData:any = {'action':'check1Clicked', 'targetid':name, 'label':'Good Way', 'state':this.q4Check1.getChecked()};
		
		this.tutorDoc.log.logActionEvent(logData);			
		//@@ Action Logging
		
		 this.questionFinished(evt);
	}
	
	public check2Clicked(evt:Event)
	{
		//@@ Action Logging
		var logData:any = {'action':'check2Clicked', 'targetid':name, 'label':'Bad Way', 'state':this.q4Check2.getChecked()};
		
		this.tutorDoc.log.logActionEvent(logData);
		//@@ Action Logging
		
		 this.questionFinished(evt);
	}
	
	
//******** Navigation update control		
	
	public questionFinished(evt:Event) : void 
	{
		if(this.q4Check1.getChecked() || this.q4Check2.getChecked())
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
		obj['Check1']  = this.q4Check1.captureLogState();
		obj['Check2']  = this.q4Check2.captureLogState();
		
		return obj;											   
	}				
	
	public captureXMLState() :any
	{		
		var sceneState:any = {};
				
		sceneState.appendChild(this.q4Check1.captureXMLState());
		sceneState.appendChild(this.q4Check2.captureXMLState());
														
		return sceneState;											   
	}		

	public restoreXMLState(xmlState:any) : void
	{
	this.q4Check1.restoreXMLState(xmlState.button[0]);
	this.q4Check2.restoreXMLState(xmlState.button[1]);
	}		
	
	public compareXMLState(xmlState:any) :boolean
	{
		var bTest:boolean = true;
		
		if(!this.q4Check1.compareXMLState(xmlState.button[0]) ||
			!this.q4Check2.compareXMLState(xmlState.button[1]))
														bTest = false;			
		return bTest;			
	}		
	
//*************** Logging state management


	public preExitScene(Direction:string, sceneCurr:number ) :string
	{				
		CUtil.trace("TQ4APart1 Enter Scene Behavior:");
		
		// Maintain global for summative assessment
		
		this.assertGlobal('q4Good', this.q4Check1.captureLOGString);
		this.assertGlobal('q4Bad' , this.q4Check2.captureLOGString);
					
		return("OK");
	}
	
//****** Overridable Behaviors
	
}