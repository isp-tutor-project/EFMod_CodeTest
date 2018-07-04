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

import { TController } from "./common/TController";

import { TRoot }		from "thermite/TRoot";
import { TObject }		from "thermite/TObject";
import { TScene }		from "thermite/TScene";
import { TMouseEvent } 	from "thermite/events/TMouseEvent";
import { CUtil } 		from "util/CUtil";

import MovieClip     		  = createjs.MovieClip;
import Timeline     		  = createjs.Timeline;
import DisplayObject 		  = createjs.DisplayObject;
import DisplayObjectContainer = createjs.Container;




export class TStudyController extends TController
{
	//************ Stage Symbols
	
	
	// non-interactive elements
	
	
	//************ Stage Symbols				
	
	
	constructor()
	{
		super();
		
		CUtil.trace("TStudyController:Constructor");			
		
		this.initLabels("Who", "Where", "Drink");
	}

	
	// Time - top Button has been clicked
	//
	public topClick(evt:TMouseEvent)
	{
		this.showTabTool("studyAlone", "studyFriend", this.sel1, "StopTab");			
	}

	public studyAlone(evt:TMouseEvent)
	{
		this.StopButton.SsubLabel.text = "Alone";
		this.StopButton.SsubLabel.visible = true;
		this.sel1 = "Sitem1";
		
		this.dismissTool("studyAlone");	
	}
	
	public studyFriend(evt:TMouseEvent)
	{
		this.StopButton.SsubLabel.text = "Friend";
		this.StopButton.SsubLabel.visible = true;
		this.sel1 = "Sitem2";
		
		this.dismissTool("studyFriend");	
	}

	
	// Paint Color - center Button has been clicked
	public centerClick(evt:TMouseEvent)
	{
		this.showTabTool("atHome", "atLibrary", this.sel2, "ScenterTab");			
	}

	public atHome(evt:TMouseEvent)
	{
		this.ScenterButton.SsubLabel.text = "Home";
		this.ScenterButton.SsubLabel.visible = true;
		this.sel2 = "Sitem1";
		
		this.dismissTool("atHome");						
	}
	
	public atLibrary(evt:TMouseEvent)
	{
		this.ScenterButton.SsubLabel.text = "Library";
		this.ScenterButton.SsubLabel.visible = true;
		this.sel2 = "Sitem2";
		
		this.dismissTool("atLibrary");			
	}
	
	
	// Front Door - bottom Button has been clicked
	public bottomClick(evt:TMouseEvent)
	{
		this.showTabTool("drinkWater", "drinkSoda", this.sel3, "SbottomTab");			
	}

	public drinkWater(evt:TMouseEvent)
	{
		this.SbottomButton.SsubLabel.text = "Water";
		this.SbottomButton.SsubLabel.visible = true;
		this.sel3 = "Sitem1";
		
		this.dismissTool("drinkWater");						
	}
	
	public drinkSoda(evt:TMouseEvent)
	{
		this.SbottomButton.SsubLabel.text = "Soda";
		this.SbottomButton.SsubLabel.visible = true;
		this.sel3 = "Sitem2";
		
		this.dismissTool("drinkSoda");						
	}		
	
//******* Utility functions		

	public queryQuestionDone() : void
	{
		// If they have made all the selections they can continue
		//
		if(this.sel1 && this.sel2 && this.sel3)
				 this.dispatchEvent(new Event("Done"));
	}		
					
}