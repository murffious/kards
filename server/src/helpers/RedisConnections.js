import Redis from 'ioredis';


// Once a connection is put into a subscriber mode, it stays in subscriber mode until all subscriptions are cleared.
// Therefore there needs to be a separate subscriber connection.

var subscribe = new Redis(process.env.REDIS_URI, { showFriendlyErrorStack: true });
var regular_and_publish = new Redis(process.env.REDIS_URI, { showFriendlyErrorStack: true });


export const getSetConnection = () => {

    return regular_and_publish;
};

export const publisherConnection = () => {

    return regular_and_publish;
};

export const subscriberConnection = () => {

    return subscribe;
};