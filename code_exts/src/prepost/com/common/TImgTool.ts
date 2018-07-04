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

import { TSelectEvent } from "../events/TSelectEvent";

import { TRoot }		from "thermite/TRoot";
import { TObject }		from "thermite/TObject";
import { TScene }		from "thermite/TScene";
import { TMouseEvent } 	from "thermite/events/TMouseEvent";
import { CUtil } 		from "util/CUtil";

import MovieClip     		  = createjs.MovieClip;
import Timeline     		  = createjs.Timeline;
import DisplayObject 		  = createjs.DisplayObject;
import DisplayObjectContainer = createjs.Container;



export class TImgTool extends TObject
{
	// the base object is a 2-2-2 configuration 3 rows of 2 selections
	
	public feature1A:string;
	public feature1B:string;
	public feature2A:string;
	public feature2B:string;
	public feature3A:string;
	public feature3B:string;
	
	//@@ Jan 26 2011 - Added support for feature masks (used as lighting overlay in memory controller)
	// This redirects events directed at the mask, whose state is dependent upon a given variable, to a different variable.
	
	protected  useFeatureMask:boolean = false;
	
	protected  featureMaskA:string;
	protected  featureMaskB:string;
	
	
	constructor()
	{
		super();
		
		CUtil.trace("TImgTool:Constructor");
		
		this.hideAllButtons();			
	}
	
	public initListeners():void
	{
		this[this.feature1A].addEventListener(TMouseEvent.CLICK, this.dofeature1A);
		this[this.feature1B].addEventListener(TMouseEvent.CLICK, this.dofeature1B);
		
		this[this.feature2A].addEventListener(TMouseEvent.CLICK, this.dofeature2A);
		this[this.feature2B].addEventListener(TMouseEvent.CLICK, this.dofeature2B);
		
		this[this.feature3A].addEventListener(TMouseEvent.CLICK, this.dofeature3A);
		this[this.feature3B].addEventListener(TMouseEvent.CLICK, this.dofeature3B);
	}
	
//*************** Image Mask Management
	
	/**
	 * Should be overridden in child class implementation to provide 
	 * object specific mask functionality
	 * 
	 * @param	target
	 */
	public manageMasks(target:string) : void
	{
		
	}
	
//*************** Image Mask Management
//*************** Deep state management
	
	public deepStateCopy(src:TObject) : void
	{
		super.deepStateCopy(src);
		
		this[this.feature1A].visible = src[this.feature1A].visible;
		this[this.feature1B].visible = src[this.feature1B].visible;
		
		this[this.feature2A].visible = src[this.feature2A].visible;
		this[this.feature2B].visible = src[this.feature2B].visible;
		
		this[this.feature3A].visible = src[this.feature3A].visible;
		this[this.feature3B].visible = src[this.feature3B].visible;
		
		if(this.useFeatureMask)
		{
			this[this.featureMaskA].visible = src[this.featureMaskA].visible;
			this[this.featureMaskB].visible = src[this.featureMaskB].visible;
		}			
	}		

//*************** Deep state management		
	
//*************** Logging state management
	

	//@@ Mod Jun 3 2013 - changed nethod to getter to support XML logging in scenegraph spec  
	//
	public get captureLOGString() :string
	{		
		var result:string;
		
				if(this[this.feature1A].visible) result = this.feature1A;
		else if(this[this.feature1B].visible) result = this.feature1B;
		else result = "none";
		
		result += "-";
		
				if(this[this.feature2A].visible) result += this.feature2A;
		else if(this[this.feature2B].visible) result += this.feature2B;
		else result += "none";
		
		result += "-";
		
				if(this[this.feature3A].visible) result += this.feature3A;
		else if(this[this.feature3B].visible) result += this.feature3B;
		else result += "none";
		
		return result;					
	}		
	
	public captureLogState(obj:any = null) : Object
	{
		obj = super.captureLogState(obj);
		
		var image1:string;
		var image2:string;
		var image3:string;
		var imageMask1:string;
		var imageMask2:string;
		
		if(this[this.feature1A].visible) 	 image1 = this.feature1A;
		else if(this[this.feature1B].visible) image1 = this.feature1B;
		else image1 = "none";
		
		if(this[this.feature2A].visible) 	 image2 = this.feature2A;
		else if(this[this.feature2B].visible) image2 = this.feature2B;
		else image2 = "none";
		
		if(this[this.feature3A].visible) 	 image3 = this.feature3A;
		else if(this[this.feature3B].visible) image3 = this.feature3B;
		else image3 = "none";
		
		if(this.useFeatureMask)
		{
			if (this[this.featureMaskA].visible) imageMask1 = "true";
										else imageMask1 = "false";
			
			if(this[this.featureMaskB].visible)  imageMask2 = "true";
										else imageMask2 = "false";
		}						
		
		obj['object']  = 'imgtool';
		obj['name']    = this.name; 
		obj['image1']  = image1; 
		obj['image2']  = image2;
		obj['image3']  = image3;
		obj['mask1']   = imageMask1;
		obj['mask2']   = imageMask2;
					
		return obj;											   
	}				
	
	public captureXMLState() :any
	{		

		var stateVal:any = {imgtool:{}};
		var imgTool:any  = imgTool.imgTool;
		
			 if(this[this.feature1A].visible) imgTool.image1 = this.feature1A;
		else if(this[this.feature1B].visible) imgTool.image1 = this.feature1B;
		else imgTool.image1 = "none";
	
			 if(this[this.feature2A].visible) imgTool.image2 = this.feature2A;
		else if(this[this.feature2B].visible) imgTool.image2 = this.feature2B;
		else imgTool.image2 = "none";

			 if(this[this.feature3A].visible) imgTool.image3 = this.feature3A;
		else if(this[this.feature3B].visible) imgTool.image3 = this.feature3B;
		else imgTool.image3 = "none";
		
		this.imgTool.name = this.name;
		
		if(this.useFeatureMask)
		{
			if (this[this.featureMaskA].visible) imgTool.imageMask1 = "true";
											else imgTool.imageMask1 = "false";
			if(this[this.featureMaskB].visible)  imgTool.imageMask2 = "true";
											else imgTool.imageMask2 = "false";
		}			
		
		return stateVal;					
	}		

	public restoreXMLState(stateVal:any) : void
	{
		
		this[this.feature1A].visible = false;
		this[this.feature1B].visible = false;

		if(stateVal.image1 != "none")
			this[stateVal.image1].visible = true;
		
		this[this.feature2A].visible = false;
		this[this.feature2B].visible = false;

		if(stateVal.image2 != "none")
			this[stateVal.image2].visible = true;
		
		this[this.feature3A].visible = false;
		this[this.feature3B].visible = false;

		if(stateVal.image3 != "none")
			this[stateVal.image3].visible = true;
			
		if(this.useFeatureMask)
		{
			this[this.featureMaskA].visible = (stateVal.mask1 == "true")? true:false;
			this[this.featureMaskB].visible = (stateVal.mask2 == "true")? true:false;
		}				
	}		
	
	public compareXMLState(xmlState:any) :boolean
	{
		var bTest:boolean = true;
		
		if( (this[xmlState.image1].visible != true) ||
			(this[xmlState.image2].visible != true) ||
			(this[xmlState.image3].visible != true))
											bTest = false;						
		return bTest;			
	}		
	
//*************** Logging state management
	
	public hideAllButtons() : void
	{													
		for(var i1:number = 0 ; i1 < this.numChildren ; i1++)
		{
			this.getChildAt(i1).visible = false;
		}		 			
	}		
	
	public enableTool(bFlag:boolean) : void
	{
		this[this.feature1A].enableButton(bFlag);
		this[this.feature1B].enableButton(bFlag);
		
		this[this.feature2A].enableButton(bFlag);
		this[this.feature2B].enableButton(bFlag);
		
		this[this.feature3A].enableButton(bFlag);
		this[this.feature3B].enableButton(bFlag);
	}
	
	
	public logSelection(feature:string)
	{
		//@@ Action Logging
		var logData:any = {'action':'imageclicked', 'targetid':name, 'selection':feature};
		
		this.tutorDoc.log.logActionEvent(logData);
		//@@ Action Logging			
	}
	
	
	// The scene listens for these events
	//
	public dofeature1A(evt:TMouseEvent )
	{
		this.logSelection(this.feature1A);
		 this.dispatchEvent(new TSelectEvent(this.feature1A, TSelectEvent.WOZIMGSELECT));
	}
	
	public dofeature1B(evt:TMouseEvent )		
	{
		this.logSelection(this.feature1B);
		 this.dispatchEvent(new TSelectEvent(this.feature1B, TSelectEvent.WOZIMGSELECT));
	}
	
	public dofeature2A(evt:TMouseEvent )
	{
		this.logSelection(this.feature2A);
		 this.dispatchEvent(new TSelectEvent(this.feature2A, TSelectEvent.WOZIMGSELECT));
	}
	
	public dofeature2B(evt:TMouseEvent )
	{
		this.logSelection(this.feature2B);
		 this.dispatchEvent(new TSelectEvent(this.feature2B, TSelectEvent.WOZIMGSELECT));
	}
	
	public dofeature3A(evt:TMouseEvent )
	{
		this.logSelection(this.feature3A);
		 this.dispatchEvent(new TSelectEvent(this.feature3A, TSelectEvent.WOZIMGSELECT));
	}
	
	public dofeature3B(evt:TMouseEvent )
	{
		this.logSelection(this.feature3B);
		 this.dispatchEvent(new TSelectEvent(this.feature3B, TSelectEvent.WOZIMGSELECT));
	}
	
}