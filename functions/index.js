
const app = require('express')();
const functions = require('firebase-functions');

var admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

var home = require('./routes/home');
var products = require('./routes/products');
var services = require('./routes/services');
var receipts = require('./routes/receipts');
var messages = require('./routes/messages');

app.use('/home',home);
app.use('/products',products);
app.use('/services',services);
app.use('/receipts',receipts);
app.use('/messages',messages);

exports.api = functions.https.onRequest(app);

/*

// Endpoint function for fetching all request that interacts with Receipts (get, post, delete etc)
exports.receipts = functions.https.onRequest((req, resp) => {
    refferenceApi(req, resp, '/receipts');
});

// Endpoint function for fetching all request that interacts with Services (get, post, delete etc)
exports.services = functions.https.onRequest((req, resp) => {
    refferenceApi(req, resp,'/services');
});

// Endpoint function for fetching all request that interacts with Products (get, post, delete etc)
exports.products = functions.https.onRequest((req, resp) => {
    refferenceApi(req, resp,'/products');
});

// Endpoint function for fetching all request that interacts with Messages (get, post, delete etc)
exports.messages = functions.https.onRequest((req, resp) => {
    refferenceApi(req, resp, '/messages');
})
exports.tesseract = functions.storage.object().onChange(event => {
        const object = event.data;
        const filePath = object.name;
        const baseFileName = path.basename(filePath, path.extname(filePath));
        const fileDir = path.dirname(filePath);

    console.log('filepath ',filePath);
    console.log('baseFileName ',baseFileName);
    console.log('fileDir ',fileDir);

    // Exit if this is triggered on a file that is not an image.
    if (!object.contentType.startsWith('image/')) {
        console.log('This is not an image.');
        return;
    }

    // Exit if this is a move or deletion event.
    if (object.resourceState === 'not_exists') {
        console.log('This is a deletion event.');
        return;
    }

})
function refferenceApi(req, resp, apiRef) {
    if (req.method === "GET") {
        console.log(apiRef, ' get');

        let message_id = req.path;

        // api/messages/:id
        if (message_id && message_id.length > 1) {
            console.log(' with an id', message_id);
            admin.database().ref(apiRef).child(message_id).on('value', snapshot => {
                resp.status(200).send(snapshot.val());
            })
        } else {
            console.log(' all');
            admin.database().ref(apiRef).on('value', snapshot => {
                resp.status(200).send(snapshot.val());
        })
        }
    } else  if (req.method === "POST") {
        console.log(apiRef, ' post');

        let reqBody = req.body;

        admin.database().ref(apiRef).push(reqBody).then(snapshot => {
            resp.status(200).send(snapshot.name);
    })
    } else if (req.method === "PATCH") {
        console.log(apiRef, ' patch');

        let message_id = req.path;

        let reqBody = req.body;

        admin.database().ref(apiRef).child(message_id).update(reqBody).then(snapshot => {
            resp.status(200).send('{success}');
    })
    } else if (req.method === "DELETE") {
        console.log(apiRef, ' delete');

        let message_id = req.path;

        // api/services/:id
        if (message_id && message_id.length > 1) {
            console.log(' with an id', message_id);
            admin.database().ref(apiRef).child(message_id).remove().then(snapshot => {
                resp.status(200).send('{success}');
        })
        } else {
            console.log(' all');
            admin.database().ref(apiRef).remove().then(snapshot => {
                resp.status(200).send('{success}');
        })
        }
    } else {
        resp.status(500).send('no endpoint found');
    }
}

*/
