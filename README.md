# generator-base

> A tool to generate app structure and configuration for Malven Co. projects on the web.

## What is this?

This is a set of generators based on [yeoman-generator](https://github.com/yeoman/generator) to aid in setting up commonly-used dependencies and application structure for web projects..

## Generators

There are many types of generators which can reference other generators.

### Projects

- `base:project-craft` - generates a basic Craft app
- `base:project-static` - generates a simple front end app with no back end and optional [Twig](https://twig.symfony.com) templating

### Front End

- `base:style` - installs common style modules and dependencies and sets up a main.css
- `base:scripts` - creates the javascript structure and sets up an example main.js
- `base:gulp` - installs a gulp build configuration

### Development Tools

- `base:git` - initializes a git repo and installs hooks and Github templates
- `base:eslint` - installs the rules and rc files for linting javascript
- `base:stylelint` - installs the rules and rc files for linting stylesheets
- `base:husky` - lint and test on git actions using [husky](https://www.npmjs.com/package/husky) and [lint-staged](https://www.npmjs.com/package/lint-staged)
- `base:buddy` - add deployment configuration via [Buddy](https://buddy.works).

### Other

- `base:craft-styleguide` - used on top of a `base:project-craft` installation to add a simple styleguide.


## Installation

- Install [DDEV](https://ddev.com/get-started/)

Next, clone this repo and link it with npm:

```bash
git clone git@github.com:cmalven/generator-base.git
cd generator-base/
ddev start
ddev npm i
```

Finally, generate your new project:

```bash
ddev npm run new ./generators/project-craft

# or

ddev npm run new ./generators/project-static

# or ... any other included generator
```

## Development

### Testing

```bash
# Run all tests once
ddev npm test

# Run a specific test once
ddev npm test -- test/project-craft.js

# Run all tests whenever a file changes
ddev npm run test:dev
```

## License

MIT © [Malven Co.](https://malven.co)
