'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const fs = require('fs');

module.exports = class extends Generator {
  writing() {
    if (this.fs.exists(this.destinationPath('.gitignore'))) {
      this.fs.append(
        this.destinationPath('.gitignore'),
        fs.readFileSync(this.templatePath('gitignore'))
      );
    } else {
      this.fs.copy(
        this.templatePath('gitignore'),
        this.destinationPath('.gitignore')
      );
    }
    this.log(chalk.green(`Created .gitignore.`));

    this.spawnCommandSync('git', ['init', '--quiet']);
    this.log(chalk.green('Initialized git repo.'));

    this.fs.copy(
      this.templatePath('.github'),
      this.destinationPath('.github')
    );
    this.log(chalk.green(`Created .github folder.`));
  }
};
