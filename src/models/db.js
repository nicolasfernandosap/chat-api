//Função para retornar todos os registros de uma coleção dada

const { connect } = require("../api");

let findAll = async (collection) => {
    const db = await connect();
    let resp = await db.collection(collection).find().toArray();
    return resp;
}

async function insertOne (collection, objeto){
    const db = await connect();
    return db.collection(collection).
    insertOne(objeto)
} 

let findOne = async (collection, _id) => {
    const db = await connect();
    let obj = await db.collection(collection).find({'_id':new ObjectId(_id)}).toArray();
    console.log(obj);
    if (obj)
        return obj[0];
    return false;
}

let updateOne = async (collection, object, param)=>{
    const db = await connect();
    let result = await db.collection(collection).updateOne(param, {$set: object});
    return result;
}

