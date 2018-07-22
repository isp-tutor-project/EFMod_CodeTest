

namespace EFTut_Suppl.EFMOD_CODETEST {

    export class SScene1 {

        $var1:string = "valname2";

        // This is a special signature to avoid the typescript error "because <type> has no index signature."
        // on syntax like => this[<element name>]
        // 
        [key: string]: any;

        
        //***********************************************
        // Tutor graph methods
        //
        
        public $onCreateScene() {            
        }

        public $onEnterScene() {
        }
        
        public $preEnterScene() {
        }

        public $preExitScene() {
        }

        public $demoInitScene() {
        }

        public $logScene() {
        }

        public $rewindScene() {
        }

        public $resolveTemplate(templID:string) { 
        
            return this["$"+templID];
        }


        //***********************************************
        // Scene graph methods
        //
        public $nodePreEnter(nodeId:string) {
        }

        public $nodePreExit(nodeId:string) {
        }

        public $nodeAction(actionId:string) : void {
            
            switch(actionId) {
                case "ENTER1":
                    this.setButtonBehavior('incrAnimation'); 
                    this.fComplete=false; 
                    this.updateNav(); 
                    break;
            }
        }
        
        public $nodeConstraint(constrainId:string) : boolean {

            let result:boolean = false;

            return result;
        }

        // Track methods.
        // 
        public $cuePoints(trackID:string, cueID:string) {

            switch(trackID) {

                case "track1":
                    switch(cueID) {
                        
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

        public $timedEvents(id:string) {
        }
    }
}