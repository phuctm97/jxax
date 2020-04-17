import { isUndefined, isNil } from 'lodash';
import { createStepper } from '@core/workflow';
import { selectTab, selectCheckbox } from '@core/uiAutomation';
import runInSysPrefs from '@apps/sysprefs/app';

export { default as validateConfigureSplotlight } from '@apps/sysprefs/spotlight/options';

/**
 * @typedef {import('./options').SysPrefsSpotlightSettings} SysPrefsSpotlightSettings
 */

/**
 * Configure _System Preferences/Spotlight_ settings.
 *
 * @param {SysPrefsSpotlightSettings} settings The settings object.
 * @param {object} opts Options.
 */
export function configureSpotlight(settings, opts = {}) {
  const { searchResults, allowSpotlightInLookup } = settings;

  return runInSysPrefs('Spotlight', ({ window }) => {
    const stepper = createStepper(opts);

    const tabGroup = window.tabGroups[0];
    if (!isNil(searchResults)) {
      // Select 'Search Results' tab.
      selectTab(tabGroup, 'Search Results');

      // Get all checkboxes' names.
      const area = tabGroup.scrollAreas[0].tables[0];
      const checkboxNames = area.rows.textFields.value().flat();

      // Match checkboxes.
      checkboxNames.forEach((name, index) => {
        if (searchResults.indexOf(name) !== -1) {
          stepper.addStep(`select ${name}`, true, () => {
            selectCheckbox(area.rows[index], 0, true);
          });
        } else {
          stepper.addStep(`deselect ${name}`, true, () => {
            selectCheckbox(area.rows[index], 0, false);
          });
        }
      });
    }

    stepper.addStep('set allow Spotlight Suggestions in Look up', !isUndefined(allowSpotlightInLookup), () => {
      selectCheckbox(tabGroup, 'Allow Spotlight Suggestions in Look up', allowSpotlightInLookup);
    });

    return stepper.run();
  });
}
