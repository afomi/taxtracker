const isProd = process.env.JEKYLL_ENV === 'production';

module.exports = {
  plugins: [
    require('@tailwindcss/postcss')(),
    require('autoprefixer'),
    ...(isProd ? [require('cssnano')({ preset: 'default' })] : []),
  ],
};
