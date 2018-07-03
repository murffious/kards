import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

// For CLI we need to load detenv.
if(!process.env.ENVIRONMENT){
    require('dotenv').config();
}

const SHARED_SECRET = process.env.JWT_SECRET_ACCESS_KEY;
const SALT_ROUNDS = 10;
const TOKEN_EXPIRE_LENGTH = '24h';

// URL Paths that do not require authentication
let NO_AUTH_PATHS = [
    '/v1/swagger',
    '/v1/docs',
    '/v1/quotefancy/available-collections',
    '/v1/trudigital/template_render/'
];

/**
 * Security Class used for basic security operations
 */
export default class Security {
    /**
     * Protected and private function to register new applicatons with truDigital
     */
    static registerApplication(application) {
        if (!application) {
            throw new Error('Must provide an application name to register an app token');
        }
        // Client token is used for client side requests, and server token is used for server side request
        // The client token needs to only have access to publically available information
        let server_token =jwt.sign({ app: application }, SHARED_SECRET);
        let client_token = jwt.sign({ client_app: application, permissions: [] }, SHARED_SECRET);
        return {
            server_token: server_token,
            client_token: client_token,
        };
    }

    /**
     * Get a new user token
     *
     * @param {String} username     The username of the user
     * @param {Array}  permissions  The permissions given to that user
     * @returns                     A token generated for api access
     */
    static getNewUserToken(username, permissions, group, organization) {
        var token = jwt.sign({
            username,
            permissions,
            group,
            organization
        }, SHARED_SECRET, { expiresIn: TOKEN_EXPIRE_LENGTH });
        return token;
    }

    static getNewPlayerToken( player ) {
        if( !player ){
            throw new Error('No player object specified');
        }
        var token = jwt.sign({ 
            player_id: player._id, 
            organization_id: player.organization._id,
            app: player.organization.app,
            orientation: player.orientation 
        }, SHARED_SECRET, { expiresIn: TOKEN_EXPIRE_LENGTH });
        return token;
    }

    /**
     * Hash a password
     *
     * @param {String} password The password to be hashed
     * @returns                 The hashed password
     */
    static async hashPassword(password) {
        if (!password) {
            throw new Error('A password must be provided to hash a password');
        }
        let hash = await bcrypt.hash(password, SALT_ROUNDS);
        return hash;
    }

    /**
     * Compare a password with a hash
     *
     * @param {String} raw_password The raw password string to compare
     * @param {String} hash         The hashed string to compare to the raw_password
     * @returns                     Bool, whether or not the password matches the hash
     */
    static async comparePasswordToHash(raw_password, hash) {
        if (!raw_password) {
            throw new Error('Must provide a raw password to compare with the hash');
        }
        if (!hash) {
            throw new Error('Must provide a hash to compare with the raw_password');
        }
        let match = await bcrypt.compare(raw_password, hash);
        return match;
    }

    /**
     * Identify the incoming api requests
     *
     * @return {Function}      A middleware security function for checking API access
     */
    identify() {
        /**
         * Middleware function that identifies the user based on their Provided credentials
         *
         * @param  {Object}   req  Request object
         * @param  {Object}   res  Response Object
         * @param  {Function} next The middleware callback to go to the next operation
         */
        return (req, res, next) => {
            try {
                if (NO_AUTH_PATHS.includes(req.path)) {
                    next();
                } else {
                    // Throw when they don't provide Authorization header
                    if (!req.get('Authorization')) {
                        throw new Error('Must provide an API Key to access resources');
                    }

                    let token = req.get('Authorization').split('Bearer ')[1];

                    // Throw when Authorization format is incorrect
                    if (!token) {
                        throw new Error('Authorization header value must be formatted like: `Bearer [TOKEN]`');
                    }

                    let valid_token = jwt.verify(token, SHARED_SECRET);

                    if (valid_token) {
                        process.env.TOKEN = token;
                        // Add parsed JWT data to the req for other controllers to use it

                        if( valid_token.hasOwnProperty('organization') ){
                            req.organization_id = valid_token.organization;
                        } else if ( valid_token.hasOwnProperty('organization_id') ) {
                            req.organization_id = valid_token.organization_id;
                        }


                        if (valid_token.player_id) {
                            req.player_id   = valid_token.player_id;
                            req.orientation = valid_token.orientation;
                        }

                        if(valid_token.username) {
                            req.username = valid_token.username;
                        }
                        next();
                    } else {
                        throw new Error('API Key provided is not valid');
                    }
                }
            } catch (err) {
                res.status(401).json({
                    error: err.message,
                });
            }
        };
    }

    /**
     * Hash the Request URL
     * Used as a request identifier
     *
     * @param  {String} url The URL of the request
     * @return {String}     The Hashed URL
     */
    static hashRequestUrl(url, salt = '03/01/2017T00:45:32') {
        let hash = crypto.createHmac('sha1', salt);
        hash.update(url);
        return hash.digest('hex');
    }
}