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

export class TPrompt extends TObject
{
	public traceTPrompt:boolean = false;		
	
	constructor()
	{
		super();
		
		if(this.traceTPrompt) CUtil.trace("TPrompt:Constructor");						
		
		 this.bTweenable = false; 
	}

	
//***************** Automation *******************************		

	// Walk the WOZ Objects to initialize their automation mode
	//
	public setObjMode(TutScene:any, sMode:string) : void 
	{
		if(this.traceTPrompt) CUtil.trace("\t*** Start - Walking Top Level Nav Objects***");

		for(var sceneObj in TutScene)
		{			
			if(sceneObj != "instance" && TutScene[sceneObj].instance instanceof TObject)
			{
				TutScene[sceneObj].instance.setAutomationMode(TutScene[sceneObj], sMode );										
			}					
		}		
		if(this.traceTPrompt) CUtil.trace("\t*** End - Walking Top Level Nav Objects***");
	}
	
//***************** Automation *******************************		
	
	
//***************** Debug *******************************		
		
	public dumpSceneObjs(TutScene:any) : void
	{							
		for(var sceneObj in TutScene)
		{
			if(this.traceTPrompt) CUtil.trace("\tNavPanelObj : " + sceneObj);
			
			if(sceneObj != "instance" && TutScene[sceneObj].instance instanceof TObject)
			{
				if(this.traceTPrompt) CUtil.trace("\tT***");
				
				TutScene[sceneObj].instance.dumpSubObjs(TutScene[sceneObj], "\t");										
			}					
		}		
	}

//***************** Debug *******************************		

}