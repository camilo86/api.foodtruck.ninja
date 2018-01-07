const express = require('express');
const {app, db} = require('./config')(express);

// Routers
app.use('/v1/accounts', require('./routers/account')());

app.listen(process.env.PORT);

module.exports = app;
