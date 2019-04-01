const express = require('express');
const router = express.Router();
const db = require('../lib/db/queries');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage })
const type = upload.single('productimage');
const fs = require('fs-extra');
// mounts to /login
router.get('/', (req, res, next) => {

    req.session.uploaditeration = 0;
    res.redirect('/adminpanel');


});

router.post('/addproduct', (req, res, next) => {
    if (req.session.userid) {
        if (fs.existsSync('./temp/' + req.session.userid) && req.session.uploaditeration > 0) {
            fs.mkdirSync('./uploads/' + req.body.product_code);
            for (var i = 0; i < req.session.uploaditeration; i++)
                fs.copyFileSync('./temp/' + req.session.userid + '/' + i +
                    '.png', './uploads/' + req.body.product_code + "/" + i + '.png');
            fs.removeSync('./temp/' + req.session.userid);
            req.session.uploaditeration = 0;
        }
        next()
    }
});
router.post('/addimage', type, async (req, res, next) => {
    if (req.session.userid) {

        if (!fs.existsSync('./temp/' + req.session.userid) && req.session.uploaditeration === 0) {
            fs.mkdirSync('./temp/' + req.session.userid);
        }
        await fs.writeFile('./temp/' + req.session.userid + "/" + req.session.uploaditeration + ".png", req.file.buffer);
        req.session.uploaditeration += 1;
        res.send('Uploaded to temp.')

    }

});

module.exports = router;
