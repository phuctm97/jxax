import * as validate from 'validate.js';

export const Appearances = {
  LIGHT: 'light',
  DARK: 'dark',
  AUTO: 'auto',
};

export const AccentColors = {
  BLUE: 'blue',
  PURPLE: 'purple',
  PINK: 'pink',
  RED: 'red',
  ORANGE: 'orange',
  YELLOW: 'yellow',
  GREEN: 'green',
  GRAPHITE: 'graphite',
};

export const HighlightColors = {
  BLUE: 'blue',
  PURPLE: 'purple',
  PINK: 'pink',
  RED: 'red',
  ORANGE: 'orange',
  YELLOW: 'yellow',
  GREEN: 'green',
  GRAPHITE: 'graphite',
};

export const SidebarIconSizes = {
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large',
};

export const ShowScrollBarsTriggers = {
  AUTO: 'auto',
  WHEN_SCROLLING: 'whenScrolling',
  ALWAYS: 'always',
};

export const ClickScrollBarActions = {
  JUMP_TO_NEXT_PAGE: 'jumpToNextPage',
  JUMP_TO_SPOT_CLICKED: 'jumpToSpotClicked',
};

function inclusionCons(vals) {
  return {
    within: vals,
    message: `is invalid, must be within [${vals.map((val) => JSON.stringify(val)).join(', ')}].`,
  };
}

const constraints = {
  appearance: { inclusion: inclusionCons(Object.values(Appearances)) },
  accentColor: { inclusion: inclusionCons(Object.values(AccentColors)) },
  highlightColor: { inclusion: inclusionCons(Object.values(HighlightColors)) },
  sidebarIconSize: { inclusion: inclusionCons(Object.values(SidebarIconSizes)) },
  autoHideMenuBar: { type: 'boolean' },
  showScrollBars: { inclusion: inclusionCons(Object.values(ShowScrollBarsTriggers)) },
  clickScrollBar: { inclusion: inclusionCons(Object.values(ClickScrollBarActions)) },
  defaultWebBrowser: { type: 'string' },
  askWhenClosingDocuments: { type: 'boolean' },
  closeWindowsWhenQuittingApp: { type: 'boolean' },
  recentItems: { inclusion: inclusionCons([0, 5, 10, 15, 20, 30, 50]) },
  allowHandoff: { type: 'boolean' },
  useFontSmoothing: { type: 'boolean' },
};

export function validateOpts(opts) {
  return validate(opts, constraints, { fullMessages: false });
}
