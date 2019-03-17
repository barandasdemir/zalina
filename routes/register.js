const express = require('express');
const router = express.Router();
const user = require('../models/user');

// mounts to /auth/register
router.get('/', (req, res, next) => {
    res.render('register', {
        title: 'Zalina | Kayıt',
    });
});

router.post('/new-user', (req, res, next) => {
    if (!req.body.agreement) {
        return res.render('register', {
            title: 'Zalina | Kayıt',
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
