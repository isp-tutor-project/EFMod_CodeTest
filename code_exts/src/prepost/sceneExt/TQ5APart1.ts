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
import { TSelectEvent } from "../com/events/TSelectEvent";
import { TMouseEvent } from "thermite/events/TMouseEvent";
import { TNavEvent } from "../com/events/TNavEvent";


export class TQ5APart1 extends TExpSceneTyp1
{
	//************ Stage Symbols
	
	public q5Title1:TObject;
	public q5Title2:TObject;
	public q5Title3:TObject;
	public q5Title4:TObject;
	public q5Title5:TObject;
	
	public q5MarkRight:TObject;
	public q5MarkLeft:TObject;
	
	public q5IFrame1:TObject;
	public q5QFrame1:TObject;
	
	public q5DesignButton:TButton;
	
	public imgToolAq5:TStudyImgTool;
	public imgToolBq5:TStudyImgTool;
	
	public tabControllerAq5:TStudyController;
	public tabControllerBq5:TStudyController;
	
	// non-interactive elements
	
	public q5FrameA:TObject;
	public q5FrameB:TObject;
	
	//************ Stage Symbols				
	
	
	public navSkipPanel:boolean = false;

	
	
	constructor()
	{
		super();
		
		CUtil.trace("TQ5APart1:Constructor");
		
		this.selOneA   = "studyAlone";
		this.selOneB   = "studyFriend";
		this.selTwoA   = "atHome";
		this.selTwoB   = "atLibrary";
		this.selThreeA = "drinkWater";
		this.selThreeB = "drinkSoda";
		
		this.imgTool1		= "imgToolAq5";
		this.imgTool2		= "imgToolBq5";
		this.tabController1	= "tabControllerAq5";
		this.tabController2	= "tabControllerBq5";
	
		this.imgToolAq5.addEventListener(TSelectEvent.WOZIMGSELECT,  this.doImageMapA);			
		this.imgToolBq5.addEventListener(TSelectEvent.WOZIMGSELECT,  this.doImageMapB);			
		this.tabControllerAq5.addEventListener(TSelectEvent.WOZTABSELECT,  this.doTabMapA);
		this.tabControllerBq5.addEventListener(TSelectEvent.WOZTABSELECT,  this.doTabMapB);				  						
	}
	
	
	public onGotoDesign(evt:TMouseEvent)
	{
		CUtil.trace("Design Button Click:");
		
		//## Mod 10 10 2012 - inhibit double click on design button - was causing skip directly to partB
		this.q5DesignButton.removeEventListener(TMouseEvent.WOZCLICK, this.onGotoDesign);				
		
		this.fComplete = true;
		
		 this.dispatchEvent(new TNavEvent(TNavEvent.WOZNAVNEXT));
	}
	
	
//****** Overridden Behaviors

	
	// Default behavior - no nothing return same target scene
	// Direction can be - "WOZNEXT" , "WOZBACK" , "WOZGOTO"
	// 
	// return values - label of target scene or one of "WOZNEXT" or "WOZBACK"
	//
	public preEnterScene(Tutor:any, sceneLabel:string, sceneTitle:string, scenePage:string, Direction:string ) :string
	{
		CUtil.trace("TQ1APart1 Pre-Enter Scene Behavior: " + sceneTitle);		

		var navScene:string;
		
		// Set the Tutor Titlebar
		//
		navScene = super.preEnterScene(Tutor, sceneLabel, sceneTitle, scenePage, Direction ); 

		//*** Use this code for trap door navigation on this screen			
		
		// once we progress past this we never come back
		// if we skip this panel then skip going in the same direction
		//
		if(this.fComplete && (Direction != "WOZGOTO"))
										return Direction;

		//*** Use this code for trap door navigation on this screen			

		// listen to the design button from entry
		//## Mod 10 10 2012 - inhibit double click on design button - was causing skip directly to partB
		this.q5DesignButton.addEventListener(TMouseEvent.WOZCLICK, this.onGotoDesign);				
		
		return navScene;
	}

	
	public preExitScene(Direction:string, sceneCurr:number ) :string
	{				
		CUtil.trace("TQ5APart1 Enter Scene Behavior:");			

		return("OK");
	}

	
	
//****** Overridden Behaviors
	
}