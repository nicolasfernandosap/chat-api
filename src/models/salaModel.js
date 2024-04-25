//Atualizando salaModel.js, para utilizar recursos de db.js
const db = require('./db');

let listarSalas = async()=>{
    let salas = await db.findAll("salas");
    return salas;
};

let buscarSala = async (idsala)=>{
    console.log("BuscarSala:"+idsala)
    return await db.findOne('salas', idsala);
}

let atualizarMensagens = async (sala)=>{
    return await db.updateOne('salas', sala, {_id:sala._id});
}

let buscarMensagens = async (idsala, timestamp)=>{
    let sala = await buscarSala(idsala);
    if(sala.msgs){
        let msgs = [];
        sala.msgs.forEach((msg)=>{
            if(msg.timestamp >= timestamp){
                msgs.push(msg);
            }
        });
        return msgs;
    }
    return [];
}


module.exports = {listarSalas,buscarSala,atualizarMensagens,buscarMensagens}