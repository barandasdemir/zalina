const express = require('express');
const router = express.Router();
const db = require('../lib/db/queries');
const util = require('../lib/util');

// mounts to /
router.get('/', (req, res, next) => {
    res.render('index', {
        title: 'Zalina | Ana sayfa',
    });
});

// mounts to /category/productType
router.get('/:cat/:type?', (req, res, next) => {
    const header = req.app.locals.header;
    const isCategory = header.links.some((category, index) => {
        if (category === req.params.cat) {
            return db.getProductTypesByCategory(header.categories[index]).then(types => {
                if (!req.params.type) {
                    // product type is not specified
                    // render the category page
                    res.render('category', {
                        title: `Zalina - ${header.categories[index]}`,
                        category,
                        sidemenu: types
                    });
                } else {
                    const typeIndex = types
                        .map(type => util.toEn(type))
                        .findIndex(type => type === req.params.type);
                    const productType = types[typeIndex];

                    // make sure the product type exists
                    if (typeIndex !== -1) {
                        // get that type's listing
                        db.getProductListing(header.categories[index], productType).then(listing => {
                            // then render it's listing page
                            res.render('product-listing', {
                                title: `Zalina - ${productType}`,
                                category,
                                sidemenu: types,
                                productType,
                                listing
                            });
                        });
                    } else {
                        // if given type is not an actual product type
                        // pass control to the next handler
                        next();
                    }
                }
            });
        }
    });

    // if given category is not an actual category
    // pass control to the next handler
    if (!isCategory) {
        next();
    }
});

router.get('/logout', (req, res, next) => {
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;
