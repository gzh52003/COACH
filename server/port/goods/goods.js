const express = require('express');
const router  = express.Router();
const mongo   = require('../../utils/mongo');
const {formatData} = require('../../utils/tools');

router.get('/',async (req,res) =>{
    let {page=1,size=10,sort='add_time',total=1} = req.query;
    const skip = (page-1)*size;
    const limit = size*1;
    sort = sort.split(',');
    const result = await mongo.find('goods',{},{skip,limit,sort,total});
    res.send(formatData({data:result}));
});

router.delete('/:id',async (req,res)=>{
    const {id} = req.params;
    try{
        const result = await mongo.remove('goods',{_id:id})
        res.send(formatData())
    }catch(err){
        res.send(formatData({code:0}));
    }
})

module.exports = router;