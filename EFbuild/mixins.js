var EFTut_Suppl;
(function (EFTut_Suppl) {
    var EFMOD_CODETEST;
    (function (EFMOD_CODETEST) {
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
        EFMOD_CODETEST.CONST = CONST;
    })(EFMOD_CODETEST = EFTut_Suppl.EFMOD_CODETEST || (EFTut_Suppl.EFMOD_CODETEST = {}));
})(EFTut_Suppl || (EFTut_Suppl = {}));
var EFTut_Suppl;
(function (EFTut_Suppl) {
    var EFMOD_CODETEST;
    (function (EFMOD_CODETEST) {
        class $Common {
            $onCreateScene() { }
            $preEnterScene() { }
            $onEnterScene() { }
            $preExitScene() { }
            $onExitScene() { }
            $demoInitScene() { }
            $logScene() { }
            $rewindScene() { }
            $resolveTemplate(templID) { }
            $nodePreEnter(nodeId) { }
            $nodePreExit(nodeId) { }
            $nodeAction(actionId) { }
            $nodeConstraint(constrainId) {
                let result = false;
                return result;
            }
            $cuePoints(id) { }
            $timedEvents(id) { }
        }
        EFMOD_CODETEST.$Common = $Common;
    })(EFMOD_CODETEST = EFTut_Suppl.EFMOD_CODETEST || (EFTut_Suppl.EFMOD_CODETEST = {}));
})(EFTut_Suppl || (EFTut_Suppl = {}));
var EFTut_Suppl;
(function (EFTut_Suppl) {
    var EFMOD_CODETEST;
    (function (EFMOD_CODETEST) {
        class Globals {
            constructor() {
                this.$var1 = "valname2";
            }
        }
        EFMOD_CODETEST.Globals = Globals;
    })(EFMOD_CODETEST = EFTut_Suppl.EFMOD_CODETEST || (EFTut_Suppl.EFMOD_CODETEST = {}));
})(EFTut_Suppl || (EFTut_Suppl = {}));
var EFTut_Suppl;
(function (EFTut_Suppl) {
    var EFMOD_CODETEST;
    (function (EFMOD_CODETEST) {
        class SNavigator {
            $onCreateScene() {
                console.log("$Navigator created");
                this.connectNavButton(EFMOD_CODETEST.CONST.NEXTSCENE, "Snext");
                this.connectNavButton(EFMOD_CODETEST.CONST.PREVSCENE, "Sback");
            }
            $onEnterScene() {
            }
            $preEnterScene() {
            }
            $preExitScene() {
            }
            $demoInitScene() {
            }
            $logScene() {
            }
            $rewindScene() {
            }
            $resolveTemplate(templID) {
                return this["$" + templID];
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
                let result = false;
                return result;
            }
            $cuePoints(trackID, cueID) {
                switch (cueID) {
                    case "$start":
                        console.log("executing CuePoint START");
                        break;
                    case "$end":
                        console.log("executing CuePoint END");
                        break;
                    case "a":
                        console.log("executing CuePoint 1");
                        break;
                    case "b":
                        console.log("executing CuePoint 2");
                        break;
                    case "z":
                        console.log("executing CuePoint 3");
                        break;
                }
            }
            $timedEvents(id) {
            }
        }
        EFMOD_CODETEST.SNavigator = SNavigator;
    })(EFMOD_CODETEST = EFTut_Suppl.EFMOD_CODETEST || (EFTut_Suppl.EFMOD_CODETEST = {}));
})(EFTut_Suppl || (EFTut_Suppl = {}));
var EFTut_Suppl;
(function (EFTut_Suppl) {
    var EFMOD_CODETEST;
    (function (EFMOD_CODETEST) {
        class SScene1 {
            constructor() {
                this.$var1 = "valname2";
            }
            $onCreateScene() {
            }
            $onEnterScene() {
            }
            $preEnterScene() {
            }
            $preExitScene() {
            }
            $demoInitScene() {
            }
            $logScene() {
            }
            $rewindScene() {
            }
            $resolveTemplate(templID) {
                return this["$" + templID];
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
                let result = false;
                return result;
            }
            $cuePoints(trackID, cueID) {
                switch (trackID) {
                    case "track1":
                        switch (cueID) {
                            case "$start":
                                console.log("executing CuePoint START");
                                break;
                            case "$end":
                                console.log("executing CuePoint END");
                                break;
                            case "a":
                                console.log("executing CuePoint 1");
                                break;
                            case "b":
                                console.log("executing CuePoint 2");
                                this.SShape1.visible = false;
                                break;
                            case "z":
                                console.log("executing CuePoint 3");
                                this.SShape1.visible = true;
                                break;
                        }
                        break;
                }
            }
            $timedEvents(id) {
            }
        }
        EFMOD_CODETEST.SScene1 = SScene1;
    })(EFMOD_CODETEST = EFTut_Suppl.EFMOD_CODETEST || (EFTut_Suppl.EFMOD_CODETEST = {}));
})(EFTut_Suppl || (EFTut_Suppl = {}));
var EFTut_Suppl;
(function (EFTut_Suppl) {
    var EFMOD_CODETEST;
    (function (EFMOD_CODETEST) {
        class SScene2 {
            $onCreateScene() {
            }
            $preEnterScene() {
            }
        }
        EFMOD_CODETEST.SScene2 = SScene2;
    })(EFMOD_CODETEST = EFTut_Suppl.EFMOD_CODETEST || (EFTut_Suppl.EFMOD_CODETEST = {}));
})(EFTut_Suppl || (EFTut_Suppl = {}));
var EFTut_Suppl;
(function (EFTut_Suppl) {
    var EFMOD_CODETEST;
    (function (EFMOD_CODETEST) {
        class SScene3 {
            $onCreateScene() {
            }
            $preEnterScene() {
            }
            $preExitScene() {
            }
            $onexit() {
            }
            $demoInitScene() {
            }
            $logScene() {
            }
            $rewindScene() {
            }
        }
        EFMOD_CODETEST.SScene3 = SScene3;
    })(EFMOD_CODETEST = EFTut_Suppl.EFMOD_CODETEST || (EFTut_Suppl.EFMOD_CODETEST = {}));
})(EFTut_Suppl || (EFTut_Suppl = {}));
var EFTut_Suppl;
(function (EFTut_Suppl) {
    var EFMOD_CODETEST;
    (function (EFMOD_CODETEST) {
        class SScene4 {
            $onCreateScene() {
            }
            $onEnterScene() {
            }
            $preEnterScene() {
            }
            $preExitScene() {
            }
            $demoInitScene() {
            }
            $logScene() {
            }
            $rewindScene() {
            }
        }
        EFMOD_CODETEST.SScene4 = SScene4;
    })(EFMOD_CODETEST = EFTut_Suppl.EFMOD_CODETEST || (EFTut_Suppl.EFMOD_CODETEST = {}));
})(EFTut_Suppl || (EFTut_Suppl = {}));
//# sourceMappingURL=mixins.js.map