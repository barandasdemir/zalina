const express = require('express');
const router = express.Router();
const db = require('../lib/db/queries');

// mounts to /cart
router.get('/', (req, res, next) => {
    res.render('cart', {
        title: 'Zalina | Alışveriş Sepeti',
        total: 0,
    });
});

// mounts to /cart/add
router.post('/add', async (req, res, next) => {
    const product = await db.getProductById(req.body.id);
    if (product.length === 0) {
        next();
    }
    if (!req.session.cart) {
        req.session.cart = [];
        req.session.cartQty = 0;
    }
    let idx = req.session.cart.findIndex(item => item.id === product[0].id);
    if (idx === -1) {
        product[0].qty = 1;
        product[0].totalPrice = product[0].price;
        idx = req.session.cart.push(product[0]) - 1;
    } else {
        req.session.cart[idx].qty += 1;
        req.session.cart[idx].totalPrice = req.session.cart[idx].qty * req.session.cart[idx].price;
    }
    req.session.cartQty += 1;
    res.json(req.session.cart[idx]);
});

// mounts to /cart/remove
router.post('/remove', (req, res, next) => {
    if (req.session.cart) {
        const idx = req.session.cart.findIndex(item => item.id === Number.parseInt(req.body.id));
        let itemQty = req.session.cart[idx].qty;
        if (idx >= 0) {
            if (req.body.ref === 'rm') {
                req.session.cartQty -= req.session.cart[idx].qty;
                req.session.cart.splice(idx, 1);
                res.end();
            } else if (--itemQty > 0) {
                req.session.cart[idx].totalPrice = itemQty * req.session.cart[idx].price;
                req.session.cart[idx].qty = itemQty;
                req.session.cartQty -= 1;
                res.json(req.session.cart[idx]);
            }
        }
    }
});

module.exports = router;
