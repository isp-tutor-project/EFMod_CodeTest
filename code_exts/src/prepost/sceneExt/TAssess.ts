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

import { TAssessment }	from "../com/common/TAssessment";


import { TRoot }		from "thermite/TRoot";
import { TObject }		from "thermite/TObject";
import { TScene }		from "thermite/TScene";
import { CUtil } 		from "util/CUtil";

import MovieClip     		  = createjs.MovieClip;
import Timeline     		  = createjs.Timeline;
import DisplayObject 		  = createjs.DisplayObject;
import DisplayObjectContainer = createjs.Container;

export class TAssess extends TScene
{
	//************ Stage Symbols
	
	public Sassess:TAssessment;
	
	// non-interactive elements
	
	
	//************ Stage Symbols				

	
	constructor()
	{
		super();

		CUtil.trace("TAssess:Constructor");
	}				
			
//****** Overridden Behaviors


	// Update the Navigation Features on entry
	//
	public preEnterScene(lTutor:any, sceneLabel:string, sceneTitle:string, scenePage:string, Direction:string ) :string
	{
		CUtil.trace("TAssess Pre-Enter Scene Behavior: " + sceneTitle);		

		var nCorrect:number = 0;
		
		this.Sassess.Sstar1.Sright.visible = false;
		this.Sassess.Sstar2.Sright.visible = false;
		this.Sassess.Sstar3.Sright.visible = false;
		this.Sassess.Sstar4.Sright.visible = false;
		this.Sassess.Sstar5.Sright.visible = false;
		this.Sassess.Sstar6.Sright.visible = false;
		this.Sassess.Sstar7.Sright.visible = false;
		this.Sassess.Sstar8.Sright.visible = false;
		this.Sassess.Sstar9.Sright.visible = false;
		this.Sassess.Sstar1.Swrong.visible = false;
		this.Sassess.Sstar2.Swrong.visible = false;
		this.Sassess.Sstar3.Swrong.visible = false;
		this.Sassess.Sstar4.Swrong.visible = false;
		this.Sassess.Sstar5.Swrong.visible = false;
		this.Sassess.Sstar6.Swrong.visible = false;
		this.Sassess.Sstar7.Swrong.visible = false;
		this.Sassess.Sstar8.Swrong.visible = false;
		this.Sassess.Sstar9.Swrong.visible = false;
		
		if(this.queryGlobal('q1CVS') == "CVS") 
		{
			nCorrect++;
			this.Sassess.Sstar1.Sright.visible = true;
		}
		else this.Sassess.Sstar1.Swrong.visible = true;
		
//--
		
		if((this.queryGlobal('q2Good') == "unchecked") && (this.queryGlobal('q2Bad')  == "checked"))
		{
			nCorrect++;
			this.Sassess.Sstar2.Sright.visible = true;
		}
		else this.Sassess.Sstar2.Swrong.visible = true;

		
		if(this.queryGlobal('q2CVS') == "CVS") 
		{
			nCorrect++;
			this.Sassess.Sstar3.Sright.visible = true;
		}
		else this.Sassess.Sstar3.Swrong.visible = true;
		
//--
					
		if(this.queryGlobal('q3CVS') == "CVS") 
		{
			nCorrect++;
			this.Sassess.Sstar4.Sright.visible = true;
		}
		else this.Sassess.Sstar4.Swrong.visible = true;
		
//--
		
		if((this.queryGlobal('q4Good') == "unchecked") && (this.queryGlobal('q4Bad')  == "checked"))
		{
			nCorrect++;
			this.Sassess.Sstar5.Sright.visible = true;
		}
		else this.Sassess.Sstar5.Swrong.visible = true;
		
		if(this.queryGlobal('q4CVS') == "CVS") 
		{
			nCorrect++;
			this.Sassess.Sstar6.Sright.visible = true;
		}
		else this.Sassess.Sstar6.Swrong.visible = true;
		
//--
		
		if(this.queryGlobal('q5CVS') == "CVS") 
		{
			nCorrect++;
			this.Sassess.Sstar7.Sright.visible = true;
		}
		else this.Sassess.Sstar7.Swrong.visible = true;
		
//--
		
		if((this.queryGlobal('q6Good') == "unchecked") && (this.queryGlobal('q6Bad')  == "checked"))
		{
			nCorrect++;
			this.Sassess.Sstar8.Sright.visible = true;
		}
		else this.Sassess.Sstar8.Swrong.visible = true;

		if(this.queryGlobal('q6CVS') == "CVS") 
		{
			nCorrect++;
			this.Sassess.Sstar9.Sright.visible = true;
		}
		else this.Sassess.Sstar9.Swrong.visible = true;
		
//--
		
		this.Sassess.Sresult.text = nCorrect + " / 9"; 			

		
		return super.preEnterScene(lTutor, sceneLabel, sceneTitle, scenePage, Direction );
	}

	
//****** Overridable Behaviors
			
}
