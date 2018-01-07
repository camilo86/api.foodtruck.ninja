const mongoose = require('mongoose');

module.exports = () => {
  const dbUrl = process.env.NODE_ENV === 'test' ? process.env.DB_TEST : process.env.DB;
  
  mongoose.connect(dbUrl, {useMongoClient: true});
  mongoose.Promise = global.Promise;
  mongoose.connection.on('error', (error) => {
    console.error('Could not connect to db');
    console.log(error);
    process.exit(1);
  });

  return mongoose;
};
