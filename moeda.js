const request = require('request')

const coins = 'USD-BRL,EUR-BRL,BTC-BRL,CNY-BRL' // Aqui você pode escolher as moedas que deseja consultar

const options = {
    url: `https://economia.awesomeapi.com.br/last/${coins}`,
    method: 'GET',
    headers: {
        'Accept': 'application/json',
        'Accept-Charset': 'utf-8'
    }
}

// Exemplo de como usar:
const callbackQuotes = function(erro, res, body) {
    let json = JSON.parse(body)
    console.log(json)
    
    if(erro) {
        return console.error('Erro: ', erro.message)
    }
    console.log(res.statusCode)// Imprime o código de status da requisição
}

const callbackDollar = function(erro, res, body) {
    let json = JSON.parse(body)
    quote = json.USDBRL['bid']
    day = json.USDBRL['create_date']

    console.log('\033[1;31m > Dólar = R$' + quote + ' (' + day + ') \033[0m')

    if(erro) {
        return console.error('Erro: ', erro.message)
    }
}

const callbackEuro = function(erro, res, body) {
    let json = JSON.parse(body)
    quote = json.EURBRL['bid']
    day = json.EURBRL['create_date']

    console.log('\033[1;34m > Euro = R$' + quote + ' (' + day + ') \033[0m')
    
    if(erro) {
        return console.error('Erro: ', erro.message)
    }
}

const callbackBitcoin = function(erro, res, body) {
    let json = JSON.parse(body)
    quote = json.BTCBRL['bid']
    day = json.BTCBRL['create_date']

    console.log('\033[1;33m > Bitcoin = R$' + quote + ' (' + day + ') \033[0m')

    if(erro) {
        return console.error('Erro: ', erro.message)
    }
}

const callbackYuan = function(erro, res, body) {
    let json = JSON.parse(body)
    quote = json.CNYBRL['bid']
    day = json.CNYBRL['create_date']

    console.log('\033[1;32m > Yuan = R$' + quote + ' (' + day + ') \033[0m')

    if(erro) {
        return console.error('Erro: ', erro.message)
    }
}

setInterval(() => {
    request(options, callbackBitcoin)
    request(options, callbackDollar)
    request(options, callbackEuro)
    request(options, callbackYuan)
    //request(options, callbackQuotes)

    console.info("\nAtualizando cotações...")

    // Limpar o console
    setTimeout(() => {
        console.clear()
    }, 20000)
}, 11000)

// Tabela com as legendas
class subtitles {
    constructor(translate) {
        this.translate = translate
    }
}

let desc = {}
desc.bid = new subtitles("Compra")
desc.ask = new subtitles("Venda")
desc.varBid = new subtitles("Variação")
desc.pctChange = new subtitles("Porcentagem de variação")
desc.high = new subtitles("Máximo")
desc.low = new subtitles("Mínimo")

console.table(desc)
