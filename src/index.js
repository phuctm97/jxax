import {
  applySysPrefsGeneralSettings,
  Appearances, AccentColors, ClickScrollBarActions,
  HighlightColors, SidebarIconSizes, ShowScrollBarsTriggers,
} from '@sysprefs/general';

scpt.run = () => {
  const settings = {
    appearance: Appearances.DARK,
    accentColor: AccentColors.BLUE,
    highlightColor: HighlightColors.BLUE,
    sidebarIconSize: SidebarIconSizes.SMALL,
    autoHideMenuBar: false,
    showScrollBars: ShowScrollBarsTriggers.AUTO,
    clickScrollBar: ClickScrollBarActions.JUMP_TO_NEXT_PAGE,
    defaultWebBrowser: 'Safari',
    askWhenClosingDocuments: true,
    closeWindowsWhenQuittingApp: true,
    recentItems: 0,
    allowHandoff: true,
    useFontSmoothing: true,
  };

  applySysPrefsGeneralSettings(settings);
};
