const express = require('express');
const router = express.Router();
const user = require('../models/user');

// mounts to /auth/register
router.get('/', (req, res, next) => {
    const activeSession = (req.session.userid) ? req.session : -1;
    res.render('register', {
        title: 'Zalina | Kayıt',
        activeSession,
    });
});

router.post('/new-user', (req, res, next) => {
    const activeSession = (req.session.userid) ? req.session : -1;
    if (!req.body.agreement) {
        return res.render('register', {
            title: 'Zalina | Kayıt',
            activeSession,
        });
    }
    try {
        user.create(req.body).then(user => {
            res.redirect('/login');
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
