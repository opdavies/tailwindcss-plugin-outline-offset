module.exports = (variants) => ({ addComponents, addUtilities, config, e, theme }) => {
  addUtilities({
    ['.test']: {
      display: 'block'
    }
  }, variants)
}
