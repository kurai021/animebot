const auth = require("../helpers/auth");
const edamam = require("../helpers/edamam");
const fs = require('fs');
const amino = require("amino.js");
const wikijs = require("wikijs").default;
const Pokedex = require("pokedex-promise-v2");
const poke = new Pokedex();

let timestamp = Math.floor(Date.now() / 1000)

async function unknownText(receiver){
    await amino.sendChat(
        auth.amino.community,
        receiver,
        `
        Comando incorrecto, puede conocer los comandos disponibles con /help
        `
    )
}

async function welcome(titleChat,receiver){
    await amino.sendChat(
        auth.amino.community,
        receiver,
        `
        [i]Bienvenido a ${titleChat}!
        
Espero que te la pases muy bien aquí, sientete libre de hablar con quien gustes cuando quieras. No olvides seguir las reglas de la comunidad y este chat para evitar malos entendidos.
        `
    )
}

async function reqHelp(receiver){
    await amino.sendChat(
        auth.amino.community,
        receiver,
        `
        Hola, me llamo Animebot :3, esta es mi lista de comandos. Si necesitas ayuda adicional con algun comando, puedes escribirle a Kurai021.

[B]Comandos informativos

/help: Obtiene estas instrucciones

[B]Comandos relacionados a anime y manga
        
/getManga título: Obtiene información de un manga específico (título nativo, romaji, imagen, inicio y fin de publicación, capítulos, volumenes y descripción).
Ejemplo: /getManga death note

/getAnime título: Obtiene información de un anime específico (título nativo, romaji, imagen, inicio y fin de publicación, episodios, duración aproximada y descripción).
Ejemplo: /getAnime evangelion

/getRandomAnime categoría: Obtiene información de un anime al azar

/getRandomManga categoría: Obtiene información de un manga al azar

Las categorías definidas en ambos casos son: Action, Adventure, Comedy, Drama, Ecchi, Fantasy, Horror, Mahou Shoujo, Mecha, Music, Mystery, Psychological, Romance, Sci-Fi, Slice of Life, Sports, Supernatural, Thriller

/getCharacter personaje: Obtiene una biografía de un personaje
Ejemplo: /getCharacter Conan Edogawa

[B]Comandos divertidos y juegos

/8ball pregunta: Has una pregunta a la bola 8 mágica.
Ejemplo: /8ball Él no me vió?

/flipCoin: Lanza una moneda para sacar cara o cruz.

/rsp: Juega piedra, papel o tijeras con Animebot.
Ejemplo: /rsp tijera

/trump: Has que Donald Trump publique una nueva orden ejecutiva
Ejemplo: /trump tu madre es hombre

[B]Comandos de búsqueda

/getHoroscope: Obtiene tu horoscopo y número de la suerte diario.
Ejemplo: /getHoroscope aries

/pokedex: Obtiene información de un Pokémon
Ejemplo: /pokedex pikachu

/wikipedia: Obtiene información de Wikipedia en español
Ejemplo: /wikipedia anime

/edamam: Obtiene información desde la base de datos de Edamam en español sobre alguna receta de cocina al azar basado en un término de busqueda
Ejemplo: /edamam chocolate

[B]Otros comandos

/bienvenido: Da un mensaje de bienvenida para tus amigos en tu grupo de chat público.
        `)
}

async function reqPoke(req,receiver){
    let pokeMatch = req.match(/\/pokedex (.*)/)
    let types, normalHab, hiddenHab;
    let description = [];
    let pokemon;

    switch(pokeMatch[1]){
        case 'deoxys':
            pokemon = 'deoxys-normal';
            break;
        case 'wormadam':
            pokemon = 'wormadam-plant' || 'wormadam-trash' || 'wormadam-sandy';
            break;
        case 'giratina':
            pokemon = 'giratina-altered';
            break;
        case 'shaymin':
            pokemon = 'shaymin-land';
            break;
        case 'basculin':
            pokemon = 'basculin-red-striped' || 'basculin-blue-striped';
            break;
        case 'darmanitan':
            pokemon = 'darmanitan-standard';
            break;
        case 'tornadus':
            pokemon = 'tornadus-incarnate';
            break;
        case 'landorus':
            pokemon = 'landorus-incarnate';
            break;
        case 'thundurus':
            pokemon = 'thundurus-incarnate';
            break;
        case 'keldeo':
            pokemon = 'keldeo-ordinary';
            break;
        case 'meloetta':
            pokemon = 'meloetta-aria';
            break;
        case 'aegislash':
            pokemon = 'aegislash-shield';
            break;
        case 'pumpkaboo':
            pokemon = 'pumpkaboo-average';
            break;
        case 'gourgeist':
            pokemon = 'gourgeist-average';
            break;
        case 'oricorio':
            pokemon = 'oricorio-baile' || 'oricorio-pom-pom' || 'oricorio-pau' || 'oricorio-sensu';
            break;
        case 'lycanroc':
            pokemon = 'lycanroc-midday' || 'lycanroc-midnight' || 'lycanroc-dusk';
            break;
        case 'wishiwashi':
            pokemon = 'wishiwashi-solo';
            break;
        case 'minior':
            pokemon = 'minior-red-meteor' || 'minior-orange-meteor' || 'minior-yellow-meteor' || 'minior-green-meteor' || 'minior-blue-meteor' || 'minior-indigo-meteor' || 'minior-violet-meteor';
            break;
        case 'mimikyu':
            pokemon = 'mimikyu-disguised';
            break;
        default:
            pokemon = pokeMatch[1]
            break;
    }

    await poke.getPokemonByName(pokemon)
        .then(async function(res){
            await amino.sendGIF(
                auth.amino.community,
                receiver,
                './helpers/pokesprites/' + pokeMatch[1] + '.gif'
                )
                
            res.types.forEach(item => {
                types += item.type.name + " / ";
            })
            types = types.replace("undefined","")
            types = types.slice(0,-2);

            res.abilities.forEach(item => {
                if(item.is_hidden == false){
                    normalHab += item.ability.name + " / "
                }
                else {
                    hiddenHab += item.ability.name + " / "
                }
            })

            if(normalHab != undefined){
                normalHab = normalHab.replace("undefined","")
                normalHab = normalHab.slice(0,-2)
            }
            else {
                normalHab = ""
            }

            if(hiddenHab != undefined){
                hiddenHab = hiddenHab.replace("undefined","")
                hiddenHab = hiddenHab.slice(0,-2)
            }
            else {
                hiddenHab = ""
            }

            await amino.sendChat(
                auth.amino.community,
                receiver,
                `
                Nombre: ${pokeMatch[1]}
        
Tipos: ${types}
        
Habilidades Normales: ${normalHab}
        
Habilidades Ocultas: ${hiddenHab}
                `)

        })
        .catch(function(err){
            console.log("There was an Error: ", err)
        })

    await poke.getPokemonSpeciesByName(pokeMatch[1])
        .then(async function(res){

            res.flavor_text_entries.forEach(function(item){
                if(item.language.name == "es"){
                    description.push(item.flavor_text);
                }
            })

            await amino.sendChat(
                auth.amino.community,
                receiver,
                `
                Descripción: ${description[0]}
                `)
        })
        .catch(async function(err){
            console.log("There was an Error: ", err)

            await amino.sendChat(
                auth.amino.community,
                receiver,
                `
                Pokémon no encontrado
                `)
        })
    
}

async function reqFood(req,receiver){
    let foodMatch = req.match(/\/edamam (.*)/)

    let res = await edamam.getRecipe(foodMatch[1]);

    await amino.sendChat(
        auth.amino.community,
        receiver,
        `
        ${res.recipe.label}

[U]Ingredientes:
${res.recipe.ingredientLines}

[U]Procedimiento:
${res.recipe.url}
        `)

    await fetch(res.recipe.image)
        .then(res => {
            const dest = fs.createWriteStream(`${timestamp}.jpg`);
            res.body.pipe(dest);
            dest.on("finish", async function(){
                await amino.sendImage(
                    auth.amino.community,
                    receiver,
                    './' + timestamp + '.jpg'
                )
            })
        });
    
}

async function reqWikipedia(req,receiver){
    let wikiMatch = req.match(/\/wikipedia (.*)/)
    let wikiURL;
    
    wikijs({
        apiUrl: 'https://es.wikipedia.org/w/api.php',
        origin: null
    })
    .page(wikiMatch[1])
    .then(async data => {
        wikiURL = data.raw.canonicalurl;
        return data.summary();
    })
    .then (async res => {
        let firstChars = res.split('\n')[0] + "...";
        await amino.sendChat(
            auth.amino.community,
            receiver,
            `${firstChars}
            
Puedes encontrar más información en ${wikiURL}
            `
            )
    })
    .catch(async err => {
        console.log(err)
        await amino.sendChat(
            auth.amino.community,
            receiver,
            "término no encontrado")
    })
}

module.exports = {
    unknownText: unknownText,
    welcome: welcome,
    reqHelp: reqHelp,
    reqPoke: reqPoke,
    reqWikipedia: reqWikipedia,
    reqFood: reqFood
}