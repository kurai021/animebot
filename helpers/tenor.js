const auth = require("./auth");
const tenor = require("tenorjs");

const Tenor = tenor.client({
    "Key": auth.tenor.password,
    "Filter": "off", // "off", "low", "medium", "high", not case sensitive
    "Locale": "en_US", // Your locale here, case-sensitivity depends on input
    "MediaFilter": "minimal", // either minimal or basic, not case sensitive
    "DateFormat": "D/MM/YYYY - H:mm:ss A" // Change this accordingly
})

async function loli(){
    let loli;
    await Tenor.Search.Random("loli anime","1")
        .then(data => {
            loli = data[0].media[0].tinygif.url;
            return;
        })
        .catch(err => {
            console.log(err)
        })
    
    return loli;
}

async function husbando(){
    let boy;
    await Tenor.Search.Random("%23anime %23boy","1")
        .then(data => {
            boy = data[0].media[0].tinygif.url;
            return;
        })
        .catch(err => {
            console.log(err)
        })
        
    return boy;
}

async function abrazo(){
    let abrazo;
    await Tenor.Search.Random("anime hug","1")
        .then(data => {
            abrazo = data[0].media[0].tinygif.url;
            return;
        })
        .catch(err => {
            console.log(err)
        })

    return abrazo;
}

async function beso(){
    let beso;
    await Tenor.Search.Random("anime kiss","1")
        .then(data => {
            beso = data[0].media[0].tinygif.url;
            return;
        })
        .catch(err => {
            console.log(err)
        })

    return beso;
}

async function caricia(){
    let caricia;
    await Tenor.Search.Random("anime pat","1")
        .then(data => {
            caricia = data[0].media[0].tinygif.url;
            return;
        })
        .catch(err => {
            console.log(err)
        })

    return caricia;
}

async function belle(){
    let belle;
    await Tenor.Search.Random("%23belledelphine","1")
        .then(data => {
            belle = data[0].media[0].tinygif.url;
            return;
        })
        .catch(err => {
            console.log(err)
        })

    return belle;
}

module.exports = {
    loli:loli,
    husbando: husbando,
    abrazo:abrazo,
    beso:beso,
    caricia:caricia,
    belle:belle
}