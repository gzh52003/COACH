const express = require('express');
const router  = express.Router();
const token   = require('../../utils/token');
const { formatData,md5} = require('../../utils/tools');
const mongo             = require('../../utils/mongo');

router.get('/', async (req,res) => {
    let {username,password,vcode,mdl} = req.query;
    if(vcode !== req.session.vcode){
        res.send(formatData({code : 10}))
        return;
    }
    password = md5(password);
    let result = await mongo.find('user',{username,password});
    if(result.length > 0){
        let authorization;
        if(mdl === 'true'){
          authorization = token.create({username},"7d");
        }else{
          authorization = token.create({username});
        }
        result = result[0];
        result.authorization = authorization;
        result.send(formatData({data:result}));
    }else{
        res.send(formatData({code:0}))
    }
})

module.exports = router;