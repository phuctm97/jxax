import systemPreferences from 'jxax/systemPreferences';

systemPreferences.activate();
systemPreferences.showPane('General');
systemPreferences.appearance = 'Dark';
systemPreferences.accentColor = 'Blue';

console.log(JSON.stringify({
    appearance: systemPreferences.appearance,
    accentColor: systemPreferences.accentColor
}, null, 2));
