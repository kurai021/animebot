const auth = require("./auth");
const Weez = require("weez");
const weez = new Weez.WeezAPI(auth.weez.password);

async function loli(){
    let loli;
    await weez.randomLoli()
        .then(data => {
            loli = data;
            return;
        })
        .catch(err => {
            console.log(err)
        })
    
    return loli;
}

async function trap(){
    let trap;
    await weez.randomTrap()
        .then(data => {
            trap = data;
            return;
        })
        .catch(err => {
            console.log(err)
        })

    return trap;
}

async function husbando(){
    let boy;
    await weez.randomBoys()
        .then(data => {
            boy = data;
            return;
        })
        .catch(err => {
            console.log(err)
        })

    return boy;
}

async function abrazo(){
    let abrazo;
    await weez.randomAbrazo()
        .then(data => {
            abrazo = data;
            return;
        })
        .catch(err => {
            console.log(err)
        })

    return abrazo;
}

async function beso(){
    let beso;
    await weez.randomBeso()
        .then(data => {
            beso = data;
            return;
        })
        .catch(err => {
            console.log(err)
        })

    return beso;
}

async function caricia(){
    let caricia;
    await weez.randomPat()
        .then(data => {
            caricia = data;
            return;
        })
        .catch(err => {
            console.log(err)
        })

    return caricia;
}

async function logro(req){
    let logroMatch = req.match(/\/logro (.*)/)
    let logro;
    await weez.logro(logroMatch[1])
        .then(data => {
            logro = data;
            return;
        })
        .catch(err => {
            console.log(err);
        })
    
    return logro;
}

module.exports = {
    loli:loli,
    trap:trap,
    husbando: husbando,
    abrazo:abrazo,
    beso:beso,
    caricia:caricia,
    logro:logro
}