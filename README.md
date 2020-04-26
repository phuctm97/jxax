<!-- Title, summary and bagges -->
<h1 align='center'>
  <br/>
  <img src='docs/assets/logo.svg' alt='Logo'/>
  <br/><br/><br/>
  JXA Extensions Kit & CLI
  <br/>
</h1>
<p align='center'>
  JavaScript for Automation (JXA) Extensions Kit & CLI automate macOS setup, configuring preferences,
  personalization, etc.
  <br/><br/>
  <img src='https://img.shields.io/github/workflow/status/deskp/jxax/CI' alt='build'/>
  <img src='https://img.shields.io/github/v/release/deskp/jxax?label=latest%20release' alt='latest release'/>
  <img src='https://img.shields.io/github/license/deskp/jxax' alt='license'/>
  <img src='https://badgen.net/badge/code%20style/airbnb/ff5a5f?icon=airbnb' alt='code-style-airbnb'/>
  <img src='https://badgen.net/badge/code%20style/prettier/ff69b4?icon=https%3A%2F%2Fico.now.sh%2Fprettier%2Ffff' alt='code-style-prettier'/>
</p>

---

![Demo][demo-gif]

---

## Installation

The easiest way to use JXAX is to install it into your `PATH` using our `install.sh`. Running the following command
downloads the `jxax` CLI and extract it into your `usr/local/bin`:

```bash
$ /bin/zsh -c "$(curl -fsSL https://raw.githubusercontent.com/deskp/jxax/master/scripts/install.sh)"
```

## Usage

JXAX allows you to write, store and run your workflows as YAML files, enables
writing workflows once and running them many times at many places, which automation is all about.

> JXAX's workflows are relatively similar to but simpler than CI/CD workflows.

#### Configure your workflow in YAML

Here is the configuration used in the GIF demo you see above:

```yaml
jobs:
  - uses: sysprefs.configureGeneral
    args:
      appearance: dark
      accentColor: blue
      highlightColor: blue
      sidebarIconSize: small
      autoHideMenuBar: false
      showScrollBars: auto
      clickScrollBar: jumpToNextPage
      defaultWebBrowser: Google Chrome.app
      askWhenClosingDocuments: true
      closeWindowsWhenQuittingApp: true
      recentItems: 0
      allowHandoff: true
      useFontSmoothing: true
  - uses: sysprefs.configureDock
    args:
      size: 0.25
      magnification: false
      magnificationSize: 0
      location: left
      minimizeEffect: genie
      preferTabsWhenOpeningDocuments: inFullScreenOnly
      doubleClickTitleBar: zoom
      minimizeToAppIcon: false
      animate: true
      autohide: true
      showOpenIndicators: true
      showRecentApps: false
  - uses: sysprefs.configureMissionControl
    args:
      autoRearrangeSpaces: false
      switchSpaceWhenSwithToApp: true
      groupWindowsByApp: false
      displaysHaveSeparateSpaces: true
      missionControlKeyShortcut: "[control][up]"
      appWindowsKeyShortcut: "[control][down]"
      showDesktopKeyShortcut: F12
  - uses: sysprefs.configureSpotlight
    args:
      searchResults:
        - Applications
        - System Preferences
        - Calculator
        - Conversion
        - Definition
        - Contacts
        - Movies
        - Music
        - PDF Documents
        - Presentations
        - Spreadsheets
        - Spotlight Suggestions
      allowSpotlightInLookup: true
  - uses: desktops.changePicture
    args:
      picture: ~/Pictures/Wallpaper.jpg
  - uses: desktops.configureScreenSaver
    args:
      screenSaver: Brooklyn
      delayInterval: 5
      mainScreenOnly: false
      showClock: true
```

A workflow has `jobs`, each job `uses` a command with a set of `args` to construct an automation.
Check out [Features] to see full list of supported commands.

#### Run your workflow

Simply run the `jxax` CLI with your configured workflow YAML file, either absolute or relative or
home (`~`) paths are applicable:

```bash
$ jxax your-workflow.yml
```

## Features

Currently, JXAX supports following commands:

| Command                            | Description                                  |
| ---------------------------------- | -------------------------------------------- |
| `desktops.changePicture`           | Change current Desktop picture               |
| `desktops.configureScreenSaver`    | Configure screen saver preferences           |
| `sysprefs.configureGeneral`        | Configure System Preferences/General         |
| `sysprefs.configureDock`           | Configure System Preferences/Dock            |
| `sysprefs.configureMissionControl` | Configure System Preferences/Mission Control |
| `sysprefs.configureSpotlight`      | Configure System Preferences/Spotlight       |

See [Commands][commands-file] for the commands' details (arguments and types).

😬We're adding more features constantly. However, the features to be added are dependent on our
maintainers' interests. If you'd love to add a feature, feel free to create an issue and submit
a PR!

## Contributing

JXAX is designed to be extended by its users and community. So if you've ever used it and wanted to
add or added an automation, why don't you create an issue or submit a PR, there may be many people
out there share interests with you, your contribution is very likely to be highly appreciated! 💚

See [Contributing][contributing-file].

## License

This project is licensed under the [MIT License][license-file].

Copyright © 2020 - present, Phuc (Minh) Tran. All rights reserved.

<!-- Badges -->

[version-badge]: https://img.shields.io/github/package-json/v/deskp/jxax
[build-badge]: https://img.shields.io/github/workflow/status/deskp/jxax/ci
[license-badge]: https://img.shields.io/github/license/deskp/jxax

<!-- Images -->

[demo-gif]: /docs/assets/demo.gif

<!-- Links -->

[features]: #features
[commands-file]: /docs/COMMANDS.md
[license-file]: /LICENSE
[contributing-file]: /CONTRIBUTING.md
