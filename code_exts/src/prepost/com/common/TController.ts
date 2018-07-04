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
import { TScene }			from "thermite/TScene";
import { TMouseEvent } 		from "thermite/events/TMouseEvent";
import { CUtil } 			from "util/CUtil";

import MovieClip     		  = createjs.MovieClip;
import Timeline     		  = createjs.Timeline;
import Point     		  	  = createjs.Point;
import DisplayObject 		  = createjs.DisplayObject;
import DisplayObjectContainer = createjs.Container;



export class TController extends TObject
{
	//************ Stage Symbols
	
	public StabTool:TTabTool;
	
	public StopButton:TSelectorButton;
	public ScenterButton:TSelectorButton;
	public SbottomButton:TSelectorButton;
	
	// non-interactive elements
	
	
	//************ Stage Symbols				

	
	public sel1:string = "";
	public sel2:string = "";
	public sel3:string = "";
	
	public useChanged:boolean = false;
			
	public item1Listener:string;
	public item2Listener:string;
	public item3Listener:string;
	
	
	constructor()
	{
		super();

		//CUtil.trace("TController:Constructor");			
		
		this.StopButton.SsubLabel.visible 		 = false;
		this.ScenterButton.SsubLabel.visible 	 = false;
		this.SbottomButton.SsubLabel.visible 	 = false;
		
		this.StabTool.visible = false;
		
		this.StopButton.addEventListener(TMouseEvent.WOZCLICK, this.topClick);
		this.ScenterButton.addEventListener(TMouseEvent.WOZCLICK, this.centerClick);
		this.SbottomButton.addEventListener(TMouseEvent.WOZCLICK, this.bottomClick);								
		
	}

	
//*************** Deep state management

	public deepStateCopy(src:TObject) : void
	{
		super.deepStateCopy(src);
		
		var ptrController:TController  = src as TController;
		
		this.sel1  = ptrController.this.sel1;
		this.sel2  = ptrController.this.sel2;
		this.sel3  = ptrController.this.sel3;
		
		this.StopButton.SsubLabel.text	    = ptrController.this.StopButton.SsubLabel.text;
		this.StopButton.SsubLabel.visible    = ptrController.this.StopButton.SsubLabel.visible;
		
		this.ScenterButton.SsubLabel.text    = ptrController.this.ScenterButton.SsubLabel.text;
		this.ScenterButton.SsubLabel.visible = ptrController.this.ScenterButton.SsubLabel.visible;
		
		this.SbottomButton.SsubLabel.text    = ptrController.this.SbottomButton.SsubLabel.text; 
		this.SbottomButton.SsubLabel.visible = ptrController.this.SbottomButton.SsubLabel.visible;
	}		

//*************** Deep state management
			
//*************** Logging state management
	

	public captureLogState(obj:any = null) : Object
	{
		obj = super.captureLogState(obj);
					
		obj['object']   = 'imgcontroller';
		obj['name']     = this.name;
		obj['Item1']    = this.StopButton.SsubLabel.text;
		obj['Changed1'] = this.StopButton.SchangeLabel.visible; 
		obj['Item2']    = this.ScenterButton.SsubLabel.text;
		obj['Changed2'] = this.ScenterButton.SchangeLabel.visible; 
		obj['Item3']    = this.SbottomButton.SsubLabel.text;
		obj['Changed3'] = this.SbottomButton.SchangeLabel.visible;
		
		return obj;											   
	}						
	
	public captureXMLState() :any
	{		
		let stateVal:any   = {controller:{}};
		let controller:any = stateVal.controller;

		controller.name= this.name;

		controller.topbutton.Item	=this.sel1; 
		controller.topbutton.Changed=this.StopButton.SchangeLabel.visible; 
		controller.topbutton.Text	=this.StopButton.SsubLabel.text; 
		controller.topbutton.Visible=this.StopButton.SsubLabel.visible;

		controller.centerbutton.Item	=this.sel2; 
		controller.centerbutton.Changed	=this.ScenterButton.SchangeLabel.visible; 
		controller.centerbutton.Text	=this.ScenterButton.SsubLabel.text; 
		controller.centerbutton.Visible	=this.ScenterButton.SsubLabel.visible;

		controller.bottombutton.Item	=this.sel3; 
		controller.bottombutton.Changed	=this.SbottomButton.SchangeLabel.visible; 
		controller.bottombutton.Text	=this.SbottomButton.SsubLabel.text; 
		controller.bottombutton.Visible	=this.SbottomButton.SsubLabel.visible;

		return stateVal;				
	}		

	public restoreXMLState(stateVal:any) : void
	{
		this.sel1							 = stateVal.topbutton.Item;
		this.StopButton.SsubLabel.text	   	 = stateVal.topbutton.Text;
		this.StopButton.SsubLabel.visible    = stateVal.topbutton.Visible;
		
		this.sel2							 = stateVal.centerbutton.Item;
		this.ScenterButton.SsubLabel.text    = stateVal.centerbutton.Text;
		this.ScenterButton.SsubLabel.visible = stateVal.centerbutton.Visible;
		
		this.sel3							 = stateVal.bottombutton.Item;
		this.SbottomButton.SsubLabel.text    = stateVal.bottombutton.Text;
		this.SbottomButton.SsubLabel.visible = stateVal.bottombutton.Visible;
	}		
	
	public compareXMLState(stateVal:any) :boolean
	{
		var bTest:boolean = true;

		this.StopButton.SchangeLabel.visible    = false;	
		this.ScenterButton.SchangeLabel.visible = false;	
		this.SbottomButton.SchangeLabel.visible = false;	
		
		if(this.sel1 != stateVal.topbutton.Item)
		{
			this.useChanged? this.StopButton.SchangeLabel.visible = true: null;	
			bTest = false;
		}
		if(this.sel2 != stateVal.centerbutton.Item)
		{
			this.useChanged? this.ScenterButton.SchangeLabel.visible = true: null;	
			bTest = false;
		}
		if(this.sel3 != stateVal.bottombutton.Item)
		{
			this.useChanged? this.SbottomButton.SchangeLabel.visible = true: null;	
			bTest = false;
		}
		
		return bTest;			
	}		
	
//*************** Logging state management
	
	
	public initLabels(label1:string, label2:string, label3:string)
	{
		this.StopButton.StopLabel.text 			 = label1;
		this.ScenterButton.StopLabel.text 		 = label2;
		this.SbottomButton.StopLabel.text	 	 = label3;
		
		this.StabTool.StopTab.StabLabel.text 	 = label1;
		this.StabTool.ScenterTab.StabLabel.text   = label2;
		this.StabTool.SbottomTab.StabLabel.text	 = label3;					
	}
	
	
	public enableTool(bFlag:boolean) : void
	{
		if(bFlag)
		{
			this.StopButton.addEventListener(TMouseEvent.WOZCLICK, this.topClick);
			this.ScenterButton.addEventListener(TMouseEvent.WOZCLICK, this.centerClick);
			this.SbottomButton.addEventListener(TMouseEvent.WOZCLICK, this.bottomClick);										
		}
		else
		{
			this.StopButton.removeEventListener(TMouseEvent.WOZCLICK, this.topClick);
			this.ScenterButton.removeEventListener(TMouseEvent.WOZCLICK, this.centerClick);
			this.SbottomButton.removeEventListener(TMouseEvent.WOZCLICK, this.bottomClick);										
		}
		
		this.StopButton.enableButton(bFlag);
		this.ScenterButton.enableButton(bFlag);
		this.SbottomButton.enableButton(bFlag);			
	}
	
	
	public showTabTool(item1ID:string, item2ID:string, checkedItem:string, tabID:string )
	{
		CUtil.trace("Show TabTool: " + item1ID + " : " +  item2ID + " : " + tabID);
		
//			//@@ Action Logging
//			var xmlVal:any = <action func="showTabTool" target=name} item1=item1ID} item2=item2ID} current=checkedItem} tabID=tabID}/>
//							
//			gTutor.logActionEvent(xmlVal);				
//			//@@ Action Logging
		
		this.item1Listener = item1ID;
		this.item2Listener = item2ID;
		
		this.StopButton.visible 			 = false;
		this.ScenterButton.visible 	 	 = false;
		this.SbottomButton.visible 	 	 = false;
		
		this.StabTool.StopTab.visible     = false;						
		this.StabTool.ScenterTab.visible  = false;						
		this.StabTool.SbottomTab.visible  = false;						
		
		this.StabTool.hideAllIcons();

		this.StabTool.Sitem1.visible = true;			
		this.StabTool.Sitem2.visible = true;			
		this.StabTool.Sitem3.visible = false;			
		this.StabTool.Sitem4.visible = false;			
		this.StabTool.Sitem5.visible = false;			
		
		this.StabTool.Sitem1.Scheckbox.setCheck(false);			
		this.StabTool.Sitem2.Scheckbox.setCheck(false);			
			
		if(checkedItem)
			this.StabTool[checkedItem].Scheckbox.setCheck(true);						
		
		this.StabTool.Sitem1.Sicons[item1ID].visible = true;
		this.StabTool.Sitem2.Sicons[item2ID].visible = true;

		this.StabTool.Sitem1.addEventListener(TMouseEvent.WOZCLICK, this[item1ID]);
		this.StabTool.Sitem2.addEventListener(TMouseEvent.WOZCLICK, this[item2ID]);
		
		this.resizeDismissMask(true);
		this.StabTool.SdismissButton.addEventListener(TMouseEvent.WOZCLICK, this.doDismiss );									
		
		this.StabTool[tabID].visible  = true;						
		this.StabTool.visible  = true;						
	}

	
	public show3TabTool(item1ID:string, item2ID:string, item3ID:string, checkedItem:string, tabID:string )
	{
		CUtil.trace("Show TabTool: " + item1ID + " : " +  item2ID + " : " +  item3ID + " : " + tabID);
		
//			//@@ Action Logging
//			var xmlVal:any = <action func="showTabTool" target=name} item1=item1ID} item2=item2ID} item3=item3ID} current=checkedItem} tabID=tabID}/>
//										
//			gTutor.logActionEvent(xmlVal);				
//			//@@ Action Logging
		
		this.item1Listener = item1ID;
		this.item2Listener = item2ID;
		this.item3Listener = item3ID;
		
		this.StopButton.visible 		 = false;
		this.ScenterButton.visible 	 	 = false;
		this.SbottomButton.visible 	 	 = false;
		
		this.StabTool.StopTab.visible     = false;						
		this.StabTool.ScenterTab.visible  = false;						
		this.StabTool.SbottomTab.visible  = false;						
		
		this.StabTool.hideAllIcons();

		this.StabTool.Sitem1.visible = false;			
		this.StabTool.Sitem2.visible = false;			
		this.StabTool.Sitem3.visible = true;			
		this.StabTool.Sitem4.visible = true;			
		this.StabTool.Sitem5.visible = true;			
		
		this.StabTool.Sitem3.Scheckbox.setCheck(false);			
		this.StabTool.Sitem4.Scheckbox.setCheck(false);			
		this.StabTool.Sitem5.Scheckbox.setCheck(false);			
			
		if(checkedItem)
			this.StabTool[checkedItem].Scheckbox.setCheck(true);						
		
		this.StabTool.Sitem3.Sicons[item1ID].visible = true;
		this.StabTool.Sitem4.Sicons[item2ID].visible = true;
		this.StabTool.Sitem5.Sicons[item3ID].visible = true;

		this.StabTool.Sitem3.addEventListener(TMouseEvent.WOZCLICK, this[item1ID]);
		this.StabTool.Sitem4.addEventListener(TMouseEvent.WOZCLICK, this[item2ID]);			
		this.StabTool.Sitem5.addEventListener(TMouseEvent.WOZCLICK, this[item3ID]);			
		
		this.resizeDismissMask(true);
		this.StabTool.SdismissButton.addEventListener(TMouseEvent.WOZCLICK, this.doDismiss );									
		
		this.StabTool[tabID].visible = true;						
		this.StabTool.visible 		 = true;						
	}

	
	//@@ Mod May 22 2013
	// Note that in the new framework we cannot set this size prior to INPLACE capture.
	// So we resize the dismiss button just when we show the selector tab
	//
	public resizeDismissMask(showHide:boolean) : void
	{
		var iPnt:Point = this.globalToLocal(0, 0);			
		var ePnt:Point = this.globalToLocal(this.tutorDoc.STAGEWIDTH, this.tutorDoc.STAGEHEIGHT );			

		if(showHide)
		{
			this.StabTool.SdismissButton.x = iPnt.x;
			this.StabTool.SdismissButton.y = iPnt.y;
			
			this.StabTool.SdismissButton.width  = ePnt.x - iPnt.x;
			this.StabTool.SdismissButton.height = ePnt.y - iPnt.y;
		}
		else
		{
			this.StabTool.SdismissButton.x = 0;
			this.StabTool.SdismissButton.y = 0;
			
			this.StabTool.SdismissButton.width  = 0;
			this.StabTool.SdismissButton.height = 0;
		}
			
	}		
	
	
	public dismissTool(eventID:string )
	{
		CUtil.trace("dismiss TabTool: " + eventID);
					
		//@@ Action Logging			
		var logData:any = {'action':'dismissTool', 'targetid':name, 'selection':eventID};
		
		this.tutorDoc.log.logActionEvent(logData);							
		//@@ Action Logging
					
		// When Question is finished we enable the Navigation Panel
		//
		this.queryQuestionDone();						
		
		this.StabTool.Sitem1.removeEventListener(TMouseEvent.WOZCLICK, this[this.item1Listener]);
		this.StabTool.Sitem2.removeEventListener(TMouseEvent.WOZCLICK, this[this.item2Listener]);		
		
		this.resizeDismissMask(false);
		this.StabTool.SdismissButton.removeEventListener(TMouseEvent.WOZCLICK, this.doDismiss );									

		this.StopButton.visible 	 = true;
		this.ScenterButton.visible 	 = true;
		this.SbottomButton.visible 	 = true;
		
		this.StabTool.visible  = false;						
					
		if(eventID)
			 this.dispatchEvent(new TSelectEvent(eventID, TSelectEvent.WOZTABSELECT));
	}
	
	
	public dismiss3Tool(eventID:string )
	{
		CUtil.trace("dismiss 3 TabTool: " + eventID);
					
		//@@ Action Logging
		var logData:any = {'action':'this.dismiss3Tool', 'targetid':name, 'selection':eventID};
		
		this.tutorDoc.log.logActionEvent(logData);
		//@@ Action Logging
					
		// When Question is finished we enable the Navigation Panel
		//
		this.queryQuestionDone();						
		
		this.StabTool.Sitem3.removeEventListener(TMouseEvent.WOZCLICK, this[this.item1Listener]);
		this.StabTool.Sitem4.removeEventListener(TMouseEvent.WOZCLICK, this[this.item2Listener]);		
		this.StabTool.Sitem5.removeEventListener(TMouseEvent.WOZCLICK, this[this.item3Listener]);		
		
		this.resizeDismissMask(false);
		this.StabTool.SdismissButton.removeEventListener(TMouseEvent.WOZCLICK, this.doDismiss );									

		this.StopButton.visible 	 = true;
		this.ScenterButton.visible 	 = true;
		this.SbottomButton.visible 	 = true;
		
		this.StabTool.visible  = false;						
					
		if(eventID)
			 this.dispatchEvent(new TSelectEvent(eventID, TSelectEvent.WOZTABSELECT));
	}
	public doDismiss(evt:TMouseEvent)
	{
		this.dismissTool(null);
	}



//*************************   Overridable

//******* Utility functions		


	public queryQuestionDone() : void
	{
	}		
			
			
//******* Button Actions

	//  top Button has been clicked
	//
	public topClick(evt:TMouseEvent)
	{
	}

	
	// center Button has been clicked
	public centerClick(evt:TMouseEvent)
	{
	}
	
	
	// bottom Button has been clicked
	public bottomClick(evt:TMouseEvent)
	{
	}
	
}
