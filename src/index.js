import systemPreferences from 'jxax/systemPreferences';

systemPreferences.activate();
systemPreferences.navigate('General');
systemPreferences.appearance = 'Dark';
systemPreferences.accentColor = 'Blue';

console.log(JSON.stringify({
    appearance: systemPreferences.appearance,
    accentColor: systemPreferences.accentColor,
    highlightColor: systemPreferences.highlightColor
}, null, 2));
systemPreferences.quit();
