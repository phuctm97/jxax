import { applicationProcesses } from 'jxax/core/processes';

const $ = Application('System Preferences');
const p = applicationProcesses[$.name()];
const w = p.windows[0];

export default {
    window: w,
    activate: function () {
        $.activate();
    },
    showPane: function (name) {
        $.currentPane = $.panes.byName(name);
    },
    setAppearance: function (value) {
        w.uiElements.whose({ role: 'AXCheckBox', subrole: 'AXToggle', name: value })[0].click();
    },
    setAccentColor: function (value) {
        w.uiElements.whose({ role: 'AXCheckBox', subrole: 'AXToggle', name: value })[0].click();
    }
}
