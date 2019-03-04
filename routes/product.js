const express = require('express');
const router = express.Router();
const db = require('../lib/db/queries');
const util = require('../lib/util');

// mounts to /product/id
router.get('/:id', (req, res, next) => {
    db.getProductById(req.params.id).then(product => {
        if (product.length > 0) {
            res.render('product', {
                title: 'Zalina | Oturum Aç',
                categories,
                links,
                product: product[0]
            });
        } else {
            next();
        }
    })
});

module.exports = router;
