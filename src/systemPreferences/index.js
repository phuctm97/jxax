const systemPreferences = Application("System Preferences");

export function activate() {
    systemPreferences.activate();
}

export function showPane(name) {
    systemPreferences.currentPane = systemPreferences.panes.whose({ name })[0];
}
