const yup = require('yup');
const bcrypt = require('bcrypt');
const db = require('../lib/db/queries');

const schema = yup.object().shape({
    email: yup
        .string()
        .required()
        .matches(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
    password: yup
        .string()
        .required(),
});

const model = {
    schema,
    create: (user) => {
        console.log(user);
        const hashed = this.hashPassword(user.password);
        user.password = hashed;
        try {
            // await db.createUser(user);
            console.log('created a new user');
        } catch (error) {
            console.error(error);
        }
    },
    hashPassword: (password) => bcrypt.hashSync(password, bcrypt.genSaltSync())
};

module.exports = model;
