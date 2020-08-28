const express = require('express');
const router  = express.Router();
const mongo   = require('../../utils/mongo');

router.get('/',async (req,res) =>{
    let {page=1,size=10,sort='add_time'} = req.query;
    const skip = (page-1)*size;
    const limit = size*1;
    sort = sort.split(',');
    const result = await mongo.find('goods',{},{skip,limit,sort});
    res.send(result);
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