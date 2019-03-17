const express = require('express');
const router = express.Router();
const db = require('../lib/db/queries');
const util = require('../lib/util');
const bcrypt = require('bcrypt');

// mounts to /login
router.get('/', (req, res, next) => {
    console.log(req.app.locals.header);
    const activeSession = (req.session.userid) ? req.session : -1;
    res.render('login', {
        title: 'Zalina | Oturum aç',
        activeSession,
        wrongPass: 0
    });
});

router.post('/', (req, res, next) => {
    if (!req.session.active) {
        db.getUserByMail(req.body.email).then(result => {
            if (result.length > 0 && bcrypt.compareSync(req.body.password, result[0].password)) {
                req.session.email = result[0].email;
                req.session.userid = result[0].id;
                res.redirect('/');
            } else {
                res.render('login', {
                    title: 'Zalina | Oturum aç',
                    activeSession: -1,
                    wrongPass: 1
                });
            }
        })
    }
});

module.exports = router;
