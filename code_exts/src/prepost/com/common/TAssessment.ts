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

import { TAssessIcon } from "./TAssessIcon";

import { TRoot }		from "thermite/TRoot";
import { TObject }		from "thermite/TObject";
import { TScene }		from "thermite/TScene";
import { CUtil } 		from "util/CUtil";

import MovieClip     		  = createjs.MovieClip;
import Timeline     		  = createjs.Timeline;
import DisplayObject 		  = createjs.DisplayObject;
import DisplayObjectContainer = createjs.Container;
import Text					  = createjs.Text;



export class TAssessment extends TObject
{
	//************ Stage Symbols
	
	public Sstar1:TAssessIcon;
	public Sstar2:TAssessIcon;
	public Sstar3:TAssessIcon;
	public Sstar4:TAssessIcon;
	public Sstar5:TAssessIcon;
	public Sstar6:TAssessIcon;
	public Sstar7:TAssessIcon;
	public Sstar8:TAssessIcon;
	public Sstar9:TAssessIcon;		
	
	public Sresult:Text;
	
	// non-interactive elements
	
	
	//************ Stage Symbols				
	
	
	constructor()
	{
		super();
	}
}
