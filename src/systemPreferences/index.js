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
    },
    get sidebarIconSize() {
        return w.popUpButtons['Sidebar icon size:'].value();
    },
    set sidebarIconSize(value) {
        const popUpButton = w.popUpButtons['Sidebar icon size:'];
        popUpButton.actions['AXShowMenu'].perform();
        popUpButton.menus[0].menuItems[value].actions['AXPress'].perform();
    },
    get autoHideMenuBar() {
        return w.checkboxes['Automatically hide and show the menu bar'].value() !== 0;
    },
    set autoHideMenuBar(value) {
        if (this.autoHideMenuBar === value) return;
        w.checkboxes['Automatically hide and show the menu bar'].actions['AXPress'].perform();
    },
    get showScrollBars() {
        return w.radioGroups[1].radioButtons.whose({ value: 1 })[0].name();
    },
    set showScrollBars(value) {
        w.radioGroups[1].radioButtons[value].actions['AXPress'].perform();
    },
    get clickScrollBar() {
        return w.radioGroups[0].radioButtons.whose({ value: 1 })[0].name();
    },
    set clickScrollBar(value) {
        w.radioGroups[0].radioButtons[value].actions['AXPress'].perform();
    },
    get askWhenClosingDocuments() {
        return w.checkboxes['Ask to keep changes when closing documents'].value() !== 0;
    },
    set askWhenClosingDocuments(value) {
        if (this.askWhenClosingDocuments === value) return;
        w.checkboxes['Ask to keep changes when closing documents'].actions['AXPress'].perform();
    },
    get closeWindowsWhenQuttingApp() {
        return w.checkboxes['Close windows when quitting an app'].value() !== 0;
    },
    set closeWindowsWhenQuttingApp(value) {
        if (this.closeWindowsWhenQuttingApp === value) return;
        w.checkboxes['Close windows when quitting an app'].actions['AXPress'].perform();
    },
    get recentItems() {
        const v = w.popUpButtons.whose({ description: 'Recent Items' })[0].value();
        if (v === 'None') return 0;
        return parseInt(v);
    },
    set recentItems(value) {
        const v = value === 0 ? 'None' : value.toString();
        const popUpButton = w.popUpButtons.whose({ description: 'Recent Items' })[0];
        popUpButton.actions['AXShowMenu'].perform();
        popUpButton.menus[0].menuItems.byName(v).actions['AXPress'].perform();
    },
    get allowHandoff() {
        return w.checkboxes['Allow Handoff between this Mac and your iCloud devices'].value() !== 0;
    },
    set allowHandoff(value) {
        if (this.allowHandoff === value) return;
        w.checkboxes['Allow Handoff between this Mac and your iCloud devices'].actions['AXPress'].perform();
    },
    get useFontSmoothing() {
        return w.checkboxes['Use font smoothing when available'].value() !== 0;
    },
    set useFontSmoothing(value) {
        if (this.useFontSmoothing === value) return;
        w.checkboxes['Use font smoothing when available'].actions['AXPress'].perform();
    }
}
