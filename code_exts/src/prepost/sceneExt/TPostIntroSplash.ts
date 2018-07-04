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


export class TPostIntroSplash extends TScene
{
	//************ Stage Symbols
	
	public SplashFrame1:TObject;
	public SplashFrameShadow:TObject;		
	
	// non-interactive elements
	
	
	//************ Stage Symbols				
	
	
					
	constructor()
	{
		super();
		
		CUtil.trace("TPostIntroSplash:Constructor");
	}
			
//****** Overridden Behaviors

	// Update the Navigation Features on entry
	//
	public preEnterScene(lTutor:any, sceneLabel:string, sceneTitle:string, scenePage:string, Direction:string ) :string
	{
		CUtil.trace("TPostIntroSplash Pre-Enter Scene Behavior: " + sceneTitle);		
		
		super.preEnterScene(lTutor, sceneLabel, sceneTitle, scenePage, Direction );

		// This is a one time view
		// if we skip this panel then skip going in the same direction
		//
		// ## MOD Oct 19 2012 - don't allow back from this panel.
		
//			if(Direction == "WOZBACK")
//						return Direction;
			
		return sceneLabel;		
	}

	
//****** Overridable Behaviors
			
}
