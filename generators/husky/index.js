'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const jsonfile = require('jsonfile');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.props = {};
  }

  prompting() {
    const prompts = [{
      type: 'checkbox',
      name: 'lint',
      message: 'Which types of files do you want to lint automatically?',
      choices: [
        {
          name: 'JS',
          value: 'js',
          checked: true
        },
        {
          name: 'SCSS',
          value: 'scss',
          checked: true
        }
      ],
      default: []
    }];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  install() {
    this.log(chalk.green('Writing husky files...'));

    // Read the existing package.json
    const filePath = this.destinationPath() + '/package.json';
    let obj = jsonfile.readFileSync(filePath);

    // Throw a warning if an existing package.json cannot be found.
    if (!obj) {
      return this.log(chalk.red('Could not find an existing package.json to add husky configuration to.'));
    }

    let newObj = Object.assign(obj, {
      husky: {
        'hooks': {
          'pre-commit': 'lint-staged',
          'pre-push': 'yarn test'
        }
      },
      'lint-staged': { 'linters': {} }
    });

    // Add JS-related items
    if (this.props.lint.indexOf('js') > -1) {
      newObj.scripts['lint-scripts'] = 'eslint --fix';
      newObj['lint-staged']['linters']['*.js'] = [
        'yarn lint-scripts',
        'git add'
      ];
      newObj['lint-staged'].ignore = [
        'src/scripts/vendor/**/*.js'
      ];
    }

    // Add CSS-related items
    if (this.props.lint.indexOf('scss') > -1) {
      newObj.scripts['lint-styles'] = 'stylelint --syntax scss';
      newObj['lint-staged']['linters']['*.scss'] = [
        'yarn lint-styles'
      ];
    }

    jsonfile.writeFileSync(filePath, newObj, { spaces: 2 });

    this.log(chalk.yellow('\nInstalling husky-related dependencies…'));

    const devDependencies = [
      'husky',
      'lint-staged'
    ];

    this.yarnInstall(devDependencies, { 'dev': true, silent: true }).then(() => {
      this.log(chalk.green('Installed husky-related dependencies.'));
    });
  }
};
