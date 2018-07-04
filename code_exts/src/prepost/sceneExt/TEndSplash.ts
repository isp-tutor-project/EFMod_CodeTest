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

import { TMouseEvent } from "thermite/events/TMouseEvent";
import { TNavEvent } from "../com/events/TNavEvent";

import { TRoot }		from "thermite/TRoot";
import { TObject }		from "thermite/TObject";
import { TButton } 		from "thermite/TButton";
import { TScene }		from "thermite/TScene";
import { CUtil } 		from "util/CUtil";

import MovieClip     		  = createjs.MovieClip;
import Timeline     		  = createjs.Timeline;
import DisplayObject 		  = createjs.DisplayObject;
import DisplayObjectContainer = createjs.Container;



export class TEndSplash extends TScene
{
	//************ Stage Symbols
	
	public SdoneButton:TButton;		
	
	// non-interactive elements
	
	
	//************ Stage Symbols				
	
			
	constructor()
	{
		super();
		
		CUtil.trace("TEndSplash:Constructor");
		
		this.SdoneButton.addEventListener(TMouseEvent.WOZCLICK, this.onDoneClick);
	}				
			
	public onDoneClick(evt:Event) : void
	{
		this.SdoneButton.removeEventListener(TMouseEvent.WOZCLICK, this.onDoneClick);
		this.SdoneButton.enableButton(false);
		
		// Goto the end Cloak panel
		//
		 this.dispatchEvent(new TNavEvent(TNavEvent.WOZNAVNEXT));
	}										

	
	
	public get assessCorrect() :string
	{
		var _assessCorrect:number = 0;
		
		if((this.queryGlobal('q2Good') == "unchecked") && (this.queryGlobal('q2Bad')  == "checked"))
		{
			_assessCorrect++;
		}
		
		//--
		
		if((this.queryGlobal('q4Good') == "unchecked") && (this.queryGlobal('q4Bad')  == "checked"))
		{
			_assessCorrect++;
		}
		
		//--
		
		if((this.queryGlobal('q6Good') == "unchecked") && (this.queryGlobal('q6Bad')  == "checked"))
		{
			_assessCorrect++;
		}
		
		return _assessCorrect.toString();
	}
	
	public get designCorrect() :string
	{
		var _designCorrect:number = 0;
		
		if(this.queryGlobal('q1CVS') == "CVS") 
		{
			_designCorrect++;
		}
		
		//--
		
		if(this.queryGlobal('q2CVS') == "CVS") 
		{
			_designCorrect++;
		}
		
		//--
		
		if(this.queryGlobal('q3CVS') == "CVS") 
		{
			_designCorrect++;
		}
		
		//--
		
		if(this.queryGlobal('q4CVS') == "CVS") 
		{
			_designCorrect++;
		}
		
		//--
		
		if(this.queryGlobal('q5CVS') == "CVS") 
		{
			_designCorrect++;
		}
		
		//--
		
		if(this.queryGlobal('q6CVS') == "CVS") 
		{
			_designCorrect++;
		}
		
		return _designCorrect.toString();
	}
	
//****** Overridden Behaviors


	// Update the Navigation Features on entry
	//
	public preEnterScene(lTutor:any, sceneLabel:string, sceneTitle:string, scenePage:string, Direction:string ) :string
	{
		CUtil.trace("TEndSplash Pre-Enter Scene Behavior: " + sceneTitle);		
		
		// Update the Navigation
		//
		this.tutorAutoObj["sNavPanel"].$enableNext(false);		
		this.tutorAutoObj["sNavPanel"].$enableBack(false);																		
		
		return super.preEnterScene(lTutor, sceneLabel, sceneTitle, scenePage, Direction );
	}


	public preExitScene(Direction:string, sceneCurr:number ) :string
	{				
		CUtil.trace("TEndSplash Exit Scene Behavior:");
		
		// Maintain global for summative assessment
		
		this.assertGlobal('Correct_Designs'    , this.designCorrect);
		this.assertGlobal('Correct_Assessments', this.assessCorrect);
		
		return("OK");
	}
	
	
	
//****** Overridable Behaviors
			
}