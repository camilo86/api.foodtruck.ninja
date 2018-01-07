const express = require('express');
const app = express();

app.use(express.json());
app.get('/', (req, res) => res.json({ messsage: 'Hello Ninja' }));

app.listen(process.env.PORT, () => {
  console.log(`api.foodtruck.ninja is running in port ${process.env.PORT}`);
});

module.exports = app;
