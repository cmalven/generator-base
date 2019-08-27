# generator-base

> A tool to generate app structure and configuration for Malven Co. projects on the web.

## What is this?

This is a set of generators based on [yeoman-generator](https://github.com/yeoman/generator) to aid in setting up commonly-used dependencies and application structure for web projects..

## Generators

There are many types of generators which can reference other generators.

### Platforms

- `base:craft` - generates a basic Craft app
- `base:static` - generates a simple front end app with no back end

### Front End

- `base:style` - installs common style modules and dependencies and sets up a main.css
- `base:scripts` - creates the javascript structure and sets up an example main.js
- `base:gulp` - installs a gulp build configuration

### Development Tools

- `base:git` - initializes a git repo and installs hooks and Github templates
- `base:eslint` - installs the rules and rc files for linting javascript
- `base:stylelint` - installs the rules and rc files for linting stylesheets
- `base:husky` - uses husky for quality control checks during git actions
- `base:buddy` - add deployment configuration via [Buddy](https://buddy.works).

### Other

- `base:craft-styleguide` - used on top of a `base:craft` installation to add a simple styleguide.


## Installation

### Dependencies

First, install [Yeoman](https://github.com/yeoman/generator):

```bash
npm install -g yo
```

Next, clone this repo and link it with npm:

```bash
git clone git@github.com:cmalven/generator-base.git
cd generator-base/
npm link
```

Finally, generate your new project:

```bash
yo base:craft
# or
yo base:static
# or ... any other included generator
```

## Development

### Testing

```bash
# Run all tests once
npm test

# Run a specific test once
npm test craft

# Run all tests whenever a file changes
npm run test:dev
```

## License

MIT © [Malven Co.](https://malven.co)
