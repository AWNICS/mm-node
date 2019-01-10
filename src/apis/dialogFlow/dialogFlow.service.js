import log from '../../config/log4js.config';
import dialogFlow from '../../config/dialogFlow.config';

const sessionClient = dialogFlow.sessionClient;
const sessionPath = dialogFlow.sessionPath;

class DialogFlowService {

    callDialogFlowApi(qeryText, callback) {
        const languageCode = 'en-US';
        const request = {
            session: sessionPath,
            queryInput: {
                text: {
                    text: qeryText,
                    languageCode: languageCode,
                },
            },
        };
        // Send request and log result
        sessionClient
            .detectIntent(request)
            .then(responses => {
                const result = responses[0].queryResult;
                callback(result.fulfillmentMessages);
                if (result.intent) {
                    log.info(`  Intent: ${result.intent.displayName}`);
                } else {
                    log.error(`  No intent matched.`);
                }
            })
            .catch(err => {
                log.error('ERROR:', err);
            });
    }
}

export default DialogFlowService;