/// <reference path="../../dist/TutorEngineOne.d.ts" />
/// <reference types="easeljs" />
/// <reference types="createjs-lib" />
declare module "com/common/TSelectorIcons" {
    import { TObject } from "thermite/TObject";
    import DisplayObject = createjs.DisplayObject;
    export class TSelectorIcons extends TObject {
        minutesOne: DisplayObject;
        minutesFive: DisplayObject;
        lightBright: DisplayObject;
        lightDim: DisplayObject;
        cardWords: DisplayObject;
        cardIcons: DisplayObject;
        studyAlone: DisplayObject;
        studyFriend: DisplayObject;
        drinkSoda: DisplayObject;
        drinkWater: DisplayObject;
        atLibrary: DisplayObject;
        atHome: DisplayObject;
        tiresSmall: DisplayObject;
        tiresLarge: DisplayObject;
        topClosed: DisplayObject;
        topOpen: DisplayObject;
        doorsFour: DisplayObject;
        doorsTwo: DisplayObject;
        threeEgg: DisplayObject;
        oneEgg: DisplayObject;
        sugar: DisplayObject;
        honey: DisplayObject;
        oneWindow: DisplayObject;
        fourWindows: DisplayObject;
        tiltEngines: DisplayObject;
        downEngines: DisplayObject;
        straightBody: DisplayObject;
        curvedBody: DisplayObject;
        ageYounger: DisplayObject;
        ageOlder: DisplayObject;
        drinkLemon: DisplayObject;
        drinkTea: DisplayObject;
        bluePaint: DisplayObject;
        pinkPaint: DisplayObject;
        doubleDoor: DisplayObject;
        singleDoor: DisplayObject;
        chimneyRight: DisplayObject;
        chimneyLeft: DisplayObject;
        temp500: DisplayObject;
        temp350: DisplayObject;
        temp200: DisplayObject;
        clockNoon: DisplayObject;
        clockThree: DisplayObject;
        clockSix: DisplayObject;
        constructor();
        hideAllIcons(): void;
        showIcon(iName: string): void;
    }
}
declare module "com/common/TSelectorItemButton" {
    import { TSelectorIcons } from "com/common/TSelectorIcons";
    import { TButton } from "thermite/TButton";
    import { TRadioButton } from "thermite/TRadioButton";
    export class TSelectorItemButton extends TButton {
        Sicons: TSelectorIcons;
        Scheckbox: TRadioButton;
        constructor();
    }
}
declare module "com/common/TLabeledTab" {
    import { TObject } from "thermite/TObject";
    import DisplayObject = createjs.DisplayObject;
    import Text = createjs.Text;
    export class TLabeledTab extends TObject {
        StabLabel: Text;
        SselTab: DisplayObject;
        constructor();
    }
}
declare module "com/common/TTabTool" {
    import { TSelectorItemButton } from "com/common/TSelectorItemButton";
    import { TButton } from "thermite/TButton";
    import { TLabeledTab } from "com/common/TLabeledTab";
    import { TObject } from "thermite/TObject";
    import DisplayObject = createjs.DisplayObject;
    export class TTabTool extends TObject {
        Sitem1: TSelectorItemButton;
        Sitem2: TSelectorItemButton;
        Sitem3: TSelectorItemButton;
        Sitem4: TSelectorItemButton;
        Sitem5: TSelectorItemButton;
        SdismissButton: TButton;
        StopTab: TLabeledTab;
        ScenterTab: TLabeledTab;
        SbottomTab: TLabeledTab;
        Sframe: DisplayObject;
        constructor();
        hideAllIcons(): void;
    }
}
declare module "com/common/TSelectorButton" {
    import { TButton } from "thermite/TButton";
    import DisplayObject = createjs.DisplayObject;
    import Text = createjs.Text;
    export class TSelectorButton extends TButton {
        SchangeLabel: DisplayObject;
        StopLabel: Text;
        SsubLabel: Text;
        constructor();
    }
}
declare module "com/events/TSelectEvent" {
    import Event = createjs.Event;
    export class TSelectEvent extends Event {
        static readonly WOZTABSELECT: string;
        static readonly WOZIMGSELECT: string;
        selection: string;
        constructor(target: string, type: string, bubbles?: boolean, cancelable?: boolean);
        clone(): Event;
    }
}
declare module "com/common/TController" {
    import { TTabTool } from "com/common/TTabTool";
    import { TSelectorButton } from "com/common/TSelectorButton";
    import { TObject } from "thermite/TObject";
    import { TMouseEvent } from "thermite/events/TMouseEvent";
    export class TController extends TObject {
        StabTool: TTabTool;
        StopButton: TSelectorButton;
        ScenterButton: TSelectorButton;
        SbottomButton: TSelectorButton;
        sel1: string;
        sel2: string;
        sel3: string;
        useChanged: boolean;
        item1Listener: string;
        item2Listener: string;
        item3Listener: string;
        constructor();
        deepStateCopy(src: TObject): void;
        captureLogState(obj?: any): Object;
        captureXMLState(): any;
        restoreXMLState(stateVal: any): void;
        compareXMLState(stateVal: any): boolean;
        initLabels(label1: string, label2: string, label3: string): void;
        enableTool(bFlag: boolean): void;
        showTabTool(item1ID: string, item2ID: string, checkedItem: string, tabID: string): void;
        show3TabTool(item1ID: string, item2ID: string, item3ID: string, checkedItem: string, tabID: string): void;
        resizeDismissMask(showHide: boolean): void;
        dismissTool(eventID: string): void;
        dismiss3Tool(eventID: string): void;
        doDismiss(evt: TMouseEvent): void;
        queryQuestionDone(): void;
        topClick(evt: TMouseEvent): void;
        centerClick(evt: TMouseEvent): void;
        bottomClick(evt: TMouseEvent): void;
    }
}
declare module "com/TBakingController" {
    import { TController } from "com/common/TController";
    import { TMouseEvent } from "thermite/events/TMouseEvent";
    export class TBakingController extends TController {
        constructor();
        topClick(evt: TMouseEvent): void;
        temp200(evt: TMouseEvent): void;
        temp350(evt: TMouseEvent): void;
        temp500(evt: TMouseEvent): void;
        centerClick(evt: TMouseEvent): void;
        honey(evt: TMouseEvent): void;
        sugar(evt: TMouseEvent): void;
        bottomClick(evt: TMouseEvent): void;
        oneEgg(evt: TMouseEvent): void;
        threeEgg(evt: TMouseEvent): void;
        queryQuestionDone(): void;
    }
}
declare module "com/common/TImgTool" {
    import { TObject } from "thermite/TObject";
    import { TMouseEvent } from "thermite/events/TMouseEvent";
    export class TImgTool extends TObject {
        feature1A: string;
        feature1B: string;
        feature2A: string;
        feature2B: string;
        feature3A: string;
        feature3B: string;
        protected useFeatureMask: boolean;
        protected featureMaskA: string;
        protected featureMaskB: string;
        constructor();
        initListeners(): void;
        manageMasks(target: string): void;
        deepStateCopy(src: TObject): void;
        readonly captureLOGString: string;
        captureLogState(obj?: any): Object;
        captureXMLState(): any;
        restoreXMLState(stateVal: any): void;
        compareXMLState(xmlState: any): boolean;
        hideAllButtons(): void;
        enableTool(bFlag: boolean): void;
        logSelection(feature: string): void;
        dofeature1A(evt: TMouseEvent): void;
        dofeature1B(evt: TMouseEvent): void;
        dofeature2A(evt: TMouseEvent): void;
        dofeature2B(evt: TMouseEvent): void;
        dofeature3A(evt: TMouseEvent): void;
        dofeature3B(evt: TMouseEvent): void;
    }
}
declare module "com/common/TImgTool322" {
    import { TImgTool } from "com/common/TImgTool";
    import { TObject } from "thermite/TObject";
    import { TMouseEvent } from "thermite/events/TMouseEvent";
    export class TImgTool322 extends TImgTool {
        [key: string]: any;
        feature1C: string;
        constructor();
        initListeners(): void;
        deepStateCopy(src: TObject): void;
        readonly captureLOGString: string;
        captureLogState(obj?: any): Object;
        captureXMLState(): any;
        restoreXMLState(stateVal: any): void;
        enableTool(bFlag: boolean): void;
        dofeature1C(evt: TMouseEvent): void;
    }
}
declare module "com/TBakingImgTool" {
    import { TImgTool322 } from "com/common/TImgTool322";
    import { TButton } from "thermite/TButton";
    export class TBakingImgTool extends TImgTool322 {
        temp200: TButton;
        temp350: TButton;
        temp500: TButton;
        honey: TButton;
        sugar: TButton;
        oneEgg: TButton;
        threeEgg: TButton;
        constructor();
    }
}
declare module "com/TCarsController" {
    import { TController } from "com/common/TController";
    import { TMouseEvent } from "thermite/events/TMouseEvent";
    export class TCarsController extends TController {
        constructor();
        topClick(evt: TMouseEvent): void;
        topClosed(evt: TMouseEvent): void;
        topOpen(evt: TMouseEvent): void;
        centerClick(evt: TMouseEvent): void;
        doorsTwo(evt: TMouseEvent): void;
        doorsFour(evt: TMouseEvent): void;
        bottomClick(evt: TMouseEvent): void;
        tiresLarge(evt: TMouseEvent): void;
        tiresSmall(evt: TMouseEvent): void;
        queryQuestionDone(): void;
    }
}
declare module "com/TCarsImgTool" {
    import { TImgTool } from "com/common/TImgTool";
    import { TButton } from "thermite/TButton";
    export class TCarsImgTool extends TImgTool {
        topClosed: TButton;
        topOpen: TButton;
        doorsTwo: TButton;
        doorsFour: TButton;
        tiresLarge: TButton;
        tiresSmall: TButton;
        constructor();
    }
}
declare module "com/TDrinkController" {
    import { TController } from "com/common/TController";
    import { TMouseEvent } from "thermite/events/TMouseEvent";
    export class TDrinkController extends TController {
        constructor();
        topClick(evt: TMouseEvent): void;
        clockNoon(evt: TMouseEvent): void;
        clockThree(evt: TMouseEvent): void;
        clockSix(evt: TMouseEvent): void;
        centerClick(evt: TMouseEvent): void;
        ageYoung(evt: TMouseEvent): void;
        ageOlder(evt: TMouseEvent): void;
        bottomClick(evt: TMouseEvent): void;
        drinkLemon(evt: TMouseEvent): void;
        drinkTea(evt: TMouseEvent): void;
        queryQuestionDone(): void;
    }
}
declare module "com/TDrinkImgTool" {
    import { TImgTool322 } from "com/common/TImgTool322";
    import { TButton } from "thermite/TButton";
    export class TDrinkImgTool extends TImgTool322 {
        clockNoon: TButton;
        clockThree: TButton;
        clockSix: TButton;
        ageYoung: TButton;
        ageOlder: TButton;
        drinkLemon: TButton;
        drinkTea: TButton;
        constructor();
    }
}
declare module "com/THouseController" {
    import { TController } from "com/common/TController";
    import { TMouseEvent } from "thermite/events/TMouseEvent";
    export class THouseController extends TController {
        constructor();
        topClick(evt: TMouseEvent): void;
        chimneyLeft(evt: TMouseEvent): void;
        chimneyRight(evt: TMouseEvent): void;
        centerClick(evt: TMouseEvent): void;
        pinkPaint(evt: TMouseEvent): void;
        bluePaint(evt: TMouseEvent): void;
        bottomClick(evt: TMouseEvent): void;
        singleDoor(evt: TMouseEvent): void;
        doubleDoor(evt: TMouseEvent): void;
        queryQuestionDone(): void;
    }
}
declare module "com/THouseImgTool" {
    import { TImgTool } from "com/common/TImgTool";
    import { TButton } from "thermite/TButton";
    export class THouseImgTool extends TImgTool {
        singleDoor: TButton;
        doubleDoor: TButton;
        bluePaint: TButton;
        pinkPaint: TButton;
        chimneyLeft: TButton;
        chimneyRight: TButton;
        constructor();
    }
}
declare module "com/TMemoryController" {
    import { TController } from "com/common/TController";
    import { TMouseEvent } from "thermite/events/TMouseEvent";
    export class TMemoryController extends TController {
        constructor();
        topClick(evt: TMouseEvent): void;
        lightBright(evt: TMouseEvent): void;
        lightDim(evt: TMouseEvent): void;
        centerClick(evt: TMouseEvent): void;
        cardIcons(evt: TMouseEvent): void;
        cardWords(evt: TMouseEvent): void;
        bottomClick(evt: TMouseEvent): void;
        minutesOne(evt: TMouseEvent): void;
        minutesFive(evt: TMouseEvent): void;
        queryQuestionDone(): void;
    }
}
declare module "com/TMemoryImgTool" {
    import { TImgTool } from "com/common/TImgTool";
    import { TButton } from "thermite/TButton";
    export class TMemoryImgTool extends TImgTool {
        lightBright: TButton;
        lightDim: TButton;
        cardIcons: TButton;
        cardWords: TButton;
        minutesOne: TButton;
        minutesFive: TButton;
        currentEvtTar: Function;
        constructor();
        manageMasks(target: string): void;
    }
}
declare module "com/TRocketController" {
    import { TController } from "com/common/TController";
    import { TMouseEvent } from "thermite/events/TMouseEvent";
    export class TRocketController extends TController {
        constructor();
        topClick(evt: TMouseEvent): void;
        curvedBody(evt: TMouseEvent): void;
        straightBody(evt: TMouseEvent): void;
        centerClick(evt: TMouseEvent): void;
        oneWindow(evt: TMouseEvent): void;
        fourWindow(evt: TMouseEvent): void;
        bottomClick(evt: TMouseEvent): void;
        downEngines(evt: TMouseEvent): void;
        tiltEngines(evt: TMouseEvent): void;
        queryQuestionDone(): void;
    }
}
declare module "com/TRocketImgTool" {
    import { TImgTool } from "com/common/TImgTool";
    import { TButton } from "thermite/TButton";
    export class TRocketImgTool extends TImgTool {
        curvedBody: TButton;
        straightBody: TButton;
        oneWindow: TButton;
        fourWindow: TButton;
        downEngines: TButton;
        tiltEngines: TButton;
        constructor();
    }
}
declare module "com/TStudyController" {
    import { TController } from "com/common/TController";
    import { TMouseEvent } from "thermite/events/TMouseEvent";
    export class TStudyController extends TController {
        constructor();
        topClick(evt: TMouseEvent): void;
        studyAlone(evt: TMouseEvent): void;
        studyFriend(evt: TMouseEvent): void;
        centerClick(evt: TMouseEvent): void;
        atHome(evt: TMouseEvent): void;
        atLibrary(evt: TMouseEvent): void;
        bottomClick(evt: TMouseEvent): void;
        drinkWater(evt: TMouseEvent): void;
        drinkSoda(evt: TMouseEvent): void;
        queryQuestionDone(): void;
    }
}
declare module "com/TStudyImgTool" {
    import { TImgTool } from "com/common/TImgTool";
    import { TButton } from "thermite/TButton";
    export class TStudyImgTool extends TImgTool {
        studyAlone: TButton;
        studyFriend: TButton;
        atHome: TButton;
        atLibrary: TButton;
        drinkWater: TButton;
        drinkSoda: TButton;
        constructor();
    }
}
declare module "com/common/TAssessIcon" {
    import { TObject } from "thermite/TObject";
    export class TAssessIcon extends TObject {
        Sright: TObject;
        Swrong: TObject;
        SplaceKeeper: TObject;
        constructor();
        show(icon: string): void;
    }
}
declare module "com/common/TAssessment" {
    import { TAssessIcon } from "com/common/TAssessIcon";
    import { TObject } from "thermite/TObject";
    import Text = createjs.Text;
    export class TAssessment extends TObject {
        Sstar1: TAssessIcon;
        Sstar2: TAssessIcon;
        Sstar3: TAssessIcon;
        Sstar4: TAssessIcon;
        Sstar5: TAssessIcon;
        Sstar6: TAssessIcon;
        Sstar7: TAssessIcon;
        Sstar8: TAssessIcon;
        Sstar9: TAssessIcon;
        Sresult: Text;
        constructor();
    }
}
declare module "com/common/TCircleControl" {
    import { TCheckButton } from "thermite/TCheckButton";
    import DisplayObject = createjs.DisplayObject;
    export class TCircleControl extends TCheckButton {
        SdisabledUp: DisplayObject;
        SdisabledDown: DisplayObject;
        constructor();
        logClick(): void;
        resetState(): void;
        gotoState(sState: string): void;
        readonly captureLOGString: string;
        captureLOGState(): any;
        restoreXMLState(xmlState: any): void;
        compareXMLState(xmlState: any): boolean;
    }
}
declare module "com/common/TLabelControl" {
    import Text = createjs.Text;
    export class TLabelControl extends Text {
        Slabel: Text;
        constructor();
        setLabel(newLabel: string, colour?: number): void;
    }
}
declare module "com/common/TNavCollection" {
    import { TObject } from "thermite/TObject";
    export class TNavCollection extends TObject {
        traceMode: boolean;
        constructor();
    }
}
declare module "com/common/TPrompt" {
    import { TObject } from "thermite/TObject";
    export class TPrompt extends TObject {
        traceTPrompt: boolean;
        constructor();
        setObjMode(TutScene: any, sMode: string): void;
        dumpSceneObjs(TutScene: any): void;
    }
}
declare module "com/common/TNextPrompt" {
    import { TPrompt } from "com/common/TPrompt";
    export class TNextPrompt extends TPrompt {
        constructor();
    }
}
declare module "com/common/TPanelDark" {
    import { TButton } from "thermite/TButton";
    export class TPanelDark extends TButton {
        constructor();
    }
}
declare module "com/common/TPanelLight" {
    import { TButton } from "thermite/TButton";
    export class TPanelLight extends TButton {
        constructor();
    }
}
declare module "com/common/TSelector" {
    import { TObject } from "thermite/TObject";
    import { TMouseEvent } from "thermite/events/TMouseEvent";
    export class TSelector extends TObject {
        constructor();
        setAutomation(bFlag: boolean): void;
        doMouseClick(evt: TMouseEvent): void;
        doMouseDown(evt: TMouseEvent): void;
        doMouseUp(evt: TMouseEvent): void;
        doMouseOver(evt: TMouseEvent): void;
        doMouseOut(evt: TMouseEvent): void;
    }
}
declare module "com/common/TTip1" {
    import { TScene } from "thermite/TScene";
    export class TTip1 extends TScene {
        constructor();
    }
}
declare module "com/events/TNavEvent" {
    import Event = createjs.Event;
    export class TNavEvent extends Event {
        static readonly WOZNAVNEXT: string;
        static readonly WOZNAVBACK: string;
        static readonly WOZNAVTO: string;
        static readonly WOZNAVINC: string;
        static readonly WOZNAVREPLAY: string;
        wozNavTarget: string;
        wozFeatures: string;
        constructor(type: string, _target?: string, _featureSet?: string, bubbles?: boolean, cancelable?: boolean);
        clone(): Event;
    }
}
declare module "sceneExt/TAssess" {
    import { TAssessment } from "com/common/TAssessment";
    import { TScene } from "thermite/TScene";
    export class TAssess extends TScene {
        Sassess: TAssessment;
        constructor();
        preEnterScene(lTutor: any, sceneLabel: string, sceneTitle: string, scenePage: string, Direction: string): string;
    }
}
declare module "sceneExt/TEndSplash" {
    import { TButton } from "thermite/TButton";
    import { TScene } from "thermite/TScene";
    export class TEndSplash extends TScene {
        SdoneButton: TButton;
        constructor();
        onDoneClick(evt: Event): void;
        readonly assessCorrect: string;
        readonly designCorrect: string;
        preEnterScene(lTutor: any, sceneLabel: string, sceneTitle: string, scenePage: string, Direction: string): string;
        preExitScene(Direction: string, sceneCurr: number): string;
    }
}
declare module "sceneExt/TExpSceneTyp1" {
    import { TSelectEvent } from "com/events/TSelectEvent";
    import { TScene } from "thermite/TScene";
    export class TExpSceneTyp1 extends TScene {
        traceTExpSceneTyp1: boolean;
        selOneA: string;
        selOneB: string;
        selTwoA: string;
        selTwoB: string;
        selThreeA: string;
        selThreeB: string;
        imgTool1: string;
        imgTool2: string;
        tabController1: string;
        tabController2: string;
        protected sType: string;
        cvsEncoding: Array<string>;
        constructor();
        encodeExptString(TVTEXT: string, TV: string, NTV1: string, NTV2: string): string;
        encodeExptState(TVTEXT: string, TV: string, NTV1: string, NTV2: string): any;
        doImageMapA(evt: TSelectEvent): void;
        doTabMapA(evt: TSelectEvent): void;
        doImageMapB(evt: TSelectEvent): void;
        doTabMapB(evt: TSelectEvent): void;
    }
}
declare module "sceneExt/TExpSceneTyp2" {
    import { TSelectEvent } from "com/events/TSelectEvent";
    import { TScene } from "thermite/TScene";
    export class TExpSceneTyp2 extends TScene {
        traceTExpSceneTyp2: boolean;
        selOneA: string;
        selOneB: string;
        selOneC: string;
        selTwoA: string;
        selTwoB: string;
        selThreeA: string;
        selThreeB: string;
        imgTool1: string;
        imgTool2: string;
        tabController1: string;
        tabController2: string;
        protected sType: string;
        cvsEncoding: Array<string>;
        constructor();
        encodeExptString(TVTEXT: string, TV: string, NTV1: string, NTV2: string): string;
        encodeExptState(TVTEXT: string, TV: string, NTV1: string, NTV2: string): any;
        doImageMapA(evt: TSelectEvent): void;
        doTabMapA(evt: TSelectEvent): void;
        doImageMapB(evt: TSelectEvent): void;
        doTabMapB(evt: TSelectEvent): void;
    }
}
declare module "sceneExt/TIntroPart1" {
    import { THouseImgTool } from "com/THouseImgTool";
    import { THouseController } from "com/THouseController";
    import { TSelectEvent } from "com/events/TSelectEvent";
    import { TScene } from "thermite/TScene";
    export class TIntroPart1 extends TScene {
        i1p1imgTool: THouseImgTool;
        i1p1tabController: THouseController;
        constructor();
        doImageMap(evt: TSelectEvent): void;
        doTabMap(evt: TSelectEvent): void;
        captureLogState(obj?: any): Object;
        captureXMLState(): any;
        restoreXMLState(xmlState: any): void;
        compareXMLState(xmlState: any): boolean;
        preExitScene(Direction: string, sceneCurr: number): string;
    }
}
declare module "sceneExt/TIntroPart2" {
    import { THouseImgTool } from "com/THouseImgTool";
    import { THouseController } from "com/THouseController";
    import { TSelectEvent } from "com/events/TSelectEvent";
    import { TScene } from "thermite/TScene";
    export class TIntroPart2 extends TScene {
        i1p2imgTool: THouseImgTool;
        i1p2tabController: THouseController;
        fInitialized: boolean;
        private fStateCap;
        expState: any;
        constructor();
        initHouse(): void;
        doImageMap(evt: TSelectEvent): void;
        doTabMap(evt: TSelectEvent): void;
        questionFinished(evt: Event): void;
        setLabels(): void;
        captureLogState(obj?: any): Object;
        captureXMLState(): any;
        restoreXMLState(xmlState: any): void;
        compareXMLState(xmlState: any): boolean;
        preEnterScene(lTutor: any, sceneLabel: string, sceneTitle: string, scenePage: string, Direction: string): string;
        preExitScene(Direction: string, sceneCurr: number): string;
    }
}
declare module "sceneExt/TIntroPart3" {
    import { THouseImgTool } from "com/THouseImgTool";
    import { TCircleControl } from "com/common/TCircleControl";
    import { TPrompt } from "com/common/TPrompt";
    import { TScene } from "thermite/TScene";
    export class TIntroPart3 extends TScene {
        i1p3imgTool: THouseImgTool;
        i3Check1: TCircleControl;
        i3Check2: TCircleControl;
        i3Check3: TCircleControl;
        i3Check4: TCircleControl;
        i3Check5: TCircleControl;
        i3Check6: TCircleControl;
        i3Prompt1: TPrompt;
        fInitialized: boolean;
        fPrompted: boolean;
        roofDone: boolean;
        colorDone: boolean;
        doorDone: boolean;
        corSel1: boolean;
        corSel2: boolean;
        corSel3: boolean;
        corSel4: boolean;
        corSel5: boolean;
        corSel6: boolean;
        constructor();
        initHouse(): void;
        private onCheck1(evt);
        private onCheck2(evt);
        private onCheck3(evt);
        private onCheck4(evt);
        private onCheck5(evt);
        private onCheck6(evt);
        queryFinished(): void;
        captureLogState(obj?: any): Object;
        captureXMLState(): any;
        restoreXMLState(xmlState: any): void;
        compareXMLState(xmlState: any): boolean;
        preEnterScene(lTutor: any, sceneLabel: string, sceneTitle: string, scenePage: string, Direction: string): string;
        preExitScene(Direction: string, sceneCurr: number): string;
    }
}
declare module "sceneExt/TIntroSplash" {
    import { TObject } from "thermite/TObject";
    import { TScene } from "thermite/TScene";
    export class TIntroSplash extends TScene {
        SplashFrame1: TObject;
        SplashFrameShadow: TObject;
        constructor();
        preEnterScene(lTutor: any, sceneLabel: string, sceneTitle: string, scenePage: string, Direction: string): string;
    }
}
declare module "sceneExt/TPostIntroSplash" {
    import { TObject } from "thermite/TObject";
    import { TScene } from "thermite/TScene";
    export class TPostIntroSplash extends TScene {
        SplashFrame1: TObject;
        SplashFrameShadow: TObject;
        constructor();
        preEnterScene(lTutor: any, sceneLabel: string, sceneTitle: string, scenePage: string, Direction: string): string;
    }
}
declare module "sceneExt/TQ1APart1" {
    import { TExpSceneTyp2 } from "sceneExt/TExpSceneTyp2";
    import { TDrinkImgTool } from "com/TDrinkImgTool";
    import { TDrinkController } from "com/TDrinkController";
    import { TObject } from "thermite/TObject";
    import { TButton } from "thermite/TButton";
    import { TMouseEvent } from "thermite/events/TMouseEvent";
    export class TQ1APart1 extends TExpSceneTyp2 {
        q1Title1: TObject;
        q1Title2: TObject;
        q1Title3: TObject;
        q1Title4: TObject;
        q1Title5: TObject;
        q1MarkRight: TObject;
        q1MarkLeft: TObject;
        q1IFrame1: TObject;
        q1QFrame1: TObject;
        q1DesignButton: TButton;
        imgToolAq1: TDrinkImgTool;
        imgToolBq1: TDrinkImgTool;
        tabControllerAq1: TDrinkController;
        tabControllerBq1: TDrinkController;
        q1FrameA: TObject;
        q1FrameB: TObject;
        private navSkipPanel;
        constructor();
        onGotoDesign(evt: TMouseEvent): void;
        preEnterScene(Tutor: any, sceneLabel: string, sceneTitle: string, scenePage: string, Direction: string): string;
        preExitScene(Direction: string, sceneCurr: number): string;
    }
}
declare module "sceneExt/TQ1APart1B" {
    import { TExpSceneTyp2 } from "sceneExt/TExpSceneTyp2";
    import { TDrinkImgTool } from "com/TDrinkImgTool";
    import { TDrinkController } from "com/TDrinkController";
    import { TObject } from "thermite/TObject";
    import { TTextInput } from "thermite/TTextInput";
    export class TQ1APart1B extends TExpSceneTyp2 {
        q1Title1: TObject;
        q1Title2: TObject;
        q1Title3: TObject;
        q1Title4: TObject;
        q1Title5: TObject;
        q1Title6: TObject;
        q1Title7: TObject;
        q1Title8: TObject;
        q1MarkRight: TObject;
        q1MarkLeft: TObject;
        q1IFrame1: TObject;
        q1QFrame1: TObject;
        q1QFrame2: TObject;
        imgToolAq1: TDrinkImgTool;
        imgToolBq1: TDrinkImgTool;
        tabControllerAq1: TDrinkController;
        tabControllerBq1: TDrinkController;
        q1TextControl1: TTextInput;
        q1FrameA: TObject;
        q1FrameB: TObject;
        fCompleteA: boolean;
        fCompleteB: boolean;
        constructor();
        questionFinishedA(evt: Event): void;
        questionFinishedB(evt: Event): void;
        captureLogState(obj?: any): Object;
        captureXMLState(): any;
        restoreXMLState(xmlState: any): void;
        compareXMLState(xmlState: any): boolean;
        preExitScene(Direction: string, sceneCurr: number): string;
    }
}
declare module "sceneExt/TQ1APart2" {
    import { TExpSceneTyp2 } from "sceneExt/TExpSceneTyp2";
    import { TDrinkImgTool } from "com/TDrinkImgTool";
    import { TDrinkController } from "com/TDrinkController";
    import { TObject } from "thermite/TObject";
    import { TTextInput } from "thermite/TTextInput";
    export class TQ1APart2 extends TExpSceneTyp2 {
        q1Title1: TObject;
        q1Title2: TObject;
        q1Title3: TObject;
        q1Title4: TObject;
        q1Title5: TObject;
        q1Title6: TObject;
        q1Title7: TObject;
        q1Title8: TObject;
        q1MarkRight: TObject;
        q1MarkLeft: TObject;
        q1IFrame1: TObject;
        q1QFrame1: TObject;
        q1QFrame2: TObject;
        imgToolAq1: TDrinkImgTool;
        imgToolBq1: TDrinkImgTool;
        tabControllerAq1: TDrinkController;
        tabControllerBq1: TDrinkController;
        q1TextControl1: TTextInput;
        q1FrameA: TObject;
        q1FrameB: TObject;
        fStateCap: boolean;
        expState: any;
        constructor();
        questionFinished(evt: Event): void;
        preEnterScene(lTutor: any, sceneLabel: string, sceneTitle: string, scenePage: string, Direction: string): string;
        onEnterScene(Direction: string): void;
        preExitScene(Direction: string, sceneCurr: number): string;
    }
}
declare module "sceneExt/TQ1BPart1" {
    import { TExpSceneTyp2 } from "sceneExt/TExpSceneTyp2";
    import { TBakingImgTool } from "com/TBakingImgTool";
    import { TBakingController } from "com/TBakingController";
    import { TObject } from "thermite/TObject";
    import { TButton } from "thermite/TButton";
    import { TMouseEvent } from "thermite/events/TMouseEvent";
    export class TQ1BPart1 extends TExpSceneTyp2 {
        q1Title1: TObject;
        q1Title2: TObject;
        q1Title3: TObject;
        q1Title4: TObject;
        q1Title5: TObject;
        q1MarkRight: TObject;
        q1MarkLeft: TObject;
        q1IFrame1: TObject;
        q1QFrame1: TObject;
        q1DesignButton: TButton;
        imgToolAq1: TBakingImgTool;
        imgToolBq1: TBakingImgTool;
        tabControllerAq1: TBakingController;
        tabControllerBq1: TBakingController;
        q1FrameA: TObject;
        q1FrameB: TObject;
        navSkipPanel: boolean;
        constructor();
        onGotoDesign(evt: TMouseEvent): void;
        preEnterScene(Tutor: any, sceneLabel: string, sceneTitle: string, scenePage: string, Direction: string): string;
        preExitScene(Direction: string, sceneCurr: number): string;
    }
}
declare module "sceneExt/TQ1BPart1B" {
    import { TExpSceneTyp2 } from "sceneExt/TExpSceneTyp2";
    import { TBakingImgTool } from "com/TBakingImgTool";
    import { TBakingController } from "com/TBakingController";
    import { TObject } from "thermite/TObject";
    import { TButton } from "thermite/TButton";
    import { TTextInput } from "thermite/TTextInput";
    export class TQ1BPart1B extends TExpSceneTyp2 {
        q1Title1: TObject;
        q1Title2: TObject;
        q1Title3: TObject;
        q1Title4: TObject;
        q1Title5: TObject;
        q1Title6: TObject;
        q1Title7: TObject;
        q1Title8: TObject;
        q1MarkRight: TObject;
        q1MarkLeft: TObject;
        q1IFrame1: TObject;
        q1QFrame1: TObject;
        q1QFrame2: TObject;
        q1DesignButton: TButton;
        imgToolAq1: TBakingImgTool;
        imgToolBq1: TBakingImgTool;
        tabControllerAq1: TBakingController;
        tabControllerBq1: TBakingController;
        q1TextControl1: TTextInput;
        q1FrameA: TObject;
        q1FrameB: TObject;
        fCompleteA: boolean;
        fCompleteB: boolean;
        constructor();
        questionFinishedA(evt: Event): void;
        questionFinishedB(evt: Event): void;
        captureLogState(obj?: any): Object;
        captureXMLState(): any;
        restoreXMLState(xmlState: any): void;
        compareXMLState(xmlState: any): boolean;
        preExitScene(Direction: string, sceneCurr: number): string;
    }
}
declare module "sceneExt/TQ1BPart2" {
    import { TExpSceneTyp2 } from "sceneExt/TExpSceneTyp2";
    import { TBakingImgTool } from "com/TBakingImgTool";
    import { TBakingController } from "com/TBakingController";
    import { TObject } from "thermite/TObject";
    import { TButton } from "thermite/TButton";
    import { TTextInput } from "thermite/TTextInput";
    export class TQ1BPart2 extends TExpSceneTyp2 {
        q1Title1: TObject;
        q1Title2: TObject;
        q1Title3: TObject;
        q1Title4: TObject;
        q1Title5: TObject;
        q1Title6: TObject;
        q1Title7: TObject;
        q1Title8: TObject;
        q1MarkRight: TObject;
        q1MarkLeft: TObject;
        q1IFrame1: TObject;
        q1QFrame1: TObject;
        q1QFrame2: TObject;
        q1DesignButton: TButton;
        imgToolAq1: TBakingImgTool;
        imgToolBq1: TBakingImgTool;
        tabControllerAq1: TBakingController;
        tabControllerBq1: TBakingController;
        q1TextControl1: TTextInput;
        q1FrameA: TObject;
        q1FrameB: TObject;
        fStateCap: boolean;
        expState: any;
        constructor();
        questionFinished(evt: Event): void;
        preEnterScene(lTutor: any, sceneLabel: string, sceneTitle: string, scenePage: string, Direction: string): string;
        onEnterScene(Direction: string): void;
        preExitScene(Direction: string, sceneCurr: number): string;
    }
}
declare module "sceneExt/TQ2APart1" {
    import { TExpSceneTyp2 } from "sceneExt/TExpSceneTyp2";
    import { TDrinkImgTool } from "com/TDrinkImgTool";
    import { TDrinkController } from "com/TDrinkController";
    import { TCircleControl } from "com/common/TCircleControl";
    import { TObject } from "thermite/TObject";
    export class TQ2APart1 extends TExpSceneTyp2 {
        q2Title1: TObject;
        q2Title3: TObject;
        q2Title5: TObject;
        q2MarkRight: TObject;
        q2MarkLeft: TObject;
        q2IFrame1: TObject;
        q2QFrame1: TObject;
        imgToolCq2: TDrinkImgTool;
        imgToolDq2: TDrinkImgTool;
        tabControllerCq2: TDrinkController;
        tabControllerDq2: TDrinkController;
        q2Check1: TCircleControl;
        q2Check2: TCircleControl;
        q2Arrow1: TObject;
        q2FrameA: TObject;
        q2FrameB: TObject;
        q2FrameC: TObject;
        q2FrameD: TObject;
        constructor();
        check1Clicked(evt: Event): void;
        check2Clicked(evt: Event): void;
        questionFinished(evt: Event): void;
        captureLogState(obj?: any): Object;
        captureXMLState(): any;
        restoreXMLState(xmlState: any): void;
        compareXMLState(xmlState: any): boolean;
        preExitScene(Direction: string, sceneCurr: number): string;
    }
}
declare module "sceneExt/TQ2APart2" {
    import { TExpSceneTyp2 } from "sceneExt/TExpSceneTyp2";
    import { TDrinkImgTool } from "com/TDrinkImgTool";
    import { TDrinkController } from "com/TDrinkController";
    import { TCircleControl } from "com/common/TCircleControl";
    import { TLabelControl } from "com/common/TLabelControl";
    import { TObject } from "thermite/TObject";
    import { TButton } from "thermite/TButton";
    import { TScene } from "thermite/TScene";
    import { TTextInput } from "thermite/TTextInput";
    export class TQ2APart2 extends TExpSceneTyp2 {
        q2Title1: TObject;
        q2Title2: TObject;
        q2Title3A: TObject;
        q2Title4: TLabelControl;
        q2Title5: TObject;
        q2Title6: TObject;
        q2Title7: TLabelControl;
        q2MarkRight: TObject;
        q2MarkLeft: TObject;
        q2IFrame1: TObject;
        q2QFrame1: TObject;
        q2DesignButton: TButton;
        imgToolCq2: TDrinkImgTool;
        imgToolDq2: TDrinkImgTool;
        tabControllerCq2: TDrinkController;
        tabControllerDq2: TDrinkController;
        q2TextControl1: TTextInput;
        q2Check1: TCircleControl;
        q2Check2: TCircleControl;
        q2Arrow1: TObject;
        q2FrameA: TObject;
        q2FrameB: TObject;
        q2FrameC: TObject;
        q2FrameD: TObject;
        fStateCap: boolean;
        sceneState: any;
        constructor();
        checkChange(evt: Event): void;
        questionFinished(evt: Event): void;
        updateQText(wozScene: TScene): void;
        preEnterScene(lTutor: any, sceneLabel: string, sceneTitle: string, scenePage: string, Direction: string): string;
        onEnterScene(Direction: string): void;
        preExitScene(Direction: string, sceneCurr: number): string;
    }
}
declare module "sceneExt/TQ2APart3" {
    import { TExpSceneTyp2 } from "sceneExt/TExpSceneTyp2";
    import { TDrinkImgTool } from "com/TDrinkImgTool";
    import { TDrinkController } from "com/TDrinkController";
    import { TCircleControl } from "com/common/TCircleControl";
    import { TLabelControl } from "com/common/TLabelControl";
    import { TObject } from "thermite/TObject";
    import { TButton } from "thermite/TButton";
    import { TTextInput } from "thermite/TTextInput";
    import { TSelectEvent } from "com/events/TSelectEvent";
    export class TQ2APart3 extends TExpSceneTyp2 {
        q2Title5: TObject;
        q2MarkRight: TObject;
        q2MarkLeft: TObject;
        q2IFrame1: TObject;
        q2QFrame1: TObject;
        q2DesignButton: TButton;
        imgToolCq2: TDrinkImgTool;
        imgToolDq2: TDrinkImgTool;
        tabControllerCq2: TDrinkController;
        tabControllerDq2: TDrinkController;
        q2TextControl1: TTextInput;
        q2Check1: TCircleControl;
        q2Check2: TCircleControl;
        q2Arrow1: TObject;
        q2FrameA: TObject;
        q2FrameB: TObject;
        q2FrameC: TLabelControl;
        q2FrameD: TLabelControl;
        fStateCapC: boolean;
        expStateC: any;
        imgStateC: any;
        fStateCapD: boolean;
        expStateD: any;
        imgStateD: any;
        constructor();
        questionFinished(evt: Event): void;
        updateNavigation(fFinished: boolean): void;
        setLabels(): void;
        doTabMapA(evt: TSelectEvent): void;
        doTabMapB(evt: TSelectEvent): void;
        preEnterScene(lTutor: any, sceneLabel: string, sceneTitle: string, scenePage: string, Direction: string): string;
        preExitScene(Direction: string, sceneCurr: number): string;
    }
}
declare module "sceneExt/TQ2BPart1" {
    import { TExpSceneTyp2 } from "sceneExt/TExpSceneTyp2";
    import { TBakingImgTool } from "com/TBakingImgTool";
    import { TBakingController } from "com/TBakingController";
    import { TCircleControl } from "com/common/TCircleControl";
    import { TObject } from "thermite/TObject";
    import { TButton } from "thermite/TButton";
    export class TQ2BPart1 extends TExpSceneTyp2 {
        q2Title1: TObject;
        q2Title2: TObject;
        q2Title3: TObject;
        q2Title4: TObject;
        q2Title5: TObject;
        q2MarkRight: TObject;
        q2MarkLeft: TObject;
        q2IFrame1: TObject;
        q2QFrame1: TObject;
        q2DesignButton: TButton;
        imgToolCq2: TBakingImgTool;
        imgToolDq2: TBakingImgTool;
        tabControllerCq2: TBakingController;
        tabControllerDq2: TBakingController;
        q2TextControl1: Text;
        q2Check1: TCircleControl;
        q2Check2: TCircleControl;
        q2Arrow1: TObject;
        q2FrameA: TObject;
        q2FrameB: TObject;
        q2FrameC: TObject;
        q2FrameD: TObject;
        constructor();
        check1Clicked(evt: Event): void;
        check2Clicked(evt: Event): void;
        questionFinished(evt: Event): void;
        captureLogState(obj?: any): Object;
        captureXMLState(): any;
        restoreXMLState(xmlState: any): void;
        compareXMLState(xmlState: any): boolean;
        preExitScene(Direction: string, sceneCurr: number): string;
    }
}
declare module "sceneExt/TQ2BPart2" {
    import { TExpSceneTyp2 } from "sceneExt/TExpSceneTyp2";
    import { TBakingImgTool } from "com/TBakingImgTool";
    import { TBakingController } from "com/TBakingController";
    import { TCircleControl } from "com/common/TCircleControl";
    import { TLabelControl } from "com/common/TLabelControl";
    import { TObject } from "thermite/TObject";
    import { TButton } from "thermite/TButton";
    import { TTextInput } from "thermite/TTextInput";
    import { TScene } from "thermite/TScene";
    export class TQ2BPart2 extends TExpSceneTyp2 {
        q2Title1: TObject;
        q2Title2: TObject;
        q2Title3: TObject;
        q2Title4: TLabelControl;
        q2Title5: TObject;
        q2Title6: TObject;
        q2Title7: TLabelControl;
        q2MarkRight: TObject;
        q2MarkLeft: TObject;
        q2IFrame1: TObject;
        q2QFrame1: TObject;
        q2DesignButton: TButton;
        imgToolCq2: TBakingImgTool;
        imgToolDq2: TBakingImgTool;
        tabControllerCq2: TBakingController;
        tabControllerDq2: TBakingController;
        q2TextControl1: TTextInput;
        q2Check1: TCircleControl;
        q2Check2: TCircleControl;
        q2Arrow1: TObject;
        q2FrameA: TObject;
        q2FrameB: TObject;
        q2FrameC: TObject;
        q2FrameD: TObject;
        fStateCap: boolean;
        sceneState: any;
        constructor();
        checkChange(evt: Event): void;
        questionFinished(evt: Event): void;
        updateQText(wozScene: TScene): void;
        preEnterScene(lTutor: any, sceneLabel: string, sceneTitle: string, scenePage: string, Direction: string): string;
        onEnterScene(Direction: string): void;
        preExitScene(Direction: string, sceneCurr: number): string;
    }
}
declare module "sceneExt/TQ2BPart3" {
    import { TExpSceneTyp2 } from "sceneExt/TExpSceneTyp2";
    import { TBakingImgTool } from "com/TBakingImgTool";
    import { TBakingController } from "com/TBakingController";
    import { TCircleControl } from "com/common/TCircleControl";
    import { TLabelControl } from "com/common/TLabelControl";
    import { TObject } from "thermite/TObject";
    import { TButton } from "thermite/TButton";
    import { TTextInput } from "thermite/TTextInput";
    import { TSelectEvent } from "com/events/TSelectEvent";
    export class TQ2BPart3 extends TExpSceneTyp2 {
        q2Title1: TObject;
        q2Title2: TObject;
        q2Title3: TObject;
        q2Title4: TLabelControl;
        q2Title5: TObject;
        q2Title6: TObject;
        q2Title7: TLabelControl;
        q2MarkRight: TObject;
        q2MarkLeft: TObject;
        q2IFrame1: TObject;
        q2QFrame1: TObject;
        q2DesignButton: TButton;
        imgToolCq2: TBakingImgTool;
        imgToolDq2: TBakingImgTool;
        tabControllerCq2: TBakingController;
        tabControllerDq2: TBakingController;
        q2TextControl1: TTextInput;
        q2Check1: TCircleControl;
        q2Check2: TCircleControl;
        q2Arrow1: TObject;
        q2FrameA: TObject;
        q2FrameB: TObject;
        q2FrameC: TLabelControl;
        q2FrameD: TLabelControl;
        fStateCapC: boolean;
        expStateC: any;
        imgStateC: any;
        fStateCapD: boolean;
        expStateD: any;
        imgStateD: any;
        constructor();
        questionFinished(evt: Event): void;
        setLabels(): void;
        doTabMapA(evt: TSelectEvent): void;
        doTabMapB(evt: TSelectEvent): void;
        preEnterScene(lTutor: any, sceneLabel: string, sceneTitle: string, scenePage: string, Direction: string): string;
        preExitScene(Direction: string, sceneCurr: number): string;
    }
}
declare module "sceneExt/TQ3APart1" {
    import { TExpSceneTyp1 } from "sceneExt/TExpSceneTyp1";
    import { TRocketImgTool } from "com/TRocketImgTool";
    import { TRocketController } from "com/TRocketController";
    import { TObject } from "thermite/TObject";
    import { TButton } from "thermite/TButton";
    import { TMouseEvent } from "thermite/events/TMouseEvent";
    export class TQ3APart1 extends TExpSceneTyp1 {
        q3Title1: TObject;
        q3Title2: TObject;
        q3Title3: TObject;
        q3Title4: TObject;
        q3Title5: TObject;
        q3MarkRight: TObject;
        q3MarkLeft: TObject;
        q3IFrame1: TObject;
        q3QFrame1: TObject;
        q3DesignButton: TButton;
        imgToolAq3: TRocketImgTool;
        imgToolBq3: TRocketImgTool;
        tabControllerAq3: TRocketController;
        tabControllerBq3: TRocketController;
        q3FrameA: TObject;
        q3FrameB: TObject;
        navSkipPanel: boolean;
        constructor();
        onGotoDesign(evt: TMouseEvent): void;
        preEnterScene(Tutor: any, sceneLabel: string, sceneTitle: string, scenePage: string, Direction: string): string;
        preExitScene(Direction: string, sceneCurr: number): string;
    }
}
declare module "sceneExt/TQ3APart1B" {
    import { TExpSceneTyp1 } from "sceneExt/TExpSceneTyp1";
    import { TRocketImgTool } from "com/TRocketImgTool";
    import { TRocketController } from "com/TRocketController";
    import { TObject } from "thermite/TObject";
    import { TButton } from "thermite/TButton";
    import { TTextInput } from "thermite/TTextInput";
    export class TQ3APart1B extends TExpSceneTyp1 {
        q3Title1: TObject;
        q3Title2: TObject;
        q3Title3: TObject;
        q3Title4: TObject;
        q3Title5: TObject;
        q3Title6: TObject;
        q3Title7: TObject;
        q3Title8: TObject;
        q3MarkRight: TObject;
        q3MarkLeft: TObject;
        q3IFrame1: TObject;
        q3QFrame1: TObject;
        q3QFrame2: TObject;
        q3DesignButton: TButton;
        imgToolAq3: TRocketImgTool;
        imgToolBq3: TRocketImgTool;
        tabControllerAq3: TRocketController;
        tabControllerBq3: TRocketController;
        q3TextControl1: TTextInput;
        q3FrameA: TObject;
        q3FrameB: TObject;
        fCompleteA: boolean;
        fCompleteB: boolean;
        constructor();
        questionFinishedA(evt: Event): void;
        questionFinishedB(evt: Event): void;
        captureLogState(obj?: any): Object;
        captureXMLState(): any;
        restoreXMLState(xmlState: any): void;
        compareXMLState(xmlState: any): boolean;
        preExitScene(Direction: string, sceneCurr: number): string;
    }
}
declare module "sceneExt/TQ3APart2" {
    import { TExpSceneTyp1 } from "sceneExt/TExpSceneTyp1";
    import { TRocketImgTool } from "com/TRocketImgTool";
    import { TRocketController } from "com/TRocketController";
    import { TObject } from "thermite/TObject";
    import { TButton } from "thermite/TButton";
    import { TTextInput } from "thermite/TTextInput";
    export class TQ3APart2 extends TExpSceneTyp1 {
        q3Title1: TObject;
        q3Title2: TObject;
        q3Title3: TObject;
        q3Title4: TObject;
        q3Title5: TObject;
        q3Title6: TObject;
        q3Title7: TObject;
        q3Title8: TObject;
        q3MarkRight: TObject;
        q3MarkLeft: TObject;
        q3IFrame1: TObject;
        q3QFrame1: TObject;
        q3QFrame2: TObject;
        q3DesignButton: TButton;
        imgToolAq3: TRocketImgTool;
        imgToolBq3: TRocketImgTool;
        tabControllerAq3: TRocketController;
        tabControllerBq3: TRocketController;
        q3TextControl1: TTextInput;
        q3FrameA: TObject;
        q3FrameB: TObject;
        fStateCap: boolean;
        expState: any;
        constructor();
        questionFinished(evt: Event): void;
        preEnterScene(lTutor: any, sceneLabel: string, sceneTitle: string, scenePage: string, Direction: string): string;
        onEnterScene(Direction: string): void;
        preExitScene(Direction: string, sceneCurr: number): string;
    }
}
declare module "sceneExt/TQ3BPart1" {
    import { TExpSceneTyp1 } from "sceneExt/TExpSceneTyp1";
    import { TCarsImgTool } from "com/TCarsImgTool";
    import { TCarsController } from "com/TCarsController";
    import { TObject } from "thermite/TObject";
    import { TButton } from "thermite/TButton";
    import { TMouseEvent } from "thermite/events/TMouseEvent";
    export class TQ3BPart1 extends TExpSceneTyp1 {
        q3Title1: TObject;
        q3Title2: TObject;
        q3Title3: TObject;
        q3Title4: TObject;
        q3Title5: TObject;
        q3MarkRight: TObject;
        q3MarkLeft: TObject;
        q3IFrame1: TObject;
        q3QFrame1: TObject;
        q3DesignButton: TButton;
        imgToolAq3: TCarsImgTool;
        imgToolBq3: TCarsImgTool;
        tabControllerAq3: TCarsController;
        tabControllerBq3: TCarsController;
        q3FrameA: TObject;
        q3FrameB: TObject;
        navSkipPanel: boolean;
        constructor();
        onGotoDesign(evt: TMouseEvent): void;
        preEnterScene(Tutor: any, sceneLabel: string, sceneTitle: string, scenePage: string, Direction: string): string;
        preExitScene(Direction: string, sceneCurr: number): string;
    }
}
declare module "sceneExt/TQ3BPart1B" {
    import { TExpSceneTyp1 } from "sceneExt/TExpSceneTyp1";
    import { TCarsImgTool } from "com/TCarsImgTool";
    import { TCarsController } from "com/TCarsController";
    import { TObject } from "thermite/TObject";
    import { TButton } from "thermite/TButton";
    import { TTextInput } from "thermite/TTextInput";
    export class TQ3BPart1B extends TExpSceneTyp1 {
        q3Title1: TObject;
        q3Title2: TObject;
        q3Title3: TObject;
        q3Title4: TObject;
        q3Title5: TObject;
        q3Title6: TObject;
        q3Title7: TObject;
        q3Title8: TObject;
        q3MarkRight: TObject;
        q3MarkLeft: TObject;
        q3IFrame1: TObject;
        q3QFrame1: TObject;
        q3QFrame2: TObject;
        q3DesignButton: TButton;
        imgToolAq3: TCarsImgTool;
        imgToolBq3: TCarsImgTool;
        tabControllerAq3: TCarsController;
        tabControllerBq3: TCarsController;
        q3TextControl1: TTextInput;
        q3FrameA: TObject;
        q3FrameB: TObject;
        fCompleteA: boolean;
        fCompleteB: boolean;
        constructor();
        questionFinishedA(evt: Event): void;
        questionFinishedB(evt: Event): void;
        captureLogState(obj?: any): Object;
        captureXMLState(): any;
        restoreXMLState(xmlState: any): void;
        compareXMLState(xmlState: any): boolean;
        preExitScene(Direction: string, sceneCurr: number): string;
    }
}
declare module "sceneExt/TQ3BPart2" {
    import { TExpSceneTyp1 } from "sceneExt/TExpSceneTyp1";
    import { TCarsImgTool } from "com/TCarsImgTool";
    import { TCarsController } from "com/TCarsController";
    import { TObject } from "thermite/TObject";
    import { TButton } from "thermite/TButton";
    import { TTextInput } from "thermite/TTextInput";
    export class TQ3BPart2 extends TExpSceneTyp1 {
        q3Title1: TObject;
        q3Title2: TObject;
        q3Title3: TObject;
        q3Title4: TObject;
        q3Title5: TObject;
        q3Title6: TObject;
        q3Title7: TObject;
        q3Title8: TObject;
        q3MarkRight: TObject;
        q3MarkLeft: TObject;
        q3IFrame1: TObject;
        q3QFrame1: TObject;
        q3QFrame2: TObject;
        q3DesignButton: TButton;
        imgToolAq3: TCarsImgTool;
        imgToolBq3: TCarsImgTool;
        tabControllerAq3: TCarsController;
        tabControllerBq3: TCarsController;
        q3TextControl1: TTextInput;
        q3FrameA: TObject;
        q3FrameB: TObject;
        fStateCap: boolean;
        expState: any;
        constructor();
        questionFinished(evt: Event): void;
        preEnterScene(lTutor: any, sceneLabel: string, sceneTitle: string, scenePage: string, Direction: string): string;
        onEnterScene(Direction: string): void;
        preExitScene(Direction: string, sceneCurr: number): string;
    }
}
declare module "sceneExt/TQ4APart1" {
    import { TExpSceneTyp1 } from "sceneExt/TExpSceneTyp1";
    import { TRocketImgTool } from "com/TRocketImgTool";
    import { TRocketController } from "com/TRocketController";
    import { TCircleControl } from "com/common/TCircleControl";
    import { TObject } from "thermite/TObject";
    import { TButton } from "thermite/TButton";
    import { TTextInput } from "thermite/TTextInput";
    export class TQ4APart1 extends TExpSceneTyp1 {
        q4Title1: TObject;
        q4Title2: TObject;
        q4Title3: TObject;
        q4Title4: TObject;
        q4Title5: TObject;
        q4MarkRight: TObject;
        q4MarkLeft: TObject;
        q4IFrame1: TObject;
        q4QFrame1: TObject;
        q4DesignButton: TButton;
        imgToolCq4: TRocketImgTool;
        imgToolDq4: TRocketImgTool;
        tabControllerCq4: TRocketController;
        tabControllerDq4: TRocketController;
        q4TextControl1: TTextInput;
        q4Check1: TCircleControl;
        q4Check2: TCircleControl;
        q4Arrow1: TObject;
        q4FrameA: TObject;
        q4FrameB: TObject;
        q4FrameC: TObject;
        q4FrameD: TObject;
        constructor();
        check1Clicked(evt: Event): void;
        check2Clicked(evt: Event): void;
        questionFinished(evt: Event): void;
        captureLogState(obj?: any): Object;
        captureXMLState(): any;
        restoreXMLState(xmlState: any): void;
        compareXMLState(xmlState: any): boolean;
        preExitScene(Direction: string, sceneCurr: number): string;
    }
}
declare module "sceneExt/TQ4APart2" {
    import { TExpSceneTyp1 } from "sceneExt/TExpSceneTyp1";
    import { TRocketImgTool } from "com/TRocketImgTool";
    import { TRocketController } from "com/TRocketController";
    import { TCircleControl } from "com/common/TCircleControl";
    import { TLabelControl } from "com/common/TLabelControl";
    import { TObject } from "thermite/TObject";
    import { TButton } from "thermite/TButton";
    import { TTextInput } from "thermite/TTextInput";
    import { TScene } from "thermite/TScene";
    export class TQ4APart2 extends TExpSceneTyp1 {
        q4Title1: TObject;
        q4Title2: TObject;
        q4Title3: TObject;
        q4Title4: TLabelControl;
        q4Title5: TObject;
        q4Title6: TObject;
        q4Title7: TLabelControl;
        q4MarkRight: TObject;
        q4MarkLeft: TObject;
        q4IFrame1: TObject;
        q4QFrame1: TObject;
        q4DesignButton: TButton;
        imgToolCq4: TRocketImgTool;
        imgToolDq4: TRocketImgTool;
        tabControllerCq4: TRocketController;
        tabControllerDq4: TRocketController;
        q4TextControl1: TTextInput;
        q4Check1: TCircleControl;
        q4Check2: TCircleControl;
        q4Arrow1: TObject;
        q4FrameA: TObject;
        q4FrameB: TObject;
        q4FrameC: TObject;
        q4FrameD: TObject;
        fStateCap: boolean;
        sceneState: any;
        constructor();
        checkChange(evt: Event): void;
        questionFinished(evt: Event): void;
        updateQText(wozScene: TScene): void;
        preEnterScene(lTutor: any, sceneLabel: string, sceneTitle: string, scenePage: string, Direction: string): string;
        onEnterScene(Direction: string): void;
        preExitScene(Direction: string, sceneCurr: number): string;
    }
}
declare module "sceneExt/TQ4APart3" {
    import { TExpSceneTyp1 } from "sceneExt/TExpSceneTyp1";
    import { TRocketImgTool } from "com/TRocketImgTool";
    import { TRocketController } from "com/TRocketController";
    import { TCircleControl } from "com/common/TCircleControl";
    import { TLabelControl } from "com/common/TLabelControl";
    import { TObject } from "thermite/TObject";
    import { TButton } from "thermite/TButton";
    import { TTextInput } from "thermite/TTextInput";
    import { TSelectEvent } from "com/events/TSelectEvent";
    export class TQ4APart3 extends TExpSceneTyp1 {
        q4Title1: TObject;
        q4Title2: TObject;
        q4Title3: TObject;
        q4Title4: TObject;
        q4Title5: TObject;
        q4MarkRight: TObject;
        q4MarkLeft: TObject;
        q4IFrame1: TObject;
        q4QFrame1: TObject;
        q4DesignButton: TButton;
        imgToolCq4: TRocketImgTool;
        imgToolDq4: TRocketImgTool;
        tabControllerCq4: TRocketController;
        tabControllerDq4: TRocketController;
        q4TextControl1: TTextInput;
        q4Check1: TCircleControl;
        q4Check2: TCircleControl;
        q4Arrow1: TObject;
        q4FrameA: TObject;
        q4FrameB: TObject;
        q4FrameC: TLabelControl;
        q4FrameD: TLabelControl;
        fStateCapC: boolean;
        expStateC: any;
        imgStateC: any;
        fStateCapD: boolean;
        expStateD: any;
        imgStateD: any;
        constructor();
        questionFinished(evt: Event): void;
        updateNavigation(fFinished: boolean): void;
        setLabels(): void;
        doTabMapA(evt: TSelectEvent): void;
        doTabMapB(evt: TSelectEvent): void;
        preEnterScene(lTutor: any, sceneLabel: string, sceneTitle: string, scenePage: string, Direction: string): string;
        preExitScene(Direction: string, sceneCurr: number): string;
    }
}
declare module "sceneExt/TQ4BPart1" {
    import { TExpSceneTyp1 } from "sceneExt/TExpSceneTyp1";
    import { TCarsImgTool } from "com/TCarsImgTool";
    import { TCarsController } from "com/TCarsController";
    import { TCircleControl } from "com/common/TCircleControl";
    import { TObject } from "thermite/TObject";
    import { TButton } from "thermite/TButton";
    import { TTextInput } from "thermite/TTextInput";
    export class TQ4BPart1 extends TExpSceneTyp1 {
        q4Title1: TObject;
        q4Title2: TObject;
        q4Title3: TObject;
        q4Title4: TObject;
        q4Title5: TObject;
        q4MarkRight: TObject;
        q4MarkLeft: TObject;
        q4IFrame1: TObject;
        q4QFrame1: TObject;
        q4DesignButton: TButton;
        imgToolCq4: TCarsImgTool;
        imgToolDq4: TCarsImgTool;
        tabControllerCq4: TCarsController;
        tabControllerDq4: TCarsController;
        q4TextControl1: TTextInput;
        q4Check1: TCircleControl;
        q4Check2: TCircleControl;
        q4Arrow1: TObject;
        q4FrameA: TObject;
        q4FrameB: TObject;
        q4FrameC: TObject;
        q4FrameD: TObject;
        constructor();
        check1Clicked(evt: Event): void;
        check2Clicked(evt: Event): void;
        questionFinished(evt: Event): void;
        captureLogState(obj?: any): Object;
        captureXMLState(): any;
        restoreXMLState(xmlState: any): void;
        compareXMLState(xmlState: any): boolean;
        preExitScene(Direction: string, sceneCurr: number): string;
    }
}
declare module "sceneExt/TQ4BPart2" {
    import { TExpSceneTyp1 } from "sceneExt/TExpSceneTyp1";
    import { TCarsImgTool } from "com/TCarsImgTool";
    import { TCarsController } from "com/TCarsController";
    import { TCircleControl } from "com/common/TCircleControl";
    import { TLabelControl } from "com/common/TLabelControl";
    import { TObject } from "thermite/TObject";
    import { TButton } from "thermite/TButton";
    import { TTextInput } from "thermite/TTextInput";
    import { TScene } from "thermite/TScene";
    export class TQ4BPart2 extends TExpSceneTyp1 {
        q4Title1: TObject;
        q4Title2: TObject;
        q4Title3: TObject;
        q4Title4: TLabelControl;
        q4Title5: TObject;
        q4Title6: TObject;
        q4Title7: TLabelControl;
        q4MarkRight: TObject;
        q4MarkLeft: TObject;
        q4IFrame1: TObject;
        q4QFrame1: TObject;
        q4DesignButton: TButton;
        imgToolCq4: TCarsImgTool;
        imgToolDq4: TCarsImgTool;
        tabControllerCq4: TCarsController;
        tabControllerDq4: TCarsController;
        q4TextControl1: TTextInput;
        q4Check1: TCircleControl;
        q4Check2: TCircleControl;
        q4Arrow1: TObject;
        q4FrameA: TObject;
        q4FrameB: TObject;
        q4FrameC: TObject;
        q4FrameD: TObject;
        fStateCap: boolean;
        sceneState: any;
        constructor();
        checkChange(evt: Event): void;
        questionFinished(evt: Event): void;
        updateQText(wozScene: TScene): void;
        preEnterScene(lTutor: any, sceneLabel: string, sceneTitle: string, scenePage: string, Direction: string): string;
        onEnterScene(Direction: string): void;
        preExitScene(Direction: string, sceneCurr: number): string;
    }
}
declare module "sceneExt/TQ4BPart3" {
    import { TExpSceneTyp1 } from "sceneExt/TExpSceneTyp1";
    import { TCarsImgTool } from "com/TCarsImgTool";
    import { TCarsController } from "com/TCarsController";
    import { TCircleControl } from "com/common/TCircleControl";
    import { TLabelControl } from "com/common/TLabelControl";
    import { TObject } from "thermite/TObject";
    import { TButton } from "thermite/TButton";
    import { TTextInput } from "thermite/TTextInput";
    import { TSelectEvent } from "com/events/TSelectEvent";
    export class TQ4BPart3 extends TExpSceneTyp1 {
        q4Title1: TObject;
        q4Title2: TObject;
        q4Title3: TObject;
        q4Title4: TObject;
        q4Title5: TObject;
        q4MarkRight: TObject;
        q4MarkLeft: TObject;
        q4IFrame1: TObject;
        q4QFrame1: TObject;
        q4DesignButton: TButton;
        imgToolCq4: TCarsImgTool;
        imgToolDq4: TCarsImgTool;
        tabControllerCq4: TCarsController;
        tabControllerDq4: TCarsController;
        q4TextControl1: TTextInput;
        q4Check1: TCircleControl;
        q4Check2: TCircleControl;
        q4Arrow1: TObject;
        q4FrameA: TObject;
        q4FrameB: TObject;
        q4FrameC: TLabelControl;
        q4FrameD: TLabelControl;
        fStateCapC: boolean;
        expStateC: any;
        imgStateC: any;
        fStateCapD: boolean;
        expStateD: any;
        imgStateD: any;
        constructor();
        questionFinished(evt: Event): void;
        updateNavigation(fFinished: boolean): void;
        setLabels(): void;
        doTabMapA(evt: TSelectEvent): void;
        doTabMapB(evt: TSelectEvent): void;
        preEnterScene(lTutor: any, sceneLabel: string, sceneTitle: string, scenePage: string, Direction: string): string;
        preExitScene(Direction: string, sceneCurr: number): string;
    }
}
declare module "sceneExt/TQ5APart1" {
    import { TExpSceneTyp1 } from "sceneExt/TExpSceneTyp1";
    import { TStudyImgTool } from "com/TStudyImgTool";
    import { TStudyController } from "com/TStudyController";
    import { TObject } from "thermite/TObject";
    import { TButton } from "thermite/TButton";
    import { TMouseEvent } from "thermite/events/TMouseEvent";
    export class TQ5APart1 extends TExpSceneTyp1 {
        q5Title1: TObject;
        q5Title2: TObject;
        q5Title3: TObject;
        q5Title4: TObject;
        q5Title5: TObject;
        q5MarkRight: TObject;
        q5MarkLeft: TObject;
        q5IFrame1: TObject;
        q5QFrame1: TObject;
        q5DesignButton: TButton;
        imgToolAq5: TStudyImgTool;
        imgToolBq5: TStudyImgTool;
        tabControllerAq5: TStudyController;
        tabControllerBq5: TStudyController;
        q5FrameA: TObject;
        q5FrameB: TObject;
        navSkipPanel: boolean;
        constructor();
        onGotoDesign(evt: TMouseEvent): void;
        preEnterScene(Tutor: any, sceneLabel: string, sceneTitle: string, scenePage: string, Direction: string): string;
        preExitScene(Direction: string, sceneCurr: number): string;
    }
}
declare module "sceneExt/TQ5APart1B" {
    import { TExpSceneTyp1 } from "sceneExt/TExpSceneTyp1";
    import { TStudyImgTool } from "com/TStudyImgTool";
    import { TStudyController } from "com/TStudyController";
    import { TObject } from "thermite/TObject";
    import { TButton } from "thermite/TButton";
    import { TTextInput } from "thermite/TTextInput";
    export class TQ5APart1B extends TExpSceneTyp1 {
        q5Title1: TObject;
        q5Title2: TObject;
        q5Title3: TObject;
        q5Title4: TObject;
        q5Title5: TObject;
        q5Title6: TObject;
        q5Title7: TObject;
        q5Title8: TObject;
        q5MarkRight: TObject;
        q5MarkLeft: TObject;
        q5IFrame1: TObject;
        q5QFrame1: TObject;
        q5QFrame2: TObject;
        q5DesignButton: TButton;
        imgToolAq5: TStudyImgTool;
        imgToolBq5: TStudyImgTool;
        tabControllerAq5: TStudyController;
        tabControllerBq5: TStudyController;
        q5TextControl1: TTextInput;
        q5FrameA: TObject;
        q5FrameB: TObject;
        fCompleteA: boolean;
        fCompleteB: boolean;
        constructor();
        questionFinishedA(evt: Event): void;
        questionFinishedB(evt: Event): void;
        captureLogState(obj?: any): Object;
        captureXMLState(): any;
        restoreXMLState(xmlState: any): void;
        compareXMLState(xmlState: any): boolean;
        preExitScene(Direction: string, sceneCurr: number): string;
    }
}
declare module "sceneExt/TQ5APart2" {
    import { TExpSceneTyp1 } from "sceneExt/TExpSceneTyp1";
    import { TStudyImgTool } from "com/TStudyImgTool";
    import { TStudyController } from "com/TStudyController";
    import { TObject } from "thermite/TObject";
    import { TButton } from "thermite/TButton";
    import { TTextInput } from "thermite/TTextInput";
    export class TQ5APart2 extends TExpSceneTyp1 {
        q5Title1: TObject;
        q5Title2: TObject;
        q5Title3: TObject;
        q5Title4: TObject;
        q5Title5: TObject;
        q5Title6: TObject;
        q5Title7: TObject;
        q5Title8: TObject;
        q5MarkRight: TObject;
        q5MarkLeft: TObject;
        q5IFrame1: TObject;
        q5QFrame1: TObject;
        q5QFrame2: TObject;
        q5DesignButton: TButton;
        imgToolAq5: TStudyImgTool;
        imgToolBq5: TStudyImgTool;
        tabControllerAq5: TStudyController;
        tabControllerBq5: TStudyController;
        q5TextControl1: TTextInput;
        q5FrameA: TObject;
        q5FrameB: TObject;
        fStateCap: boolean;
        expState: any;
        constructor();
        questionFinished(evt: Event): void;
        preEnterScene(lTutor: any, sceneLabel: string, sceneTitle: string, scenePage: string, Direction: string): string;
        onEnterScene(Direction: string): void;
        preExitScene(Direction: string, sceneCurr: number): string;
    }
}
declare module "sceneExt/TQ5BPart1" {
    import { TExpSceneTyp1 } from "sceneExt/TExpSceneTyp1";
    import { TMemoryImgTool } from "com/TMemoryImgTool";
    import { TMemoryController } from "com/TMemoryController";
    import { TObject } from "thermite/TObject";
    import { TButton } from "thermite/TButton";
    import { TMouseEvent } from "thermite/events/TMouseEvent";
    export class TQ5BPart1 extends TExpSceneTyp1 {
        q5Title1: TObject;
        q5Title2: TObject;
        q5Title3: TObject;
        q5Title4: TObject;
        q5Title5: TObject;
        q5MarkRight: TObject;
        q5MarkLeft: TObject;
        q5IFrame1: TObject;
        q5QFrame1: TObject;
        q5DesignButton: TButton;
        imgToolAq5: TMemoryImgTool;
        imgToolBq5: TMemoryImgTool;
        tabControllerAq5: TMemoryController;
        tabControllerBq5: TMemoryController;
        q5FrameA: TObject;
        q5FrameB: TObject;
        navSkipPanel: boolean;
        constructor();
        onGotoDesign(evt: TMouseEvent): void;
        preEnterScene(Tutor: any, sceneLabel: string, sceneTitle: string, scenePage: string, Direction: string): string;
        preExitScene(Direction: string, sceneCurr: number): string;
    }
}
declare module "sceneExt/TQ5BPart1B" {
    import { TExpSceneTyp1 } from "sceneExt/TExpSceneTyp1";
    import { TMemoryImgTool } from "com/TMemoryImgTool";
    import { TMemoryController } from "com/TMemoryController";
    import { TObject } from "thermite/TObject";
    import { TButton } from "thermite/TButton";
    import { TTextInput } from "thermite/TTextInput";
    export class TQ5BPart1B extends TExpSceneTyp1 {
        q5Title1: TObject;
        q5Title2: TObject;
        q5Title3: TObject;
        q5Title4: TObject;
        q5Title5: TObject;
        q5Title6: TObject;
        q5Title7: TObject;
        q5Title8: TObject;
        q5MarkRight: TObject;
        q5MarkLeft: TObject;
        q5IFrame1: TObject;
        q5QFrame1: TObject;
        q5QFrame2: TObject;
        q5DesignButton: TButton;
        imgToolAq5: TMemoryImgTool;
        imgToolBq5: TMemoryImgTool;
        tabControllerAq5: TMemoryController;
        tabControllerBq5: TMemoryController;
        q5TextControl1: TTextInput;
        q5FrameA: TObject;
        q5FrameB: TObject;
        fCompleteA: boolean;
        fCompleteB: boolean;
        constructor();
        questionFinishedA(evt: Event): void;
        questionFinishedB(evt: Event): void;
        captureLogState(obj?: any): Object;
        captureXMLState(): any;
        restoreXMLState(xmlState: any): void;
        compareXMLState(xmlState: any): boolean;
        preExitScene(Direction: string, sceneCurr: number): string;
    }
}
declare module "sceneExt/TQ5BPart2" {
    import { TExpSceneTyp1 } from "sceneExt/TExpSceneTyp1";
    import { TMemoryImgTool } from "com/TMemoryImgTool";
    import { TMemoryController } from "com/TMemoryController";
    import { TObject } from "thermite/TObject";
    import { TButton } from "thermite/TButton";
    import { TTextInput } from "thermite/TTextInput";
    export class TQ5BPart2 extends TExpSceneTyp1 {
        q5Title1: TObject;
        q5Title2: TObject;
        q5Title3: TObject;
        q5Title4: TObject;
        q5Title5: TObject;
        q5Title6: TObject;
        q5Title7: TObject;
        q5Title8: TObject;
        q5MarkRight: TObject;
        q5MarkLeft: TObject;
        q5IFrame1: TObject;
        q5QFrame1: TObject;
        q5QFrame2: TObject;
        q5DesignButton: TButton;
        imgToolAq5: TMemoryImgTool;
        imgToolBq5: TMemoryImgTool;
        tabControllerAq5: TMemoryController;
        tabControllerBq5: TMemoryController;
        q5TextControl1: TTextInput;
        q5FrameA: TObject;
        q5FrameB: TObject;
        fStateCap: boolean;
        expState: any;
        constructor();
        questionFinished(evt: Event): void;
        preEnterScene(lTutor: any, sceneLabel: string, sceneTitle: string, scenePage: string, Direction: string): string;
        onEnterScene(Direction: string): void;
        preExitScene(Direction: string, sceneCurr: number): string;
    }
}
declare module "sceneExt/TQ6APart1" {
    import { TExpSceneTyp1 } from "sceneExt/TExpSceneTyp1";
    import { TStudyImgTool } from "com/TStudyImgTool";
    import { TStudyController } from "com/TStudyController";
    import { TCircleControl } from "com/common/TCircleControl";
    import { TObject } from "thermite/TObject";
    import { TButton } from "thermite/TButton";
    import { TTextInput } from "thermite/TTextInput";
    export class TQ6APart1 extends TExpSceneTyp1 {
        q6Title1: TObject;
        q6Title2: TObject;
        q6Title3: TObject;
        q6Title4: TObject;
        q6Title5: TObject;
        q6MarkRight: TObject;
        q6MarkLeft: TObject;
        q6IFrame1: TObject;
        q6QFrame1: TObject;
        q6DesignButton: TButton;
        imgToolCq6: TStudyImgTool;
        imgToolDq6: TStudyImgTool;
        tabControllerCq6: TStudyController;
        tabControllerDq6: TStudyController;
        q6TextControl1: TTextInput;
        q6Check1: TCircleControl;
        q6Check2: TCircleControl;
        q6Arrow1: TObject;
        q6FrameA: TObject;
        q6FrameB: TObject;
        q6FrameC: TObject;
        q6FrameD: TObject;
        constructor();
        check1Clicked(evt: Event): void;
        check2Clicked(evt: Event): void;
        questionFinished(evt: Event): void;
        captureLogState(obj?: any): Object;
        captureXMLState(): any;
        restoreXMLState(xmlState: any): void;
        compareXMLState(xmlState: any): boolean;
        preExitScene(Direction: string, sceneCurr: number): string;
    }
}
declare module "sceneExt/TQ6APart2" {
    import { TExpSceneTyp1 } from "sceneExt/TExpSceneTyp1";
    import { TStudyImgTool } from "com/TStudyImgTool";
    import { TStudyController } from "com/TStudyController";
    import { TCircleControl } from "com/common/TCircleControl";
    import { TLabelControl } from "com/common/TLabelControl";
    import { TObject } from "thermite/TObject";
    import { TButton } from "thermite/TButton";
    import { TTextInput } from "thermite/TTextInput";
    import { TScene } from "thermite/TScene";
    export class TQ6APart2 extends TExpSceneTyp1 {
        q6Title1: TObject;
        q6Title2: TObject;
        q6Title3: TObject;
        q6Title4: TLabelControl;
        q6Title5: TObject;
        q6Title6: TObject;
        q6Title7: TLabelControl;
        q6MarkRight: TObject;
        q6MarkLeft: TObject;
        q6IFrame1: TObject;
        q6QFrame1: TObject;
        q6DesignButton: TButton;
        imgToolCq6: TStudyImgTool;
        imgToolDq6: TStudyImgTool;
        tabControllerCq6: TStudyController;
        tabControllerDq6: TStudyController;
        q6TextControl1: TTextInput;
        q6Check1: TCircleControl;
        q6Check2: TCircleControl;
        q6Arrow1: TObject;
        q6FrameA: TObject;
        q6FrameB: TObject;
        q6FrameC: TObject;
        q6FrameD: TObject;
        fStateCap: boolean;
        sceneState: any;
        constructor();
        checkChange(evt: Event): void;
        questionFinished(evt: Event): void;
        updateQText(wozScene: TScene): void;
        preEnterScene(lTutor: any, sceneLabel: string, sceneTitle: string, scenePage: string, Direction: string): string;
        onEnterScene(Direction: string): void;
        preExitScene(Direction: string, sceneCurr: number): string;
    }
}
declare module "sceneExt/TQ6APart3" {
    import { TExpSceneTyp1 } from "sceneExt/TExpSceneTyp1";
    import { TStudyImgTool } from "com/TStudyImgTool";
    import { TStudyController } from "com/TStudyController";
    import { TCircleControl } from "com/common/TCircleControl";
    import { TLabelControl } from "com/common/TLabelControl";
    import { TObject } from "thermite/TObject";
    import { TButton } from "thermite/TButton";
    import { TTextInput } from "thermite/TTextInput";
    import { TSelectEvent } from "com/events/TSelectEvent";
    export class TQ6APart3 extends TExpSceneTyp1 {
        q6Title1: TObject;
        q6Title2: TObject;
        q6Title3: TObject;
        q6Title4: TObject;
        q6Title5: TObject;
        q6MarkRight: TObject;
        q6MarkLeft: TObject;
        q6IFrame1: TObject;
        q6QFrame1: TObject;
        q6DesignButton: TButton;
        imgToolCq6: TStudyImgTool;
        imgToolDq6: TStudyImgTool;
        tabControllerCq6: TStudyController;
        tabControllerDq6: TStudyController;
        q6TextControl1: TTextInput;
        q6Check1: TCircleControl;
        q6Check2: TCircleControl;
        q6Arrow1: TObject;
        q6FrameA: TObject;
        q6FrameB: TObject;
        q6FrameC: TLabelControl;
        q6FrameD: TLabelControl;
        fStateCapC: boolean;
        expStateC: any;
        imgStateC: any;
        fStateCapD: boolean;
        expStateD: any;
        imgStateD: any;
        constructor();
        questionFinished(evt: Event): void;
        updateNavigation(fFinished: boolean): void;
        setLabels(): void;
        doTabMapA(evt: TSelectEvent): void;
        doTabMapB(evt: TSelectEvent): void;
        preEnterScene(lTutor: any, sceneLabel: string, sceneTitle: string, scenePage: string, Direction: string): string;
        preExitScene(Direction: string, sceneCurr: number): string;
    }
}
declare module "sceneExt/TQ6BPart1" {
    import { TExpSceneTyp1 } from "sceneExt/TExpSceneTyp1";
    import { TMemoryImgTool } from "com/TMemoryImgTool";
    import { TMemoryController } from "com/TMemoryController";
    import { TCircleControl } from "com/common/TCircleControl";
    import { TObject } from "thermite/TObject";
    import { TButton } from "thermite/TButton";
    import { TTextInput } from "thermite/TTextInput";
    export class TQ6BPart1 extends TExpSceneTyp1 {
        q6Title1: TObject;
        q6Title2: TObject;
        q6Title3: TObject;
        q6Title4: TObject;
        q6Title5: TObject;
        q6MarkRight: TObject;
        q6MarkLeft: TObject;
        q6IFrame1: TObject;
        q6QFrame1: TObject;
        q6DesignButton: TButton;
        imgToolCq6: TMemoryImgTool;
        imgToolDq6: TMemoryImgTool;
        tabControllerCq6: TMemoryController;
        tabControllerDq6: TMemoryController;
        q6TextControl1: TTextInput;
        q6Check1: TCircleControl;
        q6Check2: TCircleControl;
        q6Arrow1: TObject;
        q6FrameA: TObject;
        q6FrameB: TObject;
        q6FrameC: TObject;
        q6FrameD: TObject;
        constructor();
        check1Clicked(evt: Event): void;
        check2Clicked(evt: Event): void;
        questionFinished(evt: Event): void;
        captureLogState(obj?: any): Object;
        captureXMLState(): any;
        restoreXMLState(xmlState: any): void;
        compareXMLState(xmlState: any): boolean;
        preExitScene(Direction: string, sceneCurr: number): string;
    }
}
declare module "sceneExt/TQ6BPart2" {
    import { TExpSceneTyp1 } from "sceneExt/TExpSceneTyp1";
    import { TMemoryImgTool } from "com/TMemoryImgTool";
    import { TMemoryController } from "com/TMemoryController";
    import { TCircleControl } from "com/common/TCircleControl";
    import { TLabelControl } from "com/common/TLabelControl";
    import { TObject } from "thermite/TObject";
    import { TButton } from "thermite/TButton";
    import { TTextInput } from "thermite/TTextInput";
    import { TScene } from "thermite/TScene";
    export class TQ6BPart2 extends TExpSceneTyp1 {
        q6Title1: TObject;
        q6Title2: TObject;
        q6Title3: TObject;
        q6Title4: TLabelControl;
        q6Title5: TObject;
        q6Title6: TObject;
        q6Title7: TLabelControl;
        q6MarkRight: TObject;
        q6MarkLeft: TObject;
        q6IFrame1: TObject;
        q6QFrame1: TObject;
        q6DesignButton: TButton;
        imgToolCq6: TMemoryImgTool;
        imgToolDq6: TMemoryImgTool;
        tabControllerCq6: TMemoryController;
        tabControllerDq6: TMemoryController;
        q6TextControl1: TTextInput;
        q6Check1: TCircleControl;
        q6Check2: TCircleControl;
        q6Arrow1: TObject;
        q6FrameA: TObject;
        q6FrameB: TObject;
        q6FrameC: TObject;
        q6FrameD: TObject;
        fStateCap: boolean;
        sceneState: any;
        constructor();
        checkChange(evt: Event): void;
        questionFinished(evt: Event): void;
        updateQText(wozScene: TScene): void;
        preEnterScene(lTutor: any, sceneLabel: string, sceneTitle: string, scenePage: string, Direction: string): string;
        onEnterScene(Direction: string): void;
        preExitScene(Direction: string, sceneCurr: number): string;
    }
}
declare module "sceneExt/TQ6BPart3" {
    import { TExpSceneTyp1 } from "sceneExt/TExpSceneTyp1";
    import { TMemoryImgTool } from "com/TMemoryImgTool";
    import { TMemoryController } from "com/TMemoryController";
    import { TCircleControl } from "com/common/TCircleControl";
    import { TLabelControl } from "com/common/TLabelControl";
    import { TObject } from "thermite/TObject";
    import { TButton } from "thermite/TButton";
    import { TTextInput } from "thermite/TTextInput";
    import { TSelectEvent } from "com/events/TSelectEvent";
    export class TQ6BPart3 extends TExpSceneTyp1 {
        q6Title1: TObject;
        q6Title2: TObject;
        q6Title3: TObject;
        q6Title4: TObject;
        q6Title5: TObject;
        q6MarkRight: TObject;
        q6MarkLeft: TObject;
        q6IFrame1: TObject;
        q6QFrame1: TObject;
        q6DesignButton: TButton;
        imgToolCq6: TMemoryImgTool;
        imgToolDq6: TMemoryImgTool;
        tabControllerCq6: TMemoryController;
        tabControllerDq6: TMemoryController;
        q6TextControl1: TTextInput;
        q6Check1: TCircleControl;
        q6Check2: TCircleControl;
        q6Arrow1: TObject;
        q6FrameA: TObject;
        q6FrameB: TObject;
        q6FrameC: TLabelControl;
        q6FrameD: TLabelControl;
        fStateCapC: boolean;
        expStateC: any;
        imgStateC: any;
        fStateCapD: boolean;
        expStateD: any;
        imgStateD: any;
        constructor();
        questionFinished(evt: Event): void;
        updateNavigation(fFinished: boolean): void;
        setLabels(): void;
        doTabMapA(evt: TSelectEvent): void;
        doTabMapB(evt: TSelectEvent): void;
        preEnterScene(lTutor: any, sceneLabel: string, sceneTitle: string, scenePage: string, Direction: string): string;
        preExitScene(Direction: string, sceneCurr: number): string;
    }
}
declare module "sceneExt/TQSplash" {
    import { TObject } from "thermite/TObject";
    import { TScene } from "thermite/TScene";
    import Text = createjs.Text;
    import { CTimerEvent } from "events/CTimerEvent";
    export class TQSplash extends TScene {
        StitleText: Text;
        SplashFrame1: TObject;
        SplashFrameShadow: TObject;
        QMarkSplash: TObject;
        QMarkSplashShadow: TObject;
        constructor();
        timerHandler(event: CTimerEvent): void;
        preEnterScene(Tutor: any, sceneLabel: string, sceneTitle: string, scenePage: string, Direction: string): string;
        onEnterScene(Direction: string): void;
    }
}
declare module "sceneExt/TQSplashB" {
    import { CTimerEvent } from "events/CTimerEvent";
    import { TObject } from "thermite/TObject";
    import { TScene } from "thermite/TScene";
    import Text = createjs.Text;
    export class TQSplashB extends TScene {
        StitleText: Text;
        SplashFrame1: TObject;
        SplashFrameShadow: TObject;
        QMarkSplash: TObject;
        QMarkSplashShadow: TObject;
        constructor();
        timerHandler(event: CTimerEvent): void;
        preEnterScene(Tutor: any, sceneLabel: string, sceneTitle: string, scenePage: string, Direction: string): string;
        onEnterScene(Direction: string): void;
        preExitScene(Direction: string, sceneCurr: number): string;
    }
}
declare module "sceneExt/TScene0" {
    import { TScene } from "thermite/TScene";
    export class TScene0 extends TScene {
        constructor();
    }
}
declare module "sceneExt/TScene1" {
    import { TSelectEvent } from "com/events/TSelectEvent";
    import { TScene } from "thermite/TScene";
    export class TIntroPart1 extends TScene {
        constructor();
        doImageMap(evt: TSelectEvent): void;
        doTabMap(evt: TSelectEvent): void;
    }
}
declare module "sceneExt/TScene2" {
    import { TScene } from "thermite/TScene";
    export class TScene2 extends TScene {
        constructor();
    }
}
declare module "sceneExt/TScene2a" {
    import { TScene } from "thermite/TScene";
    export class TScene2a extends TScene {
        constructor();
    }
}
declare module "sceneExt/TScene3" {
    import { TScene } from "thermite/TScene";
    export class TScene3 extends TScene {
        constructor();
    }
}
declare module "sceneExt/TScene4" {
    import { TScene } from "thermite/TScene";
    export class TScene4 extends TScene {
        constructor();
    }
}
declare module "sceneExt/TSceneBoundry" {
    import { TScene } from "thermite/TScene";
    export class TSceneBoundry extends TScene {
        constructor();
    }
}
declare module "sceneExt/TWelcomeSplash" {
    import { TObject } from "thermite/TObject";
    import { TScene } from "thermite/TScene";
    export class TWelcomeSplash extends TScene {
        SplashFrame1: TObject;
        SplashFrameShadow: TObject;
        constructor();
    }
}
