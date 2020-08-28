const {Router,urlencoded,json} = require('express');
const session                  = require('express-session');
const token                    = require('../utils/token');
const cors                     = require('./tool/cors');
const router                   = Router();
const bodyParser               = require('body-parser');

const userRouter = require('./user/user');
const goodsRouter = require('./goods/goods');
const regRouter = require('./user/reg');
const loginRouter = require('./user/login');
const vcodeRouter = require('./tool/vcode');
const uploadRouter = require('./tool/upload');
const { formatData } = require('../utils/tools');

router.use(cors);
router.use(urlencoded({ extended: false}), json());
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));
router.use(session({
    secret:"ZQM",
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000*60*60*2
    }
}))

router.use('/user',userRouter);
router.use('/goods',goodsRouter);
router.use('/reg',regRouter);
router.use('/login',loginRouter);
router.use('/upload',uploadRouter);

router.get('/jwtverify',(req,res)=>{
    const {authorization} = req.query;
    if(token.verify(authorization)){
        res.send(formatData())
    }else{
        res.send(formatData({code:0}))
    }
});

router.use('/vcode',vcodeRouter);
module.exports = router;