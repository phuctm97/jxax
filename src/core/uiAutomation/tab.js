import { retry } from '@core/app';
import query from '@core/uiAutomation/query';

/**
 * Select a tab in a tab group.
 *
 * @param {object} tabGroup The tab group object.
 * @param {(number|string|object)} q The query to the tab.
 */
export default function selectTab(tabGroup, q) {
  return retry(() => {
    const tab = query(tabGroup.radioButtons, q, { postQ: { subrole: 'AXTabButton' } });

    // Check if the tab is already selected.
    if (tab.value() === 1) return;

    tab.actions.byName('AXPress').perform();
  });
}
