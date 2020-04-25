import { isUndefined, isObject } from 'lodash';
import { join } from '@utils';
import { createStepper } from '@core/workflow';
import sysEvents from '@core/sysEvents';
import { selectPopUpButton, selectCheckbox } from '@core/uiAutomation';
import runInSysPrefs from '@apps/sysprefs/app';

const ScreenEdges = {
  BOTTOM: 'bottom',
  LEFT: 'left',
  RIGHT: 'right',
};

const MinimizeEffects = {
  GENIE: 'genie',
  SCALE: 'scale',
};

const TabsWhenOpeningDocumentsPreferences = {
  ALWAYS: 'always',
  IN_FULL_SCREEN_ONLY: 'inFullScreenOnly',
  MANUALLY: 'manually',
};

const DoubleClickTitleBarActions = {
  NONE: 'none',
  ZOOM: 'zoom',
  MINIMIZE: 'minimize',
};

// Map tabsWhenOpeningDocumentsPreferences input values to query values.
const tabsWhenOpeningDocumentsPreferencesMap = {
  [TabsWhenOpeningDocumentsPreferences.ALWAYS]: 'Always',
  [TabsWhenOpeningDocumentsPreferences.IN_FULL_SCREEN_ONLY]: 'In Full Screen Only',
  [TabsWhenOpeningDocumentsPreferences.MANUALLY]: 'Manually',
};

function run(settings, opts = {}) {
  const {
    size,
    magnification,
    magnificationSize,
    location,
    minimizeEffect,
    preferTabsWhenOpeningDocuments,
    doubleClickTitleBar,
    minimizeToAppIcon,
    animate,
    autohide,
    showOpenIndicators,
    showRecentApps,
  } = settings;

  return runInSysPrefs('Dock', ({ window }) => {
    const stepper = createStepper(opts);

    stepper.addStep('set dock size', !isUndefined(size),
      () => {
        sysEvents.dockPreferences.dockSize = size;
      });
    stepper.addStep('set magnification', !isUndefined(magnification),
      () => {
        sysEvents.dockPreferences.magnification = magnification;
      });
    stepper.addStep('set magnification size', !isUndefined(magnificationSize),
      () => {
        sysEvents.dockPreferences.magnificationSize = magnificationSize;
      });
    stepper.addStep('set location', !isUndefined(location),
      () => {
        sysEvents.dockPreferences.screenEdge = location;
      });
    stepper.addStep('set minimization effect', !isUndefined(minimizeEffect),
      () => {
        sysEvents.dockPreferences.minimizeEffect = minimizeEffect;
      });
    stepper.addStep('set tabs when opening documents preferences',
      !isUndefined(preferTabsWhenOpeningDocuments),
      () => {
        selectPopUpButton(window, { description: 'prefer tabs options' },
          tabsWhenOpeningDocumentsPreferencesMap[preferTabsWhenOpeningDocuments]);
      });
    stepper.addStep('set double-click windows\' title bar action',
      !isUndefined(doubleClickTitleBar),
      () => {
        const checkboxQ = { name: 'Double-click a window’s title bar to' };
        if (doubleClickTitleBar === DoubleClickTitleBarActions.NONE) {
          selectCheckbox(window, checkboxQ, false);
        } else {
          selectCheckbox(window, checkboxQ, true);
          selectPopUpButton(window, { description: 'double click options' }, doubleClickTitleBar);
        }
      });
    stepper.addStep('set minimize windows action', !isUndefined(minimizeToAppIcon),
      () => {
        selectCheckbox(window, { name: 'Minimize windows into application icon' }, minimizeToAppIcon);
      });
    stepper.addStep('set animate', !isUndefined(animate),
      () => {
        sysEvents.dockPreferences.animate = animate;
      });
    stepper.addStep('set autohide', !isUndefined(autohide),
      () => {
        sysEvents.dockPreferences.autohide = autohide;
      });
    stepper.addStep('set show indicators for open applications',
      !isUndefined(showOpenIndicators),
      () => {
        selectCheckbox(window, { name: 'Show indicators for open applications' }, showOpenIndicators);
      });
    stepper.addStep('set show recent apps', !isUndefined(showRecentApps),
      () => {
        selectCheckbox(window, { name: 'Show recent applications in Dock' }, showRecentApps);
      });

    return stepper.run();
  });
}

function inclusion(vals) {
  return {
    within: isObject(vals) ? Object.values(vals) : vals,
    message: `is invalid, must be within [${join(vals)}]`,
  };
}

/**
 * Configure System Preferences Dock command.
 */
const configureDock = {
  description: 'Configure System Preferences/Dock',
  run,
  args: {
    size: {
      numericality: {
        noStrings: true,
        greaterThanOrEqualTo: 0,
        lessThanOrEqualTo: 1,
      },
      description: 'Size/height of the items (between 0.0 (minimum) and 1.0 (maximum))',
    },
    magnification: {
      type: 'boolean',
      description: 'Is magnification on or off?',
    },
    magnificationSize: {
      numericality: {
        noStrings: true,
        greaterThanOrEqualTo: 0,
        lessThanOrEqualTo: 1,
      },
      description: 'Maximum magnification size when magnification is on (between 0.0 (minimum) and 1.0 (maximum))',
    },
    location: {
      inclusion: inclusion(ScreenEdges),
      description: 'Location on screen',
    },
    minimizeEffect: {
      inclusion: inclusion(MinimizeEffects),
      description: 'Minimization effect',
    },
    preferTabsWhenOpeningDocuments: {
      inclusion: inclusion(TabsWhenOpeningDocumentsPreferences),
      description: 'Prefer tabs when opening documents',
    },
    doubleClickTitleBar: {
      inclusion: inclusion(DoubleClickTitleBarActions),
      description: 'Double-click window\'s title bar to',
    },
    minimizeToAppIcon: {
      type: 'boolean',
      description: 'Minimize windows to application icon',
    },
    animate: {
      type: 'boolean',
      description: 'Is the animation of opening applications on or off?',
    },
    autohide: {
      type: 'boolean',
      description: 'Is autohiding the dock on or off?',
    },
    showOpenIndicators: {
      type: 'boolean',
      description: 'Show indicators for opening applications',
    },
    showRecentApps: {
      type: 'boolean',
      description: 'Show recent applications in Dock',
    },
  },
};

export default configureDock;
