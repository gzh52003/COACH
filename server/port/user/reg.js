const express = require('express');
const router = express.Router();
const {formatData,md5} = require('../../utils/tools');
const mongo            = require('../../utils/mongo');

router.post('/',async (req,res)=>{
    let {username,password} = req.body;
    console.log(req.body);
    password = md5(password);
    console.log(username)
    let result;
    try{
        result = await mongo.insert('user',{username,password});
        res.send(formatData());
    }catch(err){
        res.send(formatData({code}))
    }
})

router.get('/check',async (req,res)=>{
    const {username} = req.query;
    console.log(username)
    const result     = await mongo.find('infor',{username});
    if(result.length>0){
        res.send(formatData({code:0}))
    }else{
        res.send(formatData())
    }
})

module.exports = router;