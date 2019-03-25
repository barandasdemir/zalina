const express = require('express');
const router = express.Router();
const db = require('../lib/db/queries');
const util = require('../lib/util');
const bcrypt = require('bcrypt');
const yup = require('yup');


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
        const schema = yup.object().shape({
            clientname: yup.string().required(),
            clientsurname: yup.string().required(),
            phonenumber: yup.number(),
            idnumber: yup.number()

        });

        const update_state = {
            clientname: req.query.name,
            clientsurname: req.query.surname,
            phonenumber: req.query.phone,
            idnumber: req.query.idnumber
        };
        try {
            schema.isValid(update_state).then((valid) => {
                if (valid === true) {
                    db.updateUserInfo(req.session.userid, update_state);
                    db.getUserInfoById(req.session.userid).then((result) => {
                        res.render('profile', {
                            title: 'Zalina | Kişisel Bilgiler',
                            cPage: 1,
                            validation: true,
                            email: req.session.email,
                            userInfo: result[0]
                        });


                    });
                }
                else {
                    db.getUserInfoById(req.session.userid).then((result) => {
                        res.render('profile', {
                            title: 'Zalina | Kişisel Bilgiler',
                            cPage: 1,
                            validation: false,
                            email: req.session.email,
                            userInfo: result[0]
                        });
                    });
                }



            });
        }
        catch (error) {
            console.log(error);
        }



    } else res.redirect('/login');

});

router.get('/:param', (req, res, next) => {
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
                            validation: true,
                            email: req.session.email,
                            userInfo: result[0]
                        });

                    });
                    break;
                }
            case 'taken':
                {
                    res.render('profile', {
                        title: 'Zalina | Sipariş',
                        cPage: 2
                    });
                    break;
                }
            case 'addresses':
                {
                    db.getUserInfoById(req.session.userid).then((result) => {

                        res.render('profile', {
                            title: 'Zalina | Adres Bilgileri',
                            cPage: 3,
                            validation: true,
                            email: req.session.email,
                            userInfo: result[0]
                        });
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
