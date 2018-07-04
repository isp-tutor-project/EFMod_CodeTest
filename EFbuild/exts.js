System.register("com/common/TSelectorIcons", ["thermite/TObject"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var TObject_1, TSelectorIcons;
    return {
        setters: [
            function (TObject_1_1) {
                TObject_1 = TObject_1_1;
            }
        ],
        execute: function () {
            TSelectorIcons = class TSelectorIcons extends TObject_1.TObject {
                constructor() {
                    super();
                }
                hideAllIcons() {
                    for (var i1 = 0; i1 < this.numChildren; i1++) {
                        this.getChildAt(i1).visible = false;
                    }
                }
                showIcon(iName) {
                    this.getChildByName(iName).visible = true;
                }
            };
            exports_1("TSelectorIcons", TSelectorIcons);
        }
    };
});
System.register("com/common/TSelectorItemButton", ["thermite/TButton"], function (exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    var TButton_1, TSelectorItemButton;
    return {
        setters: [
            function (TButton_1_1) {
                TButton_1 = TButton_1_1;
            }
        ],
        execute: function () {
            TSelectorItemButton = class TSelectorItemButton extends TButton_1.TButton {
                constructor() {
                    super();
                }
            };
            exports_2("TSelectorItemButton", TSelectorItemButton);
        }
    };
});
System.register("com/common/TLabeledTab", ["thermite/TObject"], function (exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    var TObject_2, TLabeledTab;
    return {
        setters: [
            function (TObject_2_1) {
                TObject_2 = TObject_2_1;
            }
        ],
        execute: function () {
            TLabeledTab = class TLabeledTab extends TObject_2.TObject {
                constructor() {
                    super();
                }
            };
            exports_3("TLabeledTab", TLabeledTab);
        }
    };
});
System.register("com/common/TTabTool", ["thermite/TObject", "util/CUtil"], function (exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    var TObject_3, CUtil_1, TTabTool;
    return {
        setters: [
            function (TObject_3_1) {
                TObject_3 = TObject_3_1;
            },
            function (CUtil_1_1) {
                CUtil_1 = CUtil_1_1;
            }
        ],
        execute: function () {
            TTabTool = class TTabTool extends TObject_3.TObject {
                constructor() {
                    super();
                    this.hideAllIcons();
                }
                hideAllIcons() {
                    var tabItemBut;
                    for (var i1 = 1; i1 < 10; i1++) {
                        tabItemBut = this.getChildByName("Sitem" + i1);
                        if (tabItemBut) {
                            CUtil_1.CUtil.trace("Initializing tab item selector: item" + i1);
                            tabItemBut.Sicons.hideAllIcons();
                        }
                    }
                }
            };
            exports_4("TTabTool", TTabTool);
        }
    };
});
System.register("com/common/TSelectorButton", ["thermite/TButton"], function (exports_5, context_5) {
    "use strict";
    var __moduleName = context_5 && context_5.id;
    var TButton_2, TSelectorButton;
    return {
        setters: [
            function (TButton_2_1) {
                TButton_2 = TButton_2_1;
            }
        ],
        execute: function () {
            TSelectorButton = class TSelectorButton extends TButton_2.TButton {
                constructor() {
                    super();
                    this.SchangeLabel.visible = false;
                }
            };
            exports_5("TSelectorButton", TSelectorButton);
        }
    };
});
System.register("com/events/TSelectEvent", ["util/CUtil"], function (exports_6, context_6) {
    "use strict";
    var __moduleName = context_6 && context_6.id;
    var CUtil_2, Event, TSelectEvent;
    return {
        setters: [
            function (CUtil_2_1) {
                CUtil_2 = CUtil_2_1;
            }
        ],
        execute: function () {
            Event = createjs.Event;
            TSelectEvent = class TSelectEvent extends Event {
                constructor(target, type, bubbles = false, cancelable = false) {
                    super(type, bubbles, cancelable);
                    this.selection = target;
                }
                clone() {
                    CUtil_2.CUtil.trace("cloning WOZEvent:");
                    return new TSelectEvent(this.selection, this.type, this.bubbles, this.cancelable);
                }
            };
            TSelectEvent.WOZTABSELECT = "WOZTABSELECT";
            TSelectEvent.WOZIMGSELECT = "WOZIMGSELECT";
            exports_6("TSelectEvent", TSelectEvent);
        }
    };
});
System.register("com/common/TController", ["com/events/TSelectEvent", "thermite/TObject", "thermite/events/TMouseEvent", "util/CUtil"], function (exports_7, context_7) {
    "use strict";
    var __moduleName = context_7 && context_7.id;
    var TSelectEvent_1, TObject_4, TMouseEvent_1, CUtil_3, TController;
    return {
        setters: [
            function (TSelectEvent_1_1) {
                TSelectEvent_1 = TSelectEvent_1_1;
            },
            function (TObject_4_1) {
                TObject_4 = TObject_4_1;
            },
            function (TMouseEvent_1_1) {
                TMouseEvent_1 = TMouseEvent_1_1;
            },
            function (CUtil_3_1) {
                CUtil_3 = CUtil_3_1;
            }
        ],
        execute: function () {
            TController = class TController extends TObject_4.TObject {
                constructor() {
                    super();
                    this.sel1 = "";
                    this.sel2 = "";
                    this.sel3 = "";
                    this.useChanged = false;
                    this.StopButton.SsubLabel.visible = false;
                    this.ScenterButton.SsubLabel.visible = false;
                    this.SbottomButton.SsubLabel.visible = false;
                    this.StabTool.visible = false;
                    this.StopButton.addEventListener(TMouseEvent_1.TMouseEvent.WOZCLICK, this.topClick);
                    this.ScenterButton.addEventListener(TMouseEvent_1.TMouseEvent.WOZCLICK, this.centerClick);
                    this.SbottomButton.addEventListener(TMouseEvent_1.TMouseEvent.WOZCLICK, this.bottomClick);
                }
                deepStateCopy(src) {
                    super.deepStateCopy(src);
                    var ptrController = src;
                    this.sel1 = ptrController.this.sel1;
                    this.sel2 = ptrController.this.sel2;
                    this.sel3 = ptrController.this.sel3;
                    this.StopButton.SsubLabel.text = ptrController.this.StopButton.SsubLabel.text;
                    this.StopButton.SsubLabel.visible = ptrController.this.StopButton.SsubLabel.visible;
                    this.ScenterButton.SsubLabel.text = ptrController.this.ScenterButton.SsubLabel.text;
                    this.ScenterButton.SsubLabel.visible = ptrController.this.ScenterButton.SsubLabel.visible;
                    this.SbottomButton.SsubLabel.text = ptrController.this.SbottomButton.SsubLabel.text;
                    this.SbottomButton.SsubLabel.visible = ptrController.this.SbottomButton.SsubLabel.visible;
                }
                captureLogState(obj = null) {
                    obj = super.captureLogState(obj);
                    obj['object'] = 'imgcontroller';
                    obj['name'] = this.name;
                    obj['Item1'] = this.StopButton.SsubLabel.text;
                    obj['Changed1'] = this.StopButton.SchangeLabel.visible;
                    obj['Item2'] = this.ScenterButton.SsubLabel.text;
                    obj['Changed2'] = this.ScenterButton.SchangeLabel.visible;
                    obj['Item3'] = this.SbottomButton.SsubLabel.text;
                    obj['Changed3'] = this.SbottomButton.SchangeLabel.visible;
                    return obj;
                }
                captureXMLState() {
                    let stateVal = { controller: {} };
                    let controller = stateVal.controller;
                    controller.name = this.name;
                    controller.topbutton.Item = this.sel1;
                    controller.topbutton.Changed = this.StopButton.SchangeLabel.visible;
                    controller.topbutton.Text = this.StopButton.SsubLabel.text;
                    controller.topbutton.Visible = this.StopButton.SsubLabel.visible;
                    controller.centerbutton.Item = this.sel2;
                    controller.centerbutton.Changed = this.ScenterButton.SchangeLabel.visible;
                    controller.centerbutton.Text = this.ScenterButton.SsubLabel.text;
                    controller.centerbutton.Visible = this.ScenterButton.SsubLabel.visible;
                    controller.bottombutton.Item = this.sel3;
                    controller.bottombutton.Changed = this.SbottomButton.SchangeLabel.visible;
                    controller.bottombutton.Text = this.SbottomButton.SsubLabel.text;
                    controller.bottombutton.Visible = this.SbottomButton.SsubLabel.visible;
                    return stateVal;
                }
                restoreXMLState(stateVal) {
                    this.sel1 = stateVal.topbutton.Item;
                    this.StopButton.SsubLabel.text = stateVal.topbutton.Text;
                    this.StopButton.SsubLabel.visible = stateVal.topbutton.Visible;
                    this.sel2 = stateVal.centerbutton.Item;
                    this.ScenterButton.SsubLabel.text = stateVal.centerbutton.Text;
                    this.ScenterButton.SsubLabel.visible = stateVal.centerbutton.Visible;
                    this.sel3 = stateVal.bottombutton.Item;
                    this.SbottomButton.SsubLabel.text = stateVal.bottombutton.Text;
                    this.SbottomButton.SsubLabel.visible = stateVal.bottombutton.Visible;
                }
                compareXMLState(stateVal) {
                    var bTest = true;
                    this.StopButton.SchangeLabel.visible = false;
                    this.ScenterButton.SchangeLabel.visible = false;
                    this.SbottomButton.SchangeLabel.visible = false;
                    if (this.sel1 != stateVal.topbutton.Item) {
                        this.useChanged ? this.StopButton.SchangeLabel.visible = true : null;
                        bTest = false;
                    }
                    if (this.sel2 != stateVal.centerbutton.Item) {
                        this.useChanged ? this.ScenterButton.SchangeLabel.visible = true : null;
                        bTest = false;
                    }
                    if (this.sel3 != stateVal.bottombutton.Item) {
                        this.useChanged ? this.SbottomButton.SchangeLabel.visible = true : null;
                        bTest = false;
                    }
                    return bTest;
                }
                initLabels(label1, label2, label3) {
                    this.StopButton.StopLabel.text = label1;
                    this.ScenterButton.StopLabel.text = label2;
                    this.SbottomButton.StopLabel.text = label3;
                    this.StabTool.StopTab.StabLabel.text = label1;
                    this.StabTool.ScenterTab.StabLabel.text = label2;
                    this.StabTool.SbottomTab.StabLabel.text = label3;
                }
                enableTool(bFlag) {
                    if (bFlag) {
                        this.StopButton.addEventListener(TMouseEvent_1.TMouseEvent.WOZCLICK, this.topClick);
                        this.ScenterButton.addEventListener(TMouseEvent_1.TMouseEvent.WOZCLICK, this.centerClick);
                        this.SbottomButton.addEventListener(TMouseEvent_1.TMouseEvent.WOZCLICK, this.bottomClick);
                    }
                    else {
                        this.StopButton.removeEventListener(TMouseEvent_1.TMouseEvent.WOZCLICK, this.topClick);
                        this.ScenterButton.removeEventListener(TMouseEvent_1.TMouseEvent.WOZCLICK, this.centerClick);
                        this.SbottomButton.removeEventListener(TMouseEvent_1.TMouseEvent.WOZCLICK, this.bottomClick);
                    }
                    this.StopButton.enableButton(bFlag);
                    this.ScenterButton.enableButton(bFlag);
                    this.SbottomButton.enableButton(bFlag);
                }
                showTabTool(item1ID, item2ID, checkedItem, tabID) {
                    CUtil_3.CUtil.trace("Show TabTool: " + item1ID + " : " + item2ID + " : " + tabID);
                    this.item1Listener = item1ID;
                    this.item2Listener = item2ID;
                    this.StopButton.visible = false;
                    this.ScenterButton.visible = false;
                    this.SbottomButton.visible = false;
                    this.StabTool.StopTab.visible = false;
                    this.StabTool.ScenterTab.visible = false;
                    this.StabTool.SbottomTab.visible = false;
                    this.StabTool.hideAllIcons();
                    this.StabTool.Sitem1.visible = true;
                    this.StabTool.Sitem2.visible = true;
                    this.StabTool.Sitem3.visible = false;
                    this.StabTool.Sitem4.visible = false;
                    this.StabTool.Sitem5.visible = false;
                    this.StabTool.Sitem1.Scheckbox.setCheck(false);
                    this.StabTool.Sitem2.Scheckbox.setCheck(false);
                    if (checkedItem)
                        this.StabTool[checkedItem].Scheckbox.setCheck(true);
                    this.StabTool.Sitem1.Sicons[item1ID].visible = true;
                    this.StabTool.Sitem2.Sicons[item2ID].visible = true;
                    this.StabTool.Sitem1.addEventListener(TMouseEvent_1.TMouseEvent.WOZCLICK, this[item1ID]);
                    this.StabTool.Sitem2.addEventListener(TMouseEvent_1.TMouseEvent.WOZCLICK, this[item2ID]);
                    this.resizeDismissMask(true);
                    this.StabTool.SdismissButton.addEventListener(TMouseEvent_1.TMouseEvent.WOZCLICK, this.doDismiss);
                    this.StabTool[tabID].visible = true;
                    this.StabTool.visible = true;
                }
                show3TabTool(item1ID, item2ID, item3ID, checkedItem, tabID) {
                    CUtil_3.CUtil.trace("Show TabTool: " + item1ID + " : " + item2ID + " : " + item3ID + " : " + tabID);
                    this.item1Listener = item1ID;
                    this.item2Listener = item2ID;
                    this.item3Listener = item3ID;
                    this.StopButton.visible = false;
                    this.ScenterButton.visible = false;
                    this.SbottomButton.visible = false;
                    this.StabTool.StopTab.visible = false;
                    this.StabTool.ScenterTab.visible = false;
                    this.StabTool.SbottomTab.visible = false;
                    this.StabTool.hideAllIcons();
                    this.StabTool.Sitem1.visible = false;
                    this.StabTool.Sitem2.visible = false;
                    this.StabTool.Sitem3.visible = true;
                    this.StabTool.Sitem4.visible = true;
                    this.StabTool.Sitem5.visible = true;
                    this.StabTool.Sitem3.Scheckbox.setCheck(false);
                    this.StabTool.Sitem4.Scheckbox.setCheck(false);
                    this.StabTool.Sitem5.Scheckbox.setCheck(false);
                    if (checkedItem)
                        this.StabTool[checkedItem].Scheckbox.setCheck(true);
                    this.StabTool.Sitem3.Sicons[item1ID].visible = true;
                    this.StabTool.Sitem4.Sicons[item2ID].visible = true;
                    this.StabTool.Sitem5.Sicons[item3ID].visible = true;
                    this.StabTool.Sitem3.addEventListener(TMouseEvent_1.TMouseEvent.WOZCLICK, this[item1ID]);
                    this.StabTool.Sitem4.addEventListener(TMouseEvent_1.TMouseEvent.WOZCLICK, this[item2ID]);
                    this.StabTool.Sitem5.addEventListener(TMouseEvent_1.TMouseEvent.WOZCLICK, this[item3ID]);
                    this.resizeDismissMask(true);
                    this.StabTool.SdismissButton.addEventListener(TMouseEvent_1.TMouseEvent.WOZCLICK, this.doDismiss);
                    this.StabTool[tabID].visible = true;
                    this.StabTool.visible = true;
                }
                resizeDismissMask(showHide) {
                    var iPnt = this.globalToLocal(0, 0);
                    var ePnt = this.globalToLocal(this.tutorDoc.STAGEWIDTH, this.tutorDoc.STAGEHEIGHT);
                    if (showHide) {
                        this.StabTool.SdismissButton.x = iPnt.x;
                        this.StabTool.SdismissButton.y = iPnt.y;
                        this.StabTool.SdismissButton.width = ePnt.x - iPnt.x;
                        this.StabTool.SdismissButton.height = ePnt.y - iPnt.y;
                    }
                    else {
                        this.StabTool.SdismissButton.x = 0;
                        this.StabTool.SdismissButton.y = 0;
                        this.StabTool.SdismissButton.width = 0;
                        this.StabTool.SdismissButton.height = 0;
                    }
                }
                dismissTool(eventID) {
                    CUtil_3.CUtil.trace("dismiss TabTool: " + eventID);
                    var logData = { 'action': 'dismissTool', 'targetid': name, 'selection': eventID };
                    this.tutorDoc.log.logActionEvent(logData);
                    this.queryQuestionDone();
                    this.StabTool.Sitem1.removeEventListener(TMouseEvent_1.TMouseEvent.WOZCLICK, this[this.item1Listener]);
                    this.StabTool.Sitem2.removeEventListener(TMouseEvent_1.TMouseEvent.WOZCLICK, this[this.item2Listener]);
                    this.resizeDismissMask(false);
                    this.StabTool.SdismissButton.removeEventListener(TMouseEvent_1.TMouseEvent.WOZCLICK, this.doDismiss);
                    this.StopButton.visible = true;
                    this.ScenterButton.visible = true;
                    this.SbottomButton.visible = true;
                    this.StabTool.visible = false;
                    if (eventID)
                        this.dispatchEvent(new TSelectEvent_1.TSelectEvent(eventID, TSelectEvent_1.TSelectEvent.WOZTABSELECT));
                }
                dismiss3Tool(eventID) {
                    CUtil_3.CUtil.trace("dismiss 3 TabTool: " + eventID);
                    var logData = { 'action': 'this.dismiss3Tool', 'targetid': name, 'selection': eventID };
                    this.tutorDoc.log.logActionEvent(logData);
                    this.queryQuestionDone();
                    this.StabTool.Sitem3.removeEventListener(TMouseEvent_1.TMouseEvent.WOZCLICK, this[this.item1Listener]);
                    this.StabTool.Sitem4.removeEventListener(TMouseEvent_1.TMouseEvent.WOZCLICK, this[this.item2Listener]);
                    this.StabTool.Sitem5.removeEventListener(TMouseEvent_1.TMouseEvent.WOZCLICK, this[this.item3Listener]);
                    this.resizeDismissMask(false);
                    this.StabTool.SdismissButton.removeEventListener(TMouseEvent_1.TMouseEvent.WOZCLICK, this.doDismiss);
                    this.StopButton.visible = true;
                    this.ScenterButton.visible = true;
                    this.SbottomButton.visible = true;
                    this.StabTool.visible = false;
                    if (eventID)
                        this.dispatchEvent(new TSelectEvent_1.TSelectEvent(eventID, TSelectEvent_1.TSelectEvent.WOZTABSELECT));
                }
                doDismiss(evt) {
                    this.dismissTool(null);
                }
                queryQuestionDone() {
                }
                topClick(evt) {
                }
                centerClick(evt) {
                }
                bottomClick(evt) {
                }
            };
            exports_7("TController", TController);
        }
    };
});
System.register("com/TBakingController", ["com/common/TController", "util/CUtil"], function (exports_8, context_8) {
    "use strict";
    var __moduleName = context_8 && context_8.id;
    var TController_1, CUtil_4, TBakingController;
    return {
        setters: [
            function (TController_1_1) {
                TController_1 = TController_1_1;
            },
            function (CUtil_4_1) {
                CUtil_4 = CUtil_4_1;
            }
        ],
        execute: function () {
            TBakingController = class TBakingController extends TController_1.TController {
                constructor() {
                    super();
                    CUtil_4.CUtil.trace("TBakingController:Constructor");
                    this.initLabels("Temperature", "Sweetener", "Eggs");
                }
                topClick(evt) {
                    this.show3TabTool("temp200", "temp350", "temp500", this.sel1, "StopTab");
                }
                temp200(evt) {
                    this.StopButton.SsubLabel.text = "200 Degrees";
                    this.StopButton.SsubLabel.visible = true;
                    this.sel1 = "Sitem3";
                    this.dismiss3Tool("temp200");
                }
                temp350(evt) {
                    this.StopButton.SsubLabel.text = "350 Degrees";
                    this.StopButton.SsubLabel.visible = true;
                    this.sel1 = "Sitem4";
                    this.dismiss3Tool("temp350");
                }
                temp500(evt) {
                    this.StopButton.SsubLabel.text = "500 Degrees";
                    this.StopButton.SsubLabel.visible = true;
                    this.sel1 = "Sitem5";
                    this.dismiss3Tool("temp500");
                }
                centerClick(evt) {
                    this.showTabTool("honey", "sugar", this.sel2, "ScenterTab");
                }
                honey(evt) {
                    this.ScenterButton.SsubLabel.text = "Honey";
                    this.ScenterButton.SsubLabel.visible = true;
                    this.sel2 = "Sitem1";
                    this.dismissTool("honey");
                }
                sugar(evt) {
                    this.ScenterButton.SsubLabel.text = "Sugar";
                    this.ScenterButton.SsubLabel.visible = true;
                    this.sel2 = "Sitem2";
                    this.dismissTool("sugar");
                }
                bottomClick(evt) {
                    this.showTabTool("oneEgg", "threeEgg", this.sel3, "SbottomTab");
                }
                oneEgg(evt) {
                    this.SbottomButton.SsubLabel.text = "One Egg";
                    this.SbottomButton.SsubLabel.visible = true;
                    this.sel3 = "Sitem1";
                    this.dismissTool("oneEgg");
                }
                threeEgg(evt) {
                    this.SbottomButton.SsubLabel.text = "Three Eggs";
                    this.SbottomButton.SsubLabel.visible = true;
                    this.sel3 = "Sitem2";
                    this.dismissTool("threeEgg");
                }
                queryQuestionDone() {
                    if (this.sel1 && this.sel2 && this.sel3)
                        this.dispatchEvent(new Event("Done"));
                }
            };
            exports_8("TBakingController", TBakingController);
        }
    };
});
System.register("com/common/TImgTool", ["com/events/TSelectEvent", "thermite/TObject", "thermite/events/TMouseEvent", "util/CUtil"], function (exports_9, context_9) {
    "use strict";
    var __moduleName = context_9 && context_9.id;
    var TSelectEvent_2, TObject_5, TMouseEvent_2, CUtil_5, TImgTool;
    return {
        setters: [
            function (TSelectEvent_2_1) {
                TSelectEvent_2 = TSelectEvent_2_1;
            },
            function (TObject_5_1) {
                TObject_5 = TObject_5_1;
            },
            function (TMouseEvent_2_1) {
                TMouseEvent_2 = TMouseEvent_2_1;
            },
            function (CUtil_5_1) {
                CUtil_5 = CUtil_5_1;
            }
        ],
        execute: function () {
            TImgTool = class TImgTool extends TObject_5.TObject {
                constructor() {
                    super();
                    this.useFeatureMask = false;
                    CUtil_5.CUtil.trace("TImgTool:Constructor");
                    this.hideAllButtons();
                }
                initListeners() {
                    this[this.feature1A].addEventListener(TMouseEvent_2.TMouseEvent.CLICK, this.dofeature1A);
                    this[this.feature1B].addEventListener(TMouseEvent_2.TMouseEvent.CLICK, this.dofeature1B);
                    this[this.feature2A].addEventListener(TMouseEvent_2.TMouseEvent.CLICK, this.dofeature2A);
                    this[this.feature2B].addEventListener(TMouseEvent_2.TMouseEvent.CLICK, this.dofeature2B);
                    this[this.feature3A].addEventListener(TMouseEvent_2.TMouseEvent.CLICK, this.dofeature3A);
                    this[this.feature3B].addEventListener(TMouseEvent_2.TMouseEvent.CLICK, this.dofeature3B);
                }
                manageMasks(target) {
                }
                deepStateCopy(src) {
                    super.deepStateCopy(src);
                    this[this.feature1A].visible = src[this.feature1A].visible;
                    this[this.feature1B].visible = src[this.feature1B].visible;
                    this[this.feature2A].visible = src[this.feature2A].visible;
                    this[this.feature2B].visible = src[this.feature2B].visible;
                    this[this.feature3A].visible = src[this.feature3A].visible;
                    this[this.feature3B].visible = src[this.feature3B].visible;
                    if (this.useFeatureMask) {
                        this[this.featureMaskA].visible = src[this.featureMaskA].visible;
                        this[this.featureMaskB].visible = src[this.featureMaskB].visible;
                    }
                }
                get captureLOGString() {
                    var result;
                    if (this[this.feature1A].visible)
                        result = this.feature1A;
                    else if (this[this.feature1B].visible)
                        result = this.feature1B;
                    else
                        result = "none";
                    result += "-";
                    if (this[this.feature2A].visible)
                        result += this.feature2A;
                    else if (this[this.feature2B].visible)
                        result += this.feature2B;
                    else
                        result += "none";
                    result += "-";
                    if (this[this.feature3A].visible)
                        result += this.feature3A;
                    else if (this[this.feature3B].visible)
                        result += this.feature3B;
                    else
                        result += "none";
                    return result;
                }
                captureLogState(obj = null) {
                    obj = super.captureLogState(obj);
                    var image1;
                    var image2;
                    var image3;
                    var imageMask1;
                    var imageMask2;
                    if (this[this.feature1A].visible)
                        image1 = this.feature1A;
                    else if (this[this.feature1B].visible)
                        image1 = this.feature1B;
                    else
                        image1 = "none";
                    if (this[this.feature2A].visible)
                        image2 = this.feature2A;
                    else if (this[this.feature2B].visible)
                        image2 = this.feature2B;
                    else
                        image2 = "none";
                    if (this[this.feature3A].visible)
                        image3 = this.feature3A;
                    else if (this[this.feature3B].visible)
                        image3 = this.feature3B;
                    else
                        image3 = "none";
                    if (this.useFeatureMask) {
                        if (this[this.featureMaskA].visible)
                            imageMask1 = "true";
                        else
                            imageMask1 = "false";
                        if (this[this.featureMaskB].visible)
                            imageMask2 = "true";
                        else
                            imageMask2 = "false";
                    }
                    obj['object'] = 'imgtool';
                    obj['name'] = this.name;
                    obj['image1'] = image1;
                    obj['image2'] = image2;
                    obj['image3'] = image3;
                    obj['mask1'] = imageMask1;
                    obj['mask2'] = imageMask2;
                    return obj;
                }
                captureXMLState() {
                    var stateVal = { imgtool: {} };
                    var imgTool = imgTool.imgTool;
                    if (this[this.feature1A].visible)
                        imgTool.image1 = this.feature1A;
                    else if (this[this.feature1B].visible)
                        imgTool.image1 = this.feature1B;
                    else
                        imgTool.image1 = "none";
                    if (this[this.feature2A].visible)
                        imgTool.image2 = this.feature2A;
                    else if (this[this.feature2B].visible)
                        imgTool.image2 = this.feature2B;
                    else
                        imgTool.image2 = "none";
                    if (this[this.feature3A].visible)
                        imgTool.image3 = this.feature3A;
                    else if (this[this.feature3B].visible)
                        imgTool.image3 = this.feature3B;
                    else
                        imgTool.image3 = "none";
                    this.imgTool.name = this.name;
                    if (this.useFeatureMask) {
                        if (this[this.featureMaskA].visible)
                            imgTool.imageMask1 = "true";
                        else
                            imgTool.imageMask1 = "false";
                        if (this[this.featureMaskB].visible)
                            imgTool.imageMask2 = "true";
                        else
                            imgTool.imageMask2 = "false";
                    }
                    return stateVal;
                }
                restoreXMLState(stateVal) {
                    this[this.feature1A].visible = false;
                    this[this.feature1B].visible = false;
                    if (stateVal.image1 != "none")
                        this[stateVal.image1].visible = true;
                    this[this.feature2A].visible = false;
                    this[this.feature2B].visible = false;
                    if (stateVal.image2 != "none")
                        this[stateVal.image2].visible = true;
                    this[this.feature3A].visible = false;
                    this[this.feature3B].visible = false;
                    if (stateVal.image3 != "none")
                        this[stateVal.image3].visible = true;
                    if (this.useFeatureMask) {
                        this[this.featureMaskA].visible = (stateVal.mask1 == "true") ? true : false;
                        this[this.featureMaskB].visible = (stateVal.mask2 == "true") ? true : false;
                    }
                }
                compareXMLState(xmlState) {
                    var bTest = true;
                    if ((this[xmlState.image1].visible != true) ||
                        (this[xmlState.image2].visible != true) ||
                        (this[xmlState.image3].visible != true))
                        bTest = false;
                    return bTest;
                }
                hideAllButtons() {
                    for (var i1 = 0; i1 < this.numChildren; i1++) {
                        this.getChildAt(i1).visible = false;
                    }
                }
                enableTool(bFlag) {
                    this[this.feature1A].enableButton(bFlag);
                    this[this.feature1B].enableButton(bFlag);
                    this[this.feature2A].enableButton(bFlag);
                    this[this.feature2B].enableButton(bFlag);
                    this[this.feature3A].enableButton(bFlag);
                    this[this.feature3B].enableButton(bFlag);
                }
                logSelection(feature) {
                    var logData = { 'action': 'imageclicked', 'targetid': name, 'selection': feature };
                    this.tutorDoc.log.logActionEvent(logData);
                }
                dofeature1A(evt) {
                    this.logSelection(this.feature1A);
                    this.dispatchEvent(new TSelectEvent_2.TSelectEvent(this.feature1A, TSelectEvent_2.TSelectEvent.WOZIMGSELECT));
                }
                dofeature1B(evt) {
                    this.logSelection(this.feature1B);
                    this.dispatchEvent(new TSelectEvent_2.TSelectEvent(this.feature1B, TSelectEvent_2.TSelectEvent.WOZIMGSELECT));
                }
                dofeature2A(evt) {
                    this.logSelection(this.feature2A);
                    this.dispatchEvent(new TSelectEvent_2.TSelectEvent(this.feature2A, TSelectEvent_2.TSelectEvent.WOZIMGSELECT));
                }
                dofeature2B(evt) {
                    this.logSelection(this.feature2B);
                    this.dispatchEvent(new TSelectEvent_2.TSelectEvent(this.feature2B, TSelectEvent_2.TSelectEvent.WOZIMGSELECT));
                }
                dofeature3A(evt) {
                    this.logSelection(this.feature3A);
                    this.dispatchEvent(new TSelectEvent_2.TSelectEvent(this.feature3A, TSelectEvent_2.TSelectEvent.WOZIMGSELECT));
                }
                dofeature3B(evt) {
                    this.logSelection(this.feature3B);
                    this.dispatchEvent(new TSelectEvent_2.TSelectEvent(this.feature3B, TSelectEvent_2.TSelectEvent.WOZIMGSELECT));
                }
            };
            exports_9("TImgTool", TImgTool);
        }
    };
});
System.register("com/common/TImgTool322", ["com/common/TImgTool", "com/events/TSelectEvent", "thermite/events/TMouseEvent", "util/CUtil"], function (exports_10, context_10) {
    "use strict";
    var __moduleName = context_10 && context_10.id;
    var TImgTool_1, TSelectEvent_3, TMouseEvent_3, CUtil_6, TImgTool322;
    return {
        setters: [
            function (TImgTool_1_1) {
                TImgTool_1 = TImgTool_1_1;
            },
            function (TSelectEvent_3_1) {
                TSelectEvent_3 = TSelectEvent_3_1;
            },
            function (TMouseEvent_3_1) {
                TMouseEvent_3 = TMouseEvent_3_1;
            },
            function (CUtil_6_1) {
                CUtil_6 = CUtil_6_1;
            }
        ],
        execute: function () {
            TImgTool322 = class TImgTool322 extends TImgTool_1.TImgTool {
                constructor() {
                    super();
                    CUtil_6.CUtil.trace("TImgTool322:Constructor");
                }
                initListeners() {
                    super.initListeners();
                    this[this.feature1C].addEventListener(TMouseEvent_3.TMouseEvent.WOZCLICK, this.dofeature1C);
                }
                deepStateCopy(src) {
                    super.deepStateCopy(src);
                    this[this.feature1C].visible = src[this.feature1C].visible;
                }
                get captureLOGString() {
                    var result;
                    if (this[this.feature1A].visible)
                        result = this.feature1A;
                    else if (this[this.feature1B].visible)
                        result = this.feature1B;
                    else if (this[this.feature1C].visible)
                        result = this.feature1C;
                    else
                        result = "none";
                    result += "-";
                    if (this[this.feature2A].visible)
                        result += this.feature2A;
                    else if (this[this.feature2B].visible)
                        result += this.feature2B;
                    else
                        result += "none";
                    result += "-";
                    if (this[this.feature3A].visible)
                        result += this.feature3A;
                    else if (this[this.feature3B].visible)
                        result += this.feature3B;
                    else
                        result += "none";
                    return result;
                }
                captureLogState(obj = null) {
                    obj = super.captureLogState(obj);
                    var image1;
                    var image2;
                    var image3;
                    if (this[this.feature1A].visible)
                        image1 = this.feature1A;
                    else if (this[this.feature1B].visible)
                        image1 = this.feature1B;
                    else if (this[this.feature1C].visible)
                        image1 = this.feature1C;
                    else
                        image1 = "none";
                    if (this[this.feature2A].visible)
                        image2 = this.feature2A;
                    else if (this[this.feature2B].visible)
                        image2 = this.feature2B;
                    else
                        image2 = "none";
                    if (this[this.feature3A].visible)
                        image3 = this.feature3A;
                    else if (this[this.feature3B].visible)
                        image3 = this.feature3B;
                    else
                        image3 = "none";
                    obj['object'] = 'imgtool';
                    obj['name'] = this.name;
                    obj['image1'] = image1;
                    obj['image2'] = image2;
                    obj['image3'] = image3;
                    return obj;
                }
                captureXMLState() {
                    var stateVal = {};
                    if (this[this.feature1A].visible)
                        stateVal.image1 = this.feature1A;
                    else if (this[this.feature1B].visible)
                        stateVal.image1 = this.feature1B;
                    else if (this[this.feature1C].visible)
                        stateVal.image1 = this.feature1C;
                    else
                        stateVal.image1 = "none";
                    if (this[this.feature2A].visible)
                        stateVal.image2 = this.feature2A;
                    else if (this[this.feature2B].visible)
                        stateVal.image2 = this.feature2B;
                    else
                        stateVal.image2 = "none";
                    if (this[this.feature3A].visible)
                        stateVal.image3 = this.feature3A;
                    else if (this[this.feature3B].visible)
                        stateVal.image3 = this.feature3B;
                    else
                        stateVal.image3 = "none";
                    stateVal.name = this.name;
                    return stateVal;
                }
                restoreXMLState(stateVal) {
                    this[this.feature1A].visible = false;
                    this[this.feature1B].visible = false;
                    this[this.feature1C].visible = false;
                    if (stateVal.image1 != "none")
                        this[stateVal.image1].visible = true;
                    this[this.feature2A].visible = false;
                    this[this.feature2B].visible = false;
                    if (stateVal.image2 != "none")
                        this[stateVal.image2].visible = true;
                    this[this.feature3A].visible = false;
                    this[this.feature3B].visible = false;
                    if (stateVal.image3 != "none")
                        this[stateVal.image3].visible = true;
                }
                enableTool(bFlag) {
                    super.enableTool(bFlag);
                    this[this.feature1C].enableButton(bFlag);
                }
                dofeature1C(evt) {
                    this.logSelection(this.feature1C);
                    this.dispatchEvent(new TSelectEvent_3.TSelectEvent(this.feature1C, TSelectEvent_3.TSelectEvent.WOZIMGSELECT));
                }
            };
            exports_10("TImgTool322", TImgTool322);
        }
    };
});
System.register("com/TBakingImgTool", ["com/common/TImgTool322", "util/CUtil"], function (exports_11, context_11) {
    "use strict";
    var __moduleName = context_11 && context_11.id;
    var TImgTool322_1, CUtil_7, TBakingImgTool;
    return {
        setters: [
            function (TImgTool322_1_1) {
                TImgTool322_1 = TImgTool322_1_1;
            },
            function (CUtil_7_1) {
                CUtil_7 = CUtil_7_1;
            }
        ],
        execute: function () {
            TBakingImgTool = class TBakingImgTool extends TImgTool322_1.TImgTool322 {
                constructor() {
                    super();
                    CUtil_7.CUtil.trace("TBakingImgTool:Constructor");
                    this.feature1A = "temp200";
                    this.feature1B = "temp350";
                    this.feature1C = "temp500";
                    this.feature2A = "honey";
                    this.feature2B = "sugar";
                    this.feature3A = "oneEgg";
                    this.feature3B = "threeEgg";
                    this.initListeners();
                }
            };
            exports_11("TBakingImgTool", TBakingImgTool);
        }
    };
});
System.register("com/TCarsController", ["com/common/TController", "util/CUtil"], function (exports_12, context_12) {
    "use strict";
    var __moduleName = context_12 && context_12.id;
    var TController_2, CUtil_8, TCarsController;
    return {
        setters: [
            function (TController_2_1) {
                TController_2 = TController_2_1;
            },
            function (CUtil_8_1) {
                CUtil_8 = CUtil_8_1;
            }
        ],
        execute: function () {
            TCarsController = class TCarsController extends TController_2.TController {
                constructor() {
                    super();
                    CUtil_8.CUtil.trace("TCarsController:Constructor");
                    this.initLabels("Roof", "Doors", "Tires");
                }
                topClick(evt) {
                    this.showTabTool("topClosed", "topOpen", this.sel1, "StopTab");
                }
                topClosed(evt) {
                    this.StopButton.SsubLabel.text = "Closed";
                    this.StopButton.SsubLabel.visible = true;
                    this.sel1 = "Sitem1";
                    this.dismissTool("topClosed");
                }
                topOpen(evt) {
                    this.StopButton.SsubLabel.text = "Open";
                    this.StopButton.SsubLabel.visible = true;
                    this.sel1 = "Sitem2";
                    this.dismissTool("topOpen");
                }
                centerClick(evt) {
                    this.showTabTool("doorsTwo", "doorsFour", this.sel2, "ScenterTab");
                }
                doorsTwo(evt) {
                    this.ScenterButton.SsubLabel.text = "Two";
                    this.ScenterButton.SsubLabel.visible = true;
                    this.sel2 = "Sitem1";
                    this.dismissTool("doorsTwo");
                }
                doorsFour(evt) {
                    this.ScenterButton.SsubLabel.text = "Four";
                    this.ScenterButton.SsubLabel.visible = true;
                    this.sel2 = "Sitem2";
                    this.dismissTool("doorsFour");
                }
                bottomClick(evt) {
                    this.showTabTool("tiresLarge", "tiresSmall", this.sel3, "SbottomTab");
                }
                tiresLarge(evt) {
                    this.SbottomButton.SsubLabel.text = "Large";
                    this.SbottomButton.SsubLabel.visible = true;
                    this.sel3 = "Sitem1";
                    this.dismissTool("tiresLarge");
                }
                tiresSmall(evt) {
                    this.SbottomButton.SsubLabel.text = "Small";
                    this.SbottomButton.SsubLabel.visible = true;
                    this.sel3 = "Sitem2";
                    this.dismissTool("tiresSmall");
                }
                queryQuestionDone() {
                    if (this.sel1 && this.sel2 && this.sel3)
                        this.dispatchEvent(new Event("Done"));
                }
            };
            exports_12("TCarsController", TCarsController);
        }
    };
});
System.register("com/TCarsImgTool", ["com/common/TImgTool", "util/CUtil"], function (exports_13, context_13) {
    "use strict";
    var __moduleName = context_13 && context_13.id;
    var TImgTool_2, CUtil_9, TCarsImgTool;
    return {
        setters: [
            function (TImgTool_2_1) {
                TImgTool_2 = TImgTool_2_1;
            },
            function (CUtil_9_1) {
                CUtil_9 = CUtil_9_1;
            }
        ],
        execute: function () {
            TCarsImgTool = class TCarsImgTool extends TImgTool_2.TImgTool {
                constructor() {
                    super();
                    CUtil_9.CUtil.trace("TCarsImgTool:Constructor");
                    this.feature1A = "topClosed";
                    this.feature1B = "topOpen";
                    this.feature2A = "doorsTwo";
                    this.feature2B = "doorsFour";
                    this.feature3A = "tiresLarge";
                    this.feature3B = "tiresSmall";
                    this.initListeners();
                }
            };
            exports_13("TCarsImgTool", TCarsImgTool);
        }
    };
});
System.register("com/TDrinkController", ["com/common/TController", "util/CUtil"], function (exports_14, context_14) {
    "use strict";
    var __moduleName = context_14 && context_14.id;
    var TController_3, CUtil_10, TDrinkController;
    return {
        setters: [
            function (TController_3_1) {
                TController_3 = TController_3_1;
            },
            function (CUtil_10_1) {
                CUtil_10 = CUtil_10_1;
            }
        ],
        execute: function () {
            TDrinkController = class TDrinkController extends TController_3.TController {
                constructor() {
                    super();
                    CUtil_10.CUtil.trace("TDrinkController:Constructor");
                    this.initLabels("Time", "Age", "Drink");
                }
                topClick(evt) {
                    this.show3TabTool("clockNoon", "clockThree", "clockSix", this.sel1, "StopTab");
                }
                clockNoon(evt) {
                    this.StopButton.SsubLabel.text = "Noon";
                    this.StopButton.SsubLabel.visible = true;
                    this.sel1 = "Sitem3";
                    this.dismissTool("clockNoon");
                }
                clockThree(evt) {
                    this.StopButton.SsubLabel.text = "3:00 PM";
                    this.StopButton.SsubLabel.visible = true;
                    this.sel1 = "Sitem4";
                    this.dismissTool("clockThree");
                }
                clockSix(evt) {
                    this.StopButton.SsubLabel.text = "6:00 PM";
                    this.StopButton.SsubLabel.visible = true;
                    this.sel1 = "Sitem5";
                    this.dismissTool("clockSix");
                }
                centerClick(evt) {
                    this.showTabTool("ageYoung", "ageOlder", this.sel2, "ScenterTab");
                }
                ageYoung(evt) {
                    this.ScenterButton.SsubLabel.text = "Younger";
                    this.ScenterButton.SsubLabel.visible = true;
                    this.sel2 = "Sitem1";
                    this.dismissTool("ageYoung");
                }
                ageOlder(evt) {
                    this.ScenterButton.SsubLabel.text = "Older";
                    this.ScenterButton.SsubLabel.visible = true;
                    this.sel2 = "Sitem2";
                    this.dismissTool("ageOlder");
                }
                bottomClick(evt) {
                    this.showTabTool("drinkLemon", "drinkTea", this.sel3, "SbottomTab");
                }
                drinkLemon(evt) {
                    this.SbottomButton.SsubLabel.text = "Lemonade";
                    this.SbottomButton.SsubLabel.visible = true;
                    this.sel3 = "Sitem1";
                    this.dismissTool("drinkLemon");
                }
                drinkTea(evt) {
                    this.SbottomButton.SsubLabel.text = "Iced Tea";
                    this.SbottomButton.SsubLabel.visible = true;
                    this.sel3 = "Sitem2";
                    this.dismissTool("drinkTea");
                }
                queryQuestionDone() {
                    if (this.sel1 && this.sel2 && this.sel3)
                        this.dispatchEvent(new Event("Done"));
                }
            };
            exports_14("TDrinkController", TDrinkController);
        }
    };
});
System.register("com/TDrinkImgTool", ["com/common/TImgTool322", "util/CUtil"], function (exports_15, context_15) {
    "use strict";
    var __moduleName = context_15 && context_15.id;
    var TImgTool322_2, CUtil_11, TDrinkImgTool;
    return {
        setters: [
            function (TImgTool322_2_1) {
                TImgTool322_2 = TImgTool322_2_1;
            },
            function (CUtil_11_1) {
                CUtil_11 = CUtil_11_1;
            }
        ],
        execute: function () {
            TDrinkImgTool = class TDrinkImgTool extends TImgTool322_2.TImgTool322 {
                constructor() {
                    super();
                    CUtil_11.CUtil.trace("TDrinkImgTool:Constructor");
                    this.feature1A = "clockNoon";
                    this.feature1B = "clockThree";
                    this.feature1C = "clockSix";
                    this.feature2A = "ageYoung";
                    this.feature2B = "ageOlder";
                    this.feature3A = "drinkLemon";
                    this.feature3B = "drinkTea";
                    this.initListeners();
                }
            };
            exports_15("TDrinkImgTool", TDrinkImgTool);
        }
    };
});
System.register("com/THouseController", ["com/common/TController", "util/CUtil"], function (exports_16, context_16) {
    "use strict";
    var __moduleName = context_16 && context_16.id;
    var TController_4, CUtil_12, THouseController;
    return {
        setters: [
            function (TController_4_1) {
                TController_4 = TController_4_1;
            },
            function (CUtil_12_1) {
                CUtil_12 = CUtil_12_1;
            }
        ],
        execute: function () {
            THouseController = class THouseController extends TController_4.TController {
                constructor() {
                    super();
                    CUtil_12.CUtil.trace("THouseController:Constructor");
                    this.initLabels("Chimney", "Paint Color", "Front Door");
                }
                topClick(evt) {
                    this.showTabTool("chimneyLeft", "chimneyRight", this.sel1, "StopTab");
                }
                chimneyLeft(evt) {
                    this.StopButton.SsubLabel.text = "Left Side";
                    this.StopButton.SsubLabel.visible = true;
                    this.sel1 = "Sitem1";
                    this.dismissTool("chimneyLeft");
                }
                chimneyRight(evt) {
                    this.StopButton.SsubLabel.text = "Right Side";
                    this.StopButton.SsubLabel.visible = true;
                    this.sel1 = "Sitem2";
                    this.dismissTool("chimneyRight");
                }
                centerClick(evt) {
                    this.showTabTool("pinkPaint", "bluePaint", this.sel2, "ScenterTab");
                }
                pinkPaint(evt) {
                    this.ScenterButton.SsubLabel.text = "Pink Paint";
                    this.ScenterButton.SsubLabel.visible = true;
                    this.sel2 = "Sitem1";
                    this.dismissTool("pinkPaint");
                }
                bluePaint(evt) {
                    this.ScenterButton.SsubLabel.text = "Blue Paint";
                    this.ScenterButton.SsubLabel.visible = true;
                    this.sel2 = "Sitem2";
                    this.dismissTool("bluePaint");
                }
                bottomClick(evt) {
                    this.showTabTool("singleDoor", "doubleDoor", this.sel3, "SbottomTab");
                }
                singleDoor(evt) {
                    this.SbottomButton.SsubLabel.text = "Single Door";
                    this.SbottomButton.SsubLabel.visible = true;
                    this.sel3 = "Sitem1";
                    this.dismissTool("singleDoor");
                }
                doubleDoor(evt) {
                    this.SbottomButton.SsubLabel.text = "Double Door";
                    this.SbottomButton.SsubLabel.visible = true;
                    this.sel3 = "Sitem2";
                    this.dismissTool("doubleDoor");
                }
                queryQuestionDone() {
                    if (this.sel1 && this.sel2 && this.sel3)
                        this.dispatchEvent(new Event("Done"));
                }
            };
            exports_16("THouseController", THouseController);
        }
    };
});
System.register("com/THouseImgTool", ["com/common/TImgTool", "util/CUtil"], function (exports_17, context_17) {
    "use strict";
    var __moduleName = context_17 && context_17.id;
    var TImgTool_3, CUtil_13, THouseImgTool;
    return {
        setters: [
            function (TImgTool_3_1) {
                TImgTool_3 = TImgTool_3_1;
            },
            function (CUtil_13_1) {
                CUtil_13 = CUtil_13_1;
            }
        ],
        execute: function () {
            THouseImgTool = class THouseImgTool extends TImgTool_3.TImgTool {
                constructor() {
                    super();
                    CUtil_13.CUtil.trace("THouseImgTool:Constructor");
                    this.feature1A = "singleDoor";
                    this.feature1B = "doubleDoor";
                    this.feature2A = "bluePaint";
                    this.feature2B = "pinkPaint";
                    this.feature3A = "chimneyLeft";
                    this.feature3B = "chimneyRight";
                    this.initListeners();
                }
            };
            exports_17("THouseImgTool", THouseImgTool);
        }
    };
});
System.register("com/TMemoryController", ["com/common/TController", "util/CUtil"], function (exports_18, context_18) {
    "use strict";
    var __moduleName = context_18 && context_18.id;
    var TController_5, CUtil_14, TMemoryController;
    return {
        setters: [
            function (TController_5_1) {
                TController_5 = TController_5_1;
            },
            function (CUtil_14_1) {
                CUtil_14 = CUtil_14_1;
            }
        ],
        execute: function () {
            TMemoryController = class TMemoryController extends TController_5.TController {
                constructor() {
                    super();
                    CUtil_14.CUtil.trace("TMemoryController:Constructor");
                    this.initLabels("Lighting", "Flashcards", "Time");
                }
                topClick(evt) {
                    this.showTabTool("lightBright", "lightDim", this.sel1, "StopTab");
                }
                lightBright(evt) {
                    this.StopButton.SsubLabel.text = "Bright";
                    this.StopButton.SsubLabel.visible = true;
                    this.sel1 = "Sitem1";
                    this.dismissTool("lightBright");
                }
                lightDim(evt) {
                    this.StopButton.SsubLabel.text = "Dim";
                    this.StopButton.SsubLabel.visible = true;
                    this.sel1 = "Sitem2";
                    this.dismissTool("lightDim");
                }
                centerClick(evt) {
                    this.showTabTool("cardIcons", "cardWords", this.sel2, "ScenterTab");
                }
                cardIcons(evt) {
                    this.ScenterButton.SsubLabel.text = "10 Pictures";
                    this.ScenterButton.SsubLabel.visible = true;
                    this.sel2 = "Sitem1";
                    this.dismissTool("cardIcons");
                }
                cardWords(evt) {
                    this.ScenterButton.SsubLabel.text = "10 Words";
                    this.ScenterButton.SsubLabel.visible = true;
                    this.sel2 = "Sitem2";
                    this.dismissTool("cardWords");
                }
                bottomClick(evt) {
                    this.showTabTool("minutesOne", "minutesFive", this.sel3, "SbottomTab");
                }
                minutesOne(evt) {
                    this.SbottomButton.SsubLabel.text = "15 Seconds";
                    this.SbottomButton.SsubLabel.visible = true;
                    this.sel3 = "Sitem1";
                    this.dismissTool("minutesOne");
                }
                minutesFive(evt) {
                    this.SbottomButton.SsubLabel.text = "45 Seconds";
                    this.SbottomButton.SsubLabel.visible = true;
                    this.sel3 = "Sitem2";
                    this.dismissTool("minutesFive");
                }
                queryQuestionDone() {
                    if (this.sel1 && this.sel2 && this.sel3)
                        this.dispatchEvent(new Event("Done"));
                }
            };
            exports_18("TMemoryController", TMemoryController);
        }
    };
});
System.register("com/TMemoryImgTool", ["com/common/TImgTool", "util/CUtil", "thermite/events/TMouseEvent"], function (exports_19, context_19) {
    "use strict";
    var __moduleName = context_19 && context_19.id;
    var TImgTool_4, CUtil_15, TMouseEvent_4, TMemoryImgTool;
    return {
        setters: [
            function (TImgTool_4_1) {
                TImgTool_4 = TImgTool_4_1;
            },
            function (CUtil_15_1) {
                CUtil_15 = CUtil_15_1;
            },
            function (TMouseEvent_4_1) {
                TMouseEvent_4 = TMouseEvent_4_1;
            }
        ],
        execute: function () {
            TMemoryImgTool = class TMemoryImgTool extends TImgTool_4.TImgTool {
                constructor() {
                    super();
                    CUtil_15.CUtil.trace("TMemoryImgTool:Constructor");
                    this.feature1A = "lightBright";
                    this.feature1B = "lightDim";
                    this.feature2A = "cardIcons";
                    this.feature2B = "cardWords";
                    this.feature3A = "minutesOne";
                    this.feature3B = "minutesFive";
                    this.useFeatureMask = true;
                    this.featureMaskA = "maskDim";
                    this.featureMaskB = "maskBright";
                    this.initListeners();
                }
                manageMasks(target) {
                    if (this.useFeatureMask) {
                        switch (target) {
                            case "lightBright":
                                this[this.featureMaskA].visible = false;
                                this[this.featureMaskB].visible = true;
                                break;
                            case "lightDim":
                                this[this.featureMaskA].visible = true;
                                this[this.featureMaskB].visible = false;
                                break;
                            case "cardIcons":
                                if (this.currentEvtTar != null) {
                                    this[this.featureMaskA].removeEventListener(TMouseEvent_4.TMouseEvent.WOZCLICK, this.currentEvtTar);
                                    this[this.featureMaskB].removeEventListener(TMouseEvent_4.TMouseEvent.WOZCLICK, this.currentEvtTar);
                                }
                                this[this.featureMaskA].addEventListener(TMouseEvent_4.TMouseEvent.WOZCLICK, this.dofeature2A);
                                this[this.featureMaskB].addEventListener(TMouseEvent_4.TMouseEvent.WOZCLICK, this.dofeature2A);
                                this.currentEvtTar = this.dofeature2A;
                                break;
                            case "cardWords":
                                if (this.currentEvtTar != null) {
                                    this[this.featureMaskA].removeEventListener(TMouseEvent_4.TMouseEvent.WOZCLICK, this.currentEvtTar);
                                    this[this.featureMaskB].removeEventListener(TMouseEvent_4.TMouseEvent.WOZCLICK, this.currentEvtTar);
                                }
                                this[this.featureMaskA].addEventListener(TMouseEvent_4.TMouseEvent.WOZCLICK, this.dofeature2B);
                                this[this.featureMaskB].addEventListener(TMouseEvent_4.TMouseEvent.WOZCLICK, this.dofeature2B);
                                this.currentEvtTar = this.dofeature2B;
                                break;
                        }
                    }
                }
            };
            exports_19("TMemoryImgTool", TMemoryImgTool);
        }
    };
});
System.register("com/TRocketController", ["com/common/TController", "util/CUtil"], function (exports_20, context_20) {
    "use strict";
    var __moduleName = context_20 && context_20.id;
    var TController_6, CUtil_16, TRocketController;
    return {
        setters: [
            function (TController_6_1) {
                TController_6 = TController_6_1;
            },
            function (CUtil_16_1) {
                CUtil_16 = CUtil_16_1;
            }
        ],
        execute: function () {
            TRocketController = class TRocketController extends TController_6.TController {
                constructor() {
                    super();
                    CUtil_16.CUtil.trace("TRocketController:Constructor");
                    this.initLabels("Body", "Windows", "Engine");
                }
                topClick(evt) {
                    this.showTabTool("curvedBody", "straightBody", this.sel1, "StopTab");
                }
                curvedBody(evt) {
                    this.StopButton.SsubLabel.text = "Curved";
                    this.StopButton.SsubLabel.visible = true;
                    this.sel1 = "Sitem1";
                    this.dismissTool("curvedBody");
                }
                straightBody(evt) {
                    this.StopButton.SsubLabel.text = "Straight";
                    this.StopButton.SsubLabel.visible = true;
                    this.sel1 = "Sitem2";
                    this.dismissTool("straightBody");
                }
                centerClick(evt) {
                    this.showTabTool("oneWindow", "fourWindow", this.sel2, "ScenterTab");
                }
                oneWindow(evt) {
                    this.ScenterButton.SsubLabel.text = "One";
                    this.ScenterButton.SsubLabel.visible = true;
                    this.sel2 = "Sitem1";
                    this.dismissTool("oneWindow");
                }
                fourWindow(evt) {
                    this.ScenterButton.SsubLabel.text = "Four";
                    this.ScenterButton.SsubLabel.visible = true;
                    this.sel2 = "Sitem2";
                    this.dismissTool("fourWindow");
                }
                bottomClick(evt) {
                    this.showTabTool("downEngines", "tiltEngines", this.sel3, "SbottomTab");
                }
                downEngines(evt) {
                    this.SbottomButton.SsubLabel.text = "Down";
                    this.SbottomButton.SsubLabel.visible = true;
                    this.sel3 = "Sitem1";
                    this.dismissTool("downEngines");
                }
                tiltEngines(evt) {
                    this.SbottomButton.SsubLabel.text = "Tilted";
                    this.SbottomButton.SsubLabel.visible = true;
                    this.sel3 = "Sitem2";
                    this.dismissTool("tiltEngines");
                }
                queryQuestionDone() {
                    if (this.sel1 && this.sel2 && this.sel3)
                        this.dispatchEvent(new Event("Done"));
                }
            };
            exports_20("TRocketController", TRocketController);
        }
    };
});
System.register("com/TRocketImgTool", ["com/common/TImgTool", "util/CUtil"], function (exports_21, context_21) {
    "use strict";
    var __moduleName = context_21 && context_21.id;
    var TImgTool_5, CUtil_17, TRocketImgTool;
    return {
        setters: [
            function (TImgTool_5_1) {
                TImgTool_5 = TImgTool_5_1;
            },
            function (CUtil_17_1) {
                CUtil_17 = CUtil_17_1;
            }
        ],
        execute: function () {
            TRocketImgTool = class TRocketImgTool extends TImgTool_5.TImgTool {
                constructor() {
                    super();
                    CUtil_17.CUtil.trace("TRocketImgTool:Constructor");
                    this.feature1A = "curvedBody";
                    this.feature1B = "straightBody";
                    this.feature2A = "oneWindow";
                    this.feature2B = "fourWindow";
                    this.feature3A = "downEngines";
                    this.feature3B = "tiltEngines";
                    this.initListeners();
                }
            };
            exports_21("TRocketImgTool", TRocketImgTool);
        }
    };
});
System.register("com/TStudyController", ["com/common/TController", "util/CUtil"], function (exports_22, context_22) {
    "use strict";
    var __moduleName = context_22 && context_22.id;
    var TController_7, CUtil_18, TStudyController;
    return {
        setters: [
            function (TController_7_1) {
                TController_7 = TController_7_1;
            },
            function (CUtil_18_1) {
                CUtil_18 = CUtil_18_1;
            }
        ],
        execute: function () {
            TStudyController = class TStudyController extends TController_7.TController {
                constructor() {
                    super();
                    CUtil_18.CUtil.trace("TStudyController:Constructor");
                    this.initLabels("Who", "Where", "Drink");
                }
                topClick(evt) {
                    this.showTabTool("studyAlone", "studyFriend", this.sel1, "StopTab");
                }
                studyAlone(evt) {
                    this.StopButton.SsubLabel.text = "Alone";
                    this.StopButton.SsubLabel.visible = true;
                    this.sel1 = "Sitem1";
                    this.dismissTool("studyAlone");
                }
                studyFriend(evt) {
                    this.StopButton.SsubLabel.text = "Friend";
                    this.StopButton.SsubLabel.visible = true;
                    this.sel1 = "Sitem2";
                    this.dismissTool("studyFriend");
                }
                centerClick(evt) {
                    this.showTabTool("atHome", "atLibrary", this.sel2, "ScenterTab");
                }
                atHome(evt) {
                    this.ScenterButton.SsubLabel.text = "Home";
                    this.ScenterButton.SsubLabel.visible = true;
                    this.sel2 = "Sitem1";
                    this.dismissTool("atHome");
                }
                atLibrary(evt) {
                    this.ScenterButton.SsubLabel.text = "Library";
                    this.ScenterButton.SsubLabel.visible = true;
                    this.sel2 = "Sitem2";
                    this.dismissTool("atLibrary");
                }
                bottomClick(evt) {
                    this.showTabTool("drinkWater", "drinkSoda", this.sel3, "SbottomTab");
                }
                drinkWater(evt) {
                    this.SbottomButton.SsubLabel.text = "Water";
                    this.SbottomButton.SsubLabel.visible = true;
                    this.sel3 = "Sitem1";
                    this.dismissTool("drinkWater");
                }
                drinkSoda(evt) {
                    this.SbottomButton.SsubLabel.text = "Soda";
                    this.SbottomButton.SsubLabel.visible = true;
                    this.sel3 = "Sitem2";
                    this.dismissTool("drinkSoda");
                }
                queryQuestionDone() {
                    if (this.sel1 && this.sel2 && this.sel3)
                        this.dispatchEvent(new Event("Done"));
                }
            };
            exports_22("TStudyController", TStudyController);
        }
    };
});
System.register("com/TStudyImgTool", ["com/common/TImgTool", "util/CUtil"], function (exports_23, context_23) {
    "use strict";
    var __moduleName = context_23 && context_23.id;
    var TImgTool_6, CUtil_19, TStudyImgTool;
    return {
        setters: [
            function (TImgTool_6_1) {
                TImgTool_6 = TImgTool_6_1;
            },
            function (CUtil_19_1) {
                CUtil_19 = CUtil_19_1;
            }
        ],
        execute: function () {
            TStudyImgTool = class TStudyImgTool extends TImgTool_6.TImgTool {
                constructor() {
                    super();
                    CUtil_19.CUtil.trace("TStudyImgTool:Constructor");
                    this.feature1A = "studyAlone";
                    this.feature1B = "studyFriend";
                    this.feature2A = "atHome";
                    this.feature2B = "atLibrary";
                    this.feature3A = "drinkWater";
                    this.feature3B = "drinkSoda";
                    this.initListeners();
                }
            };
            exports_23("TStudyImgTool", TStudyImgTool);
        }
    };
});
System.register("com/common/TAssessIcon", ["thermite/TObject"], function (exports_24, context_24) {
    "use strict";
    var __moduleName = context_24 && context_24.id;
    var TObject_6, TAssessIcon;
    return {
        setters: [
            function (TObject_6_1) {
                TObject_6 = TObject_6_1;
            }
        ],
        execute: function () {
            TAssessIcon = class TAssessIcon extends TObject_6.TObject {
                constructor() {
                    super();
                    this.Sright.visible = false;
                    this.Swrong.visible = false;
                    this.SplaceKeeper.visible = false;
                }
                show(icon) {
                    this.fadeChild(icon, "on", true);
                }
            };
            exports_24("TAssessIcon", TAssessIcon);
        }
    };
});
System.register("com/common/TAssessment", ["thermite/TObject"], function (exports_25, context_25) {
    "use strict";
    var __moduleName = context_25 && context_25.id;
    var TObject_7, TAssessment;
    return {
        setters: [
            function (TObject_7_1) {
                TObject_7 = TObject_7_1;
            }
        ],
        execute: function () {
            TAssessment = class TAssessment extends TObject_7.TObject {
                constructor() {
                    super();
                }
            };
            exports_25("TAssessment", TAssessment);
        }
    };
});
System.register("com/common/TCircleControl", ["thermite/TCheckButton", "util/CUtil"], function (exports_26, context_26) {
    "use strict";
    var __moduleName = context_26 && context_26.id;
    var TCheckButton_1, CUtil_20, TCircleControl;
    return {
        setters: [
            function (TCheckButton_1_1) {
                TCheckButton_1 = TCheckButton_1_1;
            },
            function (CUtil_20_1) {
                CUtil_20 = CUtil_20_1;
            }
        ],
        execute: function () {
            TCircleControl = class TCircleControl extends TCheckButton_1.TCheckButton {
                constructor() {
                    super();
                }
                logClick() {
                    var logData = { 'action': 'circle_click', 'targetid': name, 'label': this.Slabel.text, 'selection': this.fChecked };
                    this.tutorDoc.log.logActionEvent(logData);
                }
                resetState() {
                    this.Sup.visible = false;
                    this.Sover.visible = false;
                    this.Sdown.visible = false;
                    this.SdisabledUp.visible = false;
                    this.SdisabledDown.visible = false;
                    this.Sfocus.visible = false;
                    this.Schecked.visible = false;
                }
                gotoState(sState) {
                    CUtil_20.CUtil.trace("TCircleControl.gotoState: ", name + " " + sState);
                    this.resetState();
                    this.curState = sState;
                    if (!this.fEnabled) {
                        if (!this.fChecked)
                            this.SdisabledUp.visible = true;
                        else
                            this.SdisabledDown.visible = true;
                        this.fPressed = false;
                    }
                    else
                        switch (sState) {
                            case "Sdown":
                                this.Sdown.visible = true;
                                this.fPressed = true;
                                break;
                            case "Sup":
                                if (this.fChecked)
                                    this.Schecked.visible = true;
                                else
                                    this.Sup.visible = true;
                                this.fPressed = false;
                                break;
                            case "Sover":
                                if (!this.fPressed)
                                    this.Sover.visible = true;
                                else
                                    this.Sdown.visible = true;
                                break;
                            case "Sout":
                                if (this.fChecked)
                                    this.Schecked.visible = true;
                                else
                                    this.Sup.visible = true;
                                break;
                        }
                }
                get captureLOGString() {
                    var strVal;
                    strVal = this.fChecked ? "checked" : "unchecked";
                    return strVal;
                }
                captureLOGState() {
                    let obj = { button: {} };
                    obj.button['name'] = this.Slabel.text;
                    obj.button['checked'] = this.fChecked.toString();
                    return obj;
                }
                restoreXMLState(xmlState) {
                    this.curState = xmlState.state;
                    this.fChecked = (xmlState.checked = "true") ? true : false;
                    this.fPressed = (xmlState.pressed = "true") ? true : false;
                    this.fEnabled = (xmlState.enabled = "true") ? true : false;
                }
                compareXMLState(xmlState) {
                    var bTest = true;
                    if (this.fChecked != xmlState.checked)
                        bTest = false;
                    return bTest;
                }
            };
            exports_26("TCircleControl", TCircleControl);
        }
    };
});
System.register("com/common/TLabelControl", [], function (exports_27, context_27) {
    "use strict";
    var __moduleName = context_27 && context_27.id;
    var Text, TLabelControl;
    return {
        setters: [],
        execute: function () {
            Text = createjs.Text;
            TLabelControl = class TLabelControl extends Text {
                constructor() {
                    super();
                }
                setLabel(newLabel, colour = 0x000000) {
                    this.text = newLabel;
                }
            };
            exports_27("TLabelControl", TLabelControl);
        }
    };
});
System.register("com/common/TNavCollection", ["thermite/TObject", "util/CUtil"], function (exports_28, context_28) {
    "use strict";
    var __moduleName = context_28 && context_28.id;
    var TObject_8, CUtil_21, TNavCollection;
    return {
        setters: [
            function (TObject_8_1) {
                TObject_8 = TObject_8_1;
            },
            function (CUtil_21_1) {
                CUtil_21 = CUtil_21_1;
            }
        ],
        execute: function () {
            TNavCollection = class TNavCollection extends TObject_8.TObject {
                constructor() {
                    super();
                    this.traceMode = false;
                    if (this.traceMode)
                        CUtil_21.CUtil.trace("TNavCollection:Constructor");
                }
            };
            exports_28("TNavCollection", TNavCollection);
        }
    };
});
System.register("com/common/TPrompt", ["thermite/TObject", "util/CUtil"], function (exports_29, context_29) {
    "use strict";
    var __moduleName = context_29 && context_29.id;
    var TObject_9, CUtil_22, TPrompt;
    return {
        setters: [
            function (TObject_9_1) {
                TObject_9 = TObject_9_1;
            },
            function (CUtil_22_1) {
                CUtil_22 = CUtil_22_1;
            }
        ],
        execute: function () {
            TPrompt = class TPrompt extends TObject_9.TObject {
                constructor() {
                    super();
                    this.traceTPrompt = false;
                    if (this.traceTPrompt)
                        CUtil_22.CUtil.trace("TPrompt:Constructor");
                    this.bTweenable = false;
                }
                setObjMode(TutScene, sMode) {
                    if (this.traceTPrompt)
                        CUtil_22.CUtil.trace("\t*** Start - Walking Top Level Nav Objects***");
                    for (var sceneObj in TutScene) {
                        if (sceneObj != "instance" && TutScene[sceneObj].instance instanceof TObject_9.TObject) {
                            TutScene[sceneObj].instance.setAutomationMode(TutScene[sceneObj], sMode);
                        }
                    }
                    if (this.traceTPrompt)
                        CUtil_22.CUtil.trace("\t*** End - Walking Top Level Nav Objects***");
                }
                dumpSceneObjs(TutScene) {
                    for (var sceneObj in TutScene) {
                        if (this.traceTPrompt)
                            CUtil_22.CUtil.trace("\tNavPanelObj : " + sceneObj);
                        if (sceneObj != "instance" && TutScene[sceneObj].instance instanceof TObject_9.TObject) {
                            if (this.traceTPrompt)
                                CUtil_22.CUtil.trace("\tT***");
                            TutScene[sceneObj].instance.dumpSubObjs(TutScene[sceneObj], "\t");
                        }
                    }
                }
            };
            exports_29("TPrompt", TPrompt);
        }
    };
});
System.register("com/common/TNextPrompt", ["com/common/TPrompt"], function (exports_30, context_30) {
    "use strict";
    var __moduleName = context_30 && context_30.id;
    var TPrompt_1, TNextPrompt;
    return {
        setters: [
            function (TPrompt_1_1) {
                TPrompt_1 = TPrompt_1_1;
            }
        ],
        execute: function () {
            TNextPrompt = class TNextPrompt extends TPrompt_1.TPrompt {
                constructor() {
                    super();
                }
            };
            exports_30("TNextPrompt", TNextPrompt);
        }
    };
});
System.register("com/common/TPanelDark", ["thermite/TButton", "util/CUtil"], function (exports_31, context_31) {
    "use strict";
    var __moduleName = context_31 && context_31.id;
    var TButton_3, CUtil_23, TPanelDark;
    return {
        setters: [
            function (TButton_3_1) {
                TButton_3 = TButton_3_1;
            },
            function (CUtil_23_1) {
                CUtil_23 = CUtil_23_1;
            }
        ],
        execute: function () {
            TPanelDark = class TPanelDark extends TButton_3.TButton {
                constructor() {
                    super();
                    CUtil_23.CUtil.trace("TPanelDark:Constructor");
                }
            };
            exports_31("TPanelDark", TPanelDark);
        }
    };
});
System.register("com/common/TPanelLight", ["thermite/TButton", "util/CUtil"], function (exports_32, context_32) {
    "use strict";
    var __moduleName = context_32 && context_32.id;
    var TButton_4, CUtil_24, TPanelLight;
    return {
        setters: [
            function (TButton_4_1) {
                TButton_4 = TButton_4_1;
            },
            function (CUtil_24_1) {
                CUtil_24 = CUtil_24_1;
            }
        ],
        execute: function () {
            TPanelLight = class TPanelLight extends TButton_4.TButton {
                constructor() {
                    super();
                    CUtil_24.CUtil.trace("TPanelLight:Constructor");
                }
            };
            exports_32("TPanelLight", TPanelLight);
        }
    };
});
System.register("com/common/TSelector", ["thermite/TObject", "util/CUtil"], function (exports_33, context_33) {
    "use strict";
    var __moduleName = context_33 && context_33.id;
    var TObject_10, CUtil_25, TSelector;
    return {
        setters: [
            function (TObject_10_1) {
                TObject_10 = TObject_10_1;
            },
            function (CUtil_25_1) {
                CUtil_25 = CUtil_25_1;
            }
        ],
        execute: function () {
            TSelector = class TSelector extends TObject_10.TObject {
                constructor() {
                    super();
                    CUtil_25.CUtil.trace("TSelector:Constructor");
                    this.button.addEventListener("WOZMOUSE_OVER", this.doButtonOver);
                    this.button.addEventListener("WOZMOUSE_CLICK", this.doMouseClick);
                    this.clicker.addEventListener("WOZMOUSE_OVER", this.doMouseOver);
                    this.clicker.addEventListener("WOZMOUSE_OUT", this.doMouseOut);
                    this.clicker.addEventListener("WOZMOUSE_DOWN", this.doMouseDown);
                    this.clicker.addEventListener("WOZMOUSE_CLICK", this.doMouseClick);
                }
                setAutomation(bFlag) {
                    this.bAuto = bFlag;
                }
                doMouseClick(evt) {
                }
                doMouseDown(evt) {
                }
                doMouseUp(evt) {
                }
                doMouseOver(evt) {
                }
                doMouseOut(evt) {
                }
            };
            exports_33("TSelector", TSelector);
        }
    };
});
System.register("com/common/TTip1", ["thermite/TScene", "util/CUtil"], function (exports_34, context_34) {
    "use strict";
    var __moduleName = context_34 && context_34.id;
    var TScene_1, CUtil_26, TTip1;
    return {
        setters: [
            function (TScene_1_1) {
                TScene_1 = TScene_1_1;
            },
            function (CUtil_26_1) {
                CUtil_26 = CUtil_26_1;
            }
        ],
        execute: function () {
            TTip1 = class TTip1 extends TScene_1.TScene {
                constructor() {
                    super();
                    CUtil_26.CUtil.trace("TTip1:Constructor");
                }
            };
            exports_34("TTip1", TTip1);
        }
    };
});
System.register("com/events/TNavEvent", ["util/CUtil"], function (exports_35, context_35) {
    "use strict";
    var __moduleName = context_35 && context_35.id;
    var CUtil_27, Event, TNavEvent;
    return {
        setters: [
            function (CUtil_27_1) {
                CUtil_27 = CUtil_27_1;
            }
        ],
        execute: function () {
            Event = createjs.Event;
            TNavEvent = class TNavEvent extends Event {
                constructor(type, _target = null, _featureSet = null, bubbles = false, cancelable = false) {
                    super(type, bubbles, cancelable);
                    this.wozNavTarget = _target;
                    this.wozFeatures = _featureSet;
                }
                clone() {
                    CUtil_27.CUtil.trace("cloning WOZEvent:");
                    return new TNavEvent(this.type, this.wozNavTarget, this.wozFeatures, this.bubbles, this.cancelable);
                }
            };
            TNavEvent.WOZNAVNEXT = "WOZNAVNEXT";
            TNavEvent.WOZNAVBACK = "WOZNAVBACK";
            TNavEvent.WOZNAVTO = "WOZNAVTO";
            TNavEvent.WOZNAVINC = "WOZNAVINC";
            TNavEvent.WOZNAVREPLAY = "WOZNAVREPLAY";
            exports_35("TNavEvent", TNavEvent);
        }
    };
});
System.register("sceneExt/TAssess", ["thermite/TScene", "util/CUtil"], function (exports_36, context_36) {
    "use strict";
    var __moduleName = context_36 && context_36.id;
    var TScene_2, CUtil_28, TAssess;
    return {
        setters: [
            function (TScene_2_1) {
                TScene_2 = TScene_2_1;
            },
            function (CUtil_28_1) {
                CUtil_28 = CUtil_28_1;
            }
        ],
        execute: function () {
            TAssess = class TAssess extends TScene_2.TScene {
                constructor() {
                    super();
                    CUtil_28.CUtil.trace("TAssess:Constructor");
                }
                preEnterScene(lTutor, sceneLabel, sceneTitle, scenePage, Direction) {
                    CUtil_28.CUtil.trace("TAssess Pre-Enter Scene Behavior: " + sceneTitle);
                    var nCorrect = 0;
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
                    if (this.queryGlobal('q1CVS') == "CVS") {
                        nCorrect++;
                        this.Sassess.Sstar1.Sright.visible = true;
                    }
                    else
                        this.Sassess.Sstar1.Swrong.visible = true;
                    if ((this.queryGlobal('q2Good') == "unchecked") && (this.queryGlobal('q2Bad') == "checked")) {
                        nCorrect++;
                        this.Sassess.Sstar2.Sright.visible = true;
                    }
                    else
                        this.Sassess.Sstar2.Swrong.visible = true;
                    if (this.queryGlobal('q2CVS') == "CVS") {
                        nCorrect++;
                        this.Sassess.Sstar3.Sright.visible = true;
                    }
                    else
                        this.Sassess.Sstar3.Swrong.visible = true;
                    if (this.queryGlobal('q3CVS') == "CVS") {
                        nCorrect++;
                        this.Sassess.Sstar4.Sright.visible = true;
                    }
                    else
                        this.Sassess.Sstar4.Swrong.visible = true;
                    if ((this.queryGlobal('q4Good') == "unchecked") && (this.queryGlobal('q4Bad') == "checked")) {
                        nCorrect++;
                        this.Sassess.Sstar5.Sright.visible = true;
                    }
                    else
                        this.Sassess.Sstar5.Swrong.visible = true;
                    if (this.queryGlobal('q4CVS') == "CVS") {
                        nCorrect++;
                        this.Sassess.Sstar6.Sright.visible = true;
                    }
                    else
                        this.Sassess.Sstar6.Swrong.visible = true;
                    if (this.queryGlobal('q5CVS') == "CVS") {
                        nCorrect++;
                        this.Sassess.Sstar7.Sright.visible = true;
                    }
                    else
                        this.Sassess.Sstar7.Swrong.visible = true;
                    if ((this.queryGlobal('q6Good') == "unchecked") && (this.queryGlobal('q6Bad') == "checked")) {
                        nCorrect++;
                        this.Sassess.Sstar8.Sright.visible = true;
                    }
                    else
                        this.Sassess.Sstar8.Swrong.visible = true;
                    if (this.queryGlobal('q6CVS') == "CVS") {
                        nCorrect++;
                        this.Sassess.Sstar9.Sright.visible = true;
                    }
                    else
                        this.Sassess.Sstar9.Swrong.visible = true;
                    this.Sassess.Sresult.text = nCorrect + " / 9";
                    return super.preEnterScene(lTutor, sceneLabel, sceneTitle, scenePage, Direction);
                }
            };
            exports_36("TAssess", TAssess);
        }
    };
});
System.register("sceneExt/TEndSplash", ["thermite/events/TMouseEvent", "com/events/TNavEvent", "thermite/TScene", "util/CUtil"], function (exports_37, context_37) {
    "use strict";
    var __moduleName = context_37 && context_37.id;
    var TMouseEvent_5, TNavEvent_1, TScene_3, CUtil_29, TEndSplash;
    return {
        setters: [
            function (TMouseEvent_5_1) {
                TMouseEvent_5 = TMouseEvent_5_1;
            },
            function (TNavEvent_1_1) {
                TNavEvent_1 = TNavEvent_1_1;
            },
            function (TScene_3_1) {
                TScene_3 = TScene_3_1;
            },
            function (CUtil_29_1) {
                CUtil_29 = CUtil_29_1;
            }
        ],
        execute: function () {
            TEndSplash = class TEndSplash extends TScene_3.TScene {
                constructor() {
                    super();
                    CUtil_29.CUtil.trace("TEndSplash:Constructor");
                    this.SdoneButton.addEventListener(TMouseEvent_5.TMouseEvent.WOZCLICK, this.onDoneClick);
                }
                onDoneClick(evt) {
                    this.SdoneButton.removeEventListener(TMouseEvent_5.TMouseEvent.WOZCLICK, this.onDoneClick);
                    this.SdoneButton.enableButton(false);
                    this.dispatchEvent(new TNavEvent_1.TNavEvent(TNavEvent_1.TNavEvent.WOZNAVNEXT));
                }
                get assessCorrect() {
                    var _assessCorrect = 0;
                    if ((this.queryGlobal('q2Good') == "unchecked") && (this.queryGlobal('q2Bad') == "checked")) {
                        _assessCorrect++;
                    }
                    if ((this.queryGlobal('q4Good') == "unchecked") && (this.queryGlobal('q4Bad') == "checked")) {
                        _assessCorrect++;
                    }
                    if ((this.queryGlobal('q6Good') == "unchecked") && (this.queryGlobal('q6Bad') == "checked")) {
                        _assessCorrect++;
                    }
                    return _assessCorrect.toString();
                }
                get designCorrect() {
                    var _designCorrect = 0;
                    if (this.queryGlobal('q1CVS') == "CVS") {
                        _designCorrect++;
                    }
                    if (this.queryGlobal('q2CVS') == "CVS") {
                        _designCorrect++;
                    }
                    if (this.queryGlobal('q3CVS') == "CVS") {
                        _designCorrect++;
                    }
                    if (this.queryGlobal('q4CVS') == "CVS") {
                        _designCorrect++;
                    }
                    if (this.queryGlobal('q5CVS') == "CVS") {
                        _designCorrect++;
                    }
                    if (this.queryGlobal('q6CVS') == "CVS") {
                        _designCorrect++;
                    }
                    return _designCorrect.toString();
                }
                preEnterScene(lTutor, sceneLabel, sceneTitle, scenePage, Direction) {
                    CUtil_29.CUtil.trace("TEndSplash Pre-Enter Scene Behavior: " + sceneTitle);
                    this.tutorAutoObj["sNavPanel"].$enableNext(false);
                    this.tutorAutoObj["sNavPanel"].$enableBack(false);
                    return super.preEnterScene(lTutor, sceneLabel, sceneTitle, scenePage, Direction);
                }
                preExitScene(Direction, sceneCurr) {
                    CUtil_29.CUtil.trace("TEndSplash Exit Scene Behavior:");
                    this.assertGlobal('Correct_Designs', this.designCorrect);
                    this.assertGlobal('Correct_Assessments', this.assessCorrect);
                    return ("OK");
                }
            };
            exports_37("TEndSplash", TEndSplash);
        }
    };
});
System.register("sceneExt/TExpSceneTyp1", ["thermite/TScene", "thermite/events/TMouseEvent", "util/CUtil"], function (exports_38, context_38) {
    "use strict";
    var __moduleName = context_38 && context_38.id;
    var TScene_4, TMouseEvent_6, CUtil_30, TExpSceneTyp1;
    return {
        setters: [
            function (TScene_4_1) {
                TScene_4 = TScene_4_1;
            },
            function (TMouseEvent_6_1) {
                TMouseEvent_6 = TMouseEvent_6_1;
            },
            function (CUtil_30_1) {
                CUtil_30 = CUtil_30_1;
            }
        ],
        execute: function () {
            TExpSceneTyp1 = class TExpSceneTyp1 extends TScene_4.TScene {
                constructor() {
                    super();
                    this.traceTExpSceneTyp1 = false;
                    this.cvsEncoding = ["NC", "CVS", "CVS_WV", "SC", "CVS_WV", "SC", "HOTAT", "MC"];
                    if (this.traceTExpSceneTyp1)
                        CUtil_30.CUtil.trace("TExpSceneTyp1:Constructor");
                    if (this.tutorDoc.testFeatureSet("FTR_TYPEA"))
                        this.sType = "_A";
                    else if (this.tutorDoc.testFeatureSet("FTR_TYPEA"))
                        this.sType = "_A";
                    else if (this.tutorDoc.testFeatureSet("FTR_TYPEB"))
                        this.sType = "_B";
                    else
                        this.sType = "";
                }
                encodeExptString(TVTEXT, TV, NTV1, NTV2) {
                    var code = 0;
                    if (this[this.tabController1][TV] != this[this.tabController2][TV])
                        code += 1;
                    if (this[this.tabController1][NTV1] != this[this.tabController2][NTV1])
                        code += 2;
                    if (this[this.tabController1][NTV2] != this[this.tabController2][NTV2])
                        code += 4;
                    var strVal = this.cvsEncoding[code];
                    return strVal;
                }
                encodeExptState(TVTEXT, TV, NTV1, NTV2) {
                    var stateVal = { CVS: {} };
                    var code = 0;
                    if (this[this.tabController1][TV] != this[this.tabController2][TV])
                        code += 1;
                    if (this[this.tabController1][NTV1] != this[this.tabController2][NTV1])
                        code += 2;
                    if (this[this.tabController1][NTV2] != this[this.tabController2][NTV2])
                        code += 4;
                    stateVal.CVS.code = this.cvsEncoding[code];
                    stateVal.CVS.code = TVTEXT;
                    return stateVal;
                }
                doImageMapA(evt) {
                    if (this.traceTExpSceneTyp1)
                        CUtil_30.CUtil.trace("doImgMap: " + evt.selection);
                    switch (evt.selection) {
                        case this.selOneA:
                        case this.selOneB:
                            this[this.tabController1].topClick(new TMouseEvent_6.TMouseEvent("", TMouseEvent_6.TMouseEvent.WOZCLICK));
                            break;
                        case this.selTwoA:
                        case this.selTwoB:
                            this[this.tabController1].centerClick(new TMouseEvent_6.TMouseEvent("", TMouseEvent_6.TMouseEvent.WOZCLICK));
                            break;
                        case this.selThreeA:
                        case this.selThreeB:
                            this[this.tabController1].bottomClick(new TMouseEvent_6.TMouseEvent("", TMouseEvent_6.TMouseEvent.WOZCLICK));
                            break;
                    }
                }
                doTabMapA(evt) {
                    if (this.traceTExpSceneTyp1)
                        CUtil_30.CUtil.trace(" this.doTabMap: " + evt.selection);
                    switch (evt.selection) {
                        case this.selOneA:
                        case this.selOneB:
                            this[this.imgTool1][this.selOneA].visible = false;
                            this[this.imgTool1][this.selOneB].visible = false;
                            break;
                        case this.selTwoA:
                        case this.selTwoB:
                            this[this.imgTool1][this.selTwoA].visible = false;
                            this[this.imgTool1][this.selTwoB].visible = false;
                            break;
                        case this.selThreeA:
                        case this.selThreeB:
                            this[this.imgTool1][this.selThreeA].visible = false;
                            this[this.imgTool1][this.selThreeB].visible = false;
                            break;
                    }
                    this[this.imgTool1][evt.selection].visible = true;
                    this[this.imgTool1].manageMasks(evt.selection);
                }
                doImageMapB(evt) {
                    if (this.traceTExpSceneTyp1)
                        CUtil_30.CUtil.trace("doImgMap: " + evt.selection);
                    switch (evt.selection) {
                        case this.selOneA:
                        case this.selOneB:
                            this[this.tabController2].topClick(new TMouseEvent_6.TMouseEvent("", TMouseEvent_6.TMouseEvent.WOZCLICK));
                            break;
                        case this.selTwoA:
                        case this.selTwoB:
                            this[this.tabController2].centerClick(new TMouseEvent_6.TMouseEvent("", TMouseEvent_6.TMouseEvent.WOZCLICK));
                            break;
                        case this.selThreeA:
                        case this.selThreeB:
                            this[this.tabController2].bottomClick(new TMouseEvent_6.TMouseEvent("", TMouseEvent_6.TMouseEvent.WOZCLICK));
                            break;
                    }
                }
                doTabMapB(evt) {
                    if (this.traceTExpSceneTyp1)
                        CUtil_30.CUtil.trace(" this.doTabMap: " + evt.selection);
                    switch (evt.selection) {
                        case this.selOneA:
                        case this.selOneB:
                            this[this.imgTool2][this.selOneA].visible = false;
                            this[this.imgTool2][this.selOneB].visible = false;
                            break;
                        case this.selTwoA:
                        case this.selTwoB:
                            this[this.imgTool2][this.selTwoA].visible = false;
                            this[this.imgTool2][this.selTwoB].visible = false;
                            break;
                        case this.selThreeA:
                        case this.selThreeB:
                            this[this.imgTool2][this.selThreeA].visible = false;
                            this[this.imgTool2][this.selThreeB].visible = false;
                            break;
                    }
                    this[this.imgTool2][evt.selection].visible = true;
                    this[this.imgTool2].manageMasks(evt.selection);
                }
            };
            exports_38("TExpSceneTyp1", TExpSceneTyp1);
        }
    };
});
System.register("sceneExt/TExpSceneTyp2", ["thermite/TScene", "thermite/events/TMouseEvent", "util/CUtil"], function (exports_39, context_39) {
    "use strict";
    var __moduleName = context_39 && context_39.id;
    var TScene_5, TMouseEvent_7, CUtil_31, TExpSceneTyp2;
    return {
        setters: [
            function (TScene_5_1) {
                TScene_5 = TScene_5_1;
            },
            function (TMouseEvent_7_1) {
                TMouseEvent_7 = TMouseEvent_7_1;
            },
            function (CUtil_31_1) {
                CUtil_31 = CUtil_31_1;
            }
        ],
        execute: function () {
            TExpSceneTyp2 = class TExpSceneTyp2 extends TScene_5.TScene {
                constructor() {
                    super();
                    this.traceTExpSceneTyp2 = false;
                    this.cvsEncoding = ["NC", "CVS", "CVS_WV", "SC", "CVS_WV", "SC", "HOTAT", "MC"];
                    if (this.traceTExpSceneTyp2)
                        CUtil_31.CUtil.trace("TExpSceneTyp2:Constructor");
                    if (this.tutorDoc.testFeatureSet("FTR_TYPEA"))
                        this.sType = "_A";
                    else if (this.tutorDoc.testFeatureSet("FTR_TYPEA"))
                        this.sType = "_A";
                    else if (this.tutorDoc.testFeatureSet("FTR_TYPEB"))
                        this.sType = "_B";
                    else
                        this.sType = "";
                }
                encodeExptString(TVTEXT, TV, NTV1, NTV2) {
                    var code = 0;
                    if (this[this.tabController1][TV] != this[this.tabController2][TV])
                        code += 1;
                    if (this[this.tabController1][NTV1] != this[this.tabController2][NTV1])
                        code += 2;
                    if (this[this.tabController1][NTV2] != this[this.tabController2][NTV2])
                        code += 4;
                    var strEncoding = this.cvsEncoding[code];
                    return strEncoding;
                }
                encodeExptState(TVTEXT, TV, NTV1, NTV2) {
                    let stateVal = { CVS: {} };
                    var code = 0;
                    if (this[this.tabController1][TV] != this[this.tabController2][TV])
                        code += 1;
                    if (this[this.tabController1][NTV1] != this[this.tabController2][NTV1])
                        code += 2;
                    if (this[this.tabController1][NTV2] != this[this.tabController2][NTV2])
                        code += 4;
                    stateVal.CVS.code = this.cvsEncoding[code];
                    stateVal.CVS.tv = TVTEXT;
                    return stateVal;
                }
                doImageMapA(evt) {
                    if (this.traceTExpSceneTyp2)
                        CUtil_31.CUtil.trace("doImgMap: " + evt.selection);
                    switch (evt.selection) {
                        case this.selOneA:
                        case this.selOneB:
                        case this.selOneC:
                            this[this.tabController1].topClick(new TMouseEvent_7.TMouseEvent("", TMouseEvent_7.TMouseEvent.WOZCLICK));
                            break;
                        case this.selTwoA:
                        case this.selTwoB:
                            this[this.tabController1].centerClick(new TMouseEvent_7.TMouseEvent("", TMouseEvent_7.TMouseEvent.WOZCLICK));
                            break;
                        case this.selThreeA:
                        case this.selThreeB:
                            this[this.tabController1].bottomClick(new TMouseEvent_7.TMouseEvent("", TMouseEvent_7.TMouseEvent.WOZCLICK));
                            break;
                    }
                }
                doTabMapA(evt) {
                    if (this.traceTExpSceneTyp2)
                        CUtil_31.CUtil.trace(" this.doTabMap: " + evt.selection);
                    switch (evt.selection) {
                        case this.selOneA:
                        case this.selOneB:
                        case this.selOneC:
                            this[this.imgTool1][this.selOneA].visible = false;
                            this[this.imgTool1][this.selOneB].visible = false;
                            this[this.imgTool1][this.selOneC].visible = false;
                            break;
                        case this.selTwoA:
                        case this.selTwoB:
                            this[this.imgTool1][this.selTwoA].visible = false;
                            this[this.imgTool1][this.selTwoB].visible = false;
                            break;
                        case this.selThreeA:
                        case this.selThreeB:
                            this[this.imgTool1][this.selThreeA].visible = false;
                            this[this.imgTool1][this.selThreeB].visible = false;
                            break;
                    }
                    this[this.imgTool1][evt.selection].visible = true;
                }
                doImageMapB(evt) {
                    if (this.traceTExpSceneTyp2)
                        CUtil_31.CUtil.trace("doImgMap: " + evt.selection);
                    switch (evt.selection) {
                        case this.selOneA:
                        case this.selOneB:
                        case this.selOneC:
                            this[this.tabController2].topClick(new TMouseEvent_7.TMouseEvent("", TMouseEvent_7.TMouseEvent.WOZCLICK));
                            break;
                        case this.selTwoA:
                        case this.selTwoB:
                            this[this.tabController2].centerClick(new TMouseEvent_7.TMouseEvent("", TMouseEvent_7.TMouseEvent.WOZCLICK));
                            break;
                        case this.selThreeA:
                        case this.selThreeB:
                            this[this.tabController2].bottomClick(new TMouseEvent_7.TMouseEvent("", TMouseEvent_7.TMouseEvent.WOZCLICK));
                            break;
                    }
                }
                doTabMapB(evt) {
                    if (this.traceTExpSceneTyp2)
                        CUtil_31.CUtil.trace(" this.doTabMap: " + evt.selection);
                    switch (evt.selection) {
                        case this.selOneA:
                        case this.selOneB:
                        case this.selOneC:
                            this[this.imgTool2][this.selOneA].visible = false;
                            this[this.imgTool2][this.selOneB].visible = false;
                            this[this.imgTool2][this.selOneC].visible = false;
                            break;
                        case this.selTwoA:
                        case this.selTwoB:
                            this[this.imgTool2][this.selTwoA].visible = false;
                            this[this.imgTool2][this.selTwoB].visible = false;
                            break;
                        case this.selThreeA:
                        case this.selThreeB:
                            this[this.imgTool2][this.selThreeA].visible = false;
                            this[this.imgTool2][this.selThreeB].visible = false;
                            break;
                    }
                    this[this.imgTool2][evt.selection].visible = true;
                }
            };
            exports_39("TExpSceneTyp2", TExpSceneTyp2);
        }
    };
});
System.register("sceneExt/TIntroPart1", ["com/events/TSelectEvent", "thermite/TScene", "thermite/events/TMouseEvent", "util/CUtil"], function (exports_40, context_40) {
    "use strict";
    var __moduleName = context_40 && context_40.id;
    var TSelectEvent_4, TScene_6, TMouseEvent_8, CUtil_32, TIntroPart1;
    return {
        setters: [
            function (TSelectEvent_4_1) {
                TSelectEvent_4 = TSelectEvent_4_1;
            },
            function (TScene_6_1) {
                TScene_6 = TScene_6_1;
            },
            function (TMouseEvent_8_1) {
                TMouseEvent_8 = TMouseEvent_8_1;
            },
            function (CUtil_32_1) {
                CUtil_32 = CUtil_32_1;
            }
        ],
        execute: function () {
            TIntroPart1 = class TIntroPart1 extends TScene_6.TScene {
                constructor() {
                    super();
                    CUtil_32.CUtil.trace("TIntroPart1:Constructor");
                    this.i1p1imgTool.addEventListener(TSelectEvent_4.TSelectEvent.WOZIMGSELECT, this.doImageMap);
                    this.i1p1tabController.addEventListener(TSelectEvent_4.TSelectEvent.WOZTABSELECT, this.doTabMap);
                    this.i1p1tabController.addEventListener("Done", this.questionFinished);
                }
                doImageMap(evt) {
                    switch (evt.selection) {
                        case "chimneyLeft":
                        case "chimneyRight":
                            this.i1p1tabController.topClick(new TMouseEvent_8.TMouseEvent("", TMouseEvent_8.TMouseEvent.WOZCLICK));
                            break;
                        case "pinkPaint":
                        case "bluePaint":
                            this.i1p1tabController.centerClick(new TMouseEvent_8.TMouseEvent("", TMouseEvent_8.TMouseEvent.WOZCLICK));
                            break;
                        case "singleDoor":
                        case "doubleDoor":
                            this.i1p1tabController.bottomClick(new TMouseEvent_8.TMouseEvent("", TMouseEvent_8.TMouseEvent.WOZCLICK));
                            break;
                    }
                }
                doTabMap(evt) {
                    CUtil_32.CUtil.trace(" this.doTabMap: " + evt.selection);
                    switch (evt.selection) {
                        case "chimneyLeft":
                        case "chimneyRight":
                            this.i1p1imgTool.chimneyLeft.visible = false;
                            this.i1p1imgTool.chimneyRight.visible = false;
                            break;
                        case "pinkPaint":
                        case "bluePaint":
                            this.i1p1imgTool.pinkPaint.visible = false;
                            this.i1p1imgTool.bluePaint.visible = false;
                            break;
                        case "singleDoor":
                        case "doubleDoor":
                            this.i1p1imgTool.singleDoor.visible = false;
                            this.i1p1imgTool.doubleDoor.visible = false;
                            break;
                    }
                    this.i1p1imgTool[evt.selection].visible = true;
                }
                captureLogState(obj = null) {
                    obj = super.captureLogState(obj);
                    obj['scene'] = this.name;
                    obj['imgTool'] = this.i1p1imgTool.captureLogState();
                    obj['tabController'] = this.i1p1tabController.captureLogState();
                    return obj;
                }
                captureXMLState() {
                    var sceneState = { name: this.name };
                    sceneState.appendChild(this.i1p1imgTool.captureXMLState());
                    sceneState.appendChild(this.i1p1tabController.captureXMLState());
                    return sceneState;
                }
                restoreXMLState(xmlState) {
                }
                compareXMLState(xmlState) {
                    var bTest = true;
                    return bTest;
                }
                preExitScene(Direction, sceneCurr) {
                    CUtil_32.CUtil.trace("TIntroPart1 Enter Scene Behavior:");
                    return ("OK");
                }
            };
            exports_40("TIntroPart1", TIntroPart1);
        }
    };
});
System.register("sceneExt/TIntroPart2", ["com/events/TSelectEvent", "thermite/TScene", "thermite/events/TMouseEvent", "util/CUtil"], function (exports_41, context_41) {
    "use strict";
    var __moduleName = context_41 && context_41.id;
    var TSelectEvent_5, TScene_7, TMouseEvent_9, CUtil_33, TIntroPart2;
    return {
        setters: [
            function (TSelectEvent_5_1) {
                TSelectEvent_5 = TSelectEvent_5_1;
            },
            function (TScene_7_1) {
                TScene_7 = TScene_7_1;
            },
            function (TMouseEvent_9_1) {
                TMouseEvent_9 = TMouseEvent_9_1;
            },
            function (CUtil_33_1) {
                CUtil_33 = CUtil_33_1;
            }
        ],
        execute: function () {
            TIntroPart2 = class TIntroPart2 extends TScene_7.TScene {
                constructor() {
                    super();
                    this.fInitialized = false;
                    this.fStateCap = false;
                    CUtil_33.CUtil.trace("TIntroPart2:Constructor");
                    this.i1p2imgTool.addEventListener(TSelectEvent_5.TSelectEvent.WOZIMGSELECT, this.doImageMap);
                    this.i1p2tabController.addEventListener(TSelectEvent_5.TSelectEvent.WOZTABSELECT, this.doTabMap);
                    this.i1p2tabController.this.useChanged = true;
                    this.i1p2tabController.addEventListener("Done", this.questionFinished);
                }
                initHouse() {
                    CUtil_33.CUtil.trace("TIntroPart2:Constructor");
                    if (this.tutorAutoObj["Sintro1"].this.i1p1tabController.this.sel1 == "Sitem1") {
                        this.i1p2imgTool["chimneyRight"].visible = true;
                        this.i1p2tabController.this.sel1 = "Sitem2";
                        this.i1p2tabController.this.StopButton.SsubLabel.text = "Right Side";
                        this.i1p2tabController.this.StopButton.SsubLabel.visible = true;
                    }
                    else {
                        this.i1p2imgTool["chimneyLeft"].visible = true;
                        this.i1p2tabController.this.sel1 = "Sitem1";
                        this.i1p2tabController.this.StopButton.SsubLabel.text = "Left Side";
                        this.i1p2tabController.this.StopButton.SsubLabel.visible = true;
                    }
                    if (this.tutorAutoObj["Sintro1"].this.i1p1tabController.this.sel2 == "Sitem1") {
                        this.i1p2imgTool["bluePaint"].visible = true;
                        this.i1p2tabController.this.sel2 = "Sitem2";
                        this.i1p2tabController.this.ScenterButton.SsubLabel.text = "Blue Paint";
                        this.i1p2tabController.this.ScenterButton.SsubLabel.visible = true;
                    }
                    else {
                        this.i1p2imgTool["pinkPaint"].visible = true;
                        this.i1p2tabController.this.sel2 = "Sitem1";
                        this.i1p2tabController.this.ScenterButton.SsubLabel.text = "Pink Paint";
                        this.i1p2tabController.this.ScenterButton.SsubLabel.visible = true;
                    }
                    if (this.tutorAutoObj["Sintro1"].this.i1p1tabController.this.sel3 == "Sitem2") {
                        this.i1p2imgTool["singleDoor"].visible = true;
                        this.i1p2tabController.this.sel3 = "Sitem1";
                        this.i1p2tabController.this.SbottomButton.SsubLabel.text = "Single Door";
                        this.i1p2tabController.this.SbottomButton.SsubLabel.visible = true;
                    }
                    else {
                        this.i1p2imgTool["doubleDoor"].visible = true;
                        this.i1p2tabController.this.sel3 = "Sitem2";
                        this.i1p2tabController.this.SbottomButton.SsubLabel.text = "Double Door";
                        this.i1p2tabController.this.SbottomButton.SsubLabel.visible = true;
                    }
                    this.fInitialized = true;
                }
                doImageMap(evt) {
                    switch (evt.selection) {
                        case "chimneyLeft":
                        case "chimneyRight":
                            this.i1p2tabController.topClick(new TMouseEvent_9.TMouseEvent("", TMouseEvent_9.TMouseEvent.WOZCLICK));
                            break;
                        case "pinkPaint":
                        case "bluePaint":
                            this.i1p2tabController.centerClick(new TMouseEvent_9.TMouseEvent("", TMouseEvent_9.TMouseEvent.WOZCLICK));
                            break;
                        case "singleDoor":
                        case "doubleDoor":
                            this.i1p2tabController.bottomClick(new TMouseEvent_9.TMouseEvent("", TMouseEvent_9.TMouseEvent.WOZCLICK));
                            break;
                    }
                }
                doTabMap(evt) {
                    CUtil_33.CUtil.trace(" this.doTabMap: " + evt.selection);
                    switch (evt.selection) {
                        case "chimneyLeft":
                        case "chimneyRight":
                            this.i1p2imgTool.chimneyLeft.visible = false;
                            this.i1p2imgTool.chimneyRight.visible = false;
                            break;
                        case "pinkPaint":
                        case "bluePaint":
                            this.i1p2imgTool.pinkPaint.visible = false;
                            this.i1p2imgTool.bluePaint.visible = false;
                            break;
                        case "singleDoor":
                        case "doubleDoor":
                            this.i1p2imgTool.singleDoor.visible = false;
                            this.i1p2imgTool.doubleDoor.visible = false;
                            break;
                    }
                    this.i1p2imgTool[evt.selection].visible = true;
                }
                questionFinished(evt) {
                    this.setLabels();
                }
                setLabels() {
                    this.fComplete = false;
                    if (!this.i1p2tabController.compareXMLState(this.expState))
                        this.fComplete = true;
                    this.updateNav();
                }
                captureLogState(obj = null) {
                    obj = super.captureLogState(obj);
                    obj['scene'] = this.name;
                    obj['imgTool'] = this.i1p2imgTool.captureLogState();
                    obj['tabController'] = this.i1p2tabController.captureLogState();
                    return obj;
                }
                captureXMLState() {
                    var sceneState = { name: this.name };
                    sceneState.appendChild(this.i1p2imgTool.captureXMLState());
                    sceneState.appendChild(this.i1p2tabController.captureXMLState());
                    return sceneState;
                }
                restoreXMLState(xmlState) {
                }
                compareXMLState(xmlState) {
                    var bTest = true;
                    return bTest;
                }
                preEnterScene(lTutor, sceneLabel, sceneTitle, scenePage, Direction) {
                    CUtil_33.CUtil.trace("TIntroPart2 Pre-Enter Scene Behavior: " + sceneTitle);
                    if (!this.fInitialized)
                        this.initHouse();
                    if (!this.fStateCap) {
                        this.expState = this.i1p2tabController.captureXMLState();
                        this.fStateCap = true;
                    }
                    this.setLabels();
                    this.updateNav();
                    return super.preEnterScene(lTutor, sceneLabel, sceneTitle, scenePage, Direction);
                }
                preExitScene(Direction, sceneCurr) {
                    CUtil_33.CUtil.trace("TIntroPart2 Enter Scene Behavior:");
                    return ("OK");
                }
            };
            exports_41("TIntroPart2", TIntroPart2);
        }
    };
});
System.register("sceneExt/TIntroPart3", ["thermite/TScene", "thermite/events/TMouseEvent", "util/CUtil"], function (exports_42, context_42) {
    "use strict";
    var __moduleName = context_42 && context_42.id;
    var TScene_8, TMouseEvent_10, CUtil_34, TIntroPart3;
    return {
        setters: [
            function (TScene_8_1) {
                TScene_8 = TScene_8_1;
            },
            function (TMouseEvent_10_1) {
                TMouseEvent_10 = TMouseEvent_10_1;
            },
            function (CUtil_34_1) {
                CUtil_34 = CUtil_34_1;
            }
        ],
        execute: function () {
            TIntroPart3 = class TIntroPart3 extends TScene_8.TScene {
                constructor() {
                    super();
                    this.fInitialized = false;
                    this.fPrompted = false;
                    this.roofDone = false;
                    this.colorDone = false;
                    this.doorDone = false;
                    CUtil_34.CUtil.trace("TIntroPart3:Constructor");
                    this.i1p3imgTool.enableTool(false);
                    this.i3Check1.setLabel("Left side");
                    this.i3Check2.setLabel("Right side");
                    this.i3Check3.setLabel("Pink");
                    this.i3Check4.setLabel("Blue");
                    this.i3Check5.setLabel("Single");
                    this.i3Check6.setLabel("Double");
                    this.i3Prompt1.visible = false;
                    this.i3Check1.addEventListener(TMouseEvent_10.TMouseEvent.WOZCLICK, this.onCheck1);
                    this.i3Check2.addEventListener(TMouseEvent_10.TMouseEvent.WOZCLICK, this.onCheck2);
                    this.i3Check3.addEventListener(TMouseEvent_10.TMouseEvent.WOZCLICK, this.onCheck3);
                    this.i3Check4.addEventListener(TMouseEvent_10.TMouseEvent.WOZCLICK, this.onCheck4);
                    this.i3Check5.addEventListener(TMouseEvent_10.TMouseEvent.WOZCLICK, this.onCheck5);
                    this.i3Check6.addEventListener(TMouseEvent_10.TMouseEvent.WOZCLICK, this.onCheck6);
                }
                initHouse() {
                    CUtil_34.CUtil.trace("TIntroPart3:Constructor");
                    if (this.tutorAutoObj["Sintro2"].this.i1p2tabController.this.sel1 == "Sitem1") {
                        this.i1p3imgTool["chimneyRight"].visible = true;
                        this.i3Check1.setCheck(false);
                        this.i3Check2.setCheck(false);
                        this.corSel1 = false;
                        this.corSel2 = true;
                    }
                    else {
                        this.i1p3imgTool["chimneyLeft"].visible = true;
                        this.i3Check1.setCheck(false);
                        this.i3Check2.setCheck(false);
                        this.corSel1 = true;
                        this.corSel2 = false;
                    }
                    if (this.tutorAutoObj["Sintro2"].this.i1p2tabController.this.sel2 == "Sitem1") {
                        this.i1p3imgTool["bluePaint"].visible = true;
                        this.i3Check3.setCheck(true);
                        this.i3Check4.setCheck(false);
                        this.corSel3 = false;
                        this.corSel4 = true;
                    }
                    else {
                        this.i1p3imgTool["pinkPaint"].visible = true;
                        this.i3Check3.setCheck(false);
                        this.i3Check4.setCheck(true);
                        this.corSel3 = true;
                        this.corSel4 = false;
                    }
                    if (this.tutorAutoObj["Sintro2"].this.i1p2tabController.this.sel3 == "Sitem1") {
                        this.i1p3imgTool["doubleDoor"].visible = true;
                        this.i3Check5.setCheck(true);
                        this.i3Check6.setCheck(true);
                        this.corSel5 = false;
                        this.corSel6 = true;
                    }
                    else {
                        this.i1p3imgTool["singleDoor"].visible = true;
                        this.i3Check5.setCheck(true);
                        this.i3Check6.setCheck(true);
                        this.corSel5 = true;
                        this.corSel6 = false;
                    }
                    this.fInitialized = true;
                }
                onCheck1(evt) {
                    if ((this.i3Check1.getChecked() == this.corSel1) &&
                        (this.i3Check2.getChecked() == this.corSel2))
                        this.roofDone = true;
                    else
                        this.roofDone = false;
                    this.queryFinished();
                }
                onCheck2(evt) {
                    if ((this.i3Check1.getChecked() == this.corSel1) &&
                        (this.i3Check2.getChecked() == this.corSel2))
                        this.roofDone = true;
                    else
                        this.roofDone = false;
                    this.queryFinished();
                }
                onCheck3(evt) {
                    if ((this.i3Check3.getChecked() == this.corSel3) &&
                        (this.i3Check4.getChecked() == this.corSel4))
                        this.colorDone = true;
                    else
                        this.colorDone = false;
                    this.queryFinished();
                }
                onCheck4(evt) {
                    if ((this.i3Check3.getChecked() == this.corSel3) &&
                        (this.i3Check4.getChecked() == this.corSel4))
                        this.colorDone = true;
                    else
                        this.colorDone = false;
                    this.queryFinished();
                }
                onCheck5(evt) {
                    if ((this.i3Check5.getChecked() == this.corSel5) &&
                        (this.i3Check6.getChecked() == this.corSel6))
                        this.doorDone = true;
                    else
                        this.doorDone = false;
                    this.queryFinished();
                }
                onCheck6(evt) {
                    if ((this.i3Check5.getChecked() == this.corSel5) &&
                        (this.i3Check6.getChecked() == this.corSel6))
                        this.doorDone = true;
                    else
                        this.doorDone = false;
                    this.queryFinished();
                }
                queryFinished() {
                    if (!this.fComplete && this.roofDone && this.colorDone && this.doorDone) {
                        this.fComplete = true;
                        this.updateNav();
                        if (!this.fPrompted) {
                            CUtil_34.CUtil.trace("Prompting - Prompt1");
                            this.i3Prompt1.visible = true;
                            this.i3Prompt1.gotoAndPlay(2);
                            this.fPrompted = true;
                        }
                    }
                }
                captureLogState(obj = null) {
                    obj = super.captureLogState(obj);
                    obj['scene'] = this.name;
                    obj['this.i3Check1'] = this.i3Check1.captureLogState();
                    obj['this.i3Check2'] = this.i3Check2.captureLogState();
                    obj['this.i3Check3'] = this.i3Check3.captureLogState();
                    obj['this.i3Check4'] = this.i3Check4.captureLogState();
                    obj['this.i3Check5'] = this.i3Check5.captureLogState();
                    obj['this.i3Check6'] = this.i3Check6.captureLogState();
                    obj['i1p3imgTool'] = this.i1p3imgTool.captureLogState();
                    return obj;
                }
                captureXMLState() {
                    let sceneState = { name: this.name };
                    sceneState.appendChild(this.i3Check1.captureXMLState());
                    sceneState.appendChild(this.i3Check2.captureXMLState());
                    sceneState.appendChild(this.i3Check3.captureXMLState());
                    sceneState.appendChild(this.i3Check4.captureXMLState());
                    sceneState.appendChild(this.i3Check5.captureXMLState());
                    sceneState.appendChild(this.i3Check6.captureXMLState());
                    sceneState.appendChild(this.i1p3imgTool.captureXMLState());
                    return sceneState;
                }
                restoreXMLState(xmlState) {
                }
                compareXMLState(xmlState) {
                    let bTest = true;
                    return bTest;
                }
                preEnterScene(lTutor, sceneLabel, sceneTitle, scenePage, Direction) {
                    CUtil_34.CUtil.trace("TIntroPart3 Pre-Enter Scene Behavior: " + sceneTitle);
                    if (!this.fInitialized)
                        this.initHouse();
                    this.i3Prompt1.visible = false;
                    return super.preEnterScene(lTutor, sceneLabel, sceneTitle, scenePage, Direction);
                }
                preExitScene(Direction, sceneCurr) {
                    CUtil_34.CUtil.trace("TIntroPart3 Enter Scene Behavior:");
                    return ("OK");
                }
            };
            exports_42("TIntroPart3", TIntroPart3);
        }
    };
});
System.register("sceneExt/TIntroSplash", ["thermite/TScene", "util/CUtil"], function (exports_43, context_43) {
    "use strict";
    var __moduleName = context_43 && context_43.id;
    var TScene_9, CUtil_35, TIntroSplash;
    return {
        setters: [
            function (TScene_9_1) {
                TScene_9 = TScene_9_1;
            },
            function (CUtil_35_1) {
                CUtil_35 = CUtil_35_1;
            }
        ],
        execute: function () {
            TIntroSplash = class TIntroSplash extends TScene_9.TScene {
                constructor() {
                    super();
                    CUtil_35.CUtil.trace("TIntroSplash:Constructor");
                }
                preEnterScene(lTutor, sceneLabel, sceneTitle, scenePage, Direction) {
                    CUtil_35.CUtil.trace("TIntroSplash Pre-Enter Scene Behavior: " + sceneTitle);
                    super.preEnterScene(lTutor, sceneLabel, sceneTitle, scenePage, Direction);
                    if (Direction == "WOZBACK")
                        return Direction;
                    return sceneLabel;
                }
            };
            exports_43("TIntroSplash", TIntroSplash);
        }
    };
});
System.register("sceneExt/TPostIntroSplash", ["thermite/TScene", "util/CUtil"], function (exports_44, context_44) {
    "use strict";
    var __moduleName = context_44 && context_44.id;
    var TScene_10, CUtil_36, TPostIntroSplash;
    return {
        setters: [
            function (TScene_10_1) {
                TScene_10 = TScene_10_1;
            },
            function (CUtil_36_1) {
                CUtil_36 = CUtil_36_1;
            }
        ],
        execute: function () {
            TPostIntroSplash = class TPostIntroSplash extends TScene_10.TScene {
                constructor() {
                    super();
                    CUtil_36.CUtil.trace("TPostIntroSplash:Constructor");
                }
                preEnterScene(lTutor, sceneLabel, sceneTitle, scenePage, Direction) {
                    CUtil_36.CUtil.trace("TPostIntroSplash Pre-Enter Scene Behavior: " + sceneTitle);
                    super.preEnterScene(lTutor, sceneLabel, sceneTitle, scenePage, Direction);
                    return sceneLabel;
                }
            };
            exports_44("TPostIntroSplash", TPostIntroSplash);
        }
    };
});
System.register("sceneExt/TQ1APart1", ["sceneExt/TExpSceneTyp2", "util/CUtil", "com/events/TSelectEvent", "thermite/events/TMouseEvent", "com/events/TNavEvent"], function (exports_45, context_45) {
    "use strict";
    var __moduleName = context_45 && context_45.id;
    var TExpSceneTyp2_1, CUtil_37, TSelectEvent_6, TMouseEvent_11, TNavEvent_2, TQ1APart1;
    return {
        setters: [
            function (TExpSceneTyp2_1_1) {
                TExpSceneTyp2_1 = TExpSceneTyp2_1_1;
            },
            function (CUtil_37_1) {
                CUtil_37 = CUtil_37_1;
            },
            function (TSelectEvent_6_1) {
                TSelectEvent_6 = TSelectEvent_6_1;
            },
            function (TMouseEvent_11_1) {
                TMouseEvent_11 = TMouseEvent_11_1;
            },
            function (TNavEvent_2_1) {
                TNavEvent_2 = TNavEvent_2_1;
            }
        ],
        execute: function () {
            TQ1APart1 = class TQ1APart1 extends TExpSceneTyp2_1.TExpSceneTyp2 {
                constructor() {
                    super();
                    this.navSkipPanel = false;
                    CUtil_37.CUtil.trace("TQ1APart1:Constructor");
                    this.selOneA = "clockNoon";
                    this.selOneB = "clockThree";
                    this.selOneC = "clockSix";
                    this.selTwoA = "ageYoung";
                    this.selTwoB = "ageOlder";
                    this.selThreeA = "drinkLemon";
                    this.selThreeB = "drinkTea";
                    this.imgTool1 = "this.imgToolAq1";
                    this.imgTool2 = "this.imgToolBq1";
                    this.tabController1 = "this.tabControllerAq1";
                    this.tabController2 = "this.tabControllerBq1";
                    this.imgToolAq1.addEventListener(TSelectEvent_6.TSelectEvent.WOZIMGSELECT, this.doImageMapA);
                    this.imgToolBq1.addEventListener(TSelectEvent_6.TSelectEvent.WOZIMGSELECT, this.doImageMapB);
                    this.tabControllerAq1.addEventListener(TSelectEvent_6.TSelectEvent.WOZTABSELECT, this.doTabMapA);
                    this.tabControllerBq1.addEventListener(TSelectEvent_6.TSelectEvent.WOZTABSELECT, this.doTabMapB);
                }
                onGotoDesign(evt) {
                    CUtil_37.CUtil.trace("Design Button Click:");
                    this.q1DesignButton.removeEventListener(TMouseEvent_11.TMouseEvent.WOZCLICK, this.onGotoDesign);
                    this.fComplete = true;
                    this.dispatchEvent(new TNavEvent_2.TNavEvent(TNavEvent_2.TNavEvent.WOZNAVNEXT));
                }
                preEnterScene(Tutor, sceneLabel, sceneTitle, scenePage, Direction) {
                    CUtil_37.CUtil.trace("TQ1APart1 Pre-Enter Scene Behavior: " + sceneTitle);
                    var navScene;
                    navScene = super.preEnterScene(Tutor, sceneLabel, sceneTitle, scenePage, Direction);
                    if (this.fComplete && (Direction != "WOZGOTO"))
                        return Direction;
                    this.q1DesignButton.addEventListener(TMouseEvent_11.TMouseEvent.WOZCLICK, this.onGotoDesign);
                    return navScene;
                }
                preExitScene(Direction, sceneCurr) {
                    CUtil_37.CUtil.trace("TQ1APart1 Enter Scene Behavior:");
                    return ("OK");
                }
            };
            exports_45("TQ1APart1", TQ1APart1);
        }
    };
});
System.register("sceneExt/TQ1APart1B", ["sceneExt/TExpSceneTyp2", "com/events/TSelectEvent", "util/CUtil"], function (exports_46, context_46) {
    "use strict";
    var __moduleName = context_46 && context_46.id;
    var TExpSceneTyp2_2, TSelectEvent_7, CUtil_38, TQ1APart1B;
    return {
        setters: [
            function (TExpSceneTyp2_2_1) {
                TExpSceneTyp2_2 = TExpSceneTyp2_2_1;
            },
            function (TSelectEvent_7_1) {
                TSelectEvent_7 = TSelectEvent_7_1;
            },
            function (CUtil_38_1) {
                CUtil_38 = CUtil_38_1;
            }
        ],
        execute: function () {
            TQ1APart1B = class TQ1APart1B extends TExpSceneTyp2_2.TExpSceneTyp2 {
                constructor() {
                    super();
                    this.fCompleteA = false;
                    this.fCompleteB = false;
                    CUtil_38.CUtil.trace("TQ1APart1B:Constructor");
                    this.selOneA = "clockNoon";
                    this.selOneB = "clockThree";
                    this.selOneC = "clockSix";
                    this.selTwoA = "ageYoung";
                    this.selTwoB = "ageOlder";
                    this.selThreeA = "drinkLemon";
                    this.selThreeB = "drinkTea";
                    this.imgTool1 = "this.imgToolAq1";
                    this.imgTool2 = "this.imgToolBq1";
                    this.tabController1 = "this.tabControllerAq1";
                    this.tabController2 = "this.tabControllerBq1";
                    this.imgToolAq1.addEventListener(TSelectEvent_7.TSelectEvent.WOZIMGSELECT, this.doImageMapA);
                    this.imgToolBq1.addEventListener(TSelectEvent_7.TSelectEvent.WOZIMGSELECT, this.doImageMapB);
                    this.tabControllerAq1.addEventListener(TSelectEvent_7.TSelectEvent.WOZTABSELECT, this.doTabMapA);
                    this.tabControllerBq1.addEventListener(TSelectEvent_7.TSelectEvent.WOZTABSELECT, this.doTabMapB);
                    this.tabControllerAq1.addEventListener("Done", this.questionFinishedA);
                    this.tabControllerBq1.addEventListener("Done", this.questionFinishedB);
                }
                questionFinishedA(evt) {
                    CUtil_38.CUtil.trace("#### QuestionA finished");
                    this.fCompleteA = true;
                    if (this.fCompleteB) {
                        this.fComplete = true;
                        this.updateNav();
                    }
                }
                questionFinishedB(evt) {
                    CUtil_38.CUtil.trace("#### QuestionB finished");
                    this.fCompleteB = true;
                    if (this.fCompleteA) {
                        this.fComplete = true;
                        this.updateNav();
                    }
                }
                captureLogState(obj = null) {
                    obj = super.captureLogState(obj);
                    obj['scene'] = this.name;
                    obj['Controller1'] = this.tabControllerAq1.captureLogState();
                    obj['Controller2'] = this.tabControllerBq1.captureLogState();
                    return obj;
                }
                captureXMLState() {
                    var sceneState = { name: this.name };
                    sceneState.appendChild(this.tabControllerAq1.captureXMLState());
                    sceneState.appendChild(this.tabControllerBq1.captureXMLState());
                    return sceneState;
                }
                restoreXMLState(xmlState) {
                    this.tabControllerAq1.restoreXMLState(xmlState.controller[0]);
                    this.tabControllerBq1.restoreXMLState(xmlState.controller[1]);
                }
                compareXMLState(xmlState) {
                    var bTest = true;
                    if (!this.tabControllerAq1.compareXMLState(xmlState.controller[0]) ||
                        !this.tabControllerBq1.compareXMLState(xmlState.controller[1]))
                        bTest = false;
                    return bTest;
                }
                preExitScene(Direction, sceneCurr) {
                    CUtil_38.CUtil.trace("TQ1APart1B Enter Scene Behavior:");
                    this.assertGlobal('q1CVS', this.encodeExptString("time of day", "this.sel1", "this.sel2", "this.sel3"));
                    return ("OK");
                }
            };
            exports_46("TQ1APart1B", TQ1APart1B);
        }
    };
});
System.register("sceneExt/TQ1APart2", ["sceneExt/TExpSceneTyp2", "thermite/events/TTextEvent", "util/CUtil"], function (exports_47, context_47) {
    "use strict";
    var __moduleName = context_47 && context_47.id;
    var TExpSceneTyp2_3, TTextEvent_1, CUtil_39, TQ1APart2;
    return {
        setters: [
            function (TExpSceneTyp2_3_1) {
                TExpSceneTyp2_3 = TExpSceneTyp2_3_1;
            },
            function (TTextEvent_1_1) {
                TTextEvent_1 = TTextEvent_1_1;
            },
            function (CUtil_39_1) {
                CUtil_39 = CUtil_39_1;
            }
        ],
        execute: function () {
            TQ1APart2 = class TQ1APart2 extends TExpSceneTyp2_3.TExpSceneTyp2 {
                constructor() {
                    super();
                    this.fStateCap = false;
                    CUtil_39.CUtil.trace("TQ1APart2:Constructor");
                    this.selOneA = "clockNoon";
                    this.selOneB = "clockThree";
                    this.selOneC = "clockSix";
                    this.selTwoA = "ageYoung";
                    this.selTwoB = "ageOlder";
                    this.selThreeA = "drinkLemon";
                    this.selThreeB = "drinkTea";
                    this.imgTool1 = "this.imgToolAq1";
                    this.imgTool2 = "this.imgToolBq1";
                    this.tabController1 = "this.tabControllerAq1";
                    this.tabController2 = "this.tabControllerBq1";
                    this.imgToolAq1.enableTool(false);
                    this.imgToolBq1.enableTool(false);
                    this.tabControllerAq1.enableTool(false);
                    this.tabControllerBq1.enableTool(false);
                    this.q1TextControl1.StxtField.addEventListener(TTextEvent_1.TTextEvent.CHANGE, this.questionFinished);
                }
                questionFinished(evt) {
                    if (this.q1TextControl1.hasMinWords(2, 9))
                        this.fComplete = true;
                    else
                        this.fComplete = false;
                    this.updateNav();
                }
                preEnterScene(lTutor, sceneLabel, sceneTitle, scenePage, Direction) {
                    CUtil_39.CUtil.trace("TQ1APart2 Pre-Enter Scene Behavior: " + sceneTitle);
                    if (this.fStateCap) {
                        if (!this.tutorAutoObj["Sq1p1b" + this.sType].compareXMLState(this.expState)) {
                            CUtil_39.CUtil.trace("State Changed: clearing text");
                            this.tutorAutoObj["Sq1p1b" + this.sType].this.q1TextControl1.wozClear();
                            this.fComplete = false;
                            this.expState = this.tutorAutoObj["Sq1p1b" + this.sType].captureXMLState();
                        }
                    }
                    else {
                        this.expState = this.tutorAutoObj["Sq1p1b" + this.sType].captureXMLState();
                        this.fStateCap = true;
                    }
                    return super.preEnterScene(lTutor, sceneLabel, sceneTitle, scenePage, Direction);
                }
                onEnterScene(Direction) {
                    CUtil_39.CUtil.trace("TQ1APart2 Enter Scene Behavior:");
                    this.q1TextControl1.setFocus(true);
                }
                preExitScene(Direction, sceneCurr) {
                    CUtil_39.CUtil.trace("TQ1APart2 Enter Scene Behavior:");
                    return ("OK");
                }
            };
            exports_47("TQ1APart2", TQ1APart2);
        }
    };
});
System.register("sceneExt/TQ1BPart1", ["sceneExt/TExpSceneTyp2", "com/events/TSelectEvent", "com/events/TNavEvent", "thermite/events/TMouseEvent", "util/CUtil"], function (exports_48, context_48) {
    "use strict";
    var __moduleName = context_48 && context_48.id;
    var TExpSceneTyp2_4, TSelectEvent_8, TNavEvent_3, TMouseEvent_12, CUtil_40, TQ1BPart1;
    return {
        setters: [
            function (TExpSceneTyp2_4_1) {
                TExpSceneTyp2_4 = TExpSceneTyp2_4_1;
            },
            function (TSelectEvent_8_1) {
                TSelectEvent_8 = TSelectEvent_8_1;
            },
            function (TNavEvent_3_1) {
                TNavEvent_3 = TNavEvent_3_1;
            },
            function (TMouseEvent_12_1) {
                TMouseEvent_12 = TMouseEvent_12_1;
            },
            function (CUtil_40_1) {
                CUtil_40 = CUtil_40_1;
            }
        ],
        execute: function () {
            TQ1BPart1 = class TQ1BPart1 extends TExpSceneTyp2_4.TExpSceneTyp2 {
                constructor() {
                    super();
                    this.navSkipPanel = false;
                    CUtil_40.CUtil.trace("TQ1BPart1:Constructor");
                    this.selOneA = "temp200";
                    this.selOneB = "temp350";
                    this.selOneC = "temp500";
                    this.selTwoA = "honey";
                    this.selTwoB = "sugar";
                    this.selThreeA = "oneEgg";
                    this.selThreeB = "threeEgg";
                    this.imgTool1 = "this.imgToolAq1";
                    this.imgTool2 = "this.imgToolBq1";
                    this.tabController1 = "this.tabControllerAq1";
                    this.tabController2 = "this.tabControllerBq1";
                    this.imgToolAq1.addEventListener(TSelectEvent_8.TSelectEvent.WOZIMGSELECT, this.doImageMapA);
                    this.imgToolBq1.addEventListener(TSelectEvent_8.TSelectEvent.WOZIMGSELECT, this.doImageMapB);
                    this.tabControllerAq1.addEventListener(TSelectEvent_8.TSelectEvent.WOZTABSELECT, this.doTabMapA);
                    this.tabControllerBq1.addEventListener(TSelectEvent_8.TSelectEvent.WOZTABSELECT, this.doTabMapB);
                }
                onGotoDesign(evt) {
                    CUtil_40.CUtil.trace("Design Button Click:");
                    this.q1DesignButton.removeEventListener(TMouseEvent_12.TMouseEvent.WOZCLICK, this.onGotoDesign);
                    this.fComplete = true;
                    this.dispatchEvent(new TNavEvent_3.TNavEvent(TNavEvent_3.TNavEvent.WOZNAVNEXT));
                }
                preEnterScene(Tutor, sceneLabel, sceneTitle, scenePage, Direction) {
                    CUtil_40.CUtil.trace("TQ1APart1 Pre-Enter Scene Behavior: " + sceneTitle);
                    var navScene;
                    navScene = super.preEnterScene(Tutor, sceneLabel, sceneTitle, scenePage, Direction);
                    this.q1DesignButton.addEventListener(TMouseEvent_12.TMouseEvent.WOZCLICK, this.onGotoDesign);
                    return navScene;
                }
                preExitScene(Direction, sceneCurr) {
                    CUtil_40.CUtil.trace("TQ1BPart1 Enter Scene Behavior:");
                    return ("OK");
                }
            };
            exports_48("TQ1BPart1", TQ1BPart1);
        }
    };
});
System.register("sceneExt/TQ1BPart1B", ["sceneExt/TExpSceneTyp2", "com/events/TSelectEvent", "util/CUtil"], function (exports_49, context_49) {
    "use strict";
    var __moduleName = context_49 && context_49.id;
    var TExpSceneTyp2_5, TSelectEvent_9, CUtil_41, TQ1BPart1B;
    return {
        setters: [
            function (TExpSceneTyp2_5_1) {
                TExpSceneTyp2_5 = TExpSceneTyp2_5_1;
            },
            function (TSelectEvent_9_1) {
                TSelectEvent_9 = TSelectEvent_9_1;
            },
            function (CUtil_41_1) {
                CUtil_41 = CUtil_41_1;
            }
        ],
        execute: function () {
            TQ1BPart1B = class TQ1BPart1B extends TExpSceneTyp2_5.TExpSceneTyp2 {
                constructor() {
                    super();
                    this.fCompleteA = false;
                    this.fCompleteB = false;
                    CUtil_41.CUtil.trace("TQ1BPart1B:Constructor");
                    this.selOneA = "temp200";
                    this.selOneB = "temp350";
                    this.selOneC = "temp500";
                    this.selTwoA = "honey";
                    this.selTwoB = "sugar";
                    this.selThreeA = "oneEgg";
                    this.selThreeB = "threeEgg";
                    this.imgTool1 = "this.imgToolAq1";
                    this.imgTool2 = "this.imgToolBq1";
                    this.tabController1 = "this.tabControllerAq1";
                    this.tabController2 = "this.tabControllerBq1";
                    this.imgToolAq1.addEventListener(TSelectEvent_9.TSelectEvent.WOZIMGSELECT, this.doImageMapA);
                    this.imgToolBq1.addEventListener(TSelectEvent_9.TSelectEvent.WOZIMGSELECT, this.doImageMapB);
                    this.tabControllerAq1.addEventListener(TSelectEvent_9.TSelectEvent.WOZTABSELECT, this.doTabMapA);
                    this.tabControllerBq1.addEventListener(TSelectEvent_9.TSelectEvent.WOZTABSELECT, this.doTabMapB);
                    this.tabControllerAq1.addEventListener("Done", this.questionFinishedA);
                    this.tabControllerBq1.addEventListener("Done", this.questionFinishedB);
                }
                questionFinishedA(evt) {
                    CUtil_41.CUtil.trace("#### QuestionA finished");
                    this.fCompleteA = true;
                    if (this.fCompleteB) {
                        this.fComplete = true;
                        this.updateNav();
                    }
                }
                questionFinishedB(evt) {
                    CUtil_41.CUtil.trace("#### QuestionB finished");
                    this.fCompleteB = true;
                    if (this.fCompleteA) {
                        this.fComplete = true;
                        this.updateNav();
                    }
                }
                captureLogState(obj = null) {
                    obj = super.captureLogState(obj);
                    obj['scene'] = this.name;
                    obj['Controller1'] = this.tabControllerAq1.captureLogState();
                    obj['Controller2'] = this.tabControllerBq1.captureLogState();
                    return obj;
                }
                captureXMLState() {
                    var sceneState = {};
                    sceneState.appendChild(this.tabControllerAq1.captureXMLState());
                    sceneState.appendChild(this.tabControllerBq1.captureXMLState());
                    return sceneState;
                }
                restoreXMLState(xmlState) {
                    this.tabControllerAq1.restoreXMLState(xmlState.controller[0]);
                    this.tabControllerBq1.restoreXMLState(xmlState.controller[1]);
                }
                compareXMLState(xmlState) {
                    var bTest = true;
                    if (!this.tabControllerAq1.compareXMLState(xmlState.controller[0]) ||
                        !this.tabControllerBq1.compareXMLState(xmlState.controller[1]))
                        bTest = false;
                    return bTest;
                }
                preExitScene(Direction, sceneCurr) {
                    CUtil_41.CUtil.trace("TQ1BPart1B Enter Scene Behavior:");
                    this.assertGlobal('q1CVS', this.encodeExptString("temperature", "this.sel1", "this.sel2", "this.sel3"));
                    return ("OK");
                }
            };
            exports_49("TQ1BPart1B", TQ1BPart1B);
        }
    };
});
System.register("sceneExt/TQ1BPart2", ["sceneExt/TExpSceneTyp2", "thermite/events/TTextEvent", "util/CUtil"], function (exports_50, context_50) {
    "use strict";
    var __moduleName = context_50 && context_50.id;
    var TExpSceneTyp2_6, TTextEvent_2, CUtil_42, TQ1BPart2;
    return {
        setters: [
            function (TExpSceneTyp2_6_1) {
                TExpSceneTyp2_6 = TExpSceneTyp2_6_1;
            },
            function (TTextEvent_2_1) {
                TTextEvent_2 = TTextEvent_2_1;
            },
            function (CUtil_42_1) {
                CUtil_42 = CUtil_42_1;
            }
        ],
        execute: function () {
            TQ1BPart2 = class TQ1BPart2 extends TExpSceneTyp2_6.TExpSceneTyp2 {
                constructor() {
                    super();
                    this.fStateCap = false;
                    this.expState = {};
                    CUtil_42.CUtil.trace("TQ1BPart2:Constructor");
                    this.selOneA = "temp200";
                    this.selOneB = "temp350";
                    this.selOneC = "temp500";
                    this.selTwoA = "honey";
                    this.selTwoB = "sugar";
                    this.selThreeA = "oneEgg";
                    this.selThreeB = "threeEgg";
                    this.imgTool1 = "this.imgToolAq1";
                    this.imgTool2 = "this.imgToolBq1";
                    this.tabController1 = "this.tabControllerAq1";
                    this.tabController2 = "this.tabControllerBq1";
                    this.imgToolAq1.enableTool(false);
                    this.imgToolBq1.enableTool(false);
                    this.tabControllerAq1.enableTool(false);
                    this.tabControllerBq1.enableTool(false);
                    this.q1TextControl1.StxtField.addEventListener(TTextEvent_2.TTextEvent.CHANGE, this.questionFinished);
                }
                questionFinished(evt) {
                    if (this.q1TextControl1.hasMinWords(2, 9))
                        this.fComplete = true;
                    else
                        this.fComplete = false;
                    this.updateNav();
                }
                preEnterScene(lTutor, sceneLabel, sceneTitle, scenePage, Direction) {
                    CUtil_42.CUtil.trace("TQ1BPart2 Pre-Enter Scene Behavior: " + sceneTitle);
                    if (this.fStateCap) {
                        if (!this.tutorAutoObj["Sq1p1b" + this.sType].compareXMLState(this.expState)) {
                            CUtil_42.CUtil.trace("State Changed: clearing text");
                            this.tutorAutoObj["Sq1p1b" + this.sType].this.q1TextControl1.wozClear();
                            this.fComplete = false;
                            this.expState = this.tutorAutoObj["Sq1p1b" + this.sType].captureXMLState();
                        }
                    }
                    else {
                        this.expState = this.tutorAutoObj["Sq1p1b" + this.sType].captureXMLState();
                        this.fStateCap = true;
                    }
                    return super.preEnterScene(lTutor, sceneLabel, sceneTitle, scenePage, Direction);
                }
                onEnterScene(Direction) {
                    CUtil_42.CUtil.trace("TQ1BPart2 Enter Scene Behavior:");
                    this.q1TextControl1.setFocus(true);
                }
                preExitScene(Direction, sceneCurr) {
                    CUtil_42.CUtil.trace("TQ1BPart2 Enter Scene Behavior:");
                    return ("OK");
                }
            };
            exports_50("TQ1BPart2", TQ1BPart2);
        }
    };
});
System.register("sceneExt/TQ2APart1", ["sceneExt/TExpSceneTyp2", "thermite/events/TMouseEvent", "util/CUtil"], function (exports_51, context_51) {
    "use strict";
    var __moduleName = context_51 && context_51.id;
    var TExpSceneTyp2_7, TMouseEvent_13, CUtil_43, TQ2APart1;
    return {
        setters: [
            function (TExpSceneTyp2_7_1) {
                TExpSceneTyp2_7 = TExpSceneTyp2_7_1;
            },
            function (TMouseEvent_13_1) {
                TMouseEvent_13 = TMouseEvent_13_1;
            },
            function (CUtil_43_1) {
                CUtil_43 = CUtil_43_1;
            }
        ],
        execute: function () {
            TQ2APart1 = class TQ2APart1 extends TExpSceneTyp2_7.TExpSceneTyp2 {
                constructor() {
                    super();
                    CUtil_43.CUtil.trace("TQ2APart1:Constructor");
                    this.selOneA = "clockNoon";
                    this.selOneB = "clockThree";
                    this.selOneC = "clockSix";
                    this.selTwoA = "ageYoung";
                    this.selTwoB = "ageOlder";
                    this.selThreeA = "drinkLemon";
                    this.selThreeB = "drinkTea";
                    this.imgTool1 = "imgToolCq2";
                    this.imgTool2 = "imgToolDq2";
                    this.tabController1 = "tabControllerCq2";
                    this.tabController2 = "tabControllerDq2";
                    this.imgToolCq2.enableTool(false);
                    this.imgToolDq2.enableTool(false);
                    this.tabControllerCq2.enableTool(false);
                    this.tabControllerDq2.enableTool(false);
                    this.imgToolCq2["clockThree"].visible = true;
                    this.imgToolCq2["ageYoung"].visible = true;
                    this.imgToolCq2["drinkLemon"].visible = true;
                    this.imgToolDq2["clockThree"].visible = true;
                    this.imgToolDq2["ageYoung"].visible = true;
                    this.imgToolDq2["drinkTea"].visible = true;
                    this.tabControllerCq2.this.sel1 = "Sitem4";
                    this.tabControllerCq2.this.StopButton.SsubLabel.text = "3:00 pm";
                    this.tabControllerCq2.this.StopButton.SsubLabel.visible = true;
                    this.tabControllerCq2.this.sel2 = "Sitem1";
                    this.tabControllerCq2.this.ScenterButton.SsubLabel.text = "Younger";
                    this.tabControllerCq2.this.ScenterButton.SsubLabel.visible = true;
                    this.tabControllerCq2.this.sel3 = "Sitem1";
                    this.tabControllerCq2.this.SbottomButton.SsubLabel.text = "Lemonade";
                    this.tabControllerCq2.this.SbottomButton.SsubLabel.visible = true;
                    this.tabControllerDq2.this.sel1 = "Sitem4";
                    this.tabControllerDq2.this.StopButton.SsubLabel.text = "3:00 pm";
                    this.tabControllerDq2.this.StopButton.SsubLabel.visible = true;
                    this.tabControllerDq2.this.sel2 = "Sitem1";
                    this.tabControllerDq2.this.ScenterButton.SsubLabel.text = "Younger";
                    this.tabControllerDq2.this.ScenterButton.SsubLabel.visible = true;
                    this.tabControllerDq2.this.sel3 = "Sitem2";
                    this.tabControllerDq2.this.SbottomButton.SsubLabel.text = "Iced Tea";
                    this.tabControllerDq2.this.SbottomButton.SsubLabel.visible = true;
                    this.this.q2Check2.setLabel("Bad Way");
                    this.this.q2Check1.addEventListener(TMouseEvent_13.TMouseEvent.WOZCLICK, this.check1Clicked);
                    this.this.q2Check2.addEventListener(TMouseEvent_13.TMouseEvent.WOZCLICK, this.check2Clicked);
                }
                check1Clicked(evt) {
                    var logData = { 'action': 'check1Clicked', 'targetid': name, 'label': 'Good Way', 'state': this.q2Check1.getChecked() };
                    this.tutorDoc.log.logActionEvent(logData);
                    this.questionFinished(evt);
                }
                check2Clicked(evt) {
                    var logData = { 'action': 'check2Clicked', 'targetid': name, 'label': 'Bad Way', 'state': this.q2Check2.getChecked() };
                    this.tutorDoc.log.logActionEvent(logData);
                    this.questionFinished(evt);
                }
                questionFinished(evt) {
                    if (this.q2Check1.getChecked() || this.q2Check2.getChecked())
                        this.fComplete = true;
                    else
                        this.fComplete = false;
                    this.updateNav();
                }
                captureLogState(obj = null) {
                    obj = super.captureLogState(obj);
                    obj['scene'] = this.name;
                    obj['Check1'] = this.q2Check1.captureLogState();
                    obj['Check2'] = this.q2Check2.captureLogState();
                    return obj;
                }
                captureXMLState() {
                    var sceneState = {};
                    sceneState.appendChild(this.q2Check1.captureXMLState());
                    sceneState.appendChild(this.q2Check2.captureXMLState());
                    return sceneState;
                }
                restoreXMLState(xmlState) {
                    this.this.q2Check1.restoreXMLState(xmlState.button[0]);
                    this.this.q2Check2.restoreXMLState(xmlState.button[1]);
                }
                compareXMLState(xmlState) {
                    var bTest = true;
                    if (!this.q2Check1.compareXMLState(xmlState.button[0]) ||
                        !this.q2Check2.compareXMLState(xmlState.button[1]))
                        bTest = false;
                    return bTest;
                }
                preExitScene(Direction, sceneCurr) {
                    CUtil_43.CUtil.trace("TQ2APart1 Enter Scene Behavior:");
                    this.assertGlobal('q2Good', this.q2Check1.captureLOGString);
                    this.assertGlobal('q2Bad', this.q2Check2.captureLOGString);
                    return ("OK");
                }
            };
            exports_51("TQ2APart1", TQ2APart1);
        }
    };
});
System.register("sceneExt/TQ2APart2", ["sceneExt/TExpSceneTyp2", "thermite/events/TTextEvent", "util/CUtil"], function (exports_52, context_52) {
    "use strict";
    var __moduleName = context_52 && context_52.id;
    var TExpSceneTyp2_8, TTextEvent_3, CUtil_44, TQ2APart2;
    return {
        setters: [
            function (TExpSceneTyp2_8_1) {
                TExpSceneTyp2_8 = TExpSceneTyp2_8_1;
            },
            function (TTextEvent_3_1) {
                TTextEvent_3 = TTextEvent_3_1;
            },
            function (CUtil_44_1) {
                CUtil_44 = CUtil_44_1;
            }
        ],
        execute: function () {
            TQ2APart2 = class TQ2APart2 extends TExpSceneTyp2_8.TExpSceneTyp2 {
                constructor() {
                    super();
                    this.fStateCap = false;
                    CUtil_44.CUtil.trace("TQ2APart2:Constructor");
                    this.selOneA = "clockNoon";
                    this.selOneB = "clockThree";
                    this.selOneC = "clockSix";
                    this.selTwoA = "ageYoung";
                    this.selTwoB = "ageOlder";
                    this.selThreeA = "drinkLemon";
                    this.selThreeB = "drinkTea";
                    this.imgTool1 = "imgToolCq2";
                    this.imgTool2 = "imgToolDq2";
                    this.tabController1 = "tabControllerCq2";
                    this.tabController2 = "tabControllerDq2";
                    this.imgToolCq2.enableTool(false);
                    this.imgToolDq2.enableTool(false);
                    this.tabControllerCq2.enableTool(false);
                    this.tabControllerDq2.enableTool(false);
                    this.this.q2Check1.enableButton(false);
                    this.this.q2Check2.enableButton(false);
                    this.this.q2Check2.setLabel("Bad Way");
                    this.q2TextControl1.StxtField.addEventListener(TTextEvent_3.TTextEvent.CHANGE, this.questionFinished);
                }
                checkChange(evt) {
                    this.q2TextControl1.wozClear();
                    this.updateQText(this);
                    this.fComplete = false;
                    this.updateNav();
                }
                questionFinished(evt) {
                    if ((this.q2Check1.getChecked() || this.q2Check2.getChecked()) && this.q2TextControl1.hasMinWords(2, 9))
                        this.fComplete = true;
                    else
                        this.fComplete = false;
                    this.updateNav();
                }
                updateQText(wozScene) {
                    if (wozScene["this.q2Check1"].getChecked()) {
                        if (wozScene["this.q2Check2"].getChecked()) {
                            this.q2Title4.Slabel.text = "You said the pictures above show a good and bad way to find out";
                            this.q2Title7.Slabel.text = "Briefly explain why you think this is a good and bad way.";
                        }
                        else {
                            this.q2Title4.Slabel.text = "You said the pictures above show a good way to find out";
                            this.q2Title7.Slabel.text = "Briefly explain why you think this is a good way.";
                        }
                    }
                    else if (wozScene["this.q2Check2"].getChecked()) {
                        this.q2Title4.Slabel.text = "You said the pictures above show a bad way to find out";
                        this.q2Title7.Slabel.text = "Briefly explain why you think this is a bad way.";
                    }
                }
                preEnterScene(lTutor, sceneLabel, sceneTitle, scenePage, Direction) {
                    CUtil_44.CUtil.trace("TQ2APart2 Pre-Enter Scene Behavior: " + sceneTitle);
                    if (this.fStateCap) {
                        if (!this.tutorAutoObj["Sq2p1" + this.sType].compareXMLState(this.sceneState)) {
                            CUtil_44.CUtil.trace("State Changed: clearing text");
                            this.tutorAutoObj["Sq2p1" + this.sType].q2TextControl1.wozClear();
                            this.tutorAutoObj["Sq2p2" + this.sType].q2TextControl1.wozClear();
                            this.fComplete = false;
                            try {
                                this.tutorAutoObj["Sq2p3" + this.sType].this.fStateCapC = false;
                                this.tutorAutoObj["Sq2p3" + this.sType].this.fStateCapD = false;
                            }
                            catch (err) {
                            }
                            this.sceneState = this.tutorAutoObj["Sq2p1" + this.sType].captureXMLState();
                        }
                    }
                    else {
                        this.sceneState = this.tutorAutoObj["Sq2p1" + this.sType].captureXMLState();
                        this.fStateCap = true;
                    }
                    this.updateQText(this.tutorAutoObj["Sq2p1" + this.sType]);
                    return super.preEnterScene(lTutor, sceneLabel, sceneTitle, scenePage, Direction);
                }
                onEnterScene(Direction) {
                    CUtil_44.CUtil.trace("TQ2APart2 Enter Scene Behavior:");
                    this.q2TextControl1.setFocus(true);
                }
                preExitScene(Direction, sceneCurr) {
                    CUtil_44.CUtil.trace("TQ2APart2 Enter Scene Behavior:");
                    return ("OK");
                }
            };
            exports_52("TQ2APart2", TQ2APart2);
        }
    };
});
System.register("sceneExt/TQ2APart3", ["sceneExt/TExpSceneTyp2", "util/CUtil", "com/events/TSelectEvent"], function (exports_53, context_53) {
    "use strict";
    var __moduleName = context_53 && context_53.id;
    var TExpSceneTyp2_9, CUtil_45, TSelectEvent_10, TQ2APart3;
    return {
        setters: [
            function (TExpSceneTyp2_9_1) {
                TExpSceneTyp2_9 = TExpSceneTyp2_9_1;
            },
            function (CUtil_45_1) {
                CUtil_45 = CUtil_45_1;
            },
            function (TSelectEvent_10_1) {
                TSelectEvent_10 = TSelectEvent_10_1;
            }
        ],
        execute: function () {
            TQ2APart3 = class TQ2APart3 extends TExpSceneTyp2_9.TExpSceneTyp2 {
                constructor() {
                    super();
                    this.fStateCapC = false;
                    this.fStateCapD = false;
                    CUtil_45.CUtil.trace("TQ2APart3:Constructor");
                    this.selOneA = "clockNoon";
                    this.selOneB = "clockThree";
                    this.selOneC = "clockSix";
                    this.selTwoA = "ageYoung";
                    this.selTwoB = "ageOlder";
                    this.selThreeA = "drinkLemon";
                    this.selThreeB = "drinkTea";
                    this.imgTool1 = "imgToolCq2";
                    this.imgTool2 = "imgToolDq2";
                    this.tabController1 = "tabControllerCq2";
                    this.tabController2 = "tabControllerDq2";
                    this.imgToolCq2.tweenID = 2;
                    this.imgToolDq2.tweenID = 2;
                    this.tabControllerCq2.tweenID = 2;
                    this.tabControllerDq2.tweenID = 2;
                    this.tabControllerCq2.this.useChanged = true;
                    this.tabControllerDq2.this.useChanged = true;
                    this.imgToolCq2.addEventListener(TSelectEvent_10.TSelectEvent.WOZIMGSELECT, this.doImageMapA);
                    this.imgToolDq2.addEventListener(TSelectEvent_10.TSelectEvent.WOZIMGSELECT, this.doImageMapB);
                    this.tabControllerCq2.addEventListener(TSelectEvent_10.TSelectEvent.WOZTABSELECT, this.doTabMapA);
                    this.tabControllerDq2.addEventListener(TSelectEvent_10.TSelectEvent.WOZTABSELECT, this.doTabMapB);
                    this.tabControllerCq2.addEventListener("Done", this.questionFinished);
                    this.tabControllerDq2.addEventListener("Done", this.questionFinished);
                }
                questionFinished(evt) {
                }
                updateNavigation(fFinished) {
                    this.fComplete = fFinished;
                    this.updateNav();
                }
                setLabels() {
                    var fChanged = false;
                    if (!this.tabControllerCq2.compareXMLState(this.expStateC)) {
                        this.q2FrameC.Slabel.text = "C - Changed";
                        fChanged = true;
                    }
                    else
                        this.q2FrameC.Slabel.text = "C";
                    if (!this.tabControllerDq2.compareXMLState(this.expStateD)) {
                        this.q2FrameD.Slabel.text = "D - Changed";
                        fChanged = true;
                    }
                    else
                        this.q2FrameD.Slabel.text = "D";
                    this.updateNavigation(fChanged);
                }
                doTabMapA(evt) {
                    CUtil_45.CUtil.trace(" this.doTabMap: " + evt.selection);
                    this.setLabels();
                    super.doTabMapA(evt);
                }
                doTabMapB(evt) {
                    CUtil_45.CUtil.trace(" this.doTabMap: " + evt.selection);
                    this.setLabels();
                    super.doTabMapB(evt);
                }
                preEnterScene(lTutor, sceneLabel, sceneTitle, scenePage, Direction) {
                    CUtil_45.CUtil.trace("TQ2APart3 Pre-Enter Scene Behavior: " + sceneTitle);
                    if (Direction != "WOZGOTO") {
                        if (!this.tutorAutoObj["Sq2p2" + this.sType].q2Check2.getChecked()) {
                            super.preEnterScene(lTutor, sceneLabel, sceneTitle, scenePage, Direction);
                            return Direction;
                        }
                    }
                    if (!this.fStateCapC) {
                        this.expStateC = this.tutorAutoObj["Sq2p2" + this.sType].tabControllerCq2.captureXMLState();
                        this.imgStateC = this.tutorAutoObj["Sq2p2" + this.sType].imgToolCq2.captureXMLState();
                        this.tabControllerCq2.restoreXMLState(this.expStateC);
                        this.imgToolCq2.restoreXMLState(this.imgStateC);
                        this.fStateCapC = true;
                    }
                    if (!this.fStateCapD) {
                        this.expStateD = this.tutorAutoObj["Sq2p2" + this.sType].tabControllerDq2.captureXMLState();
                        this.imgStateD = this.tutorAutoObj["Sq2p2" + this.sType].imgToolDq2.captureXMLState();
                        this.tabControllerDq2.restoreXMLState(this.expStateD);
                        this.imgToolDq2.restoreXMLState(this.imgStateD);
                        this.fStateCapD = true;
                    }
                    this.setLabels();
                    this.updateNavigation(this.fComplete);
                    return super.preEnterScene(lTutor, sceneLabel, sceneTitle, scenePage, Direction);
                }
                preExitScene(Direction, sceneCurr) {
                    CUtil_45.CUtil.trace("TQ2APart3 Enter Scene Behavior:");
                    this.assertGlobal('q2CVS', this.encodeExptString("age of seller", "this.sel2", "this.sel1", "this.sel3"));
                    return ("OK");
                }
            };
            exports_53("TQ2APart3", TQ2APart3);
        }
    };
});
System.register("sceneExt/TQ2BPart1", ["sceneExt/TExpSceneTyp2", "util/CUtil", "thermite/events/TMouseEvent"], function (exports_54, context_54) {
    "use strict";
    var __moduleName = context_54 && context_54.id;
    var TExpSceneTyp2_10, CUtil_46, TMouseEvent_14, TQ2BPart1;
    return {
        setters: [
            function (TExpSceneTyp2_10_1) {
                TExpSceneTyp2_10 = TExpSceneTyp2_10_1;
            },
            function (CUtil_46_1) {
                CUtil_46 = CUtil_46_1;
            },
            function (TMouseEvent_14_1) {
                TMouseEvent_14 = TMouseEvent_14_1;
            }
        ],
        execute: function () {
            TQ2BPart1 = class TQ2BPart1 extends TExpSceneTyp2_10.TExpSceneTyp2 {
                constructor() {
                    super();
                    CUtil_46.CUtil.trace("TQ2BPart1:Constructor");
                    this.selOneA = "temp200";
                    this.selOneB = "temp350";
                    this.selOneC = "temp500";
                    this.selTwoA = "honey";
                    this.selTwoB = "sugar";
                    this.selThreeA = "oneEgg";
                    this.selThreeB = "threeEgg";
                    this.imgTool1 = "imgToolCq2";
                    this.imgTool2 = "imgToolDq2";
                    this.tabController1 = "tabControllerCq2";
                    this.tabController2 = "tabControllerDq2";
                    this.imgToolCq2.enableTool(false);
                    this.imgToolDq2.enableTool(false);
                    this.tabControllerCq2.enableTool(false);
                    this.tabControllerDq2.enableTool(false);
                    this.imgToolCq2["temp350"].visible = true;
                    this.imgToolCq2["sugar"].visible = true;
                    this.imgToolCq2["threeEgg"].visible = true;
                    this.imgToolDq2["temp350"].visible = true;
                    this.imgToolDq2["honey"].visible = true;
                    this.imgToolDq2["threeEgg"].visible = true;
                    this.tabControllerCq2.this.sel1 = "Sitem4";
                    this.tabControllerCq2.this.StopButton.SsubLabel.text = "350 Degrees";
                    this.tabControllerCq2.this.StopButton.SsubLabel.visible = true;
                    this.tabControllerCq2.this.sel2 = "Sitem2";
                    this.tabControllerCq2.this.ScenterButton.SsubLabel.text = "Sugar";
                    this.tabControllerCq2.this.ScenterButton.SsubLabel.visible = true;
                    this.tabControllerCq2.this.sel3 = "Sitem2";
                    this.tabControllerCq2.this.SbottomButton.SsubLabel.text = "Three";
                    this.tabControllerCq2.this.SbottomButton.SsubLabel.visible = true;
                    this.tabControllerDq2.this.sel1 = "Sitem4";
                    this.tabControllerDq2.this.StopButton.SsubLabel.text = "350 Degrees";
                    this.tabControllerDq2.this.StopButton.SsubLabel.visible = true;
                    this.tabControllerDq2.this.sel2 = "Sitem1";
                    this.tabControllerDq2.this.ScenterButton.SsubLabel.text = "Honey";
                    this.tabControllerDq2.this.ScenterButton.SsubLabel.visible = true;
                    this.tabControllerDq2.this.sel3 = "Sitem2";
                    this.tabControllerDq2.this.SbottomButton.SsubLabel.text = "Three";
                    this.tabControllerDq2.this.SbottomButton.SsubLabel.visible = true;
                    this.this.q2Check2.setLabel("Bad Way");
                    this.this.q2Check1.addEventListener(TMouseEvent_14.TMouseEvent.WOZCLICK, this.check1Clicked);
                    this.this.q2Check2.addEventListener(TMouseEvent_14.TMouseEvent.WOZCLICK, this.check2Clicked);
                }
                check1Clicked(evt) {
                    var logData = { 'action': 'check1Clicked', 'targetid': name, 'label': 'Good Way', 'state': this.q2Check1.getChecked() };
                    this.tutorDoc.log.logActionEvent(logData);
                    this.questionFinished(evt);
                }
                check2Clicked(evt) {
                    var logData = { 'action': 'check2Clicked', 'targetid': name, 'label': 'Bad Way', 'state': this.q2Check2.getChecked() };
                    this.tutorDoc.log.logActionEvent(logData);
                    this.questionFinished(evt);
                }
                questionFinished(evt) {
                    if (this.q2Check1.getChecked() || this.q2Check2.getChecked())
                        this.fComplete = true;
                    else
                        this.fComplete = false;
                    this.updateNav();
                }
                captureLogState(obj = null) {
                    obj = super.captureLogState(obj);
                    obj['scene'] = this.name;
                    obj['Check1'] = this.q2Check1.captureLogState();
                    obj['Check2'] = this.q2Check2.captureLogState();
                    return obj;
                }
                captureXMLState() {
                    var sceneState = {};
                    sceneState.appendChild(this.q2Check1.captureXMLState());
                    sceneState.appendChild(this.q2Check2.captureXMLState());
                    return sceneState;
                }
                restoreXMLState(xmlState) {
                    this.this.q2Check1.restoreXMLState(xmlState.button[0]);
                    this.this.q2Check2.restoreXMLState(xmlState.button[1]);
                }
                compareXMLState(xmlState) {
                    var bTest = true;
                    if (!this.q2Check1.compareXMLState(xmlState.button[0]) ||
                        !this.q2Check2.compareXMLState(xmlState.button[1]))
                        bTest = false;
                    return bTest;
                }
                preExitScene(Direction, sceneCurr) {
                    CUtil_46.CUtil.trace("TQ2BPart1 Enter Scene Behavior:");
                    this.assertGlobal('q2Good', this.q2Check1.captureLOGString);
                    this.assertGlobal('q2Bad', this.q2Check2.captureLOGString);
                    return ("OK");
                }
            };
            exports_54("TQ2BPart1", TQ2BPart1);
        }
    };
});
System.register("sceneExt/TQ2BPart2", ["sceneExt/TExpSceneTyp2", "thermite/events/TTextEvent", "util/CUtil"], function (exports_55, context_55) {
    "use strict";
    var __moduleName = context_55 && context_55.id;
    var TExpSceneTyp2_11, TTextEvent_4, CUtil_47, TQ2BPart2;
    return {
        setters: [
            function (TExpSceneTyp2_11_1) {
                TExpSceneTyp2_11 = TExpSceneTyp2_11_1;
            },
            function (TTextEvent_4_1) {
                TTextEvent_4 = TTextEvent_4_1;
            },
            function (CUtil_47_1) {
                CUtil_47 = CUtil_47_1;
            }
        ],
        execute: function () {
            TQ2BPart2 = class TQ2BPart2 extends TExpSceneTyp2_11.TExpSceneTyp2 {
                constructor() {
                    super();
                    this.fStateCap = false;
                    CUtil_47.CUtil.trace("TQ2BPart2:Constructor");
                    this.selOneA = "temp200";
                    this.selOneB = "temp350";
                    this.selOneC = "temp500";
                    this.selTwoA = "honey";
                    this.selTwoB = "sugar";
                    this.selThreeA = "oneEgg";
                    this.selThreeB = "threeEgg";
                    this.imgTool1 = "imgToolCq2";
                    this.imgTool2 = "imgToolDq2";
                    this.tabController1 = "tabControllerCq2";
                    this.tabController2 = "tabControllerDq2";
                    this.imgToolCq2.enableTool(false);
                    this.tabControllerCq2.enableTool(false);
                    this.imgToolDq2.enableTool(false);
                    this.tabControllerDq2.enableTool(false);
                    this.this.q2Check1.enableButton(false);
                    this.this.q2Check2.enableButton(false);
                    this.this.q2Check2.setLabel("Bad Way");
                    this.q2TextControl1.StxtField.addEventListener(TTextEvent_4.TTextEvent.CHANGE, this.questionFinished);
                }
                checkChange(evt) {
                    this.q2TextControl1.wozClear();
                    this.updateQText(this);
                    this.fComplete = false;
                    this.updateNav();
                }
                questionFinished(evt) {
                    if ((this.q2Check1.getChecked() || this.q2Check2.getChecked()) && this.q2TextControl1.hasMinWords(2, 9))
                        this.fComplete = true;
                    else
                        this.fComplete = false;
                    this.updateNav();
                }
                updateQText(wozScene) {
                    if (wozScene["this.q2Check1"].getChecked()) {
                        if (wozScene["this.q2Check2"].getChecked()) {
                            this.q2Title4.Slabel.text = "You said the pictures above show a good and bad way to find out";
                            this.q2Title7.Slabel.text = "Briefly explain why you think this is a good and bad way.";
                        }
                        else {
                            this.q2Title4.Slabel.text = "You said the pictures above show a good way to find out";
                            this.q2Title7.Slabel.text = "Briefly explain why you think this is a good way.";
                        }
                    }
                    else if (wozScene["this.q2Check2"].getChecked()) {
                        this.q2Title4.Slabel.text = "You said the pictures above show a bad way to find out";
                        this.q2Title7.Slabel.text = "Briefly explain why you think this is a bad way.";
                    }
                }
                preEnterScene(lTutor, sceneLabel, sceneTitle, scenePage, Direction) {
                    CUtil_47.CUtil.trace("TQ2BPart2 Pre-Enter Scene Behavior: " + sceneTitle);
                    if (this.fStateCap) {
                        if (!this.tutorAutoObj["Sq2p1" + this.sType].compareXMLState(this.sceneState)) {
                            CUtil_47.CUtil.trace("State Changed: clearing text");
                            this.tutorAutoObj["Sq2p1" + this.sType].q2TextControl1.wozClear();
                            this.tutorAutoObj["Sq2p2" + this.sType].q2TextControl1.wozClear();
                            this.fComplete = false;
                            try {
                                this.tutorAutoObj["Sq2p3" + this.sType].this.fStateCapC = false;
                                this.tutorAutoObj["Sq2p3" + this.sType].this.fStateCapD = false;
                            }
                            catch (err) {
                            }
                            this.sceneState = this.tutorAutoObj["Sq2p1" + this.sType].captureXMLState();
                        }
                    }
                    else {
                        this.sceneState = this.tutorAutoObj["Sq2p1" + this.sType].captureXMLState();
                        this.fStateCap = true;
                    }
                    this.updateQText(this.tutorAutoObj["Sq2p1" + this.sType]);
                    return super.preEnterScene(lTutor, sceneLabel, sceneTitle, scenePage, Direction);
                }
                onEnterScene(Direction) {
                    CUtil_47.CUtil.trace("TQ2BPart2 Enter Scene Behavior:");
                    this.q2TextControl1.setFocus(true);
                }
                preExitScene(Direction, sceneCurr) {
                    CUtil_47.CUtil.trace("TQ2BPart2 Enter Scene Behavior:");
                    return ("OK");
                }
            };
            exports_55("TQ2BPart2", TQ2BPart2);
        }
    };
});
System.register("sceneExt/TQ2BPart3", ["sceneExt/TExpSceneTyp2", "util/CUtil", "com/events/TSelectEvent"], function (exports_56, context_56) {
    "use strict";
    var __moduleName = context_56 && context_56.id;
    var TExpSceneTyp2_12, CUtil_48, TSelectEvent_11, TQ2BPart3;
    return {
        setters: [
            function (TExpSceneTyp2_12_1) {
                TExpSceneTyp2_12 = TExpSceneTyp2_12_1;
            },
            function (CUtil_48_1) {
                CUtil_48 = CUtil_48_1;
            },
            function (TSelectEvent_11_1) {
                TSelectEvent_11 = TSelectEvent_11_1;
            }
        ],
        execute: function () {
            TQ2BPart3 = class TQ2BPart3 extends TExpSceneTyp2_12.TExpSceneTyp2 {
                constructor() {
                    super();
                    this.fStateCapC = false;
                    this.fStateCapD = false;
                    CUtil_48.CUtil.trace("TQ2BPart3:Constructor");
                    this.selOneA = "temp200";
                    this.selOneB = "temp350";
                    this.selOneC = "temp500";
                    this.selTwoA = "honey";
                    this.selTwoB = "sugar";
                    this.selThreeA = "oneEgg";
                    this.selThreeB = "threeEgg";
                    this.imgTool1 = "imgToolCq2";
                    this.imgTool2 = "imgToolDq2";
                    this.tabController1 = "tabControllerCq2";
                    this.tabController2 = "tabControllerDq2";
                    this.imgToolCq2.tweenID = 2;
                    this.imgToolDq2.tweenID = 2;
                    this.tabControllerCq2.tweenID = 2;
                    this.tabControllerDq2.tweenID = 2;
                    this.tabControllerCq2.this.useChanged = true;
                    this.tabControllerDq2.this.useChanged = true;
                    this.imgToolCq2.addEventListener(TSelectEvent_11.TSelectEvent.WOZIMGSELECT, this.doImageMapA);
                    this.imgToolDq2.addEventListener(TSelectEvent_11.TSelectEvent.WOZIMGSELECT, this.doImageMapB);
                    this.tabControllerCq2.addEventListener(TSelectEvent_11.TSelectEvent.WOZTABSELECT, this.doTabMapA);
                    this.tabControllerDq2.addEventListener(TSelectEvent_11.TSelectEvent.WOZTABSELECT, this.doTabMapB);
                    this.tabControllerCq2.addEventListener("Done", this.questionFinished);
                    this.tabControllerDq2.addEventListener("Done", this.questionFinished);
                }
                questionFinished(evt) {
                }
                setLabels() {
                    var fChanged = false;
                    if (!this.tabControllerCq2.compareXMLState(this.expStateC)) {
                        this.q2FrameC.Slabel.text = "C - Changed";
                        fChanged = true;
                    }
                    else
                        this.q2FrameC.Slabel.text = "C";
                    if (!this.tabControllerDq2.compareXMLState(this.expStateD)) {
                        this.q2FrameD.Slabel.text = "D - Changed";
                        fChanged = true;
                    }
                    else
                        this.q2FrameD.Slabel.text = "D";
                    this.fComplete = fChanged;
                    this.updateNav();
                }
                doTabMapA(evt) {
                    CUtil_48.CUtil.trace(" this.doTabMap: " + evt.selection);
                    this.setLabels();
                    super.doTabMapA(evt);
                }
                doTabMapB(evt) {
                    CUtil_48.CUtil.trace(" this.doTabMap: " + evt.selection);
                    this.setLabels();
                    super.doTabMapB(evt);
                }
                preEnterScene(lTutor, sceneLabel, sceneTitle, scenePage, Direction) {
                    CUtil_48.CUtil.trace("TQ2BPart3 Pre-Enter Scene Behavior: " + sceneTitle);
                    if (!this.tutorAutoObj["Sq2p2" + this.sType].q2Check2.getChecked()) {
                        super.preEnterScene(lTutor, sceneLabel, sceneTitle, scenePage, Direction);
                        return Direction;
                    }
                    if (!this.fStateCapC) {
                        this.expStateC = this.tutorAutoObj["Sq2p2" + this.sType].tabControllerCq2.captureXMLState();
                        this.imgStateC = this.tutorAutoObj["Sq2p2" + this.sType].imgToolCq2.captureXMLState();
                        this.tabControllerCq2.restoreXMLState(this.expStateC);
                        this.imgToolCq2.restoreXMLState(this.imgStateC);
                        this.fStateCapC = true;
                    }
                    if (!this.fStateCapD) {
                        this.expStateD = this.tutorAutoObj["Sq2p2" + this.sType].tabControllerDq2.captureXMLState();
                        this.imgStateD = this.tutorAutoObj["Sq2p2" + this.sType].imgToolDq2.captureXMLState();
                        this.tabControllerDq2.restoreXMLState(this.expStateD);
                        this.imgToolDq2.restoreXMLState(this.imgStateD);
                        this.fStateCapD = true;
                    }
                    this.setLabels();
                    this.updateNav();
                    return super.preEnterScene(lTutor, sceneLabel, sceneTitle, scenePage, Direction);
                }
                preExitScene(Direction, sceneCurr) {
                    CUtil_48.CUtil.trace("TQ2BPart3 Enter Scene Behavior:");
                    this.assertGlobal('q2CVS', this.encodeExptString("number of eggs", "this.sel3", "this.sel1", "this.sel2"));
                    return ("OK");
                }
            };
            exports_56("TQ2BPart3", TQ2BPart3);
        }
    };
});
System.register("sceneExt/TQ3APart1", ["sceneExt/TExpSceneTyp1", "util/CUtil", "com/events/TSelectEvent", "thermite/events/TMouseEvent", "com/events/TNavEvent"], function (exports_57, context_57) {
    "use strict";
    var __moduleName = context_57 && context_57.id;
    var TExpSceneTyp1_1, CUtil_49, TSelectEvent_12, TMouseEvent_15, TNavEvent_4, TQ3APart1;
    return {
        setters: [
            function (TExpSceneTyp1_1_1) {
                TExpSceneTyp1_1 = TExpSceneTyp1_1_1;
            },
            function (CUtil_49_1) {
                CUtil_49 = CUtil_49_1;
            },
            function (TSelectEvent_12_1) {
                TSelectEvent_12 = TSelectEvent_12_1;
            },
            function (TMouseEvent_15_1) {
                TMouseEvent_15 = TMouseEvent_15_1;
            },
            function (TNavEvent_4_1) {
                TNavEvent_4 = TNavEvent_4_1;
            }
        ],
        execute: function () {
            TQ3APart1 = class TQ3APart1 extends TExpSceneTyp1_1.TExpSceneTyp1 {
                constructor() {
                    super();
                    this.navSkipPanel = false;
                    CUtil_49.CUtil.trace("TQ3APart1:Constructor");
                    this.selOneA = "curvedBody";
                    this.selOneB = "straightBody";
                    this.selTwoA = "oneWindow";
                    this.selTwoB = "fourWindow";
                    this.selThreeA = "downEngines";
                    this.selThreeB = "tiltEngines";
                    this.imgTool1 = "imgToolAq3";
                    this.imgTool2 = "imgToolBq3";
                    this.tabController1 = "tabControllerAq3";
                    this.tabController2 = "tabControllerBq3";
                    this.imgToolAq3.addEventListener(TSelectEvent_12.TSelectEvent.WOZIMGSELECT, this.doImageMapA);
                    this.imgToolBq3.addEventListener(TSelectEvent_12.TSelectEvent.WOZIMGSELECT, this.doImageMapB);
                    this.tabControllerAq3.addEventListener(TSelectEvent_12.TSelectEvent.WOZTABSELECT, this.doTabMapA);
                    this.tabControllerBq3.addEventListener(TSelectEvent_12.TSelectEvent.WOZTABSELECT, this.doTabMapB);
                }
                onGotoDesign(evt) {
                    CUtil_49.CUtil.trace("Design Button Click:");
                    this.q3DesignButton.removeEventListener(TMouseEvent_15.TMouseEvent.WOZCLICK, this.onGotoDesign);
                    this.fComplete = true;
                    this.dispatchEvent(new TNavEvent_4.TNavEvent(TNavEvent_4.TNavEvent.WOZNAVNEXT));
                }
                preEnterScene(Tutor, sceneLabel, sceneTitle, scenePage, Direction) {
                    CUtil_49.CUtil.trace("TQ1APart1 Pre-Enter Scene Behavior: " + sceneTitle);
                    var navScene;
                    navScene = super.preEnterScene(Tutor, sceneLabel, sceneTitle, scenePage, Direction);
                    if (this.fComplete && (Direction != "WOZGOTO"))
                        return Direction;
                    this.q3DesignButton.addEventListener(TMouseEvent_15.TMouseEvent.WOZCLICK, this.onGotoDesign);
                    return navScene;
                }
                preExitScene(Direction, sceneCurr) {
                    CUtil_49.CUtil.trace("TQ3APart1 Enter Scene Behavior:");
                    return ("OK");
                }
            };
            exports_57("TQ3APart1", TQ3APart1);
        }
    };
});
System.register("sceneExt/TQ3APart1B", ["sceneExt/TExpSceneTyp1", "util/CUtil", "com/events/TSelectEvent"], function (exports_58, context_58) {
    "use strict";
    var __moduleName = context_58 && context_58.id;
    var TExpSceneTyp1_2, CUtil_50, TSelectEvent_13, TQ3APart1B;
    return {
        setters: [
            function (TExpSceneTyp1_2_1) {
                TExpSceneTyp1_2 = TExpSceneTyp1_2_1;
            },
            function (CUtil_50_1) {
                CUtil_50 = CUtil_50_1;
            },
            function (TSelectEvent_13_1) {
                TSelectEvent_13 = TSelectEvent_13_1;
            }
        ],
        execute: function () {
            TQ3APart1B = class TQ3APart1B extends TExpSceneTyp1_2.TExpSceneTyp1 {
                constructor() {
                    super();
                    this.fCompleteA = false;
                    this.fCompleteB = false;
                    CUtil_50.CUtil.trace("TQ3APart1B:Constructor");
                    this.selOneA = "curvedBody";
                    this.selOneB = "straightBody";
                    this.selTwoA = "oneWindow";
                    this.selTwoB = "fourWindow";
                    this.selThreeA = "downEngines";
                    this.selThreeB = "tiltEngines";
                    this.imgTool1 = "imgToolAq3";
                    this.imgTool2 = "imgToolBq3";
                    this.tabController1 = "tabControllerAq3";
                    this.tabController2 = "tabControllerBq3";
                    this.imgToolAq3.addEventListener(TSelectEvent_13.TSelectEvent.WOZIMGSELECT, this.doImageMapA);
                    this.imgToolBq3.addEventListener(TSelectEvent_13.TSelectEvent.WOZIMGSELECT, this.doImageMapB);
                    this.tabControllerAq3.addEventListener(TSelectEvent_13.TSelectEvent.WOZTABSELECT, this.doTabMapA);
                    this.tabControllerBq3.addEventListener(TSelectEvent_13.TSelectEvent.WOZTABSELECT, this.doTabMapB);
                    this.tabControllerAq3.addEventListener("Done", this.questionFinishedA);
                    this.tabControllerBq3.addEventListener("Done", this.questionFinishedB);
                }
                questionFinishedA(evt) {
                    CUtil_50.CUtil.trace("#### QuestionA finished");
                    this.fCompleteA = true;
                    if (this.fCompleteB) {
                        this.fComplete = true;
                        this.updateNav();
                    }
                }
                questionFinishedB(evt) {
                    CUtil_50.CUtil.trace("#### QuestionB finished");
                    this.fCompleteB = true;
                    if (this.fCompleteA) {
                        this.fComplete = true;
                        this.updateNav();
                    }
                }
                captureLogState(obj = null) {
                    obj = super.captureLogState(obj);
                    obj['scene'] = this.name;
                    obj['Controller1'] = this.tabControllerAq3.captureLogState();
                    obj['Controller2'] = this.tabControllerBq3.captureLogState();
                    return obj;
                }
                captureXMLState() {
                    var sceneState = {};
                    sceneState.appendChild(this.tabControllerAq3.captureXMLState());
                    sceneState.appendChild(this.tabControllerBq3.captureXMLState());
                    return sceneState;
                }
                restoreXMLState(xmlState) {
                    this.tabControllerAq3.restoreXMLState(xmlState.controller[0]);
                    this.tabControllerBq3.restoreXMLState(xmlState.controller[1]);
                }
                compareXMLState(xmlState) {
                    var bTest = true;
                    if (!this.tabControllerAq3.compareXMLState(xmlState.controller[0]) ||
                        !this.tabControllerBq3.compareXMLState(xmlState.controller[1]))
                        bTest = false;
                    return bTest;
                }
                preExitScene(Direction, sceneCurr) {
                    CUtil_50.CUtil.trace("TQ3APart1B Enter Scene Behavior:");
                    this.assertGlobal('q3CVS', this.encodeExptString("engine direction", "this.sel3", "this.sel1", "this.sel2"));
                    return ("OK");
                }
            };
            exports_58("TQ3APart1B", TQ3APart1B);
        }
    };
});
System.register("sceneExt/TQ3APart2", ["sceneExt/TExpSceneTyp1", "thermite/events/TTextEvent", "util/CUtil"], function (exports_59, context_59) {
    "use strict";
    var __moduleName = context_59 && context_59.id;
    var TExpSceneTyp1_3, TTextEvent_5, CUtil_51, TQ3APart2;
    return {
        setters: [
            function (TExpSceneTyp1_3_1) {
                TExpSceneTyp1_3 = TExpSceneTyp1_3_1;
            },
            function (TTextEvent_5_1) {
                TTextEvent_5 = TTextEvent_5_1;
            },
            function (CUtil_51_1) {
                CUtil_51 = CUtil_51_1;
            }
        ],
        execute: function () {
            TQ3APart2 = class TQ3APart2 extends TExpSceneTyp1_3.TExpSceneTyp1 {
                constructor() {
                    super();
                    this.fStateCap = false;
                    CUtil_51.CUtil.trace("TQ3APart2:Constructor");
                    this.selOneA = "curvedBody";
                    this.selOneB = "straightBody";
                    this.selTwoA = "oneWindow";
                    this.selTwoB = "fourWindow";
                    this.selThreeA = "downEngines";
                    this.selThreeB = "tiltEngines";
                    this.imgTool1 = "imgToolAq3";
                    this.imgTool2 = "imgToolBq3";
                    this.tabController1 = "tabControllerAq3";
                    this.tabController2 = "tabControllerBq3";
                    this.imgToolAq3.enableTool(false);
                    this.imgToolBq3.enableTool(false);
                    this.tabControllerAq3.enableTool(false);
                    this.tabControllerBq3.enableTool(false);
                    this.q3TextControl1.StxtField.addEventListener(TTextEvent_5.TTextEvent.CHANGE, this.questionFinished);
                }
                questionFinished(evt) {
                    if (this.q3TextControl1.hasMinWords(2, 9))
                        this.fComplete = true;
                    else
                        this.fComplete = false;
                    this.updateNav();
                }
                preEnterScene(lTutor, sceneLabel, sceneTitle, scenePage, Direction) {
                    CUtil_51.CUtil.trace("TQ3APart2 Pre-Enter Scene Behavior: " + sceneTitle);
                    if (this.fStateCap) {
                        if (!this.tutorAutoObj["Sq3p1b" + this.sType].compareXMLState(this.expState)) {
                            CUtil_51.CUtil.trace("State Changed: clearing text");
                            this.tutorAutoObj["Sq3p1b" + this.sType].q3TextControl1.wozClear();
                            this.fComplete = false;
                            this.expState = this.tutorAutoObj["Sq3p1b" + this.sType].captureXMLState();
                        }
                    }
                    else {
                        this.expState = this.tutorAutoObj["Sq3p1b" + this.sType].captureXMLState();
                        this.fStateCap = true;
                    }
                    return super.preEnterScene(lTutor, sceneLabel, sceneTitle, scenePage, Direction);
                }
                onEnterScene(Direction) {
                    CUtil_51.CUtil.trace("TQ3APart2 Enter Scene Behavior:");
                    this.q3TextControl1.setFocus(true);
                }
                preExitScene(Direction, sceneCurr) {
                    CUtil_51.CUtil.trace("TQ3APart2 Enter Scene Behavior:");
                    return ("OK");
                }
            };
            exports_59("TQ3APart2", TQ3APart2);
        }
    };
});
System.register("sceneExt/TQ3BPart1", ["sceneExt/TExpSceneTyp1", "util/CUtil", "com/events/TSelectEvent", "thermite/events/TMouseEvent", "com/events/TNavEvent"], function (exports_60, context_60) {
    "use strict";
    var __moduleName = context_60 && context_60.id;
    var TExpSceneTyp1_4, CUtil_52, TSelectEvent_14, TMouseEvent_16, TNavEvent_5, TQ3BPart1;
    return {
        setters: [
            function (TExpSceneTyp1_4_1) {
                TExpSceneTyp1_4 = TExpSceneTyp1_4_1;
            },
            function (CUtil_52_1) {
                CUtil_52 = CUtil_52_1;
            },
            function (TSelectEvent_14_1) {
                TSelectEvent_14 = TSelectEvent_14_1;
            },
            function (TMouseEvent_16_1) {
                TMouseEvent_16 = TMouseEvent_16_1;
            },
            function (TNavEvent_5_1) {
                TNavEvent_5 = TNavEvent_5_1;
            }
        ],
        execute: function () {
            TQ3BPart1 = class TQ3BPart1 extends TExpSceneTyp1_4.TExpSceneTyp1 {
                constructor() {
                    super();
                    this.navSkipPanel = false;
                    CUtil_52.CUtil.trace("TQ3BPart1:Constructor");
                    this.selOneA = "topClosed";
                    this.selOneB = "topOpen";
                    this.selTwoA = "doorsTwo";
                    this.selTwoB = "doorsFour";
                    this.selThreeA = "tiresLarge";
                    this.selThreeB = "tiresSmall";
                    this.imgTool1 = "imgToolAq3";
                    this.imgTool2 = "imgToolBq3";
                    this.tabController1 = "tabControllerAq3";
                    this.tabController2 = "tabControllerBq3";
                    this.imgToolAq3.addEventListener(TSelectEvent_14.TSelectEvent.WOZIMGSELECT, this.doImageMapA);
                    this.imgToolBq3.addEventListener(TSelectEvent_14.TSelectEvent.WOZIMGSELECT, this.doImageMapB);
                    this.tabControllerAq3.addEventListener(TSelectEvent_14.TSelectEvent.WOZTABSELECT, this.doTabMapA);
                    this.tabControllerBq3.addEventListener(TSelectEvent_14.TSelectEvent.WOZTABSELECT, this.doTabMapB);
                }
                onGotoDesign(evt) {
                    CUtil_52.CUtil.trace("Design Button Click:");
                    this.q3DesignButton.removeEventListener(TMouseEvent_16.TMouseEvent.WOZCLICK, this.onGotoDesign);
                    this.fComplete = true;
                    this.dispatchEvent(new TNavEvent_5.TNavEvent(TNavEvent_5.TNavEvent.WOZNAVNEXT));
                }
                preEnterScene(Tutor, sceneLabel, sceneTitle, scenePage, Direction) {
                    CUtil_52.CUtil.trace("TQ1APart1 Pre-Enter Scene Behavior: " + sceneTitle);
                    var navScene;
                    navScene = super.preEnterScene(Tutor, sceneLabel, sceneTitle, scenePage, Direction);
                    this.q3DesignButton.addEventListener(TMouseEvent_16.TMouseEvent.WOZCLICK, this.onGotoDesign);
                    return navScene;
                }
                preExitScene(Direction, sceneCurr) {
                    CUtil_52.CUtil.trace("TQ3BPart1 Enter Scene Behavior:");
                    return ("OK");
                }
            };
            exports_60("TQ3BPart1", TQ3BPart1);
        }
    };
});
System.register("sceneExt/TQ3BPart1B", ["sceneExt/TExpSceneTyp1", "util/CUtil", "com/events/TSelectEvent"], function (exports_61, context_61) {
    "use strict";
    var __moduleName = context_61 && context_61.id;
    var TExpSceneTyp1_5, CUtil_53, TSelectEvent_15, TQ3BPart1B;
    return {
        setters: [
            function (TExpSceneTyp1_5_1) {
                TExpSceneTyp1_5 = TExpSceneTyp1_5_1;
            },
            function (CUtil_53_1) {
                CUtil_53 = CUtil_53_1;
            },
            function (TSelectEvent_15_1) {
                TSelectEvent_15 = TSelectEvent_15_1;
            }
        ],
        execute: function () {
            TQ3BPart1B = class TQ3BPart1B extends TExpSceneTyp1_5.TExpSceneTyp1 {
                constructor() {
                    super();
                    this.fCompleteA = false;
                    this.fCompleteB = false;
                    CUtil_53.CUtil.trace("TQ3BPart1B:Constructor");
                    this.selOneA = "topClosed";
                    this.selOneB = "topOpen";
                    this.selTwoA = "doorsTwo";
                    this.selTwoB = "doorsFour";
                    this.selThreeA = "tiresLarge";
                    this.selThreeB = "tiresSmall";
                    this.imgTool1 = "imgToolAq3";
                    this.imgTool2 = "imgToolBq3";
                    this.tabController1 = "tabControllerAq3";
                    this.tabController2 = "tabControllerBq3";
                    this.imgToolAq3.addEventListener(TSelectEvent_15.TSelectEvent.WOZIMGSELECT, this.doImageMapA);
                    this.imgToolBq3.addEventListener(TSelectEvent_15.TSelectEvent.WOZIMGSELECT, this.doImageMapB);
                    this.tabControllerAq3.addEventListener(TSelectEvent_15.TSelectEvent.WOZTABSELECT, this.doTabMapA);
                    this.tabControllerBq3.addEventListener(TSelectEvent_15.TSelectEvent.WOZTABSELECT, this.doTabMapB);
                    this.tabControllerAq3.addEventListener("Done", this.questionFinishedA);
                    this.tabControllerBq3.addEventListener("Done", this.questionFinishedB);
                }
                questionFinishedA(evt) {
                    CUtil_53.CUtil.trace("#### QuestionA finished");
                    this.fCompleteA = true;
                    if (this.fCompleteB) {
                        this.fComplete = true;
                        this.updateNav();
                    }
                }
                questionFinishedB(evt) {
                    CUtil_53.CUtil.trace("#### QuestionB finished");
                    this.fCompleteB = true;
                    if (this.fCompleteA) {
                        this.fComplete = true;
                        this.updateNav();
                    }
                }
                captureLogState(obj = null) {
                    obj = super.captureLogState(obj);
                    obj['scene'] = this.name;
                    obj['Controller1'] = this.tabControllerAq3.captureLogState();
                    obj['Controller2'] = this.tabControllerBq3.captureLogState();
                    return obj;
                }
                captureXMLState() {
                    var sceneState = {};
                    sceneState.appendChild(this.tabControllerAq3.captureXMLState());
                    sceneState.appendChild(this.tabControllerBq3.captureXMLState());
                    return sceneState;
                }
                restoreXMLState(xmlState) {
                    this.tabControllerAq3.restoreXMLState(xmlState.controller[0]);
                    this.tabControllerBq3.restoreXMLState(xmlState.controller[1]);
                }
                compareXMLState(xmlState) {
                    var bTest = true;
                    if (!this.tabControllerAq3.compareXMLState(xmlState.controller[0]) ||
                        !this.tabControllerBq3.compareXMLState(xmlState.controller[1]))
                        bTest = false;
                    return bTest;
                }
                preExitScene(Direction, sceneCurr) {
                    CUtil_53.CUtil.trace("TQ3BPart1B Enter Scene Behavior:");
                    this.assertGlobal('q3CVS', this.encodeExptString("size of tires", "this.sel3", "this.sel1", "this.sel2"));
                    return ("OK");
                }
            };
            exports_61("TQ3BPart1B", TQ3BPart1B);
        }
    };
});
System.register("sceneExt/TQ3BPart2", ["sceneExt/TExpSceneTyp1", "thermite/events/TTextEvent", "util/CUtil"], function (exports_62, context_62) {
    "use strict";
    var __moduleName = context_62 && context_62.id;
    var TExpSceneTyp1_6, TTextEvent_6, CUtil_54, TQ3BPart2;
    return {
        setters: [
            function (TExpSceneTyp1_6_1) {
                TExpSceneTyp1_6 = TExpSceneTyp1_6_1;
            },
            function (TTextEvent_6_1) {
                TTextEvent_6 = TTextEvent_6_1;
            },
            function (CUtil_54_1) {
                CUtil_54 = CUtil_54_1;
            }
        ],
        execute: function () {
            TQ3BPart2 = class TQ3BPart2 extends TExpSceneTyp1_6.TExpSceneTyp1 {
                constructor() {
                    super();
                    this.fStateCap = false;
                    CUtil_54.CUtil.trace("TQ3BPart2:Constructor");
                    this.selOneA = "topClosed";
                    this.selOneB = "topOpen";
                    this.selTwoA = "doorsTwo";
                    this.selTwoB = "doorsFour";
                    this.selThreeA = "tiresLarge";
                    this.selThreeB = "tiresSmall";
                    this.imgTool1 = "imgToolAq3";
                    this.imgTool2 = "imgToolBq3";
                    this.tabController1 = "tabControllerAq3";
                    this.tabController2 = "tabControllerBq3";
                    this.imgToolAq3.enableTool(false);
                    this.imgToolBq3.enableTool(false);
                    this.tabControllerAq3.enableTool(false);
                    this.tabControllerBq3.enableTool(false);
                    this.q3TextControl1.StxtField.addEventListener(TTextEvent_6.TTextEvent.CHANGE, this.questionFinished);
                }
                questionFinished(evt) {
                    if (this.q3TextControl1.hasMinWords(2, 9))
                        this.fComplete = true;
                    else
                        this.fComplete = false;
                    this.updateNav();
                }
                preEnterScene(lTutor, sceneLabel, sceneTitle, scenePage, Direction) {
                    CUtil_54.CUtil.trace("TQ3BPart2 Pre-Enter Scene Behavior: " + sceneTitle);
                    if (this.fStateCap) {
                        if (!this.tutorAutoObj["Sq3p1b" + this.sType].compareXMLState(this.expState)) {
                            CUtil_54.CUtil.trace("State Changed: clearing text");
                            this.tutorAutoObj["Sq3p1b" + this.sType].q3TextControl1.wozClear();
                            this.fComplete = false;
                            this.expState = this.tutorAutoObj["Sq3p1b" + this.sType].captureXMLState();
                        }
                    }
                    else {
                        this.expState = this.tutorAutoObj["Sq3p1b" + this.sType].captureXMLState();
                        this.fStateCap = true;
                    }
                    return super.preEnterScene(lTutor, sceneLabel, sceneTitle, scenePage, Direction);
                }
                onEnterScene(Direction) {
                    CUtil_54.CUtil.trace("TQ3BPart2 Enter Scene Behavior:");
                    this.q3TextControl1.setFocus(true);
                }
                preExitScene(Direction, sceneCurr) {
                    CUtil_54.CUtil.trace("TQ3BPart2 Enter Scene Behavior:");
                    return ("OK");
                }
            };
            exports_62("TQ3BPart2", TQ3BPart2);
        }
    };
});
System.register("sceneExt/TQ4APart1", ["sceneExt/TExpSceneTyp1", "util/CUtil", "thermite/events/TMouseEvent"], function (exports_63, context_63) {
    "use strict";
    var __moduleName = context_63 && context_63.id;
    var TExpSceneTyp1_7, CUtil_55, TMouseEvent_17, TQ4APart1;
    return {
        setters: [
            function (TExpSceneTyp1_7_1) {
                TExpSceneTyp1_7 = TExpSceneTyp1_7_1;
            },
            function (CUtil_55_1) {
                CUtil_55 = CUtil_55_1;
            },
            function (TMouseEvent_17_1) {
                TMouseEvent_17 = TMouseEvent_17_1;
            }
        ],
        execute: function () {
            TQ4APart1 = class TQ4APart1 extends TExpSceneTyp1_7.TExpSceneTyp1 {
                constructor() {
                    super();
                    CUtil_55.CUtil.trace("TQ4APart1:Constructor");
                    this.selOneA = "curvedBody";
                    this.selOneB = "straightBody";
                    this.selTwoA = "oneWindow";
                    this.selTwoB = "fourWindow";
                    this.selThreeA = "downEngines";
                    this.selThreeB = "tiltEngines";
                    this.imgTool1 = "imgToolCq4";
                    this.imgTool2 = "imgToolDq4";
                    this.tabController1 = "tabControllerCq4";
                    this.tabController2 = "tabControllerDq4";
                    this.imgToolCq4.enableTool(false);
                    this.imgToolDq4.enableTool(false);
                    this.tabControllerCq4.enableTool(false);
                    this.tabControllerDq4.enableTool(false);
                    this.imgToolCq4["straightBody"].visible = true;
                    this.imgToolCq4["fourWindow"].visible = true;
                    this.imgToolCq4["downEngines"].visible = true;
                    this.imgToolDq4["curvedBody"].visible = true;
                    this.imgToolDq4["oneWindow"].visible = true;
                    this.imgToolDq4["tiltEngines"].visible = true;
                    this.tabControllerCq4.this.sel1 = "Sitem2";
                    this.tabControllerCq4.this.StopButton.SsubLabel.text = "Straight";
                    this.tabControllerCq4.this.StopButton.SsubLabel.visible = true;
                    this.tabControllerCq4.this.sel2 = "Sitem2";
                    this.tabControllerCq4.this.ScenterButton.SsubLabel.text = "Four";
                    this.tabControllerCq4.this.ScenterButton.SsubLabel.visible = true;
                    this.tabControllerCq4.this.sel3 = "Sitem1";
                    this.tabControllerCq4.this.SbottomButton.SsubLabel.text = "Down";
                    this.tabControllerCq4.this.SbottomButton.SsubLabel.visible = true;
                    this.tabControllerDq4.this.sel1 = "Sitem1";
                    this.tabControllerDq4.this.StopButton.SsubLabel.text = "Curved";
                    this.tabControllerDq4.this.StopButton.SsubLabel.visible = true;
                    this.tabControllerDq4.this.sel2 = "Sitem1";
                    this.tabControllerDq4.this.ScenterButton.SsubLabel.text = "One";
                    this.tabControllerDq4.this.ScenterButton.SsubLabel.visible = true;
                    this.tabControllerDq4.this.sel3 = "Sitem2";
                    this.tabControllerDq4.this.SbottomButton.SsubLabel.text = "Tilted";
                    this.tabControllerDq4.this.SbottomButton.SsubLabel.visible = true;
                    this.q4Check2.setLabel("Bad Way");
                    this.q4Check1.addEventListener(TMouseEvent_17.TMouseEvent.WOZCLICK, this.check1Clicked);
                    this.q4Check2.addEventListener(TMouseEvent_17.TMouseEvent.WOZCLICK, this.check2Clicked);
                }
                check1Clicked(evt) {
                    var logData = { 'action': 'check1Clicked', 'targetid': name, 'label': 'Good Way', 'state': this.q4Check1.getChecked() };
                    this.tutorDoc.log.logActionEvent(logData);
                    this.questionFinished(evt);
                }
                check2Clicked(evt) {
                    var logData = { 'action': 'check2Clicked', 'targetid': name, 'label': 'Bad Way', 'state': this.q4Check2.getChecked() };
                    this.tutorDoc.log.logActionEvent(logData);
                    this.questionFinished(evt);
                }
                questionFinished(evt) {
                    if (this.q4Check1.getChecked() || this.q4Check2.getChecked())
                        this.fComplete = true;
                    else
                        this.fComplete = false;
                    this.updateNav();
                }
                captureLogState(obj = null) {
                    obj = super.captureLogState(obj);
                    obj['scene'] = this.name;
                    obj['Check1'] = this.q4Check1.captureLogState();
                    obj['Check2'] = this.q4Check2.captureLogState();
                    return obj;
                }
                captureXMLState() {
                    var sceneState = {};
                    sceneState.appendChild(this.q4Check1.captureXMLState());
                    sceneState.appendChild(this.q4Check2.captureXMLState());
                    return sceneState;
                }
                restoreXMLState(xmlState) {
                    this.q4Check1.restoreXMLState(xmlState.button[0]);
                    this.q4Check2.restoreXMLState(xmlState.button[1]);
                }
                compareXMLState(xmlState) {
                    var bTest = true;
                    if (!this.q4Check1.compareXMLState(xmlState.button[0]) ||
                        !this.q4Check2.compareXMLState(xmlState.button[1]))
                        bTest = false;
                    return bTest;
                }
                preExitScene(Direction, sceneCurr) {
                    CUtil_55.CUtil.trace("TQ4APart1 Enter Scene Behavior:");
                    this.assertGlobal('q4Good', this.q4Check1.captureLOGString);
                    this.assertGlobal('q4Bad', this.q4Check2.captureLOGString);
                    return ("OK");
                }
            };
            exports_63("TQ4APart1", TQ4APart1);
        }
    };
});
System.register("sceneExt/TQ4APart2", ["sceneExt/TExpSceneTyp1", "thermite/events/TTextEvent", "util/CUtil"], function (exports_64, context_64) {
    "use strict";
    var __moduleName = context_64 && context_64.id;
    var TExpSceneTyp1_8, TTextEvent_7, CUtil_56, TQ4APart2;
    return {
        setters: [
            function (TExpSceneTyp1_8_1) {
                TExpSceneTyp1_8 = TExpSceneTyp1_8_1;
            },
            function (TTextEvent_7_1) {
                TTextEvent_7 = TTextEvent_7_1;
            },
            function (CUtil_56_1) {
                CUtil_56 = CUtil_56_1;
            }
        ],
        execute: function () {
            TQ4APart2 = class TQ4APart2 extends TExpSceneTyp1_8.TExpSceneTyp1 {
                constructor() {
                    super();
                    this.fStateCap = false;
                    CUtil_56.CUtil.trace("TQ4APart2:Constructor");
                    this.selOneA = "curvedBody";
                    this.selOneB = "straightBody";
                    this.selTwoA = "oneWindow";
                    this.selTwoB = "fourWindow";
                    this.selThreeA = "downEngines";
                    this.selThreeB = "tiltEngines";
                    this.imgTool1 = "imgToolCq4";
                    this.imgTool2 = "imgToolDq4";
                    this.tabController1 = "tabControllerCq4";
                    this.tabController2 = "tabControllerDq4";
                    this.imgToolCq4.enableTool(false);
                    this.tabControllerCq4.enableTool(false);
                    this.imgToolDq4.enableTool(false);
                    this.tabControllerDq4.enableTool(false);
                    this.q4Check1.enableButton(false);
                    this.q4Check2.enableButton(false);
                    this.q4Check2.setLabel("Bad Way");
                    this.q4TextControl1.StxtField.addEventListener(TTextEvent_7.TTextEvent.CHANGE, this.questionFinished);
                }
                checkChange(evt) {
                    this.q4TextControl1.wozClear();
                    this.updateQText(this);
                    this.fComplete = false;
                    this.updateNav();
                }
                questionFinished(evt) {
                    if ((this.q4Check1.getChecked() || this.q4Check2.getChecked()) && this.q4TextControl1.hasMinWords(2, 9))
                        this.fComplete = true;
                    else
                        this.fComplete = false;
                    this.updateNav();
                }
                updateQText(wozScene) {
                    if (wozScene["q4Check1"].getChecked()) {
                        if (wozScene["q4Check2"].getChecked()) {
                            this.q4Title4.Slabel.text = "You said the pictures above show a good and bad way to find out";
                            this.q4Title7.Slabel.text = "Briefly explain why you think this is a good and bad way.";
                        }
                        else {
                            this.q4Title4.Slabel.text = "You said the pictures above show a good way to find out";
                            this.q4Title7.Slabel.text = "Briefly explain why you think this is a good way.";
                        }
                    }
                    else if (wozScene["q4Check2"].getChecked()) {
                        this.q4Title4.Slabel.text = "You said the pictures above show a bad way to find out";
                        this.q4Title7.Slabel.text = "Briefly explain why you think this is a bad way.";
                    }
                }
                preEnterScene(lTutor, sceneLabel, sceneTitle, scenePage, Direction) {
                    CUtil_56.CUtil.trace("TQ4APart2 Pre-Enter Scene Behavior: " + sceneTitle);
                    if (this.fStateCap) {
                        if (!this.tutorAutoObj["Sq4p1" + this.sType].compareXMLState(this.sceneState)) {
                            CUtil_56.CUtil.trace("State Changed: clearing text - Part C State");
                            this.tutorAutoObj["Sq4p1" + this.sType].q4TextControl1.wozClear();
                            this.tutorAutoObj["Sq4p2" + this.sType].q4TextControl1.wozClear();
                            this.fComplete = false;
                            try {
                                this.tutorAutoObj["Sq4p3" + this.sType].this.fStateCapC = false;
                                this.tutorAutoObj["Sq4p3" + this.sType].this.fStateCapD = false;
                            }
                            catch (err) {
                            }
                            this.sceneState = this.tutorAutoObj["Sq4p1" + this.sType].captureXMLState();
                        }
                    }
                    else {
                        this.sceneState = this.tutorAutoObj["Sq4p1" + this.sType].captureXMLState();
                        this.fStateCap = true;
                    }
                    this.updateQText(this.tutorAutoObj["Sq4p1" + this.sType]);
                    return super.preEnterScene(lTutor, sceneLabel, sceneTitle, scenePage, Direction);
                }
                onEnterScene(Direction) {
                    CUtil_56.CUtil.trace("TQ4APart2 Enter Scene Behavior:");
                    this.q4TextControl1.setFocus(true);
                }
                preExitScene(Direction, sceneCurr) {
                    CUtil_56.CUtil.trace("TQ4APart2 Enter Scene Behavior:");
                    return ("OK");
                }
            };
            exports_64("TQ4APart2", TQ4APart2);
        }
    };
});
System.register("sceneExt/TQ4APart3", ["sceneExt/TExpSceneTyp1", "util/CUtil", "com/events/TSelectEvent"], function (exports_65, context_65) {
    "use strict";
    var __moduleName = context_65 && context_65.id;
    var TExpSceneTyp1_9, CUtil_57, TSelectEvent_16, TQ4APart3;
    return {
        setters: [
            function (TExpSceneTyp1_9_1) {
                TExpSceneTyp1_9 = TExpSceneTyp1_9_1;
            },
            function (CUtil_57_1) {
                CUtil_57 = CUtil_57_1;
            },
            function (TSelectEvent_16_1) {
                TSelectEvent_16 = TSelectEvent_16_1;
            }
        ],
        execute: function () {
            TQ4APart3 = class TQ4APart3 extends TExpSceneTyp1_9.TExpSceneTyp1 {
                constructor() {
                    super();
                    this.fStateCapC = false;
                    this.fStateCapD = false;
                    CUtil_57.CUtil.trace("TQ4APart3:Constructor");
                    this.selOneA = "curvedBody";
                    this.selOneB = "straightBody";
                    this.selTwoA = "oneWindow";
                    this.selTwoB = "fourWindow";
                    this.selThreeA = "downEngines";
                    this.selThreeB = "tiltEngines";
                    this.imgTool1 = "imgToolCq4";
                    this.imgTool2 = "imgToolDq4";
                    this.tabController1 = "tabControllerCq4";
                    this.tabController2 = "tabControllerDq4";
                    this.imgToolCq4.tweenID = 2;
                    this.imgToolDq4.tweenID = 2;
                    this.tabControllerCq4.tweenID = 2;
                    this.tabControllerDq4.tweenID = 2;
                    this.tabControllerCq4.this.useChanged = true;
                    this.tabControllerDq4.this.useChanged = true;
                    this.imgToolCq4.addEventListener(TSelectEvent_16.TSelectEvent.WOZIMGSELECT, this.doImageMapA);
                    this.imgToolDq4.addEventListener(TSelectEvent_16.TSelectEvent.WOZIMGSELECT, this.doImageMapB);
                    this.tabControllerCq4.addEventListener(TSelectEvent_16.TSelectEvent.WOZTABSELECT, this.doTabMapA);
                    this.tabControllerDq4.addEventListener(TSelectEvent_16.TSelectEvent.WOZTABSELECT, this.doTabMapB);
                    this.tabControllerCq4.addEventListener("Done", this.questionFinished);
                    this.tabControllerDq4.addEventListener("Done", this.questionFinished);
                }
                questionFinished(evt) {
                }
                updateNavigation(fFinished) {
                    this.fComplete = fFinished;
                    this.updateNav();
                }
                setLabels() {
                    var fChanged = false;
                    if (!this.tabControllerCq4.compareXMLState(this.expStateC)) {
                        this.q4FrameC.Slabel.text = "C - Changed";
                        fChanged = true;
                    }
                    else
                        this.q4FrameC.Slabel.text = "C";
                    if (!this.tabControllerDq4.compareXMLState(this.expStateD)) {
                        this.q4FrameD.Slabel.text = "D - Changed";
                        fChanged = true;
                    }
                    else
                        this.q4FrameD.Slabel.text = "D";
                    this.updateNavigation(fChanged);
                }
                doTabMapA(evt) {
                    CUtil_57.CUtil.trace(" this.doTabMap: " + evt.selection);
                    this.setLabels();
                    super.doTabMapA(evt);
                }
                doTabMapB(evt) {
                    CUtil_57.CUtil.trace(" this.doTabMap: " + evt.selection);
                    this.setLabels();
                    super.doTabMapB(evt);
                }
                preEnterScene(lTutor, sceneLabel, sceneTitle, scenePage, Direction) {
                    CUtil_57.CUtil.trace("TQ4APart3 Pre-Enter Scene Behavior: " + sceneTitle);
                    if (!this.tutorAutoObj["Sq4p2" + this.sType].q4Check2.getChecked()) {
                        super.preEnterScene(lTutor, sceneLabel, sceneTitle, scenePage, Direction);
                        return Direction;
                    }
                    if (!this.fStateCapC) {
                        this.expStateC = this.tutorAutoObj["Sq4p2" + this.sType].tabControllerCq4.captureXMLState();
                        this.imgStateC = this.tutorAutoObj["Sq4p2" + this.sType].imgToolCq4.captureXMLState();
                        this.tabControllerCq4.restoreXMLState(this.expStateC);
                        this.imgToolCq4.restoreXMLState(this.imgStateC);
                        this.fStateCapC = true;
                    }
                    if (!this.fStateCapD) {
                        this.expStateD = this.tutorAutoObj["Sq4p2" + this.sType].tabControllerDq4.captureXMLState();
                        this.imgStateD = this.tutorAutoObj["Sq4p2" + this.sType].imgToolDq4.captureXMLState();
                        this.tabControllerDq4.restoreXMLState(this.expStateD);
                        this.imgToolDq4.restoreXMLState(this.imgStateD);
                        this.fStateCapD = true;
                    }
                    this.setLabels();
                    this.updateNavigation(this.fComplete);
                    return super.preEnterScene(lTutor, sceneLabel, sceneTitle, scenePage, Direction);
                }
                preExitScene(Direction, sceneCurr) {
                    CUtil_57.CUtil.trace("TQ4APart3 Enter Scene Behavior:");
                    this.assertGlobal('q4CVS', this.encodeExptString("number of windows", "this.sel2", "this.sel1", "this.sel3"));
                    return ("OK");
                }
            };
            exports_65("TQ4APart3", TQ4APart3);
        }
    };
});
System.register("sceneExt/TQ4BPart1", ["sceneExt/TExpSceneTyp1", "util/CUtil", "thermite/events/TMouseEvent"], function (exports_66, context_66) {
    "use strict";
    var __moduleName = context_66 && context_66.id;
    var TExpSceneTyp1_10, CUtil_58, TMouseEvent_18, TQ4BPart1;
    return {
        setters: [
            function (TExpSceneTyp1_10_1) {
                TExpSceneTyp1_10 = TExpSceneTyp1_10_1;
            },
            function (CUtil_58_1) {
                CUtil_58 = CUtil_58_1;
            },
            function (TMouseEvent_18_1) {
                TMouseEvent_18 = TMouseEvent_18_1;
            }
        ],
        execute: function () {
            TQ4BPart1 = class TQ4BPart1 extends TExpSceneTyp1_10.TExpSceneTyp1 {
                constructor() {
                    super();
                    CUtil_58.CUtil.trace("TQ4BPart1:Constructor");
                    this.selOneA = "topClosed";
                    this.selOneB = "topOpen";
                    this.selTwoA = "doorsTwo";
                    this.selTwoB = "doorsFour";
                    this.selThreeA = "tiresLarge";
                    this.selThreeB = "tiresSmall";
                    this.imgTool1 = "imgToolCq4";
                    this.imgTool2 = "imgToolDq4";
                    this.tabController1 = "tabControllerCq4";
                    this.tabController2 = "tabControllerDq4";
                    this.imgToolCq4.enableTool(false);
                    this.imgToolDq4.enableTool(false);
                    this.tabControllerCq4.enableTool(false);
                    this.tabControllerDq4.enableTool(false);
                    this.imgToolCq4["topClosed"].visible = true;
                    this.imgToolCq4["doorsTwo"].visible = true;
                    this.imgToolCq4["tiresLarge"].visible = true;
                    this.imgToolDq4["topOpen"].visible = true;
                    this.imgToolDq4["doorsFour"].visible = true;
                    this.imgToolDq4["tiresSmall"].visible = true;
                    this.tabControllerCq4.this.sel1 = "Sitem1";
                    this.tabControllerCq4.this.StopButton.SsubLabel.text = "Closed";
                    this.tabControllerCq4.this.StopButton.SsubLabel.visible = true;
                    this.tabControllerCq4.this.sel2 = "Sitem1";
                    this.tabControllerCq4.this.ScenterButton.SsubLabel.text = "Two";
                    this.tabControllerCq4.this.ScenterButton.SsubLabel.visible = true;
                    this.tabControllerCq4.this.sel3 = "Sitem1";
                    this.tabControllerCq4.this.SbottomButton.SsubLabel.text = "Large";
                    this.tabControllerCq4.this.SbottomButton.SsubLabel.visible = true;
                    this.tabControllerDq4.this.sel1 = "Sitem2";
                    this.tabControllerDq4.this.StopButton.SsubLabel.text = "Open";
                    this.tabControllerDq4.this.StopButton.SsubLabel.visible = true;
                    this.tabControllerDq4.this.sel2 = "Sitem2";
                    this.tabControllerDq4.this.ScenterButton.SsubLabel.text = "Four";
                    this.tabControllerDq4.this.ScenterButton.SsubLabel.visible = true;
                    this.tabControllerDq4.this.sel3 = "Sitem2";
                    this.tabControllerDq4.this.SbottomButton.SsubLabel.text = "Small";
                    this.tabControllerDq4.this.SbottomButton.SsubLabel.visible = true;
                    this.q4Check2.setLabel("Bad Way");
                    this.q4Check1.addEventListener(TMouseEvent_18.TMouseEvent.WOZCLICK, this.check1Clicked);
                    this.q4Check2.addEventListener(TMouseEvent_18.TMouseEvent.WOZCLICK, this.check2Clicked);
                }
                check1Clicked(evt) {
                    var logData = { 'action': 'check1Clicked', 'targetid': name, 'label': 'Good Way', 'state': this.q4Check1.getChecked() };
                    this.tutorDoc.log.logActionEvent(logData);
                    this.questionFinished(evt);
                }
                check2Clicked(evt) {
                    var logData = { 'action': 'check2Clicked', 'targetid': name, 'label': 'Bad Way', 'state': this.q4Check2.getChecked() };
                    this.tutorDoc.log.logActionEvent(logData);
                    this.questionFinished(evt);
                }
                questionFinished(evt) {
                    if (this.q4Check1.getChecked() || this.q4Check2.getChecked())
                        this.fComplete = true;
                    else
                        this.fComplete = false;
                    this.updateNav();
                }
                captureLogState(obj = null) {
                    obj = super.captureLogState(obj);
                    obj['scene'] = this.name;
                    obj['Check1'] = this.q4Check1.captureLogState();
                    obj['Check2'] = this.q4Check2.captureLogState();
                    return obj;
                }
                captureXMLState() {
                    var sceneState = {};
                    sceneState.appendChild(this.q4Check1.captureXMLState());
                    sceneState.appendChild(this.q4Check2.captureXMLState());
                    return sceneState;
                }
                restoreXMLState(xmlState) {
                    this.q4Check1.restoreXMLState(xmlState.button[0]);
                    this.q4Check2.restoreXMLState(xmlState.button[1]);
                }
                compareXMLState(xmlState) {
                    var bTest = true;
                    if (!this.q4Check1.compareXMLState(xmlState.button[0]) ||
                        !this.q4Check2.compareXMLState(xmlState.button[1]))
                        bTest = false;
                    return bTest;
                }
                preExitScene(Direction, sceneCurr) {
                    CUtil_58.CUtil.trace("TQ4BPart1 Enter Scene Behavior:");
                    this.assertGlobal('q4Good', this.q4Check1.captureLOGString);
                    this.assertGlobal('q4Bad', this.q4Check2.captureLOGString);
                    return ("OK");
                }
            };
            exports_66("TQ4BPart1", TQ4BPart1);
        }
    };
});
System.register("sceneExt/TQ4BPart2", ["sceneExt/TExpSceneTyp1", "thermite/events/TTextEvent", "util/CUtil"], function (exports_67, context_67) {
    "use strict";
    var __moduleName = context_67 && context_67.id;
    var TExpSceneTyp1_11, TTextEvent_8, CUtil_59, TQ4BPart2;
    return {
        setters: [
            function (TExpSceneTyp1_11_1) {
                TExpSceneTyp1_11 = TExpSceneTyp1_11_1;
            },
            function (TTextEvent_8_1) {
                TTextEvent_8 = TTextEvent_8_1;
            },
            function (CUtil_59_1) {
                CUtil_59 = CUtil_59_1;
            }
        ],
        execute: function () {
            TQ4BPart2 = class TQ4BPart2 extends TExpSceneTyp1_11.TExpSceneTyp1 {
                constructor() {
                    super();
                    this.fStateCap = false;
                    CUtil_59.CUtil.trace("TQ4BPart2:Constructor");
                    this.selOneA = "topClosed";
                    this.selOneB = "topOpen";
                    this.selTwoA = "doorsTwo";
                    this.selTwoB = "doorsFour";
                    this.selThreeA = "tiresLarge";
                    this.selThreeB = "tiresSmall";
                    this.imgTool1 = "imgToolCq4";
                    this.imgTool2 = "imgToolDq4";
                    this.tabController1 = "tabControllerCq4";
                    this.tabController2 = "tabControllerDq4";
                    this.imgToolCq4.enableTool(false);
                    this.tabControllerCq4.enableTool(false);
                    this.imgToolDq4.enableTool(false);
                    this.tabControllerDq4.enableTool(false);
                    this.q4Check1.enableButton(false);
                    this.q4Check2.enableButton(false);
                    this.q4Check2.setLabel("Bad Way");
                    this.q4TextControl1.StxtField.addEventListener(TTextEvent_8.TTextEvent.CHANGE, this.questionFinished);
                }
                checkChange(evt) {
                    this.q4TextControl1.wozClear();
                    this.updateQText(this);
                    this.fComplete = false;
                    this.updateNav();
                }
                questionFinished(evt) {
                    if ((this.q4Check1.getChecked() || this.q4Check2.getChecked()) && this.q4TextControl1.hasMinWords(2, 9))
                        this.fComplete = true;
                    else
                        this.fComplete = false;
                    this.updateNav();
                }
                updateQText(wozScene) {
                    if (wozScene["q4Check1"].getChecked()) {
                        if (wozScene["q4Check2"].getChecked()) {
                            this.q4Title4.Slabel.text = "You said the pictures above show a good and bad way to find out";
                            this.q4Title7.Slabel.text = "Briefly explain why you think this is a good and bad way.";
                        }
                        else {
                            this.q4Title4.Slabel.text = "You said the pictures above show a good way to find out";
                            this.q4Title7.Slabel.text = "Briefly explain why you think this is a good way.";
                        }
                    }
                    else if (wozScene["q4Check2"].getChecked()) {
                        this.q4Title4.Slabel.text = "You said the pictures above show a bad way to find out";
                        this.q4Title7.Slabel.text = "Briefly explain why you think this is a bad way.";
                    }
                }
                preEnterScene(lTutor, sceneLabel, sceneTitle, scenePage, Direction) {
                    CUtil_59.CUtil.trace("TQ4BPart2 Pre-Enter Scene Behavior: " + sceneTitle);
                    if (this.fStateCap) {
                        if (!this.tutorAutoObj["Sq4p1" + this.sType].compareXMLState(this.sceneState)) {
                            CUtil_59.CUtil.trace("State Changed: clearing text - Part C State");
                            this.tutorAutoObj["Sq4p1" + this.sType].q4TextControl1.wozClear();
                            this.tutorAutoObj["Sq4p2" + this.sType].q4TextControl1.wozClear();
                            this.fComplete = false;
                            try {
                                this.tutorAutoObj["Sq4p3" + this.sType].this.fStateCapC = false;
                                this.tutorAutoObj["Sq4p3" + this.sType].this.fStateCapD = false;
                            }
                            catch (err) {
                            }
                            this.sceneState = this.tutorAutoObj["Sq4p1" + this.sType].captureXMLState();
                        }
                    }
                    else {
                        this.sceneState = this.tutorAutoObj["Sq4p1" + this.sType].captureXMLState();
                        this.fStateCap = true;
                    }
                    this.updateQText(this.tutorAutoObj["Sq4p1" + this.sType]);
                    return super.preEnterScene(lTutor, sceneLabel, sceneTitle, scenePage, Direction);
                }
                onEnterScene(Direction) {
                    CUtil_59.CUtil.trace("TQ4BPart2 Enter Scene Behavior:");
                    this.q4TextControl1.setFocus(true);
                }
                preExitScene(Direction, sceneCurr) {
                    CUtil_59.CUtil.trace("TQ4BPart2 Enter Scene Behavior:");
                    return ("OK");
                }
            };
            exports_67("TQ4BPart2", TQ4BPart2);
        }
    };
});
System.register("sceneExt/TQ4BPart3", ["sceneExt/TExpSceneTyp1", "util/CUtil", "com/events/TSelectEvent"], function (exports_68, context_68) {
    "use strict";
    var __moduleName = context_68 && context_68.id;
    var TExpSceneTyp1_12, CUtil_60, TSelectEvent_17, TQ4BPart3;
    return {
        setters: [
            function (TExpSceneTyp1_12_1) {
                TExpSceneTyp1_12 = TExpSceneTyp1_12_1;
            },
            function (CUtil_60_1) {
                CUtil_60 = CUtil_60_1;
            },
            function (TSelectEvent_17_1) {
                TSelectEvent_17 = TSelectEvent_17_1;
            }
        ],
        execute: function () {
            TQ4BPart3 = class TQ4BPart3 extends TExpSceneTyp1_12.TExpSceneTyp1 {
                constructor() {
                    super();
                    this.fStateCapC = false;
                    this.fStateCapD = false;
                    CUtil_60.CUtil.trace("TQ4BPart3:Constructor");
                    this.selOneA = "topClosed";
                    this.selOneB = "topOpen";
                    this.selTwoA = "doorsTwo";
                    this.selTwoB = "doorsFour";
                    this.selThreeA = "tiresLarge";
                    this.selThreeB = "tiresSmall";
                    this.imgTool1 = "imgToolCq4";
                    this.imgTool2 = "imgToolDq4";
                    this.tabController1 = "tabControllerCq4";
                    this.tabController2 = "tabControllerDq4";
                    this.imgToolCq4.tweenID = 2;
                    this.imgToolDq4.tweenID = 2;
                    this.tabControllerCq4.tweenID = 2;
                    this.tabControllerDq4.tweenID = 2;
                    this.tabControllerCq4.this.useChanged = true;
                    this.tabControllerDq4.this.useChanged = true;
                    this.imgToolCq4.addEventListener(TSelectEvent_17.TSelectEvent.WOZIMGSELECT, this.doImageMapA);
                    this.imgToolDq4.addEventListener(TSelectEvent_17.TSelectEvent.WOZIMGSELECT, this.doImageMapB);
                    this.tabControllerCq4.addEventListener(TSelectEvent_17.TSelectEvent.WOZTABSELECT, this.doTabMapA);
                    this.tabControllerDq4.addEventListener(TSelectEvent_17.TSelectEvent.WOZTABSELECT, this.doTabMapB);
                    this.tabControllerCq4.addEventListener("Done", this.questionFinished);
                    this.tabControllerDq4.addEventListener("Done", this.questionFinished);
                }
                questionFinished(evt) {
                }
                updateNavigation(fFinished) {
                    this.fComplete = fFinished;
                    this.updateNav();
                }
                setLabels() {
                    var fChanged = false;
                    if (!this.tabControllerCq4.compareXMLState(this.expStateC)) {
                        this.q4FrameC.Slabel.text = "C - Changed";
                        fChanged = true;
                    }
                    else
                        this.q4FrameC.Slabel.text = "C";
                    if (!this.tabControllerDq4.compareXMLState(this.expStateD)) {
                        this.q4FrameD.Slabel.text = "D - Changed";
                        fChanged = true;
                    }
                    else
                        this.q4FrameD.Slabel.text = "D";
                    this.updateNavigation(fChanged);
                }
                doTabMapA(evt) {
                    CUtil_60.CUtil.trace(" this.doTabMap: " + evt.selection);
                    this.setLabels();
                    super.doTabMapA(evt);
                }
                doTabMapB(evt) {
                    CUtil_60.CUtil.trace(" this.doTabMap: " + evt.selection);
                    this.setLabels();
                    super.doTabMapB(evt);
                }
                preEnterScene(lTutor, sceneLabel, sceneTitle, scenePage, Direction) {
                    CUtil_60.CUtil.trace("TQ4BPart3 Pre-Enter Scene Behavior: " + sceneTitle);
                    if (!this.tutorAutoObj["Sq4p2" + this.sType].q4Check2.getChecked()) {
                        super.preEnterScene(lTutor, sceneLabel, sceneTitle, scenePage, Direction);
                        return Direction;
                    }
                    if (!this.fStateCapC) {
                        this.expStateC = this.tutorAutoObj["Sq4p2" + this.sType].tabControllerCq4.captureXMLState();
                        this.imgStateC = this.tutorAutoObj["Sq4p2" + this.sType].imgToolCq4.captureXMLState();
                        this.tabControllerCq4.restoreXMLState(this.expStateC);
                        this.imgToolCq4.restoreXMLState(this.imgStateC);
                        this.fStateCapC = true;
                    }
                    if (!this.fStateCapD) {
                        this.expStateD = this.tutorAutoObj["Sq4p2" + this.sType].tabControllerDq4.captureXMLState();
                        this.imgStateD = this.tutorAutoObj["Sq4p2" + this.sType].imgToolDq4.captureXMLState();
                        this.tabControllerDq4.restoreXMLState(this.expStateD);
                        this.imgToolDq4.restoreXMLState(this.imgStateD);
                        this.fStateCapD = true;
                    }
                    this.setLabels();
                    this.updateNavigation(this.fComplete);
                    return super.preEnterScene(lTutor, sceneLabel, sceneTitle, scenePage, Direction);
                }
                preExitScene(Direction, sceneCurr) {
                    CUtil_60.CUtil.trace("TQ4BPart3 Enter Scene Behavior:");
                    this.assertGlobal('q4CVS', this.encodeExptString("number of doors", "this.sel2", "this.sel1", "this.sel3"));
                    return ("OK");
                }
            };
            exports_68("TQ4BPart3", TQ4BPart3);
        }
    };
});
System.register("sceneExt/TQ5APart1", ["sceneExt/TExpSceneTyp1", "util/CUtil", "com/events/TSelectEvent", "thermite/events/TMouseEvent", "com/events/TNavEvent"], function (exports_69, context_69) {
    "use strict";
    var __moduleName = context_69 && context_69.id;
    var TExpSceneTyp1_13, CUtil_61, TSelectEvent_18, TMouseEvent_19, TNavEvent_6, TQ5APart1;
    return {
        setters: [
            function (TExpSceneTyp1_13_1) {
                TExpSceneTyp1_13 = TExpSceneTyp1_13_1;
            },
            function (CUtil_61_1) {
                CUtil_61 = CUtil_61_1;
            },
            function (TSelectEvent_18_1) {
                TSelectEvent_18 = TSelectEvent_18_1;
            },
            function (TMouseEvent_19_1) {
                TMouseEvent_19 = TMouseEvent_19_1;
            },
            function (TNavEvent_6_1) {
                TNavEvent_6 = TNavEvent_6_1;
            }
        ],
        execute: function () {
            TQ5APart1 = class TQ5APart1 extends TExpSceneTyp1_13.TExpSceneTyp1 {
                constructor() {
                    super();
                    this.navSkipPanel = false;
                    CUtil_61.CUtil.trace("TQ5APart1:Constructor");
                    this.selOneA = "studyAlone";
                    this.selOneB = "studyFriend";
                    this.selTwoA = "atHome";
                    this.selTwoB = "atLibrary";
                    this.selThreeA = "drinkWater";
                    this.selThreeB = "drinkSoda";
                    this.imgTool1 = "imgToolAq5";
                    this.imgTool2 = "imgToolBq5";
                    this.tabController1 = "tabControllerAq5";
                    this.tabController2 = "tabControllerBq5";
                    this.imgToolAq5.addEventListener(TSelectEvent_18.TSelectEvent.WOZIMGSELECT, this.doImageMapA);
                    this.imgToolBq5.addEventListener(TSelectEvent_18.TSelectEvent.WOZIMGSELECT, this.doImageMapB);
                    this.tabControllerAq5.addEventListener(TSelectEvent_18.TSelectEvent.WOZTABSELECT, this.doTabMapA);
                    this.tabControllerBq5.addEventListener(TSelectEvent_18.TSelectEvent.WOZTABSELECT, this.doTabMapB);
                }
                onGotoDesign(evt) {
                    CUtil_61.CUtil.trace("Design Button Click:");
                    this.q5DesignButton.removeEventListener(TMouseEvent_19.TMouseEvent.WOZCLICK, this.onGotoDesign);
                    this.fComplete = true;
                    this.dispatchEvent(new TNavEvent_6.TNavEvent(TNavEvent_6.TNavEvent.WOZNAVNEXT));
                }
                preEnterScene(Tutor, sceneLabel, sceneTitle, scenePage, Direction) {
                    CUtil_61.CUtil.trace("TQ1APart1 Pre-Enter Scene Behavior: " + sceneTitle);
                    var navScene;
                    navScene = super.preEnterScene(Tutor, sceneLabel, sceneTitle, scenePage, Direction);
                    if (this.fComplete && (Direction != "WOZGOTO"))
                        return Direction;
                    this.q5DesignButton.addEventListener(TMouseEvent_19.TMouseEvent.WOZCLICK, this.onGotoDesign);
                    return navScene;
                }
                preExitScene(Direction, sceneCurr) {
                    CUtil_61.CUtil.trace("TQ5APart1 Enter Scene Behavior:");
                    return ("OK");
                }
            };
            exports_69("TQ5APart1", TQ5APart1);
        }
    };
});
System.register("sceneExt/TQ5APart1B", ["sceneExt/TExpSceneTyp1", "util/CUtil", "com/events/TSelectEvent"], function (exports_70, context_70) {
    "use strict";
    var __moduleName = context_70 && context_70.id;
    var TExpSceneTyp1_14, CUtil_62, TSelectEvent_19, TQ5APart1B;
    return {
        setters: [
            function (TExpSceneTyp1_14_1) {
                TExpSceneTyp1_14 = TExpSceneTyp1_14_1;
            },
            function (CUtil_62_1) {
                CUtil_62 = CUtil_62_1;
            },
            function (TSelectEvent_19_1) {
                TSelectEvent_19 = TSelectEvent_19_1;
            }
        ],
        execute: function () {
            TQ5APart1B = class TQ5APart1B extends TExpSceneTyp1_14.TExpSceneTyp1 {
                constructor() {
                    super();
                    this.fCompleteA = false;
                    this.fCompleteB = false;
                    CUtil_62.CUtil.trace("TQ5APart1B:Constructor");
                    this.selOneA = "studyAlone";
                    this.selOneB = "studyFriend";
                    this.selTwoA = "atHome";
                    this.selTwoB = "atLibrary";
                    this.selThreeA = "drinkWater";
                    this.selThreeB = "drinkSoda";
                    this.imgTool1 = "imgToolAq5";
                    this.imgTool2 = "imgToolBq5";
                    this.tabController1 = "tabControllerAq5";
                    this.tabController2 = "tabControllerBq5";
                    this.imgToolAq5.addEventListener(TSelectEvent_19.TSelectEvent.WOZIMGSELECT, this.doImageMapA);
                    this.imgToolBq5.addEventListener(TSelectEvent_19.TSelectEvent.WOZIMGSELECT, this.doImageMapB);
                    this.tabControllerAq5.addEventListener(TSelectEvent_19.TSelectEvent.WOZTABSELECT, this.doTabMapA);
                    this.tabControllerBq5.addEventListener(TSelectEvent_19.TSelectEvent.WOZTABSELECT, this.doTabMapB);
                    this.tabControllerAq5.addEventListener("Done", this.questionFinishedA);
                    this.tabControllerBq5.addEventListener("Done", this.questionFinishedB);
                }
                questionFinishedA(evt) {
                    CUtil_62.CUtil.trace("#### QuestionA finished");
                    this.fCompleteA = true;
                    if (this.fCompleteB) {
                        this.fComplete = true;
                        this.updateNav();
                    }
                }
                questionFinishedB(evt) {
                    CUtil_62.CUtil.trace("#### QuestionB finished");
                    this.fCompleteB = true;
                    if (this.fCompleteA) {
                        this.fComplete = true;
                        this.updateNav();
                    }
                }
                captureLogState(obj = null) {
                    obj = super.captureLogState(obj);
                    obj['scene'] = this.name;
                    obj['Controller1'] = this.tabControllerAq5.captureLogState();
                    obj['Controller2'] = this.tabControllerBq5.captureLogState();
                    return obj;
                }
                captureXMLState() {
                    var sceneState = {};
                    sceneState.appendChild(this.tabControllerAq5.captureXMLState());
                    sceneState.appendChild(this.tabControllerBq5.captureXMLState());
                    return sceneState;
                }
                restoreXMLState(xmlState) {
                    this.tabControllerAq5.restoreXMLState(xmlState.controller[0]);
                    this.tabControllerBq5.restoreXMLState(xmlState.controller[1]);
                }
                compareXMLState(xmlState) {
                    var bTest = true;
                    if (!this.tabControllerAq5.compareXMLState(xmlState.controller[0]) ||
                        !this.tabControllerBq5.compareXMLState(xmlState.controller[1]))
                        bTest = false;
                    return bTest;
                }
                preExitScene(Direction, sceneCurr) {
                    CUtil_62.CUtil.trace("TQ5APart1B Enter Scene Behavior:");
                    this.assertGlobal('q5CVS', this.encodeExptString("study where", "this.sel2", "this.sel1", "this.sel3"));
                    return ("OK");
                }
            };
            exports_70("TQ5APart1B", TQ5APart1B);
        }
    };
});
System.register("sceneExt/TQ5APart2", ["sceneExt/TExpSceneTyp1", "thermite/events/TTextEvent", "util/CUtil"], function (exports_71, context_71) {
    "use strict";
    var __moduleName = context_71 && context_71.id;
    var TExpSceneTyp1_15, TTextEvent_9, CUtil_63, TQ5APart2;
    return {
        setters: [
            function (TExpSceneTyp1_15_1) {
                TExpSceneTyp1_15 = TExpSceneTyp1_15_1;
            },
            function (TTextEvent_9_1) {
                TTextEvent_9 = TTextEvent_9_1;
            },
            function (CUtil_63_1) {
                CUtil_63 = CUtil_63_1;
            }
        ],
        execute: function () {
            TQ5APart2 = class TQ5APart2 extends TExpSceneTyp1_15.TExpSceneTyp1 {
                constructor() {
                    super();
                    this.fStateCap = false;
                    this.expState = {};
                    CUtil_63.CUtil.trace("TQ5APart2:Constructor");
                    this.selOneA = "studyAlone";
                    this.selOneB = "studyFriend";
                    this.selTwoA = "atHome";
                    this.selTwoB = "atLibrary";
                    this.selThreeA = "drinkWater";
                    this.selThreeB = "drinkSoda";
                    this.imgTool1 = "imgToolAq5";
                    this.imgTool2 = "imgToolBq5";
                    this.tabController1 = "tabControllerAq5";
                    this.tabController2 = "tabControllerBq5";
                    this.imgToolAq5.enableTool(false);
                    this.imgToolBq5.enableTool(false);
                    this.tabControllerAq5.enableTool(false);
                    this.tabControllerBq5.enableTool(false);
                    this.q5TextControl1.StxtField.addEventListener(TTextEvent_9.TTextEvent.CHANGE, this.questionFinished);
                }
                questionFinished(evt) {
                    if (this.q5TextControl1.hasMinWords(2, 9))
                        this.fComplete = true;
                    else
                        this.fComplete = false;
                    this.updateNav();
                }
                preEnterScene(lTutor, sceneLabel, sceneTitle, scenePage, Direction) {
                    CUtil_63.CUtil.trace("TQ5APart2 Pre-Enter Scene Behavior: " + sceneTitle);
                    if (this.fStateCap) {
                        if (!this.tutorAutoObj["Sq5p1b" + this.sType].compareXMLState(this.expState)) {
                            CUtil_63.CUtil.trace("State Changed: clearing text");
                            this.tutorAutoObj["Sq5p1b" + this.sType].q5TextControl1.wozClear();
                            this.fComplete = false;
                            this.expState = this.tutorAutoObj["Sq5p1b" + this.sType].captureXMLState();
                        }
                    }
                    else {
                        this.expState = this.tutorAutoObj["Sq5p1b" + this.sType].captureXMLState();
                        this.fStateCap = true;
                    }
                    return super.preEnterScene(lTutor, sceneLabel, sceneTitle, scenePage, Direction);
                }
                onEnterScene(Direction) {
                    CUtil_63.CUtil.trace("TQ5APart2 Enter Scene Behavior:");
                    this.q5TextControl1.setFocus(true);
                }
                preExitScene(Direction, sceneCurr) {
                    CUtil_63.CUtil.trace("TQ5APart2 Enter Scene Behavior:");
                    return ("OK");
                }
            };
            exports_71("TQ5APart2", TQ5APart2);
        }
    };
});
System.register("sceneExt/TQ5BPart1", ["sceneExt/TExpSceneTyp1", "util/CUtil", "com/events/TSelectEvent", "thermite/events/TMouseEvent", "com/events/TNavEvent"], function (exports_72, context_72) {
    "use strict";
    var __moduleName = context_72 && context_72.id;
    var TExpSceneTyp1_16, CUtil_64, TSelectEvent_20, TMouseEvent_20, TNavEvent_7, TQ5BPart1;
    return {
        setters: [
            function (TExpSceneTyp1_16_1) {
                TExpSceneTyp1_16 = TExpSceneTyp1_16_1;
            },
            function (CUtil_64_1) {
                CUtil_64 = CUtil_64_1;
            },
            function (TSelectEvent_20_1) {
                TSelectEvent_20 = TSelectEvent_20_1;
            },
            function (TMouseEvent_20_1) {
                TMouseEvent_20 = TMouseEvent_20_1;
            },
            function (TNavEvent_7_1) {
                TNavEvent_7 = TNavEvent_7_1;
            }
        ],
        execute: function () {
            TQ5BPart1 = class TQ5BPart1 extends TExpSceneTyp1_16.TExpSceneTyp1 {
                constructor() {
                    super();
                    this.navSkipPanel = false;
                    CUtil_64.CUtil.trace("TQ5BPart1:Constructor");
                    this.selOneA = "lightBright";
                    this.selOneB = "lightDim";
                    this.selTwoA = "cardIcons";
                    this.selTwoB = "cardWords";
                    this.selThreeA = "minutesOne";
                    this.selThreeB = "minutesFive";
                    this.imgTool1 = "imgToolAq5";
                    this.imgTool2 = "imgToolBq5";
                    this.tabController1 = "tabControllerAq5";
                    this.tabController2 = "tabControllerBq5";
                    this.imgToolAq5.addEventListener(TSelectEvent_20.TSelectEvent.WOZIMGSELECT, this.doImageMapA);
                    this.imgToolBq5.addEventListener(TSelectEvent_20.TSelectEvent.WOZIMGSELECT, this.doImageMapB);
                    this.tabControllerAq5.addEventListener(TSelectEvent_20.TSelectEvent.WOZTABSELECT, this.doTabMapA);
                    this.tabControllerBq5.addEventListener(TSelectEvent_20.TSelectEvent.WOZTABSELECT, this.doTabMapB);
                }
                onGotoDesign(evt) {
                    CUtil_64.CUtil.trace("Design Button Click:");
                    this.q5DesignButton.removeEventListener(TMouseEvent_20.TMouseEvent.WOZCLICK, this.onGotoDesign);
                    this.fComplete = true;
                    this.dispatchEvent(new TNavEvent_7.TNavEvent(TNavEvent_7.TNavEvent.WOZNAVNEXT));
                }
                preEnterScene(Tutor, sceneLabel, sceneTitle, scenePage, Direction) {
                    CUtil_64.CUtil.trace("TQ1APart1 Pre-Enter Scene Behavior: " + sceneTitle);
                    var navScene;
                    navScene = super.preEnterScene(Tutor, sceneLabel, sceneTitle, scenePage, Direction);
                    this.q5DesignButton.addEventListener(TMouseEvent_20.TMouseEvent.WOZCLICK, this.onGotoDesign);
                    return navScene;
                }
                preExitScene(Direction, sceneCurr) {
                    CUtil_64.CUtil.trace("TQ5BPart1 Enter Scene Behavior:");
                    return ("OK");
                }
            };
            exports_72("TQ5BPart1", TQ5BPart1);
        }
    };
});
System.register("sceneExt/TQ5BPart1B", ["sceneExt/TExpSceneTyp1", "util/CUtil", "com/events/TSelectEvent"], function (exports_73, context_73) {
    "use strict";
    var __moduleName = context_73 && context_73.id;
    var TExpSceneTyp1_17, CUtil_65, TSelectEvent_21, TQ5BPart1B;
    return {
        setters: [
            function (TExpSceneTyp1_17_1) {
                TExpSceneTyp1_17 = TExpSceneTyp1_17_1;
            },
            function (CUtil_65_1) {
                CUtil_65 = CUtil_65_1;
            },
            function (TSelectEvent_21_1) {
                TSelectEvent_21 = TSelectEvent_21_1;
            }
        ],
        execute: function () {
            TQ5BPart1B = class TQ5BPart1B extends TExpSceneTyp1_17.TExpSceneTyp1 {
                constructor() {
                    super();
                    this.fCompleteA = false;
                    this.fCompleteB = false;
                    CUtil_65.CUtil.trace("TQ5BPart1B:Constructor");
                    this.selOneA = "lightBright";
                    this.selOneB = "lightDim";
                    this.selTwoA = "cardIcons";
                    this.selTwoB = "cardWords";
                    this.selThreeA = "minutesOne";
                    this.selThreeB = "minutesFive";
                    this.imgTool1 = "imgToolAq5";
                    this.imgTool2 = "imgToolBq5";
                    this.tabController1 = "tabControllerAq5";
                    this.tabController2 = "tabControllerBq5";
                    this.imgToolAq5.addEventListener(TSelectEvent_21.TSelectEvent.WOZIMGSELECT, this.doImageMapA);
                    this.imgToolBq5.addEventListener(TSelectEvent_21.TSelectEvent.WOZIMGSELECT, this.doImageMapB);
                    this.tabControllerAq5.addEventListener(TSelectEvent_21.TSelectEvent.WOZTABSELECT, this.doTabMapA);
                    this.tabControllerBq5.addEventListener(TSelectEvent_21.TSelectEvent.WOZTABSELECT, this.doTabMapB);
                    this.tabControllerAq5.addEventListener("Done", this.questionFinishedA);
                    this.tabControllerBq5.addEventListener("Done", this.questionFinishedB);
                }
                questionFinishedA(evt) {
                    CUtil_65.CUtil.trace("#### QuestionA finished");
                    this.fCompleteA = true;
                    if (this.fCompleteB) {
                        this.fComplete = true;
                        this.updateNav();
                    }
                }
                questionFinishedB(evt) {
                    CUtil_65.CUtil.trace("#### QuestionB finished");
                    this.fCompleteB = true;
                    if (this.fCompleteA) {
                        this.fComplete = true;
                        this.updateNav();
                    }
                }
                captureLogState(obj = null) {
                    obj = super.captureLogState(obj);
                    obj['scene'] = this.name;
                    obj['Controller1'] = this.tabControllerAq5.captureLogState();
                    obj['Controller2'] = this.tabControllerBq5.captureLogState();
                    return obj;
                }
                captureXMLState() {
                    var sceneState = {};
                    sceneState.appendChild(this.tabControllerAq5.captureXMLState());
                    sceneState.appendChild(this.tabControllerBq5.captureXMLState());
                    return sceneState;
                }
                restoreXMLState(xmlState) {
                    this.tabControllerAq5.restoreXMLState(xmlState.controller[0]);
                    this.tabControllerBq5.restoreXMLState(xmlState.controller[1]);
                }
                compareXMLState(xmlState) {
                    var bTest = true;
                    if (!this.tabControllerAq5.compareXMLState(xmlState.controller[0]) ||
                        !this.tabControllerBq5.compareXMLState(xmlState.controller[1]))
                        bTest = false;
                    return bTest;
                }
                preExitScene(Direction, sceneCurr) {
                    CUtil_65.CUtil.trace("TQ5BPart1B Enter Scene Behavior:");
                    this.assertGlobal('q5CVS', this.encodeExptString("room lighting", "this.sel1", "this.sel2", "this.sel3"));
                    return ("OK");
                }
            };
            exports_73("TQ5BPart1B", TQ5BPart1B);
        }
    };
});
System.register("sceneExt/TQ5BPart2", ["sceneExt/TExpSceneTyp1", "thermite/events/TTextEvent", "util/CUtil"], function (exports_74, context_74) {
    "use strict";
    var __moduleName = context_74 && context_74.id;
    var TExpSceneTyp1_18, TTextEvent_10, CUtil_66, TQ5BPart2;
    return {
        setters: [
            function (TExpSceneTyp1_18_1) {
                TExpSceneTyp1_18 = TExpSceneTyp1_18_1;
            },
            function (TTextEvent_10_1) {
                TTextEvent_10 = TTextEvent_10_1;
            },
            function (CUtil_66_1) {
                CUtil_66 = CUtil_66_1;
            }
        ],
        execute: function () {
            TQ5BPart2 = class TQ5BPart2 extends TExpSceneTyp1_18.TExpSceneTyp1 {
                constructor() {
                    super();
                    this.fStateCap = false;
                    this.expState = {};
                    CUtil_66.CUtil.trace("TQ5BPart2:Constructor");
                    this.selOneA = "lightBright";
                    this.selOneB = "lightDim";
                    this.selTwoA = "cardIcons";
                    this.selTwoB = "cardWords";
                    this.selThreeA = "minutesOne";
                    this.selThreeB = "minutesFive";
                    this.imgTool1 = "imgToolAq5";
                    this.imgTool2 = "imgToolBq5";
                    this.tabController1 = "tabControllerAq5";
                    this.tabController2 = "tabControllerBq5";
                    this.imgToolAq5.enableTool(false);
                    this.imgToolBq5.enableTool(false);
                    this.tabControllerAq5.enableTool(false);
                    this.tabControllerBq5.enableTool(false);
                    this.q5TextControl1.StxtField.addEventListener(TTextEvent_10.TTextEvent.CHANGE, this.questionFinished);
                }
                questionFinished(evt) {
                    if (this.q5TextControl1.hasMinWords(2, 9))
                        this.fComplete = true;
                    else
                        this.fComplete = false;
                    this.updateNav();
                }
                preEnterScene(lTutor, sceneLabel, sceneTitle, scenePage, Direction) {
                    CUtil_66.CUtil.trace("TQ5BPart2 Pre-Enter Scene Behavior: " + sceneTitle);
                    if (this.fStateCap) {
                        if (!this.tutorAutoObj["Sq5p1b" + this.sType].compareXMLState(this.expState)) {
                            CUtil_66.CUtil.trace("State Changed: clearing text");
                            this.tutorAutoObj["Sq5p1b" + this.sType].q5TextControl1.wozClear();
                            this.fComplete = false;
                            this.expState = this.tutorAutoObj["Sq5p1b" + this.sType].captureXMLState();
                        }
                    }
                    else {
                        this.expState = this.tutorAutoObj["Sq5p1b" + this.sType].captureXMLState();
                        this.fStateCap = true;
                    }
                    return super.preEnterScene(lTutor, sceneLabel, sceneTitle, scenePage, Direction);
                }
                onEnterScene(Direction) {
                    CUtil_66.CUtil.trace("TQ5BPart2 Enter Scene Behavior:");
                    this.q5TextControl1.setFocus(true);
                }
                preExitScene(Direction, sceneCurr) {
                    CUtil_66.CUtil.trace("TQ5BPart2 Enter Scene Behavior:");
                    return ("OK");
                }
            };
            exports_74("TQ5BPart2", TQ5BPart2);
        }
    };
});
System.register("sceneExt/TQ6APart1", ["sceneExt/TExpSceneTyp1", "util/CUtil", "thermite/events/TMouseEvent"], function (exports_75, context_75) {
    "use strict";
    var __moduleName = context_75 && context_75.id;
    var TExpSceneTyp1_19, CUtil_67, TMouseEvent_21, TQ6APart1;
    return {
        setters: [
            function (TExpSceneTyp1_19_1) {
                TExpSceneTyp1_19 = TExpSceneTyp1_19_1;
            },
            function (CUtil_67_1) {
                CUtil_67 = CUtil_67_1;
            },
            function (TMouseEvent_21_1) {
                TMouseEvent_21 = TMouseEvent_21_1;
            }
        ],
        execute: function () {
            TQ6APart1 = class TQ6APart1 extends TExpSceneTyp1_19.TExpSceneTyp1 {
                constructor() {
                    super();
                    CUtil_67.CUtil.trace("TQ6APart1:Constructor");
                    this.selOneA = "studyAlone";
                    this.selOneB = "studyFriend";
                    this.selTwoA = "atHome";
                    this.selTwoB = "atLibrary";
                    this.selThreeA = "drinkWater";
                    this.selThreeB = "drinkSoda";
                    this.imgTool1 = "imgToolCq6";
                    this.imgTool2 = "imgToolDq6";
                    this.tabController1 = "tabControllerCq6";
                    this.tabController2 = "tabControllerDq6";
                    this.imgToolCq6.enableTool(false);
                    this.imgToolDq6.enableTool(false);
                    this.tabControllerCq6.enableTool(false);
                    this.tabControllerDq6.enableTool(false);
                    this.imgToolCq6["studyAlone"].visible = true;
                    this.imgToolCq6["atLibrary"].visible = true;
                    this.imgToolCq6["drinkWater"].visible = true;
                    this.imgToolDq6["studyAlone"].visible = true;
                    this.imgToolDq6["atLibrary"].visible = true;
                    this.imgToolDq6["drinkWater"].visible = true;
                    this.tabControllerCq6.this.sel1 = "Sitem1";
                    this.tabControllerCq6.this.StopButton.SsubLabel.text = "Alone";
                    this.tabControllerCq6.this.StopButton.SsubLabel.visible = true;
                    this.tabControllerCq6.this.sel2 = "Sitem2";
                    this.tabControllerCq6.this.ScenterButton.SsubLabel.text = "Library";
                    this.tabControllerCq6.this.ScenterButton.SsubLabel.visible = true;
                    this.tabControllerCq6.this.sel3 = "Sitem1";
                    this.tabControllerCq6.this.SbottomButton.SsubLabel.text = "Water";
                    this.tabControllerCq6.this.SbottomButton.SsubLabel.visible = true;
                    this.tabControllerDq6.this.sel1 = "Sitem1";
                    this.tabControllerDq6.this.StopButton.SsubLabel.text = "Alone";
                    this.tabControllerDq6.this.StopButton.SsubLabel.visible = true;
                    this.tabControllerDq6.this.sel2 = "Sitem2";
                    this.tabControllerDq6.this.ScenterButton.SsubLabel.text = "Library";
                    this.tabControllerDq6.this.ScenterButton.SsubLabel.visible = true;
                    this.tabControllerDq6.this.sel3 = "Sitem1";
                    this.tabControllerDq6.this.SbottomButton.SsubLabel.text = "Water";
                    this.tabControllerDq6.this.SbottomButton.SsubLabel.visible = true;
                    this.q6Check2.setLabel("Bad Way");
                    this.q6Check1.addEventListener(TMouseEvent_21.TMouseEvent.WOZCLICK, this.check1Clicked);
                    this.q6Check2.addEventListener(TMouseEvent_21.TMouseEvent.WOZCLICK, this.check2Clicked);
                }
                check1Clicked(evt) {
                    var logData = { 'action': 'check1Clicked', 'targetid': name, 'label': 'Good Way', 'state': this.q6Check1.getChecked() };
                    this.tutorDoc.log.logActionEvent(logData);
                    this.questionFinished(evt);
                }
                check2Clicked(evt) {
                    var logData = { 'action': 'check2Clicked', 'targetid': name, 'label': 'Bad Way', 'state': this.q6Check2.getChecked() };
                    this.tutorDoc.log.logActionEvent(logData);
                    this.questionFinished(evt);
                }
                questionFinished(evt) {
                    if (this.q6Check1.getChecked() || this.q6Check2.getChecked())
                        this.fComplete = true;
                    else
                        this.fComplete = false;
                    this.updateNav();
                }
                captureLogState(obj = null) {
                    obj = super.captureLogState(obj);
                    obj['scene'] = this.name;
                    obj['Check1'] = this.q6Check1.captureLogState();
                    obj['Check2'] = this.q6Check2.captureLogState();
                    return obj;
                }
                captureXMLState() {
                    var sceneState = {};
                    sceneState.appendChild(this.q6Check1.captureXMLState());
                    sceneState.appendChild(this.q6Check2.captureXMLState());
                    return sceneState;
                }
                restoreXMLState(xmlState) {
                    this.q6Check1.restoreXMLState(xmlState.button[0]);
                    this.q6Check2.restoreXMLState(xmlState.button[1]);
                }
                compareXMLState(xmlState) {
                    var bTest = true;
                    if (!this.q6Check1.compareXMLState(xmlState.button[0]) ||
                        !this.q6Check2.compareXMLState(xmlState.button[1]))
                        bTest = false;
                    return bTest;
                }
                preExitScene(Direction, sceneCurr) {
                    CUtil_67.CUtil.trace("TQ6APart1 Enter Scene Behavior:");
                    this.assertGlobal('q6Good', this.q6Check1.captureLOGString);
                    this.assertGlobal('q6Bad', this.q6Check2.captureLOGString);
                    return ("OK");
                }
            };
            exports_75("TQ6APart1", TQ6APart1);
        }
    };
});
System.register("sceneExt/TQ6APart2", ["sceneExt/TExpSceneTyp1", "thermite/events/TTextEvent", "util/CUtil"], function (exports_76, context_76) {
    "use strict";
    var __moduleName = context_76 && context_76.id;
    var TExpSceneTyp1_20, TTextEvent_11, CUtil_68, TQ6APart2;
    return {
        setters: [
            function (TExpSceneTyp1_20_1) {
                TExpSceneTyp1_20 = TExpSceneTyp1_20_1;
            },
            function (TTextEvent_11_1) {
                TTextEvent_11 = TTextEvent_11_1;
            },
            function (CUtil_68_1) {
                CUtil_68 = CUtil_68_1;
            }
        ],
        execute: function () {
            TQ6APart2 = class TQ6APart2 extends TExpSceneTyp1_20.TExpSceneTyp1 {
                constructor() {
                    super();
                    this.fStateCap = false;
                    CUtil_68.CUtil.trace("TQ6APart2:Constructor");
                    this.selOneA = "studyAlone";
                    this.selOneB = "studyFriend";
                    this.selTwoA = "atHome";
                    this.selTwoB = "atLibrary";
                    this.selThreeA = "drinkWater";
                    this.selThreeB = "drinkSoda";
                    this.imgTool1 = "imgToolCq6";
                    this.imgTool2 = "imgToolDq6";
                    this.tabController1 = "tabControllerCq6";
                    this.tabController2 = "tabControllerDq6";
                    this.imgToolCq6.enableTool(false);
                    this.tabControllerCq6.enableTool(false);
                    this.imgToolDq6.enableTool(false);
                    this.tabControllerDq6.enableTool(false);
                    this.q6Check1.enableButton(false);
                    this.q6Check2.enableButton(false);
                    this.q6Check2.setLabel("Bad Way");
                    this.q6TextControl1.StxtField.addEventListener(TTextEvent_11.TTextEvent.CHANGE, this.questionFinished);
                }
                checkChange(evt) {
                    this.q6TextControl1.wozClear();
                    this.updateQText(this);
                    this.fComplete = false;
                    this.updateNav();
                }
                questionFinished(evt) {
                    if ((this.q6Check1.getChecked() || this.q6Check2.getChecked()) && this.q6TextControl1.hasMinWords(2, 9))
                        this.fComplete = true;
                    else
                        this.fComplete = false;
                    this.updateNav();
                }
                updateQText(wozScene) {
                    if (wozScene["q6Check1"].getChecked()) {
                        if (wozScene["q6Check2"].getChecked()) {
                            this.q6Title4.Slabel.text = "You said the pictures above show a good and bad way to find out";
                            this.q6Title7.Slabel.text = "Briefly explain why you think this is a good and bad way.";
                        }
                        else {
                            this.q6Title4.Slabel.text = "You said the pictures above show a good way to find out";
                            this.q6Title7.Slabel.text = "Briefly explain why you think this is a good way.";
                        }
                    }
                    else if (wozScene["q6Check2"].getChecked()) {
                        this.q6Title4.Slabel.text = "You said the pictures above show a bad way to find out";
                        this.q6Title7.Slabel.text = "Briefly explain why you think this is a bad way.";
                    }
                }
                preEnterScene(lTutor, sceneLabel, sceneTitle, scenePage, Direction) {
                    CUtil_68.CUtil.trace("TQ6APart2 Pre-Enter Scene Behavior: " + sceneTitle);
                    if (this.fStateCap) {
                        if (!this.tutorAutoObj["Sq6p1" + this.sType].compareXMLState(this.sceneState)) {
                            CUtil_68.CUtil.trace("State Changed: clearing text");
                            this.tutorAutoObj["Sq6p1" + this.sType].q6TextControl1.wozClear();
                            this.tutorAutoObj["Sq6p2" + this.sType].q6TextControl1.wozClear();
                            this.fComplete = false;
                            try {
                                this.tutorAutoObj["Sq6p3" + this.sType].this.fStateCapC = false;
                                this.tutorAutoObj["Sq6p3" + this.sType].this.fStateCapD = false;
                            }
                            catch (err) {
                            }
                            this.sceneState = this.tutorAutoObj["Sq6p1" + this.sType].captureXMLState();
                        }
                    }
                    else {
                        this.sceneState = this.tutorAutoObj["Sq6p1" + this.sType].captureXMLState();
                        this.fStateCap = true;
                    }
                    this.updateQText(this.tutorAutoObj["Sq6p1" + this.sType]);
                    return super.preEnterScene(lTutor, sceneLabel, sceneTitle, scenePage, Direction);
                }
                onEnterScene(Direction) {
                    CUtil_68.CUtil.trace("TQ6APart2 Enter Scene Behavior:");
                    this.q6TextControl1.setFocus(true);
                }
                preExitScene(Direction, sceneCurr) {
                    CUtil_68.CUtil.trace("TQ6APart2 Enter Scene Behavior:");
                    return ("OK");
                }
            };
            exports_76("TQ6APart2", TQ6APart2);
        }
    };
});
System.register("sceneExt/TQ6APart3", ["sceneExt/TExpSceneTyp1", "util/CUtil", "com/events/TSelectEvent"], function (exports_77, context_77) {
    "use strict";
    var __moduleName = context_77 && context_77.id;
    var TExpSceneTyp1_21, CUtil_69, TSelectEvent_22, TQ6APart3;
    return {
        setters: [
            function (TExpSceneTyp1_21_1) {
                TExpSceneTyp1_21 = TExpSceneTyp1_21_1;
            },
            function (CUtil_69_1) {
                CUtil_69 = CUtil_69_1;
            },
            function (TSelectEvent_22_1) {
                TSelectEvent_22 = TSelectEvent_22_1;
            }
        ],
        execute: function () {
            TQ6APart3 = class TQ6APart3 extends TExpSceneTyp1_21.TExpSceneTyp1 {
                constructor() {
                    super();
                    this.fStateCapC = false;
                    this.fStateCapD = false;
                    CUtil_69.CUtil.trace("TQ6APart3:Constructor");
                    this.selOneA = "studyAlone";
                    this.selOneB = "studyFriend";
                    this.selTwoA = "atHome";
                    this.selTwoB = "atLibrary";
                    this.selThreeA = "drinkWater";
                    this.selThreeB = "drinkSoda";
                    this.imgTool1 = "imgToolCq6";
                    this.imgTool2 = "imgToolDq6";
                    this.tabController1 = "tabControllerCq6";
                    this.tabController2 = "tabControllerDq6";
                    this.imgToolCq6.tweenID = 2;
                    this.imgToolDq6.tweenID = 2;
                    this.tabControllerCq6.tweenID = 2;
                    this.tabControllerDq6.tweenID = 2;
                    this.tabControllerCq6.this.useChanged = true;
                    this.tabControllerDq6.this.useChanged = true;
                    this.imgToolCq6.addEventListener(TSelectEvent_22.TSelectEvent.WOZIMGSELECT, this.doImageMapA);
                    this.imgToolDq6.addEventListener(TSelectEvent_22.TSelectEvent.WOZIMGSELECT, this.doImageMapB);
                    this.tabControllerCq6.addEventListener(TSelectEvent_22.TSelectEvent.WOZTABSELECT, this.doTabMapA);
                    this.tabControllerDq6.addEventListener(TSelectEvent_22.TSelectEvent.WOZTABSELECT, this.doTabMapB);
                    this.tabControllerCq6.addEventListener("Done", this.questionFinished);
                    this.tabControllerDq6.addEventListener("Done", this.questionFinished);
                }
                questionFinished(evt) {
                }
                updateNavigation(fFinished) {
                    this.fComplete = fFinished;
                    this.updateNav();
                }
                setLabels() {
                    var fChanged = false;
                    if (!this.tabControllerCq6.compareXMLState(this.expStateC)) {
                        this.q6FrameC.Slabel.text = "C - Changed";
                        fChanged = true;
                    }
                    else
                        this.q6FrameC.Slabel.text = "C";
                    if (!this.tabControllerDq6.compareXMLState(this.expStateD)) {
                        this.q6FrameD.Slabel.text = "D - Changed";
                        fChanged = true;
                    }
                    else
                        this.q6FrameD.Slabel.text = "D";
                    this.updateNavigation(fChanged);
                }
                doTabMapA(evt) {
                    CUtil_69.CUtil.trace(" this.doTabMap: " + evt.selection);
                    this.setLabels();
                    super.doTabMapA(evt);
                }
                doTabMapB(evt) {
                    CUtil_69.CUtil.trace(" this.doTabMap: " + evt.selection);
                    this.setLabels();
                    super.doTabMapB(evt);
                }
                preEnterScene(lTutor, sceneLabel, sceneTitle, scenePage, Direction) {
                    CUtil_69.CUtil.trace("TQ6APart3 Pre-Enter Scene Behavior: " + sceneTitle);
                    if (!this.tutorAutoObj["Sq6p2" + this.sType].q6Check2.getChecked()) {
                        super.preEnterScene(lTutor, sceneLabel, sceneTitle, scenePage, Direction);
                        return Direction;
                    }
                    if (!this.fStateCapC) {
                        this.expStateC = this.tutorAutoObj["Sq6p2" + this.sType].tabControllerCq6.captureXMLState();
                        this.imgStateC = this.tutorAutoObj["Sq6p2" + this.sType].imgToolCq6.captureXMLState();
                        this.tabControllerCq6.restoreXMLState(this.expStateC);
                        this.imgToolCq6.restoreXMLState(this.imgStateC);
                        this.fStateCapC = true;
                    }
                    if (!this.fStateCapD) {
                        this.expStateD = this.tutorAutoObj["Sq6p2" + this.sType].tabControllerDq6.captureXMLState();
                        this.imgStateD = this.tutorAutoObj["Sq6p2" + this.sType].imgToolDq6.captureXMLState();
                        this.tabControllerDq6.restoreXMLState(this.expStateD);
                        this.imgToolDq6.restoreXMLState(this.imgStateD);
                        this.fStateCapD = true;
                    }
                    this.setLabels();
                    this.updateNavigation(this.fComplete);
                    return super.preEnterScene(lTutor, sceneLabel, sceneTitle, scenePage, Direction);
                }
                preExitScene(Direction, sceneCurr) {
                    CUtil_69.CUtil.trace("TQ6APart3 Enter Scene Behavior:");
                    this.assertGlobal('q6CVS', this.encodeExptString("who", "this.sel1", "this.sel2", "this.sel3"));
                    return ("OK");
                }
            };
            exports_77("TQ6APart3", TQ6APart3);
        }
    };
});
System.register("sceneExt/TQ6BPart1", ["sceneExt/TExpSceneTyp1", "thermite/events/TMouseEvent", "util/CUtil"], function (exports_78, context_78) {
    "use strict";
    var __moduleName = context_78 && context_78.id;
    var TExpSceneTyp1_22, TMouseEvent_22, CUtil_70, TQ6BPart1;
    return {
        setters: [
            function (TExpSceneTyp1_22_1) {
                TExpSceneTyp1_22 = TExpSceneTyp1_22_1;
            },
            function (TMouseEvent_22_1) {
                TMouseEvent_22 = TMouseEvent_22_1;
            },
            function (CUtil_70_1) {
                CUtil_70 = CUtil_70_1;
            }
        ],
        execute: function () {
            TQ6BPart1 = class TQ6BPart1 extends TExpSceneTyp1_22.TExpSceneTyp1 {
                constructor() {
                    super();
                    CUtil_70.CUtil.trace("TQ6BPart1:Constructor");
                    this.selOneA = "lightBright";
                    this.selOneB = "lightDim";
                    this.selTwoA = "cardIcons";
                    this.selTwoB = "cardWords";
                    this.selThreeA = "minutesOne";
                    this.selThreeB = "minutesFive";
                    this.imgTool1 = "imgToolCq6";
                    this.imgTool2 = "imgToolDq6";
                    this.tabController1 = "tabControllerCq6";
                    this.tabController2 = "tabControllerDq6";
                    this.imgToolCq6.enableTool(false);
                    this.imgToolDq6.enableTool(false);
                    this.tabControllerCq6.enableTool(false);
                    this.tabControllerDq6.enableTool(false);
                    this.imgToolCq6["lightBright"].visible = true;
                    this.imgToolCq6["cardIcons"].visible = true;
                    this.imgToolCq6["minutesFive"].visible = true;
                    this.imgToolDq6["lightBright"].visible = true;
                    this.imgToolDq6["cardIcons"].visible = true;
                    this.imgToolDq6["minutesFive"].visible = true;
                    this.imgToolCq6.manageMasks("lightBright");
                    this.imgToolCq6.manageMasks("cardIcons");
                    this.imgToolCq6.manageMasks("minutesFive");
                    this.imgToolDq6.manageMasks("lightBright");
                    this.imgToolDq6.manageMasks("cardIcons");
                    this.imgToolDq6.manageMasks("minutesFive");
                    this.tabControllerCq6.this.sel1 = "Sitem1";
                    this.tabControllerCq6.this.StopButton.SsubLabel.text = "Bright";
                    this.tabControllerCq6.this.StopButton.SsubLabel.visible = true;
                    this.tabControllerCq6.this.sel2 = "Sitem1";
                    this.tabControllerCq6.this.ScenterButton.SsubLabel.text = "10 Pictures";
                    this.tabControllerCq6.this.ScenterButton.SsubLabel.visible = true;
                    this.tabControllerCq6.this.sel3 = "Sitem2";
                    this.tabControllerCq6.this.SbottomButton.SsubLabel.text = "45 Seconds";
                    this.tabControllerCq6.this.SbottomButton.SsubLabel.visible = true;
                    this.tabControllerDq6.this.sel1 = "Sitem1";
                    this.tabControllerDq6.this.StopButton.SsubLabel.text = "Bright";
                    this.tabControllerDq6.this.StopButton.SsubLabel.visible = true;
                    this.tabControllerDq6.this.sel2 = "Sitem1";
                    this.tabControllerDq6.this.ScenterButton.SsubLabel.text = "10 Pictures";
                    this.tabControllerDq6.this.ScenterButton.SsubLabel.visible = true;
                    this.tabControllerDq6.this.sel3 = "Sitem2";
                    this.tabControllerDq6.this.SbottomButton.SsubLabel.text = "45 Seconds";
                    this.tabControllerDq6.this.SbottomButton.SsubLabel.visible = true;
                    this.q6Check2.setLabel("Bad Way");
                    this.q6Check1.addEventListener(TMouseEvent_22.TMouseEvent.WOZCLICK, this.check1Clicked);
                    this.q6Check2.addEventListener(TMouseEvent_22.TMouseEvent.WOZCLICK, this.check2Clicked);
                }
                check1Clicked(evt) {
                    var logData = { 'action': 'check1Clicked', 'targetid': name, 'label': 'Good Way', 'state': this.q6Check1.getChecked() };
                    this.tutorDoc.log.logActionEvent(logData);
                    this.questionFinished(evt);
                }
                check2Clicked(evt) {
                    var logData = { 'action': 'check2Clicked', 'targetid': name, 'label': 'Bad Way', 'state': this.q6Check2.getChecked() };
                    this.tutorDoc.log.logActionEvent(logData);
                    this.questionFinished(evt);
                }
                questionFinished(evt) {
                    if (this.q6Check1.getChecked() || this.q6Check2.getChecked())
                        this.fComplete = true;
                    else
                        this.fComplete = false;
                    this.updateNav();
                }
                captureLogState(obj = null) {
                    obj = super.captureLogState(obj);
                    obj['scene'] = this.name;
                    obj['Check1'] = this.q6Check1.captureLogState();
                    obj['Check2'] = this.q6Check2.captureLogState();
                    return obj;
                }
                captureXMLState() {
                    var sceneState = {};
                    sceneState.appendChild(this.q6Check1.captureXMLState());
                    sceneState.appendChild(this.q6Check2.captureXMLState());
                    return sceneState;
                }
                restoreXMLState(xmlState) {
                    this.q6Check1.restoreXMLState(xmlState.button[0]);
                    this.q6Check2.restoreXMLState(xmlState.button[1]);
                }
                compareXMLState(xmlState) {
                    var bTest = true;
                    if (!this.q6Check1.compareXMLState(xmlState.button[0]) ||
                        !this.q6Check2.compareXMLState(xmlState.button[1]))
                        bTest = false;
                    return bTest;
                }
                preExitScene(Direction, sceneCurr) {
                    CUtil_70.CUtil.trace("TQ6BPart1 Enter Scene Behavior:");
                    this.assertGlobal('q6Good', this.q6Check1.captureLOGString);
                    this.assertGlobal('q6Bad', this.q6Check2.captureLOGString);
                    return ("OK");
                }
            };
            exports_78("TQ6BPart1", TQ6BPart1);
        }
    };
});
System.register("sceneExt/TQ6BPart2", ["sceneExt/TExpSceneTyp1", "thermite/events/TTextEvent", "util/CUtil"], function (exports_79, context_79) {
    "use strict";
    var __moduleName = context_79 && context_79.id;
    var TExpSceneTyp1_23, TTextEvent_12, CUtil_71, TQ6BPart2;
    return {
        setters: [
            function (TExpSceneTyp1_23_1) {
                TExpSceneTyp1_23 = TExpSceneTyp1_23_1;
            },
            function (TTextEvent_12_1) {
                TTextEvent_12 = TTextEvent_12_1;
            },
            function (CUtil_71_1) {
                CUtil_71 = CUtil_71_1;
            }
        ],
        execute: function () {
            TQ6BPart2 = class TQ6BPart2 extends TExpSceneTyp1_23.TExpSceneTyp1 {
                constructor() {
                    super();
                    this.fStateCap = false;
                    CUtil_71.CUtil.trace("TQ6BPart2:Constructor");
                    this.selOneA = "lightBright";
                    this.selOneB = "lightDim";
                    this.selTwoA = "cardIcons";
                    this.selTwoB = "cardWords";
                    this.selThreeA = "minutesOne";
                    this.selThreeB = "minutesFive";
                    this.imgTool1 = "imgToolCq6";
                    this.imgTool2 = "imgToolDq6";
                    this.tabController1 = "tabControllerCq6";
                    this.tabController2 = "tabControllerDq6";
                    this.imgToolCq6.enableTool(false);
                    this.tabControllerCq6.enableTool(false);
                    this.imgToolDq6.enableTool(false);
                    this.tabControllerDq6.enableTool(false);
                    this.q6Check1.enableButton(false);
                    this.q6Check2.enableButton(false);
                    this.q6Check2.setLabel("Bad Way");
                    this.q6TextControl1.StxtField.addEventListener(TTextEvent_12.TTextEvent.CHANGE, this.questionFinished);
                }
                checkChange(evt) {
                    this.q6TextControl1.wozClear();
                    this.updateQText(this);
                    this.fComplete = false;
                    this.updateNav();
                }
                questionFinished(evt) {
                    if ((this.q6Check1.getChecked() || this.q6Check2.getChecked()) && this.q6TextControl1.hasMinWords(2, 9))
                        this.fComplete = true;
                    else
                        this.fComplete = false;
                    this.updateNav();
                }
                updateQText(wozScene) {
                    if (wozScene["q6Check1"].getChecked()) {
                        if (wozScene["q6Check2"].getChecked()) {
                            this.q6Title4.Slabel.text = "You said the pictures above show a good and bad way to find out";
                            this.q6Title7.Slabel.text = "Briefly explain why you think this is a good and bad way.";
                        }
                        else {
                            this.q6Title4.Slabel.text = "You said the pictures above show a good way to find out";
                            this.q6Title7.Slabel.text = "Briefly explain why you think this is a good way.";
                        }
                    }
                    else if (wozScene["q6Check2"].getChecked()) {
                        this.q6Title4.Slabel.text = "You said the pictures above show a bad way to find out";
                        this.q6Title7.Slabel.text = "Briefly explain why you think this is a bad way.";
                    }
                }
                preEnterScene(lTutor, sceneLabel, sceneTitle, scenePage, Direction) {
                    CUtil_71.CUtil.trace("TQ6BPart2 Pre-Enter Scene Behavior: " + sceneTitle);
                    if (this.fStateCap) {
                        if (!this.tutorAutoObj["Sq6p1" + this.sType].compareXMLState(this.sceneState)) {
                            CUtil_71.CUtil.trace("State Changed: clearing text");
                            this.tutorAutoObj["Sq6p1" + this.sType].q6TextControl1.wozClear();
                            this.tutorAutoObj["Sq6p2" + this.sType].q6TextControl1.wozClear();
                            this.fComplete = false;
                            try {
                                this.tutorAutoObj["Sq6p3" + this.sType].this.fStateCapC = false;
                                this.tutorAutoObj["Sq6p3" + this.sType].this.fStateCapD = false;
                            }
                            catch (err) {
                            }
                            this.sceneState = this.tutorAutoObj["Sq6p1" + this.sType].captureXMLState();
                        }
                    }
                    else {
                        this.sceneState = this.tutorAutoObj["Sq6p1" + this.sType].captureXMLState();
                        this.fStateCap = true;
                    }
                    this.updateQText(this.tutorAutoObj["Sq6p1" + this.sType]);
                    return super.preEnterScene(lTutor, sceneLabel, sceneTitle, scenePage, Direction);
                }
                onEnterScene(Direction) {
                    CUtil_71.CUtil.trace("TQ6BPart2 Enter Scene Behavior:");
                    this.q6TextControl1.setFocus(true);
                }
                preExitScene(Direction, sceneCurr) {
                    CUtil_71.CUtil.trace("TQ6BPart2 Enter Scene Behavior:");
                    return ("OK");
                }
            };
            exports_79("TQ6BPart2", TQ6BPart2);
        }
    };
});
System.register("sceneExt/TQ6BPart3", ["sceneExt/TExpSceneTyp1", "util/CUtil", "com/events/TSelectEvent"], function (exports_80, context_80) {
    "use strict";
    var __moduleName = context_80 && context_80.id;
    var TExpSceneTyp1_24, CUtil_72, TSelectEvent_23, TQ6BPart3;
    return {
        setters: [
            function (TExpSceneTyp1_24_1) {
                TExpSceneTyp1_24 = TExpSceneTyp1_24_1;
            },
            function (CUtil_72_1) {
                CUtil_72 = CUtil_72_1;
            },
            function (TSelectEvent_23_1) {
                TSelectEvent_23 = TSelectEvent_23_1;
            }
        ],
        execute: function () {
            TQ6BPart3 = class TQ6BPart3 extends TExpSceneTyp1_24.TExpSceneTyp1 {
                constructor() {
                    super();
                    this.fStateCapC = false;
                    this.fStateCapD = false;
                    CUtil_72.CUtil.trace("TQ6BPart3:Constructor");
                    this.selOneA = "lightBright";
                    this.selOneB = "lightDim";
                    this.selTwoA = "cardIcons";
                    this.selTwoB = "cardWords";
                    this.selThreeA = "minutesOne";
                    this.selThreeB = "minutesFive";
                    this.imgTool1 = "imgToolCq6";
                    this.imgTool2 = "imgToolDq6";
                    this.tabController1 = "tabControllerCq6";
                    this.tabController2 = "tabControllerDq6";
                    this.imgToolCq6.tweenID = 2;
                    this.imgToolDq6.tweenID = 2;
                    this.tabControllerCq6.tweenID = 2;
                    this.tabControllerDq6.tweenID = 2;
                    this.tabControllerCq6.this.useChanged = true;
                    this.tabControllerDq6.this.useChanged = true;
                    this.imgToolCq6.addEventListener(TSelectEvent_23.TSelectEvent.WOZIMGSELECT, this.doImageMapA);
                    this.imgToolDq6.addEventListener(TSelectEvent_23.TSelectEvent.WOZIMGSELECT, this.doImageMapB);
                    this.tabControllerCq6.addEventListener(TSelectEvent_23.TSelectEvent.WOZTABSELECT, this.doTabMapA);
                    this.tabControllerDq6.addEventListener(TSelectEvent_23.TSelectEvent.WOZTABSELECT, this.doTabMapB);
                    this.tabControllerCq6.addEventListener("Done", this.questionFinished);
                    this.tabControllerDq6.addEventListener("Done", this.questionFinished);
                }
                questionFinished(evt) {
                }
                updateNavigation(fFinished) {
                    this.fComplete = fFinished;
                    this.updateNav();
                }
                setLabels() {
                    var fChanged = false;
                    if (!this.tabControllerCq6.compareXMLState(this.expStateC)) {
                        this.q6FrameC.Slabel.text = "C - Changed";
                        fChanged = true;
                    }
                    else
                        this.q6FrameC.Slabel.text = "C";
                    if (!this.tabControllerDq6.compareXMLState(this.expStateD)) {
                        this.q6FrameD.Slabel.text = "D - Changed";
                        fChanged = true;
                    }
                    else
                        this.q6FrameD.Slabel.text = "D";
                    this.updateNavigation(fChanged);
                }
                doTabMapA(evt) {
                    CUtil_72.CUtil.trace(" this.doTabMap: " + evt.selection);
                    this.setLabels();
                    super.doTabMapA(evt);
                }
                doTabMapB(evt) {
                    CUtil_72.CUtil.trace(" this.doTabMap: " + evt.selection);
                    this.setLabels();
                    super.doTabMapB(evt);
                }
                preEnterScene(lTutor, sceneLabel, sceneTitle, scenePage, Direction) {
                    CUtil_72.CUtil.trace("TQ6BPart3 Pre-Enter Scene Behavior: " + sceneTitle);
                    if (!this.tutorAutoObj["Sq6p2" + this.sType].q6Check2.getChecked()) {
                        super.preEnterScene(lTutor, sceneLabel, sceneTitle, scenePage, Direction);
                        return Direction;
                    }
                    if (!this.fStateCapC) {
                        this.imgToolCq6.manageMasks("lightBright");
                        this.imgToolCq6.manageMasks("cardIcons");
                        this.imgToolCq6.manageMasks("minutesFive");
                        this.expStateC = this.tutorAutoObj["Sq6p2" + this.sType].tabControllerCq6.captureXMLState();
                        this.imgStateC = this.tutorAutoObj["Sq6p2" + this.sType].imgToolCq6.captureXMLState();
                        this.tabControllerCq6.restoreXMLState(this.expStateC);
                        this.imgToolCq6.restoreXMLState(this.imgStateC);
                        this.fStateCapC = true;
                    }
                    if (!this.fStateCapD) {
                        this.imgToolDq6.manageMasks("lightBright");
                        this.imgToolDq6.manageMasks("cardIcons");
                        this.imgToolDq6.manageMasks("minutesFive");
                        this.expStateD = this.tutorAutoObj["Sq6p2" + this.sType].tabControllerDq6.captureXMLState();
                        this.imgStateD = this.tutorAutoObj["Sq6p2" + this.sType].imgToolDq6.captureXMLState();
                        this.tabControllerDq6.restoreXMLState(this.expStateD);
                        this.imgToolDq6.restoreXMLState(this.imgStateD);
                        this.fStateCapD = true;
                    }
                    this.setLabels();
                    this.updateNavigation(this.fComplete);
                    return super.preEnterScene(lTutor, sceneLabel, sceneTitle, scenePage, Direction);
                }
                preExitScene(Direction, sceneCurr) {
                    CUtil_72.CUtil.trace("TQ6BPart3 Enter Scene Behavior:");
                    this.assertGlobal('q6CVS', this.encodeExptString("type of card", "this.sel2", "this.sel1", "this.sel3"));
                    return ("OK");
                }
            };
            exports_80("TQ6BPart3", TQ6BPart3);
        }
    };
});
System.register("sceneExt/TQSplash", ["thermite/TScene", "util/CUtil", "com/events/TNavEvent", "core/CEFTimer"], function (exports_81, context_81) {
    "use strict";
    var __moduleName = context_81 && context_81.id;
    var TScene_11, CUtil_73, TNavEvent_8, CEFTimer_1, TQSplash;
    return {
        setters: [
            function (TScene_11_1) {
                TScene_11 = TScene_11_1;
            },
            function (CUtil_73_1) {
                CUtil_73 = CUtil_73_1;
            },
            function (TNavEvent_8_1) {
                TNavEvent_8 = TNavEvent_8_1;
            },
            function (CEFTimer_1_1) {
                CEFTimer_1 = CEFTimer_1_1;
            }
        ],
        execute: function () {
            TQSplash = class TQSplash extends TScene_11.TScene {
                constructor() {
                    super();
                    CUtil_73.CUtil.trace("TQSplash:Constructor");
                }
                timerHandler(event) {
                    CUtil_73.CUtil.trace("TQSplash timerHandler: " + event);
                    this.dispatchEvent(new TNavEvent_8.TNavEvent(TNavEvent_8.TNavEvent.WOZNAVNEXT));
                }
                preEnterScene(Tutor, sceneLabel, sceneTitle, scenePage, Direction) {
                    CUtil_73.CUtil.trace("TQSplash Pre-Enter Scene Behavior: " + sceneTitle);
                    super.preEnterScene(Tutor, sceneLabel, sceneTitle, scenePage, Direction);
                    this.StitleText.text = sceneTitle;
                    if (Direction == "WOZBACK")
                        return Direction;
                    return sceneLabel;
                }
                onEnterScene(Direction) {
                    CUtil_73.CUtil.trace("TQSplash Enter Scene Behavior:");
                    var myTimer = new CEFTimer_1.CEFTimer(1700, 1);
                    myTimer.addEventListener("timer", this.timerHandler);
                    myTimer.start();
                }
            };
            exports_81("TQSplash", TQSplash);
        }
    };
});
System.register("sceneExt/TQSplashB", ["com/events/TNavEvent", "thermite/TScene", "util/CUtil"], function (exports_82, context_82) {
    "use strict";
    var __moduleName = context_82 && context_82.id;
    var TNavEvent_9, TScene_12, CUtil_74, TQSplashB;
    return {
        setters: [
            function (TNavEvent_9_1) {
                TNavEvent_9 = TNavEvent_9_1;
            },
            function (TScene_12_1) {
                TScene_12 = TScene_12_1;
            },
            function (CUtil_74_1) {
                CUtil_74 = CUtil_74_1;
            }
        ],
        execute: function () {
            TQSplashB = class TQSplashB extends TScene_12.TScene {
                constructor() {
                    super();
                    CUtil_74.CUtil.trace("TQSplashB:Constructor");
                }
                timerHandler(event) {
                    CUtil_74.CUtil.trace("TQSplashB timerHandler: " + event);
                    this.dispatchEvent(new TNavEvent_9.TNavEvent(TNavEvent_9.TNavEvent.WOZNAVNEXT));
                }
                preEnterScene(Tutor, sceneLabel, sceneTitle, scenePage, Direction) {
                    CUtil_74.CUtil.trace("TQSplashB Pre-Enter Scene Behavior: " + sceneTitle);
                    super.preEnterScene(Tutor, sceneLabel, sceneTitle, scenePage, Direction);
                    this.StitleText.text = sceneTitle;
                    return sceneLabel;
                }
                onEnterScene(Direction) {
                    CUtil_74.CUtil.trace("TQSplashB Enter Scene Behavior:");
                }
                preExitScene(Direction, sceneCurr) {
                    CUtil_74.CUtil.trace("TQ3APart1 Enter Scene Behavior:");
                    if (Direction == "WOZNEXT")
                        this.fComplete = true;
                    return ("OK");
                }
            };
            exports_82("TQSplashB", TQSplashB);
        }
    };
});
System.register("sceneExt/TScene0", ["thermite/TScene", "util/CUtil"], function (exports_83, context_83) {
    "use strict";
    var __moduleName = context_83 && context_83.id;
    var TScene_13, CUtil_75, TScene0;
    return {
        setters: [
            function (TScene_13_1) {
                TScene_13 = TScene_13_1;
            },
            function (CUtil_75_1) {
                CUtil_75 = CUtil_75_1;
            }
        ],
        execute: function () {
            TScene0 = class TScene0 extends TScene_13.TScene {
                constructor() {
                    super();
                    CUtil_75.CUtil.trace("TScene0:Constructor");
                }
            };
            exports_83("TScene0", TScene0);
        }
    };
});
System.register("sceneExt/TScene1", ["com/events/TSelectEvent", "thermite/TScene", "thermite/events/TMouseEvent", "util/CUtil"], function (exports_84, context_84) {
    "use strict";
    var __moduleName = context_84 && context_84.id;
    var TSelectEvent_24, TScene_14, TMouseEvent_23, CUtil_76, TIntroPart1;
    return {
        setters: [
            function (TSelectEvent_24_1) {
                TSelectEvent_24 = TSelectEvent_24_1;
            },
            function (TScene_14_1) {
                TScene_14 = TScene_14_1;
            },
            function (TMouseEvent_23_1) {
                TMouseEvent_23 = TMouseEvent_23_1;
            },
            function (CUtil_76_1) {
                CUtil_76 = CUtil_76_1;
            }
        ],
        execute: function () {
            TIntroPart1 = class TIntroPart1 extends TScene_14.TScene {
                constructor() {
                    super();
                    CUtil_76.CUtil.trace("TIntroPart1:Constructor");
                    this.imgTool.addEventListener(TSelectEvent_24.TSelectEvent.WOZIMGSELECT, this.doImageMap);
                    this.TabTool.addEventListener(TSelectEvent_24.TSelectEvent.WOZTABSELECT, this.doTabMap);
                }
                doImageMap(evt) {
                    switch (evt.selection) {
                        case "chimneyLeft":
                        case "chimneyRight":
                            this.tabTool.topClick(new TMouseEvent_23.TMouseEvent("", TMouseEvent_23.TMouseEvent.WOZCLICK));
                            break;
                        case "pinkPaint":
                        case "bluePaint":
                            this.tabTool.centerClick(new TMouseEvent_23.TMouseEvent("", TMouseEvent_23.TMouseEvent.WOZCLICK));
                            break;
                        case "singleDoor":
                        case "doubleDoor":
                            this.tabTool.bottomClick(new TMouseEvent_23.TMouseEvent("", TMouseEvent_23.TMouseEvent.WOZCLICK));
                            break;
                    }
                }
                doTabMap(evt) {
                    CUtil_76.CUtil.trace(" this.doTabMap: " + evt.selection);
                    switch (evt.selection) {
                        case "chimneyLeft":
                        case "chimneyRight":
                            this.imgTool.chimneyLeft.visible = false;
                            this.imgTool.chimneyRight.visible = false;
                            break;
                        case "pinkPaint":
                        case "bluePaint":
                            this.imgTool.pinkPaint.visible = false;
                            this.imgTool.bluePaint.visible = false;
                            break;
                        case "singleDoor":
                        case "doubleDoor":
                            this.imgTool.singleDoor.visible = false;
                            this.imgTool.doubleDoor.visible = false;
                            break;
                    }
                    this.imgTool[evt.selection].visible = true;
                }
            };
            exports_84("TIntroPart1", TIntroPart1);
        }
    };
});
System.register("sceneExt/TScene2", ["thermite/TScene", "util/CUtil"], function (exports_85, context_85) {
    "use strict";
    var __moduleName = context_85 && context_85.id;
    var TScene_15, CUtil_77, TScene2;
    return {
        setters: [
            function (TScene_15_1) {
                TScene_15 = TScene_15_1;
            },
            function (CUtil_77_1) {
                CUtil_77 = CUtil_77_1;
            }
        ],
        execute: function () {
            TScene2 = class TScene2 extends TScene_15.TScene {
                constructor() {
                    super();
                    CUtil_77.CUtil.trace("TScene2:Constructor");
                }
            };
            exports_85("TScene2", TScene2);
        }
    };
});
System.register("sceneExt/TScene2a", ["thermite/TScene", "util/CUtil"], function (exports_86, context_86) {
    "use strict";
    var __moduleName = context_86 && context_86.id;
    var TScene_16, CUtil_78, TScene2a;
    return {
        setters: [
            function (TScene_16_1) {
                TScene_16 = TScene_16_1;
            },
            function (CUtil_78_1) {
                CUtil_78 = CUtil_78_1;
            }
        ],
        execute: function () {
            TScene2a = class TScene2a extends TScene_16.TScene {
                constructor() {
                    super();
                    CUtil_78.CUtil.trace("TScene2a:Constructor");
                }
            };
            exports_86("TScene2a", TScene2a);
        }
    };
});
System.register("sceneExt/TScene3", ["thermite/TScene", "util/CUtil"], function (exports_87, context_87) {
    "use strict";
    var __moduleName = context_87 && context_87.id;
    var TScene_17, CUtil_79, TScene3;
    return {
        setters: [
            function (TScene_17_1) {
                TScene_17 = TScene_17_1;
            },
            function (CUtil_79_1) {
                CUtil_79 = CUtil_79_1;
            }
        ],
        execute: function () {
            TScene3 = class TScene3 extends TScene_17.TScene {
                constructor() {
                    super();
                    CUtil_79.CUtil.trace("TScene3:Constructor");
                }
            };
            exports_87("TScene3", TScene3);
        }
    };
});
System.register("sceneExt/TScene4", ["thermite/TScene", "util/CUtil"], function (exports_88, context_88) {
    "use strict";
    var __moduleName = context_88 && context_88.id;
    var TScene_18, CUtil_80, TScene4;
    return {
        setters: [
            function (TScene_18_1) {
                TScene_18 = TScene_18_1;
            },
            function (CUtil_80_1) {
                CUtil_80 = CUtil_80_1;
            }
        ],
        execute: function () {
            TScene4 = class TScene4 extends TScene_18.TScene {
                constructor() {
                    super();
                    CUtil_80.CUtil.trace("TScene3:Constructor");
                }
            };
            exports_88("TScene4", TScene4);
        }
    };
});
System.register("sceneExt/TSceneBoundry", ["thermite/TScene", "util/CUtil"], function (exports_89, context_89) {
    "use strict";
    var __moduleName = context_89 && context_89.id;
    var TScene_19, CUtil_81, TSceneBoundry;
    return {
        setters: [
            function (TScene_19_1) {
                TScene_19 = TScene_19_1;
            },
            function (CUtil_81_1) {
                CUtil_81 = CUtil_81_1;
            }
        ],
        execute: function () {
            TSceneBoundry = class TSceneBoundry extends TScene_19.TScene {
                constructor() {
                    super();
                    CUtil_81.CUtil.trace("TSceneBoundry:Constructor");
                    this.visible = false;
                }
            };
            exports_89("TSceneBoundry", TSceneBoundry);
        }
    };
});
System.register("sceneExt/TWelcomeSplash", ["thermite/TScene", "util/CUtil"], function (exports_90, context_90) {
    "use strict";
    var __moduleName = context_90 && context_90.id;
    var TScene_20, CUtil_82, TWelcomeSplash;
    return {
        setters: [
            function (TScene_20_1) {
                TScene_20 = TScene_20_1;
            },
            function (CUtil_82_1) {
                CUtil_82 = CUtil_82_1;
            }
        ],
        execute: function () {
            TWelcomeSplash = class TWelcomeSplash extends TScene_20.TScene {
                constructor() {
                    super();
                    CUtil_82.CUtil.trace("TWelcomeSplash:Constructor");
                }
            };
            exports_90("TWelcomeSplash", TWelcomeSplash);
        }
    };
});
//# sourceMappingURL=exts.js.map