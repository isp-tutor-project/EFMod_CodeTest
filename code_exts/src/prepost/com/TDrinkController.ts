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



export class TDrinkController extends TController
{
	//************ Stage Symbols
	
	
	// non-interactive elements
	
	
	//************ Stage Symbols				
	
	
	constructor()
	{
		super();
		
		CUtil.trace("TDrinkController:Constructor");			
						
		this.initLabels("Time", "Age", "Drink");
	}

	
	// Time - top Button has been clicked
	//
	public topClick(evt:TMouseEvent)
	{
		this.show3TabTool("clockNoon", "clockThree", "clockSix", this.sel1, "StopTab");			
	}

	public clockNoon(evt:TMouseEvent)
	{
		this.StopButton.SsubLabel.text = "Noon";
		this.StopButton.SsubLabel.visible = true;
		this.sel1 = "Sitem3";
		
		this.dismissTool("clockNoon");	
	}
	
	public clockThree(evt:TMouseEvent)
	{
		this.StopButton.SsubLabel.text = "3:00 PM";
		this.StopButton.SsubLabel.visible = true;
		this.sel1 = "Sitem4";
		
		this.dismissTool("clockThree");	
	}
	
	public clockSix(evt:TMouseEvent)
	{
		this.StopButton.SsubLabel.text = "6:00 PM";
		this.StopButton.SsubLabel.visible = true;
		this.sel1 = "Sitem5";
		
		this.dismissTool("clockSix");	
	}

	
	// Paint Color - center Button has been clicked
	public centerClick(evt:TMouseEvent)
	{
		this.showTabTool("ageYoung", "ageOlder", this.sel2, "ScenterTab");			
	}

	public ageYoung(evt:TMouseEvent)
	{
		this.ScenterButton.SsubLabel.text = "Younger";
		this.ScenterButton.SsubLabel.visible = true;
		this.sel2 = "Sitem1";
		
		this.dismissTool("ageYoung");						
	}
	
	public ageOlder(evt:TMouseEvent)
	{
		this.ScenterButton.SsubLabel.text = "Older";
		this.ScenterButton.SsubLabel.visible = true;
		this.sel2 = "Sitem2";
		
		this.dismissTool("ageOlder");			
	}
	
	
	// Front Door - bottom Button has been clicked
	public bottomClick(evt:TMouseEvent)
	{
		this.showTabTool("drinkLemon", "drinkTea", this.sel3, "SbottomTab");			
	}

	public drinkLemon(evt:TMouseEvent)
	{
		this.SbottomButton.SsubLabel.text = "Lemonade";
		this.SbottomButton.SsubLabel.visible = true;
		this.sel3 = "Sitem1";
		
		this.dismissTool("drinkLemon");						
	}
	
	public drinkTea(evt:TMouseEvent)
	{
		this.SbottomButton.SsubLabel.text = "Iced Tea";
		this.SbottomButton.SsubLabel.visible = true;
		this.sel3 = "Sitem2";
		
		this.dismissTool("drinkTea");						
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