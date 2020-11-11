module.exports = {
  "*.{js,jsx,ts,tsx}": ["yarn lint"],
  "{*.{json,md,mdx,yml,yaml}}": ["prettier --write"],
};
