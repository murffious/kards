export default class Email {
	constructor (email){
		this.email = email;
		this.pattern = 	/^([a-zA-Z0-9_\-\.\+]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
	}

	isValid() {
		if( this.email.match(this.pattern) === null ){
			return false;
		}
		return true;
	}

	static isValidEmail ( email ){ 
		let email_object = new Email( email );
		return email_object.isValid();
	}
}