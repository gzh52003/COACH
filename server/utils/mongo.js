const {MongoClient,ObjectId} = require('mongodb');
const {PORT,DATABASE:{
    DBNAME,URL
}
} =require('../dep/config.json');

async function connect(){
    const client = await MongoClient.connect(URL,{ useUnifiedTopology: true });
    const db     = client.db(DBNAME);
    return {client,db};
}

async function insert(colName,data){
    const {db,client} = await connect();
    const collection  = db.collection(colName);
    const result = await collection[Array.isArray(data) ? 'insertMany' : 'insertOne'](data);
    client.close();
    return result;
}

async function remove(colName,query){
    const {db,client} = await connect();
    if(query._id && typeof query._id === 'string'){
        query._id = ObjectId(query._id);
    }
    const collection = db.collection(colName);
    const result     = await collection.deleteMany(query);
    client.close();
    return result;
}

async function update(colName,query,newDate){
    const {db,client} = await connect();
    const collection  = db.collection(colName);
    if(query._id && typeof query._id === 'string'){
        query._id = ObjectId(query._id);
    }
    const result  = await collection.updateMany(query,newDate);
    client.close();
    return result;
}

async function find(colName,query={},options={}){
    console.log(options , 'server')
    const {client,db} = await connect();
    const collection = db.collection(colName);
    if(query._id && typeof query._id === 'string'){
        query._id = ObjectId(query._id);
    }
 
    const opt = {}
    if(options.field){
        opt.projection = options.field;
    }
    let result = collection.find(query,opt);
    const count = await result.count();
    if(options.skip){
      result = result.skip(options.skip)
    }
    if(options.limit){
        result = result.limit(options.limit);
    }
    if(options.sort){
        let key,val;
        key = options.sort[0];
        if(options.sort.length>1){
            console.log('aaaaaaaa',options.sort[0])
            val = options.sort[1]*1;
        }else{
            val = -1;
        }
        result  = result.sort({
            [key]:val
        })
    }
    result = await result.toArray();
    client.close();
    if(options.total == 1){
        return{
           total:count,
           data:result
        }
    } else{
        return result
    }
}

module.exports = {
    insert,
    remove,
    update,
    find
}

