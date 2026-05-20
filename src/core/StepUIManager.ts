import { examMonitor } from '../features/ExamMonitor';
import { interviewFeedback } from '../features/InterviewFeedback';
import { thankYou } from '../features/ThankYou';
import { uiEvents } from '../ui/UiEvents';
import ui from '../ui/UiManager';
import { StepManager } from './StepsManager';
import utility from './Utility';

/**
 *
 */
class StepUIManager {
  stepUIData: { [key: string]: any };
  static stepManager: StepManager;
  activeStepCount: number = 0;
  activeSteps: { [key: string]: number } = {};
  /**
   *
   */
  constructor() {
    this.stepUIData = {};
  }

  /* Author : Prateek Jaiswal */

  /**
   * Initializes step-wise UI configuration data for system checks like browser, screen, camera, mic, and network.
   * Each step contains metadata for controlling UI flow, visibility, and localization.
   * @param stepManager
   */
  init(stepManager: StepManager) {
    StepUIManager.stepManager = stepManager;
    this.stepUIData = {
      browser: {
        system: 1,
        step_id: 'thinkX_browser_checked',
        step_circle_id: 'thinkX_browser_checked',
        step_error: 'thinkX_browserError',
        li: 'thinkX_browser_checked',
        name: ui.translations.steps.browser_check,
        show_div_id: 'thinkX_browserSuccess',
        hide_div_id: 'thinkX_browserSuccess',
        tab_id: 'thinkproc_step_system',
        tab_progress: 'active',
        tab_complete: 'completed',
        tab_div: 'thinkproc_body_system',
      },
      screen: {
        system: 1,
        step_id: 'thinkX_screenChecked',
        step_circle_id: 'thinkX_screenChecked',
        step_error: 'thinkX_screenError',
        li: 'thinkX_screenChecked',
        name: ui.translations.steps.screen_check,
        show_div_id: 'thinkX_screenSuccess',
        hide_div_id: 'thinkX_screenSuccess',
        tab_id: 'thinkproc_step_system',
        tab_progress: 'active',
        tab_complete: 'completed',
        tab_div: 'thinkproc_body_system',
      },
      camera: {
        system: 1,
        step_id: 'thinkX_webCamChecked',
        step_circle_id: 'thinkX_webCamChecked',
        step_error: 'thinkX_webCamError',
        li: 'thinkX_webCamChecked',
        name: ui.translations.steps.webcam_check,
        show_div_id: 'thinkX_webCamSuccess',
        hide_div_id: 'thinkX_webCamSuccess',
        tab_id: 'thinkproc_step_system',
        tab_progress: 'active',
        tab_complete: 'completed',
        tab_div: 'thinkproc_body_system',
      },
      mic: {
        system: 1,
        step_id: 'thinkX_micChecked',
        step_circle_id: 'thinkX_micChecked',
        step_error: 'thinkX_micError',
        li: 'thinkX_micChecked',
        name: ui.translations.steps.mic_check,
        show_div_id: 'thinkX_micSuccess',
        hide_div_id: 'thinkX_micSuccess',
        tab_id: 'thinkproc_step_system',
        tab_progress: 'active',
        tab_complete: 'completed',
        tab_div: 'thinkproc_body_system',
      },
      network: {
        system: 1,
        step_id: 'thinkX_networkChecked',
        step_circle_id: 'thinkX_networkChecked',
        step_error: 'thinkX_networkError',
        li: 'thinkX_networkChecked',
        name: ui.translations.steps.network_check,
        show_div_id: 'thinkX_networkSuccess',
        hide_div_id: 'thinkX_networkSuccess',
        tab_id: 'thinkproc_step_system',
        tab_progress: 'active',
        tab_complete: 'completed',
        tab_div: 'thinkproc_body_system',
      },
      photoCheck: {
        system: 0,
        tab_id: 'thinkproc_step_photo',
        step_circle_id: 'thinkproc_step_photo',
        show_div_id: 'thinkproc_body_photo',
        hide_div_id: 'thinkproc_body_photo',
        tab_progress_id: 'active',
        tab_complete_id: 'complete',
        tab_div: 'thinkproc_body_photo',
      },
      idCheck: {
        system: 0,
        tab_id: 'thinkproc_step_photo',
        step_circle_id: 'thinkproc_step_photo',
        show_div_id: 'thinkproc_body_id',
        hide_div_id: 'thinkproc_body_id',
        tab_progress_id: 'active',
        tab_complete_id: 'complete',
        tab_div: 'thinkproc_body_id',
      },
      idVerify: {
        system: 0,
        tab_id: 'thinkproc_step_id',
        step_circle_id: 'thinkproc_step_id',
        show_div_id: 'thinkproc_body_compare',
        hide_div_id: 'thinkproc_body_compare',
        tab_progress_id: 'active',
        tab_complete_id: 'complete',
        tab_div: 'thinkproc_body_compare',
      },
      roomCheck: {
        system: 0,
        tab_id: 'thinkproc_step_room',
        step_circle_id: 'thinkproc_step_room',
        show_div_id: 'thinkproc_body_room',
        hide_div_id: 'thinkproc_body_room',
        tab_progress_id: 'active',
        tab_complete_id: 'complete',
        tab_div: 'thinkproc_body_room',
      },
      deskScan: {
        system: 0,
        tab_id: 'thinkproc_step_room',
        step_circle_id: 'thinkproc_step_room',
        show_div_id: 'thinkproc_body_room',
        hide_div_id: 'thinkproc_body_room',
        tab_progress_id: 'active',
        tab_complete_id: 'complete',
        tab_div: 'thinkproc_body_room',
      },
      bodyScan: {
        system: 0,
        tab_id: 'thinkproc_step_room',
        step_circle_id: 'thinkproc_step_room',
        show_div_id: 'thinkproc_body_room',
        hide_div_id: 'thinkproc_body_room',
        tab_progress_id: 'active',
        tab_complete_id: 'complete',
        tab_div: 'thinkproc_body_room',
      },
      addCamSideView: {
        system: 0,
        tab_id: 'thinkproc_step_camera',
        step_circle_id: 'thinkproc_step_camera',
        show_div_id: 'thinkproc_body_camera',
        hide_div_id: 'thinkproc_body_camera',
        tab_progress_id: 'active',
        tab_complete_id: 'complete',
        tab_div: 'thinkproc_body_camera',
      },
      addCamFrontView: {
        system: 0,
        tab_id: 'thinkproc_step_camera',
        step_circle_id: 'thinkproc_step_camera',
        show_div_id: 'thinkproc_body_camera',
        hide_div_id: 'thinkproc_body_camera',
        tab_progress_id: 'active',
        tab_complete_id: 'complete',
        tab_div: 'thinkproc_body_camera',
      },
      addCamBackView: {
        system: 0,
        tab_id: 'thinkproc_step_camera',
        step_circle_id: 'thinkproc_step_camera',
        show_div_id: 'thinkproc_body_camera',
        hide_div_id: 'thinkproc_body_camera',
        tab_progress_id: 'active',
        tab_complete_id: 'complete',
        tab_div: 'thinkproc_body_camera',
      },
      addCamCustomView: {
        system: 0,
        tab_id: 'thinkproc_step_camera',
        step_circle_id: 'thinkproc_step_camera',
        show_div_id: 'thinkproc_body_camera',
        hide_div_id: 'thinkproc_body_camera',
        tab_progress_id: 'active',
        tab_complete_id: 'complete',
        tab_div: 'thinkproc_body_camera',
      },
      lobby: {
        system: 0,
        tab_id: 'thinkproc_step_camera',
        tab_div: 'thinkproc_body_camera',
      },
      examMonitor: {
        system: 0,
        tab_id: 'thinkproc_step_camera',
        tab_div: 'thinkproc_body_camera',
      },
      interviewMonitor: {
        system: 0,
        tab_id: 'thinkproc_step_camera',
        tab_div: 'thinkproc_body_camera',
      },
      interviewFeedback: {
        system: 0,
        tab_id: 'thinkproc_step_camera',
        tab_div: 'thinkproc_body_camera',
      },
      thankYou: {
        system: 0,
        tab_id: 'thinkproc_step_camera',
        tab_div: 'thinkproc-thank-you-popup',
      },
      completeExam: {
        system: 0,
        tab_id: 'thinkproc_step_complete',
        tab_div: 'thinkproc_body_complete',
      },
    };
    let self = this;
    uiEvents.closeApplicationEvent(function () {
      self.closeApplicationUI();
    });
  }

  setStepActiveCount(stepSwitch: { [key: string]: boolean }) {
    const stepOrder = this.stepUIData;
    let count = 0;
    for (const stepName in stepSwitch) {
      if (stepOrder.hasOwnProperty(stepName) && stepSwitch[stepName]) {
        const stepData = stepOrder[stepName];
        if (
          stepData.tab_div != undefined &&
          stepData.tab_div != '' &&
          this.activeSteps[stepData.tab_div] == undefined
        ) {
          this.activeSteps[stepData.tab_div] = count + 1;
          count++;
        }
      }
    }
    this.activeStepCount = count;
  }
  updateActiveStepCount() {
    let step = StepUIManager.stepManager.currentStepName;
    let tabDiv = this.stepUIData[step]?.tab_div;

    let currentStepElem = ui.id('thinkproc_tabStepCurrent');
    let allStepElem = ui.id('thinkproc_tabStepAll');
    const percentCircle = ui.id('thinkproc_currPercentage');

    let currentStep = parseInt(this.activeSteps[tabDiv]?.toString() || '1', 10);
    let allStep = parseInt(this.activeStepCount?.toString() || '1', 10);

    // Update visible text
    if (currentStepElem) ui.innerText(currentStepElem, currentStep.toString());
    if (allStepElem) ui.innerText(allStepElem, allStep.toString());

    if (percentCircle) {
      let percent: number = Math.round((currentStep / allStep) * 100);
      percentCircle.style.setProperty('--thinkproc-percent', percent.toString());
    }
  }

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
  stepTabDeactive(stepName: string) {
    const stepData = this.stepUIData[stepName];
    const tabId = ui.id(stepData.tab_id);
    if (tabId) {
      ui.hide(tabId);
    }
  }

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
  stepTabComplete(stepName: string) {
    const stepData = this.stepUIData[stepName];
    const tabId = ui.id(stepData.tab_id);
    if (tabId) {
      ui.removeClass(tabId, 'active');
      ui.addClass(tabId, 'completed');
    }
  }

  /**
   * Activates the tab and displays the content section for the given step name.
   *
   * This function highlights the corresponding tab by adding the "active" class
   * and makes the associated content div visible.
   *
   * @param stepName - The key used to retrieve tab and content information from stepUIData.
   */
  stepTabActive(stepName: string) {
    const stepData = this.stepUIData[stepName];
    const tabId = ui.id(stepData.tab_id);
    if (tabId) {
      ui.removeClass(tabId, 'completed');
      ui.addClass(tabId, 'active');
    }
    utility.log(stepData.show_div_id);
    const contentDiv = ui.id(stepData.show_div_id);
    if (contentDiv) {
      ui.show(contentDiv);
    }
    const contentMainDiv = ui.id(stepData.tab_div);
    if (contentMainDiv) {
      ui.show(contentMainDiv);
    }
  }

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
  stepStart(currentStep: string, previousStep: string = '') {
    if (previousStep != '') {
      const prevStepData = this.stepUIData[previousStep];
      const showDiv = ui.id(prevStepData.hide_div_id);
      if (showDiv) {
        ui.hide(showDiv); //showDiv.style.display = "none";
      }

      const stepOrder = StepUIManager.stepManager.stepsOrder;
      const currentIndex = stepOrder.indexOf(currentStep);
      const previousIndex = stepOrder.indexOf(previousStep);

      if (currentIndex > previousIndex) {
        this.stepTabComplete(previousStep);
      }
    }
    const stepData = this.stepUIData[currentStep];

    // Previous Step task
    if (stepData.system == 1) {
      const element = ui.id(stepData.step_circle_id);
      if (element) {
        ui.addClass(element, 'active');
      }
    } else {
      const prevStepData = this.stepUIData[previousStep];
      if (prevStepData) {
        const systemDiv = ui.id(prevStepData.tab_div);
        if (systemDiv) {
          ui.hide(systemDiv);
        }
      }

      // const tabProgressDiv = ui.id(prevStepData.tab_id);
      // if (tabProgressDiv) {
      //   ui.addClass(tabProgressDiv, 'active');
      // }
    }

    // Current Step Active
    this.stepTabActive(currentStep);
  }

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
  stepEnd(currentStep: string) {
    const stepData = this.stepUIData[currentStep];
    if (stepData.system == 1) {
      const element = ui.id(stepData.step_circle_id);
      if (element) {
        ui.removeClass(element, 'active');
        ui.addClass(element, 'completed');
      }
    }
  }

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
  stepError(currentStep: string, error: string[]) {
    const stepData = this.stepUIData[currentStep];
    if (stepData.system == 1) {
      const element = ui.id(stepData.step_error);
      const msg = this.mergeWithBoldAndBreak(error);
      if (element) {
        ui.innerText(element, msg);
        ui.show(element);
      }
    }
  }

  /**
   *
   * @param arr
   */
  mergeWithBoldAndBreak(arr: string[]): string {
    return arr
      .map((val, index) => {
        const bold = `${val}`;
        return index < arr.length - 1 ? bold + `<br>` : bold;
      })
      .join('');
  }

  /**
   * Displays the given screen resolution in the UI.
   *
   * This function updates the innerHTML of the element with ID "screenResolution" to show the width and height in bold format.
   *
   * @param resolution - An object containing the screen's width and height.
   * @param resolution.width
   * @param resolution.height
   */
  screenResolution(resolution: { width: number; height: number }) {
    const resultDiv = ui.id('thinkX_screenResolution');
    if (resultDiv) {
      ui.innerText(resultDiv, `${resolution.width}x${resolution.height}`);
    }
  }

  /**
   *
   * @param message
   */
  screenError(message: string) {
    const resultDiv = ui.id('thinkX_screenError');
    if (resultDiv) {
      ui.innerText(resultDiv, `${message}`);
      ui.show(resultDiv);
    }
  }

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
  initAndUpdateCustomSelectById(
    id: string,
    options: { value: string; label: string }[],
    defaultValue?: string
  ): void {
    this.updateCustomSelectOptions(id, options, defaultValue);
    //this.initCustomSelect(id);
  }

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
  updateCustomSelectOptions(
    id: string,
    options: { value: string; label: string }[],
    defaultValue?: string
  ): void {
    this.setOptions(id, options, defaultValue);
  }

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
  initCustomSelect(id: string): void {
    this.createCustomSelectById(id);
  }

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
  setOptions(id: string, newOptions: { value: string; label: string }[], defaultVal?: string) {
    const select = ui.id(id);
    if (!select) return;

    // Clear and re-add options
    select.innerHTML = '';

    newOptions.forEach(({ value, label }) => {
      const opt = document.createElement('option');
      opt.value = value;
      opt.text = label;
      if (value === defaultVal) opt.selected = true;
      select.appendChild(opt);
    });

    // Remove old wrapper to rebuild
    const oldWrapper = select.closest('.thinkproc-custom-select-wrapper');

    if (oldWrapper) {
      const oldWrapperParant = oldWrapper.parentNode;
      // oldWrapper.remove();
      // oldWrapperParant?.prepend(select);

      oldWrapperParant?.replaceChild(select,oldWrapper);
    }

    // Recreate custom select UI
    this.createCustomSelectById(id);
  }

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
  createCustomSelectById(id: string) {
    const select = <HTMLSelectElement>ui.id(id);
    if (!select || select.closest('.thinkproc-custom-select-wrapper')) return;

    this.buildCustomSelect(select);
  }

  /**
   * Converts a native <select> element into a custom-styled dropdown.
   * - Hides the original select and builds a custom wrapper with options.
   * - Handles default selection and placeholder.
   * - Adds event listeners for toggling dropdown and selecting options.
   * - Ensures only one dropdown is open at a time.
   *
   * @param select - The <select> element to customize.
   */
  buildCustomSelect(select: HTMLSelectElement) {
    select.style.display = 'none';
    select.multiple = false;

    const wrapper = document.createElement('div');
    wrapper.className = 'thinkproc-custom-select-wrapper';

    const customSelect = document.createElement('div');
    customSelect.className = 'thinkproc-custom-select';

    const trigger = document.createElement('span');
    trigger.className = 'thinkproc-custom-select-trigger';

    const optionsContainer = document.createElement('div');
    optionsContainer.className = 'thinkproc-custom-options';

    const placeholder = select.getAttribute('placeholder') || '';
    const options = Array.from(select.options);

    let hasSelected = false;

    options.forEach((option, index) => {
      const customOption = document.createElement('span');
      customOption.className = `thinkproc-custom-option ${option.className}`;
      customOption.dataset.value = option.value;
      customOption.textContent = option.textContent || '';

      if (!hasSelected && (option.selected || index === 0)) {
        trigger.textContent = option.textContent || placeholder;
        customOption.classList.add('thinkproc-selection');
        select.value = option.value;
        hasSelected = true;
      }

      optionsContainer.appendChild(customOption);
    });

    if (options.length === 0) {
      trigger.textContent = placeholder;
      trigger.style.pointerEvents = 'none';
      trigger.style.opacity = '0.6';
    }

    customSelect.appendChild(trigger);
    customSelect.appendChild(optionsContainer);
    wrapper.appendChild(customSelect);
    select.parentNode?.insertBefore(wrapper, select);
    wrapper.appendChild(select);

    if (options.length > 0) {
      trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        customSelect.classList.toggle('thinkproc-opened');
      });

      optionsContainer.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        if (!target.classList.contains('thinkproc-custom-option')) return;

        const value = target.dataset.value;
        if (!value) return;

        const matchedOption = options.find((opt) => opt.value === value);
        if (matchedOption) {
          select.value = value;
          matchedOption.selected = true;
          trigger.textContent = matchedOption.textContent || placeholder;
          customSelect.classList.remove('thinkproc-opened');

          optionsContainer
            .querySelectorAll('.thinkproc-custom-option')
            .forEach((opt) => opt.classList.remove('thinkproc-selection'));
          target.classList.add('thinkproc-selection');
        }
      });
    }

    document.addEventListener('click', () => this.closeAllDropdowns());
  }

  /**
   *
   */
  closeAllDropdowns() {
    document
      .querySelectorAll('.thinkproc-custom-select')
      .forEach((el) => el.classList.remove('thinkproc-opened'));
  }

  /**
   *
   * @param id
   */
  srcBlank(id: string) {
    const result = ui.id(id);
    if (result) {
      ui.show(result);
      const imgElement = result as HTMLImageElement;
      imgElement.src = '';
    }
  }

  /**
   *
   * @param id
   * @param url
   */
  srcInsert(id: string, url: string) {
    const result = ui.id(id);
    if (result && result instanceof HTMLImageElement) {
      result.src = url;
      ui.show(result);
    }
  }

  /**
   *
   * @param id
   * @param text
   */
  insertText(id: string, text: string) {
    const resultDiv = ui.id(id);
    if (resultDiv) {
      ui.innerText(resultDiv, text);
    }
  }

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
  stepBack(currentStep: string) {
    const stepData = this.stepUIData[currentStep];
    const element = ui.id(stepData.step_circle_id);
    if (element) {
      ui.removeClass(element, 'active');
      ui.removeClass(element, 'completed');
    }
  }

  /**
   *
   * @param html
   * @param containerId
   */
  setRetryCloseBtn(html: string, containerId: string): HTMLElement | null {
    const container = ui.id(containerId);

    if (!container) {
      utility.warn(`Container with id "${containerId}" not found.`);
      return null;
    }

    const existingRetryDiv = ui.id('thinkX_retryClose');
    if (existingRetryDiv && existingRetryDiv.parentNode) {
      existingRetryDiv.parentNode.removeChild(existingRetryDiv);
    }

    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html.trim();
    const element = tempDiv.firstElementChild as HTMLElement;

    if (!element) {
      utility.warn('Provided HTML did not result in a valid element.');
      return null;
    }

    container.appendChild(element);

    return element;
  }

  /**
   *
   * @param html
   * @param containerId
   */
  setGif(html: string, containerId: string): HTMLElement | null {
    const container = ui.id(containerId);
    if (!container) {
      utility.warn(`Container with id "${containerId}" not found.`);
      return null;
    }

    const existingLoading = ui.id('thinkX_loading');
    if (existingLoading && existingLoading.parentNode) {
      existingLoading.parentNode.removeChild(existingLoading);
    }

    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html.trim();
    const element = tempDiv.firstElementChild as HTMLElement;

    if (!element) {
      utility.warn('Provided HTML did not result in a valid element.');
      return null;
    }

    container.appendChild(element);

    return element;
  }

  setLoader(html: string, containerId: string): HTMLElement | null {
    const container = ui.id(containerId);
    if (!container) {
      utility.warn(`Container with id "${containerId}" not found.`);
      return null;
    }

    const existingLoading = ui.id('thinkX_loadingwithText');
    if (existingLoading && existingLoading.parentNode) {
      existingLoading.parentNode.removeChild(existingLoading);
    }

    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html.trim();
    const element = tempDiv.firstElementChild as HTMLElement;

    if (!element) {
      utility.warn('Provided HTML did not result in a valid element.');
      return null;
    }

    container.appendChild(element);

    return element;
  }
   /**
   *
   * @param id
   * @param html
   */
  insertHtml(id: string, html: string) {
    const resultDiv = ui.id(id);
    if (resultDiv) {
      ui.innerHTML(resultDiv, html);
    }
  }

  /**
   *
   */
  closeApplicationUI() {
    StepUIManager.stepManager.closeApplication();
  }
}

export const stepUIManager = new StepUIManager();
