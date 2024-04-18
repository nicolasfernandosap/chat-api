//serviço para geração e validação de tokens

const jwt = require('jsonwebtoken');

let checkToken = async (token, id, key) => {
    try {
        const decoded = await jwt.verify(token, key);
        if(decoded){
            if(decoded.id==id){
                console.log("Funcionando o decoded");
                return true;
            }

        }
        return false;

    } catch (err) {
        console.log("Nao esta funcionando");
        return false;
    }
};

const setToken = async (id, key) => {
    console.log(id);
    if (id) {
        return jwt.sign({ id }, key, { expiresIn: 28800 });
    }
    return false;
}

module.exports = {
    checkToken,
    setToken
};
