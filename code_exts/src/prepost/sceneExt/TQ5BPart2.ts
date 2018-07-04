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



export class TQ5BPart2 extends TExpSceneTyp1
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
	
	public imgToolAq5:TMemoryImgTool;
	public imgToolBq5:TMemoryImgTool;
	
	public tabControllerAq5:TMemoryController;
	public tabControllerBq5:TMemoryController;
	
	public q5TextControl1:TTextInput;
	
	// non-interactive elements
	
	public q5FrameA:TObject;
	public q5FrameB:TObject;
	
	//************ Stage Symbols				
	
	
	public fStateCap:boolean = false;
	public expState:any = {};
	

	
	constructor()
	{
		super();
		
		CUtil.trace("TQ5BPart2:Constructor");
		
		this.selOneA   = "lightBright";
		this.selOneB   = "lightDim";
		this.selTwoA   = "cardIcons";
		this.selTwoB   = "cardWords";
		this.selThreeA = "minutesOne";
		this.selThreeB = "minutesFive";
				
		this.imgTool1		= "imgToolAq5";
		this.imgTool2		= "imgToolBq5";
		this.tabController1	= "tabControllerAq5";
		this.tabController2	= "tabControllerBq5";

		// Disable the controllers
		//
		this.imgToolAq5.enableTool(false);			
		this.imgToolBq5.enableTool(false);			
		this.tabControllerAq5.enableTool(false);			
		this.tabControllerBq5.enableTool(false);						
		
		// Init the text control
		//
		this.q5TextControl1.StxtField.addEventListener(TTextEvent.CHANGE, this.questionFinished);
	}
						
			
//******** Navigation update control		
	
	public questionFinished(evt:Event) : void 
	{
		if(this.q5TextControl1.hasMinWords(2,9)) this.fComplete = true;
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
		CUtil.trace("TQ5BPart2 Pre-Enter Scene Behavior: " + sceneTitle);		
		
		// If they have previously made a decision check if it changed
		// If so clear there previous response
		//
		if(this.fStateCap)
		{
			if(!this.tutorAutoObj["Sq5p1b" + this.sType].compareXMLState(this.expState))																 
			{
				CUtil.trace("State Changed: clearing text");

				// Note we clear the text box on q5p1b as it will be copied into
				// the q5p2 text box
				//
				this.tutorAutoObj["Sq5p1b" + this.sType].q5TextControl1.wozClear();
				this.fComplete = false;
				
				// recapture the current state
				//
				this.expState = this.tutorAutoObj["Sq5p1b" + this.sType].captureXMLState();
			}
		}			
		// Capture the experimental setup state
		//
		else
		{
			this.expState = this.tutorAutoObj["Sq5p1b" + this.sType].captureXMLState();
			this.fStateCap = true;				
		}			
		
		return super.preEnterScene(lTutor, sceneLabel, sceneTitle, scenePage, Direction );
	}
	
	
	public onEnterScene(Direction:string) : void
	{				
		CUtil.trace("TQ5BPart2 Enter Scene Behavior:");
		
		// Init the text control
		//
		this.q5TextControl1.setFocus(true);						
	}

	
	public preExitScene(Direction:string, sceneCurr:number ) :string
	{				
		CUtil.trace("TQ5BPart2 Enter Scene Behavior:");
		
		return("OK");
	}
	
//****** Overridable Behaviors
	
}