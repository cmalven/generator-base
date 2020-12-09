'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-base:files', () => {
  describe('include', () => {
    const promptAnswers = {
      type: 'twig-include',
      filename: 'test-file',
      emmet: 'p.-text{My text content}',
    };

    before(() => {
      return helpers
        .run(path.join(__dirname, '../generators/files'))
        .withPrompts(promptAnswers);
    });

    it('adds Twig include file', () => {
      const content = `
{# =============================================================== #}
{# Test File
{# =============================================================== #}
{#
  {% include '_partials/test-file' %}
#}

<div class="test-file">
  <p class="test-file__text">My text content</p>
</div>
`;
      assert.fileContent('templates/_partials/test-file.twig', content.trim());

      // Style object
      const styleContent = `
/*
Test File

This new file does some extraordinary things.
*/

.test-file {

}

.test-file__text {

}
`;
      assert.fileContent('src/styles/objects/_test-file.scss', styleContent.trim());

    });
  });
});

describe('embed', () => {
  const promptAnswers = {
    type: 'twig-embed',
    filename: 'test-file',
    rootElement: 'section',
    emmet: 'p.-text{My text content}',
  };

  before(() => {
    return helpers
      .run(path.join(__dirname, '../generators/files'))
      .withPrompts(promptAnswers);
  });

  it('adds Twig embed file', () => {
    const content = `
{# =============================================================== #}
{# Layout - Test File
{# =============================================================== #}
{#
  {% embed '_embeds/l-test-file' %}
    {% block main %}
      …
    {% endblock %}
  {% endembed %}
#}

<section class="l-test-file">
  <p class="l-test-file__text">My text content</p>
</section>
`;
    assert.fileContent('templates/_embeds/l-test-file.twig', content.trim());

    // Style object
    const styleContent = `
/*
Layout - Test File

This new file does some extraordinary things.
*/

.l-test-file {

}

.l-test-file__text {

}
`;
    assert.fileContent('src/styles/layout/_l-test-file.scss', styleContent.trim());

  });
});
