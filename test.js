const cssMatcher = require('jest-matcher-css')
const plugin = require('./index.js')
const postcss = require('postcss')
const tailwindcss = require('tailwindcss')

function tailwindConfig(options) {
  return {
    theme: {
      outlineOffset: {
        1: '1px',
        2: '2px',
        4: '4px',
      },
    },
    corePlugins: false,
    plugins: [plugin(options)],
  }
}

const generatePluginCss = () => {
  return postcss(tailwindcss(tailwindConfig()))
    .process('@tailwind utilities;', {
      from: undefined,
    })
    .then(result => result.css)
}

expect.extend({
  toMatchCss: cssMatcher,
})

test('it generates the offset classses based on config', () => {
  generatePluginCss().then(css => {
    expect(css).toMatchCss(`
      .outline-offset-1 {
        outline-offset: 1px;
      }

      .outline-offset-2 {
        outline-offset: 2px;
      }

      .outline-offset-4 {
        outline-offset: 4px;
      }
    `)
  })
})
