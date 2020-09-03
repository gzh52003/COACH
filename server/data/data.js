const mock = require('mockjs');
const { json } = require('body-parser');
const mongo    = require("../utils/mongo")
let data = mock.mock({
  "data|40": [{
    "gender": "男",
    "address": "@county(true)",
    "pic": Random.image('100x100', '#FF6600'),
    "name": "@name",
    "email": "@email",
    "date" : "@Date"
  }]
})
let goodList = mock.mock({
   "goodslsit|40":[{
     "pic":Random.image('200x100', '#FF6600'),
     "title":"@title(6,12)",
     "addTime":Random.datetime(),
     "salePrice |1-999.10-99":1,
     "curPrice |100-9999.10-99":1,
   }]
})

let arr = [{
  "img": "https://img.fishfay.com/shopgoods/1/112011101C/zt-112011101C.jpg?x-image-process=image/resize,w_300,h_300",
  "title": "安踏KT5情人节配色男篮球鞋2020新品",
  "price": "￥649.00"
}, {
  "img": "https://img.fishfay.com/shopgoods/1/112011103D/zt-112011103D.jpg?x-image-process=image/resize,w_300,h_300",
  "title": "安踏海沃德理发店配色GH1男鞋篮球鞋2020新款篮球系列",
  "price": "￥669.00"
}, {
  "img": "https://img.fishfay.com/shopgoods/1/11931605A/zt-11931605A.jpg?x-image-process=image/resize,w_300,h_300",
  "title": "安踏男鞋要疯3代五城城市特供款狂潮外场战靴篮球鞋",
  "price": "￥459.00"
}, {
  "img": "https://img.fishfay.com/shopgoods/1/11931102A/zt-11931102A.jpg?x-image-process=image/resize,w_300,h_300",
  "title": "安踏男鞋汤普森KT4低帮篮球鞋篮球系列kt",
  "price": "￥649.00"
}, {
  "img": "https://img.fishfay.com/shopgoods/1/112015590A/zt-112015590A.jpg?x-image-process=image/resize,w_300,h_300",
  "title": "安踏男鞋NASA联名跑鞋2020新款",
  "price": "￥399.00"
}, {
  "img": "https://img.fishfay.com/shopgoods/1/112035528A/zt-112035528A.jpg?x-image-process=image/resize,w_300,h_300",
  "title": "【预计发货时间9.10】安踏男鞋星标系列星岚跑鞋2020新款",
  "price": "￥599.00"
}, {
  "img": "https://img.fishfay.com/shopgoods/1/112035518A/zt-112035518A.jpg?x-image-process=image/resize,w_300,h_300",
  "title": "【预计发货时间9.10】’安踏男鞋星标系列星峦跑鞋2020新款",
  "price": "￥899.00"
}, {
  "img": "https://img.fishfay.com/shopgoods/1/112037766R/zt-112037766R.jpg?x-image-process=image/resize,w_300,h_300",
  "title": "安踏男鞋综训鞋2020新款",
  "price": "￥399.00"
}, {
  "img": "https://img.fishfay.com/shopgoods/1/112035576/zt-112035576.jpg?x-image-process=image/resize,w_300,h_300",
  "title": "安踏男鞋跑鞋2020新款",
  "price": "￥299.00"
}, {
  "img": "https://img.fishfay.com/shopgoods/1/112035565/zt-112035565.jpg?x-image-process=image/resize,w_300,h_300",
  "title": "安踏男鞋跑鞋2020新款",
  "price": "￥349.00"
}, {
  "img": "https://img.fishfay.com/shopgoods/1/112031818A/zt-112031818A.jpg?x-image-process=image/resize,w_300,h_300",
  "title": "【预计发货时间9月10日】安踏男鞋星标系列星岳篮球鞋2020新款",
  "price": "￥999.00"
}, {
  "img": "https://img.fishfay.com/shopgoods/1/112031818AA/zt-112031818AA.jpg?x-image-process=image/resize,w_300,h_300",
  "title": "【预计发货时间9月10日】安踏男鞋星标系列星岳篮球鞋2020新款",
  "price": "￥1299.00"
}, {
  "img": "https://img.fishfay.com/shopgoods/1/112035501/zt-112035501.jpg?x-image-process=image/resize,w_300,h_300",
  "title": "安踏男鞋a-jelly弹力胶跑鞋2020新款",
  "price": "￥549.00"
}, {
  "img": "https://img.fishfay.com/shopgoods/1/112021804S/zt-112021804S.jpg?x-image-process=image/resize,w_300,h_300",
  "title": "安踏男鞋汤普森KT LOVS篮球帆布鞋2020新款kt lovs",
  "price": "￥359.00"
}, {
  "img": "https://img.fishfay.com/shopgoods/1/112031105/zt-112031105.jpg?x-image-process=image/resize,w_300,h_300",
  "title": "安踏男鞋要疯4热浪2篮球鞋2020新款",
  "price": "￥449.00"
}, {
  "img": "https://img.fishfay.com/shopgoods/1/112031102/zt-112031102.jpg?x-image-process=image/resize,w_300,h_300",
  "title": "安踏男鞋汤普森KT5LOW低帮版篮球鞋2020新款kt",
  "price": "￥699.00"
}, {
  "img": "https://img.fishfay.com/shopgoods/1/112035585/zt-112035585.jpg?x-image-process=image/resize,w_300,h_300",
  "title": "安踏男鞋Edge舒弹网纱跑鞋2020新款跑步系列",
  "price": "￥549.00"
}, {
  "img": "https://img.fishfay.com/shopgoods/1/112035547/zt-112035547.jpg?x-image-process=image/resize,w_300,h_300",
  "title": "安踏男鞋跑鞋2020新款",
  "price": "￥399.00"
}, {
  "img": "https://img.fishfay.com/shopgoods/1/112031107/zt-112031107.jpg?x-image-process=image/resize,w_300,h_300",
  "title": "安踏男鞋A-SHOCK要疯4进击2篮球鞋2020新款",
  "price": "￥429.00"
}, {
  "img": "https://img.fishfay.com/shopgoods/1/112011101H/zt-112011101H.jpg?x-image-process=image/resize,w_300,h_300",
  "title": "安踏男鞋汤普森KT5高帮篮球鞋2020年新款kt",
  "price": "￥799.00"
}, {
  "img": "https://img.fishfay.com/shopgoods/1/11911101A/zt-11911101A.jpg?x-image-process=image/resize,w_300,h_300",
  "title": "安踏男鞋汤普森KT4篮球鞋兰州拉面臭豆腐配色kt",
  "price": "￥798.00"
}, {
  "img": "https://img.fishfay.com/shopgoods/1/112031101/zt-112031101.jpg?x-image-process=image/resize,w_300,h_300",
  "title": "安踏男鞋汤普森KT5篮球鞋2020新款kt",
  "price": "￥749.00"
}, {
  "img": "https://img.fishfay.com/shopgoods/1/112031605/zt-112031605.jpg?x-image-process=image/resize,w_300,h_300",
  "title": "安踏男鞋A-SHOCK实战篮球鞋2020新款篮球系列",
  "price": "￥399.00"
}, {
  "img": "https://img.fishfay.com/shopgoods/1/112031103/zt-112031103.jpg?x-image-process=image/resize,w_300,h_300",
  "title": "安踏男鞋海沃德GH1篮球鞋2020新款",
  "price": "￥799.00"
}, {
  "img": "https://img.fishfay.com/shopgoods/1/112011101G/zt-112011101G.jpg?x-image-process=image/resize,w_300,h_300",
  "title": "安踏男鞋龙珠超联名KT汤普森三分球配色篮球鞋2020新款kt",
  "price": "￥899.00"
}, {
  "img": "https://img.fishfay.com/shopgoods/1/112031602/zt-112031602.jpg?x-image-process=image/resize,w_300,h_300",
  "title": "安踏男鞋要疯4狂潮2篮球鞋2020新款",
  "price": "￥549.00"
}, {
  "img": "https://img.fishfay.com/shopgoods/1/112031108/zt-112031108.jpg?x-image-process=image/resize,w_300,h_300",
  "title": "安踏男鞋要疯4横扫2篮球鞋2020新款",
  "price": "￥499.00"
}, {
  "img": "https://img.fishfay.com/shopgoods/1/112025522S/zt-112025522S.jpg?x-image-process=image/resize,w_300,h_300",
  "title": "安踏男鞋jason泡泡跑鞋2020新款跑步系列",
  "price": "￥339.00"
}];

mongo.insert('goods',arr);