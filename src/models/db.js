//Função para retornar todos os registros de uma coleção dada

const {MongoClient, objet, ObjectId} = require("mongodb");

let singleton;

async function connect(){
    if(singleton) return singleton;
   
    const client = new MongoClient(process.env.DB_HOST);
    await client.connect();

    singleton = client.db(process.env.DB_DATABASE);
    return singleton;

}
//Função para retornar todos os registros de uma coleção dada
let findAll = async (collection) => {
    const db = await connect();
    let resp = await db.collection(collection).find().toArray();
    return resp;
}
//Método responsável pela criação de um novo documento
async function insertOne(collection,objeto){
    const db = await connect();
    return db.collection(collection).insertOne(objeto);
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

let deleteOne = async (collection, _id)=>{
    const db = await connect();
    let result = await db.collection(collection).deleteOne({'_id':new ObjectId(_id)});
    return result;
}

//Exportando a função para que possa ser utilizada externamente
module.exports = { findAll, insertOne, findOne, updateOne, deleteOne }