# generator-base

> A tool to generate app structure and configuration for Malven Co. projects on the web.

## What is this?

This is a set of generators based on [yeoman-generator][yeoman-url] to aid in setting up commonly-used dependencies and application structure for web projects..

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


## Installation

### Dependencies
- [node.js][node-url] v6.11.1+
- [npm][npm-url] v3.10.3+
- [composer][composer-url] 1.6.2+ (for `craft` generator)

First, install [Yeoman][yeoman-url]:

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

## License

MIT © [Malven Co.](https://malven.co)
