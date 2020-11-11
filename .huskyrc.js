module.exports = {
  hooks: {
    "pre-commit": ["yarn type-check && lint-staged"],
  },
};
