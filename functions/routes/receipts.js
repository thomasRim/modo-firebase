const express = require('express');
const router = express.Router();

var admin = require('firebase-admin');
var database = admin.database();

const refPath = '/receipts'

router.get('/:objectID?', (req, resp) => {
    if (req.params.objectID) {
        database.ref(refPath).child(req.params.objectID).on('value',snapshot => {
           resp.status(200).send(snapshot.val())
        })
    } else {
        database.ref(refPath).on('value',snapshot => {
            resp.status(200).send(snapshot.val())
        })
    }
})

router.post('/', (req,resp) => {
    let reqBody = req.body;
    database.ref(refPath).push(reqBody).then(snapshot => {
        resp.status(200).send(snapshot.name)
    })
})

router.patch('/:objectID?', (req, resp) => {
    let message_id = req.params.objectID;
    
    let reqBody = req.body;
    
    database.ref(refPath).child(message_id).update(reqBody).on('value', snapshot => {
                resp.status(200).send('{update:success}');
    })
})

router.delete('/:objectID?', (req,resp) => {
    if (req.params.objectID) {
        database.ref(refPath).child(req.params.objectID).remove().on('value', snapshot => {
            resp.status(200).send('{deleted:success}');
        })
    } else {
        database.ref(refPath).remove().on('value', snapshot => {
            resp.status(200).send('{deleted:success}');
        })
    }
})

module.exports = router;