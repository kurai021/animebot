const amino = require("amino.js");
const fetch = require("node-fetch")
const fs = require('fs');
const translate = require('node-google-translate-skidz');
const auth = require("../helpers/auth");
const Poller = require('../helpers/poller');
const anilist = require("../helpers/anilist");

let poller = new Poller(3000);

(async function () {
    await amino.login(auth.amino.email, auth.amino.password)
    const myProfile = await amino.getMyProfile()

    poller.onPoll(() => {

        (async function () {
            let timestamp = Math.floor(Date.now() / 1000)

            const chatRooms = await amino.getJoinedChats(auth.amino.community);
            let firstChatRoom = chatRooms.threads[0];
            let receiver = firstChatRoom.threadId;
            let lastMessage = await amino.getChat(auth.amino.community, receiver);
            let members = firstChatRoom.memberCount;
            let message = lastMessage.messages[0].msg;

            test(message);

            function test(message){
                if(lastMessage.messages[0].author.uid != myProfile.account.uid){
                    switch(true){
                        case /\/getCharacter (.*)/.test(message):
                            reqCharacter(message);
                            break;
                        case /\/getManga (.*)/.test(message):
                            reqManga(message);
                            break;
                        case /\/getAnime (.*)/.test(message):
                            reqAnime(message);
                            break;
                        case /\/getRandomAnime (.*)/.test(message):
                            reqRandomAnime(message);
                            break;
                        case /\/getRandomManga (.*)/.test(message):
                            reqRandomManga(message);
                            break;
                        case /\/help/.test(message):
                            reqHelp();
                            break;
                        default:
                            if(members == 1){
                                unknownText();
                            }
                            break;
                    }
                }

                else {
                    console.log("no hacer nada...");
                }
            }

            async function unknownText(){
                await amino.sendChat(
                    auth.amino.community,
                    receiver,
                    `
                    Comando incorrecto, puede conocer los comandos disponibles con /help
                    `
                )
            }

            async function reqHelp(){
                await amino.sendChat(
                    auth.amino.community,
                    receiver,
                    `
                    /help: Obtiene estas instrucciones
                    
/getManga título: Obtiene información de un manga específico (título nativo, romaji, imagen, inicio y fin de publicación, capítulos, volumenes y descripción).
Ejemplo: /getManga death note

/getAnime título: Obtiene información de un anime específico (título nativo, romaji, imagen, inicio y fin de publicación, episodios, duración aproximada y descripción).
Ejemplo: /getAnime evangelion

/getRandomAnime categoría: Obtiene información de un anime al azar

/getRandomManga categoría: Obtiene información de un manga al azar

Las categorías definidas en ambos casos son: Action, Adventure, Comedy, Drama, Ecchi, Fantasy, Horror, Mahou Shoujo, Mecha, Music, Mystery, Psychological, Romance, Sci-Fi, Slice of Life, Sports, Supernatural, Thriller

/getCharacter personaje: Obtiene una biografía de un personaje
Ejemplo: /getCharacter Conan Edogawa
                    `)
            }


            async function reqCharacter(req){
                console.log("buscando personaje...");
                let characterMatch = req.match(/\/getCharacter (.*)/)
                let res = await anilist.getCharacter(characterMatch[1])
                let textFixed = res
                    .description
                    .replace(/<br>\\*/g, `
                    `)
                    .replace(/<br \/>\\*/g, `
                    `)
                    .replace(/<p>\\*/g, '')
                    .replace(/<\/p>\\*/g, '')
                    .replace(/<strong>\\*/g, '『 ')
                    .replace(/<\/strong>\\*/g, ' 』')
                    
                fetch(res.image.large)
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
                
                /*el parser de texto del cliente de Amino es la cosa más extraña que he visto*/

                if(res.name.last == null && res.name.native != null) {

                    await amino.sendChat(
                        auth.amino.community,
                        receiver,
                        `
                        Nombre: ${res.name.first}
Romaji: ${res.name.native}
                        `
                    )

                }

                else if(res.name.last == null && res.name.native == null){

                    await amino.sendChat(
                        auth.amino.community,
                        receiver,
                        `
                        Nombre: ${res.name.first}
                        `
                    )

                }

                else {

                    await amino.sendChat(
                        auth.amino.community,
                        receiver,
                        `
                        Nombre: ${res.name.first} ${res.name.last}
Romaji: ${res.name.native}
                        `
                    )
                    
                }

                translate({
                    text: textFixed,
                    source: 'en',
                    target: 'es'
                  }, async function(result) {
                      await amino.sendChat(auth.amino.community, receiver, result.translation)
                  });
            }


            async function reqRandomManga(req){
                console.log("buscando una sugerencia de manga...");
                const categories = ["Action", "Adventure", "Comedy", "Drama", "Ecchi", "Fantasy", "Horror", "Mahou Shoujo", "Mecha", "Music", 
                "Mystery", "Psychological", "Romance", "Sci-Fi", "Slice of Life", "Sports", "Supernatural", "Thriller","action", "adventure", "comedy", "drama", "ecchi", "fantasy", "horror", "mahou shoujo", "mecha", "music", 
                "mystery", "psychological", "romance", "sci-fi", "slice of life", "sports", "supernatural", "thriller"]
                let randomMangaMatch = req.match(/\/getRandomManga (.*)/)

                if(categories.includes(randomMangaMatch[1])){

                    let res = await anilist.getRandomManga(randomMangaMatch[1])
                    let textFixed = res
                    .description
                    .replace(/<br>\\*/g, `
                    `)

                fetch(res.coverImage.large)
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
                
                await amino.sendChat(
                    auth.amino.community,
                    receiver,
                    `
                    Nombre: ${res.title.native}
Romaji: ${res.title.romaji}
Inicio: ${res.startDate.day}-${res.startDate.month}-${res.startDate.year}
Final: ${res.endDate.day}-${res.endDate.month}-${res.endDate.year}
Capítulos: ${res.chapters}
Volumenes: ${res.volumes}
                    `
                )

                translate({
                    text: textFixed,
                    source: 'en',
                    target: 'es'
                  }, async function(result) {
                      await amino.sendChat(auth.amino.community, receiver, result.translation)
                  });
                }

                else {
                    await amino.sendChat(
                        auth.amino.community,
                        receiver,
                        'categoría no encontrada, las categorías son: Action, Adventure, Comedy, Drama, Ecchi, Fantasy, Horror, Mahou Shoujo, Mecha, Music, Mystery, Psychological, Romance, Sci-Fi, Slice of Life, Sports, Supernatural, Thriller'
                    )
                }

            }

            async function reqRandomAnime(req){
                console.log("buscando una sugerencia de anime...");
                const categories = ["Action", "Adventure", "Comedy", "Drama", "Ecchi", "Fantasy", "Horror", "Mahou Shoujo", "Mecha", "Music", 
                "Mystery", "Psychological", "Romance", "Sci-Fi", "Slice of Life", "Sports", "Supernatural", "Thriller","action", "adventure", "comedy", "drama", "ecchi", "fantasy", "horror", "mahou shoujo", "mecha", "music", 
                "mystery", "psychological", "romance", "sci-fi", "slice of life", "sports", "supernatural", "thriller"]
                let randomAnimeMatch = req.match(/\/getRandomAnime (.*)/)

                if(categories.includes(randomAnimeMatch[1])){
                    let res = await anilist.getRandomAnime(randomAnimeMatch[1])
                    let textFixed = res
                        .description
                        .replace(/<br>\\*/g, `
                        `)

                fetch(res.coverImage.large)
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
                    
                    /*linea 63*/
                    await amino.sendChat(
                        auth.amino.community,
                        receiver,
                        `
                        Nombre: ${res.title.native}
Romaji: ${res.title.romaji}
Inicio: ${res.startDate.day}-${res.startDate.month}-${res.startDate.year}
Final: ${res.endDate.day}-${res.endDate.month}-${res.endDate.year}
Episodios: ${res.episodes}
Duración: ${res.duration} minutos
                        `
                    )

                    translate({
                        text: textFixed,
                        source: 'en',
                        target: 'es'
                      }, async function(result) {
                          await amino.sendChat(auth.amino.community, receiver, result.translation)
                      });
                }

                else {
                    await amino.sendChat(
                        auth.amino.community,
                        receiver,
                        'categoría no encontrada, las categorías son: Action, Adventure, Comedy, Drama, Ecchi, Fantasy, Horror, Mahou Shoujo, Mecha, Music, Mystery, Psychological, Romance, Sci-Fi, Slice of Life, Sports, Supernatural, Thriller'
                    )
                }
            }

            async function reqManga(req){
                console.log("buscando manga...");
                let mangaMatch = req.match(/\/getManga (.*)/)
                let res = await anilist.getManga(mangaMatch[1])
                let textFixed = res
                    .description
                    .replace(/<br>\\*/g, `
                    `)

                fetch(res.coverImage.large)
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
                
                await amino.sendChat(
                    auth.amino.community,
                    receiver,
                    `
                    Nombre: ${res.title.native}
Romaji: ${res.title.romaji}
Inicio: ${res.startDate.day}-${res.startDate.month}-${res.startDate.year}
Final: ${res.endDate.day}-${res.endDate.month}-${res.endDate.year}
Capítulos: ${res.chapters}
Volumenes: ${res.volumes}
                    `
                )

                translate({
                    text: textFixed,
                    source: 'en',
                    target: 'es'
                  }, async function(result) {
                      await amino.sendChat(auth.amino.community, receiver, result.translation)
                  });
            }

            /* orden para buscar anime */

            async function reqAnime(req){
                console.log("buscando anime...");
                let animeMatch = req.match(/\/getAnime (.*)/)
                let res = await anilist.getAnime(animeMatch[1])
                let textFixed = res
                    .description
                    .replace(/<br>\\*/g, `
                    `)

                fetch(res.coverImage.large)
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
                    
                    /*linea 89*/
                    await amino.sendChat(
                        auth.amino.community,
                        receiver,
                        `
                        Nombre: ${res.title.native}
Romaji: ${res.title.romaji}
Inicio: ${res.startDate.day}-${res.startDate.month}-${res.startDate.year}
Final: ${res.endDate.day}-${res.endDate.month}-${res.endDate.year}
Episodios: ${res.episodes}
Duración: ${res.duration} minutos
                        `
                    )

                    translate({
                        text: textFixed,
                        source: 'en',
                        target: 'es'
                      }, async function(result) {
                          await amino.sendChat(auth.amino.community, receiver, result.translation)
                      });
            }
            
        })();

        poller.poll(); // Go for the next poll
    });

    // Initial start
    poller.poll();

})();