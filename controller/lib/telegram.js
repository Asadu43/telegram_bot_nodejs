const { text } = require("express");
const { getAxiosInstance } = require("./axios");
const { errorHandler } = require("./helper");

const MY_TOKEN = "7821575378:AAFV6CSgBiU6-efYRl5wNpfDPmzUWO7e7CY";
const BASE_URL = `https://api.telegram.org/bot${MY_TOKEN}`;
const axiosInstance = getAxiosInstance(BASE_URL);


function sendMessage(chatId, messageText) {
    return axiosInstance.get("sendMessage", {
        chat_id: chatId,
        text: messageText,
    }).catch((ex) => {
        errorHandler(ex, "sendMessage", "axios");
    });
}


async function handleMessage(messageObj) {
    const messageText = messageObj.text || "";
    if (!messageText) {
        errorHandler("No message Text", "handle Message");
        return "";
    }

    try {
        const chatId = messageObj.chat.id;
        if (messageText.charAt(0) === "/") {
            const command = messageText.substr(1);
            switch (command) {
                case "start":
                    return sendMessage(chatId,
                        "Hi I'm a bot. I can help you sort out your bills"
                    )

                default:
                    return sendMessage(chatId, "Hi , I don't know that Command")
            }
        }else {
           return sendMessage(chatId,messageText)
        }


    } catch (error) {
        errorHandler(error, "handleMessage");
    }

}

module.exports = {
    sendMessage,
    handleMessage
}

