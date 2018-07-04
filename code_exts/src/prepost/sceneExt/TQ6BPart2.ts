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
import { TMemoryImgTool } 		from "../com/TMemoryImgTool";
import { TMemoryController } 	from "../com/TMemoryController";
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



export class TQ6BPart2 extends TExpSceneTyp1
{
	//************ Stage Symbols
	
	public q6Title1:TObject;
	public q6Title2:TObject;
	public q6Title3:TObject;
	public q6Title4:TLabelControl;
	public q6Title5:TObject;
	public q6Title6:TObject;
	public q6Title7:TLabelControl;
	
	public q6MarkRight:TObject;
	public q6MarkLeft:TObject;
	
	public q6IFrame1:TObject;
	public q6QFrame1:TObject;
	
	public q6DesignButton:TButton;
	
	public imgToolCq6:TMemoryImgTool;
	public imgToolDq6:TMemoryImgTool;
	
	public tabControllerCq6:TMemoryController;
	public tabControllerDq6:TMemoryController;
	
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
	
	
	public fStateCap:boolean = false;
	public sceneState:any;
					
	constructor()
	{
		super();
		
		CUtil.trace("TQ6BPart2:Constructor");

		this.selOneA   = "lightBright";
		this.selOneB   = "lightDim";
		this.selTwoA   = "cardIcons";
		this.selTwoB   = "cardWords";
		this.selThreeA = "minutesOne";
		this.selThreeB = "minutesFive";
		
		this.imgTool1		= "imgToolCq6";
		this.imgTool2		= "imgToolDq6";
		this.tabController1	= "tabControllerCq6";
		this.tabController2	= "tabControllerDq6";
	
		// Disable the controllers
		//
		this.imgToolCq6.enableTool(false);			
		this.tabControllerCq6.enableTool(false);			
		this.imgToolDq6.enableTool(false);			
		this.tabControllerDq6.enableTool(false);			
		
		// Disable the circle checkbuttons
		//
	this.q6Check1.enableButton(false);
	this.q6Check2.enableButton(false);
		
		// Set the button labels
		//
	this.q6Check2.setLabel("Bad Way");			
		
		// Init the text control
		//
		this.q6TextControl1.StxtField.addEventListener(TTextEvent.CHANGE,  this.questionFinished);			
	}
	
//******** Navigation update control		
	
	
	public checkChange(evt:Event)
	{
		this.q6TextControl1.wozClear();
		
		this.updateQText(this);
		
		this.fComplete = false;
		
		// Update the nav based upon the current change state
		//
		this.updateNav();			
	}

	
	public questionFinished(evt:Event) : void 
	{
		if((this.q6Check1.getChecked()|| this.q6Check2.getChecked()) && this.q6TextControl1.hasMinWords(2,9)) this.fComplete = true;
																							else this.fComplete = false;			
		// Update the Navigation
		//
		this.updateNav();
	}
	

	public updateQText(wozScene:TScene )
	{
		if(wozScene["q6Check1"].getChecked())
		{
			if(wozScene["q6Check2"].getChecked())
			{
			this.q6Title4.Slabel.text = "You said the pictures above show a good and bad way to find out";
			this.q6Title7.Slabel.text = "Briefly explain why you think this is a good and bad way.";
			}
			else
			{
			this.q6Title4.Slabel.text = "You said the pictures above show a good way to find out";
			this.q6Title7.Slabel.text = "Briefly explain why you think this is a good way.";
			}
		}
		else if(wozScene["q6Check2"].getChecked())
		{
		this.q6Title4.Slabel.text = "You said the pictures above show a bad way to find out";
		this.q6Title7.Slabel.text = "Briefly explain why you think this is a bad way.";
		}
		
		// below only used with live buttons which is no longer the case - May 12 2008
//			else
//			{
//				this.q6Title4.Slabel.text = "Do you think this a a good way or a bad way";						
//				this.q6Title7.Slabel.text = "Briefly explain why you think this is a good way";
//			}
	}
	
	
//****** Overridden Behaviors


	// Update the Navigation Features on entry
	//
	public preEnterScene(lTutor:any, sceneLabel:string, sceneTitle:string, scenePage:string, Direction:string ) :string
	{
		CUtil.trace("TQ6BPart2 Pre-Enter Scene Behavior: " + sceneTitle);		

		// If they have previously made a decision check if it changed
		// If so clear there previous response
		//
		if(this.fStateCap)
		{
			if(!this.tutorAutoObj["Sq6p1" + this.sType].compareXMLState(this.sceneState))																 
			{
				CUtil.trace("State Changed: clearing text");

				// Note we clear the text box on q6p1 as it will be copied into
				// the q1p2 text box
				//
				this.tutorAutoObj["Sq6p1" + this.sType].q6TextControl1.wozClear();
				this.tutorAutoObj["Sq6p2" + this.sType].q6TextControl1.wozClear();
				this.fComplete = false;
				
				// Note we clear the q6p3 flags which resets user changes 
				// and recaptures the initial state
				//
				try
				{
					this.tutorAutoObj["Sq6p3" + this.sType].this.fStateCapC = false;
					this.tutorAutoObj["Sq6p3" + this.sType].this.fStateCapD = false;							
				}
				catch(err)
				{
					// This will fire when p3 was never called
				}
				
				// recapture the current state
				//
				this.sceneState = this.tutorAutoObj["Sq6p1" + this.sType].captureXMLState();
			}
		}			
		// Capture the experimental setup state
		//
		else
		{
			this.sceneState = this.tutorAutoObj["Sq6p1" + this.sType].captureXMLState();
			this.fStateCap = true;				
		}			
					
		// the question text based upon selection in q6p1
		//
		this.updateQText(this.tutorAutoObj["Sq6p1" + this.sType]);
		
		return super.preEnterScene(lTutor, sceneLabel, sceneTitle, scenePage, Direction );
	}

	
	public onEnterScene(Direction:string) : void
	{				
		CUtil.trace("TQ6BPart2 Enter Scene Behavior:");
		
		// Init the text control
		//
		this.q6TextControl1.setFocus(true);						
	}
	
	
	public preExitScene(Direction:string, sceneCurr:number ) :string
	{				
		CUtil.trace("TQ6BPart2 Enter Scene Behavior:");
		
		return("OK");
	}
	
//****** Overridable Behaviors
					
}