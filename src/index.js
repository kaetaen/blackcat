const TelegramBot = require('node-telegram-bot-api')
const helpers = require('./helpers')
const api = require('./api')

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true } )

bot.on('message', async (msg) => {
    if (msg.text == 'help') {
        bot.sendMessage(msg.chat.id, `Hello ${msg.from.first_name}, my name is Washi. I am a vulnerability scanner for websites. Send me a link to a web page and I will show you what flaws it has.`)
    }

    const url = msg.text

    const parsedUrl = helpers.urlParser(url)

    while (true) {
        const scanData = await api.fetchAnalizedUrl(url)
        console.log(scanData.state)
        if (scanData.state != 'PENDING' && scanData.state != 'RUNNING' && scanData.state != 'STARTING') {
            if (scanData.error) {
                bot.sendMessage(msg.chat.id, "⚠️ " + scanData.text)
                break
            }

            if (scanData.state == 'FAILED') {
                bot.sendMessage(msg.chat.id, "⛔ " + "Failed")
                break
            }
            
            const scanResult = await api.fetchScanResult(scanData.scan_id)
            
            let reportMsg = '🐈 REPORT 🐈' + "\n\n\n"
            for (let key in scanResult) {
                reportMsg += '🙀 Name: ' + scanResult[key].name + '\n'
                reportMsg += '📜 Description: ' + scanResult[key].score_description + '\n\n'
            }
            bot.sendMessage(msg.chat.id, reportMsg)
            break
            
        }
        
    }
})