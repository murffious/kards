import assert from 'assert';
import sinon from 'sinon';
import User from '../../../models/trudigital/User';
import UserModel from '../../../models/trudigital/UserModel';
import Security from '../../../helpers/Security';

describe('TruDigital User Model', () => {
    describe('#constructor', () => {
        it('should throw when no UserModel is given', () => {
            assert.throws(() => {
                new User();
            });
        });
        it('should throw when an invalid UserModel is given', () => {
            assert.throws(() => {
                new User([1234, 'test']);
            });
        });
        it('should not throw when a valid UserModel is given', () => {
            assert.doesNotThrow(() => {
                new User(UserModel);
            });
        });
    });

    describe('#find', () => {
        it('should return a list of users', async () => {
            let user_model     = new User(UserModel);
            let mock_user_data = [
                { username: 'testing' },
                { username: 'also_testing'},
            ];

            let mock_user_find = sinon.stub(UserModel, 'find').returns(mock_user_data);
            let users_list = await user_model.find({});

            assert.equal(users_list, mock_user_data);
        });
    });

    describe('#getFromId', () => {
        it('should throw when no `user_id` is set', async () => {
            try{
                let user_model = new User(UserModel);
                await user_model.getFromId();
                assert.fail('Error', 'Success');
            } catch(e){
                assert.ok(e.message)
            }
        });
        it('should throw when no user is found', async () => {
            let mock_user_get = sinon.stub(UserModel, 'findById').returns(null);
            try{

                let user_model = new User(UserModel);

                let user = await user_model.getFromId('0000000000000000000');

                assert.fail('Error', 'Success');

            } catch(e) {
                assert.ok(e.message);
            }
            mock_user_get.restore();
        });
        it('should return a user object on success', async () => {
            let user_model = new User(UserModel);
            let mock_user_data = {
                username: 'username',
                organization_id: '000000000000000000000'
            }

            let mock_user_get = sinon.stub(UserModel, 'findById').returns(mock_user_data);
            let user = await user_model.getFromId('0000000000000000000');

            assert.equal(user, mock_user_data);
            mock_user_get.restore();
        })
    })

    describe('#addUser', () => {
        it('should throw when no user data is given', async () => {
            try {
                let user_model = new User(UserModel);
                await user_model.addUser();
            } catch (err) {
                return assert.ok(err.message);
            }
            assert.fail('Error', 'Success');
        });
        it('should throw when no email is given', async () => {
            try {
                let user_model = new User(UserModel);
                await user_model.addUser({ password: 'test', type: 'admin '});
            } catch (err) {
                return assert.ok(err.message);
            }
            assert.fail('Error', 'Success');
        });
        it('should throw when no password is given', async () => {
            try {
                let user_model = new User(UserModel);
                await user_model.addUser({ email: 'test', type: 'admin '});
            } catch (err) {
                return assert.ok(err.message);
            }
            assert.fail('Error', 'Success');
        });
        it('should throw when no type is given', async () => {
            try {
                let user_model = new User(UserModel);
                await user_model.addUser({ email: 'test', password: 'admin '});
            } catch (err) {
                return assert.ok(err.message);
            }
            assert.fail('Error', 'Success');
        });
        it('should return the new user data when created', async () => {
            let new_user_data = {
                email: 'devteam',
                password: 'hashmash',
                type: 'admin',
                toObject: function(){
                    return this;
                },
            };
            let mock_check_user = sinon.stub(User.prototype, 'checkIfUserExists').returns(false);
            let mock_get_token = sinon.stub(Security, 'getNewUserToken').returns('token');
            let mock_hash_password = sinon.stub(Security, 'hashPassword').returns(new Promise((resolve) => {
                resolve('hi');
            }));
            let mock_db_new_user_function = sinon.stub(UserModel.prototype, 'save').returns(new_user_data);
            let user_model = new User(UserModel);
            let new_user = await user_model.addUser(new_user_data);
            mock_get_token.restore();
            mock_check_user.restore();
            mock_hash_password.restore();
            mock_db_new_user_function.restore();
            assert.equal(new_user, new_user_data);
        });
    });

    describe('#login', () => {
        it('should throw when no `email` is set', async () => {
            try{
                let user_model = new User(UserModel);
                await user_model.login();
                assert.fail('Error', 'Success');
            } catch(e) {
                assert.ok(e.message);
            }
        });
        it('should throw when no `password` is set', async () => {
            try{
                let user_model = new User(UserModel);
                await user_model.login('email_string');
                assert.fail('Error', 'Success');
            } catch(e) {
                assert.ok(e.message);
            }
        });
        it('should throw when `email` is not in the system', async () => {
            let mock_user_exists = sinon.stub(UserModel, 'findOne').returns({
                select: () => {
                    return null;
                }
            });

            try{
                let user_model = new User(UserModel);
                await user_model.login('email_string', 'password_string');
                assert.fail('Error', 'Success');
            } catch(e) {
                assert.ok(e.message);
            }
            mock_user_exists.restore();
        });

        it('should throw if password doesn\'t match', async () => {
            let mock_user_exists = sinon.stub(UserModel, 'findOne').returns({
                select: () => {
                    return true;
                }
            });

            let mock_security_password_compare = sinon.stub(Security, 'comparePasswordToHash').returns(false);

            try{
                let user_model = new User(UserModel);
                await user_model.login('email_string', 'password_string');
                assert.fail('Error', 'Success');
            } catch(e) {
                assert.ok(e.message);
            }
            mock_user_exists.restore(); 
            mock_security_password_compare.restore();
        });

        it('should return a user object if `email` and `password` are correct', async () => {            
            let mock_security_password_compare = sinon.stub(Security, 'comparePasswordToHash').returns(true);
            let mock_security_new_token        = sinon.stub(Security, 'getNewUserToken').returns('jwt_string');
            let mock_user_find                 = sinon.stub(UserModel, 'findById').returns({
                toObject: () => {
                    return {}
                }
            });
            let mock_user_exists               = sinon.stub(UserModel, 'findOne').returns({
                select: () => {
                    return true;
                }
            });

            try{
                let user_model = new User(UserModel);
                let user = await user_model.login('email_string', 'password_string');

            } catch(e) {
                assert.fail(e.message);

            }
            mock_user_find.restore(); 
            mock_user_exists.restore(); 
            mock_security_new_token.restore();
            mock_security_password_compare.restore();
        })
    });
    
    describe('#checkIfUserExists', () => {
        it('should throw when no email is passed', async () => {
            let user_model = new User(UserModel);
            try {
                await user_model.checkIfUserExists();
            } catch (err) {
                return assert.ok(err.message);
            }
            assert.fail('Error', 'Success');
        });
        
        it('should return true when a email is found', async () => {
            let mock_db_check_function = sinon.stub(UserModel, 'findOne').returns({ email: 'test'});
            let user_model = new User(UserModel);
            let user_exists = await user_model.checkIfUserExists('test');

            mock_db_check_function.restore();
            assert.ok(user_exists);
        });
        
        it('should return false when a email is not found', async () => {
            let mock_db_check_function = sinon.stub(UserModel, 'findOne').returns(null);
            let user_model = new User(UserModel);
            let user_exists = await user_model.checkIfUserExists('test');
            mock_db_check_function.restore();
            assert.ok(!user_exists);
        });

    });

    describe('#update', () => {
        it('should throw when `user_id` is not set', async () => {
            let user_model = new User(UserModel);
            try{
                await user_model.update();
                assert.fail('Error', 'Success');
            } catch(e) {
                assert.ok(e.message);
            }
        });

        it('should throw when `update_data` is not set', async () => {
            let user_model = new User(UserModel);
            try{
                await user_model.update('user_id');
                assert.fail('Error', 'Success');
            } catch(e) {
                assert.ok(e.message);
            }
        });

        it('should throw when user changes their email to one that is already registered', async () => {
            let mock_user_exists = sinon.stub(UserModel, 'findOne').returns({
                select: () => {
                    return true;
                }
            });
            
            let user_model = new User(UserModel);
            
            try{
                await user_model.update('000000000000000', {email: 'email_string'});
                assert.fail('Error', 'Success');
            } catch(e) {
                assert.ok(e.message);
            }
            mock_user_exists.restore();
        })
    });

    describe('#checkPassword', () => {
        it('should throw when `password` is set but `current_password` is not', async () => {
            let user_model = new User(UserModel);
            try{
                await user_model.checkPassword({ password: 'password', current_password: undefined });
                assert.fail('Error', 'Success');
            } catch (e) {
                assert.ok(e.message);
            }
        });

        it('should throw if `current_password` doesn\'t match', async () => {

            let mock_security_password_compare = sinon.stub(Security, 'comparePasswordToHash').returns(false);

            try{
                let user_model = new User(UserModel);
                await user_model.checkPassword({password: 'password', current_password: 'test'});
                assert.fail('Error', 'Success');
            } catch(e) {
                assert.ok(e.message);
            }
            mock_security_password_compare.restore();
        });
    });

    describe('#delete', async () => {
        it('should throw when no `user_id` is provided', async () => {
            let user_model = new User(UserModel);
            try{
                await user_model.delete()
                assert.fail('Error', 'Success');
            } catch(e) {
                assert.ok(e.message);
            }
        });
        it('should not throw when user is deleted', async () => {
            try{
                let user_model = new User(UserModel);
                let mock_user_delete = sinon.stub(UserModel, 'findByIdAndRemove').returns({
                    exec: () => {
                        return null;
                    }
                });

                await user_model.delete('00000000000');
            } catch(e) {
                assert.fail(e.message);
            }
        })
    });
});