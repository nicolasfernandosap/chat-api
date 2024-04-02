
// Rota para entrar no CHAT
app.use('/entrar', router.post('/entrar', async (req, res, next) => {
    const usuarioController = require('./controllers/usuarioController');
    let resp = await usuarioController.entrar(req.body.nick);
    res.status(200).send(resp);
}));

//Rota para listar as salas
app.use('/salas', router.get('/salas', async (req, res, next) => {
    if (await
        token.checktoken(req.headers.token, req.headers.iduser, req.headers.nick)
    ) {
        let resp = await salaController.get();
        res.status(200).send(resp);
    } else {
        res.status(400).send({ msg: "Usuário não autorizado" })
    }

}));

// Rota para entrar na sala
app.use('/sala/entrar', router.put('/sala/entrar', async (req, res) => {
    if (!token.checktoken(req.headers.token, req.headers.iduser, req.headers.nick))
        return false;

    console.log(req.headers);
    let resp = await salaController.entrar(req.headers.iduser, req.query.idsala);
    res.status(200).send(resp);

}))

// Enviar mensagens
app.use('/sala/mensagem/', router.post('/sala/mensagem', async (req, res) => {
    if (!token.checktoken(req.headers.token, req.headers.iduser, req.headers.nick))
        return false;
    let resp = await salaController.enviarMensagem(req.headers.nick, req.body.msg, req.body.idsala);
    res.status(200).send(resp);
}))

// Listar mensagens
app.use('/sala/mensagens/', router.get('/sala/mensagens', async (req, res) => {
    if (!token.checktoken(req.headers.token, req.headers.iduser, req.headers.nick))
        return false;
    let resp = await salaController.buscarMensagens(req.query.idsala, req.query.timestamp);
    res.status(200).send(resp);
}))