const express = require('express');
const router  = express.Router();
const mongo   = require('../../utils/mongo');
const {formatData} = require('../../utils/tools')

router.get('/',async (req,res) =>{
    let {page=1,size=10,sort='addTime',goodName} = req.query;
    const skip = (page-1)*size;
    const limit = size*1;
    sort = sort.split(',');

    let sql;
    if(goodName){
        sql = {
            "goodName":goodName
        }
    }else{
        sql = {}
    }

    try{
        const result = await mongo.find('goods',sql,{skip,limit,sort});
        res.send(formatData({data:result}));
    }catch(err){
        res.send(formatData({code:0}))
    }
});

router.delete('/:id',async (req,res)=>{
    const {id} = req.params;
    try{
        const result = await mongo.remove('goods',{_id:id})
        res.send('success')
    }catch(err){
        res.send('fail');
    }
})

module.exports = router;