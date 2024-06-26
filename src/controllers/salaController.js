//ajustar o método get no salaController.js
const salaModel = require('../models/salaModel');
const usuarioModel = require('../models/usuarioModel');

exports.get = async(req, res)=>{
    let salas = await salaModel.listarSalas();
    return salas;
}

exports.entrar = async (iduser, idsala)=>{
    const sala = await salaModel.buscarSala(idsala);
    console.log("Sala:"+sala);
    let usuarioModel = require('../models/usuarioModel');
    let user = await usuarioModel.buscarUsuario(iduser);
    console.log("User:"+user);
    user.sala = {_id:sala._id, nome:sala.nome, tipo:sala.tipo};
    if(await usuarioModel.alterarUsuario(user)) {
        return {msg:'Ok', timestamp:timestamp=Date.now()};
    }
    return false;
}

exports.enviarMensagem = async (nick, msg, idsala)=>{
    console.log("EnviarMensagem:"+idsala)
    const sala = await salaModel.buscarSala(idsala);
    console.log(sala)

    if(!sala.msgs){
        sala.msgs=[];
    }
    
    timestamp=Date.now()
    sala.msgs.push(
        {
            timestamp:timestamp,
            msg:msg,
            nick:nick
        }
    )
    let resp = await salaModel.atualizarMensagens(sala);
    return {'msg':'Mensagem enviada com sucesso!', 'timestamp':timestamp};
}

exports.buscarMensagens = async (idsala, timestamp)=>{
    let mensagens = await salaModel.buscarMensagens(idsala, timestamp);
    try{
        return {
            'timestamp': mensagens[mensagens.length -1].timestamp,
            'msgs': mensagens
        };
    }
    catch(e){
        return{
        'timestamp': [],
        'msgs': mensagens}
    }
   
}

exports.sairSala = async (idsala, iduser) => {
    console.log("idsala1:"+idsala)
    console.log("iduser1:"+iduser)
    const user = await usuarioModel.buscarUsuario(iduser);
   console.log(user);
    if (user) {
        await exports.enviarMensagem(iduser, "Saiu da sala!", idsala);
        delete user.sala;
  
        if (await usuarioModel.alterarUsuario(user)) {
            const timestamp = Date.now();
            return { msg: "OK", timestamp };
        }
    }
  
    return {"msg":"Erro"};
};