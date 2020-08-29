const express = require('express');
const router  = express.Router();
const mongo   = require('../../utils/mongo');
const multer = require('multer');
var fs = require('fs');
const path = require('path');
const {formatData} = require('../../utils/tools');

var storage = multer.diskStorage({

    destination: path.join(__dirname,'../../static/pic/goods'),

    filename: function (req, file, cb) {
        let filename = file.originalname;   //3.jpg
        let arr = filename.split('.');      //[3,'jpg']

        cb(null, arr[0] + '-' + Date.now() + '.' + arr[1]);
    }
})

var upload = multer({
    storage: storage
});

/* 1.分页查询商品数据 */
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

/* 2.新增商品信息 */
router.post('/',upload.array('files', 1),async(req,res)=>{

    let {gid,goodName,salePrice,oldPrice,storageNum,supplierName,addTime} = req.body;
    // addTime = addTime.slice(0,10);

    console.log(req.files[0]);  // 图片所有信息
    console.log(gid,goodName,salePrice,oldPrice,storageNum,supplierName,addTime);
    let url = `http://localhost:3000/uploads/${req.files[0].filename}`
    try{
        let result = await mongo.insert('goods',{
            gid:Number(gid),
            goodName,
            goodPic:url,
            salePrice:Number(salePrice),
            oldPrice:Number(oldPrice),
            storageNum:Number(storageNum),
            supplierName,
            addTime
        })
        res.send(formatData())
    }catch(err){
        res.send(formatData({code:0}))
    }

    // let {gid,goodName,salePrice,oldPrice,storageNum,supplierName,addTime} = req.body;
    // /* 时间处理 */
    // addTime = addTime.slice(0,10);
    // try{
    //     let result = await mongo.insert('goods',{gid,goodName,goodPic,salePrice,oldPrice,storageNum,supplierName,addTime})
    //     res.send(formatData())
    // }catch(err){
    //     res.send(formatData({code:0}))
    // }

})

/* 3.根据id获取商品信息 */
router.get('/:id',async(req,res)=>{
    const {id} = req.params;
    try{
        const result = await mongo.find('goods',{_id:id})
        res.send(formatData({data:result}))
    }catch(err){
        res.send(formatData({code:0}))
    }
})

/* 4.根据id修改商品信息 */
router.put('/:id',async(req,res)=>{
    
    const {id} = req.params;
    const {gid,goodName,goodPic,salePrice,oldPrice,storageNum,supplierName,addTime} = req.body;

    let newData = {gid,goodName,goodPic,salePrice,oldPrice,storageNum,supplierName,addTime};

    try{
        let result = await mongo.update('goods',{_id:id},{$set:newData})
        res.send(formatData())
    }catch(err){
        res.send(formatData({code:0}))
    }
})

/* 5.根据id删除商品 */
router.delete('/:id',async (req,res)=>{
    const {id} = req.params;
    try{
        const result = await mongo.remove('goods',{_id:id})
        res.send(formatData())
    }catch(err){
        res.send(formatData({code:0}))
    }
})

module.exports = router;