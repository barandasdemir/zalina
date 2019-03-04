const express = require('express');
const router = express.Router();
const userModel = require('../models/user');

// mounts to /auth/login
router.get('/login', (req, res, next) => {
    res.render('login', {
        title: 'Zalina | Oturum Aç',
    });
});

// mounts to /auth/register
router.get('/register', (req, res, next) => {
    res.render('register', {
        title: 'Zalina | Kayıt',
    });
});

router.post('/register/new-user', async (req, res, next) => {
    if (!req.body.agreement) {
        return res.render('register', {
            title: 'Zalina | Kayıt',
            message: 'you have to agree, you know'
        });
    }
    try {
        await userModel.schema.validate(req.body);
        userModel.create(req.body);
        // user created, redirect to dashboard

    } catch (error) {
        console.log(error);
        next(error);
    }
});

module.exports = router;
