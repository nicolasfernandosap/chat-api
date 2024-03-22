 const express = require('express');
const app = express();
app.use(express.urlencoded({extended:true}));
app.use(express.json());

const router = express.Router();
app.use("/", router.get('/',(req, res) =>{
   res.status(200).send("<h1>API CHAT</h1>")

}));


app.use("/sobre", router.get("/sobre", (req,res, next)=>{
        res.status(200).send({
      "nome": "API - CHAT",
      "versão": "0.1.0",
      "autor": "Cãndido Farias"
})
}));   


//Parte 4 Aulas.Verificar erro

app.use("/salas", router.get("salas",(req,res, next)=>{
   if(await
token.checkToken(req.headers.token,req.headers.iduser,req.headers.nick)
){
      let resp= await salaController.get();
      res.status(200).send(resp);
   }else{
       res.status(400).send({msg:"Usuario não autorizado"});
   }
}))

 module.exports = app;

app.use('/' , router.get);



app.use("/entrar", router.post("/entrar", async(req, res, next)=> {
   const usuarioController = require("./controllers/usuarioController")
   let resp = await usuarioController.entrar(req.body.nick);
   res.status(200).send(resp);

})); */