const mock = require('mockjs');
const { json } = require('body-parser');
const mongo    = require("../utils/mongo")
let data = mock.mock({
  "goodslsit|40":[{
    "pic":"@image(''100*100','@color')",
    "title":"@title(6,12)",
    "addTime":"@Date",
    "salePrice|100-999.10-99":1,
    "curPrice|1000-9999.10-99":1,
    "stock|1-999" : 1,
    "qty|1-999" : 1,
    "dis|1-999" : 1
  }]
})
// let goodList = mock.mock(
//    "goodslsit|40":[{
//      "pic":"Random.image('200x100', '#FF6600')",
//      "title":"@title(6,12)",
//      "addTime":"@Date",
//      "salePrice|100-999.10-99":1,
//      "curPrice|1000-9999.10-99":1,
//      "stock|1-999" : 1,
//      "qty|1-999" : 1,
//      "dis|1-999" : 1
//    }]
// )

let arr = [{
  "img": "/img/1.jpg",
  "title": "安踏KT5情人节配色男篮球鞋2020新品",
   "price": " 649.00",
   "qty" : 7,
   "salePrice":" 999.00",
   "addTime" : "2020-09-03",
   "praise"  : "299",
   "sales"   : "1278",
   "tag" :"男鞋"
}, {
  "img": "/img/2.jpg",
  "title": "安踏海沃德理发店配色GH1男鞋篮球鞋2020新款篮球系列",
  "price": " 669.00",
  "qty" : 71,
  "salePrice":" 499.00",
  "addTime" : "2010-09-03",
  "praise"  : "199",
  "sales"   : "178",
  "tag" :"女鞋"
}, {
  "img": "/img/3.jpg",
  "title": "安踏男鞋要疯3代五城城市特供款狂潮外场战靴篮球鞋",
  "price": " 459.00",
  "qty" : 17,
  "salePrice":" 299.00",
  "addTime" : "2020-09-03",
  "praise"  : "299",
  "sales"   : "1978",
  "tag" :"男鞋"
}, {
  "img": "/img/4.jpg",
  "title": "安踏男鞋汤普森KT4低帮篮球鞋篮球系列kt",
  "price": " 649.00",
  "qty" : 99,
  "salePrice":" 199.00",
  "addTime" : "2000-09-23",
  "praise"  : "299",
  "sales"   : "4278",
  "tag" :"男鞋"
}, {
  "img": "/img/5.jpg",
  "title": "安踏男鞋NASA联名跑鞋2020新款",
  "price": " 399.00",
  "qty" : 57,
  "salePrice":" 299.00",
  "addTime" : "2008-04-03",
  "praise"  : "1299",
  "sales"   : "9278",
  "tag" :"男鞋"
}, {
  "img": "/img/6.jpg",
  "title": "【预计发货时间9.10】安踏男鞋星标系列星岚跑鞋2020新款",
  "price": " 599.00",
  "qty" : 3,
  "salePrice":" 89.00",
  "addTime" : "2006-11-03",
  "praise"  : "12299",
  "sales"   : "6278",
  "tag" :"男鞋"
}, {
  "img": "/img/7.jpg",
  "title": "【预计发货时间9.10】’安踏男鞋星标系列星峦跑鞋2020新款",
  "price": " 899.00",
  "qty" : 12,
  "salePrice":" 729.00",
  "addTime" : "2018-06-03",
  "praise"  : "499",
  "sales"   : "12668",
  "tag" :"男鞋"
}, {
  "img": "/img/8.jpg",
  "title": "安踏男鞋综训鞋2020新款",
  "price": " 399.00",
  "qty" : 68,
  "salePrice":" 89.00",
  "addTime" : "2019-06-03",
  "praise"  : "699",
  "sales"   : "12078",
  "tag" :"男鞋"
}, {
  "img": "/img/9.jpg",
  "title": "安踏男鞋跑鞋2020新款",
  "price": " 299.00",
  "qty" : 16,
  "salePrice":" 69.00",
  "addTime" : "2016-12-03",
  "praise"  : "4999",
  "sales"   : "12178",
  "tag" :"男鞋"
}, {
  "img": "/img/10.jpg",
  "title": "安踏男鞋跑鞋2020新款",
  "price": " 349.00",
  "qty" : 4,
  "salePrice":" 149.00",
  "addTime" : "2020-09-03",
  "praise"  : "2939",
  "sales"   : "10278",
  "tag" :"女鞋"
}, {
  "img": "/img/11.jpg",
  "title": "【预计发货时间9月10日】安踏男鞋星标系列星岳篮球鞋2020新款",
  "price": " 999.00",
  "qty" : 8,
  "salePrice":" 889.00",
  "addTime" : "2020-08-03",
  "praise"  : "99",
  "sales"   : "12278",
  "tag" :"男鞋"
} , {
  "img": "/img/ny1.jpg",
  "title": "安踏女服针织运动外套2020新款",
  "price": " 369.00",
  "qty" : 8,
  "salePrice":" 229.00",
  "addTime" : "2020-04-03",
  "praise"  : "49",
  "sales"   : "278",
  "tag" :"女衣"
}, {
  "img": "/img/ny2.jpg",
  "title": "安踏女服针织运动外套2020新款",
  "price": " 369.00",
  "qty" : 8,
  "salePrice":" 229.00",
  "addTime" : "2020-07-03",
  "praise"  : "79",
  "sales"   : "1228",
  "tag" :"女衣"
}, {
  "img": "/img/ny3.jpg",
  "title": "安踏女服针织运动外套2020新款",
  "price": " 369.00",
  "qty" : 99,
  "salePrice":" 229.00",
  "addTime" : "2020-07-03",
  "praise"  : "79",
  "sales"   : "12528",
  "tag" :"女衣"
}, {
  "img": "/img/ny4.jpg",
  "title": "安踏女服套头卫衣2020新款",
  "price": " 199.00",
  "qty" : 25,
  "salePrice":" 129.00",
  "addTime" : "2020-07-03",
  "praise"  : "79",
  "sales"   : "18",
  "tag" :"女衣"
}, {
  "img": "/img/ny5.jpg",
  "title": "安踏女服中国系列连帽卫衣2020新款",
  "price": " 239.00",
  "qty" : 5,
  "salePrice":" 159.00",
  "addTime" : "2020-01-03",
  "praise"  : "739",
  "sales"   : "148",
  "tag" :"女衣"
}, {
  "img": "/img/ny6.jpg",
  "title": "安踏女裤针织运动长裤",
  "price": " 239.00",
  "qty" : 129,
  "salePrice":" 129.00",
  "addTime" : "2020-09-03",
  "praise"  : "7139",
  "sales"   : "48",
  "tag" :"女衣"
}, {
  "img": "/img/ny7.jpg",
  "title": "安踏女裤针织九分裤长裤2020新款",
  "price": " 239.00",
  "qty" : 1299,
  "salePrice":" 129.00",
  "addTime" : "2020-09-03",
  "praise"  : "70139",
  "sales"   : "41118",
  "tag" :"女衣"
}, {
  "img": "/img/ny8.jpg",
  "title": "安踏女裤针织九分裤长裤2020新款",
  "price": " 219.00",
  "qty" : 1299,
  "salePrice":" 159.00",
  "addTime" : "2020-09-03",
  "praise"  : "70139",
  "sales"   : "41118",
  "tag" :"女衣"
}, {
  "img": "/img/y1.jpg",
  "title": "安踏男服套头卫衣2020新款",
  "price": " 199.00",
  "qty" : 199,
  "salePrice":" 119.00",
  "addTime" : "2020-09-03",
  "praise"  : "713",
  "sales"   : "418",
  "tag" :"男衣"
}, {
  "img": "/img/y2.jpg",
  "title": "安踏男服套头卫衣",
  "price": " 199.00",
  "qty" : 199,
  "salePrice":" 139.00",
  "addTime" : "2020-09-03",
  "praise"  : "13",
  "sales"   : "48",
  "tag" :"男衣"
}, {
  "img": "/img/y3.jpg",
  "title": "安踏男服卫衣套头圆领长袖针织运动2020新款",
  "price": " 199.00",
  "qty" : 199,
  "salePrice":" 169.00",
  "addTime" : "2020-09-03",
  "praise"  : "1003",
  "sales"   : "1248",
  "tag" :"男衣"
}, {
  "img": "/img/y4.jpg",
  "title": "安踏2020年新品男款套头卫衣",
  "price": " 239.00",
  "qty" : 199,
  "salePrice":" 169.00",
  "addTime" : "2020-09-03",
  "praise"  : "12003",
  "sales"   : "12408",
  "tag" :"男衣"
}, {
  "img": "/img/y5.jpg",
  "title": "安踏男服输攻墨守套头卫衣2020新款",
  "price": " 199.00",
  "qty" : 199,
  "salePrice":" 139.00",
  "addTime" : "2020-09-03",
  "praise"  : "12003",
  "sales"   : "12408",
  "tag" :"男衣"
}, {
  "img": "/img/y6.jpg",
  "title": "安踏男服输攻墨守连帽卫衣2020新款",
  "price": " 279.00",
  "qty" : 149,
  "salePrice":" 179.00",
  "addTime" : "2020-09-03",
  "praise"  : "120003",
  "sales"   : "102408",
  "tag" :"男衣"
}, {
  "img": "/img/y7.jpg",
  "title": "安踏男服运动裤速干束脚休闲修身小脚长裤",
  "price": " 199.00",
  "qty" : 1419,
  "salePrice":" 119.00",
  "addTime" : "2020-09-03",
  "praise"  : "130003",
  "sales"   : "142408",
  "tag" :"男衣"
}, {
  "img": "/img/y8.jpg",
  "title": "安踏男款针织运动长裤",
  "price": " 169.00",
  "qty" : 1419,
  "salePrice":" 119.00",
  "addTime" : "2020-09-03",
  "praise"  : "30003",
  "sales"   : "146408",
  "tag" :"男衣"
} ];
// console.log(data)
mongo.insert('goods',arr);