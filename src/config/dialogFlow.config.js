import dialogflow from 'dialogflow';
import Dotenv from 'dotenv';

const dotenv = Dotenv.config({ path: '.env.dev' });

const projectId = process.env.DIALOGFLOW_PROJECT_ID;
const sessionId = process.env.DIALOGFLOW_SESSION_ID;
// Instantiate a DialogFlow client.

const sessionClient = new dialogflow.SessionsClient({
    keyFilename: './src/util/MesoBot-e36b2ab1148c.json'
});

const sessionPath = sessionClient.sessionPath(projectId, sessionId);

module.exports = { sessionClient: sessionClient, sessionPath: sessionPath };