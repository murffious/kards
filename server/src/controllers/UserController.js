import User from '../../models/trudigital/User';
import UserModel from '../../models/trudigital/UserModel';
// import RecoverPassword from '../../models/trudigital/RecoverPassword';
// import RecoverPasswordModel from '../../models/trudigital/RecoverPasswordModel';
// import NodemailerModel from '../../models/nodemailer/Nodemailer';

/**
 * Get a User
 *
 * @param  {Object} req Request object
 * @param  {Object} res Response object
 */
export async function get(req, res) {
    try {
        let user_model = new User(UserModel);
        let user_id = req.swagger.params.user_id.value;

        let user = await user_model.getFromId(user_id);
        res.json(user);
    } catch (err) {
        res.status(400).json({
            error: err.message,
        });
    }
}

/**
 * Register with truDigital
 *
 * @param  {Object} req Request object
 * @param  {Object} res Response object
 */
export async function post(req, res) {
    try {
        let user_model = new User(UserModel);
        let new_user_data = req.swagger.params.user.value;

        let new_user = await user_model.addUser(new_user_data);
        NodemailerModel.sendWelcomeEmail(new_user.email, new_user);

        res.json(new_user);
    } catch (err) {
        res.status(400).json({
            error: err.message,
        });
    }
}

/**
 * Update a user
 */
export async function editUser(req, res) {
    try {
        let user_model = new User(UserModel);
        let update_user = await user_model.update(req.swagger.params.user_id.value,
            req.swagger.params.user.value);

        res.json(update_user);
    } catch (e) {
        res.status(400).json({
            'error': e.message,
        });
    }
}

/**
 * Delete a user
 *
 * @param  {Object} req Request object
 * @param  {Object} res Response object
 */
export async function deleteUser(req, res) {
    try {
        let user_model = new User(UserModel);
        let user_id = req.swagger.params.user_id.value;
        await user_model.delete(user_id);

        // No error thrown, send success
        res.json({
            success: `User with id '${user_id}' has been deleted`,
        });
    } catch (e) {
        res.status(400).json({
            'error': e.message,
        });
    }
}

/**
 * Login to get a token back
 *
 * @param  {Object} req Request object
 * @param  {Object} res Response object
 */
export async function login(req, res) {
    try {
        let user_model = new User(UserModel);
        let user = await user_model.login(req.swagger.params.email.value,
            req.swagger.params.password.value);

        res.json(user);
    } catch (err) {
        res.status(401).json({
            error: err.message,
        });
    }
}

/**
 * Check if a user exists in our system
 *
 * @param  {Object} req Request object
 * @param  {Object} res Response object
 */
export async function userExists(req, res) {
    try {
        let user_model = new User(UserModel);
        let exists = await user_model.checkIfUserExists(
            req.swagger.params.email.value);

        res.json({
            exists: exists,
        });
    } catch (err) {
        res.status(400).json({
            error: err.message,
        });
    }
}

export async function changePassword(req, res) {

    let user_id = req.swagger.params.user_id.value;

    let body = req.swagger.params.body.value;

    try {

        let user = new User(UserModel);

        let userObject = await user.changePassword(user_id, body.old_password,
            body.new_password, body.confirm_new_password);

        res.status(200).json(userObject);

    } catch (e) {

        res.status(400).json({
            error: e.message,
        });

    }
}

export async function getUserNotifications(req, res) {
    let user_id = req.swagger.params.user_id.value;
    try {
        let user_model = new User(UserModel);
        let user_notifications = await user_model.getNotifications(user_id);
        res.status(200).json(user_notifications);
    } catch (e) {
        res.status(400).json({
            error: e.message,
        });
    }
}

export async function passwordResetEmail(req, res) {

    try {

        let email = req.swagger.params.body.value.email;
        let domain = req.swagger.params.body.value.domain;

        let recover_model = new RecoverPassword(RecoverPasswordModel);

        let code = await recover_model.saveCode(email);
        let sent = await recover_model.sendEmail(email, code, domain + '/');

        if (sent) {

            res.status(200).json({'email': email});
        }
    } catch (e) {

        res.status(400).json({
            error: e.message,
        });

    }

}

export async function resetPassword(req, res) {
    try {

        let body = req.swagger.params.body.value;

        if (!body.hasOwnProperty('email')) {
            throw new Error('An email was not provided.');
        }

        if (!body.hasOwnProperty('code')) {
            throw new Error('A code was not provided.');
        }

        if (!body.hasOwnProperty('new_password')) {
            throw new Error('A new password was not provided.');
        }

        if (!body.hasOwnProperty('confirm_new_password')) {
            throw new Error('A confirm new password attribute was not provided.');
        }

        let user_model = new User(UserModel);
        let recover_model = new RecoverPassword(RecoverPasswordModel);

        let passwords_match = await recover_model.passwordsMatch(body.new_password,
            body.confirm_new_password);

        if (!passwords_match) {
            throw new Error('The provided passwords do not match each other.');
        }

        let verifyCode = await recover_model.verifyCode(body.email, body.code);

        if (!verifyCode) {
            throw new Error('The email code pair could not be verified.');
        }

        let reset = await user_model.recoverPassword(body.email, body.new_password);

        if (reset) {
            res.status(200).json({'email': body.email});
        }
    } catch (e) {

        res.status(400).json({
            error: e.message,
        });

    }
}
