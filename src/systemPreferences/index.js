const systemEvents = Application('System Events');
const $ = Application('System Preferences');
const p = systemEvents.applicationProcesses[$.name()];
const w = p.windows[0];

export default {
    window: w,
    activate: function () {
        $.activate();
    },
    showPane: function (name) {
        $.currentPane = $.panes.whose({ name })[0];
    }
}
