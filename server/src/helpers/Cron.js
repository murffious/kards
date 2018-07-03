import GooglePlaces      from '../models/google/Places';
import Organization      from '../models/trudigital/Organization';
import OrganizationModel from '../models/trudigital/OrganizationModel';
import Keyword from '../models/truintelligence/Keyword';
import KeywordModel from '../models/truintelligence/KeywordModel';

import Places            from '../models/truintelligence/Places';
import PlacesModel       from '../models/truintelligence/PlacesModel';
import Player            from '../models/trudigital/Player';
import PlayerModel       from '../models/trudigital/PlayerModel';
let cron = require('node-cron');

// All cron function names we want to schedule on init.
let schedule = [ 
    'dailyEmails',
    'playerConnectivity',
    'newKeywordResults',
    'placesUpdate'
];

export default class Cron{

    // Call all the cron schedule functions we have in our schedule array.
    init(){
        schedule.map((item) => {
            this[item]();
        });
    }

    dailyEmails() {
        cron.schedule('* * * * *', function () {
            let org = new Organization(OrganizationModel);
            org.checkForLazyPlayers();

        });
    }

    playerConnectivity() {
        cron.schedule('* * * * *', async function () {
            let player_model = new Player(PlayerModel);
            await player_model.getDisconnectedPlayers();
        });
    }

    newKeywordResults() {
        cron.schedule('0 3 * * *', function () {
            let keyword = new Keyword(KeywordModel);
            keyword.keywordSearch();
        });
    }

    placesUpdate(){
        cron.schedule('*/5 * * * *', async () => {

            let places_model       = new Places(PlacesModel);
            let organization_model = new Organization(OrganizationModel);
            let organizations      = await organization_model.find({});

            let place_ids = [];

            organizations.map((organization) => {
                if(organization.place && place_ids.indexOf(organization.place) === -1){
                    place_ids.push(organization.place);
                }
            });

            let places = await places_model.find({
                _id: {
                    $in: place_ids
                },
                $or: [{
                    modified: {
                        $lte: Date.now() - 60480000, // One week in Miliseconds
                    }
                    
                },{
                    modified: null
                }]
            },
            {
                modified: 1
            });

            if( places.length == 0 ){
                console.warn('Cron :: Places Update :: Nothing to Update');
                return;
            } 

            let place = places[0];

            let coordinates   = `${place.lat},${place.lng}`
            let nearby_places = await GooglePlaces.getNearbyPlaces(coordinates, 'car_repair', 50000);

            // Get the place deets
            let details = await GooglePlaces.getPlaceDetails(place.place_id);
            nearby_places.push(details.result);
            await places_model.savePlaces(nearby_places);
        })
    }
}
