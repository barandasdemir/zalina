const express = require('express');
const router = express.Router();
const db = require('../lib/db/queries');
const util = require('../lib/util');
const bcrypt = require('bcrypt');

router.get('/', (req, res, next) => {
    if (req.session.userid)
        db.getUserInfoById(req.session.userid).then((result) => {
            res.render('profile', {
                title: 'Zalina | Genel',
                cPage: 0,
                email: req.session.email,
                userInfo: result[0]
            });

        });
    else res.redirect('/login');
});

router.get('/update', (req, res, next) => {
    if (req.session.userid) {
        // will add validating user info
        const update_state = {
            clientname: req.query.name,
            clientsurname: req.query.surname,
            phonenumber: req.query.phone,
            idnumber: req.query.idnumber
        };
        db.updateUserInfo(req.session.userid, update_state);
        db.getUserInfoById(req.session.userid).then((result) => {
            res.render('profile', {
                title: 'Zalina | Kişisel Bilgiler',
                cPage: 1,
                email: req.session.email,
                userInfo: result[0]
            });

        });
    } else res.redirect('/login');

});

router.get('/:param', async (req, res, next) => {
    if (req.session.userid) {
        switch (req.params.param) {
            case 'general':
                {
                    db.getUserInfoById(req.session.userid).then((result) => {

                        res.render('profile', {
                            title: 'Zalina | Genel',
                            cPage: 0,
                            email: req.session.email,
                            userInfo: result[0]
                        });

                    });
                    break;
                }
            case 'info':
                {
                    db.getUserInfoById(req.session.userid).then((result) => {

                        res.render('profile', {
                            title: 'Zalina | Kişisel Bilgiler',
                            cPage: 1,
                            email: req.session.email,
                            userInfo: result[0]
                        });

                    });
                    break;
                }
            case 'taken':
                {
                    const orders = await db.getOrdersOfUser(req.session.userid);
                    console.log(orders[0]);

                    res.render('profile', {
                        title: 'Zalina | Sipariş',
                        cPage: 2
                    });
                    break;
                }
            case 'addresses':
                {
                    res.render('profile', {
                        title: 'Zalina | Adres Bilgileri',
                        cPage: 3
                    });
                    break;
                }
            case 'settings':
                {
                    res.render('profile', {
                        title: 'Zalina | Ayarlar',
                        cPage: 4
                    });
                    break;
                }
            default:
                {
                    next();
                }
        }
    } else res.redirect('/login');
});

module.exports = router;
