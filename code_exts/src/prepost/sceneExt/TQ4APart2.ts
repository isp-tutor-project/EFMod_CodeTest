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
import { TTextEvent } 			from "thermite/events/TTextEvent";
import { CUtil } 				from "util/CUtil";

import MovieClip     		  = createjs.MovieClip;
import Timeline     		  = createjs.Timeline;
import DisplayObject 		  = createjs.DisplayObject;
import DisplayObjectContainer = createjs.Container;



export class TQ4APart2 extends TExpSceneTyp1
{
	//************ Stage Symbols
	
	public q4Title1:TObject;
	public q4Title2:TObject;
	public q4Title3:TObject;
	public q4Title4:TLabelControl;
	public q4Title5:TObject;
	public q4Title6:TObject;
	public q4Title7:TLabelControl;
	
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
	
	
	public fStateCap:boolean = false;
	public sceneState:any;
					
	constructor()
	{
		super();
		
		CUtil.trace("TQ4APart2:Constructor");

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
		this.tabControllerCq4.enableTool(false);			
		this.imgToolDq4.enableTool(false);			
		this.tabControllerDq4.enableTool(false);			
		
		// Disable the circle checkbuttons
		//
	this.q4Check1.enableButton(false);
	this.q4Check2.enableButton(false);
								
		// Set the button labels
		//
	this.q4Check2.setLabel("Bad Way");			
		
		// Init the text control
		//
		this.q4TextControl1.StxtField.addEventListener(TTextEvent.CHANGE,  this.questionFinished);			
	}
	
//******** Navigation update control		
	
	
	public checkChange(evt:Event)
	{
		this.q4TextControl1.wozClear();
		
		this.updateQText(this);
		
		this.fComplete = false;
		
		// Update the Navigation
		//
		this.updateNav();
	}

	
	public questionFinished(evt:Event) : void 
	{
		if((this.q4Check1.getChecked()|| this.q4Check2.getChecked()) && this.q4TextControl1.hasMinWords(2,9)) this.fComplete = true;
																							else this.fComplete = false;			
		// Update the Navigation
		//
		this.updateNav();
	}
	

	public updateQText(wozScene:TScene )
	{
		if(wozScene["q4Check1"].getChecked())
		{
			if(wozScene["q4Check2"].getChecked())
			{
			this.q4Title4.Slabel.text = "You said the pictures above show a good and bad way to find out";
			this.q4Title7.Slabel.text = "Briefly explain why you think this is a good and bad way.";
			}
			else
			{
			this.q4Title4.Slabel.text = "You said the pictures above show a good way to find out";
			this.q4Title7.Slabel.text = "Briefly explain why you think this is a good way.";
			}
		}
		else if(wozScene["q4Check2"].getChecked())
		{
		this.q4Title4.Slabel.text = "You said the pictures above show a bad way to find out";
		this.q4Title7.Slabel.text = "Briefly explain why you think this is a bad way.";
		}
		
		// below only used with live buttons which is no longer the case - May 12 2008
//			else
//			{
//				this.q4Title4.Slabel.text = "Do you think this a a good way or a bad way";						
//				this.q4Title7.Slabel.text = "Briefly explain why you think this is a good way";
//			}
	}
	
	
//****** Overridden Behaviors


	// Update the Navigation Features on entry
	//
	public preEnterScene(lTutor:any, sceneLabel:string, sceneTitle:string, scenePage:string, Direction:string ) :string
	{
		CUtil.trace("TQ4APart2 Pre-Enter Scene Behavior: " + sceneTitle);		

		// If they have previously made a decision check if it changed
		// If so clear there previous response
		//
		if(this.fStateCap)
		{
			if(!this.tutorAutoObj["Sq4p1" + this.sType].compareXMLState(this.sceneState))																 
			{
				CUtil.trace("State Changed: clearing text - Part C State");

				// Note we clear the text box on q4p1 as it will be copied into
				// the q1p2 text box
				//
				this.tutorAutoObj["Sq4p1" + this.sType].q4TextControl1.wozClear();
				this.tutorAutoObj["Sq4p2" + this.sType].q4TextControl1.wozClear();
				this.fComplete = false;
				
				// Note we clear the q4p3 flags which resets user changes 
				// and recaptures the initial state
				//
				try
				{
					this.tutorAutoObj["Sq4p3" + this.sType].this.fStateCapC = false;
					this.tutorAutoObj["Sq4p3" + this.sType].this.fStateCapD = false;					
				}
				catch(err)
				{
					// This will fire when p3 was never called
				}
				
				// recapture the current state
				//
				this.sceneState = this.tutorAutoObj["Sq4p1" + this.sType].captureXMLState();
			}
		}			
		// Capture the experimental setup state
		//
		else
		{
			this.sceneState = this.tutorAutoObj["Sq4p1" + this.sType].captureXMLState();
			
			this.fStateCap = true;				
		}			
					
		// the question text based upon selection in q4p1
		//
		this.updateQText(this.tutorAutoObj["Sq4p1" + this.sType]);
		
		return super.preEnterScene(lTutor, sceneLabel, sceneTitle, scenePage, Direction );
	}

	
	public onEnterScene(Direction:string) : void
	{				
		CUtil.trace("TQ4APart2 Enter Scene Behavior:");
		
		// Init the text control
		//
		this.q4TextControl1.setFocus(true);						
	}
	
	
	public preExitScene(Direction:string, sceneCurr:number ) :string
	{				
		CUtil.trace("TQ4APart2 Enter Scene Behavior:");
		
		return("OK");
	}
	
//****** Overridable Behaviors
			
}