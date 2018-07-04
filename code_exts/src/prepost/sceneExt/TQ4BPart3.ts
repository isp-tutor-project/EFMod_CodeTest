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
import { TCarsImgTool } 		from "../com/TCarsImgTool";
import { TCarsController } 		from "../com/TCarsController";
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



export class TQ4BPart3 extends TExpSceneTyp1
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
	
	public imgToolCq4:TCarsImgTool;
	public imgToolDq4:TCarsImgTool;
	
	public tabControllerCq4:TCarsController;
	public tabControllerDq4:TCarsController;
	
	public q4TextControl1:TTextInput;
	
	public q4Check1:TCircleControl;
	public q4Check2:TCircleControl;
	
	// non-interactive elements
	
	public q4Arrow1:TObject;
	
	public q4FrameA:TObject;
	public q4FrameB:TObject;
	public q4FrameC:TLabelControl;
	public q4FrameD:TLabelControl;
	
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
		
		CUtil.trace("TQ4BPart3:Constructor");
		
		this.selOneA   = "topClosed";
		this.selOneB   = "topOpen";
		this.selTwoA   = "doorsTwo";
		this.selTwoB   = "doorsFour";
		this.selThreeA = "tiresLarge";
		this.selThreeB = "tiresSmall";
		
		this.imgTool1		= "imgToolCq4";
		this.imgTool2		= "imgToolDq4";
		this.tabController1	= "tabControllerCq4";
		this.tabController2	= "tabControllerDq4";
	
		// Make the controllers unique instances from the q4p1 - q4p2 controllers
		//
		this.imgToolCq4.tweenID = 2;			
		this.imgToolDq4.tweenID = 2;			
		this.tabControllerCq4.tweenID = 2;			
		this.tabControllerDq4.tweenID = 2;						
		
		// Display the changed tab if the image does not match the original
		this.tabControllerCq4.this.useChanged = true;			
		this.tabControllerDq4.this.useChanged = true;						
					
		this.imgToolCq4.addEventListener(TSelectEvent.WOZIMGSELECT,  this.doImageMapA);			
		this.imgToolDq4.addEventListener(TSelectEvent.WOZIMGSELECT,  this.doImageMapB);			
		this.tabControllerCq4.addEventListener(TSelectEvent.WOZTABSELECT,  this.doTabMapA);
		this.tabControllerDq4.addEventListener(TSelectEvent.WOZTABSELECT,  this.doTabMapB);			
													
		// Any Changes will cause the panel to complete
		//
		this.tabControllerCq4.addEventListener("Done",  this.questionFinished);			
		this.tabControllerDq4.addEventListener("Done",  this.questionFinished);						
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
				
		// Update the Navigation
		//
		this.updateNav();
	}		
	
	public setLabels()
	{				
		var fChanged:boolean = false;
		
		if(!this.tabControllerCq4.compareXMLState(this.expStateC))
		{
			this.q4FrameC.Slabel.text = "C - Changed";
			fChanged = true;
		}
		else	
			this.q4FrameC.Slabel.text = "C";

		if(!this.tabControllerDq4.compareXMLState(this.expStateD))
		{
			this.q4FrameD.Slabel.text = "D - Changed";
								fChanged = true;
		}
		else	
			this.q4FrameD.Slabel.text = "D";									
			
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
		CUtil.trace("TQ4BPart3 Pre-Enter Scene Behavior: " + sceneTitle);		

		// If the student does not think this is a bad way then skip this panel
		//
		if(!this.tutorAutoObj["Sq4p2" + this.sType].q4Check2.getChecked())
		{
			super.preEnterScene(lTutor, sceneLabel, sceneTitle, scenePage, Direction );
			
			return Direction;
		}
		
		// Capture the experimental setup state
		//
		if(!this.fStateCapC)
		{
			this.expStateC = this.tutorAutoObj["Sq4p2" + this.sType].tabControllerCq4.captureXMLState();
			this.imgStateC = this.tutorAutoObj["Sq4p2" + this.sType].imgToolCq4.captureXMLState();
			
			this.tabControllerCq4.restoreXMLState(this.expStateC);
			this.imgToolCq4.restoreXMLState(this.imgStateC);
			
			this.fStateCapC = true;				
		}			
		if(!this.fStateCapD)
		{
			this.expStateD = this.tutorAutoObj["Sq4p2" + this.sType].tabControllerDq4.captureXMLState();
			this.imgStateD = this.tutorAutoObj["Sq4p2" + this.sType].imgToolDq4.captureXMLState();
			
			this.tabControllerDq4.restoreXMLState(this.expStateD);
			this.imgToolDq4.restoreXMLState(this.imgStateD);
			
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
		CUtil.trace("TQ4BPart3 Enter Scene Behavior:");
		
		// Maintain global for summative assessment
		
		this.assertGlobal('q4CVS', this.encodeExptString("number of doors", "this.sel2", "this.sel1", "this.sel3"));						
		
		return("OK");
	}
	
//****** Overridable Behaviors
	
}