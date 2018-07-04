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
import { TDrinkImgTool } 	from "../com/TDrinkImgTool";
import { TDrinkController } from "../com/TDrinkController";
import { TSelectEvent } 	from "../com/events/TSelectEvent";

import { TRoot }			from "thermite/TRoot";
import { TObject }			from "thermite/TObject";
import { TButton }			from "thermite/TButton";
import { TScene }			from "thermite/TScene";
import { TTextInput } 		from "thermite/TTextInput";
import { CUtil } 			from "util/CUtil";

import MovieClip     		  = createjs.MovieClip;
import Timeline     		  = createjs.Timeline;
import DisplayObject 		  = createjs.DisplayObject;
import DisplayObjectContainer = createjs.Container;



export class TQ1APart1B extends TExpSceneTyp2
{
	//************ Stage Symbols
	
	public q1Title1:TObject;
	public q1Title2:TObject;
	public q1Title3:TObject;
	public q1Title4:TObject;
	public q1Title5:TObject;
	public q1Title6:TObject;
	public q1Title7:TObject;
	public q1Title8:TObject;
	
	public q1MarkRight:TObject;
	public q1MarkLeft:TObject;
	
	public q1IFrame1:TObject;
	public q1QFrame1:TObject;
	public q1QFrame2:TObject;
	
	public imgToolAq1:TDrinkImgTool;
	public imgToolBq1:TDrinkImgTool;
	
	public tabControllerAq1:TDrinkController;
	public tabControllerBq1:TDrinkController;
	
	public q1TextControl1:TTextInput;
	
	// non-interactive elements
	
	public q1FrameA:TObject;
	public q1FrameB:TObject;
	
	//************ Stage Symbols				
	
	
	public fCompleteA:boolean = false;
	public fCompleteB:boolean = false;
	
	
	
	constructor()
	{
		super();
		
		CUtil.trace("TQ1APart1B:Constructor");
		
		this.selOneA   = "clockNoon";
		this.selOneB   = "clockThree";
		this.selOneC   = "clockSix";
		this.selTwoA   = "ageYoung";
		this.selTwoB   = "ageOlder";
		this.selThreeA = "drinkLemon";
		this.selThreeB = "drinkTea";
		
		this.imgTool1		= "this.imgToolAq1";
		this.imgTool2		= "this.imgToolBq1";
		this.tabController1	= "this.tabControllerAq1";
		this.tabController2	= "this.tabControllerBq1";
	
		this.imgToolAq1.addEventListener(TSelectEvent.WOZIMGSELECT,  this.doImageMapA);			
		this.imgToolBq1.addEventListener(TSelectEvent.WOZIMGSELECT,  this.doImageMapB);			
		this.tabControllerAq1.addEventListener(TSelectEvent.WOZTABSELECT,  this.doTabMapA);
		this.tabControllerBq1.addEventListener(TSelectEvent.WOZTABSELECT,  this.doTabMapB);				  
		
		this.tabControllerAq1.addEventListener("Done",  this.questionFinishedA);			
		this.tabControllerBq1.addEventListener("Done",  this.questionFinishedB);						
	}

	
	public questionFinishedA(evt:Event)
	{			
		CUtil.trace("#### QuestionA finished");
	
		this.fCompleteA = true;
		
		if(this.fCompleteB)
		{
			this.fComplete = true;
			
			// Update the Navigation
			//
			this.updateNav();
		}
	}
	
	public questionFinishedB(evt:Event)
	{
		CUtil.trace("#### QuestionB finished");
		
		this.fCompleteB = true;
		
		if(this.fCompleteA)
		{
			this.fComplete = true;
			
			// Update the Navigation
			//
			this.updateNav();
		}
	}
			
	
//****** Overridden Behaviors

//*************** Logging state management

	public captureLogState(obj:any = null) : Object
	{
		obj = super.captureLogState(obj);
		
		obj['scene']        = this.name;
		obj['Controller1']  = this.tabControllerAq1.captureLogState();
		obj['Controller2']  = this.tabControllerBq1.captureLogState();
		
		return obj;											   
	}				
			
	public captureXMLState() :any
	{		
		var sceneState:any = {name:this.name}; //<scene name={name}/>;
				
		sceneState.appendChild(this.tabControllerAq1.captureXMLState());
		sceneState.appendChild(this.tabControllerBq1.captureXMLState());
		
		return sceneState;
	}		

	public restoreXMLState(xmlState:any) : void
	{
		this.tabControllerAq1.restoreXMLState(xmlState.controller[0]);
		this.tabControllerBq1.restoreXMLState(xmlState.controller[1]);
	}		
	
	public compareXMLState(xmlState:any) :boolean
	{
		var bTest:boolean = true;
		
		if(!this.tabControllerAq1.compareXMLState(xmlState.controller[0]) ||
			!this.tabControllerBq1.compareXMLState(xmlState.controller[1]))
																bTest = false;			
		return bTest;			
	}		
	
//*************** Logging state management


	public preExitScene(Direction:string, sceneCurr:number ) :string
	{				
		CUtil.trace("TQ1APart1B Enter Scene Behavior:");
		
		// Maintain global for summative assessment
		
		this.assertGlobal('q1CVS', this.encodeExptString("time of day", "this.sel1", "this.sel2", "this.sel3"));
		
		return("OK");
	}
	
//****** Overridable Behaviors
	
}