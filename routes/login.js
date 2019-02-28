const express = require('express');
const router = express.Router();

// mounts to /login
router.get('/', (req, res, next) => {
    res.render('login', {
        title: 'Zalina | Oturum Aç',
    });
});

module.exports = router;
