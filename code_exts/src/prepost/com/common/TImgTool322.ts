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

import { TImgTool } 	from "./TImgTool";
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


export class TImgTool322 extends TImgTool
{
	// This is a special signature to avoid typescript error "because <type> has no index signature."
	// on this[<element name>]
	// 
	[key: string]: any;

	// the base object is a 3-2-2 configuration 1 rows of 3 selection then 2 rows of 2 selections
	
	public feature1C:string;

	constructor()
	{
		super();
		
		CUtil.trace("TImgTool322:Constructor");
	}
	
	public initListeners():void
	{
		super.initListeners();
		
		this[this.feature1C].addEventListener(TMouseEvent.WOZCLICK, this.dofeature1C);
	}		
	
//*************** Deep state management

	public deepStateCopy(src:TObject) : void
	{
		super.deepStateCopy(src);

		this[this.feature1C].visible = src[this.feature1C].visible;
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
		else if(this[this.feature1C].visible) result = this.feature1C;
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
		
		 	 if(this[this.feature1A].visible) image1 = this.feature1A;
		else if(this[this.feature1B].visible) image1 = this.feature1B;
		else if(this[this.feature1C].visible) image1 = this.feature1C;
		else image1 = "none";
		
			 if(this[this.feature2A].visible) image2 = this.feature2A;
		else if(this[this.feature2B].visible) image2 = this.feature2B;
		else image2 = "none";
		
			 if(this[this.feature3A].visible) image3 = this.feature3A;
		else if(this[this.feature3B].visible) image3 = this.feature3B;
		else image3 = "none";
					
		obj['object']  = 'imgtool';
		obj['name']    = this.name; 
		obj['image1']  = image1; 
		obj['image2']  = image2;
		obj['image3']  = image3;
		
		return obj;											   
	}				
	
	public captureXMLState() :any
	{		
		var stateVal:any = {};
		
			 if(this[this.feature1A].visible) stateVal.image1 = this.feature1A;
		else if(this[this.feature1B].visible) stateVal.image1 = this.feature1B;
		else if(this[this.feature1C].visible) stateVal.image1 = this.feature1C;
		else stateVal.image1 = "none";
	
			 if(this[this.feature2A].visible) stateVal.image2 = this.feature2A;
		else if(this[this.feature2B].visible) stateVal.image2 = this.feature2B;
		else stateVal.image2 = "none";

			 if(this[this.feature3A].visible) stateVal.image3 = this.feature3A;
		else if(this[this.feature3B].visible) stateVal.image3 = this.feature3B;
		else stateVal.image3 = "none";
		
		stateVal.name = this.name;

		return stateVal;					
	}		

	public restoreXMLState(stateVal:any) : void
	{
		this[this.feature1A].visible = false;
		this[this.feature1B].visible = false;
		this[this.feature1C].visible = false;
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
	}		
	
	
//*************** Logging state management
	
	public enableTool(bFlag:boolean) : void
	{
		super.enableTool(bFlag);
		
		this[this.feature1C].enableButton(bFlag);
	}
	
	
	// The scene listens for these events
	//
	public dofeature1C(evt:TMouseEvent )
	{
		this.logSelection(this.feature1C);
		 this.dispatchEvent(new TSelectEvent(this.feature1C, TSelectEvent.WOZIMGSELECT));
	}
	
}
