import { isDevelopment } from '@util';
import { retry } from '@core/app';
import query, { isValidQuery, invalidQuery } from '@core/uiAutomation/query';

export default function selectToggle(parent, q) {
  if (isDevelopment()) {
    if (!isValidQuery(q)) throw new Error(invalidQuery({ q }));
  }

  return retry(() => {
    const toggle = query(parent.checkboxes, q, { preQ: { subrole: 'AXToggle' } });
    if (toggle.value() === 1) return;

    toggle.actions.byName('AXPress').perform();
  });
}
