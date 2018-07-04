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



export class TQ3APart2 extends TExpSceneTyp1
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
	
	
	public fStateCap:boolean = false;
	public expState:any;
	
	
	
	constructor()
	{
		super();
		
		CUtil.trace("TQ3APart2:Constructor");
		
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

		// Disable the controllers
		//
		this.imgToolAq3.enableTool(false);			
		this.imgToolBq3.enableTool(false);			
		this.tabControllerAq3.enableTool(false);			
		this.tabControllerBq3.enableTool(false);						
		
		// Init the text control
		//
		this.q3TextControl1.StxtField.addEventListener(TTextEvent.CHANGE,  this.questionFinished);
	}
			
			
//******** Navigation update control		
	
	public questionFinished(evt:Event) : void 
	{
		if(this.q3TextControl1.hasMinWords(2,9)) this.fComplete = true;
										else this.fComplete = false;			
		// Update the Navigation
		//
		this.updateNav();
	}
							
//****** Overridden Behaviors


	// Update the Navigation Features on entry
	//
	public preEnterScene(lTutor:any, sceneLabel:string, sceneTitle:string, scenePage:string, Direction:string ) :string
	{
		CUtil.trace("TQ3APart2 Pre-Enter Scene Behavior: " + sceneTitle);		
		
		// If they have previously made a decision check if it changed
		// If so clear there previous response
		//
		if(this.fStateCap)
		{
			if(!this.tutorAutoObj["Sq3p1b" + this.sType].compareXMLState(this.expState))																 
			{
				CUtil.trace("State Changed: clearing text");
				
				// Note we clear the text box on q3p1b as it will be copied into
				// the q3p2 text box
				//
				this.tutorAutoObj["Sq3p1b" + this.sType].q3TextControl1.wozClear();
				this.fComplete = false;
				
				// recapture the current state
				//
				this.expState = this.tutorAutoObj["Sq3p1b" + this.sType].captureXMLState();
			}
		}			
		// Capture the experimental setup state
		//
		else
		{
			this.expState = this.tutorAutoObj["Sq3p1b" + this.sType].captureXMLState();
			this.fStateCap = true;				
		}			
														
		return super.preEnterScene(lTutor, sceneLabel, sceneTitle, scenePage, Direction );
	}
	
	
	public onEnterScene(Direction:string) : void
	{				
		CUtil.trace("TQ3APart2 Enter Scene Behavior:");
		
		// Init the text control
		//
		this.q3TextControl1.setFocus(true);						
	}

	
	public preExitScene(Direction:string, sceneCurr:number ) :string
	{				
		CUtil.trace("TQ3APart2 Enter Scene Behavior:");
		
		return("OK");
	}
	
//****** Overridable Behaviors
	
}