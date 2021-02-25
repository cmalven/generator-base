'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const expand = require('emmet').default;
const toTitleCase = require('./util/toTitleCase');
const getClassListFromMarkup = require('./util/getClassListFromMarkup');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.props = {};
  }

  prompting() {
    const prompts = [
      {
        type: 'list',
        name: 'type',
        message: 'Which type of file set would you like to create?',
        choices: [
          {
            name: 'Twig Include (Twig include, SCSS object)',
            value: 'twig-include',
          },
          {
            name: 'Twig Embed (Twig embed, SCSS layout)',
            value: 'twig-embed',
          },
        ],
      },
      {
        type: 'input',
        name: 'twigSubdirectory',
        message: 'Enter a Twig sub-directory to creat the Twig file there',
        default: '',
      },
      {
        type: 'input',
        name: 'filename',
        message: 'What would you like to call this file?',
        default: 'my-file',
      },
      {
        type: 'input',
        name: 'description',
        message: 'Summarize the new file in a single sentence',
        default: 'This new file does some extraordinary things.',
      },
      {
        type: 'input',
        name: 'rootElement',
        message: 'What element should be used for the root of the component?',
        default: 'div',
      },
      {
        type: 'input',
        name: 'emmet',
        message: 'Enter an emmet string to use for the markup',
        default: 'div.-some-child+p.-another-child',
      },
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    const filename = this.props.type === 'twig-embed' ? 'l-' + this.props.filename : this.props.filename;
    const name = toTitleCase(filename);

    const emmet = `${this.props.rootElement}.${filename}>${this.props.emmet}`;
    console.log(emmet);
    const markup = expand(emmet, {
      options: {
        'bem.enabled': true,
        'bem.element': '__',
        'bem.modifier': '--',
        'output.indent': '  ',
      },
    });

    // Twig File
    const twigFile = this.props.type === 'twig-include'
      ? { template: 'twig-include', dir: '_partials' }
      : { template: 'twig-embed', dir: '_embeds' };

    // Add a Twig sub-directory
    if (this.props.twigSubdirectory) {
      twigFile.dir += '/' + this.props.twigSubdirectory.replace(/^\/|\/$/g, '');
    }

    this.fs.copyTpl(
      this.templatePath(`twig/${twigFile.template}.twig.ejs`),
      this.destinationPath(`templates/${twigFile.dir}/${filename}.twig`),
      {
        name,
        filename,
        markup,
      },
    );

    // SCSS File
    const classList = markup ? getClassListFromMarkup(markup) : null;
    const styleFile = this.props.type === 'twig-include'
      ? { template: 'scss-object', dir: 'objects' }
      : { template: 'scss-object', dir: 'layout' };
    this.fs.copyTpl(
      this.templatePath(`scss/${styleFile.template}.scss.ejs`),
      this.destinationPath(`src/styles/${styleFile.dir}/_${filename}.scss`),
      {
        name,
        filename,
        classList,
        description: this.props.description,
      },
    );
  }

  end() {
    this.log(chalk.green('Created new files'));
  }
};
