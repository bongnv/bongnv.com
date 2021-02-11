module.exports = {
  "*.{js,jsx,ts,tsx}": ["npm run lint"],
  "{*.{json,md,mdx,yml,yaml}}": ["prettier --write"],
};
