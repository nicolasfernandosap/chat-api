//Função para retornar todos os registros de uma coleção dada

let findAll = async (collection) => {
    const db = await connect();
    let resp = await db.collection(collection).find().toArray();
    return resp;
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

