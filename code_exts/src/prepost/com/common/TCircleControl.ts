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

/// <reference path="../../../../../../dist/TutorEngineOne.d.ts" />

//** Imports

import { TTabTool } 		from "./TTabTool";
import { TSelectorButton } 	from "./TSelectorButton";
import { TSelectEvent } 	from "../events/TSelectEvent";

import { TRoot }			from "thermite/TRoot";
import { TObject }			from "thermite/TObject";
import { TCheckButton }		from "thermite/TCheckButton";
import { TScene }			from "thermite/TScene";
import { TMouseEvent } 		from "thermite/events/TMouseEvent";
import { CUtil } 			from "util/CUtil";

import MovieClip     		  = createjs.MovieClip;
import Timeline     		  = createjs.Timeline;
import Point     		  	  = createjs.Point;
import DisplayObject 		  = createjs.DisplayObject;
import DisplayObjectContainer = createjs.Container;



export class TCircleControl extends TCheckButton
{
	//************ Stage Symbols
	
	public SdisabledUp:DisplayObject;
	public SdisabledDown:DisplayObject;		
	
	// non-interactive elements
	
	
	//************ Stage Symbols				
		
	
	constructor()
	{
		super();

		//CUtil.trace("TCircleControl:Constructor");
	}


	public logClick() : void 
	{						
		
		//@@ Mod Apr 16 2012 - Action Logging
		
		var logData:Object = {'action':'circle_click', 'targetid':name, 'label':this.Slabel.text, 'selection':this.fChecked};
		
		this.tutorDoc.log.logActionEvent(logData);				
		
		//@@ Action Logging
	}					
	
	public resetState() : void 
	{											
		this.Sup.visible 		 	= false;
		this.Sover.visible 	 	 	= false;
		this.Sdown.visible 	 	 	= false;		
		this.SdisabledUp.visible 	= false;		
		this.SdisabledDown.visible 	= false;		
		this.Sfocus.visible    	 	= false;		
		this.Schecked.visible  	 	= false;		
	}

	public gotoState(sState:string) : void 
	{
		CUtil.trace("TCircleControl.gotoState: ", name + " " + sState);
		
		this.resetState();

		this.curState = sState;
		
		if(!this.fEnabled)
		{
			if(!this.fChecked)
				this.SdisabledUp.visible = true;
			else	
				this.SdisabledDown.visible = true;
			
			this.fPressed = false;
		}
		
		else switch(sState)
		{
			case "Sdown":
				this.Sdown.visible = true;
				
				this.fPressed = true;
				break;
							
			case "Sup":
				if(this.fChecked)
					this.Schecked.visible = true;
				else	
					this.Sup.visible = true;
					
				this.fPressed   = false;
				break;
			
			case "Sover":
				if(!this.fPressed)
					this.Sover.visible = true;
				else
					this.Sdown.visible = true;					
				break;

			case "Sout":
				if(this.fChecked)
					this.Schecked.visible = true;
				else	
					this.Sup.visible = true;
				break;
		}
	}					
			
	
//*************** Logging state management
			
	
	//@@ Mod Jun 3 2013 - changed nethod to getter to support XML logging in scenegraph spec  
	//
	public get captureLOGString() :string
	{
		var strVal:string;
		
		//strVal = Slabel.text + (this.fChecked? "changed":"unchanged");
		
		//@@ Mod Jan 28 2011 - changed circle button logging text to Checked/UnChecked
		
		strVal = this.fChecked? "checked":"unchecked";
		
		return strVal;
	}				
	
	public captureLOGState() :any
	{
		let obj:any = {button:{}};

		obj.button['name'] 	  = this.Slabel.text;		
		obj.button['checked'] = this.fChecked.toString();
					
		return obj;
	}		
	
	public restoreXMLState(xmlState:any) : void
	{
		this.curState = xmlState.state
		this.fChecked = (xmlState.checked = "true")? true:false;  
		this.fPressed = (xmlState.pressed = "true")? true:false;  
		this.fEnabled = (xmlState.enabled = "true")? true:false;  
		
	}		
	
	public compareXMLState(xmlState:any) :boolean
	{
		var bTest:boolean = true;

		//## Mod May 10 2014
		// Note - all we care about in the pre post is if the checked state has changed
		//        This as causing an issue where the 'state' value was captured in  
		//        a different State
/*			
		if((this.curState != xmlState.state)   ||
			(this.fChecked != xmlState.checked) ||
			(this.fPressed != xmlState.pressed) ||
			(this.fEnabled != xmlState.enabled))
								bTest = false;
*/			
		if(this.fChecked != xmlState.checked)
								bTest = false;
		
		return bTest;			
	}		
	
//*************** Logging state management
	
}
