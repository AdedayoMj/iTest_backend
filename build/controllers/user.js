"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logging_1 = __importDefault(require("../config/logging"));
const user_1 = __importDefault(require("../models/user"));
const mongoose_1 = __importDefault(require("mongoose"));
const validate = (req, res, next) => {
    logging_1.default.info('Token validated, ensuring user.');
    let firebase = res.locals.firebase;
    return user_1.default.findOne({ uid: firebase.uid })
        .then((user) => {
        if (user) {
            return res.status(200).json({ user });
        }
        else {
            return res.status(401).json({
                message: 'Token(s) invalid, user not found'
            });
        }
    })
        .catch((error) => {
        return res.status(500).json({
            message: error.message,
            error
        });
    });
};
const create = (req, res, next) => {
    logging_1.default.info('Attempting to register user ...');
    let { uid, name, email } = req.body;
    let fire_token = res.locals.fire_token;
    const user = new user_1.default({
        _id: new mongoose_1.default.Types.ObjectId(),
        uid,
        name,
        email
    });
    return user
        .save()
        .then((newUser) => {
        logging_1.default.info(`New user ${uid} created`);
        return res.status(200).json({ user: newUser, fire_token });
    })
        .catch((error) => {
        logging_1.default.error(error.message);
        return res.status(500).json({
            message: error.message
        });
    });
};
const login = (req, res, next) => {
    logging_1.default.info('Verifying user');
    let { uid } = req.body;
    let fire_token = res.locals.fire_token;
    return user_1.default.findOne({ uid })
        .then((user) => {
        if (user) {
            logging_1.default.info(`User ${uid} found, attempting to sign token and return user ...`);
            return res.status(200).json({ user, fire_token });
        }
        else {
            logging_1.default.warn(`User ${uid} not in the DB, attempting to register ...`);
            return create(req, res, next);
        }
    })
        .catch((error) => {
        logging_1.default.error(error.message);
        return res.status(500).json({
            message: error.message
        });
    });
};
const register = (req, res, next) => {
    logging_1.default.info('Verifying user');
    let { uid } = req.body;
    // let fire_token = res.locals.fire_token;
    return user_1.default.findOne({ uid })
        .then((user) => {
        if (user) {
            logging_1.default.info(`User ${uid} already exist ...`);
            return res.status(500).json({ message: 'User already exist' });
        }
        else {
            logging_1.default.warn(`User ${uid} not in the DB, attempting to register ...`);
            return create(req, res, next);
        }
    })
        .catch((error) => {
        logging_1.default.error(error.message);
        return res.status(500).json({
            message: error.message
        });
    });
};
const read = (req, res, next) => {
    const _id = req.params.userID;
    logging_1.default.info(`Incoming read for user with id ${_id}`);
    user_1.default.findById(_id)
        .exec()
        .then((user) => {
        if (user) {
            return res.status(200).json({
                user: user
            });
        }
        else {
            return res.status(404).json({
                error: 'User not found.'
            });
        }
    })
        .catch((error) => {
        logging_1.default.error(error.message);
        return res.status(500).json({
            error: error.message
        });
    });
};
const readAll = (req, res, next) => {
    logging_1.default.info('Readall route called');
    user_1.default.find()
        .exec()
        .then((users) => {
        return res.status(200).json({
            count: users.length,
            users: users
        });
    })
        .catch((error) => {
        logging_1.default.error(error.message);
        return res.status(500).json({
            message: error.message
        });
    });
};
exports.default = {
    validate,
    create,
    login,
    register,
    read,
    readAll
};
//# sourceMappingURL=user.js.map