const express = require('express');
const router = express.Router();
const db = require('../lib/db/queries');
const multer = require('multer');
const storage = multer.memoryStorage();
const type_model = require('../models/sizetype');
const upload = multer({
    storage: storage
})
const type = upload.single('productimage');
const fs = require('fs-extra');

// mounts to /panel
router.get('/', async (req, res, next) => {
    req.session.uploaditeration = 0;
    res.render('panel/index', {
        title: 'Zalina | Yönetim Paneli',
    });
});

router.get('/selectcategory', async (req, res, next) => {
    const products = [];
    for (let i = 0; i < req.app.locals.header['tr'].categories.length; i++) {
        const result = await db.getProductTypesByCategory(req.app.locals.header['tr'].categories[i]);
        products.push(result);
    }
    res.render('panel/selectproduct', {
        title: 'Zalina | Yönetim Paneli',
        headers: req.app.locals.header['tr'].categories,
        productInfo: products,
    });
});

router.post('/add', async (req, res, next) => {
    const types = [
        "notype",
        "classic",
        "childsize",
        "babysize",
        "shoes",
        "childshoes",
        "babyshoes",
        "underwear-top",
        "underwear-bottom"
    ];

    res.render('panel/addproduct', {
        title: 'Zalina | Ürün Ekleme',
        productType: req.body.values.split('*')[2],
        stockType: types[req.body.type],
    });
});

router.get('/edit', async (req, res, next) => {
    res.render('panel/edit', {
        title: 'Zalina | Ürün Düzenleme',
        error: 0
    });
});

router.post('/edit', async (req, res, next) => {
    const product = await db.getProductById(req.body.id);
    if (product) {
        product.color = await db.getProductColor(product.id);
        const productInfo = [];
        for (let i = 0; i < req.app.locals.header['tr'].categories.length; i++) {
            const result = await db.getProductTypesByCategory(req.app.locals.header['tr'].categories[i]);
            productInfo.push(result);
        }

        const stock = await db.getProductStock(req.body.id);
        res.render('panel/product', {
            title: 'Zalina | Ürün Düzenleme',
            product,
            headers: req.app.locals.header['tr'].categories,
            productInfo,
            stock,
        });
    } else {
        res.render('panel/edit', {
            title: 'Zalina | Ürün Düzenleme',
            error: 1
        });
    }
});

router.post('/edit/:id', async (req, res, next) => {
    req.body.id = req.params.id;
    db.updateProduct(req.body)
        .then(() => {
            res.redirect('/panel/edit');
        })
        .catch((err) => {
            res.send(err);
        });
});

router.post('/remove', async (req, res, next) => {
    // check foreign key constraints
});

router.get('/editcampanno', async (req, res, next) => {
    res.render('panel/camp_anno');
});

router.post('/addproduct', async (req, res, next) => {
    db.insertProduct(req.body).then(res => {
        const productid = res;
        if (fs.existsSync('./temp/' + req.session.userid) && req.session.uploaditeration > 0) {
            fs.mkdirSync('./public/products/' + productid, {
                recursive: true
            });
            for (var i = 0; i < req.session.uploaditeration; i++) {
                fs.copyFileSync('./temp/' + req.session.userid + '/' + i + '.png', './public/products/' + productid + '/' + i + '.png');
            }
            fs.removeSync('./temp/' + req.session.userid);
            req.session.uploaditeration = 0;
        }
    });
    res.send(req.body);
});

router.post('/addimage', type, async (req, res, next) => {
    if (!fs.existsSync('./temp/' + req.session.userid) && req.session.uploaditeration === 0) {
        fs.mkdirSync('./temp/' + req.session.userid, {
            recursive: true
        });
    }
    await fs.writeFile('./temp/' + req.session.userid + '/' + req.session.uploaditeration + '.png', req.file.buffer).then(err => {
        req.session.uploaditeration += 1;
        res.send('Uploaded to temp.');
    })
});

module.exports = router;
