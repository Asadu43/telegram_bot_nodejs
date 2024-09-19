const {handleMessage,sendMessage} = require("./lib/telegram");
const { errorHandle} = require("./lib/helper");



async function handler(req, method) {
    try{
        if(method === "GET"){
            return "Hello Get";
        }
        const {body} = req;
        if(body && body.message){
            const messageObj = body.message;
            await handleMessage(messageObj);
            return "Success"; 
        }

        return "Unknown Request";
    }catch (error){
        errorHandle(error,"mainIndexHandler");
    }
}

module.exports = {
    handler
}