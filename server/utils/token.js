const jwt        = require('jsonwebtoken');
const privatekey = 'ZQM';

function create(data={},expiresIn='2h'){
    const token = jwt.sign({...data},privatekey,{
       expiresIn
    });
    return token;
}

function verify(token){
    let result ;
    try{
        jwt.verify(token,privatekey);
        result = true;
    }catch(err){
        result = false
    }

    return result;
}

module.exports = {
    create,
    verify
}