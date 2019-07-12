const map = require('lodash/map')

module.exports = variants => ({ addUtilities, e, theme }) => {
  const themeOptions = theme('outlineOffset') || {}

  map(themeOptions, (value, key) => {
    addUtilities(
      {
        [`.outline-offset-${e(key)}`]: {
          outlineOffset: value,
        },
      },
      variants
    )
  })
}
