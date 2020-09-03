const express    = require('express');
const router     = express.Router();
const svgCaptcha = require('svg-captcha');

const {formatData} = require('../../utils/tools');

router.get('/',async (req,res)=>{
    const options = {
        noise:3,
        ignoreChars: '0o1il',
        background: '#ff0',
        color: true,
        fontSize: 50,
        height: 54
    }

    const captcha =await svgCaptcha.create(options);
    req.session.vcode = captcha.text.toLowerCase();
    console.log(req.session)
    res.send(formatData({data:captcha.data}));
})
module.exports = router;