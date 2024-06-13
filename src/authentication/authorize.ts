import fs from 'fs';
import { ROOT_DIR } from '../../constants';
import HostipWebSocket from '../websocket/host-ip-websocket';
import InitialiseMessage from '../messages/initialise-message';
import InvalidSubscriptionMessage from '../messages/invalid-subscription-message';
import config from '../../config'

const authorize = async(message: InitialiseMessage, websocket: HostipWebSocket, randomSubdomain: string) : Promise<boolean> => {
    const { apiKey } = message;
    const apiKeys = [config.server.apiKey];

    const apiKeyRecord = apiKeys.find((record: any) => {
        return record == apiKey;
    });

    // No API key record. Send back a message, close the connection and return false 
    if (typeof apiKeyRecord == 'undefined') {
        const invalidSubscriptionMessage : InvalidSubscriptionMessage = {
            type: "invalidSubscription",
            apiKey: apiKey
        }

        websocket.sendMessage(invalidSubscriptionMessage);
        websocket.close();
        return false;
    }

    return true;
}

export {
    authorize
}
