const cssMatcher = require('jest-matcher-css')
const plugin = require('./index.js')
const { generateUtilities } = require('tailwindcss-plugin-test-helpers')

expect.extend({
  toMatchCss: cssMatcher,
})

test('it generates the offset classses based on config', () => {
  const config = {
    theme: {
      outlineOffset: {
        1: '1px',
        2: '2px',
        4: '4px',
      },
    },
  }

  const output = `
    .outline-offset-1 {
      outline-offset: 1px;
    }

    .outline-offset-2 {
      outline-offset: 2px;
    }

    .outline-offset-4 {
      outline-offset: 4px;
    }
  `

  generateUtilities(plugin, [], config).then(result => {
    expect(result.css).toMatchCss(output)
    expect(result.warnings().length).toBe(0)
  })
})
