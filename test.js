const cssMatcher = require('jest-matcher-css')
const plugin = require('./index.js')
const postcss = require('postcss')
const tailwindcss = require('tailwindcss')

function tailwindConfig(options) {
  return {
    theme: {},
    corePlugins: false,
    plugins: [plugin(options)]
  }
}

const generatePluginCss = (options = {}) => {
  return postcss(
    tailwindcss(tailwindConfig())
  )
  .process('@tailwind utilities;', {
    from: undefined
  })
  .then(result => result.css)
}

expect.extend({
  toMatchCss: cssMatcher
})

test('it generates the default classes', () => {
  generatePluginCss().then(css => {
    expect(css).toMatchCss(`
      .test {
        display: block
      }
    `)
  })
})
