const mock = require('mockjs');
const { json } = require('body-parser');
const mongo    = require("../utils/mongo")
let data = mock.mock({
  "data|40": [{
    "gender": "男",
    "address": "@county(true)",
    "pic": "@Image('50*50','@color','小甜甜')",
    "name": "@name",
    "email": "@email",
    "date" : "@Date"
  }]
})
let goodList = mock.mock({
   "goodslsit|40":[{
     "pic":"@Image('50*50','@color','图片展示')",
     "title":"@title(6,12)",
     "addTime":"@Date",
     
   }]
})
console.log(JSON.stringify(data));
mongo.insert('goods',goodList.goodList)