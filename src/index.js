import runWorkflow, { createJob } from '@core/workflow';
import applySysPrefsGeneralSettings, {
  validateSysPrefsGeneralSettings, Appearances, AccentColors, ClickScrollBarActions,
  HighlightColors, SidebarIconSizes, ShowScrollBarsTriggers,
} from '@sysprefs/general';
import applySysPrefsDockSettings, {
  validateSysPrefsDockSettings, ScreenEdges, MinimizeEffects, TabsWhenOpeningDocumentsPreferences,
  DoubleClickTitleBarActions,
} from '@sysprefs/dock';

scpt.run = () => {
  const generalSettings = {
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

  const dockSettings = {
    size: 0.25,
    magnification: false,
    magnificationSize: 0.0,
    location: ScreenEdges.LEFT,
    minimizeEffect: MinimizeEffects.GENIE,
    preferTabsWhenOpeningDocuments: TabsWhenOpeningDocumentsPreferences.IN_FULL_SCREEN_ONLY,
    doubleClickTitleBar: DoubleClickTitleBarActions.ZOOM,
    minimizeToAppIcon: false,
    animate: true,
    autohide: true,
    showOpenIndicators: true,
    showRecentApps: false,
  };

  runWorkflow([
    createJob('sysprefs.general.applySettings',
      validateSysPrefsGeneralSettings, applySysPrefsGeneralSettings, generalSettings),
    createJob('sysprefs.dock.applySettings',
      validateSysPrefsDockSettings, applySysPrefsDockSettings, dockSettings),
  ]);
};
