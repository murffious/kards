import mongoose from 'mongoose';

export default class Validation{
	constructor() {}

	static isValidObjectId(string) {
		if( mongoose.Types.ObjectId.isValid(string) ){
			return true;
		}
		return false;
	}
}