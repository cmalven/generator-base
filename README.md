# generator-base

> A tool to generate app structure and configuration for Malven Co. projects on the web.

## What is this?

This is a set of generators based on [yeoman-generator][yeoman-url] to aid in setting up commonly-used dependencies and application structure for web projects..

## Generators

There are many types of generators which can reference other generators. For example, a `craft` generator may compose a Craft project with `eslint`, `husky`, `style`, `scripts`, `gulp`, and `router`.

### Platforms

- `base:craft3` - generates a basic Craft 3 app
- `base:craft2` - generates a basic Craft 2 app
- `base:static` - generates a simple front end app with no back end

### Front End

- `base:style` - installs common style modules and dependencies and sets up a main.css
- `base:scripts` - creates the javascript structure and sets up an example main.js
- `base:gulp` - installs a gulp build configuration

### Development Tools

- `base:git` - initializes a git repo and installs hooks and Github templates
- `base:eslint` - installs the rules and rc files for linting javascript
- `base:stylelint` - installs the rules and rc files for linting stylesheets


## Installation

### Dependencies
- [node.js][node-url] v6.11.1+
- [npm][npm-url] v3.10.3+
- [composer][composer-url] 1.6.2+ (for `craft3` and `craft2` generators)

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
yo base:craft3
# or
yo base:craft2
# or
yo base:static
# or ... any other included generator
```

## License

MIT © [Malven Co.](https://malven.co)
