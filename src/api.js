
var express = require("express");
var app = express();
const token = require ('./util/token');

app.use(express.urlencoded({extended : true}));
app.use(express.json());

const router = express.Router();
const salaController = require("./controllers/salaController");

//Começo de Rotas 
app.use('/', router.get('/', (req,res)=>{
    res.status(200).send(" <h1>api - chat <h1>")
  }))
  

// Rota para entrar no CHAT
app.use('/entrar', router.post('/entrar', async (req, res, next) => {
    const usuarioController = require('./controllers/usuarioController');
    let resp = await usuarioController.entrar(req.body.nick);
    res.status(200).send(resp);
}));

//Rota para listar as salas
app.use('/salas', router.get('/salas', async (req, res, next) => {
    
    console.log("Token:"+req.headers.token)
    console.log("idUser:"+req.headers.iduser)
    console.log("Nick:"+req.headers.nick)
    
    if (await token.checkToken(req.headers.token, req.headers.iduser, req.headers.nick)
    ) {
        let resp = await salaController.get();
        res.status(200).send(resp);
    } else {
        res.status(400).send({ msg: "Usuário não autorizado" })
    }

}));


//Sobre a API 
app.use('/', router.get('/sobre' , (req, res, next)=>{
   res.status(200).send({
       "nome":"API - CHAT",
       "versão": "0.1.0" ,
       "autor": "Nicolas Fernando"
   })
}))

// Rota para entrar na sala .........
app.use('/sala/entrar', router.put('/sala/entrar', async (req, res) => {
    if (!token.checkToken(req.headers.token, req.headers.iduser, req.headers.nick))
        return false;

    console.log(req.headers);
    console.log("Entrando na sala idUser:"+req.headers.iduser);
    console.log("Entrando na sala idSala:"+req.query.idSala);
    let resp = await salaController.entrar(req.headers.iduser, req.query.idSala);
    
    res.status(200).send(resp);

}))

// Criar sala
app.use('/sala/criar', router.post('/sala/criar', async (req, res) => {
    if (!token.checktoken(req.headers.token, req.headers.idUser, req.headers.nick))
        return false;

    // Extrair os dados necessários do corpo da requisição
    const { nome, tipo } = req.body;

    // Chamar o controlador para criar a sala
    let resp = await salaController.criarSala(req.headers.iduser, nome, tipo);
    res.status(200).send(resp);
}))



// Enviar mensagens
app.use('/sala/mensagem/', router.post('/sala/mensagem', async (req, res) => {
    if (!token.checkToken(req.headers.token, req.headers.iduser, req.headers.nick))
        return false;
    let resp = await salaController.enviarMensagem(req.headers.nick, req.body.msg, req.body.idsala);
    res.status(200).send(resp);
}))

// Listar mensagens
app.use('/sala/mensagens/', router.get('/sala/mensagens', async (req, res) => {
    
    
    console.log("Token:"+req.headers.token)
    console.log("idUser:"+req.headers.iduser)
    console.log("Nick:"+req.headers.nick)

    if (!token.checkToken(req.headers.token, req.headers.iduser, req.headers.nick))
        return false;

        console.log("Listar Mensagem idSala:"+req.query.idsala);
        console.log("Listar Mensagem timestamp :"+req.query.timestamp);

    let resp = await salaController.buscarMensagens(req.query.idsala, req.query.timestamp);
    res.status(200).send(resp);
}))

//Sair da sala

app.use('/sala/sair', router.put('/sala/sair', async (req, res) => {
    if (!token.checktoken(req.headers.token, req.headers.iduser, req.headers.nick))
        return false;
    console.log(req.headers);
    let resp = await salaController.sairSala(req.headers.iduser, req.query.idsala);
    res.status(200).send(resp);
}));

// sair do chat
app.use('/sair', router.put('/sair', async (req, res) => {
    if (!token.checktoken(req.headers.token, req.headers.iduser, req.headers.nick))
        return false;

    const usuarioController = require('./controllers/usuarioController');
    let resp = await usuarioController.sairChat(req.headers.iduser);

    res.status(200).send(resp);
}));


module.exports=app;