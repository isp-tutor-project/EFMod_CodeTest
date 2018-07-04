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

import { TNavEvent } from "../com/events/TNavEvent";

import { CTimerEvent } from "events/CTimerEvent";
import { TRoot }		from "thermite/TRoot";
import { TObject }		from "thermite/TObject";
import { TScene }		from "thermite/TScene";
import { CUtil } 		from "util/CUtil";

import MovieClip     		  = createjs.MovieClip;
import Timeline     		  = createjs.Timeline;
import DisplayObject 		  = createjs.DisplayObject;
import DisplayObjectContainer = createjs.Container;
import Text					  = createjs.Text;



export class TQSplashB extends TScene
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
		
		CUtil.trace("TQSplashB:Constructor");
	}
	

		
	public timerHandler(event:CTimerEvent):void
	{
		CUtil.trace("TQSplashB timerHandler: " + event);
					
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
		CUtil.trace("TQSplashB Pre-Enter Scene Behavior: " + sceneTitle);		

		// Set the Titlebar
		//
		super.preEnterScene(Tutor, sceneLabel, sceneTitle, scenePage, Direction ); 
		
		// Make the "Question Title" text the same as the scene name
		//
		this.StitleText.text = sceneTitle;
														
		//*** Use this code for trap door navigation on this screen			
/* 			
		// once we progress past this we never come back
		// if we skip this panel then skip going in the same direction
		//
		if(this.fComplete && (Direction != "WOZGOTO"))
									return Direction;
*/			
		//*** Use this code for trap door navigation on this screen			
		
		return sceneLabel;
	}
	
	
	public onEnterScene(Direction:string) : void
	{
		CUtil.trace("TQSplashB Enter Scene Behavior:");
		
		// ********* Timed scene advance
		
/*			// Set the Splash onscreen time
		//
		var myTimer:Timer = new Timer(1700, 1);

		myTimer.addEventListener("timer", timerHandler);

		myTimer.start();
*/			
	}

	
	//@@ Mod May 22 2013 - set fComplete to enable trap door navigation - see above
	//
	public preExitScene(Direction:string, sceneCurr:number ) :string
	{				
		CUtil.trace("TQ3APart1 Enter Scene Behavior:");			

		if(Direction == "WOZNEXT")
						this.fComplete = true;
		
		return("OK");
	}
	
	
	
//****** Overridden Behaviors
}