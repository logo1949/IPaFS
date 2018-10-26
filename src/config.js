const config = {
  express: {
      url: `http://127.0.0.1:`,   
      port: '3001'     
  },

  db: {
      testUrl:`mongodb://localhost:27017/test`,
      usersUrl:`mongodb://localhost:27017/users`
  },
  ipfsApi: {
    host: `localhost`
}
}

module.exports = config;