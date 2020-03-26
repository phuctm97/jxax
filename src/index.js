import systemPreferences from 'jxax/systemPreferences';

systemPreferences.activate();
systemPreferences.showPane("General");
console.log(systemPreferences.window.name());
