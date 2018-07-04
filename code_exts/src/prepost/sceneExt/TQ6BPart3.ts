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
import { CUtil } 				from "util/CUtil";

import MovieClip     		  = createjs.MovieClip;
import Timeline     		  = createjs.Timeline;
import DisplayObject 		  = createjs.DisplayObject;
import DisplayObjectContainer = createjs.Container;
import { TSelectEvent } from "../com/events/TSelectEvent";


export class TQ6BPart3 extends TExpSceneTyp1
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
	public q6FrameC:TLabelControl;
	public q6FrameD:TLabelControl;
	
	//************ Stage Symbols				
	
	
	public fStateCapC:boolean = false;
	public expStateC:any;
	public imgStateC:any;
	
	public fStateCapD:boolean = false;
	public expStateD:any;
	public imgStateD:any;
	
	constructor()
	{
		super();
		
		CUtil.trace("TQ6BPart3:Constructor");
		
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
	
		// Make the controllers unique instances from the q6p1 - q6p2 controllers
		//
		this.imgToolCq6.tweenID = 2;			
		this.imgToolDq6.tweenID = 2;			
		this.tabControllerCq6.tweenID = 2;			
		this.tabControllerDq6.tweenID = 2;						
		
		// Display the changed tab if the image does not match the original
		this.tabControllerCq6.this.useChanged = true;			
		this.tabControllerDq6.this.useChanged = true;						
		
		this.imgToolCq6.addEventListener(TSelectEvent.WOZIMGSELECT,  this.doImageMapA);			
		this.imgToolDq6.addEventListener(TSelectEvent.WOZIMGSELECT,  this.doImageMapB);			
		this.tabControllerCq6.addEventListener(TSelectEvent.WOZTABSELECT,  this.doTabMapA);
		this.tabControllerDq6.addEventListener(TSelectEvent.WOZTABSELECT,  this.doTabMapB);
		
		// Any Changes will cause the panel to complete
		//
		this.tabControllerCq6.addEventListener("Done",  this.questionFinished);			
		this.tabControllerDq6.addEventListener("Done",  this.questionFinished);						
	}
	
//******** Navigation update control		
	
	// Any Changes will cause the panel to complete
	//
	public questionFinished(evt:Event) : void 
	{		
		//@@ Mod Jan 28 2011 - Force them to actually make a change
		//this.updateNavigation(true);
	}

	
	// Any Changes will cause the panel to complete
	//
	public updateNavigation(fFinished:boolean)
	{			
		this.fComplete = fFinished;
		
		// Update the nav based upon the current change state
		//
		this.updateNav();
	}		
	
	public setLabels()
	{				
		var fChanged:boolean = false;
		
		if(!this.tabControllerCq6.compareXMLState(this.expStateC))
		{
			this.q6FrameC.Slabel.text = "C - Changed";
			fChanged = true;
		}
		else	
			this.q6FrameC.Slabel.text = "C";

		if(!this.tabControllerDq6.compareXMLState(this.expStateD))
		{
			this.q6FrameD.Slabel.text = "D - Changed";
								fChanged = true;
		}
		else	
			this.q6FrameD.Slabel.text = "D";									
			
		// Update the nav based upon the current change state
		//
		this.updateNavigation(fChanged);
	}
	
	
//****** Overridden Behaviors


	public doTabMapA(evt:TSelectEvent)
	{
		CUtil.trace(" this.doTabMap: " + evt.selection);
		
		this.setLabels();
		
		super.doTabMapA(evt);
	}

	
	public doTabMapB(evt:TSelectEvent)
	{
		CUtil.trace(" this.doTabMap: " + evt.selection);
		
		this.setLabels();
		
		super.doTabMapB(evt);
	}
	
	
	// Update the Navigation Features on entry
	//
	public preEnterScene(lTutor:any, sceneLabel:string, sceneTitle:string, scenePage:string, Direction:string ) :string
	{
		CUtil.trace("TQ6BPart3 Pre-Enter Scene Behavior: " + sceneTitle);		

		// If the student does not think this is a bad way then skip this panel
		//
		if(!this.tutorAutoObj["Sq6p2" + this.sType].q6Check2.getChecked())
		{
			super.preEnterScene(lTutor, sceneLabel, sceneTitle, scenePage, Direction );
			
			return Direction;
		}
		
		// Capture the experimental setup state
		//
		if(!this.fStateCapC)
		{
			// Connect up the handlers for the cards
			//
			this.imgToolCq6.manageMasks("lightBright");
			this.imgToolCq6.manageMasks("cardIcons");
			this.imgToolCq6.manageMasks("minutesFive");
			
			this.expStateC = this.tutorAutoObj["Sq6p2" + this.sType].tabControllerCq6.captureXMLState();
			this.imgStateC = this.tutorAutoObj["Sq6p2" + this.sType].imgToolCq6.captureXMLState();
			
			this.tabControllerCq6.restoreXMLState(this.expStateC);
			this.imgToolCq6.restoreXMLState(this.imgStateC);
			
			this.fStateCapC = true;				
		}			
		if(!this.fStateCapD)
		{
			// Connect up the handlers for the cards
			//
			this.imgToolDq6.manageMasks("lightBright");
			this.imgToolDq6.manageMasks("cardIcons");
			this.imgToolDq6.manageMasks("minutesFive");			
			
			this.expStateD = this.tutorAutoObj["Sq6p2" + this.sType].tabControllerDq6.captureXMLState();
			this.imgStateD = this.tutorAutoObj["Sq6p2" + this.sType].imgToolDq6.captureXMLState();
			
			this.tabControllerDq6.restoreXMLState(this.expStateD);
			this.imgToolDq6.restoreXMLState(this.imgStateD);
			
			this.fStateCapD = true;				
		}						
		
		// This should only be done once both controller states have been captured
		
		this.setLabels();
		
		// Update the Navigation
		//
		this.updateNavigation(this.fComplete);
		
		return super.preEnterScene(lTutor, sceneLabel, sceneTitle, scenePage, Direction );
	}

	
	public preExitScene(Direction:string, sceneCurr:number ) :string
	{				
		CUtil.trace("TQ6BPart3 Enter Scene Behavior:");
		
		// Maintain global for summative assessment
		
		this.assertGlobal('q6CVS', this.encodeExptString("type of card", "this.sel2", "this.sel1", "this.sel3"));			
		
		
		return("OK");
	}
	
//****** Overridable Behaviors
	
}