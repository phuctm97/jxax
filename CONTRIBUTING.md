# Contributing

Hi! First off, we're excited that you're interested in contributing. Thank you and welcome!

JXAX is an open-source automation extensions kit, which means that it is meant to be extended by
its users and community. Also, when it comes to automation, it's very likely that several or a lot
of people share similar workflows, and an automation can help several or a lot of people. Hence,
it's always helpful sharing your automation even if it's initially just helpful to you (JXAX was
started like that), as it may happen that someone in the community is interested in your
automation, uses it and then extends it to help you back and other people. 💚

With that being said, here we welcome everyone to contribute their automation via pull requests, to
file issues on GitHub, to help people asking for help, to help triage, reproduce, or fix bugs that
people have filed, to add to our documentation, or to help out in any other way. All types of
contributions are encouraged and valued. 💪🏻

## Create an issue

Every contributions should start with an issue, creating an issue to:

- Ask for support. ❔
- Request a feature. 💡
- Report a bug. 🐞
- Describe a feature you're going to add. 🔨

## Submit a pull request

Please create an issue describing what you're going to add or fix before submitting a PR, which
helps avoid cases your features are not related to JXAX or there're others working on similar
issues.

If the issue is agreed, start writing your PR following:

- Create a fork of `deskp/jxax` to your Github account/organization.
- Commit your changes.
- Submit a PR to `deskp/jxax` branch `master`.
- Make sure your PR is rebased onto the latest `master`, we enforce linear history in `master` for
  better maintance experience.
- Make sure your PR passes our CI (see [Actions][actions-link]). If it failed, please fix it. If
  the CI keeps failing due to unrelated reason, `@mention` one of our maintainer and describe the
  issue in the PR so that we can fix it and get your PR merged.
- Once your PR passed the CI, one of our maintainer will review it. We may give some feedback and
  ask for changes. Please help collaborate with us in which cases.
- Once your PR is approved, ship it! 🚀
- Congrats! You've just made a contribution. 🎉

## Development setup

You'll need [Node.js] version `12+` and [Yarn].

After cloning the repo, run:

```bash
$ yarn # Install the project's dependencies.
```

### Commit changes

We enforce [Conventional Commits] for commit messages so that changelogs and releases can be generated automatically. Please get yourself familiar with it before commiting your changes.

### Commonly used commands

```bash
$ yarn start # Watch for changes and rebuild dist/jxax.js.

$ osascript dist/jxax.js # Run newly built dist/jxax.js with osascript.

$ yarn build # Build dist/jxax.js in production mode.
```

### Code style

We follow [Airbnb code style] in all JavaScript files and use [Prettier] to enforce formatting in all other resource files (`.yml`, `.json`, `.md`, etc).

### Use VSCode

We recommend using [VSCode] (or Visual Studio Code) for development. We've already configured it to be fully integrated with other tools used in the project ([Prettier], [ESLint], etc).

## Project structure

- `src/bin/`: CLI implementation.

- `src/core/`: core modules exporting common classes and functions for working with JXA.

- `src/apps/`: applications/plugins implementation, provides actions for usage in workflows.

- `src/reporters/`: presentation implementation displaying workflows, jobs progress and results.

- `src/utils.js`: common JS utility used in other modules.

- `docs/`: documentation.

- `.vscode/`: [VSCode] configuration.

- `.devcontainer/`: [VSCode] Remote-Containers configuration for developing in containers with VSCode.

- `.github/`: Github workflows and configuration.

- `scripts/`: chore & build scripts.

## Credits

Thank you to all the people who have already contributed to JXAX!

<!-- Links -->

[actions-link]: https://github.com/deskp/jxax/actions?query=workflow%3ACI
[node.js]: http://nodejs.org
[yarn]: https://yarnpkg.com/en/docs/install
[conventional commits]: https://www.conventionalcommits.org
[airbnb code style]: https://github.com/airbnb/javascript
[prettier]: https://prettier.io
[eslint]: https://eslint.org
[vscode]: https://code.visualstudio.com
