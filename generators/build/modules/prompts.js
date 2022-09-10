module.exports = function(options) {
  const questions = [];

  //
  //   Paths
  //
  //////////////////////////////////////////////////////////////////////
  if (typeof options.dist === 'undefined') {
    questions.push({
      type: 'input',
      name: 'dist',
      message: 'Root path for all output files',
      default: 'dist',
    });
  }


  if (typeof options.templateSrc === 'undefined') {
    questions.push({
      type: 'input',
      name: 'templateSrc',
      message: 'Templates source path',
      default: 'src/templates/',
    });
  }

  if (typeof options.templateDist === 'undefined') {
    questions.push({
      type: 'input',
      name: 'templateDist',
      message: 'Templates output path',
      default: 'dist/',
    });
  }

  return questions;
};
