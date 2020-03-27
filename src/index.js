import systemPreferences from 'jxax/systemPreferences';

systemPreferences.activate();
systemPreferences.navigate('General');
systemPreferences.appearance = 'Dark';
systemPreferences.accentColor = 'Blue';
systemPreferences.highlightColor = 'Blue';
systemPreferences.sidebarIconSize = 'Small';
systemPreferences.autoHideMenuBar = false;
systemPreferences.showScrollBars = 'Automatically based on mouse or trackpad';
systemPreferences.clickScrollBar = 'Jump to the next page';
systemPreferences.defaultWebBrowser = 'Safari';
systemPreferences.askWhenClosingDocuments = false;
systemPreferences.closeWindowsWhenQuttingApp = true;
systemPreferences.recentItems = 0;
systemPreferences.allowHandoff = true;
systemPreferences.useFontSmoothing = true;

console.log(JSON.stringify({
    appearance: systemPreferences.appearance,
    accentColor: systemPreferences.accentColor,
    highlightColor: systemPreferences.highlightColor,
    sidebarIconSize: systemPreferences.sidebarIconSize,
    autoHideMenuBar: systemPreferences.autoHideMenuBar,
    showScrollBars: systemPreferences.showScrollBars,
    clickScrollBar: systemPreferences.clickScrollBar,
    defaultWebBrowser: systemPreferences.defaultWebBrowser,
    askWhenClosingDocuments: systemPreferences.askWhenClosingDocuments,
    closeWindowsWhenQuttingApp: systemPreferences.closeWindowsWhenQuttingApp,
    recentItems: systemPreferences.recentItems,
    allowHandoff: systemPreferences.allowHandoff,
    useFontSmoothing: systemPreferences.useFontSmoothing
}, null, 2));
systemPreferences.quit();
