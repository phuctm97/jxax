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
  <img src='https://img.shields.io/github/workflow/status/deskp/jxax/ci' alt='build'/>
  <img src='https://img.shields.io/github/package-json/v/deskp/jxax' alt='version'/>
  <img src='https://img.shields.io/github/license/deskp/jxax' alt='license'/>
  <img src='https://img.shields.io/static/v1?label=code%20style&message=airbnb&color=ff5a5f&logo=airbnb&logoColor=white' alt='code-style-airbnb'/>
  <img src='https://img.shields.io/static/v1?label=code%20style&message=prettier&color=ff69b4&logo=prettier&logoColor=white' alt='code-style-prettier'/>
</p>

---

![Demo][demo-gif]

---

## Installation

The easiest way to use JXAX is to install it into your `PATH`. Running the following command
downloads the `jxax` CLI and extract it into your `usr/local/bin`:

```bash
$ curl -L https://github.com/deskp/jxax/releases/download/v1.0.0-rc.1/jxax-1.0.0-rc.1.tar.gz \
    | sudo tar xvz - -C /usr/local/bin
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
      defaultWebBrowser: Safari
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

#### Run your workflow

Simply run the `jxax` CLI with your configured workflow YAML file, either absolute or relative or
home (`~`) paths are applicable.

```bash
$ jxax your-workflow.yml
```

### Features

Currently, JXAX supports:

- `sysprefs.configureGeneral`: configure _System Preferences/General_.

- `sysprefs.configureDock`: configure _System Preferences/Dock_.

- `sysprefs.configureMissionControl`: configure _System Preferences/Mission Control_.

- `sysprefs.configureSpotlight`: configure _System Preferences/Spotlight_.

- `desktops.changePicture`: change desktop picture, either picture names in
  _Apple Desktop Pictures_ or absolute or relative paths are all applicable.

- `sysprefs.configureScreenSaver`: change screen saver, configure screen saver options. Screen
  savers have to be added before being able to be configured.

😬We're adding more features constantly. However, the features to be added are dependent on our
maintainers' interests. If you'd love to add a feature, feel free to create an issue and submit
a PR!

## Contributing

JXAX is designed to be extended by its users and community. So if you've ever used it and wanted to
add or added an automation, why don't you create an issue or submit a PR, there may be many people
out there share the same interest with you, your contribution is very likely to be highly
appreciated! 💚

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

[license-file]: /LICENSE
[contributing-file]: /CONTRIBUTING.md
