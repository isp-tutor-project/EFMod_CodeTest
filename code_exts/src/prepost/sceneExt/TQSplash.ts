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

import { TRoot }		from "thermite/TRoot";
import { TObject }		from "thermite/TObject";
import { TScene }		from "thermite/TScene";
import { CUtil } 		from "util/CUtil";

import MovieClip     		  = createjs.MovieClip;
import Timeline     		  = createjs.Timeline;
import DisplayObject 		  = createjs.DisplayObject;
import DisplayObjectContainer = createjs.Container;
import Text					  = createjs.Text;
import { CTimerEvent } from "events/CTimerEvent";
import { TNavEvent } from "../com/events/TNavEvent";
import { CEFTimer } from "core/CEFTimer";



export class TQSplash extends TScene
{
	//************ Stage Symbols
	
	public StitleText:Text;
	
	public SplashFrame1:TObject;
	public SplashFrameShadow:TObject;		
	
	public QMarkSplash:TObject;
	public QMarkSplashShadow:TObject;
	
	// non-interactive elements
	
	
	//************ Stage Symbols				
	
	
	
	constructor()
	{
		super();
		
		CUtil.trace("TQSplash:Constructor");
	}
	

		
	public timerHandler(event:CTimerEvent):void
	{
		CUtil.trace("TQSplash timerHandler: " + event);
		
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
		CUtil.trace("TQSplash Pre-Enter Scene Behavior: " + sceneTitle);		

		// Set the Titlebar
		//
		super.preEnterScene(Tutor, sceneLabel, sceneTitle, scenePage, Direction ); 
		
		// Make the "Question Title" text the same as the scene name
		//
		this.StitleText.text = sceneTitle;
														
		// once we progress past this we never come back
		// if we skip this panel then skip going in the same direction
		//
		if(Direction == "WOZBACK")
							return Direction;
														
		return sceneLabel;
	}
	
	
	public onEnterScene(Direction:string) : void
	{
		CUtil.trace("TQSplash Enter Scene Behavior:");
		
		// ********* Timed scene advance
		
		// Set the Splash onscreen time
		//
		var myTimer:CEFTimer = new CEFTimer(1700, 1);

		myTimer.addEventListener("timer", this.timerHandler);
		myTimer.start();
		
	}

//****** Overridden Behaviors
}