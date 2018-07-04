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

import { TExpSceneTyp2 } 		from "./TExpSceneTyp2";
import { TBakingImgTool } 		from "../com/TBakingImgTool";
import { TBakingController } 	from "../com/TBakingController";
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



export class TQ2BPart2 extends TExpSceneTyp2
{
	//************ Stage Symbols
	
	public q2Title1:TObject;
	public q2Title2:TObject;
	public q2Title3:TObject;
	public q2Title4:TLabelControl;
	public q2Title5:TObject;
	public q2Title6:TObject;
	public q2Title7:TLabelControl;
	
	public q2MarkRight:TObject;
	public q2MarkLeft:TObject;
	
	public q2IFrame1:TObject;
	public q2QFrame1:TObject;
	
	public q2DesignButton:TButton;
	
	public imgToolCq2:TBakingImgTool;
	public imgToolDq2:TBakingImgTool;
	
	public tabControllerCq2:TBakingController;
	public tabControllerDq2:TBakingController;
	
	public q2TextControl1:TTextInput;
	
	public q2Check1:TCircleControl;
	public q2Check2:TCircleControl;
	
	// non-interactive elements
	
	public q2Arrow1:TObject;
	
	public q2FrameA:TObject;
	public q2FrameB:TObject;
	public q2FrameC:TObject;
	public q2FrameD:TObject;
	
	//************ Stage Symbols				
	
	
	public fStateCap:boolean = false;
	public sceneState:any;
					
	constructor()
	{
		super();
		
		CUtil.trace("TQ2BPart2:Constructor");

		this.selOneA   = "temp200";
		this.selOneB   = "temp350";
		this.selOneC   = "temp500";
		this.selTwoA   = "honey";
		this.selTwoB   = "sugar";
		this.selThreeA = "oneEgg";
		this.selThreeB = "threeEgg";
		
		this.imgTool1		= "imgToolCq2";
		this.imgTool2		= "imgToolDq2";
		this.tabController1	= "tabControllerCq2";
		this.tabController2	= "tabControllerDq2";
	
		// Disable the controllers
		//
		this.imgToolCq2.enableTool(false);			
		this.tabControllerCq2.enableTool(false);			
		this.imgToolDq2.enableTool(false);			
		this.tabControllerDq2.enableTool(false);			
		
		// Disable the circle checkbuttons
		//
		this.this.q2Check1.enableButton(false);
		this.this.q2Check2.enableButton(false);
		
		// Set the button labels
		//
		this.this.q2Check2.setLabel("Bad Way");			
		
		// Init the text control
		//
		this.q2TextControl1.StxtField.addEventListener(TTextEvent.CHANGE,  this.questionFinished);			
	}
	
//******** Navigation update control		
	
	
	public checkChange(evt:Event)
	{
		this.q2TextControl1.wozClear();
		
		this.updateQText(this);
		
		this.fComplete = false;
		
		// Update the navigation buttons
		//
		this.updateNav();
	}

	
	public questionFinished(evt:Event) : void 
	{
		if((this.q2Check1.getChecked() || this.q2Check2.getChecked()) && this.q2TextControl1.hasMinWords(2,9)) this.fComplete = true;
																							else this.fComplete = false;
		
		// Update the Navigation
		//
		this.updateNav();
	}
	

	public updateQText(wozScene:TScene )
	{
		if(wozScene["this.q2Check1"].getChecked())
		{
			if(wozScene["this.q2Check2"].getChecked())
			{
			this.q2Title4.Slabel.text = "You said the pictures above show a good and bad way to find out";
			this.q2Title7.Slabel.text = "Briefly explain why you think this is a good and bad way.";
			}
			else
			{
			this.q2Title4.Slabel.text = "You said the pictures above show a good way to find out";
			this.q2Title7.Slabel.text = "Briefly explain why you think this is a good way.";
			}
		}
		else if(wozScene["this.q2Check2"].getChecked())
		{
		this.q2Title4.Slabel.text = "You said the pictures above show a bad way to find out";
		this.q2Title7.Slabel.text = "Briefly explain why you think this is a bad way.";
		}
		
		// below only used with live buttons which is no longer the case - May 12 2008
//			else
//			{
//				this.q2Title4.Slabel.text = "Do you think this a a good way or a bad way";						
//				this.q2Title7.Slabel.text = "Briefly explain why you think this is a good way";
//			}
	}
	
	
//****** Overridden Behaviors


	// Update the Navigation Features on entry
	//
	public preEnterScene(lTutor:any, sceneLabel:string, sceneTitle:string, scenePage:string, Direction:string ) :string
	{
		CUtil.trace("TQ2BPart2 Pre-Enter Scene Behavior: " + sceneTitle);		

		// If they have previously made a decision check if it changed
		// If so clear there previous response
		//
		if(this.fStateCap)
		{
			if(!this.tutorAutoObj["Sq2p1" + this.sType].compareXMLState(this.sceneState))																 
			{
				CUtil.trace("State Changed: clearing text");

				// Note we clear the text box on q2p1 as it will be copied into
				// the q1p2 text box
				//
				this.tutorAutoObj["Sq2p1" + this.sType].q2TextControl1.wozClear();
				this.tutorAutoObj["Sq2p2" + this.sType].q2TextControl1.wozClear();
				this.fComplete = false;
				
				// Note we clear the q2p3 flags which resets user changes 
				// and recaptures the initial state
				//
				try
				{
					this.tutorAutoObj["Sq2p3" + this.sType].this.fStateCapC = false;
					this.tutorAutoObj["Sq2p3" + this.sType].this.fStateCapD = false;							
				}
				catch(err)
				{
					// This will fire when p3 was never called
				}
				
				// recapture the current state
				//
				this.sceneState = this.tutorAutoObj["Sq2p1" + this.sType].captureXMLState();
			}
		}			
		// Capture the experimental setup state
		//
		else
		{
			this.sceneState = this.tutorAutoObj["Sq2p1" + this.sType].captureXMLState();
			this.fStateCap = true;				
		}			
					
		// the question text based upon selection in q2p1
		//
		this.updateQText(this.tutorAutoObj["Sq2p1" + this.sType]);
					
		return super.preEnterScene(lTutor, sceneLabel, sceneTitle, scenePage, Direction );
	}

	
	public onEnterScene(Direction:string) : void
	{				
		CUtil.trace("TQ2BPart2 Enter Scene Behavior:");
		
		// Init the text control
		//
		this.q2TextControl1.setFocus(true);						
	}
	
	
	public preExitScene(Direction:string, sceneCurr:number ) :string
	{				
		CUtil.trace("TQ2BPart2 Enter Scene Behavior:");
		
		return("OK");
	}
	
//****** Overridable Behaviors
					
}