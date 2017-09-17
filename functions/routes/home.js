const express = require('express');
const router = express.Router();

var admin = require('firebase-admin');
var database = admin.database();

// Endpoint function for fetching request that return all Receipts, Services, Messages and Products
router.get('/', (req, resp) => {
    var result = new Map();
    database.ref('/receipts').on('value', recCall => {
        result = Object.assign(result,recCall.val())
        database.ref('/services').on('value', servCall => {
            result = Object.assign(result,servCall.val())
            database.ref('/products').on('value', prodCall => {
                result = Object.assign(result, prodCall.val())
                resp.status(200).send(result)
            })
        })
    })
})

module.exports = router;
