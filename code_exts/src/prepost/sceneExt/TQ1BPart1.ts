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

import { TExpSceneTyp2 } 	from "./TExpSceneTyp2";
import { TBakingImgTool } 	from "../com/TBakingImgTool";
import { TBakingController} from "../com/TBakingController";
import { TSelectEvent } 	from "../com/events/TSelectEvent";
import { TNavEvent } 		from "../com/events/TNavEvent";

import { TRoot }			from "thermite/TRoot";
import { TObject }			from "thermite/TObject";
import { TButton }			from "thermite/TButton";
import { TScene }			from "thermite/TScene";
import { TTextInput } 		from "thermite/TTextInput";
import { TMouseEvent } 		from "thermite/events/TMouseEvent";
import { CUtil } 			from "util/CUtil";

import MovieClip     		  = createjs.MovieClip;
import Timeline     		  = createjs.Timeline;
import DisplayObject 		  = createjs.DisplayObject;
import DisplayObjectContainer = createjs.Container;



export class TQ1BPart1 extends TExpSceneTyp2
{
	//************ Stage Symbols
	
	public q1Title1:TObject;
	public q1Title2:TObject;
	public q1Title3:TObject;
	public q1Title4:TObject;
	public q1Title5:TObject;
	
	public q1MarkRight:TObject;
	public q1MarkLeft:TObject;
	
	public q1IFrame1:TObject;
	public q1QFrame1:TObject;
	
	public q1DesignButton:TButton;
	
	public imgToolAq1:TBakingImgTool;
	public imgToolBq1:TBakingImgTool;
	
	public tabControllerAq1:TBakingController;
	public tabControllerBq1:TBakingController;
	
	// non-interactive elements
	
	public q1FrameA:TObject;
	public q1FrameB:TObject;
	
	//************ Stage Symbols				
	
	
	public navSkipPanel:boolean = false;
	
	
	
	constructor()
	{
		super();
		
		CUtil.trace("TQ1BPart1:Constructor");
		
		this.selOneA   = "temp200";
		this.selOneB   = "temp350";
		this.selOneC   = "temp500";
		this.selTwoA   = "honey";
		this.selTwoB   = "sugar";
		this.selThreeA = "oneEgg";
		this.selThreeB = "threeEgg";
		
		this.imgTool1		= "this.imgToolAq1";
		this.imgTool2		= "this.imgToolBq1";
		this.tabController1	= "this.tabControllerAq1";
		this.tabController2	= "this.tabControllerBq1";
	
		this.imgToolAq1.addEventListener(TSelectEvent.WOZIMGSELECT,  this.doImageMapA);			
		this.imgToolBq1.addEventListener(TSelectEvent.WOZIMGSELECT,  this.doImageMapB);			
		this.tabControllerAq1.addEventListener(TSelectEvent.WOZTABSELECT,  this.doTabMapA);
		this.tabControllerBq1.addEventListener(TSelectEvent.WOZTABSELECT,  this.doTabMapB);				  
	}
	
	
	public onGotoDesign(evt:TMouseEvent)
	{
		CUtil.trace("Design Button Click:");
		
		//## Mod 10 10 2012 - inhibit double click on design button - was causing skip directly to partB
		this.q1DesignButton.removeEventListener(TMouseEvent.WOZCLICK, this.onGotoDesign);				
		
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
		
/*			// once we progress past this we never come back
		// if we skip this panel then skip going in the same direction
		//
		if(navSkipPanel && (Direction != "WOZGOTO"))
										return Direction;
*/
		//*** Use this code for trap door navigation on this screen			

		// listen to the design button from entry
		//## Mod 10 10 2012 - inhibit double click on design button - was causing skip directly to partB
		this.q1DesignButton.addEventListener(TMouseEvent.WOZCLICK, this.onGotoDesign);				
		
		return navScene;
	}

	
	public preExitScene(Direction:string, sceneCurr:number ) :string
	{				
		CUtil.trace("TQ1BPart1 Enter Scene Behavior:");			

		return("OK");
	}

	
	
//****** Overridden Behaviors
	
}