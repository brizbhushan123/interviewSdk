/**
 * UI Events handler class for managing custom UI components and interactions
 */
import { events } from '../core/EventManager';
class UiEvents {
  private mainDiv!: HTMLDivElement;

  /**
   * Initializes the UI events handler with the main container
   * @param mainDiv - The main container element
   */
  public init(mainDiv: HTMLDivElement) {
    this.mainDiv = mainDiv;
  }

  beforeuloadEvent(fn: Function) {
    window.addEventListener('beforeunload', (event) => {
      // Set a return value to trigger the confirmation dialog
      fn();
    });
  }

  blurEvent(fn: Function) {
    window.addEventListener('blur', (event) => {
      fn();
    });
  }

  onFocusEvent(fn: Function){
    window.addEventListener('focus', (event) => {
      fn();
    });
  }


  closeApplicationEvent(fn: Function) {
    this.mainDiv.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      const button = target.closest('button[data-attr="close-application"]');

      if (button) {
        event.preventDefault();
        fn();
      }
    });
  }

  /**
   * Builds and replaces <option> elements inside <select>
   */
  private createOptions(
    select: HTMLSelectElement,
    options: { value: string; label: string }[],
    defaultVal?: string
  ): void {
    select.innerHTML = '';
    options.forEach(({ value, label }) => {
      const opt = document.createElement('option');
      opt.value = value;
      opt.text = label;
      if (value === defaultVal) {
        opt.selected = true;
      }
      select.appendChild(opt);
    });
  }

  /**
   * Builds the custom options container with current <select> options
   */
  private buildCustomOptionsContainer(
    select: HTMLSelectElement,
    trigger: HTMLElement
  ): HTMLElement {
    const placeholder = select.getAttribute('placeholder') || '';
    const optionsContainer = document.createElement('div');
    optionsContainer.className = 'thinkproc-custom-options';

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

    return optionsContainer;
  }

  /**
   * Adds click event listener for selecting an option
   */
  private attachOptionClickHandler(
    select: HTMLSelectElement,
    optionsContainer: HTMLElement,
    trigger: HTMLElement,
    customSelect: HTMLElement
  ): void {
    const placeholder = select.getAttribute('placeholder') || '';

    optionsContainer.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (!target.classList.contains('thinkproc-custom-option')) return;

      const value = target.dataset.value;
      if (!value) return;

      const matchedOption = Array.from(select.options).find((opt) => opt.value === value);
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

  /**
   * Creates the full custom select UI
   */
  private buildCustomSelect(select: HTMLSelectElement) {
    select.style.display = 'none';
    select.multiple = false;

    const wrapper = document.createElement('div');
    wrapper.className = 'thinkproc-custom-select-wrapper';

    const customSelect = document.createElement('div');
    customSelect.className = 'thinkproc-custom-select';

    const trigger = document.createElement('span');
    trigger.className = 'thinkproc-custom-select-trigger';

    const optionsContainer = this.buildCustomOptionsContainer(select, trigger);

    customSelect.appendChild(trigger);
    customSelect.appendChild(optionsContainer);
    wrapper.appendChild(customSelect);
    select.parentNode?.insertBefore(wrapper, select);
    wrapper.appendChild(select);

    if (select.options.length > 0) {
      trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        customSelect.classList.toggle('thinkproc-opened');
      });

      this.attachOptionClickHandler(select, optionsContainer, trigger, customSelect);
    }

    document.addEventListener('click', () => this.closeAllDropdowns());
  }

  /**
   * Updates only the options inside an existing custom select
   */
  private updateCustomOptionsContainer(select: HTMLSelectElement, defaultVal?: string): void {
    const wrapper = select.closest('.thinkproc-custom-select-wrapper');
    if (!wrapper) return;

    const customSelect = wrapper.querySelector('.thinkproc-custom-select') as HTMLElement | null;
    const trigger = wrapper.querySelector('.thinkproc-custom-select-trigger') as HTMLElement | null;
    const oldOptionsContainer = wrapper.querySelector(
      '.thinkproc-custom-options'
    ) as HTMLElement | null;

    if (!customSelect || !trigger || !oldOptionsContainer) return;

    // Set selected option (if provided)
    if (defaultVal) {
      Array.from(select.options).forEach((opt) => {
        opt.selected = opt.value === defaultVal;
      });
    }

    oldOptionsContainer.remove();

    const newOptionsContainer = this.buildCustomOptionsContainer(select, trigger);
    customSelect.appendChild(newOptionsContainer);

    this.attachOptionClickHandler(select, newOptionsContainer, trigger, customSelect);
  }

  /**
   * Public method: closes all custom dropdowns
   */
  public closeAllDropdowns(): void {
    document
      .querySelectorAll('.thinkproc-custom-select')
      .forEach((el) => el.classList.remove('thinkproc-opened'));
  }

  /**
   * Public method: creates the custom select wrapper (if not already)
   */
  public createCustomSelectById(id: string): void {
    const select = this.mainDiv.querySelector(`#${id}`) as HTMLSelectElement | null;
    if (!select || select.closest('.thinkproc-custom-select-wrapper')) return;

    this.buildCustomSelect(select);
  }

  /**
   * Public method: Updates options for a select by ID
   */
  public setOptions(
    id: string,
    newOptions: { value: string; label: string }[],
    defaultVal?: string
  ): void {
    const select = this.mainDiv.querySelector(`#${id}`) as HTMLSelectElement | null;
    if (!select) return;

    this.createOptions(select, newOptions, defaultVal);

    const wrapperExists = !!select.closest('.thinkproc-custom-select-wrapper');
    if (wrapperExists) {
      this.updateCustomOptionsContainer(select, defaultVal);
    } else {
      this.createCustomSelectById(id);
    }
  }

  /**
   * Handles the responsive layout setup for step headers and content areas
   */
  public handleResponsiveLayoutSetup(): void {
    this.handleStepHeaderResponsive();
    const originalPositions = new Map<HTMLElement, Comment>();
    const liElements = this.mainDiv.querySelectorAll<HTMLElement>(
      '.thinkproc-step-list > li[data-step]'
    );
    const contentElements = this.mainDiv.querySelectorAll<HTMLElement>(
      '.thinkproc-systemCheck-body > div[data-step]'
    );

    const stepMapping = Array.from(liElements)
      .map((li) => {
        const stepKey = li.getAttribute('data-step');
        const content = Array.from(contentElements).find(
          (div): div is HTMLElement => div.getAttribute('data-step') === stepKey
        );
        return { li, content };
      })
      .filter(({ content }) => content !== undefined) as {
      li: HTMLElement;
      content: HTMLElement;
    }[];

    const moveToStepList = (): void => {
      stepMapping.forEach(({ li, content }) => {
        if (!li.contains(content)) {
          if (!originalPositions.has(content)) {
            const placeholder = document.createComment(
              `placeholder for ${content.getAttribute('data-step')}`
            );
            content.parentNode?.insertBefore(placeholder, content);
            originalPositions.set(content, placeholder);
          }
          li.appendChild(content);
        }
      });
    };

    const moveBackToSystemBody = (): void => {
      stepMapping.forEach(({ content }) => {
        const placeholder = originalPositions.get(content);
        if (placeholder?.parentNode && placeholder.parentNode !== content.parentNode) {
          placeholder.parentNode.insertBefore(content, placeholder);
        }
      });
    };

    const handleResponsiveLayout = (): void => {
      if (window.innerWidth < 992) {
        moveToStepList();
      } else {
        moveBackToSystemBody();
      }
    };

    // Initial call
    handleResponsiveLayout();

    // Handle screen resize
    window.addEventListener('resize', handleResponsiveLayout);
  }

  /**
   * Adjusts step headers for mobile view by adding "Next:" labels
   */
  private handleStepHeaderResponsive(): void {
    const popupHeader = this.mainDiv.querySelector<HTMLElement>('.thinkproc-popup-header');
    const headerLeft = popupHeader?.querySelector<HTMLElement>('.thinkproc-popup-header-left');

    if (!popupHeader || !headerLeft) return;

    let isMobileView = window.innerWidth < 992;

    const stepDivs = Array.from(
      headerLeft.querySelectorAll('.thinkproc-compatibility-step')
    ) as HTMLElement[];

    // Store original <span> innerHTMLs for all steps
    const originalContentMap = new Map<HTMLElement, string>();
    stepDivs.forEach((div) => {
      originalContentMap.set(div, div.innerHTML);
    });

    const applyMobileView = () => {
      for (let i = 0; i < stepDivs.length; i++) {
        const currentDiv = stepDivs[i];
        const currentLabel = originalContentMap.get(currentDiv)?.trim() || '';
        const nextDiv = stepDivs[i + 1];
        const nextLabel = nextDiv ? originalContentMap.get(nextDiv)?.trim() : null;

        if (nextLabel) {
          currentDiv.innerHTML = `${currentLabel} <span>Next: ${nextLabel}</span>`;
        } else {
          currentDiv.innerHTML = `${currentLabel}`;
        }
      }
    };

    const applyDesktopView = () => {
      stepDivs.forEach((div) => {
        const original = originalContentMap.get(div);
        if (original) {
          div.innerHTML = original;
        }
      });
    };

    const handleResponsive = () => {
      const isNowMobile = window.innerWidth <= 992;

      if (isNowMobile === isMobileView) return;

      isMobileView = isNowMobile;

      if (isMobileView) {
        popupHeader.classList.add('mobile-view');
        applyMobileView();
      } else {
        popupHeader.classList.remove('mobile-view');
        applyDesktopView();
      }
    };

    // Initial structure apply
    if (isMobileView) {
      popupHeader.classList.add('mobile-view');
      applyMobileView();
    }

    // Resize handler (debounced)
    let resizeTimeout: ReturnType<typeof setTimeout>;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(handleResponsive, 100);
    });

    // Mutation observer for dynamic class changes
    const observer = new MutationObserver(() => {
      if (isMobileView) {
        applyMobileView();
      } else {
        applyDesktopView();
      }
    });

    stepDivs.forEach((div) => {
      observer.observe(div, {
        attributes: true,
        attributeFilter: ['class'],
      });
    });
  }
}

export const uiEvents = new UiEvents();
