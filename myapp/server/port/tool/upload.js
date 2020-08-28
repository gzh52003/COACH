const express = require('express');
const router  = express.Router();
const multer  = require('multer');
const path    = require('path');
const mongo   = require('../../utils/mongo');
const { formaData , md5 } = require('../../utils/tools');

let storage   = multer.diskStorage({
    destination : path.join(__dirname,'../../static/pic/'),
    filename: function (req,file,cb){
        let ext = path.extname(file.originalname);
        cb(null,file.fieldname + '-' + Date.now() + ext);
    }
})

const uploadMiddleware = multer({ storage });

router.post('/avatar',uploadMiddleware.single('avatar'), (req,res) => {
    const {_id} = req.body;
    const avatarUrl = '/pic/' + req.file.filename;
    mongo.update('user',{_id},{$set:{avatarUrl}});
    res.send(formaData({data:{_id,avatarUrl}}));
})

router.post('/goods', uploadMiddleware.array('goods',5),(req,res) => {

})

module.exports = router;