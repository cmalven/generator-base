module.exports = function(options) {
  const questions = [];

  //
  //   Paths
  //
  //////////////////////////////////////////////////////////////////////
  if (typeof options.rootDistPath === 'undefined') {
    questions.push({
      type: 'input',
      name: 'rootDistPath',
      message: 'Root path for all output files',
      default: 'dist'
    });
  }

  if (typeof options.templateSrc === 'undefined') {
    questions.push({
      type: 'input',
      name: 'templateSrc',
      message: 'Templates source path',
      default: 'src/templates/'
    });
  }

  if (typeof options.templateDist === 'undefined') {
    questions.push({
      type: 'input',
      name: 'templateDist',
      message: 'Templates output path',
      default: 'dist/'
    });
  }

  //
  //   Browsersync
  //
  //////////////////////////////////////////////////////////////////////
  if (typeof options.useProxy === 'undefined') {
    questions.push({
      type: 'confirm',
      name: 'useProxy',
      message: 'Use a proxy URL for Browsersync?',
      default: false
    });
  }

  if (typeof options.serverBaseDir === 'undefined') {
    questions.push({
      type: 'input',
      name: 'serverBaseDir',
      message: 'Base directory for Browsersync server',
      default: 'dist/'
    });
  }

  //
  //    Engines
  //
  //////////////////////////////////////////////////////////////////////
  if (typeof options.useTwig === 'undefined') {
    questions.push({
      type: 'confirm',
      name: 'useTwig',
      message: 'Add support for twig template engine to gulp build process?',
      default: false
    });
  }

  return questions;
};
