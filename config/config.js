import path from 'path';
let rootPath = path.normalize(`${__dirname}/..`);

module.exports = {
  development: {
    root: rootPath,
    db: {
      host: 'localhost',
      port: '5432',
      name: 'test',
      user: 'test',
      password: 'test',
      dialect: 'postgres'
    },
    app: {
      name: 'Grid Admin',
      port: 3001
    }
  },
  test: {
    root: rootPath,
    db: {
      dialect: 'postgres'
    },
    app: {
      name: 'Grid Admin TEST',
      port: 3001
    }
  },
  production: {
    app: {
      name: 'Grid Admin PROD',
      port: 3001
    }
  }
};
