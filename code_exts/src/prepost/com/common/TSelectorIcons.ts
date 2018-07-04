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




import { TRoot }		from "thermite/TRoot";
import { TObject }		from "thermite/TObject";
import { TScene }		from "thermite/TScene";
import { CUtil } 		from "util/CUtil";

import MovieClip     		  = createjs.MovieClip;
import Timeline     		  = createjs.Timeline;
import DisplayObject 		  = createjs.DisplayObject;
import DisplayObjectContainer = createjs.Container;

export class TSelectorIcons extends TObject
{
	//************ Stage Symbols
			
	public minutesOne:DisplayObject;
	public minutesFive:DisplayObject;

	public lightBright:DisplayObject;
	public lightDim:DisplayObject;
	
	public cardWords:DisplayObject;
	public cardIcons:DisplayObject;
	
	public studyAlone:DisplayObject;
	public studyFriend:DisplayObject;
	
	public drinkSoda:DisplayObject;
	public drinkWater:DisplayObject;
	
	public atLibrary:DisplayObject;
	public atHome:DisplayObject;
	
	public tiresSmall:DisplayObject;
	public tiresLarge:DisplayObject;
	
	public topClosed:DisplayObject;
	public topOpen:DisplayObject;
	
	public doorsFour:DisplayObject;
	public doorsTwo:DisplayObject;
	
	public threeEgg:DisplayObject;
	public oneEgg:DisplayObject;
	
	public sugar:DisplayObject;
	public honey:DisplayObject;
	
	public oneWindow:DisplayObject;
	public fourWindows:DisplayObject;
	
	public tiltEngines:DisplayObject;
	public downEngines:DisplayObject;
	
	public straightBody:DisplayObject;
	public curvedBody:DisplayObject;
	
	public ageYounger:DisplayObject;
	public ageOlder:DisplayObject;
	
	public drinkLemon:DisplayObject;
	public drinkTea:DisplayObject;
	
	public bluePaint:DisplayObject;
	public pinkPaint:DisplayObject;
	
	public doubleDoor:DisplayObject;
	public singleDoor:DisplayObject;
	
	public chimneyRight:DisplayObject;
	public chimneyLeft:DisplayObject;
	
	public temp500:DisplayObject;
	public temp350:DisplayObject;
	public temp200:DisplayObject;
	
	public clockNoon:DisplayObject;
	public clockThree:DisplayObject;
	public clockSix:DisplayObject;

	// non-interactive elements
	
	
	//************ Stage Symbols				
	
	
	constructor()
	{
		super();
		
		//CUtil.trace("TSelectorIcons:Constructor");			
	}

	public hideAllIcons() : void
	{													
		for(var i1:number = 0 ; i1 < this.numChildren ; i1++)
		{
			this.getChildAt(i1).visible = false;
		}		 
		
	}
	
	public showIcon(iName:string ) : void
	{													
		this.getChildByName(iName).visible = true;		
	}
}