
const app = require('express')()
const app2 = require('express')()
const functions = require('firebase-functions')

var admin = require('firebase-admin')

admin.initializeApp(functions.config().firebase)

var home = require('./routes/home')
var products = require('./routes/products')
var services = require('./routes/services')
var receipts = require('./routes/receipts')

var test = require('./routes/test')

app.use('/home',home)
app.use('/products',products)
app.use('/services',services)
app.use('/receipts',receipts)

app2.use('/',test)

exports.api = functions.https.onRequest(app)
exports.test = functions.https.onRequest(app2)

exports.new = functions.https.onRequest((req,resp) => {
    console.log('asdlijvlsdjfbvlsdjfv')
    resp.status(200).send('dff')
})
