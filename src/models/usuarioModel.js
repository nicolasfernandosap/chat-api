//Modelo Criado para usuarios
const db = require('./db');

async function registrarUsuario(nick){ 
    return await db.insertOne('usuarios', {'nick': nick});
}


let buscarUsuario = async (idUser)=>{
    let user = await db.findOne('usuarios',idUser);
    console.log(user)
    return user;
}

let alterarUsuario = async (user)=>{
    return await db.updateOne('usuarios', user,{_id:user._id});
}

let atualizarMensagens = async (sala)=>{
    return await db.updateOne('salas', sala, {_id:sala._id});
}



module.exports = {registrarUsuario,buscarUsuario, alterarUsuario,atualizarMensagens}
