
const app = require('express')();
const functions = require('firebase-functions');

var admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

var home = require('./routes/home');
var products = require('./routes/products');
var services = require('./routes/services');
var receipts = require('./routes/receipts');

app.use('/home',home);
app.use('/products',products);
app.use('/services',services);
app.use('/receipts',receipts);

exports.api = functions.https.onRequest(app);
