module.exports = (express) => {
  const db = require('./db')();
  const app = express();

  app.use(express.json());

  return {app, db};
};
