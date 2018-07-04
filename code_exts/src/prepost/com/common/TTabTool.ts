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

import { TSelectorItemButton } 	from "./TSelectorItemButton";
import { TButton } 				from "thermite/TButton";
import { TLabeledTab } 			from "./TLabeledTab";

import { TRoot }				from "thermite/TRoot";
import { TObject }				from "thermite/TObject";
import { TScene }				from "thermite/TScene";
import { CUtil } 				from "util/CUtil";

import MovieClip     		  = createjs.MovieClip;
import Timeline     		  = createjs.Timeline;
import DisplayObject 		  = createjs.DisplayObject;
import DisplayObjectContainer = createjs.Container;

export class TTabTool extends TObject
{
	//************ Stage Symbols
	
	public Sitem1:TSelectorItemButton;
	public Sitem2:TSelectorItemButton;

	public Sitem3:TSelectorItemButton;
	public Sitem4:TSelectorItemButton;
	public Sitem5:TSelectorItemButton;
	
	public SdismissButton:TButton;
	
	public StopTab:TLabeledTab;
	public ScenterTab:TLabeledTab;
	public SbottomTab:TLabeledTab;
	
	public Sframe:DisplayObject;
	
	// non-interactive elements
	
	
	//************ Stage Symbols				
			
	
	constructor()
	{
		super();
		
		//CUtil.trace("TTabTool:Constructor");			
		
		this.hideAllIcons();
	}


	public hideAllIcons() : void
	{
		var tabItemBut:TSelectorItemButton;
		
		for(var i1:number = 1 ; i1 < 10 ; i1++)
		{				
			// enumerate the TabItemButtons - turn off all the icons
			//
			tabItemBut = this.getChildByName("Sitem" + i1) as TSelectorItemButton;
			
			if(tabItemBut)
			{
				CUtil.trace("Initializing tab item selector: item" + i1);
				
				tabItemBut.Sicons.hideAllIcons();
			}
		}			
	}

}

