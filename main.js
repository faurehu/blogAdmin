import app from 'app';
import BrowserWindow from 'browser-window';

require('crash-reporter').start();

let mainWindow;

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('ready', () => {
  mainWindow = new BrowserWindow({width: 800, height: 600});
  mainWindow.loadUrl(`file://${__dirname}/index.html`);
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
});

let sequelize = require('./model/index');

require('./src/ipc')(sequelize);
