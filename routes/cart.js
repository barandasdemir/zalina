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
    // init cart if it does not exist
    if (!req.session.cart) {
        req.session.cart = [];
        req.session.cartQty = 0;
    }
    // find item in cart based on id, color and size
    let idx = req.session.cart.findIndex(item => {
        return (
            item.id === product[0].id &&
            item.color === req.body.color &&
            item.size === req.body.size
        );
    });
    if (idx === -1) {
        product[0].qty = 1;
        product[0].totalPrice = product[0].price;
        product[0].size = req.body.size;
        product[0].color = req.body.color;
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
        console.log(req.session.cart);
        console.log(req.body);
        const idx = req.session.cart.findIndex(item => {
            return (
                item.id === Number.parseInt(req.body.id) &&
                item.color === req.body.color &&
                item.size === req.body.size
            );
        });
        console.log(idx);
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

router.get('/checkout', (req, res, next) => {
    if (req.session.userid) {
        db.createOrder(req.session.userid, req.session.cart).then(() => {
            // console.log('order completed');
            res.redirect('/profile/taken');
        })
    } else {
        res.send('there\'s no user logged in, will handle this later. go back');
    }
});

module.exports = router;
