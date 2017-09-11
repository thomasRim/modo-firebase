const express = require('express');
const router = express.Router();

var admin = require('firebase-admin');
var database = admin.database();

// Endpoint function for fetching request that return all Receipts, Services, Messages and Products
router.get('/', (req, resp) => {
    var result = [];
    database.ref('/receipts').on('value', recCall => {
        result = result.concat(recCall.val());

        database.ref('/services').on('value', servCall => {
            result = result.concat(servCall.val());

            database.ref('/products').on('value', prodCall => {
                result = result.concat(prodCall.val());

                database.ref('/messages').on('value', messCall => {
                    result = result.concat(messCall.val());

                   resp.status(200).send(result);
               });
            });
        });
    });
});

module.exports = router;
