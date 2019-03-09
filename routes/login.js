const express = require('express');
const router = express.Router();
const db = require('../lib/db/queries');
const util = require('../lib/util');
const bcrypt = require('bcrypt');



router.post('/userlogin', (req, res, next) => {
    if (!req.session.active) {
        db.getUserByMail(req.body.email).then(result => {
            if (result.length > 0 && req.body.password === result[0].password) {
                // if (bcrypt.hashSync(req.body.password, bcrypt.genSaltSync()) === result.password) {
                req.session.email = result[0].email;
                req.session.userid = result[0].id;
                res.redirect('/');
                //}
                //else {
                //res.send('hatalı giiş');
                //}
            }

            else {
                res.render('login', { title: 'Zalina | Oturum aç', activeSession: -1, wrongPass: 1 });


            }

        })
    }
});





module.exports = router;