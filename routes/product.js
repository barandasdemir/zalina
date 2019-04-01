const express = require('express');
const router = express.Router();
const db = require('../lib/db/queries');
const util = require('../lib/util');

// mounts to /product/id
router.get('/:id', async (req, res, next) => {
    const product = await db.getProductById(req.params.id)
    if (product.length > 0) {
        const colors = ['Mavi', 'Yeşil']; // değişmesi gerekiyor
        const sizes = await db.getProductSizes(req.params.id);
        res.render('product', {
            title: 'Zalina | Ürünler',
            product: product[0],
            colors,
            sizes
        });
    } else {
        next();
    }
});

module.exports = router;
