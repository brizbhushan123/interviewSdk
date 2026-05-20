import { StepManager } from './StepsManager';
/**
 *
 */
declare class StepUIManager {
    stepUIData: {
        [key: string]: any;
    };
    static stepManager: StepManager;
    activeStepCount: number;
    activeSteps: {
        [key: string]: number;
    };
    /**
     *
     */
    constructor();
    /**
     * Initializes step-wise UI configuration data for system checks like browser, screen, camera, mic, and network.
     * Each step contains metadata for controlling UI flow, visibility, and localization.
     * @param stepManager
     */
    init(stepManager: StepManager): void;
    setStepActiveCount(stepSwitch: {
        [key: string]: boolean;
    }): void;
    updateActiveStepCount(): void;
    /**
     * Deactivates a specific step tab in the UI based on the provided step name.
     *
     * This function:
     * 1. Retrieves step-related configuration from `stepUIData` using the step name.
     * 2. Extracts the tab ID associated with the step.
     * 3. Hides the tab in the UI if the corresponding element is found.
     *
     * @param stepName - The key identifying the step whose tab should be deactivated.
     */
    stepTabDeactive(stepName: string): void;
    /**
     * Deactivates the tab corresponding to the given step name.
     *
     * This function resets the background style of the tab element,effectively marking it as inactive in the UI.
     *
     * @param stepName - The key used to retrieve the tab data from stepUIData.
     */
    /**
     *
     * @param stepName
     */
    stepTabComplete(stepName: string): void;
    /**
     * Activates the tab and displays the content section for the given step name.
     *
     * This function highlights the corresponding tab by adding the "active" class
     * and makes the associated content div visible.
     *
     * @param stepName - The key used to retrieve tab and content information from stepUIData.
     */
    stepTabActive(stepName: string): void;
    /**
     * Handles the transition from a previous step to the current step in a multi-step UI flow.
     *
     * This function performs the following:
     * - Hides the content of the previous step and deactivates its tab (if provided).
     * - Activates the tab and displays the content of the current step.
     * - Based on the step type (`system == 1`), it highlights the step or adjusts the tab display.
     *
     * @param currentStep - The name/key of the current step to activate.
     * @param previousStep - (Optional) The name/key of the previous step to deactivate and hide.
     */
    /**
     *
     * @param currentStep
     * @param previousStep
     */
    stepStart(currentStep: string, previousStep?: string): void;
    /**
     * Marks the given step as completed in the UI.
     *
     * If the step is a system step (`system == 1`), this function:
     * - Removes the "active" class from the step's visual indicator.
     * - Adds the "completed" class to indicate that the step is finished.
     *
     *  * @param currentStep - The name/key of the step to mark as completed.
     * @param currentStep
     */
    stepEnd(currentStep: string): void;
    /**
     * Displays an error message for the specified step in the UI.
     *
     * If the step is a system step (`system == 1`), this function:
     * - Retrieves the designated error display element.
     * - Merges the array of error strings into a formatted message (with bold and line breaks).
     * - Sets the message as the innerHTML of the error element and shows it.
     *
     * @param currentStep - The name/key of the step where the error occurred.
     * @param error - An array of error strings to be displayed.
     */
    /**
     *
     * @param currentStep
     * @param error
     */
    stepError(currentStep: string, error: string[]): void;
    /**
     *
     * @param arr
     */
    mergeWithBoldAndBreak(arr: string[]): string;
    /**
     * Displays the given screen resolution in the UI.
     *
     * This function updates the innerHTML of the element with ID "screenResolution" to show the width and height in bold format.
     *
     * @param resolution - An object containing the screen's width and height.
     * @param resolution.width
     * @param resolution.height
     */
    screenResolution(resolution: {
        width: number;
        height: number;
    }): void;
    /**
     *
     * @param message
     */
    screenError(message: string): void;
    /**
     * Initializes a custom select dropdown by its DOM ID and sets its options.
     *
     * This method updates the dropdown options and then initializes any custom behaviors
     * or UI enhancements (e.g., styling or event listeners).
     *
     * @param id - The DOM element ID of the custom select.
     * @param options - An array of option objects with `value` and `label`.
     * @param defaultValue - (Optional) The default selected value.
     */
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
     * Updates the options of a custom select dropdown by its DOM ID.
     *
     * This method sets the available values and optionally selects a default.
     * Typically used to dynamically refresh dropdown contents.
     *
     * @param id - The DOM element ID of the custom select.
     * @param options - An array of option objects with `value` and `label`.
     * @param defaultValue - (Optional) The default selected value.
     */
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
     * Initializes a custom select dropdown by calling the internal creation logic.
     *
     * This method typically sets up the custom UI, event listeners, or styling for
     * the select element identified by the provided DOM ID.
     *
     * @param id - The DOM element ID of the custom select to initialize.
     */
    /**
     *
     * @param id
     */
    initCustomSelect(id: string): void;
    /**
     * Sets or updates the options of a native `<select>` element and reinitializes the custom UI.
     *
     * This method:
     * - Clears existing options.
     * - Appends new `<option>` elements based on the provided values.
     * - Selects a default option if `defaultVal` is provided and matches.
     * - Removes any existing custom wrapper to avoid duplication.
     * - Recreates the custom-styled select UI using `createCustomSelectById`.
     *
     * @param id - The DOM element ID of the native `<select>` element.
     * @param newOptions - An array of objects with `value` and `label` for each option.
     * @param defaultVal - (Optional) The value to be selected by default.
     */
    /**
     *
     * @param id
     * @param newOptions
     * @param defaultVal
     */
    setOptions(id: string, newOptions: {
        value: string;
        label: string;
    }[], defaultVal?: string): void;
    /**
     * Creates a custom-styled version of a native `<select>` element by its DOM ID.
     *
     * This method checks if the select element exists and is not already wrapped in a custom UI container.
     * If eligible, it proceeds to build the custom UI using `buildCustomSelect`.
     *
     * @param id - The DOM element ID of the native `<select>` element to enhance.
     */
    /**
     *
     * @param id
     */
    createCustomSelectById(id: string): void;
    /**
     * Converts a native <select> element into a custom-styled dropdown.
     * - Hides the original select and builds a custom wrapper with options.
     * - Handles default selection and placeholder.
     * - Adds event listeners for toggling dropdown and selecting options.
     * - Ensures only one dropdown is open at a time.
     *
     * @param select - The <select> element to customize.
     */
    buildCustomSelect(select: HTMLSelectElement): void;
    /**
     *
     */
    closeAllDropdowns(): void;
    /**
     *
     * @param id
     */
    srcBlank(id: string): void;
    /**
     *
     * @param id
     * @param url
     */
    srcInsert(id: string, url: string): void;
    /**
     *
     * @param id
     * @param text
     */
    insertText(id: string, text: string): void;
    /**
     * Marks the given step as completed in the UI.
     *
     * If the step is a system step (`system == 1`), this function:
     * - Removes the "active" class from the step's visual indicator.
     * - Removes the "completed" class to indicate that the step is finished.
     *
     *  * @param currentStep - The name/key of the step to mark as completed.
     * @param currentStep
     */
    stepBack(currentStep: string): void;
    /**
     *
     * @param html
     * @param containerId
     */
    setRetryCloseBtn(html: string, containerId: string): HTMLElement | null;
    /**
     *
     * @param html
     * @param containerId
     */
    setGif(html: string, containerId: string): HTMLElement | null;
    setLoader(html: string, containerId: string): HTMLElement | null;
    /**
    *
    * @param id
    * @param html
    */
    insertHtml(id: string, html: string): void;
    /**
     *
     */
    closeApplicationUI(): void;
}
export declare const stepUIManager: StepUIManager;
export {};
