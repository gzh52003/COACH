const express = require('express');
const {PORT,...other} = require('./dep/config.json');
const portUrl      = require('./port');
const path         = require('path');
const app          = express();
app.use(express.static(path.join(__dirname,'./static'),{

}));

app.use('/api',portUrl);
app.listen(PORT,()=>{
    console.log('SERVER IS RUNNING ON PORT'+' >> '+PORT);
})