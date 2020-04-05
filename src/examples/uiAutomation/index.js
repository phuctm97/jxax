import createAppWorkflowBuilder from 'jxax/core/automation/app';
import toggle from 'jxax/core/automation/toggle';
import popUpButton from 'jxax/core/automation/popUpButton';
import checkbox from 'jxax/core/automation/checkbox';
import radio from 'jxax/core/automation/radio';

function getGeneralToggleValueWorkflow(context, choices) {
  const { app, process } = context;
  app.currentPane = app.panes.byName('General');

  return toggle(process.windows[0], choices).get();
}

function setGeneralToggleValueWorkflow(context, choices, value) {
  const { app, process } = context;
  app.currentPane = app.panes.byName('General');

  return toggle(process.windows[0], choices).set(value);
}

function getGeneralPopUpButtonValueWorkflow(context, name) {
  const { app, process } = context;
  app.currentPane = app.panes.byName('General');

  return popUpButton(process.windows[0], name).get();
}

function setGeneralPopUpButtonValueWorkflow(context, name, value) {
  const { app, process } = context;
  app.currentPane = app.panes.byName('General');

  return popUpButton(process.windows[0], name).set(value);
}

function getGeneralCheckboxValueWorkflow(context, name) {
  const { app, process } = context;
  app.currentPane = app.panes.byName('General');

  return checkbox(process.windows[0], name).get();
}

function setGeneralCheckboxValueWorkflow(context, name, value) {
  const { app, process } = context;
  app.currentPane = app.panes.byName('General');

  return checkbox(process.windows[0], name).set(value);
}

function getGeneralRadioValueWorkflow(context, index) {
  const { app, process } = context;
  app.currentPane = app.panes.byName('General');

  return radio(process.windows[0], index).get();
}

function setGeneralRadioValueWorkflow(context, index, value) {
  const { app, process } = context;
  app.currentPane = app.panes.byName('General');

  return radio(process.windows[0], index).set(value);
}

const createSystemPrefsWorkflow = createAppWorkflowBuilder('System Preferences');

export const getGeneralToggleValue = createSystemPrefsWorkflow(getGeneralToggleValueWorkflow);
export const setGeneralToggleValue = createSystemPrefsWorkflow(setGeneralToggleValueWorkflow);
export const getGeneralPopUpButtonValue = createSystemPrefsWorkflow(
  getGeneralPopUpButtonValueWorkflow,
);
export const setGeneralPopUpButtonValue = createSystemPrefsWorkflow(
  setGeneralPopUpButtonValueWorkflow,
);
export const getGeneralCheckboxValue = createSystemPrefsWorkflow(getGeneralCheckboxValueWorkflow);
export const setGeneralCheckboxValue = createSystemPrefsWorkflow(setGeneralCheckboxValueWorkflow);
export const getGeneralRadioValue = createSystemPrefsWorkflow(getGeneralRadioValueWorkflow);
export const setGeneralRadioValue = createSystemPrefsWorkflow(setGeneralRadioValueWorkflow);

// Getters.
// const appearance = getGeneralToggleValue(
//   ['Light', 'Dark', 'Auto'],
// );
// const accentColor = getGeneralToggleValue(
//   ['Blue', 'Purple', 'Pink', 'Red', 'Orange', 'Yellow', 'Green', 'Graphite'],
// );
// const highlightColor = getGeneralPopUpButtonValue('Highlight color:');
// const autohideMenuBar = getGeneralCheckboxValue('Automatically hide and show the menu bar');
// const showScrollBars = getGeneralRadioValue(1);

console.log(JSON.stringify({
  // appearance,
  // accentColor,
  // highlightColor,
  // autohideMenuBar,
  // showScrollBars,
}, null, 2));

// Setters.
// setGeneralToggleValue(['Light', 'Dark', 'Auto'], 'Dark');
// setGeneralPopUpButtonValue('Highlight color:', 'Blue');
// setGeneralCheckboxValue('Automatically hide and show the menu bar', false);
// setGeneralRadioValue(1, 'Automatically based on mouse or trackpad');
