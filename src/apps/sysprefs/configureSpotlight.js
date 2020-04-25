import {
  isUndefined, isNil, isArray, isString, every,
} from 'lodash';
import { addCustomTypeValidation } from '@utils';
import { createStepper } from '@core/workflow';
import { selectTab, selectCheckbox } from '@core/uiAutomation';
import runInSysPrefs from '@apps/sysprefs/app';

function run(settings, opts = {}) {
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

addCustomTypeValidation('arrayOfString', 'must be an array of string',
  (values) => isArray(values) && every(values, isString));

/**
 * Configure System Preferences/Spotlight command.
 */
const configureSpotlight = {
  description: 'Configure System Preferences/Spotlight',
  run,
  args: {
    searchResults: {
      type: 'arrayOfString',
      description: 'The array of categories to be shown in Spotlight\'s search results',
    },
    allowSpotlightInLookup: {
      type: 'boolean',
      description: 'Allow Spotlight Suggestions in Look up',
    },
  },
};

export default configureSpotlight;
