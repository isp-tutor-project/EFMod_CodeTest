var EFTut_Suppl;
(function (EFTut_Suppl) {
    var EFMod_CodeTest;
    (function (EFMod_CodeTest) {
        class CONST {
        }
        CONST.TUTORCONTAINER = "STutorContainer";
        CONST.NEXTSCENE = "nextbutton";
        CONST.PREVSCENE = "prevbutton";
        CONST.MOUSE_MOVE = "mousemove";
        CONST.MOUSE_DOWN = "mousedown";
        CONST.MOUSE_UP = "mouseup";
        CONST.MOUSE_CLICK = "click";
        CONST.DOUBLE_CLICK = "dblclick";
        CONST.CLICK = "click";
        EFMod_CodeTest.CONST = CONST;
    })(EFMod_CodeTest = EFTut_Suppl.EFMod_CodeTest || (EFTut_Suppl.EFMod_CodeTest = {}));
})(EFTut_Suppl || (EFTut_Suppl = {}));
var EFTut_Suppl;
(function (EFTut_Suppl) {
    var EFMod_CodeTest;
    (function (EFMod_CodeTest) {
        class $Common {
            $oncreate() { }
            $onenter() { }
            $preenter() { }
            $preexit() { }
            $demoinit() { }
            $logging() { }
            $rewind() { }
            $nodePreEnter(nodeId) { }
            $nodePreExit(nodeId) { }
            $nodeAction(actionId) { }
            $nodeConstraint(constrainId) {
                let result = false;
                return result;
            }
            $cuePoints(script, id) { }
            $timedEvents(script, id) { }
        }
        EFMod_CodeTest.$Common = $Common;
    })(EFMod_CodeTest = EFTut_Suppl.EFMod_CodeTest || (EFTut_Suppl.EFMod_CodeTest = {}));
})(EFTut_Suppl || (EFTut_Suppl = {}));
var EFTut_Suppl;
(function (EFTut_Suppl) {
    var EFMod_CodeTest;
    (function (EFMod_CodeTest) {
        class Scene1 {
            $oncreate() {
            }
            $onenter() {
            }
            $preenter() {
            }
            $preexit() {
            }
            $demoinit() {
            }
            $logging() {
            }
            $rewind() {
            }
            $nodePreEnter(nodeId) {
            }
            $nodePreExit(nodeId) {
            }
            $nodeAction(actionId) {
                switch (actionId) {
                    case "ENTER1":
                        this.setButtonBehavior('incrAnimation');
                        this.fComplete = false;
                        this.updateNav();
                        break;
                }
            }
            $nodeConstraint(constrainId) {
                let result;
                return result;
            }
            $cuePoints(script, id) {
            }
            $timedEvents(script, id) {
            }
        }
        EFMod_CodeTest.Scene1 = Scene1;
        class Scene2 {
            $oncreate() {
                this["SPurpleCircle"].xname = "SPurpleCircle";
                this["SInput"].xname = "SInput";
                this["SRect1"].xname = "SRect1";
            }
            $preenter() {
                this.connectNavButton(EFMod_CodeTest.CONST.NEXTSCENE, "SPurpleCircle");
            }
            $preexit() {
            }
            $demoinit() {
            }
            $logging() {
            }
            $rewind() {
            }
        }
        EFMod_CodeTest.Scene2 = Scene2;
        class Scene3 {
            $oncreate() {
                this["SPurpleCircle"].xname = "SPurpleCircle";
            }
            $preenter() {
                this.connectNavButton(EFMod_CodeTest.CONST.NEXTSCENE, "SPurpleCircle");
            }
            $preexit() {
            }
            $onexit() {
                this["SPurpleCircle"].enableButton(false);
            }
            $demoinit() {
            }
            $logging() {
            }
            $rewind() {
            }
        }
        EFMod_CodeTest.Scene3 = Scene3;
        class Scene4 {
            $oncreate() {
                this["SPurpleCircle"].xname = "SPurpleCircle";
            }
            $onenter() {
                this["SPurpleCircle"].enableButton(false);
            }
            $preenter() {
                this["SPurpleCircle"].enableButton(false);
            }
            $preexit() {
            }
            $demoinit() {
            }
            $logging() {
            }
            $rewind() {
            }
        }
        EFMod_CodeTest.Scene4 = Scene4;
    })(EFMod_CodeTest = EFTut_Suppl.EFMod_CodeTest || (EFTut_Suppl.EFMod_CodeTest = {}));
})(EFTut_Suppl || (EFTut_Suppl = {}));
//# sourceMappingURL=mixins.js.map