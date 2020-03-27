import colors from 'ansi-colors';
import systemPreferences from 'jxax/systemPreferences';
// import { chooseFile } from 'jxax/core/userInteraction';
// import { read } from 'jxax/core/files';

// const jsonFile = chooseFile({
//     withPrompt: 'Choose your JSON configuration file',
//     ofType: ['public.json']
// });
// const json = read(jsonFile);
// console.log(json);

systemPreferences.activate();
systemPreferences.navigate('General');
// systemPreferences.appearance = 'Dark';
// systemPreferences.accentColor = 'Blue';
// systemPreferences.highlightColor = 'Blue';
// systemPreferences.sidebarIconSize = 'Small';
// systemPreferences.autoHideMenuBar = false;
// systemPreferences.showScrollBars = 'Automatically based on mouse or trackpad';
// systemPreferences.clickScrollBar = 'Jump to the next page';
// systemPreferences.defaultWebBrowser = 'Safari';
// systemPreferences.askWhenClosingDocuments = false;
// systemPreferences.closeWindowsWhenQuttingApp = true;
// systemPreferences.recentItems = 0;
// systemPreferences.allowHandoff = true;
// systemPreferences.useFontSmoothing = true;

console.log(colors.bold.whiteBright(`${colors.greenBright('✔')} Applied settings:`));
console.log(colors.dim(JSON.stringify({
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
}, null, 2)));
systemPreferences.quit();
