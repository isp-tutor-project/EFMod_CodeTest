declare namespace EFTut_Suppl.EFMod_CodeTest {
    class CONST {
        static readonly TUTORCONTAINER: string;
        static readonly NEXTSCENE: string;
        static readonly PREVSCENE: string;
        static readonly MOUSE_MOVE: string;
        static readonly MOUSE_DOWN: string;
        static readonly MOUSE_UP: string;
        static readonly MOUSE_CLICK: string;
        static readonly DOUBLE_CLICK: string;
        static readonly CLICK: string;
    }
}
declare namespace EFTut_Suppl.EFMod_CodeTest {
    class $Common {
        [key: string]: any;
        $oncreate(): void;
        $onenter(): void;
        $preenter(): void;
        $preexit(): void;
        $demoinit(): void;
        $logging(): void;
        $rewind(): void;
        $nodePreEnter(nodeId: string): void;
        $nodePreExit(nodeId: string): void;
        $nodeAction(actionId: string): void;
        $nodeConstraint(constrainId: string): boolean;
        $cuePoints(script: string, id: string): void;
        $timedEvents(script: string, id: string): void;
    }
}
declare namespace EFTut_Suppl.EFMod_CodeTest {
    class Scene1 {
        [key: string]: any;
        $oncreate(): void;
        $onenter(): void;
        $preenter(): void;
        $preexit(): void;
        $demoinit(): void;
        $logging(): void;
        $rewind(): void;
        $nodePreEnter(nodeId: string): void;
        $nodePreExit(nodeId: string): void;
        $nodeAction(actionId: string): void;
        $nodeConstraint(constrainId: string): boolean;
        $cuePoints(script: string, id: string): void;
        $timedEvents(script: string, id: string): void;
    }
    class Scene2 {
        [key: string]: any;
        $oncreate(): void;
        $preenter(): void;
        $preexit(): void;
        $demoinit(): void;
        $logging(): void;
        $rewind(): void;
    }
    class Scene3 {
        [key: string]: any;
        $oncreate(): void;
        $preenter(): void;
        $preexit(): void;
        $onexit(): void;
        $demoinit(): void;
        $logging(): void;
        $rewind(): void;
    }
    class Scene4 {
        [key: string]: any;
        $oncreate(): void;
        $onenter(): void;
        $preenter(): void;
        $preexit(): void;
        $demoinit(): void;
        $logging(): void;
        $rewind(): void;
    }
}
