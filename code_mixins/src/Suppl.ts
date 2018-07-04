

namespace EFTut_Suppl.EFMOD_CODETEST {

    export class Scene1 {

        // This is a special signature to avoid the typescript error "because <type> has no index signature."
        // on syntax like => this[<element name>]
        // 
        [key: string]: any;

        
        //***********************************************
        // Tutor graph methods
        //
        
        public $oncreate() {
        }

        public $onenter() {
        }
        
        public $preenter() {
        }

        public $preexit() {
        }

        public $demoinit() {
        }

        public $logging() {
        }

        public $rewind() {
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

            let result:boolean;

            return result;
        }

        public $cuePoints(script:string, id:string) {
        }

        public $timedEvents(script:string, id:string) {
        }



    }


    export class Scene2 {

        // This is a special signature to avoid typescript error "because <type> has no index signature."
        // on this[<element name>]
        // 
        [key: string]: any;
	
        public $oncreate() {

            this["SPurpleCircle"].xname = "SPurpleCircle";
            this["SInput"].xname = "SInput";
            this["SRect1"].xname = "SRect1";
        }

        public $preenter() {
            this.connectNavButton(CONST.NEXTSCENE, "SPurpleCircle");
        }

        public $preexit() {
        }

        public $demoinit() {

        }

        public $logging() {

        }

        public $rewind() {

        }
    }

    export class Scene3 {

        // This is a special signature to avoid typescript error "because <type> has no index signature."
        // on this[<element name>]
        // 
        [key: string]: any;
	
        public $oncreate() {

            this["SPurpleCircle"].xname = "SPurpleCircle";
        }

        public $preenter() {
            this.connectNavButton(CONST.NEXTSCENE, "SPurpleCircle");
        }

        public $preexit() {
        }

        public $onexit() {
            this["SPurpleCircle"].enableButton(false);
        }

        public $demoinit() {

        }

        public $logging() {

        }

        public $rewind() {

        }
    }

    export class Scene4 {

        // This is a special signature to avoid typescript error "because <type> has no index signature."
        // on this[<element name>]
        // 
        [key: string]: any;
	
        public $oncreate() {

            this["SPurpleCircle"].xname = "SPurpleCircle";
        }

        public $onenter() {
            this["SPurpleCircle"].enableButton(false);
        }

        public $preenter() {
            this["SPurpleCircle"].enableButton(false);
        }

        
        public $preexit() {
        }

        public $demoinit() {

        }

        public $logging() {

        }

        public $rewind() {

        }
    }
    
}