const express = require('express');
const router = express.Router();
const db = require('../lib/db/queries');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage
})
const type = upload.single('productimage');
const fs = require('fs-extra');

// mounts to /panel
router.get('/', async (req, res, next) => {
    req.session.uploaditeration = 0;
    res.render('panel/index', {
        title: "Zalina | Yönetim Paneli",
    });
});

router.get('/add', async (req, res, next) => {
    const products = [];
    for (let i = 0; i < req.app.locals.header.categories.length; i++) {
        const result = await db.getProductTypesByCategory(req.app.locals.header.categories[i]);
        products.push(result);
    }
    req.session.uploaditeration = 0;
    res.render('panel/addproduct', {
        title: "Zalina | Yönetim Paneli",
        headers: req.app.locals.header.categories,
        productInfo: products,
    });
});

router.get('/edit', async (req, res, next) => {

    res.render('panel/edit', {
        title: "Zalina | Yönetim Paneli",
    });
});

router.post('/addproduct', async (req, res, next) => {
    db.insertProduct(req.body).then(res => {
        const productid = res;
        if (fs.existsSync('./temp/' + req.session.userid) && req.session.uploaditeration > 0) {
            fs.mkdirSync('./public/products/' + productid, {
                recursive: true
            });
            for (var i = 0; i < req.session.uploaditeration; i++) {
                fs.copyFileSync('./temp/' + req.session.userid + '/' + i + '.png', './public/products/' + productid + "/" + i + '.png');
            }
            fs.removeSync('./temp/' + req.session.userid);
            req.session.uploaditeration = 0;
        }
    });
    res.send('Ürün eklendi, bu sayfa daha sonra değişecek.');
});

router.post('/addimage', type, async (req, res, next) => {
    if (!fs.existsSync('./temp/' + req.session.userid) && req.session.uploaditeration === 0) {
        fs.mkdirSync('./temp/' + req.session.userid, {
            recursive: true
        });
    }
    await fs.writeFile('./temp/' + req.session.userid + "/" + req.session.uploaditeration + ".png", req.file.buffer).then(err => {
        req.session.uploaditeration += 1;
        res.send('Uploaded to temp.');
    })
});

module.exports = router;
