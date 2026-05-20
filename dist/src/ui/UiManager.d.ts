import { Translations } from '../core/LocalizedHTMLProcessor';
/**
 *
 */
declare class UiManager {
    mainDiv: HTMLDivElement;
    translations: Translations;
    hideClass: string;
    audioContext: AudioContext | null;
    analyser: AnalyserNode | null;
    dataArray: Uint8Array<ArrayBuffer>;
    bufferLength: number;
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D | null;
    animationFrameId: number | null;
    verticalPadding: number;
    cameraPopup: NodeJS.Timeout | undefined;
    micPopup: NodeJS.Timeout | undefined;
    /**
     *
     */
    constructor();
    /**
     *
     * @param lang
     */
    Init(lang: string, secondary?: boolean): Promise<void>;
    toggleChatAndShiftIfBottomRight(): void;
    /**
     *
     * @param id
     */
    id(id: string): HTMLElement | null;
    /**
     *
     * @param class
     */
    class(class_name: string): HTMLCollectionOf<Element>;
    /**
     *
     * @param selector
     */
    all<T>(selector: string): NodeListOf<Element>;
    /**
     *
     * @param container
     * @param id
     */
    domId(container: Element, id: string): HTMLElement | null;
    /**
     *
     * @param container
     * @param selector
     */
    domAll<T>(container: Element, selector: string): NodeListOf<Element>;
    /**
     *
     * @param element
     * @param className
     */
    addClass(element: HTMLElement | null, className: string): void;
    /**
     *
     * @param element
     * @param className
     */
    removeClass(element: HTMLElement | null, className: string): void;
    querySelector(element: string): HTMLElement | null;
    querySelectorAll(element: string): NodeListOf<HTMLElement>;
    scopedQuerySelector(parent: HTMLElement, element: string): HTMLElement | null;
    /**
     *
     * @param element
     * @param text
     */
    innerText(element: HTMLElement, text: string): void;
    /**
     *
     * @param element
     * @param text
     */
    innerHTML(element: HTMLElement | null, html: string): void;
    textColor(element: HTMLElement | null, color: string): void;
    enableOnCheck(checkBox: HTMLInputElement | null, button: HTMLButtonElement | null): void;
    /**
     *
     * @param element
     */
    show(element: HTMLElement | null): void;
    /**
     *
     * @param element
     */
    hide(element: HTMLElement | null): void;
    /**
     *
     * @param element
     */
    remove(element: HTMLElement | null): void;
    /**
     *
     * @param html
     * @param className
     */
    createDivElement(html: string, className?: string): HTMLElement;
    /**
     *
     */
    createVideoElement(): HTMLVideoElement;
    /**
     *
     * @param element
     * @param fn
     */
    click(element: HTMLElement, fn: Function): void;
    change(element: HTMLElement, fn: Function): void;
    keyup(element: HTMLElement, fn: Function): void;
    triggerEventById(elementId: string, eventName?: string): void;
    /**
     *
     * @param header
     * @param message
     * @param button_txt
     */
    alert(header: string, message: string, button_txt: string): void;
    /**
     *
     * @param html
     */
    exportDiv(html: string): HTMLElement;
    /**
     *
     */
    getMainDiv(): HTMLDivElement;
    /**
     *
     */
    removeMainDiv(): void;
    /**
     *
     * @param id
     */
    dropdownVal(id: string): string;
    /**
     *
     * @param id
     */
    initCustomSelect(id: string): void;
    /**
     *
     * @param id
     * @param options
     * @param defaultValue
     */
    updateCustomSelectOptions(id: string, options: {
        value: string;
        label: string;
    }[], defaultValue?: string): void;
    /**
     *
     * @param id
     * @param options
     * @param defaultValue
     */
    initAndUpdateCustomSelectById(id: string, options: {
        value: string;
        label: string;
    }[], defaultValue?: string): void;
    /**
     *
     */
    getMicrophones(): Promise<MediaDeviceInfo[]>;
    /**
     *
     */
    getCameras(): Promise<MediaDeviceInfo[]>;
    /**
     *
     * @param mediaStream
     * @param id
     */
    initAudioVisualization(mediaStream: MediaStream, id: string): void;
    /**
     *
     */
    draw(): void;
    /**
     *
     * @param ctx
     * @param x
     * @param y
     * @param width
     * @param height
     * @param radius
     */
    roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, radius: number): void;
    /**
     *
     */
    stopAudioBar(): void;
    /**
     *
     */
    stopMachineBar(): void;
    /**
     *
     */
    showNetworkSpeed(): void;
    /**
     *
     * @param speed
     * @param unit
     */
    downloadSpeed(speed: string, unit: string): void;
    /**
     *
     * @param speed
     * @param unit
     */
    uploadSpeed(speed: string, unit: string): void;
    /**
     *
     * @param header
     * @param message
     * @param buttonTxt
     * @param callback
     */
    alertDialog(header: string, message: string, buttonTxt: string, callback?: Function, retry?: boolean, icon?: boolean): HTMLElement;
    alertInfoBox(title: string, subtitle: string, text: string, buttonTxt: string, callback?: Function): void;
    cameraPermission(callback?: Function): Promise<void>;
    micPermission(callback?: Function): Promise<void>;
    initCameraSelect(isRetry?: boolean): Promise<void>;
    initMicSelect(isRetry?: boolean): Promise<void>;
    /**
     *
     * @param html
     * @param containerId
     * @param cameraCallback
     */
    cameraAppendHtmlInsideContainerPopup(html: string, containerId: string): HTMLElement | null;
    attachListenersOnPopup(container: HTMLElement): void;
    setCloseApplicationButton(container: HTMLElement): void;
    /**
     *
     * @param tag
     */
    createElement(tag: string): HTMLElement;
}
declare const ui: UiManager;
export default ui;
