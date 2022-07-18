const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const SRC_PATH = path.resolve(__dirname, 'src');
const BUILD_PATH = path.resolve(__dirname, 'dist');
const POSTCSS_CONFIG_PATH = path.resolve(__dirname, 'postcss.config.js')

const INDEX_HTML_PATH = path.join(SRC_PATH, 'index.html');

const prod = process.env.NODE_ENV = 'production';

const generateAliases = (aliases, prefix = '@') =>
  aliases.reduce((acc, alias) => ({
    ...acc,
    [prefix + alias]: path.join(SRC_PATH, alias),
  }), {});

const getCssLoaders = (modules = false) => [
  'style-loader',
  {
    loader: 'css-loader',
    options: {
      modules,
      importLoaders: 1,
      sourceMap: false,
    },
  },
  {
    loader: 'postcss-loader',
    options: {
      postcssOptions: {
        config: POSTCSS_CONFIG_PATH,
        plugins: () => [require('autoprefixer')()],
      },
    },
  },
  {
    loader: 'sass-loader',
    options: {
      sassOptions: {
        includePaths: [SRC_PATH, path.join(SRC_PATH, 'styles')],
      },
    },
  }
];

module.exports = {
  mode: prod ? 'production' : 'development',
  context: SRC_PATH,
  devtool: prod ? 'hidden-source-map' : 'source-map',
  entry: './index.tsx',
  output: {
    path: BUILD_PATH,
    filename: '[name].[fullhash:8].js',
    clean: true,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: generateAliases([
      'utils',
      'components',
    ]),
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.(s?css|sass)$/i,
        exclude: /\.module\.(s?css|sass)$/,
        use: getCssLoaders(),
      },
      {
        test: /\.module\.(s?css|sass)$/,
        use: getCssLoaders(true),
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: INDEX_HTML_PATH,
    }),
  ],
};