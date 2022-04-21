const TelegramBot = require('node-telegram-bot-api')
const helpers = require('./helpers')


const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true } )


bot.on('message', (msg) => {
    if (msg.text == 'help') {
        bot.sendMessage(msg.chat.id, `Hello ${msg.from.first_name}, my name is Washi. I am a vulnerability scanner for websites. Send me a link to a web page and I will show you what flaws it has.`)
    }

    const url = msg.text

    const parsedUrl = helpers.urlParser(url)

    if (parsedUrl) {
        bot.sendMessage(msg.chat.id, parsedUrl)
    } else {
        bot.sendMessage(msg.chat.id, "invalid url")
    }
})