export default {
  debug: process.env.NODE_ENV === 'development',
  ENABLE_LOGS: true,
  APP_VERSION: '0.0.1',
  siteName: 'Dexpay',
  siteUrl: 'https://dexpay.me',
  // graphQlUri: 'https://dexpay-graphql.now.sh/',
  graphQlUri: 'http://localhost:4000/',
};
