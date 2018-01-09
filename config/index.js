module.exports = (express) => {
  const auth = require('./auth')();
  const db = require('./db')();
  const app = express();

  app.use(express.json());

  return {app, db, auth};
};
