const express = require('express')
const router = express.Router()

var admin = require('firebase-admin')
var database = admin.database()

const refPath = '/receipts'

router.get('/:objectID?', (req, resp) => {
  if (req.params.objectID) {
    database.ref(refPath).child(req.params.objectID).on('value', snapshot => {
      resp.status(200).send(snapshot.val())
    })
  } else {
    database.ref(refPath).on('value', snapshot => {
      resp.status(200).send(snapshot.val())
    })
  }
})

router.post('/', (req, resp) => {
  let reqBody = req.body

  let key = 'Receipt' + Date.now().toString()
  console.log(key)
  reqBody['id'] = key
  database.ref(refPath + '/' + key).set(reqBody , (error => {
    if (error) {
      resp.status(400).send('{created: ' + error.message + ' }')
    } else {
      resp.status(200).send('{created:success}')
    }
  }))
})

router.patch('/:objectID?', (req, resp) => {
  let message_id = req.params.objectID

  let reqBody = req.body

  database.ref(refPath).child(message_id).update(reqBody, (error => {
    resp.status(200).send('{update:success}')
  }))
})

router.delete('/:objectID?', (req, resp) => {
  if (req.params.objectID) {
    database.ref(refPath).child(req.params.objectID).remove((error => {
      if (error) {
        resp.status(400).send('{deleted: ' + error.message + ' }')
      } else {
        resp.status(200).send('{deleted:success}')
      }
    }))
  } else {
    database.ref(refPath).remove((error => {
      if (error) {
        resp.status(400).send('{deleted: ' + error.message + ' }')
      } else {
        resp.status(200).send('{deleted:success}')
      }
    }))
  }
})

module.exports = router
