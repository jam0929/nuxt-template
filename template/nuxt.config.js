/*
** Global Sass Configuration
*/
const isVueRule = rule => rule.test.toString() === '/\\.vue$/';
const isSassRule = rule => ['/\\.scss$/'].indexOf(rule.test.toString()) !== -1;
const sassResourcesLoader = {
  loader: 'sass-loader',
  options: {
    includePaths: [__dirname],
    data: '@import "~/assets/sass/config.scss";'
  }
};

/*
 ** Nuxt Configuration
 */
module.exports = {
  /*
  ** Environment variables
  */
  env: {
    api: {
      host: 'http://api-test.terafunding.com',
      version: 'v1',
      credential: {
        grant_type: 'password',
        client_id: 'tera-www',
        client_secret: 'PYfEw6bWpRPRt9UsaL6kxBf9UxfSs62V',
      },
    },
  },
  /*
  ** Transition
  */
  transition: {
    name: 'layout',
    mode: 'out-in',
  },
  /*
  ** Loading
  */
  loading: {
    color: '#2677CC',
    failedColor: '#DC245C',
    duration: 5000,
    height: '5px',
  },
  /*
  ** CSS Global Import
  */
  css: [
    { src: '~/assets/sass/main.scss', lang: 'scss' },
    { src: 'vue-material/dist/vue-material.min.css', lang: 'css' },
  ],
  /*
  ** Plugins
  */
  plugins: [
    { src: '~/plugins/vue-material', ssr: true },
  ],
  /*
  ** Headers of the page
  */
  head: {
    title: 'scaffolding',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', type: 'text/css', href: 'https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.min.css' },
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
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
    },
    /*
    ** Sass reousrce loader: Global Sass Variable Enable
    */
   extend (config) {
     config.module.rules.forEach(rule => {
        if(isVueRule(rule)) {
          rule.options.loaders.scss.pop();
          rule.options.loaders.scss.push(sassResourcesLoader);
        }
        if(isSassRule(rule)) {
          rule.use.pop();
          rule.use.push(sassResourcesLoader);
        }
     })
    },
  }
}

