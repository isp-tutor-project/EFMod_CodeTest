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
import { CUtil } 				from "util/CUtil";

import MovieClip     		  = createjs.MovieClip;
import Timeline     		  = createjs.Timeline;
import DisplayObject 		  = createjs.DisplayObject;
import DisplayObjectContainer = createjs.Container;
import { TSelectEvent } from "../com/events/TSelectEvent";



export class TQ2BPart3 extends TExpSceneTyp2
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
	public q2FrameC:TLabelControl;
	public q2FrameD:TLabelControl;
	
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
		
		CUtil.trace("TQ2BPart3:Constructor");
		
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
	
		// Make the controllers unique instances from the q2p1 - q2p2 controllers
		//
		this.imgToolCq2.tweenID = 2;			
		this.imgToolDq2.tweenID = 2;			
		this.tabControllerCq2.tweenID = 2;			
		this.tabControllerDq2.tweenID = 2;						
		
		// Display the changed tab if the image does not match the original
		this.tabControllerCq2.this.useChanged = true;			
		this.tabControllerDq2.this.useChanged = true;						
		
		this.imgToolCq2.addEventListener(TSelectEvent.WOZIMGSELECT,  this.doImageMapA);			
		this.imgToolDq2.addEventListener(TSelectEvent.WOZIMGSELECT,  this.doImageMapB);			
		this.tabControllerCq2.addEventListener(TSelectEvent.WOZTABSELECT,  this.doTabMapA);
		this.tabControllerDq2.addEventListener(TSelectEvent.WOZTABSELECT,  this.doTabMapB);
							
		// Any Changes will cause the panel to complete
		//
		this.tabControllerCq2.addEventListener("Done",  this.questionFinished);			
		this.tabControllerDq2.addEventListener("Done",  this.questionFinished);						
	}
	
//******** Navigation update control		
	
	// Any Changes will cause the panel to complete
	//
	public questionFinished(evt:Event) : void 
	{		
		//@@ Mod Jan 28 2011 - Force them to actually make a change
		//this.updateNavigation(true);
	}

	
	public setLabels()
	{				
		var fChanged:boolean = false;
		
		if(!this.tabControllerCq2.compareXMLState(this.expStateC))
		{
			this.q2FrameC.Slabel.text = "C - Changed";
			fChanged = true;
		}
		else	
		this.q2FrameC.Slabel.text = "C";

		if(!this.tabControllerDq2.compareXMLState(this.expStateD))
		{
			this.q2FrameD.Slabel.text = "D - Changed";
								fChanged = true;
		}
		else	
			this.q2FrameD.Slabel.text = "D";									
			
		// Update the nav based upon the current change state
		//
		this.fComplete = fChanged;
		
		this.updateNav();
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
		CUtil.trace("TQ2BPart3 Pre-Enter Scene Behavior: " + sceneTitle);		

		// If the student does not think this is a bad way then skip this panel
		//
		if(!this.tutorAutoObj["Sq2p2" + this.sType].q2Check2.getChecked())
		{
			super.preEnterScene(lTutor, sceneLabel, sceneTitle, scenePage, Direction );
			
			return Direction;
		}
		
		// Capture the experimental setup state
		//
		if(!this.fStateCapC)
		{
			this.expStateC = this.tutorAutoObj["Sq2p2" + this.sType].tabControllerCq2.captureXMLState();
			this.imgStateC = this.tutorAutoObj["Sq2p2" + this.sType].imgToolCq2.captureXMLState();
			
			this.tabControllerCq2.restoreXMLState(this.expStateC);
			this.imgToolCq2.restoreXMLState(this.imgStateC);
			
			this.fStateCapC = true;				
		}			
		if(!this.fStateCapD)
		{
			this.expStateD = this.tutorAutoObj["Sq2p2" + this.sType].tabControllerDq2.captureXMLState();
			this.imgStateD = this.tutorAutoObj["Sq2p2" + this.sType].imgToolDq2.captureXMLState();
			
			this.tabControllerDq2.restoreXMLState(this.expStateD);
			this.imgToolDq2.restoreXMLState(this.imgStateD);
			
			this.fStateCapD = true;				
		}						
		
		// This should only be done once both controller states have been captured
		this.setLabels();
		
		// Update the Navigation
		//
		this.updateNav();
		
		return super.preEnterScene(lTutor, sceneLabel, sceneTitle, scenePage, Direction );
	}

	
	public preExitScene(Direction:string, sceneCurr:number ) :string
	{				
		CUtil.trace("TQ2BPart3 Enter Scene Behavior:");
		
		// Maintain global for summative assessment
		
		this.assertGlobal('q2CVS', this.encodeExptString("number of eggs", "this.sel3", "this.sel1", "this.sel2"));
		
		return("OK");
	}
	
//****** Overridable Behaviors
	
}