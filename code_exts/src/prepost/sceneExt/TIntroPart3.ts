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

import { THouseImgTool } 	from "../com/THouseImgTool";
import { TCircleControl } 	from "../com/common/TCircleControl";
import { TPrompt } 			from "../com/common/TPrompt";

import { TRoot }			from "thermite/TRoot";
import { TObject }			from "thermite/TObject";
import { TScene }			from "thermite/TScene";
import { TMouseEvent } 		from "thermite/events/TMouseEvent";
import { CUtil } 			from "util/CUtil";

import MovieClip     		  = createjs.MovieClip;
import Timeline     		  = createjs.Timeline;
import DisplayObject 		  = createjs.DisplayObject;
import DisplayObjectContainer = createjs.Container;



export class TIntroPart3 extends TScene
{
	//************ Stage Symbols
	
	public i1p3imgTool:THouseImgTool;

	public i3Check1:TCircleControl;
	public i3Check2:TCircleControl;
	public i3Check3:TCircleControl;
	public i3Check4:TCircleControl;
	public i3Check5:TCircleControl;
	public i3Check6:TCircleControl;
	
	public i3Prompt1:TPrompt;
	
	// non-interactive elements
	
	
	//************ Stage Symbols				
	
	
	public fInitialized:boolean = false;
	public fPrompted:boolean    = false;
	
	public roofDone:boolean  = false;
	public colorDone:boolean = false;		
	public doorDone:boolean  = false;
	
	public corSel1:boolean;
	public corSel2:boolean;
	public corSel3:boolean;
	public corSel4:boolean;
	public corSel5:boolean;
	public corSel6:boolean;
			
	constructor()
	{
		super();
		
		CUtil.trace("TIntroPart3:Constructor");
					
		// Disable the controllers
		//
		this.i1p3imgTool.enableTool(false);						
		
		this.i3Check1.setLabel("Left side");
		this.i3Check2.setLabel("Right side");
		this.i3Check3.setLabel("Pink");
		this.i3Check4.setLabel("Blue");
		this.i3Check5.setLabel("Single");
		this.i3Check6.setLabel("Double");
		
		this.i3Prompt1.visible = false;
		
		this.i3Check1.addEventListener(TMouseEvent.WOZCLICK, this.onCheck1);			
		this.i3Check2.addEventListener(TMouseEvent.WOZCLICK, this.onCheck2);						
		this.i3Check3.addEventListener(TMouseEvent.WOZCLICK, this.onCheck3);			
		this.i3Check4.addEventListener(TMouseEvent.WOZCLICK, this.onCheck4);						
		this.i3Check5.addEventListener(TMouseEvent.WOZCLICK, this.onCheck5);			
		this.i3Check6.addEventListener(TMouseEvent.WOZCLICK, this.onCheck6);						
	}

	
	public initHouse():void
	{
		CUtil.trace("TIntroPart3:Constructor");


		// Initialize the House to the opposite of the initial setup
		//
		if(this.tutorAutoObj["Sintro2"].this.i1p2tabController.this.sel1 == "Sitem1")	// left chimney
		{
			this.i1p3imgTool["chimneyRight"].visible = true;
			
			this.i3Check1.setCheck(false);
			this.i3Check2.setCheck(false);				
			
			this.corSel1 = false;
			this.corSel2 = true;
		}
		else
		{
			this.i1p3imgTool["chimneyLeft"].visible = true;
			
			this.i3Check1.setCheck(false);
			this.i3Check2.setCheck(false);				
			
			this.corSel1 = true;
			this.corSel2 = false;
		}
		
		if(this.tutorAutoObj["Sintro2"].this.i1p2tabController.this.sel2 == "Sitem1")  // pink paint
		{
			this.i1p3imgTool["bluePaint"].visible = true;
			
			this.i3Check3.setCheck(true);
			this.i3Check4.setCheck(false);				
			
			this.corSel3 = false;
			this.corSel4 = true;				
		}
		else
		{
			this.i1p3imgTool["pinkPaint"].visible = true;
			
			this.i3Check3.setCheck(false);
			this.i3Check4.setCheck(true);				
			
			this.corSel3 = true;
			this.corSel4 = false;				
		}
		
		if(this.tutorAutoObj["Sintro2"].this.i1p2tabController.this.sel3 == "Sitem1")	// single door
		{
			this.i1p3imgTool["doubleDoor"].visible = true;
			
			this.i3Check5.setCheck(true);
			this.i3Check6.setCheck(true);				
			
			this.corSel5 = false;
			this.corSel6 = true;
		}
		else
		{
			this.i1p3imgTool["singleDoor"].visible = true;
			
			this.i3Check5.setCheck(true);
			this.i3Check6.setCheck(true);				
			
			this.corSel5 = true;
			this.corSel6 = false;
		}		

		// The setup has been initialized
		//
		this.fInitialized = true;
	}

	
//***** Circle Check Actions

	private  onCheck1(evt:TMouseEvent)
	{
		if((this.i3Check1.getChecked() == this.corSel1) && 
			(this.i3Check2.getChecked() == this.corSel2))
										 this.roofDone = true;
									else this.roofDone = false;
		this.queryFinished();
	}

	private  onCheck2(evt:TMouseEvent)
	{
		if((this.i3Check1.getChecked() == this.corSel1) && 
			(this.i3Check2.getChecked() == this.corSel2))
											this.roofDone = true;
									else this.roofDone = false;
		this.queryFinished();
	}


	private  onCheck3(evt:TMouseEvent)
	{
		if((this.i3Check3.getChecked() == this.corSel3) && 
			(this.i3Check4.getChecked() == this.corSel4))
											this.colorDone = true;
									else this.colorDone = false;
		this.queryFinished();
	}

	private  onCheck4(evt:TMouseEvent)
	{
		if((this.i3Check3.getChecked() == this.corSel3) && 
			(this.i3Check4.getChecked() == this.corSel4))
											this.colorDone = true;
									else this.colorDone = false;			
		this.queryFinished();
	}
	

	private  onCheck5(evt:TMouseEvent)
	{
		if((this.i3Check5.getChecked() == this.corSel5) && 
			(this.i3Check6.getChecked() == this.corSel6))
											this.doorDone = true;
									else this.doorDone = false;
		this.queryFinished();
	}

	private  onCheck6(evt:TMouseEvent)
	{
		if((this.i3Check5.getChecked() == this.corSel5) && 
			(this.i3Check6.getChecked() == this.corSel6))
											this.doorDone = true;
									else this.doorDone = false;										
		this.queryFinished();
	}
	
	
//******** Navigation update control		
	
	public queryFinished()
	{
		if(!this.fComplete && this.roofDone && this.colorDone && this.doorDone)
		{
			this.fComplete = true;

			// Update the navigation buttons
			//
			this.updateNav();
			
			if(!this.fPrompted)
			{
				CUtil.trace("Prompting - Prompt1");
				
				this.i3Prompt1.visible = true;
				this.i3Prompt1.gotoAndPlay(2);
				
				this.fPrompted = true;
			}
		}
	}
	
	
//****** Overridden Behaviors

//*************** Logging state management

	public captureLogState(obj:any = null) : Object
	{
		obj = super.captureLogState(obj);
		
		obj['scene']          = this.name;
		obj['this.i3Check1']  = this.i3Check1.captureLogState();
		obj['this.i3Check2']  = this.i3Check2.captureLogState();
		obj['this.i3Check3']  = this.i3Check3.captureLogState();
		obj['this.i3Check4']  = this.i3Check4.captureLogState();
		obj['this.i3Check5']  = this.i3Check5.captureLogState();
		obj['this.i3Check6']  = this.i3Check6.captureLogState();
		
		obj['i1p3imgTool']  = this.i1p3imgTool.captureLogState();
		
		return obj;											   
	}				
			
	public captureXMLState() :any
	{		
		let sceneState:any = {name:this.name}; //<scene name={name}/>;
				
		sceneState.appendChild(this.i3Check1.captureXMLState());
		sceneState.appendChild(this.i3Check2.captureXMLState());
		sceneState.appendChild(this.i3Check3.captureXMLState());
		sceneState.appendChild(this.i3Check4.captureXMLState());
		sceneState.appendChild(this.i3Check5.captureXMLState());
		sceneState.appendChild(this.i3Check6.captureXMLState());
				
		sceneState.appendChild(this.i1p3imgTool.captureXMLState());
		
		return sceneState;
	}		

	public restoreXMLState(xmlState:any) : void
	{
	}		
	
	public compareXMLState(xmlState:any) :boolean
	{
		let bTest:boolean = true;			
		return bTest;			
	}		
	
//*************** Logging state management


	// Update the Navigation Features on entry
	//
	public preEnterScene(lTutor:any, sceneLabel:string, sceneTitle:string, scenePage:string, Direction:string ) :string
	{
		CUtil.trace("TIntroPart3 Pre-Enter Scene Behavior: " + sceneTitle);		
		
		if(!this.fInitialized)
				this.initHouse();
			
		// Make sure the prompt is offscreen
		//
		this.i3Prompt1.visible = false;
		
		return super.preEnterScene(lTutor, sceneLabel, sceneTitle, scenePage, Direction );
	}

	
	public preExitScene(Direction:string, sceneCurr:number ) :string
	{				
		CUtil.trace("TIntroPart3 Enter Scene Behavior:");
		
		return("OK");
	}

	
//****** Overridable Behaviors
	
}