const auth = require("../helpers/auth");
const amino = require("amino.js");
const translate = require('node-google-translate-skidz');

async function eightBall(receiver){
    console.log("jugando bola 8cho");

    const eightBallResponses =  ["En mi opinión, sí","Es cierto","Es decididamente así","Probablemente","Buen pronóstico","Todo apunta a que sí","Sin duda","Sí",
    "Sí, definitivamente","Debes confiar en ello","Respuesta vaga, vuelve a intentarlo","Pregunta en otro momento","Será mejor que no te lo diga ahora","No puedo predecirlo ahora",
    "Concéntrate y vuelve a preguntar","Puede ser","No cuentes con ello","Mi respuesta es no","Mis fuentes me dicen que no","Las perspectivas no son buenas","Muy dudoso"];
    const randomNumber = Math.random();
    const randomAnswer = Math.floor(randomNumber * 21);
    const answer = eightBallResponses[randomAnswer];

    await amino.sendChat(auth.amino.community,receiver,answer);

}

async function flipCoin(receiver){
    console.log("jugando cara o cruz");

    const coinSides = ["cara","cruz"];
    const randomNumber = Math.random();
    const randomSide = Math.floor(randomNumber * coinSides.length);
    const answer = coinSides[randomSide];

    await amino.sendChat(auth.amino.community,receiver,`salió ${answer}`);
}

async function getHoroscope(req,receiver){
    console.log("buscando horoscopo")

    const signs = ["aries","tauro","geminis","cancer","leo","virgo","libra","escorpio","sagitario","capricornio","acuario","piscis"]
    let horoscopeMatch = req.match(/\/getHoroscope (.*)/);
    let url;

    if(signs.includes(horoscopeMatch[1])){

        switch(horoscopeMatch[1]){
            case 'aries':
                url = `https://aztro.sameerkumar.website/?sign=aries&day=today`;
                break;
            case 'tauro':
                url = `https://aztro.sameerkumar.website/?sign=taurus&day=today`;
                break;
            case 'geminis':
                url = `https://aztro.sameerkumar.website/?sign=gemini&day=today`;
                break;
            case 'cancer':
                url = `https://aztro.sameerkumar.website/?sign=cancer&day=today`;
                break;
            case 'leo':
                url = `https://aztro.sameerkumar.website/?sign=leo&day=today`;
                break;
            case 'virgo':
                url = `https://aztro.sameerkumar.website/?sign=virgo&day=today`;
                break;
            case 'libra':
                url = `https://aztro.sameerkumar.website/?sign=libra&day=today`;
                break;
            case 'escorpio':
                url = `https://aztro.sameerkumar.website/?sign=scorpio&day=today`;
                break;
            case 'saggitarius':
                url = `https://aztro.sameerkumar.website/?sign=sagitario&day=today`;
                break;
            case 'capricornio':
                url = `https://aztro.sameerkumar.website/?sign=capricorn&day=today`;
                break;
            case 'acuario':
                url = `https://aztro.sameerkumar.website/?sign=aquarius&day=today`;
                break;
            default:
                url = `https://aztro.sameerkumar.website/?sign=piscis&day=today`;
                break;
        }

        fetch(url,{
            method: 'POST'
        })
        .then(res => res.json())
        .then(json => {

            translate({
                text: json.description,
                source: 'en',
                target: 'es'
            }, async function(result) {
                await amino.sendChat(auth.amino.community, receiver, `
                Horoscopo para: ${horoscopeMatch[1]}
                
${result.translation}
    
Tu número de la suerte: ${json.lucky_number}`)
          });
        });
    }

    else {
        await amino.sendChat(auth.amino.community, receiver, 'Signo zodiacal incorrecto, recuerda escribirlos en minúsculas.')
    }
    
}

async function rsp(req,receiver){
    console.log("Jugando Piedra, Papel o Tijera");

    const rspResponses = ["piedra","papel","tijera"];
    let rspMatch = req.match(/\/rsp (.*)/);

    if(rspResponses.includes(rspMatch[1])){
        const randomNumber = Math.random();
        const randomRSP = Math.floor(randomNumber * 3);
        const answer = rspResponses[randomRSP];

        if(rspMatch[1] == answer){
            await amino.sendChat(auth.amino.community,receiver,`
            Tu elegiste: ${rspMatch[1]} y yo elegí: ${answer}

                    ¡Empate!
            `);
        }

        else if(rspMatch[1] == 'papel' && answer == 'tijera'){
            await amino.sendChat(auth.amino.community,receiver,`
            Tu elegiste: ${rspMatch[1]} y yo elegí: ${answer}

                    ¡Perdiste!
            `);
        }

        else if(rspMatch[1] == 'tijera' && answer == 'piedra'){
            await amino.sendChat(auth.amino.community,receiver,`
            Tu elegiste: ${rspMatch[1]} y yo elegí: ${answer}

                    ¡Perdiste!
            `);
        }

        else if(rspMatch[1] == 'piedra' && answer == 'papel'){
            await amino.sendChat(auth.amino.community,receiver,`
            Tu elegiste: ${rspMatch[1]} y yo elegí: ${answer}

                    ¡Perdiste!
            `);
        }

        else if(rspMatch[1] == 'tijera' && answer == 'papel'){
            await amino.sendChat(auth.amino.community,receiver,`
            Tu elegiste: ${rspMatch[1]} y yo elegí: ${answer}

                    ¡Ganaste!
            `);
        }

        else if(rspMatch[1] == 'papel' && answer == 'piedra'){
            await amino.sendChat(auth.amino.community,receiver,`
            Tu elegiste: ${rspMatch[1]} y yo elegí: ${answer}

                    ¡Ganaste!
            `);
        }

        else {
            await amino.sendChat(auth.amino.community,receiver,`
            Tu elegiste: ${rspMatch[1]} y yo elegí: ${answer}

                    ¡Ganaste!
            `);
        }

    }

    else {
        await amino.sendChat(auth.amino.community,receiver,'Las opciones son piedra, papel y tijera');
    }

}

module.exports = {
    eightBall: eightBall,
    flipCoin: flipCoin,
    getHoroscope: getHoroscope,
    rsp: rsp
}