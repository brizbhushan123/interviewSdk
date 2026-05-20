declare class UiEvents {
    private mainDiv;
    /**
     * Initializes the UI events handler with the main container
     * @param mainDiv - The main container element
     */
    init(mainDiv: HTMLDivElement): void;
    beforeuloadEvent(fn: Function): void;
    blurEvent(fn: Function): void;
    onFocusEvent(fn: Function): void;
    closeApplicationEvent(fn: Function): void;
    /**
     * Builds and replaces <option> elements inside <select>
     */
    private createOptions;
    /**
     * Builds the custom options container with current <select> options
     */
    private buildCustomOptionsContainer;
    /**
     * Adds click event listener for selecting an option
     */
    private attachOptionClickHandler;
    /**
     * Creates the full custom select UI
     */
    private buildCustomSelect;
    /**
     * Updates only the options inside an existing custom select
     */
    private updateCustomOptionsContainer;
    /**
     * Public method: closes all custom dropdowns
     */
    closeAllDropdowns(): void;
    /**
     * Public method: creates the custom select wrapper (if not already)
     */
    createCustomSelectById(id: string): void;
    /**
     * Public method: Updates options for a select by ID
     */
    setOptions(id: string, newOptions: {
        value: string;
        label: string;
    }[], defaultVal?: string): void;
    /**
     * Handles the responsive layout setup for step headers and content areas
     */
    handleResponsiveLayoutSetup(): void;
    /**
     * Adjusts step headers for mobile view by adding "Next:" labels
     */
    private handleStepHeaderResponsive;
}
export declare const uiEvents: UiEvents;
export {};
