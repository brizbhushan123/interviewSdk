function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = "/* Import Font */\n@import url('https://fonts.googleapis.com/css2?family=Public+Sans:ital,wght@0,100..900;1,100..900&display=swap');\n\n/* Global Reset */\n*,\n::before,\n::after {\n  box-sizing: border-box;\n  margin: 0;\n  padding: 0;\n  transition: 0.3s all ease-in-out;\n}\n\n:root {\n  /* Color Variables */\n  --thinkproc-background-color: #ffffff;\n  --thinkproc-text-white: #ffffff;\n  --thinkproc-text-color: #000000;\n  --thinkproc-black: #000000;\n  --thinkproc-border-color: #DEE6EA;\n  --thinkproc-primary-color: #2F4DDB;\n  --thinkproc-primary-hover-color: #102AA7;\n  --thinkproc-box-shadow: 0px 8px 8px -4px #0A0D120A;\n  --thinkproc-main-box-shadow: 0px 20px 24px -4px #0A0D121A, 0px 8px 8px -4px #0A0D120A;\n  --thinkproc-drag-box-shadow: 0px 15.09px 18.1px -3.02px #0A0D121A, 0px 6.03px 6.03px -3.02px #0A0D120A;\n  --thinkproc-chat-box-shadow: 0px 0px 14px 0px #00000026;\n  --thinkproc-circle-color: #B1B3C1;\n  --thinkproc-gray-bg: #F9F9F9;\n  --thinkproc-cicle-bg: #C4C9CF;\n  --thinkproc-secondary-text-color: #5F6777;\n  --thinkproc-error-bg: #CC4441;\n  --thinkproc-error-bg-light: #CC444126;\n  --thinkproc-success-text: #4C946A;\n  --thinkproc-option-bg: #eef1ff;\n  --thinkproc-popup-overlay-color: #00000094;\n  --thinkproc-informationBox-bg-color: #ECEDFE;\n  --thinkproc-warning-bg: #DB97141F;\n  --thinkproc-warning-border-color: #DB9714;\n  --thinkproc-light-green-border: #4C946A26;\n  --thinkproc-green-bg: #4C946A;\n  --thinkproc-warningInfo: #E8A13A;\n  --thinkproc-btn-d: #C4C9CF;\n  --thinkproc-room-threeSixty-start: #FFC048;\n  --thinkproc-room-threeSixty-complete: #4C946A;\n  --thinkproc-call-bg: #202124;\n  --thinkproc-outgoing-message-bg: #F0F3F5;\n  --thinkproc-alert-error-bg: #F8D7DA;\n  --thinkproc-alert-error-color: #721C24;\n  --thinkproc-alert-error-border-color: #f5c6cb;\n  --thinkproc-alert-success-bg: #d4edda;\n  --thinkproc-alert-success-color: #155724;\n  --thinkproc-alert-success-border-color: #c3e6cb;\n  --thinkproc-success-bg-light: #97ebba;\n\n\n  /* Typography */\n  --thinkproc-font-family: \"Public Sans\";\n\n  /* Font sizes */\n  --thinkproc-font-size-10: 0.625rem;\n  --thinkproc-font-size-11: 0.6875rem;\n  --thinkproc-font-size-12: 0.75rem;\n  --thinkproc-font-size-13: 0.8125rem;\n  --thinkproc-font-size-14: 0.875rem;\n  --thinkproc-font-size-15: 0.9375rem;\n  --thinkproc-font-size-16: 1rem;\n  --thinkproc-font-size-17: 1.0625rem;\n  --thinkproc-font-size-18: 1.125rem;\n  --thinkproc-font-size-19: 1.1875rem;\n  --thinkproc-font-size-20: 1.25rem;\n}\n\n/* Base responsive settings */\nhtml {\n  font-size: 16px;\n}\n\nul,\nol {\n  list-style: none;\n  margin: 0;\n  padding: 0;\n}\n\n.d-none {\n  display: none !important;\n}\n\n.mt-20 {\n  margin-top: 1.25rem;\n}\n\n.mb-4rem {\n  margin-bottom: 2rem !important;\n}\n\n.d-flex {\n  display: flex;\n}\n\n.flex-end {\n  justify-content: flex-end;\n}\n\n.flex-center {\n  justify-content: center;\n}\n\n.flex-specebetween {\n  justify-content: space-between;\n}\n\n.align-center {\n  align-items: center;\n}\n\nimg {\n  vertical-align: unset;\n}\n\n.w40 {\n  width: 40rem;\n}\n\n.w100 {\n  width: 100%;\n}\n\nbody {\n  font-family: var(--thinkproc-font-family);\n  font-size: var(--thinkproc-font-size-14);\n  font-weight: 400;\n}\n\n/* Popup Wrapper */\n.thinkproc-popup-wrapper {\n  position: relative;\n}\n\n.thinkproc_compatibility_wrapper {\n  position: fixed;\n  inset: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 99999;\n  color: var(--thinkproc-text-color);\n  padding: 1rem;\n  font-family: var(--thinkproc-font-family);\n  font-size: var(--thinkproc-font-size-14);\n  font-weight: 400;\n}\n\n.thinkproc_compatibility_wrapper * {\n  line-height: unset;\n}\n\n.thinkproc_compatibility_wrapper::before {\n  content: '';\n  position: absolute;\n  inset: 0;\n  background: var(--thinkproc-background-color);\n  z-index: -1;\n}\n\n/* Popup Container */\n.thinkproc-popup {\n  background: var(--thinkproc-background-color);\n  border: 1px solid var(--thinkproc-border-color);\n  border-radius: 0.75rem;\n  max-width: 53.125rem;\n  width: 100%;\n  box-shadow: var(--thinkproc-main-box-shadow);\n  overflow: hidden;\n}\n\n/* Popup Header */\n.thinkproc-popup-header,\n.thinkproc-popup-header-left {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  border-bottom: 1px solid var(--thinkproc-border-color);\n  width: 100%;\n}\n\n.thinkproc-popup-header-right {\n  display: none;\n  width: 60px;\n}\n\n.thinkproc-progress-circle {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n.thinkproc-progress-circle .thinkproc-percent {\n  position: relative;\n  width: 60px;\n  height: 60px;\n}\n\n.thinkproc-progress-circle svg {\n  width: 100%;\n  height: 100%;\n  transform: rotate(-90deg);\n}\n\n.thinkproc-progress-circle svg circle {\n  fill: none;\n  stroke: var(--thinkproc-light-green-border);\n  stroke-width: 6;\n  stroke-linecap: round;\n}\n\n.thinkproc-progress-circle svg circle:last-of-type {\n  stroke: var(--thinkproc-green-bg);\n  stroke-dasharray: 169.65px;\n  stroke-dashoffset: calc(169.65px - (169.65px * var(--thinkproc-percent)) / 100);\n}\n\n.thinkproc-progress-circle .thinkproc-number {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n}\n\n.thinkproc-progress-circle .thinkproc-number h3 {\n  font-size: unset;\n  margin: 0px;\n  display: flex;\n  align-items: flex-end;\n  column-gap: 0.0625rem;\n  line-height: 1;\n}\n\n.thinkproc-progress-circle .thinkproc-number h3 span:first-child {\n  font-weight: 600;\n  font-size: var(--thinkproc-font-size-18);\n  margin-bottom: 0px;\n  color: var(--thinkproc-black);\n}\n\n.thinkproc-progress-circle .thinkproc-number h3 span {\n  font-size: var(--thinkproc-font-size-14);\n  font-weight: 400;\n  color: var(--thinkproc-secondary-text-color);\n  line-height: .8;\n}\n\n.thinkproc-popup-header {\n  column-gap: 10px;\n}\n\n.suspendPopup .thinkproc-progress-circle .thinkproc-percent {\n  position: relative;\n  width: 80px;\n  height: 80px;\n}\n\n.suspendPopup .thinkproc-progress-circle svg circle {\n  fill: none;\n  stroke: var(--thinkproc-border-color);\n  stroke-width: 6;\n  stroke-linecap: round;\n}\n\n.suspendPopup .thinkproc-progress-circle svg circle:last-of-type {\n  stroke: var(--thinkproc-primary-color);\n  stroke-dasharray: 232.36px;\n  /* 2π*37 */\n  stroke-dashoffset: calc(232.36px - (232.36px * var(--thinkproc_suspend_count)) / 100);\n  transform-origin: 50% 50%;\n  transition: stroke-dashoffset 1s linear;\n}\n\n/* Compatibility Step Item */\n.thinkproc-popup-header .thinkproc-popup-header-left .thinkproc-compatibility-step {\n  flex-grow: 1;\n  padding: 1rem 0.75rem;\n  text-align: center;\n  font-weight: 400;\n  text-transform: capitalize;\n  font-size: var(--thinkproc-font-size-14);\n  border-right: 1px solid var(--thinkproc-border-color);\n}\n\n/* Remove border for last step */\n.thinkproc-popup-header .thinkproc-popup-header-left .thinkproc-compatibility-step:last-child {\n  border-right: none;\n}\n\n/* Active Step Styling */\n.thinkproc-popup-header .thinkproc-popup-header-left .thinkproc-compatibility-step:is(.active) {\n  background-color: var(--thinkproc-gray-bg);\n}\n\n.thinkproc-popup-header .thinkproc-popup-header-left .thinkproc-compatibility-step:is(.active) span {\n  position: relative;\n  font-weight: 700;\n  padding-left: 1.1rem;\n}\n\n.thinkproc-popup-header .thinkproc-popup-header-left .thinkproc-compatibility-step:is(.active) span::before {\n  content: '';\n  position: absolute;\n  top: 50%;\n  left: 0;\n  width: 0.625rem;\n  height: 0.625rem;\n  background-color: var(--thinkproc-circle-color);\n  border-radius: 50%;\n  transform: translateY(-50%);\n}\n\n.thinkproc-popup-header .thinkproc-popup-header-left .thinkproc-compatibility-step:is(.completed) span {\n  padding-left: 1.3rem;\n  position: relative;\n}\n\n.thinkproc-popup-header .thinkproc-popup-header-left .thinkproc-compatibility-step:is(.completed) span::before {\n  content: '';\n  background-image: url(\"data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjAgMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0xOC4xNjY3IDEwQzE4LjE2NjcgMTQuNTEwMyAxNC41MTAzIDE4LjE2NjcgMTAgMTguMTY2N0M1LjQ4OTY3IDE4LjE2NjcgMS44MzMzMyAxNC41MTAzIDEuODMzMzMgMTBDMS44MzMzMyA1LjQ4OTY3IDUuNDg5NjcgMS44MzMzMyAxMCAxLjgzMzMzQzE0LjUxMDMgMS44MzMzMyAxOC4xNjY3IDUuNDg5NjcgMTguMTY2NyAxMFoiIGZpbGw9IiNFREYxRjciIHN0cm9rZT0iI0U0RTZFQiIgc3Ryb2tlLXdpZHRoPSIxLjE2NjY3Ii8+CjxwYXRoIGQ9Ik0xMS42NzQ2IDcuODQ1MzNWMTkuNDgxN0g5LjIxNDRWMTAuMTgwNkg5LjE0NjIyTDYuNDgxNDUgMTEuODUxVjkuNjY5MTlMOS4zNjIxMyA3Ljg0NTMzSDExLjY3NDZaIiBmaWxsPSIjMUUyMjI4Ii8+CjxwYXRoIGQ9Ik05Ljk5OTYzIDE4Ljc1QzguNTE5ODcgMTguNzQ5OSA3LjA2NDMgMTguMzc0NiA1Ljc2OTAzIDE3LjY1OTFDNC40NzM3NiAxNi45NDM2IDMuMzgxMTIgMTUuOTExMiAyLjU5MzI3IDE0LjY1ODZDMS44MDU0MiAxMy40MDYgMS4zNDgxMiAxMS45NzQxIDEuMjY0MTEgMTAuNDk2N0MxLjE4MDExIDkuMDE5MzUgMS40NzIxNSA3LjU0NDggMi4xMTI5NCA2LjIxMDk4QzIuNzUzNzIgNC44NzcxNSAzLjcyMjMxIDMuNzI3NjIgNC45MjgxMiAyLjg2OTg5QzYuMTMzOTMgMi4wMTIxNSA3LjUzNzU4IDEuNDc0MjQgOS4wMDc4IDEuMzA2NDRDMTAuNDc4IDEuMTM4NjQgMTEuOTY2OCAxLjM0NjQ1IDEzLjMzNDggMS45MTA0MkMxNC43MDI5IDIuNDc0NCAxNS45MDU2IDMuMzc2MTEgMTYuODMwNSA0LjUzMTI1IiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIuMzMzMzMiLz4KPHBhdGggZD0iTTE4LjE2NjcgMTBDMTguMTY2NyAxNC41MTAzIDE0LjUxMDMgMTguMTY2NyAxMCAxOC4xNjY3QzUuNDg5NjcgMTguMTY2NyAxLjgzMzMzIDE0LjUxMDMgMS44MzMzMyAxMEMxLjgzMzMzIDUuNDg5NjcgNS40ODk2NyAxLjgzMzMzIDEwIDEuODMzMzNDMTQuNTEwMyAxLjgzMzMzIDE4LjE2NjcgNS40ODk2NyAxOC4xNjY3IDEwWiIgZmlsbD0iI0VERjFGNyIgc3Ryb2tlPSIjRTRFNkVCIiBzdHJva2Utd2lkdGg9IjEuMTY2NjciLz4KPHBhdGggZD0iTTEwIDIwQzE1LjUyMjggMjAgMjAgMTUuNTIyOCAyMCAxMEMyMCA0LjQ3NzE1IDE1LjUyMjggMCAxMCAwQzQuNDc3MTUgMCAwIDQuNDc3MTUgMCAxMEMwIDE1LjUyMjggNC40NzcxNSAyMCAxMCAyMFoiIGZpbGw9IiMyMDg2NDUiLz4KPHBhdGggZD0iTTE0LjU0MjggNy41TDguNDAyMTUgMTIuOTE4MUw1Ljg3NDAyIDEwLjAyODEiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+Cjwvc3ZnPg==\");\n  width: 1rem;\n  height: 1rem;\n  background-repeat: no-repeat;\n  position: absolute;\n  left: 0;\n  top: 50%;\n  transform: translateY(-50%);\n  display: inline-block;\n}\n\n.thinkproc-popup-body {\n  min-height: 32.5rem;\n  max-height: 32.5rem;\n  overflow: hidden;\n  overflow-y: auto;\n  display: flex;\n  align-items: stretch;\n}\n\n.thinkproc-external-popup-description.thinkproc-external-popup-description-align p {\n  margin-bottom: 0.5rem;\n}\n\n.thinkproc-external-popup-description.thinkproc-external-popup-description-align ul {\n  margin-bottom: 0.5rem;\n}\n\n.thinkproc-external-popup-description.thinkproc-external-popup-description-align ul li:not(:last-child) {\n  margin-bottom: 0.2rem;\n}\n\n.thinkproc-candidate-video-rightdiv {\n  width: 280px;\n  height: 100%;\n  position: relative;\n  overflow: hidden;\n  overflow-y: auto;\n}\n\n.thinkproc-candidate-video-rightdiv>.thinkproc-candidate-video-interview {\n  position: sticky;\n  top: 0;\n  z-index: 1;\n  margin-bottom: 12px;\n}\n\n.thinkproc-candidate-video-rightdiv .videoContainer .thinkproc-candidate-video-interview {\n  margin-bottom: 12px;\n}\n\n.thinkproc-candidate-video-rightdiv .videoContainer .thinkproc-candidate-video-interview:last-child {\n  margin-bottom: 0px;\n}\n\n\n@media (min-width: 1366px) {\n  .thinkproc-popup-body {\n    min-height: 32.5rem;\n    max-height: 34.5rem;\n  }\n}\n\n.thinkproc-popup-body>div:not(.thinkproc_body_system) {\n  flex-grow: 1;\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n}\n\n.thinkproc_body_system {\n  padding: 2rem 1.875rem 2rem;\n  width: 100%;\n}\n\n.thinkproc_body_system .thinkproc-systemCheck-header {\n  margin-bottom: 3rem;\n}\n\n.thinkproc_body_system .thinkproc-systemCheck-header h1 {\n  color: var(--thinkproc-black);\n  font-size: var(--thinkproc-font-size-16);\n  margin-bottom: 1.75rem;\n  text-align: center;\n  font-weight: 400;\n}\n\n.thinkproc_body_system .thinkproc-systemCheck-header ul.thinkproc-step-list {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  padding: 0;\n}\n\n.thinkproc_body_system .thinkproc-systemCheck-header ul.thinkproc-step-list li {\n  flex-grow: 1;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-direction: column;\n  padding: 0 0.9375rem;\n  position: relative;\n  z-index: 0;\n  min-width: 10rem;\n}\n\n.thinkproc_body_system .thinkproc-systemCheck-header ul.thinkproc-step-list li::before {\n  content: '';\n  position: absolute;\n  height: 2px;\n  width: calc(100% - 3.125rem);\n  background-color: var(--thinkproc-border-color);\n  left: calc(50% + 1.5625rem);\n  top: 0.9375rem;\n  z-index: -1;\n}\n\n.thinkproc_body_system .thinkproc-systemCheck-header ul.thinkproc-step-list li:last-child:before {\n  display: none;\n}\n\n.thinkproc_body_system .thinkproc-systemCheck-header ul.thinkproc-step-list li .thinkproc-sys-circle {\n  width: 2rem;\n  height: 2rem;\n  border-radius: 50%;\n  background-color: var(--thinkproc-cicle-bg);\n  font-size: var(--thinkproc-font-size-16);\n  font-weight: 700;\n  color: var(--thinkproc-text-white);\n  padding: 0.625rem;\n  margin-bottom: 1rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  line-height: 1;\n}\n\n.thinkproc_body_system .thinkproc-systemCheck-header ul.thinkproc-step-list li span {\n  color: var(--thinkproc-secondary-text-color);\n}\n\n.thinkproc_body_system .thinkproc-systemCheck-header ul.thinkproc-step-list li.completed .thinkproc-sys-circle {\n  font-size: 0px;\n  background-color: var(--thinkproc-black);\n  position: relative;\n}\n\n.thinkproc_body_system .thinkproc-systemCheck-header ul.thinkproc-step-list li.completed .thinkproc-sys-circle::before {\n  content: '';\n  background-image: url(data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMTcgMTMiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0xNS4yNjc5IDJMNS40NDI5NSAxMC42NjlMMS4zOTc5NSA2LjA0NSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIyLjYiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgo8L3N2Zz4=);\n  width: 1rem;\n  height: 0.75rem;\n  background-repeat: no-repeat;\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  display: inline-block;\n}\n\n.thinkproc_body_system .thinkproc-systemCheck-header ul.thinkproc-step-list li.active .thinkproc-sys-circle {\n  background-color: var(--thinkproc-black);\n  color: var(--thinkproc-text-white);\n}\n\n.thinkproc_body_system .thinkproc-systemCheck-header ul.thinkproc-step-list li:is(.active, .completed) span {\n  color: var(--thinkproc-text-color);\n}\n\n.thinkproc_body_system .thinkproc-systemCheck-header ul.thinkproc-step-list li:is(.active) span {\n  font-weight: 600;\n}\n\n/* .thinkproc_body_system .thinkproc-systemCheck-header ul.thinkproc-step-list li.completed::before{\n  background-color: var(--thinkproc-black);\n} */\n\n/* System Check */\n.thinkproc-systemCheck-body {}\n\n.thinkproc-systemCheck-body>div {\n  max-width: 50rem;\n  margin: 0 auto;\n  text-align: center;\n}\n\n.thinkproc-step-image-box {\n  width: 6.5rem;\n  height: 6.5rem;\n  margin: 0 auto;\n  margin-bottom: 2.25rem;\n}\n\n.thinkproc-step-image-box img {\n  width: 100%;\n  height: 100%;\n  object-fit: contain;\n  object-position: center;\n}\n\n.thinkproc-error-wrap {\n  background-color: var(--thinkproc-error-bg);\n  padding: 0.625rem 1rem;\n  display: inline-flex;\n  align-items: flex-start;\n  column-gap: 0.5rem;\n  color: var(--thinkproc-text-white);\n  font-weight: 600;\n  border-radius: 0.375rem;\n  margin: 0 auto;\n  text-align: left;\n  max-width: calc(100% - 160px);\n}\n\n.thinkproc-error-wrap .thinkproc-error-icon {\n  width: 1rem;\n  height: 1rem;\n  position: relative;\n  top: 2px;\n}\n\n.thinkproc-error-wrap .thinkproc-error-icon img {\n  width: 16px;\n}\n\n.thinkproc-error-wrap.warning {\n  background-color: var(--thinkproc-warningInfo);\n  font-weight: 400;\n}\n\n.thinkproc-inner-wrap {\n  margin-top: 1.25rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  column-gap: 1.875rem;\n}\n\n.thinkproc-inner-wrap>div {\n  position: relative;\n  z-index: 0;\n}\n\n.thinkproc-inner-wrap>div::after {\n  content: '';\n  position: absolute;\n  background-color: var(--thinkproc-border-color);\n  width: 1.5px;\n  height: calc(100% + 1.25rem);\n  right: -0.75rem;\n  top: -0.5rem;\n  z-index: -1;\n}\n\n.thinkproc-inner-wrap>div:last-child::after {\n  display: none;\n}\n\n.thinkproc-inner-wrap .thinkproc_innerText {\n  color: var(--thinkproc-secondary-text-color);\n  margin-bottom: 0.75rem;\n}\n\n.thinkproc-inner-wrap .thinkproc_innerText_data {\n  color: var(--thinkproc-success-text);\n  font-size: var(--thinkproc-font-size-17);\n  font-weight: 700;\n}\n\n.thinkproc-webcam-wrap {\n  border: 1px solid var(--thinkproc-border-color);\n  border-radius: 0.375rem;\n  width: 100%;\n  max-width: 25rem;\n  margin: 0 auto;\n}\n\n.thinkproc-webcam-wrap .thinkproc-webcam-wrap-top {\n  padding: 0.625rem 1rem;\n  display: flex;\n  align-items: center;\n  background-color: var(--thinkproc-gray-bg);\n  column-gap: 0.5rem;\n  font-weight: 500;\n  border-radius: 0.375rem 0.375rem 0 0;\n  line-height: 1;\n}\n\n.thinkproc-webcam-wrap .thinkproc-webcam-wrap-top .thinkproc-error-icon {\n  width: 1.25rem;\n  height: 1.25rem;\n  position: relative;\n  top: -2px;\n}\n\n.thinkproc-webcam-wrap .thinkproc-webcam-wrap-top .thinkproc-error-icon img {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  object-position: center;\n}\n\n.thinkproc-webcam-wrap .thinkproc-webcam-wrap-body {\n  padding: 0.625rem 1rem;\n}\n\n/* Custom Select */\n.thinkproc-custom-select-default {\n  visibility: hidden;\n  opacity: 0;\n}\n\n.thinkproc-custom-select-wrapper {\n  position: relative;\n  display: inline-block;\n  user-select: none;\n  width: 100%;\n  margin-bottom: 1.25rem;\n}\n\n.thinkproc-custom-select-wrapper select {\n  display: none;\n}\n\n.thinkproc-custom-select {\n  position: relative;\n  display: inline-block;\n  width: 100%;\n}\n\n.thinkproc-custom-select-trigger {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  width: 100%;\n  padding: 0.5rem 1.625rem 0.5rem 0.875rem;\n  font-size: var(--thinkproc-font-size-14);\n  font-weight: 400 !important;\n  color: var(--thinkproc-text-color);\n  background: var(--thinkproc-background-color);\n  border: 1px solid var(--thinkproc-border-color);\n  border-radius: 0.375rem;\n  cursor: pointer;\n  position: relative;\n}\n\n.thinkproc-custom-select-trigger::after {\n  content: \"\";\n  position: absolute;\n  top: 50%;\n  right: 0.3125rem;\n  width: 1.25rem;\n  height: 1.25rem;\n  background-image: url('images/arrowDown.svg');\n  background-repeat: no-repeat;\n  background-size: 100%;\n  transform: translateY(-50%) rotate(0deg);\n  transition: transform 0.3s ease;\n}\n\n.thinkproc-custom-select.thinkproc-opened .thinkproc-custom-select-trigger::after {\n  transform: translateY(-50%) rotate(-180deg);\n}\n\n.thinkproc-custom-options {\n  position: absolute;\n  top: calc(100% + 0.25rem);\n  left: 0;\n  width: 100%;\n  background: var(--thinkproc-background-color);\n  border: 1px solid var(--thinkproc-border-color);\n  border-radius: 0.375rem;\n  box-shadow: 0px 0px 0.375rem 0px rgba(0, 0, 0, 0.12);\n  z-index: 999;\n  opacity: 0;\n  visibility: hidden;\n  transform: translateY(-0.625rem);\n  transition: all 0.3s ease;\n  max-height: 12.5rem;\n  overflow-y: auto;\n  padding: 0.5rem;\n}\n\n.thinkproc-custom-select.thinkproc-opened .thinkproc-custom-options {\n  opacity: 1;\n  visibility: visible;\n  transform: translateY(0);\n}\n\n.thinkproc-custom-option {\n  padding: 0.5rem 0.75rem;\n  font-size: var(--thinkproc-font-size-13);\n  font-weight: 400 !important;\n  color: var(--thinkproc-text-color);\n  cursor: pointer;\n  transition: background 0.2s ease;\n  display: inline-block;\n  width: 100%;\n  text-align: left;\n  border-radius: 0.375rem;\n}\n\n.thinkproc-custom-option:not(:last-child) {\n  margin-bottom: 0.25rem;\n}\n\n.thinkproc-custom-option:hover,\n.thinkproc-custom-option.thinkproc-selection {\n  background: var(--thinkproc-option-bg);\n}\n\n.thinkproc-custom-option.thinkproc-selection {\n  font-weight: 500 !important;\n}\n\n.thinkpro-btn {\n  background-color: var(--thinkproc-primary-color);\n  color: var(--thinkproc-text-white);\n  border-radius: 0.2rem;\n  padding: 0.69rem 1rem;\n  border: 1px solid var(--thinkproc-primary-color);\n  font-size: var(--thinkproc-font-size-14);\n  cursor: pointer;\n  min-width: 5.5rem;\n  line-height: 1;\n  font-weight: 600;\n}\n\n.thinkpro-btn.thinkproc-disable,\nbutton:disabled {\n  opacity: .8;\n  background-color: var(--thinkproc-btn-d);\n  pointer-events: none;\n  border-color: var(--thinkproc-btn-d);\n  color: var(--thinkproc-text-white);\n}\n\n.thinkpro-btn.outline {\n  background-color: var(--thinkproc-background-color);\n  color: var(--thinkproc-primary-color);\n}\n\n.thinkpro-btn:hover,\n.thinkpro-btn.outline:hover {\n  background-color: var(--thinkproc-primary-hover-color);\n  border: 1px solid var(--thinkproc-primary-hover-color);\n}\n\n.thinkpro-btn.outline:hover {\n  color: var(--thinkproc-text-white);\n}\n\n.thinkpro-btn:focus {\n  outline: none !important;\n}\n\n.thinkproc-d-right {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: flex-end;\n}\n\n.thinkproc-mb-40 {\n  margin-bottom: 2.5rem !important;\n}\n\n.thinkpro-audio-gif {\n  width: 10rem;\n  margin: 0 auto;\n  margin-bottom: 0.625rem;\n  position: relative;\n  height: 2.5rem;\n  display: inline-block;\n}\n\n.thinkpro-audio-gif::before {\n  content: '';\n  background-image: url('images/audio_gifFile.gif');\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  background-size: contain;\n  display: inline-block;\n  background-repeat: repeat;\n  background-position: center;\n  top: 0;\n  left: 0;\n}\n\n\n/* Photo & ID Verification */\n.thinkproc_body_id {\n  padding: 1.2rem 1.5rem;\n}\n\n.thinkproc_body_photo {\n  padding: 1.2rem 1.5rem;\n}\n\n.thinkproc-photo-id-wrap {\n  display: flex;\n  align-items: stretch;\n  column-gap: 1rem;\n  flex-direction: row-reverse;\n  height: calc(100% - 52px);\n}\n\n.thinkproc-photo-id-wrap>div.thinkproc-piLeft {\n  width: 13.4375rem;\n  border-radius: 0.5rem;\n  /* overflow-y: auto;\n  height: 359px; */\n}\n\n\n/* #thinkX_popup_customCam_instruition {\n    height: 100%;\n    overflow: auto;\n    max-height: 320px;\n} */\n\n\n.thinkproc-photo-id-wrap>div.thinkproc-piLeft .thinkproc-inst-header {\n  font-size: var(--thinkproc-font-size-14);\n  font-weight: 600;\n  color: var(--thinkproc-text-color);\n  margin-bottom: 0.75rem;\n}\n\n.thinkproc-inst-list {\n  height: calc(100% - 36px);\n  overflow: hidden;\n  overflow-y: auto;\n}\n\n.thinkproc-inst-list ul {\n  list-style: decimal;\n  padding-left: 1.1rem;\n}\n\n.thinkproc-inst-list ul li,\n.thinkproc-inst-list p {\n  font-size: var(--thinkproc-font-size-12);\n  font-weight: 400;\n  color: var(--thinkproc-text-color);\n  line-height: 1rem;\n}\n\n.thinkproc-inst-list ul li:not(:last-child) {\n  margin-bottom: 1rem;\n}\n\n.thinkproc-photo-id-wrap>div.thinkproc-piRight {\n  width: calc(100% - 13.4375rem);\n  display: flex;\n  align-items: flex-start;\n  flex-direction: column;\n  column-gap: 1rem;\n}\n\n.thinkproc-photo-id-wrap>div.thinkproc-piRight .thinkproc-piRight-top {\n  width: 100%;\n  height: 100%;\n  position: relative;\n}\n\n.thinkX_loading_withText {\n  position: absolute;\n  left: 50%;\n  transform: translateX(-50%);\n  bottom: 20px;\n  display: inline-flex;\n  flex-direction: column;\n  row-gap: 12px;\n}\n\n.thinkX_loading_withText span {\n  color: var(--thinkproc-text-white);\n  font-size: var(--thinkproc-font-size-14);\n}\n\n.thinkproc_body_room .thinkproc-roomScan .thinkproc-roomScanBody .thinkproc-video-wrap .thinkX_loading_withText {\n  top: 50%;\n  transform: translate(-50%, -50%);\n  bottom: unset;\n}\n\n.thinkproc_id_photo .thinkproc-wrap-header {\n  margin-bottom: 1rem;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n\n.thinkproc_id_photo .thinkproc-wrap-header .think-wrap-header-main {\n  font-size: var(--thinkproc-font-size-14);\n  font-weight: 600;\n  color: var(--thinkproc-text-color);\n  margin-bottom: 0.3125rem;\n  border-radius: 0.5rem 0.5rem 0 0;\n}\n\n.thinkproc_id_photo .thinkproc-wrap-header .think-wrap-header-sub {\n  font-size: var(--thinkproc-font-size-12);\n  font-weight: 400;\n  color: var(--thinkproc-secondary-text-color);\n}\n\n.attempWrap {\n  border: 1px solid var(--thinkproc-border-color);\n  border-radius: 0.375rem;\n  background-color: var(--thinkproc-gray-bg);\n  padding: 0.5rem;\n  font-weight: 500;\n  display: flex;\n  align-items: flex-end;\n  justify-content: center;\n  column-gap: 0.1rem;\n  color: var(--thinkproc-black);\n}\n\n.attempWrap span:first-child {\n  color: var(--thinkproc-black);\n  font-size: var(--thinkproc-font-size-14);\n}\n\n.attempWrap span {\n  font-size: var(--thinkproc-font-size-12);\n  color: var(--thinkproc-secondary-text-color);\n}\n\n.thinkproc-photo-id-wrap>div.thinkproc-piRight .thinkproc-piRight-top .thinkproc-video-wrap {\n  width: 100%;\n  overflow: hidden;\n  height: 100%;\n  border-radius: 0.5rem;\n  border: 1px solid var(--thinkproc-border-color);\n  background: var(--thinkproc-gray-bg);\n}\n\n.thinkproc-photo-id-wrap>div.thinkproc-piRight .thinkproc-piRight-top .thinkproc-video-wrap.id_wrap {\n  position: relative;\n  z-index: 0;\n}\n\n.thinkproc-video-wrap video {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  object-position: center;\n}\n\n.thinkproc_roomSacnPerWrap {\n  position: absolute;\n  top: 8px;\n  right: 8px;\n}\n\n.thinkproc_percentageBox {\n  width: 102px;\n  height: 102px;\n  border: 2px solid #fff;\n  border-radius: 12px;\n  display: flex;\n  flex-direction: column;\n  row-gap: 10px;\n  justify-content: center;\n  align-items: center;\n  padding: 6px;\n  position: relative;\n  overflow: hidden;\n  z-index: 0;\n}\n\n.thinkproc_percentageBox::before {\n  content: '';\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background: rgba(255, 255, 255, .4);\n  z-index: -1;\n  filter: blur(5px);\n}\n\n.thinkproc_percentageCircle {\n  position: relative;\n  width: 60px;\n  height: 60px;\n  border-radius: 50%;\n  border: 2px solid var(--thinkproc-background-color);\n}\n\n.thinkproc_percentageCircle span {\n  position: absolute;\n  width: 2px;\n  height: 50%;\n  top: 50%;\n  left: 50%;\n  transform-origin: bottom center;\n}\n\n.thinkproc_percentageCircle .thinkproc_start {\n  background: var(--thinkproc-background-color);\n  transform: translate(-50%, -100%) rotate(0deg);\n}\n\n.thinkproc_percentageCircle .thinkproc_end {\n  background: var(--thinkproc-background-color);\n  transform: translate(-50%, -100%) rotate(0deg);\n}\n\n.thinkproc_percentageText {\n  font-size: var(--thinkproc-font-size-14);\n  font-weight: 600;\n  color: var(--thinkproc-background-color);\n  line-height: 1;\n}\n\n/* .thinkproc_body_id .thinkproc-video-wrap{\n  padding: 42px 65px;\n} */\n/* Overlay (border ring) */\n.thinkproc-photo-id-wrap>div.thinkproc-piRight .thinkproc-piRight-top .thinkproc-video-wrap.id_wrap::after {\n  content: '';\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  pointer-events: none;\n  background-image: url('images/Subtract.png');\n  width: 100%;\n  height: 100%;\n  background-size: cover;\n  display: none;\n  background-repeat: no-repeat;\n  background-position: center top;\n}\n\n.thinkproc-popup-overlay,\n.thinkproc-external-popup-overlay {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: var(--thinkproc-popup-overlay-color);\n  z-index: 99;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 1rem;\n}\n\n.thinkproc-external-popup-overlay {\n  z-index: 999999;\n  font-family: var(--thinkproc-font-family);\n}\n\n.thinkproc-popup-innerbody,\n.thinkproc-external-popup-innerbody {\n  width: 31.25rem;\n  border-radius: 0.75rem;\n  background: var(--thinkproc-background-color);\n  height: auto;\n  padding: 2.125rem;\n}\n\n.thinkproc-external-popup-innerbody {\n  width: 25rem;\n  padding: 1.5rem;\n}\n\n.thinkproc-popup-box,\n.thinkproc-external-popup-box {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  row-gap: 2rem;\n}\n\n.thinkproc-external-popup-box {\n  align-items: initial;\n  row-gap: 1.5rem;\n}\n\n.thinkproc-popup-danger-img-div {\n  text-align: center;\n}\n\n.thinkproc-popup-danger-img-div img {\n  width: 5rem;\n  height: 5rem;\n}\n\n.thinkproc-external-popup-hdng-div {\n  display: flex;\n  align-items: center;\n  column-gap: 0.5rem;\n}\n\n.thinkproc-external-popup-hdng-div .icon {\n  width: 1.0625rem;\n  height: 1rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n.thinkproc-external-popup-hdng-div .icon img {\n  width: 100%;\n}\n\n.thinkproc-external-popup-hdng-div>span {\n  width: calc(100% - 1.0625rem);\n}\n\n.thinkproc-popup-hdng-div>span,\n.thinkproc-external-popup-hdng-div>span {\n  color: var(--thinkproc-text-color);\n  font-size: var(--thinkproc-font-size-18);\n  font-weight: 700;\n  line-height: 1;\n}\n\n.thinkproc-popup-description,\n.thinkproc-external-popup-description {\n  font-size: var(--thinkproc-font-size-16);\n  font-weight: 500;\n  text-align: center;\n  height: 32.375rem;\n  overflow: hidden;\n  overflow-y: auto;\n}\n\n:is(.thinkX_deskPopup,\n  #thinkX_network_popup,\n  #thinkX_screenShareErrorPopup,\n  #thinkX_micPopup,\n  #thinkX_cameraPopup) .thinkproc-external-popup-description {\n  height: unset;\n  overflow: hidden;\n}\n\n.thinkproc-external-popup-description {\n  text-align: left;\n}\n\n.thinkproc-external-popup-description :is(p, ul) {\n  margin-bottom: 1.25rem;\n  font-size: var(--thinkproc-font-size-14);\n  font-weight: 400;\n}\n\n.thinkproc-external-popup-description p.thinkproc-popup-main-msg {\n  font-weight: 600;\n  margin-bottom: 0;\n  font-size: var(--thinkproc-font-size-15);\n}\n\n.thinkproc-external-popup-description p:last-child {\n  margin-bottom: 0px;\n}\n\n.thinkproc-external-popup-description p,\n.thinkproc-external-popup-description ul li {\n  line-height: 1.6;\n}\n\n.thinkproc-external-popup-description ul {\n  padding-left: 0.625rem;\n}\n\n.thinkproc-external-popup-description ul li {\n  position: relative;\n  padding-left: 0.9375rem;\n}\n\n.thinkproc-external-popup-description ul li::before {\n  content: '';\n  position: absolute;\n  left: 0;\n  top: 0.5rem;\n  width: 0.375rem;\n  height: 0.375rem;\n  background-color: var(--thinkproc-black);\n  border-radius: 50%;\n  opacity: .8;\n}\n\n.thinkproc-external-popup-description ul li:not(:last-child) {\n  margin-bottom: 0.875rem;\n}\n\n.thinkproc-external-popup-description .thinkproc-inst-list ul li {\n  padding-left: 0;\n}\n\n.thinkproc-external-popup-description .thinkproc-inst-list ul li::before {\n  display: none;\n}\n\n.thinkproc-popup-btn-div,\n.thinkproc-external-popup-btn-div {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.625rem;\n}\n\n.thinkproc-external-popup-btn-div {\n  justify-content: end;\n}\n\n.id-card-message {\n  color: var(--thinkproc-error-bg);\n}\n\n.thinkproc-image-msg {\n  background: var(--thinkproc-informationBox-bg-color);\n  border-radius: 0.375rem;\n  width: 100%;\n  margin-top: 1rem;\n  padding: 0.5rem 0.875rem;\n  display: flex;\n  align-items: center;\n  justify-content: start;\n  column-gap: 0.5rem;\n}\n\n.thinkproc-image-button {\n  width: 100%;\n  margin: 1.25rem 0 0;\n  display: flex;\n  align-items: stretch;\n  justify-content: end;\n  column-gap: 0.75rem;\n}\n\n.thinkpro-image-nextbtn {\n  padding: 0.625rem 1.75rem;\n}\n\n.thinkpro-image-retry {\n  background: transparent;\n  color: var(--thinkproc-primary-color);\n  padding: 0.5rem 1.25rem;\n}\n\n.thinkpro-image-retry:hover {\n  background: var(--thinkproc-primary-color);\n  color: var(--thinkproc-text-white);\n}\n\n.thinkproc-photo-id-wrap>div.thinkproc-piRight .thinkproc-piRight-top .thinkproc-video-wrap.id_wrap.id_capture::after {\n  display: none;\n}\n\n/* Compare */\n.thinkproc_body_compare {\n  padding: 1.5rem;\n  display: flex;\n  flex-direction: column;\n  align-items: stretch;\n}\n\n.thinkproc_body_compare.h100 {\n  justify-content: center;\n}\n\n.thinkproc_body_compare .compareWrap {\n  text-align: center;\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n}\n\n.thinkproc_body_compare .compareWrap>div:first-child {\n  text-align: center;\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n}\n\n.thinkproc_body_compare .imageContainer {\n  display: flex;\n  align-items: stretch;\n  column-gap: 2rem;\n  margin-bottom: 1.25rem;\n  justify-content: center;\n}\n\n.thinkproc_body_compare .imageContainer>div {\n  flex-basis: 30%;\n}\n\n.thinkproc_body_compare .imageContainer>div .icHeader {\n  font-size: var(--thinkproc-font-size-12);\n  color: var(--thinkproc-secondary-text-color);\n  margin-bottom: 0.375rem;\n  text-align: left;\n}\n\n.thinkproc_body_compare .imageContainer>div .icBox {\n  width: 100%;\n  height: 9.375rem;\n  overflow: hidden;\n  border-radius: 0.5rem;\n  border: 1px solid var(--thinkproc-border-color);\n  background-color: var(--thinkproc-gray-bg);\n}\n\n.thinkproc_body_compare .imageContainer>div .icBox img {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  object-position: center;\n}\n\n.thinkproc_body_compare .imageList .imageContainer>div .icBox {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n.thinkproc_body_compare .imageList .imageContainer>div .icBox img {\n  object-fit: contain;\n  height: calc(100% - 20px);\n}\n\n.thinkproc_body_compare .imageList .imageContainer {\n  column-gap: 1rem;\n  margin-bottom: 0;\n}\n\n.thinkproc_body_compare .imageList .imageContainer>div.thinkx_success .icBox {\n  border: 1px solid var(--thinkproc-success-text);\n}\n\n.thinkproc_body_compare .imageList .imageContainer>div.thinkx_error .icBox {\n  border: 1px solid var(--thinkproc-error-bg);\n}\n\n.thinkproc_body_compare .imageList .imageContainer>div .verifyStatus {\n  display: flex;\n  align-items: center;\n  column-gap: 0.25rem;\n  text-align: left;\n  margin-top: 0.5rem;\n}\n\n.thinkproc_body_compare .imageList .imageContainer>div .verifyStatus .icon {\n  width: 1rem;\n  height: 1rem;\n  position: relative;\n  top: -1;\n}\n\n.thinkproc_body_compare .imageList .imageContainer>div .verifyStatus .icon img {\n  width: 100%;\n  height: 100%;\n  object-fit: contain;\n  object-position: center;\n  vertical-align: unset;\n}\n\n.thinkproc_body_compare .imageList .imageContainer>div .verifyStatus span {\n  width: calc(100% - 1rem);\n  line-height: 1;\n}\n\n.thinkproc_body_compare .verifyWrap {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  row-gap: 1.25rem;\n  width: 30.5rem;\n  margin: 0 auto;\n  line-height: 1.2;\n}\n\n.thinkproc_body_compare .thinkproc_loaderWrap {\n  width: 4.25rem;\n  height: 4.25rem;\n}\n\n.thinkproc_body_compare .thinkproc_loaderWrap img {\n  width: 100%;\n  height: 100%;\n  object-fit: contain;\n  object-position: center;\n}\n\n.thinkproc_body_compare .thinkproc_loaderWrap .thinkproc_loader {\n  width: 100%;\n  height: 100%;\n  border: 0.375rem solid var(--thinkproc-border-color);\n  border-radius: 50%;\n  animation: spin 5s linear infinite;\n  position: relative;\n}\n\n.thinkproc_body_compare .loaderWrap .loader:before,\n.thinkproc_body_compare .loaderWrap .loader:after {\n  content: \"\";\n  display: block;\n  width: 1rem;\n  height: 1rem;\n  border-top: 0.375rem solid var(--thinkproc-border-color);\n  border-right: 0.375rem solid var(--thinkproc-border-color);\n  position: absolute;\n  top: 0.3125rem;\n  left: -0.25rem;\n  box-shadow: 0.375rem -0.375rem 0 0.375rem #fff;\n}\n\n.thinkproc_body_compare .loaderWrap .loader:after {\n  top: 2.9375rem;\n  left: 3rem;\n  border: none;\n  border-bottom: 0.375rem solid var(--thinkproc-border-color);\n  border-left: 0.375rem solid var(--thinkproc-border-color);\n  box-shadow: -0.375rem 0.375rem 0 0.375rem #fff;\n}\n\n.varificationMsgWrap {\n  text-align: center;\n  font-size: var(--thinkproc-font-size-18);\n  font-weight: 600;\n  width: 100%;\n}\n\n.varificationMsgWrap span {\n  display: block;\n  word-break: break-word;\n}\n\n.thinkX_rejectReason {\n  color: #721c24;\n  background-color: #f8d7da;\n  border-color: #f5c6cb;\n  position: relative;\n  padding: .75rem 1.25rem;\n  margin-bottom: 1rem;\n  border: 1px solid transparent;\n  border-radius: .25rem;\n  font-size: var(--thinkproc-font-size-13);\n}\n\n#revokeWrap {\n  height: 100%;\n  display: flex;\n  align-items: center;\n}\n\n.revokeWrap {\n  display: flex;\n  align-items: center;\n  flex-direction: column;\n  row-gap: 1.25rem;\n  font-size: var(--thinkproc-font-size-18);\n  font-weight: 600;\n  width: 21.875rem;\n  margin: 0 auto;\n  text-align: center;\n}\n\n.revokeWrap .iconWrap {\n  width: 6.25rem;\n  height: 6.25rem;\n}\n\n.loading_gifdiv {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n.thinkproc-candidate-video-rightdiv .loading_gifdiv {\n  width: 100%;\n  height: 100%;\n}\n\n.thinkproc-candidate-video-rightdiv .loading_gifdiv span {\n  color: #000;\n}\n\n.thinkproc_loader {\n  border: 0.1875rem solid lightgrey;\n  height: 3.5rem;\n  width: 3.5rem;\n  border-radius: 50%;\n  border-top: 0.1875rem solid var(--thinkproc-primary-color);\n  animation: spin 1.5s linear infinite;\n}\n\n@keyframes spin {\n  100% {\n    transform: rotate(360deg);\n  }\n}\n\n.circles {\n  position: relative;\n}\n\n.circles>div {\n  animation: growAndFade 3s infinite ease-out;\n  background-color: dodgerblue;\n  border-radius: 50%;\n  height: 4.6875rem;\n  opacity: 0;\n  position: absolute;\n  width: 4.6875rem;\n}\n\n.circles .circle1 {\n  animation-delay: 1s;\n}\n\n.circles .circle2 {\n  animation-delay: 2s;\n}\n\n.circles .circle3 {\n  animation-delay: 3s;\n}\n\n@keyframes growAndFade {\n  0% {\n    opacity: 0.25;\n    transform: scale(0);\n  }\n\n  100% {\n    opacity: 0;\n    transform: scale(1);\n  }\n}\n\n.thinkproc-warrning-wrap {\n  display: inline-flex;\n  justify-content: center;\n  align-items: center;\n  column-gap: 0.5rem;\n  background-color: var(--thinkproc-warning-bg);\n  border: 1px solid var(--thinkproc-warning-border-color);\n  border-radius: 0.375rem;\n  padding: 0.375rem 0.75rem;\n  margin-bottom: 1.25rem;\n}\n\n.thinkproc-warrning-wrap .thinkproc-error-icon {\n  width: 1.5rem;\n  height: 1.5rem;\n}\n\n.thinkproc-warrning-wrap span {\n  width: 100%;\n  font-weight: 500;\n}\n\n.thinkproc_body_room {\n  padding: 1.5rem;\n}\n\n.thinkproc_body_room.h100 {\n  justify-content: center;\n  display: flex;\n  flex-direction: column;\n}\n\n.thinkproc_body_room .thinkproc-instruction-start {\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n  height: 100%;\n  row-gap: 1rem;\n}\n\n.thinkproc_body_room .thinkproc-instruction-start .thinkproc-inst-header {\n  border-bottom: 1px solid var(--thinkproc-border-color);\n  padding-bottom: 1.1rem;\n  margin-bottom: 1.5rem;\n}\n\n.thinkproc_body_room .thinkproc-instruction-start .thinkproc-inst-header .thinkproc-inst-title {\n  font-weight: 600;\n  font-size: var(--thinkproc-font-size-14);\n  color: var(--thinkproc-black);\n}\n\n.thinkproc_body_room .thinkproc-instruction-start .thinkproc-inst-header .thinkproc-inst-subtitle {\n  font-weight: 400;\n  font-size: var(--thinkproc-font-size-12);\n  color: var(--thinkproc-secondary-text-color);\n}\n\n.thinkproc_body_room .thinkproc-instruction-start .thinkpro-inst-list {}\n\n.thinkproc_body_room .thinkproc-instruction-start .thinkpro-inst-list p {\n  font-size: var(--thinkproc-font-size-16);\n  font-weight: 400;\n}\n\n.thinkproc_body_room .thinkproc-instruction-start .thinkpro-inst-list p span {\n  font-weight: 700;\n}\n\n.thinkproc_body_room .thinkproc-instruction-start .thinkpro-inst-list p:not(:last-child) {\n  margin-bottom: 6px;\n}\n\n.thinkproc_body_room .thinkproc-inst-bottom,\n.thinkproc-inst-bottom {\n  padding-top: .8rem;\n  width: 100%;\n}\n\n.thinkproc_body_room>div {\n  height: 100%;\n}\n\n.thinkproc-containerQR {\n  justify-content: space-between;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  row-gap: 1.75rem;\n  padding-top: 1.8rem;\n}\n\n.thinkproc-containerQR .thinkproc-qrwrap {\n  text-align: center;\n}\n\n.thinkproc-containerQR .thinkproc-qrwrap .thinkproc-qrCode {\n  width: 10rem;\n  height: 10rem;\n  border: 0.05rem solid var(--thinkproc-border-color);\n  padding: 0.5rem;\n  background-color: var(--thinkproc-gray-bg);\n  margin: 0 auto;\n  margin-bottom: 0.75rem;\n  border-radius: 0.65rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n.thinkproc-containerQR .thinkproc-qrwrap .thinkproc-qrCode .loading_gifdiv {\n  margin-bottom: 0px !important;\n}\n\n.thinkproc-containerQR .thinkproc-qrwrap .thinkproc-qrCode img {\n  width: 100%;\n  height: 100%;\n  object-fit: contain;\n  object-position: center;\n}\n\n.thinkproc-containerQR .thinkproc-qrwrap .thinkproc-qr-text {\n  color: var(--thinkproc-black);\n  font-size: var(--thinkproc-font-size-16);\n  font-weight: 600;\n  line-height: 1;\n  margin-bottom: 0.4rem;\n}\n\n.thinkproc-containerQR .thinkproc-qrwrap .thinkproc-qr-subtext {\n  color: var(--thinkproc-black);\n  font-size: var(--thinkproc-font-size-14);\n  font-weight: 400;\n}\n\n.thinkproc-containerQR .thinkproc-divider {\n  color: var(--thinkproc-secondary-text-color);\n  font-size: var(--thinkproc-font-size-14);\n  position: relative;\n  font-weight: 400;\n  text-align: center;\n  width: 90%;\n  margin: 1.4rem auto;\n  z-index: 0;\n  background: transparent;\n}\n\n.thinkproc-containerQR .thinkproc-divider span {\n  background-color: var(--thinkproc-background-color);\n  padding: 0 0.5rem;\n}\n\n.thinkproc-containerQR .thinkproc-divider::before {\n  content: '';\n  width: 100%;\n  background-color: var(--thinkproc-border-color);\n  height: 0.063rem;\n  position: absolute;\n  left: 0;\n  top: 50%;\n  transform: translateY(-50%);\n  z-index: -1;\n}\n\n.thinkproc-containerQR .selectWrap {\n  width: 21.25rem;\n  text-align: left;\n  margin: 0 auto;\n}\n\n.thinkproc-containerQR .selectWrap label {\n  font-size: var(--thinkproc-font-size-14);\n  font-weight: 500;\n  margin-bottom: 0.375rem;\n  display: block;\n  color: var(--thinkproc-black);\n}\n\n.thinkproc-containerQR .selectWrap>div.thinkproc_SelectWrap {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n.thinkproc-containerQR .selectWrap>div.thinkproc_SelectWrap .thinkproc-custom-select-wrap {\n  width: calc(100% - 2.5rem);\n  flex-grow: 1;\n}\n\n.thinkproc-containerQR .selectWrap>div.thinkproc_SelectWrap .thinkproc-custom-select-wrap .thinkproc-custom-select-wrapper {\n  margin-bottom: 0px;\n}\n\n.thinkproc-containerQR .selectWrap>div.thinkproc_SelectWrap .retryIcon {\n  width: 2.5rem;\n  height: 2.5rem;\n  padding: 0.525rem 0 0.525rem 0.525rem;\n  cursor: pointer;\n}\n\n.thinkproc-containerQR .selectWrap>div.thinkproc_SelectWrap .retryIcon img {\n  width: 100%;\n  height: 100%;\n  object-fit: contain;\n  object-position: center;\n  transition: transform 0.6s ease-in-out;\n}\n\n.thinkproc-containerQR .selectWrap>div.thinkproc_SelectWrap .retryIcon img.iconRotate {\n  animation: infinite rotate360 0.6s ease-in-out;\n}\n\n.thinkproc_body_room .thinkproc-roomScan {\n  height: 100%;\n}\n\n.thinkproc_body_room .thinkproc-roomScan.thinkpro_roomFullHeight .thinkproc-roomScanBody {\n  height: 100%;\n  padding-top: 0px;\n}\n\n.thinkproc_body_room .thinkproc-roomScan.thinkpro_roomFullHeight :is(.thinkproc-room-scan-data, #thinkX_roomfail) {\n  height: 100%;\n}\n\n.thinkproc_body_room .thinkproc-roomScan.thinkpro_roomFullHeight .thinkproc-room-scan-data .verifyWrap {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  row-gap: 1.25rem;\n  width: 26.5rem;\n  margin: 0 auto;\n  line-height: 1.2;\n  justify-content: center;\n  height: 100%;\n  margin-bottom: 0px !important;\n}\n\n.thinkproc_body_room .thinkproc-roomScan .thinkproc-roomScanHeader {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  column-gap: 1.25rem;\n  padding-bottom: 1rem;\n  border-bottom: 0.063rem solid var(--thinkproc-border-color);\n}\n\n.thinkproc_body_room .thinkproc-roomScan .thinkproc-roomScanHeader .thinkproc-roomHeadLeft {}\n\n.thinkproc_body_room .thinkproc-roomScan .thinkproc-roomScanHeader .thinkproc-roomHeadLeft .thinkproc-roomTitle {\n  font-size: var(--thinkproc-font-size-14);\n  font-weight: 600;\n  color: var(--thinkproc-black);\n}\n\n.thinkproc_body_room .thinkproc-roomScan .thinkproc-roomScanHeader .thinkproc-roomHeadLeft .thinkproc-roomSubTitle {\n  font-size: var(--thinkproc-font-size-12);\n  font-weight: 400;\n  color: var(--thinkproc-secondary-text-color);\n  line-height: 1.5;\n}\n\n.thinkproc_body_room .thinkproc-roomScan .thinkproc-roomScanHeader .thinkproc-roomHeadRight {\n  display: flex;\n  align-items: center;\n  justify-content: flex-end;\n  column-gap: 1.25rem;\n}\n\n.thinkproc_body_room .thinkproc-roomScan .thinkproc-roomScanHeader .thinkproc-roomHeadRight .thinkproc-roomRight-attemp {\n  width: max-content;\n}\n\n.thinkproc_body_room .thinkproc-roomScan .thinkproc-roomScanHeader .thinkproc-roomHeadRight .thinkproc-roomRight-step {\n  display: flex;\n  flex-direction: column;\n  row-gap: 0.938rem;\n}\n\n.thinkproc_body_room .thinkproc-roomScan .thinkproc-roomScanHeader .thinkproc-roomHeadRight .thinkproc-roomRight-step .thinkproc-roomStepTop {\n  display: flex;\n  align-items: center;\n  column-gap: 0.25rem;\n}\n\n.thinkproc_body_room .thinkproc-roomScan .thinkproc-roomScanHeader .thinkproc-roomHeadRight .thinkproc-roomRight-step .thinkproc-roomStepTop span {\n  background-color: var(--thinkproc-cicle-bg);\n  width: 1.25rem;\n  height: 0.375rem;\n  border-radius: 3.75rem;\n}\n\n.thinkproc_body_room .thinkproc-roomScan .thinkproc-roomScanHeader .thinkproc-roomHeadRight .thinkproc-roomRight-step .thinkproc-roomStepTop span.thinkproc_inprogress {\n  background-color: var(--thinkproc-cicle-bg);\n}\n\n.thinkproc_body_room .thinkproc-roomScan .thinkproc-roomScanHeader .thinkproc-roomHeadRight .thinkproc-roomRight-step .thinkproc-roomStepTop span.thinkproc_inprogress.threeSixtyStart {\n  background-color: var(--thinkproc-room-threeSixty-start);\n}\n\n.thinkproc_body_room .thinkproc-roomScan .thinkproc-roomScanHeader .thinkproc-roomHeadRight .thinkproc-roomRight-step .thinkproc-roomStepTop span.thinkproc_inprogress.complete {\n  background-color: var(--thinkproc-room-threeSixty-complete);\n}\n\n.thinkproc_body_room .thinkproc-roomScan .thinkproc-roomScanHeader .thinkproc-roomHeadRight .thinkproc-roomRight-step .thinkproc-roomStepTop span.thinkproc_inprogress.ufmRoom {\n  background-color: var(--thinkproc-error-bg);\n}\n\n.thinkproc_body_room .thinkproc-roomScan .thinkproc-roomScanHeader .thinkproc-roomHeadRight .thinkproc-roomRight-step .thinkproc-roomStepTop span.thinkproc_completed {\n  background-color: var(--thinkproc-cicle-bg);\n}\n\n.thinkproc_body_room .thinkproc-roomScan .thinkproc-roomScanHeader .thinkproc-roomHeadRight .thinkproc-roomRight-step .thinkproc-roomStepTop span.thinkproc_completed.threeSixtyStart {\n  background-color: var(--thinkproc-room-threeSixty-start);\n}\n\n.thinkproc_body_room .thinkproc-roomScan .thinkproc-roomScanHeader .thinkproc-roomHeadRight .thinkproc-roomRight-step .thinkproc-roomStepTop span.thinkproc_completed.complete {\n  background-color: var(--thinkproc-room-threeSixty-complete);\n}\n\n.thinkproc_body_room .thinkproc-roomScan .thinkproc-roomScanHeader .thinkproc-roomHeadRight .thinkproc-roomRight-step .thinkproc-roomStepTop span.thinkproc_completed.ufmRoom {\n  background-color: var(--thinkproc-error-bg);\n}\n\n.thinkproc_body_room .thinkproc-roomScan .thinkproc-roomScanHeader .thinkproc-roomHeadRight .thinkproc-roomRight-step .thinkproc-roomStepTop span.thinkproc_deskScan {\n  background-color: var(--thinkproc-cicle-bg);\n}\n\n.thinkproc_body_room .thinkproc-roomScan .thinkproc-roomScanHeader .thinkproc-roomHeadRight .thinkproc-roomRight-step .thinkproc-roomStepTop span.thinkproc_deskScan.threeSixtyStart {\n  background-color: var(--thinkproc-room-threeSixty-start);\n}\n\n.thinkproc_body_room .thinkproc-roomScan .thinkproc-roomScanHeader .thinkproc-roomHeadRight .thinkproc-roomRight-step .thinkproc-roomStepTop span.thinkproc_deskScan.complete {\n  background-color: var(--thinkproc-room-threeSixty-complete);\n}\n\n.thinkproc_body_room .thinkproc-roomScan .thinkproc-roomScanHeader .thinkproc-roomHeadRight .thinkproc-roomRight-step .thinkproc-roomStepTop span.thinkproc_deskScan.ufmRoom {\n  background-color: var(--thinkproc-error-bg);\n}\n\n.thinkproc_body_room .thinkproc-roomScan .thinkproc-roomScanHeader .thinkproc-roomHeadRight .thinkproc-roomRight-step .thinkproc-roomStepBottom {\n  font-size: var(--thinkproc-font-size-12);\n  font-weight: 400;\n  color: var(--thinkproc-secondary-text-color);\n  text-align: right;\n}\n\n.thinkproc_body_room .thinkproc-roomScan .thinkproc-roomScanBody {\n  height: calc(100% - 3.661rem);\n  padding-top: 1.188rem;\n  position: relative;\n}\n\n.thinkproc_body_room .thinkproc-roomScan.thinkproc-roomScanFail .thinkproc-roomScanBody {\n  height: 100%;\n  padding-top: 0;\n}\n\n.thinkproc_body_room .thinkproc-roomScan .thinkproc-roomScanBody .thinkproc-room-scan-data {\n  height: 100%;\n}\n\n.thinkproc_body_room .thinkproc-roomScan.thinkproc-roomScanFail .thinkproc-roomScanBody .thinkproc-room-scan-data .thinkproc-roomUFMBtn {\n  justify-content: center;\n}\n\n.thinkproc_body_room .thinkproc-roomScan.thinkproc-roomScanFail .thinkproc-roomScanBody .thinkproc-ufm-wrap {\n  height: calc(100% - 11.2rem);\n}\n\n.thinkproc_body_room .thinkproc-roomScan .thinkproc-roomScanBody .thinkproc-room-scan-data .verifyWrap {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  row-gap: 1.25rem;\n  width: 26.5rem;\n  margin: 0 auto;\n  line-height: 1.2;\n}\n\n.thinkproc_body_room .thinkproc-roomScan .thinkproc-roomScanBody .thinkproc-video-wrap {\n  width: 100%;\n  height: 100%;\n  border: 0.063rem solid var(--thinkproc-border-color);\n  border-radius: 0.5rem;\n  background-color: var(--thinkproc-black);\n  position: relative;\n  z-index: 0;\n}\n\n.thinkproc_body_room .thinkproc-roomScan .thinkproc-roomScanBody .thinkproc-video-wrap video {\n  width: 100%;\n  height: 100%;\n  object-fit: contain;\n  object-position: center;\n  background: var(--thinkproc-black);\n}\n\n.thinkproc_body_room .thinkproc-roomScan .thinkproc-roomScanBody .video-overlay-message {\n  position: absolute;\n  left: 50%;\n  transform: translateX(-50%);\n  bottom: 1.438rem;\n  width: 95%;\n  text-align: center;\n  z-index: 1;\n}\n\n.thinkproc_body_room .thinkproc-roomScan .thinkproc-roomScanBody .video-overlay-message span {\n  display: inline-block;\n  background-color: rgba(0, 0, 0, 0.8);\n  color: var(--thinkproc-text-white);\n  font-size: var(--thinkproc-font-size-18);\n  font-weight: 400;\n  border-radius: 0.5rem;\n  padding: 0.625rem 0.825rem;\n}\n\n.thinkproc-video-wrap .addCameraWrap {\n  position: absolute;\n  right: 8.15px;\n  top: 8px;\n  z-index: 1;\n}\n\n.thinkproc-video-wrap .addCameraWrap .addIconWrap {\n  width: 130px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: rgba(255, 255, 255, .5);\n  border-radius: 4px;\n}\n\n.thinkproc-video-wrap .addCameraWrap .addIconWrap img {\n  width: 100%;\n  height: 100%;\n  object-fit: contain;\n  object-position: center;\n}\n\n.thinkproc_body_room .thinkproc-roomScanBody .thinkproc-ufm-wrap {\n  display: flex;\n  flex-direction: column;\n  align-items: stretch;\n  row-gap: 1rem;\n  justify-content: space-between;\n  height: 100%;\n}\n\n.thinkproc_body_room .thinkproc-ufm-wrap .thinkproc-roomUFMList {\n  overflow: hidden;\n  overflow-y: auto;\n}\n\n.thinkproc_body_room .thinkproc-roomScan.thinkproc-roomScanFail .thinkproc-ufm-wrap .thinkproc-roomUFMList {\n  /* max-height: calc(100% - 10rem); */\n}\n\n.thinkproc_body_room .thinkproc-ufm-wrap .thinkproc-roomUFMList .thinkpro-issueFound {\n  display: flex;\n  align-items: center;\n  column-gap: .5rem;\n  margin-bottom: .5rem;\n  position: sticky;\n  top: -1px;\n  z-index: 1;\n  background: var(--thinkproc-background-color);\n  padding-bottom: 0.1rem;\n}\n\n.thinkproc_body_room .thinkproc-ufm-wrap .thinkproc-roomUFMList .thinkpro-issueFound .icon {\n  width: 1rem;\n  height: 1rem;\n}\n\n.thinkproc_body_room .thinkproc-ufm-wrap .thinkproc-roomUFMList .thinkpro-issueFound .icon img {\n  width: 100%;\n  height: 100%;\n}\n\n.thinkproc_body_room .thinkproc-ufm-wrap .thinkproc-roomUFMList .thinkpro-issueFound span {\n  font-size: var(--thinkproc-font-size-14);\n  font-weight: 600;\n  color: var(--thinkproc-black);\n}\n\n.thinkproc_body_room .thinkproc-ufm-wrap .thinkproc-roomUFMList .ufmContainer {\n  display: flex;\n  gap: .75rem;\n  justify-content: flex-start;\n  align-items: flex-start;\n  flex-wrap: wrap;\n}\n\n@media (min-width: 1366px) {\n  .thinkproc_body_room .thinkproc-ufm-wrap .thinkproc-roomUFMList .ufmContainer {\n    max-height: 21.375rem;\n  }\n}\n\n.thinkproc_body_room .thinkproc-ufm-wrap .thinkproc-roomUFMList .ufmContainer>div {\n  flex-basis: 23.8%;\n}\n\n.thinkproc_body_room .thinkproc-ufm-wrap .thinkproc-roomUFMList .ufmContainer>div .thinkpro-issue-image-wrap {\n  border: 0.063rem solid var(--thinkproc-border-color);\n  background-color: var(--thinkproc-gray-bg);\n  width: 100%;\n  height: 8.063rem;\n  overflow: hidden;\n  border-radius: .5rem;\n  margin-bottom: .5rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n.thinkproc_body_room .thinkproc-ufm-wrap .thinkproc-roomUFMList .ufmContainer>div .thinkpro-issue-image-wrap img {\n  width: 100%;\n  height: calc(100% - 0.75rem);\n  object-fit: contain;\n  object-position: center;\n}\n\n.thinkproc_body_room .thinkproc-ufm-wrap .thinkproc-roomUFMList .ufmContainer>div .thinkproc-room-issue-name {\n  font-size: var(--thinkproc-font-size-14);\n  font-weight: 400;\n  color: var(--thinkproc-black);\n  text-transform: capitalize;\n}\n\n.thinkproc-roomScanBody .thinkproc-roomSuccess {\n  position: absolute;\n  top: 52%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  width: 100%;\n  height: calc(100% - 1.188rem);\n  z-index: 0;\n}\n\n/* .thinkproc-roomScanBody .thinkproc-roomSuccess::before{\n  content: '';\n  background-color: var(--thinkproc-black);\n  opacity: .4;\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  left: 0;\n  top:0;\n  z-index: -1;\n} */\n.thinkproc-roomScanBody .thinkproc-roomSuccess>div {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-direction: column;\n  height: 100%;\n}\n\n.thinkproc-roomScanBody .thinkproc-roomSuccess>div .thinkproc-rsIcon {\n  width: 6.25rem;\n  height: 6.25rem;\n  border-radius: 50%;\n  margin-bottom: 2rem;\n  background-color: var(--thinkproc-background-color);\n}\n\n.thinkproc-roomScanBody .thinkproc-roomSuccess>div .thinkproc-rsIcon img {\n  width: 100%;\n  height: 100%;\n  object-fit: contain;\n  object-position: center;\n}\n\n.thinkproc-roomScanBody .thinkproc-roomSuccess>div span {\n  margin-bottom: 0.75rem;\n  color: var(--thinkproc-text-white);\n  font-size: var(--thinkproc-font-size-20);\n  font-weight: 600;\n  text-align: center;\n}\n\n.thinkproc_side_camera_view .thinkproc-roomSuccess>div span {\n  color: var(--thinkproc-black);\n  text-align: center;\n}\n\n.thinkproc-roomScanBody .thinkproc-roomSuccess>div span.thinkproc-rsNext {\n  padding: 0.5rem 0.75rem;\n  color: var(--thinkproc-text-white);\n  font-size: var(--thinkproc-font-size-16);\n  font-weight: 500;\n  position: relative;\n  margin-bottom: 0;\n  z-index: 0;\n}\n\n.thinkproc-roomScanBody .thinkproc-roomSuccess>div span.thinkproc-rsNext::before {\n  content: '';\n  background-color: var(--thinkproc-black);\n  opacity: .8;\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  left: 0;\n  top: 0;\n  border-radius: 1.438rem;\n  z-index: -1;\n}\n\n.thinkproc_body_room :is(.thinkproc_roomDeskCompare, .compareWrap) {\n  height: 100%;\n}\n\n.thinkproc_body_room .thinkproc_roomDeskCompare .compareWrap {\n  display: flex;\n  flex-direction: column;\n}\n\n.thinkproc_body_room .thinkproc_roomDeskCompare .compareWrap.h100 {\n  justify-content: center;\n}\n\n.thinkproc_body_room .thinkproc_roomDeskCompare .compareWrap .verifyWrap {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  row-gap: 1.25rem;\n  width: 26.5rem;\n  margin: 0 auto;\n  line-height: 1.2;\n}\n\n.thinkproc_body_room .thinkproc_roomDeskCompare .ufmContainer {\n  max-height: 12.8rem;\n}\n\n@media (min-width: 1366px) {\n  .thinkproc_body_room .thinkproc_roomDeskCompare .ufmContainer {\n    max-height: 13.375rem;\n  }\n}\n\n/* Popup */\n#thinkX_cameraPopup,\n#thinkX_micPopup {\n  z-index: 9999999;\n}\n\n.thinkproc-external-popup-overlay.w600 .thinkproc-external-popup-innerbody {\n  width: 37.5rem;\n}\n\n.thinkproc-external-popup-overlay .thinkproc-custom-select-wrapper {\n  margin-bottom: 0px;\n}\n\n.thinkproc-external-popup-overlay .thinkproc-external-popup-select {\n  margin-top: 1.25rem;\n  display: inline-block;\n  width: 100%;\n  margin-bottom: 1.5rem;\n}\n\n.thinkproc-external-popup-overlay .thinkproc-external-popup-select .thinkproc-external-popup-subhdng-div {\n  margin-bottom: 0.875rem;\n}\n\n.thinkproc-external-popup-overlay .thinkproc-external-popup-select .thinkproc-external-popup-subhdng-div span {\n  font-size: var(--thinkproc-font-size-16);\n  font-weight: 600;\n}\n\n.thinkproc-external-popup-overlay .thinkproc-external-popup-select .selectWrap {\n  display: flex;\n  align-items: stretch;\n  column-gap: 0.625rem;\n}\n\n.thinkproc-external-popup-overlay .thinkproc-external-popup-select .selectWrap .thinkproc-custom-select-wrap {\n  width: calc(100% - 2.5rem);\n}\n\n.isThinkLoading .thinkproc-custom-select-wrapper {\n  position: relative;\n  height: 100%;\n  border-radius: 0.3rem;\n  background: linear-gradient(to right,\n      #e6e6e6 5%,\n      #cccccc 25%,\n      #e6e6e6 35%);\n  background-size: 1000px 100%;\n  animation: shimmer 2s linear infinite;\n}\n\n@keyframes shimmer {\n  from {\n    background-position: -1000px 0;\n  }\n\n  to {\n    background-position: 1000px 0;\n  }\n}\n\n.isThinkLoading .thinkproc-custom-select-wrapper .thinkproc-custom-select {\n  display: none;\n}\n\n.thinkproc-external-popup-overlay .thinkproc-external-popup-select .selectWrap .retryIcon {\n  width: 2.5rem;\n  height: 2.5rem;\n  padding: 0.525rem 0 0.525rem 0.525rem;\n  cursor: pointer;\n}\n\n.thinkproc-external-popup-overlay .thinkproc-external-popup-select .selectWrap .retryIcon img {\n  width: 100%;\n  height: 100%;\n  object-fit: contain;\n  object-position: center;\n  transition: transform 0.6s ease-in-out;\n}\n\n.thinkproc-external-popup-overlay .thinkproc-external-popup-select .selectWrap .retryIcon img.iconRotate {\n  animation: infinite rotate360 0.6s ease-in-out;\n}\n\n.thinkproc-external-popup-overlay.smallPopup .thinkproc-external-popup-innerbody {\n  padding: 2.5rem;\n}\n\n.thinkproc-external-popup-overlay.smallPopup .innerPopupWrap .iconBig {\n  width: 5rem;\n  height: 5rem;\n  border-radius: 50%;\n  padding: 1.3125rem 1.4375rem;\n  margin-bottom: 2rem;\n}\n\n.thinkproc-external-popup-overlay.smallPopup .innerPopupWrap .loading_gifWrap .loader {\n  width: 3.5rem;\n  height: 3.5rem;\n  margin-bottom: 1.25rem;\n}\n\n.thinkproc-external-popup-overlay.thinkX_deskPopup .thinkproc-external-popup-innerbody {\n  width: 26.688rem;\n}\n\n.thinkproc-external-popup-overlay.thinkX_deskPopup .thinkproc-external-popup-description .thinkproc-external-popup-subhdng-div {\n  color: var(--thinkproc-text-color);\n  font-size: var(--thinkproc-font-size-16);\n  font-weight: 500;\n  margin-bottom: .3rem;\n}\n\n.thinkproc-external-popup-overlay.thinkX_deskPopup .thinkproc-external-popup-description p {\n  color: var(--thinkproc-secondary-text-color);\n  font-size: var(--thinkproc-font-size-14);\n  font-weight: 400;\n  margin-bottom: 0;\n  line-height: 1.2;\n}\n\n.thinkproc-external-popup-overlay.thinkX_deskPopup .thinkproc-external-popup-description .thinlproc-desk-issueList {\n  margin-top: 1.2rem;\n}\n\n.thinkproc-external-popup-overlay.thinkX_deskPopup .thinkproc-external-popup-description .thinlproc-desk-issueList>div {}\n\n.thinkproc-external-popup-overlay.thinkX_deskPopup .thinkproc-external-popup-description .thinlproc-desk-issueList>div:not(:last-child) {\n  margin-bottom: 0.8rem;\n}\n\n.thinkproc-external-popup-overlay.thinkX_deskPopup .thinkproc-external-popup-description .thinlproc-desk-issueList>div label {\n  margin-bottom: 0;\n  display: block;\n  border: 0.063rem solid var(--thinkproc-border-color);\n  border-radius: 0.25rem;\n  padding: 0.65rem 0.625rem 0.65rem 2.125rem;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  position: relative;\n  cursor: pointer;\n  line-height: 1.2;\n}\n\n.thinkproc-external-popup-overlay.thinkX_deskPopup .thinkproc-external-popup-description .thinlproc-desk-issueList>div label::after {\n  content: '';\n  position: absolute;\n  top: 0.71rem;\n  left: 0.625rem;\n  width: 1rem;\n  height: 1rem;\n  border-radius: 50%;\n  border: 0.063rem solid var(--thinkproc-cicle-bg);\n}\n\n.thinkproc-external-popup-overlay.thinkX_deskPopup .thinkproc-external-popup-description .thinlproc-desk-issueList>div label span {\n  color: var(--thinkproc-black);\n  font-size: var(--thinkproc-font-size-16);\n  font-weight: 400;\n}\n\n.thinkproc-external-popup-overlay.thinkX_deskPopup .thinkproc-external-popup-description .thinlproc-desk-issueList>div input {\n  display: none;\n}\n\n.thinkproc-external-popup-overlay.thinkX_deskPopup .thinkproc-external-popup-description .thinlproc-desk-issueList>div input:checked+label {\n  border-color: var(--thinkproc-primary-color);\n  background-color: var(--thinkproc-informationBox-bg-color);\n}\n\n.thinkproc-external-popup-overlay.thinkX_deskPopup .thinkproc-external-popup-description .thinlproc-desk-issueList>div input:checked+label::after {\n  border-color: var(--thinkproc-primary-color);\n}\n\n.thinkproc-external-popup-overlay.thinkX_deskPopup .thinkproc-external-popup-description .thinlproc-desk-issueList>div input:checked+label::before {\n  content: '';\n  position: absolute;\n  top: 0.95rem;\n  left: 0.875rem;\n  width: 0.5rem;\n  height: 0.5rem;\n  border-radius: 50%;\n  background-color: var(--thinkproc-primary-color);\n}\n\n.thinkproc-external-popup-overlay.thinkX_deskPopup .thinkproc-external-popup-description .deskIssueDesc {\n  margin-top: 1.4rem;\n  display: flex;\n  flex-direction: column;\n  row-gap: 0.375rem;\n}\n\n.thinkproc-external-popup-overlay.thinkX_deskPopup .thinkproc-external-popup-description .deskIssueDesc textarea {\n  width: 100%;\n  color: var(--thinkproc-black);\n  font-size: var(--thinkproc-font-size-16);\n  padding: 0.4rem 0.5rem;\n  border: 0.06rem solid var(--thinkproc-border-color);\n  border-radius: 0.4rem;\n  height: 6.25rem;\n  resize: none;\n}\n\n.thinkproc-external-popup-overlay.thinkX_deskPopup .thinkproc-external-popup-description .deskIssueDesc .thinkproc_textCountWrap {\n  display: flex;\n  justify-content: flex-end;\n  align-items: center;\n}\n\n.thinkproc-external-popup-overlay.thinkX_deskPopup .thinkproc-external-popup-description .deskIssueDesc .thinkproc_textCountWrap span {\n  color: var(--thinkproc-secondary-text-color);\n  font-size: var(--thinkproc-font-size-12);\n  font-weight: 400;\n}\n\n@keyframes rotate360 {\n  from {\n    transform: rotate(0deg);\n  }\n\n  to {\n    transform: rotate(360deg);\n  }\n}\n\n.thinkproc-webcam-wrap.thinkproc-disable {\n  pointer-events: none;\n}\n\n.thinkproc-webcam-wrap.thinkproc-disable .thinkproc-custom-select-wrapper .thinkproc-custom-select-trigger {\n  color: var(--thinkproc-secondary-text-color);\n}\n\n.thinkproc-webcam-wrap.thinkproc-disable .thinkproc-custom-select-wrapper .thinkproc-custom-select-trigger::after {\n  filter: contrast(0);\n}\n\n.thinkproc-webcam-wrap.thinkproc-disable .thinkpro-btn {\n  opacity: .8;\n  background-color: var(--thinkproc-btn-d);\n  border-color: var(--thinkproc-btn-d);\n  color: var(--thinkproc-text-white);\n}\n\n.thinkproc-external-popup-overlay.thinkX_Popup {}\n\n.thinkproc-external-popup-overlay.thinkX_Popup .thinkproc-external-popup-innerbody {\n  padding: 2.75rem 2.75rem 1.5rem 2.75rem;\n  width: 31.25rem;\n}\n\n.thinkproc-external-popup-overlay.thinkX_Popup .thinkproc-external-popup-innerbody .thinkproc-external-popup-description {\n  text-align: center;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  row-gap: 1.4rem;\n  height: unset;\n  overflow: unset;\n}\n\n.thinkproc-external-popup-overlay.thinkX_Popup .thinkproc-external-popup-innerbody .thinkproc-external-popup-description .think_popupIconWrap {}\n\n.thinkproc-external-popup-overlay.thinkX_Popup .thinkproc-external-popup-innerbody .thinkproc-external-popup-description .think_popupIconWrap .icon {\n  width: 5rem;\n  height: 5rem;\n  overflow: hidden;\n  border-radius: 50%;\n  margin: 0 auto;\n  margin-bottom: 2rem;\n}\n\n.thinkproc-external-popup-overlay.thinkX_Popup .thinkproc-external-popup-innerbody .thinkproc-external-popup-description .think_popupIconWrap .icon img {\n  width: 100%;\n  height: 100%;\n  object-fit: contain;\n  object-position: center;\n}\n\n.thinkproc-external-popup-overlay.thinkX_Popup .thinkproc-external-popup-innerbody .thinkproc-external-popup-description .think_popupIconWrap span {\n  font-size: var(--thinkproc-font-size-20);\n  font-weight: 700;\n  color: var(--thinkproc-black);\n}\n\n.thinkproc-external-popup-overlay.thinkX_Popup .thinkproc-external-popup-innerbody .thinkproc-external-popup-description p {\n  font-size: var(--thinkproc-font-size-16);\n  font-weight: 500;\n  color: var(--thinkproc-black);\n  line-height: 1.625rem;\n}\n\n.thinkproc-external-popup-overlay.thinkX_Popup .thinkproc-external-popup-innerbody .thinkproc-external-popup-btn-div {\n  justify-content: center;\n}\n\n.thinkproc-external-popup-overlay.w800 .thinkproc-external-popup-innerbody {\n  width: 50rem;\n}\n\n.thinkproc-external-popup-overlay.largePopup .thinkproc-external-popup-innerbody {\n  padding: 0px;\n}\n\n.thinkproc-external-popup-overlay.largePopup .thinkproc-external-popup-box {\n  row-gap: unset;\n}\n\n.thinkproc-external-popup-overlay.largePopup .thinkproc-external-popup-hdng-div {\n  background: var(--thinkproc-gray-bg);\n  padding: 1.25rem;\n  font-size: var(--thinkproc-font-size-14);\n  font-weight: 700;\n  line-height: 1;\n  color: var(--thinkproc-black);\n  border-radius: 0.75rem 0.75rem 0 0;\n  border-bottom: 0.0625rem solid var(--thinkproc-border-color);\n}\n\n.thinkproc-external-popup-overlay.largePopup .thinkproc-external-popup-hdng-div span {\n  width: 100%;\n}\n\n.thinkproc-external-popup-overlay.largePopup .thinkproc-external-popup-description {\n  padding: 1.25rem;\n}\n\n.thinkproc-external-popup-overlay .thinkproc-external-popup-description .thinkproc-inst-list {\n  height: calc(100% - 26px);\n}\n\n.thinkproc-external-popup-overlay.sideCameraPopup .thinkproc-external-popup-description .thinkproc_side_camera_view {\n  height: 100%;\n}\n\n.thinkproc-external-popup-overlay.sideCameraPopup .thinkproc-external-popup-description .thinkproc_side_camera_view .thinkproc_side_camera_view_top {\n  margin-bottom: 0.75rem;\n}\n\n.thinkproc-external-popup-overlay.sideCameraPopup .thinkproc-external-popup-description .thinkproc_side_camera_view .thinkproc_side_camera_view_top .thinkproc_side_camera_view_title {\n  font-size: var(--thinkproc-font-size-14);\n  font-weight: 600;\n  color: var(--thinkproc-black);\n}\n\n.thinkproc-external-popup-overlay.sideCameraPopup .thinkproc-external-popup-description .thinkproc_side_camera_view .thinkproc_side_camera_view_top .thinkproc_side_camera_view_subtitle {\n  font-size: var(--thinkproc-font-size-12);\n  font-weight: 400;\n  color: var(--thinkproc-secondary-text-color);\n}\n\n.thinkproc-external-popup-overlay.sideCameraPopup .thinkproc-external-popup-description .thinkproc_side_camera_view .thinkproc_side_camera_view_bottom {\n  position: relative;\n  min-height: 26.25rem;\n  height: calc(100% - 54px);\n}\n\n.thinkproc-external-popup-overlay.sideCameraPopup .thinkproc-external-popup-description .thinkproc_side_camera_view .thinkproc_side_camera_view_bottom video {\n  border-radius: 0.5rem;\n  object-fit: contain;\n  background-color: var(--thinkproc-call-bg);\n  width: 100%;\n  height: 100%;\n}\n\n.thinkproc-external-popup-overlay.sideCameraPopup .thinkproc-external-popup-description .thinkproc_side_camera_view .thinkproc_side_camera_view_bottom .thinkproc_side_camera_view_message {\n  position: absolute;\n  left: 50%;\n  width: 95%;\n  transform: translateX(-50%);\n  bottom: 0.5rem;\n  text-align: center;\n}\n\n.thinkproc-external-popup-overlay.sideCameraPopup .thinkproc-external-popup-description .thinkproc_side_camera_view .thinkproc_side_camera_view_bottom .thinkproc_side_camera_view_message span {\n  background: var(--thinkproc-black);\n  font-size: var(--thinkproc-font-size-14);\n  font-weight: 500;\n  color: var(--thinkproc-text-white);\n  padding: 0.5rem 0.875rem;\n  border-radius: 0.5rem;\n  line-height: 1;\n  display: inline-block;\n}\n\n.thinkproc-external-popup-overlay .thinkproc-video-wrap {\n  height: 420px;\n}\n\n.thinkpro_draggableBox {\n  background-color: var(--thinkproc-black);\n  border: 0.4rem solid var(--thinkproc-background-color);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  position: absolute;\n  top: 0;\n  left: 0;\n  user-select: none;\n  transition: top 0.3s ease;\n  box-shadow: var(--thinkproc-drag-box-shadow);\n  overflow: hidden;\n  width: 100%;\n  height: 100%;\n  border-radius: inherit;\n}\n\n.thinkpro_draggableBox video {\n  width: 100%;\n  height: 100%;\n  object-fit: contain;\n  object-position: center top;\n}\n\n.thinkproc_chatIcon {\n  position: absolute;\n  width: 2.625rem;\n  height: 2.625rem;\n  border-radius: 50%;\n  background: var(--thinkproc-background-color);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  box-shadow: var(--thinkproc-drag-box-shadow);\n  cursor: pointer;\n  padding: .3rem;\n  right: 0;\n  bottom: 0;\n}\n\n.thinkproc_chatIcon img {\n  width: 100%;\n  height: 100%;\n  object-fit: contain;\n  object-position: center;\n}\n\n.thinkproc_chat {\n  position: fixed;\n  right: 20px;\n  bottom: 0;\n  z-index: 999999;\n  background-color: var(--thinkproc-background-color);\n  box-shadow: var(--thinkproc-chat-box-shadow);\n  width: 100%;\n  max-width: 20.5rem;\n  border-radius: 0.5rem;\n}\n\n.thinkprocChatMainBody {\n  height: 350px;\n  display: flex;\n  flex-direction: column;\n  overflow: hidden;\n}\n\n/* Chat Header */\n.thinkproc_chat_header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  background-color: var(--thinkproc-background-color);\n  border-bottom: 0.0625rem solid var(--thinkproc-border-color);\n  color: var(--thinkproc-black);\n  padding: 0.5rem 0.625rem;\n  border-top-left-radius: 0.5rem;\n  border-top-right-radius: 0.5rem;\n}\n\n.thinkproc_chat_header_left {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  flex-grow: 1;\n}\n\n.thinkproc_chat_proctor_img {\n  position: relative;\n}\n\n.thinkproc_chat_proctor_img .thinkproc_chat_head_imgWrap {\n  width: 28px;\n  height: 28px;\n  border-radius: 50%;\n  overflow: hidden;\n  background-color: var(--thinkproc-border-color);\n}\n\n.thinkproc_chat_proctor_img img {\n  width: 100%;\n  height: 100%;\n  object-position: center top;\n  object-fit: cover;\n}\n\n.thinkproc_chat_proc_active {\n  position: absolute;\n  bottom: 0;\n  right: 0;\n  width: 0.5rem;\n  height: 0.5rem;\n  background-color: var(--thinkproc-green-bg);\n  border-radius: 50%;\n  padding: .2rem;\n}\n\n.thinkproc_chat_proc_name {\n  font-weight: 600;\n  font-size: var(--thinkproc-font-size-14);\n  color: var(--thinkproc-black);\n  width: calc(100% - 28px);\n}\n\n.thinkproc_chat_header_right {\n  display: flex;\n  gap: 0.5rem;\n}\n\n.thinkproc_chat_header_right a {\n  text-decoration: none;\n  transition: color 0.2s ease-in-out;\n  width: 16px;\n  height: 16px;\n  position: relative;\n  opacity: 0.8;\n}\n\n.thinkproc_chat_header_right a.thinkpro_minimize_chat::after {\n  position: absolute;\n  left: 50%;\n  bottom: 2px;\n  transform: translateX(-50%);\n  content: ' ';\n  height: 2px;\n  width: 80%;\n  background-color: var(--thinkproc-black);\n}\n\n.thinkproc_chat_header_right a.thinkpro_close_chat::before,\n.thinkproc_chat_header_right a.thinkpro_close_chat::after {\n  position: absolute;\n  left: 50%;\n  content: ' ';\n  height: 100%;\n  width: 2px;\n  background-color: var(--thinkproc-black);\n}\n\n.thinkproc_chat_header_right a.thinkpro_close_chat::before {\n  transform: rotate(45deg);\n}\n\n.thinkproc_chat_header_right a.thinkpro_close_chat::after {\n  transform: rotate(-45deg);\n}\n\n.thinkproc_chat_header_right a:hover {\n  opacity: 1;\n}\n\n/* Call Notification */\n.thinkproc_chat_proc_call {\n  background-color: var(--thinkproc-call-bg);\n  color: var(--thinkproc-text-white);\n  padding: 0.5rem 0.625rem;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  position: sticky;\n  top: 0;\n  z-index: 1;\n\n}\n\n.thinkproc_chat_proc_call .thinkproc_chatpc_left {\n  font-size: var(--thinkproc-font-size-14);\n  font-weight: 400;\n  color: var(--thinkproc-text-white);\n}\n\n.thinkproc_chat_proc_call .thinkproc_chatpc_right {}\n\n.thinkproc_chat_proc_call .thinkproc_chatpc_right .thinkproc_call_action_btn {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  column-gap: 0.5rem;\n}\n\n.thinkproc_chat_proc_call .thinkproc_chatpc_right .thinkproc_call_action_btn button {\n  width: 30px;\n  height: 30px;\n  border-radius: 50%;\n  position: relative;\n  padding: 0.50rem;\n  border: none;\n}\n\n.thinkproc_chat_proc_call .thinkproc_chatpc_right .thinkproc_call_action_btn button img {\n  width: 100%;\n  height: 100%;\n  object-fit: contain;\n  object-position: center;\n}\n\n.thinkproc_chat_proc_call .thinkproc_chatpc_right .thinkproc_call_action_btn button.thinkproc_endCall {\n  background: var(--thinkproc-error-bg);\n}\n\n.thinkproc_chat_proc_call .thinkproc_chatpc_right .thinkproc_call_action_btn button.thinkproc_startCall {\n  background: var(--thinkproc-green-bg);\n}\n\n.thinkproc_chat_proc_call .thinkproc_chatpc_right .thinkproc_call_action_btn button.thinkproc_endCall img {\n  transform: rotate(135deg);\n}\n\n.thinkproc_chat_proc_call .thinkproc_chatpc_right div.thinkproc_call_timer {\n  background-color: var(--thinkproc-green-bg);\n  padding: 0.406rem 1.063rem;\n  border-radius: 30px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: var(--thinkproc-font-size-14);\n  font-weight: 400;\n  color: var(--thinkproc-text-white);\n  column-gap: 0.25rem;\n}\n\n.thinkproc_chat_proc_call .thinkproc_chatpc_right div.thinkproc_call_timer span {\n  line-height: 1;\n}\n\n.thinkproc_chat_proc_call .thinkproc_chatpc_right div.thinkproc_call_timer .thinkproc_call_icon {\n  width: 18px;\n  height: 18px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 2px;\n  position: relative;\n  top: -1px;\n}\n\n.thinkproc_chat_proc_call .thinkproc_chatpc_right div.thinkproc_call_timer .thinkproc_call_icon img {\n  width: 100%;\n  height: 100%;\n  object-fit: contain;\n  object-position: center;\n}\n\n/* Chat Body / History */\n.thinkproc_chat_body {\n  display: flex;\n  flex-direction: column;\n  flex-grow: 1;\n  overflow-y: auto;\n  background-color: var(--thinkproc-background-color);\n}\n\n/* Custom Scrollbar for Webkit browsers */\n.thinkproc_chat_body::-webkit-scrollbar {\n  width: 8px;\n}\n\n.thinkproc_chat_body::-webkit-scrollbar-track {\n  background: #f1f1f1;\n  border-radius: 10px;\n}\n\n.thinkproc_chat_body::-webkit-scrollbar-thumb {\n  background: #888;\n  border-radius: 10px;\n}\n\n.thinkproc_chat_body::-webkit-scrollbar-thumb:hover {\n  background: #555;\n}\n\n\n.thinkproc_chat_histroy {\n  display: flex;\n  flex-direction: column;\n  gap: 0.875rem;\n  padding-top: 0.5rem;\n  padding: 0.75rem;\n}\n\n/* Message Bubble Base */\n.thinkproc_chat_message-bubble {}\n\n.thinkproc-message-wrap {\n  max-width: 80%;\n  word-wrap: break-word;\n  display: flex;\n  flex-direction: column;\n}\n\n.thinkproc_chat_message-incoming .thinkproc-message-wrap {\n  align-items: flex-start;\n  margin-right: auto;\n}\n\n.thinkproc_chat_message-outgoing .thinkproc-message-wrap {\n  align-items: flex-end;\n  margin-left: auto;\n}\n\n/* Incoming Message */\n.thinkproc_chat_message-incoming .thinkproc_chat_message_top {\n  display: flex;\n  align-items: center;\n  margin-bottom: 0.25rem;\n  gap: 0.5rem;\n  width: 100%;\n}\n\n.thinkproc_chat_histroy .thinkproc_chat_message_top .thinkproc_chat_proctor_img {\n  width: 28px;\n  height: 28px;\n  border-radius: 50%;\n  overflow: hidden;\n  background-color: var(--thinkproc-border-color);\n}\n\n.thinkproc_chat_histroy .thinkproc_chat_message_top .thinkproc_chat_proctor_img img {\n  width: 100%;\n  height: 100%;\n  object-fit: contain;\n  object-position: center;\n}\n\n.thinkproc_chat_message-incoming .thinkproc_chat_message_bottom {\n  background-color: var(--thinkproc-primary-color);\n  color: var(--thinkproc-text-white);\n  align-self: flex-start;\n  border-radius: 0.25rem;\n  padding: 0.75rem;\n}\n\n.thinkproc_chat_message-incoming .thinkproc_chat_message_bottom .thinkproc_chat_message_text {\n  display: block;\n}\n\n/* Outgoing Message */\n.thinkproc_chat_message-outgoing .thinkproc_chat_message_top {\n  display: flex;\n  align-items: center;\n  flex-direction: row-reverse;\n  margin-bottom: 0.25rem;\n  gap: 0.5rem;\n  width: 100%;\n  text-align: right;\n}\n\n.thinkproc_chat_message-outgoing .thinkproc_chat_message_bottom {\n  background-color: var(--thinkproc-outgoing-message-bg);\n  color: var(--thinkproc-black);\n  align-self: flex-end;\n  border-radius: 0.25rem;\n  padding: 0.75rem;\n  max-width: 100%;\n}\n\n.thinkproc_chat_message-outgoing .thinkproc_chat_message_bottom .thinkproc_chat_message_text {\n  display: block;\n}\n\n.thinkproc_chat_message-bubble .thinkproc_chat_time-stamp {\n  font-size: 0.75rem;\n  margin-top: 0.25rem;\n  opacity: 0.8;\n}\n\n.thinkproc_chat_message-incoming .thinkproc_chat_time-stamp {\n  color: var(--thinkproc-text-white);\n  text-align: right;\n  display: block;\n  opacity: .6;\n}\n\n.thinkproc_chat_message-outgoing .thinkproc_chat_time-stamp {\n  color: var(--thinkproc-black);\n  text-align: right;\n  display: block;\n  opacity: .6;\n}\n\n\n/* Chat Footer (Message Input) */\n.thinkproc_chat_footer {\n  padding: 0.5rem 0.625rem;\n  background-color: var(--thinkproc-background-color);\n}\n\n.thinkproc_chat_footer .thinkproc_message_input_wrap {\n  display: flex;\n  gap: 0.5rem;\n  align-items: center;\n  border: 1px solid var(--thinkproc-border-color);\n  border-radius: 0.25rem;\n  padding: 0.5rem;\n}\n\n.thinkproc_chat_footer input[type=\"text\"] {\n  flex-grow: 1;\n  padding: 0.75rem 1rem;\n  font-size: 1rem;\n  outline: none;\n  border: none;\n  padding: 0px;\n  font-size: var(--thinkproc-font-size-14);\n  font-weight: 400;\n  transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;\n}\n\n.thinkproc_chat_footer input[type=\"text\"]:focus {\n  outline: none;\n}\n\n.thinkproc_chat_footer button {\n  border: none;\n  border-radius: 0;\n  cursor: pointer;\n  transition: background-color 0.2s ease-in-out, transform 0.1s ease-in-out;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 1.2rem;\n  height: 1.2rem;\n}\n\n.thinkproc_chat_footer button img {\n  width: 100%;\n  height: 100%;\n  object-fit: contain;\n  object-position: center;\n}\n\n.thinkproc_retakeImage {\n  position: fixed;\n  width: 100%;\n  height: 100%;\n  z-index: 999999;\n  top: 0;\n  left: 0;\n}\n\n.thinkproc_retakeImage::after {\n  content: '';\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  top: 0;\n  left: 0;\n  background-color: var(--thinkproc-black);\n  opacity: .6;\n  z-index: -1;\n}\n\n.thinkproc_retakeImage .thinkproc_retakeWrap {\n  background-color: var(--thinkproc-background-color);\n  border-radius: 0.5rem !important;\n  padding: 0.625rem;\n  box-shadow: var(--thinkproc-box-shadow);\n  position: absolute;\n  right: 20px;\n  top: 20px;\n  z-index: 0;\n  width: 100% !important;\n  max-width: 23.125rem;\n  height: unset !important;\n}\n\n.thinkproc_retakeImage .thinkproc_retakeWrap .thinkproc_retake_top {\n  position: relative;\n  height: 13.75rem;\n  margin-bottom: 0.75rem;\n}\n\n.thinkproc_retakeImage .thinkproc_retakeWrap .thinkproc_retake_top video {\n  border-radius: 0.5rem;\n  object-fit: cover;\n  background-color: var(--thinkproc-call-bg);\n  width: 100%;\n  height: 100%;\n}\n\n.thinkproc_retakeImage .thinkproc_retakeWrap .thinkproc_retake_top .thinkproc_retake_msg {\n  position: absolute;\n  left: 50%;\n  width: 95%;\n  transform: translateX(-50%);\n  bottom: 0.5rem;\n  text-align: center;\n}\n\n.thinkproc_retakeImage .thinkproc_retakeWrap .thinkproc_retake_top .thinkproc_retake_msg span {\n  background: var(--thinkproc-black);\n  font-size: var(--thinkproc-font-size-14);\n  font-weight: 500;\n  color: var(--thinkproc-text-white);\n  padding: 0.5rem 0.875rem;\n  border-radius: 0.5rem;\n  line-height: 1;\n  display: inline-block;\n}\n\n.thinkproc_retakeImage .thinkproc_retakeWrap .thinkproc_retake_bottom {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  column-gap: 0.75rem;\n}\n\n.thinkproc_retakeImage .thinkproc_retakeWrap .thinkproc_retake_bottom .thinkproc-progress-circle .thinkproc-percent {\n  width: 42px;\n  height: 42px;\n}\n\n.thinkproc_retakeImage .thinkproc_retakeWrap .thinkproc_retake_bottom .thinkproc-progress-circle svg circle {\n  stroke-width: 4px;\n}\n\n.thinkproc_retakeImage .thinkproc_retakeWrap .thinkproc_retake_bottom .thinkproc-progress-circle svg circle:last-of-type {\n  stroke-dashoffset: calc(169.65px - (169.65px * var(--thinkproc_retake_percent)) / 100);\n}\n\n.thinkproc_retakeImage .thinkproc_retakeWrap .thinkproc_retake_bottom .thinkproc-progress-circle .thinkproc-number {\n  font-size: var(--thinkproc-font-size-12);\n  font-weight: 600;\n}\n\n.thinkproc_chat_message-bubble.pending {\n  opacity: 0.6;\n  filter: blur(1px);\n  transition: all 0.3s ease;\n}\n\n.thinkproc_chat_message-bubble.sent {\n  opacity: 1;\n  filter: blur(0);\n}\n\n.thinkproc_chat_message-bubble.failed {\n  opacity: 0.7;\n  border-left: 4px solid red;\n}\n\n#thinkpro_MobileViewBox {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  z-index: 9999;\n}\n\n.thinkpro_MobileViewBox {\n  width: 100%;\n  height: 100%;\n  background: var(--thinkproc-black);\n}\n\n.thinkpro_MobileViewBox video {\n  width: 100%;\n  height: 100%;\n  object-fit: contain;\n  object-position: center;\n}\n\n/* Custom Checkbox */\n.think-custom-checkbox {}\n\n.think-custom-checkbox input {\n  display: none;\n}\n\n.think-custom-checkbox label {\n  position: relative;\n  cursor: pointer;\n  margin-bottom: 0;\n  font-size: var(--thinkproc-font-size-14);\n  font-weight: 500;\n  color: var(--thinkproc-black);\n  line-height: 1;\n  padding-right: 10px;\n  box-sizing: border-box;\n}\n\n.think-custom-checkbox label::before {\n  content: '';\n  -webkit-appearance: none;\n  background-color: transparent;\n  border: 1px solid var(--thinkproc-circle-color);\n  padding: 8px;\n  display: inline-block;\n  position: relative;\n  vertical-align: middle;\n  cursor: pointer;\n  margin-right: 8px;\n  border-radius: 2px;\n}\n\n.think-custom-checkbox input:checked+label::before {\n  background: var(--thinkproc-primary-color);\n  border: 1px solid var(--thinkproc-primary-color);\n}\n\n.think-custom-checkbox input:checked+label:after {\n  content: '';\n  display: block;\n  position: absolute;\n  top: 2px;\n  left: 7px;\n  width: 5px;\n  height: 10.5px;\n  border: solid var(--thinkproc-background-color);\n  border-width: 0 1px 1px 0;\n  transform: rotate(45deg);\n}\n\n/* Responsive */\n@media only screen and (max-width: 1200px) {\n  .thinkproc-video-block {\n    width: 90% !important;\n    height: 70% !important;\n  }\n}\n\n@media only screen and (max-width: 992px) {\n  .thinkproc_compatibility_wrapper {\n    display: block;\n    width: 100%;\n    padding: 0;\n    align-items: unset;\n  }\n\n  .thinkproc-popup-wrapper::before {\n    display: none;\n  }\n\n  .thinkproc-popup {\n    border: none;\n    border-radius: 0;\n    max-width: 100%;\n    box-shadow: unset;\n    height: 100%;\n  }\n\n  .thinkproc-popup.thinkproc-hide-header .thinkproc-popup-header {\n    display: none;\n  }\n\n  .thinkproc-popup-header .thinkproc-popup-header-left>div:not(.active) {\n    display: none;\n  }\n\n  .thinkproc-popup-header .thinkproc-popup-header-left {\n    width: calc(100% - 60px);\n    border: none\n  }\n\n  .thinkproc-popup-header .thinkproc-popup-header-right {\n    display: block;\n  }\n\n  .thinkproc-popup-header {\n    background-color: var(--thinkproc-gray-bg);\n    align-items: center;\n    padding: 10px 20px;\n  }\n\n  .thinkproc-popup-header .thinkproc-popup-header-left .thinkproc-compatibility-step:is(.active) {\n    background-color: unset;\n    border: none;\n  }\n\n  .thinkproc-popup-header .thinkproc-popup-header-left .thinkproc-compatibility-step {\n    text-align: left;\n    padding: 0px;\n    border: none;\n  }\n\n  .thinkproc-popup-header .thinkproc-popup-header-left .thinkproc-compatibility-step span {\n    display: inline-block;\n    color: var(--thinkproc-secondary-text-color);\n    font-weight: 400 !important;\n    padding-left: 0px !important;\n  }\n\n  .thinkproc-popup-header .thinkproc-popup-header-left .thinkproc-compatibility-step>span:first-child {\n    font-size: var(--thinkproc-font-size-20);\n    font-weight: 600 !important;\n    margin-bottom: 0px;\n    color: var(--thinkproc-text-color);\n    width: 100%;\n  }\n\n  .thinkproc-popup-header .thinkproc-popup-header-left .thinkproc-compatibility-step:is(.active) span::before {\n    display: none;\n  }\n\n  .thinkproc_body_system .thinkproc-systemCheck-header ul.thinkproc-step-list {\n    flex-wrap: wrap;\n  }\n\n  .thinkproc_body_system .thinkproc-systemCheck-header ul.thinkproc-step-list li {\n    align-items: flex-start;\n    justify-content: flex-start;\n    flex-direction: row;\n    width: 100%;\n    min-width: 100%;\n    flex-wrap: wrap;\n    gap: 20px;\n    padding: 0px;\n    min-height: 5rem;\n    padding-bottom: 20px;\n  }\n\n  .thinkproc_body_system .thinkproc-systemCheck-header ul.thinkproc-step-list li:last-child {\n    min-height: unset;\n  }\n\n  .thinkproc_body_system .thinkproc-systemCheck-header ul.thinkproc-step-list li::before {\n    width: 2px;\n    height: calc(100% - 40px);\n    left: 15px;\n    top: 35px;\n  }\n\n  .thinkproc_body_system .thinkproc-systemCheck-header ul.thinkproc-step-list li .thinkproc-sys-circle {\n    margin-bottom: 0px;\n  }\n\n  .thinkproc_body_system .thinkproc-systemCheck-header ul.thinkproc-step-list li>span {\n    position: relative;\n    top: 5px;\n    font-size: var(--thinkproc-font-size-16);\n  }\n\n  .thinkproc_body_system .thinkproc-systemCheck-header ul.thinkproc-step-list li>div:last-child {\n    padding-left: 50px;\n    width: 100%;\n    text-align: center;\n  }\n\n  .thinkproc_body_system .thinkproc-systemCheck-header ul.thinkproc-step-list li>div:is(.thinkproc-webcam-check, .thinkproc-microphone-check) {\n    text-align: left;\n  }\n\n  .thinkproc_body_system .thinkproc-systemCheck-header ul.thinkproc-step-list li>div.thinkproc-webcam-check #thinkX_cameraChecked {\n    text-align: center;\n  }\n\n  .thinkproc_body_system .thinkproc-systemCheck-header ul.thinkproc-step-list li>div.thinkproc-microphone-check :is(.audioImage, .audioStatic, .speakerAvailable, .speakerAvailable-Error, .speakerCheck, .speakerStatic, .speakerCheck-error) {\n    text-align: center;\n  }\n\n  .thinkproc_body_system .thinkproc-systemCheck-header ul.thinkproc-step-list li>div .thinkproc-error-wrap {\n    max-width: 100%;\n    margin: unset;\n  }\n\n  .thinkproc_body_system .thinkproc-systemCheck-header h1 {\n    text-align: left;\n  }\n\n  .thinkproc-popup-body {\n    min-height: calc(100vh - 81px);\n    max-height: calc(100vh - 81px);\n  }\n\n  .thinkproc-popup.thinkproc-hide-header .thinkproc-popup-body {\n    min-height: 100dvh;\n    max-height: 100dvh;\n  }\n\n  .thinkproc-webcam-wrap {\n    margin: unset;\n  }\n\n  .thinkproc-photo-id-wrap {\n    flex-direction: column-reverse;\n    column-gap: unset;\n    row-gap: 1rem;\n    height: unset;\n  }\n\n  .thinkproc-photo-id-wrap>div {\n    width: 100% !important;\n  }\n\n  .thinkproc-image-button,\n  .thinkproc_body_compare .buttonWrap,\n  .thinkproc_body_room .thinkproc-inst-bottom {\n    position: sticky;\n    bottom: 0;\n    background: var(--thinkproc-background-color);\n    padding: 15px 0px 15px;\n    border-top: 0.0623rem solid var(--thinkproc-border-color);\n  }\n\n  .thinkproc_body_compare .imageList .imageContainer {\n    flex-wrap: wrap;\n    justify-content: flex-start;\n    row-gap: 1.5rem;\n  }\n\n  .w40 {\n    width: 100%;\n  }\n\n  .thinkproc_body_system .thinkproc-systemCheck-header {\n    margin-bottom: 0px;\n  }\n\n  .thinkproc-photo-id-wrap>div.thinkproc-piRight .thinkproc-piRight-top .thinkproc-video-wrap {\n    height: 100%;\n  }\n\n  .verifyWrap,\n  .revokeWrap {\n    width: 100% !important;\n  }\n\n  .thinkproc_body_compare .imageList .imageContainer>div {\n    flex-basis: 48%;\n  }\n\n  .thinkproc-containerQR {\n    justify-content: space-between;\n  }\n\n  .thinkproc_body_room .thinkproc-ufm-wrap .thinkproc-roomUFMList .ufmContainer>div {\n    flex-basis: 23.7%;\n  }\n\n  .thinkproc_id_photo .thinkproc-wrap-header .think-wrap-header-main {\n    font-size: var(--thinkproc-font-size-16);\n  }\n\n  .thinkproc_id_photo .thinkproc-wrap-header .think-wrap-header-sub,\n  .thinkproc-inst-list ul li {\n    font-size: var(--thinkproc-font-size-14);\n  }\n\n  .thinkproc_body_compare .compareWrap>div:first-child {\n    justify-content: flex-start;\n  }\n\n  .thinkproc_body_compare.h100 .compareWrap>div:first-child {\n    justify-content: center;\n  }\n\n  .thinkproc_body_compare .imageList .imageContainer>div .icBox {\n    height: 15rem;\n  }\n\n  /* .thinkproc-inst-list{\n    max-height: 200px;\n    overflow: auto;\n  } */\n  .thinkproc-inst-list img {\n    width: 100%;\n    height: auto;\n  }\n\n  /* .thinkproc-step-body.thinkproc_body_photo.thinkproc_id_photo,\n  .thinkproc_body_room .thinkproc-instruction-start,\n  .thinkproc-containerQR,\n  .thinkproc-step-body.thinkproc_body_id.thinkproc_id_photo\n  {justify-content: initial;}\n  .thinkproc-image-button, .thinkproc_body_compare .buttonWrap, .thinkproc_body_room .thinkproc-inst-bottom{\n    border: none;\n    position: initial;\n  } */\n\n}\n\n@media only screen and (max-width: 767px) {\n  .thinkproc_body_compare .imageList .imageContainer {\n    column-gap: 0.5rem;\n  }\n\n  .thinkproc_body_compare .imageContainer>div {\n    flex-basis: 80%;\n  }\n\n  .thinkproc_body_compare .imageContainer>div .icBox {\n    height: 15rem;\n  }\n\n  .thinkproc_body_compare .imageList .imageContainer>div .icBox {\n    height: 8rem;\n  }\n\n  .thinkproc_body_system {\n    padding: 1.75rem 1.875rem 1.375rem;\n  }\n\n  .thinkproc-containerQR .selectWrap {\n    width: 100%;\n  }\n\n  .thinkproc_body_room .thinkproc-ufm-wrap .thinkproc-roomUFMList .ufmContainer>div {\n    flex-basis: 48.4%;\n  }\n\n  .thinkproc_body_compare .thinkproc_loaderWrap {\n    width: 5rem;\n    height: 5rem;\n  }\n\n  .varificationMsgWrap {\n    font-size: var(--thinkproc-font-size-16);\n  }\n\n  .thinkproc-roomScanBody .thinkproc-roomSuccess>div span {\n    font-size: var(--thinkproc-font-size-15);\n  }\n\n  .thinkproc_body_room {\n    padding: 1rem;\n  }\n\n  .thinkproc_body_room .thinkproc-roomScan .thinkproc-roomScanBody {\n    height: calc(100% - 4.875rem);\n  }\n}\n\n@media only screen and (max-width: 380px) {\n  .thinkproc_body_room .thinkproc-ufm-wrap .thinkproc-roomUFMList .ufmContainer>div {\n    flex-basis: 48%;\n  }\n\n  #thinkX-additionalCamName {\n    text-align: center;\n  }\n\n}\n\n.thinkproc-thinkinterview-lobby {\n  background-color: #FFFFFF;\n\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n}\n\n.thinkproc-main-header {\n  background-color: #fff;\n  border-bottom: 1px solid #e0e0e0;\n  padding: 15px 28px 12px 28px;\n  width: 100%;\n  height: 58px;\n  display: flex;\n  justify-content: space-between;\n}\n\n\n.thinkproc-logo-container {\n  display: flex;\n  align-items: center;\n  height: 28px;\n  width: 100%;\n}\n\n.thinkproc-logo {\n  height: 24px;\n}\n\n.thinkproc-divider {\n  width: 1px;\n  height: 20px;\n  background-color: #fff;\n  margin: 0 10px;\n}\n\n.thinkproc-main-header .thinkproc-title {\n  font-family: Public Sans;\n  font-weight: 700;\n  color: #000000;\n  font-size: 15px;\n  margin-top: 5px;\n  height: 28px;\n}\n\n\n.thinkproc-container {\n  display: flex;\n  flex-direction: column;\n  overflow-y: auto;\n  /* height: 70%; */\n  /* margin: 49px auto; */\n\n  height: calc(100% - 58px);\n  align-items: center;\n  justify-content: center;\n}\n\n.thinkproc-video-block {\n  position: relative;\n  background: #18192b;\n  /* border: 3px solid #1893e6; */\n  border-radius: 11px;\n  width: 900px;\n  height: 506px;\n  overflow: hidden;\n  margin: 0 auto;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  margin: 10px 0;\n}\n\n.thinkproc-video-block img,\n#thinkInterview_candidateVideo {\n  width: 100%;\n  height: auto;\n}\n\n\n.thinkproc-name-tag {\n  position: absolute;\n  top: 14px;\n  left: 16px;\n  background: #0000004D;\n  color: #fff;\n  padding: 9px 15px;\n  border-radius: 18px;\n  font-size: 14px;\n  font-weight: 600;\n  z-index: 2;\n  line-height: 1;\n}\n\n\n.thinkproc-controls {\n  position: absolute;\n  bottom: 24px;\n  left: 0;\n  width: 100%;\n  display: flex;\n  justify-content: center;\n  gap: 12px;\n  z-index: 2;\n}\n\n.thinkproc-control-btn {\n  background: #222;\n  border-radius: 50%;\n  width: 46px;\n  height: 46px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n}\n\n.thinkproc-control-btn:focus {\n  outline: none;\n}\n\n.thinkproc-join-section {\n  margin-top: 20px;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n\n.thinkproc-join-btn {\n  font-family: Public Sans;\n  background: #2F4DDB !important;\n  color: #fff;\n  border: none;\n  font-size: 16px;\n  /* padding: 14px 0; */\n  padding: 10px 16px 10px 16px;\n  border-radius: 4px;\n  width: 380px;\n  height: 46px;\n  cursor: pointer;\n  font-weight: 600;\n  /* margin-bottom: 12px; */\n\n}\n\n.thinkproc-join-btn-waiting {\n  font-family: Public Sans;\n  background: #fff !important;\n  color: #2F4DDB;\n  border: 1px solid #2F4DDB;\n  font-size: 16px;\n  /* padding: 14px 0; */\n  padding: 10px 16px 10px 16px;\n  border-radius: 4px;\n  width: 380px;\n  /* height: 46px; */\n  cursor: pointer;\n  font-weight: 600;\n  /* margin-bottom: 12px; */\n  display: flex;\n  column-gap: 8px;\n  align-items: center;\n  flex-direction: row-reverse;\n  justify-content: center;\n\n}\n\n.thinkproc-join-btn-waiting .thinkX_loading_withText {\n  position: unset;\n  transform: unset;\n  flex-direction: unset;\n  row-gap: unset;\n}\n\n.thinkproc-join-btn-waiting .thinkX_loading_withText .thinkproc_loader {\n  height: 2.5rem;\n  width: 2.5rem;\n}\n\n.thinkproc-join-btn:focus {\n  outline: none;\n}\n\n.thinkproc-consent {\n  font-size: 16px;\n  color: #000000;\n  margin-top: 21px;\n  text-align: center;\n}\n\n.thinkproc-consent a {\n  color: #2F4DDB;\n  /* text-decoration: underline; */\n  margin: 0 2px;\n}\n\n/* Responsive */\n/* @media (max-width: 700px) {\n      .thinkproc-container, .thinkproc-video-block {\n        max-width: 98vw;\n        height: 48vw;\n        min-height: 200px;\n      }\n    } */\n\n\n/* Popup */\n.popup-overlay {\n  position: fixed;\n  inset: 0;\n  background: rgba(0, 0, 0, 0.6);\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  z-index: 9999;\n  animation: fadeIn 0.25s ease-in-out;\n  backdrop-filter: blur(2px);\n}\n\n.popup-box {\n  background: #fff;\n  border-radius: 12px;\n  /* padding: 30px 28px 25px; */\n  padding: 24px;\n  /* height: 419px; */\n  width: 450px;\n  /* max-width: 90%; */\n  /* box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25); */\n  animation: scaleIn 0.3s ease-out;\n  text-align: center;\n}\n\n.popup-header {\n  display: flex;\n  align-items: baseline;\n  gap: 8px;\n  text-align: left;\n  margin-bottom: 12px;\n}\n\n.popup-header h3 {\n  font-family: Public Sans;\n  font-size: 18px;\n  font-weight: 600;\n  color: #000000;\n  /* line-height: 1.5; */\n  line-height: 24px;\n  margin: 0;\n}\n\n.popup-icon {\n  font-size: 22px;\n  color: #2f4ddb;\n  margin-top: 2px;\n  flex-shrink: 0;\n  /* width: 18px;\n  height: 16px; */\n}\n\n.popup-box p {\n  font-family: Public Sans;\n  font-weight: 400;\n  font-size: 14px;\n  color: #000000;\n  text-align: left;\n  line-height: 1.6;\n  margin-top: 4px;\n}\n\n.popup-img img {\n  width: 172px;\n  height: 112px;\n  /* max-width: 100%; */\n  /* margin: 22px auto 18px; */\n  margin: 24px auto 32px;\n  display: block;\n}\n\n.popup-actions {\n  display: flex;\n  justify-content: right;\n  margin-top: 48px;\n}\n\n.proceed-btn {\n  font-family: Public Sans;\n  background-color: #2f4ddb;\n  color: #fff;\n  border: none;\n  padding: 9px 36px;\n  border-radius: 4px;\n  font-size: 14px;\n  cursor: pointer;\n  font-weight: 600;\n  /* transition: background 0.2s ease-in-out, transform 0.1s ease-in-out; */\n}\n\n.proceed-btn:hover {\n  background-color: #1e39b9;\n  transform: translateY(-1px);\n}\n\n@keyframes fadeIn {\n  from {\n    opacity: 0;\n  }\n\n  to {\n    opacity: 1;\n  }\n}\n\n@keyframes scaleIn {\n  from {\n    transform: scale(0.9);\n    opacity: 0.6;\n  }\n\n  to {\n    transform: scale(1);\n    opacity: 1;\n  }\n}\n\n/* Disable page scroll when popup is open */\nbody.popup-open {\n  overflow: hidden;\n}\n\n/* Responsive */\n@media (max-height: 500px) {\n  .popup-box {\n    margin: 20px;\n    align-self: flex-start;\n  }\n}\n\n\n\n/* ========== INTERVIEW PAGE STYLES ========== */\n.thinkproc-interview-lobby {\n  /* display: flex;\n  flex-direction: column;\n  height: 100vh;\n  background: #fff;\n  font-family: \"Poppins\", sans-serif; */\n\n  background-color: #FFFFFF;\n\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n}\n\n\n.thinkproc-candidate-designation {\n  font-family: Public Sans;\n  font-weight: 700;\n  color: #000000;\n  font-size: 15px;\n  margin-top: 5px;\n  height: 28px;\n  padding-right: 28px;\n\n  width: 100%;\n  text-align: right;\n}\n\n.thinkproc-main-card {\n  display: flex;\n  flex-direction: column;\n  height: calc(100vh - 58px);\n  overflow: hidden;\n}\n\n/* Video Section */\n.thinkproc-interview-container {\n  margin-top: 20px;\n  /* height: calc(100% - 84px); */\n  height: calc(100% - 126px);\n  /* flex-grow: 1; */\n}\n\n.thinkproc-interview-video-section {\n  display: flex;\n  /* justify-content: center; */\n  align-items: start;\n  flex: 1;\n  position: relative;\n  background: #FFFFFF;\n  padding: 0 20px;\n  gap: 5px;\n  height: 100%;\n}\n\n.thinkproc-interview-video-section-inner {\n  display: flex;\n  border-radius: 8px;\n  overflow: hidden;\n  /* margin-right: 20px; */\n  width: calc(100% - 280px);\n  height: 100%;\n}\n\n.thinkproc-interviewer-video {\n  position: relative;\n  /* width: 1108px; */\n  /* width: 1475px; */\n  width: 60%;\n  /* height: 680px; */\n  border-radius: 10px; \n  overflow: hidden;\n  background: #000;\n  /*box-shadow: 0 0 10px rgba(0, 0, 0, 0.3); */\n  /* height: 79vh; */\n  /* height: calc(100vh - 190px); */\n  height: 100%;\n  flex-grow: 1;\n  margin-right: 5px;\n}\n\n#thinkproc-additional-cam-section.thinkproc-interviewer-video {\n  width: 40%;\n}\n\n#thinkproc-additional-cam-section {\n  border-left: 1px solid #343d4d;\n}\n\n.thinkproc-interviewer-video img {\n  width: 100%;\n}\n\n\n.thinkproc-interview-video-label {\n  /* position: absolute;\n  bottom: 5px;\n  left: 10px;\n  color: #fff;\n  font-size: 14px; */\n\n  position: absolute;\n  /* top: 14px; */\n  bottom: 10px;\n  /* left: 16px; */\n  left: 10px;\n  background: #0000004D;\n  color: #fff;\n  padding: 9px 15px;\n  border-radius: 18px;\n  font-size: 14px;\n  font-weight: 600;\n  z-index: 2;\n  line-height: 1;\n}\n\n.thinkproc-interview-lobby-recording {\n  font-family: Public Sans;\n  font-weight: 600;\n  font-size: 16px;\n  color: #000000;\n}\n\n.thinkproc-interview-lobby-timer {\n  font-family: Public Sans;\n  position: relative;\n  /* bottom: 10px;\n  left: 10px; */\n  /* background: #0000004D; */\n  background: #0000000D;\n  /* color: #fff; */\n  color: #000000;\n  /* padding: 9px 15px; */\n  border-radius: 18px;\n  /* font-size: 14px; */\n  font-size: 16px;\n  font-weight: 400;\n  z-index: 2;\n  line-height: 1;\n  width: 67px;\n  height: 31px;\n  text-align: center;\n  padding-top: 7px;\n}\n\n/* Candidate window */\n.thinkproc-candidate-video {\n  /* position: absolute; */\n  /* top: 20px; */\n  top: 0px;\n  /* right: 20px; */\n  /* width: 200px;\n  height: 120px; */\n  border-radius: 8px;\n  /* overflow: hidden; */\n  /* border: 3px solid #fff; */\n  /* box-shadow: 0 0 8px rgba(0, 0, 0, 0.4); */\n\n  /* width: 320px; */\n  /* height: 180px; */\n  /* width: 280px; */\n  width: 100%;\n  height: 20vh;\n}\n\n.thinkproc-candidate-video-interview {\n  position: relative;\n}\n\n.thinkproc-candidate-video img {\n  width: 100%;\n  height: 100%;\n  /* object-fit: cover; */\n  border-radius: 8px;\n}\n\n.thinkproc-candidate-label {\n  font-family: Public Sans;\n  font-weight: 600;\n  font-size: 14px;\n  position: absolute;\n  bottom: 5px;\n  left: 5px;\n  background: #0000004D;\n  color: #fff;\n  padding: 2px 8px;\n  border-radius: 83px;\n}\n\n/* Footer Controls */\n.thinkproc-video-control-bar {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 24px;\n  background: #fff;\n  position: relative;\n}\n\n.thinkproc-recording {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-size: 14px;\n}\n\n.thinkproc-rec-dot {\n  width: 8px;\n  height: 8px;\n  background: red;\n  border-radius: 50%;\n}\n\n.thinkproc-video-controls {\n  display: flex;  \n  align-items: flex-end;\n  gap: 16px;\n  flex-wrap: wrap;\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  transform: translate(-50%, -50%);\n  z-index: 2;\n}\n\n.thinkproc-chat-controls {\n  display: flex;\n  /* align-items: center; */\n  align-items: flex-end;\n  gap: 10px;\n}\n\n.thinkproc-chat-controls span {\n  font-family: Public Sans;\n  font-weight: 400;\n  font-size: 12px;\n  color: #000000;\n}\n\n.thinkproc-video-control-btn {\n  display: grid;\n  background: transparent;\n  border: none;\n  cursor: pointer;\n  gap: 8px;\n  place-items: center;\n  /* font-size: 14px;\n  color: #444;\n  padding: 8px 12px;\n  border-radius: 8px;\n  transition: background 0.3s; */\n}\n\n/* .thinkproc-video-control-btn:hover {\n  background: #f1f3f4;\n} */\n\n/* .end-call {\n  background: red;\n  color: #fff;\n  border-radius: 50%;\n  padding: 10px 14px;\n} */\n\n.thinkproc-video-control-btn:focus {\n  outline: none;\n}\n\n.thinkproc-video-control-btn span {\n  font-family: Public Sans;\n  font-weight: 400;\n  font-size: var(--thinkproc-font-size-12);\n  color: #000000;\n\n  /* padding-top: 10px; */\n}\n\n/* ========== ANIMATIONS & RESPONSIVENESS ========== */\n@keyframes fadeIn {\n  from {\n    opacity: 0;\n  }\n\n  to {\n    opacity: 1;\n  }\n}\n\n@keyframes slideUp {\n  from {\n    transform: translateY(30px);\n    opacity: 0;\n  }\n\n  to {\n    transform: translateY(0);\n    opacity: 1;\n  }\n}\n\n.fade-in {\n  animation: fadeIn 0.4s ease-in-out;\n}\n\n/* Responsive */\n@media (max-width: 768px) {\n  /* .thinkproc-interviewer-video {\n    width: 90%;\n    height: 60%;\n  }\n\n  .thinkproc-candidate-video {\n    width: 140px;\n    height: 90px;\n    right: 20px;\n  }\n\n  .thinkproc-video-control-bar {\n    flex-direction: column;\n    align-items: center;\n    gap: 12px;\n  } */\n\n  /* .interview-title {\n    font-size: 14px;\n    text-align: center;\n  } */\n}\n\n\n\n\n.thinkproc-chat-popup {\n  position: absolute;\n  bottom: 0;\n  right: 20px;\n  /* left: 0; */\n  width: 277px;\n  height: 460px;\n  background: #fff;\n  border-radius: 8px;\n  border: 1px solid #DEE6EA;\n  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);\n  display: flex;\n  flex-direction: column;\n  overflow: hidden;\n  font-family: Public Sans;\n  z-index: 2000;\n  animation: fadeIn 0.25s ease-in-out;\n}\n\n@keyframes fadeIn {\n  from {\n    opacity: 0;\n    transform: scale(0.95);\n  }\n\n  to {\n    opacity: 1;\n    transform: scale(1);\n  }\n}\n\n/* Header */\n.thinkproc-chat-header {\n  background: #FFFFFF;\n  padding: 10px 14px;\n  font-weight: bold;\n  border-bottom: 1px solid #ddd;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  height: 52px;\n}\n\n.thinkproc-chat-header span {\n  font-family: Public Sans;\n  font-weight: 600;\n  font-size: 16px;\n  color: #000000;\n}\n\n.thinkproc-chat-header button {\n  outline: none;\n  /* vertical-align: middle !important; */\n}\n\n.thinkproc-chat-popup-close-btn {\n  border: none;\n  background: none;\n  font-size: 18px;\n  cursor: pointer;\n  color: #555;\n  transition: 0.2s;\n}\n\n/* .thinkproc-chat-popup-close-btn:hover {\n  color: #000;\n} */\n\n/* Body */\n.thinkproc-chat-body {\n  flex: 1;\n  /* padding: 12px; */\n  padding: 20px 16px 0px;\n  overflow-y: auto;\n  display: flex;\n  flex-direction: column;\n  height: calc(100% - 108px);\n  /* gap: 10px; */\n\n  /* flex-direction: column-reverse; */\n}\n\n.thinkproc-chat-body .chat-msg-wrapper:not(:last-child) {\n  margin-bottom: 16px;\n}\n\n.thinkproc-chat-message {\n  display: flex;\n  flex-direction: column;\n}\n\n.thinkproc-message-sender {\n  font-family: Public Sans;\n  font-weight: 400;\n  font-size: 12px;\n  /* margin-bottom: 2px; */\n  /* margin-bottom: 8px; */\n  margin: 0px;\n  color: #848484;\n}\n\n.thinkproc-message-sender.you {\n  text-align: right;\n  /* margin-top: 24px; */\n}\n\n.thinkproc-message-text {\n  font-family: Public Sans;\n  /* background: #f0f0f0; */\n  color: #000000;\n  font-size: 14px;\n  /* padding: 8px 12px; */\n  margin-bottom: 24px;\n  border-radius: 10px;\n  max-width: 100%;\n  align-self: flex-start;\n  word-wrap: break-word;\n}\n\n.thinkproc-message-text:last-child {\n  margin: 0;\n}\n\n.thinkproc-message-text.you {\n  background: #d1e8ff;\n  align-self: flex-end;\n  text-align: right;\n}\n\n.thinkproc-message-noDataFound {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  /* height: calc(100% - 92px); */\n  height: 100%;\n  flex-direction: column;\n  row-gap: 10px;\n}\n\n.thinkproc-message-noDataFound span {\n  font-weight: var(--thinkproc-font-weight-400);\n  font-size: var(--thinkproc-font-size-14);\n  color: rgba(95, 103, 119, 1);\n}\n\n.thinkproc-message-noDataFound img {\n  max-width: 100%;\n  height: auto;\n}\n\n\n/* Footer */\n.thinkproc-chat-footer {\n  display: flex;\n  align-items: center;\n  /* border-top: 1px solid #E3E8EB; */\n  background: #FFFFFF;\n  padding: 12px 16px;\n  position: relative;\n  /* padding: 2px 16px 16px 16px; */\n}\n\n/* Input box */\n.thinkproc-chat-footer input {\n  flex: 1;\n  /* border: 1px solid #E3E8EB; */\n  border-radius: 4px;\n  background: #FFFFFF;\n  padding: 10px 42px 10px 14px;\n  font-family: Public Sans;\n  font-size: 14px;\n  /* color: #000000; */\n  border: 1px solid #C4C9CF;\n  /* outline: none; */\n  transition: border-color 0.2s ease;\n  height: 40px;\n  width: 100%;\n}\n\n.thinkproc-chat-footer input::placeholder {\n  color: #667085;\n}\n\n.thinkproc-chat-footer input:focus {\n  /* border-color: #007BFF;\n  background: #FFFFFF; */\n\n  outline: none;\n}\n\n/* Send button */\n.thinkproc-chat-footer button {\n  position: absolute;\n  right: 28px;\n  background: none;\n  border: none;\n  outline: none;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 0;\n}\n\n.thinkproc_interviewerVideo {\n  width: 100%;\n  height: 100%;\n  object-fit: contain;\n  /* border-radius: 8px; */\n  background-color: black;\n}\n\n.thinkproc-candidate-video.thinkproc-candidate-video-interview .thinkproc_interviewerVideo {\n  border-radius: 8px;\n}\n\n/* .thinkproc-chat-footer button img {\n  width: 20px;\n  height: 20px;\n  opacity: 0.7;\n  transition: opacity 0.2s ease;\n} */\n\n/* .thinkproc-chat-footer button:hover img {\n  opacity: 1;\n} */\n\n/* Chat pop-up */\n\n\n/* Scrollbar Styling */\n/* .thinkproc-chat-body::-webkit-scrollbar {\n  width: 6px;\n}\n.thinkproc-chat-body::-webkit-scrollbar-thumb {\n  background: #bbb;\n  border-radius: 10px;\n} */\n\n/* ✅ Responsive Design */\n/* @media (max-width: 600px) {\n  .thinkproc-chat-popup {\n    width: 90%;\n    height: 70%;\n    right: 5%;\n    bottom: 10px;\n    max-height: none;\n  }\n\n  .thinkproc-chat-header {\n    font-size: 16px;\n  }\n\n  .thinkproc-chat-body {\n    padding: 10px;\n  }\n\n  .thinkproc-chat-footer input {\n    font-size: 13px;\n  }\n}\n\n@media (max-width: 400px) {\n  .thinkproc-chat-popup {\n    width: 100%;\n    height: 100%;\n    right: 0;\n    bottom: 0;\n    border-radius: 0;\n  }\n} */\n\n\n/* Screen Sharing Popup CSS  */\n#thinkX_screenShareErrorNewPopup .thinkproc-external-popup-innerbody {\n  width: 31.25rem;\n}\n\n.thinkproc-external-popup-hdng-div {\n  vertical-align: baseline;\n}\n\n.thinkproc-external-popup-hdng-div .icon {\n  display: flex;\n}\n\n#thinkX_screenSharePopup .thinkproc-external-popup-box {\n  row-gap: 1rem;\n}\n\n#thinkX_screenShareError {\n  margin: 0;\n}\n\n.thinkproc-external-popup-descrip {\n  color: var(--thinkproc-text-color);\n  font-size: var(--thinkproc-font-size-16);\n  font-weight: 600;\n}\n\n.thinkproc-external-popup-sub-descrip {\n  color: var(--thinkproc-secondary-text-color);\n  font-size: var(--thinkproc-font-size-14);\n  font-weight: 400;\n}\n\n.thinkproc-external-popup-innerbodydiv,\n.thinkproc-external-popup-innerbody-section {\n  display: flex;\n  flex-direction: column;\n  /* row-gap: 24px; */\n  row-gap: 16px;\n}\n\n.thinkproc-external-popup-innerbody-section {\n  row-gap: 4px;\n}\n\n.thinkproc-external-popup-sharing-imgdiv {\n  text-align: center;\n}\n\n.thinkproc-external-popup-sub-descrip2 ul {\n  padding-left: 1rem;\n  margin: 0;\n}\n\n.thinkproc-external-popup-sub-descrip2 ul li {\n  color: var(--thinkproc-text-color);\n  font-size: var(--thinkproc-font-size-14);\n  font-weight: 400;\n  list-style-type: disc;\n}\n\n#thinkX_screenShareError {\n  color: var(--thinkproc-error-bg);\n  margin: 0;\n}\n\n/* ID Varification Popup Css */\n.thinkproc-id-varification-popup-overlay {\n  position: fixed;\n  inset: 0;\n  background: rgba(0, 0, 0, 0.55);\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  z-index: 2000;\n  animation: fadeIn 0.2s ease-in-out;\n}\n\n/* Popup box */\n.thinkproc-id-varification-popup-box {\n  background: #fff;\n  border-radius: 12px;\n  /* width: 958px; */\n  width: 80%;\n  max-width: 900px;\n  /* padding: 30px 40px; */\n  box-shadow: 0 6px 25px rgba(0, 0, 0, 0.2);\n  font-family: Public Sans;\n  text-align: left;\n}\n\n.thinkproc-id-varification-popup-subtext {\n  /* width: 958px; */\n  width: 100%;\n  /* height: 83px; */\n  font-family: Public Sans;\n}\n\n.thinkproc-id-varification-popup-subtext h2 {\n  font-weight: 600;\n  font-size: 18px;\n  color: #000000;\n  padding: 24px 24px 12px 24px;\n  margin-bottom: 0px;\n}\n\n.thinkproc-id-varification-popup-subtext p {\n  font-weight: 400;\n  font-size: 14px;\n  color: #5F6777;\n  margin-bottom: 0px;\n  padding: 0px 24px 7px 24px;\n  border-bottom: 1px solid #DEE6EA;\n}\n\n\n/* Grid for images */\n.thinkproc-id-verification-grid {\n  /* display: grid;\n  grid-template-columns: 1fr 1fr; */\n  /* gap: 22px 32px; */\n  /* margin-bottom: 25px; */\n  padding-right: 10px;\n}\n\n.thinkproc-id-verification-gridWrrper {\n  height: 317px;\n  overflow-y: auto;\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  padding: 16px 16px 16px 24px;\n  gap: 24px;\n}\n\n/* Scrollbar Styling */\n.thinkproc-id-verification-grid::-webkit-scrollbar {\n  width: 6px;\n}\n\n.thinkproc-id-verification-grid::-webkit-scrollbar-thumb {\n  background: #bbb;\n  border-radius: 10px;\n}\n\n.thinkproc-id-verification-section {\n  /* padding: 16px 24px 0px 24px; */\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n}\n\n.thinkproc-id-varification-title {\n  display: flex;\n  justify-content: space-between;\n  margin-bottom: 20px;\n  align-items: center;\n}\n\n.thinkproc-id-varification-title h4 {\n  font-family: Public Sans;\n  font-weight: 500;\n  font-size: 14px;\n}\n\n.thinkproc-id-varification-ai-match {\n  border: 1px solid #4FA171;\n  color: #4FA171;\n  padding: 0px 10px;\n  font-family: Public Sans;\n  border-radius: 15px;\n  font-size: 14px;\n  font-weight: 500;\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  background: #f6fffa;\n}\n\n.thinkproc-id-varification-ai-match .thinkproc-green-dot {\n  width: 8px;\n  height: 8px;\n  background-color: #4FA171;\n  border-radius: 50%;\n}\n\n.thinkproc-id-varification-ai-match-orange {\n  border: 1px solid #cc4441;\n  color: #cc4441;\n  padding: 0px 10px;\n  font-family: Public Sans;\n  border-radius: 15px;\n  font-size: 14px;\n  font-weight: 500;\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  background: #f6fffa;\n}\n\n.thinkproc-id-varification-ai-match-orange .thinkproc-orange-dot {\n  width: 8px;\n  height: 8px;\n  background-color: #cc4441;\n  border-radius: 50%;\n}\n\n.thinkproc-id-verification-section h4 {\n  font-size: 15px;\n  color: #333;\n  /* margin-bottom: 10px; */\n  margin-bottom: 0px;\n}\n\n.thinkproc-id-verification-image-container {\n  position: relative;\n  border-radius: 10px;\n  overflow: hidden;\n  border: 1px solid #e5e5e5;\n}\n\n.thinkproc-id-verification-image-container img {\n  width: 100%;\n  height: 247px;\n  object-fit: cover;\n  display: block;\n}\n\n.thinkproc-id-verification-match-tag {\n  position: absolute;\n  top: 10px;\n  right: 10px;\n  font-size: 12px;\n  font-weight: 500;\n  padding: 4px 10px;\n  border-radius: 20px;\n  color: #fff;\n}\n\n\n/* Buttons */\n.thinkproc-id-verification-popup-actions {\n  text-align: right;\n  margin-top: 10px;\n  padding: 16px 24px 16px;\n  position: relative;\n}\n\n.thinkproc-id-verification-popup-actions button {\n  font-size: 14px;\n  padding: 8px 20px;\n  border: none;\n  border-radius: 6px;\n  cursor: pointer;\n  font-weight: 500;\n}\n\n.thinkproc-id-verification-popup-actions {\n\n  .thinkproc-allow-note-box {\n    position: absolute;\n    right: 20px;\n    bottom: 69px;\n    text-align: left;\n    background-color: #fff;\n    border-radius: 8px;\n    width: 320px;\n    padding: 20px 16px;\n    box-shadow: 0 20px 24px -4px #0a0d121a;\n    height: auto;\n    border: 1px solid #E7E9EC;\n    flex-direction: column;\n    display: flex;\n\n    .thinkproc-allow-note-question {\n      font-size: 14px;\n      font-weight: 500;\n      color: #000;\n      line-height: 18px;\n      margin-bottom: 20px;\n    }\n\n    .thinkproc-note-textarea {\n      min-height: 100px;\n      resize: none;\n      padding: 12px;\n      font-size: 14px;\n      border: 1px solid #C4C9CF;\n      border-radius: 4px;\n      font-family: inherit;\n      font-weight: 400;\n    }\n  }\n\n  .btn-allow-confirm {\n    align-self: flex-end;\n    background: #2F4DDB;\n    color: #fff;\n    padding: 6px 24px;\n    font-size: 14px;\n    font-weight: 500;\n    border: none;\n    border-radius: 4px;\n    cursor: pointer;\n    margin-top: 16px;\n    width: 100%;\n  }\n\n  .thinkproc-btn-allow-confirm {\n    background: #CC4441;\n    color: #fff;\n  }\n\n  .thinkproc-note-close {\n    position: absolute;\n    top: 8px;\n    right: 10px;\n    border: none;\n    background: transparent;\n    font-size: 18px;\n    cursor: pointer;\n    line-height: 1;\n  }\n}\n\n.thinkproc-id-verification-popup-actions {\n\n  .thinkproc-allow-note-box {\n    position: absolute;\n    right: 20px;\n    bottom: 69px;\n    text-align: left;\n    background-color: #fff;\n    border-radius: 8px;\n    width: 320px;\n    padding: 20px 16px;\n    box-shadow: 0 20px 24px -4px #0a0d121a;\n    height: auto;\n    border: 1px solid #E7E9EC;\n    flex-direction: column;\n    display: flex;\n\n\n\n    .thinkproc-allow-note-question {\n      font-size: 14px;\n      font-weight: 500;\n      color: #000;\n      line-height: 18px;\n      margin-bottom: 20px;\n    }\n\n    .thinkprocRejectHeder {\n      display: flex;\n      align-items: center;\n      justify-content: space-between;\n      column-gap: 10px;\n      margin-bottom: 20px;\n\n      .thinkproc-allow-note-question {\n        margin-bottom: 0;\n      }\n\n      .thinkproc-note-close {\n        position: unset;\n        padding: 0;\n      }\n    }\n\n    .thinkproc-note-textarea {\n      min-height: 100px;\n      resize: none;\n      padding: 12px;\n      font-size: 14px;\n      border: 1px solid #C4C9CF;\n      border-radius: 4px;\n      font-family: inherit;\n      font-weight: 400;\n    }\n  }\n\n  .btn-allow-confirm {\n    align-self: flex-end;\n    background: #2F4DDB;\n    color: #fff;\n    padding: 6px 24px;\n    font-size: 14px;\n    font-weight: 500;\n    border: none;\n    border-radius: 4px;\n    cursor: pointer;\n    margin-top: 16px;\n    width: 100%;\n  }\n\n  .thinkproc-btn-allow-confirm {\n    background: #CC4441;\n    color: #fff;\n  }\n}\n\n.thinkproc-reject-btn {\n  background: #CC4441;\n  color: #fff;\n  margin-right: 10px;\n}\n\n.thinkproc-allow-btn {\n  background: #2F4DDB;\n  color: #fff;\n}\n\n.thinkproc-allow-note-backdrop {\n  position: fixed;\n  inset: 0;\n  z-index: 1050;\n  display: block;\n\n  .thinkproc-allow-note-box {\n    position: absolute;\n    right: 20px;\n    bottom: 120px;\n    background-color: #fff;\n    border-radius: 8px;\n    width: 320px;\n    padding: 20px 16px;\n    box-shadow: 0 20px 24px -4px #0a0d121a;\n    height: auto;\n    border: 1px solid #E7E9EC;\n    flex-direction: column;\n    display: flex;\n\n    .thinkproc-allow-note-question {\n      font-size: 14px;\n      font-weight: 500;\n      color: #000;\n      line-height: 18px;\n      margin-bottom: 20px;\n    }\n\n    .thinkproc-note-textarea {\n      min-height: 100px;\n      resize: none;\n      padding: 12px;\n      font-size: 14px;\n      border: 1px solid #C4C9CF;\n      border-radius: 4px;\n      font-family: inherit;\n      font-weight: 400;\n    }\n  }\n\n  .btn-allow-confirm {\n    align-self: flex-end;\n    background: #2F4DDB;\n    color: #fff;\n    padding: 6px 24px;\n    font-size: 14px;\n    font-weight: 500;\n    border: none;\n    border-radius: 4px;\n    cursor: pointer;\n    margin-top: 16px;\n    width: 100%;\n  }\n}\n\n/* Animation */\n@keyframes fadeIn {\n  from {\n    opacity: 0;\n    transform: scale(0.95);\n  }\n\n  to {\n    opacity: 1;\n    transform: scale(1);\n  }\n}\n\n/* Scrollbar Styling */\n.thinkproc-id-verification-grid::-webkit-scrollbar {\n  width: 6px;\n}\n\n.thinkproc-id-verification-grid::-webkit-scrollbar-thumb {\n  background: #bbb;\n  border-radius: 10px;\n}\n\n\n/* Candidate Criteria Popup CSS */\n.thinkproc-candidate-criteria-popup-overlay {\n  position: fixed;\n  inset: 0;\n  background: rgba(0, 0, 0, 0.55);\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  z-index: 2000;\n  animation: fadeIn 0.3s ease-in-out;\n}\n\n/* Popup Box */\n.thinkproc-candidate-criteria-popup-box {\n  background: #fff;\n  border-radius: 12px;\n  /* padding: 32px 40px; */\n  width: 650px;\n  max-width: 90%;\n  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.25);\n  text-align: left;\n\n  width: 712px;\n  height: auto;\n}\n\n.thinkproc-candidate-criteria-popup-box h3 {\n  font-family: Public Sans;\n  font-size: 18px;\n  color: #000000;\n  padding: 20px 32px;\n  margin-bottom: 0px;\n  font-weight: 600;\n  border-bottom: 1px solid var(--thinkproc-border-color);\n}\n\n.thinkproc-candidate-criteria-Section {\n  padding: 2px 24px 0px;\n}\n\n/* Section Titles */\n.thinkproc-criteria {\n  /* margin-bottom: 22px; */\n  border-bottom: 1px solid var(--thinkproc-border-color);\n  padding: 24px 52px 24px 12px;\n}\n\n.thinkproc-criteria h4 {\n  font-family: Public Sans;\n  font-size: 16px;\n  color: #000000;\n  font-weight: 600;\n  margin-bottom: 24px;\n}\n\n/* Tags */\n.thinkproc-criteria-tags {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 10px;\n}\n\n.thinkproc-criteria-tags span {\n  font-family: Public Sans;\n  /* background: #f0f3ff; */\n  /* color: #4753f0; */\n  background: #ECEDFE;\n  color: #000000;\n  padding: 6px 14px;\n  /* padding: 12px; */\n  border-radius: 20px;\n  font-size: 14px;\n  font-weight: 400;\n  white-space: nowrap;\n}\n\n.thinkproc-id-varification-btn {\n  border-top: 1px solid #ddd;\n  padding: 16px 20px 20px;\n}\n\n/* Proceed Button */\n.proceed-btn {\n  display: block;\n  margin-left: auto;\n  background: #2F4DDB;\n  color: #fff;\n  font-size: 14px;\n  font-weight: 600;\n  border: none;\n  padding: 11px 26px;\n  border-radius: 4px;\n  cursor: pointer;\n  transition: background 0.2s ease-in-out;\n}\n\n/* .proceed-btn:hover {\n  background: #2547e6;\n} */\n\n/* Fade-in Animation */\n@keyframes fadeIn {\n  from {\n    opacity: 0;\n    transform: scale(0.98);\n  }\n\n  to {\n    opacity: 1;\n    transform: scale(1);\n  }\n}\n\n\n.thinkproc-waiting-overlay {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  /* background: rgba(0, 0, 0, 0.6); */\n  color: #fff;\n  font-size: 18px;\n  font-weight: 500;\n  /* z-index: 2; */\n  /* background: black; */\n}\n\n.thinkproc-waiting-overlay .waiting-content {\n  text-align: center;\n  animation: fadeIn 0.6s ease-in-out;\n}\n\n.waiting-candidate-img {\n  width: 130px !important;\n  height: 130px;\n  border-radius: 50%;\n  object-fit: cover;\n  box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);\n  margin-bottom: 15px;\n}\n\n.waiting-text {\n  font-size: 1.2rem;\n  font-weight: 500;\n  color: #e8eaed;\n  letter-spacing: 0.5px;\n}\n\n@keyframes fadeIn {\n  from {\n    opacity: 0;\n    transform: scale(0.95);\n  }\n\n  to {\n    opacity: 1;\n    transform: scale(1);\n  }\n}\n\n.thinkproc-audio-heartbeat {\n  position: absolute;\n  top: 12px;\n  right: 12px;\n  background-color: #3366ff;\n  border-radius: 50%;\n  width: 42px;\n  height: 42px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  gap: 3px;\n}\n\n.thinkproc-audio-heartbeat .bar {\n  width: 2.5px;\n  height: 12px;\n  background: white;\n  border-radius: 2px;\n  transform-origin: bottom center;\n  transition: height 0.1s ease;\n}\n\n.thinkproc-audio-muted {\n  position: absolute;\n  top: 12px;\n  right: 12px;\n  background-color: #0f5f5f;\n  border-radius: 50%;\n  width: 40px;\n  height: 40px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  gap: 3px;\n}\n\n\n\n/* Thank You Popup CSS */\n.thinkproc-thankyou-popup-overlay {\n  position: fixed;\n  inset: 0;\n  background: rgba(0, 0, 0, 0.55);\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  z-index: 1000;\n  font-family: \"Public Sans\", sans-serif;\n}\n\n/* Popup box */\n.thinkproc-thankyou-popup-box {\n  background: #fff;\n  border-radius: 12px;\n  text-align: center;\n\n\n  width: 500px;\n  height: auto;\n}\n\n/* Icon container */\n.thinkproc-thankyou-popup-icon {\n  position: relative;\n  /* margin-bottom: 20px; */\n  padding: 80px 190px 10px 190px;\n}\n\n.thinkproc-thankyou-text {\n  margin-bottom: 52px;\n  padding-top: 24px;\n}\n\n/* Text */\n.thinkproc-thankyou-text h2 {\n  /* margin-top: 10px; */\n  font-size: 28px;\n  font-weight: 600;\n  color: #000;\n  margin: 0;\n}\n\n.thinkproc-thankyou-text p {\n  color: #5F6777;\n  font-size: 16px;\n  font-weight: 400;\n  /* line-height: 1.5; */\n  line-height: 24px;\n  margin: 16px 0 0 0;\n}\n\n.thinkproc-thankyou-btn {\n  margin-bottom: 20px;\n}\n\n/* Button */\n.thinkproc-thankyou-close-btn {\n  background: #2F4DDB;\n  color: #fff;\n  border: none;\n  border-radius: 4px;\n  cursor: pointer;\n  font-size: 14px;\n  font-weight: 600;\n  transition: 0.3s ease;\n\n  width: 120px;\n  height: 40px;\n}\n\n.thinkproc-thankyou-close-btn:hover {\n  background: #2F4DDB;\n}\n\n\n\n/* End-Session Popup CSS */\n.thinkproc-end-session-container {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background-color: rgba(0, 0, 0, 0.7);\n  justify-content: center;\n  align-items: center;\n  z-index: 1000;\n}\n\n/* Popup Box */\n.thinkproc-end-session-popup {\n  background-color: white;\n  border-radius: 8px;\n  /* width: 80%; */\n  /* max-width: 500px; */\n  /* height: 194px; */\n  width: 400px;\n  height: auto;\n  padding: 24px 20px 24px 20px;\n  text-align: center;\n  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);\n}\n\n.thinkproc-end-session-header h2 {\n  margin: 0;\n  color: var(--thinkproc-text-color);\n  font-family: var(--thinkproc-font-family);\n  font-size: var(--thinkproc-font-size-18);\n  font-weight: 600;\n  margin-bottom: 10px;\n}\n\n.thinkproc-end-session-footer {\n  margin-top: 48px;\n  width: 100%;\n  display: flex;\n  justify-content: end;\n  gap: 10px;\n  padding: 10px 0 0 0;\n}\n\n/* .thinkproc-end-session-cancel-btn, .thinkproc-end-session-confirm-btn {\n  padding: 10px 20px;\n  font-size: 14px;\n  font-weight: 500;\n  border-radius: 4px;\n  outline: none;\n} */\n\n.thinkproc-end-session-cancel-btn,\n.thinkproc-end-session-confirm-btn {\n  width: 88px;\n  height: 40px;\n  background-color: var(--thinkproc-background-color);\n  color: var(--thinkproc-text-color);\n  border: none;\n  font-size: 14px;\n  font-weight: 500;\n  transition: unset;\n}\n\n.thinkproc-end-session-cancel-btn:hover {\n  /* border: 1px solid var(--thinkproc-primary-color); */\n  border: 1px solid var(--thinkproc-error-bg);\n  border-radius: 4px;\n  background-color: var(--thinkproc-error-bg);\n  color: var(--thinkproc-text-white);\n}\n\n.thinkproc-end-session-confirm-btn {\n  background-color: var(--thinkproc-primary-color);\n  color: var(--thinkproc-text-white);\n}\n\n.thinkproc-end-session-confirm-btn:hover {\n  border: 1px solid var(--thinkproc-primary-color);\n  border-radius: 4px;\n  background-color: var(--thinkproc-primary-color);\n  /* color: var(--thinkproc-black); */\n}\n\n/* Media Queries for Responsiveness */\n@media (max-width: 768px) {\n  .thinkproc-end-session-popup {\n    width: 90%;\n    padding: 15px;\n  }\n}\n\n@media (max-width: 480px) {\n  .thinkproc-end-session-header h2 {\n    font-size: 1.25rem;\n  }\n\n  .thinkproc-end-session-footer button {\n    font-size: 14px;\n    padding: 8px 16px;\n  }\n}\n\n/* * session Feedback Popup CSS  */\n.thinkproc-feedback-popup-overlay {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background: rgba(0, 0, 0, 0.5);\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n.thinkproc-feedback-popup {\n  background-color: white;\n  /* padding: 30px; */\n  border-radius: 8px;\n  width: 610px;\n  height: 600px;\n  /* Added a fixed height for the popup */\n  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);\n  text-align: left;\n  display: flex;\n  flex-direction: column;\n  /* Set to column to align content vertically */\n}\n\n.thinkproc-feedback-popup h2 {\n  font-family: Public Sans;\n  font-weight: 600;\n  font-size: 18px;\n  color: #000000;\n  line-height: 28px;\n  margin: 0;\n}\n\n.thinkproc-feedback-popup p {\n  font-family: Public Sans;\n  font-weight: 400;\n  font-size: 14px;\n  color: #5F6777;\n  margin-top: 0px !important;\n}\n\n.thinkproc-feedback-title>p {\n  border-bottom: 1px solid #DEE6EA;\n  padding-top: 0 !important;\n  padding: 18px 24px;\n}\n\n.thinkproc-feedback-title h2 {\n  padding: 24px 24px 4px;\n}\n\n/* .thinkproc-feedback-title p {\n\n} */\n\n.thinkproc-feedback-section {\n  margin-bottom: 20px;\n  text-align: left;\n}\n\n.thinkproc-feedback-section label {\n  font-family: Public Sans;\n  font-weight: 500;\n  font-size: 16px;\n  display: block;\n  margin-bottom: 5px;\n  color: #333;\n}\n\n.thinkproc-feedback-description {\n  font-family: Public Sans;\n  font-weight: 400;\n  font-size: 14px;\n  color: #777;\n  margin-top: 5px;\n}\n\n.thinkproc-feedback-rating {\n  display: flex;\n  /* justify-content: space-evenly;\n    margin-top: 10px; */\n  margin-bottom: 32px;\n\n  justify-content: space-between;\n  margin-top: 0px;\n}\n\n.thinkproc-feedback-rating span {\n  display: inline-block;\n  width: 36px;\n  height: 36px;\n  border-radius: 50%;\n  /* background-color: #e0e0e0; */\n  background-color: #fff;\n  color: #000000;\n  font-size: 16px;\n  font-weight: 400;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  cursor: pointer;\n  transition: background-color 0.3s ease;\n  border: 1px solid #DEE6EA;\n}\n\n.thinkproc-feedback-rating span.active {\n  background-color: #2F4DDB;\n  color: white;\n}\n\n.thinkproc-feedback-rating span:hover {\n  background-color: #b0b0b0;\n}\n\n.thinkproc-feedback-submit-btn {\n  width: 120px;\n  height: 40px;\n  background-color: #2F4DDB;\n  color: white;\n  border: none;\n  border-radius: 4px;\n  font-size: 16px;\n  cursor: pointer;\n  transition: background-color 0.3s ease;\n  align-self: end;\n  /* place the button */\n  /* margin-top: auto; Push the button to the bottom */\n  margin-bottom: 20px;\n  margin-right: 20px;\n}\n\n\n.thinkproc-feedback-submit-btn {\n  outline: none;\n}\n\n.thinkproc-feedback-submit-btn:hover {\n  background-color: #0052cc;\n}\n\n.thinkproc-feedback-chart {\n  flex: 1;\n  /* Take remaining space */\n  /* padding: 32px 8px 24px 24px; */\n  padding: 32px 8px 42px 24px;\n\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n  overflow-y: auto;\n}\n\n.addiCamDisconnect {\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  transform: translate(-50%, -50%);\n  color: #fff;\n  text-align: center;\n}\n\n.addiCamDisconnect img {\n  width: 70px;\n  height: 70px;\n  /* border-radius: 50%; */\n  object-fit: contain;\n  object-position: center;\n  margin-bottom: 6px;\n}\n\n.thinkproc-complete-feedback-section {\n  overflow-y: auto;\n  /* Enables vertical scroll */\n  height: 100%;\n  padding-right: 16px;\n}\n\n/* Scrollbar Styling */\n.thinkproc-feedback-chart::-webkit-scrollbar {\n  width: 4px;\n  /* Thinner scrollbar */\n}\n\n/* Remove the scrollbar button arrows */\n.thinkproc-feedback-chart::-webkit-scrollbar-button {\n  display: none;\n}\n\n/* Subtle gray thumb for scrollbar */\n.thinkproc-feedback-chart::-webkit-scrollbar-thumb {\n  /* background: rgba(0, 0, 0, 0.2); Subtle gray thumb */\n  background: #E7E9EC;\n  border-radius: 10px;\n}\n\n/* Light background for the track */\n.thinkproc-feedback-chart::-webkit-scrollbar-track {\n  /* background: rgba(0, 0, 0, 0.1); Lighter track */\n  background: #E7E9EC;\n}\n\n\n/* Overlay */\n/* .thinkproc-id-varification-popup-overlay {\n  position: fixed;\n  inset: 0;\n  background: rgba(0, 0, 0, 0.55);\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  z-index: 2000;\n  animation: fadeIn 0.2s ease-in-out;\n} */\n\n/* Popup box */\n/* .thinkproc-id-varification-popup-box {\n  background: #fff;\n  border-radius: 12px;\n  width: 80%;\n  max-width: 900px;\n  box-shadow: 0 6px 25px rgba(0, 0, 0, 0.2);\n  font-family: Public Sans;\n  text-align: left;\n} */\n\n/* .thinkproc-id-varification-popup-subtext h2 {\n  font-weight: 600;\n  font-size: 18px;\n  color: #000000;\n  margin-bottom: 8px;\n  margin-bottom: 12px;\n} */\n\n/* .thinkproc-id-varification-popup-subtext p {\n  font-weight: 400;\n  font-size: 14px;\n  color: #5F6777;\n  margin-bottom: 24px;\n} */\n\n/* .popup-subtext {\n  font-size: 14px;\n  color: #777;\n  margin-bottom: 25px;\n} */\n\n/* Grid for images */\n/* .thinkproc-id-verification-grid {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 22px 32px;\n  margin-bottom: 25px;\n} */\n\n/* .thinkproc-id-verification-section h4 {\n  font-size: 15px;\n  color: #333;\n  margin-bottom: 10px;\n} */\n\n/* .thinkproc-id-verification-image-container {\n  position: relative;\n  border-radius: 10px;\n  overflow: hidden;\n  border: 1px solid #e5e5e5;\n} */\n\n/* .thinkproc-id-verification-image-container img {\n  width: 100%;\n  height: 180px;\n  object-fit: cover;\n  display: block;\n} */\n\n/* .thinkproc-id-verification-match-tag {\n  position: absolute;\n  top: 10px;\n  right: 10px;\n  font-size: 12px;\n  font-weight: 500;\n  padding: 4px 10px;\n  border-radius: 20px;\n  color: #fff;\n} */\n\n/* .green {\n  background-color: #3ac569;\n}\n\n.orange {\n  background-color: #ff9800;\n} */\n\n/* Buttons */\n/* .thinkproc-id-verification-popup-actions {\n  text-align: right;\n  margin-top: 10px;\n} */\n\n/* .thinkproc-id-verification-popup-actions button {\n  font-size: 14px;\n  padding: 8px 20px;\n  border: none;\n  border-radius: 6px;\n  cursor: pointer;\n  font-weight: 500;\n} */\n\n/* .reject-btn {\n  background: #f44336;\n  color: #fff;\n  margin-right: 10px;\n}\n\n.allow-btn {\n  background: #2979ff;\n  color: #fff;\n} */\n\n/* Animation */\n/* @keyframes fadeIn {\n  from {\n    opacity: 0;\n    transform: scale(0.95);\n  }\n  to {\n    opacity: 1;\n    transform: scale(1);\n  }\n} */\n\n\n/* Scrollbar Styling\n.thinkproc-id-verification-grid::-webkit-scrollbar {\n  width: 6px;\n}\n.thinkproc-id-verification-grid::-webkit-scrollbar-thumb {\n  background: #bbb;\n  border-radius: 10px;\n} */\n\n\n\n\n/* Candidate Criteria Popup CSS */\n.thinkproc-candidate-criteria-popup-overlay {\n  position: fixed;\n  inset: 0;\n  background: rgba(0, 0, 0, 0.55);\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  z-index: 2000;\n  animation: fadeIn 0.3s ease-in-out;\n}\n\n/* Popup Box */\n.thinkproc-candidate-criteria-popup-box {\n  background: #fff;\n  border-radius: 12px;\n  /* padding: 32px 40px; */\n  width: 650px;\n  max-width: 90%;\n  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.25);\n  text-align: left;\n\n  width: 712px;\n  height: auto;\n}\n\n.thinkproc-candidate-criteria-popup-box h3 {\n  font-family: Public Sans;\n  font-size: 18px;\n  color: #000000;\n  padding: 20px 32px;\n  margin-bottom: 0px;\n  font-weight: 600;\n  border-bottom: 1px solid var(--thinkproc-border-color);\n}\n\n.thinkproc-candidate-criteria-Section {\n  padding: 2px 24px 0px;\n}\n\n/* Section Titles */\n.thinkproc-criteria {\n  /* margin-bottom: 22px; */\n  border-bottom: 1px solid var(--thinkproc-border-color);\n  padding: 24px 52px 24px 12px;\n}\n\n.thinkproc-criteria h4 {\n  font-family: Public Sans;\n  font-size: 16px;\n  color: #000000;\n  font-weight: 600;\n  margin-bottom: 24px;\n}\n\n/* Tags */\n/* .thinkproc-criteria-tags {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 10px;\n} */\n\n/* .thinkproc-criteria-tags span {\n  font-family: Public Sans;\n  background: #ECEDFE;\n  color: #000000;\n  padding: 12px;\n  border-radius: 20px;\n  font-size: 14px;\n  font-weight: 400;\n  white-space: nowrap;\n} */\n\n/* .thinkproc-id-varification-btn {\n  border-top: 1px solid #ddd;\n  padding: 16px 20px 20px;\n} */\n\n/* Proceed Button */\n/* .proceed-btn {\n  display: block;\n  margin-left: auto;\n  background: #2F4DDB;\n  color: #fff;\n  font-size: 14px;\n  font-weight: 600;\n  border: none;\n  padding: 11px 26px;\n  border-radius: 4px;\n  cursor: pointer;\n  transition: background 0.2s ease-in-out;\n} */\n\n/* .proceed-btn:hover {\n  background: #2547e6;\n} */\n\n/* Fade-in Animation */\n/* @keyframes fadeIn {\n  from {\n    opacity: 0;\n    transform: scale(0.98);\n  }\n  to {\n    opacity: 1;\n    transform: scale(1);\n  }\n} */\n\n\n\n/* feedback session Overlay */\n.thinkproc-feedback-popup-overlay {\n  position: fixed;\n  inset: 0;\n  background: rgba(0, 0, 0, 0.55);\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  z-index: 1000;\n}\n\n/* Popup Box */\n.thinkproc-feedback-popup {\n  background: #fff;\n  width: 642px;\n  height: 612px;\n  border-radius: 10px;\n  display: flex;\n  flex-direction: column;\n  max-height: 80vh;\n  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);\n  overflow: hidden;\n}\n\n/* Header */\n.thinkproc-feedback-popup-header {\n  padding: 24px;\n  border-bottom: 1px solid #e5e5e5;\n  margin-bottom: 0px;\n}\n\n.thinkproc-feedback-popup-header h3 {\n  margin: 0;\n  font-size: 16px;\n  font-weight: 600;\n  color: #333;\n}\n\n.thinkproc-feedback-popup-header p {\n  margin: 4px 0 0;\n  color: #666;\n  font-size: 13px;\n}\n\n\n/* Scrollable Content */\n.thinkproc-feedback-popup-body {\n  flex: 1;\n  overflow-y: auto;\n  position: relative;\n  /* padding-bottom: 80px; */\n  padding-bottom: 16px;\n}\n\n/* Fixed Behavior Skills section */\n.thinkproc-feedback-behavior-skills {\n  position: sticky;\n  top: 0;\n  background: #fff;\n  padding: 24px 24px 16px;\n  font-weight: 500;\n  font-size: 14px;\n  /* border-bottom: 1px solid #e5e5e5; */\n  z-index: 2;\n}\n\n/* \n.thinkproc-session-behavior-skills input {\n  margin-right: 6px;\n} */\n\n.thinkproc-feedback-behavior-skills span {\n  margin-right: 6px;\n}\n\n/* Skill Cards */\n.thinkproc-feedback-skills-list {\n  padding: 0px 24px 16px;\n  overflow: auto;\n  /* height: 400px; */\n  overflow: auto;\n  max-height: 36vh;\n}\n\n.thinkproc-feedback-skill-card {\n  background: #F9F9F9;\n  border-radius: 8px;\n  padding: 16px;\n  margin-bottom: 14px;\n\n  height: 118px;\n  width: 572px;\n}\n\n.thinkproc-feedback-skill-card h4 {\n  margin: 0;\n  font-size: 14px;\n  font-weight: 600;\n  color: #222;\n}\n\n.thinkproc-feedback-skill-card p {\n  font-size: 12px;\n  color: #777;\n  margin: 4px 0 10px;\n}\n\n/* Fixed Footer */\n.thinkproc-feedback-popup-footer {\n  position: sticky;\n  bottom: 0;\n  background: #fff;\n  /* border-top: 1px solid #e5e5e5; */\n  padding: 14px 24px;\n  display: flex;\n  justify-content: flex-end;\n  z-index: 2;\n}\n\n.thinkproc-feedback-next-btn {\n  background: #3366ff;\n  color: #fff;\n  border: none;\n  padding: 10px 45px;\n  border-radius: 6px;\n  cursor: pointer;\n  font-size: 14px;\n  transition: background 0.2s ease;\n}\n\n.thinkproc-feedback-next-btn:hover {\n  background: #2a54d8;\n}\n\n/* Scrollbar Styling */\n.popup-body::-webkit-scrollbar {\n  width: 6px;\n}\n\n.thinkproc-feedback-skills-list::-webkit-scrollbar-thumb {\n  background: #ccc;\n  border-radius: 6px;\n}\n\n.thinkproc-feedback-skills-list::-webkit-scrollbar-thumb:hover {\n  background: #999;\n}\n\n\n.thinkproc-feedback-comment-section h3 {\n  font-size: 15px;\n  margin-bottom: 4px;\n}\n\n.thinkproc-feedback-comment-section p {\n  font-size: 13px;\n  color: #666;\n  margin-bottom: 8px;\n}\n\n.thinkproc-feedback-comment-section textarea {\n  width: 100%;\n  height: 100px;\n  border: 1px solid #ddd;\n  border-radius: 6px;\n  padding: 10px;\n  resize: none;\n  font-family: inherit;\n}\n\n#thinkproc-feedback-popup-tab .thinkproc-feedback-popup {\n  height: auto;\n}\n\n#thinkproc-feedback-popup-tab .thinkproc-session-popup-footer {\n  display: flex;\n  justify-content: end;\n  padding: 16px 20px 20px 20px;\n}\n\n.thinkproc-feedback-next-btn.thinkproc-disable,\nbutton:disabled {\n  opacity: .8;\n  background-color: var(--thinkproc-btn-d);\n  pointer-events: none;\n  border-color: var(--thinkproc-btn-d);\n  color: var(--thinkproc-text-white);\n}\n\n\n\n\n/* UFM Page CSS */\n.thinkproc-ufm-main-container {\n  display: flex;\n  flex: 1;\n  overflow: hidden;\n  margin: 20px 20px 0px 20px;\n  height: 85%;\n}\n\n/* Video Section */\n.thinkproc-ufm-video-section {\n  display: flex;\n  flex: 1;\n  background: #000;\n  width: 80%;\n}\n\n.thinkproc-ufm-video-box {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  position: relative;\n  border-right: 2px solid #111;\n}\n\n.thinkproc-ufm-candiae-video {\n  width: 60%;\n}\n\n\n.thinkproc-ufm-video-box img,\n.thinkproc-ufm-video-box video {\n  width: 100%;\n  height: 100%;\n  object-fit: contain;\n}\n\n.thinkproc-ufm-video-box:last-child {\n  border-right: none;\n  width: 40%;\n}\n\n\n.thinkproc-ufm-video-label {\n  position: absolute;\n  bottom: 10px;\n  left: 10px;\n  font-size: 15px;\n  font-size: 600;\n  color: #fff;\n}\n\n\n\n.thinkproc-ufm-side-page {\n  display: flex;\n  flex: 1;\n  overflow: hidden;\n  width: 18%;\n  height: 100%;\n  position: absolute;\n  top: 0px;\n  /* right: 20px; */\n  border-radius: 8px;\n  width: 100%;\n  z-index: 1;\n}\n\n/* UFM Panel */\n.thinkproc-ufm-panel {\n  /* width: 20%; */\n  width: 100%;\n  height: 100%;\n  background: #fff;\n  border: 1px solid #DEE6EA;\n  border-radius: 8px;\n  display: flex;\n  flex-direction: column;\n}\n\n.thinkproc-ufm-header {\n  padding: 16px;\n  border-bottom: 1px solid #DEE6EA;\n  margin-bottom: 12px;\n}\n\n.thinkproc-ufm-first h3 {\n  margin: 0;\n  font-size: 16px;\n  font-weight: 600;\n}\n\n.thinkproc-ufm-first {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 20px;\n\n}\n\n.thinkproc-ufm-header p {\n  font-size: 13px;\n  color: #777;\n  line-height: 20px;\n  margin: 0;\n}\n\n.thinkproc-ufm-list {\n  flex: 1;\n  overflow-y: auto;\n  /* padding: 10px; */\n}\n\n.thinkproc-ufm-item {\n  display: flex;\n  gap: 15px;\n  padding: 12px;\n  margin-bottom: 8px;\n  background: #FFFFFF;\n  border-bottom: 1px solid #DEE6EA;\n  align-items: flex-start;\n}\n\n.thinkproc-ufm-item img {\n  padding: 0px 0px 15px 0px;\n}\n\n.thinkproc-ufm-item.active {\n  background: #ffeaea;\n  border: none;\n  border-radius: 4px;\n}\n\n\n.thinkproc-now-time {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n\n.thinkproc-now-time h4 {\n  font-size: 14px;\n  font-weight: 500;\n  margin-bottom: 8px;\n}\n\n.thinkproc-ufm-content p {\n  font-size: 12px;\n  color: #666;\n  line-height: 100%;\n  margin: 0px;\n  ;\n}\n\n.thinkproc-now-time span {\n  display: block;\n  font-size: 11px;\n  color: #999;\n  text-align: right;\n}\n\n\n\n\n.thinkproc-profile-matric {\n  overflow-y: auto;\n  /* padding: 10px; */\n  background: #FFFFFF;\n}\n\n.thinkproc-metrics-section {\n  padding: 16px;\n  border-bottom: 1px solid #DEE6EA;\n}\n\n.thinkproc-metrics-section h4 {\n  font-family: Public Sans;\n  font-size: 14px;\n  font-weight: 600;\n  margin-bottom: 16px;\n}\n\n.thinkproc-metric-card {\n  background: #2F4DDB0F;\n  border-radius: 4px;\n  padding: 8px 28px 8px 8px;\n  display: flex;\n  align-items: center;\n  margin-bottom: 8px;\n  transition: background 0.2s;\n  column-gap: 6px;\n}\n\n\n.thinkproc-metric-card p {\n  font-family: Public Sans;\n  font-size: 14px;\n  font-weight: 400;\n  color: #000000;\n  margin: 0px;\n\n}\n\n.thinkproc-progress-circle circle#thinkinterview_leavecount {\n  stroke: #007bff;\n  /* Blue color */\n  stroke-width: 4;\n  stroke-linecap: round;\n  stroke-dasharray: 232;\n  /* (2 * π * r) => 2 * 3.14 * 37 */\n  stroke-dashoffset: 0;\n  transition: stroke-dashoffset 0.3s linear;\n}\n\n\n/* .thinkproc-metric-card:hover {\n  background: #2F4DDB0F;\n} */\n\n\n.think_interview_noUfmList {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 100%;\n  height: calc(100% - 155px);\n  flex-direction: column;\n  row-gap: 10px;\n}\n\n.think_interview_noUfmList img {\n  max-width: 100%;\n  height: auto;\n}\n\n.think_interview_noUfmList span {\n  font-weight: var(--thinkproc-font-weight-400);\n  font-size: var(--thinkproc-font-size-14);\n  color: rgba(95, 103, 119, 1);\n}\n\n.thinkInterview_blueUFMText {\n  color: rgba(47, 77, 219, 1);\n}\n\n.thinkproc-candidate-video-interview .active {\n  border: 2px solid #2b7cff;\n  box-shadow: 0 0 8px rgba(43, 124, 255, 0.6);\n}\n.think-interview-revoke-camera{\n  font-family: Public Sans;\n    font-weight: 600;\n    font-size: 14px;\n    bottom: 5px;\n    left: 5px;\n    background: #0000004D;\n    color: #fff;\n    padding: 6px 8px;\n    border-radius: 83px;\n}\n.thinkX_cameraInstructionPopup .thinkproc-external-popup-description-align :is(ul, li) {\n  padding-left: 0;\n}\n\n.thinkX_cameraInstructionPopup .thinkproc-external-popup-description-align ul li::before {\n  display: none;\n}/* Step card */\n.thinkX_step-card {\n  background: var(--thinkproc-gray-bg);\n  border: 0.5px solid var(--thinkproc-border-color);\n  border-radius: 12px;\n  padding: 13px 14px;\n  display: flex;\n  align-items: flex-start;\n  gap: 12px;\n  margin-bottom: 10px;\n}\n\n.thinkX_step-icon {\n  width: 38px;\n  height: 38px;\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n  margin-top: 1px;\n}\n\n.thinkX_step-content {\n  flex: 1;\n}\n\n.thinkX_step-title {\n  font-size: 13px;\n  font-weight: 500;\n  color: var(--thinkproc-text-color);\n  margin: 0 0 3px;\n}\n\n.thinkX_step-desc {\n  font-size: 13px !important;\n  color: var(--thinkproc-secondary-text-color);\n  margin: 0;\n  line-height: 1.55;\n}";
styleInject(css_248z);

const EVENT = {
    CLOSE_APPLICATION: 'close-application',
    SUSPEND_EXAM: 'suspend-exam',
    SUSPEND_RESUME_EXAM: 'suspend-resume-exam',
    TERMINATE_EXAM: 'terminate-exam',
    PLAY_EXAM: 'play-exam',
    PAUSED_EXAM: 'paused-exam',
    NETWORK_REVOKE: 'network-revoke',
    NETWORK_RESTORE: 'network-restore'
}; // 👈 Important: 'as const' makes the string literals literal types
/**
 *
 */
class EventManager {
    eventList;
    /**
     *
     */
    constructor() {
        this.eventList = {};
    }
    /**
     *
     * @param eventName
     * @param fn
     */
    register(eventName, fn) {
        // If the event name is not already registered, initialize it with an empty array
        if (!this.eventList.hasOwnProperty(eventName)) {
            this.eventList[eventName] = [];
        }
        // Add the callback function to the list of listeners for the event
        this.eventList[eventName].push(fn);
    }
    /**
     *
     * @param eventName
     * @param params
     */
    trigger(eventName, ...params) {
        // If no callbacks are registered for the event, exit early
        if (!this.eventList.hasOwnProperty(eventName)) {
            return;
        }
        const listeners = this.eventList[eventName];
        // Call each registered function with the provided parameters
        listeners.forEach((fn) => {
            // Use the spread operator to pass parameters.
            // Type safety is enforced by 'Parameters<SdkEventCallbacks[K]>'.
            fn(...params);
        });
    }
}
const events = new EventManager();

class UiEvents {
    mainDiv;
    /**
     * Initializes the UI events handler with the main container
     * @param mainDiv - The main container element
     */
    init(mainDiv) {
        this.mainDiv = mainDiv;
    }
    beforeuloadEvent(fn) {
        window.addEventListener('beforeunload', (event) => {
            // Set a return value to trigger the confirmation dialog
            fn();
        });
    }
    blurEvent(fn) {
        window.addEventListener('blur', (event) => {
            fn();
        });
    }
    onFocusEvent(fn) {
        window.addEventListener('focus', (event) => {
            fn();
        });
    }
    closeApplicationEvent(fn) {
        this.mainDiv.addEventListener('click', (event) => {
            const target = event.target;
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
    createOptions(select, options, defaultVal) {
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
    buildCustomOptionsContainer(select, trigger) {
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
    attachOptionClickHandler(select, optionsContainer, trigger, customSelect) {
        const placeholder = select.getAttribute('placeholder') || '';
        optionsContainer.addEventListener('click', (e) => {
            const target = e.target;
            if (!target.classList.contains('thinkproc-custom-option'))
                return;
            const value = target.dataset.value;
            if (!value)
                return;
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
    buildCustomSelect(select) {
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
    updateCustomOptionsContainer(select, defaultVal) {
        const wrapper = select.closest('.thinkproc-custom-select-wrapper');
        if (!wrapper)
            return;
        const customSelect = wrapper.querySelector('.thinkproc-custom-select');
        const trigger = wrapper.querySelector('.thinkproc-custom-select-trigger');
        const oldOptionsContainer = wrapper.querySelector('.thinkproc-custom-options');
        if (!customSelect || !trigger || !oldOptionsContainer)
            return;
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
    closeAllDropdowns() {
        document
            .querySelectorAll('.thinkproc-custom-select')
            .forEach((el) => el.classList.remove('thinkproc-opened'));
    }
    /**
     * Public method: creates the custom select wrapper (if not already)
     */
    createCustomSelectById(id) {
        const select = this.mainDiv.querySelector(`#${id}`);
        if (!select || select.closest('.thinkproc-custom-select-wrapper'))
            return;
        this.buildCustomSelect(select);
    }
    /**
     * Public method: Updates options for a select by ID
     */
    setOptions(id, newOptions, defaultVal) {
        const select = this.mainDiv.querySelector(`#${id}`);
        if (!select)
            return;
        this.createOptions(select, newOptions, defaultVal);
        const wrapperExists = !!select.closest('.thinkproc-custom-select-wrapper');
        if (wrapperExists) {
            this.updateCustomOptionsContainer(select, defaultVal);
        }
        else {
            this.createCustomSelectById(id);
        }
    }
    /**
     * Handles the responsive layout setup for step headers and content areas
     */
    handleResponsiveLayoutSetup() {
        this.handleStepHeaderResponsive();
        const originalPositions = new Map();
        const liElements = this.mainDiv.querySelectorAll('.thinkproc-step-list > li[data-step]');
        const contentElements = this.mainDiv.querySelectorAll('.thinkproc-systemCheck-body > div[data-step]');
        const stepMapping = Array.from(liElements)
            .map((li) => {
            const stepKey = li.getAttribute('data-step');
            const content = Array.from(contentElements).find((div) => div.getAttribute('data-step') === stepKey);
            return { li, content };
        })
            .filter(({ content }) => content !== undefined);
        const moveToStepList = () => {
            stepMapping.forEach(({ li, content }) => {
                if (!li.contains(content)) {
                    if (!originalPositions.has(content)) {
                        const placeholder = document.createComment(`placeholder for ${content.getAttribute('data-step')}`);
                        content.parentNode?.insertBefore(placeholder, content);
                        originalPositions.set(content, placeholder);
                    }
                    li.appendChild(content);
                }
            });
        };
        const moveBackToSystemBody = () => {
            stepMapping.forEach(({ content }) => {
                const placeholder = originalPositions.get(content);
                if (placeholder?.parentNode && placeholder.parentNode !== content.parentNode) {
                    placeholder.parentNode.insertBefore(content, placeholder);
                }
            });
        };
        const handleResponsiveLayout = () => {
            if (window.innerWidth < 992) {
                moveToStepList();
            }
            else {
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
    handleStepHeaderResponsive() {
        const popupHeader = this.mainDiv.querySelector('.thinkproc-popup-header');
        const headerLeft = popupHeader?.querySelector('.thinkproc-popup-header-left');
        if (!popupHeader || !headerLeft)
            return;
        let isMobileView = window.innerWidth < 992;
        const stepDivs = Array.from(headerLeft.querySelectorAll('.thinkproc-compatibility-step'));
        // Store original <span> innerHTMLs for all steps
        const originalContentMap = new Map();
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
                }
                else {
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
            if (isNowMobile === isMobileView)
                return;
            isMobileView = isNowMobile;
            if (isMobileView) {
                popupHeader.classList.add('mobile-view');
                applyMobileView();
            }
            else {
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
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(handleResponsive, 100);
        });
        // Mutation observer for dynamic class changes
        const observer = new MutationObserver(() => {
            if (isMobileView) {
                applyMobileView();
            }
            else {
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
const uiEvents = new UiEvents();

const environment = {
    SDK_ENV: 'development', // production //development
    SDK_VERSION: '1.0.0',
    SDK_NAME: 'ThinkProctor',
    API_URL: 'https://thinkinterviewapi.local.com/api/candidate',
    API_TIMEOUT: 50000,
    UI_BASE_URL: 'https://thinkinterview.local.com/dist/',
    NETWORK_URL: 'https://thinkinterviewapi.local.com/network',
    THINK_AI: 'https://thinkx-suite-dev.thinkexam.com/ThinkAI-Interview/thinkXAI_Interview.js', //thinkXai_bundle.js
};

/* Author : Jitendra Bhardwaj */
/**
 *
 */
class LocalizedHTMLProcessor {
    /**
     * Downloads a nested language JSON file from the given URL.
     * @param url URL of the JSON file
     */
    async downloadLanguageJson(url) {
        const res = await fetch(url + '?v=' + new Date());
        if (res && !res.ok) {
            throw new Error(`Failed to fetch JSON: ${res.status} ${res.statusText}`);
        }
        return await res.json();
    }
    /**
     * Fetches an HTML file and replaces {{key}} placeholders using nested translations.
     * Supports dot notation like {{tabs.system_check}}.
     * @param htmlUrl
     * @param translations
     * @param base_URL
     */
    async fetchAndReplaceHTML(htmlUrl, translations, base_URL) {
        const res = await fetch(htmlUrl + '?v=' + new Date());
        if (res && !res.ok) {
            throw new Error(`Failed to fetch HTML: ${res.status} ${res.statusText}`);
        }
        let html = await res.text();
        html = html.replace(/\{\{\s*([\w.]+)\s*\}\}/g, (_, keyPath) => {
            if (keyPath === 'enviroment_url') {
                return base_URL;
            }
            const value = this.resolveNestedKey(translations, keyPath);
            return value !== undefined ? value : `{{${keyPath}}}`;
        });
        return html;
    }
    /**
     * Replaces placeholders inside a string using dot-notation keys (e.g., "tabs.system_check").
     * @param obj The translations object
     * @param path Dot-separated key path (e.g., "tabs.system_check")
     */
    resolveNestedKey(obj, path) {
        const result = path.split('.').reduce((acc, key) => {
            return acc && acc[key] !== undefined ? acc[key] : undefined;
        }, obj);
        return typeof result === 'string' ? result : undefined;
    }
    /**
     * Injects processed HTML into the DOM container specified.
     * @param containerSelector
     * @param html
     */
    injectIntoDOM(containerSelector, html) {
        const container = document.querySelector(containerSelector);
        if (!container) {
            throw new Error(`Container "${containerSelector}" not found`);
        }
        container.innerHTML = html;
    }
    /**
     * Triggers a download of the processed HTML.
     * @param filename
     * @param html
     */
    downloadHTML(filename, html) {
        const blob = new Blob([html], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
}

// Add "thinkproc-disable" class for disable the button
/**
 *
 */
class UiComponents {
    /**
     *
     * @param text
     */
    static getMicSelect(text, selectMic) {
        return `
      <select id="thinkpro-get-mic-value" class="thinkproc-custom-select-default" placeholder="${selectMic}"></select>
      <button role="button" data-target="thinkpro-get-mic-value" id="thinkX_allowMic" class="thinkpro-btn">${text}</button>
    `;
    }
    /**
     *
     * @param text
     */
    static getCameraSelect(text, selectCamera) {
        return `
      <select id="thinkpro-get-camera-value" class="thinkproc-custom-select-default" placeholder="${selectCamera}"></select>
      <button role="button" data-target="thinkpro-get-camera-value" id="thinkX_allowCamera" class="thinkpro-btn">${text}</button>
    `;
    }
    /**
     *
     */
    static getDialogInnerHtml(icon = true) {
        let iconData = `<div class="icon">
                      <img src="${environment.UI_BASE_URL}images/danger_triangle.svg" alt="{{popup_imgs.dangerTriangle}}">
                    </div>`;
        if (icon == false) {
            iconData = "";
        }
        return `<div class="thinkproc-external-popup-innerbody">
                  <div class="thinkproc-external-popup-box">
                      <div class="thinkproc-external-popup-description">
                          <div class="think_popupIconWrap">
                            ${iconData}
                            <span id="dialog-header">{{popup_text.additionalCameraDisconnect}}}</span>
                          </div>
                          <p id="dialog-msg">{{popup_text.cameraDisconnected}}</p>
                      </div>
                      <div class="thinkproc-external-popup-btn-div">
                          <button class="thinkpro-btn" id="btn-retry">{{popup_buttons.retry}}</button>
                      </div>
                  </div>
              </div>
    `;
    }
    static getInfoInnerHtml() {
        return `<div class="thinkproc-external-popup-overlay thinkX_InfoPopup">
            <div class="thinkproc-external-popup-innerbody">
                <div class="thinkproc-external-popup-box">
                    <div class="thinkproc-external-popup-hdng-div">
                        <div class="icon">
                            <img src="${environment.UI_BASE_URL}images/info.svg" alt="">
                        </div>
                        <span id="thinkX_InfoTitle">{{infoPopup.infoPopupTitle}}</span>
                    </div>
                    <div class="thinkproc-external-popup-description">
                      <div class="thinkproc-external-popup-subhdng-div" id="thinkX_InfoSubtitle">{{infoPopup.infoPopupSubTitle}}:</div> 
                      <p class="mt-20" id="thinkX_InfoPopupText">{{infoPopup.infoPopupText}}</p>    
                    </div>
                    <div class="thinkproc-external-popup-btn-div">
                        <button class="thinkpro-btn" id="thinkX_infoDesk">{{infoPopup.infoPopupBtn}}</button>
                    </div>
                </div>
            </div>
          </div> `;
    }
    /**
     *
     * @param text
     * @param id
     */
    static retryCloseBtn(text, id) {
        return `
      <div id="thinkX_retryClose" class="mt-20">
        <button role="button" data-target="thinkpro-close-btn" class="thinkpro-btn outline" id="${id}">${text}</button>
      </div>
    `;
    }
    /**
     *
     * @param text
     */
    static loading() {
        return `
      <div id="thinkX_loading" class="loading_gifdiv mt-20">
        <div class="thinkproc_loader"></div>
      </div>
    `;
    }
    /**
     *
     * @param text
     */
    static getCameraSelectPopup(selectCamera) {
        return `
      <select id="thinkX_avilableCameras" class="thinkproc-custom-select-default" placeholder="${selectCamera}"></select>
    `;
    }
    /**
     *
     * @param text
     */
    static getMicSelectPopup(selectMic) {
        return `
      <select id="thinkX_avilableMicrophones" class="thinkproc-custom-select-default" placeholder="${selectMic}"></select>
    `;
    }
    static loadingwithtext(loadingText) {
        return `
      <div id="thinkX_loadingwithText" class="loading_gifdiv thinkX_loading_withText">
          <div class="thinkproc_loader"></div>
          <span>${loadingText}</span>
      </div>
    `;
    }
}

/* Author : Prateek Jaiswal */
/**
 *
 */
class Utility {
    hiddenCanvas = null;
    canvasContext = null;
    blackStream = null;
    /**
     *
     */
    constructor() {
        // Automatically override global console.log when the logger is created
    }
    /* Logs messages to the console only in the development environment */
    /**
     *
     * @param {...any} args
     */
    log(...args) {
        {
            console.log('[' + environment.SDK_NAME + ']', ...args);
        }
    }
    /* Logs informational messages to the console */
    /**
     *
     * @param {...any} args
     */
    info(...args) {
        console.info('[' + environment.SDK_NAME + ']', ...args);
    }
    /* Logs informational messages to the console */
    /**
     *
     * @param {...any} args
     */
    warn(...args) {
        console.warn('[' + environment.SDK_NAME + ']', ...args);
    }
    /* Logs error messages to the console only in the development environment*/
    /**
     *
     * @param {...any} args
     */
    error(...args) {
        {
            console.error('[' + environment.SDK_NAME + ']', ...args);
        }
    }
    /**
     *
     * @param base64String
     */
    decodeBase64(base64String) {
        return atob(base64String);
    }
    /**
     *
     * @param template
     */
    replacePlaceholders(template, values) {
        return template.replace(/{{(.*?)}}/g, (_, key) => {
            return values[key.trim()] ?? '';
        });
    }
    /**
     *
     * @param template
     * @param base64
     */
    base64ToBlob(base64) {
        const mimeType = base64.split(',')[0].split(':')[1].split(';')[0];
        const byteCharacters = atob(base64.split(',')[1]);
        const byteArrays = [];
        for (let offset = 0; offset < byteCharacters.length; offset += 512) {
            const slice = byteCharacters.slice(offset, offset + 512);
            const byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }
        return new Blob(byteArrays, { type: mimeType });
    }
    convertBase64PngToCompressedBase64Jpg(base64Png, quality = 0.8) {
        return new Promise((resolve) => {
            // 1. Decode the base64 string back into an Image object
            const img = new Image();
            img.onload = () => {
                // 2. Create a canvas element to draw and manipulate the image
                if (!this.hiddenCanvas || !this.canvasContext) {
                    this.hiddenCanvas = document.querySelector('canvas');
                    if (this.hiddenCanvas) {
                        this.canvasContext = this.hiddenCanvas.getContext('2d');
                    }
                }
                if (!this.hiddenCanvas || !this.canvasContext) {
                    resolve(base64Png);
                    return;
                }
                const canvas = this.hiddenCanvas;
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = this.canvasContext;
                // PNG supports transparency (alpha channel), which JPEG does not. 
                // Set the background to white to handle the transparency gracefully.
                ctx.fillStyle = '#ffffff';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                // Draw the PNG image onto the canvas
                ctx.drawImage(img, 0, 0);
                // 3. Convert the canvas content to a base64 JPEG string with compression
                // The 'image/jpeg' format inherently applies lossy compression.
                // The second argument (quality) controls the level of compression (0.0 to 1.0).
                const base64Jpg = canvas.toDataURL('image/jpeg', quality);
                resolve(base64Jpg);
            };
            // Set the source of the Image object to the base64 PNG data
            img.src = base64Png;
        });
    }
    /**
     *
     * @param time
     */
    wait(time) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, time);
        });
    }
    async takeSnapshot(video) {
        if (!this.hiddenCanvas || !this.canvasContext) {
            this.hiddenCanvas = document.querySelector('canvas');
            if (this.hiddenCanvas) {
                this.canvasContext = this.hiddenCanvas.getContext('2d');
            }
        }
        if (!this.hiddenCanvas || !this.canvasContext) {
            return { blob: null, base64: null };
        }
        const width = video.videoWidth;
        const height = video.videoHeight;
        if (!width || !height)
            return { blob: null, base64: null };
        this.hiddenCanvas.width = width;
        this.hiddenCanvas.height = height;
        this.canvasContext.drawImage(video, 0, 0, width, height);
        // Store base64 string
        const base64Image = this.hiddenCanvas.toDataURL('image/jpeg');
        // Convert to blob and return as Promise
        return new Promise((resolve) => {
            this.hiddenCanvas.toBlob((blob) => {
                resolve({ blob: blob ?? null, base64: base64Image });
            });
        });
    }
    audioConstraints = (deviceId) => {
        return {
            deviceId: deviceId ? { exact: deviceId } : undefined,
            echoCancellation: true,
            noiseSuppression: true,
            suppressLocalAudioPlayback: true,
        };
    };
    extractPrefix(socketUserName, suffix) {
        // Remove the suffix if it exists at the end
        if (socketUserName.endsWith(suffix)) {
            let prefix = socketUserName.slice(0, -suffix.length);
            // Remove trailing underscore if it exists
            if (prefix.endsWith('_')) {
                prefix = prefix.slice(0, -1);
            }
            return prefix;
        }
        return socketUserName;
    }
    addPrefix(socketUserName, suffix) {
        if (socketUserName && suffix) {
            return socketUserName + '_' + suffix;
        }
        return socketUserName;
    }
    getCameraNameInUserSocket(username) {
        if (username != '') {
            let parts = username.split('_');
            let cam = parts.slice(-2).join('_'); // last two parts
            this.log(cam); // example: S_CAM, B_CAM, F_CAM
            return cam;
        }
        else {
            this.log('socket user name not found');
            return '';
        }
    }
    getCameraKeyName(camType) {
        if (camType == 'S_CAM') {
            return 'SIDE';
        }
        else if (camType == 'B_CAM') {
            return 'BACK';
        }
        else if (camType == 'F_CAM') {
            return 'FRONT';
        }
        else if (camType == 'C_CAM') {
            return 'CUSTOM';
        }
        else {
            return '';
        }
    }
    generateNameAvatar(overlay, name, prepend = 0, size = '60', fontSize = '20') {
        if (!overlay)
            return;
        const initials = this.getInitials(name);
        const meetColor = this.getMeetAvatarColor();
        const oldAvatar = overlay.querySelector('.avatar-circle');
        if (oldAvatar) {
            oldAvatar.remove();
        }
        const avatar = document.createElement('div');
        avatar.className = 'avatar-circle';
        avatar.textContent = initials;
        avatar.title = name;
        avatar.style.background = meetColor.bg;
        avatar.style.boxShadow = `0 4px 18px ${meetColor.shadow}55`; // soft shadow
        avatar.style.width = size + 'px';
        avatar.style.height = size + 'px';
        avatar.style.borderRadius = '50%';
        avatar.style.color = '#fff';
        avatar.style.display = 'flex';
        avatar.style.alignItems = 'center';
        avatar.style.justifyContent = 'center';
        avatar.style.fontSize = fontSize + 'px';
        avatar.style.fontWeight = 'bold';
        avatar.style.margin = '0 auto';
        avatar.style.cursor = 'pointer';
        if (prepend) {
            overlay.prepend(avatar);
        }
        else {
            overlay.append(avatar);
        }
        overlay.classList.remove('d-none');
        overlay.style.opacity = '1';
        overlay.style.transition = 'opacity 0.3s ease';
    }
    getMeetAvatarColor() {
        const colors = [
            { bg: '#F28B82', shadow: '#D56A63' }, // Red
            { bg: '#F7A75C', shadow: '#D98B45' }, // Orange
            { bg: '#FDD663', shadow: '#D9B24D' }, // Yellow
            { bg: '#81C995', shadow: '#5DA872' }, // Green
            { bg: '#78D3D5', shadow: '#55B3B6' }, // Teal
            { bg: '#8AB4F8', shadow: '#648DE0' }, // Blue
            { bg: '#AECBFA', shadow: '#8CA7E4' }, // Soft Blue
            { bg: '#C58AF9', shadow: '#A46AD9' }, // Purple
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    getInitials(fullName) {
        if (!fullName)
            return '';
        const parts = fullName.trim().split(/\s+/);
        let initials = parts[0][0].toUpperCase(); // first name initial
        if (parts.length > 1) {
            initials += parts[parts.length - 1][0].toUpperCase(); // last name initial
        }
        return initials;
    }
    removeAvatarSvgImage(overlay) {
        if (!overlay)
            return;
        overlay.style.opacity = '0';
        setTimeout(() => {
            overlay.classList.add('d-none');
            const avatar = overlay.querySelector('.avatar-circle');
            if (avatar)
                avatar.remove();
        }, 100);
    }
    getBlackStream() {
        if (this.blackStream)
            return this.blackStream;
        try {
            const canvas = document.createElement('canvas');
            canvas.width = 1;
            canvas.height = 1;
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.fillStyle = '#000';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            }
            // captureStream may not exist in some environments; fall back to an empty MediaStream
            const stream = canvas.captureStream ? canvas.captureStream(25) : new MediaStream();
            this.blackStream = stream;
            return stream;
        }
        catch (e) {
            // fallback: empty MediaStream
            this.blackStream = new MediaStream();
            return this.blackStream;
        }
    }
}
const utility = new Utility();

class DragElement {
    static set(el, optionsOrShape, shapeArg) {
        const defaultMargin = 20;
        let shape;
        let options = {};
        // Parse parameters
        if (typeof optionsOrShape === 'string') {
            shape = optionsOrShape;
        }
        else {
            options = optionsOrShape || {};
            shape = shapeArg;
        }
        const defaultSize = 150;
        const width = options.width ?? defaultSize;
        let height = options.height ?? defaultSize;
        // Apply shape logic (overwrite height, preserve width)
        if (shape) {
            const width = options.width ?? el.offsetWidth;
            if (shape === 'circle' || shape === 'square') {
                options.height = width;
                el.style.borderRadius = shape === 'circle' ? '50%' : '4px';
            }
            else if (shape === 'rectangle') {
                // options.height = width * 0.6;
                options.width = 202;
                options.height = 120;
                el.style.borderRadius = '2px';
            }
        }
        // Set initial dimensions
        if (shape === 'rectangle') {
            el.style.width = `${options.width}px`;
            el.style.height = `${options.height}px`;
        }
        else {
            el.style.width = `${width}px`;
            el.style.height = `${height}px`;
        }
        el.style.position = 'fixed';
        el.style.zIndex = '999';
        el.style.cursor = options.drag === false ? 'default' : 'move';
        el.style.userSelect = 'none';
        // Positioning logic
        const setPosition = () => {
            const { innerWidth, innerHeight } = window;
            const elWidth = el.offsetWidth;
            const elHeight = el.offsetHeight;
            let x = defaultMargin;
            let y = defaultMargin;
            if (options.position) {
                if (typeof options.position === 'string') {
                    switch (options.position) {
                        case 'topLeft':
                            x = defaultMargin;
                            y = defaultMargin;
                            break;
                        case 'topRight':
                            x = innerWidth - elWidth - defaultMargin;
                            y = defaultMargin;
                            break;
                        case 'bottomLeft':
                            x = defaultMargin;
                            y = innerHeight - elHeight - defaultMargin;
                            break;
                        case 'bottomRight':
                            x = innerWidth - elWidth - defaultMargin;
                            y = innerHeight - elHeight - defaultMargin;
                            break;
                    }
                }
                else {
                    x = options.position.x;
                    y = options.position.y;
                }
            }
            else {
                // Default bottomRight
                x = innerWidth - elWidth - defaultMargin;
                y = innerHeight - elHeight - defaultMargin;
            }
            el.style.left = `${x}px`;
            el.style.top = `${y}px`;
        };
        setPosition();
        // Recalculate on resize
        window.addEventListener('resize', () => {
            setPosition();
        });
        // Drag logic
        if (options.drag !== false) {
            let offsetX = 0;
            let offsetY = 0;
            let isDragging = false;
            const onMove = (clientX, clientY) => {
                if (!isDragging)
                    return;
                const newX = clientX - offsetX;
                const newY = clientY - offsetY;
                const maxX = window.innerWidth - el.offsetWidth - defaultMargin;
                const maxY = window.innerHeight - el.offsetHeight - defaultMargin;
                const clampedX = Math.max(defaultMargin, Math.min(newX, maxX));
                const clampedY = Math.max(defaultMargin, Math.min(newY, maxY));
                el.style.left = `${clampedX}px`;
                el.style.top = `${clampedY}px`;
            };
            const onMouseMove = (e) => {
                if (!isDragging)
                    return;
                e.preventDefault();
                onMove(e.clientX, e.clientY);
            };
            const onTouchMove = (e) => {
                if (!isDragging || e.touches.length === 0)
                    return;
                e.preventDefault();
                const touch = e.touches[0];
                onMove(touch.clientX, touch.clientY);
            };
            const startDrag = (clientX, clientY) => {
                const rect = el.getBoundingClientRect();
                offsetX = clientX - rect.left;
                offsetY = clientY - rect.top;
                isDragging = true;
                el.style.transition = 'none'; // disable transitions during drag
            };
            const endDrag = () => {
                if (!isDragging)
                    return;
                isDragging = false;
                el.style.transition = ''; // restore transitions if needed
                if (options.allowNearestCorner) {
                    const { innerWidth, innerHeight } = window;
                    const rect = el.getBoundingClientRect();
                    const corners = {
                        topLeft: { x: defaultMargin, y: defaultMargin },
                        topRight: { x: innerWidth - rect.width - defaultMargin, y: defaultMargin },
                        bottomLeft: { x: defaultMargin, y: innerHeight - rect.height - defaultMargin },
                        bottomRight: {
                            x: innerWidth - rect.width - defaultMargin,
                            y: innerHeight - rect.height - defaultMargin,
                        },
                    };
                    // Calculate distances
                    const currentCenter = {
                        x: rect.left + rect.width / 2,
                        y: rect.top + rect.height / 2,
                    };
                    let nearestCorner = 'bottomRight';
                    let minDistance = Infinity;
                    for (const [cornerName, pos] of Object.entries(corners)) {
                        const dx = currentCenter.x - (pos.x + rect.width / 2);
                        const dy = currentCenter.y - (pos.y + rect.height / 2);
                        const distance = Math.sqrt(dx * dx + dy * dy);
                        if (distance < minDistance) {
                            minDistance = distance;
                            nearestCorner = cornerName;
                        }
                    }
                    // Snap to the nearest corner
                    const nearestPos = corners[nearestCorner];
                    el.style.left = `${nearestPos.x}px`;
                    el.style.top = `${nearestPos.y}px`;
                    el.style.transition = 'all 0.3s ease';
                }
            };
            el.addEventListener('mousedown', (e) => {
                e.preventDefault();
                startDrag(e.clientX, e.clientY);
            });
            el.addEventListener('touchstart', (e) => {
                if (e.touches.length > 0) {
                    e.preventDefault();
                    startDrag(e.touches[0].clientX, e.touches[0].clientY);
                }
            });
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', endDrag);
            document.addEventListener('touchmove', onTouchMove, { passive: false });
            document.addEventListener('touchend', endDrag);
        }
    }
}

/**
 *
 */
class UiManager {
    mainDiv;
    translations;
    hideClass;
    audioContext;
    analyser;
    dataArray;
    bufferLength;
    canvas;
    ctx;
    animationFrameId;
    verticalPadding = 20;
    cameraPopup;
    micPopup;
    /**
     *
     */
    constructor() {
        this.mainDiv = document.createElement('div');
        this.translations = JSON.parse('{}');
        this.hideClass = 'd-none';
        this.audioContext = null;
        this.analyser = null;
        this.bufferLength = 0;
        this.dataArray = new Uint8Array(0);
        this.canvas = document.createElement('canvas');
        const context = this.canvas.getContext('2d');
        this.ctx = context;
        this.animationFrameId = null;
    }
    /**
     *
     * @param lang
     */
    async Init(lang, secondary = false) {
        const processor = new LocalizedHTMLProcessor();
        const enviroment_url = environment.UI_BASE_URL;
        this.translations = await processor.downloadLanguageJson(environment.UI_BASE_URL + 'lang/' + lang + '.json');
        let pageHtml = 'page.html';
        if (secondary) {
            pageHtml = 'page.html';
        }
        const html = await processor.fetchAndReplaceHTML(environment.UI_BASE_URL + pageHtml, this.translations, enviroment_url);
        ui.exportDiv(html);
        const el = ui.id('thinkpro_draggableBox');
        if (el) {
            DragElement.set(el, {
                drag: true,
                position: 'topLeft',
                // position: { x: 500, y: 500 },
                allowNearestCorner: false,
                width: 200,
            }, 'rectangle');
        }
        const chat_Icon = ui.id('thinkproc_chatIcon');
        if (chat_Icon) {
            this.click(chat_Icon, () => {
                alert('Click');
                this.toggleChatAndShiftIfBottomRight();
            });
        }
    }
    toggleChatAndShiftIfBottomRight() {
        const chatIcon = ui.id('thinkproc_chatIcon');
        const chatBox = ui.id('thinkproc_chat');
        const draggableBox = ui.id('thinkpro_draggableBox');
        if (!chatIcon || !chatBox || !draggableBox) {
            console.error('Element(s) not found!');
            return;
        }
        chatIcon.addEventListener('click', function () {
            const isChatOpen = chatBox.classList.toggle('show');
            // Viewport size
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;
            // Position of draggable box
            const boxRect = draggableBox.getBoundingClientRect();
            const boxBottom = Math.round(boxRect.bottom);
            const boxRight = Math.round(boxRect.right);
            const tolerance = 5; // pixel tolerance
            const atBottomRight = Math.abs(boxBottom - viewportHeight) <= tolerance &&
                Math.abs(boxRight - viewportWidth) <= tolerance;
            if (isChatOpen && atBottomRight) {
                const chatBoxWidth = chatBox.offsetWidth;
                const newLeft = boxRect.left - (chatBoxWidth + 30);
                draggableBox.style.position = 'fixed';
                draggableBox.style.left = `${newLeft}px`;
                draggableBox.style.right = 'auto'; // unset right
            }
        });
    }
    /**
     *
     * @param id
     */
    id(id) {
        return this.mainDiv.querySelector('#' + id);
    }
    /**
     *
     * @param class
     */
    class(class_name) {
        return this.mainDiv.getElementsByClassName(class_name);
    }
    /**
     *
     * @param selector
     */
    all(selector) {
        return this.mainDiv.querySelectorAll(selector);
    }
    /**
     *
     * @param container
     * @param id
     */
    domId(container, id) {
        return container.querySelector('#' + id);
    }
    /**
     *
     * @param container
     * @param selector
     */
    domAll(container, selector) {
        return container.querySelectorAll(selector);
    }
    /**
     *
     * @param element
     * @param className
     */
    addClass(element, className) {
        element?.classList.add(className);
    }
    /**
     *
     * @param element
     * @param className
     */
    removeClass(element, className) {
        element?.classList.remove(className);
    }
    querySelector(element) {
        return this.mainDiv.querySelector(element);
    }
    querySelectorAll(element) {
        return this.mainDiv.querySelectorAll(element);
    }
    scopedQuerySelector(parent, element) {
        return parent.querySelector(element);
    }
    /**
     *
     * @param element
     * @param text
     */
    innerText(element, text) {
        let textNodeFound = false;
        for (const node of element.childNodes) {
            if (node.nodeType === Node.TEXT_NODE &&
                (node.nodeValue == null || node.nodeValue.trim() !== '')) {
                textNodeFound = true;
                node.nodeValue = text;
                break;
            }
        }
        if (!textNodeFound) {
            element.innerText = text;
        }
    }
    /**
     *
     * @param element
     * @param text
     */
    innerHTML(element, html) {
        if (element)
            element.innerHTML = html;
    }
    textColor(element, color) {
        if (element) {
            element.style.color = color;
        }
    }
    enableOnCheck(checkBox, button) {
        if (!checkBox || !button)
            return;
        checkBox.addEventListener("change", () => {
            button.disabled = !checkBox.checked;
        });
    }
    /**
     *
     * @param element
     */
    show(element) {
        if (element) {
            this.removeClass(element, this.hideClass);
        }
    }
    /**
     *
     * @param element
     */
    hide(element) {
        if (element) {
            this.addClass(element, this.hideClass);
        }
    }
    /**
     *
     * @param element
     */
    remove(element) {
        if (element) {
            element.remove();
        }
    }
    /**
     *
     * @param html
     * @param className
     */
    createDivElement(html, className = '') {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;
        if (className != '') {
            this.addClass(tempDiv, className);
        }
        return tempDiv;
    }
    /**
     *
     */
    createVideoElement() {
        let video = document.createElement('video');
        video.setAttribute('muted', '');
        video.muted = true;
        video.autoplay = true;
        video.playsInline = true; // Important for mobile browsers
        return video;
    }
    /**
     *
     * @param element
     * @param fn
     */
    click(element, fn) {
        if (element) {
            element.onclick = () => {
                fn();
            };
        }
    }
    change(element, fn) {
        if (element) {
            element.onchange = () => {
                fn();
            };
        }
    }
    keyup(element, fn) {
        if (element) {
            element.onkeyup = () => {
                fn();
            };
        }
    }
    triggerEventById(elementId, eventName = 'click') {
        const element = document.getElementById(elementId);
        if (element) {
            const event = new Event(eventName, { bubbles: true, cancelable: true });
            element.dispatchEvent(event);
        }
    }
    /**
     *
     * @param header
     * @param message
     * @param button_txt
     */
    alert(header, message, button_txt) {
        alert(message);
    }
    /**
     *
     * @param html
     */
    exportDiv(html) {
        this.mainDiv.className = 'thinkproc-popup-wrapper';
        this.mainDiv.innerHTML = html;
        document.body.appendChild(this.mainDiv);
        uiEvents.init(this.mainDiv);
        uiEvents.handleResponsiveLayoutSetup();
        return this.mainDiv;
    }
    /**
     *
     */
    getMainDiv() {
        return this.mainDiv;
    }
    /**
     *
     */
    removeMainDiv() {
        if (this.mainDiv && this.mainDiv.parentNode) {
            this.mainDiv.parentNode.removeChild(this.mainDiv);
        }
        else {
            utility.warn('Main div not found or already removed.');
        }
    }
    /**
     *
     * @param id
     */
    dropdownVal(id) {
        const select = this.id(id);
        return select?.value || '';
    }
    /**
     *
     * @param id
     */
    initCustomSelect(id) {
        uiEvents.createCustomSelectById(id);
    }
    /**
     *
     * @param id
     * @param options
     * @param defaultValue
     */
    updateCustomSelectOptions(id, options, defaultValue) {
        uiEvents.setOptions(id, options, defaultValue);
    }
    /**
     *
     * @param id
     * @param options
     * @param defaultValue
     */
    initAndUpdateCustomSelectById(id, options, defaultValue) {
        this.updateCustomSelectOptions(id, options, defaultValue);
        this.initCustomSelect(id);
    }
    /**
     *
     */
    async getMicrophones() {
        try {
            let stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            stream.getTracks().forEach((track) => {
                track.stop();
            });
            const devices = await navigator.mediaDevices.enumerateDevices();
            return devices.filter((device) => device.kind === 'audioinput');
        }
        catch {
            return [];
        }
    }
    /**
     *
     */
    async getCameras() {
        try {
            const deviceList = await configrationManager.liveStreamManager?.getCameraListAvaliable();
            if (deviceList === false) {
                return [];
            }
            return Array.isArray(deviceList) ? deviceList : [];
        }
        catch (err) {
            utility.error("getCameras failed", err);
            return [];
        }
    }
    /**
     *
     * @param mediaStream
     * @param id
     */
    initAudioVisualization(mediaStream, id) {
        this.audioContext = new AudioContext();
        const source = this.audioContext.createMediaStreamSource(mediaStream);
        this.analyser = this.audioContext.createAnalyser();
        this.analyser.fftSize = 256;
        this.bufferLength = this.analyser.frequencyBinCount;
        this.dataArray = new Uint8Array(this.bufferLength);
        source.connect(this.analyser);
        this.canvas = ui.id(id);
        if (!this.canvas) {
            utility.error("Canvas with ID 'audioCanvas' not found.");
            return;
        }
        this.ctx = this.canvas.getContext('2d');
        if (!this.ctx) {
            utility.error('Could not get canvas context.');
            return;
        }
        this.draw(); // Start visualization
    }
    /**
     *
     */
    draw() {
        this.animationFrameId = requestAnimationFrame(() => this.draw());
        if (!this.ctx || !this.analyser)
            return;
        this.analyser.getByteFrequencyData(this.dataArray);
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        const centerY = this.canvas.height / 2;
        const maxVisualHeight = this.canvas.height - 2 * this.verticalPadding;
        const barWidth = (this.canvas.width / this.bufferLength) * 1;
        let x = 0;
        this.ctx.fillStyle = '#000000';
        for (let i = 0; i < this.bufferLength; i++) {
            let barHeight = (this.dataArray[i] / 255) * maxVisualHeight;
            barHeight = Math.max(2, barHeight - (barHeight % 2));
            const y = centerY - barHeight / 2;
            const borderRadius = barWidth / 2;
            this.roundRect(this.ctx, x, y, barWidth, barHeight, borderRadius);
            x += barWidth + 5;
        }
    }
    /**
     *
     * @param ctx
     * @param x
     * @param y
     * @param width
     * @param height
     * @param radius
     */
    roundRect(ctx, x, y, width, height, radius) {
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + width - radius, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
        ctx.lineTo(x + width, y + height - radius);
        ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        ctx.lineTo(x + radius, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
        ctx.lineTo(x, y + radius);
        ctx.quadraticCurveTo(x, y, x + radius, y);
        ctx.closePath();
        ctx.fill();
    }
    /**
     *
     */
    stopAudioBar() {
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = null;
        }
        // if (this.audioContext) {
        //     this.audioContext.close().then(() => {
        //         this.audioContext = null;
        //         this.analyser = null;
        //         if (this.ctx) {
        //           this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        //         }
        //     });
        // }
    }
    /**
     *
     */
    stopMachineBar() {
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = null;
        }
        if (this.audioContext) {
            this.audioContext.close().then(() => {
                this.audioContext = null;
                this.analyser = null;
                if (this.ctx) {
                    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                }
            });
        }
    }
    /**
     *
     */
    showNetworkSpeed() {
        const ns = this.id('networkSpeedLoaded');
        this.show(ns);
    }
    /**
     *
     * @param speed
     * @param unit
     */
    downloadSpeed(speed, unit) {
        this.showNetworkSpeed();
        const dsDiv = this.id('thinkX_showNetwork');
        this.show(dsDiv);
        const ds = this.id('thinkX_network-download');
        if (ds) {
            ds.innerHTML = speed + unit;
        }
    }
    /**
     *
     * @param speed
     * @param unit
     */
    uploadSpeed(speed, unit) {
        this.showNetworkSpeed();
        const dsDiv = this.id('thinkX_showNetworkUpload');
        this.show(dsDiv);
        const us = this.id('thinkX_network-upload');
        if (us) {
            us.innerHTML = speed + unit;
        }
    }
    /**
     *
     * @param header
     * @param message
     * @param buttonTxt
     * @param callback
     */
    alertDialog(header, message, buttonTxt, callback = (dialog) => { }, retry = true, icon = true) {
        const dialog = this.createDivElement(UiComponents.getDialogInnerHtml(icon), 'thinkproc-external-popup-overlay');
        ui.addClass(dialog, 'thinkX_Popup');
        const parent = this.mainDiv;
        parent?.append(dialog);
        const headerDom = dialog.querySelector('#dialog-header');
        if (headerDom) {
            this.innerText(headerDom, header);
        }
        const msgDom = dialog.querySelector('#dialog-msg');
        if (msgDom) {
            this.innerText(msgDom, message);
        }
        const retrybtn = dialog.querySelector('#btn-retry');
        if (retrybtn) {
            this.innerText(retrybtn, buttonTxt);
            this.click(retrybtn, () => {
                callback(dialog);
            });
            if (retry == false) {
                this.hide(retrybtn);
            }
        }
        return dialog;
    }
    alertInfoBox(title, subtitle, text, buttonTxt, callback = (dialog) => { }) {
        const dialog = this.createDivElement(UiComponents.getInfoInnerHtml());
        const parent = this.mainDiv;
        parent?.append(dialog);
        const titleDom = dialog.querySelector('#thinkX_InfoTitle');
        if (titleDom) {
            this.innerText(titleDom, title);
        }
        const subtitleDom = dialog.querySelector('#thinkX_InfoSubtitle');
        if (subtitleDom) {
            this.innerText(subtitleDom, subtitle);
        }
        const textDom = dialog.querySelector('#thinkX_InfoPopupText');
        if (textDom) {
            this.innerText(textDom, text);
        }
        const retrybtn = dialog.querySelector('#thinkX_infoDesk');
        if (retrybtn) {
            this.innerText(retrybtn, buttonTxt);
            this.click(retrybtn, () => {
                callback(dialog);
            });
        }
    }
    async cameraPermission(callback = (dialog, selectedCameraId, selectedCameraLabel) => { }) {
        const dialog = this.id('thinkX_cameraPopup');
        this.show(dialog);
        // utility.wait(500).then(() => {
        clearTimeout(this.cameraPopup);
        this.cameraPopup = setTimeout(() => {
            this.initCameraSelect();
        }, 50);
        // });
        const retryIcon = dialog.querySelector('#thinkX_retryIcon');
        if (retryIcon) {
            let self = this;
            this.click(retryIcon, () => {
                const addClass = ui.id('thinkX_reloadIconCam');
                if (addClass) {
                    ui.addClass(addClass, 'iconRotate');
                }
                self.initCameraSelect(true);
            });
        }
        const retrybtn = dialog.querySelector('#thinkX_cameraRetry');
        if (retrybtn) {
            this.click(retrybtn, () => {
                const select = this.id('thinkX_avilableCameras');
                const selectedCameraId = select?.value || '';
                const selectedCameraLabel = select?.selectedOptions[0]?.text || '';
                if (!selectedCameraId || !selectedCameraLabel)
                    return;
                // ✅ Hide fallback image/icon under video when retry clicked
                const videoEl = document.getElementById('thinkX_cameraVideo');
                if (videoEl) {
                    const placeholderImg = videoEl.parentElement?.querySelector('.camera-placeholder');
                    if (placeholderImg)
                        placeholderImg.remove(); // remove fallback image
                    // also show video again if hidden
                    videoEl.classList.remove('d-none');
                    this.hide(this.id('thinkX_cameraDisconnect'));
                }
                callback(dialog, selectedCameraId, selectedCameraLabel);
            });
        }
    }
    async micPermission(callback = (dialog, selectedMicId, selectedMicLabel) => { }) {
        const dialog = this.id('thinkX_micPopup');
        this.show(dialog);
        // utility.wait(500).then(() => {
        clearTimeout(this.micPopup);
        this.micPopup = setTimeout(() => {
            this.initMicSelect();
        }, 50);
        // });
        const retryIcon = dialog.querySelector('#thinkX_micRetryIcon');
        if (retryIcon) {
            let self = this;
            this.click(retryIcon, () => {
                const addMicClass = ui.id('thinkX_reloadIconMic');
                if (addMicClass) {
                    ui.addClass(addMicClass, 'iconRotate');
                }
                self.initMicSelect(true);
            });
        }
        const retrybtn = dialog.querySelector('#thinkX_micRetry');
        if (retrybtn) {
            this.click(retrybtn, () => {
                const select = this.id('thinkX_avilableMicrophones');
                const selectedMicId = select?.value || '';
                const selectedMicLabel = select?.selectedOptions[0]?.text || '';
                if (!selectedMicId || !selectedMicLabel)
                    return;
                callback(dialog, selectedMicId, selectedMicLabel);
            });
        }
    }
    async initCameraSelect(isRetry = false) {
        if (!isRetry) {
            this.cameraAppendHtmlInsideContainerPopup(UiComponents.getCameraSelectPopup(ui.translations.status.selectCamera), 'thinkX_selectCamera');
        }
        const cams = await this.getCameras();
        const options = cams.map((cam, i) => ({
            value: cam.deviceId || `${i}`,
            label: cam.label || `Camera Device ${i + 1}`,
        }));
        if (options.length > 0) {
            uiEvents.setOptions('thinkX_avilableCameras', options, options[0]?.value);
        }
        else {
            uiEvents.setOptions('thinkX_avilableCameras', [{ value: '', label: ui.translations.status.no_camera_found }], '');
        }
        utility.wait(3000).then(() => {
            ui.removeClass(ui.id('thinkX_reloadIconCam'), 'iconRotate');
        });
    }
    async initMicSelect(isRetry = false) {
        if (!isRetry) {
            this.cameraAppendHtmlInsideContainerPopup(UiComponents.getMicSelectPopup(ui.translations.status.selectMic), 'thinkX_selectMic');
        }
        const mics = await this.getMicrophones();
        const options = mics.map((mic, i) => ({
            value: mic.deviceId || `${i}`,
            label: mic.label || `Mic Device ${i + 1}`,
        }));
        if (options.length > 0) {
            uiEvents.setOptions('thinkX_avilableMicrophones', options, options[0]?.value);
        }
        else {
            uiEvents.setOptions('thinkX_avilableMicrophones', [{ value: '', label: ui.translations.status.no_microphone_found }], '');
        }
        utility.wait(3000).then(() => {
            ui.removeClass(ui.id('thinkX_reloadIconMic'), 'iconRotate');
        });
    }
    /**
     *
     * @param html
     * @param containerId
     * @param cameraCallback
     */
    cameraAppendHtmlInsideContainerPopup(html, containerId) {
        const container = ui.id(containerId);
        if (!container) {
            utility.warn(`Container with id "${containerId}" not found.`);
            return null;
        }
        container.innerHTML = html;
        this.attachListenersOnPopup(container);
        return container;
    }
    attachListenersOnPopup(container) {
        const buttons = this.domAll(container, 'button[data-target]');
        buttons.forEach((buttonEl) => {
            const button = buttonEl;
            this.click(button, async () => {
                const targetId = button.getAttribute('data-target');
                if (!targetId)
                    return;
                const select = this.id(targetId);
                const selectedDeviceLabel = select?.value || '';
                select?.selectedOptions[0]?.text || '';
                if (!selectedDeviceLabel) {
                    ui.translations.status.select_camera;
                    return;
                }
            });
        });
    }
    setCloseApplicationButton(container) {
        container.setAttribute('data-attr', 'close-application');
    }
    /**
     *
     * @param tag
     */
    createElement(tag) {
        const tempDiv = document.createElement(tag);
        return tempDiv;
    }
}
const ui = new UiManager();

// create class for APIManager
/**
 *
 */
class APIManager {
    baseURL;
    headers;
    timeout;
    token;
    /**
     *
     * @param options
     */
    constructor(options) {
        this.baseURL = options.baseURL.replace(/\/+$/, '');
        this.headers = {
            'Content-Type': 'application/json',
            ...options.headers,
        };
        this.timeout = options.timeout ?? 20000;
        this.token = '';
    }
    /**
     *
     * @param path
     * @param params
     * @param tkn
     */
    setToken(tkn) {
        this.token = tkn;
        this.headers = { ...this.headers, ...{ Authorization: `Bearer ${this.token}` } };
    }
    getToken() {
        return this.token;
    }
    /**
     *
     * @param path
     * @param params
     */
    buildURL(path, params) {
        const url = new URL(this.baseURL + path);
        if (params) {
            Object.entries(params).forEach(([key, val]) => {
                // Only include parameters that are not undefined or null
                if (val !== undefined && val !== null) {
                    url.searchParams.append(key, String(val)); // Convert the value to string before appending
                }
            });
        }
        // Return the fully constructed URL as a string
        return url.toString();
    }
    /**
     *
     * @param method
     * @param path
     * @param body
     * @param params
     * @param extraHeaders
     */
    async request(method, path, body, params, extraHeaders) {
        const url = this.buildURL(path, params);
        // Create an AbortController to support request timeout
        const controller = new AbortController();
        // Set up a timeout to automatically abort the request if it takes too long
        const timeoutId = setTimeout(() => controller.abort(), this.timeout);
        const isFormData = body instanceof FormData;
        const combinedHeaders = { ...this.headers, ...extraHeaders };
        if (isFormData) {
            delete combinedHeaders['Content-Type'];
        }
        const res = await fetch(url, {
            method,
            headers: combinedHeaders,
            signal: controller.signal,
            body: body != null ? (isFormData ? body : JSON.stringify(body)) : undefined,
        });
        // Clear the timeout once the request completes
        clearTimeout(timeoutId);
        // Throw an error if the response status indicates failure
        if (res && !res.ok) {
            const errorText = await res.text();
            throw new Error(`API error ${res.status}: ${errorText}`);
        }
        // Return the parsed JSON response
        return res.json();
    }
    /**
     *
     * @param path
     * @param params
     * @param headers
     */
    get(path, params, headers) {
        // Delegate the GET request to the generic request method
        return this.request('GET', path, undefined, params, headers);
    }
    /**
     *
     * @param path
     * @param data
     * @param params
     * @param headers
     */
    post(path, data, params, headers) {
        // Delegate the POST request to the generic request method
        return this.request('POST', path, data, params, headers);
    }
    /**
     *
     * @param path
     * @param data
     * @param params
     * @param headers
     */
    put(path, data, params, headers) {
        // Delegate the PUT request to the generic request method
        return this.request('PUT', path, data, params, headers);
    }
    /**
     *
     * @param path
     * @param data
     * @param params
     * @param headers
     */
    patch(path, data, params, headers) {
        // Delegate the PATCH request to the generic request method
        return this.request('PATCH', path, data, params, headers);
    }
    /**
     *
     * @param path
     * @param params
     * @param headers
     */
    delete(path, params, headers) {
        // Delegate the DELETE request to the generic request method
        return this.request('DELETE', path, undefined, params, headers);
    }
    /**
     *
     * @param token
     * @param scheme
     */
    setAuthToken(token, scheme = 'Bearer') {
        // Set the Authorization header in the default headers object
        this.headers['Authorization'] = `${scheme} ${token}`;
    }
    /**
     *
     */
    clearAuthToken() {
        // Delete the Authorization header from the default headers object
        delete this.headers['Authorization'];
    }
    /**
     *
     * @param path
     * @param data
     * @param files
     * @param params
     * @param headers
     */
    file(path, data, files, params, headers) {
        const formData = new FormData();
        // Append fields like 'environment'
        for (const i in data) {
            const val = data[i];
            const key = i;
            formData.append(key, val);
        }
        // Append files with name AND filename
        for (const i in files) {
            const val = files[i].File;
            const key = files[i].name;
            // Optional: try to detect file type and extension
            let filename = `uploaded_file${i}.jpg`; // default name
            if (val instanceof Blob && val.type) {
                const ext = val.type.split('/')[1] || 'jpg';
                filename = `uploaded_file${i}.${ext}`;
            }
            formData.append(key, val, filename); // ⬅️ important: add filename
        }
        return this.request('POST', path, formData, params, headers);
    }
}
// configure it once:
const api = new APIManager({
    baseURL: environment.API_URL,
    headers: {
        'X-App-Version': environment.SDK_VERSION,
    },
    timeout: environment.API_TIMEOUT,
});

const RecordMod = {
    START: 'start',
    STREAM: 'stream',
};
/**
 *
 */
class Recording {
    serverUrl;
    stream;
    camera;
    ws = null;
    recordId = '';
    mediaRecorder = null;
    reconnectInterval = 2000; // 2 seconds
    maxRetries = Infinity;
    retryCount = 0;
    token = '';
    token_date = '';
    mimeType = '';
    recordingWorker = null;
    useWorker = true;
    workderWSState = 0; // 0=closed, 1=connecting, 2=open, 3=closing
    chunkBuffer = []; // Buffer for unsent chunks
    VIDEO_BITS_PER_SECOND = 3000000; // 1710 kbps
    AUDIO_BITS_PER_SECOND = 100000; // 128 kbps
    stopTrigger = false;
    /**
     *
     * @param server
     * @param stream
     * @param camera
     * @param worker
     */
    constructor(server, stream, camera, worker) {
        this.recordingWorker = worker;
        this.serverUrl = server;
        this.stream = stream;
        this.camera = camera;
        this.token = api.getToken(); // Get the token from API manager
        if (this.useWorker) {
            this.token_date = `${new Date().getTime()}-${Math.random().toString(36).substring(2, 9)}`; // Store token with timestamp for uniqueness
            this.recordingWorker.onmessage = (event) => {
                const message = event.data;
                if (message.on == "OPEN") {
                    this.workderWSState = 2;
                    utility.log('Status RW: Connected to WebSocket server. Sending session ID...');
                    this.sendRecordMessage(RecordMod.START);
                    utility.wait(1000).then(() => {
                        // Send buffered chunks
                        if (this.chunkBuffer.length > 0) {
                            this.chunkBuffer.forEach((chunk) => {
                                this.sendRecordMessage(RecordMod.STREAM, { data: chunk });
                            });
                            this.chunkBuffer = [];
                        }
                    });
                }
                else if (message.on == "CLOSE") {
                    this.workderWSState = 0;
                    utility.log('Status RW: Disconnected from WebSocket server.');
                }
                else if (message.on == "ERROR") {
                    this.workderWSState = 0;
                    utility.log('Status RW: WebSocket error! Check console for details.');
                    const self = this;
                    this.recordingWorker?.postMessage({ type: 'STOP_AND_CLOSE' });
                    if (this.retryCount < this.maxRetries) {
                        setTimeout(() => {
                            self.recordingWorker?.postMessage({ type: 'INIT', payload: { url: this.serverUrl } });
                        }, this.reconnectInterval);
                        this.retryCount++;
                    }
                }
                else if (message.on == "MESSAGE") ;
            };
            this.recordingWorker.postMessage({ type: 'INIT', payload: { url: this.serverUrl } });
        }
        else {
            this.ws = this.connect();
        }
        this.setRecorder();
    }
    /**
     *
     */
    connect() {
        const ws = new WebSocket(this.serverUrl);
        this.token_date = new Date().getTime().toString(); // Store token with timestamp for uniqueness
        ws.onopen = () => {
            utility.log('Status: Connected to WebSocket server. Sending session ID...');
            //this.ws.send(this.recordingPath); // Send the session ID as the first message
            this.sendRecordMessage(RecordMod.START);
            utility.wait(1000).then(() => {
                // Send buffered chunks
                if (this.chunkBuffer.length > 0) {
                    this.chunkBuffer.forEach((chunk) => {
                        this.sendRecordMessage(RecordMod.STREAM, { data: chunk });
                    });
                    this.chunkBuffer = [];
                }
            });
        };
        ws.onclose = () => {
            utility.log('Status: Disconnected from WebSocket server.');
        };
        ws.onerror = (error) => {
            utility.log('Status: WebSocket error! Check console for details.');
            utility.error('WebSocket Error:', error);
            const self = this;
            ws.close();
            if (this.retryCount < this.maxRetries) {
                setTimeout(() => {
                    self.ws = self.connect();
                }, this.reconnectInterval);
                this.retryCount++;
            }
        };
        return ws;
    }
    /**
     *
     * @param stream
     */
    setStream(stream) {
        this.stop();
        this.stream = stream;
        this.ws = this.connect();
        this.setRecorder();
        return this;
    }
    /**
     *
     */
    setRecorder() {
        let mime = this.getMimeType();
        this.mediaRecorder = new MediaRecorder(this.stream, mime);
        this.mediaRecorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
                if (this.ws && this.ws.readyState === WebSocket.OPEN && this.chunkBuffer.length === 0
                    || (this.useWorker && this.workderWSState === 2)) {
                    let self = this;
                    event.data.arrayBuffer().then((arrayBuffer) => {
                        if (this.useWorker) {
                            self.sendRecordMessage(RecordMod.STREAM, { data: arrayBuffer }); // Send raw ArrayBuffer
                        }
                        else {
                            const base64Data = self.arrayBufferToBase64(arrayBuffer);
                            if (base64Data !== '') {
                                self.sendRecordMessage(RecordMod.STREAM, { data: base64Data }); // Convert to base64 string for transmission
                            }
                            // utility.log('Sending data chunk:', event.data.size, 'bytes');
                        }
                    });
                }
                else {
                    event.data.arrayBuffer().then((arrayBuffer) => {
                        // Buffer the chunk if WebSocket is not open
                        let self = this;
                        if (this.useWorker) {
                            this.chunkBuffer.push(arrayBuffer);
                        }
                        else {
                            const base64Data = self.arrayBufferToBase64(arrayBuffer);
                            this.chunkBuffer.push(base64Data);
                        }
                    });
                }
            }
        };
        this.mediaRecorder.onstart = () => {
            utility.info('Status: Recording started...');
        };
        this.mediaRecorder.onstop = () => {
            utility.info('Status: Recording stopped.');
            if (this.ws && this.stopTrigger) {
                // Only disconnect if stop is triggered
                this.ws.close(); // Close WebSocket connection
            }
        };
    }
    /**
     *
     */
    start() {
        if (this.mediaRecorder && this.mediaRecorder.state === 'inactive') {
            this.mediaRecorder.start(2000);
        }
        return this;
    }
    /**
     *
     */
    pause() {
        if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
            this.mediaRecorder.requestData();
            this.mediaRecorder.stop();
        }
        return true;
    }
    /**
     *
     */
    async stop() {
        this.stopTrigger = true; // Stop is triggered
        if (!this.pause()) {
            // if pause is not sucessfull / mediaRecorder is inactive
            if (this.useWorker) {
                if (this.recordingWorker && this.stopTrigger) {
                    await new Promise((resolve) => {
                        setTimeout(() => {
                            this.recordingWorker?.postMessage({ type: 'STOP_AND_CLOSE' }); // Close WebSocket after 1 second
                            resolve();
                        }, 1000);
                    });
                }
            }
            else {
                if (this.ws && this.stopTrigger) {
                    await new Promise((resolve) => {
                        setTimeout(() => {
                            this.ws?.close(); // Close WebSocket after 1 second
                            resolve();
                        }, 1000);
                    });
                }
            }
        }
    }
    /**
     *
     */
    recordMessage(mode, info) {
        return {
            token: this.token,
            date: this.token_date, // Store token with timestamp for uniqueness
            camera: this.camera,
            environment: configrationManager.appEnv,
            environment_url: environment.API_URL,
            stepEnv: configrationManager.currentStepAlias,
            sessionId: configrationManager.sessionIdRec,
            instanceId: configrationManager.instanceIdRec,
            mime: this.mimeType,
            data: { mode, info },
        };
    }
    sendRecordMessage(mode, info) {
        if (this.useWorker) {
            if (this.recordingWorker && this.workderWSState === 2) {
                const message = this.recordMessage(mode, info);
                if (mode == RecordMod.STREAM) {
                    this.recordingWorker.postMessage({ type: 'SEND_STREAM', payload: info.data });
                }
                else {
                    this.recordingWorker.postMessage({ type: 'SEND_JSON', payload: message });
                }
            }
            else {
                utility.error('Recording worker is not initialized. Cannot send record message.');
            }
        }
        else {
            if (this.ws && this.ws.readyState === WebSocket.OPEN) {
                const message = this.recordMessage(mode, info);
                this.ws.send(JSON.stringify(message));
                // utility.log('Status: Record message sent:', message);
            }
            else {
                utility.error('WebSocket is not open. Cannot send record message.');
            }
        }
    }
    arrayBufferToBase64(buffer) {
        let binary = '';
        const bytes = new Uint8Array(buffer);
        const len = bytes.byteLength;
        for (let i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return window.btoa(binary);
    }
    getMimeType() {
        let options = { mimeType: '',
            videoBitsPerSecond: this.VIDEO_BITS_PER_SECOND,
            audioBitsPerSecond: this.AUDIO_BITS_PER_SECOND
        };
        // Prefer MP4 (H.264 + AAC) if supported (Safari + some Chrome builds)
        if (MediaRecorder.isTypeSupported('video/mp4;codecs="avc1.42E01E, mp4a.40.2"')) {
            options.mimeType = 'video/mp4;codecs="avc1.42E01E, mp4a.40.2"';
            utility.info("Mime - Using MP4 (H.264 + AAC)");
            this.mimeType = "h264";
        }
        // Chrome/Edge often support H.264 in WebM container
        else if (MediaRecorder.isTypeSupported('video/webm;codecs="h264"')) {
            options.mimeType = 'video/webm;codecs="h264"';
            utility.info("Mime - Using WebM (H.264)");
            this.mimeType = "h264";
        }
        // Fallback → WebM (VP8 + Opus) → works everywhere
        else if (MediaRecorder.isTypeSupported('video/webm;codecs="vp8, opus"')) {
            options.mimeType = 'video/webm;codecs="vp8, opus"';
            utility.info("Mime - Using WebM (VP8 + Opus)");
            this.mimeType = "vp8";
        }
        // Last resort (should rarely happen)
        else {
            options.mimeType = '';
            utility.warn("Mime - Falling back to browser default MediaRecorder settings");
            this.mimeType = "default";
        }
        return options;
    }
}

const SDK_EVENT = {
    SECOND_STREAM: 'second_stream',
    SECOND_STREAM_DISCONNET: 'second_stream_disconnect',
    SECOND_STREAM_RETRY: 'second_stream_retry',
    RECEIVE_MESSAGE: 'receive_message',
    USER_LEFT: 'user_left',
    USER_RECONNECT: 'user_reconnect',
    UFM_SUSPEND: 'ufm_suspend',
    UFM_TERMINATE: 'ufm_terminate',
    CHAT_MESSAGE: 'chatMessage',
    STREAM_INFO_REQUEST: "stream_info_request",
    STREAM_REQUEST: "stream_request",
    SMART_PROCTOR_MSG: "smart_proctor_message",
    SOCKET_CONNECTED: 'socket_connected',
    AUDIO_STREAM: 'audio_stream',
    USER_ESCALTED: 'user_escalted',
    NETWORK_DISCONNECT: 'network_disconnect',
    NETWORK_CONNECT: 'network_connect',
    SECONDARY_CAM_UFM: 'second_cam_ufm',
    ON_BLUR: 'on_blur',
    ON_FOCUS: 'on_focus',
}; // 👈 Important: 'as const' makes the string literals literal types
/**
 *
 */
class InternalEventManager {
    eventList = {};
    /**
     *
     */
    constructor() {
        // this.eventList = {};
    }
    /**
     *
     * @param eventName
     * @param fn
     */
    on(eventName, fn) {
        // If the event name is not already registered, initialize it with an empty array
        if (!this.eventList.hasOwnProperty(eventName)) {
            this.eventList[eventName] = [];
        }
        // Add the callback function to the list of listeners for the event
        this.eventList[eventName].push(fn);
    }
    /**
     * Triggers an event, executing all registered callbacks with type-safe parameters.
     * @param eventName The name of the event to trigger.
     * @param params The parameters to pass to the event callbacks, type-checked against SdkEventCallbacks.
     */
    trigger(eventName, ...params // Type-safe parameters
    ) {
        // Check if the event exists in the event list
        if (!this.eventList.hasOwnProperty(eventName)) {
            utility.warn(`Attempted to trigger unknown event: ${eventName}`);
            return;
        }
        // Retrieve the listeners. Cast to the specific array type for type safety during iteration.
        const listeners = this.eventList[eventName];
        // Call each registered function with the provided parameters
        listeners.forEach((fn) => {
            // Use the spread operator to pass parameters.
            // Type safety is enforced by 'Parameters<SdkEventCallbacks[K]>'.
            fn(...params);
        });
    }
    /**
     * Removes a specific callback function from an event.
     * @param eventName The name of the event.
     * @param fn The specific function to remove, type-checked against SdkEventCallbacks.
     */
    off(eventName, fn) {
        // Check if the event exists in the event list
        if (!this.eventList.hasOwnProperty(eventName)) {
            return; // Event doesn't exist, nothing to remove
        }
        // Get the array of listeners for this event. Cast for type safety.
        const listeners = this.eventList[eventName];
        // Find the index of the function to remove
        // Type assertion 'as any' might be needed if strict equality for functions
        // (which `indexOf` uses) is causing type mismatches between a specific function
        // type and the general `Function` type in `eventList`.
        const index = listeners.indexOf(fn);
        // If the function was found, remove it
        if (index !== -1) {
            listeners.splice(index, 1);
            utility.log(`Removed listener for event '${eventName}'.`);
        }
        else {
            utility.log(`Listener not found for event '${eventName}'.`);
        }
        // If no more listeners for this event, remove the event property to clean up
        if (listeners.length === 0) {
            delete this.eventList[eventName];
            utility.log(`No more listeners for '${eventName}', event property removed.`);
        }
    }
}
const sdkEvents = new InternalEventManager();

/**
 *
 */
class AIManager {
    frameRate;
    thinkAi = null;
    token = 'HpYQSPxnv1/t312MSYJM4jbAF70h1a0BhTmdh+irLaGhKhyIb5g4bqYY7zCZf01IoAqZ+mawfFoncLf7VfxxLn453HuHb38SRTk1yMTMQ2RoAnrXi7ZG01IEWv9Ix6LL+KD6kdVG6JRMuFvaV2yfYp+ntEiCYP8K9bkEKbAaA/s=';
    /**
     *
     */
    constructor() {
        this.frameRate = 0;
    }
    /**
     *
     */
    setFrameRate(frame) {
        this.frameRate = frame;
    }
    /**
     *
     */
    async loaddata() {
        try {
            // await tf.setBackend('webgl').catch(err => {
            //      utility.error('Failed to set WebGL backend, falling back to CPU:', err);
            //      tf.setBackend('cpu');
            //  });
            const module = await import(`${environment.THINK_AI}?v=${Date.now()}`);
            utility.log(module);
            this.thinkAi = module.thinkXai;
            this.aiLoaded((message) => {
                console.log("AI Loaded Message:", message);
            });
            // utility.log(this.thinkAi);
        }
        catch (error) {
            utility.log(error);
        }
    }
    /**
     *
     * @param video
     * @param callback
     */
    idVerify(video, callback) {
        return this.thinkAi.faceDetection(video, 'id', this.token, function (message) {
            callback(message);
        });
    }
    /**
     *
     * @param video
     * @param callback
     */
    photoVerify(video, callback) {
        return this.thinkAi.faceDetection(video, 'profile', this.token, function (message) {
            callback(message);
        });
    }
    /**
     *
     * @param video
     * @param callback
     */
    roomVerify(video, callback) {
        return this.thinkAi.roomScan(video, this.token, this.frameRate, function (message, image) {
            callback(message, image);
        });
    }
    /**
     *
     * @param video
     * @param callback
     */
    leftProfile(video, callback) {
        return this.thinkAi.leftProfile(video, this.token, this.frameRate, function (message, image) {
            callback(message, image);
        });
    }
    /**
     *
     * @param video
     * @param callback
     */
    rightProfile(video, callback) {
        return this.thinkAi.rightProfile(video, this.token, this.frameRate, function (message, image) {
            callback(message, image);
        });
    }
    /**
     *
     * @param video
     * @param callback
     */
    handGesture(video, callback) {
        return this.thinkAi.handGesture(video, this.token, this.frameRate, function (message, image) {
            callback(message, image);
        });
    }
    deskScan(video, callback) {
        return this.thinkAi.deskScan(video, this.token, this.frameRate, function (message, image) {
            callback(message, image);
        });
    }
    examAI(video, callback) {
        return this.thinkAi.examination(video, this.token, configrationManager.base64Snapshot, function (message) {
            callback(message);
        });
    }
    stopExamination(callback) {
        return this.thinkAi.stopExamination(function (message) {
            callback(message);
        });
    }
    /**
     *
     * @param callback
     */
    stopPhotoAndID() {
        return new Promise((resolve) => {
            let resolved = false;
            this.thinkAi.stopFaceDetection(function (message) {
                if (message?.status_code == 200) {
                    resolved = true;
                    resolve(message);
                }
            });
            utility.wait(2000).then(() => {
                if (!resolved) {
                    resolve({ status_code: 200, message: 'Stopped successfully' });
                }
            });
        });
    }
    /**
     *
     * @param callback
     */
    stopRoomScan(callback) {
        return this.thinkAi.stopRoomScan(function (message) {
            callback(message);
        });
    }
    /**
     *
     * @param callback
     */
    stopLeftProfile(callback) {
        return this.thinkAi.stopLeftProfile(function (message) {
            callback(message);
        });
    }
    /**
     *
     * @param callback
     */
    stopRightProfile(callback) {
        return this.thinkAi.stopRightProfile(function (message) {
            callback(message);
        });
    }
    /**
     *
     * @param callback
     */
    stopHandGesture(callback) {
        return this.thinkAi.stopHandGesture(function (message) {
            callback(message);
        });
    }
    /**
     *
     * @param callback
     */
    stopDeskScan(end = 0, callback) {
        return this.thinkAi.stopDeskScan(end, function (message) {
            callback(message);
        });
    }
    secondaryCameraPosition(video, cameraName, callback) {
        return this.thinkAi.secondaryCameraPosition(video, this.token, this.frameRate, cameraName, function (message, image) {
            callback(message, image);
        });
    }
    stopSecondaryCameraPosition(callback) {
        return this.thinkAi.stopSecondayCameraPosition(function (message) {
            callback(message);
        });
    }
    secondaryCameraPositionValidate(video, callback) {
        return this.thinkAi.secondaryCameraPositionValidate(video, this.token, this.frameRate, function (message, image) {
            callback(message, image);
        });
    }
    stopSecondaryCameraPositionValidate(callback) {
        return this.thinkAi.stopSecondaryCameraPositionValidate(function (message) {
            callback(message);
        });
    }
    //Smart Proctor AI start
    getUFMCode(ufmType, codeArr) {
        return new Promise((resolve) => {
            let i = 0;
            if (LiveStreamManager.PRIMARY_CAMERA_NAME != 'P_CAM') {
                if (ufmType == "MFD") {
                    resolve(254); // MFD always 254 
                    return;
                }
                if (ufmType == "FNP") {
                    resolve(253); // FNP always 253
                    return;
                }
                if (ufmType == "OD") {
                    resolve(259); // OD always 259
                    return;
                }
            }
            if (codeArr == undefined) {
                resolve(0); // no match found
                return;
            }
            const next = () => {
                if (Array.isArray(codeArr) && i >= codeArr.length) {
                    resolve(0); // no match found
                    return;
                }
                let code = null;
                if (Array.isArray(codeArr)) {
                    code = codeArr[i++];
                }
                else {
                    code = codeArr;
                    resolve(code);
                    return;
                }
                this.thinkAi.master_ufm(code, (message) => {
                    if (message && message.UFM === ufmType) {
                        resolve(code); // match found, resolve Promise
                    }
                    else {
                        next(); // keep looping until match or end
                    }
                });
            };
            next();
        });
    }
    getSmartProctorUFM(data) {
        const token = this.token;
        const candidate_name = configrationManager.currentCandidateName; //configrationManager.candidateName;
        const ufm_code = data.ufm_code;
        const msg_type = data.status;
        const cs_value = data.cs_score;
        const suspension_score_value = data.suspension_score;
        const termination_score_value = data.termination_score;
        const deduction_point = data.deduction_point;
        const language = configrationManager.language;
        //utility.log("getSmartProctorUFMFunction=============",data, LiveStreamManager.PRIMARY_CAMERA_NAME, configrationManager.previous_instance_escalated, configrationManager.smartProctorEnable)
        const object_array = data.ufm_subtype;
        if (ufm_code != 0 || msg_type == 'welcome_msg' || msg_type == 'relogin') {
            try {
                if (LiveStreamManager.PRIMARY_CAMERA_NAME == 'P_CAM'
                    && configrationManager.previous_instance_escalated == false
                    && configrationManager.smartProctorEnable == 1) {
                    utility.log("smart_proctor_ufm_request=============", data);
                    this.thinkAi.smart_proctor_ufm_response(token, candidate_name, ufm_code, msg_type, language, cs_value, suspension_score_value, termination_score_value, deduction_point, object_array, (response) => {
                        //resolve(responseCode); // success
                        utility.log("smart_proctor_ufm_response=============", response);
                        sdkEvents.trigger(SDK_EVENT.SMART_PROCTOR_MSG, response);
                    });
                }
                else if (LiveStreamManager.PRIMARY_CAMERA_NAME != 'P_CAM'
                    && configrationManager.previous_instance_escalated == false
                    && configrationManager.smartProctorEnable == 1) {
                    sdkEvents.trigger(SDK_EVENT.SECONDARY_CAM_UFM, data);
                }
            }
            catch (err) { }
        }
    }
    getSmartProctorCandidateMsg(msg) {
        const token = this.token;
        try {
            this.thinkAi.smart_proctor_candidate_query_msg(token, msg, (response) => {
                //resolve(responseCode); // success
                utility.log("smart_proctor_candidate_query_msg=============", response);
                sdkEvents.trigger(SDK_EVENT.SMART_PROCTOR_MSG, response);
            });
        }
        catch (err) { }
    }
    //Smart Proctor AI END
    // Monitering Side AI strat
    secondaryCameraSideMonitoring(video, callback) {
        return this.thinkAi.secondaryCameraSideMonitoring(video, this.token, this.frameRate, function (message, image) {
            callback(message, image);
        });
    }
    stopSecondaryCameraSideMonitoring(callback) {
        return this.thinkAi.stopSecondaryCameraSideMonitoring(function (message) {
            callback(message);
        });
    }
    // Monitering Back AI strat
    secondaryCameraBackMonitoring(video, callback) {
        return this.thinkAi.secondaryCameraBackMonitoring(video, this.token, this.frameRate, function (message, image) {
            callback(message, image);
        });
    }
    stopSecondaryCameraBackMonitoring(callback) {
        return this.thinkAi.stopSecondaryCameraBackMonitoring(function (message) {
            callback(message);
        });
    }
    //Monitering Front AI strat
    secondaryCameraFrontMonitoring(video, callback) {
        return this.thinkAi.secondaryCameraFrontMonitoring(video, this.token, this.frameRate, function (message, image) {
            callback(message, image);
        });
    }
    stopSecondaryCameraFrontMonitoring(callback) {
        return this.thinkAi.stopSecondaryCameraFrontMonitoring(function (message) {
            callback(message);
        });
    }
    aiLoaded(callback) {
        return this.thinkAi.load_models(function (message) {
            callback(message);
        });
    }
}
const ai = new AIManager();

/* Author : Prateek Jaiswal */
/**
 *
 */
class RequestManager {
    /* Sends a GET request to fetch data. */
    /**
     *
     */
    getExample() {
        return api.get('/candidate/xyz');
    }
    /* Sends a POST request to submit data. */
    /**
     *
     * @param data
     */
    postExample(data) {
        return api.post('/candidate/postdata', data);
    }
    /* Sends a PUT request to update existing data. */
    /**
     *
     * @param data
     */
    putExample(data) {
        return api.put('/candidate/putdata', data);
    }
    /* Sends a DELETE request to remove data */
    /**
     *
     * @param data
     */
    deleteExample() {
        return api.delete('/candidate/xyz');
    }
    /**
     *
     * @param data
     */
    sdkInitialize(data) {
        return api.post('/initialize', data);
    }
    /**
     *
     * @param data
     */
    secondaryCameraConnect(data) {
        return api.post('/autoLoginOnMobile', data);
    }
    /**
     *
     * @param data
     * @param data.environment
     */
    stageStart(data) {
        return api.post('/stageStart', data);
    }
    /**
     *
     * @param data
     * @param data.environment
     * @param data.log
     */
    stageEnd(data) {
        return api.post('/stageEnd', data);
    }
    /**
     *
     * @param data
     * @param data.environment
     * @param file
     */
    uploadIdAndPhoto(data, file) {
        const image = { name: 'file', File: file };
        const files = [image];
        return api.file('/capturePhotoIdentityCard', data, files);
    }
    /**
     *
     * @param data
     * @param data.attempt_no
     */
    compareIdAndPhoto(data) {
        return api.post('/verifyPhotoAndRegistrationId', data);
    }
    /**
     *
     * @param data
     * @param data.ufm_type
     * @param data.environment
     * @param data.attempt_no
     * @param file
     */
    ufmLog(data, file) {
        if (file) {
            const image = { name: 'file', File: file };
            const files = [image];
            return api.file('/examUfmLog', data, files);
        }
        else {
            return api.post('/examUfmLog', data);
        }
    }
    regualarUfmLog(data, file) {
        if (file) {
            const image = { name: 'file', File: file };
            const files = [image];
            return api.file('/regularSnapStart', data, files);
        }
        else {
            return api.post('/regularSnapStart', data);
        }
    }
    /**
     *
     * @param data
     * @param data.environment
     * @param data.attempt_no
     */
    getRoomUfmList(data) {
        return api.post('/getRoomUfmList', data);
    }
    getAudio(data) {
        return api.post('/tts/synthesize', data);
    }
    QRCode(data) {
        return api.post('/generateCameraQrCode', data);
    }
    endExam(data) {
        return api.post('/session/markCompleted', data);
    }
    checkSessionStatus() {
        return api.get('/sessionStatusCandidate');
    }
    clearEscalation() {
        return api.get('/clearEscalation');
    }
    getChat() {
        return api.get('/chat');
    }
    sendChat(data) {
        return api.post('/chat', data);
    }
    qrInactive(data) {
        return api.post('/qrInactive', data);
    }
    checkCurrentQRstatus(data) {
        return api.post('/checkQrStatus', data);
    }
    deskOption() {
        return api.get('/deskOption');
    }
    updateDeskOption(data) {
        return api.post('/updateDeskOption', data);
    }
    getFeedbackSkill() {
        return api.get('/getFeedbackList');
    }
    postFeedbackSkill(data) {
        return api.post('/saveFeedback', data);
    }
    getIdVerification() {
        return api.get('/getIdVerification');
    }
    getUfmList() {
        return api.get('/getUfmList');
    }
    updateIDEscalation(data) {
        return api.post('/sessionEcalationUpdate', data);
    }
}
const request = new RequestManager();

/**
 *
 */
class SocketManager {
    static socketUrl;
    socket;
    roomId = '';
    roomJoined = false;
    networkTimeout;
    updateDashboardInterval;
    networkDisconnectTimeout;
    networkPopupShown = false;
    socketeventList = {};
    workerPath = environment.UI_BASE_URL + 'socketWorker.js';
    socketWorker = null;
    heartbeatInterval;
    /**
     *
     */
    constructor() {
        this.socket = null;
        fetch(this.workerPath)
            .then(response => response.text())
            .then(workerCode => {
            // Create a Blob from the code and get an object URL
            const blob = new Blob([workerCode], { type: 'application/javascript' });
            const workerUrl = URL.createObjectURL(blob);
            // Construct the worker using the local object URL
            this.socketWorker = new Worker(workerUrl);
            // ... proceed with postMessage
        })
            .catch(error => utility.error("Could not load worker script:", error));
    }
    /**
     *
     * @param socketUrl
     * @param authToken
     */
    Init(socketUrl, authToken) {
        SocketManager.socketUrl = socketUrl;
        // this.socket = io(socketUrl, {
        //   auth: {
        //     token: authToken, // <--- Pass the token here
        //   },
        // });
        if (this.socketWorker) {
            this.socketWorker.postMessage({ mode: 'CONNECT', data: { socketUrl: socketUrl, authToken: authToken } });
            this.socketWorker.onmessage = (event) => {
                const message = event.data;
                if (message.type == "DATA") {
                    const on = message.on;
                    const payload = message.payload;
                    if (this.socketeventList.hasOwnProperty(on)) {
                        this.socketeventList[on].forEach((fn) => fn(payload));
                    }
                }
            };
        }
        this.setupSocketListeners();
    }
    /**
     *
     * @param eventName
     * @param fn
     */
    on(eventName, fn) {
        //this.socket?.on(eventName, fn);
        this.socketWorker?.postMessage({ mode: 'ON', text: eventName });
        if (!this.socketeventList.hasOwnProperty(eventName)) {
            this.socketeventList[eventName] = [];
        }
        this.socketeventList[eventName].push(fn);
    }
    /**
     *
     * @param eventName
     * @param fn
     */
    off(eventName) {
        // this.socket?.off(eventName);
        this.socketWorker?.postMessage({ mode: 'OFF', text: eventName });
    }
    /**
     *
     * @param eventName
     * @param params
     * @param to
     */
    emit(eventName, params = {}, to = '', ack) {
        // if (this.socket) this.socket.emit(eventName, this.getMessage(params, to), ack);
        this.socketWorker?.postMessage({ mode: 'EMIT', text: eventName, data: this.getMessage(params, to) });
    }
    /**
     *
     * @param msg
     * @param to
     */
    getMessage(msg = {}, to = '') {
        return {
            userType: configrationManager.candidateNameMsg,
            from: configrationManager.socketUserName,
            to: to,
            env: configrationManager.appEnv,
            api: environment.API_URL,
            data: msg,
        };
    }
    /**
     *
     */
    setupSocketListeners() {
        // Basic Connection Events
        this.on('connect', () => {
            utility.log('Connected to server! Socket ID:', this.socket ? this.socket.id : null);
            this.networkReconnect();
            // On initial connect, or any connect, try to go online
            if (configrationManager.socketUserName) {
                // Only try to go online if we have a userId set
                this.userOnline();
                utility.log(`Emitting user_online for ${configrationManager.socketUserName}...`, 'system');
            }
        });
        this.on('disconnect', (reason) => {
            utility.log('Disconnected from server. Reason:', reason);
            if (configrationManager.isSubmited != 'Interview_Session') {
                clearTimeout(this.networkDisconnectTimeout);
                this.networkDisconnectTimeout = setTimeout(() => {
                    this.networkPopup();
                }, 10000);
            }
        });
        // Reconnection Events (Crucial for maintaining online status across server restarts/network drops)
        this.on('reconnect', (attemptNumber) => {
            utility.log(`Reconnected to server after ${attemptNumber} attempts.`);
            // Re-emit user_online to re-establish status and userId on the server socket
            if (configrationManager.socketUserName) {
                this.userOnline();
                this.networkReconnect();
                utility.log(`Re-establishing online status for ${configrationManager.socketUserName}...`, 'system');
            }
        });
        this.on('reconnect_attempt', (attemptNumber) => {
            utility.log(`Reconnection attempt #${attemptNumber}`);
            utility.log(`Reconnection attempt #${attemptNumber}...`, 'system');
        });
        this.on('reconnect_error', (error) => {
            utility.error('Reconnection error:', error);
            utility.log(`Reconnection error: ${error.message}`, 'error');
        });
        this.on('reconnect_failed', () => {
            utility.error('Reconnection failed permanently.');
        });
        // --- SERVER-TO-CLIENT SPECIFIC EVENT HANDLERS ---
        this.on('user_status_change', (payload) => {
            utility.log('User status change:', payload);
            if (payload.data.status == 'offline') {
                sdkEvents.trigger(SDK_EVENT.USER_LEFT, payload.from);
            }
            if (payload.data.status == 'reconnect') {
                sdkEvents.trigger(SDK_EVENT.USER_RECONNECT, payload.from);
            }
        });
        this.on('online_users_status', (payload) => {
            utility.log('Online users status received:', payload);
            this.onlineUserCallback(payload.data);
        });
        this.on('receive_message', (payload) => {
            utility.log(`[${payload.data.senderId}]: ${payload.data.message}`, 'received');
            sdkEvents.trigger(SDK_EVENT.RECEIVE_MESSAGE, payload.data.senderId, JSON.parse(payload.data.message));
            this.emit('message_read', { senderId: payload.data.senderId });
        });
        this.on('message_delivered', (payload) => {
            utility.log('Message delivered to:', payload.data.receiverId);
        });
        this.on('message_read', (payload) => {
            utility.log('Message read by:', payload.data.readerId);
            utility.log(`Message read by ${payload.data.readerId}.`, 'system');
        });
        this.on('error', (payload) => {
            utility.error('Socket error:', payload);
            utility.log(`Error: ${payload.data.message} ${payload.data.code ? `(Code: ${payload.data.code})` : ''}`, 'error');
        });
        this.on('chatMessage', (payload) => {
            utility.log(`[${payload.data.roomId}]: ${payload.data.message}`, 'received');
            const parsedMessage = JSON.parse(payload.data.message);
            if (this.internalMessages(parsedMessage.mode, parsedMessage.text, parsedMessage, payload.data.roomId, payload.from)) {
                sdkEvents.trigger(SDK_EVENT.CHAT_MESSAGE, payload.from, parsedMessage);
            }
        });
        // Heartbeat for keeping connection/status alive
        // This helps prevent idle connections from being dropped by some proxies/firewalls.
        this.heartbeatInterval = setInterval(() => {
            this.heartbeat();
        }, 30000); // Every 30 seconds (adjust as needed)
    }
    /**
     *
     */
    userOnline() {
        utility.log('USER ONLINE');
        this.emit('user_online');
        sdkEvents.trigger(SDK_EVENT.SOCKET_CONNECTED);
    }
    /**
     *
     */
    heartbeat() {
        this.emit('heartbeat');
    }
    /**
     *
     */
    onlineUserCallback(userIds) { }
    /**
     *
     * @param userIds
     */
    async onlineUsers(userIds) {
        this.emit('get_online_users_status', { userIds: userIds });
        return new Promise((resolve) => {
            this.onlineUserCallback = resolve;
        });
    }
    sendMessage(to, message) {
        let messageText = JSON.stringify(message);
        this.emit('send_message', {
            receiverId: to,
            message: messageText,
        });
    }
    goingOffline() {
        utility.log('Going offline...');
        this.emit('leavingSocket');
    }
    // Room Chat Methods
    createRoom() {
        if (this.roomJoined) {
            utility.log(`Already in room: ${this.roomId}`);
            return;
        }
        this.roomId = configrationManager.socketRoomName;
        utility.log(`Creating room: ${this.roomId}`);
        this.emit('createRoom', { roomId: this.roomId });
        this.roomJoined = true;
    }
    joinRoom() {
        utility.log(`Joining room: ${this.roomId}`);
        this.emit('joinRoom', { roomId: this.roomId });
    }
    joinOtherRoom(roomId) {
        utility.log(`Joining room: ${roomId}`);
        this.emit('joinRoom', { roomId: roomId });
    }
    leaveRoom() {
        utility.log(`Leaving room: ${this.roomId}`);
        this.emit('leaveRoom', { roomId: this.roomId });
        this.roomJoined = false;
        this.roomId = '';
    }
    leaveOtherRoom(roomId) {
        utility.log(`Leaving room: ${this.roomId}`);
        this.emit('leaveRoom', { roomId: roomId });
    }
    sendRoomMessage(message) {
        let messageText = JSON.stringify(message);
        utility.log(`Sending message to room ${this.roomId}: ${messageText}`);
        this.emit('chatMessage', {
            roomId: this.roomId,
            message: messageText,
        });
    }
    leavingSocket() {
        utility.log(`Sending message to room ${this.roomId}`);
        this.emit('leavingSocket');
    }
    sendOtherRoomMessage(roomId, message) {
        let messageText = JSON.stringify(message);
        utility.log(`Sending message to room ${roomId}: ${messageText}`);
        this.emit('chatMessage', {
            roomId: roomId,
            message: messageText,
        });
    }
    sendProctorMsg(message) {
        if (configrationManager.currentProctor != '')
            this.sendOtherRoomMessage(configrationManager.currentProctor, message);
    }
    setProctor(proctorId) {
        if (configrationManager.currentProctor == proctorId) {
            return;
        }
        if (configrationManager.currentProctor != '' &&
            configrationManager.currentProctor != proctorId) {
            this.leavingProctor();
            this.updateProctorDashboard();
            this.leaveOtherRoom(configrationManager.currentProctor);
        }
        configrationManager.currentProctor = proctorId; // set new proctor id
        if (proctorId == '') {
            return;
        }
        this.joinOtherRoom(configrationManager.currentProctor);
        clearInterval(this.updateDashboardInterval);
        this.updateDashboardInterval = setInterval(() => {
            this.updateProctorDashboard();
        }, 5000);
    }
    leavingProctor() {
        let msg = { mode: 'leavingCandidate', text: 'leaving candidate' };
        this.sendProctorMsg(msg);
    }
    updateProctorDashboard() {
        let msg = { mode: 'updateDashboard', text: 'Get Dashboard' };
        this.sendProctorMsg(msg);
    }
    leaveProctor() {
        if (configrationManager.currentProctor != '')
            this.leaveOtherRoom(configrationManager.currentProctor);
        configrationManager.currentProctor = '';
    }
    internalMessages(mode, text, message, roomId, from) {
        switch (mode) {
            case 'candidate_info_request':
                sdkEvents.trigger(SDK_EVENT.STREAM_INFO_REQUEST);
                break;
            case 'stream_request':
                sdkEvents.trigger(SDK_EVENT.STREAM_REQUEST, text, from);
                break;
            case 'dashboardUpdated':
                clearInterval(this.updateDashboardInterval);
                break;
            default:
                return true;
        }
        return false;
    }
    cameraRevoke(cameraName) {
        let msg = { mode: 'camera_revoke', text: cameraName };
        socket.sendRoomMessage(msg);
        if ((cameraName == 'RS_CAM' &&
            (configrationManager.currentStepAlias == 'Room_Sanitization_360' ||
                configrationManager.currentStepAlias == 'Desk_Check')) ||
            (cameraName == 'P_CAM' && configrationManager.currentStepAlias == 'Body_Scan_Check')) {
            request
                .clearEscalation()
                .then((response) => {
                this.leaveProctor();
                configrationManager.currentProctor = "";
            })
                .catch((error) => {
                utility.log('error', error);
            });
        }
    }
    networkPopup() {
        ui.show(ui.id("thinkX_network_popup"));
        // Reset state in case it was shown before
        const reconnecting = ui.id("thinkX_network_reconnecting");
        const closeBtn = ui.id("thinkX_network_close");
        if (reconnecting)
            reconnecting.classList.remove("d-none");
        if (closeBtn)
            closeBtn.classList.add("d-none");
        // Start 5-second timer
        clearTimeout(this.networkTimeout);
        this.networkTimeout = setTimeout(() => {
            events.trigger(EVENT.NETWORK_REVOKE);
            ui.hide(ui.id("thinkX_main_network_loader"));
            if (reconnecting)
                reconnecting.classList.add("d-none");
            if (closeBtn)
                closeBtn.classList.remove("d-none");
            this.networkPopupShown = true;
            this.closeBtnNetwork();
            if (configrationManager.userType == '3') {
                let msg = { mode: 'interviewer_leave', text: "interviewer leaving" };
                socket.sendRoomMessage(msg);
            }
            else {
                let msg = { mode: 'candidate_leave', text: "candidate leaving", data: configrationManager.currentStepAlias };
                socket.sendRoomMessage(msg);
            }
            this.closeSocket();
            sdkEvents.trigger(SDK_EVENT.NETWORK_DISCONNECT);
        }, 5000);
    }
    closeBtnNetwork() {
        const button = ui.id('thinkX_network_close');
        if (button) {
            ui.click(button, async () => {
                configrationManager.currentStepObject?.manager().closeApplication();
            });
        }
    }
    networkReconnect() {
        if (this.networkPopupShown == false) {
            ui.hide(ui.id("thinkX_network_popup"));
        }
        events.trigger(EVENT.NETWORK_RESTORE);
        sdkEvents.trigger(SDK_EVENT.NETWORK_CONNECT);
        clearTimeout(this.networkDisconnectTimeout);
        clearTimeout(this.networkTimeout);
        this.networkTimeout = undefined;
    }
    closeSocket() {
        if (this.socketWorker) {
            utility.log("Closing socket connection...");
            this.goingOffline(); // emit user_offline before disconnecting  
            this.socketWorker.postMessage({ mode: 'DISCONNECT' });
            this.socketWorker.terminate();
            this.socketWorker = null;
            this.socket = null;
            this.roomId = '';
            this.roomJoined = false;
            configrationManager.currentProctor = '';
            clearTimeout(this.networkTimeout);
            this.networkTimeout = undefined;
            if (this.heartbeatInterval) {
                clearInterval(this.heartbeatInterval);
                this.heartbeatInterval = undefined;
            }
        }
    }
}
const socket = new SocketManager();

/**
 *
 */
class StepUIManager {
    stepUIData;
    static stepManager;
    activeStepCount = 0;
    activeSteps = {};
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
    init(stepManager) {
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
    setStepActiveCount(stepSwitch) {
        const stepOrder = this.stepUIData;
        let count = 0;
        for (const stepName in stepSwitch) {
            if (stepOrder.hasOwnProperty(stepName) && stepSwitch[stepName]) {
                const stepData = stepOrder[stepName];
                if (stepData.tab_div != undefined &&
                    stepData.tab_div != '' &&
                    this.activeSteps[stepData.tab_div] == undefined) {
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
        if (currentStepElem)
            ui.innerText(currentStepElem, currentStep.toString());
        if (allStepElem)
            ui.innerText(allStepElem, allStep.toString());
        if (percentCircle) {
            let percent = Math.round((currentStep / allStep) * 100);
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
    stepTabDeactive(stepName) {
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
    stepTabComplete(stepName) {
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
    stepTabActive(stepName) {
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
    stepStart(currentStep, previousStep = '') {
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
        }
        else {
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
    stepEnd(currentStep) {
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
    stepError(currentStep, error) {
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
    mergeWithBoldAndBreak(arr) {
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
    screenResolution(resolution) {
        const resultDiv = ui.id('thinkX_screenResolution');
        if (resultDiv) {
            ui.innerText(resultDiv, `${resolution.width}x${resolution.height}`);
        }
    }
    /**
     *
     * @param message
     */
    screenError(message) {
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
    initAndUpdateCustomSelectById(id, options, defaultValue) {
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
    updateCustomSelectOptions(id, options, defaultValue) {
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
    initCustomSelect(id) {
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
    setOptions(id, newOptions, defaultVal) {
        const select = ui.id(id);
        if (!select)
            return;
        // Clear and re-add options
        select.innerHTML = '';
        newOptions.forEach(({ value, label }) => {
            const opt = document.createElement('option');
            opt.value = value;
            opt.text = label;
            if (value === defaultVal)
                opt.selected = true;
            select.appendChild(opt);
        });
        // Remove old wrapper to rebuild
        const oldWrapper = select.closest('.thinkproc-custom-select-wrapper');
        if (oldWrapper) {
            const oldWrapperParant = oldWrapper.parentNode;
            // oldWrapper.remove();
            // oldWrapperParant?.prepend(select);
            oldWrapperParant?.replaceChild(select, oldWrapper);
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
    createCustomSelectById(id) {
        const select = ui.id(id);
        if (!select || select.closest('.thinkproc-custom-select-wrapper'))
            return;
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
    buildCustomSelect(select) {
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
                const target = e.target;
                if (!target.classList.contains('thinkproc-custom-option'))
                    return;
                const value = target.dataset.value;
                if (!value)
                    return;
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
    srcBlank(id) {
        const result = ui.id(id);
        if (result) {
            ui.show(result);
            const imgElement = result;
            imgElement.src = '';
        }
    }
    /**
     *
     * @param id
     * @param url
     */
    srcInsert(id, url) {
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
    insertText(id, text) {
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
    stepBack(currentStep) {
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
    setRetryCloseBtn(html, containerId) {
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
        const element = tempDiv.firstElementChild;
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
    setGif(html, containerId) {
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
        const element = tempDiv.firstElementChild;
        if (!element) {
            utility.warn('Provided HTML did not result in a valid element.');
            return null;
        }
        container.appendChild(element);
        return element;
    }
    setLoader(html, containerId) {
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
        const element = tempDiv.firstElementChild;
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
    insertHtml(id, html) {
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
const stepUIManager = new StepUIManager();

class ChatUi {
    callTimerInterval;
    callStartTime = 0;
    userName = '';
    firstChatLoadDone = false;
    lastTempMsgId = null;
    isChatOpen = false;
    messageRecived(user, message) {
        utility.log('chat message recieve', message.mode);
        switch (message.mode) {
            case 'chat':
                if (configrationManager.currentStepAlias == 'Interview_Session') {
                    this.setInterviewChatUI();
                }
                break;
            case 'proctor_audio_track':
                this.audioTrackAdded(message.data, user);
                break;
            case 'proctor_audio_track_remove':
                this.removeAudioTrackAdded(user);
                break;
            default:
                console.log('Unknown mode:', message.mode);
        }
    }
    shownMessages = {};
    setChatUI() {
        if (LiveStreamManager.PRIMARY_CAMERA_NAME == 'P_CAM') {
            // ui.show(ui.id('thinkproc_chat'));
            // ui.show(ui.id('thinkprocChatMainBody'));
            stepUIManager.insertText('thinkX_Candidate_Name', 'Proctor');
            this.toggleChat();
        }
    }
    ;
    showMessages() {
        this.setChatUI();
        request
            .getChat()
            .then((response) => {
            const chatContainer = ui.id('thinkproc_chat_histroy');
            if (!chatContainer) {
                utility.log('Chat container not found');
                return;
            }
            chatContainer.innerHTML = ''; // clear old messages if needed
            if (response.status && response.data && typeof response.data === 'object') {
                Object.entries(response.data).forEach(([id, msg]) => {
                    if (this.shownMessages[id])
                        return; // use id as unique key
                    let messageBubble = '';
                    let timeOnly = '';
                    if (msg.date) {
                        const parts = msg.date.split(' '); // ["25-09-2025", "07:15", "am"]
                        if (parts.length >= 3) {
                            timeOnly = parts[1] + ' ' + parts[2].toUpperCase(); // "07:15 AM"
                        }
                        else if (parts.length === 2) {
                            timeOnly = parts[1]; // fallback if no AM/PM
                        }
                        else {
                            timeOnly = msg.date; // fallback
                        }
                    }
                    if (msg.sender === 'Proctor') {
                        // Incoming message
                        messageBubble = `
                <div class="thinkproc_chat_message-bubble thinkproc_chat_message-incoming">
                  <div class="thinkproc-message-wrap">
                    <div class="thinkproc_chat_message_top">
                      <div class="thinkproc_chat_proctor_img">
                        <img src="${msg.senderPhoto || environment.UI_BASE_URL + 'images/user.jpg'}" alt="">
                      </div>
                      <div class="thinkproc_chat_proc_name">${msg.sender}</div>
                    </div>
                    <div class="thinkproc_chat_message_bottom">
                      <span class="thinkproc_chat_message_text">${msg.message}</span>
                      <span class="thinkproc_chat_time-stamp">${timeOnly}</span>
                    </div>
                  </div>
                </div>
              `;
                    }
                    else {
                        // Outgoing (Candidate) message
                        messageBubble = `
                <div class="thinkproc_chat_message-bubble thinkproc_chat_message-outgoing">
                  <div class="thinkproc-message-wrap">
                    <div class="thinkproc_chat_message_top">
                      <div class="thinkproc_chat_proctor_img">
                        <img src="${msg.senderPhoto || environment.UI_BASE_URL + 'images/user.jpg'}" alt="">
                      </div>
                      <div class="thinkproc_chat_proc_name">${msg.sender}</div>
                    </div>
                    <div class="thinkproc_chat_message_bottom">
                      <span class="thinkproc_chat_message_text">${msg.message}</span>
                      <span class="thinkproc_chat_time-stamp">${timeOnly}</span>
                    </div>
                  </div>
                </div>
              `;
                    }
                    chatContainer.insertAdjacentHTML('beforeend', messageBubble);
                    this.shownMessages[msg.id] = msg;
                });
                // auto-scroll to bottom after appending messages
                // chatContainer.scrollTo(0,chatContainer.scrollHeight);
                this.scrollToBottom('thinkX_chat_body');
            }
        })
            .catch((error) => {
            utility.log('error', error);
        });
    }
    // initChatEvents(): void {
    //   const sendBtn = ui.id('thinkX_sendChat') as HTMLButtonElement;
    //   const inputEl = ui.querySelector('.thinkproc_message_input_wrap input') as HTMLInputElement;
    //   const chatContainer = ui.id('thinkproc_chat_histroy') as HTMLElement;
    //   // Send message on button click
    //   ui.click(sendBtn, () => {
    //     let message = inputEl.value.trim();
    //     if (!message) return; // ⛔ prevent empty messages
    //     this.sendMessage(message, chatContainer, inputEl);
    //     if (configrationManager.smartProctorEnable == 1 && configrationManager.previous_instance_escalated == false) {
    //       ai.getSmartProctorCandidateMsg(message);
    //     }
    //   });
    //   // Send message on Enter key
    //   inputEl.addEventListener('keypress', (e: KeyboardEvent) => {
    //     if (e.key === 'Enter') {
    //       e.preventDefault();
    //       let message = inputEl.value.trim();
    //       if (!message) return; // ⛔ prevent empty messages
    //       this.sendMessage(message, chatContainer, inputEl);
    //       if (configrationManager.smartProctorEnable == 1 && configrationManager.previous_instance_escalated == false) {
    //         ai.getSmartProctorCandidateMsg(message);
    //       }
    //     }
    //   });
    // }
    escapeHtml(text) {
        return text
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;");
    }
    sendMessage(message, chatContainer, inputEl) {
        if (!message.trim())
            return;
        const tempId = 'temp_' + Date.now();
        // clear input immediately
        inputEl.value = '';
        message = this.escapeHtml(message);
        // create pending bubble
        const pendingBubble = `
      <div class="thinkproc_chat_message-bubble thinkproc_chat_message-outgoing pending" id="${tempId}">
        <div class="thinkproc-message-wrap">
          <div class="thinkproc_chat_message_top">
            <div class="thinkproc_chat_proctor_img">
              <img src="${environment.UI_BASE_URL}images/user.jpg" alt="">
            </div>
            <div class="thinkproc_chat_proc_name">You</div>
          </div>
          <div class="thinkproc_chat_message_bottom">
            <span class="thinkproc_chat_message_text">${message}</span>
            <span class="thinkproc_chat_time-stamp">sending...</span>
          </div>
        </div>
      </div>
    `;
        chatContainer.insertAdjacentHTML('beforeend', pendingBubble);
        // chatContainer.scrollTop = chatContainer.scrollHeight;
        this.scrollToBottom('thinkX_chat_body');
        // chatContainer.scrollTo(0,chatContainer.scrollHeight);
        // send to backend
        request
            .sendChat({
            is_message: 1,
            message: message,
            environment: configrationManager.currentStepAlias,
        })
            .then(() => {
            // Replace pending bubble with confirmed bubble
            const bubbleEl = ui.id(tempId);
            if (bubbleEl) {
                bubbleEl.classList.remove('pending');
                bubbleEl.classList.add('sent');
                const timestampEl = ui.scopedQuerySelector(bubbleEl, '.thinkproc_chat_time-stamp');
                if (timestampEl)
                    timestampEl.textContent = new Date().toLocaleTimeString();
            }
            // also trigger refresh to ensure sync
            this.showMessages();
            let msg = { mode: 'chat', text: 'proctor send message' };
            socket.sendRoomMessage(msg);
        })
            .catch((err) => {
            utility.log('Message send failed:', err);
            // mark bubble as failed
            const bubbleEl = ui.id(tempId);
            if (bubbleEl) {
                bubbleEl.classList.remove('pending');
                bubbleEl.classList.add('failed');
                const timestampEl = ui.scopedQuerySelector(bubbleEl, '.thinkproc_chat_time-stamp');
                if (timestampEl)
                    timestampEl.textContent = 'failed to send';
            }
        });
    }
    // scrollToBottom(id: string) {
    //   let scrollID = ui.id(id);
    //   if (scrollID) {
    //     scrollID.scrollTop = scrollID.scrollHeight;
    //   }
    // }
    scrollToBottom(id) {
        const scrollID = ui.id(id);
        if (!scrollID)
            return;
        requestAnimationFrame(() => {
            scrollID.style.scrollBehavior = "auto";
            scrollID.scrollTop = scrollID.scrollHeight;
        });
    }
    audioTrackAdded(audioStream, user) {
        this.setChatUI();
        // ui.show(ui.id('thinkX_chat_proc_call'));
        // ui.hide(ui.id('thinkX_call_action_btn'));
        // ui.show(ui.id('thinkX_call_timer'));
        let audioEl = ui.id('thinkX_call_audio_' + user);
        if (!audioEl) {
            let aduioDiv = ui.createElement('audio');
            aduioDiv.id = 'thinkX_call_audio_' + user;
            aduioDiv.autoplay = true;
            aduioDiv.controls = false;
            aduioDiv.style.display = 'none';
            ui.id('thinkX_chat_body')?.appendChild(aduioDiv);
            ui.hide(aduioDiv);
            audioEl = aduioDiv;
        }
        if (audioEl) {
            audioEl.srcObject = audioStream;
            audioEl.play().catch((error) => {
                utility.log('Audio play error:', error);
            });
        }
        this.startCallTimer();
    }
    startCallTimer() {
        // Clear any existing timer
        if (this.callTimerInterval) {
            clearInterval(this.callTimerInterval);
        }
        this.callStartTime = Date.now();
        this.callTimerInterval = setInterval(() => {
            const elapsed = Date.now() - this.callStartTime;
            const totalSeconds = Math.floor(elapsed / 1000);
            const minutes = Math.floor(totalSeconds / 60);
            const seconds = totalSeconds % 60;
            const formatted = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            const timerEl = ui.id('thinkX_call_timer_start');
            if (timerEl) {
                timerEl.textContent = formatted;
            }
        }, 1000);
    }
    // Call this when call ends
    stopCallTimer() {
        if (this.callTimerInterval) {
            clearInterval(this.callTimerInterval);
            this.callTimerInterval = null;
        }
        const timerEl = ui.id('thinkX_call_timer_start');
        if (timerEl) {
            timerEl.textContent = "00:00";
        }
    }
    removeAudioTrackAdded(user) {
        ui.hide(ui.id('thinkX_chat_proc_call'));
        ui.show(ui.id('thinkX_call_action_btn'));
        ui.hide(ui.id('thinkX_call_timer'));
        const audioEl = ui.id('thinkX_call_audio');
        // peer.removeAdd(user, LiveStreamManager.AUDIO.PRIMARY);
        if (audioEl) {
            audioEl.pause();
            audioEl.srcObject = null;
        }
        let msg = { mode: 'close_chat_interval', text: 'close chat interval' };
        socket.sendRoomMessage(msg);
        this.stopCallTimer();
    }
    toggleChat() {
        const button = ui.id('thinkX_minimize_chat');
        if (button) {
            // remove any existing listeners to avoid duplicates
            button.replaceWith(button.cloneNode(true));
            const newButton = ui.id('thinkX_minimize_chat');
            if (newButton) {
                newButton.addEventListener('click', (event) => {
                    event.preventDefault();
                    const chatBody = ui.id('thinkprocChatMainBody');
                    if (chatBody) {
                        chatBody.classList.toggle('d-none');
                    }
                });
            }
        }
    }
    initCloseButton() {
        const chatBody = ui.id('thinkproc_chat');
        if (chatBody) {
            ui.hide(chatBody);
        }
    }
    sendInterviewMessage(message, chatContainer, inputEl) {
        if (!message.trim())
            return;
        const tempId = "temp_" + Date.now();
        const safeMsg = message;
        inputEl.value = "";
        this.lastTempMsgId = tempId;
        // ---- TEMP OUTGOING BUBBLE ----
        const tempHTML = `
      <div class="temp-bubble" id="${tempId}">
        <p class="thinkproc-message-sender temp">${ui.translations.interviewLobby.You}</p>
        <p class="thinkproc-message-text pending">
          ${message}
          <span class="thinkproc_chat_time-stamp"></span>
        </p>
      </div>
    `;
        chatContainer.insertAdjacentHTML("beforeend", tempHTML);
        setTimeout(() => {
            this.scrollToBottomForce("thinkInterview_chatMsgBody");
        }, 500);
        // user type
        this.userName = (configrationManager.userType == "3") ? "Interviewer" : "Candidate";
        // ---- SEND TO BACKEND ----
        request.sendChat({
            is_message: 1,
            message: safeMsg,
            environment: configrationManager.currentStepAlias,
            userType: this.userName
        })
            .then(() => {
            // ---- UPDATE TEMP → SENT ----
            const bubble = ui.id(tempId);
            if (bubble) {
                bubble.classList.remove("pending");
                bubble.classList.add("sent");
                // const ts = bubble.querySelector(".thinkproc_chat_time-stamp");
                // if (ts) ts.textContent = new Date().toLocaleTimeString();
            }
            // ---- ALSO LOAD SERVER MESSAGES (ONLY NEW ONES) ----
            this.showInterviewMessages(false);
            socket.sendRoomMessage({ mode: "chat", text: "proctor send message" });
        })
            .catch(() => {
            // ---- FAILED ----
            const bubble = ui.id(tempId);
            if (bubble) {
                bubble.classList.remove("pending");
                bubble.classList.add("failed");
                const ts = bubble.querySelector(".thinkproc_chat_time-stamp");
                if (ts)
                    ts.textContent = "";
            }
        });
    }
    showInterviewMessages(forceReload = false) {
        const chatContainer = ui.id("thinkInterview_chatMsgBody");
        if (!chatContainer)
            return;
        if (!this.shownMessages) {
            this.shownMessages = {};
        }
        if (forceReload === true) {
            this.shownMessages = {};
            chatContainer.innerHTML = "";
        }
        const noDataEl = ui.id("thinkInterview_noDataFound");
        if (!this.firstChatLoadDone) {
            this.showLoaderwithText('thinkInterview_chatMsgBody');
        }
        request.getChat().then((response) => {
            if (!this.firstChatLoadDone) {
                this.hideLoaderwithText();
            }
            this.firstChatLoadDone = true;
            if (response.status && response.data) {
                // const messageKeys = Object.keys(response.data);
                if (response.code == 4101) {
                    if (noDataEl)
                        ui.show(noDataEl);
                    return;
                }
                if (noDataEl)
                    ui.hide(noDataEl);
                Object.entries(response.data).forEach(([msgId, msg]) => {
                    if (this.shownMessages[msgId])
                        return;
                    let timeOnly = "";
                    let senderName = msg.sender;
                    if (msg.date) {
                        const parts = msg.date.split(" ");
                        timeOnly = `${parts[1]} ${parts[2]?.toUpperCase() ?? ""}`;
                    }
                    if (msg.userID == configrationManager.userId && msg.userTypeID == configrationManager.userType) {
                        senderName = ui.translations.interviewLobby.You;
                    }
                    else {
                        senderName = msg.sender;
                    }
                    const bubble = `
                      <div class="chat-msg-wrapper" data-id="${msgId}">
                          <p class="thinkproc-message-sender">
                              ${senderName}
                              <span class="thinkproc_chat_time-stamp"> - ${timeOnly}</span>
                          </p>
                          <p class="thinkproc-message-text">
                              ${this.escapeHtml(msg.message)}
                          </p>
                      </div>
                  `;
                    if (this.lastTempMsgId &&
                        msg.userID == configrationManager.userId &&
                        ui.id(this.lastTempMsgId)) {
                        const tempEl = ui.id(this.lastTempMsgId);
                        if (tempEl) {
                            tempEl.outerHTML = bubble; // replace temp with real
                            this.lastTempMsgId = null;
                            this.shownMessages[msgId] = true;
                            return;
                        }
                    }
                    chatContainer.insertAdjacentHTML("beforeend", bubble);
                    // Mark added
                    this.shownMessages[msgId] = true;
                });
                chatContainer.querySelectorAll('.temp-bubble').forEach(el => el.remove());
                this.scrollToBottomForce("thinkInterview_chatMsgBody");
            }
        })
            .catch(() => {
            if (!this.firstChatLoadDone) {
                this.hideLoaderwithText();
            }
            this.firstChatLoadDone = true;
        });
    }
    scrollToBottomForce(containerId) {
        const el = ui.id(containerId);
        if (!el)
            return;
        const prevScroll = el.scrollTop; // where user currently is
        const maxScroll = el.scrollHeight; // new full height
        // If already near bottom → scroll smoothly
        if (prevScroll + el.clientHeight >= maxScroll - 50) {
            el.scrollTo({ top: maxScroll, behavior: "smooth" });
        }
        else {
            // If user was reading older messages → jump without effect
            el.scrollTop = maxScroll;
        }
    }
    setInterviewChatUI() {
        const popup = ui.id('thinkproc_chat_popup');
        if (popup) {
            ui.show(popup);
            ui.hide(ui.id('think_interview_ufmList'));
            this.initChatEvents();
            this.showInterviewMessages();
            this.closeChat();
            ui.show(ui.id('thinkInterview_StaticUFMIcon'));
            ui.hide(ui.id('thinkInterview_blueUFMIcon'));
            const ufmText = ui.id('thinkInterview_blueUFMText');
            if (ufmText) {
                ufmText.style.color = "#000000";
            }
            this.isChatOpen = true;
        }
    }
    chatButton() {
        const chatEl = ui.id('thinkinterview_chat');
        if (!chatEl)
            return;
        ui.click(chatEl, () => {
            const popup = ui.id('thinkproc_chat_popup');
            ui.id('think_interview_video_rightdiv');
            const ufmText = ui.id('thinkInterviewMsgText');
            if (!popup)
                return;
            if (!this.isChatOpen) {
                // 🔓 OPEN CHAT
                this.setInterviewChatUI();
                ui.show(ui.id('thinkInterview_blueMsg'));
                ui.hide(ui.id('thinkInterview_StaticMsg'));
                if (ufmText) {
                    ufmText.style.color = "rgba(47, 77, 219, 1)";
                }
                // if (configrationManager.userType == '2' && videoHtml) {
                //   videoHtml.style.width = "330px";
                // }
            }
            else {
                // 🔒 CLOSE CHAT
                ui.hide(popup);
                ui.hide(ui.id('thinkInterview_blueMsg'));
                ui.show(ui.id('thinkInterview_StaticMsg'));
                if (ufmText) {
                    ufmText.style.color = "#000000";
                }
                // if (configrationManager.userType == '2' && videoHtml) {
                //   videoHtml.style.width = "0";
                // }
                this.isChatOpen = false;
            }
        });
    }
    closeChat() {
        const closeBtn = ui.id('thinkInterview_closeBtn');
        if (!closeBtn)
            return;
        ui.click(closeBtn, () => {
            const popup = ui.id('thinkproc_chat_popup');
            ui.id('think_interview_video_rightdiv');
            const ufmText = ui.id('thinkInterviewMsgText');
            if (popup) {
                ui.hide(popup);
                ui.hide(ui.id('thinkInterview_blueMsg'));
                ui.show(ui.id('thinkInterview_StaticMsg'));
                if (ufmText)
                    ufmText.style.color = "#000000";
            }
            // if (configrationManager.userType == '2' && videoHtml) {
            //   videoHtml.style.width = "0";
            // }
            this.isChatOpen = false; // 👈 sync toggle state
        });
    }
    initChatEvents() {
        const sendBtn = ui.id('thinkinterview_sendChat');
        const inputEl = ui.querySelector('.thinkproc-chat-footer input');
        const chatContainer = ui.id('thinkInterview_chatMsgBody');
        // Send message on button click
        ui.click(sendBtn, () => {
            let message = inputEl.value.trim();
            if (!message)
                return; // ⛔ prevent empty messages
            chatUi.sendInterviewMessage(message, chatContainer, inputEl);
        });
        // Send message on Enter key
        inputEl.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                let message = inputEl.value.trim();
                if (!message)
                    return; // ⛔ prevent empty messages
                chatUi.sendInterviewMessage(message, chatContainer, inputEl);
            }
        });
    }
    showLoaderwithText(id) {
        const loaderHTML = UiComponents.loadingwithtext(ui.translations.ai_label.please_wait);
        stepUIManager.setLoader(loaderHTML, id);
    }
    hideLoaderwithText() {
        const existingLoader = ui.id('thinkX_loadingwithText');
        if (existingLoader && existingLoader.parentNode) {
            existingLoader.parentNode.removeChild(existingLoader);
        }
    }
}
const chatUi = new ChatUi();

class ChatManager {
    eventInitialized = false;
    constructor() { }
    async join() {
        if (!this.eventInitialized) {
            socket.createRoom();
            sdkEvents.on(SDK_EVENT.CHAT_MESSAGE, (user, message) => {
                chatUi.messageRecived(user, message);
                utility.log(`Chat message from ${user}:`, message);
            });
            sdkEvents.on(SDK_EVENT.AUDIO_STREAM, (user, stream) => {
                chatUi.audioTrackAdded(stream, user);
                utility.log(`Chat audio started ${user}:`, stream);
            });
            sdkEvents.on(SDK_EVENT.SECONDARY_CAM_UFM, (data) => {
                this.sendData("secondary_ufm", data);
            });
            this.eventInitialized = true;
            // chatUi.initChatEvents();
        }
        else {
            socket.joinRoom();
        }
        utility.log('ChatManager initialized');
    }
    leaveChat() {
        socket.leaveRoom();
        utility.log('Left chat room');
    }
    sendText(message) {
        const chatMessage = {
            mode: 'text',
            text: message,
            data: {},
        };
        socket.sendRoomMessage(chatMessage);
        utility.log(`Sent message: ${message}`);
    }
    sendData(mode, data) {
        const chatMessage = {
            mode: mode,
            text: '',
            data: data,
        };
        socket.sendRoomMessage(chatMessage);
        utility.log(`Sent message with mode ${mode}:`, data);
    }
}
const chat = new ChatManager();

class UfmManager {
    captureTime;
    constructor() {
        this.captureTime = 0;
    }
    id = {
        MFD: 0,
        FNP: 0,
        FM: 0,
        OD: 0,
        VD: 0,
        SFL: 0,
        PR: 0,
        LA: 0
    };
    objectId = {
        tv_moniotr: 0,
        laptop: 0,
        cell_phone: 0,
        book: 0,
        headphone: 0,
        ring: 0,
        watch: 0,
        chair: 0,
    };
    track = {
        MFD: new Date(),
        FNP: new Date(),
        FM: new Date(),
        VD: new Date(),
        SFL: new Date(),
        PR: new Date(),
        LA: new Date(),
        tv_moniotr: new Date(),
        chair: new Date(),
        laptop: new Date(),
        cell_phone: new Date(),
        headphone: new Date(),
        book: new Date(),
        ring: new Date(),
        watch: new Date(),
    };
    assignNewProctorTimer = null;
    proctorAssignTimeout = null;
    // syncObjectIdsFromConfig() {
    //     const allSubTypes = configrationManager.getAllSubTypes();
    //     for (const item of allSubTypes) {
    //     const normalizedName = item.name.replace(/[-\s]/g, '_');
    //     if (Object.prototype.hasOwnProperty.call(this.objectId, normalizedName)) {
    //         this.objectId[normalizedName] = item.id;
    //     }
    //     }
    // }
    UfmSubTypes(ufm_sub_type) {
        if (!Array.isArray(ufm_sub_type))
            return;
        for (const item of ufm_sub_type) {
            if (item && typeof item === 'object' && 'id' in item && 'name' in item) {
                const normalizedName = item.name.replace(/[-\s]/g, '_'); // replaces '-' and space with '_'
                if (ufmM.objectId.hasOwnProperty(normalizedName)) {
                    ufmM.objectId[normalizedName] = item.id;
                }
            }
        }
    }
    setCaptureTime(time) {
        this.captureTime = time;
    }
    async checkSessionStatus() {
        request.checkSessionStatus().then((response) => {
            utility.log('✅ Session status checked successfully', response);
            const { remaining_time } = response.data;
            if (response.code === 2312) ;
            if (response.data.proctor_found && response.data.proctor_user_name) {
                socket.setProctor(response.data.proctor_user_name);
                if (remaining_time > 0 && remaining_time <= 60) {
                    chat.sendData('candidate_going_timer', remaining_time);
                }
                else if (remaining_time > 60) {
                    let nextRemindTime = remaining_time - 60;
                    if (this.assignNewProctorTimer !== null) {
                        clearInterval(this.assignNewProctorTimer);
                    }
                    this.assignNewProctorTimer = setInterval(() => {
                        if (nextRemindTime > 0) {
                            nextRemindTime -= 1;
                        }
                        else {
                            if (this.assignNewProctorTimer !== null) {
                                clearInterval(this.assignNewProctorTimer);
                            }
                            chat.sendData('candidate_going_timer', 60);
                        }
                    }, 1000);
                }
                if (remaining_time != -1) {
                    if (remaining_time > 0) {
                        console.log("Remaining Time", remaining_time);
                        this.checkStatusTimeout(remaining_time);
                    }
                    else {
                        this.checkStatusTimeout(20);
                    }
                }
                else {
                    if (this.proctorAssignTimeout != null) {
                        clearTimeout(this.proctorAssignTimeout);
                    }
                }
            }
            if (response.code === 2901) {
                this.checkStatusTimeout(20);
            }
        })
            .catch((error) => {
            utility.log('❌ Failed to check session status', error);
        });
    }
    checkStatusTimeout(time) {
        if (this.proctorAssignTimeout != null) {
            clearTimeout(this.proctorAssignTimeout);
        }
        this.proctorAssignTimeout = setTimeout(() => {
            this.checkSessionStatus();
        }, time * 1000);
    }
    stopStatusCheck() {
        if (this.proctorAssignTimeout != null) {
            clearTimeout(this.proctorAssignTimeout);
        }
    }
}
const ufmM = new UfmManager();

class Ufm {
    mfd = [];
    od = [];
    odLabels = [
        'chair',
        'tv-monitor',
        'laptop',
        'cell phone',
        'book',
        'headphone',
        'earphone- neck_band',
        'earphone- true_wireless',
        'earphone- wired',
        'ring',
        'watch',
    ];
    ALL_UFM = ['MFD', 'FM', 'FNP', 'OD', 'VD', 'SFL', 'PR', 'LA'];
    INFORMATIVE_UFM_CODE = [258, 260, 261, 266, 261, 262, 263];
    MFD = false;
    FNP = false;
    FM = false;
    OD = false;
    VD = false;
    SFL = false;
    PR = false;
    LA = false;
    PHONE = 0;
    CHAIR = 0;
    log(data, elias, attempt_no, camera = '', imageBlob, status_code) {
        if (Array.isArray(data)) {
            const detections = data;
            const personCount = detections.filter((item) => item === 'person').length;
            const otherCount = detections.filter((item) => item === 'other_person').length;
            const lookingAway = detections.filter((item) => item === 'looking_away').length;
            const statusCode = status_code;
            const ufmLogEntry = {
                Detection: detections, // from data
                code: Array.isArray(statusCode) ? statusCode : [statusCode] // ensure always an array
            };
            //check INFORMATIVE UFM CODE 
            if (statusCode != undefined && statusCode != null && statusCode != '') {
                this.checkCodeIsInformative(Array.isArray(statusCode) ? statusCode : [statusCode], data);
            }
            // For Multi Face detect  - MFD
            if (this.MFD && personCount > 1) {
                ai.getUFMCode("MFD", statusCode).then((code) => {
                    this.getUfmApiCall('MFD', elias, attempt_no, camera, '', imageBlob, data, code, ufmLogEntry);
                });
            }
            // For No Face detect  - FNP
            if (this.FNP && personCount == 0) {
                ai.getUFMCode("FNP", statusCode).then((code) => {
                    this.getUfmApiCall('FNP', elias, attempt_no, camera, '', imageBlob, data, code, ufmLogEntry);
                });
            }
            if (this.FM && personCount == 1 && otherCount > 0) {
                ai.getUFMCode("FM", statusCode).then((code) => {
                    this.getUfmApiCall('FM', elias, attempt_no, camera, '', imageBlob, data, code, ufmLogEntry);
                });
            }
            if (this.LA && lookingAway > 0) {
                ai.getUFMCode("LA", statusCode).then((code) => {
                    this.getUfmApiCall('LA', elias, attempt_no, camera, '', imageBlob, data, code, ufmLogEntry);
                });
            }
            const hasODLabel = detections.some((item) => this.odLabels.includes(item));
            if (this.OD && hasODLabel) {
                const chair = detections.filter((item) => item === 'chair').length;
                const headphone = detections.filter((item) => item === 'headphone').length;
                const laptop = detections.filter((item) => item === 'laptop').length;
                const phone = detections.filter((item) => item === 'cell phone').length;
                const book = detections.filter((item) => item === 'book').length;
                const ring = detections.filter((item) => item === 'ring').length;
                const watch = detections.filter((item) => item === 'watch').length;
                const tv = detections.filter((item) => item === 'tv-monitor').length;
                if (chair > this.CHAIR) {
                    ai.getUFMCode("OD", statusCode).then((code) => {
                        this.getUfmApiCall('OD', elias, attempt_no, camera, 'chair', imageBlob, data, code, ufmLogEntry);
                    });
                    return;
                }
                if (headphone > 0 && this.VD) {
                    ai.getUFMCode("OD", statusCode).then((code) => {
                        this.getUfmApiCall('OD', elias, attempt_no, camera, 'headphone', imageBlob, data, code, ufmLogEntry);
                    });
                    return;
                }
                if (laptop + tv > 1) {
                    if (laptop > 1) {
                        ai.getUFMCode("OD", statusCode).then((code) => {
                            this.getUfmApiCall('OD', elias, attempt_no, camera, 'laptop', imageBlob, data, code, ufmLogEntry);
                        });
                        return;
                    }
                    if (tv > 1) {
                        ai.getUFMCode("OD", statusCode).then((code) => {
                            this.getUfmApiCall('OD', elias, attempt_no, camera, 'tv_monitor', imageBlob, data, code, ufmLogEntry);
                        });
                        return;
                    }
                    if (tv == 1 && laptop == 1) {
                        ai.getUFMCode("OD", statusCode).then((code) => {
                            this.getUfmApiCall('OD', elias, attempt_no, camera, 'tv_monitor', imageBlob, data, code, ufmLogEntry);
                        });
                        return;
                    }
                }
                if (phone > this.PHONE) {
                    ai.getUFMCode("OD", statusCode).then((code) => {
                        this.getUfmApiCall('OD', elias, attempt_no, camera, 'cell_phone', imageBlob, data, code, ufmLogEntry);
                    });
                    return;
                }
                if (book > 0) {
                    ai.getUFMCode("OD", statusCode).then((code) => {
                        this.getUfmApiCall('OD', elias, attempt_no, camera, 'book', imageBlob, data, code, ufmLogEntry);
                    });
                    return;
                }
                if (ring > 0) {
                    ai.getUFMCode("OD", statusCode).then((code) => {
                        this.getUfmApiCall('OD', elias, attempt_no, camera, 'ring', imageBlob, data, code, ufmLogEntry);
                    });
                    return;
                }
                if (watch > 0) {
                    ai.getUFMCode("OD", statusCode).then((code) => {
                        this.getUfmApiCall('OD', elias, attempt_no, camera, 'watch', imageBlob, data, code, ufmLogEntry);
                    });
                    return;
                }
                // if (tv > 0) {
                //     this.getUfmApiCall('OD', imageBlob, elias, attempt_no, "", ufmM.objectId.tv);
                // }
            }
        }
        else if (typeof data === 'string') {
            const ufmLogEntry = {
                Detection: data,
                code: Array.isArray(status_code) ? status_code : [status_code]
            };
            if (this.SFL && data == 'SFL') {
                this.getUfmApiCall('SFL', elias, attempt_no, camera, '', imageBlob, data, 276, ufmLogEntry);
                return;
            }
            if (this.VD && data == 'VD') {
                this.getUfmApiCall('VD', elias, attempt_no, camera, '', imageBlob, data, 275, ufmLogEntry);
                return;
            }
            if (this.PR && data == 'PR') {
                // Ensure code is always a number
                const normalizedCode = Array.isArray(status_code) ? status_code[0] : status_code;
                this.getUfmApiCall('PR', elias, attempt_no, camera, '', imageBlob, data, normalizedCode, ufmLogEntry);
                return;
            }
        }
    }
    /**
     *
     *@param ufmType
     *@param imageBlob
     *@param elias
     *@param attempt_no
     */
    async getUfmApiCall(ufmType, elias, attempt_no, cameraAngle, ufm_subtype = '', imageBlob, data, code, ufmLogEntry) {
        let objectId = 0;
        if (ufmM.objectId.hasOwnProperty(ufm_subtype)) {
            objectId = ufmM.objectId[ufm_subtype];
            let time = ufmM.track[ufm_subtype];
            let newtime = new Date();
            const diffInSeconds = (newtime.getTime() - new Date(time).getTime()) / 1000;
            if (diffInSeconds > ufmM.captureTime) {
                ufmM.track[ufm_subtype] = newtime;
            }
            else {
                return;
            }
        }
        if (ufmM.track.hasOwnProperty(ufmType)) {
            let time = ufmM.track[ufmType];
            let newtime = new Date();
            const diffInSeconds = (newtime.getTime() - new Date(time).getTime()) / 1000;
            if (diffInSeconds > ufmM.captureTime) {
                ufmM.track[ufmType] = new Date();
            }
            else {
                return;
            }
        }
        const ufmLogEntryToSend = ufmLogEntry || []; // default empty array
        const response = await this.sendUfmData(ufmType, elias, attempt_no, cameraAngle, objectId, code, imageBlob, data, ufmLogEntryToSend);
        configrationManager.currentStepObject;
        if (configrationManager.currentStepAlias === 'Exam_Session') {
            if (response.code === 2105) {
                sdkEvents.trigger(SDK_EVENT.UFM_SUSPEND, response);
            }
            if (response.code === 2106) {
                sdkEvents.trigger(SDK_EVENT.UFM_TERMINATE, response);
            }
            if (response.code === 2107) {
                sdkEvents.trigger(SDK_EVENT.USER_ESCALTED, response);
            }
            if (response.code === 2000) {
                configrationManager.userEscaltedPara = 1;
            }
            if (response.data.cs_score != "") {
                let msg = { mode: 'credibility_update', text: response.data.cs_score };
                socket.sendRoomMessage(msg);
            }
            if (response.data && !Array.isArray(response.data) &&
                response.data.status && response.data.status !== "") {
                const res = response.data;
                ai.getSmartProctorUFM({
                    status: res.status,
                    ufm_type: res.ufm_type,
                    ufm_code: res.ufm_code, // use from API response if available
                    cs_score: res.cs_score,
                    suspension_score: res.suspension_score,
                    termination_score: res.termination_score,
                    deduction_point: res.score_deduct,
                    object_array: data,
                    ufm_subtype: [ufm_subtype]
                });
            }
        }
    }
    async sendUfmData(ufmType, env, attempt_no, camAngle, ufm_subtype, code = 0, imageBlob, data, ufmLogEntry // <-- allow object/array
    ) {
        return await request.ufmLog({
            ufm_type: ufmType,
            environment: env,
            attempt_no: attempt_no,
            cameraAngle: camAngle,
            ufm_subtype: ufm_subtype,
            code: code,
            ufm_data: data,
            ufmLogEntry: ufmLogEntry ? JSON.stringify(ufmLogEntry) : JSON.stringify([]),
        }, imageBlob);
    }
    regularUfmData(env, camAngle, imageBlob) {
        request
            .regualarUfmLog({
            environment: env,
            cameraAngle: camAngle,
        }, imageBlob)
            .then((response) => {
            utility.log('✅ ufm uploaded success', response);
        })
            .catch((error) => {
            utility.log('❌ ufm uploaded failed', error);
        });
    }
    endTest(env) {
        request
            .endExam({ environment: env })
            .then((response) => {
            utility.log('✅ Exam ended successfully', response);
        })
            .catch((error) => {
            utility.log('❌ Failed to end exam', error);
        });
    }
    async checkSessionStatus(env) {
        return await request.checkSessionStatus();
    }
    resetFlagsAndCounters() {
        this.MFD = true;
        this.FNP = true;
        this.FM = true;
        this.OD = true;
        this.VD = true;
        this.SFL = true;
        this.PR = true;
        this.PHONE = 0;
        this.CHAIR = 0;
    }
    checkCodeIsInformative(statusCodes, data) {
        if (configrationManager.smartProctorEnable === 1 && configrationManager.previous_instance_escalated === false) {
            // loop through all matches
            statusCodes.forEach(code => {
                if (this.INFORMATIVE_UFM_CODE.includes(code)) {
                    ai.getSmartProctorUFM({
                        status: "notification",
                        ufm_code: code,
                        cs_score: 0,
                        suspension_score: 0,
                        termination_score: 0,
                        deduction_point: 0,
                        object_array: [],
                    });
                }
            });
        }
    }
}

class RegularSnap {
    regularSnapTimeout;
    ufm;
    imageTypeSnap = 10;
    snapshotCanvas;
    snapshotCtx;
    constructor() {
        this.ufm = new Ufm();
        this.regularSnapTimeout = {};
        this.snapshotCanvas = document.createElement('canvas');
        this.snapshotCanvas.width = 768;
        this.snapshotCanvas.height = 576;
        const ctx = this.snapshotCanvas.getContext('2d');
        if (!ctx) {
            throw new Error('Unable to get canvas context');
        }
        this.snapshotCtx = ctx;
    }
    takeSnapImage(camera) {
        if (!camera.stream) {
            return;
        }
        const cameraName = camera.name;
        const videoElement = this.getVideoFromStream(camera.stream);
        if (!videoElement) {
            utility.error(`No video element available for camera: ${camera.name}`);
            return;
        }
        // Delay the snapshot and DB insert by imageTypeSnap seconds
        if (this.regularSnapTimeout[cameraName]) {
            clearTimeout(this.regularSnapTimeout[cameraName]);
        }
        this.regularSnapTimeout[cameraName] = setInterval(() => {
            utility.log(`📸 Snapshot triggered for ${cameraName}`);
            const snapshot = this.takeSnapshots(videoElement, false, false);
            const blob = utility.base64ToBlob(snapshot);
            this.ufm.regularUfmData(configrationManager.currentStepAlias, cameraName, blob);
        }, this.imageTypeSnap * 1000);
    }
    takeSnapshots(video, saveActivity, takeReturn) {
        this.snapshotCtx.drawImage(video, 0, 0, this.snapshotCanvas.width, this.snapshotCanvas.height);
        const dataURI = this.snapshotCanvas.toDataURL('image/jpeg', 0.8);
        return dataURI;
    }
    getVideoFromStream(stream) {
        const video = document.createElement('video');
        video.srcObject = stream;
        video.muted = true;
        video.playsInline = true;
        video.width = 640;
        video.height = 480;
        video.play().catch(() => { });
        return video;
    }
    stopRegularSnapForCamera(cameraName) {
        if (this.regularSnapTimeout?.[cameraName]) {
            clearInterval(this.regularSnapTimeout[cameraName]);
            delete this.regularSnapTimeout[cameraName];
        }
    }
}
const regularSnap = new RegularSnap();

class AdditionCamManager {
    streamMap;
    userLeftSubscribed = false;
    constructor() {
        this.streamMap = {}; // Initialize the map
    }
    registerStream(user, stream) {
        if (!this.streamMap[user]) {
            this.streamMap[user] = [];
        }
        // Optional: check if this stream is already added to avoid duplicates
        const alreadyExists = this.streamMap[user].some((entry) => entry.streams === stream);
        if (!alreadyExists) {
            this.streamMap[user].push({ streams: stream, user: user });
            const type = this.getStreamType(stream);
            if (type == "video") {
                sdkEvents.trigger(SDK_EVENT.SECOND_STREAM, user, stream);
            }
            else {
                sdkEvents.trigger(SDK_EVENT.AUDIO_STREAM, user, stream);
            }
        }
        utility.log('Updated streamMap:', this.streamMap);
        if (!this.userLeftSubscribed) {
            this.userLeftSubscribed = true;
            sdkEvents.on(SDK_EVENT.USER_LEFT, (user_name) => {
                if (user_name in this.streamMap) {
                    this.disConnectStream(user_name);
                }
            });
            sdkEvents.on(SDK_EVENT.USER_RECONNECT, (user_name) => {
                if (user_name in this.streamMap) {
                    sdkEvents.trigger(SDK_EVENT.SECOND_STREAM_RETRY, user_name);
                }
            });
        }
    }
    getStreamType(stream) {
        const hasAudio = stream.getAudioTracks().length > 0;
        const hasVideo = stream.getVideoTracks().length > 0;
        if (hasAudio && hasVideo)
            return "both";
        if (hasAudio)
            return "audio";
        if (hasVideo)
            return "video";
        return "none";
    }
    disConnectStream(user) {
        const userStreams = this.streamMap[user];
        if (userStreams && userStreams.length > 0) {
            for (const entry of userStreams) {
                // Stop all tracks in each MediaStream
                entry.streams.getTracks().forEach((track) => track.stop());
            }
            // Remove the user's entry entirely
            delete this.streamMap[user];
            sdkEvents.trigger(SDK_EVENT.SECOND_STREAM_DISCONNET, user);
            utility.log(`Disconnected all streams for user: ${user}`);
        }
        else {
            utility.log(`No streams found for user: ${user}`);
        }
    }
    getStreamMap(user) {
        if (user) {
            return this.streamMap[user] || [];
        }
        return this.streamMap;
    }
}
const additionalCam = new AdditionCamManager();

/**
 *
 */
class PeerManager {
    options;
    peerConnection = null;
    localStream = null;
    remoteStreams = [];
    iceCandidatesQueue = [];
    restartIceTimeout = null;
    statMonitorInterval = null;
    lastFramesDecoded = -1;
    stuckCount = 0;
    // Callbacks for signaling and media events
    onSignalingMessage = null;
    onTrackAdded = null;
    onConnectionStateChange = null;
    onIceCandidate = null;
    onNegotiationNeeded = null;
    isOfferer = true;
    // Perfect negotiation state
    makingOffer = false;
    ignoreOffer = false;
    /**
     *
     * @param options
     */
    constructor(options = {}, offerer = true) {
        this.options = options;
        this.isOfferer = offerer;
        this.peerConnection = new RTCPeerConnection(this.options);
        this.setupPeerConnectionListeners();
        this.startStatsMonitor();
    }
    /**
     *
     */
    setupPeerConnectionListeners() {
        if (!this.peerConnection)
            return;
        this.peerConnection.ontrack = (event) => {
            utility.log('Remote track added:', event.track);
            const stream = event.streams[0];
            if (!stream)
                return;
            if (!this.remoteStreams.includes(stream)) {
                this.remoteStreams.push(stream);
            }
            if (this.onTrackAdded) {
                this.onTrackAdded(event.track, stream);
            }
        };
        this.peerConnection.onicecandidate = (event) => {
            if (event.candidate) {
                utility.log('Local ICE candidate:', event.candidate);
                if (this.onIceCandidate) {
                    this.onIceCandidate(event.candidate);
                }
            }
        };
        this.peerConnection.onconnectionstatechange = () => {
            if (this.peerConnection) {
                utility.log('Peer connection state:', this.peerConnection.connectionState);
                if (this.onConnectionStateChange) {
                    this.onConnectionStateChange(this.peerConnection.connectionState);
                }
            }
        };
        this.peerConnection.onnegotiationneeded = async () => {
            utility.log('Negotiation needed: creating offer...');
            if (this.onNegotiationNeeded) {
                this.onNegotiationNeeded();
            }
            // try {
            //   await this.createOffer();
            // } catch (error) {
            //   utility.error('Error creating offer:', error);
            // }
        };
    }
    /**
     * Initializes the local media stream (e.g., camera and microphone).
     * @param constraints MediaStreamConstraints for getUserMedia.
     */
    async initLocalStream(constraints = { video: true, audio: true }) {
        try {
            this.localStream = await navigator.mediaDevices.getUserMedia(constraints);
            this.localStream.getTracks().forEach((track) => {
                if (this.peerConnection) {
                    this.peerConnection.addTrack(track, this.localStream);
                }
            });
            utility.log('Local stream initialized and added to peer connection.');
        }
        catch (error) {
            utility.error('Error getting user media:', error);
            throw error;
        }
    }
    /**
     * Initializes the local media stream (e.g., camera and microphone).
     * @param constraints MediaStreamConstraints for getUserMedia.
     * @param camera
     */
    async addCameraStream(camera) {
        utility.log('stream getting....');
        try {
            if (camera.stream == null) {
                return '';
            }
            let trackId = '';
            utility.log('Send Stream', camera.stream);
            camera.stream.getTracks().forEach((track) => {
                if (this.peerConnection && !this.isTrackAlreadyAdded(track)) {
                    utility.log('stream addtrack....');
                    this.peerConnection.addTrack(track, camera.stream);
                }
                if (track.kind == 'video') {
                    trackId = track.id;
                }
            });
            utility.log('Local stream initialized and added to peer connection.');
            return trackId;
        }
        catch (error) {
            utility.error('Error getting user media:', error);
            return '';
        }
    }
    async removeCameraStream(camera) {
        utility.log('removing stream....');
        try {
            if (!camera.stream) {
                return '';
            }
            let trackId = '';
            camera.stream.getTracks().forEach((track) => {
                if (this.peerConnection) {
                    const senders = this.peerConnection.getSenders();
                    const sender = senders.find(s => s.track === track);
                    if (sender) {
                        this.peerConnection.removeTrack(sender);
                        utility.log(`Track removed: ${track.kind}`);
                    }
                }
                if (track.kind === 'video') {
                    trackId = track.id;
                }
                // stop the track so it's no longer active
                track.stop();
            });
            utility.log('Local stream removed from peer connection.');
            return trackId;
        }
        catch (error) {
            utility.error('Error removing user media:', error);
            return '';
        }
    }
    async removeAudioStream(audio) {
        try {
            if (!audio.stream) {
                return '';
            }
            let trackId = '';
            audio.stream.getTracks().forEach((track) => {
                if (this.peerConnection) {
                    const senders = this.peerConnection.getSenders();
                    const sender = senders.find(s => s.track === track);
                    if (sender) {
                        this.peerConnection.removeTrack(sender);
                        utility.log(`Audio track removed: ${track.id}`);
                    }
                }
                if (track.kind === 'audio') {
                    trackId = track.id;
                }
                // stop the track so mic is released
                track.stop();
            });
            utility.log('Audio stream removed from peer connection.');
            return trackId;
        }
        catch (error) {
            utility.error('Error removing audio stream:', error);
            return '';
        }
    }
    /**
     * Initializes the local media stream (e.g., camera and microphone).
     * @param constraints MediaStreamConstraints for getUserMedia.
     * @param audio
     */
    async addAudioStream(audio) {
        try {
            if (audio.stream == null) {
                return '';
            }
            let trackId = '';
            audio.stream.getTracks().forEach((track) => {
                if (this.peerConnection && !this.isTrackAlreadyAdded(track)) {
                    console.log('audio stream addtrack....');
                    this.peerConnection.addTrack(track, audio.stream);
                }
                if (track.kind == 'audio') {
                    trackId = track.id;
                }
            });
            utility.log('Local stream initialized and added to peer connection.');
            return trackId;
        }
        catch (error) {
            utility.error('Error getting user media:', error);
            return '';
        }
    }
    isTrackAlreadyAdded(trackToCheck) {
        if (!this.peerConnection || !trackToCheck) {
            console.warn('Invalid peerConnection or trackToCheck provided.');
            return false;
        }
        // Get all senders currently associated with the peer connection
        const senders = this.peerConnection.getSenders();
        console.log('Current senders:', senders);
        // Iterate through the senders and check if any sender's track matches trackToCheck
        for (const sender of senders) {
            if (sender.track === trackToCheck) {
                return true; // Found a sender with the same track
            }
        }
        return false; // No sender found with the specified track
    }
    /**
     * Creates and sends an offer (for the initiating peer).
     */
    async createOffer() {
        if (!this.peerConnection || this.makingOffer)
            return null;
        try {
            this.makingOffer = true;
            const offer = await this.peerConnection.createOffer({
                offerToReceiveAudio: true,
                offerToReceiveVideo: true,
            });
            if (this.peerConnection.signalingState !== 'closed') {
                await this.peerConnection.setLocalDescription(offer);
            }
            return offer;
        }
        catch (error) {
            utility.error('Error creating or setting offer:', error);
            return null;
        }
        finally {
            this.makingOffer = false;
        }
    }
    /**
     * Handles an incoming signaling message (offer, answer, or ICE candidate).
     * @param message The signaling message.
     * @param polite Boolean indicating if this peer is the polite peer (resolves glare).
     */
    async handleSignalingMessage(message, polite = false) {
        if (!this.peerConnection) {
            utility.error('Peer connection not initialized. Cannot handle signaling message.');
            return;
        }
        try {
            if (message.type === 'offer' || message.type === 'answer') {
                const offerCollision = (message.type === 'offer' &&
                    (this.makingOffer || this.peerConnection.signalingState !== 'stable'));
                this.ignoreOffer = !polite && offerCollision;
                if (this.ignoreOffer) {
                    utility.log('Glare detected. Impolite peer ignoring offer.');
                    return;
                }
                if (message.sdp) {
                    if (offerCollision) {
                        utility.log('Glare detected. Polite peer rolling back to accept incoming offer.');
                        await Promise.all([
                            this.peerConnection.setLocalDescription({ type: 'rollback' }),
                            this.peerConnection.setRemoteDescription(new RTCSessionDescription(message.sdp))
                        ]);
                    }
                    else {
                        if (message.type === 'offer') {
                            utility.log('Received offer:', message.sdp);
                        }
                        else {
                            utility.log('Received answer:', message.sdp);
                        }
                        await this.peerConnection.setRemoteDescription(new RTCSessionDescription(message.sdp));
                    }
                    if (message.type === 'answer') {
                        while (this.iceCandidatesQueue.length > 0) {
                            const candidate = this.iceCandidatesQueue.shift();
                            if (candidate) {
                                await this.peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
                            }
                        }
                    }
                }
            }
            else if (message.type === 'candidate') {
                if (message.candidate) {
                    utility.log('Received ICE candidate:', message.candidate);
                    try {
                        if (this.peerConnection.remoteDescription) {
                            await this.peerConnection.addIceCandidate(new RTCIceCandidate(message.candidate));
                        }
                        else {
                            this.iceCandidatesQueue.push(message.candidate);
                        }
                    }
                    catch (e) {
                        if (!this.ignoreOffer) {
                            utility.error('Error adding received ICE candidate:', e);
                        }
                        // If ignoreOffer is true, we expect candidates to fail until we recover
                    }
                }
            }
        }
        catch (err) {
            utility.error('Error handling signaling message:', err);
        }
    }
    /**
     * Creates and sends an answer (for the answering peer).
     */
    async createAnswer() {
        if (!this.peerConnection)
            return null;
        try {
            const answer = await this.peerConnection.createAnswer();
            await this.peerConnection.setLocalDescription(answer);
            return answer;
        }
        catch (error) {
            utility.error('Error creating or setting answer:', error);
            return null;
        }
    }
    /**
     * Closes the peer connection and cleans up resources.
     */
    close() {
        this.stopStatsMonitor();
        if (this.restartIceTimeout) {
            clearTimeout(this.restartIceTimeout);
            this.restartIceTimeout = null;
        }
        if (this.localStream) {
            this.localStream.getTracks().forEach((track) => track.stop());
            this.localStream = null;
        }
        if (this.peerConnection) {
            this.peerConnection.close();
            this.peerConnection = null;
            utility.log('Peer connection closed.');
        }
        this.remoteStreams = [];
    }
    /**
     * Get the local media stream.
     */
    getLocalStream() {
        return this.localStream;
    }
    /**
     * Get the remote media streams.
     */
    getRemoteStreams() {
        return this.remoteStreams;
    }
    /**
     * Get the current peer connection state.
     */
    getConnectionState() {
        return this.peerConnection ? this.peerConnection.connectionState : null;
    }
    restartIce() {
        if (this.peerConnection) {
            this.peerConnection.restartIce();
            utility.log('ICE restart triggered.');
        }
    }
    /**
     * Starts an interval that periodically checks `getStats()` to detect stuck video streams
     * (e.g. from system sleep). It ensures auto-recovery via bidirectional ICE restart.
     */
    startStatsMonitor() {
        if (this.statMonitorInterval)
            return;
        // Check every 3 seconds as requested
        this.statMonitorInterval = setInterval(async () => {
            if (!this.peerConnection || this.peerConnection.connectionState !== 'connected') {
                return;
            }
            try {
                const stats = await this.peerConnection.getStats();
                stats.forEach((report) => {
                    // Monitor incoming video frames
                    if (report.type === 'inbound-rtp' && report.kind === 'video') {
                        const framesDecoded = report.framesDecoded ?? -1;
                        // lastFramesDecoded starts at -1; skip the first reading so we have a baseline
                        if (this.lastFramesDecoded !== -1) {
                            if (framesDecoded === this.lastFramesDecoded) {
                                this.stuckCount++;
                                utility.log(`No frames received \u2192 stream stuck. Count: ${this.stuckCount}`);
                                // 2 consecutive stuck checks (~6 s) \u2192 trigger recovery
                                if (this.stuckCount >= 2) {
                                    utility.log('Stream recovery triggered (restartIce) due to stuck video frames.');
                                    this.restartIce();
                                    this.stuckCount = 0;
                                }
                            }
                            else {
                                this.stuckCount = 0; // Flowing normally
                            }
                        }
                        this.lastFramesDecoded = framesDecoded;
                    }
                });
            }
            catch (error) {
                utility.error('Error fetching stream stats during monitoring:', error);
            }
        }, 3000);
    }
    /**
     * Cleans up the stats monitoring interval.
     */
    stopStatsMonitor() {
        if (this.statMonitorInterval) {
            clearInterval(this.statMonitorInterval);
            this.statMonitorInterval = null;
        }
    }
}

/**
 *
 */
class PeerConnectionManager {
    peerConf = null;
    event = {
        PEER_CONNECION_CLOSE: 'peer_connection_close',
        PEER_OFFER: 'peer_offer',
        PEER_ANSWER: 'peer_answer',
        PEER_ICECANDIDATE: 'peer_icecandidate',
    };
    peerList = {};
    peerIceBeforeAnswerArray = {};
    /**
     *
     */
    Init() {
        this.peerConf = {
            iceServers: [
                {
                    urls: configrationManager.stun_url,
                    // username:configrationManager.stun_username,
                    // credential:configrationManager.stun_password
                },
                {
                    urls: configrationManager.turn_url,
                    username: configrationManager.turn_username,
                    credential: configrationManager.turn_password,
                },
            ],
        };
        utility.log('PeerConnectionManager initialized with config:', this.peerConf);
        this.InitListner();
    }
    /**
     *
     * @param from
     */
    hasConnection(from) {
        return from in this.peerList;
    }
    /**
     *
     */
    InitListner() {
        socket.on(this.event.PEER_CONNECION_CLOSE, (payload) => {
            if (!this.hasConnection(payload.from)) {
                return;
            }
            const peer = this.peerList[payload.from];
            peer.close();
            delete this.peerList[payload.from];
        });
        utility.log('closing peer connection line 73');
        let self = this;
        sdkEvents.on(SDK_EVENT.USER_LEFT, (user_name) => {
            utility.log('closing peer connection111');
            if (user_name in self.peerList) {
                utility.log('closing peer connection');
                self.close(user_name);
            }
        });
        socket.on(this.event.PEER_OFFER, async (payload) => {
            let peer;
            const polite = configrationManager.socketUserName.localeCompare(payload.from) > 0;
            if (!this.hasConnection(payload.from)) {
                if (!this.peerConf) {
                    return;
                }
                peer = this.getPeer(payload.from, false);
                if (!peer) {
                    return;
                }
                this.peerList[payload.from] = peer;
            }
            else {
                peer = this.peerList[payload.from];
            }
            await peer.handleSignalingMessage({ type: 'offer', sdp: payload.data.offer }, polite);
            if (!peer.ignoreOffer) {
                const answer = await peer.createAnswer();
                if (answer != null) {
                    const payloadAnswer = { answer: answer };
                    socket.emit(this.event.PEER_ANSWER, payloadAnswer, payload.from);
                }
            }
            for (const candidate of this.peerIceBeforeAnswerArray[payload.from] || []) {
                await peer.handleSignalingMessage({ type: 'candidate', candidate: candidate }, polite);
            }
            this.peerIceBeforeAnswerArray[payload.from] = [];
            // proctor
            // admin
            // superprocor
            // mobile device - room san
            // mobile device - secondary cam setup
        });
        socket.on(this.event.PEER_ANSWER, async (payload) => {
            if (!this.hasConnection(payload.from)) {
                return;
            }
            const peer = this.peerList[payload.from];
            const polite = configrationManager.socketUserName.localeCompare(payload.from) > 0;
            await peer.handleSignalingMessage({ type: 'answer', sdp: payload.data.answer }, polite);
            // proctor
            // admin
            // superprocor
            // mobile device - room san
            // mobile device - secondary cam setup
        });
        socket.on(this.event.PEER_ICECANDIDATE, async (payload) => {
            if (!this.hasConnection(payload.from)) {
                this.peerIceBeforeAnswerArray[payload.from] = this.peerIceBeforeAnswerArray[payload.from] || [];
                this.peerIceBeforeAnswerArray[payload.from].push(payload.data.candidate);
                return;
            }
            const peer = this.peerList[payload.from];
            const polite = configrationManager.socketUserName.localeCompare(payload.from) > 0;
            for (const candidate of this.peerIceBeforeAnswerArray[payload.from] || []) {
                await peer.handleSignalingMessage({ type: 'candidate', candidate: candidate }, polite);
            }
            this.peerIceBeforeAnswerArray[payload.from] = [];
            await peer.handleSignalingMessage({ type: 'candidate', candidate: payload.data.candidate }, polite);
        });
    }
    /**
     *
     * @param to
     */
    async connect(to, ...streams) {
        if (this.peerList[to]) {
            await this.streamAdd(to, ...streams);
            return;
        }
        const peer = this.getPeer(to, true);
        if (!peer) {
            return;
        }
        this.peerList[to] = peer;
        if (streams && streams.length > 0) {
            await this.streamAdd(to, ...streams);
            // onnegotiationneeded fires after addTrack and drives the offer — no explicit createOffer needed
        }
        else {
            // No tracks added so onnegotiationneeded will not fire; send a receive-only offer manually
            this.createOffer(peer, to);
        }
    }
    /**
     *
     * @param to
     */
    getPeer(to, offer) {
        if (!this.peerConf) {
            return null;
        }
        const peer = new PeerManager(this.peerConf, offer);
        const self = this;
        peer.onIceCandidate = function (candidate) {
            const payload = { candidate: candidate.toJSON() };
            // let payload = JSON.stringify(candidate.candidate);
            socket.emit(self.event.PEER_ICECANDIDATE, payload, to);
        };
        peer.onTrackAdded = function (track, stream) {
            additionalCam.registerStream(to, stream);
            //utility.log(track, stream);
        };
        peer.onNegotiationNeeded = function () {
            utility.log('Negotiation needed for peer:', to);
            self.createOffer(peer, to);
        };
        peer.onConnectionStateChange = function (state) {
            utility.log(`Peer connection state with ${to}: ${state}`);
            if (state === 'failed') {
                if (peer.isOfferer) {
                    // Offerer restarts immediately — it owns the ICE restart offer
                    peer.restartIce();
                }
                else {
                    // Answerer waits 10 s for the offerer's restart to arrive.
                    // If still failed after that, force a restart from this side as a fallback.
                    if (!peer.restartIceTimeout) {
                        peer.restartIceTimeout = setTimeout(() => {
                            peer.restartIceTimeout = null;
                            if (peer.getConnectionState() === 'failed') {
                                utility.log(`Answerer fallback ICE restart triggered for ${to}`);
                                peer.restartIce();
                            }
                        }, 10000);
                    }
                }
            }
            else if (state === 'closed') {
                // Both offerer and answerer must clean up their peer entry
                self.close(to);
                if (peer.restartIceTimeout) {
                    clearTimeout(peer.restartIceTimeout);
                    peer.restartIceTimeout = null;
                }
            }
            else if (state === 'connected') {
                if (peer.restartIceTimeout) {
                    clearTimeout(peer.restartIceTimeout);
                    peer.restartIceTimeout = null;
                }
            }
        };
        return peer;
    }
    /**
     *
     * @param to
     * @param {...any} streams
     */
    async streamAdd(to, ...streams) {
        if (!this.hasConnection(to)) {
            utility.log('Not in connection', to);
            return;
        }
        const peer = this.peerList[to];
        utility.log('stream sending....');
        for (const i in streams) {
            const stream = streams[i];
            if ('videoDeviceIN' in stream) {
                await peer.addCameraStream(stream);
            }
            else {
                await peer.addAudioStream(stream);
            }
        }
        //this.createOffer(peer, to);
    }
    /**
     *
     * @param to
     * @param {...any} streams
     */
    async streamAddAll(...streams) {
        for (var to in this.peerList) {
            if (!to.includes(configrationManager.interviewCandidateSocketName)) {
                this.streamAdd(to, ...streams);
            }
        }
    }
    /**
     *
     * @param to
     * @param {...any} streams
     */
    async removeAdd(to, ...streams) {
        if (!this.hasConnection(to)) {
            utility.log('Not in connection', to);
            return;
        }
        const peer = this.peerList[to];
        utility.log('stream sending....');
        for (const i in streams) {
            const stream = streams[i];
            if ('videoDeviceIN' in stream) {
                await peer.removeCameraStream(stream);
            }
            else {
                await peer.removeAudioStream(stream);
            }
        }
        //this.createOffer(peer, to);
    }
    /**
     *
     * @param peer
     * @param to
     */
    async createOffer(peer, to) {
        const offer = await peer.createOffer();
        if (offer != null) {
            const payload = { offer: offer };
            socket.emit(this.event.PEER_OFFER, payload, to);
        }
    }
    /**
     *
     * @param to
     */
    close(to) {
        const payload = {};
        socket.emit(this.event.PEER_CONNECION_CLOSE, payload, to);
        if (!this.hasConnection(to)) {
            return;
        }
        const peer = this.peerList[to];
        peer.close();
        delete this.peerList[to];
    }
    closeAll() {
        for (const key in this.peerList) {
            this.close(key);
        }
        this.peerList = {};
    }
}
const peer = new PeerConnectionManager();

/**
 *
 */
class StepInterface {
    resultData;
    completeCallback;
    errorCallback;
    static stepManager;
    eventList = new Map();
    /**
     *
     */
    /**
     *
     */
    constructor() {
        this.resultData = { status: true, info: {}, error: [] };
        this.completeCallback = () => { };
        this.errorCallback = () => { };
        // this.eventList = {};
    }
    /**
     *
     * @param delay
     * @param allowNext
     */
    end(delay = 2000, allowNext = false, log = true) {
        this.completeCallback(delay, allowNext, log);
    }
    /**
     *
     * @param fn
     */
    /**
     *
     * @param fn
     */
    onComplete(fn) {
        this.completeCallback = fn;
    }
    /**
     *
     * @param fn
     */
    onError(fn) {
        this.errorCallback = fn;
    }
    /**
     *
     * @param fn
     */
    error() {
        this.errorCallback();
        this.errorCallback = () => { };
    }
    /**
     *
     */
    cameraRevokeRetry() { }
    /**
     *
     */
    micRevokeRetry() { }
    /**
     *
     */
    cameraRevoke() { }
    /**
     *
     */
    micRevoke() { }
    /**
     *
     */
    secondaryCameraRevoke() { }
    /**
     *
     */
    seccondaryCameraRevokeRetry() { }
    /**
     *
     */
    screenRevoke() { }
    /**
     *
     */
    screenRevokeRetry() { }
    /**
     *
     */
    closeApplication() { }
    /**
     *
     * @param manager
     */
    setManager(manager) {
        StepInterface.stepManager = manager;
    }
    /**
     *
     */
    manager() {
        return StepInterface.stepManager;
    }
    subscribe(eventName, fn) {
        if (this.eventList.has(eventName)) {
            let oldfn = this.eventList.get(eventName);
            if (oldfn) {
                sdkEvents.off(eventName, oldfn);
            }
        }
        this.eventList.set(eventName, fn);
        sdkEvents.on(eventName, fn);
    }
    unSubscribe(eventName) {
        if (eventName) {
            // Case 1: Unsubscribe from a specific event
            // Get the callbacks. This might be undefined.
            const callbacksToUnsubscribe = this.eventList.get(eventName);
            // Type Narrowing: Check if callbacksToUnsubscribe is defined
            if (callbacksToUnsubscribe) {
                // callbacksToUnsubscribe is a single function, not an array
                sdkEvents.off(eventName, callbacksToUnsubscribe);
                // Remove the event from this class's local list
                this.eventList.delete(eventName);
                utility.log(`Unsubscribed handler for '${eventName}' from this class.`);
            }
            else {
                utility.log(`No handlers found for '${eventName}' to unsubscribe from this class.`);
            }
        }
        else {
            // Case 2: Unsubscribe from all events this class has subscribed to
            utility.log('Unsubscribing all handlers from this class for all events.');
            this.eventList.forEach((callback, key) => {
                // 'callbacks' here is Array<SdkEventCallbacks[keyof SdkEventCallbacks]>
                // Cast 'callback' to the type expected by sdkEvents.off for 'key'.
                // The 'key' inside forEach is correctly inferred by TypeScript.
                sdkEvents.off(key, callback);
            });
            // Clear all entries from this class's local list
            this.eventList.clear();
        }
    }
}

/**
 *
 */
class TextToSpeech {
    // private synth: SpeechSynthesis;
    synth;
    voices = [];
    isVoiceLoaded = false; // private inputForm: HTMLFormElement;
    commonAudio = null; // Common audio element for playback
    // private inputTxt: HTMLInputElement;
    // private voiceSelect: HTMLSelectElement;
    /**
     *
     */
    constructor() {
        this.synth = window.speechSynthesis;
        if (window.speechSynthesis) {
            // Load voices when available
            this.synth.onvoiceschanged = () => {
                this.voices = this.synth.getVoices();
                this.isVoiceLoaded = true;
            };
            // Preload voices if available immediately
            this.voices = this.synth.getVoices();
            if (this.voices.length > 0) {
                this.isVoiceLoaded = true;
            }
        }
    }
    /**
     *
     * @param text
     * @param languageName
     * @param onend
     */
    speak(text, languageName = 'english', onend = () => { }) {
        if (!this.isVoiceLoaded) {
            utility.warn('Voices not loaded yet. Trying again...');
            setTimeout(() => this.speak(text, languageName), 100);
            return;
        }
        const langCode = configrationManager.language;
        const voice = this.voices.find((v) => v.lang.toLowerCase().startsWith(langCode));
        if (!voice) {
            utility.warn(`No voice found for language: ${languageName} (${langCode}), using default.`);
        }
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.voice = voice || this.voices[0];
        utterance.onend = () => {
            onend();
        };
        this.synth.speak(utterance);
    }
    /**
     *
     * @param language
     */
    mapLanguageNameToCode(language) {
        const lang = language.toLowerCase();
        if (lang.includes('english'))
            return 'en';
        if (lang.includes('german'))
            return 'de';
        if (lang.includes('french'))
            return 'fr';
        if (lang.includes('hindi'))
            return 'hi';
        if (lang.includes('arabic'))
            return 'ar';
        if (lang.includes('spanish'))
            return 'es';
        if (lang.includes('chinese'))
            return 'zh';
        // Add more as needed
        return 'en'; // default fallback
    }
    getVoiceFromAPI(text, langCode, uniqueKey, direct) {
        return new Promise((resolve, reject) => {
            if (configrationManager.alreadySpeechCalled[uniqueKey ?? '']) {
                const base64Audio = configrationManager.alreadySpeechCalled[uniqueKey ?? ''];
                const audio = new Audio('data:audio/mpeg;base64,' + base64Audio);
                if (this.commonAudio) {
                    this.commonAudio.pause();
                }
                this.commonAudio = audio;
                resolve(audio);
            }
            else {
                request.getAudio({ text: text, language_code: langCode, unique_key: uniqueKey ?? '', direct: direct ?? 0 })
                    .then((response) => {
                    if (response.status === true && response.message === 'Success') {
                        if (response.data && Array.isArray(response.data) && response.data.length > 0) {
                            const base64Audio = response.data[0];
                            if (direct == 0) {
                                configrationManager.alreadySpeechCalled[uniqueKey ?? ''] = base64Audio;
                            }
                            const audio = new Audio('data:audio/mpeg;base64,' + base64Audio);
                            if (this.commonAudio) {
                                try {
                                    this.commonAudio.pause(); // Pause any currently playing audio
                                }
                                catch (e) {
                                    utility.error('Error pausing common audio:', e);
                                }
                            }
                            this.commonAudio = audio; // Store the audio element for future use
                            resolve(audio); // ✅ Return audio to the caller
                        }
                        else {
                            reject('No audio data found in response.');
                        }
                    }
                    else {
                        reject('Failed to get audio: ' + response.message);
                    }
                })
                    .catch((error) => {
                    reject('Error fetching audio: ' + error);
                });
            }
        });
    }
}
const textToSpeech = new TextToSpeech();

class InterviewMoniterUI {
    interviewerStreamData = {};
    interviewerVoiceData = {};
    interviewerLevels = {};
    lastSpeakerSwitch = 0;
    SPEAKER_THRESHOLD = 50;
    SWITCH_DELAY = 4000; // ms
    audioCtx;
    activeInterviewer = '';
    leftSideSwap = false;
    audioAnimationIds = {};
    audioSources = new Map();
    setAdditionalCameraStream(stream, user_name) {
        this.showAdditionalWaitingOverlay();
        let video = null;
        ui.show(ui.id('thinkproc-additional-cam-section'));
        stepUIManager.insertText('thinkproc-interviewCustom-video-label-name', ui.translations.interviewLobby.custom_camera);
        if (LiveStreamManager.PRIMARY_CAMERA_NAME == 'P_CAM') {
            video = ui.id('thinkInterview_mainVideo_additional_cam');
        }
        if (!video) {
            throw new Error('No valid video element found for the selected camera.');
        }
        video.srcObject = stream;
        video.onplaying = () => {
            this.hideWaitingOverlay('C_CAM');
        };
        video.play();
    }
    /** ✅ Hide waiting overlay with fade-out */
    hideWaitingOverlay(cameraType) {
        let overlay = null;
        if (cameraType == 'P_CAM') {
            overlay = ui.id('thinkproc-waiting-overlay');
        }
        else {
            overlay = ui.id('thinkproc-waiting-overlay-additional-cam');
        }
        if (!overlay)
            return;
        overlay.style.transition = 'opacity 0.3s ease';
        overlay.style.opacity = '0';
        // Wait for fade-out animation, then hide
        setTimeout(() => {
            overlay.classList.add('d-none');
        }, 300);
    }
    showAdditionalWaitingOverlay(imageUrl, message) {
        const overlay = ui.id('thinkproc-waiting-overlay-additional-cam');
        const img = ui.id('waitingCameraLoadingImg');
        const text = overlay?.querySelector('.waiting-text');
        if (!overlay || !img || !text)
            return;
        if (imageUrl)
            img.src = imageUrl;
        if (message)
            text.textContent = message;
        overlay.classList.remove('d-none');
        overlay.style.opacity = '1';
        overlay.style.transition = 'opacity 0.3s ease';
    }
    showCandidateWaitingOverlay(imageUrl) {
        const overlay = ui.id('thinkproc-waiting-overlay');
        const img = ui.id('waitingCandidateImg');
        const contentArea = overlay?.querySelector('.waiting-content');
        const text = overlay?.querySelector('.waiting-text');
        if (!overlay || !img || !contentArea || !text)
            return;
        const hasImage = !!imageUrl && String(imageUrl).trim() !== '';
        if (hasImage) {
            img.src = imageUrl;
            img.style.display = '';
            const oldAvatar = contentArea.querySelector('.avatar-circle');
            if (oldAvatar)
                oldAvatar.remove();
        }
        else {
            img.removeAttribute('src');
            img.style.display = 'none';
            const candidateName = configrationManager.interviewCandidateName || '';
            utility.generateNameAvatar(contentArea, candidateName, 1, '120', '40');
        }
        overlay.classList.remove('d-none');
        overlay.style.opacity = '1';
        overlay.style.transition = 'opacity 0.3s ease';
    }
    showCameraDisconnectIcon(cameraName, userName) {
        monitorUi.hideWaitingOverlay(cameraName);
        if (configrationManager.interviewCandidateSocketName == userName) {
            if (cameraName == 'P_CAM') {
                const video = ui.id('thinkInterview_mainVideo');
                if (video) {
                    video.srcObject = null;
                }
                ui.show(ui.id('thinkproc_primary_cam_revoke'));
            }
        }
        else {
            if (cameraName == 'P_CAM') {
                const video = ui.id('thinkInterview_interviewerVideo_' + userName);
                if (video) {
                    video.srcObject = null;
                }
                const name = configrationManager.intervierData[userName].name;
                const overlay = ui.id('thinkproc-interviewer-waiting-overlay_' + userName);
                utility.generateNameAvatar(overlay, name);
            }
        }
    }
    hideCameraDisconnectIcon(cameraName) {
        if (cameraName == 'P_CAM') {
            ui.hide(ui.id('thinkproc_primary_cam_revoke'));
            ui.hide(ui.id('thinkproc-interviewer-waiting-overlay'));
        }
        else if (cameraName == 'C_CAM') {
            ui.hide(ui.id('thinkproc_additional_cam_revoke'));
        }
    }
    hideInterviewerWaitingOverlay(userName) {
        const overlay = ui.id('thinkproc-interviewer-waiting-overlay_' + userName);
        utility.removeAvatarSvgImage(overlay);
    }
    showLoaderwithText(id) {
        const loaderHTML = UiComponents.loadingwithtext(ui.translations.ai_label.please_wait);
        stepUIManager.setLoader(loaderHTML, id);
    }
    hideLoaderwithText() {
        const existingLoader = ui.id('thinkX_loadingwithText');
        if (existingLoader && existingLoader.parentNode) {
            existingLoader.parentNode.removeChild(existingLoader);
        }
    }
    singleInterviewerModeUIAdjustments(socketName) {
        const rightdiv = ui.id('think_interview_video_rightdiv');
        if (rightdiv) {
            rightdiv.style.removeProperty('width'); // removes inline width
            rightdiv.style.transition = 'width 1.3s ease';
            rightdiv.style.width = '0%';
        }
        //const overlayContainer = ui.id('thinkproc-interviewer-common-video-section');
        // if (overlayContainer) {
        //   overlayContainer.querySelector('.interviewer-waiting-section')?.remove();
        //   const waitingDiv = document.createElement('div');
        //   waitingDiv.className = 'thinkproc-waiting-overlay interviewer-waiting-section d-none';
        //   waitingDiv.id = 'thinkproc-interviewer-waiting-overlay_' + socketName;
        //   overlayContainer.appendChild(waitingDiv);
        //   overlayContainer.querySelector('.interviewer-mute-section')?.remove();
        //   const audioMutedDiv = this.createMuteVoiceHtmlElement(socketName);
        //   overlayContainer.appendChild(audioMutedDiv);
        //   const stream = utility.getBlackStream();
        //   const videoDiv = this.createVideoHtmlElement(stream, socketName);
        //   overlayContainer.appendChild(videoDiv);
        // }
        const videoInner = ui.id('think_interview_video_section_inner');
        if (videoInner) {
            videoInner.style.width = '100%';
        }
        stepUIManager.insertText('thinkproc-interview-video-label-name', configrationManager.intervierData[socketName].name);
    }
    multiInterviewerModeUIAdjustments() {
        ui.show(ui.id('think_interview_video_rightdiv'));
        const videoInner = ui.id('think_interview_video_section_inner');
        if (videoInner) {
            videoInner.style.width = 'calc(100% - 280px)';
        }
        const rightdiv = ui.id('think_interview_video_rightdiv');
        if (rightdiv) {
            rightdiv.style.removeProperty('width'); // removes inline width
            rightdiv.style.transition = 'width 1.3s ease';
            rightdiv.style.width = '280px';
        }
    }
    createDynamicInterviewer(stream, socketName) {
        const container = ui.id('videoContainer');
        if (!container)
            throw new Error('videoContainer not found');
        // --- IF ALREADY EXISTS, JUST UPDATE STREAM ---
        let existingWrapper = ui.id('interviewer_' + socketName);
        if (existingWrapper) {
            //existingWrapper.classList.add("d-none");
            const existingVideo = existingWrapper.querySelector('video');
            existingVideo.srcObject = stream;
            return existingVideo;
        }
        // wrapper
        const wrapper = document.createElement('div');
        wrapper.className = 'thinkproc-candidate-video thinkproc-candidate-video-interview';
        wrapper.id = 'interviewer_' + socketName; // 🔥 store socketName in div ID
        wrapper.style.backgroundColor = 'black';
        // video
        const video = this.createVideoHtmlElement(stream, socketName);
        // name label
        const labelDiv = document.createElement('div');
        labelDiv.className = 'thinkproc-candidate-label';
        // interviewer name
        const nameSpan = document.createElement('span');
        nameSpan.innerText = configrationManager.intervierData[socketName].name;
        labelDiv.appendChild(nameSpan);
        // heartbeat
        const heartbeat = document.createElement('div');
        heartbeat.className = 'thinkproc-audio-heartbeat';
        heartbeat.id = 'think_interview_audioHeartbeat_' + socketName; // 🔥 unique ID for heartbeat
        // audio muted
        const audioMutedDiv = this.createMuteVoiceHtmlElement(socketName);
        // video muted
        const waitingDiv = document.createElement('div');
        waitingDiv.className = 'thinkproc-waiting-overlay d-none';
        waitingDiv.id = 'thinkproc-interviewer-waiting-overlay_' + socketName; // 🔥 unique ID for waiting
        for (let i = 0; i < 5; i++) {
            const bar = document.createElement('div');
            bar.className = 'bar';
            heartbeat.appendChild(bar);
        }
        // append everything
        wrapper.appendChild(video);
        wrapper.appendChild(labelDiv);
        wrapper.appendChild(heartbeat);
        wrapper.appendChild(audioMutedDiv);
        wrapper.appendChild(waitingDiv);
        container.appendChild(wrapper);
        return video;
    }
    createMuteVoiceHtmlElement(socketName) {
        const audioMutedDiv = document.createElement('div');
        audioMutedDiv.className = 'thinkproc-audio-muted interviewer-mute-section d-none';
        audioMutedDiv.id = 'think_interview_audio_muted_' + socketName;
        const audioMutedImg = document.createElement('img');
        audioMutedImg.src = environment.UI_BASE_URL + 'images/mute_mic.svg';
        audioMutedImg.title = 'Audio Muted';
        audioMutedDiv.appendChild(audioMutedImg);
        return audioMutedDiv;
    }
    createVideoHtmlElement(stream, socketName) {
        const video = document.createElement('video');
        video.autoplay = true;
        video.muted = true;
        video.className = 'thinkproc_interviewerVideo';
        video.id = 'thinkInterview_interviewerVideo_' + socketName;
        video.srcObject = stream;
        return video;
    }
    interviewerUiViewHandle() {
        ui.show(ui.id('thinkInterview_mainVideo'));
        ui.show(ui.id('thinkproc-camera-open'));
        ui.show(ui.id('thinkproc-mic-open'));
        ui.show(ui.id('thinkinterview_UFM'));
        ui.show(ui.id('thinkproc-waiting-overlay'));
        ui.hide(ui.id('think_interview_candidateSession'));
        ui.hide(ui.id('think_interview_left_audio_muted'));
        stepUIManager.insertText('thinkproc-interview-video-label-name', configrationManager.interviewCandidateName);
        const overlay = ui.id('thinkproc-candidate-video-interview');
        if (overlay) {
            const avatarDiv = document.createElement('div');
            avatarDiv.className = 'thinkproc-waiting-overlay d-none';
            avatarDiv.id = 'thinkproc-interviewer-waiting-overlay_' + configrationManager.socketUserName;
            overlay.appendChild(avatarDiv);
        }
        if (configrationManager.video_mute == true) {
            this.muteInterviewerVideoStream(configrationManager.socketUserName);
            const imgElement = ui.id('thinkproc-camera-open')?.querySelector('img');
            if (imgElement) {
                imgElement.classList.add('mute');
                imgElement.style.backgroundColor = '#2F4DDB';
                imgElement.style.borderRadius = '50px';
                imgElement.src = environment.UI_BASE_URL + 'images/white_video_call.svg';
            }
        }
        if (configrationManager.audio_mute == true) {
            this.muteInterviewerAudioStream();
            liveStreamManager.disableAudioTracks(LiveStreamManager.AUDIO.PRIMARY);
            const imgElement = ui.id('thinkproc-mic-open')?.querySelector('img');
            if (imgElement) {
                imgElement.classList.add('mute');
                imgElement.style.backgroundColor = '#2F4DDB';
                imgElement.style.borderRadius = '50px';
                configrationManager.audio_mute = true;
                imgElement.src = environment.UI_BASE_URL + 'images/white_mic.svg';
            }
        }
    }
    bindInterviewerUiEvents() {
        const cameraBtn = ui.id('thinkproc-camera-open');
        if (cameraBtn) {
            ui.click(cameraBtn, () => {
                const img = cameraBtn.querySelector('img');
                if (!img)
                    return;
                const muted = this.toggleMuteUI(img, 'white_video_call.svg', 'video_call.svg');
                configrationManager.video_mute = muted;
                if (muted) {
                    liveStreamManager.disableStreamTracks(LiveStreamManager.CAMERA.PRIMARY);
                    this.muteInterviewerVideoStream(configrationManager.socketUserName);
                    socket.sendRoomMessage({
                        mode: 'mute_video_stream',
                        text: 'interviewer mute video stream',
                    });
                }
                else {
                    liveStreamManager.enableStreamTracks(LiveStreamManager.CAMERA.PRIMARY);
                    this.unMuteInterviewerVideoStream(configrationManager.socketUserName);
                    socket.sendRoomMessage({
                        mode: 'unmute_video_stream',
                        text: 'interviewer unmute video stream',
                    });
                }
            });
        }
        const micBtn = ui.id('thinkproc-mic-open');
        if (micBtn) {
            ui.click(micBtn, () => {
                const img = micBtn.querySelector('img');
                if (!img)
                    return;
                const muted = this.toggleMuteUI(img, 'white_mic.svg', 'mic_icon.svg');
                configrationManager.audio_mute = muted;
                if (muted) {
                    liveStreamManager.disableAudioTracks(LiveStreamManager.AUDIO.PRIMARY);
                    this.muteInterviewerAudioStream();
                    socket.sendRoomMessage({
                        mode: 'mute_audio_stream',
                        text: 'interviewer mute audio stream',
                    });
                }
                else {
                    liveStreamManager.enableStreamTracks(LiveStreamManager.AUDIO.PRIMARY);
                    this.unMuteInterviewerAudioStream();
                    socket.sendRoomMessage({
                        mode: 'unmute_audio_stream',
                        text: 'interviewer unmute audio stream',
                    });
                }
            });
        }
    }
    toggleMuteUI(img, muteIcon, unmuteIcon) {
        const isMuted = img.classList.contains('mute');
        if (!isMuted) {
            img.classList.add('mute');
            img.style.backgroundColor = '#2F4DDB';
            img.style.borderRadius = '50px';
            img.src = environment.UI_BASE_URL + 'images/' + muteIcon;
        }
        else {
            img.classList.remove('mute');
            img.style.backgroundColor = '';
            img.style.borderRadius = '';
            img.src = environment.UI_BASE_URL + 'images/' + unmuteIcon;
        }
        return !isMuted; // true = muted now
    }
    muteInterviewerVideoStream(userName) {
        const name = configrationManager.intervierData[userName]?.name || 'Interviewer';
        if (configrationManager.activeInterviewer == userName) {
            const overlay = ui.id('thinkproc-interviewer-video-muted');
            utility.generateNameAvatar(overlay, name, 0, '120', '40');
        }
        const overlay = ui.id('thinkproc-interviewer-waiting-overlay_' + userName);
        utility.generateNameAvatar(overlay, name);
    }
    unMuteInterviewerVideoStream(userName) {
        if (configrationManager.activeInterviewer == userName) {
            const overlay = ui.id('thinkproc-interviewer-video-muted');
            utility.removeAvatarSvgImage(overlay);
        }
        const overlay = ui.id('thinkproc-interviewer-waiting-overlay_' + userName);
        utility.removeAvatarSvgImage(overlay);
    }
    muteCandidateVideoStream() {
        const name = configrationManager.interviewCandidateName || 'Candidate';
        const overlay = ui.id('thinkproc-candidate-video-muted');
        utility.generateNameAvatar(overlay, name, 0, '120', '40');
    }
    unMuteCandidateVideoStream() {
        const overlay = ui.id('thinkproc-candidate-video-muted');
        utility.removeAvatarSvgImage(overlay);
    }
    // changeInterviewerWaitingOverlayId(stream: MediaStream, socketName: string): void {
    //   const overlayContainer = ui.id('thinkproc-interviewer-common-video-section');
    //   if (overlayContainer) {
    //     overlayContainer.querySelector('.interviewer-waiting-section')?.remove();
    //     const waitingDiv = document.createElement('div');
    //     waitingDiv.className = 'thinkproc-waiting-overlay interviewer-waiting-section d-none';
    //     waitingDiv.id = 'thinkproc-interviewer-waiting-overlay_' + socketName;
    //     overlayContainer.appendChild(waitingDiv);
    //     overlayContainer.querySelector('.interviewer-mute-section')?.remove();
    //     const audioMutedDiv = this.createMuteVoiceHtmlElement(socketName);
    //     overlayContainer.appendChild(audioMutedDiv);
    //     const videoDiv = this.createVideoHtmlElement(stream, socketName);
    //     overlayContainer.appendChild(videoDiv);
    //   }
    // }
    setInterviewerLeftSideStream(stream, socketName) {
        let existingWrapper = ui.id('thinkproc-interviewer-common-video-section');
        if (existingWrapper) {
            const existingVideo = existingWrapper.querySelector('#thinkInterview_mainVideo');
            existingVideo.srcObject = stream;
        }
    }
    showMutedIconLeftSide(userName) {
        const overlay = ui.id('thinkproc-interviewer-video-muted');
        const name = configrationManager.intervierData[userName]?.name || 'Interviewer';
        utility.generateNameAvatar(overlay, name);
    }
    hideMutedIconLeftSide() {
        const overlay = ui.id('thinkproc-interviewer-video-muted');
        utility.removeAvatarSvgImage(overlay);
    }
    setInterviewerRightSideStream(stream, socketName) {
        let existingWrapper = ui.id('interviewer_' + socketName);
        if (existingWrapper) {
            const existingVideo = existingWrapper.querySelector('video');
            existingVideo.srcObject = stream;
        }
    }
    muteInterviewerAudioStream(socketName) {
        if (socketName) {
            if (configrationManager.activeInterviewer == socketName) {
                ui.id('think_interview_userAudioHeartbeat')?.classList.add('d-none');
                ui.id('think_interview_left_audio_muted')?.classList.remove('d-none');
            }
            ui.id('think_interview_audioHeartbeat_' + socketName)?.classList.add('d-none');
            ui.id('think_interview_audio_muted_' + socketName)?.classList.remove('d-none');
        }
        else {
            ui.id('think_interview_audioHeartbeat')?.classList.add('d-none');
            ui.id('think_interview_audio_muted')?.classList.remove('d-none');
        }
    }
    unMuteInterviewerAudioStream(socketName) {
        if (socketName) {
            if (configrationManager.activeInterviewer == socketName) {
                ui.id('think_interview_userAudioHeartbeat')?.classList.remove('d-none');
                ui.id('think_interview_left_audio_muted')?.classList.add('d-none');
            }
            ui.id('think_interview_audioHeartbeat_' + socketName)?.classList.remove('d-none');
            ui.id('think_interview_audio_muted_' + socketName)?.classList.add('d-none');
        }
        else { // interviewer side self section
            ui.id('think_interview_audioHeartbeat')?.classList.remove('d-none');
            ui.id('think_interview_audio_muted')?.classList.add('d-none');
        }
    }
    muteAudioLeftSideInterviewer() {
        ui.id('think_interview_userAudioHeartbeat')?.classList.add('d-none');
        ui.id('think_interview_left_audio_muted')?.classList.remove('d-none');
    }
    unMuteAudioLeftSideInterviewer() {
        ui.id('think_interview_userAudioHeartbeat')?.classList.remove('d-none');
        ui.id('think_interview_left_audio_muted')?.classList.add('d-none');
    }
    removeDynamicInterviewer(socketName) {
        if (socketName) {
            const wrapperId = "interviewer_" + socketName;
            const wrapper = ui.id(wrapperId);
            if (wrapper) {
                wrapper.remove();
            }
        }
        else {
            const container = ui.id("videoContainer");
            if (container) {
                container.innerHTML = "";
            }
        }
    }
    coverHundredPercentForInterviewer() {
        ui.hide(ui.id('think_interview_video_rightdiv'));
        const videoInner = ui.id('think_interview_video_section_inner');
        if (videoInner) {
            videoInner.style.removeProperty("width"); // removes inline width
            videoInner.style.transition = "width 1.3s ease";
            videoInner.style.width = "100%";
        }
    }
    initAudioHeartbeatInterview(stream, socketName) {
        if (configrationManager.totalInterviwerCount == 1) {
            ui.id('think_interview_userAudioHeartbeat_candidate')?.style.setProperty('display', 'none', 'important');
            ui.id('think_interview_userAudioHeartbeat')?.style.setProperty('display', 'none', 'important');
            ui.id('think_interview_audioHeartbeat')?.style.setProperty('display', 'none', 'important');
            ui.hide(ui.id('think_interview_left_audio_muted'));
            return;
        }
        const containerId = ui.id('think_interview_audioHeartbeat_' + socketName);
        if (!containerId)
            return;
        // if (this.audioAnimationIds[socketName]) {
        //   cancelAnimationFrame(this.audioAnimationIds[socketName]);
        // }
        const bars = Array.from(containerId.getElementsByClassName('bar'));
        try {
            if (!this.audioCtx) {
                this.audioCtx = new AudioContext();
            }
            if (this.audioCtx.state === 'suspended') {
                this.audioCtx.resume();
            }
            let source = this.audioSources.get(stream.id);
            if (!source) {
                source = this.audioCtx.createMediaStreamSource(stream);
                this.audioSources.set(stream.id, source);
            }
            const analyser = this.audioCtx.createAnalyser();
            analyser.fftSize = 256;
            source.connect(analyser);
            const dataArray = new Uint8Array(analyser.frequencyBinCount);
            const render = () => {
                analyser.getByteFrequencyData(dataArray);
                const avg = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
                const boosted = avg * 4;
                /* ACTIVE SPEAKER DETECTION */
                //utility.log('interviewer swap 507',boosted, this.lastSpeakerSwitch, this.SPEAKER_THRESHOLD);
                if (boosted > this.SPEAKER_THRESHOLD) {
                    //this.onInterviewerSpeaking(socketName);
                    //utility.log('interviewer swap 510', socketName);
                }
                /* 🎵 HEARTBEAT UI */
                const normalized = Math.min(boosted / 10, 10);
                bars.forEach((bar, i) => {
                    const scale = Math.max(4, Math.random() * normalized * (i % 2 ? 1.5 : 1));
                    bar.style.height = `${scale * 2}px`;
                });
                this.audioAnimationIds[socketName] = requestAnimationFrame(render);
            };
            render();
        }
        catch (err) {
            console.error('initAudioHeartbeatInterview error:', err);
        }
    }
    onInterviewerSpeaking(socketName) {
        const now = Date.now();
        if (socketName !== configrationManager.activeInterviewer &&
            now - this.lastSpeakerSwitch > this.SWITCH_DELAY) {
            this.lastSpeakerSwitch = now;
            this.swapToMainInterviewer(socketName);
        }
    }
    swapToMainInterviewer(userName) {
        // last active interviewer show in right section
        ui.id('interviewer_' + configrationManager.activeInterviewer)?.classList.remove('d-none');
        configrationManager.activeInterviewer = userName;
        // current interviewer hide right side section 
        ui.id('interviewer_' + userName)?.classList.add('d-none');
        //current interviewer set main left section
        const audioStream = this.interviewerVoiceData[userName];
        if (audioStream) {
            this.setMainStream(this.interviewerStreamData[userName]);
            this.initAudioHeartbeat(audioStream, 'think_interview_userAudioHeartbeat');
            stepUIManager.insertText('thinkproc-interview-video-label-name', configrationManager.intervierData[userName].name);
            if (configrationManager.interviewerVideoMute[userName]) {
                this.showMutedIconLeftSide(userName);
            }
            else {
                this.hideMutedIconLeftSide();
            }
            if (configrationManager.interviewerAudioMute[userName]) {
                this.muteAudioLeftSideInterviewer();
            }
            else {
                this.unMuteAudioLeftSideInterviewer();
            }
        }
        if (Object.keys(this.interviewerStreamData).length <= 1) {
            monitorUi.coverHundredPercentForInterviewer();
        }
    }
    setMainStream(stream) {
        let video = null;
        if (LiveStreamManager.PRIMARY_CAMERA_NAME == 'P_CAM') {
            video = ui.id('thinkInterview_mainVideo');
        }
        if (!video) {
            throw new Error('No valid video element found for the selected camera.');
        }
        video.srcObject = stream;
        video.play();
    }
    hideActiveInterviewerRightSection() {
        ui.id("interviewer_" + configrationManager.activeInterviewer)?.classList.add('d-none');
    }
    initAudioHeartbeat(stream, containerId) {
        if (configrationManager.totalInterviwerCount == 1) {
            ui.id('think_interview_userAudioHeartbeat_candidate')?.style.setProperty('display', 'none', 'important');
            ui.id('think_interview_userAudioHeartbeat')?.style.setProperty('display', 'none', 'important');
            ui.id('think_interview_audioHeartbeat')?.style.setProperty('display', 'none', 'important');
            ui.hide(ui.id('think_interview_left_audio_muted'));
            return;
        }
        const heartbeatEl = ui.id(containerId);
        if (!heartbeatEl) {
            utility.warn(`initAudioHeartbeat: Container '${containerId}' not found.`);
            return;
        }
        const bars = Array.from(heartbeatEl.getElementsByClassName('bar'));
        try {
            if (!this.audioCtx) {
                this.audioCtx = new AudioContext();
            }
            if (this.audioCtx.state === 'suspended') {
                this.audioCtx.resume();
            }
            let source = this.audioSources.get(stream.id);
            if (!source) {
                source = this.audioCtx.createMediaStreamSource(stream);
                this.audioSources.set(stream.id, source);
            }
            const analyser = this.audioCtx.createAnalyser();
            analyser.fftSize = 256;
            const dataArray = new Uint8Array(analyser.frequencyBinCount);
            source.connect(analyser);
            const SENSITIVITY_BOOST = 4;
            function renderVisualizer() {
                analyser.getByteFrequencyData(dataArray);
                const avg = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
                const boosted = avg * SENSITIVITY_BOOST;
                const normalized = Math.min(boosted / 10, 10);
                bars.forEach((bar, i) => {
                    const scale = Math.max(4, Math.random() * normalized * (i % 2 ? 1.5 : 1));
                    bar.style.height = `${scale * 2}px`;
                });
                requestAnimationFrame(renderVisualizer);
            }
            renderVisualizer();
        }
        catch (err) {
            console.error("initAudioHeartbeat error:", err);
        }
    }
    setCandidateImage(url, id) {
        const element = ui.id(id);
        if (!element)
            return;
        if (url && url.trim() !== '') {
            stepUIManager.srcInsert(id, url);
        }
    }
    setPercentage(percentage, id) {
        const element = ui.id(id);
        if (!element)
            return;
        if (typeof percentage === 'number') {
            element.classList.remove('thinkproc-id-varification-ai-match', 'thinkproc-id-varification-ai-match-orange');
            if (percentage < 50) {
                element.classList.add('thinkproc-id-varification-ai-match-orange');
            }
            else {
                element.classList.add('thinkproc-id-varification-ai-match');
            }
            // Update the dot inside
            const dot = element.querySelector('span');
            if (dot) {
                dot.classList.remove('thinkproc-green-dot', 'thinkproc-orange-dot');
                dot.classList.add(percentage < 50 ? 'thinkproc-orange-dot' : 'thinkproc-green-dot');
            }
            element.innerHTML = `<span class="${percentage < 50 ? 'thinkproc-orange-dot' : 'thinkproc-green-dot'}"></span> ${percentage}% AI Match`;
        }
    }
    camDisconnectInterviewer(userName) {
        const name = configrationManager.intervierData[userName]?.name || 'Interviewer';
        if (configrationManager.activeInterviewer == userName) {
            const videoElement = ui.id('thinkInterview_mainVideo');
            if (videoElement) {
                videoElement.srcObject = null;
            }
            const overlay = ui.id('thinkproc-interviewer-video-muted');
            utility.generateNameAvatar(overlay, name, 0, '120', '40');
        }
        else {
            const videoElement = ui.id('thinkInterview_interviewerVideo_' + userName);
            if (videoElement) {
                videoElement.srcObject = null;
            }
        }
        const overlay = ui.id('thinkproc-interviewer-waiting-overlay_' + userName);
        utility.generateNameAvatar(overlay, name);
    }
    additionalCameraDisconnectCheck() {
        const video = ui.id('thinkInterview_mainVideo_additional_cam');
        if (video) {
            video.srcObject = null;
        }
        ui.show(ui.id('thinkproc_additional_cam_revoke'));
    }
}
const monitorUi = new InterviewMoniterUI();

class ExamCameraSetupUI {
    envAlias = 'Interview_Session';
    preAiStatusResponse = null;
    socketuserID;
    selectedCameraId = '';
    selectCameraLabel = '';
    camType = '';
    ufm;
    ufmSide;
    ufmBack;
    ufmFront;
    recordingCamStarted = true;
    aiCameraRevoke = '';
    isExamPaused = false;
    additionalCameraDismiss = false;
    qrStatusInterval = null;
    flag = false;
    validPositionCount = 0;
    constructor() {
        this.ufm = new Ufm();
        this.ufmSide = new Ufm();
        this.ufmBack = new Ufm();
        this.ufmFront = new Ufm();
        this.socketuserID = '';
    }
    async showQrPage(allowclickCallback, step, camType) {
        let select = null;
        let allowBtn = null;
        if (camType == 'S_CAM') {
            ui.show(ui.id('thinkX_exam_side_camera_setup_popup')); // show main container
            ui.hide(ui.id('thinkX_side_cameraSetup_box')); //hide camera frame page
            ui.show(ui.id('thinkX_side_qr_popup_dropdown')); // show QR code img Page
            select = ui.id('thinkX_side_cameraSetupSelect_exam');
            allowBtn = ui.id('thinkX_side_CameraAllowBtn');
        }
        else if (camType == 'B_CAM') {
            ui.show(ui.id('thinkX_exam_back_camera_setup_popup')); // show main container
            ui.hide(ui.id('thinkX_back_cameraSetup_box'));
            ui.show(ui.id('thinkX_back_qr_popup_dropdown'));
            select = ui.id('thinkX_back_cameraSetupSelect_exam');
            allowBtn = ui.id('thinkX_back_CameraAllowBtn');
        }
        else if (camType == 'F_CAM') {
            ui.show(ui.id('thinkX_exam_front_camera_setup_popup')); // show main container
            ui.hide(ui.id('thinkX_front_cameraSetup_box'));
            ui.show(ui.id('thinkX_front_qr_popup_dropdown'));
            select = ui.id('thinkX_front_cameraSetupSelect_exam');
            allowBtn = ui.id('thinkX_front_CameraAllowBtn');
        }
        else if (camType == 'C_CAM') {
            ui.show(ui.id('thinkX_exam_additional_camera_setup_popup')); // show main container
            ui.hide(ui.id('thinkX_additional_cameraSetup_box'));
            ui.show(ui.id('thinkX_additional_qr_popup_dropdown'));
            select = ui.id('thinkX_additional_cameraSetupSelect_exam');
            allowBtn = ui.id('thinkX_additional_CameraAllowBtn');
        }
        this.getQRData(camType, step);
        // Clear any old interval before starting a new one
        if (this.qrStatusInterval) {
            clearInterval(this.qrStatusInterval);
        }
        // Set interval to check status every 5 seconds
        this.qrStatusInterval = setInterval(async () => {
            try {
                const response = await request.checkCurrentQRstatus({ camera_type: camType, environment: step });
                if (response.data.status === 'EXPIRE') {
                    this.getQRData(camType, step);
                }
            }
            catch (error) {
                utility.log('QR code status request failed', error);
            }
        }, 5000); // 5,000 ms = 5 seconds
        await this.loadSecondaryCamerasOnly();
        if (select && allowBtn) {
            // Optional: disable Allow button until a camera is selected
            allowBtn.disabled = true;
            ui.addClass(allowBtn, 'thinkproc-disable');
            select.addEventListener('change', () => {
                allowBtn.disabled = select.value === '';
            });
            // Enable if pre-selected value exists
            allowBtn.disabled = select.value === '';
            if (!allowBtn.disabled) {
                ui.removeClass(allowBtn, 'thinkproc-disable');
            }
            ui.click(allowBtn, async () => {
                allowclickCallback(select, camType);
            });
        }
    }
    // helper method to stop the interval
    stopQrStatusCheck() {
        if (this.qrStatusInterval) {
            clearInterval(this.qrStatusInterval);
            this.qrStatusInterval = null;
        }
    }
    getQRData(camSelect, step) {
        this.showLoader();
        request
            .QRCode({ camera_type: camSelect, environment: step })
            .then((response) => {
            if (response.message?.toLowerCase().includes('qr code') && response.data?.qr_svg) {
                const svg = response.data.qr_svg;
                const base64Svg = 'data:image/svg+xml;base64,' +
                    btoa(encodeURIComponent(svg).replace(/%([0-9A-F]{2})/g, (_, p1) => String.fromCharCode(parseInt(p1, 16))));
                // Create <img> element
                const img = document.createElement('img');
                img.src = base64Svg;
                img.alt = 'QR Code';
                img.className = 'thinkproc-qrimgCamSetup';
                img.style.maxWidth = '100%'; // Optional styling
                // Append to the container with ID "thinkproc-qrimage"
                let container = null;
                if (camSelect == 'S_CAM') {
                    container = ui.id('thinkX_side_popup_qrCode');
                }
                else if (camSelect == 'B_CAM') {
                    container = ui.id('thinkX_back_popup_qrCode');
                }
                else if (camSelect == 'F_CAM') {
                    container = ui.id('thinkX_front_popup_qrCode');
                }
                else if (camSelect == 'F_CAM') {
                    container = ui.id('thinkX_front_popup_qrCode');
                }
                else if (camSelect == 'C_CAM') {
                    container = ui.id('thinkX_additional_popup_qrCode');
                }
                if (container) {
                    container.innerHTML = ''; // Clear previous content
                    container.appendChild(img);
                }
                else {
                    utility.log('QR image container not found');
                }
                this.hideLoader();
            }
            else {
                utility.log('QR code generation failed or SVG missing', response);
            }
        })
            .catch((error) => {
            utility.log('QR code request failed', error);
        });
    }
    async loadSecondaryCamerasOnly() {
        try {
            const currentDeviceId = LiveStreamManager.CAMERA.PRIMARY.videoDeviceIN;
            const sideDeviceId = LiveStreamManager.CAMERA.SIDE.videoDeviceIN;
            const frontDeviceId = LiveStreamManager.CAMERA.FRONT.videoDeviceIN;
            const backDeviceId = LiveStreamManager.CAMERA.BACK.videoDeviceIN;
            const devices = await liveStreamManager.getMediaDevices();
            let secRetryIcon = null;
            let allowBtn = null;
            if (this.camType == 'S_CAM') {
                secRetryIcon = ui.id('thinkX_side_secondaryCamRetryIcon_exam');
                allowBtn = ui.id('thinkX_side_CameraAllowBtn');
            }
            else if (this.camType == 'B_CAM') {
                secRetryIcon = ui.id('thinkX_back_secondaryCamRetryIcon_exam');
                allowBtn = ui.id('thinkX_back_CameraAllowBtn');
            }
            else if (this.camType == 'F_CAM') {
                secRetryIcon = ui.id('thinkX_front_secondaryCamRetryIcon_exam');
                allowBtn = ui.id('thinkX_front_CameraAllowBtn');
            }
            else if (this.camType == 'C_CAM') {
                secRetryIcon = ui.id('thinkX_additional_secondaryCamRetryIcon_exam');
                allowBtn = ui.id('thinkX_additional_CameraAllowBtn');
            }
            if (devices && typeof devices !== 'boolean') {
                const videoDevices = devices.video;
                const secondaryDevices = videoDevices.filter((device) => device.deviceId !== frontDeviceId &&
                    device.deviceId !== backDeviceId &&
                    device.deviceId !== sideDeviceId &&
                    device.deviceId !== currentDeviceId);
                let cameraSetupSelect = '';
                if (this.camType == 'S_CAM') {
                    ui.show(ui.id('thinkproc-side_cameraSetupWrap'));
                    cameraSetupSelect = 'thinkX_side_cameraSetupSelect_exam';
                }
                else if (this.camType == 'B_CAM') {
                    ui.show(ui.id('thinkproc-back_cameraSetupWrap'));
                    cameraSetupSelect = 'thinkX_back_cameraSetupSelect_exam';
                }
                else if (this.camType == 'F_CAM') {
                    ui.show(ui.id('thinkproc-front_cameraSetupWrap'));
                    cameraSetupSelect = 'thinkX_front_cameraSetupSelect_exam';
                }
                else if (this.camType == 'C_CAM') {
                    ui.show(ui.id('thinkproc-additional_cameraSetupWrap'));
                    cameraSetupSelect = 'thinkX_additional_cameraSetupSelect_exam';
                }
                const options = secondaryDevices.map((cam, i) => ({
                    value: cam.deviceId || `${i}`,
                    label: cam.label || `Camera Device ${i + 1}`,
                }));
                utility.log(options.length, 'option length1');
                if (options.length > 0) {
                    stepUIManager.initAndUpdateCustomSelectById(cameraSetupSelect, options, options[0]?.value);
                    if (secRetryIcon) {
                        ui.addClass(secRetryIcon, 'd-none');
                    }
                    if (allowBtn) {
                        allowBtn.disabled = false;
                        ui.removeClass(allowBtn, 'thinkproc-disable');
                    }
                }
                else {
                    stepUIManager.initAndUpdateCustomSelectById(cameraSetupSelect, [{ value: '', label: ui.translations.status.no_camera_found }], '');
                    if (secRetryIcon) {
                        ui.show(secRetryIcon);
                        // Prevent attaching the click multiple times
                        if (!secRetryIcon.dataset.binded) {
                            ui.click(secRetryIcon, async () => {
                                await this.retryAdditionalCamera();
                            });
                            //secRetryIcon.dataset.binded = 'true';
                        }
                    }
                }
            }
            else {
                stepUIManager.initAndUpdateCustomSelectById('thinkpro-get-camera-value', [{ value: '', label: ui.translations.status.cameraAccessDenied }], '');
            }
        }
        catch (err) {
            utility.error('Failed to load camera devices:', err);
            stepUIManager.initAndUpdateCustomSelectById('thinkpro-get-camera-value', [{ value: '', label: ui.translations.status.cameraAccessDenied }], '');
        }
    }
    async retryAdditionalCamera() {
        let cameraSetupSelect = '';
        let reloadIconSecCam = null;
        let secRetryIcon = null;
        let allowBtn = null;
        if (this.camType == 'S_CAM') {
            cameraSetupSelect = 'thinkX_side_cameraSetupSelect_exam';
            reloadIconSecCam = ui.id('thinkX_side_reloadIconSecCam');
            secRetryIcon = ui.id('thinkX_side_secondaryCamRetryIcon_exam');
            allowBtn = ui.id('thinkX_side_CameraAllowBtn');
        }
        else if (this.camType == 'B_CAM') {
            cameraSetupSelect = 'thinkX_back_cameraSetupSelect_exam';
            reloadIconSecCam = ui.id('thinkX_back_reloadIconSecCam');
            secRetryIcon = ui.id('thinkX_back_secondaryCamRetryIcon_exam');
            allowBtn = ui.id('thinkX_back_CameraAllowBtn');
        }
        else if (this.camType == 'F_CAM') {
            cameraSetupSelect = 'thinkX_front_cameraSetupSelect_exam';
            reloadIconSecCam = ui.id('thinkX_front_reloadIconSecCam');
            secRetryIcon = ui.id('thinkX_front_secondaryCamRetryIcon_exam');
            allowBtn = ui.id('thinkX_front_CameraAllowBtn');
        }
        else if (this.camType == 'C_CAM') {
            cameraSetupSelect = 'thinkX_additional_cameraSetupSelect_exam';
            reloadIconSecCam = ui.id('thinkX_additional_reloadIconSecCam');
            secRetryIcon = ui.id('thinkX_additional_secondaryCamRetryIcon_exam');
            allowBtn = ui.id('thinkX_additional_CameraAllowBtn');
        }
        try {
            const { PRIMARY, SIDE, FRONT, BACK } = LiveStreamManager.CAMERA;
            const currentDeviceId = PRIMARY.videoDeviceIN;
            const sideDeviceId = SIDE.videoDeviceIN;
            const frontDeviceId = FRONT.videoDeviceIN;
            const backDeviceId = BACK.videoDeviceIN;
            const devices = await liveStreamManager.getMediaDevices();
            if (reloadIconSecCam) {
                ui.addClass(reloadIconSecCam, 'iconRotate');
            }
            if (devices && typeof devices !== 'boolean') {
                const videoDevices = devices.video || [];
                const secondaryDevices = videoDevices.filter((device) => ![currentDeviceId, sideDeviceId, frontDeviceId, backDeviceId].includes(device.deviceId));
                const options = secondaryDevices.map((cam, i) => ({
                    value: cam.deviceId || `${i}`,
                    label: cam.label || `Camera Device ${i + 1}`,
                }));
                utility.log(options.length, 'Secondary camera options found');
                if (options.length > 0) {
                    uiEvents.setOptions(cameraSetupSelect, options, options[0].value);
                    if (secRetryIcon)
                        ui.hide(secRetryIcon);
                    if (allowBtn) {
                        allowBtn.disabled = false;
                        ui.removeClass(allowBtn, 'thinkproc-disable');
                    }
                }
                else {
                    uiEvents.setOptions(cameraSetupSelect, [{ value: '', label: ui.translations.status.no_camera_found }], '');
                    if (secRetryIcon)
                        ui.show(secRetryIcon);
                }
            }
            else {
                uiEvents.setOptions(cameraSetupSelect, [{ value: '', label: ui.translations.status.cameraAccessDenied }], '');
            }
            if (reloadIconSecCam) {
                utility.wait(3000).then(() => ui.removeClass(reloadIconSecCam, 'iconRotate'));
            }
        }
        catch (err) {
            utility.error('Retry failed to load secondary camera devices:', err);
            uiEvents.setOptions(cameraSetupSelect, [{ value: '', label: ui.translations.status.cameraAccessDenied }], '');
        }
    }
    async cameraAllowClick(select, camType) {
        let self = examCameraUi;
        const selectedDeviceId = select.value;
        const selectCameraLabel = select?.selectedOptions[0]?.text || '';
        if (selectedDeviceId) {
            self.hideCameraSelectPage(camType);
            self.selectedCameraId = selectedDeviceId;
            self.selectCameraLabel = selectCameraLabel;
            await self.cameraSetupStart(self.streamCallback, self.selectedCameraId, camType);
        }
        else {
            utility.log('Please select a camera first.');
        }
    }
    streamCallback(stream) {
        examCameraUi.setRoomStream(stream);
    }
    async setRoomStream(stream, aiStart = 1) {
        let self = examCameraUi;
        self.stopQrStatusCheck();
        self.startStreamLoader(self.camType);
        if (stream) {
            const video = self.setStream(stream);
            video.onplaying = () => {
                self.hideLoaderwithText();
            };
            video.play();
            if (self.camType == 'C_CAM') {
                if (aiStart == 1) {
                    ui.show(ui.id('thinkX_pop_cameraSetup_btn'));
                    const button = ui.id('thinkX_retry_additionalCamera_AllowBtn');
                    if (button) {
                        ui.click(button, async () => {
                            self.completeCameraSetup(true, self.camType);
                        });
                    }
                    const checkBox = ui.id('thinkX_popup_additional_camera_checkbox');
                    const button2 = ui.id('thinkX_retry_additionalCamera_AllowBtn');
                    if (checkBox && button2) {
                        ui.enableOnCheck(checkBox, button2);
                    }
                }
                else {
                    ui.hide(ui.id('thinkX_pop_cameraSetup_btn'));
                }
            }
            else {
                if (aiStart == 1) {
                    setTimeout(() => {
                        self.showTextAndAudio(ui.translations.status.cameraSetup_instuction, true, self.socketuserID, 'cam_setup_audioText', 'cameraSetup_instuction');
                    }, 2000);
                    utility.log(self.camType, 'Starting AI for camera');
                    let response = await self.waitForPosition(video);
                    if (response === 155 || response === 162 || this.flag) {
                        utility.wait(4000).then(async () => {
                            await self.waitForValidation(video);
                        });
                    }
                }
            }
        }
        else {
            examCameraUi.showQrPage(self.cameraAllowClick, self.envAlias, self.camType);
        }
    }
    setStream(stream) {
        let self = examCameraUi;
        let videoDivDom = null;
        if (self.camType == 'S_CAM') {
            videoDivDom = ui.id('thinkX_side-cameraSetup-card-video');
        }
        else if (self.camType == 'B_CAM') {
            videoDivDom = ui.id('thinkX_back-cameraSetup-card-video');
        }
        else if (self.camType == 'F_CAM') {
            videoDivDom = ui.id('thinkX_front-cameraSetup-card-video');
        }
        else if (self.camType == 'C_CAM') {
            videoDivDom = ui.id('thinkX_popup-additional-cameraSetup-card-video');
        }
        else {
            videoDivDom = ui.id('thinkX_cameraSetup-card-video');
        }
        const video = ui.createVideoElement();
        video.srcObject = stream;
        video.muted = true;
        if (videoDivDom) {
            const existingVideos = videoDivDom.querySelectorAll('video');
            existingVideos.forEach((v) => v.remove());
        }
        videoDivDom?.append(video);
        return video;
    }
    waitForPosition(video) {
        return new Promise((resolve) => {
            ai.secondaryCameraPosition(video, this.camType, (message) => {
                utility.log(message, 'position_ai');
                this.modeSelector('camera_setup_instruction', message, this.camType);
                if (message.status_code === 155 || this.flag) {
                    this.validPositionCount++;
                    if (this.validPositionCount > 2 || this.flag) {
                        ai.stopSecondaryCameraPosition((msg) => utility.log(msg, 'stop_secondary_camera_position'));
                        resolve(message.status_code); // Resolve when 155 is detected
                    }
                }
                else {
                    this.validPositionCount = 0;
                }
            });
        });
    }
    waitForValidation(video) {
        return new Promise((resolve) => {
            ai.secondaryCameraPositionValidate(video, (message) => {
                utility.log(message, 'validate_ai');
                this.modeSelector('camera_setup_validate', message, this.camType);
                let valid_code = 0;
                if (this.camType == 'S_CAM') {
                    valid_code = 169;
                }
                else if (this.camType == 'B_CAM') {
                    valid_code = 171;
                }
                else if (this.camType == 'F_CAM') {
                    valid_code = 170;
                }
                if (message.status_code === valid_code || this.flag) {
                    this.completeCameraSetup(true, this.camType);
                    ai.stopSecondaryCameraPositionValidate((msg) => utility.log(msg, 'stop_secondary_camera_position_validate'));
                    video.pause();
                    resolve(message); // Resolve on success
                }
                else {
                    this.modeSelector('camera_setup_instruction', message, this.camType);
                }
            });
        });
    }
    modeSelector(mode, message, cameraName) {
        switch (mode) {
            case 'camera_setup_greenTick':
                this.completeCameraSetup(false, cameraName);
                break;
            case 'camera_setup_instruction':
                this.showCameraSetupInstructions(message, cameraName);
                break;
            case 'camera_setup_validate':
                this.showCameraSetupValidation(message, cameraName);
                break;
            case 'cam_setup_audioText':
                this.showOverlayMessage(message.text || '', cameraName);
                break;
            case 'additional_camera_dismiss':
                this.additionalCameraDismiss = true;
                break;
            default:
                console.log('Unknown mode:', mode);
        }
    }
    completeCameraSetup(log = true, cameraName) {
        if (cameraName == 'S_CAM') {
            ui.show(ui.id('thinkX_side_camera_setup_success'));
            ui.hide(ui.id('thinkX_side_videoOverlayMsg_cameraSetup'));
        }
        else if (cameraName == 'B_CAM') {
            ui.show(ui.id('thinkX_back_camera_setup_success'));
            ui.hide(ui.id('thinkX_back_videoOverlayMsg_cameraSetup'));
        }
        else if (cameraName == 'F_CAM') {
            ui.show(ui.id('thinkX_front_camera_setup_success'));
            ui.hide(ui.id('thinkX_front_videoOverlayMsg_cameraSetup'));
        }
        else if (cameraName == 'C_CAM') {
            ui.show(ui.id('thinkX_additional_camera_setup_success'));
            ui.hide(ui.id('thinkX_additional_videoOverlayMsg_cameraSetup'));
            ui.hide(ui.id('thinkX_additional_cameraSetup_box'));
        }
        ui.textColor(ui.id('thinkX_popup_cameraSetupFinish'), 'black');
        utility.wait(1000).then(() => {
            if (cameraName == 'S_CAM') {
                ui.hide(ui.id('thinkX_exam_side_camera_setup_popup')); // hide side main container
                ui.hide(ui.id('thinkX_side_camera_setup_success'));
            }
            else if (cameraName == 'B_CAM') {
                ui.hide(ui.id('thinkX_exam_back_camera_setup_popup')); // hide  back main container
                ui.hide(ui.id('thinkX_back_camera_setup_success'));
            }
            else if (cameraName == 'F_CAM') {
                ui.hide(ui.id('thinkX_exam_front_camera_setup_popup')); // hide front main container
                ui.hide(ui.id('thinkX_front_camera_setup_success'));
            }
            else if (cameraName == 'C_CAM') {
                ui.hide(ui.id('thinkX_exam_additional_camera_setup_popup')); // hide additional main container
                ui.hide(ui.id('thinkX_additional_camera_setup_success'));
            }
            //this.end(0, false, log);
            this.startInternalCamSnapAndRecording(cameraName);
            let camName = this.getRevokeCameraName();
            if (camName != '' && configrationManager.currentStepObject) {
                configrationManager.reCameraRevoke = camName;
                configrationManager.currentStepObject.cameraRevoke();
            }
            else {
                utility.log('start_monitor_ai all cameras are set');
                chat.sendData('start_monitor_ai', 'start monitor ai');
                this.primaryCameraAiMonitoring();
            }
            //chat.sendData('cam_reconnect', 'camera reconnect');
            monitorUi.hideCameraDisconnectIcon("C_CAM");
            this.updateStream();
        });
    }
    updateStream() {
        let streamInfo = liveStreamManager.getAllStreamsId();
        chat.sendData('stream_update', streamInfo);
        utility.wait(2000).then(() => {
            peer.streamAddAll(LiveStreamManager.CAMERA.PRIMARY, LiveStreamManager.CAMERA.CUSTOM, LiveStreamManager.AUDIO.PRIMARY);
        });
    }
    getRevokeCameraName() {
        const sideStream = LiveStreamManager.CAMERA.SIDE.stream;
        const backStream = LiveStreamManager.CAMERA.BACK.stream;
        const frontStream = LiveStreamManager.CAMERA.FRONT.stream;
        const customStream = LiveStreamManager.CAMERA.CUSTOM.stream;
        const sideEnable = configrationManager.valueMap.additional_cam.data.ai_enable.data.ai_side_view_cam;
        const backEnable = configrationManager.valueMap.additional_cam.data.ai_enable.data.ai_back_view_cam;
        const frontEnable = configrationManager.valueMap.additional_cam.data.ai_enable.data.ai_front_view_cam;
        const customEnable = configrationManager.valueMap.additional_cam.data.live_custom_cam.value;
        if (!sideStream && sideEnable) {
            return 'SIDE';
        }
        else if (!backStream && backEnable) {
            return 'BACK';
        }
        else if (!frontStream && frontEnable) {
            return 'FRONT';
        }
        else if (!customStream && customEnable) {
            return 'CUSTOM';
        }
        else {
            return '';
        }
    }
    showCameraSetupInstructions(message, cameraName) {
        if (this.preAiStatusResponse !== message.status_code) {
            let instructionMsg = '';
            let uniqueKey = '';
            this.preAiStatusResponse = message.status_code;
            if (message.status_code == 155) {
                if (this.validPositionCount == 0) {
                    instructionMsg = ui.translations.cameraSetup.valid_position_hold;
                    uniqueKey = 'cameraSetup.valid_position_hold';
                }
                else {
                    instructionMsg = ui.translations.cameraSetup.valid_position;
                    uniqueKey = 'cameraSetup.valid_position';
                }
            }
            else if (message.status_code == 156) {
                instructionMsg = ui.translations.cameraSetup.go_closer;
                uniqueKey = 'cameraSetup.go_closer';
            }
            else if (message.status_code == 157) {
                instructionMsg = ui.translations.cameraSetup.get_away;
                uniqueKey = 'cameraSetup.get_away';
            }
            else if (message.status_code == 158) {
                instructionMsg = ui.translations.cameraSetup.move_left;
                uniqueKey = 'cameraSetup.move_left';
            }
            else if (message.status_code == 159) {
                instructionMsg = ui.translations.cameraSetup.move_right;
                uniqueKey = 'cameraSetup.move_right';
            }
            else if (message.status_code == 160) {
                instructionMsg = ui.translations.cameraSetup.move_up;
                uniqueKey = 'cameraSetup.move_up';
            }
            else if (message.status_code == 161) {
                instructionMsg = ui.translations.cameraSetup.move_down;
                uniqueKey = 'cameraSetup.move_down';
            }
            else if (message.status_code == 162) {
                instructionMsg = ui.translations.cameraSetup.violation;
                uniqueKey = 'cameraSetup.violation';
            }
            else if (message.status_code == 166) {
                instructionMsg = ui.translations.cameraSetup.invalid_position;
                uniqueKey = 'cameraSetup.invalid_position';
            }
            else if (message.status_code == 167) {
                instructionMsg = ui.translations.cameraSetup.no_person_detected;
                uniqueKey = 'cameraSetup.no_person_detected';
            }
            else if (message.status_code == 168) {
                instructionMsg = ui.translations.cameraSetup.no_laptop_detected;
                uniqueKey = 'cameraSetup.no_laptop_detected';
            }
            else if (message.status_code == 163) {
                instructionMsg = ui.translations.cameraSetup.stop_position;
                uniqueKey = 'cameraSetup.stop_position';
            }
            if (instructionMsg) {
                let Element = null;
                if (cameraName == 'S_CAM') {
                    Element = ui.id('thinkX_side_videoOverlayMsg_cameraSetup');
                }
                else if (cameraName == 'B_CAM') {
                    Element = ui.id('thinkX_back_videoOverlayMsg_cameraSetup');
                }
                else if (cameraName == 'F_CAM') {
                    Element = ui.id('thinkX_front_videoOverlayMsg_cameraSetup');
                }
                if (Element) {
                    ui.innerText(Element, instructionMsg);
                }
                utility.log('Camera Setup Instruction:', message.status_code);
                this.showTextAndAudio(instructionMsg, true, this.socketuserID, 'cam_setup_audioText', uniqueKey);
            }
        }
    }
    showCameraSetupValidation(message, cameraName) {
        if (this.preAiStatusResponse !== message.status_code) {
            this.preAiStatusResponse = message.status_code;
            let validationMsg = '';
            let uniqueKey = '';
            if (message.status_code == 170) {
                validationMsg = ui.translations.cameraSetup.validate_success;
                uniqueKey = 'cameraSetup.validate_success';
            }
            else if (message.status_code == 172) {
                validationMsg = ui.translations.cameraSetup.multiple_object_detected;
                uniqueKey = 'cameraSetup.multiple_object_detected';
            }
            else if (message.status_code == 173) {
                validationMsg = ui.translations.cameraSetup.not_screen_person;
                uniqueKey = 'cameraSetup.not_screen_person';
            }
            if (validationMsg) {
                let Element = null;
                if (cameraName == 'S_CAM') {
                    Element = ui.id('thinkX_side_videoOverlayMsg_cameraSetup');
                }
                else if (cameraName == 'B_CAM') {
                    Element = ui.id('thinkX_back_videoOverlayMsg_cameraSetup');
                }
                else if (cameraName == 'F_CAM') {
                    Element = ui.id('thinkX_front_videoOverlayMsg_cameraSetup');
                }
                if (Element) {
                    ui.innerText(Element, validationMsg);
                }
                this.showTextAndAudio(validationMsg, true, this.socketuserID, 'cam_setup_audioText', uniqueKey);
            }
        }
    }
    showLoader() {
        const loaderHTML = UiComponents.loading();
        let Element = '';
        if (this.camType == 'S_CAM') {
            Element = 'thinkX_side_popup_qrCode';
        }
        else if (this.camType == 'B_CAM') {
            Element = 'thinkX_back_popup_qrCode';
        }
        else if (this.camType == 'F_CAM') {
            Element = 'thinkX_front_popup_qrCode';
        }
        else if (this.camType == 'C_CAM') {
            Element = 'thinkX_front_popup_qrCode';
        }
        stepUIManager.setGif(loaderHTML, Element);
    }
    hideLoader() {
        const existingLoader = ui.id('thinkX_loading');
        if (existingLoader && existingLoader.parentNode) {
            existingLoader.parentNode.removeChild(existingLoader);
        }
    }
    hideCameraSelectPage(camType) {
        if (camType == 'S_CAM') {
            ui.hide(ui.id('thinkX_side_qr_popup_dropdown')); // hide QR code img Page
            ui.show(ui.id('thinkX_side_cameraSetup_box')); //open camera frame page
        }
        else if (camType == 'B_CAM') {
            ui.hide(ui.id('thinkX_back_qr_popup_dropdown'));
            ui.show(ui.id('thinkX_back_cameraSetup_box'));
        }
        else if (camType == 'F_CAM') {
            ui.hide(ui.id('thinkX_front_qr_popup_dropdown'));
            ui.show(ui.id('thinkX_front_cameraSetup_box'));
        }
        else if (camType == 'C_CAM') {
            ui.hide(ui.id('thinkX_additional_qr_popup_dropdown'));
            ui.show(ui.id('thinkX_additional_cameraSetup_box'));
        }
    }
    hideCameraStreamPage(camType) {
        if (camType == 'S_CAM') {
            ui.show(ui.id('thinkX_side_qr_popup_dropdown')); // show QR code img Page
            ui.hide(ui.id('thinkX_side_cameraSetup_box')); //hide camera frame page
        }
        else if (camType == 'B_CAM') {
            ui.show(ui.id('thinkX_back_qr_popup_dropdown'));
            ui.hide(ui.id('thinkX_back_cameraSetup_box'));
        }
        else if (camType == 'F_CAM') {
            ui.show(ui.id('thinkX_front_qr_popup_dropdown'));
            ui.hide(ui.id('thinkX_front_cameraSetup_box'));
        }
        else if (camType == 'C_CAM') {
            ui.show(ui.id('thinkX_additional_qr_popup_dropdown'));
            ui.hide(ui.id('thinkX_additional_cameraSetup_box'));
        }
    }
    async cameraSetupStart(callback, cameraID = '', camType = 'S_CAM') {
        if (!cameraID && LiveStreamManager.PRIMARY_CAMERA_NAME === 'P_CAM') {
            utility.log('No camera selected.');
            return;
        }
        if (LiveStreamManager.PRIMARY_CAMERA_NAME === 'P_CAM') {
            try {
                const isValid = await liveStreamManager.isValidDeviceId(cameraID, 'videoinput');
                utility.log('camera revoke', isValid);
                if (!isValid)
                    return;
                let cameraRef;
                switch (camType) {
                    case 'S_CAM':
                        cameraRef = LiveStreamManager.CAMERA.SIDE;
                        break;
                    case 'B_CAM':
                        cameraRef = LiveStreamManager.CAMERA.BACK;
                        break;
                    case 'F_CAM':
                        cameraRef = LiveStreamManager.CAMERA.FRONT;
                        break;
                    case 'C_CAM':
                        cameraRef = LiveStreamManager.CAMERA.CUSTOM;
                        break;
                    default:
                        cameraRef = LiveStreamManager.CAMERA.PRIMARY;
                }
                if (cameraRef.stream) {
                    cameraRef.stream.getTracks().forEach((track) => track.stop());
                }
                liveStreamManager.setCameraDeviceId(cameraRef, cameraID);
                cameraRef.label = cameraID;
                const stream = await liveStreamManager.requestVideo(cameraRef);
                if (!stream) {
                    utility.log('Could not get stream for selected camera.');
                    alert('Could not get stream for selected camera.');
                    return;
                }
                cameraRef.stream = stream.stream;
                callback(stream.stream);
            }
            catch (err) {
                utility.log('Error during camera setup:', err);
            }
        }
    }
    showTextAndAudio(text, audio = true, socketuserID = '', modeSend = '', uniqueKey = '', direct = 0) {
        this.clearOverlayMessage();
        utility.log('CAMERA SETUP :', text);
        this.showOverlayMessage(text, this.camType);
        if (LiveStreamManager.PRIMARY_CAMERA_NAME != 'P_CAM') {
            let message = { mode: modeSend, text: text };
            socket.sendMessage(socketuserID, message);
        }
        if (audio) {
            textToSpeech
                .getVoiceFromAPI(text, ui.translations.language_code.code, uniqueKey, direct)
                .then(async (audio) => {
                audio.onended = function () {
                    audio.pause();
                };
                await audio.play();
            })
                .catch((error) => {
                utility.error('Error getting voice from API or playing audio:', error);
            });
        }
    }
    clearOverlayMessage() {
        let existing = null;
        if (this.camType == 'S_CAM') {
            existing = ui.id('thinkX_side_videoOverlayMsg_cameraSetup');
        }
        else if (this.camType == 'B_CAM') {
            existing = ui.id('thinkX_back_videoOverlayMsg_cameraSetup');
        }
        else if (this.camType == 'F_CAM') {
            existing = ui.id('thinkX_front_videoOverlayMsg_cameraSetup');
        }
        else if (this.camType == 'C_CAM') {
            existing = ui.id('thinkX_additional_videoOverlayMsg_cameraSetup');
        }
        if (existing)
            existing.remove();
    }
    showOverlayMessage(message, cameraName) {
        let container = null;
        if (cameraName == 'S_CAM') {
            container = ui.id('thinkX_side-cameraSetup-card-video');
        }
        else if (cameraName == 'B_CAM') {
            container = ui.id('thinkX_back-cameraSetup-card-video');
        }
        else if (cameraName == 'F_CAM') {
            container = ui.id('thinkX_front-cameraSetup-card-video');
        }
        else if (cameraName == 'C_CAM') {
            container = ui.id('thinkX_popup-additional-cameraSetup-card-video');
        }
        if (!container)
            return;
        const existing = container.querySelector('.thinkproc_side_camera_view_message');
        if (existing)
            existing.remove();
        const overlayWrapper = document.createElement('div');
        overlayWrapper.className = 'thinkproc_side_camera_view_message';
        const span = document.createElement('span');
        if (cameraName == 'S_CAM') {
            span.id = 'thinkX_side_videoOverlayMsg_cameraSetup';
        }
        else if (cameraName == 'B_CAM') {
            span.id = 'thinkX_back_videoOverlayMsg_cameraSetup';
        }
        else if (cameraName == 'F_CAM') {
            span.id = 'thinkX_front_videoOverlayMsg_cameraSetup';
        }
        else if (cameraName == 'C_CAM') {
            span.id = 'thinkX_additional_videoOverlayMsg_cameraSetup';
        }
        span.textContent = message;
        overlayWrapper.appendChild(span);
        container.appendChild(overlayWrapper);
    }
    getCameraKeyName() {
        if (this.camType == 'S_CAM') {
            return 'SIDE';
        }
        else if (this.camType == 'B_CAM') {
            return 'BACK';
        }
        else if (this.camType == 'F_CAM') {
            return 'FRONT';
        }
        else if (this.camType == 'C_CAM') {
            return 'CUSTOM';
        }
        else {
            return '';
        }
    }
    retryHeadingName() {
        if (this.additionalCameraDismiss === true) {
            // flag true means camera dismissed
            if (this.camType == 'S_CAM') {
                return 'additionalSideCameraDismiss';
            }
            else if (this.camType == 'B_CAM') {
                return 'additionalBackCameraDismiss';
            }
            else if (this.camType == 'F_CAM') {
                return 'additionalFrontCameraDismiss';
            }
            else {
                return 'additionalCameraDismiss';
            }
        }
        else {
            if (this.camType == 'S_CAM') {
                return 'additionalSideCameraDisconnect';
            }
            else if (this.camType == 'B_CAM') {
                return 'additionalBackCameraDisconnect';
            }
            else if (this.camType == 'F_CAM') {
                return 'additionalFrontCameraDisconnect';
            }
            else {
                return 'additionalCameraDisconnect';
            }
        }
    }
    retryMessageName() {
        if (this.additionalCameraDismiss == true) {
            this.additionalCameraDismiss = false; //flag false after use
            return 'cameraDismissed'; //camera dismissed
        }
        else {
            return 'cameraDisconnected';
        }
    }
    checkExternalCamStream() {
        let sideStream = LiveStreamManager.CAMERA.SIDE.stream;
        let backStream = LiveStreamManager.CAMERA.BACK.stream;
        let frontStream = LiveStreamManager.CAMERA.FRONT.stream;
        let customStream = LiveStreamManager.CAMERA.CUSTOM.stream;
        const sideEnable = configrationManager.valueMap.additional_cam.data.ai_enable.data.ai_side_view_cam;
        const backEnable = configrationManager.valueMap.additional_cam.data.ai_enable.data.ai_back_view_cam;
        const frontEnable = configrationManager.valueMap.additional_cam.data.ai_enable.data.ai_front_view_cam;
        const customEnable = configrationManager.valueMap.additional_cam.data.live_custom_cam.value;
        if (!sideStream?.active && sideEnable) {
            return 'SIDE';
        }
        else if (!backStream?.active && backEnable) {
            return 'BACK';
        }
        else if (!frontStream?.active && frontEnable) {
            return 'FRONT';
        }
        else if (!customStream?.active && customEnable) {
            return 'CUSTOM';
        }
        else {
            return '';
        }
    }
    getQrStepName() {
        let alias = '';
        if (this.camType == 'S_CAM') {
            alias = 'Side_Camera';
        }
        else if (this.camType == 'B_CAM') {
            alias = 'Back_Camera';
        }
        else if (this.camType == 'F_CAM') {
            alias = 'Front_Camera';
        }
        else if (this.camType == 'C_CAM') {
            alias = 'Custom_Camera';
        }
        return alias;
    }
    startInternalCamMonitering(cameraName) {
        let cameraEnable = 0;
        let stream = null;
        if (cameraName == 'S_CAM') {
            stream = LiveStreamManager.CAMERA.SIDE.stream;
            cameraEnable =
                configrationManager.valueMap.additional_cam.data.ai_enable.data.ai_side_view_cam;
            if (stream != null && LiveStreamManager.CAMERA.SIDE.external === false && cameraEnable) {
                this.startSnapAndRecording(cameraName);
                this.sideCamAiMonitering();
            }
        }
        else if (cameraName == 'B_CAM') {
            stream = LiveStreamManager.CAMERA.BACK.stream;
            cameraEnable =
                configrationManager.valueMap.additional_cam.data.ai_enable.data.ai_back_view_cam;
            if (stream != null && LiveStreamManager.CAMERA.BACK.external === false && cameraEnable) {
                this.startSnapAndRecording(cameraName);
                this.backCamAiMonitering();
            }
        }
        else if (cameraName == 'F_CAM') {
            stream = LiveStreamManager.CAMERA.FRONT.stream;
            cameraEnable =
                configrationManager.valueMap.additional_cam.data.ai_enable.data.ai_front_view_cam;
            if (stream != null && LiveStreamManager.CAMERA.FRONT.external === false && cameraEnable) {
                this.startSnapAndRecording(cameraName);
                this.frontCamAiMonitering();
            }
        }
        else if (cameraName == 'C_CAM') {
            stream = LiveStreamManager.CAMERA.CUSTOM.stream;
            cameraEnable =
                configrationManager.valueMap.additional_cam.data.live_custom_cam.value;
            if (stream != null && LiveStreamManager.CAMERA.CUSTOM.external === false && cameraEnable) {
                this.startSnapAndRecording(cameraName);
            }
        }
    }
    externalCameraMonitoring() {
        if (LiveStreamManager.PRIMARY_CAMERA_NAME == 'S_CAM') {
            this.sideCamAiMonitering();
        }
        else if (LiveStreamManager.PRIMARY_CAMERA_NAME == 'B_CAM') {
            this.backCamAiMonitering();
        }
        else if (LiveStreamManager.PRIMARY_CAMERA_NAME == 'F_CAM') {
            this.frontCamAiMonitering();
        }
    }
    startSnapAndRecording(cameraName) {
        let key = '';
        if (cameraName == 'S_CAM') {
            key = 'SIDE';
        }
        else if (cameraName == 'B_CAM') {
            key = 'BACK';
        }
        else if (cameraName == 'F_CAM') {
            key = 'FRONT';
        }
        else if (cameraName == 'C_CAM') {
            key = 'CUSTOM';
        }
        else {
            key = 'PRIMARY';
        }
        // if (configrationManager.image_recording == 1) {
        //   regularSnap.takeSnapImage(LiveStreamManager.CAMERA[key]);
        // }
        if (configrationManager.video_recording == 1) {
            liveStreamManager.record(LiveStreamManager.CAMERA[key]);
        }
    }
    uniqueUfmObject(camType) {
        const data = configrationManager.valueMap.ufm.data;
        if (camType == 'SIDE') {
            const keys = this.ufmSide.ALL_UFM;
            for (const key of keys) {
                if (data[key]?.value == 1) {
                    this.ufmSide[key] = true;
                }
            }
            this.ufmSide.CHAIR = 100;
            this.ufmSide.PHONE = 2;
            this.ufmSide.FM = false;
        }
        else if (camType == 'BACK') {
            const keys = this.ufmBack.ALL_UFM;
            for (const key of keys) {
                if (data[key]?.value == 1) {
                    this.ufmBack[key] = true;
                }
            }
            this.ufmBack.CHAIR = 100;
            this.ufmBack.PHONE = 2;
            this.ufmBack.FM = false;
        }
        else if (camType == 'FRONT') {
            const keys = this.ufmFront.ALL_UFM;
            for (const key of keys) {
                if (data[key]?.value == 1) {
                    this.ufmFront[key] = true;
                }
            }
            this.ufmFront.CHAIR = 100;
            this.ufmFront.PHONE = 2;
            this.ufmFront.FM = false;
        }
        else {
            const keys = this.ufm.ALL_UFM;
            for (const key of keys) {
                utility.log(key, data[key]?.value);
                if (data[key]?.value == 1) {
                    this.ufm[key] = true;
                }
            }
            this.ufm.CHAIR = 100;
        }
    }
    async sideCamAiMonitering() {
        return new Promise((resolve) => {
            this.uniqueUfmObject('SIDE');
            const stream = LiveStreamManager.CAMERA.SIDE.stream;
            if (stream) {
                const video = this.setStream(stream);
                video.play();
                let lastCode = null;
                let repeatCount = 0;
                utility.log('Starting monitering AI for side camera');
                ai.secondaryCameraSideMonitoring(video, (message, image) => {
                    utility.log(message, 'Side monitering AI');
                    let code = message.status_code;
                    if (code == 180) {
                        code = 168; // treat no laptop/monitor detected same
                    }
                    // ---- Check for repeat codes ----
                    if (code === lastCode) {
                        repeatCount++;
                    }
                    else {
                        repeatCount = 1; // reset
                        lastCode = code;
                    }
                    if (code == 168) { // no laptop detected
                        //this.speakAI(message);
                        if (repeatCount >= 5) {
                            this.cameraReSetup('SIDE');
                            repeatCount = 0; // reset after action
                            lastCode = null;
                        }
                    }
                    else if (code === 165 || code === 166 || code === 167) {
                        this.logUfmData(message, image, 'S_CAM');
                    }
                });
            }
        });
    }
    async backCamAiMonitering() {
        return new Promise((resolve) => {
            this.uniqueUfmObject('BACK');
            const stream = LiveStreamManager.CAMERA.BACK.stream;
            if (stream) {
                const video = this.setStream(stream);
                video.play();
                let lastCode = null;
                let repeatCount = 0;
                utility.log('Starting monitering AI for Back camera');
                ai.secondaryCameraBackMonitoring(video, (message, image) => {
                    utility.log(message, 'Back monitering AI');
                    let code = message.status_code;
                    if (code == 180) {
                        code = 168; // treat no laptop/monitor detected same
                    }
                    // ---- Check for repeat codes ----
                    if (code === lastCode) {
                        repeatCount++;
                    }
                    else {
                        repeatCount = 1;
                        lastCode = code;
                    }
                    if (code == 168) { // no laptop detected
                        //this.speakAI(message);
                        if (repeatCount >= 5) {
                            this.cameraReSetup('BACK');
                            repeatCount = 0;
                            lastCode = null;
                        }
                    }
                    else if (code === 165 || code === 166 || code === 167) {
                        this.logUfmData(message, image, 'B_CAM');
                    }
                });
            }
        });
    }
    async frontCamAiMonitering() {
        return new Promise((resolve) => {
            this.uniqueUfmObject('FRONT');
            const stream = LiveStreamManager.CAMERA.FRONT.stream;
            if (stream) {
                const video = this.setStream(stream);
                video.play();
                let lastCode = null;
                let repeatCount = 0;
                utility.log('Starting monitering AI for Front camera');
                ai.secondaryCameraFrontMonitoring(video, (message, image) => {
                    utility.log(message, 'Front monitering AI');
                    let code = message.status_code;
                    if (code == 180) {
                        code = 168; // treat no laptop/monitor detected same
                    }
                    // ---- Check for repeat codes ----
                    if (code === lastCode) {
                        repeatCount++;
                    }
                    else {
                        repeatCount = 1; // reset
                        lastCode = code;
                    }
                    if (
                    // code == 156 ||
                    // code == 157 ||
                    // code == 158 ||
                    // code == 159 ||
                    // code == 160 ||
                    // code == 161 ||
                    code == 168) {
                        //this.speakAI(message);
                        if (repeatCount >= 5) {
                            this.cameraReSetup('FRONT');
                            repeatCount = 0; // reset after action
                            lastCode = null;
                        }
                        //Go closer, Get away, Move left, Move right, Move up, Move down,
                        // no laptop detected
                    }
                    else if (code === 165 || code === 166 || code === 167) {
                        this.logUfmData(message, image, 'F_CAM');
                    }
                });
            }
        });
    }
    speakAI(message) {
        let instructionMsg1 = message.message + ' ' + JSON.stringify(message.detections);
        this.showTextAndAudio(instructionMsg1, true, this.socketuserID, 'cam_setup_audioText');
    }
    async logUfmData(message, image, cameraName) {
        //165 - secondary camera monitoring violation: invalid object(s) detected
        //166 - violation: invalid position
        //167 - no person detected
        //  let instructionMsg2 = message.message + ' ' + JSON.stringify(message.detections);
        //  this.showTextAndAudio(instructionMsg2, true, this.socketuserID, 'cam_setup_audioText');
        image = await utility.convertBase64PngToCompressedBase64Jpg(image);
        const imageBlob = utility.base64ToBlob(image);
        if (cameraName == 'S_CAM') {
            this.ufmSide.log(message.detections, this.envAlias, 1, cameraName, imageBlob, message.status_code);
        }
        else if (cameraName == 'B_CAM') {
            this.ufmBack.log(message.detections, this.envAlias, 1, cameraName, imageBlob, message.status_code);
        }
        else if (cameraName == 'F_CAM') {
            this.ufmFront.log(message.detections, this.envAlias, 1, cameraName, imageBlob, message.status_code);
        }
    }
    cameraReSetup(CAM_KEY) {
        if (configrationManager.currentStepObject) {
            if (LiveStreamManager.PRIMARY_CAMERA_NAME == 'P_CAM') {
                this.additionalCameraDismiss = true;
                LiveStreamManager.CAMERA[CAM_KEY].stream = null;
                configrationManager.currentStepObject.cameraRevoke();
            }
            else {
                let message = { mode: 'additional_camera_dismiss', text: 'additional camera dismiss' };
                socket.sendMessage(this.socketuserID, message);
                stepUIManager.closeApplicationUI();
            }
        }
    }
    stopSnap(camType) {
        if (configrationManager.image_recording == 1) {
            if (camType == 'all') {
                regularSnap.stopRegularSnapForCamera(LiveStreamManager.CAMERA.PRIMARY.name);
                regularSnap.stopRegularSnapForCamera(LiveStreamManager.CAMERA.SIDE.name);
                regularSnap.stopRegularSnapForCamera(LiveStreamManager.CAMERA.BACK.name);
                regularSnap.stopRegularSnapForCamera(LiveStreamManager.CAMERA.FRONT.name);
            }
            else {
                if (camType == 'P_CAM') {
                    regularSnap.stopRegularSnapForCamera(LiveStreamManager.CAMERA.PRIMARY.name);
                }
                if (camType == 'S_CAM') {
                    regularSnap.stopRegularSnapForCamera(LiveStreamManager.CAMERA.SIDE.name);
                }
                if (camType == 'B_CAM') {
                    regularSnap.stopRegularSnapForCamera(LiveStreamManager.CAMERA.BACK.name);
                }
                if (camType == 'F_CAM') {
                    regularSnap.stopRegularSnapForCamera(LiveStreamManager.CAMERA.FRONT.name);
                }
                if (camType == 'C_CAM') {
                    regularSnap.stopRegularSnapForCamera(LiveStreamManager.CAMERA.CUSTOM.name);
                }
            }
        }
    }
    stopRecording(camType) {
        if (configrationManager.video_recording == 1 && this.recordingCamStarted == true) {
            if (camType == 'all') {
                liveStreamManager.stopRecord(LiveStreamManager.CAMERA.PRIMARY);
                liveStreamManager.stopRecord(LiveStreamManager.CAMERA.SIDE);
                liveStreamManager.stopRecord(LiveStreamManager.CAMERA.BACK);
                liveStreamManager.stopRecord(LiveStreamManager.CAMERA.FRONT);
                liveStreamManager.stopRecord(LiveStreamManager.CAMERA.CUSTOM);
                liveStreamManager.stopRecord(LiveStreamManager.CAMERA.SCREEN);
            }
            else {
                if (camType == 'P_CAM') {
                    liveStreamManager.stopRecord(LiveStreamManager.CAMERA.PRIMARY);
                }
                if (camType == 'S_CAM') {
                    liveStreamManager.stopRecord(LiveStreamManager.CAMERA.SIDE);
                }
                if (camType == 'B_CAM') {
                    liveStreamManager.stopRecord(LiveStreamManager.CAMERA.BACK);
                }
                if (camType == 'F_CAM') {
                    liveStreamManager.stopRecord(LiveStreamManager.CAMERA.FRONT);
                }
                if (camType == 'C_CAM') {
                    liveStreamManager.stopRecord(LiveStreamManager.CAMERA.CUSTOM);
                }
                if (camType == 'SR_CAM') {
                    liveStreamManager.stopRecord(LiveStreamManager.CAMERA.SCREEN);
                }
                this.recordingCamStarted = false;
            }
        }
    }
    stopAiMonitoring() {
        ai.stopSecondaryCameraSideMonitoring((msg) => utility.log(msg, 'stop_side_Monitoring AI'));
        ai.stopSecondaryCameraBackMonitoring((msg) => utility.log(msg, 'stop_back_Monitoring AI'));
        ai.stopSecondaryCameraFrontMonitoring((msg) => utility.log(msg, 'stop_front_Monitoring AI'));
        ai.stopExamination((msg) => utility.log(msg, 'stop_examination_Monitoring AI'));
        this.stopAllUfm();
    }
    stopAllUfm() {
        utility.wait(1000).then(() => {
            configrationManager.valueMap.ufm.data;
            const keys = this.ufm.ALL_UFM;
            for (const key of keys) {
                this.ufm[key] = false;
                this.ufmSide[key] = false;
                this.ufmBack[key] = false;
                this.ufmFront[key] = false;
                utility.log(key, this.ufm[key]);
            }
        });
    }
    // Play/restart all UFM features based on config values
    playAllUfm() {
        if (this.isExamPaused == true) {
            return;
        }
        const data = configrationManager.valueMap.ufm.data;
        const keys = this.ufm.ALL_UFM;
        for (const key of keys) {
            if (data[key]?.value === 1) {
                this.ufm[key] = true; // 👈 bypasses TypeScript checks
                this.ufmSide[key] = true;
                this.ufmBack[key] = true;
                this.ufmFront[key] = true;
                utility.log(key, this.ufm[key]);
            }
        }
    }
    startInternalCamAI() {
        let cameraEnable = 0;
        cameraEnable = configrationManager.valueMap.additional_cam.data.ai_enable.data.ai_side_view_cam;
        if (LiveStreamManager.CAMERA.SIDE.external === false && cameraEnable) {
            this.sideCamAiMonitering();
        }
        cameraEnable = configrationManager.valueMap.additional_cam.data.ai_enable.data.ai_back_view_cam;
        if (LiveStreamManager.CAMERA.BACK.external === false && cameraEnable) {
            this.backCamAiMonitering();
        }
        cameraEnable = configrationManager.valueMap.additional_cam.data.ai_enable.data.ai_front_view_cam;
        if (LiveStreamManager.CAMERA.FRONT.external === false && cameraEnable) {
            this.frontCamAiMonitering();
        }
    }
    startExternalSnapAndRecording() {
        let key = '';
        if (LiveStreamManager.PRIMARY_CAMERA_NAME == 'S_CAM') {
            key = 'SIDE';
        }
        else if (LiveStreamManager.PRIMARY_CAMERA_NAME == 'B_CAM') {
            key = 'BACK';
        }
        else if (LiveStreamManager.PRIMARY_CAMERA_NAME == 'F_CAM') {
            key = 'FRONT';
        }
        else if (LiveStreamManager.PRIMARY_CAMERA_NAME == 'C_CAM') {
            key = 'CUSTOM';
        }
        else {
            key = 'PRIMARY';
        }
        if (configrationManager.image_recording == 1) {
            regularSnap.takeSnapImage(LiveStreamManager.CAMERA[key]);
        }
        if (configrationManager.video_recording == 1) {
            liveStreamManager.record(LiveStreamManager.CAMERA[key]);
        }
    }
    startInternalCamSnapAndRecording(cameraName) {
        let cameraEnable = 0;
        if (cameraName == 'S_CAM') {
            cameraEnable =
                configrationManager.valueMap.additional_cam.data.ai_enable.data.ai_side_view_cam;
            if (LiveStreamManager.CAMERA.SIDE.external === false && cameraEnable) {
                this.startSnapAndRecording(cameraName);
            }
        }
        else if (cameraName == 'B_CAM') {
            cameraEnable =
                configrationManager.valueMap.additional_cam.data.ai_enable.data.ai_back_view_cam;
            if (LiveStreamManager.CAMERA.BACK.external === false && cameraEnable) {
                this.startSnapAndRecording(cameraName);
            }
        }
        else if (cameraName == 'F_CAM') {
            cameraEnable =
                configrationManager.valueMap.additional_cam.data.ai_enable.data.ai_front_view_cam;
            if (LiveStreamManager.CAMERA.FRONT.external === false && cameraEnable) {
                this.startSnapAndRecording(cameraName);
            }
        }
        else if (cameraName == 'C_CAM') {
            cameraEnable =
                configrationManager.valueMap.additional_cam.data.live_custom_cam.value;
            if (LiveStreamManager.CAMERA.CUSTOM.external === false && cameraEnable) {
                this.startSnapAndRecording(cameraName);
            }
        }
    }
    async primaryCameraAiMonitoring() {
        this.uniqueUfmObject('PRIMARY');
        utility.log('Starting monitering AI for Primary camera');
        return new Promise(async (resolve) => {
            utility.log('Exam Monitor AI start');
            const stream = LiveStreamManager.CAMERA.PRIMARY.stream;
            if (stream) {
                const video = this.setStream(stream);
                video.play();
                // ai.examAI(video, async (message: any) => {
                //   utility.log(message, 'Exam Monitor AI Running...');
                //   if (message.image != '') {
                //     message.image =  await utility.convertBase64PngToCompressedBase64Jpg(message.image);
                //     const imageBlob = utility.base64ToBlob(message.image);
                //     this.ufm.log(message.od_detections, this.envAlias, 1, 'P_CAM', imageBlob, message.status_code);
                //   }
                // });
            }
        });
    }
    startStreamLoader(camType) {
        if (camType == 'S_CAM') {
            this.showLoaderwithText("thinkX_side-cameraSetup-card-video");
        }
        else if (camType == 'B_CAM') {
            this.showLoaderwithText("thinkX_back-cameraSetup-card-video");
        }
        else if (camType == 'F_CAM') {
            this.showLoaderwithText("thinkX_front-cameraSetup-card-video");
        }
        else if (camType == 'C_CAM') {
            this.showLoaderwithText("thinkX_popup-additional-cameraSetup-card-video");
        }
    }
    showLoaderwithText(id) {
        const loaderHTML = UiComponents.loadingwithtext(ui.translations.ai_label.please_wait);
        stepUIManager.setLoader(loaderHTML, id);
    }
    hideLoaderwithText() {
        const existingLoader = ui.id('thinkX_loadingwithText');
        if (existingLoader && existingLoader.parentNode) {
            existingLoader.parentNode.removeChild(existingLoader);
        }
    }
}
const examCameraUi = new ExamCameraSetupUI();

class SocketTranscript {
    socket = null;
    audioContext = null;
    workletNode = null;
    mediaSource = null;
    alreadyInitialized = false;
    isStreaming = false;
    TARGET_RATE = 16000;
    canSendAudio = true;
    backPressureStart = true;
    constructor() {
        //   this.audioContext = new AudioContext();
    }
    async start() {
        let self = this;
        if (this.isStreaming)
            return;
        this.isStreaming = true;
        this.socket = socket;
        if (this.backPressureStart == true) {
            this.backPressureStart = false;
            socket.on('stt_backpressure_pause', () => {
                console.warn("Server Backpressure: Pausing audio chunk emission.");
                this.canSendAudio = false;
            });
            // NEW HANDLER: Server told us to resume
            socket.on('stt_backpressure_resume', () => {
                console.log("Server Backpressure: Resuming audio chunk emission.");
                this.canSendAudio = true;
            });
        }
        this.canSendAudio = true;
        this.socket.emit("startTranscript", { sessionId: configrationManager.sessionIdRec, transcriptCode: configrationManager.transcriptCode });
        utility.wait(100).then(async () => {
            const stream = LiveStreamManager.AUDIO.PRIMARY.stream;
            if (!stream) {
                console.error("❌ No audio stream found.");
                return;
            }
            if (this.alreadyInitialized == false) {
                this.alreadyInitialized = true;
                this.audioContext = new AudioContext();
                this.audioContext.sampleRate;
                // Load worklet module (compiled JS)
                await this.audioContext.audioWorklet.addModule(environment.UI_BASE_URL + "pcm-processor.js");
            }
            // Create audio graph nodes
            if (this.audioContext) {
                this.mediaSource = this.audioContext.createMediaStreamSource(stream);
                this.workletNode = new AudioWorkletNode(this.audioContext, "audio-stream-processor");
                // Receive raw Float32 samples from worklet
                this.workletNode.port.onmessage = (event) => {
                    if (!this.isStreaming)
                        return;
                    // const floatData = event.data;
                    // const resampled =
                    //     inputRate === this.TARGET_RATE
                    //         ? floatData
                    //         : this.downsample(floatData, inputRate, this.TARGET_RATE);
                    // const pcm16 = this.toInt16(resampled);
                    // utility.log("",pcm16.buffer,resampled,event);
                    // Send to backend
                    if (this.isStreaming && this.canSendAudio) { // CHECK FLAG HERE
                        socket.emit('audio_chunk', { chunk: event.data });
                    }
                };
                this.mediaSource.connect(this.workletNode);
                this.registerSocketEvents();
            }
        });
        setTimeout(() => {
            self.stop();
            utility.wait(100).then(() => {
                self.start();
            });
        }, 200000);
    }
    stop() {
        if (!this.isStreaming)
            return;
        this.isStreaming = false;
        this.socket?.emit("stop_stt_stream");
        try {
            this.workletNode?.disconnect();
            this.mediaSource?.disconnect();
            // this.audioContext?.close();
        }
        catch (e) {
            console.error("Stop error:", e);
        }
        this.workletNode = null;
        this.mediaSource = null;
        // this.audioContext = null;
    }
    // --------------------------------
    // Socket Event Handlers
    // --------------------------------
    registerSocketEvents() {
        this.socket = socket;
        this.socket.on("transcription_result", (data) => {
            if (data.isFinal) {
                this.onFinal(data.text);
            }
            else {
                this.onInterim(data.text);
            }
        });
        this.socket.on("transcription_error", (msg) => {
            console.error("STT Error:", msg);
        });
        this.socket.on("disconnect", () => this.stop());
    }
    onInterim(text) { }
    onFinal(text) { }
    // --------------------------------
    // UTIL: Downsample Float32 → 16kHz
    // --------------------------------
    downsample(input, srcRate, dstRate) {
        const ratio = srcRate / dstRate;
        const length = Math.round(input.length / ratio);
        const output = new Float32Array(length);
        for (let i = 0; i < length; i++) {
            output[i] = input[Math.floor(i * ratio)];
        }
        return output;
    }
    // --------------------------------
    // UTIL: Float32 → Int16 PCM
    // --------------------------------
    toInt16(input) {
        const out = new Int16Array(input.length);
        for (let i = 0; i < input.length; i++) {
            const s = Math.max(-1, Math.min(1, input[i]));
            out[i] = s < 0 ? s * 0x8000 : s * 0x7fff;
        }
        return out;
    }
}
const socketTranscript = new SocketTranscript();

class InterviewMonitor extends StepInterface {
    envAlias = 'Interview_Session';
    interviewerStream = null;
    candidateStream = null;
    cameraRevokePopup = null;
    camType = '';
    camStore = {};
    ufm;
    aiStarted = false;
    ufmListTimeout = null;
    recordingStarted = false;
    recordingCamStarted = false;
    leaveCountdownTimer = null;
    canidateLeftTimeout = null;
    interviewerLeftTimeout = null;
    sendStreamTimeout = {};
    recordingInterval = null;
    recordingSeconds = 0;
    photoIDMatchTimeout = null;
    ufmShown;
    firstUFMLoad = false;
    counterStarted = false;
    leftSideInterviewerSet = false;
    interviewerStreamArr = {};
    muteVideo = false;
    muteAudio = false;
    isUfmOpen = false;
    isReRequestingScreen = false;
    lastScreenRequestAt = 0;
    alreadyInterviewerAttendance = {};
    originalSize = null;
    sizeCheckInterval = null;
    SIZE_THRESHOLD = 30;
    hasSflTriggered = false;
    constructor() {
        super();
        this.ufm = new Ufm();
        this.ufmShown = new Set();
        this.roomSocketmode = this.roomSocketmode.bind(this);
    }
    async getCameraStream() {
        let currentStream = null;
        if (LiveStreamManager.PRIMARY_CAMERA_NAME == 'P_CAM') {
            currentStream = await liveStreamManager.requestVideo(LiveStreamManager.CAMERA.PRIMARY);
        }
        else if (LiveStreamManager.PRIMARY_CAMERA_NAME == 'S_CAM') {
            currentStream = await liveStreamManager.requestVideo(LiveStreamManager.CAMERA.SIDE);
        }
        else if (LiveStreamManager.PRIMARY_CAMERA_NAME == 'B_CAM') {
            currentStream = await liveStreamManager.requestVideo(LiveStreamManager.CAMERA.BACK);
        }
        else if (LiveStreamManager.PRIMARY_CAMERA_NAME == 'F_CAM') {
            currentStream = await liveStreamManager.requestVideo(LiveStreamManager.CAMERA.FRONT);
        }
        else if (LiveStreamManager.PRIMARY_CAMERA_NAME == 'C_CAM') {
            currentStream = await liveStreamManager.requestVideo(LiveStreamManager.CAMERA.CUSTOM);
        }
        return currentStream?.stream || null;
    }
    async getAudioStream() {
        let currentAudioStream = await liveStreamManager.requestAudio(LiveStreamManager.AUDIO.PRIMARY);
        return currentAudioStream || null;
    }
    start() {
        // const keys = this.ufm.ALL_UFM;
        // for (const key of keys) { 
        //     (this.ufm as any)[key] = true; 
        // }
        // this.ufm.VD = false;
        // this.ufm.OD = false;
        let self = this;
        ui.show(ui.id('thinkproc_interview_lobby'));
        if (configrationManager.userType == '3') {
            monitorUi.interviewerUiViewHandle(); // show interviewer UI elements
            monitorUi.bindInterviewerUiEvents();
            // this.checkVerificationRequest();
            let msg = { mode: 'approve_candidate', text: "approve attendance" };
            stepUIManager.insertText('think_interview_waitingCandidate', ui.translations.interviewLobby.waitingCandidate);
            socket.sendRoomMessage(msg);
            chatUi.chatButton();
            this.ufmList(true);
            this.endCall();
            const camelCaseJobName = configrationManager.jobName
                .toLowerCase()
                .split(' ')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');
            stepUIManager.insertText('think_interview_designation', camelCaseJobName);
        }
        else {
            self.subscribe(SDK_EVENT.NETWORK_DISCONNECT, function () {
                self.aiStarted = false;
                examCameraUi.stopAiMonitoring();
                self.stopSizeMonitoring();
                examCameraUi.stopRecording('all');
                chat.sendData('stop_monitor_ai', 'stop monitor ai');
            });
            socketTranscript.start();
            ui.show(ui.id('thinkInterview_candidateVideoSession'));
            ui.hide(ui.id('thinkInterview_interviewerVideo'));
            ui.hide(ui.id('thinkproc-candidate-video-interview'));
            if (LiveStreamManager.PRIMARY_CAMERA_NAME == 'P_CAM') {
                examCameraUi.uniqueUfmObject('P_CAM');
                if (configrationManager.video_recording == 1 && this.recordingStarted == false) {
                    if (configrationManager.sharedScreen == 1) {
                        liveStreamManager.stopRecord(LiveStreamManager.CAMERA.SCREEN);
                        liveStreamManager.record(LiveStreamManager.CAMERA.SCREEN);
                    }
                    ui.show(ui.id('think_interview_rec'));
                    ui.show(ui.id('think_interview_rec_dot'));
                    this.startRecordingTimer();
                    this.recordingStarted = true;
                }
                chatUi.chatButton();
                this.ufmList(true);
                this.endCall();
                const camelCaseJobName = configrationManager.jobName
                    .toLowerCase()
                    .split(' ')
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ');
                stepUIManager.insertText('think_interview_designation', camelCaseJobName);
                try {
                    this.startExamWithSFL();
                }
                catch (error) {
                    utility.log("error sfl", error);
                }
            }
            else if (LiveStreamManager.PRIMARY_CAMERA_NAME == 'C_CAM') {
                ui.hide(ui.id('thinkproc_chat'));
                ui.hide(ui.id('thinkX_chatIcon'));
                ui.hide(ui.id('thinkX_compatibility_wrapper'));
                ui.hide(ui.id('thinkX_cameraSetup_box'));
                ui.show(ui.id('thinkpro_MobileViewBox'));
                //this.startCamera();
                examCameraUi.camType = LiveStreamManager.PRIMARY_CAMERA_NAME;
                const socketUserName = utility.extractPrefix(configrationManager.socketUserName, LiveStreamManager.PRIMARY_CAMERA_NAME);
                examCameraUi.socketuserID = socketUserName;
                peer.connect(socketUserName);
                if (configrationManager.video_recording == 1 && this.recordingCamStarted == false) {
                    liveStreamManager.record(LiveStreamManager.CAMERA.CUSTOM);
                    this.recordingCamStarted = true;
                }
            }
        }
        this.startCamera();
        this.subscribeSocketEvent();
        this.attendance();
    }
    endCall() {
        const button = ui.id("thinkproc-end-call-btn");
        let self = this;
        if (button) {
            ui.click(button, async () => {
                ui.show(ui.id("thinkproc-end-call-confirmation-popup"));
                const yesBtn = ui.id("thinkproc-endcall-yes-btn");
                if (yesBtn) {
                    ui.click(yesBtn, async () => {
                        ui.hide(ui.id("thinkproc-end-call-confirmation-popup"));
                        if (configrationManager.userType == '3') {
                            let msg = { mode: 'interviewer_leave', text: "interviewer leaving", data: configrationManager.currentCandidateName };
                            socket.sendRoomMessage(msg);
                        }
                        else {
                            let msg = { mode: 'candidate_leave', text: "candidate leaving" };
                            socket.sendRoomMessage(msg);
                        }
                        socketTranscript.stop();
                        // examCameraUi.stopRecording('all');
                        this.stopRecordingTimer();
                        this.aiStarted = false;
                        examCameraUi.stopAiMonitoring();
                        peer.closeAll();
                        socket.leavingSocket();
                        socket.closeSocket();
                        liveStreamManager.stopStreams();
                        ui.hide(ui.id('thinkproc_chat_popup'));
                        ui.remove(this.cameraRevokePopup);
                        ui.hide(ui.id('thinkX_exam_additional_camera_setup_popup'));
                        ui.hide(ui.id('think_interview_leave_popup'));
                        self.end(0, false, true);
                    });
                }
                const cancelBtn = ui.id("thinkproc-endcall-cancel-btn");
                if (cancelBtn) {
                    ui.click(cancelBtn, async () => {
                        ui.hide(ui.id("thinkproc-end-call-confirmation-popup"));
                    });
                }
            });
        }
    }
    subscribeSocketEvent() {
        let self = this;
        if (configrationManager.userType === '3') {
            this.leaveCandidate();
        }
        this.subscribe(SDK_EVENT.SECOND_STREAM, function (user_name, stream) {
            if (configrationManager.userType == '3' && configrationManager.interviewCandidateSocketName == user_name) { // candidate stream
                const streamId = stream.id;
                const camType = self.getCamTypeForStream(user_name, streamId);
                if (camType === "P_CAM") {
                    socketTranscript.start();
                    monitorUi.setMainStream(stream);
                    monitorUi.hideCameraDisconnectIcon("P_CAM");
                    monitorUi.hideWaitingOverlay("P_CAM");
                    stepUIManager.insertText('think_interview_waitingCandidate', ui.translations.interviewLobby.candidateLeftMeeting);
                }
                else if (camType === "C_CAM") {
                    monitorUi.setAdditionalCameraStream(stream, user_name);
                    monitorUi.hideCameraDisconnectIcon("C_CAM");
                }
            }
            else if (configrationManager.userType == '3' && user_name.includes(configrationManager.interviewCandidateSocketName)) { //addtional cams
                monitorUi.setAdditionalCameraStream(stream, user_name);
                monitorUi.hideCameraDisconnectIcon("C_CAM");
            }
            else if (configrationManager.userType == '3') { // other interviewer stream
                self.interviewerStreamArr[user_name] = stream;
                monitorUi.setInterviewerRightSideStream(stream, user_name);
                if (!configrationManager.interviewerVideoMute[user_name]) {
                    monitorUi.hideInterviewerWaitingOverlay(user_name);
                }
            }
            else if (configrationManager.userType == '2') { // A candidate side
                if (user_name.includes(configrationManager.interviewCandidateSocketName)) { // addtional camera stream
                    const cameraName = utility.getCameraNameInUserSocket(user_name);
                    examCameraUi.camType = cameraName;
                    examCameraUi.setRoomStream(stream, 0); // If stream is comming from the mobile then stop AI in desktop and only show stream on Desktop UI.
                    liveStreamManager.updateCameraSetupStream(stream, cameraName);
                    examCameraUi.hideCameraSelectPage(cameraName);
                }
                else { // interviewer stream
                    if (Object.keys(configrationManager.intervierData).length <= 1) {
                        monitorUi.coverHundredPercentForInterviewer();
                    }
                    configrationManager.intervierData[user_name].name;
                    self.interviewerStreamArr[user_name] = stream;
                    monitorUi.interviewerStreamData[user_name] = stream;
                    utility.log("interviewer check: ", 'status: ' + self.leftSideInterviewerSet, configrationManager.activeInterviewer + '==' + user_name);
                    if (configrationManager.activeInterviewer == user_name) {
                        self.leftSideInterviewerSet = true;
                        configrationManager.activeInterviewer = user_name;
                        //monitorUi.setInterviewerLeftSideStream(stream, user_name);
                        monitorUi.setMainStream(stream);
                        if (!configrationManager.interviewerVideoMute[user_name]) {
                            monitorUi.hideMutedIconLeftSide();
                        }
                        // monitorUi.setInterviewerRightSideStream(stream, user_name);
                        // monitorUi.hideActiveInterviewerRightSection();
                    }
                    else {
                        monitorUi.setInterviewerRightSideStream(stream, user_name);
                    }
                    if (!configrationManager.interviewerVideoMute[user_name]) {
                        monitorUi.hideInterviewerWaitingOverlay(user_name);
                    }
                }
            }
            const camName = utility.getCameraNameInUserSocket(user_name);
            if (camName != 'C_CAM') {
                self.sendMyStream(user_name);
            }
        });
        this.subscribe(SDK_EVENT.AUDIO_STREAM, function (user_name, stream) {
            if (configrationManager.userType == '3' && configrationManager.interviewCandidateSocketName == user_name) { // candidate stream
                self.setAudioStream(stream);
                ui.show(ui.id('think_interview_userAudioHeartbeat'));
            }
            else if (configrationManager.userType == '3') { // other interviewer stream
                self.setDynamicInterviewerStream(stream, user_name);
            }
            else if (configrationManager.userType == '2') { // interviewer stream
                monitorUi.interviewerVoiceData[user_name] = stream;
                if (configrationManager.activeInterviewer == user_name) {
                    self.setAudioStream(stream);
                }
                self.setDynamicInterviewerStream(stream, user_name);
                monitorUi.initAudioHeartbeatInterview(stream, user_name);
                if (configrationManager.interviewerAudioMute[user_name] == false && configrationManager.activeInterviewer == user_name) {
                    ui.show(ui.id('think_interview_userAudioHeartbeat'));
                }
                ui.show(ui.id('think_interview_userAudioHeartbeat_candidate'));
                liveStreamManager.addRemoteUserAudio(user_name, stream.getAudioTracks()[0]);
            }
            const camName = utility.getCameraNameInUserSocket(user_name);
            if (camName != 'C_CAM') {
                self.sendMyStream(user_name);
            }
        });
        this.subscribe(SDK_EVENT.SECOND_STREAM_DISCONNET, function (user_name) {
            utility.log('second stream disconnect: ', user_name);
            if (configrationManager.intervierData[user_name] != null) {
                monitorUi.muteInterviewerVideoStream(user_name);
                return false;
            }
            const cameraName = utility.getCameraNameInUserSocket(user_name);
            if (cameraName == 'S_CAM') {
                self.permissionRevoke(280);
            }
            else if (cameraName == 'B_CAM') {
                self.permissionRevoke(279);
            }
            else if (cameraName == 'F_CAM') {
                self.permissionRevoke(277);
            }
            else if (cameraName == 'C_CAM') {
                self.permissionRevoke(280);
            }
            examCameraUi.camType = cameraName;
            const headingKey = examCameraUi.retryHeadingName();
            const messageKey = examCameraUi.retryMessageName();
            const keyName = examCameraUi.checkExternalCamStream();
            if (!keyName || !LiveStreamManager.CAMERA[keyName]) {
                console.warn('Invalid camera key:', keyName, examCameraUi.camType);
                return;
            }
            LiveStreamManager.CAMERA[keyName].stream = null;
            if (self.cameraRevokePopup == null) {
                if (LiveStreamManager.CAMERA[keyName].external == true &&
                    LiveStreamManager.CAMERA[keyName].stream == null) {
                    LiveStreamManager.CAMERA[keyName].external = false;
                    utility.log('camera revoke alert', cameraName);
                    examCameraUi.stopSnap(cameraName);
                    examCameraUi.stopRecording(cameraName);
                    examCameraUi.stopAiMonitoring();
                    self.stopSizeMonitoring();
                    //chat.sendData('stop_monitor_ai', 'stop monitor ai');
                    let streamInfo = liveStreamManager.getAllStreamsId();
                    chat.sendData('cam_disconnect', streamInfo);
                    const envAlias = examCameraUi.getQrStepName();
                    self.cameraRevokePopup = ui.alertDialog(ui.translations.popup_text[headingKey], ui.translations.popup_text[messageKey], ui.translations.popup_buttons.retry, function (dialog) {
                        ui.remove(dialog);
                        self.cameraRevokePopup = null;
                        examCameraUi.showQrPage(examCameraUi.cameraAllowClick, envAlias, cameraName);
                    });
                }
            }
        });
        this.subscribe(SDK_EVENT.USER_LEFT, function (user_name) {
            self.checkUserLeft(user_name);
        });
        this.subscribe(SDK_EVENT.RECEIVE_MESSAGE, function (user_name, message) {
            const cameraName = utility.getCameraNameInUserSocket(user_name);
            examCameraUi.modeSelector(message.mode, message, cameraName);
            self.singleSocketmode(message.mode, message.text, message, user_name, cameraName);
        });
        this.subscribe(SDK_EVENT.CHAT_MESSAGE, function (user_name, message) {
            const cameraName = utility.getCameraNameInUserSocket(user_name);
            self.roomSocketmode(message.mode, message.text, message, user_name, cameraName);
        });
        // Sleep/Wake Recovery: Completely tear down hanging peers locally and request resharing
        this.subscribe(SDK_EVENT.NETWORK_CONNECT, function () {
            utility.log('Network connected (woke from sleep). Tearing down dead peers to force re-share.');
            peer.closeAll();
            // Reset UI booleans so streams append cleanly upon waking up
            self.leftSideInterviewerSet = false;
            self.alreadyInterviewerAttendance = {};
            // Wait 2.5 seconds before broadcasting to guarantee the server has finished adding our reconnected socket back into the interview Room!
            utility.wait(2500).then(() => {
                let msg = { mode: 'resumed_from_sleep', text: "network reconnected, sharing stream" };
                socket.sendRoomMessage(msg);
                // Send native attendance flow so UI elements reconstruct properly
                let streamInfo = liveStreamManager.getAllStreamsId();
                chat.sendData('attendance', streamInfo);
            });
        });
    }
    getCamTypeForStream(userSocket, streamId) {
        if (!this.camStore || !this.camStore[userSocket])
            return null;
        const cams = this.camStore[userSocket];
        if (cams.P_CAM === streamId)
            return "P_CAM";
        if (cams.C_CAM === streamId)
            return "C_CAM";
        return null;
    }
    leaveCandidate() {
        socketTranscript.stop();
        monitorUi.showCandidateWaitingOverlay(configrationManager.candidateRegisterURL);
        ui.hide(ui.id('thinkproc-additional-cam-section'));
        if (configrationManager.userType === '3') {
            ui.hide(ui.id('thinkproc_primary_cam_revoke'));
            const videoElement = ui.id('thinkInterview_mainVideo');
            if (videoElement) {
                videoElement.srcObject = null;
            }
        }
    }
    checkUserLeft(user_name) {
        const getCamName = utility.getCameraNameInUserSocket(user_name);
        if (configrationManager.userType === '3' && getCamName == 'C_CAM') {
            monitorUi.additionalCameraDisconnectCheck();
        }
        else if (configrationManager.userType === '3' && configrationManager.interviewCandidateSocketName == user_name) {
            let msg = { mode: 'check_candidate_left', text: "check candidate left" };
            socket.sendRoomMessage(msg);
            this.canidateLeftTimeout = setTimeout(() => {
                this.leaveCandidate();
            }, 2000);
        }
        else {
            if (LiveStreamManager.PRIMARY_CAMERA_NAME == 'P_CAM') {
                let msg = { mode: 'check_interviewer_left', text: "check interviewer left" };
                socket.sendRoomMessage(msg);
                this.interviewerLeftTimeout = setTimeout(() => {
                    this.leaveInterviwer(user_name);
                }, 2000);
            }
        }
    }
    showWaitingOverlay(imageUrl, message) {
        const overlay = ui.id('thinkproc-waiting-overlay');
        const img = ui.id('waitingCandidateImg');
        const text = overlay?.querySelector('.waiting-text');
        if (!overlay || !img || !text)
            return;
        if (imageUrl)
            img.src = imageUrl;
        // if (message) text.textContent = message;
        overlay.classList.remove('d-none');
        overlay.style.opacity = '1';
        overlay.style.transition = 'opacity 0.3s ease';
    }
    async startCamera() {
        utility.log(liveStreamManager.getAllStreamsId());
        const stream = await this.getCameraStream();
        if (stream) {
            const video = this.setStream(stream);
            video.play();
            if (configrationManager.userType == '3') {
                stepUIManager.insertText('thinkinterviewUser', configrationManager.currentCandidateName);
            }
            else {
                stepUIManager.insertText('thinkinterviewUser', configrationManager.currentCandidateName);
            }
        }
        if (LiveStreamManager.PRIMARY_CAMERA_NAME == 'P_CAM') {
            const audioStream = await this.getAudioStream();
            if (audioStream) {
                if (configrationManager.userType == '3') {
                    monitorUi.initAudioHeartbeat(audioStream, 'think_interview_audioHeartbeat');
                }
                else {
                    monitorUi.initAudioHeartbeat(audioStream, 'think_interview_userAudioHeartbeat_candidate');
                }
            }
        }
    }
    setStream(stream) {
        let video = null;
        if (LiveStreamManager.PRIMARY_CAMERA_NAME == 'P_CAM') {
            if (configrationManager.userType == '3') {
                video = ui.id('thinkInterview_interviewerVideo');
            }
            else {
                video = ui.id('thinkInterview_candidateVideoSession');
                stepUIManager.insertText('thinkproc-interview-video-label-name-candidate', configrationManager.currentCandidateName);
            }
        }
        else if (LiveStreamManager.PRIMARY_CAMERA_NAME == 'S_CAM' ||
            LiveStreamManager.PRIMARY_CAMERA_NAME == 'B_CAM' ||
            LiveStreamManager.PRIMARY_CAMERA_NAME == 'F_CAM' ||
            LiveStreamManager.PRIMARY_CAMERA_NAME == 'C_CAM') {
            video = ui.id('thinkX_mobileCameraVideo');
        }
        if (!video) {
            throw new Error('No valid video element found for the selected camera.');
        }
        if (stream) {
            video.srcObject = stream;
        }
        return video;
    }
    setAudioStream(stream) {
        monitorUi.initAudioHeartbeat(stream, 'think_interview_userAudioHeartbeat');
    }
    setDynamicInterviewerStream(stream, socketName) {
        monitorUi.initAudioHeartbeat(stream, 'think_interview_audioHeartbeat_' + socketName);
    }
    attendance() {
        // this function will be run only one time when candidate join the interview session
        let streamInfo = liveStreamManager.getAllStreamsId();
        // let msg = { mode: 'attendance', text: "send attendance" ,data:streamInfo};
        // socket.sendRoomMessage(msg);
        chat.sendData('attendance', streamInfo);
        this.attendanceReply(1000);
    }
    attendanceReply(delay = 0) {
        utility.wait(delay).then(async () => {
            let msg = {
                mode: 'attendance_reply', text: "attendance reply",
                data: { 'video_mute': configrationManager.video_mute, 'audio_mute': configrationManager.audio_mute }
            };
            socket.sendRoomMessage(msg);
        });
    }
    roomSocketmode(mode, text, message, from, cameraName) {
        switch (mode) {
            case 'attendance':
                // pass cameraDetails objects (or enum values) as separate arguments instead of a string array
                this.setCameraStream(from, message.data);
                if (cameraName == 'C_CAM') {
                    if (configrationManager.userType == '3') {
                        let msg = { mode: 'send_addtional_cam_stream', text: "send addtional camera stream" };
                        socket.sendRoomMessage(msg);
                    }
                }
                else {
                    // const camName = utility.getCameraNameInUserSocket(user_name);
                    if (cameraName != 'C_CAM') {
                        if (configrationManager.userType == '3') {
                            let streamInfo = liveStreamManager.getAllStreamsId();
                            chat.sendData('stream_update', streamInfo);
                            this.attendanceReply(0);
                            utility.wait(1000).then(async () => {
                                this.sendMyStream(from);
                            });
                        }
                        else {
                            let streamInfo = liveStreamManager.getAllStreamsId();
                            chat.sendData('stream_update', streamInfo);
                            utility.wait(1000).then(() => {
                                this.sendMyStream(from);
                            });
                        }
                    }
                }
                break;
            case 'cam_disconnect':
                if (configrationManager.userType == "3") {
                    this.cameraDisconnectCheck(from, message.data);
                }
                else {
                    monitorUi.camDisconnectInterviewer(from);
                }
                break;
            case 'additional_cam_disconnect':
                if (configrationManager.userType == "3") {
                    monitorUi.additionalCameraDisconnectCheck();
                }
                break;
            case 'stream_update':
                this.setCameraStream(from, message.data);
                break;
            case 'request_proctor_timeZone':
                let msg1 = { mode: 'send_candidate_proctor_timeZone', text: "send proctor timeZone to candidate", data: configrationManager.interviwerJoiningTime };
                socket.sendRoomMessage(msg1);
                break;
            case 'request_verify_photo_verification':
                if (configrationManager.socketUserName == message.data) {
                    this.checkVerificationRequest();
                }
                break;
            case 'send_interview_allow':
                // pass cameraDetails objects (or enum values) as separate arguments instead of a string array
                let msg = { mode: 'approve_candidate', text: "approve attendance" };
                socket.sendRoomMessage(msg);
                stepUIManager.insertText('think_interview_waitingCandidate', ui.translations.interviewLobby.waitingCandidate);
                break;
            case 'interviewer_leave':
                this.leaveInterviwer(from);
                break;
            case 'candidate_leave':
                this.leaveCandidate();
                break;
            case 'check_candidate_left':
                if (configrationManager.userType === '2' && LiveStreamManager.PRIMARY_CAMERA_NAME == 'P_CAM') {
                    let msg = { mode: 'candidate_here', text: "candidate here" };
                    socket.sendRoomMessage(msg);
                }
                break;
            case 'candidate_here':
                if (configrationManager.userType === '3' && this.canidateLeftTimeout) {
                    clearTimeout(this.canidateLeftTimeout);
                    this.canidateLeftTimeout = null;
                }
                break;
            case 'check_interviewer_left':
                if (configrationManager.userType === '3') {
                    let msg = { mode: 'interviewer_here', text: "candidate here" };
                    socket.sendRoomMessage(msg);
                }
                break;
            case 'interviewer_here':
                if (configrationManager.userType === '2' && this.interviewerLeftTimeout) {
                    clearTimeout(this.interviewerLeftTimeout);
                    this.interviewerLeftTimeout = null;
                }
                break;
            case "send_addtional_cam_stream":
                if (LiveStreamManager.PRIMARY_CAMERA_NAME != "P_CAM" && configrationManager.userType == '2') { // Candidate addtional cams
                    this.sendMyStream(from);
                }
                break;
            case "mic_disconnect":
                if (LiveStreamManager.PRIMARY_CAMERA_NAME == 'P_CAM') {
                    ui.hide(ui.id('think_interview_userAudioHeartbeat'));
                }
                if (configrationManager.userType === '2') {
                    liveStreamManager.removeRemoteUserAudio(from);
                }
                if (configrationManager.userType === '3') {
                    ui.show(ui.id('think_interview_left_audio_muted'));
                }
                break;
            case "photo_verify_done":
            case "photo_reject":
                ui.hide(ui.id('thinkproc-id-varification-popup'));
                break;
            case "attendance_reply":
                this.attendanceReplyHandler(from, message);
                break;
            case "mute_video_stream":
                configrationManager.interviewerVideoMute[from] = true;
                monitorUi.muteInterviewerVideoStream(from);
                break;
            case "unmute_video_stream":
                configrationManager.interviewerVideoMute[from] = false;
                monitorUi.unMuteInterviewerVideoStream(from);
                break;
            case "mute_audio_stream":
                configrationManager.interviewerAudioMute[from] = true;
                monitorUi.muteInterviewerAudioStream(from);
                break;
            case "unmute_audio_stream":
                configrationManager.interviewerAudioMute[from] = false;
                monitorUi.unMuteInterviewerAudioStream(from);
                break;
            case "resumed_from_sleep":
                // If the remote user woke up from sleep, quietly wipe our hanging peer object for them.
                utility.log('Remote user woke from sleep. Tearing down their peer cleanly.');
                peer.close(from);
                // Allow the Candidate DOM to re-append their incoming interview streams
                this.leftSideInterviewerSet = false;
                delete this.alreadyInterviewerAttendance[from];
                // We do NOTHING else. They will immediately send an 'attendance' event right after this,
                // which structurally forces a perfect, natively synchronized peer.connect() and UI refresh!
                break;
            case "screen_disconnect":
                ui.show(ui.id("thinkproc_screen_share_revoke"));
                break;
            case "screen_reconnect":
                ui.hide(ui.id("thinkproc_screen_share_revoke"));
                break;
            default:
                utility.warn(`Unknown room socket mode: ${mode}`);
                break;
        }
    }
    singleSocketmode(mode, text, message, from, cameraName) {
        switch (mode) {
            case "resend_stream":
                this.sendMyStream(from);
                break;
            default:
                utility.warn(`Unknown room socket mode: ${mode}`);
                break;
        }
    }
    attendanceReplyHandler(from, message) {
        configrationManager.interviewerVideoMute[from] = message.data.video_mute;
        configrationManager.interviewerAudioMute[from] = message.data.audio_mute;
        if (configrationManager.userType == '2') {
            const getCamName = utility.getCameraNameInUserSocket(from);
            if (getCamName && getCamName == 'C_CAM') {
                return;
            }
            this.createInterviewerVideoElement(from);
        }
        else {
            if (configrationManager.interviewCandidateSocketName == from) {
                return;
            }
            else {
                const stream = this.interviewerStreamArr[from];
                monitorUi.createDynamicInterviewer(stream, from);
                if (configrationManager.interviewerVideoMute[from]) {
                    monitorUi.muteInterviewerVideoStream(from);
                }
                if (configrationManager.interviewerAudioMute[from]) {
                    monitorUi.muteInterviewerAudioStream(from);
                }
            }
        }
    }
    createInterviewerVideoElement(user_name) {
        if (this.alreadyInterviewerAttendance[user_name] !== undefined)
            return;
        // ✅ Decide active only once
        if (!configrationManager.activeInterviewer) {
            configrationManager.activeInterviewer = user_name;
            monitorUi.singleInterviewerModeUIAdjustments(user_name);
            if (configrationManager.interviewerAudioMute[user_name]) {
                monitorUi.muteAudioLeftSideInterviewer();
            }
            monitorUi.showMutedIconLeftSide(user_name);
        }
        else {
            monitorUi.multiInterviewerModeUIAdjustments();
        }
        const stream = this.interviewerStreamArr[user_name];
        monitorUi.createDynamicInterviewer(stream, user_name);
        if (configrationManager.interviewerAudioMute[user_name]) {
            monitorUi.muteInterviewerAudioStream(user_name);
        }
        monitorUi.muteInterviewerVideoStream(user_name);
        // ✅ CORE LOGIC: hide only active interviewer from right side
        if (configrationManager.activeInterviewer === user_name) {
            ui.id("interviewer_" + user_name)?.classList.add('d-none');
        }
        else {
            ui.id("interviewer_" + user_name)?.classList.remove('d-none');
        }
        this.alreadyInterviewerAttendance[user_name] = user_name;
    }
    cameraDisconnectCheck(user_name, data) {
        const oldStream = this.camStore?.[user_name];
        if (oldStream && typeof oldStream === 'object') {
            if (oldStream['C_CAM'] === undefined) {
                monitorUi.showCameraDisconnectIcon('P_CAM', user_name);
            }
            else {
                Object.keys(oldStream).forEach((key) => {
                    if (data?.[key] == '') {
                        monitorUi.showCameraDisconnectIcon(key, user_name);
                    }
                });
            }
        }
    }
    setCameraStream(userName, data) {
        const from = utility.extractPrefix(userName, 'C_CAM');
        this.camStore = this.camStore || {};
        this.camStore[from] = this.camStore[from] || {};
        Object.keys(data).forEach((key) => {
            if (this.camStore && this.camStore[from]
                && this.camStore[from][key] && this.camStore[from][key] !== data[key]) {
                let msg = { mode: 'resend_stream', text: "resend stream" };
                socket.sendMessage(from, msg);
            }
            this.camStore[from][key] = data[key];
        });
        utility.log("this.camStore:", this.camStore);
    }
    leaveInterviwer(user_name) {
        if (configrationManager.userType == '3') {
            const stream = this.interviewerStreamArr[user_name];
            if (stream && Object.keys(this.interviewerStreamArr).length > 0) {
                stream.getTracks().forEach(t => t.stop());
                delete this.interviewerStreamArr[user_name];
                delete this.alreadyInterviewerAttendance[user_name];
                delete monitorUi.interviewerStreamData[user_name];
                monitorUi.removeDynamicInterviewer(user_name);
            }
        }
        else {
            const stream = this.interviewerStreamArr[user_name];
            if (stream && Object.keys(this.interviewerStreamArr).length > 0) {
                stream.getTracks().forEach(t => t.stop());
                delete this.interviewerStreamArr[user_name];
                delete this.alreadyInterviewerAttendance[user_name];
                delete monitorUi.interviewerStreamData[user_name];
                delete monitorUi.interviewerVoiceData[user_name];
                this.leftSideInterviewerSet = false;
                monitorUi.removeDynamicInterviewer();
                if (Object.keys(this.interviewerStreamArr).length <= 1) {
                    monitorUi.coverHundredPercentForInterviewer();
                }
                for (const socketName in this.interviewerStreamArr) {
                    const interviewerName = configrationManager.intervierData[socketName].name;
                    if (!this.leftSideInterviewerSet) {
                        this.leftSideInterviewerSet = true;
                        configrationManager.activeInterviewer = socketName;
                        //utility.log("interviewer stream: ", this.interviewerStreamArr[socketName]);
                        monitorUi.setMainStream(this.interviewerStreamArr[socketName]);
                        monitorUi.initAudioHeartbeat(monitorUi.interviewerVoiceData[socketName], 'think_interview_userAudioHeartbeat');
                        // monitorUi.changeInterviewerWaitingOverlayId(this.interviewerStreamArr[socketName], socketName);
                        if (configrationManager.interviewerAudioMute[socketName]) {
                            monitorUi.muteAudioLeftSideInterviewer();
                        }
                        if (configrationManager.interviewerVideoMute[socketName]) {
                            monitorUi.showMutedIconLeftSide(socketName);
                        }
                        stepUIManager.insertText('thinkproc-interview-video-label-name', interviewerName);
                    }
                    monitorUi.createDynamicInterviewer(this.interviewerStreamArr[socketName], socketName);
                    if (configrationManager.interviewerAudioMute[socketName]) {
                        monitorUi.muteInterviewerAudioStream(socketName);
                    }
                    if (configrationManager.interviewerVideoMute[socketName]) {
                        monitorUi.muteInterviewerVideoStream(socketName);
                    }
                    monitorUi.setInterviewerRightSideStream(stream, socketName);
                    monitorUi.initAudioHeartbeat(monitorUi.interviewerVoiceData[socketName], 'think_interview_audioHeartbeat_' + socketName);
                }
                //monitorUi.hideActiveInterviewerRightSection();
            }
            else {
                if (Object.keys(this.interviewerStreamArr).length == 0) {
                    examCameraUi.stopAiMonitoring();
                    ui.show(ui.id('think_interview_leave_popup'));
                    this.startLeaveCountdown();
                }
            }
        }
    }
    startLeaveCountdown() {
        if (this.counterStarted == true) {
            return;
        }
        this.counterStarted = true;
        ui.remove(this.cameraRevokePopup);
        ui.hide(ui.id('thinkX_exam_additional_camera_setup_popup'));
        const popup = ui.id('think_interview_leave_popup');
        const circle = ui.id('thinkinterview_leavecount');
        const timeText = ui.id('thinkX_leaveMin');
        if (!popup || !circle || !timeText)
            return;
        const totalSeconds = 5;
        let remainingSeconds = totalSeconds;
        const CIRC = 232; // your circumference
        ui.removeClass(popup, 'd-none');
        ui.show(popup);
        const updateUI = () => {
            const min = Math.floor(remainingSeconds / 60).toString().padStart(2, "0");
            const sec = (remainingSeconds % 60).toString().padStart(2, "0");
            timeText.textContent = `${min}:${sec}`;
            const ratio = remainingSeconds / totalSeconds;
            const offset = CIRC * (1 - ratio);
            circle.style.strokeDashoffset = offset.toString();
        };
        updateUI();
        if (this.leaveCountdownTimer) {
            clearInterval(this.leaveCountdownTimer);
        }
        this.leaveCountdownTimer = setInterval(() => {
            remainingSeconds--;
            if (remainingSeconds <= 0) {
                clearInterval(this.leaveCountdownTimer);
                this.leaveCountdownTimer = null;
                timeText.textContent = "00:00";
                circle.style.strokeDashoffset = CIRC.toString();
                this.closeInterviewPopup();
                return;
            }
            updateUI();
        }, 1000);
    }
    closeInterviewPopup() {
        ui.hide(ui.id('think_interview_leave_popup'));
        socketTranscript.stop();
        liveStreamManager.stopStreams();
        // examCameraUi.stopRecording('all');
        this.stopRecordingTimer();
        this.stopSizeMonitoring();
        this.aiStarted = false;
        examCameraUi.stopAiMonitoring();
        ui.hide(ui.id('thinkproc_chat_popup'));
        peer.closeAll();
        socket.leavingSocket();
        socket.closeSocket();
        this.end(0, false, true);
    }
    sendMyStream(user_name) {
        if (this.sendStreamTimeout && this.sendStreamTimeout[user_name]) {
            clearTimeout(this.sendStreamTimeout[user_name]);
        }
        this.sendStreamTimeout[user_name] = setTimeout(() => {
            const camName = utility.getCameraNameInUserSocket(user_name);
            if (camName == 'C_CAM') {
                peer.connect(user_name, LiveStreamManager.CAMERA.PRIMARY, LiveStreamManager.CAMERA.CUSTOM);
            }
            else {
                peer.connect(user_name, LiveStreamManager.CAMERA.PRIMARY, LiveStreamManager.CAMERA.CUSTOM, LiveStreamManager.AUDIO.PRIMARY);
            }
        }, 1000);
    }
    checkVerificationRequest() {
        request.getIdVerification()
            .then((response) => {
            utility.log('✅ ID Verification status fetched successfully', response);
            if (response.code === 2000 && response.status === true) {
                const data = response.data.id_verification;
                ui.show(ui.id('thinkproc-id-varification-popup'));
                const { auth_reg_id: { value: auth_reg_id }, auth_reg_photo: { value: auth_reg_photo }, auth_capture_id: { value: auth_capture_id }, } = configrationManager.valueMap.candidate_authentication.data;
                // Candidate photo
                monitorUi.setCandidateImage(data.candidate_photo?.image, 'thinkInterview_captured_photo');
                ui.show(ui.id('thinkproc-capturePhoto'));
                // Capture ID
                if (auth_capture_id == 1) {
                    monitorUi.setCandidateImage(data.capture_id?.image, 'thinkInterview_captured_id');
                    monitorUi.setPercentage(data.capture_id?.ai_match, 'thinkInterview_captured_id_percentage');
                    ui.show(ui.id('thinkproc-captureID'));
                }
                // Registration ID
                if (auth_reg_id == 1) {
                    monitorUi.setCandidateImage(data.registration_id?.image, 'thinkInterview_register_id');
                    monitorUi.setPercentage(data.registration_id?.ai_match, 'thinkInterview_register_id_percentage');
                    ui.show(ui.id('thinkproc-registerID'));
                }
                // Registration photo
                if (auth_reg_photo == 1) {
                    monitorUi.setCandidateImage(data.registration_photo?.image, 'thinkInterview_register_photo');
                    monitorUi.setPercentage(data.registration_photo?.ai_match, 'thinkInterview_register_photo_percentage');
                    ui.show(ui.id('thinkproc-registerPhoto'));
                }
                this.allowVerficaion();
                this.rejectVerification();
            }
        })
            .catch((error) => {
            utility.log('❌ Failed to fetch ID Verification status', error);
        });
    }
    allowVerficaion() {
        ui.click(ui.id('thinkInterview_allow_verification'), async () => {
            ui.hide(ui.id('thinkproc-id-varification-popup'));
            let msg = { mode: 'photo_verify_done', text: "verification allow" };
            socket.sendRoomMessage(msg);
            request.updateIDEscalation({ is_approved: 1 })
                .then((response) => utility.log('escaltion allow updated successfully', response))
                .catch((error) => utility.log('Error updating escalaion issue fix:', error));
        });
    }
    // rejectVerification(){
    //     ui.click(ui.id('thinkInterview_reject_verification') as HTMLElement, async () => {
    //         ui.hide(ui.id('thinkproc-id-varification-popup'));
    //         let msg = { mode: 'photo_reject', text: "Photo and id verification reject" };
    //         socket.sendRoomMessage(msg);
    //         request.updateIDEscalation({ is_approved : 0 })
    //           .then((response) => utility.log('escaltion reject updated successfully', response))
    //           .catch((error) => utility.log('Error updating escalaion issue fix:', error));
    //     });
    // }
    rejectVerification() {
        const allowBtn = ui.id('thinkInterview_allow_verification');
        const rejectBtn = ui.id('thinkInterview_reject_verification');
        const backdrop = ui.id('thinkinterview_allowNoteBackdrop');
        const textarea = ui.id('noteText');
        const charCount = ui.id('thinkproc-allowCharCount');
        const confirmBtn = ui.id('thinkInterview_allowBtnID');
        const errorBox = ui.id('thinkproc-allowErrorMessage');
        const closeBtn = ui.id('thinkproc_noteCloseBtn');
        // 🔁 Prevent duplicate listeners
        textarea.oninput = null;
        confirmBtn.onclick = null;
        rejectBtn.onclick = null;
        // Show popup
        ui.click(rejectBtn, () => {
            ui.show(backdrop);
            rejectBtn.disabled = true;
            allowBtn.disabled = true;
            textarea.value = '';
            charCount.innerText = '0 / 100';
            confirmBtn.disabled = true;
            ui.hide(errorBox);
            errorBox.innerText = '';
        });
        // Live counter + validation
        textarea.addEventListener('input', () => {
            if (textarea.value.length > 100) {
                textarea.value = textarea.value.substring(0, 100); // hard limit
            }
            const count = textarea.value.length;
            charCount.innerText = `${count} / 100`;
            if (count === 0) {
                confirmBtn.disabled = true;
                ui.hide(errorBox);
                return;
            }
            confirmBtn.disabled = false;
            ui.hide(errorBox);
            errorBox.innerText = '';
        });
        // Confirm Reject
        ui.click(confirmBtn, () => {
            const text = textarea.value.trim();
            if (!text) {
                errorBox.innerText = ui.translations.idVerification.rejectionReason;
                ui.show(errorBox);
                confirmBtn.disabled = true;
                return;
            }
            ui.hide(errorBox);
            errorBox.innerText = '';
            // TODO: your API call here
            ui.hide(backdrop);
            // 🔓 Re-enable main buttons
            rejectBtn.disabled = false;
            allowBtn.disabled = false;
            ui.hide(ui.id('thinkproc-id-varification-popup'));
            let msg = { mode: 'photo_reject', text: text };
            socket.sendRoomMessage(msg);
            request.updateIDEscalation({ is_approved: 0 })
                .then((response) => utility.log('escaltion reject updated successfully', response))
                .catch((error) => utility.log('Error updating escalaion issue fix:', error));
        });
        ui.click(closeBtn, () => {
            ui.hide(ui.id('thinkinterview_allowNoteBackdrop'));
            rejectBtn.disabled = false;
            allowBtn.disabled = false;
        });
    }
    getVideoFromStream(stream) {
        const video = document.createElement('video');
        video.srcObject = stream;
        video.muted = true;
        video.playsInline = true;
        video.width = 640;
        video.height = 480;
        video.play().catch(() => { });
        return video;
    }
    async startExamWithSFL() {
        return new Promise(async (resolve, reject) => {
            try {
                const stream = await this.getCameraStream();
                if (!stream) {
                    return reject('No camera stream found');
                }
                // Setup primary video stream
                const video = this.setStream(stream);
                video.play();
                // Start AI monitoring
                if (!this.aiStarted) {
                    try {
                        ai.examAI(video, async (message) => {
                            this.aiStarted = true;
                            utility.log(message, 'Exam Monitor AI');
                            if (message.image != '') {
                                message.image = await utility.convertBase64PngToCompressedBase64Jpg(message.image);
                                const imageBlob = utility.base64ToBlob(message.image);
                                examCameraUi.ufm.log(message.od_detections, this.envAlias, 1, 'P_CAM', imageBlob, message.status_code);
                            }
                        });
                    }
                    catch (error) {
                        utility.log("ai error");
                    }
                }
                // Handle SFL (screen focus loss=) monitoring
                if (configrationManager.valueMap.ufm.data.SFL.value == 1) {
                    this.startSizeMonitoring();
                    window.addEventListener('blur', () => {
                        const now = Date.now();
                        if (configrationManager.isScreenStreamEnding || this.isReRequestingScreen || now - this.lastScreenRequestAt < 5000) {
                            utility.log('🔕 Blur ignored (screen permission flow)');
                            return;
                        }
                        this.handleFocusLost('window-blur');
                    });
                    document.addEventListener('visibilitychange', () => {
                        const now = Date.now();
                        if (configrationManager.isScreenStreamEnding || this.isReRequestingScreen || now - this.lastScreenRequestAt < 5000) {
                            return;
                        }
                        if (document.visibilityState === 'hidden') {
                            this.handleFocusLost('tab_hidden');
                        }
                    });
                }
                resolve(); // ✅ Exam setup complete
            }
            catch (error) {
                reject(error);
            }
        });
    }
    async handleFocusLost(reason) {
        try {
            const now = Date.now();
            if (configrationManager.isScreenStreamEnding || this.isReRequestingScreen || now - this.lastScreenRequestAt < 5000) {
                utility.log('🔕 Blur ignored (screen permission flow)');
                return;
            }
            let camera = LiveStreamManager.CAMERA.PRIMARY;
            if (configrationManager.sharedScreen === 1) {
                camera = LiveStreamManager.CAMERA.SCREEN;
            }
            if (!camera.stream)
                return;
            const video = this.getVideoFromStream(camera.stream);
            if (!video) {
                utility.error('Video element not found for snapshot on focus lost');
                return;
            }
            await utility.wait(1000);
            const snapshot = this.takeSnapshots_sfl(video, false, false);
            const blob = utility.base64ToBlob(snapshot);
            this.ufmTrigger('SFL', 276, blob);
        }
        catch (error) {
            utility.error('Error during focus lost capture: ' + error);
        }
    }
    takeSnapshots_sfl(video, saveActivity, takeReturn) {
        const canvas = document.createElement('canvas');
        canvas.width = 1024;
        canvas.height = 576;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
            throw new Error('Unable to get canvas context');
        }
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataURI = canvas.toDataURL('image/jpeg', 0.8);
        return dataURI;
    }
    ufmTrigger(ufmType, code = 0, blob) {
        try {
            let codeArr = null;
            if (code != 0) {
                codeArr = [code];
            }
            const response = examCameraUi.ufm.log(ufmType, this.envAlias, 1, 'P_CAM', blob, codeArr);
            utility.log(`${ufmType} UFM uploaded successfully`, response);
        }
        catch (error) {
            utility.log(`❌ ${ufmType} UFM upload failed`, error);
        }
    }
    permissionRevoke(code) {
        if (configrationManager.valueMap.ufm.data.PR.value == 1) {
            this.ufmTrigger('PR', code);
        }
    }
    cameraRevoke() {
        if (LiveStreamManager.PRIMARY_CAMERA_NAME != 'P_CAM') {
            this.manager().closeApplication();
            return;
        }
        if (LiveStreamManager.CAMERA.PRIMARY.stream == null) {
            this.permissionRevoke(281);
        }
        let self = this;
        let cameraName = '';
        if (configrationManager.userType == "2") {
            cameraName = examCameraUi.getRevokeCameraName();
        }
        utility.log(cameraName, 'camera revoke alert show');
        if (this.cameraRevokePopup == null && cameraName != '') {
            if (cameraName != '' &&
                LiveStreamManager.CAMERA[cameraName].external == false &&
                LiveStreamManager.CAMERA[cameraName].stream == null) {
                this.camType = LiveStreamManager.CAMERA[cameraName].name;
                if (cameraName == 'SIDE' && cameraName != configrationManager.reCameraRevoke) {
                    this.permissionRevoke(280);
                }
                else if (cameraName == 'BACK' && cameraName != configrationManager.reCameraRevoke) {
                    this.permissionRevoke(279);
                }
                else if (cameraName == 'FRONT' && cameraName != configrationManager.reCameraRevoke) {
                    this.permissionRevoke(277);
                }
                else if (cameraName == 'CUSTOM' && cameraName != configrationManager.reCameraRevoke) {
                    this.permissionRevoke(280);
                }
                if (cameraName == configrationManager.reCameraRevoke) {
                    configrationManager.reCameraRevoke = '';
                }
                examCameraUi.camType = this.camType;
                // examCameraUi.stopSnap(this.camType);
                examCameraUi.stopRecording(this.camType);
                this.aiStarted = false;
                examCameraUi.stopAiMonitoring();
                chat.sendData('stop_monitor_ai', 'stop monitor ai');
                let streamInfo = liveStreamManager.getAllStreamsId();
                chat.sendData('additional_cam_disconnect', streamInfo);
                const envAlias = examCameraUi.getQrStepName();
                const headingKey = examCameraUi.retryHeadingName();
                const messageKey = examCameraUi.retryMessageName();
                this.cameraRevokePopup = ui.alertDialog(ui.translations.popup_text[headingKey], ui.translations.popup_text[messageKey], ui.translations.popup_buttons.retry, function (dialog) {
                    ui.remove(dialog);
                    self.cameraRevokePopup = null;
                    examCameraUi.showQrPage(examCameraUi.cameraAllowClick, envAlias, self.camType);
                });
            }
            else {
                this.aiStarted = false;
                examCameraUi.stopAiMonitoring();
                chat.sendData('stop_monitor_ai', 'stop monitor ai');
            }
        }
        else {
            this.aiStarted = false;
            examCameraUi.stopAiMonitoring();
            chat.sendData('stop_monitor_ai', 'stop monitor ai');
            let streamInfo = liveStreamManager.getAllStreamsId();
            if (configrationManager.userType == "3") {
                monitorUi.muteInterviewerVideoStream(configrationManager.socketUserName);
            }
            else {
                monitorUi.muteCandidateVideoStream();
            }
            chat.sendData('cam_disconnect', streamInfo);
        }
    }
    async cameraRevokeRetry() {
        socketTranscript.start();
        examCameraUi.updateStream();
        if (configrationManager.userType == "3") {
            monitorUi.unMuteInterviewerVideoStream(configrationManager.socketUserName);
        }
        else {
            monitorUi.unMuteCandidateVideoStream();
        }
        const stream = await this.getCameraStream();
        if (stream) {
            this.setStream(stream);
            examCameraUi.primaryCameraAiMonitoring();
        }
        // Notify room about updated streams so remote peers (candidates) can reconnect
        try {
            const streamInfo = liveStreamManager.getAllStreamsId();
            chat.sendData('stream_update', streamInfo);
            // also send a room message as a fallback for listeners relying on socket events
            // socket.sendRoomMessage({ mode: 'stream_update', text: 'stream re-added', data: streamInfo });
        }
        catch (e) {
            utility.log('Error broadcasting stream_update after camera retry', e);
        }
    }
    micRevoke() {
        this.permissionRevoke(278);
        socketTranscript.stop();
        this.aiStarted = false;
        examCameraUi.stopAiMonitoring();
        chat.sendData('stop_monitor_ai', 'stop monitor ai');
        ui.hide(ui.id('think_interview_audioHeartbeat'));
        chat.sendData('mic_disconnect', 'mic disconnect');
    }
    async micRevokeRetry() {
        const audioStream = await this.getAudioStream();
        if (audioStream) {
            monitorUi.initAudioHeartbeat(audioStream, 'think_interview_audioHeartbeat');
        }
        ui.show(ui.id('think_interview_audioHeartbeat'));
        examCameraUi.updateStream();
        examCameraUi.primaryCameraAiMonitoring();
        socketTranscript.start();
        // Notify room about updated audio stream so remote peers reconnect
        try {
            const streamInfo = liveStreamManager.getAllStreamsId();
            chat.sendData('stream_update', streamInfo);
            //socket.sendRoomMessage({ mode: 'stream_update', text: 'audio re-added', data: streamInfo });
        }
        catch (e) {
            utility.log('Error broadcasting stream_update after mic retry', e);
        }
    }
    ufmList(initClick = true) {
        if (initClick) {
            const ufmBtn = ui.id('thinkinterview_UFM');
            if (!ufmBtn)
                return;
            ui.click(ufmBtn, async () => {
                const ufmPanel = ui.id('think_interview_ufmList');
                const ufmText = ui.id('thinkInterview_blueUFMText');
                if (!ufmPanel)
                    return;
                if (!this.isUfmOpen) {
                    // 🔓 OPEN UFM
                    if (!this.firstUFMLoad) {
                        monitorUi.showLoaderwithText('think_interview_ufmList');
                    }
                    ui.hide(ui.id('thinkInterview_StaticUFMIcon'));
                    ui.show(ui.id('thinkInterview_blueUFMIcon'));
                    ui.show(ufmPanel);
                    ui.hide(ui.id('thinkproc_chat_popup'));
                    if (ufmText) {
                        ufmText.style.color = "rgba(47, 77, 219, 1)";
                    }
                    this.closeUFM(); // keep X working
                    this.ufmList(false); // load data
                    this.isUfmOpen = true;
                    // reset chat icon state
                    ui.hide(ui.id('thinkInterview_blueMsg'));
                    ui.show(ui.id('thinkInterview_StaticMsg'));
                    const chatText = ui.id('thinkInterviewMsgText');
                    if (chatText) {
                        chatText.style.color = "#000000";
                    }
                }
                else {
                    // 🔒 CLOSE UFM
                    this.hideUfmPanel();
                }
            });
            return; // prevent rebinding
        }
        // ============================
        // 🔽 Your existing API logic
        // ============================
        let self = this;
        request.getUfmList()
            .then((response) => {
            utility.log("UFM Response", response);
            if (!this.firstUFMLoad) {
                monitorUi.hideLoaderwithText();
            }
            this.firstUFMLoad = true;
            if (self.ufmListTimeout !== null) {
                clearTimeout(self.ufmListTimeout);
                self.ufmListTimeout = null;
            }
            self.ufmListTimeout = setTimeout(() => {
                self.ufmList(false);
            }, 10000);
            if (response.code === 2000 && response.status === true) {
                const data = response.data.candidate_ufm;
                const container = ui.id('think_interview_ufmList')
                    ?.querySelector('.thinkproc-ufm-list');
                if (!container)
                    return;
                container.innerHTML = '';
                if (!data || data.length === 0) {
                    ui.hide(ui.id('thinkproc-ufm-list'));
                    ui.show(ui.id('think_interview_no_ufmList'));
                    return;
                }
                else {
                    ui.show(ui.id('thinkproc-ufm-list'));
                    ui.hide(ui.id('think_interview_no_ufmList'));
                }
                this.ufmShown = new Set();
                data.reverse();
                data.forEach((ufm) => {
                    let iconSrc = '';
                    let title = '';
                    let description = '';
                    const isFirst = !this.ufmShown.has(ufm.ufm_alias);
                    if (isFirst)
                        this.ufmShown.add(ufm.ufm_alias);
                    const red = isFirst ? '_red' : '';
                    const titleColor = isFirst ? 'style="color:#CC4441;"' : '';
                    const discriptionColor = isFirst ? 'style="color:#000000;"' : '';
                    switch (ufm.ufm_alias) {
                        case 'MFD':
                            iconSrc = environment.UI_BASE_URL + `images/multiFaceDetected${red}.svg`;
                            title = ui.translations.interviewLobby.MFD;
                            description = ui.translations.interviewLobby.ufm_multiFaceDetected;
                            break;
                        case 'SFL':
                            iconSrc = environment.UI_BASE_URL + `images/screenFocusLost${red}.svg`;
                            title = ui.translations.interviewLobby.SFL;
                            description = ui.translations.interviewLobby.ufm_screenFocusLost;
                            break;
                        case 'LA':
                            iconSrc = environment.UI_BASE_URL + `images/lookingAway${red}.svg`;
                            title = ui.translations.interviewLobby.LA;
                            description = ui.translations.interviewLobby.ufm_lookingAway;
                            break;
                        case 'PR':
                            iconSrc = environment.UI_BASE_URL + `images/permissionRevoked${red}.svg`;
                            title = ui.translations.interviewLobby.PR;
                            description = ui.translations.interviewLobby.ufm_permissionRevoke;
                            break;
                        case 'FNP':
                            iconSrc = environment.UI_BASE_URL + `images/faceNotPresent${red}.svg`;
                            title = ui.translations.interviewLobby.FNP;
                            description = ui.translations.interviewLobby.ufm_faceNotPresent;
                            break;
                        case 'FM':
                            iconSrc = environment.UI_BASE_URL + `images/face_mismatch${red}.svg`;
                            title = ui.translations.interviewLobby.FM;
                            description = ui.translations.interviewLobby.ufm_faceMismatch;
                            break;
                        default:
                            iconSrc = environment.UI_BASE_URL + `images/multiFaceDetected${red}.svg`;
                            title = ufm.ufm_name || 'Unknown Event';
                            description = 'Unexpected UFM activity detected.';
                            break;
                    }
                    const item = document.createElement('div');
                    item.className = isFirst
                        ? 'thinkproc-ufm-item active'
                        : 'thinkproc-ufm-item';
                    item.innerHTML = `
                <img src="${iconSrc}" alt="${title}">
                <div class="thinkproc-ufm-content">
                <div class="thinkproc-now-time">
                    <h4 ${titleColor}>${title}</h4>
                    <span>${ufm.ufm_time || ''}</span>
                </div>
                <p ${discriptionColor}>${description}</p>
                </div>
            `;
                    container.prepend(item);
                });
            }
        })
            .catch((error) => {
            utility.log("Error loading UFM list:", error);
            if (!this.firstUFMLoad) {
                monitorUi.hideLoaderwithText();
            }
            this.firstUFMLoad = true;
        });
    }
    hideUfmPanel() {
        ui.hide(ui.id('think_interview_ufmList'));
        ui.show(ui.id('thinkInterview_StaticUFMIcon'));
        ui.hide(ui.id('thinkInterview_blueUFMIcon'));
        if (this.ufmListTimeout !== null) {
            clearTimeout(this.ufmListTimeout);
            this.ufmListTimeout = null;
        }
        const ufmText = ui.id('thinkInterview_blueUFMText');
        if (ufmText) {
            ufmText.style.color = "#000000";
        }
        this.isUfmOpen = false;
    }
    closeUFM() {
        const closeBtn = ui.id('think_interview_ufm_close');
        if (!closeBtn)
            return;
        ui.click(closeBtn, async () => {
            this.hideUfmPanel();
        });
    }
    startRecordingTimer() {
        const timerEl = document.querySelector('.thinkproc-interview-lobby-timer');
        if (!timerEl)
            return;
        timerEl.classList.remove('d-none');
        this.recordingSeconds = 0;
        this.recordingInterval = setInterval(() => {
            this.recordingSeconds++;
            const min = String(Math.floor(this.recordingSeconds / 60)).padStart(2, '0');
            const sec = String(this.recordingSeconds % 60).padStart(2, '0');
            timerEl.textContent = `${min}:${sec}`;
        }, 1000);
    }
    stopRecordingTimer() {
        clearInterval(this.recordingInterval);
        this.recordingInterval = null;
    }
    result() {
        return this.resultData;
    }
    screenRevoke() {
        chat.sendData('screen_disconnect', 'screen disconnect');
        configrationManager.isScreenStreamEnding = true;
        this.lastScreenRequestAt = Date.now();
        this.permissionRevoke(282);
        this.aiStarted = false;
        examCameraUi.stopAiMonitoring();
        chat.sendData('stop_monitor_ai', 'stop monitor ai');
        setTimeout(() => {
            configrationManager.isScreenStreamEnding = false;
        }, 5000);
    }
    screenRevokeRetry() {
        chat.sendData('screen_reconnect', 'screen reconnect');
        this.isReRequestingScreen = true;
        this.lastScreenRequestAt = Date.now();
        this.aiStarted = false;
        this.start();
        //examCameraUi.playAllUfm();
        chat.sendData('start_monitor_ai', 'start monitor ai');
        setTimeout(() => {
            this.isReRequestingScreen = false;
        }, 5000);
    }
    startSizeMonitoring() {
        if (this.originalSize)
            return;
        this.originalSize = {
            screenWidth: window.screen.width,
            screenHeight: window.screen.height,
            innerWidth: window.innerWidth,
            innerHeight: window.innerHeight,
        };
        this.sizeCheckInterval = setInterval(() => {
            this.checkSizeChange();
        }, 5000);
    }
    checkSizeChange() {
        if (!this.originalSize)
            return;
        const now = Date.now();
        // ✅ ADD THIS
        if (configrationManager.isScreenStreamEnding || this.isReRequestingScreen || now - this.lastScreenRequestAt < 5000) {
            return;
        }
        const changed = window.screen.width < this.originalSize.screenWidth - this.SIZE_THRESHOLD ||
            window.screen.height < this.originalSize.screenHeight - this.SIZE_THRESHOLD ||
            window.innerWidth < this.originalSize.innerWidth - this.SIZE_THRESHOLD ||
            window.innerHeight < this.originalSize.innerHeight - this.SIZE_THRESHOLD;
        // 🔴 Trigger SFL once per shrink
        if (changed) {
            utility.warn('🚨 UFM SFL → Screen size reduced');
            this.handleFocusLost('size-issue'); // your UFM hook
            return;
        }
        // ✅ Reset only when size is restored
        if (!changed && this.hasSflTriggered) {
            this.hasSflTriggered = false;
            utility.log('✅ Screen size restored to normal');
        }
    }
    stopSizeMonitoring() {
        if (this.sizeCheckInterval) {
            clearInterval(this.sizeCheckInterval);
            this.sizeCheckInterval = null;
        }
        this.originalSize = null;
        this.hasSflTriggered = false;
    }
}
const interviewMonitor = new InterviewMonitor();

/* Author : Prateek Jaiswal */
/**
 *
 */
class LiveStreamManager {
    static PRIMARY_CAMERA_NAME = 'P_CAM';
    screen_stream;
    streamEndedEvent;
    camera_stream;
    camera_view;
    audio_view;
    camRevoked;
    micRevoked;
    audio_stream;
    audio_device_id;
    videoDeviceIN;
    audioDeviceIN;
    camera_device_id;
    camPermissions;
    micPermissions;
    recognition = null;
    isCameraRevoked = false;
    cameraPermissionEventSet = false;
    micPermissionEventSet = false;
    audioContext = new AudioContext();
    destination = null;
    remoteAudioNodes = new Map();
    workerPath = environment.UI_BASE_URL + 'recordingWorker.js';
    workerFile = '';
    cameraRevokeContinouslyInterval = null;
    cameraRevokeRessign = false;
    static CAMERA = {
        PRIMARY: LiveStreamManager.getCameraObject('P_CAM'),
        SIDE: LiveStreamManager.getCameraObject('S_CAM'),
        FRONT: LiveStreamManager.getCameraObject('F_CAM'),
        BACK: LiveStreamManager.getCameraObject('B_CAM'),
        ROOM: LiveStreamManager.getCameraObject('RS_CAM'),
        SCREEN: LiveStreamManager.getCameraObject('SR_CAM'),
        CUSTOM: LiveStreamManager.getCameraObject('C_CAM'),
    };
    static AUDIO = {
        PRIMARY: LiveStreamManager.getAudioObject('AUDIO'),
        PRIMARY_NOISE: LiveStreamManager.getAudioObject('PRIMARY_NOISE', true),
        SIDE: LiveStreamManager.getAudioObject('SIDE'),
        FRONT: LiveStreamManager.getAudioObject('FRONT'),
        BACK: LiveStreamManager.getAudioObject('BACK'),
        CUSTOM: LiveStreamManager.getAudioObject('CUSTOM'),
    };
    /**
     *
     */
    constructor() {
        this.screen_stream = null;
        this.streamEndedEvent = 'ended';
        this.camera_stream = null;
        this.camera_view = false;
        this.audio_view = false;
        this.camRevoked = {};
        this.micRevoked = false;
        this.audio_stream = null;
        this.audio_device_id = { deviceId: undefined };
        this.videoDeviceIN = '';
        this.audioDeviceIN = '';
        this.camera_device_id = { deviceId: undefined };
        this.hasPermissions();
        this.camPermissions = false;
        this.micPermissions = false;
        this.checkSelectedDevicePerm = this.checkSelectedDevicePerm.bind(this);
    }
    static getCameraConstraint() {
        return {
            deviceId: undefined,
            width: { ideal: 1024 },
            height: { ideal: 576 },
            frameRate: { ideal: 25 },
        };
    }
    /**
     *
     * @param name
     */
    static getCameraObject(name) {
        return {
            stream: null,
            deviceId: this.getCameraConstraint(),
            label: '',
            name: name,
            noise: false,
            external: false,
        };
    }
    /**
     *
     * @param name
     */
    static getAudioObject(name, noise = false) {
        let constraints = utility.audioConstraints();
        return {
            stream: null,
            deviceId: constraints,
            label: '',
            name: name,
            noise: noise,
            external: false,
        };
    }
    /**
     *
     * @param value
     */
    async permissionEnable(value) {
        try {
            const permissionStatus = await navigator.permissions.query({ name: value });
            if (permissionStatus.state === 'granted') {
                return true;
            }
            else if (permissionStatus.state === 'prompt') {
                return false;
            }
            else if (permissionStatus.state === 'denied') {
                return false;
            }
            // You can also listen for changes in permission status
            // permissionStatus.onchange = () => {
            //   utility.log(`${value} permission changed to ${permissionStatus.state}`);
            // };
        }
        catch (error) {
            utility.error(`Error checking ${value} permission:`, error);
            return false;
        }
        return false;
    }
    /**
     *
     */
    async hasPermissions() {
        if (this.camera_view) {
            this.camPermissions = await this.permissionEnable('camera');
        }
        if (this.audio_view) {
            this.micPermissions = await this.permissionEnable('microphone');
        }
        return { camera: this.camPermissions, mic: this.micPermissions };
    }
    /* This function is request for screen share */
    /**
     *
     * @param callback
     * @param error_callback
     */
    async requestScreenShare(callback = () => { }, error_callback = (data) => { }) {
        try {
            let newConstraints = {
                audio: false,
                video: {
                    width: { max: 1024 },
                    height: { max: 576 },
                    cursor: 'always',
                    displaySurface: 'monitor',
                    frameRate: 25,
                },
            };
            let stream = await navigator.mediaDevices.getDisplayMedia(newConstraints);
            const track = stream.getVideoTracks()[0];
            const settings = track.getSettings();
            // Detect Firefox using user agent
            const isFirefox = browserCheck$1.getBrowserName();
            let isEntireScreenShared = true;
            //settings.width === screen.width && settings.height === screen.height;
            if (isFirefox == 'Firefox') {
                isEntireScreenShared = true;
            }
            const displaySurface = settings.displaySurface;
            if ((displaySurface && displaySurface !== 'monitor') || !isEntireScreenShared) {
                stream.getTracks().forEach((t) => t.stop());
                error_callback(ui.translations.status.entire_screen);
                return;
            }
            let self = this;
            stream.getTracks().forEach((track) => {
                track.addEventListener('ended', function () {
                    configrationManager.isScreenStreamEnding = true;
                    error_callback(ui.translations.status.entire_screen);
                    regularSnap.stopRegularSnapForCamera(LiveStreamManager.CAMERA.SCREEN.name);
                    if (configrationManager.video_recording == 1) {
                        self.stopRecord(LiveStreamManager.CAMERA.SCREEN);
                    }
                    LiveStreamManager.CAMERA.SCREEN.stream = null;
                    self.screenRevokeCallback();
                    setTimeout(() => {
                        configrationManager.isScreenStreamEnding = false;
                    }, 5000);
                }, false);
            });
            self.screenRevokeRetryCallback();
            LiveStreamManager.CAMERA.SCREEN.stream = stream;
            if (configrationManager.video_recording == 1) {
                this.record(LiveStreamManager.CAMERA.SCREEN);
            }
            if (configrationManager.image_recording == 1) {
                regularSnap.takeSnapImage(LiveStreamManager.CAMERA.SCREEN);
            }
            // Success for Firefox or Chrome with valid screen selection
            callback();
        }
        catch (e) {
            utility.error('Error requesting screen share:', e);
            error_callback(ui.translations.status.shareScreenFailed);
        }
    }
    /**
     *
     * @param callback
     * @param error_callback
     */
    async screenShare(callback = () => { }, error_callback = (data) => { }) {
        const button = ui.id('thinkX_btnScreen');
        if (button) {
            ui.click(button, async () => {
                await this.requestScreenShare(callback, error_callback);
            });
        }
    }
    /* This function is stop screen share */
    /**
     *
     */
    stopScreenStream() {
        if (this.screen_stream) {
            this.screen_stream.getTracks().forEach((track) => {
                track.removeEventListener(this.streamEndedEvent, this.handleVideoEnded);
                track.removeEventListener('ended', this.checkSelectedDevicePerm);
                track.removeEventListener('mute', this.checkSelectedDevicePerm);
                track.stop();
            });
            this.screen_stream = null;
        }
    }
    /**
     *
     */
    async getMediaDevices() {
        try {
            const devices = await navigator.mediaDevices.enumerateDevices();
            const videoDevices = devices.filter((device) => device.kind === 'videoinput');
            const audioDevices = devices.filter((device) => device.kind === 'audioinput');
            return { video: videoDevices, audio: audioDevices };
        }
        catch (error) {
            utility.error('Error enumerating devices:', error);
            return false;
        }
    }
    /**
     * Get list of available cameras excluding the ones already in use
     * @param includePrimary whether to include the primary camera
     */
    async getAvailableCameras(includePrimary = true) {
        try {
            // Enumerate all devices
            const devices = await navigator.mediaDevices.enumerateDevices();
            let videoDevices = devices.filter((device) => device.kind === "videoinput");
            // Collect all deviceIds that are already in use by LiveStreamManager.CAMERA
            const usedDeviceIds = Object.values(LiveStreamManager.CAMERA)
                .filter((cam) => cam.stream && cam.videoDeviceIN) // active cameras
                .map((cam) => cam.videoDeviceIN);
            // Filter out used cameras
            videoDevices = videoDevices.filter((device) => !usedDeviceIds.includes(device.deviceId));
            // Exclude primary camera if includePrimary = false
            if (!includePrimary && this.videoDeviceIN) {
                videoDevices = videoDevices.filter((device) => device.deviceId !== this.videoDeviceIN);
            }
            return videoDevices;
        }
        catch (error) {
            utility.error("Error getting available cameras:", error);
            return false;
        }
    }
    /**
     *
     * @param includePrimary
     */
    async getCameraList(includePrimary = true) {
        try {
            let stream = await navigator.mediaDevices.getUserMedia({ video: true });
            stream.getTracks().forEach((track) => {
                track.stop();
            });
            const deviceList = await this.getMediaDevices();
            if (typeof deviceList != 'boolean') {
                const cameraList = deviceList.video;
                if (includePrimary != true) {
                    //
                }
                return cameraList;
            }
            return false;
        }
        catch (error) {
            // need to work here....
            utility.error('Error getting camera list');
            return false;
        }
    }
    async getCameraListAvaliable(includePrimary = true) {
        try {
            let stream = await navigator.mediaDevices.getUserMedia({ video: true });
            stream.getTracks().forEach((track) => {
                track.stop();
            });
            const deviceList = await this.getAvailableCameras();
            if (typeof deviceList != 'boolean') {
                const cameraList = deviceList;
                if (includePrimary != true) {
                    //
                }
                return cameraList;
            }
            return false;
        }
        catch (error) {
            // need to work here....
            utility.error('Error getting camera list');
            return false;
        }
    }
    /**
     *
     * @param includePrimary
     */
    async getAudioList(includePrimary = true) {
        try {
            let stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            stream.getTracks().forEach((track) => {
                track.stop();
            });
            const deviceList = await this.getMediaDevices();
            if (typeof deviceList != 'boolean') {
                const audioList = deviceList.audio;
                if (includePrimary != true) {
                }
                return audioList;
            }
            return false;
        }
        catch (error) {
            utility.error('Error getting audio list');
            return false;
        }
    }
    /* This function is request for Audio Stream */
    /**
     *
     * @param audio
     */
    async requestAudio(audio) {
        const streamData = await this.getAudioStream(audio);
        if (!streamData) {
            this.showAudioRevokeDialog();
        }
        else {
            return streamData;
        }
    }
    /* This function is request for Video Stream*/
    /**
     *
     * @param camera
     */
    async requestVideo(camera, mobile = '') {
        const streamData = await this.getCameraStream(camera, mobile);
        if (!streamData) {
            this.showCameraRevokeDialog(camera.name);
        }
        else {
            return streamData;
        }
    }
    /* This function is check which device is available */
    /**
     *
     * @param camera
     */
    async checkCameraDevices(camera) {
        // Enumerate all available devices
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoInputDevices = devices.filter((device) => device.kind === 'videoinput');
        let videoDeviceStillAvailable = false;
        // Check each camera's videoDeviceIN
        if (camera && camera.stream && camera.videoDeviceIN) {
            const videoDeviceId = camera.videoDeviceIN;
            videoDeviceStillAvailable = videoInputDevices.some((device) => device.deviceId === videoDeviceId);
            if (!videoDeviceStillAvailable) {
                this.setCameraDeviceId(camera);
                camera.videoDeviceIN = '';
                camera.stream = null;
                utility.log(`Video device for provided camera is no longer available.`);
                this.showCameraRevokeDialog(camera.name); // You can pass info if needed
                this.closeVideoStream(camera);
            }
        }
        else {
            // If no specific camera passed, check all as before
            for (const key in LiveStreamManager.CAMERA) {
                const cam = LiveStreamManager.CAMERA[key];
                const videoDeviceId = cam.videoDeviceIN;
                if (!cam.stream || !videoDeviceId) {
                    continue;
                }
                if (!videoInputDevices.some((device) => device.deviceId === videoDeviceId)) {
                    cam.deviceId = LiveStreamManager.getCameraConstraint();
                    cam.videoDeviceIN = '';
                    cam.stream = null;
                    utility.log(`Video device for camera [${key}] is no longer available.`);
                    this.showCameraRevokeDialog(cam.name);
                    this.closeVideoStream(cam);
                }
            }
        }
    }
    /**
     *
     * @param audio
     */
    async checkAudioDevices(audio) {
        // Enumerate all available devices
        const devices = await navigator.mediaDevices.enumerateDevices();
        const audioInputDevices = devices.filter((device) => device.kind === 'audioinput');
        let audioDeviceStillAvailable = false;
        // Check each camera's videoDeviceIN
        if (audio && audio.stream && audio.audioDeviceIN) {
            const audioDeviceId = audio.audioDeviceIN;
            audioDeviceStillAvailable = audioInputDevices.some((device) => device.deviceId === audioDeviceId);
            if (!audioDeviceStillAvailable) {
                audio.deviceId = utility.audioConstraints();
                audio.audioDeviceIN = '';
                audio.stream = null;
                utility.log(`Audio device for provided audio is no longer available.`);
                this.showAudioRevokeDialog(); // You can pass info if needed
                this.closeAudioStream(audio);
            }
        }
        else {
            // If no specific camera passed, check all as before
            for (const key in LiveStreamManager.AUDIO) {
                const mic = LiveStreamManager.AUDIO[key];
                const audioDeviceId = mic.audioDeviceIN;
                if (!mic.stream || !audioDeviceId) {
                    continue;
                }
                if (!audioInputDevices.some((device) => device.deviceId === audioDeviceId)) {
                    mic.deviceId = utility.audioConstraints();
                    mic.audioDeviceIN = '';
                    mic.stream = null;
                    utility.log(`audio device for audio [${key}] is no longer available.`);
                    this.showAudioRevokeDialog();
                    this.closeAudioStream(mic);
                }
            }
        }
    }
    /**
     *
     * @param deviceId
     * @param type
     */
    async isValidDeviceId(deviceId, type) {
        try {
            const devices = await navigator.mediaDevices.enumerateDevices();
            // Filter video or audio devices based on the 'type' parameter
            const filteredDevices = devices.filter((device) => device.kind === type);
            // Check if the deviceId exists in the filtered devices
            const deviceExists = filteredDevices.some((device) => device.deviceId === deviceId);
            return deviceExists;
        }
        catch (error) {
            utility.error('Error checking devicecheckDevices ID validity:', error);
            return false;
        }
    }
    /**
     *
     * @param deviceId
     */
    async setCameraDeviceId(camera, deviceId) {
        //videoinput
        let deviceInfo = LiveStreamManager.getCameraConstraint();
        if (!(deviceId == undefined || deviceId == '')) {
            deviceInfo.deviceId = { exact: deviceId };
        }
        camera.deviceId = deviceInfo;
        // this.camRevoked = false;
        return this;
    }
    /**
     *
     * @param deviceId
     */
    async setAudioDeviceId(deviceId) {
        //audioinput
        if (!this.audio_view) {
            throw new Error('Mic setting not configured.');
        }
        if (!(await this.isValidDeviceId(deviceId, 'audioinput'))) {
            this.showAudioRevokeDialog();
            throw new Error('Invalid Audio Device Id');
            //return;
        }
        this.audio_device_id = { deviceId: deviceId ? { exact: deviceId } : undefined };
        this.micRevoked = false;
        return this;
    }
    /* This function is used to get Camera stream */
    /**
     *
     * @param camera
     */
    async getCameraStream(camera, mobile = '') {
        const self = this;
        try {
            if (camera.stream != null) {
                const existingTracks = camera.stream.getVideoTracks();
                const existingSettings = existingTracks.length > 0 ? existingTracks[0].getSettings() : {};
                return {
                    stream: camera.stream,
                    settings: existingSettings,
                };
            }
            this.camRevoked[camera.name] = false;
            if (!(await this.checkSelectedDevicePerm(null, 'camera', camera.name))) {
                return false;
            }
            const deviceId = camera.deviceId.deviceId != undefined ? camera.deviceId : true;
            let constraints = { video: deviceId };
            let stream;
            if (mobile != '') {
                let constraintsReal = LiveStreamManager.getCameraConstraint();
                let constraintsNew = {
                    video: {
                        width: constraintsReal.height,
                        height: constraintsReal.width,
                        frameRate: constraintsReal.frameRate,
                        facingMode: mobile, // 'environment' targets the rear camera
                    },
                    audio: false, // You can set this to true if you need audio as well
                };
                stream = await navigator.mediaDevices.getUserMedia(constraintsNew);
            }
            else {
                utility.log('Camera constraints:', constraints);
                stream = await navigator.mediaDevices.getUserMedia(constraints);
            }
            camera.stream = stream;
            if ('oninactive' in stream) {
                this.streamEndedEvent = 'inactive';
            }
            // Extract the device IDs for video and audio tracks
            const videoTracks = stream.getVideoTracks();
            if (videoTracks.length === 0) {
                utility.log('No video tracks found in the stream.');
                return false;
            }
            const videoTrack = videoTracks[0];
            const settings = videoTrack.getSettings();
            utility.log('Video track settings:', settings);
            if (videoTracks.length > 0) {
                //  await  videoTrack.applyConstraints({
                //           width: {ideal:1280},
                //           height: {ideal:720},
                //           frameRate: {ideal:25}});
                this.setCameraDeviceId(camera, videoTracks[0].getSettings().deviceId);
                camera.videoDeviceIN =
                    videoTracks[0].getSettings().deviceId || ui.translations.status.unknownVideoDevice;
                //utility.log(`Video Device ID: ${this.camera_device_id}`);
            }
            if (this.cameraPermissionEventSet == false) {
                // If video is true. add event listener for camera permissions
                const camera_perm = await navigator.permissions.query({ name: 'camera' });
                camera_perm.onchange = (evt) => {
                    const allowed = camera_perm.state === 'granted';
                    if (allowed) {
                        //utility.log("Camera permission allowed");
                    }
                    else {
                        self.checkCameraDevices(null);
                    }
                };
                this.cameraPermissionEventSet = true;
                this.deviceChange();
            }
            stream.getTracks().forEach((track) => {
                track.addEventListener(this.streamEndedEvent, function () {
                    utility.log('Jitendra Camera stream ended');
                    self.checkSelectedDevicePerm(null, 'camera', camera.name);
                }, false);
                track.addEventListener('mute', function () {
                    self.checkSelectedDevicePerm(null, 'camera', camera.name);
                }, false);
            });
            this.camera_view = true;
            camera.external = false;
            return { stream, settings };
        }
        catch (error) {
            utility.error('Error getting camera stream:', error);
            this.checkCameraDevices(camera);
            // this.handleGetUserMediaError(error);
            return false;
        }
    }
    /* This function is used to get Audio stream */
    /**
     *
     * @param audio
     */
    async getAudioStream(audio) {
        const self = this;
        try {
            if (audio.stream) {
                return audio.stream;
            }
            if (!(await this.checkSelectedDevicePerm(null, 'mic'))) {
                return false;
            }
            let deviceId = audio.deviceId.deviceId != undefined ? audio.deviceId : true;
            if (audio.noise) {
                // If noise is true, we will use the noise suppression feature
                if (deviceId != undefined && deviceId != true) {
                    deviceId.echoCancellation = false;
                    deviceId.noiseSuppression = false;
                    deviceId.suppressLocalAudioPlayback = false;
                }
            }
            else {
                if (deviceId != undefined && deviceId != true) {
                    deviceId.echoCancellation = true;
                    deviceId.noiseSuppression = true;
                    deviceId.autoGainControl = true;
                    deviceId.sampleRate = 16000;
                }
            }
            const constraints = { audio: deviceId };
            utility.log('Audio constraints:', constraints);
            const stream = await navigator.mediaDevices.getUserMedia(constraints);
            audio.stream = stream;
            if ('oninactive' in stream) {
                this.streamEndedEvent = 'inactive';
            }
            this.micRevoked = false;
            // Extract the device IDs for video and audio tracks
            const audioTracks = stream.getAudioTracks();
            if (audioTracks.length > 0) {
                let deviceId = audioTracks[0].getSettings().deviceId
                    ? { exact: audioTracks[0].getSettings().deviceId }
                    : undefined;
                audio.deviceId = utility.audioConstraints(deviceId);
                audio.audioDeviceIN =
                    audioTracks[0].getSettings().deviceId || ui.translations.status.unknownAudioDevice;
                //                    utility.log(`Audio Device ID: ${this.audio_device_id}`);
            }
            if (this.micPermissionEventSet == false) {
                // If audio is true. add event listener for mic permissions
                const mic_perm = await navigator.permissions.query({ name: 'microphone' });
                mic_perm.onchange = (evt) => {
                    const allowed = mic_perm.state === 'granted';
                    if (allowed) {
                        //utility.log("Mic permission allowed");
                    }
                    else {
                        self.checkAudioDevices(audio); // need to work
                    }
                };
                this.micPermissionEventSet = true;
                this.deviceChange();
            }
            // this.monitorMic(stream);
            stream.getTracks().forEach((track) => {
                track.addEventListener(this.streamEndedEvent, function () {
                    self.checkSelectedDevicePerm('mic');
                }, false);
                track.addEventListener('mute', function () {
                    self.checkSelectedDevicePerm('mic');
                }, false);
            });
            this.audio_view = true;
            return stream;
        }
        catch (error) {
            this.checkAudioDevices(audio); // need to work
            //                this.handleGetUserMediaError(error);
            return false;
        }
    }
    deviceChange() {
        navigator.mediaDevices.ondevicechange = async () => {
            utility.log('Device change detected');
            this.checkCameraDevices(null);
            this.checkAudioDevices(null);
        };
    }
    /**
     *
     * @param e
     * @param check
     */
    async checkSelectedDevicePerm(e, check = '', devicename = '') {
        let cameraAccess = true;
        let micAccess = true;
        // System-level permission checks
        if (this.camera_view && (check == '' || check == 'camera')) {
            // cameraAccess = await this.checkCameraPermission();
            // if (!cameraAccess) {
            //   this.camRevoked = true;
            // }else{
            cameraAccess = await this.permissionEnable('camera');
            if (!cameraAccess) {
                for (let cam in this.camRevoked) {
                    this.camRevoked[cam] = true;
                }
            }
            // }
        }
        if (this.audio_view && (check == '' || check == 'mic')) {
            // micAccess = await this.checkMicPermission();
            // if (!micAccess) {
            //   this.micRevoked = true;
            // }else {
            micAccess = await this.permissionEnable('microphone');
            if (!micAccess) {
                this.micRevoked = true;
            }
            // }
        }
        // if (this.camRevoked && this.micRevoked) {
        //   utility.log('System-level device permission revoked');
        //   this.showCameraAudioRevokeDialog();
        //   this.handleVideoEnded();
        //   this.handleAudioEnded();
        //   return false;
        // }
        for (let cam in this.camRevoked) {
            if ((cam == devicename || devicename == '') &&
                this.camRevoked[cam] &&
                (check == '' || check == 'camera')) {
                utility.log('System-level camera permission revoked');
                this.showCameraRevokeDialog(cam);
                if (cam == devicename) {
                    return false;
                }
            }
        }
        if (this.micRevoked && (check == '' || check == 'mic')) {
            utility.log('System-level microphone permission revoked');
            this.showAudioRevokeDialog();
            return false;
        }
        return true;
    }
    /**
     *
     */
    async checkCameraPermission() {
        try {
            const cm = await navigator.mediaDevices
                .getUserMedia({ video: true })
                .catch(() => false);
            if (cm && typeof cm !== 'boolean') {
                cm.getTracks().forEach((track) => track.stop()); // Stop all tracks
            }
            return cm ? true : false;
        }
        catch (e) {
            return false;
        }
    }
    /**
     *
     */
    async checkMicPermission() {
        try {
            const cm = await navigator.mediaDevices
                .getUserMedia({ audio: true })
                .catch(() => false);
            if (cm && typeof cm !== 'boolean') {
                cm.getTracks().forEach((track) => track.stop()); // Stop all tracks
            }
            return cm ? true : false;
        }
        catch (e) {
            return false;
        }
    }
    /**
     *
     */
    handleVideoEnded() {
        this.stopVideoStream();
    }
    /**
     *
     */
    stopVideoStream() {
        for (const key in LiveStreamManager.CAMERA) {
            const cam = LiveStreamManager.CAMERA[key];
            if (cam.stream) {
                cam.stream.getTracks().forEach((track) => {
                    track.removeEventListener(this.streamEndedEvent, this.handleVideoEnded);
                    track.removeEventListener('ended', this.checkSelectedDevicePerm);
                    track.removeEventListener('mute', this.checkSelectedDevicePerm);
                    track.stop();
                });
                cam.stream = null;
                cam.deviceId = LiveStreamManager.getCameraConstraint();
                cam.videoDeviceIN = '';
                utility.log(`Stopped stream for camera [${key}].`);
            }
        }
        this.camera_stream = null;
    }
    /**
     *
     */
    handleAudioEnded() {
        this.stopAudioStream();
    }
    /**
     *
     */
    stopAudioStream() {
        for (const key in LiveStreamManager.AUDIO) {
            const mic = LiveStreamManager.AUDIO[key];
            if (mic.stream) {
                mic.stream.getTracks().forEach((track) => {
                    track.removeEventListener(this.streamEndedEvent, this.handleAudioEnded);
                    track.removeEventListener('ended', this.checkSelectedDevicePerm);
                    track.removeEventListener('mute', this.checkSelectedDevicePerm);
                    track.stop();
                });
                mic.stream = null;
                mic.deviceId = utility.audioConstraints();
                utility.log(`Stopped stream for audio [${key}].`);
            }
        }
        this.audio_stream = null;
    }
    cameraRevokeRetryCallback = () => { };
    /**
     *
     * @param fn
     */
    setCameraRevokeRetryCallback(fn) {
        this.cameraRevokeRetryCallback = fn;
    }
    cameraRevokeCallback = () => { };
    /**
     *
     * @param fn
     */
    setCameraRevokeCallback(fn) {
        this.cameraRevokeCallback = fn;
    }
    micRevokeRetryCallback = () => { };
    /**
     *
     * @param fn
     */
    setMicRevokeRetryCallback(fn) {
        this.micRevokeRetryCallback = fn;
    }
    micRevokeCallback = () => { };
    /**
     *
     * @param fn
     */
    setMicRevokeCallback(fn) {
        this.micRevokeCallback = fn;
    }
    screenRevokeCallback = () => { };
    /**
     *
     * @param fn
     */
    setScreenRevokeCallback(fn) {
        this.screenRevokeCallback = fn;
    }
    screenRevokeRetryCallback = () => { };
    /**
     *
     * @param fn
     */
    setScreenRevokeRetryCallback(fn) {
        this.screenRevokeRetryCallback = fn;
    }
    /**
     *
     */
    showCameraRevokeDialog(cameraName = '') {
        if (this.isCameraRevoked && this.camRevoked[cameraName]) {
            return;
        }
        this.isCameraRevoked = true;
        utility.wait(5000).then(() => {
            this.isCameraRevoked = false;
        });
        this.camRevoked[cameraName] = true;
        // this.monitor.apiM.userActivity(this.monitor.currentStep,"Camera Revoked.");
        // var uiM = this.monitor.uiManager;
        const self = this;
        // ui.alertDialog(
        //   ui.translations.popup_text.additionalCameraDisconnect,
        //   ui.translations.popup_text.cameraDisconnected,
        //   ui.translations.popup_buttons.retry,
        //   function (dialog: HTMLElement) {
        //     ui.hide(dialog);
        //     self.cameraRevokeCallback();
        //   }
        // );
        if (this.cameraRevokeContinouslyInterval) {
            clearInterval(this.cameraRevokeContinouslyInterval);
        }
        self.cameraRevokeCallback();
        if (cameraName == 'P_CAM') {
            socket.cameraRevoke('P_CAM');
        }
        if (cameraName == 'P_CAM' || cameraName == '') {
            // if (LiveStreamManager.CAMERA.PRIMARY.recording) {
            //   self.stopRecord(LiveStreamManager.CAMERA.PRIMARY);
            // }
            ui.cameraPermission(function (dialog, selectedCameraId, selectedCameraLabel) {
                ui.hide(dialog);
                self
                    .isValidDeviceId(selectedCameraId, 'videoinput')
                    .then(async (response) => {
                    if (response == true) {
                        self.setCameraDeviceId(LiveStreamManager.CAMERA.PRIMARY, selectedCameraId);
                        LiveStreamManager.CAMERA.PRIMARY.label = selectedCameraLabel;
                        LiveStreamManager.CAMERA.PRIMARY.stream = null;
                        self.camRevoked[LiveStreamManager.CAMERA.PRIMARY.name] = false;
                        await self.requestVideo(LiveStreamManager.CAMERA.PRIMARY);
                        // After retry successfull. trigger camera retry of the current step
                        self.cameraRevokeRetryCallback();
                        self.cameraRevokeContinously(cameraName);
                    }
                    else {
                        self.showCameraRevokeDialog(cameraName);
                        // errorManager.throwError("Error", "CAMERA_NOT_FOUND");
                    }
                })
                    .catch(() => {
                    self.showCameraRevokeDialog(cameraName);
                    // errorManager.throwError("Error", "CAMERA_NOT_FOUND");
                });
            });
        }
        else {
            utility.log("Camera REvoke", cameraName);
        }
    }
    /**
     *
     */
    showAudioRevokeDialog() {
        this.micRevoked = true;
        // // this.monitor.apiM.userActivity(this.monitor.currentStep,"Mic Revoked.");
        // // var uiM = this.monitor.uiManager;
        const self = this;
        // ui.alertDialog(
        //   ui.translations.popup_text.additionalMicDisconnect,
        //   ui.translations.popup_text.micDisconnected,
        //   ui.translations.popup_buttons.retry,
        //   function (dialog: HTMLElement) {
        //     ui.hide(dialog);
        //     self.micRevokeCallback();
        //   }
        // );
        self.micRevokeCallback();
        ui.micPermission(function (dialog, selectedMicId, selectedMicLabel) {
            ui.hide(dialog);
            self
                .isValidDeviceId(selectedMicId, 'audioinput')
                .then(async (response) => {
                if (response == true) {
                    LiveStreamManager.AUDIO.PRIMARY.deviceId = utility.audioConstraints(selectedMicId);
                    LiveStreamManager.AUDIO.PRIMARY.label = selectedMicLabel;
                    LiveStreamManager.AUDIO.PRIMARY.stream = null;
                    self.micRevoked = false;
                    await self.requestAudio(LiveStreamManager.AUDIO.PRIMARY);
                    // After retry successfull. trigger mic retry of the current step
                    self.micRevokeRetryCallback();
                }
                else {
                    self.showAudioRevokeDialog();
                    // errorManager.throwError('Error', 'AUDIO_NOT_FOUND');
                }
            })
                .catch(() => {
                self.showAudioRevokeDialog();
                // errorManager.throwError('Error', 'AUDIO_NOT_FOUND');
            });
        });
    }
    /**
     *
     */
    showCameraAudioRevokeDialog() {
        // this.monitor.apiM.userActivity(this.monitor.currentStep,"Camera and Mic Revoked.");
        // var uiM = this.monitor.uiManager;
        // uiM.deviceRetryDialog('both');
    }
    /**
     *
     */
    stopStreams() {
        this.stopAllRecordings();
        this.stopScreenStream();
        this.stopVideoStream();
        this.stopAudioStream();
    }
    /**
     *
     * @param camera
     */
    async record(camera) {
        if (configrationManager.video_recording == 0) {
            return;
        }
        if (!camera.stream) {
            return;
        }
        let mediaStream;
        if (camera.name == 'P_CAM' && LiveStreamManager.AUDIO.PRIMARY.stream) {
            mediaStream = new MediaStream([
                ...camera.stream.getTracks(),
                ...LiveStreamManager.AUDIO.PRIMARY.stream?.getTracks(),
            ]);
        }
        else if (camera.name == 'SR_CAM' && configrationManager.currentStepAlias == 'Interview_Session') {
            if (this.destination == null) {
                if (this.audioContext.state === "suspended") {
                    await this.audioContext.resume();
                }
                this.destination = this.audioContext.createMediaStreamDestination();
            }
            else {
                if (this.audioContext.state === "suspended") {
                    await this.audioContext.resume();
                }
            }
            if (LiveStreamManager.AUDIO.PRIMARY.stream) {
                this.audioContext.createMediaStreamSource(LiveStreamManager.AUDIO.PRIMARY.stream).connect(this.destination);
            }
            mediaStream = new MediaStream([
                camera.stream.getVideoTracks()[0],
                ...this.destination.stream.getAudioTracks(),
            ]);
        }
        else {
            mediaStream = camera.stream;
        }
        if (!(camera.recording instanceof Recording)) {
            if (!configrationManager.recordingUrl) {
                utility.error('Recording URL is not configured.');
                return;
            }
            const cameraName = camera.name;
            let worker = await this.getRecordingWorker();
            camera.recording = new Recording(configrationManager.recordingUrl, mediaStream, cameraName, worker);
        }
        else {
            camera.recording.setStream(mediaStream);
        }
        utility.log(`Starting recording for camera: ${camera.name}`, camera.recording);
        camera.recording.start();
    }
    /**
     *
     * @param camera
     */
    pauseRecord(camera) {
        if (camera.recording instanceof Recording) {
            camera.recording.pause();
        }
    }
    /**
     *
     * @param camera
     */
    stopRecord(camera) {
        if (camera.recording instanceof Recording) {
            camera.recording.stop();
            camera.recording = undefined; // Reset the recording object
        }
    }
    stopAllRecordings() {
        for (let cameraIndex in LiveStreamManager.CAMERA) {
            let camera = LiveStreamManager.CAMERA[cameraIndex];
            this.stopRecord(camera);
        }
    }
    /**
     *
     */
    async checkSpeakerAvailable() {
        if (!navigator.mediaDevices?.enumerateDevices) {
            utility.warn('enumerateDevices() not supported.');
            return false;
        }
        const devices = await navigator.mediaDevices.enumerateDevices();
        const hasSpeaker = devices.some((device) => device.kind === 'audiooutput');
        return hasSpeaker;
    }
    async getAudioChannelCountFromStream(audio) {
        return new Promise((resolve, reject) => {
            try {
                if (!audio.stream) {
                    return reject(new Error('Audio stream is null.'));
                }
                let track = audio.stream.getAudioTracks()[0];
                let channelCount = track.getSettings().channelCount;
                if (channelCount == undefined) {
                    channelCount = 2;
                }
                resolve(channelCount);
            }
            catch (error) {
                reject(error);
            }
        });
    }
    closeAudioStream(audio) {
        if (audio && audio.stream instanceof MediaStream) {
            audio.stream.getTracks().forEach((track) => track.stop()); // Stop all tracks
            audio.stream = null; // Set the stream reference to null
        }
    }
    closeVideoStream(video) {
        if (video && video.stream instanceof MediaStream) {
            video.stream.getTracks().forEach((track) => track.stop()); // Stop all tracks
            video.stream = null; // Set the stream reference to null
        }
    }
    updateRoomRemoteStream(stream) {
        LiveStreamManager.CAMERA.ROOM.stream = stream;
        LiveStreamManager.CAMERA.ROOM.external = true;
    }
    updateCameraSetupStream(stream, camera_type) {
        if (camera_type === 'S_CAM') {
            LiveStreamManager.CAMERA.SIDE.stream = stream;
            LiveStreamManager.CAMERA.SIDE.external = true;
        }
        else if (camera_type === 'B_CAM') {
            LiveStreamManager.CAMERA.BACK.stream = stream;
            LiveStreamManager.CAMERA.BACK.external = true;
        }
        else if (camera_type === 'F_CAM') {
            LiveStreamManager.CAMERA.FRONT.stream = stream;
            LiveStreamManager.CAMERA.FRONT.external = true;
        }
        else if (camera_type === 'C_CAM') {
            LiveStreamManager.CAMERA.CUSTOM.stream = stream;
            LiveStreamManager.CAMERA.CUSTOM.external = true;
        }
        else {
            utility.error(`Unknown camera type: ${camera_type}`);
            return;
        }
    }
    getStreamByName(name) {
        for (let cam in LiveStreamManager.CAMERA) {
            if (LiveStreamManager.CAMERA[cam].name == name) {
                return LiveStreamManager.CAMERA[cam];
            }
        }
        for (let mic in LiveStreamManager.AUDIO) {
            if (LiveStreamManager.AUDIO[mic].name == name) {
                return LiveStreamManager.AUDIO[mic];
            }
        }
        return null;
    }
    setSocketEvents() {
        let self = this;
        sdkEvents.on(SDK_EVENT.CHAT_MESSAGE, function (from, msg) {
            utility.log(from, msg);
            if (msg?.mode == 'stream_request') {
                if (msg?.text == 'P_CAM' && LiveStreamManager.CAMERA.PRIMARY.stream != null) {
                    peer.streamAdd(from, LiveStreamManager.CAMERA.PRIMARY);
                }
            }
        });
        sdkEvents.on(SDK_EVENT.STREAM_INFO_REQUEST, function () {
            let streamInfo = self.getAllStreamsId();
            socket.sendRoomMessage({ mode: 'streamInfo', text: 'Stream Ids', data: streamInfo });
        });
        sdkEvents.on(SDK_EVENT.STREAM_REQUEST, function (camera, from) {
            let obj = self.getStreamByName(camera);
            if (obj && obj.external == false) {
                peer.connect(from, obj);
                // utility.wait(100).then(() => {
                //   peer.streamAdd(from, obj); // Send mobile stream to Desktop . it will be recived in subscribe events.
                // });
            }
        });
    }
    getAllStreamsId() {
        let cameraDetails = {};
        for (let cam in LiveStreamManager.CAMERA) {
            let camera = LiveStreamManager.CAMERA[cam];
            if (camera.stream != null && camera.external == false) {
                cameraDetails[camera.name] = camera.stream.id;
            }
        }
        const sideEnable = configrationManager.valueMap.additional_cam.data.ai_enable.data.ai_side_view_cam;
        const backEnable = configrationManager.valueMap.additional_cam.data.ai_enable.data.ai_back_view_cam;
        const frontEnable = configrationManager.valueMap.additional_cam.data.ai_enable.data.ai_front_view_cam;
        const customEnable = configrationManager.valueMap.additional_cam.data.live_custom_cam.value;
        if (LiveStreamManager.PRIMARY_CAMERA_NAME == 'P_CAM'
            && (!("P_CAM" in cameraDetails)
                && LiveStreamManager.CAMERA.PRIMARY.stream == null)) {
            cameraDetails["P_CAM"] = "";
        }
        if (LiveStreamManager.PRIMARY_CAMERA_NAME == 'P_CAM'
            && configrationManager.sharedScreen
            && (!("SR_CAM" in cameraDetails)
                && LiveStreamManager.CAMERA.SCREEN.stream == null)) {
            cameraDetails["SR_CAM"] = "";
        }
        if (customEnable
            && (!("C_CAM" in cameraDetails)
                && LiveStreamManager.CAMERA.CUSTOM.stream == null
                && ((LiveStreamManager.CAMERA.CUSTOM.external == false && LiveStreamManager.PRIMARY_CAMERA_NAME == 'P_CAM') || LiveStreamManager.PRIMARY_CAMERA_NAME == 'C_CAM'))) {
            cameraDetails["C_CAM"] = "";
        }
        if (sideEnable
            && (!("S_CAM" in cameraDetails)
                && LiveStreamManager.CAMERA.SIDE.stream == null
                && ((LiveStreamManager.CAMERA.SIDE.external == false && LiveStreamManager.PRIMARY_CAMERA_NAME == 'P_CAM') || LiveStreamManager.PRIMARY_CAMERA_NAME == 'S_CAM'))) {
            cameraDetails["S_CAM"] = "";
        }
        if (backEnable
            && (!("B_CAM" in cameraDetails)
                && LiveStreamManager.CAMERA.BACK.stream == null
                && ((LiveStreamManager.CAMERA.BACK.external == false && LiveStreamManager.PRIMARY_CAMERA_NAME == 'P_CAM') || LiveStreamManager.PRIMARY_CAMERA_NAME == 'B_CAM'))) {
            cameraDetails["B_CAM"] = "";
        }
        if (frontEnable
            && (!("F_CAM" in cameraDetails)
                && LiveStreamManager.CAMERA.FRONT.stream == null
                && ((LiveStreamManager.CAMERA.FRONT.external == false && LiveStreamManager.PRIMARY_CAMERA_NAME == 'P_CAM') || LiveStreamManager.PRIMARY_CAMERA_NAME == 'F_CAM'))) {
            cameraDetails["F_CAM"] = "";
        }
        for (let mic in LiveStreamManager.AUDIO) {
            let audio = LiveStreamManager.AUDIO[mic];
            if (audio.stream != null && audio.external == false) {
                cameraDetails[audio.name] = audio.stream.id;
            }
        }
        return cameraDetails;
    }
    //disable stream tracks
    disableStreamTracks(camera) {
        if (camera && camera.stream instanceof MediaStream) {
            camera.stream.getTracks().forEach((track) => {
                track.enabled = false;
            });
        }
    }
    //enable stream tracks
    enableStreamTracks(camera) {
        if (camera && camera.stream instanceof MediaStream) {
            camera.stream.getTracks().forEach((track) => {
                track.enabled = true;
            });
        }
    }
    disableAudioTracks(audio) {
        if (audio?.stream instanceof MediaStream) {
            audio.stream.getAudioTracks().forEach(track => {
                track.enabled = false;
            });
        }
    }
    async addRemoteUserAudio(userId, track) {
        const s = new MediaStream([track]);
        const node = this.audioContext.createMediaStreamSource(s);
        // Ensure destination exists before connecting
        if (!this.destination) {
            this.destination = this.audioContext.createMediaStreamDestination();
        }
        if (this.audioContext.state === "suspended") {
            await this.audioContext.resume();
        }
        node.connect(this.destination);
        this.remoteAudioNodes.set(userId, node);
    }
    // Remove remote user
    removeRemoteUserAudio(userId) {
        const node = this.remoteAudioNodes.get(userId);
        if (node) {
            // If destination exists disconnect from it, otherwise just disconnect the node
            if (this.destination) {
                node.disconnect(this.destination);
            }
            else {
                node.disconnect();
            }
            this.remoteAudioNodes.delete(userId);
        }
    }
    getRecordingWorker() {
        let self = this;
        return new Promise((resolve, reject) => {
            if (self.workerFile) {
                let worker = new Worker(self.workerFile);
                resolve(worker);
                return;
            }
            fetch(this.workerPath)
                .then(response => response.text())
                .then(workerCode => {
                // Create a Blob from the code and get an object URL
                const blob = new Blob([workerCode], { type: 'application/javascript' });
                const workerUrl = URL.createObjectURL(blob);
                self.workerFile = workerUrl;
                let worker = new Worker(self.workerFile);
                // Construct the worker using the local object URL
                resolve(worker);
                // ... proceed with postMessage
            }).catch(error => utility.error("Could not load recording worker script:", error));
        });
    }
    monitorMic(stream) {
        let self = this;
        const audioContext = new AudioContext();
        const source = audioContext.createMediaStreamSource(stream);
        const analyser = audioContext.createAnalyser();
        source.connect(analyser);
        const dataArray = new Uint8Array(analyser.frequencyBinCount);
        let silenceStart = null;
        function checkVolume() {
            analyser.getByteFrequencyData(dataArray);
            const volume = dataArray.reduce((a, b) => a + b) / dataArray.length;
            if (volume === 0) {
                if (!silenceStart)
                    silenceStart = Date.now();
                // If silent for more than 3 seconds, trigger your "lost mic" logic
                if (Date.now() - silenceStart > 3000) {
                    utility.log("Microphone signal lost (System Revoke likely)");
                    stream.getTracks().forEach((track) => track.stop()); // Stop all tracks
                    self.showAudioRevokeDialog();
                    // Trigger your custom 'stream stopped' event here
                    return;
                }
            }
            else {
                silenceStart = null; // Reset if sound returns
            }
            requestAnimationFrame(checkVolume);
        }
        setTimeout(() => {
            checkVolume();
        }, 5000);
    }
    cameraRevokeContinously(cameraName = '') {
        if (this.cameraRevokeContinouslyInterval) {
            clearInterval(this.cameraRevokeContinouslyInterval);
        }
        this.cameraRevokeContinouslyInterval = setInterval(async () => {
            let self = this;
            const cameraObj = LiveStreamManager.CAMERA.PRIMARY;
            const stream = cameraObj.stream;
            if (!stream || !stream.active) {
                this.cameraRevokeRessign = true;
            }
            else {
                const videoTrack = stream.getVideoTracks()[0];
                if (!videoTrack || videoTrack.readyState !== 'live') {
                    this.cameraRevokeRessign = true;
                }
            }
            if (this.cameraRevokeRessign) {
                utility.log('Camera issue detected. Trying recovery using getCameraStream...');
                // Reset old stream before retry
                cameraObj.stream = null;
                const res = await this.getCameraStream(cameraObj);
                if (res && res.stream) {
                    utility.log('Camera recovered successfully');
                    if (configrationManager.userType == "2") {
                        const videoElement = ui.id('thinkInterview_candidateVideoSession');
                        if (videoElement) {
                            videoElement.srcObject = res.stream;
                            videoElement.play().catch(() => { });
                            this.updateStream();
                        }
                    }
                    else {
                        const videoElement = ui.id('thinkInterview_interviewerVideo');
                        if (videoElement) {
                            videoElement.srcObject = res.stream;
                            videoElement.play().catch(() => { });
                            this.updateStream();
                        }
                    }
                    // ✅ Reset flag after success
                    this.cameraRevokeRessign = false;
                    return;
                }
                else {
                    self.camRevoked[LiveStreamManager.CAMERA.PRIMARY.name] = true;
                    self.showCameraRevokeDialog(cameraName);
                    return;
                }
            }
            console.log('Camera stream is active');
        }, 6000);
    }
    updateStream() {
        this.getAllStreamsId();
        // chat.sendData('stream_update', streamInfo);
        // utility.wait(2000).then(() => {
        //   peer.streamAddAll(LiveStreamManager.CAMERA.PRIMARY, LiveStreamManager.CAMERA.CUSTOM, LiveStreamManager.AUDIO.PRIMARY);
        // });
        interviewMonitor.attendance();
    }
}
const liveStreamManager = new LiveStreamManager();

// type ValueAndData = {
//   value?: any;
//   data?: any;
// };
/**
 *
 */
class ConfigrationManager {
    config;
    flattenedTemplate = {};
    liveStreamManager = null;
    // Declare the config keys as properties (optional, but good for clarity & TS)
    url;
    signal_node_url;
    appEnv;
    recording_node_url;
    turn_url = '';
    stun_url = '';
    stun_password = '';
    stun_username = '';
    turn_password = '';
    turn_username = '';
    socketUserName;
    socketRoomName;
    language;
    speechUrl;
    recordingUrl = '';
    roomAttemptNo;
    browserMobileEnable;
    speakerEnable;
    initComplete;
    compatibilityComplete;
    compatibilityStarted;
    compatibilityCompleteCallback;
    launchComplete;
    isPaused;
    isPlay;
    photoAttemptNo;
    sharedScreen;
    recording = 0;
    video_recording = 0;
    image_recording = 0;
    speakerAttempt;
    maxRoomAttempt;
    isMobile = false;
    CameraSetupInstruction = true;
    base64Snapshot = null;
    cameraSetupStep = 0;
    currentStep = '';
    currentStepObject = null;
    currentStepAlias = '';
    currentProctor = '';
    currentCandidateName = '';
    completeExam = () => { };
    firstLogin = true;
    sentFirstLoginMsg = false;
    smartProctorEnable;
    previous_instance_escalated;
    userEscaltedPara = 1;
    qrId = '';
    candidateNameMsg = 'candidate';
    isTerminated = false;
    isSubmited = '';
    reCameraRevoke = '';
    alreadySpeechCalled = {};
    interviewCandidateName = '';
    interviewCandidateSocketName = '';
    interviewNames = [];
    intervierData = {};
    interviewSocketNames = [];
    userType = '';
    behaviourSkills = [];
    functionalSkills = [];
    skillsData = {
        behaviour: [],
        functional: [],
    };
    jobName = '';
    candidateRegisterURL = '';
    sessionIdRec = 0;
    instanceIdRec = 0;
    link_status = '';
    userId = 0;
    video_mute = false;
    audio_mute = false;
    interviwerJoiningTime = 0;
    activeInterviewer = '';
    interviewerAudioMute = {};
    interviewerVideoMute = {};
    totalInterviwerCount = 0;
    transcriptCode = '';
    isScreenStreamEnding = false;
    currentLang = 'en';
    termsAndConditionsLink = '';
    privacyStatementLink = '';
    socketRealUserName = '';
    /**
     *
     */
    constructor() {
        this.config = {};
        this.signal_node_url = '';
        this.appEnv = 'local_interview';
        this.socketUserName = '';
        this.socketRoomName = '';
        this.language = 'en';
        this.speechUrl = '';
        this.roomAttemptNo = 0;
        this.browserMobileEnable = 0;
        this.speakerEnable = 0;
        this.compatibilityComplete = 0;
        this.compatibilityStarted = 0;
        this.compatibilityCompleteCallback = () => { };
        this.initComplete = 0;
        this.launchComplete = 0;
        this.isPaused = false;
        this.isPlay = false;
        this.photoAttemptNo = 0;
        this.sharedScreen = 0;
        this.speakerAttempt = 0;
        this.maxRoomAttempt = 0;
        this.CameraSetupInstruction = true;
        this.currentProctor = '';
        this.smartProctorEnable = 0;
        this.previous_instance_escalated = false;
        this.alreadySpeechCalled = {};
    }
    /**
     *
     * @param data
     * @param data.url
     * @param data.signal_node_url
     * @param data.recording_node_url
     * @param data.turn_url
     * @param data.stun_url
     * @param data.stun_password
     * @param data.stun_username
     * @param data.turn_password
     * @param data.turn_username
     * @param data.env
     * @param data.speechURL
     */
    setConfig(data) {
        this.config = { ...data };
        if (data.url !== undefined)
            this.url = data.url;
        if (data.signal_node_url !== undefined)
            this.signal_node_url = data.signal_node_url;
        if (data.recording_node_url !== undefined)
            this.recording_node_url = data.recording_node_url;
        if (data.turn_url !== undefined)
            this.turn_url = data.turn_url;
        if (data.stun_url !== undefined)
            this.stun_url = data.stun_url;
        if (data.stun_password !== undefined)
            this.stun_password = data.stun_password;
        if (data.stun_username !== undefined)
            this.stun_username = data.stun_username;
        if (data.turn_password !== undefined)
            this.turn_password = data.turn_password;
        if (data.turn_username !== undefined)
            this.turn_username = data.turn_username;
        if (data.env !== undefined)
            this.appEnv = data.env;
        if (data.speechURL !== undefined)
            this.speechUrl = data.speechURL;
        if (data.recording_node_url !== undefined)
            this.recordingUrl = data.recording_node_url;
        // utility.log("Config set in ConfigrationManager", this);
    }
    /**
     *
     * @param template
     */
    extractValueAndData(template) {
        const result = {};
        for (const key in template) {
            if (template.hasOwnProperty(key)) {
                const obj = template[key];
                if (obj && typeof obj === 'object') {
                    // Preserve both value and data keys as-is if present
                    result[key] = {};
                    if ('value' in obj)
                        result[key].value = obj.value;
                    if ('data' in obj)
                        result[key].data = obj.data;
                }
                else {
                    result[key] = obj;
                }
            }
        }
        this.flattenedTemplate = result;
        return result;
    }
    setTemplateData() {
        this.appEnv = 'local_interview';
        this.language = 'en';
        this.maxRoomAttempt =
            this.valueMap.room_sanitization_enabled.data.ai_revoke_room_san_attempt.value;
        this.roomAttemptNo = 1;
        this.browserMobileEnable = this.valueMap.device_support.value;
        this.speakerEnable = 0; //this.valueMap.speaker_check.value;
        this.photoAttemptNo = 1;
        this.sharedScreen = 0; //this.valueMap.screen_share.value;
        this.recording = this.valueMap.session_recording.value;
        if (this.recording == 1 && this.userType == "2") {
            this.video_recording = 1;
            this.sharedScreen = 1;
        }
        else {
            this.video_recording = 0;
        }
        // this.video_recording =
        //   this.valueMap.session_recording.data.session_recording_type.value == 1 ? 1 : 0;
        this.image_recording = 0;
        this.speakerAttempt = 0;
        this.smartProctorEnable = 0;
        this.jobName = this.valueMap.job_name.data.job_role_name.value;
        this.behaviourSkills = [];
        this.functionalSkills = [];
        if (this.valueMap.behaviour_skill && typeof this.valueMap.behaviour_skill.data === 'object') {
            const selectedIds = this.valueMap.behaviour_skill.value
                .split(',')
                .map((id) => parseInt(id.trim(), 10)); // [1, 2, 3, 4, 35]
            const skillData = Object.values(this.valueMap.behaviour_skill.data);
            this.behaviourSkills = skillData
                .filter((item) => selectedIds.includes(item.behaviour_skill_id))
                .map((item) => ({
                id: item.behaviour_skill_id,
                name: item.behaviour_skill_name,
            }));
        }
        if (this.valueMap.functional_skill && typeof this.valueMap.functional_skill.data === 'object') {
            const selectedNames = this.valueMap.functional_skill.value
                .split(',')
                .map((name) => name.trim()); // ["JavaScript", "Python", "Java", "SEO"]
            const skillData = Object.values(this.valueMap.functional_skill.data);
            this.functionalSkills = skillData
                .filter((item) => selectedNames.includes(item.functional_skill_name))
                .map((item) => ({
                id: item.functional_skill_id,
                name: item.functional_skill_name,
            }));
        }
        // 🔹 Combine both skill sets for unified access
        this.skillsData = {
            behaviour: this.behaviourSkills,
            functional: this.functionalSkills,
        };
        this.loadRecordingWebWorker();
    }
    loadRecordingWebWorker() {
        // Load the web worker for recording
        if (this.video_recording == 1 || this.sharedScreen == 1) {
            liveStreamManager.getRecordingWorker();
        }
    }
    /**
     *
     * @param socketUserName
     */
    socketUser(socketUserName) {
        this.socketUserName = socketUserName;
        this.socketRealUserName = socketUserName;
    }
    /**
     *
     * @param socketUserName
     */
    socketRoom(socketRoomName) {
        this.socketRoomName = socketRoomName;
    }
    /**
     *
     */
    get valueMap() {
        return this.flattenedTemplate;
    }
    /**
     *
     * @param lang
     */
    saveLang(lang) {
        this.language = lang;
    }
    /**
     *
     * @param url
     */
    speechURL(url) {
        this.speechUrl = utility.decodeBase64(url);
    }
    /**
     *
     * @param url
     */
    async isValidAndReachableImageUrl(url) {
        try {
            const parsedUrl = new URL(url.trim());
            // Must be http or https
            if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
                return false;
            }
            // Must end with .jpg/.jpeg/.png
            if (!/\.(jpg|jpeg|png)$/i.test(parsedUrl.pathname)) {
                return false;
            }
            // Try to load the image
            return await new Promise((resolve) => {
                const img = new Image();
                img.onload = () => resolve(true); // Successfully loaded
                img.onerror = () => resolve(false); // Failed to load (bad domain or 404)
                img.src = url;
            });
        }
        catch {
            return false;
        }
    }
    setCandidateDetail(candidate_details) {
        const firstCandidate = candidate_details[0];
        this.interviewCandidateName = firstCandidate.name;
        this.interviewCandidateSocketName = firstCandidate.socket_name;
    }
    setInterviewDetails(interview_details) {
        this.interviewNames = [];
        this.interviewSocketNames = [];
        this.totalInterviwerCount = interview_details.length;
        // ✅ Loop and store both names and socket names
        for (const detail of interview_details) {
            if (detail.name && detail.socket_name) {
                this.interviewNames.push(detail.name);
                this.interviewSocketNames.push(detail.socket_name);
                this.intervierData[detail.socket_name] = {
                    videoStream: null,
                    audioMute: false,
                    videoMute: false,
                    name: detail.name,
                    feedback_required: detail.feedback_required ?? false,
                    feedback_given: detail.feedback_given ?? false,
                };
            }
        }
    }
}
const configrationManager = new ConfigrationManager();

/**
 *
 */
class BrowserUI {
    /**
     *
     */
    showLoader() {
        const loaderHTML = UiComponents.loading();
        stepUIManager.setGif(loaderHTML, 'thinkX_browserSuccess');
    }
    /**
     *
     */
    hideLoader() {
        const existingLoader = ui.id('thinkX_loading');
        if (existingLoader && existingLoader.parentNode) {
            existingLoader.parentNode.removeChild(existingLoader);
        }
    }
    /**
     *
     */
    retryCloseBtn() {
        ui.hide(ui.id('thinkX_browser-check'));
        ui.hide(ui.id('thinkX_browser-static'));
        ui.show(ui.id('thinkX_browser-Error'));
        ui.hide(ui.id('thinkX_checkingBrowser'));
        stepUIManager.setRetryCloseBtn(UiComponents.retryCloseBtn(ui.translations.status.closeBrowser, 'thinkX_cameraClose'), 'thinkX_browserSuccess');
        const button = ui.id('thinkX_cameraClose');
        if (button) {
            ui.setCloseApplicationButton(button);
        }
    }
    /**
     *
     */
    browserSuccess() {
        ui.hide(ui.id('thinkX_browser-Error'));
        ui.hide(ui.id('thinkX_browser-static'));
        ui.show(ui.id('thinkX_browser-check'));
    }
    /**
     *@param data
     *@param data.browser
     *@param data.oldVersion
     *@param data.newVersion
     */
    replacePlaceholders(template, data) {
        return template.replace(/{{(.*?)}}/g, (_, key) => {
            return data[key.trim()]?.toString() ?? '';
        });
    }
    // Your final function
    browserVersionMessage(data) {
        const template = ui.translations.status.browserVersion;
        return this.replacePlaceholders(template, data);
    }
}
const browserUI = new BrowserUI();

/**
 *
 */
class BrowserCheck extends StepInterface {
    envAlias = 'Browser_Check';
    min_IE_version;
    min_chrome_version;
    min_firefox_version;
    min_safari_version;
    min_edge_version;
    /**
     *
     */
    constructor() {
        super();
        this.min_IE_version = 11;
        this.min_chrome_version = 137.0;
        this.min_firefox_version = 139.0;
        this.min_safari_version = 16.0;
        this.min_edge_version = 138.0;
    }
    /**
     *
     */
    start() {
        browserUI.showLoader();
        utility.wait(2000).then(() => {
            const data = this.getDeviceInfo();
            let browserValid = true;
            const https = this.checkHTTPS();
            if (!https.browserSupport) {
                browserUI.hideLoader();
                browserValid = false;
                this.resultData.error.push(https.browserMsg);
                this.end();
                this.onError(() => {
                    browserUI.retryCloseBtn();
                });
            }
            if (data.browser == 'Firefox') {
                browserUI.hideLoader();
                browserValid = false;
                this.resultData.error.push(ui.translations.status.firefoxDisable);
                this.end();
                this.onError(() => {
                    browserUI.retryCloseBtn();
                });
            }
            if (configrationManager.browserMobileEnable == 1 && data.device != 'PC') {
                browserUI.hideLoader();
                browserValid = false;
                this.resultData.error.push(ui.translations.status.mobileEnable);
                this.end();
                this.onError(() => {
                    browserUI.retryCloseBtn();
                });
            }
            if (data.browser === 'Internet Explorer' && parseInt(data.version) <= this.min_IE_version) {
                browserUI.hideLoader();
                browserValid = false;
                const message = browserUI.browserVersionMessage({
                    browser: data.browser,
                    oldVersion: data.version,
                    newVersion: this.min_IE_version,
                });
                this.resultData.error.push(message);
                this.end();
                this.onError(() => {
                    browserUI.retryCloseBtn();
                });
            }
            if (browserValid &&
                data.browser === 'Chrome' &&
                parseInt(data.version) < this.min_chrome_version) {
                browserUI.hideLoader();
                browserValid = false;
                const message = browserUI.browserVersionMessage({
                    browser: data.browser,
                    oldVersion: data.version,
                    newVersion: this.min_chrome_version,
                });
                this.resultData.error.push(message);
                this.end();
                this.onError(() => {
                    browserUI.retryCloseBtn();
                });
            }
            if (browserValid &&
                data.browser === 'Firefox' &&
                parseInt(data.version) < this.min_firefox_version) {
                browserUI.hideLoader();
                browserValid = false;
                const message = browserUI.browserVersionMessage({
                    browser: data.browser,
                    oldVersion: data.version,
                    newVersion: this.min_firefox_version,
                });
                this.resultData.error.push(message);
                this.end();
                this.onError(() => {
                    browserUI.retryCloseBtn();
                });
            }
            if (browserValid &&
                data.browser === 'Safari' &&
                parseInt(data.version) < this.min_safari_version) {
                browserUI.hideLoader();
                browserValid = false;
                const message = browserUI.browserVersionMessage({
                    browser: data.browser,
                    oldVersion: data.version,
                    newVersion: this.min_safari_version,
                });
                this.resultData.error.push(message);
                this.end();
                this.onError(() => {
                    browserUI.retryCloseBtn();
                });
            }
            if (browserValid &&
                data.browser === 'Edge' &&
                parseInt(data.version) < this.min_edge_version) {
                browserUI.hideLoader();
                browserValid = false;
                const message = browserUI.browserVersionMessage({
                    browser: data.browser,
                    oldVersion: data.version,
                    newVersion: this.min_edge_version,
                });
                this.resultData.error.push(message);
                this.end();
                this.onError(() => {
                    browserUI.retryCloseBtn();
                });
            }
            this.resultData.status = browserValid;
            if (browserValid == true) {
                browserUI.hideLoader();
                browserUI.browserSuccess();
                stepUIManager.insertText('thinkX_checkingBrowser', ui.translations.status.browserSuccess);
                this.resultData.info = data;
                configrationManager.isMobile = data.device !== 'PC';
            }
            this.end();
        });
    }
    /**
     *
     */
    get_browser() {
        const ua = navigator.userAgent;
        let tem = null;
        const match = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i);
        if (match && match.length > 2) {
            if (/trident/i.test(match[1])) {
                tem = /\brv[ :]+(\d+)/g.exec(ua);
                return { name: 'IE', version: tem?.[1] || '' };
            }
            if (match[1] === 'Chrome') {
                const edgeOrOpera = ua.match(/\b(OPR|Edge)\/(\d+)/);
                if (edgeOrOpera && edgeOrOpera.length > 2) {
                    return { name: edgeOrOpera[1] === 'OPR' ? 'Opera' : 'Edge', version: edgeOrOpera[2] };
                }
            }
            tem = /version\/(\d+)/i.exec(ua);
            if (tem && tem.length > 1) {
                match[2] = tem[1];
            }
            return { name: match[1], version: match[2] };
        }
        return { name: 'Unknown', version: '0' };
    }
    /**
     *
     * @param userAgent
     */
    getBrowserName(userAgent = navigator.userAgent) {
        if (userAgent.includes('Chrome') && !userAgent.includes('Edg') && !userAgent.includes('OPR')) {
            return 'Chrome';
        }
        else if (userAgent.includes('Firefox')) {
            return 'Firefox';
        }
        else if (userAgent.includes('MSIE') || userAgent.includes('Trident')) {
            return 'Internet Explorer';
        }
        else if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) {
            return 'Safari';
        }
        else if (userAgent.includes('Opera') || userAgent.includes('OPR')) {
            return 'Opera';
        }
        else if (userAgent.includes('Edg')) {
            return 'Edge';
        }
        else {
            return 'Unknown Browser';
        }
    }
    /**
     *
     * @param userAgent
     */
    getOS(userAgent) {
        if (userAgent.includes('Win'))
            return 'Windows';
        if (userAgent.includes('Mac'))
            return 'macOS';
        if (userAgent.includes('Linux') && !userAgent.includes('Android'))
            return 'Linux';
        if (userAgent.includes('Android'))
            return 'Android';
        if (userAgent.includes('like Mac'))
            return 'iOS';
        return 'Unknown OS';
    }
    /**
     *
     * @param userAgent
     */
    getDeviceType(userAgent) {
        const ua = userAgent.toLowerCase();
        const isTablet = /ipad|android(?!.*mobi)|tablet/.test(ua);
        const isMobile = /mobi|iphone|ipod|android/.test(ua);
        if (isTablet)
            return 'Tablet';
        else if (isMobile)
            return 'Mobile';
        else
            return 'PC';
    }
    /**
     *
     */
    getDeviceInfo() {
        const userAgent = navigator.userAgent;
        const browserInfo = this.get_browser();
        return {
            browser: this.getBrowserName(userAgent),
            os: this.getOS(userAgent),
            device: this.getDeviceType(userAgent),
            userAgent,
            version: browserInfo.version,
        };
    }
    /**
     *
     */
    checkHTTPS() {
        let msg = '';
        let status = true;
        if (location.protocol === 'http:') {
            status = false;
            msg = 'Please use HTTPs for proceeding further.';
        }
        return { browserSupport: status, browserMsg: msg };
    }
    /**
     *
     */
    result() {
        return this.resultData;
    }
    /**
     *
     */
    cameraRevokeRetry() { }
    /**
     *
     */
    micRevokeRetry() { }
}
const browserCheck = new BrowserCheck();
var browserCheck$1 = browserCheck;

/**
 *
 */
class ScreenUI {
    /**
     *
     */
    removeRetry() {
        ui.show(ui.id('thinkX_errorScreen'));
        ui.show(ui.id('thinkX_screenError'));
        ui.hide(ui.id('thinkX_screenCheck'));
        ui.hide(ui.id('thinkX_screenStatic'));
        ui.hide(ui.id('thinkX_checkingScreen'));
        const existingRetryDiv = ui.id('thinkX_retryClose');
        existingRetryDiv?.remove();
        const retryBtnId = 'thinkX_screenRetry';
        stepUIManager.setRetryCloseBtn(UiComponents.retryCloseBtn(ui.translations.popup_buttons.retry, retryBtnId), 'thinkX_screenSuccess');
    }
    /**
     *
     */
    removeClass() {
        const existingRetryDiv1 = ui.id('thinkX_retryClose');
        existingRetryDiv1?.remove();
        ui.hide(ui.id('thinkX_errorScreen'));
        ui.hide(ui.id('thinkX_screenError'));
        ui.show(ui.id('thinkX_screenStatic'));
        ui.show(ui.id('thinkX_checkingScreen'));
    }
    /**
     *
     */
    showIcon() {
        ui.hide(ui.id('thinkX_screenSharePopup'));
        ui.show(ui.id('thinkX_screenCheck'));
        ui.hide(ui.id('thinkX_screenStatic'));
        ui.show(ui.id('thinkX_screen_resolution'));
        ui.show(ui.id('thinkX_checkingScreen'));
        ui.hide(ui.id('thinkX_screenError'));
    }
    /**
     *
     */
    showLoader() {
        const loaderHTML = UiComponents.loading();
        stepUIManager.setGif(loaderHTML, 'thinkX_screenSuccess');
    }
    /**
     *
     */
    hideLoader() {
        const existingLoader = ui.id('thinkX_loading');
        if (existingLoader && existingLoader.parentNode) {
            existingLoader.parentNode.removeChild(existingLoader);
        }
    }
}
const screenUI = new ScreenUI();

/**
 *
 */
class ScreenCheck extends StepInterface {
    envAlias = 'Screen_Check';
    /**
     *
     */
    constructor() {
        super();
    }
    /**
     *
     */
    start() {
        this.checkScreen();
    }
    /**
     *
     */
    checkScreen() {
        screenUI.showLoader();
        utility.wait(2000).then(() => {
            const width = screen.width;
            const height = screen.height;
            this.resultData.info['width'] = width;
            this.resultData.info['height'] = height;
            if (((width < 1280 || height < 720) && configrationManager.browserMobileEnable == 1) || // Desktop only
                (width < 320 && configrationManager.browserMobileEnable == 2) // all devices PC/Mobile/Tablet
            ) {
                this.resultData.status = false;
                const messageTemplate = ui.translations.status.screenSize;
                const resolutionStr = `${width}×${height}`;
                const message = utility.replacePlaceholders(messageTemplate, { width: resolutionStr });
                this.resultData.error.push(message);
                // this.resultData.error.push(ui.translations.status.screenSize);
                this.end();
                this.onError(() => {
                    this.screenRetry();
                });
            }
            else {
                screenUI.hideLoader();
                screenUI.showIcon();
                stepUIManager.screenResolution(this.resultData.info);
                stepUIManager.insertText('thinkX_checkingScreen', ui.translations.status.screenSuccess);
                this.end();
            }
            // if screen resolution check
            // {
            //     const messageTemplate = ui.translations.status.checking_screen_fail;
            //     const resolutionStr = `${width}×${height}`;
            //     const message = utility.replacePlaceholders(messageTemplate,{resolution:resolutionStr} );
            //     this.resultData.error.push(message);
            // }
            // liveStreamManager.screenShare(()=>{
            //         screenUI.hideLoader();
            //         screenUI.showIcon();
            //         stepUIManager.insertText("checkingScreen",ui.translations.status.screenSuccess);
            //         this.end();
            //     },(message)=>{
            //         this.resultData.status =false;
            //         this.resultData.error.push(message);
            //         this.screenRetry();
            //         this.end();
            //     });
        });
    }
    /**
     *
     */
    screenRetry() {
        screenUI.hideLoader();
        screenUI.removeRetry();
        const button = ui.id('thinkX_screenRetry');
        if (button) {
            ui.click(button, () => {
                screenUI.removeClass();
                this.resultData.status = true;
                this.resultData.error = [];
                this.checkScreen();
            });
        }
    }
    /**
     *
     */
    result() {
        return this.resultData;
    }
    /**
     *
     */
    cameraRevokeRetry() { }
    /**
     *
     */
    micRevokeRetry() { }
}
const screenCheck = new ScreenCheck();

/**
 *
 */
class CameraUI {
    /**
     * Appends the given HTML content inside a container element identified by its ID.
     * Also attaches event listeners to the newly inserted content.
     *
     * @param html - The HTML string to insert into the container.
     * @param containerId - The ID of the target container element.
     * @param cameraCallback - A callback function to be used when attaching event listeners (e.g., for camera setup).
     * @returns The container element if found, otherwise null.
     */
    /**
     *
     * @param html
     * @param containerId
     * @param cameraCallback
     */
    cameraAppendHtmlInsideContainer(html, containerId, cameraCallback, errorCallback) {
        const container = ui.id(containerId);
        if (!container) {
            utility.warn(`Container with id "${containerId}" not found.`);
            return null;
        }
        // container.innerHTML = html;
        this.attachListenersOn(container, cameraCallback, errorCallback);
        return container;
    }
    /**
     * Attaches click event listeners to all buttons with a "data-target" attribute inside the given container.
     * When clicked, the button triggers camera selection logic using the associated <select> element.
     *
     * @param container - The parent HTML element that contains the target buttons.
     * @param cameraCallback - Callback function to be invoked with the selected camera details if a valid device is selected.
     */
    /**
     *
     * @param container
     * @param cameraCallback
     */
    attachListenersOn(container, cameraCallback, errorCallback) {
        const buttons = ui.domAll(container, 'button[data-target]');
        buttons.forEach((buttonEl) => {
            const button = buttonEl;
            ui.click(button, async () => {
                const addClass = ui.id('thinkX_cameraDropdown');
                if (addClass) {
                    ui.addClass(addClass, 'thinkproc-disable');
                }
                const targetId = button.getAttribute('data-target');
                if (!targetId)
                    return;
                const select = ui.id(targetId);
                const selectedDeviceLabel = select?.value || '';
                const selectedDeviceText = select?.selectedOptions[0]?.text || '';
                if (!selectedDeviceLabel) {
                    ui.translations.status.select_camera;
                    return;
                }
                liveStreamManager
                    .isValidDeviceId(selectedDeviceLabel, 'videoinput')
                    .then(async (response) => {
                    if (response == true) {
                        liveStreamManager.setCameraDeviceId(LiveStreamManager.CAMERA.PRIMARY, selectedDeviceLabel);
                        LiveStreamManager.CAMERA.PRIMARY.label = selectedDeviceText;
                        const camera = await liveStreamManager.requestVideo(LiveStreamManager.CAMERA.PRIMARY);
                        cameraCallback({
                            id: selectedDeviceLabel,
                            label: selectedDeviceText,
                            width: camera?.settings.width,
                            height: camera?.settings.height,
                            deviceId: camera?.settings.deviceId,
                            groupId: camera?.settings.groupId,
                            frameRate: camera?.settings.frameRate,
                        });
                    }
                    else {
                        this.showLoader();
                        errorCallback(ui.translations.status.webCamEnable);
                        // errorManager.throwError("Error", "CAMERA_NOT_FOUND");
                    }
                })
                    .catch((e) => {
                    this.showLoader();
                    errorCallback(ui.translations.status.webCamEnable);
                });
            });
        });
    }
    /**
     *
     */
    removeAndAddDisableClass() {
        const existingRetryDiv = ui.id('thinkX_retryClose');
        existingRetryDiv?.remove();
        stepUIManager.setRetryCloseBtn(UiComponents.retryCloseBtn(ui.translations.popup_buttons.retry, 'thinkX_cameraRetryBtn'), 'thinkX_webCamSuccess');
        const addClass = ui.id('thinkX_cameraDropdown');
        if (addClass) {
            ui.addClass(addClass, 'thinkproc-disable');
        }
    }
    /**
     *
     */
    removeDisable() {
        const removeClass = ui.id('thinkX_cameraDropdown');
        if (removeClass) {
            ui.removeClass(removeClass, 'thinkproc-disable');
            const existingRetryDiv1 = ui.id('thinkX_retryClose');
            existingRetryDiv1?.remove();
            ui.hide(ui.id('thinkX_webCamError'));
        }
    }
    /**
     *
     */
    showLoader() {
        const loaderHTML = UiComponents.loading();
        stepUIManager.setGif(loaderHTML, 'thinkX_webCamSuccess');
    }
    /**
     *
     */
    hideLoader() {
        const existingLoader = ui.id('thinkX_loading');
        if (existingLoader && existingLoader.parentNode) {
            existingLoader.parentNode.removeChild(existingLoader);
        }
    }
    cameraPermission(message) {
        ui.show(ui.id('thinkX_webCamError'));
        ui.show(ui.id('thinkX_cameraDropdown'));
        const addClass = ui.id('thinkX_cameraDropdown');
        if (addClass) {
            ui.addClass(addClass, 'thinkproc-disable');
        }
        stepUIManager.insertText('thinkX_webCamError', message);
        UiComponents.getCameraSelect(ui.translations.status.allow_btn, ui.translations.status.selectCamera);
        const container = ui.id('thinkproc-camera-select');
        if (container) {
            // container.innerHTML = selectlist;
            stepUIManager.initAndUpdateCustomSelectById('thinkpro-get-camera-value', [{ value: '', label: ui.translations.status.no_camera_found }], '');
        }
    }
}
const cameraUI = new CameraUI();

/**
 *
 */
class CameraCheck extends StepInterface {
    mainDiv;
    envAlias = 'Webcam_Check';
    /**
     *
     */
    constructor() {
        super();
    }
    /**
     *
     * @param mainDiv
     */
    init(mainDiv) {
        this.mainDiv = mainDiv;
    }
    /**
     *
     */
    async start() {
        ui.show(ui.id('thinkX_cameraDropdown'));
        let selectlist = UiComponents.getCameraSelect(ui.translations.status.allow_btn, ui.translations.status.selectCamera);
        const container = ui.id('thinkproc-camera-select');
        if (container) {
            container.innerHTML = selectlist;
            stepUIManager.initAndUpdateCustomSelectById('thinkpro-get-camera-value', [{ value: '', label: ui.translations.status.no_camera_found }], '');
        }
        const addClass = ui.id('thinkX_cameraDropdown');
        if (addClass) {
            ui.addClass(addClass, 'thinkproc-disable');
        }
        const timeouCamerePermission = setTimeout(() => {
            // ui.show(ui.id('thinkX_cameraDropdown'));
            cameraUI.cameraPermission(ui.translations.status.webCamEnable);
        }, 4000);
        const cams = await liveStreamManager.getCameraList(true);
        const cameraPermission = await liveStreamManager.permissionEnable('camera');
        if (cameraPermission == false) {
            ui.show(ui.id('thinkX_cameraDropdown'));
            const message = ui.translations.status.webCamEnable;
            cameraUI.cameraPermission(message);
            this.resultData.status = false;
            this.resultData.error.push(message);
            this.end();
            this.onError(() => {
                this.cameraRetry();
            });
            return;
        }
        if (configrationManager.browserMobileEnable == 2 && configrationManager.isMobile == true) {
            const camera = await liveStreamManager.requestVideo(LiveStreamManager.CAMERA.PRIMARY, 'user');
            if (camera) {
                clearTimeout(timeouCamerePermission);
                ui.hide(ui.id('thinkX_webCamError'));
                ui.hide(ui.id('thinkX_cameraDropdown'));
                this.cameraCallback({
                    id: '',
                    label: '',
                    width: camera?.settings.width || 640,
                    height: camera?.settings.height || 480,
                    deviceId: camera?.settings.deviceId || '',
                    groupId: camera?.settings.groupId || '',
                    frameRate: camera?.settings.frameRate || 15,
                });
            }
            return;
        }
        ui.hide(ui.id('thinkX_webCamError'));
        const removeClass = ui.id('thinkX_cameraDropdown');
        if (removeClass) {
            ui.removeClass(removeClass, 'thinkproc-disable');
        }
        clearTimeout(timeouCamerePermission);
        cameraUI.cameraAppendHtmlInsideContainer(UiComponents.getCameraSelect(ui.translations.status.allow_btn, ui.translations.status.selectCamera), 'thinkproc-camera-select', this.cameraCallback, this.cameraErrorCallback);
        // const cams = await liveStreamManager.getCameraList(true);
        if (Array.isArray(cams)) {
            ui.show(ui.id('thinkX_cameraDropdown'));
            const options = cams.map((cam, i) => ({
                value: cam.deviceId || `${i}`,
                label: cam.label || `Camera Device ${i + 1}`,
            }));
            if (options.length > 0) {
                stepUIManager.initAndUpdateCustomSelectById('thinkpro-get-camera-value', options, options[0]?.value);
            }
            else {
                stepUIManager.initAndUpdateCustomSelectById('thinkpro-get-camera-value', [{ value: '', label: ui.translations.status.no_camera_found }], '');
            }
        }
        else {
            let message;
            if (cams === false) {
                message = ui.translations.status.webCamEnable;
            }
            else {
                message = ui.translations.status.noCamera;
            }
            cameraUI.cameraPermission(message);
            // ui.show(ui.id('thinkX_webCamPopupEnable'));
            this.resultData.status = false;
            this.resultData.error.push(message);
            this.end();
            this.onError(() => {
                this.cameraRetry();
            });
        }
    }
    cameraCallback = (data) => {
        cameraUI.showLoader();
        const isMobile = configrationManager.browserMobileEnable === 1;
        let errorMessage = '';
        const deviceName = browserCheck$1.getDeviceInfo();
        if ((!isMobile && (data.width < 640 || data.height < 480)) ||
            (isMobile && (data.width < 480 || data.height < 640) && deviceName.device != 'PC')) {
            errorMessage = ui.translations.status.widthCheck;
        }
        else if (data.frameRate < 15) {
            errorMessage = ui.translations.status.frameRate;
        }
        if (errorMessage) {
            this.resultData.status = false;
            this.resultData.error.push(errorMessage);
            this.end();
            this.onError(() => {
                this.cameraRetry();
            });
            return; // stop further execution
        }
        // If no error
        this.resultData.status = true;
        this.resultData.info = data;
        cameraUI.hideLoader();
        ui.hide(ui.id('thinkX_cameraDropdown'));
        ui.show(ui.id('thinkX_cameraChecked'));
        liveStreamManager.cameraRevokeContinously(LiveStreamManager.CAMERA.PRIMARY.name);
        this.end();
    };
    /**
     *
     */
    cameraErrorCallback = (message) => {
        cameraUI.hideLoader();
        stepUIManager.initAndUpdateCustomSelectById('thinkpro-get-camera-value', [{ value: '', label: ui.translations.status.no_camera_found }], '');
        this.resultData.status = false;
        this.resultData.error.push(message);
        this.end(0);
        this.onError(() => {
            this.cameraRetry();
        });
    };
    /**
     *
     */
    cameraRetry() {
        cameraUI.hideLoader();
        cameraUI.removeAndAddDisableClass();
        const button = ui.id('thinkX_cameraRetryBtn');
        if (button) {
            ui.click(button, async () => {
                cameraUI.removeDisable();
                this.resultData.status = true;
                this.resultData.error = [];
                this.start();
            });
        }
    }
    /**
     *
     */
    result() {
        return this.resultData;
    }
    /**
     *
     */
    cameraRevokeRetry() {
        this.start();
    }
    /**
     *
     */
    micRevokeRetry() { }
}
const cameraCheck = new CameraCheck();

/**
 *
 */
class MicUI {
    /**
     *
     * @param html
     * @param containerId
     * @param audioCallback
     */
    allowClickTimeout = null;
    audioAppendHtmlInsideContainer(html, containerId, audioCallback, errorCallback) {
        const container = ui.id(containerId);
        if (!container) {
            utility.warn(`Container with id "${containerId}" not found.`);
            return null;
        }
        // container.innerHTML = html;
        this.audioAttachListenersOn(container, audioCallback, errorCallback);
        return container;
    }
    /**
     *
     * @param container
     * @param audioCallback
     */
    audioAttachListenersOn(container, audioCallback, errorCallback) {
        const buttons = ui.domAll(container, 'button[data-target]');
        buttons.forEach((buttonEl) => {
            const button = buttonEl;
            ui.click(button, async () => {
                if (this.allowClickTimeout)
                    clearTimeout(this.allowClickTimeout);
                this.allowClickTimeout = setTimeout(() => {
                    const targetId = button.getAttribute('data-target');
                    if (!targetId)
                        return;
                    const select = ui.id(targetId);
                    const selectedDeviceLabel = select?.value || '';
                    const selectedDeviceText = select?.selectedOptions[0]?.text || '';
                    if (!selectedDeviceLabel) {
                        ui.translations.status.select_audio;
                        return;
                    }
                    liveStreamManager
                        .isValidDeviceId(selectedDeviceLabel, 'audioinput')
                        .then(async (response) => {
                        if (response == true) {
                            LiveStreamManager.AUDIO.PRIMARY.deviceId.deviceId = { exact: selectedDeviceLabel };
                            LiveStreamManager.AUDIO.PRIMARY.label = selectedDeviceText;
                            LiveStreamManager.AUDIO.PRIMARY_NOISE.deviceId.deviceId = {
                                exact: selectedDeviceLabel,
                            };
                            LiveStreamManager.AUDIO.PRIMARY_NOISE.label = selectedDeviceText;
                            await liveStreamManager.requestAudio(LiveStreamManager.AUDIO.PRIMARY);
                            const tabId = ui.id('thinkX_audioDiv');
                            if (tabId) {
                                ui.hide(tabId);
                            }
                            audioCallback({ id: selectedDeviceLabel, label: selectedDeviceText });
                        }
                        else {
                            errorCallback(ui.translations.status.micEnable);
                            // errorManager.throwError('Error', 'AUDIO_NOT_FOUND');
                        }
                    })
                        .catch(() => {
                        errorCallback(ui.translations.status.micEnable);
                        // errorManager.throwError('Error', 'AUDIO_NOT_FOUND');
                    });
                }, 500);
            });
        });
    }
    /**
     *
     */
    retryBtnRemove() {
        const existingRetryDiv = ui.id('thinkX_retryClose');
        existingRetryDiv?.remove();
    }
    /**
     *
     */
    speakerRetry() {
        stepUIManager.setRetryCloseBtn(UiComponents.retryCloseBtn(ui.translations.popup_buttons.retry, 'thinkX_speakerRetry'), 'thinkX_micSuccess');
    }
    /**
     *
     */
    removeAndAddDisableClass() {
        this.retryBtnRemove();
        stepUIManager.setRetryCloseBtn(UiComponents.retryCloseBtn(ui.translations.popup_buttons.retry, 'thinkX_micRetryBtn'), 'thinkX_micSuccess');
        const addClass = ui.id('thinkX_audioDiv');
        if (addClass) {
            ui.addClass(addClass, 'thinkproc-disable');
        }
    }
    /**
     *
     */
    removeDisable() {
        ui.hide(ui.id('thinkX_micError'));
        const removeClass = ui.id('thinkX_audioDiv');
        if (removeClass) {
            ui.removeClass(removeClass, 'thinkproc-disable');
            this.retryBtnRemove();
            ui.hide(ui.id('thinkX_speakerCheck-error'));
        }
    }
    /**
     *
     */
    showLoader() {
        const loaderHTML = UiComponents.loading();
        stepUIManager.setGif(loaderHTML, 'thinkX_micSuccess');
    }
    /**
     *
     */
    hideLoader() {
        const existingLoader = ui.id('thinkX_loading');
        if (existingLoader && existingLoader.parentNode) {
            existingLoader.parentNode.removeChild(existingLoader);
        }
    }
    speakerCheckHtml() {
        ui.show(ui.id('thinkX_speakerAvailable'));
        stepUIManager.insertText('thinkX_speakerAvailable-check-text', ui.translations.status.speakerFound);
    }
    showAudioDiv() {
        ui.hide(ui.id('thinkX_micPopupEnable'));
        ui.show(ui.id('thinkX_audioDiv'));
    }
    stopMicStream() {
        liveStreamManager.stopAudioStream();
        ui.hide(ui.id('thinkX_speakerCheck-error'));
        ui.hide(ui.id('thinkX_micError'));
        ui.hide(ui.id('thinkX_micErrorIcon'));
    }
}
const micUI = new MicUI();

/**
 *
 */
class MicCheck extends StepInterface {
    micFailedAttempt = 0;
    speakerFlag = 0;
    envAlias = 'Mic_Check';
    recognition = null;
    speakerGet = 0;
    speechRecorgFailed = false;
    /**
     *
     */
    constructor() {
        super();
        this.speakerGet = 0;
    }
    /**
     *
     */
    async start() {
        this.checkSpeaker();
    }
    /**
     *
     */
    async checkSpeaker() {
        const timeoutMicPermission = setTimeout(() => {
            ui.show(ui.id('thinkX_speakerStatic'));
            ui.hide(ui.id('thinkX_speaker-check-text2'));
            ui.show(ui.id('thinkX_micPopupEnable'));
        }, 1500);
        await liveStreamManager.getAudioList(true);
        ui.hide(ui.id('thinkX_speakerStatic'));
        ui.show(ui.id('thinkX_speaker-check-text2'));
        ui.hide(ui.id('thinkX_micPopupEnable'));
        clearTimeout(timeoutMicPermission);
        liveStreamManager.checkSpeakerAvailable().then((hasSpeaker) => {
            if (hasSpeaker) {
                this.speakerGet = 1;
                micUI.speakerCheckHtml();
                setTimeout(() => {
                    this.micStart();
                }, 3000);
            }
            else {
                this.speakerGet = 0;
                const message = ui.translations.status.noSpeaker;
                if (configrationManager.speakerEnable == 1) {
                    this.resultData.status = false;
                    this.resultData.error.push(message);
                    this.end();
                    this.onError(() => {
                        micUI.retryBtnRemove();
                        ui.show(ui.id('thinkX_speakerCheck-error'));
                        this.retrySpeaker();
                    });
                }
                else {
                    ui.show(ui.id('thinkX_speakerCheck-error'));
                    stepUIManager.insertText('thinkX_speakerError-check-text', `${ui.translations.status.speaker_not_found}`);
                    setTimeout(() => {
                        this.micStart();
                    }, 3000);
                }
            }
        });
    }
    /**
     *
     */
    retrySpeaker() {
        micUI.speakerRetry();
        const button = ui.id('thinkX_speakerRetry');
        if (button) {
            ui.click(button, async () => {
                micUI.retryBtnRemove();
                micUI.stopMicStream();
                this.resultData.status = true;
                this.resultData.error = [];
                this.checkSpeaker();
            });
        }
    }
    /**
     *
     */
    async micStart() {
        ui.show(ui.id('thinkX_audioDiv'));
        let selectlist = UiComponents.getMicSelect(ui.translations.status.allow_btn, ui.translations.status.selectMic);
        const container = ui.id('thinkproc-mic-select');
        if (container) {
            container.innerHTML = selectlist;
            stepUIManager.initAndUpdateCustomSelectById('thinkpro-get-mic-value', [{ value: '', label: ui.translations.status.no_microphone_found }], '');
        }
        const addClass = ui.id('thinkX_audioDiv');
        if (addClass) {
            ui.addClass(addClass, 'thinkproc-disable');
        }
        ui.hide(ui.id('thinkX_speakerAvailable'));
        ui.hide(ui.id('thinkX_speakerCheck-error'));
        ui.hide(ui.id('thinkX_micError'));
        const micPermission = await liveStreamManager.permissionEnable('microphone');
        if (micPermission == false) {
            ui.show(ui.id('thinkX_audioDiv'));
            ui.hide(ui.id('thinkX_alertMicBox'));
            let selectlist = UiComponents.getMicSelect(ui.translations.status.allow_btn, ui.translations.status.selectMic);
            const container = ui.id('thinkproc-mic-select');
            if (container) {
                container.innerHTML = selectlist;
                stepUIManager.initAndUpdateCustomSelectById('thinkpro-get-mic-value', [{ value: '', label: ui.translations.status.no_microphone_found }], '');
            }
            const message = ui.translations.status.micEnable;
            this.resultData.status = false;
            this.resultData.error.push(message);
            this.end();
            this.onError(() => {
                this.retryMic();
            });
            return;
        }
        const removeClass = ui.id('thinkX_audioDiv');
        if (removeClass) {
            ui.removeClass(removeClass, 'thinkproc-disable');
        }
        micUI.audioAppendHtmlInsideContainer(UiComponents.getMicSelect(ui.translations.status.allow_btn, ui.translations.status.selectMic), 'thinkproc-mic-select', this.audioCallback, this.micErrorCallback);
        const audio = await liveStreamManager.getAudioList(true);
        micUI.showAudioDiv();
        if (Array.isArray(audio)) {
            ui.hide(ui.id('thinkX_alertMicBox')); // hide interview
            const options = audio.map((mic, i) => ({
                value: mic.deviceId || `${i}`,
                label: mic.label || `Audio Device ${i + 1}`,
            }));
            if (options.length > 0) {
                stepUIManager.initAndUpdateCustomSelectById('thinkpro-get-mic-value', options, options[0]?.value);
            }
            else {
                stepUIManager.initAndUpdateCustomSelectById('thinkpro-get-mic-value', [{ value: '', label: ui.translations.status.no_microphone_found }], '');
            }
        }
        else {
            utility.log('No audio list available.');
            let message;
            if (audio === false) {
                let selectlist = UiComponents.getMicSelect(ui.translations.status.allow_btn, ui.translations.status.selectMic);
                const container = ui.id('thinkproc-mic-select');
                if (container) {
                    container.innerHTML = selectlist;
                    stepUIManager.initAndUpdateCustomSelectById('thinkpro-get-mic-value', [{ value: '', label: ui.translations.status.no_microphone_found }], '');
                }
                message = ui.translations.status.micEnable;
            }
            else {
                message = ui.translations.status.noMic;
            }
            this.resultData.status = false;
            this.resultData.error.push(message);
            this.end();
            this.onError(() => {
                this.retryMic();
            });
        }
    }
    /**
     *
     */
    retryMic() {
        micUI.removeAndAddDisableClass();
        const button = ui.id('thinkX_micRetryBtn');
        if (button) {
            ui.click(button, async () => {
                micUI.removeDisable();
                this.resultData.status = true;
                this.resultData.error = [];
                this.micStart();
            });
        }
    }
    audioCallback = async (data) => {
        ui.hide(ui.id('thinkX_alertMicBox'));
        micUI.showLoader();
        this.resultData.info = data;
        let audioStream = LiveStreamManager.AUDIO.PRIMARY;
        if (configrationManager.speakerEnable == 1) {
            audioStream = LiveStreamManager.AUDIO.PRIMARY_NOISE;
        }
        const audioStream_noise = await liveStreamManager.requestAudio(audioStream);
        const audioChannelCount = await liveStreamManager.getAudioChannelCountFromStream(audioStream);
        if (audioStream_noise) {
            if (this.speakerGet == 1 && configrationManager.speakerEnable == 1) {
                micUI.hideLoader();
                ui.stopAudioBar();
                ui.hide(ui.id('thinkX_audioImage'));
                ui.hide(ui.id('thinkX_speakerCheck'));
                ui.show(ui.id('thinkX_speakerStatic'));
                this.micFailedAttempt = 0;
                this.microphoneMachineDetect(audioStream_noise, audioChannelCount);
            }
            else {
                micUI.hideLoader();
                this.micFailedAttempt = 0;
                const textDetail = `<b>${ui.translations.status.micSentence}</b>`;
                const candidateNameSpeaker = configrationManager.currentCandidateName;
                const CandidateMessage = utility.replacePlaceholders(textDetail, { candidateName: candidateNameSpeaker });
                const messageTemplate = ui.translations.status.checking_mic;
                const message = utility.replacePlaceholders(messageTemplate, { text: CandidateMessage });
                ui.innerHTML(ui.id('thinkX_checkingMic'), message);
                ui.show(ui.id('thinkX_audioStatic'));
                this.microphoneCheckStatus(audioStream_noise, audioChannelCount);
            }
        }
    };
    micErrorCallback = (message) => {
        ui.hide(ui.id('thinkX_alertMicBox'));
        micUI.hideLoader();
        stepUIManager.initAndUpdateCustomSelectById('thinkpro-get-mic-value', [{ value: '', label: ui.translations.status.no_microphone_found }], '');
        this.resultData.status = false;
        this.resultData.error.push(message);
        this.end();
        this.onError(() => {
            this.retryMic();
        });
    };
    /**
     *
     */
    getSpeechRecongnition() {
        if (this.recognition != null) {
            this.recognition.end;
            return this.recognition;
        }
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        this.recognition = new SpeechRecognition();
        this.recognition.lang = ui.translations.language_code.code;
        this.recognition.continuous = false; // We only need one result for this test
        this.recognition.interimResults = false; // Only interested in the final result
        return this.recognition;
    }
    isEdgeOnMacOS() {
        const ua = navigator.userAgent;
        const isMac = /Macintosh|Mac OS X/i.test(ua);
        const isEdge = /Edg/i.test(ua);
        return (isMac && isEdge) || (this.speechRecorgFailed);
    }
    /**
     *
     * @param mediaStream
     */
    microphoneCheckStatus(mediaStream, audioChannelCount) {
        ui.initAudioVisualization(mediaStream, 'thinkX_audioCanvas'); // 👈 Add this line to trigger graph
        const staticText1 = ui.translations.status.micSentence;
        const candidateNameSpeaker = configrationManager.currentCandidateName;
        const staticText = utility.replacePlaceholders(staticText1, { candidateName: candidateNameSpeaker });
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        this.micFailedAttempt++;
        if (SpeechRecognition != undefined && configrationManager.isMobile == false && !this.isEdgeOnMacOS()) {
            const recognition = this.getSpeechRecongnition();
            let detectedText = '';
            let isStopped = false;
            let onerrorSpeech = false;
            recognition.onstart = () => {
                utility.log('🎙️ Speech recognition started');
            };
            recognition.onresult = (event) => {
                if (isStopped)
                    return;
                const result = event.results[0][0].transcript;
                detectedText += result + ' ';
                utility.log('You said:', result);
                isStopped = true;
                recognition.stop();
            };
            recognition.onerror = (event) => {
                utility.error('Speech recognition error:', event.error);
                if (event.error === 'not-allowed' || event.error === 'service-not-allowed' || event.error === 'network') {
                    utility.log('🔁 Falling back to MediaRecorder speech detection');
                    recognition.abort();
                    this.speechRecorgFailed = true;
                    onerrorSpeech = true;
                    this.startMediaRecorderFallback(mediaStream, audioChannelCount);
                }
            };
            recognition.onend = () => {
                // if (!isStopped && elapsed < 10000) {
                //   utility.log(`⏱️ Restarting recognition (${Math.round(elapsed / 1000)}s elapsed)`);
                //   recognition.start(); // Restart recognition if no voice detected yet
                //   return;
                // }
                utility.log('🛑 Final result:', detectedText.trim());
                this.calculateSimilarityPercentage(detectedText, staticText);
                if (onerrorSpeech == false) {
                    if (detectedText.trim() == '') {
                        if (this.micFailedAttempt <= 1) {
                            // const resultDiv = ui.id('thinkX_checkingMic');
                            // if (resultDiv) {
                            const textDetail = `<b>${ui.translations.status.micSentence}</b>`;
                            const candidateNameSpeaker = configrationManager.currentCandidateName;
                            const CandidateMessage = utility.replacePlaceholders(textDetail, { candidateName: candidateNameSpeaker });
                            const messageTemplate = ui.translations.status.micRetry;
                            const message = utility.replacePlaceholders(messageTemplate, { text: CandidateMessage });
                            ui.innerHTML(ui.id('thinkX_checkingMic'), message);
                            this.microphoneCheckStatus(mediaStream, audioChannelCount);
                            // }
                        }
                        else if (this.micFailedAttempt == 2) {
                            const textDetail = `<b>${ui.translations.status.micSentence}</b>`;
                            const candidateNameSpeaker = configrationManager.currentCandidateName;
                            const CandidateMessage = utility.replacePlaceholders(textDetail, { candidateName: candidateNameSpeaker });
                            const messageTemplate = ui.translations.status.micRetry2;
                            const message = utility.replacePlaceholders(messageTemplate, { text: CandidateMessage });
                            ui.innerHTML(ui.id('thinkX_checkingMic'), message);
                            this.microphoneCheckStatus(mediaStream, audioChannelCount);
                        }
                        else {
                            const errorDiv = ui.id('thinkX_micError');
                            if (errorDiv) {
                                ui.hide(errorDiv);
                                // ui.hide(ui.id("thinkX_audioImage"));
                                ui.hide(ui.id('thinkX_audioStatic'));
                                ui.show(ui.id('thinkX_micErrorIcon'));
                                // ui.innerText(errorDiv,`${ui.translations.status.micError}`);
                                const message = ui.translations.status.micError;
                                this.resultData.status = false;
                                this.resultData.error.push(message);
                                this.end();
                                this.onError(() => {
                                    this.retrySpeaker();
                                });
                            }
                        }
                    }
                    else {
                        // const showDiv = ui.id('thinkX_checkingMic');
                        // if (showDiv) {
                        //   ui.innerText(showDiv, `${ui.translations.status.micCheck}`);
                        stepUIManager.insertText('thinkX_audioImage', `${ui.translations.status.micCheck}`);
                        // }
                        setTimeout(() => {
                            ui.stopAudioBar();
                            ui.hide(ui.id('thinkX_audioStatic'));
                            ui.show(ui.id('thinkX_audioImage'));
                            this.micFailedAttempt = 0;
                            this.end();
                            // this.microphoneMachineDetect(mediaStream);
                        }, 3000);
                    }
                }
            };
            recognition.start();
        }
        else {
            this.startMediaRecorderFallback(mediaStream, audioChannelCount);
        }
    }
    /**
     *
     * @param mediaStream
     */
    microphoneMachineDetect(mediaStream, audioChannelCount) {
        ui.initAudioVisualization(mediaStream, 'thinkX_machineAudio'); // 👈 Add this line to trigger graph
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        this.micFailedAttempt++;
        const staticText = ui.translations.language_code.text;
        if (SpeechRecognition != undefined && configrationManager.isMobile == false && !this.isEdgeOnMacOS()) {
            // if (!SpeechRecognition) throw new Error("SpeechRecognition API not supported.");
            const recognition = new SpeechRecognition();
            recognition.lang = ui.translations.language_code.code;
            recognition.continuous = true; // ✅ keep listening until TTS is done
            recognition.interimResults = false;
            let detectedText = '';
            let isStopped = false;
            let onerrorSpeechMachine = false;
            recognition.onstart = () => {
                // textToSpeech.speak(staticText, undefined, () => {
                //   utility.log('🎙️ Speech recognition started');
                // });
                setTimeout(() => {
                    textToSpeech
                        .getVoiceFromAPI(staticText, ui.translations.language_code.code)
                        .then(async (audio) => {
                        audio.onended = function () {
                            recognition.stop();
                        };
                        await audio.play();
                        utility.log('🎧 Audio playback started');
                        utility.log('🎙️ Speech recognition started');
                    })
                        .catch((error) => {
                        utility.error('Error getting voice from API or playing audio:', error);
                    });
                }, 2000);
            };
            recognition.onresult = (event) => {
                if (isStopped)
                    return;
                const result = event.results[0][0].transcript;
                detectedText += result + ' ';
                utility.log('You said:', result);
                isStopped = true;
                recognition.stop();
            };
            recognition.onerror = (event) => {
                utility.error('Speech recognition error:', event.error);
                if (event.error === 'not-allowed' || event.error === 'service-not-allowed' || event.error === 'network') {
                    utility.log('🔁 Falling back to MediaRecorder speech detection');
                    recognition.abort();
                    this.speechRecorgFailed = true;
                    onerrorSpeechMachine = true;
                    this.startMediaRecorderFallbackAudio(mediaStream, audioChannelCount, staticText);
                }
            };
            recognition.onend = () => {
                clearTimeout(micspeakInterval);
                // if (!isStopped && elapsed < 10000) {
                //   this.micFailedAttempt++;
                //   utility.log(`⏱️ Restarting recognition (${Math.round(elapsed / 1000)}s elapsed)`);
                //   recognition.start(); // Restart recognition if no voice detected yet
                //   return;
                // }
                utility.log('🛑 Final result:', detectedText.trim());
                this.calculateSimilarityPercentage(detectedText, staticText);
                // if (textsimilarityPercentage <= 50.0 || detectedText == '') {
                if (onerrorSpeechMachine == false) {
                    if (detectedText.trim() == '') {
                        utility.log('erorr found microphone is not working properly.');
                        // configrationManager.speakerAttempt
                        if (this.micFailedAttempt < 3) {
                            this.speakerFlag == 1;
                            const resultDiv = ui.id('thinkX_speaker-check-text');
                            if (resultDiv) {
                                ui.innerText(resultDiv, `${ui.translations.status.speakerRetry}`);
                                this.microphoneMachineDetect(mediaStream, audioChannelCount);
                            }
                        }
                        else {
                            const errorDiv = ui.id('thinkX_speakerError-check-text');
                            if (errorDiv) {
                                ui.hide(ui.id('thinkX_speakerStatic'));
                                ui.show(ui.id('thinkX_speakerCheck-error'));
                                ui.hide(ui.id('thinkX_speakerError-check-text'));
                                // ui.innerText(errorDiv, ``);
                                const message = ui.translations.status.speakerError;
                                this.resultData.status = false;
                                this.resultData.error.push(message);
                                this.end();
                                this.onError(() => {
                                    this.retrySpeaker();
                                });
                            }
                        }
                    }
                    else {
                        const showDiv = ui.id('thinkX_speaker-check-text');
                        if (showDiv) {
                            ui.innerText(showDiv, `${ui.translations.status.speakerChecked}`);
                        }
                        ui.stopMachineBar();
                        ui.show(ui.id('thinkX_speakerCheck'));
                        ui.hide(ui.id('thinkX_speakerStatic'));
                        this.end(3000);
                    }
                }
            };
            recognition.start();
            const micspeakInterval = setTimeout(() => {
                recognition.stop();
            }, 10000);
        }
        else {
            this.startMediaRecorderFallbackAudio(mediaStream, audioChannelCount, staticText);
        }
    }
    // handleRecognitionFailure(mediaStream: MediaStream) {
    //     if (this.speakerFailedAttempt <= 1) {
    //         const resultDiv = ui.id("thinkX_speaker-check-text");
    //         if (resultDiv) {
    //             ui.innerText(resultDiv, `${ui.translations.status.speakerRetry}`);
    //             this.microphoneMachineDetect(mediaStream);
    //         }
    //     } else {
    //         const errorDiv = ui.id("thinkX_speakerError-check-text");
    //         if (errorDiv) {
    //             ui.hide(ui.id("thinkX_speakerCheck"));
    //             ui.show(ui.id("speakerCheck-error"));
    //             ui.innerText(errorDiv, ``);
    //             const message = ui.translations.status.speakerError;
    //             this.resultData.status = false;
    //             this.resultData.error.push(message);
    //             this.end();
    //         }
    //     }
    // }
    /**
     *
     * @param string1
     * @param string2
     */
    calculateSimilarityPercentage(string1, string2) {
        const maxLength = Math.max(string1.length, string2.length);
        const distance = this.levenshteinDistance(string1, string2);
        const similarityPercentage = ((maxLength - distance) / maxLength) * 100;
        return parseFloat(similarityPercentage.toFixed(2)); // Convert to number
    }
    /**
     *
     * @param string1
     * @param string2
     */
    levenshteinDistance(string1, string2) {
        const matrix = [];
        // Initialize matrix
        for (let i = 0; i <= string1.length; i++) {
            matrix[i] = [i];
        }
        for (let j = 0; j <= string2.length; j++) {
            matrix[0][j] = j;
        }
        // Calculate Levenshtein distance
        for (let i = 1; i <= string1.length; i++) {
            for (let j = 1; j <= string2.length; j++) {
                if (string1.charAt(i - 1) === string2.charAt(j - 1)) {
                    matrix[i][j] = matrix[i - 1][j - 1];
                }
                else {
                    matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, // Substitution
                    matrix[i][j - 1] + 1, // Insertion
                    matrix[i - 1][j] + 1 // Deletion
                    );
                }
            }
        }
        return matrix[string1.length][string2.length];
    }
    /**
     *
     */
    result() {
        return this.resultData;
    }
    /**
     *
     */
    cameraRevokeRetry() { }
    /**
     *
     */
    micRevokeRetry() {
        this.start();
    }
    startMediaRecorderFallback(mediaStream, audioChannelCount) {
        const mediaRecorder = new MediaRecorder(mediaStream, { mimeType: 'audio/webm' });
        let chunks = [];
        let isHandled = false;
        mediaRecorder.ondataavailable = (event) => {
            if (event.data.size > 0)
                chunks.push(event.data);
        };
        mediaRecorder.onstop = () => {
            if (isHandled)
                return;
            isHandled = true;
            const blob = new Blob(chunks, { type: 'audio/webm' });
            chunks = [];
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = () => {
                const base64Audio = reader.result.split(',')[1];
                const data = {
                    config: {
                        encoding: 'WEBM_OPUS',
                        sampleRateHertz: 48000,
                        languageCode: ui.translations.language_code.langCode,
                        audio_channel_count: audioChannelCount,
                    },
                    audio: {
                        content: base64Audio,
                    },
                };
                fetch(configrationManager.speechUrl, {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                    .then((response) => response.json())
                    .then((res) => {
                    let transcript = '';
                    try {
                        transcript = res.results[0].alternatives[0].transcript;
                        utility.log('🧠 Google Speech API returned:', transcript);
                        // const similarity = this.calculateSimilarityPercentage(transcript, staticText);
                        if (transcript.trim() == '') {
                            if (this.micFailedAttempt == 1) {
                                // const resultDiv = ui.id('thinkX_checkingMic');
                                // if (resultDiv) {
                                const textDetail = `<b>${ui.translations.status.micSentence}</b>`;
                                const candidateNameSpeaker = configrationManager.currentCandidateName;
                                const CandidateMessage = utility.replacePlaceholders(textDetail, { candidateName: candidateNameSpeaker });
                                const messageTemplate = ui.translations.status.micRetry;
                                const message = utility.replacePlaceholders(messageTemplate, {
                                    text: CandidateMessage,
                                });
                                ui.innerHTML(ui.id('thinkX_checkingMic'), `${message}`);
                                // ui.innerText(resultDiv, `${ui.translations.status.micRetry}`);
                                this.microphoneCheckStatus(mediaStream, audioChannelCount);
                                // }
                            }
                            else if (this.micFailedAttempt == 2) {
                                const textDetail = `<b>${ui.translations.status.micSentence}</b>`;
                                const candidateNameSpeaker = configrationManager.currentCandidateName;
                                const CandidateMessage = utility.replacePlaceholders(textDetail, { candidateName: candidateNameSpeaker });
                                const messageTemplate = ui.translations.status.micRetry2;
                                const message = utility.replacePlaceholders(messageTemplate, {
                                    text: CandidateMessage,
                                });
                                ui.innerHTML(ui.id('thinkX_checkingMic'), `${message}`);
                                this.microphoneCheckStatus(mediaStream, audioChannelCount);
                            }
                            else {
                                const errorDiv = ui.id('thinkX_micError');
                                if (errorDiv) {
                                    ui.hide(ui.id('thinkX_audioStatic'));
                                    ui.show(ui.id('thinkX_micErrorIcon'));
                                    ui.hide(errorDiv);
                                    const message = ui.translations.status.micError;
                                    this.resultData.status = false;
                                    this.resultData.error.push(message);
                                    this.end();
                                }
                            }
                        }
                        else {
                            // const showDiv = ui.id('thinkX_checkingMic');
                            // if (showDiv) {
                            // ui.innerText(showDiv, `${ui.translations.status.micCheck}`);
                            stepUIManager.insertText('thinkX_audioImage', `${ui.translations.status.micCheck}`);
                            // }
                            setTimeout(() => {
                                ui.stopAudioBar();
                                ui.hide(ui.id('thinkX_audioStatic'));
                                ui.show(ui.id('thinkX_audioImage'));
                                this.micFailedAttempt = 0;
                                this.end();
                                // this.microphoneMachineDetect(mediaStream);
                                clearTimeout(stopTimeout); // Stop timeout if running
                            }, 3000);
                        }
                    }
                    catch {
                        utility.log('No transcript found.');
                        if (this.micFailedAttempt == 1) {
                            // const resultDiv = ui.id('thinkX_checkingMic');
                            // if (resultDiv) {
                            const textDetail = `<b>${ui.translations.status.micSentence}</b>`;
                            const candidateNameSpeaker = configrationManager.currentCandidateName;
                            const CandidateMessage = utility.replacePlaceholders(textDetail, { candidateName: candidateNameSpeaker });
                            const messageTemplate = ui.translations.status.micRetry;
                            const message = utility.replacePlaceholders(messageTemplate, {
                                text: CandidateMessage,
                            });
                            ui.innerHTML(ui.id('thinkX_checkingMic'), `${message}`);
                            // ui.innerText(resultDiv, `${ui.translations.status.micRetry}`);
                            this.microphoneCheckStatus(mediaStream, audioChannelCount);
                            // }
                        }
                        else if (this.micFailedAttempt == 2) {
                            const textDetail = `<b>${ui.translations.status.micSentence}</b>`;
                            const candidateNameSpeaker = configrationManager.currentCandidateName;
                            const CandidateMessage = utility.replacePlaceholders(textDetail, { candidateName: candidateNameSpeaker });
                            const messageTemplate = ui.translations.status.micRetry2;
                            const message = utility.replacePlaceholders(messageTemplate, {
                                text: CandidateMessage,
                            });
                            ui.innerHTML(ui.id('thinkX_checkingMic'), `${message}`);
                            this.microphoneCheckStatus(mediaStream, audioChannelCount);
                        }
                        else {
                            const errorDiv = ui.id('thinkX_micError');
                            if (errorDiv) {
                                ui.hide(ui.id('thinkX_audioStatic'));
                                ui.show(ui.id('thinkX_micErrorIcon'));
                                ui.hide(errorDiv);
                                const message = ui.translations.status.micError;
                                this.resultData.status = false;
                                this.resultData.error.push(message);
                                this.end();
                            }
                        }
                    }
                })
                    .catch((err) => {
                    utility.error('Google Speech API error:', err);
                });
            };
        };
        mediaRecorder.start();
        const stopTimeout = setTimeout(() => {
            if (!isHandled) {
                mediaRecorder.stop(); // Stop recording after 10 seconds if no early exit
            }
        }, 10000);
    }
    startMediaRecorderFallbackAudio(mediaStream, audioChannelCount, staticText) {
        const mediaRecorder = new MediaRecorder(mediaStream, { mimeType: 'audio/webm; codecs=opus' });
        let chunks = [];
        mediaRecorder.ondataavailable = (event) => {
            if (event.data.size > 0)
                chunks.push(event.data);
        };
        mediaRecorder.onstop = () => {
            const blob = new Blob(chunks, { type: 'audio/webm; codecs=opus' });
            chunks = [];
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = () => {
                const base64Audio = reader.result.split(',')[1];
                const data = {
                    config: {
                        encoding: 'WEBM_OPUS',
                        sampleRateHertz: 48000,
                        languageCode: ui.translations.language_code.langCode,
                        audio_channel_count: audioChannelCount,
                    },
                    audio: {
                        content: base64Audio,
                    },
                };
                fetch(configrationManager.speechUrl, {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                    .then((response) => response.json())
                    .then((res) => {
                    let transcript = '';
                    try {
                        transcript = res.results[0].alternatives[0].transcript;
                        utility.log('🧠 Google Speech API returned:', transcript);
                        const similarity = this.calculateSimilarityPercentage(transcript, staticText);
                        if (transcript.trim() == '') {
                            utility.log('Error: microphone is not working properly.');
                            if (this.micFailedAttempt < 3) {
                                const resultDiv = ui.id('thinkX_speaker-check-text');
                                if (resultDiv) {
                                    ui.innerText(resultDiv, `${ui.translations.status.speakerRetry}`);
                                    this.microphoneMachineDetect(mediaStream, audioChannelCount);
                                }
                            }
                            else {
                                const errorDiv = ui.id('thinkX_speakerError-check-text');
                                if (errorDiv) {
                                    ui.hide(ui.id('thinkX_speakerStatic'));
                                    ui.show(ui.id('thinkX_speakerCheck-error'));
                                    ui.innerText(errorDiv, ``);
                                    const message = ui.translations.status.speakerError;
                                    this.resultData.status = false;
                                    this.resultData.error.push(message);
                                    this.end();
                                    this.onError(() => {
                                        this.retrySpeaker();
                                    });
                                }
                            }
                        }
                        else {
                            const showDiv = ui.id('thinkX_speaker-check-text');
                            if (showDiv) {
                                ui.innerText(showDiv, `${ui.translations.status.speakerChecked}`);
                            }
                            ui.stopMachineBar();
                            ui.show(ui.id('thinkX_speakerCheck'));
                            ui.hide(ui.id('thinkX_speakerStatic'));
                            this.end(3000);
                        }
                    }
                    catch {
                        utility.log('No transcript found.');
                        if (this.micFailedAttempt < 3) {
                            const resultDiv = ui.id('thinkX_speaker-check-text');
                            if (resultDiv) {
                                ui.innerText(resultDiv, `${ui.translations.status.speakerRetry}`);
                                this.microphoneMachineDetect(mediaStream, audioChannelCount);
                            }
                        }
                        else {
                            const errorDiv = ui.id('thinkX_speakerError-check-text');
                            if (errorDiv) {
                                ui.hide(ui.id('thinkX_speakerStatic'));
                                ui.show(ui.id('thinkX_speakerCheck-error'));
                                ui.innerText(errorDiv, ``);
                                const message = ui.translations.status.speakerError;
                                this.resultData.status = false;
                                this.resultData.error.push(message);
                                this.end();
                                this.onError(() => {
                                    this.retrySpeaker();
                                });
                            }
                        }
                        // this.handleRecognitionFailure(mediaStream); // optional: extract common retry logic to function
                    }
                })
                    .catch((err) => {
                    utility.error('Google Speech API error:', err);
                    // this.handleRecognitionFailure(mediaStream);
                });
            };
        };
        mediaRecorder.start();
        // textToSpeech.speak(staticText, undefined, () => {
        //   utility.log('🎙️ Speech recognition started');
        //   mediaRecorder.stop();
        // });
        setTimeout(() => {
            textToSpeech
                .getVoiceFromAPI(staticText, ui.translations.language_code.code)
                .then(async (audio) => {
                audio.onended = () => {
                    utility.log('📴 Audio playback ended');
                    mediaRecorder.stop(); // ✅ Stop recording after speech finishes
                };
                await audio.play();
                utility.log('🎧 Audio playback started');
                utility.log('🎙️ Speech recognition started');
            })
                .catch((error) => {
                utility.error('Error getting voice from API or playing audio:', error);
            });
        }, 1000);
    }
}
const micCheck = new MicCheck();

/**
 *
 */
class NetworkUI {
    /**
     *
     */
    removeRetry() {
        const existingRetryDiv = ui.id('thinkX_retryClose');
        existingRetryDiv?.remove();
        ui.show(ui.id('thinkX_networkError'));
        const retryBtnId = 'thinkX_networkRetry';
        stepUIManager.setRetryCloseBtn(UiComponents.retryCloseBtn(ui.translations.popup_buttons.retry, retryBtnId), 'thinkX_networkSuccess');
    }
    /**
     *
     */
    removeClass() {
        const existingRetryDiv1 = ui.id('thinkX_retryClose');
        existingRetryDiv1?.remove();
        ui.hide(ui.id('thinkX_networkError'));
        ui.show(ui.id('thinkX_networkStatic'));
        ui.hide(ui.id('thinkX_networkErrorImg'));
        ui.show(ui.id('thinkX_networkCheckText'));
    }
    /**
     *
     */
    showLoader() {
        const loaderHTML = UiComponents.loading();
        stepUIManager.setGif(loaderHTML, 'thinkX_networkSuccess');
    }
    /**
     *
     */
    hideLoader() {
        ui.hide(ui.id('thinkX_networkCheckText'));
        ui.hide(ui.id('thinkX_networkStatic'));
        ui.show(ui.id('thinkX_networkErrorImg'));
        this.loader();
    }
    /**
     *
     */
    hideAndShowIcon() {
        ui.hide(ui.id('thinkX_networkStatic'));
        ui.show(ui.id('thinkX_networkCheck'));
        ui.show(ui.id('thinkX_networkChecking'));
        ui.hide(ui.id('thinkX_networkErrorImg'));
        this.loader();
    }
    /**
     *
     */
    loader() {
        const existingLoader = ui.id('thinkX_loading');
        if (existingLoader && existingLoader.parentNode) {
            existingLoader.parentNode.removeChild(existingLoader);
        }
    }
    errorMsgShow() {
        ui.show(ui.id('thinkX_networkError'));
        const retryBtnId = 'thinkX_networkRetry';
        stepUIManager.setRetryCloseBtn(UiComponents.retryCloseBtn(ui.translations.popup_buttons.retry, retryBtnId), 'thinkX_networkSuccess');
    }
}
const networkUI = new NetworkUI();

/**
 *
 */
class NetworkCheck extends StepInterface {
    envAlias = 'Network_Check';
    pkt_config = {
        packetCount: 0,
        minSize: 0,
        maxSize: 0,
        testUrl: '',
        minTestTime: 0,
        maxTestTime: 0,
    };
    min_download;
    min_upload;
    config;
    /**
     *
     */
    constructor() {
        super();
        this.min_download = 1000;
        this.min_upload = 1000;
    }
    /**
     *
     */
    start() {
        this.pkt_config = {
            packetCount: 15, // Number of packets for averaging
            minSize: 100 * 1024, // 100 KB
            maxSize: 5 * 1024 * 1024, // 5 MB
            testUrl: environment.NETWORK_URL,
            minTestTime: 10 * 1000, // Minimum 10 seconds per test
            maxTestTime: 10 * 1000, // Maximum test time (failsafe)
        };
        this.runSpeedTest();
    }
    /**
     *
     */
    getRandomSize() {
        return (Math.floor(Math.random() * (this.pkt_config.maxSize - this.pkt_config.minSize + 1)) +
            this.pkt_config.minSize);
    }
    /**
     *
     */
    async testDownloadSpeed() {
        // var uiM = this.monitor.uiManager;
        const speeds = [];
        const startOverall = performance.now();
        let packetSize = this.pkt_config.minSize; // Start small
        while (performance.now() - startOverall < this.pkt_config.minTestTime) {
            const startTime = performance.now();
            try {
                const response = await Promise.race([
                    fetch(`${this.pkt_config.testUrl}/${packetSize}`),
                    new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), this.pkt_config.maxTestTime)),
                ]);
                // if (!response.ok) throw new Error("Download failed");
                if (response instanceof Response) {
                    await response.blob();
                }
            }
            catch (error) {
                utility.error('Error during download test:', error);
                return false;
            }
            const endTime = performance.now();
            const duration = (endTime - startTime) / 1000;
            const speedMbps = (packetSize * 8) / (duration * 1000000); // Convert to Mbps
            speeds.push(speedMbps);
            const s = this.formatSpeed(speedMbps);
            ui.downloadSpeed(s.speed, s.unit);
            if (performance.now() - startOverall > this.pkt_config.maxTestTime)
                break;
            packetSize = Math.min(packetSize * 2, this.pkt_config.maxSize); // Gradually increase size
        }
        return speeds.length ? speeds.reduce((a, b) => a + b, 0) / speeds.length : 0;
    }
    /**
     *
     */
    async testUploadSpeed() {
        // var uiM = this.monitor.uiManager;
        const speeds = [];
        const startOverall = performance.now();
        let packetSize = this.pkt_config.minSize;
        while (performance.now() - startOverall < this.pkt_config.minTestTime) {
            let data;
            try {
                data = new Blob([new Uint8Array(packetSize)]);
            }
            catch (error) {
                utility.error('Memory allocation failed for upload packet:', error);
                return 0;
            }
            const startTime = performance.now();
            try {
                await Promise.race([
                    fetch(`${this.pkt_config.testUrl}/${packetSize}`, {
                        method: 'POST',
                        body: data,
                        headers: { 'Content-Type': 'application/octet-stream' },
                    }),
                    new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), this.pkt_config.maxTestTime)),
                ]);
            }
            catch (error) {
                utility.error('Error during upload test:', error);
                return false;
            }
            const endTime = performance.now();
            const duration = (endTime - startTime) / 1000;
            const speedMbps = (packetSize * 8) / (duration * 1000000); // Convert to Mbps
            speeds.push(speedMbps);
            const s = this.formatSpeed(speedMbps);
            ui.uploadSpeed(s.speed, s.unit);
            if (performance.now() - startOverall > this.pkt_config.maxTestTime)
                break;
            packetSize = Math.min(packetSize * 2, this.pkt_config.maxSize); // Gradually increase size
        }
        return speeds.length ? speeds.reduce((a, b) => a + b, 0) / speeds.length : 0;
    }
    // Socket event handlers for network tests - Download
    async runDownloadTest() {
        return new Promise((resolve) => {
            utility.log('Starting download test...');
            const speeds = [];
            const startOverall = performance.now();
            let lastChunkTime = performance.now();
            let packetSize = this.pkt_config.minSize;
            let isTestRunning = true;
            socket.on('downloadChunk', (data) => {
                if (!isTestRunning)
                    return;
                const now = performance.now();
                const duration = (now - lastChunkTime) / 1000;
                utility.log(`Received download chunk of size: ${data.byteLength / 1024} KB in ${duration.toFixed(2)} seconds`);
                const speedMbps = (data.byteLength * 8) / (duration * 1000000);
                speeds.push(speedMbps);
                const s = this.formatSpeed(speedMbps);
                utility.log(`Download speed: ${s.speed} ${s.unit}`);
                if (performance.now() - startOverall > this.pkt_config.minTestTime) {
                    isTestRunning = false;
                    socket.emit('downloadEnd');
                }
                else {
                    packetSize = Math.min(packetSize * 2, this.pkt_config.maxSize);
                    utility.log(`Requesting next download chunk of size: ${packetSize / 1024} KB`);
                    lastChunkTime = now;
                    socket.emit('requestDownloadChunk', { packetSize: packetSize });
                }
            });
            socket.on('downloadEnd', () => {
                socket.off('downloadChunk');
                socket.off('downloadEnd');
                const avgSpeed = speeds.length ? speeds.reduce((a, b) => a + b, 0) / speeds.length : 0;
                utility.log(`Final download speed: ${this.formatSpeed(avgSpeed).speed} ${this.formatSpeed(avgSpeed).unit}`);
                resolve(avgSpeed);
            });
            setTimeout(() => {
                if (isTestRunning) {
                    isTestRunning = false;
                    socket.emit('downloadEnd');
                }
            }, this.pkt_config.maxTestTime);
            socket.emit('requestDownloadChunk', { packetSize: packetSize });
        });
    }
    // Socket event handlers for network tests - Upload
    async runUploadTest() {
        let self = this;
        return new Promise((resolve) => {
            utility.log('Starting upload test...');
            const speeds = [];
            const startOverall = performance.now();
            let packetSize = self.pkt_config.minSize;
            const sendChunk = () => {
                if (performance.now() - startOverall > self.pkt_config.minTestTime) {
                    socket.emit('uploadEnd');
                    return;
                }
                if (performance.now() - startOverall > self.pkt_config.maxTestTime) {
                    utility.log('Upload test timed out.');
                    socket.emit('uploadEnd');
                    return;
                }
                const uploadBuffer = new ArrayBuffer(packetSize);
                const startTime = performance.now();
                utility.log(`Sending upload chunk of size: ${packetSize / 1024} KB`);
                socket.emit('uploadChunk', { uploadBuffer: uploadBuffer }, '', (ackTime) => {
                    const now = performance.now();
                    const serverAckDuration = ackTime - startTime; // This is a rough measure of RTT
                    utility.log(`ACK received. RTT was ${serverAckDuration.toFixed(2)} ms`);
                    const duration = (now - startTime) / 1000;
                    const speedMbps = (packetSize * 8) / (duration * 1000000);
                    speeds.push(speedMbps);
                    const s = self.formatSpeed(speedMbps);
                    ui.uploadSpeed(s.speed, s.unit); // Update UI
                    utility.log(`Upload speed: ${s.speed} ${s.unit}`);
                    packetSize = Math.min(packetSize * 2, self.pkt_config.maxSize);
                    setTimeout(sendChunk, 0);
                });
            };
            socket.emit('startUpload');
            sendChunk();
            socket.on('uploadComplete', (ack) => {
                const avgSpeed = speeds.length ? speeds.reduce((a, b) => a + b, 0) / speeds.length : 0;
                utility.log(`Final upload speed: ${self.formatSpeed(avgSpeed).speed} ${self.formatSpeed(avgSpeed).unit}`);
                if (typeof ack === 'function') {
                    ack();
                }
                socket.off('uploadComplete');
                resolve(avgSpeed);
            });
        });
    }
    /**
     *
     */
    async runSpeedTest() {
        networkUI.showLoader();
        // var uiM = this.monitor.uiManager;
        // if(this.config.check_download){
        const downloadSpeed = await this.testDownloadSpeed();
        utility.log(`Final Download Speed: ${downloadSpeed} Mbps`);
        if (downloadSpeed === false) {
            networkUI.hideLoader();
            utility.log('Download speed test failed due to network issue.');
            this.resultData.status = false;
            this.resultData.error.push(ui.translations.status.network_error);
            this.end();
            this.onError(() => {
                this.networkRetry();
            });
            return;
        }
        var s = this.formatSpeed(downloadSpeed);
        ui.downloadSpeed(s.speed, s.unit);
        this.resultData.info['download'] = s;
        var speed = this.min_download / 1000; // kbps to mbps
        if (downloadSpeed < speed) {
            networkUI.hideLoader();
            this.resultData.status = false;
            const messageTemplate = ui.translations.status.networkErrorDetect;
            const speedStr = `${downloadSpeed.toFixed(2)}`;
            const message = utility.replacePlaceholders(messageTemplate, { speed: speedStr });
            this.resultData.error.push(message);
            this.end();
            this.onError(() => {
                this.networkRetry();
            });
            return;
            // this.resultData.error.push(`Download Speed is less then ${this.min_download} Kbps`);
        }
        // }
        // if(this.config.check_upload){
        //                utility.log("Testing Upload Speed...");
        const uploadSpeed = await this.testUploadSpeed();
        //                utility.log(`Upload Speed: ${uploadSpeed.toFixed(2)} Mbps`);
        if (uploadSpeed === false) {
            networkUI.hideLoader();
            utility.log('Upload speed test failed due to network issue.');
            this.resultData.status = false;
            this.resultData.error.push(ui.translations.status.network_error);
            this.end();
            this.onError(() => {
                this.networkRetry();
            });
            return;
        }
        var s = this.formatSpeed(uploadSpeed);
        ui.uploadSpeed(s.speed, s.unit);
        this.resultData.info['upload'] = s;
        // if(this.min_upload !== false){
        var speed = this.min_upload / 1000; // kbps to mbps
        if (uploadSpeed < speed) {
            networkUI.hideLoader();
            this.resultData.status = false;
            const messageTemplate = ui.translations.status.networkErrorDetect;
            const speedStr = `${uploadSpeed.toFixed(2)}`;
            const message = utility.replacePlaceholders(messageTemplate, { speed: speedStr });
            this.resultData.error.push(message);
            this.end();
            this.onError(() => {
                this.networkRetry();
            });
            return;
            // this.resultData.error.push(`Upload Speed is less then ${this.min_upload} Kbps`);
        }
        // }
        if (this.resultData.status) {
            networkUI.hideAndShowIcon();
            this.end(5000);
        }
    }
    /**
     *
     * @param speedMbps
     */
    formatSpeed(speedMbps) {
        const speedKbps = speedMbps * 1000;
        const speedGbps = speedMbps / 1000;
        if (speedMbps >= 1) {
            return { speed: speedMbps.toFixed(2), unit: ` Mbps` };
        }
        else if (speedKbps >= 1) {
            return { speed: speedKbps.toFixed(2), unit: ` Kbps` };
        }
        else {
            return { speed: speedGbps.toFixed(2), unit: ` Mbps` };
        }
    }
    /**
     *
     */
    networkRetry() {
        networkUI.removeRetry();
        const button = ui.id('thinkX_networkRetry');
        if (button) {
            ui.click(button, () => {
                networkUI.removeClass();
                this.resultData.status = true;
                this.resultData.error = [];
                this.start();
            });
        }
    }
    /**
     *
     */
    result() {
        return this.resultData;
    }
    /**
     *
     */
    cameraRevokeRetry() { }
    /**
     *
     */
    micRevokeRetry() { }
}
const networkCheck = new NetworkCheck();

/**
 *
 */
class IdUi {
    /**
     *
     * @param stream
     */
    setStream(stream) {
        const videoDivDom = ui.id('thinkX_id-card-video');
        if (!videoDivDom)
            return;
        videoDivDom.innerHTML = ''; // Clear previous content
        // Create wrapper div
        // const wrapper = document.createElement('div');
        // wrapper.style.position = 'relative';
        // wrapper.style.display = 'inline-block';
        // Create video element
        const video = ui.createVideoElement();
        video.srcObject = stream;
        video.style.display = 'block';
        video.id = 'thinkX_id-video';
        // Create canvas overlay
        const canvas = document.createElement('canvas');
        canvas.id = 'faceBoxCanvasID';
        canvas.style.position = 'absolute';
        canvas.style.top = '50%';
        canvas.style.left = '50%';
        canvas.style.zIndex = '10';
        canvas.style.pointerEvents = 'none';
        canvas.style.width = 'calc(100% - 20px)';
        canvas.style.height = 'calc(100% - 20px)';
        canvas.style.transform = 'translate(-50%, -50%)';
        // Resize canvas when video metadata is loaded
        video.addEventListener('loadedmetadata', () => {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
        });
        // Append both to wrapper
        // wrapper.appendChild(video);
        // wrapper.appendChild(canvas);
        // Append wrapper to DOM
        videoDivDom.appendChild(video);
        videoDivDom.appendChild(canvas);
        return video;
    }
    /**
     *
     * @param message
     */
    setMessage(message) {
        const resultDiv = ui.id('id-card-message');
        if (resultDiv) {
            ui.innerText(resultDiv, `${message}`);
        }
    }
    /**
     *
     */
    showButton() {
        ui.show(ui.id('thinkX_id-card-retry'));
        ui.show(ui.id('thinkX_id-card-next'));
        ui.hide(ui.id('thinkX_id-card-capture-id'));
    }
    /**
     *
     */
    hideButon(attempNumber) {
        ui.hide(ui.id('thinkX_id-card-retry'));
        ui.hide(ui.id('thinkX_id-card-next'));
        ui.show(ui.id('thinkX_id-card-capture-id'));
        if (configrationManager.valueMap.candidate_authentication.data.ai_revoke_face_capture.value == 1) {
            const phtoAteemptCount = configrationManager.valueMap.candidate_authentication.data.ai_revoke_face_capture_attempt
                .value;
            ui.show(ui.id('thinkX_idAttempt'));
            stepUIManager.insertText('thinkX_attempNumberID', attempNumber.toString());
            stepUIManager.insertText('thinkX_id_attemp_count', '/' + phtoAteemptCount.toString());
        }
    }
}
const idUi = new IdUi();

/**
 *
 */
class PhotoUi {
    ctx = null;
    pendingRendering = null;
    canvasIconArray = {};
    captureClickAinProgress = false;
    constructor() {
        // Initialize any required properties or methods here if needed
        this.ctx = null; // Initialize this.ctx to null
    }
    /**
     *
     * @param stream
     */
    setStream(stream) {
        const videoDivDom = ui.id('thinkX_photo-card-video');
        if (!videoDivDom)
            return;
        videoDivDom.innerHTML = ''; // Clear previous content
        // Create wrapper div
        // const wrapper = document.createElement('div');
        // wrapper.style.position = 'relative';
        // wrapper.style.display = 'inline-block';
        // Create video element
        const video = ui.createVideoElement();
        video.srcObject = stream;
        video.style.display = 'block';
        video.id = 'thinkX_photo-video';
        // Create canvas overlay
        const canvas = document.createElement('canvas');
        canvas.id = 'faceBoxCanvas';
        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.zIndex = '10';
        canvas.style.pointerEvents = 'none';
        // Resize canvas when video metadata is loaded
        video.addEventListener('loadedmetadata', () => {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
        });
        // Append both to wrapper
        // wrapper.appendChild(video);
        // wrapper.appendChild(canvas);
        // Append wrapper to DOM
        videoDivDom.appendChild(video);
        videoDivDom.appendChild(canvas);
        return video;
    }
    showLoaderwithText(id) {
        const loaderHTML = UiComponents.loadingwithtext(ui.translations.ai_label.please_wait);
        stepUIManager.setLoader(loaderHTML, id);
    }
    hideLoaderwithText() {
        const existingLoader = ui.id('thinkX_loadingwithText');
        if (existingLoader && existingLoader.parentNode) {
            existingLoader.parentNode.removeChild(existingLoader);
        }
    }
    /**
     *
     */
    drawFaceBox(coordinates, statusCode, stageComing) {
        // Cancel any pending rendering operations
        if (this.pendingRendering) {
            cancelAnimationFrame(this.pendingRendering);
        }
        let videoIdSelector;
        let canvasIdSelector;
        if (stageComing === 'id') {
            videoIdSelector = '#thinkX_id-card-video video';
            canvasIdSelector = 'faceBoxCanvasID';
        }
        else {
            videoIdSelector = '#thinkX_photo-card-video video';
            canvasIdSelector = 'faceBoxCanvas';
        }
        const canvas = ui.id(canvasIdSelector);
        const video = ui.querySelector(videoIdSelector);
        if (!canvas || !video)
            return;
        // Clear the canvas immediately
        const dpr = window.devicePixelRatio || 1;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
            utility.error('❌ Failed to get canvas context');
            return;
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // Store the current rendering state
        const renderingState = {
            coordinates,
            statusCode,
            stageComing,
            video,
            canvas,
            dpr,
            ctx,
        };
        // Use requestAnimationFrame to throttle rendering
        this.pendingRendering = requestAnimationFrame(() => {
            this.drawFaceBoxInternal(renderingState);
        });
    }
    drawFaceBoxInternal(state) {
        const { coordinates, statusCode, stageComing, video, canvas, dpr, ctx } = state;
        const displayWidth = video.clientWidth;
        const displayHeight = video.clientHeight;
        canvas.width = displayWidth * dpr;
        canvas.height = displayHeight * dpr;
        canvas.style.width = `${displayWidth}px`;
        canvas.style.height = `${displayHeight}px`;
        ctx.scale(dpr, dpr);
        const widthRatio = video.videoWidth / displayWidth;
        const heightRatio = video.videoHeight / displayHeight;
        const statusMessagesMap = {
            0: {
                label: stageComing === 'id'
                    ? ui.translations.ai_label.id_not_present
                    : ui.translations.ai_label.face_not_present,
                color: '#cc4441',
                icon: `${environment.UI_BASE_URL}images/error.svg`,
            },
            100: {
                label: stageComing === 'id'
                    ? ui.translations.ai_label.id_not_present
                    : ui.translations.ai_label.face_not_present,
                color: '#cc4441',
                icon: `${environment.UI_BASE_URL}images/error.svg`,
            },
            101: {
                label: ui.translations.ai_label.multiple_face,
                color: '#cc4441',
                icon: `${environment.UI_BASE_URL}images/error.svg`,
            },
            102: {
                label: ui.translations.ai_label.aligned,
                color: '#4C946A',
                icon: `${environment.UI_BASE_URL}images/info-tick.svg`,
            },
            103: {
                label: ui.translations.ai_label.come_closer,
                color: '#E8A13A',
                icon: `${environment.UI_BASE_URL}images/info-circle.svg`,
            },
            104: {
                label: ui.translations.ai_label.not_a_valid_id,
                color: '#cc4441',
                icon: `${environment.UI_BASE_URL}images/error.svg`,
            },
            105: {
                label: ui.translations.ai_label.aligned,
                color: '#4C946A',
                icon: `${environment.UI_BASE_URL}images/info-tick.svg`,
            },
            106: {
                label: ui.translations.ai_label.come_closer,
                color: '#E8A13A',
                icon: `${environment.UI_BASE_URL}images/info-circle.svg`,
            },
            107: {
                label: ui.translations.ai_label.move_to_right,
                color: '#E8A13A',
                icon: `${environment.UI_BASE_URL}images/info-circle.svg`,
            },
            108: {
                label: ui.translations.ai_label.move_to_left,
                color: '#E8A13A',
                icon: `${environment.UI_BASE_URL}images/info-circle.svg`,
            },
            109: {
                label: ui.translations.ai_label.move_down,
                color: '#E8A13A',
                icon: `${environment.UI_BASE_URL}images/info-circle.svg`,
            },
            110: {
                label: ui.translations.ai_label.move_up,
                color: '#E8A13A',
                icon: `${environment.UI_BASE_URL}images/info-circle.svg`,
            },
            150: {
                label: ui.translations.ai_label.go_away,
                color: '#E8A13A',
                icon: `${environment.UI_BASE_URL}images/info-circle.svg`,
            },
            151: {
                label: ui.translations.ai_label.look_into_camera,
                color: '#E8A13A',
                icon: `${environment.UI_BASE_URL}images/info-circle.svg`,
            },
            152: {
                label: ui.translations.ai_label.adjust_lighting,
                color: '#E8A13A',
                icon: `${environment.UI_BASE_URL}images/info-circle.svg`,
            },
            153: {
                label: ui.translations.ai_label.adjust_face_lighting,
                color: '#E8A13A',
                icon: `${environment.UI_BASE_URL}images/info-circle.svg`,
            },
            // 200: {
            //   label: ui.translations.ai_label.please_wait,
            //   color: '#FFD700',
            //   icon: `${environment.UI_BASE_URL}images/info-circle.svg`,
            // },
        };
        const drawRoundedRect = (ctx, x, y, width, height, radius) => {
            ctx.beginPath();
            ctx.moveTo(x + radius, y);
            ctx.lineTo(x + width - radius, y);
            ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
            ctx.lineTo(x + width, y + height - radius);
            ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
            ctx.lineTo(x + radius, y + height);
            ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
            ctx.lineTo(x, y + radius);
            ctx.quadraticCurveTo(x, y, x + radius, y);
            ctx.closePath();
            ctx.fill();
        };
        const getCanvasIcon = (iconCode) => {
            return new Promise((resolve, reject) => {
                if (this.canvasIconArray[iconCode])
                    return resolve(this.canvasIconArray[iconCode]);
                const labelIcon = new Image();
                labelIcon.src = statusMessagesMap[iconCode].icon;
                labelIcon.onload = () => {
                    this.canvasIconArray[iconCode] = labelIcon;
                    resolve(labelIcon);
                };
                labelIcon.onerror = () => reject(new Error('Failed to load icon'));
            });
        };
        const drawLabel = async (x, y, boxWidth, boxHeight, labelText, color, iconCode) => {
            try {
                const labelIcon = await getCanvasIcon(iconCode);
                const iconSize = 16;
                const paddingX = 14;
                const paddingY = 10;
                const spacing = 10;
                if (!ctx || !canvas)
                    return;
                ctx.font = 'bold 16px Arial';
                const textWidth = ctx.measureText(labelText).width;
                const labelBoxWidth = iconSize + spacing + textWidth + paddingX * 2;
                const labelBoxHeight = iconSize + paddingY * 2;
                const canvasW = canvas.width / dpr;
                const canvasH = canvas.height / dpr;
                let labelX = x;
                let labelY = y - labelBoxHeight - 10;
                if (labelY < 0)
                    labelY = y + boxHeight + 10;
                if (labelY + labelBoxHeight > canvasH)
                    labelY = y - labelBoxHeight - 10;
                if (labelX + labelBoxWidth > canvasW)
                    labelX = canvasW - labelBoxWidth - 10;
                if (labelX < 0)
                    labelX = 10;
                ctx.fillStyle = color;
                const cornerRadius = stageComing === 'id' ? 6 : 4;
                drawRoundedRect(ctx, labelX, labelY, labelBoxWidth, labelBoxHeight, cornerRadius);
                ctx.drawImage(labelIcon, labelX + paddingX, labelY + paddingY, iconSize, iconSize);
                ctx.fillStyle = 'white';
                ctx.fillText(labelText, labelX + paddingX + iconSize + spacing, labelY + paddingY + iconSize - 3);
            }
            catch (error) {
                utility.error('Error drawing label:', error);
            }
        };
        // Clear the canvas again before drawing
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const drawRoundedBox = (x, y, width, height, color) => {
            if (!ctx)
                return;
            ctx.beginPath();
            ctx.lineWidth = 4;
            ctx.strokeStyle = color;
            const cornerRadius = stageComing === 'id' ? 6 : 4;
            ctx.roundRect(x, y, width, height, cornerRadius);
            ctx.stroke();
        };
        if (Array.isArray(coordinates) && coordinates.length > 0) {
            this.hideLoaderwithText();
            coordinates.forEach((face) => {
                const x = face._x / widthRatio;
                const y = face._y / heightRatio;
                const width = face._width / widthRatio;
                const height = face._height / heightRatio;
                const faceStatusCode = face._statusCode || statusCode;
                const faceStatusInfo = statusMessagesMap[faceStatusCode] || statusMessagesMap[0];
                drawRoundedBox(x, y, width, height, faceStatusInfo.color);
                drawLabel(x, y, width, height, faceStatusInfo.label, faceStatusInfo.color, faceStatusCode);
            });
        }
        else {
            if (statusCode === 200 || statusCode === 220) {
                const idName = stageComing === 'id' ? 'thinkx_proc_video_wrap_id' : 'thinkx_proc_video_wrap_photo';
                this.showLoaderwithText(idName);
                return;
            }
            else {
                this.hideLoaderwithText();
                const w = video.clientWidth;
                const h = video.clientHeight;
                const x = 2 * (w / 6);
                const y = h / 5;
                const width = 2 * (w / 6);
                const height = 3 * (h / 5);
                const fallbackStatusInfo = statusMessagesMap[statusCode] || statusMessagesMap[0];
                drawRoundedBox(x, y, width, height, fallbackStatusInfo.color);
                drawLabel(x, y, width, height, fallbackStatusInfo.label, fallbackStatusInfo.color, statusCode);
            }
        }
    }
    /**
     *
     * @param message
     */
    setMessage(message) {
        const resultDiv = ui.id('photo-card-message');
        if (resultDiv) {
            ui.innerText(resultDiv, `${message}`);
        }
    }
    /**
     *
     */
    showButton() {
        ui.show(ui.id('thinkX_photo-card-retry'));
        ui.show(ui.id('thinkX_photo-card-next'));
        ui.hide(ui.id('thinkX_photo-card-capture'));
    }
    /**
     *
     */
    hideButon(attempNumber) {
        ui.hide(ui.id('thinkX_photo-card-retry'));
        ui.hide(ui.id('thinkX_photo-card-next'));
        ui.show(ui.id('thinkX_photo-card-capture'));
        if (configrationManager.valueMap.candidate_authentication.data.ai_revoke_face_capture.value == 1) {
            const phtoAteemptCount = configrationManager.valueMap.candidate_authentication.data.ai_revoke_face_capture_attempt
                .value;
            ui.hide(ui.id('thinkX_photoAttempt')); // hide interview
            stepUIManager.insertText('thinkX_attempNumber', attempNumber.toString());
            stepUIManager.insertText('thinkX_id_attemp_count_photo', '/' + phtoAteemptCount.toString());
        }
    }
    /**
     *
     */
    getCaptureBtnEnable(captureBtn, video, envAlias, stageComing) {
        if (captureBtn) {
            captureBtn.disabled = true; // 🚫 disable by default
            captureBtn.classList.add('thinkproc-disable'); // optional: add a disabled style class
            captureBtn.onclick = async () => {
                video.pause();
                // ai.stopPhotoAndID((message: any) => {
                //   utility.log(message);
                // });
                this.captureClickAinProgress = true;
                if (stageComing === 'id') {
                    idUi.showButton(); // Show the buttons for ID stage
                    this.clearCanvas('faceBoxCanvasID');
                }
                else {
                    this.clearCanvas('faceBoxCanvas');
                    this.showButton(); // Show the buttons
                }
                const { blob: imageBlob, base64 } = await utility.takeSnapshot(video);
                if (!imageBlob || !base64) {
                    utility.error('Failed to capture image from video.');
                    return;
                }
                if (stageComing !== 'id') {
                    configrationManager.base64Snapshot = base64;
                }
                // const imageBlob = utility.base64ToBlob(image);
                request
                    .uploadIdAndPhoto({ environment: envAlias }, imageBlob)
                    .then((response) => {
                    utility.log('✅ Photo Uploaded success', response);
                    if (stageComing === 'id') {
                        stepUIManager.insertText('thinkX_id-card-next', ui.translations.idVerification.nextBtn);
                        this.removeDisableBtn('thinkX_id-card-next');
                    }
                    else {
                        stepUIManager.insertText('thinkX_photo-card-next', ui.translations.photoVerification.nextBtn);
                        this.removeDisableBtn('thinkX_photo-card-next');
                    }
                })
                    .catch((error) => {
                    utility.log('❌ Photo Uploaded failed', error);
                });
                captureBtn.disabled = true; // optional: disable again after capture
                captureBtn.classList.add('thinkproc-disable');
            };
        }
    }
    clearCanvas(id) {
        const canvasDiv = ui.id(id);
        this.ctx = canvasDiv.getContext('2d');
        if (!this.ctx) {
            utility.error('❌ Failed to get canvas context');
            return;
        }
        let self = this;
        utility.wait(1000).then(() => {
            if (self.ctx)
                self.ctx.clearRect(0, 0, self.ctx.canvas.width, self.ctx.canvas.height); // Clear the canvas
        });
    }
    addDisableBtn(id) {
        const addClass = ui.id(id);
        if (addClass) {
            ui.addClass(addClass, 'thinkproc-disable');
        }
    }
    removeDisableBtn(id) {
        const addClass = ui.id(id);
        if (addClass) {
            ui.removeClass(addClass, 'thinkproc-disable');
        }
    }
}
const photoUi = new PhotoUi();

/**
 *
 */
class PhotoCheck extends StepInterface {
    envAlias = 'Photo_Verification';
    /**
     *
     */
    constructor() {
        super();
    }
    /**
     *
     */
    async getCameraStream() {
        const currentStream = await liveStreamManager.requestVideo(LiveStreamManager.CAMERA.PRIMARY);
        return currentStream?.stream || null;
    }
    /**
     *
     */
    async start() {
        this.subscribe(SDK_EVENT.NETWORK_DISCONNECT, function () {
            ai.stopPhotoAndID().then((message) => {
                utility.log(message);
            }).catch((err) => {
                utility.log('Error stopping photo and ID capture on network disconnect', err);
            });
        });
        this.capture();
        this.retryBtn();
        this.nextBtn();
    }
    /**
     *
     */
    retryBtn() {
        const button = ui.id('thinkX_photo-card-retry');
        if (button) {
            ui.click(button, async () => {
                ui.show(ui.id('thinkX_photo-card-capture'));
                // this.capture();
                photoUi.captureClickAinProgress = false;
                ui.hide(ui.id('thinkX_photo-card-next'));
                ui.hide(ui.id('thinkX_photo-card-retry'));
                let videoElement = ui.id('thinkX_photo-video');
                if (videoElement) {
                    videoElement.play();
                }
            });
        }
    }
    /**
     *
     */
    async capture() {
        photoUi.addDisableBtn('thinkX_photo-card-next');
        stepUIManager.insertText('thinkX_photo-card-next', ui.translations.ai_label.please_wait);
        photoUi.hideButon(configrationManager.photoAttemptNo);
        photoUi.setMessage(ui.translations.idVerification.photo_info);
        const stream = await this.getCameraStream();
        if (stream) {
            const video = photoUi.setStream(stream);
            if (!video) {
                utility.log('❌ Failed to get video element');
                return;
            }
            video.play();
            const captureBtn = ui.id('thinkX_photo-card-capture');
            photoUi.getCaptureBtnEnable(captureBtn, video, this.envAlias, 'photo');
            photoUi.showLoaderwithText('thinkx_proc_video_wrap_photo');
            ai.photoVerify(video, (message) => {
                if (photoUi.captureClickAinProgress == false) {
                    utility.log(message, 'prateek');
                    photoUi.setMessage(message.message);
                    photoUi.drawFaceBox(message.face_coordinates, message.status_code, 'photo');
                    if (captureBtn) {
                        if (message.status_code === 105) {
                            if (captureBtn.disabled) {
                                captureBtn.disabled = false;
                                captureBtn.classList.remove('thinkproc-disable');
                            }
                        }
                        else {
                            if (!captureBtn.disabled) {
                                captureBtn.disabled = true;
                                captureBtn.classList.add('thinkproc-disable');
                            }
                        }
                    }
                }
            });
        }
    }
    /**
     *
     */
    nextBtn() {
        const button = ui.id('thinkX_photo-card-next');
        if (button) {
            ui.click(button, () => {
                photoUi.addDisableBtn('thinkX_photo-card-next');
                ai.stopPhotoAndID().then((message) => {
                    utility.log(message);
                    photoUi.captureClickAinProgress = false;
                    this.resultData.info = 'Photo capture successfully';
                    this.end(0);
                }).catch((err) => {
                    utility.log('Error stopping photo capture', err);
                    // Optionally, you can set an error message in resultData or handle it as needed
                });
            });
        }
    }
    /**
     *
     */
    result() {
        return this.resultData;
    }
    cameraRevoke() {
        ai.stopPhotoAndID().then((message) => {
            utility.log(message);
        }).catch((err) => {
            utility.log('Error stopping photo capture on camera revoke', err);
        });
    }
    /**
     *
     */
    cameraRevokeRetry() {
        photoUi.captureClickAinProgress = false;
        this.capture();
    }
    /**
     *
     */
    micRevokeRetry() {
        ai.stopPhotoAndID().then((message) => {
            utility.log(message);
        }).catch((err) => {
            utility.log('Error stopping photo capture on mic revoke retry', err);
        });
        photoUi.captureClickAinProgress = false;
        this.capture();
    }
}
const photoCheck = new PhotoCheck();

/**
 *
 */
class IdCheck extends StepInterface {
    envAlias = 'Id_Capture';
    /**
     *
     */
    constructor() {
        super();
    }
    /**
     *
     */
    async getCameraStream() {
        const currentStream = await liveStreamManager.requestVideo(LiveStreamManager.CAMERA.PRIMARY);
        return currentStream?.stream || null;
    }
    /**
     *
     */
    async start() {
        this.subscribe(SDK_EVENT.NETWORK_DISCONNECT, function () {
            ai.stopPhotoAndID().then((message) => {
                utility.log(message);
            }).catch((err) => {
                utility.log('Error stopping ID capture on network disconnect', err);
            });
        });
        this.capture();
        this.retryBtn();
        this.nextBtn();
    }
    /**
     *
     */
    retryBtn() {
        const button = ui.id('thinkX_id-card-retry');
        if (button) {
            ui.click(button, async () => {
                ui.show(ui.id('thinkX_id-card-capture-id'));
                // this.capture();
                photoUi.captureClickAinProgress = false;
                ui.hide(ui.id('thinkX_id-card-next'));
                ui.hide(ui.id('thinkX_id-card-retry'));
                let videoElement = ui.id('thinkX_id-video');
                if (videoElement) {
                    videoElement.play();
                }
            });
        }
    }
    /**
     *
     */
    async capture() {
        photoUi.addDisableBtn('thinkX_id-card-next');
        stepUIManager.insertText('thinkX_id-card-next', ui.translations.ai_label.please_wait);
        idUi.hideButon(configrationManager.photoAttemptNo);
        idUi.setMessage(ui.translations.idVerification.setIdCard);
        const stream = await this.getCameraStream();
        if (stream) {
            const video = idUi.setStream(stream);
            if (!video) {
                utility.log('❌ Failed to get video element');
                return;
            }
            video.play();
            const captureBtn = ui.id('thinkX_id-card-capture-id');
            photoUi.getCaptureBtnEnable(captureBtn, video, this.envAlias, 'id');
            photoUi.showLoaderwithText('thinkx_proc_video_wrap_id');
            ai.idVerify(video, (message) => {
                if (photoUi.captureClickAinProgress == false) {
                    utility.log(message, 'prateek');
                    idUi.setMessage(message.message);
                    photoUi.drawFaceBox(message.face_coordinates, message.status_code, 'id');
                    if (captureBtn) {
                        if (message.status_code === 102) {
                            if (captureBtn.disabled) {
                                captureBtn.disabled = false;
                                captureBtn.classList.remove('thinkproc-disable');
                            }
                        }
                        else {
                            if (!captureBtn.disabled) {
                                captureBtn.disabled = true;
                                captureBtn.classList.add('thinkproc-disable');
                            }
                        }
                    }
                }
            });
        }
    }
    /**
     *
     */
    nextBtn() {
        const button = ui.id('thinkX_id-card-next');
        if (button) {
            ui.click(button, () => {
                photoUi.addDisableBtn('thinkX_id-card-next');
                ai.stopPhotoAndID().then((message) => {
                    utility.log(message);
                    photoUi.captureClickAinProgress = false;
                    this.resultData.info = 'ID capture successfully';
                    this.end(0);
                }).catch((err) => {
                    utility.log('Error stopping ID capture', err);
                    // Optionally, you can set an error message in resultData or handle it as needed
                });
            });
        }
    }
    /**
     *
     */
    result() {
        return this.resultData;
    }
    /**
     *
     */
    cameraRevokeRetry() {
        ai.stopPhotoAndID().then((message) => {
            utility.log(message);
        }).catch((err) => {
            utility.log('Error stopping ID capture on camera revoke retry', err);
        });
        photoUi.captureClickAinProgress = false;
        this.capture();
    }
    /**
     *
     */
    micRevokeRetry() {
        ai.stopPhotoAndID().then((message) => {
            utility.log(message);
        }).catch((err) => {
            utility.log('Error stopping ID capture on mic revoke retry', err);
        });
        photoUi.captureClickAinProgress = false;
        this.capture();
    }
}
const idCheck = new IdCheck();

class CameraSetupUI {
    cameraSetupDivID = 'thinkX_cameraSetup-card-video';
    qrStatusInterval = null;
    async showQrPage(allowclickCallback, step, camType) {
        ui.hide(ui.id('thinkX_cameraSetup_Instruction'));
        ui.hide(ui.id('thinkX_cameraSetup_box'));
        ui.show(ui.id('thinkX_QR_camSetup'));
        this.getQRData(camType, step);
        // Clear any old interval before starting a new one
        if (this.qrStatusInterval) {
            clearInterval(this.qrStatusInterval);
        }
        // Set interval to check status every 5 seconds
        this.qrStatusInterval = setInterval(async () => {
            try {
                const response = await request.checkCurrentQRstatus({ camera_type: camType, environment: step });
                if (response.data.status === 'EXPIRE') {
                    this.getQRData(camType, step);
                }
            }
            catch (error) {
                utility.log('QR code status request failed', error);
            }
        }, 5000); // 5,000 ms = 5 seconds
        await this.loadSecondaryCamerasOnly();
        const select = ui.id('thinkX_CameraSetupSelect');
        const allowBtn = ui.id('thinkX_CameraSetupAllowBtn');
        if (select && allowBtn) {
            // Optional: disable Allow button until a camera is selected
            allowBtn.disabled = true;
            ui.addClass(allowBtn, 'thinkproc-disable');
            select.addEventListener('change', () => {
                allowBtn.disabled = select.value === '';
            });
            // Enable if pre-selected value exists
            allowBtn.disabled = select.value === '';
            if (!allowBtn.disabled) {
                ui.removeClass(allowBtn, 'thinkproc-disable');
            }
            ui.click(allowBtn, async () => {
                allowclickCallback(select);
            });
        }
    }
    // helper method to stop the interval
    stopQrStatusCheck() {
        if (this.qrStatusInterval) {
            clearInterval(this.qrStatusInterval);
            this.qrStatusInterval = null;
        }
    }
    getQRData(camSelect, step) {
        this.showLoader();
        request
            .QRCode({ camera_type: camSelect, environment: step })
            .then((response) => {
            if (response.message?.toLowerCase().includes('qr code') && response.data?.qr_svg) {
                const svg = response.data.qr_svg;
                const base64Svg = 'data:image/svg+xml;base64,' +
                    btoa(encodeURIComponent(svg).replace(/%([0-9A-F]{2})/g, (_, p1) => String.fromCharCode(parseInt(p1, 16))));
                // Create <img> element
                const img = document.createElement('img');
                img.src = base64Svg;
                img.alt = 'QR Code';
                img.className = 'thinkproc-qrimgCamSetup';
                img.style.maxWidth = '100%'; // Optional styling
                // Append to the container with ID "thinkproc-qrimage"
                const container = ui.id('thinkX_qrCode_camSetup');
                if (container) {
                    container.innerHTML = ''; // Clear previous content
                    container.appendChild(img);
                }
                else {
                    utility.log('QR image container not found');
                }
                this.hideLoader();
            }
            else {
                utility.log('QR code generation failed or SVG missing', response);
            }
        })
            .catch((error) => {
            utility.log('QR code request failed', error);
        });
    }
    async loadSecondaryCamerasOnly() {
        try {
            const currentDeviceId = LiveStreamManager.CAMERA.PRIMARY.videoDeviceIN;
            const sideDeviceId = LiveStreamManager.CAMERA.SIDE.videoDeviceIN;
            const frontDeviceId = LiveStreamManager.CAMERA.FRONT.videoDeviceIN;
            const backDeviceId = LiveStreamManager.CAMERA.BACK.videoDeviceIN;
            const customDeviceId = LiveStreamManager.CAMERA.CUSTOM.videoDeviceIN;
            const devices = await liveStreamManager.getMediaDevices();
            const secRetryIcon = ui.id('thinkX_SetUpCameraRetryIcon');
            const allowBtn = ui.id('thinkX_CameraSetupAllowBtn');
            if (devices && typeof devices !== 'boolean') {
                const videoDevices = devices.video;
                const secondaryDevices = videoDevices.filter((device) => device.deviceId !== frontDeviceId &&
                    device.deviceId !== backDeviceId &&
                    device.deviceId !== sideDeviceId &&
                    device.deviceId !== currentDeviceId &&
                    device.deviceId !== customDeviceId);
                ui.show(ui.id('thinkproc-setUpCameraSelectWrap'));
                const options = secondaryDevices.map((cam, i) => ({
                    value: cam.deviceId || `${i}`,
                    label: cam.label || `Camera Device ${i + 1}`,
                }));
                utility.log(options.length, 'option length1');
                if (options.length > 0) {
                    stepUIManager.initAndUpdateCustomSelectById('thinkX_CameraSetupSelect', options, options[0]?.value);
                    if (secRetryIcon) {
                        ui.addClass(secRetryIcon, 'd-none');
                    }
                    if (allowBtn) {
                        allowBtn.disabled = false;
                        ui.removeClass(allowBtn, 'thinkproc-disable');
                    }
                }
                else {
                    stepUIManager.initAndUpdateCustomSelectById('thinkX_CameraSetupSelect', [{ value: '', label: ui.translations.status.no_camera_found }], '');
                    if (secRetryIcon) {
                        ui.show(secRetryIcon);
                        // Prevent attaching the click multiple times
                        if (!secRetryIcon.dataset.binded) {
                            ui.click(secRetryIcon, async () => {
                                await this.retryAdditionalCamera();
                            });
                            secRetryIcon.dataset.binded = 'true';
                        }
                    }
                }
            }
            else {
                stepUIManager.initAndUpdateCustomSelectById('thinkpro-get-camera-value', [{ value: '', label: ui.translations.status.cameraAccessDenied }], '');
            }
        }
        catch (err) {
            utility.error('Failed to load camera devices:', err);
            stepUIManager.initAndUpdateCustomSelectById('thinkpro-get-camera-value', [{ value: '', label: ui.translations.status.cameraAccessDenied }], '');
        }
    }
    async retryAdditionalCamera() {
        try {
            const { PRIMARY, SIDE, FRONT, BACK, CUSTOM } = LiveStreamManager.CAMERA;
            const currentDeviceId = PRIMARY.videoDeviceIN;
            const sideDeviceId = SIDE.videoDeviceIN;
            const frontDeviceId = FRONT.videoDeviceIN;
            const backDeviceId = BACK.videoDeviceIN;
            const customDeviceId = CUSTOM.videoDeviceIN;
            const devices = await liveStreamManager.getMediaDevices();
            const reloadIconSecCam = ui.id('thinkX_reloadIconCamSetup');
            const secRetryIcon = ui.id('thinkX_SetUpCameraRetryIcon');
            const allowBtn = ui.id('thinkX_CameraSetupAllowBtn');
            if (reloadIconSecCam) {
                ui.addClass(reloadIconSecCam, 'iconRotate');
            }
            if (devices && typeof devices !== 'boolean') {
                const videoDevices = devices.video || [];
                const secondaryDevices = videoDevices.filter((device) => ![currentDeviceId, sideDeviceId, frontDeviceId, backDeviceId, customDeviceId].includes(device.deviceId));
                const options = secondaryDevices.map((cam, i) => ({
                    value: cam.deviceId || `${i}`,
                    label: cam.label || `Camera Device ${i + 1}`,
                }));
                utility.log(options.length, 'Secondary camera options found');
                if (options.length > 0) {
                    uiEvents.setOptions('thinkX_CameraSetupSelect', options, options[0].value);
                    if (secRetryIcon)
                        ui.hide(secRetryIcon);
                    if (allowBtn) {
                        allowBtn.disabled = false;
                        ui.removeClass(allowBtn, 'thinkproc-disable');
                    }
                }
                else {
                    uiEvents.setOptions('thinkX_CameraSetupSelect', [{ value: '', label: ui.translations.status.no_camera_found }], '');
                    if (secRetryIcon)
                        ui.show(secRetryIcon);
                }
            }
            else {
                uiEvents.setOptions('thinkX_CameraSetupSelect', [{ value: '', label: ui.translations.status.cameraAccessDenied }], '');
            }
            if (reloadIconSecCam) {
                utility.wait(3000).then(() => ui.removeClass(reloadIconSecCam, 'iconRotate'));
            }
        }
        catch (err) {
            utility.error('Retry failed to load secondary camera devices:', err);
            uiEvents.setOptions('thinkX_CameraSetupSelect', [{ value: '', label: ui.translations.status.cameraAccessDenied }], '');
        }
    }
    showLoader() {
        const loaderHTML = UiComponents.loading();
        stepUIManager.setGif(loaderHTML, 'thinkX_qrCode_camSetup');
    }
    hideLoader() {
        const existingLoader = ui.id('thinkX_loading');
        if (existingLoader && existingLoader.parentNode) {
            existingLoader.parentNode.removeChild(existingLoader);
        }
    }
    hideCameraSelectPage() {
        ui.hide(ui.id('thinkX_QR_camSetup')); // hide QR code img Page
        ui.show(ui.id('thinkX_cameraSetup_box')); //open camera frame page
    }
    hideCameraStreamPage() {
        ui.show(ui.id('thinkX_QR_camSetup')); // hide QR code img Page
        ui.hide(ui.id('thinkX_cameraSetup_box')); //open camera frame page
    }
    async cameraSetupStart(callback, cameraID = '', camType = 'S_CAM') {
        if (!cameraID && LiveStreamManager.PRIMARY_CAMERA_NAME === 'P_CAM') {
            utility.log('No camera selected.');
            return;
        }
        if (LiveStreamManager.PRIMARY_CAMERA_NAME === 'P_CAM') {
            try {
                const isValid = await liveStreamManager.isValidDeviceId(cameraID, 'videoinput');
                utility.log('camera revoke', isValid);
                if (!isValid)
                    return;
                let cameraRef;
                switch (camType) {
                    case 'S_CAM':
                        cameraRef = LiveStreamManager.CAMERA.SIDE;
                        break;
                    case 'B_CAM':
                        cameraRef = LiveStreamManager.CAMERA.BACK;
                        break;
                    case 'C_CAM':
                        cameraRef = LiveStreamManager.CAMERA.CUSTOM;
                        break;
                    default:
                        cameraRef = LiveStreamManager.CAMERA.FRONT;
                }
                if (cameraRef.stream) {
                    cameraRef.stream.getTracks().forEach((track) => track.stop());
                }
                liveStreamManager.setCameraDeviceId(cameraRef, cameraID);
                cameraRef.label = cameraID;
                const stream = await liveStreamManager.requestVideo(cameraRef);
                if (!stream) {
                    utility.log('Could not get stream for selected camera.');
                    alert('Could not get stream for selected camera.');
                    return;
                }
                cameraRef.stream = stream.stream;
                callback(stream.stream);
            }
            catch (err) {
                utility.log('Error during camera setup:', err);
            }
        }
    }
    showTextAndAudio(text, audio = true, socketuserID = '', modeSend = '', uniqueKey = '', direct = 0) {
        this.clearOverlayMessage();
        utility.log('CAMERA SETUP :', text);
        this.showOverlayMessage(text);
        if (LiveStreamManager.PRIMARY_CAMERA_NAME != 'P_CAM') {
            let message = { mode: modeSend, text: text };
            socket.sendMessage(socketuserID, message);
        }
        if (audio) {
            textToSpeech
                .getVoiceFromAPI(text, ui.translations.language_code.code, uniqueKey, direct)
                .then(async (audio) => {
                audio.onended = function () {
                    audio.pause();
                };
                await audio.play();
            })
                .catch((error) => {
                utility.error('Error getting voice from API or playing audio:', error);
            });
        }
    }
    clearOverlayMessage() {
        const existing = document.getElementById('thinkX_videoOverlayMsg_cameraSetup');
        if (existing)
            existing.remove();
    }
    showOverlayMessage(message) {
        const container = document.getElementById(this.cameraSetupDivID);
        if (!container)
            return;
        const existing = container.querySelector('.video-overlay-message');
        if (existing)
            existing.remove();
        const overlayWrapper = document.createElement('div');
        overlayWrapper.className = 'video-overlay-message';
        const span = document.createElement('span');
        span.id = 'thinkX_videoOverlayMsg_cameraSetup';
        span.textContent = message;
        overlayWrapper.appendChild(span);
        container.appendChild(overlayWrapper);
    }
    setAttemptData(attemptNo, step) {
        this.stopQrStatusCheck();
        if (step == 1) {
            const addClass = ui.id('thinkX_sideCameraSetup_Start');
            if (addClass) {
                ui.addClass(addClass, 'threeSixtyStart');
                ui.removeClass(addClass, 'complete');
                ui.removeClass(addClass, 'ufmRoom');
                ui.show(ui.id('sideCamIcon'));
            }
        }
        if (step == 2) {
            const addClass = ui.id('thinkX_backCameraSetup_Start');
            if (addClass) {
                ui.addClass(addClass, 'threeSixtyStart');
                ui.removeClass(addClass, 'complete');
                ui.removeClass(addClass, 'ufmRoom');
                ui.hide(ui.id('sideCamIcon'));
                ui.show(ui.id('backCamIcon'));
            }
        }
        if (step == 3) {
            const addClass = ui.id('thinkX_frontCameraSetup_Start');
            if (addClass) {
                ui.addClass(addClass, 'threeSixtyStart');
                ui.removeClass(addClass, 'complete');
                ui.removeClass(addClass, 'ufmRoom');
                ui.hide(ui.id('sideCamIcon'));
                ui.hide(ui.id('backCamIcon'));
                ui.show(ui.id('frontCamIcon'));
            }
        }
        if (step == 4) {
            const addClass = ui.id('thinkX_additionalCameraSetup_Start');
            if (addClass) {
                ui.removeClass(addClass, 'threeSixtyStart');
                ui.removeClass(addClass, 'complete');
                ui.removeClass(addClass, 'ufmRoom');
                ui.hide(ui.id('sideCamIcon'));
                ui.hide(ui.id('backCamIcon'));
                ui.hide(ui.id('frontCamIcon'));
            }
        }
    }
    setStream(stream) {
        const videoDivDom = ui.id(this.cameraSetupDivID);
        const video = ui.createVideoElement();
        video.srcObject = stream;
        video.muted = true;
        if (videoDivDom) {
            const existingVideos = videoDivDom.querySelectorAll('video');
            existingVideos.forEach((v) => v.remove());
        }
        videoDivDom?.append(video);
        return video;
    }
    setPageTitle(title) {
        const Element1 = ui.id('thinkX-additionalCamName');
        if (Element1) {
            ui.innerText(Element1, title);
        }
        const Element2 = ui.id('thinkX-cameraSetup-title');
        if (Element2) {
            ui.innerText(Element2, title);
        }
    }
    hideCountLabelInMobile() {
        ui.hide(ui.id('thinkX_sideCameraSetup_Start'));
        ui.hide(ui.id('thinkX_backCameraSetup_Start'));
        ui.hide(ui.id('thinkX_frontCameraSetup_Start'));
        ui.hide(ui.id('thinkX_step_count_area'));
    }
    hideInactiveCameraLabel() {
        if (configrationManager.valueMap.additional_cam.data.ai_enable.data.ai_side_view_cam == 0) {
            ui.hide(ui.id('thinkX_sideCameraSetup_Start'));
        }
        if (configrationManager.valueMap.additional_cam.data.ai_enable.data.ai_back_view_cam == 0) {
            ui.hide(ui.id('thinkX_backCameraSetup_Start'));
        }
        if (configrationManager.valueMap.additional_cam.data.ai_enable.data.ai_front_view_cam == 0) {
            ui.hide(ui.id('thinkX_frontCameraSetup_Start'));
        }
        configrationManager.cameraSetupStep++;
        stepUIManager.insertText('thinkX_cameraStepupCount', configrationManager.cameraSetupStep.toString());
    }
    cameraSetupAudioText(message) {
        ui.show(ui.id('thinkX_videoOverlayMsg_cameraSetup'));
        stepUIManager.insertText('thinkX_videoOverlayMsg_cameraSetup', message.text);
    }
    showLoaderwithText(id) {
        const loaderHTML = UiComponents.loadingwithtext(ui.translations.ai_label.please_wait);
        stepUIManager.setLoader(loaderHTML, id);
    }
    hideLoaderwithText() {
        const existingLoader = ui.id('thinkX_loadingwithText');
        if (existingLoader && existingLoader.parentNode) {
            existingLoader.parentNode.removeChild(existingLoader);
        }
    }
    showSecondInstruction(callback) {
        const page = ui.id('thinkX_cameraInstructionPopup');
        const nextBtn = ui.id('thinkX_cameraInstructionPopup_next');
        if (page)
            ui.show(page);
        if (nextBtn) {
            ui.click(nextBtn, () => {
                ui.hide(page);
                callback();
            });
        }
    }
}
const cameraSetup = new CameraSetupUI();

/**
 *
 */
class AddCamCustomView extends StepInterface {
    envAlias = 'Custom_Camera';
    camType = 'C_CAM';
    selectedCameraId = '';
    selectCameraLabel = '';
    socketuserID;
    cameraRevokePopup = null;
    preAiStatusResponse = null;
    preAiStatusResponseCounter = 0;
    recordingCamStarted = false;
    flag = false;
    validPositionCount = 0;
    streamCustomInterval = null;
    /**
     *
     */
    constructor() {
        super();
        this.socketuserID = '';
        this.cameraAllowClick = this.cameraAllowClick.bind(this);
        this.streamCallback = this.streamCallback.bind(this);
    }
    /**
     *
     */
    start() {
        cameraSetup.setPageTitle(ui.translations.cameraSetup.custom_camera);
        stepUIManager.insertHtml('thinkX_cameraSetup_instruction_step', ui.translations.cameraSetup.customInstructionStep);
        ui.show(ui.id('thinkX_compatibility_wrapper'));
        ui.show(ui.id('thinkX_cameraSetup_Instruction'));
        stepUIManager.insertText('thinkX-additionalCamera-subTitle', ui.translations.cameraSetup.additional_camera_subtitle);
        ui.hide(ui.id('thinkX_step_count_area'));
        ui.hide(ui.id('thinkX-additionalCamName'));
        ui.hide(ui.id('thinkX_cameraSetup-card-video'));
        ui.show(ui.id('thinkX_additional_camera_box'));
        cameraSetup.cameraSetupDivID = 'thinkX_additional-cameraSetup-card-video';
        stepUIManager.insertHtml('thinkX_customCam_instruition', configrationManager.valueMap.additional_cam.data.live_custom_cam.data.live_custom_cam_ins);
        stepUIManager.insertHtml('thinkX_popup_customCam_instruition', configrationManager.valueMap.additional_cam.data.live_custom_cam.data.live_custom_cam_ins);
        if (LiveStreamManager.PRIMARY_CAMERA_NAME === 'P_CAM') {
            if (configrationManager.CameraSetupInstruction) {
                ui.show(ui.id('thinkX_cameraSetup_Instruction'));
                configrationManager.CameraSetupInstruction = false;
            }
            cameraSetup.hideInactiveCameraLabel();
            this.showQrUIPage();
        }
        else {
            ui.hide(ui.id('thinkX_cameraSetup_Instruction'));
            cameraSetup.showSecondInstruction(() => {
                cameraSetup.hideCountLabelInMobile();
                liveStreamManager.getCameraStream(LiveStreamManager.CAMERA.CUSTOM, 'environment')
                    .then((stream) => {
                    if (stream)
                        this.setRoomStream(stream.stream);
                    cameraSetup.hideCameraSelectPage();
                    const socketUserName = utility.extractPrefix(configrationManager.socketUserName, this.camType);
                    this.socketuserID = socketUserName;
                    let message1 = { mode: 'sending_stream', text: 'sending stream' };
                    socket.sendMessage(this.socketuserID, message1);
                    peer.connect(socketUserName, LiveStreamManager.CAMERA.CUSTOM);
                    // utility.wait(2000).then(() => {
                    //   peer.streamAdd(socketUserName, LiveStreamManager.CAMERA.CUSTOM);
                    // });
                })
                    .catch((error) => {
                    ui.alertDialog(ui.translations.popup_text.additionalCameraDisconnect, ui.translations.popup_text.cameraDisconnected, ui.translations.popup_buttons.retry, (dialog) => {
                        ui.remove(dialog);
                        if (LiveStreamManager.PRIMARY_CAMERA_NAME !== 'P_CAM') {
                            const message = { mode: 'custom_camera_restart', text: 'custom camera restart' };
                            socket.sendMessage(this.socketuserID, message);
                        }
                    });
                });
            });
        }
    }
    showQrUIPage() {
        const button = ui.id('thinkX_CameraSetup_ProceedNow');
        let self = this;
        if (button) {
            ui.click(button, async () => {
                // After showing QR code - if URL opened then socket events will be recived from the Mobile.
                this.subscribe(SDK_EVENT.SECOND_STREAM, function (user_name, stream) {
                    self.setRoomStream(stream, 0); // If stream is comming from the mobile then stop AI in desktop and only show stream on Desktop UI.
                    liveStreamManager.updateCameraSetupStream(stream, self.camType);
                    cameraSetup.hideCameraSelectPage();
                    clearInterval(self.streamCustomInterval);
                });
                this.subscribe(SDK_EVENT.SECOND_STREAM_DISCONNET, function (user_name) {
                    utility.log('second stream disconnected', user_name);
                    LiveStreamManager.CAMERA.CUSTOM.stream = null;
                    if (self.cameraRevokePopup == null) {
                        if (LiveStreamManager.CAMERA.CUSTOM.external == true) {
                            self.cameraRevokePopup = ui.alertDialog(ui.translations.popup_text.additionalCameraDisconnect, ui.translations.popup_text.cameraDisconnected, ui.translations.popup_buttons.retry, function (dialog) {
                                ui.remove(dialog);
                                self.cameraRevokePopup = null;
                                cameraSetup.showQrPage(self.cameraAllowClick, self.envAlias, self.camType);
                            });
                        }
                    }
                });
                this.subscribe(SDK_EVENT.RECEIVE_MESSAGE, function (user_name, message) {
                    self.modeSelector(message.mode, message, user_name);
                });
                cameraSetup.showQrPage(this.cameraAllowClick, this.envAlias, this.camType);
            });
        }
    }
    async cameraAllowClick(select) {
        const selectedDeviceId = select.value;
        const selectCameraLabel = select?.selectedOptions[0]?.text || '';
        if (selectedDeviceId) {
            cameraSetup.hideCameraSelectPage();
            this.selectedCameraId = selectedDeviceId;
            this.selectCameraLabel = selectCameraLabel;
            await cameraSetup.cameraSetupStart(this.streamCallback, this.selectedCameraId, this.camType);
        }
        else {
            utility.log('Please select a camera first.');
        }
    }
    streamCallback(stream) {
        this.setRoomStream(stream);
    }
    async setRoomStream(stream, aiStart = 1) {
        cameraSetup.showLoaderwithText("thinkX_additional_camera_box");
        cameraSetup.setAttemptData(configrationManager.roomAttemptNo, 4);
        if (stream) {
            const video = cameraSetup.setStream(stream);
            video.onplaying = () => {
                cameraSetup.hideLoaderwithText();
            };
            video.play();
            if (aiStart == 1) {
                ui.show(ui.id('thinkX_cameraSetup_btn'));
                const button = ui.id('thinkX_additionalCamera_AllowBtn');
                if (button) {
                    ui.click(button, async () => {
                        this.completeCameraSetup();
                    });
                }
                const checkBox = ui.id('thinkX_additional_camera_checkbox');
                const button2 = ui.id('thinkX_additionalCamera_AllowBtn');
                if (checkBox && button2) {
                    ui.enableOnCheck(checkBox, button2);
                }
            }
            else {
                ui.hide(ui.id('thinkX_cameraSetup_btn'));
            }
        }
        else {
            cameraSetup.showQrPage(this.cameraAllowClick, this.envAlias, this.camType);
        }
    }
    //only for socket messages
    modeSelector(mode, message, user_name = '') {
        switch (mode) {
            case 'camera_setup_greenTick':
                this.completeCameraSetup(false);
                break;
            case 'camera_setup_close_browser':
                this.closeTrigger();
                break;
            case 'cam_setup_audioText':
                cameraSetup.showOverlayMessage(message.text || '');
                break;
            case 'sending_stream':
                this.streamCustomInterval = setInterval(() => {
                    let message1 = { mode: 'getting_stream', text: 'getting stream' };
                    socket.sendMessage(user_name, message1);
                }, 5000);
                break;
            case 'getting_stream':
                peer.close(user_name);
                peer.connect(user_name, LiveStreamManager.CAMERA.CUSTOM);
                break;
            default:
                utility.log('Unknown mode:', mode);
        }
    }
    completeCameraSetup(log = true) {
        ui.show(ui.id('thinkX_camera_setup_success'));
        ui.hide(ui.id('thinkX_videoOverlayMsg_cameraSetup'));
        stepUIManager.insertText('thinkX_cameraSetupFinish', ui.translations.status.additional_cameraSetupFinish);
        ui.textColor(ui.id('thinkX_cameraSetupFinish'), 'black');
        ui.hide(ui.id('thinkX_additional_cam_heading'));
        ui.hide(ui.id('thinkX_cameraSetup_proceeding'));
        ui.hide(ui.id('thinkX_additional_camera_box'));
        ui.hide(ui.id('thinkX_cameraSetup_btn'));
        utility.wait(4000).then(() => {
            ui.hide(ui.id('thinkX_camera_setup_success'));
            this.end(0, false, log);
            if (LiveStreamManager.PRIMARY_CAMERA_NAME != 'P_CAM') {
                let message = { mode: 'camera_setup_greenTick', text: 'complete' };
                socket.sendMessage(this.socketuserID, message);
            }
        });
    }
    closeBtn() {
        let closeBtn = ui.id('thinkX_CameraSetupCloseBtn');
        if (closeBtn) {
            ui.click(closeBtn, () => {
                this.closeTrigger();
                let message = { mode: 'room_close_browser', text: 'close' };
                socket.sendMessage(this.socketuserID, message);
            });
        }
    }
    closeTrigger() {
        ui.hide(ui.id('thinkX_CameraSetupRescanBtn'));
        ui.show(ui.id('thinkX_CameraSetupCloseBtn'));
        AddCamCustomView.stepManager.closeApplication();
        utility.log('close');
    }
    cameraRevoke() {
        let self = this;
        ai.stopSecondaryCameraPosition((msg) => { });
        ai.stopSecondaryCameraPositionValidate((msg) => { });
        utility.log('Custom camera revoke alert show');
        if (this.cameraRevokePopup == null) {
            if (LiveStreamManager.CAMERA.CUSTOM.external == false &&
                LiveStreamManager.CAMERA.CUSTOM.stream == null) {
                this.cameraRevokePopup = ui.alertDialog(ui.translations.popup_text.additionalCameraDisconnect, ui.translations.popup_text.cameraDisconnected, ui.translations.popup_buttons.retry, function (dialog) {
                    ui.remove(dialog);
                    self.cameraRevokePopup = null;
                    cameraSetup.showQrPage(self.cameraAllowClick, self.envAlias, self.camType);
                });
            }
        }
    }
    /**
     *
     */
    result() {
        return this.resultData;
    }
    /**
     *
     */
    cameraRevokeRetry() { }
    /**
     *
     */
    micRevokeRetry() { }
}
const addCamCustomView = new AddCamCustomView();

/**
 *
 */
class IdVerifyUI {
    /**
     *
     * @param id
     * @param text
     * @param matchType
     */
    setFailIcon(id, // register photo, register id and capture id image url2
    mainDiv, // register photo, register id and capture id  main div show
    addImgID, // register photo, register id and capture id candidate image show
    showErrorIcon, // register photo, register id and capture id candidate error icon show
    statusID, // register photo, register id and capture id candidate error status
    successID // register photo, register id and capture id candidate success icon show
    ) {
        ui.show(ui.id('thinkX_rescanBtn'));
        ui.show(ui.id(mainDiv));
        ui.addClass(ui.id(mainDiv), 'thinkx_error');
        ui.show(ui.id(showErrorIcon));
        ui.hide(ui.id(successID));
        stepUIManager.insertText(statusID, ui.translations.status.FM);
        if (id.url_2)
            stepUIManager.srcInsert(addImgID, id.url_2);
        // this.showFailIcon(id.url_2, mainDiv, addImgID, showErrorIcon, statusID, successID);
    }
    /**
     *
     * @param text
     * @param matchType
     */
    setSuccessIcon(id, showID = '', statusID = '', removeID) {
        ui.show(ui.id(id));
        ui.show(ui.id(showID));
        ui.hide(ui.id(removeID));
        stepUIManager.insertText(statusID, ui.translations.status.matched);
    }
    /**
     *
     */
    resetCompareView() {
        ui.show(ui.id('thinkX_imgContainer')); // register photo, register id and capture id image show
        ui.hide(ui.id('thinkX_verifyWrap')); // loader / icon div hide
        const id = ui.id('thinkproc_body_compare');
        ui.removeClass(id, 'h100');
        if (configrationManager.valueMap.candidate_authentication.data.ai_revoke_face_capture.value == 1) {
            ui.show(ui.id('thinkX_idVerifyWarning')); // attempt div show
        }
        ui.show(ui.id('thinkX_profileContainer')); // capture photo image show
        ui.show(ui.id('thinkX_rescan')); // rescan button show
    }
    /**
     *
     */
    addCompareView(attemptNo) {
        stepUIManager.srcInsert('thinkX_verify_registerPhoto_photo', 'https://lowcars.net/wp-content/uploads/2017/02/userpic.png');
        stepUIManager.srcInsert('thinkX_verify_registerPhoto_ID', 'https://i.pinimg.com/564x/d6/13/26/d61326de60f9a03c8e5a6fd12ff006d0.jpg');
        stepUIManager.srcInsert('thinkX_verify_captureID_id', 'https://i.pinimg.com/564x/d6/13/26/d61326de60f9a03c8e5a6fd12ff006d0.jpg');
        if (configrationManager.valueMap.candidate_authentication.data.ai_revoke_face_capture.value == 1) {
            const phtoAttemptCount = configrationManager.valueMap.candidate_authentication.data.ai_revoke_face_capture_attempt
                .value;
            let remainingAttempt = phtoAttemptCount - attemptNo;
            const messageTemplate = ui.translations.status.idNotVerify;
            const attemptNumber = `${remainingAttempt.toString()}`;
            const message = utility.replacePlaceholders(messageTemplate, { number: attemptNumber });
            stepUIManager.insertText('thinkX_attemptVerify', message);
        }
    }
    /**
     *
     * @param url1
     * @param url2
     */
    // showFailIcon(
    //   url_2 = '',
    //   id: string,
    //   addImgID: string,
    //   showErrorIcon: string,
    //   statusID: string,
    //   successID: string
    // ) {
    //   ui.show(ui.id(id));
    //   ui.addClass(ui.id(id), 'error');
    //   ui.show(ui.id(showErrorIcon));
    //   ui.hide(ui.id(successID));
    //   stepUIManager.insertText(statusID, ui.translations.status.FM);
    //   if (url_2) stepUIManager.srcInsert(addImgID, url_2);
    // }
    /**
     *
     * @param url1
     * @param url2
     */
    showSuccessIcon(id, url2 = '', addImgID) {
        ui.addClass(ui.id(id), 'thinkx_success');
        if (url2)
            stepUIManager.srcInsert(addImgID, url2);
    }
    setCapturePhoto(url) {
        if (url)
            stepUIManager.srcInsert('thinkX_candidateImgContainer', url);
    }
    registerPhotoError(response) {
        const { register_photo } = response.data;
        this.setFailIcon(register_photo, 'thinkX_verify_registerPhoto', 'thinkX_verify_registerPhoto_photo', 'thinkX_verify_registerPhoto_error', 'thinkX_verify_registerPhoto_status', 'thinkX_verify_registerPhoto_success');
        this.setCapturePhoto(register_photo.url_1);
    }
    registerPhotoSuccess(response) {
        const { register_photo } = response.data;
        this.setSuccessIcon('thinkX_verify_registerPhoto_success', 'thinkX_verify_registerPhoto', 'thinkX_verify_registerPhoto_status', 'thinkX_verify_registerPhoto_error');
        this.showSuccessIcon('thinkX_verify_registerPhoto', register_photo.url_2, 'thinkX_verify_registerPhoto_photo');
        this.setCapturePhoto(register_photo.url_1);
    }
    registerIdError(response) {
        const { register_id } = response.data;
        this.setFailIcon(register_id, 'thinkX_verify_registerID', 'thinkX_verify_registerPhoto_ID', 'thinkX_verify_registerID_error', 'thinkX_verify_registerID_status', 'thinkX_verify_registerID_success');
        this.setCapturePhoto(register_id.url_1);
    }
    registerIdSuccess(response) {
        const { register_id } = response.data;
        this.setSuccessIcon('thinkX_verify_registerID_success', 'thinkX_verify_registerID', 'thinkX_verify_registerID_status', 'thinkX_verify_registerID_error');
        this.showSuccessIcon('thinkX_verify_registerID', register_id.url_2, 'thinkX_verify_registerPhoto_ID');
        this.setCapturePhoto(register_id.url_1);
    }
    registerIdCaptureError(response) {
        const { capture_id } = response.data;
        this.setFailIcon(capture_id, 'thinkX_verify_captureID', 'thinkX_verify_captureID_id', 'thinkX_verify_captureID_error', 'thinkX_verify_captureID_status', 'thinkX_verify_captureID_success');
        this.setCapturePhoto(capture_id.url_1);
    }
    registerIdCaptureSuccess(response) {
        const { capture_id } = response.data;
        this.setSuccessIcon('thinkX_verify_captureID_success', 'thinkX_verify_captureID', 'thinkX_verify_captureID_status', 'thinkX_verify_captureID_error');
        this.showSuccessIcon('thinkX_verify_captureID', capture_id.url_2, 'thinkX_verify_captureID_id');
        this.setCapturePhoto(capture_id.url_1);
    }
    waitingForCompare() {
        ui.show(ui.id('thinkproc_body_compare'));
        ui.hide(ui.id('thinkX_candidateImgContainer'));
        ui.hide(ui.id('thinkX_rescan'));
        ui.show(ui.id('thinkX_verifyWrap'));
        ui.show(ui.id('thinkX_loaderWrap'));
        ui.show(ui.id('thinkX_loaderCompare'));
        ui.hide(ui.id('thinkX_failCompare'));
        ui.hide(ui.id('thinkX_successCompare'));
        const id = ui.id('thinkproc_body_compare');
        ui.addClass(id, 'h100');
        const registerPhoto = ui.id('thinkX_verify_registerPhoto');
        ui.removeClass(registerPhoto, 'thinkx_success');
        ui.removeClass(registerPhoto, 'thinkx_error');
        const registerId = ui.id('thinkX_verify_registerID');
        ui.removeClass(registerId, 'thinkx_success');
        ui.removeClass(registerId, 'thinkx_error');
        const captureId = ui.id('thinkX_verify_captureID');
        ui.removeClass(captureId, 'thinkx_success');
        ui.removeClass(captureId, 'thinkx_error');
        ui.hide(ui.id('thinkX_profileContainer'));
        ui.hide(ui.id('thinkX_idVerifyWarning'));
        ui.hide(ui.id('thinkX_imgContainer'));
        stepUIManager.srcBlank('thinkX_verify_registerPhoto_photo');
        stepUIManager.srcBlank('thinkX_verify_registerPhoto_ID');
        stepUIManager.srcBlank('thinkX_verify_captureID_id');
    }
    revokeView() {
        ui.show(ui.id('thinkX_imgContainer'));
        ui.show(ui.id('thinkX_verifyWrap'));
        ui.show(ui.id('thinkX_failCompare'));
        ui.hide(ui.id('thinkX_rescanBtn'));
        ui.show(ui.id('thinkX_loaderWrap'));
        ui.hide(ui.id('thinkX_profileContainer'));
        ui.hide(ui.id('thinkX_loaderCompare'));
        const id = ui.id('thinkproc_body_compare');
        ui.removeClass(id, 'h100');
        ui.hide(ui.id('thinkX_idVerifyWarning'));
        ui.show(ui.id('thinkX_closeBtn'));
        stepUIManager.insertText('thinkX_loaderWrapText', ui.translations.status.allAttemptUsed);
    }
    fullMatchView() {
        ui.show(ui.id('thinkX_imgContainer'));
        ui.show(ui.id('thinkX_verifyWrap'));
        ui.show(ui.id('thinkX_loaderWrap'));
        ui.hide(ui.id('thinkX_loaderCompare'));
        const id = ui.id('thinkproc_body_compare');
        ui.removeClass(id, 'h100');
        ui.show(ui.id('thinkX_successCompare'));
        ui.hide(ui.id('thinkX_rescan'));
        ui.hide(ui.id('thinkX_profileContainer'));
        ui.hide(ui.id('thinkX_idVerifyWarning'));
        ui.hide(ui.id('thinkX_verify_registerPhoto_error'));
        ui.hide(ui.id('thinkX_verify_registerID_error'));
        ui.hide(ui.id('thinkX_verify_captureID_error'));
        stepUIManager.insertText('thinkX_loaderWrapText', ui.translations.status.verifySuccess);
    }
    completeView() {
        const { auth_reg_id: { value: auth_reg_id }, auth_reg_photo: { value: auth_reg_photo }, auth_capture_id: { value: auth_capture_id }, } = configrationManager.valueMap.candidate_authentication.data;
        this.fullMatchView();
        ui.addClass(ui.id('thinkX_verify_registerPhoto'), 'thinkx_success');
        ui.removeClass(ui.id('thinkX_verify_registerPhoto'), 'thinkx_error');
        ui.show(ui.id('thinkX_verify_registerPhoto_success'));
        ui.show(ui.id('thinkX_verify_registerPhoto'));
        stepUIManager.insertText('thinkX_verify_registerPhoto_status', ui.translations.status.matched);
        ui.addClass(ui.id('thinkX_verify_registerID'), 'thinkx_success');
        ui.removeClass(ui.id('thinkX_verify_registerID'), 'thinkx_error');
        ui.show(ui.id('thinkX_verify_registerID_success'));
        stepUIManager.insertText('thinkX_verify_registerID_status', ui.translations.status.matched);
        ui.addClass(ui.id('thinkX_verify_captureID'), 'thinkx_success');
        ui.removeClass(ui.id('thinkX_verify_captureID'), 'thinkx_error');
        ui.show(ui.id('thinkX_verify_captureID_success'));
        // ui.hide(ui.id('thinkX_verify_registerID_error'));
        stepUIManager.insertText('thinkX_verify_captureID_status', ui.translations.status.matched);
        if (auth_reg_id == 0) {
            ui.hide(ui.id('thinkX_verify_registerID'));
        }
        if (auth_reg_photo == 0) {
            ui.hide(ui.id('thinkX_verify_registerPhoto'));
        }
        if (auth_capture_id == 0) {
            ui.hide(ui.id('thinkX_verify_captureID'));
        }
    }
    rejectView(message) {
        this.fullMatchView();
        ui.hide(ui.id('thinkX_successCompare'));
        ui.show(ui.id('thinkX_failCompare'));
        ui.show(ui.id('thinkX_verify_captureID_error'));
        ui.show(ui.id('thinkX_rejectReason'));
        ui.hide(ui.id('thinkX_verify_captureID_success'));
        ui.removeClass(ui.id('thinkX_verify_captureID'), 'thinkx_success');
        ui.addClass(ui.id('thinkX_verify_captureID'), 'thinkx_error');
        // ui.show(ui.id('thinkX_verify_registerID_error'));
        const registerPhotoEl = ui.id('thinkX_verify_registerPhoto');
        if (registerPhotoEl && registerPhotoEl.classList.contains('thinkx_error')) {
            ui.show(ui.id('thinkX_verify_registerPhoto_error'));
        }
        const registerIDEl = ui.id('thinkX_verify_registerID');
        if (registerIDEl && registerIDEl.classList.contains('thinkx_error')) {
            ui.show(ui.id('thinkX_verify_registerID_error'));
        }
        stepUIManager.insertText('thinkX_loaderWrapText', ui.translations.status.rejectText);
        stepUIManager.insertText('thinkX_verify_captureID_status', ui.translations.status.FM);
        stepUIManager.insertText('thinkX_rejectReason', message);
        ui.show(ui.id('thinkX_closeBtn'));
    }
    capturePhotoCaptureSuccess(image) {
        this.setSuccessIcon('thinkX_verify_capturePhoto_success', 'thinkX_verify_capturePhoto', 'thinkX_verify_capturePhoto_status', 'thinkX_verify_capturePhoto_error');
        this.showSuccessIcon('thinkX_verify_capturePhoto', image, 'thinkX_verify_capturePhoto_id');
        this.setCapturePhoto(image);
        ui.removeClass(ui.id('thinkX_verify_capturePhoto'), 'thinkx_success');
    }
}
const idVerifyUI = new IdVerifyUI();

/**
 *
 */
class IdVerify extends StepInterface {
    envAlias = 'Identity_Verification';
    proctorAssignTimeout;
    proctorTimeList = [];
    timezoneTimer = null;
    noRequestSend = false;
    timezoneFinalized = false;
    selectedInterviwerSocketID = null;
    /**
     *
     */
    constructor() {
        super();
        this.proctorAssignTimeout = null;
    }
    /**
     *
     */
    async start() {
        this.compareIdAndPhoto();
        this.reScan();
    }
    /**
     *
     */
    async compareIdAndPhoto() {
        const { auth_reg_id: { value: auth_reg_id }, auth_reg_photo: { value: auth_reg_photo }, auth_capture_id: { value: auth_capture_id }, } = configrationManager.valueMap.candidate_authentication.data;
        //Reset UI
        idVerifyUI.waitingForCompare();
        // set default images and remaining attempt in UI
        idVerifyUI.addCompareView(configrationManager.photoAttemptNo);
        this.recieveMessage();
        this.proctorLeft();
        if (auth_reg_photo == 1 || auth_reg_id == 1 || auth_capture_id == 1) {
            // if any photo compare in enabled
            request
                .compareIdAndPhoto({
                attempt_no: configrationManager.photoAttemptNo,
            })
                .then((response) => {
                if (response.status === true && (response.code === 2306 || response.code === 2305)) {
                    this.resultData.info = response;
                    if (response.code === 2306) {
                        idVerifyUI.resetCompareView();
                    }
                    else if (response.code === 2305) {
                        idVerifyUI.revokeView();
                        idVerifyUI.capturePhotoCaptureSuccess(configrationManager.base64Snapshot);
                    }
                    if (auth_reg_photo == 1) {
                        const { register_photo } = response.data;
                        if (register_photo.status !== 200 || register_photo.data.result != 'success') {
                            idVerifyUI.registerPhotoError(response);
                            this.resultData.status = false;
                            this.resultData.error.push('Register ID Verification Failed');
                        }
                        else {
                            idVerifyUI.registerPhotoSuccess(response);
                        }
                    }
                    if (auth_reg_id == 1) {
                        const { register_id } = response.data;
                        if (register_id.status !== 200 || register_id.data.result != 'success') {
                            idVerifyUI.registerIdError(response);
                            this.resultData.status = false;
                            this.resultData.error.push('Register ID Verification Failed');
                        }
                        else {
                            idVerifyUI.registerIdSuccess(response);
                        }
                    }
                    if (auth_capture_id == 1) {
                        const { capture_id } = response.data;
                        if (capture_id.status !== 200 || capture_id.data.result != 'success') {
                            idVerifyUI.registerIdCaptureError(response);
                            this.resultData.status = false;
                            this.resultData.error.push('Capture ID Verification Failed');
                        }
                        else {
                            idVerifyUI.registerIdCaptureSuccess(response);
                        }
                    }
                    if (configrationManager.valueMap.candidate_authentication.data.ai_revoke_face_capture
                        .value == 0) {
                        ui.show(ui.id('thinkX_rescanBtn'));
                        ui.show(ui.id('thinkX_rescan'));
                        ui.hide(ui.id('thinkX_closeBtn'));
                        // this.resultData.status = false;
                        // this.end(3000, true);
                    }
                    else {
                        this.nextBtnView(response);
                        return;
                    }
                }
                else if (response.status === true && response.code === 2801) {
                    idVerifyUI.waitingForCompare();
                    if (auth_reg_photo == 1) {
                        const { register_photo } = response.data;
                        if (register_photo.status !== 200 || register_photo.data.result != 'success') {
                            idVerifyUI.registerPhotoError(response);
                            this.resultData.status = false;
                            this.resultData.error.push('Register ID Verification Failed');
                        }
                        else {
                            idVerifyUI.registerPhotoSuccess(response);
                        }
                    }
                    if (auth_reg_id == 1) {
                        const { register_id } = response.data;
                        if (register_id.status !== 200 || register_id.data.result != 'success') {
                            idVerifyUI.registerIdError(response);
                            this.resultData.status = false;
                            this.resultData.error.push('Register ID Verification Failed');
                        }
                        else {
                            idVerifyUI.registerIdSuccess(response);
                        }
                    }
                    if (auth_capture_id == 1) {
                        const { capture_id } = response.data;
                        if (capture_id.status !== 200 || capture_id.data.result != 'success') {
                            idVerifyUI.registerIdCaptureError(response);
                            this.resultData.status = false;
                            this.resultData.error.push('Capture ID Verification Failed');
                        }
                        else {
                            idVerifyUI.registerIdCaptureSuccess(response);
                        }
                    }
                    idVerifyUI.capturePhotoCaptureSuccess(configrationManager.base64Snapshot);
                    this.escalatedProctor();
                }
                else {
                    idVerifyUI.fullMatchView();
                    if (auth_reg_photo == 1) {
                        response.data;
                        idVerifyUI.registerPhotoSuccess(response);
                    }
                    if (auth_reg_id == 1) {
                        response.data;
                        idVerifyUI.registerIdSuccess(response);
                    }
                    if (auth_capture_id == 1) {
                        response.data;
                        idVerifyUI.registerIdCaptureSuccess(response);
                    }
                    idVerifyUI.capturePhotoCaptureSuccess(configrationManager.base64Snapshot);
                    this.nextBtnView(response);
                    // this.end(4000);
                }
            })
                .catch((error) => {
                utility.error('API call failed', error);
            });
        }
        else {
            this.nextBtnView({});
        }
    }
    escalatedProctor() {
        // this.checkSessionStatus()
        //   .then((response) => {
        //     if (response.code == 2313) {
        //       if (this.proctorAssignTimeout !== null) {
        //         clearTimeout(this.proctorAssignTimeout);
        //       }
        //       if (response.data.proctor_found == true) {
        //         socket.setProctor(response.data.proctor_user_name);
        //       }
        //     }
        //     if (response.code == 2901) {
        //       this.proctorAssignTimeout = setTimeout(() => {
        //         this.escalatedProctor();
        //       }, 10000);
        //     }
        //     utility.log('✅ Session status checked successfully', response);
        //   })
        //   .catch((error) => {
        //     utility.log('❌ Failed to check session status', error);
        //   });
        // ufmM.checkSessionStatus();
        this.requestInterviwerJoiningTime();
    }
    // async checkSessionStatus() {
    //   return await request.checkSessionStatus();
    // }
    /**
     *
     */
    reScan() {
        const button = ui.id('thinkX_rescan');
        if (button) {
            ui.click(button, async () => {
                configrationManager.photoAttemptNo++;
                this.resultData.status = true;
                this.resultData.error = [];
                this.manager().jumpToStep('photoCheck');
            });
        }
    }
    nextBtnView(response) {
        ui.show(ui.id('thinkX_nextBtn'));
        const nextButton = ui.id('thinkX_next');
        if (nextButton) {
            ui.click(nextButton, async () => {
                this.resultData.status = true;
                this.resultData.info = response;
                this.end();
            });
        }
    }
    verifyByProctor() {
        idVerifyUI.completeView();
        this.resultData.info = 'Register ID Verification Approved by Proctor';
        configrationManager.currentProctor = "";
        this.nextBtnView(this.resultData.info);
    }
    rejectByProctor(message) {
        idVerifyUI.rejectView(message);
        ufmM.stopStatusCheck();
    }
    recieveMessage() {
        let self = this;
        this.subscribe(SDK_EVENT.CHAT_MESSAGE, function (user_name, message) {
            self.candiateSocketmode(message.mode, message.text, message, user_name);
        });
    }
    candiateSocketmode(mode, text, message, user_name) {
        switch (mode) {
            case 'photo_verify_done':
                this.verifyByProctor();
                break;
            case 'photo_reject':
                this.rejectByProctor(text);
                break;
            case 'send_candidate_proctor_timeZone':
                this.interviwerJoiningTimeResponse(message.data, user_name);
                break;
            case 'attendance':
                if (this.noRequestSend && configrationManager.userType == '2') {
                    this.requestInterviwerJoiningTime();
                }
                break;
            default:
                utility.log('Unknown mode:', mode);
        }
    }
    proctorLeft() {
        let self = this;
        this.subscribe(SDK_EVENT.USER_LEFT, function (user_name) {
            if (user_name == configrationManager.currentProctor) {
                self.escalatedProctor();
            }
            if (user_name == self.selectedInterviwerSocketID) {
                self.selectedInterviwerSocketID = null;
                self.requestInterviwerJoiningTime();
            }
        });
    }
    interviwerJoiningTimeResponse(time, interviwerSocketID) {
        if (typeof time !== 'number' || this.timezoneFinalized)
            return;
        // Stop timeout once first response arrives
        if (this.timezoneTimer) {
            clearTimeout(this.timezoneTimer);
            this.timezoneTimer = null;
        }
        // Avoid duplicates
        if (!this.proctorTimeList.some(p => p.interviwerSocketID === interviwerSocketID)) {
            this.proctorTimeList.push({ interviwerSocketID, time });
        }
        // Decide only once
        const leastTimeProctor = this.proctorTimeList.reduce((min, curr) => curr.time < min.time ? curr : min);
        this.selectedInterviwerSocketID = leastTimeProctor.interviwerSocketID;
        this.timezoneFinalized = true;
        this.noRequestSend = false;
        const msg = {
            mode: 'request_verify_photo_verification',
            text: 'send proctor request for photo verification',
            data: leastTimeProctor.interviwerSocketID
        };
        socket.sendRoomMessage(msg);
        utility.log('Timezone request sent to:', leastTimeProctor.interviwerSocketID);
    }
    requestInterviwerJoiningTime() {
        this.proctorTimeList = [];
        this.noRequestSend = false;
        this.timezoneFinalized = false;
        const msg = {
            mode: 'request_proctor_timeZone',
            text: 'request proctor timeZone'
        };
        socket.sendRoomMessage(msg);
        this.timezoneTimer = setTimeout(() => {
            if (this.proctorTimeList.length === 0) {
                this.noRequestSend = true;
                utility.log('No proctor timezone response in 2 seconds');
            }
        }, 2000);
    }
    /**
     *
     */
    result() {
        return this.resultData;
    }
    /**
     *
     */
    cameraRevokeRetry() { }
    /**
     *
     */
    micRevokeRetry() { }
}
const idVerify = new IdVerify();

/**
 *
 */
class Lobby extends StepInterface {
    envAlias = 'Lobby';
    recordingStarted = false;
    recordingCamStarted = false;
    cameraType = 'P_CAM';
    cameraRevokePopup = null;
    camType = '';
    isJoined = false;
    /**
     *
     */
    constructor() {
        super();
    }
    async getCameraStream() {
        let currentStream = null;
        if (LiveStreamManager.PRIMARY_CAMERA_NAME == 'P_CAM') {
            currentStream = await liveStreamManager.requestVideo(LiveStreamManager.CAMERA.PRIMARY);
        }
        else if (LiveStreamManager.PRIMARY_CAMERA_NAME == 'S_CAM') {
            currentStream = await liveStreamManager.requestVideo(LiveStreamManager.CAMERA.SIDE);
        }
        else if (LiveStreamManager.PRIMARY_CAMERA_NAME == 'B_CAM') {
            currentStream = await liveStreamManager.requestVideo(LiveStreamManager.CAMERA.BACK);
        }
        else if (LiveStreamManager.PRIMARY_CAMERA_NAME == 'F_CAM') {
            currentStream = await liveStreamManager.requestVideo(LiveStreamManager.CAMERA.FRONT);
        }
        else if (LiveStreamManager.PRIMARY_CAMERA_NAME == 'C_CAM') {
            currentStream = await liveStreamManager.requestVideo(LiveStreamManager.CAMERA.CUSTOM);
        }
        return currentStream?.stream || null;
    }
    /**
     *
     */
    start() {
        let self = this;
        if (LiveStreamManager.PRIMARY_CAMERA_NAME == 'P_CAM') {
            configrationManager.compatibilityCompleteCallback();
        }
        else if (LiveStreamManager.PRIMARY_CAMERA_NAME == 'S_CAM') {
            this.subscribe(SDK_EVENT.RECEIVE_MESSAGE, function (user_name, message) {
                self.modeSelector(message.mode, LiveStreamManager.PRIMARY_CAMERA_NAME);
            });
            if (configrationManager.image_recording == 1) {
                regularSnap.takeSnapImage(LiveStreamManager.CAMERA.SIDE);
            }
            if (configrationManager.video_recording == 1 && this.recordingCamStarted == false) {
                liveStreamManager.record(LiveStreamManager.CAMERA.SIDE);
                this.recordingCamStarted = true;
            }
        }
        else if (LiveStreamManager.PRIMARY_CAMERA_NAME == 'B_CAM') {
            this.subscribe(SDK_EVENT.RECEIVE_MESSAGE, function (user_name, message) {
                self.modeSelector(message.mode, LiveStreamManager.PRIMARY_CAMERA_NAME);
            });
            if (configrationManager.image_recording == 1) {
                regularSnap.takeSnapImage(LiveStreamManager.CAMERA.BACK);
            }
            if (configrationManager.video_recording == 1 && this.recordingCamStarted == false) {
                liveStreamManager.record(LiveStreamManager.CAMERA.BACK);
                this.recordingCamStarted = true;
            }
        }
        else if (LiveStreamManager.PRIMARY_CAMERA_NAME == 'F_CAM') {
            this.subscribe(SDK_EVENT.RECEIVE_MESSAGE, function (user_name, message) {
                self.modeSelector(message.mode, LiveStreamManager.PRIMARY_CAMERA_NAME);
            });
            if (configrationManager.image_recording == 1) {
                regularSnap.takeSnapImage(LiveStreamManager.CAMERA.FRONT);
            }
            if (configrationManager.video_recording == 1 && this.recordingCamStarted == false) {
                liveStreamManager.record(LiveStreamManager.CAMERA.FRONT);
                this.recordingCamStarted = true;
            }
        }
        else if (LiveStreamManager.PRIMARY_CAMERA_NAME == 'C_CAM') {
            this.subscribe(SDK_EVENT.RECEIVE_MESSAGE, function (user_name, message) {
                self.modeSelector(message.mode, LiveStreamManager.PRIMARY_CAMERA_NAME);
            });
        }
        this.subscribe(SDK_EVENT.CHAT_MESSAGE, function (user_name, message) {
            const cameraName = utility.getCameraNameInUserSocket(user_name);
            self.roomSocketmode(message.mode, message.text, message, user_name, cameraName);
        });
        configrationManager.compatibilityComplete = 1;
        this.lobbyStart();
    }
    async lobbyStart() {
        ui.show(ui.id('think_interview_lobby'));
        ui.hide(ui.id('thinkX_compatibility_wrapper'));
        ui.hide(ui.id('thinkproc_chat'));
        ui.hide(ui.id('thinkX_chatIcon'));
        const termsLink = ui.id('think_interview_termsLink');
        if (termsLink)
            termsLink.href = configrationManager.termsAndConditionsLink;
        const privacyLink = ui.id('think_interview_privacyLink');
        if (privacyLink)
            privacyLink.href = configrationManager.privacyStatementLink;
        if (LiveStreamManager.PRIMARY_CAMERA_NAME == 'P_CAM') {
            // ui.show(ui.id('thinkpro_draggableBox'));
            stepUIManager.insertText('thinkInterview_candidateName', configrationManager.currentCandidateName);
            this.suscribeSocketEvent();
            if (configrationManager.userType == '2') {
                const camName = examCameraUi.getRevokeCameraName();
                if (camName != '' && configrationManager.currentStepObject) {
                    this.cameraRevoke();
                }
            }
            else {
                ui.show(ui.id('thinkinterview_camera'));
                ui.show(ui.id('thinkinterview_microphone'));
                this.bindInterviewerUiEvents();
            }
        }
        else if (LiveStreamManager.PRIMARY_CAMERA_NAME == 'S_CAM' ||
            LiveStreamManager.PRIMARY_CAMERA_NAME == 'B_CAM' ||
            LiveStreamManager.PRIMARY_CAMERA_NAME == 'F_CAM' ||
            LiveStreamManager.PRIMARY_CAMERA_NAME == 'C_CAM') {
            ui.show(ui.id('thinkpro_MobileViewBox'));
        }
        await this.startCamera();
        if (configrationManager.userType === '3') {
            this.joinLobby();
        }
        else {
            this.showJoinBtn();
        }
    }
    bindInterviewerUiEvents() {
        const videoImgBtn = ui.id('thinkinterview_camera')?.querySelector('img');
        if (videoImgBtn) {
            const imgElement = videoImgBtn;
            ui.click(imgElement, () => {
                if (imgElement) {
                    const containClass = imgElement?.classList.contains('mute') ?? false;
                    if (!containClass) {
                        imgElement.classList.add('mute');
                        imgElement.style.backgroundColor = '#2F4DDB';
                        imgElement.style.borderRadius = '50px';
                        configrationManager.video_mute = true;
                        //imgElement.src = environment.UI_BASE_URL + 'images/white_video_call.svg';
                        liveStreamManager.disableStreamTracks(LiveStreamManager.CAMERA.PRIMARY);
                        this.muteInterviewerVideoStreamLobby();
                    }
                    else {
                        imgElement.classList.remove('mute');
                        imgElement.style.backgroundColor = '';
                        imgElement.style.borderRadius = '';
                        //imgElement.src = environment.UI_BASE_URL + 'images/video_call.svg';
                        configrationManager.video_mute = false;
                        liveStreamManager.enableStreamTracks(LiveStreamManager.CAMERA.PRIMARY);
                        this.unMuteInterviewerVideoStreamLobby();
                    }
                }
            });
        }
        const audioImgBtn = ui.id('thinkinterview_microphone')?.querySelector('img');
        if (audioImgBtn) {
            const imgElement = audioImgBtn;
            ui.click(imgElement, () => {
                if (imgElement) {
                    const containClass = imgElement?.classList.contains('mute') ?? false;
                    if (!containClass) {
                        imgElement.classList.add('mute');
                        imgElement.style.backgroundColor = '#2F4DDB';
                        imgElement.style.borderRadius = '50px';
                        configrationManager.audio_mute = true;
                        //imgElement.src = environment.UI_BASE_URL + 'images/white_video_call.svg';
                        liveStreamManager.disableAudioTracks(LiveStreamManager.AUDIO.PRIMARY);
                    }
                    else {
                        imgElement.classList.remove('mute');
                        imgElement.style.backgroundColor = '';
                        imgElement.style.borderRadius = '';
                        //imgElement.src = environment.UI_BASE_URL + 'images/video_call.svg';
                        configrationManager.audio_mute = false;
                        liveStreamManager.enableStreamTracks(LiveStreamManager.AUDIO.PRIMARY);
                    }
                }
            });
        }
    }
    async startCamera() {
        const stream = await this.getCameraStream();
        if (stream) {
            const video = this.setStream(stream);
            video.play();
            this.cameraDisable(video, stream);
        }
    }
    setStream(stream) {
        let video = null;
        if (LiveStreamManager.PRIMARY_CAMERA_NAME == 'P_CAM') {
            video = ui.id('thinkInterview_candidateVideo');
        }
        else if (LiveStreamManager.PRIMARY_CAMERA_NAME == 'S_CAM' ||
            LiveStreamManager.PRIMARY_CAMERA_NAME == 'B_CAM' ||
            LiveStreamManager.PRIMARY_CAMERA_NAME == 'F_CAM' ||
            LiveStreamManager.PRIMARY_CAMERA_NAME == 'C_CAM') {
            video = ui.id('thinkX_mobileCameraVideo');
        }
        if (!video) {
            throw new Error('No valid video element found for the selected camera.');
        }
        video.srcObject = stream;
        return video;
    }
    cameraDisable(video, stream) {
        // ui.show(ui.id('thinkinterview_camera'));
        ui.click(ui.id('thinkinterview_camera'), async () => {
            // stream.getTracks().forEach(track => track.stop());
            video.pause();
            video.srcObject = null;
            this.cameraEnable(video);
        });
    }
    cameraEnable(video) {
        ui.click(ui.id('thinkinterview_camera'), async () => {
            const stream = await this.getCameraStream();
            if (stream) {
                video.srcObject = stream;
                video.play();
                this.cameraDisable(video, stream);
            }
        });
    }
    joinLobby = () => {
        const joinBtn = ui.id('thinkInterview_join');
        ui.click(ui.id('thinkInterview_join'), async () => {
            if (configrationManager.userType == '3') {
                if (joinBtn) {
                    joinBtn.disabled = true;
                }
                ui.show(ui.id('think_interview_criteria_popup'));
                this.populateCandidateCriteria(configrationManager.skillsData);
                this.proceedInterviewLobby();
            }
            else {
                this.isJoined = true;
                ui.show(ui.id('thinkInterview_Proceed'));
                this.hideLoaderwithText();
                this.proceedLobby();
            }
        });
    };
    showJoinBtn() {
        ui.show(ui.id('thinkInterview_waiting'));
        ui.hide(ui.id('thinkInterview_join'));
        this.showLoaderwithText('thinkInterview_waiting');
        let msg = { mode: 'send_interview_allow', text: "send_interview_allow" };
        socket.sendRoomMessage(msg);
    }
    showLoaderwithText(id) {
        const loaderHTML = UiComponents.loadingwithtext('');
        stepUIManager.setLoader(loaderHTML, id);
    }
    hideLoaderwithText() {
        const existingLoader = ui.id('thinkX_loadingwithText');
        if (existingLoader && existingLoader.parentNode) {
            existingLoader.parentNode.removeChild(existingLoader);
        }
    }
    allowCandiateSession() {
        ui.show(ui.id('thinkInterview_join'));
        ui.hide(ui.id('thinkInterview_waiting'));
        this.joinLobby();
    }
    roomSocketmode(mode, text, message, from, cameraName) {
        switch (mode) {
            case 'approve_candidate':
                // pass cameraDetails objects (or enum values) as separate arguments instead of a string array
                this.allowCandiateSession();
                break;
            case 'interviewer_leave':
                if (configrationManager.userType == '2') {
                    ui.hide(ui.id('thinkInterview_join'));
                    ui.show(ui.id('thinkInterview_waiting'));
                }
                else {
                    ui.show(ui.id('thinkInterview_join'));
                }
                break;
            default:
                utility.warn(`Unknown room socket mode: ${mode}`);
                break;
        }
    }
    proceedLobby = () => {
        ui.click(ui.id('thinkInterviewFinalProceed'), async () => {
            ui.hide(ui.id('thinkInterview_Proceed'));
            this.resultData.status = true;
            this.resultData.info = {};
            if (configrationManager.userType == "2" && LiveStreamManager.CAMERA.CUSTOM.external) {
                let socketUserName = utility.addPrefix(configrationManager.socketUserName, 'C_CAM');
                let message = { mode: 'end_lobby', text: 'lobby end' };
                socket.sendMessage(socketUserName, message);
            }
            this.end(0);
        });
    };
    proceedInterviewLobby = () => {
        const proceedBtn = ui.id('think_interview_proceed');
        ui.click(ui.id('think_interview_proceed'), async () => {
            if (proceedBtn) {
                proceedBtn.disabled = true;
            }
            ui.hide(ui.id('think_interview_criteria_popup'));
            this.resultData.status = true;
            this.resultData.info = {};
            this.end(0);
        });
    };
    /**
     *
     */
    result() {
        return this.resultData;
    }
    cameraRevoke() {
        this.stopRecording();
        regularSnap.stopRegularSnapForCamera(LiveStreamManager.CAMERA.PRIMARY.name);
        if (LiveStreamManager.CAMERA.PRIMARY.stream == null) {
            // ✅ Added section — show fallback image under video
            const videoEl = ui.id('thinkX_cameraVideo');
            if (videoEl) {
                ui.show(ui.id('thinkX_cameraDisconnect'));
                videoEl.classList.add('d-none');
            }
        }
        let self = this;
        let cameraName = '';
        if (configrationManager.userType == '2') {
            cameraName = examCameraUi.getRevokeCameraName();
        }
        utility.log(cameraName, 'camera revoke alert show');
        if (this.cameraRevokePopup == null && cameraName != '') {
            if (LiveStreamManager.CAMERA[cameraName].external == false &&
                LiveStreamManager.CAMERA[cameraName].stream == null) {
                this.camType = LiveStreamManager.CAMERA[cameraName].name;
                examCameraUi.camType = this.camType;
                examCameraUi.stopSnap(this.camType);
                examCameraUi.stopRecording(this.camType);
                const envAlias = examCameraUi.getQrStepName();
                const headingKey = examCameraUi.retryHeadingName();
                this.cameraRevokePopup = ui.alertDialog(ui.translations.popup_text[headingKey], ui.translations.popup_text.cameraDisconnected, ui.translations.popup_buttons.retry, function (dialog) {
                    ui.remove(dialog);
                    self.cameraRevokePopup = null;
                    examCameraUi.showQrPage(examCameraUi.cameraAllowClick, envAlias, self.camType);
                });
            }
        }
    }
    suscribeSocketEvent() {
        let self = this;
        this.subscribe(SDK_EVENT.SECOND_STREAM, function (user_name, stream) {
            const cameraName = utility.getCameraNameInUserSocket(user_name);
            examCameraUi.camType = cameraName;
            examCameraUi.setRoomStream(stream, 0); // If stream is comming from the mobile then stop AI in desktop and only show stream on Desktop UI.
            liveStreamManager.updateCameraSetupStream(stream, examCameraUi.camType);
            examCameraUi.hideCameraSelectPage(examCameraUi.camType);
        });
        this.subscribe(SDK_EVENT.SECOND_STREAM_DISCONNET, function (user_name) {
            utility.log('second stream disconnected', user_name);
            const cameraName = utility.getCameraNameInUserSocket(user_name);
            examCameraUi.camType = cameraName;
            const headingKey = examCameraUi.retryHeadingName();
            const keyName = examCameraUi.checkExternalCamStream();
            if (!keyName || !LiveStreamManager.CAMERA[keyName]) {
                console.warn('Invalid camera key:', keyName, examCameraUi.camType);
                return;
            }
            LiveStreamManager.CAMERA[keyName].stream == null;
            if (self.cameraRevokePopup == null) {
                if (LiveStreamManager.CAMERA[keyName].external == true) {
                    LiveStreamManager.CAMERA[keyName].external = false;
                    examCameraUi.stopSnap(cameraName);
                    examCameraUi.stopRecording(cameraName);
                    const envAlias = examCameraUi.getQrStepName();
                    self.cameraRevokePopup = ui.alertDialog(ui.translations.popup_text[headingKey], ui.translations.popup_text.cameraDisconnected, ui.translations.popup_buttons.retry, function (dialog) {
                        ui.remove(dialog);
                        self.cameraRevokePopup = null;
                        examCameraUi.showQrPage(examCameraUi.cameraAllowClick, envAlias, examCameraUi.camType);
                    });
                }
            }
            else {
                if (LiveStreamManager.CAMERA[keyName].external == true
                    && LiveStreamManager.CAMERA[keyName].stream == null) {
                    LiveStreamManager.CAMERA[keyName].external = false;
                }
            }
        });
        this.subscribe(SDK_EVENT.RECEIVE_MESSAGE, function (user_name, message) {
            const cameraName = utility.getCameraNameInUserSocket(user_name);
            examCameraUi.modeSelector(message.mode, message, cameraName);
        });
    }
    /**
     *
     */
    cameraRevokeRetry() {
        // if (configrationManager.video_recording == 1 && this.recordingCamStarted == false) {
        //   liveStreamManager.record(LiveStreamManager.CAMERA.PRIMARY);
        //   this.recordingCamStarted = true;
        // }
        if (configrationManager.image_recording == 1) {
            regularSnap.takeSnapImage(LiveStreamManager.CAMERA.PRIMARY);
        }
        this.lobbyStart();
    }
    /**
     *
     */
    micRevokeRetry() {
        this.lobbyStart();
    }
    stopRecording() {
        if (configrationManager.video_recording == 1 && this.recordingCamStarted == true) {
            liveStreamManager.stopRecord(LiveStreamManager.CAMERA.PRIMARY);
            this.recordingCamStarted = false;
        }
    }
    modeSelector(mode, camtype) {
        if (mode == 'end_lobby') {
            if (camtype == 'S_CAM') {
                regularSnap.stopRegularSnapForCamera(LiveStreamManager.CAMERA.SIDE.name);
            }
            else if (camtype == 'B_CAM') {
                regularSnap.stopRegularSnapForCamera(LiveStreamManager.CAMERA.BACK.name);
            }
            else if (camtype == 'F_CAM') {
                regularSnap.stopRegularSnapForCamera(LiveStreamManager.CAMERA.FRONT.name);
            }
            else if (camtype == 'C_CAM') {
                regularSnap.stopRegularSnapForCamera(LiveStreamManager.CAMERA.CUSTOM.name);
            }
            this.end(0);
        }
    }
    populateCandidateCriteria(data) {
        const functionalContainer = ui.id('functionalSkills');
        const behaviouralContainer = ui.id('behavioralSkills');
        if (!functionalContainer || !behaviouralContainer) {
            utility.error('Skill containers not found in DOM.');
            return;
        }
        // Clear old skills
        functionalContainer.innerHTML = '';
        behaviouralContainer.innerHTML = '';
        // Populate Functional Skills
        data.functional.forEach((skill) => {
            const span = document.createElement('span');
            span.textContent = skill.name;
            functionalContainer.appendChild(span);
        });
        // Populate Behavioral Skills
        data.behaviour.forEach((skill) => {
            const span = document.createElement('span');
            span.textContent = ui.translations.behaviour_skills[skill.name];
            behaviouralContainer.appendChild(span);
        });
    }
    muteInterviewerVideoStreamLobby() {
        const name = configrationManager.currentCandidateName || 'Interviewer';
        const overlay = ui.id('thinkproc-candidate-video-muted-lobby');
        utility.generateNameAvatar(overlay, name);
    }
    unMuteInterviewerVideoStreamLobby() {
        const overlay = ui.id('thinkproc-candidate-video-muted-lobby');
        utility.removeAvatarSvgImage(overlay);
    }
}
const lobby = new Lobby();

class Complete extends StepInterface {
    envAlias = 'Complete';
    constructor() {
        super();
    }
    start() {
        this.resultData.status = true;
        this.resultData.info = 'complete exam';
        if (configrationManager.isTerminated == false) {
            this.manager().closeApplication();
            this.end();
        }
    }
    result() {
        return this.resultData;
    }
}
const completeExam = new Complete();

class FeedbackManager {
    async getFeedbackSkillList() {
        return await request.getFeedbackSkill();
    }
    async submitFeedbackSkillList(functional, behavioural, description) {
        return await request.postFeedbackSkill({ functional, behavioural, description });
    }
}

class FeedbackUI {
    functionalRatings;
    behavouralRatings;
    feedback;
    functionalSkillCount;
    behavouralSkillCount;
    constructor() {
        this.functionalRatings = {};
        this.behavouralRatings = {};
        this.feedback = new FeedbackManager();
        this.functionalSkillCount = 0;
        this.behavouralSkillCount = 0;
    }
    // Create a group of skill rating controls and append to #feedbackContainer
    createSkillGroup(title, skills, skill_type_id) {
        let feedbackContainer = null;
        if (skill_type_id == 1) {
            this.functionalSkillCount = Object.keys(skills).length;
            feedbackContainer = ui.id("thinkproc-feedback-functional-list-container");
        }
        else if (skill_type_id == 2) {
            this.behavouralSkillCount = Object.keys(skills).length;
            feedbackContainer = ui.id("thinkproc-feedback-behavoural-list-container");
        }
        if (!feedbackContainer)
            return;
        ui.innerHTML(feedbackContainer, '');
        skills.forEach(skill => {
            const section = ui.createElement("div");
            ui.addClass(section, "thinkproc-feedback-skill-card");
            const h4 = ui.createElement("h4");
            h4.textContent = skill.name || "Untitled Skill";
            section.appendChild(h4);
            const p = ui.createElement("p");
            p.textContent = skill.key;
            section.appendChild(p);
            const ratingDiv = ui.createElement("div");
            ui.addClass(ratingDiv, "thinkproc-feedback-rating");
            ratingDiv.setAttribute("data-skill-id", String(skill.id));
            // Create 10 rating spans
            for (let i = 1; i <= 10; i++) {
                const span = ui.createElement("span");
                span.textContent = String(i);
                span.dataset.value = String(i);
                span.setAttribute("role", "button");
                span.tabIndex = 0;
                ui.addClass(span, "skill_" + skill_type_id + "_" + skill.id);
                // click
                span.addEventListener("click", () => this.handleRatingClick(skill.id, i, ratingDiv, skill_type_id));
                // keyboard support (Enter / Space)
                span.addEventListener("keydown", (ev) => {
                    if (ev.key === "Enter" || ev.key === " ") {
                        ev.preventDefault();
                        this.handleRatingClick(skill.id, i, ratingDiv, skill_type_id);
                    }
                });
                ratingDiv.appendChild(span);
            }
            section.appendChild(ratingDiv);
            feedbackContainer.appendChild(section);
        });
        if (skill_type_id == 2) {
            const commentArea = this.createCommentHtmlDom();
            feedbackContainer.appendChild(commentArea);
        }
    }
    createCommentHtmlDom() {
        let commentDiv = ui.createElement('div');
        ui.addClass(commentDiv, 'thinkproc-feedback-comment-section');
        const h3 = ui.createElement('h3');
        h3.textContent = 'Write overall session comment';
        const p = ui.createElement('p');
        p.textContent = 'Give feedback to the candidate you interviewed';
        const div = ui.createElement('div');
        const textarea = ui.createElement('textarea');
        textarea.placeholder = 'Type Here';
        textarea.id = 'thinkproc-feedback-comment-textarea';
        const commentBox = div.appendChild(textarea);
        commentDiv.appendChild(h3);
        commentDiv.appendChild(p);
        commentDiv.appendChild(commentBox);
        return commentDiv;
    }
    handleRatingClick(skillId, value, container, skill_type_id) {
        const elements = ui.class("skill_" + skill_type_id + "_" + skillId);
        if (elements) {
            Array.from(elements).forEach(element => {
                if (element.getAttribute('data-value') != String(value)) {
                    ui.removeClass(element, "active");
                }
                else {
                    ui.addClass(element, "active");
                }
            });
        }
        if (skill_type_id == 1) {
            this.functionalRatings[String(skillId)] = value;
            let selectSkillCount = Object.keys(this.functionalRatings).length;
            const nextBtn = ui.id("thinkproc-feedback-next-btn");
            if (this.functionalSkillCount == selectSkillCount) {
                if (nextBtn) {
                    ui.removeClass(nextBtn, 'thinkproc-disable');
                }
            }
            else {
                ui.addClass(nextBtn, 'thinkproc-disable');
            }
        }
        else if (skill_type_id == 2) {
            this.behavouralRatings[String(skillId)] = value;
            let selectSkillCount = Object.keys(this.behavouralRatings).length;
            const submitBtn = ui.id("thinkproc-feedback-submit-btn");
            const textAreaVal = ui.id("thinkproc-feedback-comment-textarea");
            if (this.behavouralSkillCount == selectSkillCount && textAreaVal?.value != '') {
                if (submitBtn) {
                    ui.removeClass(submitBtn, 'thinkproc-disable');
                }
            }
            else {
                ui.addClass(submitBtn, 'thinkproc-disable');
            }
        }
    }
    dispatchNextBtn() {
        ui.hide(ui.id("loaderOverlay"));
        const nextBtn = ui.id("thinkproc-feedback-next-btn");
        if (nextBtn) {
            ui.click(nextBtn, async () => {
                ui.hide(ui.id("thinkproc-feedback-functional-section"));
                ui.show(ui.id("thinkproc-feedback-behavoural-section"));
            });
        }
    }
    dispatchTextAeraKeyup() {
        const textArea = ui.id("thinkproc-feedback-comment-textarea");
        if (textArea) {
            ui.keyup(textArea, async () => {
                const submitBtn = ui.id("thinkproc-feedback-submit-btn");
                const selectSkillCount = Object.keys(this.behavouralRatings).length;
                if (this.behavouralSkillCount == selectSkillCount && textArea?.value != '') {
                    ui.removeClass(submitBtn, 'thinkproc-disable');
                }
                else {
                    ui.addClass(submitBtn, 'thinkproc-disable');
                }
            });
        }
    }
}
const feedbackUI = new FeedbackUI();

class InterviewFeedback extends StepInterface {
    envAlias = 'Feedback';
    feedback;
    constructor() {
        super();
        this.feedback = new FeedbackManager();
    }
    start() {
        ui.hide(ui.id('thinkX_compatibility_wrapper'));
        ui.hide(ui.id('think_interview_lobby'));
        ui.hide(ui.id('thinkproc_interview_lobby'));
        // if(configrationManager.userType === '2'){
        //      ui.show(ui.id('thinkproc-feedback-popup-tab'));
        // }else if(configrationManager.userType === '3'){
        //      ui.show(ui.id('thinkproc-feedback-popup-tab'));
        // }
        this.renderFeedbackSections();
    }
    async renderFeedbackSections() {
        try {
            const apiResponse = await this.feedback.getFeedbackSkillList();
            const functional = apiResponse?.data?.functional ?? { data: [] };
            const behavioural = apiResponse?.data?.behavioural ?? { data: [] };
            const feedbackContainer = ui.id("thinkproc-feedbackContainer");
            if (feedbackContainer)
                feedbackContainer.innerHTML = "";
            feedbackUI.createSkillGroup("Functional Skills", functional.data || [], functional.skill_type_id ?? 0);
            feedbackUI.createSkillGroup("Behavioural Skills", behavioural.data || [], behavioural.skill_type_id ?? 0);
        }
        catch (err) {
            console.error("Failed to load feedback skills:", err);
        }
        finally {
            this.dispatchAllEventButton();
            if (configrationManager.userType === '3') {
                ui.show(ui.id('thinkproc-feedback-popup-tab'));
            }
        }
    }
    dispatchAllEventButton() {
        feedbackUI.dispatchNextBtn();
        feedbackUI.dispatchTextAeraKeyup();
        const submitBtn = ui.id("thinkproc-feedback-submit-btn");
        if (submitBtn) {
            ui.click(submitBtn, async () => {
                this.ratingSubmit();
            });
        }
    }
    async ratingSubmit() {
        // Convert to array of objects
        let functionalArr = Object.entries(feedbackUI.functionalRatings).map(([id, value]) => ({
            id: parseInt(id),
            value: value
        }));
        let behaviouralArr = Object.entries(feedbackUI.behavouralRatings).map(([id, value]) => ({
            id: parseInt(id),
            value: value
        }));
        const descriptionElem = ui.id("thinkproc-feedback-comment-textarea");
        const description = descriptionElem ? descriptionElem.value : '';
        this.feedback.submitFeedbackSkillList(functionalArr, behaviouralArr, description);
        utility.log("Feedback submitted successfully!");
        this.end(0, false);
    }
    result() {
        return this.resultData;
    }
}
const interviewFeedback = new InterviewFeedback();

class ThankYou extends StepInterface {
    envAlias = 'Thank_You';
    constructor() {
        super();
    }
    start() {
        setTimeout(() => {
            examCameraUi.stopRecording('all');
        }, 3000);
        ui.hide(ui.id('think_interview_leave_popup'));
        ui.hide(ui.id('think_interview_lobby'));
        ui.hide(ui.id('thinkproc_interview_lobby'));
        ui.hide(ui.id('thinkproc-feedback-popup-tab'));
        const closeBtn = ui.id("thinkpro-thank-you-close-btn");
        if (closeBtn) {
            ui.click(closeBtn, async () => {
                this.manager().closeApplication();
            });
        }
    }
    result() {
        return this.resultData;
    }
}
const thankYou = new ThankYou();

/**
 *
 */
class StepManager {
    steps;
    stepsOrder;
    stepSwitch;
    currentStep;
    currentStepName = '';
    nextStep;
    ufm;
    /**
     *
     */
    constructor() {
        this.ufm = new Ufm();
        this.currentStep = -1;
        this.nextStep = 0;
        this.steps = {
            browser: browserCheck$1,
            screen: screenCheck,
            camera: cameraCheck,
            mic: micCheck,
            network: networkCheck,
            photoCheck: photoCheck,
            idCheck: idCheck,
            idVerify: idVerify,
            // roomCheck: roomCheck,
            // deskScan: deskScan,
            // bodyScan: bodyScan,
            // addCamSideView: addCamSideView,
            // addCamBackView: addCamBackView,
            // addCamFrontView: addCamFrontView,
            addCamCustomView: addCamCustomView,
            lobby: lobby,
            // examMonitor: examMonitor,
            interviewMonitor: interviewMonitor,
            interviewFeedback: interviewFeedback,
            thankYou: thankYou,
            completeExam: completeExam,
        };
        this.stepsOrder = [
            'browser',
            'screen',
            'camera',
            'mic',
            'network',
            'photoCheck',
            'idCheck',
            'idVerify',
            // 'roomCheck',
            // 'deskScan',
            // 'bodyScan',
            // 'addCamSideView',
            // 'addCamBackView',
            // 'addCamFrontView',
            'addCamCustomView',
            'lobby',
            // 'examMonitor',
            'interviewMonitor',
            'interviewFeedback',
            'thankYou',
            'completeExam',
        ];
        this.stepSwitch = {
            browser: true,
            screen: true,
            camera: true,
            mic: true,
            network: true,
            photoCheck: true,
            idCheck: true,
            idVerify: true,
            // roomCheck: false,
            // deskScan: false,
            // bodyScan: false,
            // addCamSideView: false,
            // addCamBackView: false,
            // addCamFrontView: false,
            addCamCustomView: true,
            lobby: true,
            //examMonitor: false,
            interviewMonitor: true,
            interviewFeedback: true,
            thankYou: true,
            completeExam: true,
        };
    }
    /**
     *
     * @param stepName
     */
    turnOff(stepName) {
        this.stepSwitch[stepName] = false;
    }
    /**
     *
     * @param stepName
     */
    turnOn(stepName) {
        this.stepSwitch[stepName] = true;
    }
    /**
     *
     */
    init() {
        if (configrationManager.userType == '3') {
            ui.hide(ui.id('thinkproc_step_photo'));
            ui.hide(ui.id('thinkproc_step_id'));
            ui.hide(ui.id('thinkproc_step_camera'));
        }
        stepUIManager.init(this);
        this.offTab();
        const browserData = browserCheck$1.getDeviceInfo();
        if (browserData.device != 'PC') {
            ui.show(ui.id('think_interviewDeviceChange'));
            this.exitBtn();
        }
        if ((configrationManager.sharedScreen == 1 || configrationManager.video_recording == 1) && configrationManager.userType == '2') {
            ui.show(ui.id('thinkX_screenSharePopup'));
            ui.hide(ui.id('thinkX_screenShareErrorPopup'));
            liveStreamManager.screenShare(() => {
                ui.hide(ui.id('thinkX_screenSharePopup'));
                if (this.currentStep == -1) {
                    this.next();
                }
            }, (message) => {
                this.shareRetry();
                ui.show(ui.id('thinkX_screenShareErrorPopup'));
                ui.hide(ui.id('thinkX_screenSharePopup'));
                stepUIManager.insertText('thinkX_screenShareError', message);
            });
        }
        else {
            this.next();
        }
        this.beforeUnload();
        this.blur();
        this.onFocus();
    }
    beforeUnload() {
        let self = this;
        uiEvents.beforeuloadEvent(() => {
            // Handle beforeunload event to prevent accidental navigation
            utility.log('Application is closing');
            self.closeApplication(true);
        });
    }
    blur() {
        uiEvents.blurEvent(() => {
            // Handle beforeunload event to prevent accidental navigation
            utility.log('Window lost focus!');
            sdkEvents.trigger(SDK_EVENT.ON_BLUR);
        });
    }
    onFocus() {
        uiEvents.onFocusEvent(() => {
            // Handle beforeunload event to prevent accidental navigation
            utility.log('window onfocus');
            sdkEvents.trigger(SDK_EVENT.ON_FOCUS);
        });
    }
    shareRetry() {
        const button = ui.id('thinkX_ScreenShareRetry');
        if (button) {
            ui.click(button, () => {
                this.init();
            });
        }
    }
    exitBtn() {
        ui.click(ui.id('think_interviewDeviceChange'), async () => {
            this.closeApplication();
        });
    }
    /**
     *
     */
    offTab() {
        // Retrieve whether room sanitization step is enabled from configuration
        const roomEnable = configrationManager.valueMap.room_sanitization_enabled.value;
        // Retrieve whether candidate ID capture (authentication) step is enabled
        const idEnable = configrationManager.valueMap.candidate_authentication.data.capture_id_enabled.value;
        // Retrieve whether additional camera setup step is enabled
        configrationManager.valueMap.additional_cam.value;
        const { auth_reg_id: { value: auth_reg_id }, auth_reg_photo: { value: auth_reg_photo }, auth_capture_id: { value: auth_capture_id }, } = configrationManager.valueMap.candidate_authentication.data;
        // If room sanitization is disabled, deactivate the corresponding tab
        if (roomEnable == 0) {
            this.turnOff('roomCheck');
            stepUIManager.stepTabDeactive('roomCheck');
            this.turnOff('deskScan');
            stepUIManager.stepTabDeactive('deskScan');
            this.turnOff('bodyScan');
            stepUIManager.stepTabDeactive('bodyScan');
        }
        // If ID capture is disabled, deactivate the corresponding tab
        if (idEnable == 0) {
            this.turnOff('idCheck');
            //stepUIManager.stepTabDeactive('idCheck');
        }
        const liveCustomCam = configrationManager.valueMap.additional_cam.data.live_custom_cam.value;
        if (liveCustomCam == 0) {
            this.turnOff('addCamCustomView');
        }
        if (liveCustomCam == 0) {
            stepUIManager.stepTabDeactive('addCamFrontView');
        }
        if (configrationManager.userType == '3') {
            this.turnOff('addCamCustomView');
        }
        if (auth_reg_photo == 0 && auth_reg_id == 0 && auth_capture_id == 0) {
            this.turnOff('idVerify');
            stepUIManager.stepTabDeactive('idVerify');
        }
        stepUIManager.setStepActiveCount(this.stepSwitch);
        const feedbackRequired = configrationManager.intervierData[configrationManager.socketRealUserName]?.feedback_required;
        const feedbackGiven = configrationManager.intervierData[configrationManager.socketRealUserName]?.feedback_given;
        // normalize values to booleans to avoid comparing boolean|undefined with numbers
        const feedbackRequiredVal = !!feedbackRequired;
        const feedbackGivenVal = !!feedbackGiven;
        if (configrationManager.userType != "3" || !feedbackRequiredVal || (feedbackRequiredVal && feedbackGivenVal)) {
            this.turnOff('interviewFeedback');
        }
        if (configrationManager.userType == '3' && configrationManager.link_status == 'interviewAlreadyEnded') {
            this.stepsOrder.forEach(step => {
                if (step != 'thankYou' && step != 'interviewFeedback') {
                    this.turnOff(step);
                }
            });
        }
        else {
            if (configrationManager.currentStepAlias != 'Lobby' && configrationManager.currentStepAlias != 'Interview_Session') {
                ui.show(ui.id('thinkX_compatibility_wrapper'));
            }
        }
    }
    /**
     *
     */
    offTabCamera(camera, step, current_env_alias) {
        // Retrieve whether room sanitization step is enabled from configuration
        configrationManager.valueMap.room_sanitization_enabled.value;
        // Retrieve whether additional camera setup step is enabled
        configrationManager.valueMap.additional_cam.value;
        const thinkproc_mainHeader = ui.id('thinkproc-main-popup');
        if (camera != 'P_CAM' && thinkproc_mainHeader) {
            ui.addClass(thinkproc_mainHeader, 'thinkproc-hide-header');
        }
        // If room sanitization is disabled, deactivate the corresponding tab
        if (camera == 'RS_CAM') {
            // Room link
            // Addition camera
            this.turnOff('addCamFrontView');
            this.turnOff('addCamSideView');
            this.turnOff('addCamBackView');
            this.turnOff('addCamCustomView');
        }
        else {
            // additional cameras
            this.turnOff('roomCheck');
            this.turnOff('deskScan');
            this.turnOff('bodyScan');
            stepUIManager.stepTabDeactive('deskScan');
            if (camera == 'S_CAM') {
                this.turnOff('addCamFrontView');
                this.turnOff('addCamBackView');
                this.turnOff('addCamCustomView');
            }
            if (camera == 'F_CAM') {
                this.turnOff('addCamSideView');
                this.turnOff('addCamBackView');
                this.turnOff('addCamCustomView');
            }
            if (camera == 'B_CAM') {
                this.turnOff('addCamSideView');
                this.turnOff('addCamFrontView');
                this.turnOff('addCamCustomView');
            }
            if (camera == 'C_CAM') {
                this.turnOff('addCamSideView');
                this.turnOff('addCamFrontView');
                this.turnOff('addCamBackView');
            }
        }
        // utility.log('check step',step, current_env_alias);
        if (step != current_env_alias &&
            current_env_alias != 'Lobby' &&
            current_env_alias == 'Interview_Session') {
            this.turnOff('lobby');
        }
        if (camera == 'RS_CAM') {
            if (step == 'Desk_Check') {
                this.turnOff('roomCheck');
            }
            this.turnOff('bodyScan');
        }
        stepUIManager.stepTabDeactive('bodyScan');
        stepUIManager.stepTabDeactive('addCamFrontView');
        this.turnOff('browser');
        this.turnOff('screen');
        this.turnOff('camera');
        this.turnOff('mic');
        this.turnOff('network');
        stepUIManager.stepTabDeactive('network');
        this.turnOff('photoCheck');
        this.turnOff('idCheck');
        stepUIManager.stepTabDeactive('idCheck');
        this.turnOff('idVerify');
        stepUIManager.stepTabDeactive('idVerify');
        if (camera == 'RS_CAM') {
            this.turnOff('lobby');
            // stepUIManager.stepTabDeactive('lobby');
            this.turnOff('examMonitor');
            // stepUIManager.stepTabDeactive('examMonitor');
        }
    }
    /* This function is used for going to next step */
    /**
     *
     * @param goStep
     */
    next(goStep) {
        const index = goStep ? this.stepsOrder.indexOf(goStep) : this.currentStep + 1;
        if (index === -1 || !(index in this.stepsOrder)) {
            // end of steps
            if (configrationManager.completeExam) {
                this.closeApplication();
                utility.log('end of steps');
                utility.wait(1000).then(() => {
                    configrationManager.completeExam();
                    configrationManager.completeExam = () => { };
                });
                return;
            }
        }
        // let previousStepName = this.currentStep != -1?this.stepsOrder[this.currentStep]:"";
        const stepName = this.stepsOrder[index];
        if (configrationManager.userType == '3') {
            if (stepName == 'photoCheck' || stepName == 'idCheck' || stepName == 'idVerify' || stepName == 'addCamCustomView') {
                this.stepSwitch[stepName] = false;
            }
        }
        const isOn = this.stepSwitch[stepName];
        this.currentStep = index;
        this.nextStep = this.currentStep + 1;
        if (!isOn) {
            // step is off
            utility.log('Skipping step');
            this.next();
            return;
        }
        const previousStepName = this.currentStepName;
        this.currentStepName = stepName;
        const step = this.steps[stepName];
        configrationManager.currentStep = stepName;
        configrationManager.currentStepObject = step;
        configrationManager.currentStepAlias = step.envAlias;
        step.setManager(this);
        utility.log('Starting Step - ' + stepName);
        stepUIManager.updateActiveStepCount();
        stepUIManager.stepStart(stepName, previousStepName);
        step.onComplete((delay = 2000, allowNext = false, log = true) => {
            setTimeout(() => {
                if (log === true) {
                    request.stageEnd({ environment: step.envAlias, log: step.resultData });
                }
                utility.log('Ending Step');
                if (step.resultData.status == true || allowNext) {
                    this.ufm.resetFlagsAndCounters();
                    step.unSubscribe();
                    stepUIManager.stepEnd(stepName);
                    stepManager.next();
                }
                else {
                    stepUIManager.stepError(stepName, step.resultData.error);
                    step.error();
                }
            }, delay);
        });
        if (LiveStreamManager.PRIMARY_CAMERA_NAME == 'P_CAM') {
            request.stageStart({ environment: step.envAlias }).then(() => {
                step.start();
            });
        }
        else {
            step.start();
        }
    }
    /**
     *
     */
    getCurrentStepObject() {
        const stepName = this.stepsOrder[this.currentStep];
        const step = this.steps[stepName];
        return step;
    }
    /**
     *
     * @param goStep
     */
    jumpToStep(goStep) {
        this.next(goStep);
    }
    cameraRevokeRetry() { }
    micRevokeRetry() { }
    cameraRevoke() { }
    micRevoke() { }
    screenRevoke() { }
    screenRevokeRetry() { }
    isSdkClosed = false;
    closeApplication(beforeUnload = false) {
        if (LiveStreamManager.PRIMARY_CAMERA_NAME == 'P_CAM') {
            if (configrationManager.userType == '3') {
                let msg = { mode: 'interviewer_leave', text: "interviewer leaving" };
                socket.sendRoomMessage(msg);
            }
            else {
                let msg = { mode: 'candidate_leave', text: "candidate leaving", data: configrationManager.currentStepAlias };
                socket.sendRoomMessage(msg);
            }
        }
        socket.leavingSocket();
        if (this.isSdkClosed) {
            return;
        }
        //Remove main div and close all peer connections
        ui.removeMainDiv();
        // if (!beforeUnload) {
        //   peer.closeAll();
        //   // Stop all live streams
        //   liveStreamManager.stopStreams();
        // }
        // trigger close application event
        utility.wait(500).then(() => {
            events.trigger(EVENT.CLOSE_APPLICATION);
        });
        this.isSdkClosed = true;
    }
}
const stepManager = new StepManager();

/**
 *
 */
class Init {
    popupElement = null;
    /**
     *
     * @param lang
     */
    async loadPage(lang = 'en', secondary = false) {
        try {
            await ui.Init(lang, secondary);
            // Option 2: Download localized file
            // processor.downloadHTML('localized.html', html);
        }
        catch (err) {
            utility.error('Error:', err);
        }
    }
}

/* Author : Prateek Jaiswal */
/**
 *
 */
class ErrorManager {
    errorMap = {
        // General errors
        ERROR: {
            DEFAULT: { code: 4500, message: 'Something went wrong' },
            // Authentication errors
            INVALID_CREDENTIALS: { code: 4501, message: 'Invalid email or password' },
            UNAUTHORIZED: { code: 4502, message: 'You are not authorized to perform this action' },
            CAMERA_NOT_FOUND: { code: 4503, message: 'Selected camera not found' },
            AUDIO_NOT_FOUND: { code: 4504, message: 'Selected audio not found' },
            INVALID_ID_IMAGES: { code: 4505, message: 'Registration ID is not a valid JPG/PNG/JPEG URL' },
            INVALID_PHOTO_IMAGES: {
                code: 4506,
                message: 'Registration Photo is not a valid JPG/PNG/JPEG URL',
            },
            NOT_INITIALIZE_INIT: { code: 4507, message: 'Init function is not initialized' },
            NOT_INITIALIZE_COMPATIBILITY: {
                code: 4508,
                message: 'The checkCompatibility function is not initialized.',
            },
            ALREADY_INITIALIZE_INIT: { code: 4509, message: 'The init function is already initialized.' },
            ALREADY_INITIALIZE_COMPATIBILITY: {
                code: 4510,
                message: '"The checkCompatibility function is already initialized.',
            },
            ALREADY_INITIALIZE_LAUNCH: {
                code: 4511,
                message: 'The launch function is already initialized.',
            },
        },
        // Validation-related errors
        VALIDATION: {
            MISSING_FIELDS: { code: 4603, message: 'Required fields are missing' },
            INVALID_FORMAT: { code: 4604, message: 'Input format is invalid' },
            MISSING_API_KEY: { code: 4605, message: 'Missing or invalid API key' },
            MISSING_GROUP_CODE: { code: 4606, message: 'Missing or invalid group code' },
            MISSING_UNIQUE_USER_ID: { code: 4607, message: 'MIssing or invalid user id' },
        },
        // Routing-related errors
        ROUTES: {
            NOT_FOUND: { code: 4705, message: 'Requested route does not exist' },
        },
    };
    /**
     * Get full error object by category and key.
     * @param category - e.g. 'ERROR', 'VALIDATION', 'ROUTES'
     * @param key - e.g. 'INVALID_CREDENTIALS'
     */
    getError(category, key) {
        return this.errorMap[category]?.[key] || this.errorMap.ERROR.DEFAULT;
    }
    /**
     *
     * @param category
     * @param key
     */
    throwError(category, key) {
        const error = this.getError(category, key);
        throw new Error(`${error.code} : ${error.message}`);
    }
}
const errorManager = new ErrorManager();

/**
 *
 */
class Authenticator {
    /**
     *
     */
    constructor() { }
    /**
     *
     * @param options
     * @param success
     * @param error
     */
    async validate(options, success = (response) => { }, error = (error) => { }) {
        const { registration_id_url, registration_photo_url, api_key, group_code, unique_user_id } = options;
        if (api_key == '') {
            error(errorManager.getError('VALIDATION', 'MISSING_API_KEY'));
            return;
        }
        if (group_code == '') {
            error(errorManager.getError('VALIDATION', 'MISSING_GROUP_CODE'));
            return;
        }
        if (unique_user_id == '') {
            error(errorManager.getError('VALIDATION', 'MISSING_UNIQUE_USER_ID'));
            return;
        }
        if (registration_id_url !== '') {
            const isValid = await configrationManager.isValidAndReachableImageUrl(registration_id_url);
            if (!isValid) {
                utility.log('Invalid or unreachable registration_id_url');
                error(errorManager.getError('ERROR', 'INVALID_ID_IMAGES'));
                return;
            }
        }
        if (registration_photo_url !== '') {
            const isValid = await configrationManager.isValidAndReachableImageUrl(registration_photo_url);
            if (!isValid) {
                utility.log('Invalid or unreachable registration_photo_url');
                error(errorManager.getError('ERROR', 'INVALID_PHOTO_IMAGES'));
                return;
            }
        }
        if (options.session_token) {
            configrationManager.firstLogin = false;
        }
        request
            .sdkInitialize(options)
            .then(async (response) => {
            const res = response.data;
            api.setToken(res.session_token);
            const config = utility.decodeBase64(res.config);
            const configDecode = JSON.parse(config);
            configrationManager.setConfig(configDecode);
            configrationManager.userType = res.user_type.toString();
            configrationManager.userId = res.user_id;
            configrationManager.sessionIdRec = res.sessionId;
            configrationManager.instanceIdRec = res.instanceId;
            configrationManager.interviwerJoiningTime = res.interviwerJoiningTime;
            configrationManager.extractValueAndData(res.template);
            configrationManager.setTemplateData();
            configrationManager.setCandidateDetail(res.candidate_details);
            configrationManager.setInterviewDetails(res.interviewer_details);
            ufmM.UfmSubTypes(res.ufm_sub_type);
            ufmM.setCaptureTime(res.ufm_capture_time);
            ai.setFrameRate(res.ai_frame_rate);
            configrationManager.saveLang(res.language);
            configrationManager.socketUser(res.socketUserName);
            configrationManager.previous_instance_escalated = res.previous_instance_escalated;
            configrationManager.socketRoom(res.socketRoomName);
            configrationManager.currentCandidateName = res.user_name;
            configrationManager.candidateRegisterURL = res.candidate_registered_photo;
            configrationManager.link_status = res.link_status;
            configrationManager.transcriptCode = res.transcriptCode;
            configrationManager.currentLang = res.language;
            configrationManager.termsAndConditionsLink = res.termsLink;
            configrationManager.privacyStatementLink = res.privacyLink;
            // configrationManager.speechURL(res.speechURL);
            const data = {
                sessionInfo: { sessionToken: res.session_token },
                config: res.config,
                template: res.template,
                language: res.language,
            };
            const init = new Init();
            await init.loadPage(res.language);
            socket.Init(configrationManager.signal_node_url, res.session_token);
            peer.Init();
            sdkEvents.on(SDK_EVENT.SOCKET_CONNECTED, () => {
                chat.join();
            });
            liveStreamManager.setSocketEvents();
            success(data);
        })
            .catch((apiError) => {
            utility.error(apiError);
            error(errorManager.getError('Error', 'SDK'));
        });
    }
    async secondaryCameraConnect(session_token, camera, step, current_env_alias, link_data) {
        await utility.wait(this.getRandomDelay());
        return new Promise((resolve, reject) => {
            api.setToken(session_token);
            let data = {
                camera_type: camera,
                link_data: link_data
            };
            configrationManager.qrId = link_data;
            request
                .secondaryCameraConnect(data)
                .then(async (response) => {
                const res = response.data;
                const config = utility.decodeBase64(res.config);
                const configDecode = JSON.parse(config);
                configrationManager.setConfig(configDecode);
                configrationManager.userType = res.user_type.toString();
                configrationManager.userId = res.user_id;
                configrationManager.interviwerJoiningTime = res.interviwerJoiningTime;
                configrationManager.sessionIdRec = res.sessionId;
                configrationManager.instanceIdRec = res.instanceId;
                configrationManager.extractValueAndData(res.template);
                configrationManager.setTemplateData();
                ufmM.UfmSubTypes(res.ufm_sub_type);
                ufmM.setCaptureTime(res.ufm_capture_time);
                ai.setFrameRate(res.ai_frame_rate);
                configrationManager.saveLang(res.language);
                configrationManager.socketUser(res.socketUserName);
                configrationManager.socketRoom(res.socketRoomName);
                configrationManager.candidateNameMsg = 'candidate_camera';
                configrationManager.transcriptCode = res.transcriptCode;
                const init = new Init();
                await init.loadPage(res.language, true);
                LiveStreamManager.PRIMARY_CAMERA_NAME = camera;
                ai.loaddata();
                stepManager.beforeUnload();
                stepManager.blur();
                stepManager.onFocus();
                stepUIManager.init(stepManager);
                stepManager.offTabCamera(camera, step, current_env_alias);
                socket.Init(configrationManager.signal_node_url, res.session_token);
                peer.Init();
                sdkEvents.on(SDK_EVENT.SOCKET_CONNECTED, () => {
                    chat.join();
                });
                liveStreamManager.setCameraRevokeCallback(function () {
                    stepManager.getCurrentStepObject().cameraRevoke();
                });
                liveStreamManager.setSocketEvents();
                utility.wait(2000).then(() => {
                    stepManager.next();
                });
                // let stream ;
                // if(camera == 'RS_CAM'){
                //   stream = await liveStreamManager.getCameraStream(LiveStreamManager.CAMERA.ROOM_CAMERA, 'enviroment');
                // }else if(camera == 'B_CAM'){
                //   stream = await liveStreamManager.getCameraStream(LiveStreamManager.CAMERA.BACK, 'enviroment');
                // }else if(camera == 'F_CAM'){
                //   stream = await liveStreamManager.getCameraStream(LiveStreamManager.CAMERA.FRONT, 'enviroment');
                // }else if(camera == 'S_CAM'){
                //   stream = await liveStreamManager.getCameraStream(LiveStreamManager.CAMERA.SIDE, 'enviroment');
                // }
                // if (typeof stream == 'boolean' || stream == null) {
                //    // Show error Message
                // }else{
                //   let video = secondaryCamUI.setStream(stream.stream);
                //   video?.play();
                // }
                sdkEvents.on(SDK_EVENT.USER_LEFT, function (user_name) {
                    // if additional camera is open and candidate left from the session then close additional camera 
                    const socketUserName = utility.extractPrefix(configrationManager.socketUserName, LiveStreamManager.PRIMARY_CAMERA_NAME);
                    if (user_name == socketUserName && LiveStreamManager.PRIMARY_CAMERA_NAME != 'P_CAM') {
                        stepManager.closeApplication();
                        utility.log('close additional camera');
                    }
                });
                resolve(res);
            })
                .catch((apiError) => {
                utility.error(apiError);
                reject(errorManager.getError('Error', 'SDK_SECONDARY_CAMERA_CONNECT'));
                stepManager.closeApplication();
            });
        });
    }
    getRandomDelay() {
        const min = 1000;
        const max = 5000;
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}
const authenticator = new Authenticator();

/**
 *
 */
class ExamMonitor extends StepInterface {
    envAlias = 'Exam_Session';
    recognition = null;
    vdClearTimeout;
    isAudioDetectionPaused = false;
    isBlurListenerAdded = false;
    imageTypeSnap = 10;
    regularSnapTimeout;
    suspendCountdownTimer = null;
    recordingStarted = false;
    recordingCamStarted = false;
    aiStarted = false;
    cameraRevokePopup = null;
    camType = '';
    socketuserID;
    isRecognitionActive = false;
    proctorAssignTimeout;
    assignNewProctorTimer = null;
    /**
     *
     */
    constructor() {
        super();
        this.vdClearTimeout = null;
        this.regularSnapTimeout = null;
        this.suspendCountdownTimer = null;
        this.socketuserID = '';
        this.proctorAssignTimeout = null;
    }
    async getCameraStream() {
        let currentStream = null;
        if (LiveStreamManager.PRIMARY_CAMERA_NAME == 'P_CAM') {
            currentStream = await liveStreamManager.requestVideo(LiveStreamManager.CAMERA.PRIMARY);
        }
        else if (LiveStreamManager.PRIMARY_CAMERA_NAME == 'S_CAM') {
            currentStream = await liveStreamManager.requestVideo(LiveStreamManager.CAMERA.SIDE);
        }
        else if (LiveStreamManager.PRIMARY_CAMERA_NAME == 'B_CAM') {
            currentStream = await liveStreamManager.requestVideo(LiveStreamManager.CAMERA.BACK);
        }
        else if (LiveStreamManager.PRIMARY_CAMERA_NAME == 'F_CAM') {
            currentStream = await liveStreamManager.requestVideo(LiveStreamManager.CAMERA.FRONT);
        }
        else if (LiveStreamManager.PRIMARY_CAMERA_NAME == 'C_CAM') {
            currentStream = await liveStreamManager.requestVideo(LiveStreamManager.CAMERA.CUSTOM);
        }
        return currentStream?.stream || null;
    }
    async getAudioStream() {
        const audioStream_noise = await liveStreamManager.requestAudio(LiveStreamManager.AUDIO.PRIMARY);
        return audioStream_noise || null;
    }
    sendSmartProctorUFM() {
        if (configrationManager.sentFirstLoginMsg == false && configrationManager.previous_instance_escalated == false && configrationManager.smartProctorEnable == 1) {
            const UFMStatus = configrationManager.firstLogin ? "welcome_msg" : "relogin";
            ai.getSmartProctorUFM({
                status: UFMStatus,
                ufm_type: "",
                ufm_code: "",
                cs_score: "",
                suspension_score: "",
                termination_score: "",
                deduction_point: "",
                object_array: "",
            });
            configrationManager.sentFirstLoginMsg = true;
        }
    }
    /**
     *
     */
    start() {
        let self = this;
        self.subscribe(SDK_EVENT.NETWORK_DISCONNECT, function () {
            self.aiStarted = false;
            examCameraUi.stopAiMonitoring();
            examCameraUi.stopRecording('all');
            chat.sendData('stop_monitor_ai', 'stop monitor ai');
        });
        self.subscribe(SDK_EVENT.UFM_SUSPEND, function (response) {
            self.suspendPopup(response);
            self.aiStarted = false;
            examCameraUi.stopAiMonitoring();
            chat.sendData('stop_monitor_ai', 'stop monitor ai');
        });
        self.subscribe(SDK_EVENT.UFM_TERMINATE, function (response) {
            self.terminatePopup();
            self.aiStarted = false;
            examCameraUi.stopAiMonitoring();
            chat.sendData('stop_monitor_ai', 'stop monitor ai');
        });
        self.subscribe(SDK_EVENT.USER_ESCALTED, function (response) {
            self.userEscalted();
        });
        self.subscribe(SDK_EVENT.SMART_PROCTOR_MSG, function (response) {
            if (response.status_code != 200) {
                self.saveSmartProctorMsg(response);
            }
        });
        if (LiveStreamManager.PRIMARY_CAMERA_NAME == 'P_CAM') {
            self.checkSessionStatus(); //check session status on start
            utility.wait(2000).then(() => {
                self.sendSmartProctorUFM(); // send smart proctor UFM on start welcome or relogin
            });
            // create unique UFM object for primary camera
            examCameraUi.uniqueUfmObject('P_CAM');
            // subscribe socket event
            this.subscribeSocketEvent();
            // side, Back, Front camera start
            this.startInternalAdditionalCam();
            // start primary camera Exam AI
            this.startExamWithSFL();
            this.proctorLeft();
            examCameraUi.startSnapAndRecording(LiveStreamManager.PRIMARY_CAMERA_NAME);
        }
        else if (LiveStreamManager.PRIMARY_CAMERA_NAME == 'S_CAM' ||
            LiveStreamManager.PRIMARY_CAMERA_NAME == 'B_CAM' ||
            LiveStreamManager.PRIMARY_CAMERA_NAME == 'F_CAM' ||
            LiveStreamManager.PRIMARY_CAMERA_NAME == 'C_CAM') {
            //ui.hide(ui.id('thinkX_compatibility_wrapper'));
            ui.hide(ui.id('thinkproc_chat'));
            ui.hide(ui.id('thinkX_chatIcon'));
            ui.hide(ui.id('thinkX_cameraSetup_box'));
            ui.show(ui.id('thinkpro_MobileViewBox'));
            this.startCamera();
            examCameraUi.camType = LiveStreamManager.PRIMARY_CAMERA_NAME;
            const socketUserName = utility.extractPrefix(configrationManager.socketUserName, LiveStreamManager.PRIMARY_CAMERA_NAME);
            examCameraUi.socketuserID = socketUserName;
            peer.connect(socketUserName);
            this.subscribe(SDK_EVENT.CHAT_MESSAGE, function (user_name, message) {
                self.roomSocketmode(message.mode, message.text, message, user_name, LiveStreamManager.PRIMARY_CAMERA_NAME);
            });
            examCameraUi.startSnapAndRecording(LiveStreamManager.PRIMARY_CAMERA_NAME);
            examCameraUi.externalCameraMonitoring();
        }
    }
    proctorLeft() {
        let self = this;
        this.subscribe(SDK_EVENT.USER_LEFT, function (user_name) {
            if (user_name == configrationManager.currentProctor) {
                self.checkSessionStatus();
            }
        });
    }
    startInternalAdditionalCam() {
        const cameraMappings = ['S_CAM', 'B_CAM', 'F_CAM', 'C_CAM'];
        cameraMappings.forEach((cameraName) => {
            examCameraUi.camType = cameraName;
            examCameraUi.startInternalCamMonitering(cameraName);
        });
    }
    async startCamera() {
        const stream = await this.getCameraStream();
        if (stream) {
            const video = this.setStream(stream);
            video.play();
        }
    }
    getVideoFromStream(stream) {
        const video = document.createElement('video');
        video.srcObject = stream;
        video.muted = true;
        video.playsInline = true;
        video.width = 640;
        video.height = 480;
        video.play().catch(() => { });
        return video;
    }
    async startExamWithSFL() {
        return new Promise(async (resolve, reject) => {
            try {
                const stream = await this.getCameraStream();
                if (!stream) {
                    return reject('No camera stream found');
                }
                // Setup primary video stream
                const video = this.setStream(stream);
                video.play();
                // Start VD (voice detection)
                if (configrationManager.valueMap.ufm.data.VD.value == 1) {
                    this.getAudioStream().then((mediaStream) => {
                        if (mediaStream) {
                            this.checkForAudioLevelsVdInBrowser(mediaStream);
                        }
                    });
                }
                // Start AI monitoring
                if (!this.aiStarted) {
                    ai.examAI(video, async (message) => {
                        this.aiStarted = true;
                        utility.log(message, 'Exam Monitor AI');
                        if (message.image != '') {
                            message.image = await utility.convertBase64PngToCompressedBase64Jpg(message.image);
                            const imageBlob = utility.base64ToBlob(message.image);
                            examCameraUi.ufm.log(message.od_detections, this.envAlias, 1, 'P_CAM', imageBlob, message.status_code);
                        }
                    });
                }
                // Handle SFL (screen focus loss=) monitoring
                if (configrationManager.valueMap.ufm.data.SFL.value == 1) {
                    if (!this.isBlurListenerAdded) {
                        ui.show(ui.id('thinkpro_draggableBox'));
                        document.addEventListener('visibilitychange', () => {
                            if (document.visibilityState === 'hidden') {
                                let camera = LiveStreamManager.CAMERA.PRIMARY;
                                if (configrationManager.sharedScreen == 1) {
                                    camera = LiveStreamManager.CAMERA.SCREEN;
                                }
                                if (!camera.stream)
                                    return;
                                const video = this.getVideoFromStream(camera.stream);
                                if (video) {
                                    utility.wait(1000).then(() => {
                                        const snapshot = this.takeSnapshots_sfl(video, false, false);
                                        const blob = utility.base64ToBlob(snapshot);
                                        this.ufmTrigger('SFL', 276, blob);
                                    });
                                }
                                else {
                                    utility.error('Video element not found for snapshot on visibility change');
                                }
                            }
                        });
                        this.isBlurListenerAdded = true;
                    }
                }
                resolve(); // ✅ Exam setup complete
            }
            catch (error) {
                reject(error);
            }
        });
    }
    suspendResume() {
        const suspendBtn = ui.id('thinkX_suspend_resume');
        if (suspendBtn) {
            ui.click(suspendBtn, () => {
                examCameraUi.isExamPaused = false;
                this.isAudioDetectionPaused = false;
                this.isBlurListenerAdded = false;
                utility.wait(500).then(() => {
                    events.trigger(EVENT.SUSPEND_RESUME_EXAM);
                });
                chat.sendData('start_monitor_ai', 'start monitor ai');
                let msg = { mode: 'update_escalation', text: "update escaltion" };
                socket.sendRoomMessage(msg);
                examCameraUi.playAllUfm();
                examCameraUi.primaryCameraAiMonitoring();
                examCameraUi.startInternalCamAI();
                ui.hide(ui.id('thinkX_suspendPopup'));
            });
        }
    }
    terminateExam() {
        configrationManager.isTerminated = true;
        this.completeExam();
        const terminateBtn = ui.id('thinkX_terminate_exit');
        if (terminateBtn) {
            ui.click(terminateBtn, () => {
                ui.hide(ui.id('thinkX_terminatePopup'));
                this.manager().closeApplication();
                configrationManager.currentStepObject?.end();
            });
        }
    }
    completeExam() {
        examCameraUi.ufm.endTest(this.envAlias);
        examCameraUi.stopSnap('all');
        examCameraUi.stopRecording('all');
        this.aiStarted = false;
        examCameraUi.stopAiMonitoring();
        configrationManager.isSubmited = 'Exam_session';
        chat.sendData('stop_monitor_ai', 'stop monitor AI');
        chat.sendData('close_additional_camera', 'close additional camera');
        peer.closeAll();
        socket.closeSocket();
        this.resultData.status = true;
        this.resultData.info = 'test terminate';
        this.end();
    }
    setStream(stream) {
        let video = null;
        if (LiveStreamManager.PRIMARY_CAMERA_NAME == 'P_CAM') {
            video = ui.id('thinkX_cameraVideo');
        }
        else if (LiveStreamManager.PRIMARY_CAMERA_NAME == 'S_CAM' ||
            LiveStreamManager.PRIMARY_CAMERA_NAME == 'B_CAM' ||
            LiveStreamManager.PRIMARY_CAMERA_NAME == 'F_CAM' ||
            LiveStreamManager.PRIMARY_CAMERA_NAME == 'C_CAM') {
            video = ui.id('thinkX_mobileCameraVideo');
        }
        if (!video) {
            throw new Error('No valid video element found for the selected camera.');
        }
        video.srcObject = stream;
        return video;
    }
    getSpeechRecongnition() {
        if (this.recognition != null) {
            this.recognition.end;
            return this.recognition;
        }
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        this.recognition = new SpeechRecognition();
        this.recognition.lang = ui.translations.language_code.code;
        this.recognition.continuous = false; // We only need one result for this test
        this.recognition.interimResults = false; // Only interested in the final result
        return this.recognition;
    }
    checkForAudioLevelsVdInBrowser(mediaStream) {
        const self = this;
        if (this.isAudioDetectionPaused) {
            utility.log('🛑 Audio detection is paused.');
            return;
        }
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const chunks = [];
        const mediaRecorder = new MediaRecorder(mediaStream, { mimeType: 'audio/webm' });
        mediaRecorder.ondataavailable = (event) => {
            if (event.data.size > 0)
                chunks.push(event.data);
        };
        mediaRecorder.onstop = () => {
            const blob = new Blob(chunks, { type: 'audio/webm' });
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = () => {
                const base64Audio = reader.result.split(',')[1];
                // ✅ CASE 1: Use Web Speech API if available
                if (SpeechRecognition) {
                    const recognition = self.getSpeechRecongnition();
                    recognition.stop();
                    let detectedText = '';
                    let isStopped = false;
                    recognition.onstart = () => {
                        utility.log('🎙️ Speech recognition started (VD)');
                    };
                    recognition.onresult = (event) => {
                        if (isStopped)
                            return;
                        const result = event.results[0][0].transcript;
                        detectedText += result + ' ';
                        utility.log('🔊 You said (VD):', result);
                        isStopped = true;
                        recognition.stop();
                    };
                    recognition.onend = () => {
                        utility.log('🛑 Recognition ended (VD), Final text:', detectedText.trim());
                        if (detectedText.trim().length > 0) {
                            utility.log('⬆️ Uploading VD blob (Web Speech)');
                            self.ufmTrigger('VD', 275, blob);
                        }
                        else {
                            utility.log('🚫 No speech detected (Web Speech)');
                        }
                        if (!self.isAudioDetectionPaused) {
                            self.checkForAudioLevelsVdInBrowser(mediaStream);
                        }
                    };
                    recognition.onerror = (e) => {
                        utility.error('⚠️ SpeechRecognition error:', e.error);
                        if (!self.isAudioDetectionPaused) {
                            self.checkForAudioLevelsVdInBrowser(mediaStream);
                        }
                    };
                    recognition.start();
                }
                // ✅ CASE 2: If Web Speech API is NOT available, use Google Speech API
                else {
                    const data = {
                        config: {
                            encoding: 'WEBM_OPUS',
                            sampleRateHertz: 48000,
                            languageCode: ui.translations.language_code.langCode,
                            audio_channel_count: 2,
                        },
                        audio: {
                            content: base64Audio,
                        },
                    };
                    fetch(configrationManager.speechUrl, {
                        method: 'POST',
                        body: JSON.stringify(data),
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    })
                        .then((response) => response.json())
                        .then((res) => {
                        const transcript = res?.results?.[0]?.alternatives?.[0]?.transcript || '';
                        utility.log('🧠 Google API transcript:', transcript);
                        if (transcript.trim().length > 0) {
                            utility.log('⬆️ Uploading VD blob (Google API)');
                            self.ufmTrigger('VD', 275, blob);
                        }
                        else {
                            utility.log('🚫 No speech detected via Google API (VD)');
                        }
                        if (!self.isAudioDetectionPaused) {
                            self.checkForAudioLevelsVdInBrowser(mediaStream);
                        }
                    })
                        .catch((err) => {
                        utility.error('❌ Google Speech API Error:', err);
                        if (!self.isAudioDetectionPaused) {
                            self.checkForAudioLevelsVdInBrowser(mediaStream);
                        }
                    });
                }
            };
        };
        // ⏱️ Start recording for 10 seconds
        chunks.length = 0;
        mediaRecorder.start();
        setTimeout(() => {
            if (mediaRecorder.state !== 'inactive') {
                mediaRecorder.stop();
            }
        }, 10000);
    }
    pausedExam() {
        examCameraUi.isExamPaused = true;
        this.isAudioDetectionPaused = true;
        this.isBlurListenerAdded = true;
        this.aiStarted = false;
        examCameraUi.stopAiMonitoring();
        chat.sendData('stop_monitor_ai', 'stop monitor ai');
        utility.log('⏸️ Audio detection paused.');
    }
    playExam() {
        examCameraUi.isExamPaused = false;
        this.isAudioDetectionPaused = false;
        this.isBlurListenerAdded = false;
        chat.sendData('start_monitor_ai', 'start monitor ai');
        examCameraUi.playAllUfm();
        this.startExamWithSFL();
        examCameraUi.startInternalCamAI();
        utility.log('▶️ Audio detection resumed.');
    }
    stopAI() {
        ai.stopExamination((message) => { });
    }
    takeSnapshots_sfl(video, saveActivity, takeReturn) {
        const canvas = document.createElement('canvas');
        canvas.width = 1024;
        canvas.height = 576;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
            throw new Error('Unable to get canvas context');
        }
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataURI = canvas.toDataURL('image/jpeg', 0.8);
        return dataURI;
    }
    /**
     *
     */
    result() {
        return this.resultData;
    }
    screenRevoke() {
        this.permissionRevoke(282);
        this.aiStarted = false;
        examCameraUi.stopAiMonitoring();
        chat.sendData('stop_monitor_ai', 'stop monitor ai');
    }
    cameraRevoke() {
        if (LiveStreamManager.PRIMARY_CAMERA_NAME != 'P_CAM') {
            this.manager().closeApplication();
            return;
        }
        chat.sendData('cam_disconnect', 'camera disconnect');
        if (LiveStreamManager.CAMERA.PRIMARY.stream == null) {
            this.permissionRevoke(281);
            // ✅ Added section — show fallback image under video
            const videoEl = ui.id('thinkX_cameraVideo');
            if (videoEl) {
                ui.show(ui.id('thinkX_cameraDisconnect'));
                videoEl.classList.add('d-none');
            }
        }
        let self = this;
        let cameraName = examCameraUi.getRevokeCameraName();
        utility.log(cameraName, 'camera revoke alert show');
        if (this.cameraRevokePopup == null && cameraName != '') {
            if (cameraName != '' &&
                LiveStreamManager.CAMERA[cameraName].external == false &&
                LiveStreamManager.CAMERA[cameraName].stream == null) {
                this.camType = LiveStreamManager.CAMERA[cameraName].name;
                if (cameraName == 'SIDE' && cameraName != configrationManager.reCameraRevoke) {
                    this.permissionRevoke(280);
                }
                else if (cameraName == 'BACK' && cameraName != configrationManager.reCameraRevoke) {
                    this.permissionRevoke(279);
                }
                else if (cameraName == 'FRONT' && cameraName != configrationManager.reCameraRevoke) {
                    this.permissionRevoke(277);
                }
                else if (cameraName == 'CUSTOM' && cameraName != configrationManager.reCameraRevoke) {
                    this.permissionRevoke(280);
                }
                if (cameraName == configrationManager.reCameraRevoke) {
                    configrationManager.reCameraRevoke = '';
                }
                examCameraUi.camType = this.camType;
                examCameraUi.stopSnap(this.camType);
                examCameraUi.stopRecording(this.camType);
                this.aiStarted = false;
                examCameraUi.stopAiMonitoring();
                chat.sendData('stop_monitor_ai', 'stop monitor ai');
                const envAlias = examCameraUi.getQrStepName();
                const headingKey = examCameraUi.retryHeadingName();
                const messageKey = examCameraUi.retryMessageName();
                this.cameraRevokePopup = ui.alertDialog(ui.translations.popup_text[headingKey], ui.translations.popup_text[messageKey], ui.translations.popup_buttons.retry, function (dialog) {
                    ui.remove(dialog);
                    self.cameraRevokePopup = null;
                    examCameraUi.showQrPage(examCameraUi.cameraAllowClick, envAlias, self.camType);
                });
            }
            else {
                this.aiStarted = false;
                examCameraUi.stopAiMonitoring();
                chat.sendData('stop_monitor_ai', 'stop monitor ai');
            }
        }
        else {
            this.aiStarted = false;
            examCameraUi.stopAiMonitoring();
            chat.sendData('stop_monitor_ai', 'stop monitor ai');
        }
    }
    subscribeSocketEvent() {
        let self = this;
        this.subscribe(SDK_EVENT.SECOND_STREAM, function (user_name, stream) {
            const cameraName = utility.getCameraNameInUserSocket(user_name);
            examCameraUi.camType = cameraName;
            examCameraUi.setRoomStream(stream, 0); // If stream is comming from the mobile then stop AI in desktop and only show stream on Desktop UI.
            liveStreamManager.updateCameraSetupStream(stream, cameraName);
            examCameraUi.hideCameraSelectPage(cameraName);
            chat.sendData('cam_reconnect', 'camera reconnect');
        });
        this.subscribe(SDK_EVENT.SECOND_STREAM_DISCONNET, function (user_name) {
            utility.log('second stream disconnected', user_name);
            const cameraName = utility.getCameraNameInUserSocket(user_name);
            if (cameraName == 'S_CAM') {
                self.permissionRevoke(280);
            }
            else if (cameraName == 'B_CAM') {
                self.permissionRevoke(279);
            }
            else if (cameraName == 'F_CAM') {
                self.permissionRevoke(277);
            }
            else if (cameraName == 'C_CAM') {
                self.permissionRevoke(280);
            }
            examCameraUi.camType = cameraName;
            const headingKey = examCameraUi.retryHeadingName();
            const messageKey = examCameraUi.retryMessageName();
            const keyName = examCameraUi.checkExternalCamStream();
            if (!keyName || !LiveStreamManager.CAMERA[keyName]) {
                console.warn('Invalid camera key:', keyName, examCameraUi.camType);
                return;
            }
            LiveStreamManager.CAMERA[keyName].stream = null;
            chat.sendData('cam_disconnect', 'camera disconnect');
            if (self.cameraRevokePopup == null) {
                if (LiveStreamManager.CAMERA[keyName].external == true &&
                    LiveStreamManager.CAMERA[keyName].stream == null) {
                    LiveStreamManager.CAMERA[keyName].external = false;
                    utility.log('camera revoke alert show_652', cameraName);
                    examCameraUi.stopSnap(cameraName);
                    examCameraUi.stopRecording(cameraName);
                    examCameraUi.stopAiMonitoring();
                    chat.sendData('stop_monitor_ai', 'stop monitor ai');
                    chat.sendData('cam_disconnect', 'camera disconnect');
                    const envAlias = examCameraUi.getQrStepName();
                    self.cameraRevokePopup = ui.alertDialog(ui.translations.popup_text[headingKey], ui.translations.popup_text[messageKey], ui.translations.popup_buttons.retry, function (dialog) {
                        ui.remove(dialog);
                        self.cameraRevokePopup = null;
                        examCameraUi.showQrPage(examCameraUi.cameraAllowClick, envAlias, cameraName);
                    });
                }
            }
            else {
                if (LiveStreamManager.CAMERA[keyName].external == true &&
                    LiveStreamManager.CAMERA[keyName].stream == null) {
                    LiveStreamManager.CAMERA[keyName].external = false;
                    utility.log('camera revoke alert show_682', cameraName);
                }
            }
        });
        this.subscribe(SDK_EVENT.RECEIVE_MESSAGE, function (user_name, message) {
            const cameraName = utility.getCameraNameInUserSocket(user_name);
            examCameraUi.modeSelector(message.mode, message, cameraName);
        });
        this.subscribe(SDK_EVENT.CHAT_MESSAGE, function (user_name, message) {
            const cameraName = utility.getCameraNameInUserSocket(user_name);
            self.roomSocketmode(message.mode, message.text, message, user_name, cameraName);
        });
    }
    roomSocketmode(mode, text, message, from, cameraName) {
        switch (mode) {
            case 'stop_monitor_ai':
                examCameraUi.stopAiMonitoring();
                break;
            case 'start_monitor_ai':
                examCameraUi.externalCameraMonitoring();
                examCameraUi.startExternalSnapAndRecording();
                break;
            case 'proctor_peer_close':
                peer.close(from);
                chatUi.removeAudioTrackAdded(from);
                break;
            case 'proctor_suspend_trigger':
                this.checkSessionStatus();
                break;
            case 'proctor_terminate_trigger':
                if (LiveStreamManager.PRIMARY_CAMERA_NAME == 'P_CAM') {
                    this.terminatePopup();
                }
                break;
            case "secondary_ufm":
                if (LiveStreamManager.PRIMARY_CAMERA_NAME == 'P_CAM') {
                    ai.getSmartProctorUFM(message.data);
                }
                break;
            case "close_additional_camera":
                this.closeAdditionalCamera();
                break;
            case "primary_escalate":
                if (LiveStreamManager.PRIMARY_CAMERA_NAME == 'P_CAM') {
                    this.userEscalted();
                }
                break;
            default:
                console.log('Unknown mode:', mode);
        }
    }
    closeAdditionalCamera() {
        if (LiveStreamManager.PRIMARY_CAMERA_NAME != 'P_CAM') {
            this.manager().closeApplication();
            // utility.log(new Error("Testing close"));
            utility.log('close');
        }
    }
    micRevoke() {
        this.permissionRevoke(278);
        this.aiStarted = false;
        examCameraUi.stopAiMonitoring();
        chat.sendData('stop_monitor_ai', 'stop monitor ai');
    }
    permissionRevoke(code) {
        utility.log(code, "code print");
        if (configrationManager.valueMap.ufm.data.PR.value == 1) {
            this.ufmTrigger('PR', code);
        }
    }
    ufmTrigger(ufmType, code = 0, blob) {
        try {
            let codeArr = null;
            if (code != 0) {
                codeArr = [code];
            }
            const response = examCameraUi.ufm.log(ufmType, this.envAlias, 1, 'P_CAM', blob, codeArr);
            utility.log(`${ufmType} UFM uploaded successfully`, response);
        }
        catch (error) {
            utility.log(`❌ ${ufmType} UFM upload failed`, error);
        }
    }
    terminatePopup() {
        ui.hide(ui.id('thinkX_suspendPopup'));
        utility.wait(500).then(() => {
            events.trigger(EVENT.TERMINATE_EXAM);
        });
        if (this.suspendCountdownTimer) {
            clearInterval(this.suspendCountdownTimer);
            this.suspendCountdownTimer = null;
        }
        const popup = ui.id('thinkX_terminatePopup');
        // If popup is already visible, don't re-open
        if (popup && popup.style.display !== 'none' && popup.offsetParent !== null) {
            utility.log('Terminate popup is already open. Skipping...');
            return;
        }
        this.pausedExam();
        ui.show(popup);
        this.terminateExam();
    }
    suspendPopup(response) {
        const { suspendTime, current_credit_score } = response.data;
        this.suspendCountdown(suspendTime * 60);
    }
    suspendCountdown(suspendTime) {
        utility.wait(500).then(() => {
            events.trigger(EVENT.SUSPEND_EXAM, suspendTime);
        });
        const popup = ui.id('thinkX_suspendPopup');
        // If popup is already visible, don't re-open
        if (popup && popup.style.display !== 'none' && popup.offsetParent !== null) {
            utility.log('Suspend popup is already open. Skipping...');
            return;
        }
        this.pausedExam();
        ui.show(popup);
        const suspendResumeBtn = ui.id('thinkX_suspend_resume');
        if (suspendResumeBtn) {
            ui.addClass(suspendResumeBtn, 'thinkproc-disable');
        }
        let remainingSeconds = suspendTime;
        const circle = document.getElementById('thinkproc_suspend_count');
        const timeText = document.getElementById('thinkX_suspendMin');
        const formatTime = (totalSeconds) => {
            const m = Math.floor(totalSeconds / 60)
                .toString()
                .padStart(2, '0');
            const s = (totalSeconds % 60).toString().padStart(2, '0');
            return `${m}:${s}`;
        };
        const totalSeconds = remainingSeconds;
        const updateUI = () => {
            if (!circle || !timeText)
                return;
            timeText.textContent = formatTime(remainingSeconds);
            const percent = (remainingSeconds / totalSeconds) * 100;
            circle.style.setProperty('--thinkproc_suspend_count', percent.toString());
        };
        updateUI();
        if (this.suspendCountdownTimer) {
            clearInterval(this.suspendCountdownTimer);
            this.suspendCountdownTimer = null;
        }
        this.suspendCountdownTimer = setInterval(() => {
            remainingSeconds -= 1;
            if (remainingSeconds <= 0) {
                clearInterval(this.suspendCountdownTimer);
                this.suspendCountdownTimer = null;
                if (timeText)
                    timeText.textContent = '00:00';
                if (suspendResumeBtn) {
                    ui.removeClass(suspendResumeBtn, 'thinkproc-disable');
                }
                this.checkSessionStatus();
                this.suspendResume();
                return;
            }
            updateUI();
        }, 1000);
    }
    async checkSessionStatus() {
        examCameraUi.ufm
            .checkSessionStatus(this.envAlias)
            .then((response) => {
            utility.log('✅ Session status checked successfully', response);
            const { remaining_time } = response.data;
            if (response.code === 2312) {
                this.suspendCountdown(remaining_time);
            }
            if (response.data.proctor_found && response.data.proctor_user_name) {
                socket.setProctor(response.data.proctor_user_name);
                if (remaining_time > 0 && remaining_time <= 60) {
                    chat.sendData('candidate_going_timer', remaining_time);
                }
                else if (remaining_time > 60) {
                    let nextRemindTime = remaining_time - 60;
                    if (this.assignNewProctorTimer !== null) {
                        clearInterval(this.assignNewProctorTimer);
                    }
                    this.assignNewProctorTimer = setInterval(() => {
                        if (nextRemindTime > 0) {
                            nextRemindTime -= 1;
                        }
                        else {
                            if (this.assignNewProctorTimer !== null) {
                                clearInterval(this.assignNewProctorTimer);
                            }
                            chat.sendData('candidate_going_timer', 60);
                        }
                    }, 1000);
                }
                if (remaining_time != -1) {
                    if (remaining_time > 0) {
                        console.log("Remaining Time", remaining_time);
                        this.checkStatusTimeout(remaining_time);
                    }
                    else {
                        this.checkStatusTimeout(20);
                    }
                }
                else {
                    if (this.proctorAssignTimeout != null) {
                        clearTimeout(this.proctorAssignTimeout);
                    }
                }
            }
            if (response.code === 2901) {
                this.checkStatusTimeout(20);
            }
        })
            .catch((error) => {
            utility.log('❌ Failed to check session status', error);
        });
    }
    checkStatusTimeout(time) {
        if (this.proctorAssignTimeout != null) {
            clearTimeout(this.proctorAssignTimeout);
        }
        this.proctorAssignTimeout = setTimeout(() => {
            this.checkSessionStatus();
        }, time * 1000);
    }
    /**
     *
     */
    screenRevokeRetry() {
        this.start();
        //examCameraUi.playAllUfm();
        chat.sendData('start_monitor_ai', 'start monitor ai');
    }
    /**
     *
     */
    cameraRevokeRetry() {
        if (configrationManager.image_recording == 1) {
            regularSnap.takeSnapImage(LiveStreamManager.CAMERA.PRIMARY);
        }
        if (configrationManager.video_recording == 1 && this.recordingCamStarted == false) {
            liveStreamManager.record(LiveStreamManager.CAMERA.PRIMARY);
            this.recordingCamStarted = true;
        }
        //examCameraUi.playAllUfm();
        chat.sendData('start_monitor_ai', 'start monitor ai');
        this.start();
        chat.sendData('cam_reconnect', 'camera reconnect');
        examCameraUi.primaryCameraAiMonitoring();
    }
    /**
     *
     */
    micRevokeRetry() {
        //examCameraUi.playAllUfm();
        chat.sendData('start_monitor_ai', 'start monitor ai');
        this.start();
    }
    saveSmartProctorMsg(response) {
        request
            .sendChat({
            is_message: 1,
            message: response.message,
            environment: configrationManager.currentStepAlias,
            userType: 'Smart Proctor',
        })
            .then(() => {
            chatUi.showMessages();
        })
            .catch((err) => {
            utility.log('Message send failed:', err);
        });
    }
    userEscalted() {
        let self = this;
        if (configrationManager.userEscaltedPara == 1) {
            let msg = { mode: 'update_escalation', text: "update escaltion" };
            socket.sendRoomMessage(msg);
            configrationManager.userEscaltedPara = 2;
        }
        if (LiveStreamManager.PRIMARY_CAMERA_NAME == 'P_CAM') {
            self.checkSessionStatus();
        }
        else {
            let msg = { mode: 'primary_escalate', text: "primary escalate" };
            socket.sendRoomMessage(msg);
        }
    }
}
new ExamMonitor();

// Import styles (if you're using bundler that supports CSS)
const ThinkProctor = {
    async init(options) {
        configrationManager.liveStreamManager = liveStreamManager;
        // utility.log('ThinkProc initialized with', options);
        const validatePromise = new Promise(async (resolve, revoke) => {
            authenticator.validate(options, async (response) => {
                if (configrationManager.initComplete === 1) {
                    const error = errorManager.throwError('ERROR', 'ALREADY_INITIALIZE_INIT');
                    revoke(error);
                    return;
                }
                const sessionInfo = response.sessionInfo;
                configrationManager.initComplete = 1;
                resolve(sessionInfo);
            }, (error) => {
                revoke(error);
            });
        });
        return validatePromise;
    },
    on(event, fn) {
        events.register(event, fn);
    },
    async checkCompatibility() {
        return new Promise(async (resolve, reject) => {
            try {
                if (configrationManager.initComplete !== 1) {
                    const error = errorManager.throwError('ERROR', 'NOT_INITIALIZE_INIT');
                    reject(error);
                    return;
                }
                if (configrationManager.compatibilityComplete === 1) {
                    const error = errorManager.throwError('ERROR', 'ALREADY_INITIALIZE_COMPATIBILITY');
                    reject(error);
                    return;
                }
                if (configrationManager.compatibilityStarted === 1) {
                    const error = errorManager.throwError('ERROR', 'ALREADY_INITIALIZE_COMPATIBILITY');
                    reject(error);
                    return;
                }
                stepManager.init();
                ai.loaddata();
                liveStreamManager.setCameraRevokeRetryCallback(function () {
                    stepManager.getCurrentStepObject().cameraRevokeRetry();
                });
                liveStreamManager.setMicRevokeRetryCallback(function () {
                    stepManager.getCurrentStepObject().micRevokeRetry();
                });
                liveStreamManager.setCameraRevokeCallback(function () {
                    stepManager.getCurrentStepObject().cameraRevoke();
                });
                liveStreamManager.setMicRevokeCallback(function () {
                    stepManager.getCurrentStepObject().micRevoke();
                });
                liveStreamManager.setScreenRevokeCallback(function () {
                    stepManager.getCurrentStepObject()?.screenRevoke();
                });
                liveStreamManager.setScreenRevokeRetryCallback(function () {
                    stepManager.getCurrentStepObject()?.screenRevokeRetry();
                });
                configrationManager.compatibilityStarted = 1;
                configrationManager.compatibilityCompleteCallback = resolve;
            }
            catch (err) {
                reject('Some error occured');
                utility.error(err);
            }
        });
    },
    async launch() {
        try {
            if (configrationManager.initComplete !== 1) {
                errorManager.throwError('ERROR', 'NOT_INITIALIZE_INIT');
            }
            if (configrationManager.compatibilityComplete !== 1) {
                errorManager.throwError('ERROR', 'NOT_INITIALIZE_COMPATIBILITY');
            }
            if (configrationManager.launchComplete === 1) {
                errorManager.throwError('ERROR', 'ALREADY_INITIALIZE_LAUNCH');
            }
            configrationManager.launchComplete = 1;
            regularSnap.stopRegularSnapForCamera(LiveStreamManager.CAMERA.PRIMARY.name);
            if (LiveStreamManager.CAMERA.SIDE.external) {
                let socketUserName = utility.addPrefix(configrationManager.socketUserName, 'S_CAM');
                let message = { mode: 'end_lobby', text: 'lobby end' };
                socket.sendMessage(socketUserName, message);
            }
            if (LiveStreamManager.CAMERA.BACK.external) {
                let socketUserName = utility.addPrefix(configrationManager.socketUserName, 'B_CAM');
                let message = { mode: 'end_lobby', text: 'lobby end' };
                socket.sendMessage(socketUserName, message);
            }
            if (LiveStreamManager.CAMERA.FRONT.external) {
                let socketUserName = utility.addPrefix(configrationManager.socketUserName, 'F_CAM');
                let message = { mode: 'end_lobby', text: 'lobby end' };
                socket.sendMessage(socketUserName, message);
            }
            if (LiveStreamManager.CAMERA.CUSTOM.external) {
                let socketUserName = utility.addPrefix(configrationManager.socketUserName, 'C_CAM');
                let message = { mode: 'end_lobby', text: 'lobby end' };
                socket.sendMessage(socketUserName, message);
            }
            lobby.end(0);
        }
        catch (error) {
            utility.error(error);
        }
    },
    complete() {
        return new Promise((resolve, reject) => {
            try {
                if (configrationManager.initComplete !== 1) {
                    return reject(errorManager.throwError('ERROR', 'NOT_INITIALIZE_INIT'));
                }
                if (configrationManager.compatibilityComplete !== 1) {
                    return reject(errorManager.throwError('ERROR', 'NOT_INITIALIZE_COMPATIBILITY'));
                }
                if (configrationManager.launchComplete !== 1) {
                    return reject(errorManager.throwError('ERROR', 'ALREADY_INITIALIZE_LAUNCH'));
                }
                if (configrationManager.isPaused === true) {
                    return resolve(false); // or just resolve() if you don't care
                }
                let obj = stepManager.getCurrentStepObject();
                if (obj instanceof ExamMonitor) {
                    obj.completeExam();
                }
                configrationManager.completeExam = resolve;
            }
            catch (err) {
                reject(err);
            }
        });
    },
    pause() {
        if (configrationManager.initComplete !== 1) {
            errorManager.throwError('ERROR', 'NOT_INITIALIZE_INIT');
        }
        if (configrationManager.compatibilityComplete !== 1) {
            errorManager.throwError('ERROR', 'NOT_INITIALIZE_COMPATIBILITY');
        }
        if (configrationManager.launchComplete !== 1) {
            errorManager.throwError('ERROR', 'ALREADY_INITIALIZE_LAUNCH');
        }
        if (configrationManager.isPaused === true) {
            return false;
        }
        configrationManager.isPaused = true;
        utility.wait(500).then(() => {
            events.trigger(EVENT.PAUSED_EXAM);
        });
        let obj = stepManager.getCurrentStepObject();
        if (obj instanceof ExamMonitor) {
            obj.pausedExam();
        }
    },
    play() {
        if (configrationManager.isPaused === false) {
            errorManager.throwError('ERROR', 'ALREADY_PLAY');
        }
        configrationManager.isPaused = false;
        utility.wait(500).then(() => {
            events.trigger(EVENT.PLAY_EXAM);
        });
        let obj = stepManager.getCurrentStepObject();
        if (obj instanceof ExamMonitor) {
            obj.playExam();
        }
    },
    async secondaryConnect(session_token, camera, step, current_env_alias, link_data) {
        configrationManager.liveStreamManager = liveStreamManager;
        return authenticator.secondaryCameraConnect(session_token, camera, step, current_env_alias, link_data);
    },
    config() {
        utility.log('Config:', configrationManager);
    },
    joinRoom(roomId) {
        socket.joinOtherRoom(roomId);
        sdkEvents.on(SDK_EVENT.CHAT_MESSAGE, (user, message) => {
            utility.log(`Chat message from ${user}:`, message);
        });
    },
    leaveRoom() {
        socket.leaveRoom();
    },
    sendRoomMessage(message) {
        socket.sendRoomMessage(message);
    },
};

export { ThinkProctor as default };
