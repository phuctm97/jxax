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
    get appearance() {
        return w.uiElements.whose({
            role: 'AXCheckBox',
            subrole: 'AXToggle',
            value: 1,
            _or: [
                { name: 'Light' },
                { name: 'Dark' },
                { name: 'Auto' }
            ]
        })[0].name();
    },
    set appearance(value) {
        w.uiElements.whose({ role: 'AXCheckBox', subrole: 'AXToggle', name: value })[0]
            .actions['AXPress'].perform();
    },
    get accentColor() {
        return w.uiElements.whose({
            role: 'AXCheckBox',
            subrole: 'AXToggle',
            value: 1,
            _or: [
                { name: 'Blue' },
                { name: 'Purple' },
                { name: 'Pink' },
                { name: 'Red' },
                { name: 'Orange' },
                { name: 'Yellow' },
                { name: 'Green' },
                { name: 'Graphite' },
                { name: 'Other' }
            ]
        })[0].name();
    },
    set accentColor(value) {
        w.uiElements.whose({ role: 'AXCheckBox', subrole: 'AXToggle', name: value })[0]
            .actions['AXPress'].perform();
    }
}
