
let findAll = async (Collection) =>{
    const db = await Connect();
    return await db.Collection(Collection).find().toArray();
}