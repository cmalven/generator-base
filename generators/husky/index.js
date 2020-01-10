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
      default: ['js', 'scss']
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
    let obj = jsonfile.readFileSync(filePath, { throws: false });

    // Create package.json if an existing one cannot be found.
    if (!obj) {
      obj = {
        name: 'my-app',
        description: '',
        version: '1.0.0',
        scripts: {}
      };
    }

    let newObj = Object.assign(obj, {
      husky: {
        'hooks': {
          'pre-commit': 'lint-staged',
          'pre-push': 'npm test'
        }
      },
      'lint-staged': {}
    });

    // Add JS-related items
    if (this.props.lint.indexOf('js') > -1) {
      newObj.scripts['lint-scripts'] = 'eslint --fix';
      newObj['lint-staged']['*.js'] = [
        'npm run lint-scripts',
        'git add'
      ];
    }

    // Add CSS-related items
    if (this.props.lint.indexOf('scss') > -1) {
      newObj.scripts['lint-styles'] = 'stylelint --syntax scss';
      newObj['lint-staged']['*.scss'] = [
        'npm run lint-styles'
      ];
    }

    jsonfile.writeFileSync(filePath, newObj, { spaces: 2 });

    this.log(chalk.yellow('\nInstalling husky-related dependencies…'));

    const devDependencies = [
      'husky',
      'lint-staged'
    ];

    this.npmInstall(devDependencies, { 'save-dev': true, silent: true });
  }

  end() {
    this.log(chalk.green('Installed husky-related dependencies.'));
  }
};
