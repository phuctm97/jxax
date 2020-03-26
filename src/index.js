import systemPreferences from 'jxax/systemPreferences';

systemPreferences.activate();
systemPreferences.navigate('General');
systemPreferences.appearance = 'Dark';
systemPreferences.accentColor = 'Blue';
systemPreferences.highlightColor = 'Blue';
systemPreferences.sidebarIconSize = 'Small';

console.log(JSON.stringify({
    appearance: systemPreferences.appearance,
    accentColor: systemPreferences.accentColor,
    highlightColor: systemPreferences.highlightColor,
    sidebarIconSize: systemPreferences.sidebarIconSize
}, null, 2));
