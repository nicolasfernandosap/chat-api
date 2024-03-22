const jwt = require('jsonwebtoken');

const checktoken = async(toke, id, key) => jwt.verify (token, key, (err, decoded) =>{
   // Continuar comando exigido pelo Professor...
   // Fazer o comando if (decoded) AQUI , que passou nesta aula
});

const setoken = async (id, key)=>{
    console.log(id);
    if(id){
    return jwt.sign ({id}, key, {expiresIn: 28800});
}
return false;
};

module.exports = {
    checktoken,
    setToken,
};