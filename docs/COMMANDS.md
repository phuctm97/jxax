<!-- This is an auto-generated document, using `jxax --ls-cmds --format long > docs/COMMANDS.md` --> 

# Commands

Currently, JXAX supports following commands:

| Command                                                              | Description                                  |
| -------------------------------------------------------------------- | -------------------------------------------- |
| [desktops.changePicture](#desktopschangepicture)                     | Change current Desktop picture               |
| [desktops.configureScreenSaver](#desktopsconfigurescreensaver)       | Configure screen saver preferences           |
| [sysprefs.configureGeneral](#sysprefsconfiguregeneral)               | Configure System Preferences/General         |
| [sysprefs.configureDock](#sysprefsconfiguredock)                     | Configure System Preferences/Dock            |
| [sysprefs.configureMissionControl](#sysprefsconfiguremissioncontrol) | Configure System Preferences/Mission Control |
| [sysprefs.configureSpotlight](#sysprefsconfigurespotlight)           | Configure System Preferences/Spotlight       |

## desktops.changePicture

Change current Desktop picture.

| Argument  | Type     | Description                                                                                                                               |
| --------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `picture` | `string` | Path to the new Desktop picture, e.g. ~/Pictures/Wallpaper.jpg, ./images/wallpaper.png, Catalina Rock (default to Apple Desktop pictures) |

## desktops.configureScreenSaver

Configure screen saver preferences.

| Argument         | Type      | Description                                                                                                            |
| ---------------- | --------- | ---------------------------------------------------------------------------------------------------------------------- |
| `screenSaver`    | `string`  | Name of the new screen saver, which has to added in advance                                                            |
| `delayInterval`  | `enum`    | The time in seconds of inactivity before the screen saver is shown (`0` / `1` / `2` / `5` / `10` / `20` / `30` / `60`) |
| `mainScreenOnly` | `boolean` | Show screen saver in main display only                                                                                 |
| `showClock`      | `boolean` | Show a clock along with the screen saver when it' being shown                                                          |

## sysprefs.configureGeneral

Configure System Preferences/General.

| Argument                      | Type      | Description                                                                                                       |
| ----------------------------- | --------- | ----------------------------------------------------------------------------------------------------------------- |
| `appearance`                  | `enum`    | Appearance (`"light"` / `"dark"` / `"auto"`)                                                                      |
| `accentColor`                 | `enum`    | Accent color (`"blue"` / `"purple"` / `"pink"` / `"red"` / `"orange"` / `"yellow"` / `"green"` / `"graphite"`)    |
| `highlightColor`              | `enum`    | Highlight color (`"blue"` / `"purple"` / `"pink"` / `"red"` / `"orange"` / `"yellow"` / `"green"` / `"graphite"`) |
| `sidebarIconSize`             | `enum`    | Sidebar icon size (`"small"` / `"medium"` / `"large"`)                                                            |
| `autoHideMenuBar`             | `boolean` | Automatically hide and show menu bar                                                                              |
| `showScrollBars`              | `enum`    | Show scroll bars trigger (`"auto"` / `"whenScrolling"` / `"always"`)                                              |
| `clickScrollBar`              | `enum`    | Click scroll bar to (`"jumpToNextPage"` / `"jumpToSpotClicked"`)                                                  |
| `defaultWebBrowser`           | `string`  | Default web browser                                                                                               |
| `askWhenClosingDocuments`     | `boolean` | Ask to keep changes when closing documents                                                                        |
| `closeWindowsWhenQuittingApp` | `boolean` | Close windows when quitting an app                                                                                |
| `recentItems`                 | `enum`    | Number of items to show in Recent items (`0` / `5` / `10` / `15` / `20` / `30` / `50`)                            |
| `allowHandoff`                | `boolean` | Allow Handoff between this Mac and your iCloud devices                                                            |
| `useFontSmoothing`            | `boolean` | Use font smoothing when available                                                                                 |

## sysprefs.configureDock

Configure System Preferences/Dock.

| Argument                         | Type      | Description                                                                                   |
| -------------------------------- | --------- | --------------------------------------------------------------------------------------------- |
| `size`                           | `string`  | Size/height of the items (between 0.0 (minimum) and 1.0 (maximum))                            |
| `magnification`                  | `boolean` | Is magnification on or off?                                                                   |
| `magnificationSize`              | `string`  | Maximum magnification size when magnification is on (between 0.0 (minimum) and 1.0 (maximum)) |
| `location`                       | `enum`    | Location on screen (`"bottom"` / `"left"` / `"right"`)                                        |
| `minimizeEffect`                 | `enum`    | Minimization effect (`"genie"` / `"scale"`)                                                   |
| `preferTabsWhenOpeningDocuments` | `enum`    | Prefer tabs when opening documents (`"always"` / `"inFullScreenOnly"` / `"manually"`)         |
| `doubleClickTitleBar`            | `enum`    | Double-click window's title bar to (`"none"` / `"zoom"` / `"minimize"`)                       |
| `minimizeToAppIcon`              | `boolean` | Minimize windows to application icon                                                          |
| `animate`                        | `boolean` | Is the animation of opening applications on or off?                                           |
| `autohide`                       | `boolean` | Is autohiding the dock on or off?                                                             |
| `showOpenIndicators`             | `boolean` | Show indicators for opening applications                                                      |
| `showRecentApps`                 | `boolean` | Show recent applications in Dock                                                              |

## sysprefs.configureMissionControl

Configure System Preferences/Mission Control.

| Argument                     | Type      | Description                                                                             |
| ---------------------------- | --------- | --------------------------------------------------------------------------------------- |
| `autoRearrangeSpaces`        | `boolean` | Automatically rearrange Spaces based on mist recent use                                 |
| `switchSpaceWhenSwithToApp`  | `boolean` | When switching to an application, switch to Space with open windows for the application |
| `groupWindowsByApp`          | `boolean` | Group windows by application                                                            |
| `displaysHaveSeparateSpaces` | `boolean` | Displays have separate Spaces                                                           |
| `missionControlKeyShortcut`  | `string`  | Mission Control keyboard shortcut                                                       |
| `appWindowsKeyShortcut`      | `string`  | Application Windows keyboard shortcut                                                   |
| `showDesktopKeyShortcut`     | `string`  | Show Desktop keyboarb shortcut                                                          |

## sysprefs.configureSpotlight

Configure System Preferences/Spotlight.

| Argument                 | Type            | Description                                                       |
| ------------------------ | --------------- | ----------------------------------------------------------------- |
| `searchResults`          | `arrayOfString` | The array of categories to be shown in Spotlight's search results |
| `allowSpotlightInLookup` | `boolean`       | Allow Spotlight Suggestions in Look up                            |


