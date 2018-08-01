import express from 'express';
import dialogflow from './webhook.service';

const router = express.Router();

router.post('/webhook', (req, res) => {
    dialogflow.dialogflowFirebaseFulfillment(req, res);
});

module.exports = router;