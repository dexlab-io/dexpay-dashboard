module.exports = {
  service: {
    endpoint: {
      url: 'https://dexpay-graphql.now.sh/',
      // optional headers
      headers: {
        authorization: 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjOTRhZjc1N2NkNmNiMDAxMzVjMjM3MSIsImVtYWlsIjoidGVzdDZAdGVzdC5jb20iLCJpYXQiOjE1NTM4NDA0OTN9.agAw7c2H9aY5-zK1SCK8wV7eeR8xeslZdj__R6h2hWQ',
      },
      // optional disable SSL validation check
      skipSSLValidation: true,
    },
  },
};
