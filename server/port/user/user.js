const express = require('express');
const router  = express.Router();
const mongo   = require('../../utils/mongo');
const {formatData,md5} = require('../../utils/tools');

router.get('/',async (req,res)=>{
    let {page=1,size=10,total=1,sort='add_time'} = req.query;
    const limit = size*1;
    const skip  = (page-1)*size;
    sort = sort.split(',');
    const result = await mongo.find('infor',{},{limit,skip,field:{password:false},total,sort});
    res.send(formatData({data:result}));
})
router.get('/log',async (req,res)=>{
    const {page=1,size=10} = req.query;
    const limit = size*1;
    const skip  = (page-1)*size;
    const result = await mongo.find('user',{},{limit,skip,field:{password:false}});
    res.send(formatData({data:result}));
})
router.delete('/:id',async (req,res)=>{
    const {id} = req.params;
    console.log(id)
    try{
      await mongo.remove('infor',{_id:id});
      res.send(formatData())
    }catch(err){
      res.send(formatData({code:0}))
    }
})

router.get('/:id',async (req,res)=>{
    const {id} = req.params;
    console.log(req.params);
    const result = await mongo.find('infor',{_id:id},{
       field:{password:false}
    });
    console.log(result)
    res.send(formatData({data:result[0]}));
})

router.put('/:id',async (req,res)=>{
    const {id} = req.params;
    let {password,age,gender} = req.body;

    console.log(9999999+ id + age)
    let newData = {age,gender};
    if(password){
        password = md5(password);
        newData.password = password;
    }
    try{
        await mongo.update('infor',{_id:id},{$set:newData});
        res.send(formatData({data:{_id:id,...newData}}));
    }catch(err){
        res.send(formatData({code:0}))
    }
})

router.post('/',async (req,res)=>{
    let {username,password,age,gender} = req.body;
    password = md5(password);
    let result;
    try{
       result = await mongo.insert('infor',{username,password,age,gender});
       res.send(formatData());
    }catch(err){
        res.send(formatData({code:0}))
    }
})

module.exports = router;