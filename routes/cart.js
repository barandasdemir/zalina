const express = require('express');
const router = express.Router();
const db = require('../lib/db/queries');

// mounts to /cart
router.get('/', (req, res, next) => {
    const activeSession = (req.session.userid) ? req.session : -1;
    res.render('cart', {
        title: 'Zalina | Alışveriş Sepeti',
        activeSession,
        cart: req.session.cart,
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
    }
    let idx = req.session.cart.findIndex(item => item.id === product[0].id);
    if (idx === -1) {
        product[0].qty = 1;
        product[0].totalPrice = product[0].price;
        req.session.cart.push(product[0]);
    } else {
        req.session.cart[idx].qty += 1;
        req.session.cart[idx].totalPrice = req.session.cart[idx].qty * req.session.cart[idx].price;
    }
    req.app.locals.cartQty += 1;
    res.json(req.session.cart.find(item => item.id === Number.parseInt(req.body.id)));
});

// mounts to /cart/remove
router.post('/remove', (req, res, next) => {
    if (req.session.cart) {
        const idx = req.session.cart.findIndex(item => item.id === Number.parseInt(req.body.id));
        let itemQty = req.session.cart[idx].qty;
        if (idx >= 0) {
            if (--itemQty > 0) {
                req.session.cart[idx].qty = itemQty;
                req.session.cart[idx].totalPrice = req.session.cart[idx].qty * req.session.cart[idx].price;
            } else {
                req.session.cart.splice(idx, 1);
            }
            req.app.locals.cartQty -= 1;
        }
        res.json(req.session.cart.find(item => item.id === Number.parseInt(req.body.id)));
    }
});

module.exports = router;
