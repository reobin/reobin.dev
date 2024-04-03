/** @type {import("prettier").Config} */
module.exports = {
  plugins: ['prettier-plugin-astro'],
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'all',
  arrowParens: 'avoid',
  overrides: [{ files: '*.astro', options: { parser: 'astro' } }],
};
