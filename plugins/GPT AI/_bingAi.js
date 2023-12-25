const fetch = require('node-fetch');
const { getBuffer } = require('../../lib/_getBuffer.js');

async function Bing(prompt) {
    try {
        let response = await fetch("https://copilot.github1s.tk/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": "dummy",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "model": "Creative",
                "max_tokens": 100,
                "messages": [
                    {
                        "role": "system",
                        "content": "You are a helpful assistant."
                    },
                    {
                        "role": "user",
                        "content": prompt
                    }
                ]
            })
        });
        
        const result = await response.json();
        return result.choices[0].message.content;
    } catch (error) {
        console.error(error);
        throw new Error('_An error occurred while processing your request_');
    }
}

module.exports = {
    name: 'bing',
    alias: ['bang'],
    async client(vorterx, m, { args, connect }) {
        if (!args) {
            await connect('❌');
            return m.reply('Please provide a text, e.g., `bing hello how are you`');
        }

        try {
            const result = await Bing(args);
            await connect('💡');
            vorterx.sendMessage(m.from, {
                text: result,
                contextInfo: {
                    externalAdReply: {
                        title: "BING GPT",
                        body: "",
                        mediaType: 1,
                        thumbnail: await getBuffer("https://i.ibb.co/9bfjPyH/1-t-Y7-MK1-O-S4eq-YJ0-Ub4irg.png"),
                        mediaUrl: "",
                        sourceUrl: "",            
                    },
                },
            });
        } catch (error) {
            await connect('❌');
            m.reply(error.message);
        }
    }
};
