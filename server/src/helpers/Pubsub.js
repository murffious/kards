import User from '../models/trudigital/User';
import UserModel from '../models/trudigital/UserModel';
import Notification from '../models/trudigital/Notification';
import NotificationModel from '../models/trudigital/NotificationModel';
import ContentUpdateModel from '../models/truintelligence/ContentUpdateModel';
import ContentUpdate from '../models/truintelligence/ContentUpdate';

// Importing these connections so the app will cache them.
import {publisherConnection, subscriberConnection} from './RedisConnections';

export let publisher = publisherConnection();
const subscriber = subscriberConnection();
    
subscriber.on('subscribe', ( channel, count ) => {
    publisher.publish('system_events', 'new subscriber');
});

subscriber.on('message', async ( channel, message ) => {

    console.log('Got a message on channel: ', channel);

    if(channel == 'system_events'){

        systemEvent(message);

    } else if(channel == 'content_update'){

        contentUpdate(message);

    }

});

async function contentUpdate(message){

    let event = JSON.parse(message);

    let update_model = new ContentUpdate(ContentUpdateModel);

    update_model.create({
        organization: event.data.organization,
        message: event.data.message,
        type: event.data.type
    });

}

async function systemEvent(message) {
    let event = JSON.parse(message);

    let user_model         = new User(UserModel);
    let notification_model = new Notification(NotificationModel);

    let users = await user_model.find({
        organization: event.data.organization,
    });

    for(let user of users){
        notification_model.create({
            user: user._id,
            message: event.data.message,
        });
    }
}

// Put all the channel subscriptions below.
// In this one, if we publisher.publish('system_events', {'some': 'json'}); the message function will pick it up.
subscriber.subscribe(`system_events`);
subscriber.subscribe('content_update');