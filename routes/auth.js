const express = require('express');
const router = express.Router();
const userModel = require('../models/user');

// mounts to /auth/login
router.get('/login', (req, res, next) => {
    (req.session.userid) ? res.render('login', {
        title: 'Zalina | Profil', activeSession: req.session, wrongPass: 0
    }) : res.render('login', { title: 'Zalina | Oturum aç', activeSession: -1, wrongPass: 0 })
});

// mounts to /auth/register
router.get('/register', (req, res, next) => {
    (req.session.userid) ? res.render('register', {
        title: 'Zalina | Kayıt', activeSession: req.session
    }) : res.render('register', { title: 'Zalina | Kayıt', activeSession: -1 })
});

router.post('/register/new-user', async (req, res, next) => {
    if (!req.body.agreement) {
        (req.session.userid) ? res.render('register', {
            title: 'Zalina | Kayıt', activeSession: req.session
        }) : res.render('register', { title: 'Zalina | Kayıt', activeSession: -1 })
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
