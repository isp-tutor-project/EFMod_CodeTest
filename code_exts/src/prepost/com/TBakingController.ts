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

import { TController }	from "../com/common/TController";

import { TRoot }		from "thermite/TRoot";
import { TObject }		from "thermite/TObject";
import { TScene }		from "thermite/TScene";
import { TMouseEvent } 	from "thermite/events/TMouseEvent";
import { CUtil } 		from "util/CUtil";

import MovieClip     		  = createjs.MovieClip;
import Timeline     		  = createjs.Timeline;
import DisplayObject 		  = createjs.DisplayObject;
import DisplayObjectContainer = createjs.Container;


export class TBakingController extends TController
{
	//************ Stage Symbols
	
	
	// non-interactive elements
	
	
	//************ Stage Symbols				
	

	constructor()
	{
		super();
		
		CUtil.trace("TBakingController:Constructor");			
		
		this.initLabels("Temperature", "Sweetener", "Eggs");
	}
	
	
	// Time - top Button has been clicked
	//
	public topClick(evt:TMouseEvent)
	{
		this.show3TabTool
		("temp200", "temp350", "temp500", this.sel1, "StopTab");			
	}
	
	public temp200(evt:TMouseEvent)
	{
		this.StopButton.SsubLabel.text = "200 Degrees";
		this.StopButton.SsubLabel.visible = true;
		this.sel1 = "Sitem3";
		
		this.dismiss3Tool("temp200");	
	}
	
	public temp350(evt:TMouseEvent)
	{
		this.StopButton.SsubLabel.text = "350 Degrees";
		this.StopButton.SsubLabel.visible = true;
		this.sel1 = "Sitem4";
		
		this.dismiss3Tool("temp350");	
	}
	
	public temp500(evt:TMouseEvent)
	{
		this.StopButton.SsubLabel.text = "500 Degrees";
		this.StopButton.SsubLabel.visible = true;
		this.sel1 = "Sitem5";
		
		this.dismiss3Tool("temp500");	
	}
	
	
	// Paint Color - center Button has been clicked
	public centerClick(evt:TMouseEvent)
	{
		this.showTabTool("honey", "sugar", this.sel2, "ScenterTab");			
	}
	
	public honey(evt:TMouseEvent)
	{
		this.ScenterButton.SsubLabel.text = "Honey";
		this.ScenterButton.SsubLabel.visible = true;
		this.sel2 = "Sitem1";
		
		this.dismissTool("honey");						
	}
	
	public sugar(evt:TMouseEvent)
	{
		this.ScenterButton.SsubLabel.text = "Sugar";
		this.ScenterButton.SsubLabel.visible = true;
		this.sel2 = "Sitem2";
		
		this.dismissTool("sugar");			
	}
	
	
	// Front Door - bottom Button has been clicked
	public bottomClick(evt:TMouseEvent)
	{
		this.showTabTool("oneEgg", "threeEgg", this.sel3, "SbottomTab");			
	}
	
	public oneEgg(evt:TMouseEvent)
	{
		this.SbottomButton.SsubLabel.text = "One Egg";
		this.SbottomButton.SsubLabel.visible = true;
		this.sel3 = "Sitem1";
		
		this.dismissTool("oneEgg");						
	}
	
	public threeEgg(evt:TMouseEvent)
	{
		this.SbottomButton.SsubLabel.text = "Three Eggs";
		this.SbottomButton.SsubLabel.visible = true;
		this.sel3 = "Sitem2";
		
		this.dismissTool("threeEgg");						
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