import { applicationProcesses } from 'jxax/core/processes';

const $ = Application('System Preferences');
const p = applicationProcesses[$.name()];
const w = p.windows[0];

export default {
    window: w,
    activate: function () {
        $.activate();
    },
    navigate: function (pane) {
        $.currentPane = $.panes.byName(pane);
    },
    quit: function () {
        $.quit();
    },
    get appearance() {
        return w.checkboxes.whose({
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
        w.checkboxes.whose({ subrole: 'AXToggle', name: value })[0]
            .actions['AXPress'].perform();
    },
    get accentColor() {
        return w.checkboxes.whose({
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
        w.checkboxes.whose({ subrole: 'AXToggle', name: value })[0]
            .actions['AXPress'].perform();
    },
    get highlightColor() {
        return w.popUpButtons['Highlight color:'].value();
    },
    set highlightColor(value) {
        const popUpButton = w.popUpButtons['Highlight color:'];
        popUpButton.actions['AXShowMenu'].perform();
        popUpButton.menus[0].menuItems[value].actions['AXPress'].perform();
    }
}
