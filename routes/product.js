const express = require('express');
const router = express.Router();
const db = require('../lib/db/queries');
const util = require('../lib/util');

// mounts to /product/id
router.get('/:id', async (req, res, next) => {
    const product = await db.getProductById(req.params.id);
    if (product.length > 0) {
        const colors = await db.getProductColorsByCode(product[0].productCode);
        const sizes = await db.getProductSizes(req.params.id);
        const colorMap = {
            'mavi': 'blue',
            'yesil': 'green',
            'mor': 'purple',
        }

        res.render('product', {
            title: `Zalina | ${product[0].name}`,
            product: product[0],
            colors,
            colorProps: colors.map(color => colorMap[util.toEn(color.name.toLowerCase())]),
            sizes: sizes.filter(size => size.stock > 0),
        });
    } else {
        next();
    }
});

module.exports = router;
