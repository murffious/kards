export class Time {
    /**
    * Converts a date representation to a unix timestamp
    *
    * @param  {String} date A date string to be converted
    * @return {Number}      The unix timestamp of the date specified
    */
    static getTimeStamp(date) {
        return new Date(date).getTime() / 1000 | 0
    }
}