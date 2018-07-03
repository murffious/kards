import {getSetConnection} from './RedisConnections';

/**
 * Redis helper Module
 *
 * This is a centralized connection point for redis
 * Import this module to use redis
 */

export default class RedisClient{

    constructor(props) {
        this.Redis = getSetConnection();


        // Uncomment to monitor all the Redis stuff
        // this.Redis.monitor(function (err, res) {
        //     console.log("Entering monitoring mode.");
        // });
        // this.Redis.set('foo', 'bar');
        //
        // this.Redis.on("monitor", function (time, args, raw_reply) {
        //     console.log(time + ": " + args); // 1458910076.446514:['set', 'foo', 'bar']
        // });


    }

    getKey( redis_key ) {

        return new Promise( (resolve, reject) => {
            this.Redis.get(redis_key, (err, reply) => {
                if( typeof reply == 'string'){
                    reply = JSON.parse(reply);
                }
                this.Redis.ttl(redis_key, (err, data) => {
                });
                resolve(reply);
            });
        });
    }

    setKey( redis_key, data, ttl = 86400 ){

        return new Promise( (resolve, reject) => {
            this.Redis.set(redis_key, JSON.stringify(data), (err, reply) => {
                if( err ){
                    reject( err );
                }
                this.Redis.expire(redis_key, ttl);
                resolve(reply);
            });
        })
    }

    deleteKey( redis_key ) {
        this.checkConnection();
        return new Promise( (resolve, reject) => {
            this.Redis.del(redis_key);
            resolve(redis_key);
        });
    }

}
