type Corner = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';
type Shape = 'circle' | 'square' | 'rectangle';
interface DragOptions {
    drag?: boolean;
    position?: Corner | {
        x: number;
        y: number;
    };
    allowNearestCorner?: boolean;
    width?: number;
    height?: number;
}
export declare class DragElement {
    static set(el: HTMLElement, optionsOrShape?: DragOptions, shapeArg?: Shape): void;
}
export {};
