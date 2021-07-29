const withOffline = require('next-offline');

module.exports = withOffline({
  target: process.env.NEXT_TARGET || 'experimental-serverless-trace',
  workboxOpts: {
    swDest: 'static/service-worker.js',
    runtimeCaching: [
      {
        urlPattern: /[.](png|jpg|ico|css)/,
        handler: 'CacheFirst',
        options: {
          cacheName: 'assets-cache',
          cacheableResponse: {
            statuses: [0, 200]
          }
        }
      },
      {
        urlPattern: /^https:\/\/code\.getmdl\.io.*/,
        handler: 'CacheFirst',
        options: {
          cacheName: 'lib-cache'
        }
      },
      {
        urlPattern: /^http.*/,
        handler: 'NetworkFirst',
        options: {
          cacheName: 'http-cache'
        }
      }
    ]
  },
  env: {
    API_URL: process.env.API_URL || 'http://localhost:8000',
    FIREBASE_API_KEY:
      process.env.FIREBASE_API_KEY || 'AIzaSyCk_nFDtKpMjQEW7iny4frI5iW4AoE8LZI',
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID || 'tnc-xagoe-dev',
    FIREBASE_DATABASE_URL:
      process.env.FIREBASE_DATABASE_URL ||
      'https://tnc-xagoe-dev.firebaseio.com',
    FACEBOOK_APP_ID: process.env.FACEBOOK_APP_ID || 0,
    WEB_URL: process.env.WEB_URL || 'http://localhost:3000',
    CMS_URL: process.env.CMS_URL || 'http://localhost:1337',
    GOOGLE_ANALYTICS_TAG: process.env.GOOGLE_ANALYTICS_TAG || 'UA-164939499-1'
  }
});
