module.exports = (api) => {
  api.cache(true);

  presets = [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'entry',
        corejs: 3,
        targets: { browsers: 'last 2 versions' },
      }
    ],
    '@babel/preset-typescript',
    '@babel/preset-react',
  ];

  plugins = [
    '@babel/plugin-proposal-export-default-from',
  ];

  return {
    presets,
    plugins,
  };
};