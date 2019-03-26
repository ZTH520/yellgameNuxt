module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'Yellgame-Play the best HTML5 Games for free! High quality HTML5 games.',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'apple-mobile-web-app-capable',content:'yes'},
      { name: "apple-touch-fullscreen", content:"yes"},
      { name: "fullscreen", content:"yes"},
      { name: "x5-fullscreen", content:"yes"},
      { 'http-equiv':'X-UA-Compatible',content:'IE=edge,chrome=1'},
      { name: "keywords", content:"Mobile Games, Tablet Games, Html5 Games, h5 games, online game, free game, free online games, yellgame, yellgame.com, HTML5, H5, instant games, The Best Online Games, Popular Games, Every Day New Games, Multiplayer Game, Action Game, Adventure Game, Puzzle Game, Sports Game, Racing Game"},
      { name: "description", content:"Play Free Mobile Games and Tablet Games on yellgame.com. All these html5 games can be played on your mobile, pad and tablet directly without installation. Enjoy!"},
    ],
  },
  css:['~assets/style/bass.less','~assets/style/reset.css'],
  plugins:[
    {src: '~/plugins/iview', ssr: true},
    {src: '~/plugins/axios', ssr: true},
    { src: "~/plugins/vue-lazyload.js" ,ssr: false}
  ],
  /*
  ** Customize the progress bar color
  */
  loading: false,
  /*
  ** Build configuration
  */
  build: {
    loaders:[
      {
        test:/\.(png|jpe?g|gif|svg)$/,
        loader:"url-loader",
        query:{
          limit:10000,
          name:'img/[name].[hash].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'fonts/[name].[hash:7].[ext]'
        }
      }
    ],
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}

