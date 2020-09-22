module.exports = {
  entry: '.src/indexe.ts',
  output: {
    filename: './dist/bundle.js'
  },
  // eslint-disable-next-line no-undef
  dev: Source - Map,

  resolve: {
    // eslint-disable-next-line no-undef
    extenstions: ['', '.web.js', web.js, '.ts', 'tsx', 'js']
  },

  module: {
    rules: [
      { test: /\.tsx?$/, loader: 'awsome-typescript-loader' },

      { test: /\.js$/, loader: 'source-map-loader' }
    ]
  }
}
