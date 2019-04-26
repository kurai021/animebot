const amino = require("amino.js");
const fetch = require("node-fetch")
const fs = require('fs');
const LanguageTranslatorV3 = require(
    'watson-developer-cloud/language-translator/v3'
);
const auth = require("../helpers/auth");
const Poller = require('../helpers/poller');
const anilist = require("../helpers/anilist");

const languageTranslator = new LanguageTranslatorV3(
    {iam_apikey: auth.translator.iam_apikey, url: auth.translator.url, version: auth.translator.version}
);

let poller = new Poller(5000);

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

            let message = lastMessage
                .messages[0]
                .msg
            let characterMatch = message.match(/\/getCharacter (.*)/)
            let mangaMatch = message.match(/\/getManga (.*)/)
            let animeMatch = message.match(/\/getAnime (.*)/)
            let randomAnimeMatch = message.match(/\/getRandomAnime (.*)/)
            let randomMangaMatch = message.match(/\/getRandomManga (.*)/)
            let helpMatch = message.match(/\/help/)

            /* orden help */

            if (helpMatch != null && lastMessage.messages[0].author.uid != myProfile.account.uid) {

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

            /* orden para obtener información de personajes */

            if (characterMatch != null && lastMessage.messages[0].author.uid != myProfile.account.uid) {
                console.log("buscando personaje...");
                let res = await anilist.getCharacter(characterMatch[1])
                let textFixed = res
                    .description
                    .replace(/<br>\\*/g, `
                    `)
                    .replace(/<br \/>\\*/g, `
                    `)
                    .replace(/__\\*/g,'')

                const paramsTranslator = {
                    text: textFixed,
                    model_id: 'en-es'
                };

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
                await amino.sendChat(
                    auth.amino.community,
                    receiver,
                    `
                    Nombre: ${res.name.first} ${res.name.last}
Romaji: ${res.name.native}
                    `
                )

                await languageTranslator.translate(paramsTranslator, function (err, res) {
                    const es_description = res
                        .translations[0]
                        .translation
                    if (err) {
                        console.log("error" + err)
                    } else {
                        (async function () {
                            await amino.sendChat(auth.amino.community, receiver, es_description)
                        })();
                    }
                });

            }

            /* orden random manga */

            if (randomMangaMatch != null && lastMessage.messages[0].author.uid != myProfile.account.uid) {
                console.log("buscando una sugerencia de manga...");
                let res = await anilist.getRandomManga(randomMangaMatch[1])
                let textFixed = res
                    .description
                    .replace(/<br>\\*/g, `
                    `)

                const paramsTranslator = {
                    text: textFixed,
                    model_id: 'en-es'
                };

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
                
                /*el parser de texto del cliente de Amino es la cosa más extraña que he visto*/
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

                await languageTranslator.translate(paramsTranslator, function (err, res) {
                    const es_description = res
                        .translations[0]
                        .translation
                    if (err) {
                        console.log("error" + err)
                    } else {
                        (async function () {
                            await amino.sendChat(auth.amino.community, receiver, es_description)
                        })();
                    }
                });

            }

            /* orden random anime */

            if (randomAnimeMatch != null && lastMessage.messages[0].author.uid != myProfile.account.uid) {
                console.log("buscando una sugerencia de anime...");
                let res = await anilist.getRandomAnime(randomAnimeMatch[1])
                let textFixed = res
                    .description
                    .replace(/<br>\\*/g, `
                    `)

                const paramsTranslator = {
                    text: textFixed,
                    model_id: 'en-es'
                };

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

                    await languageTranslator.translate(paramsTranslator, function (err, res) {
                        const es_description = res
                            .translations[0]
                            .translation
                        if (err) {
                            console.log("error" + err)
                        } else {
                            (async function () {
                                await amino.sendChat(auth.amino.community, receiver, es_description)
                            })();
                        }
                    });
            }

            /* orden para buscar manga */

            if (mangaMatch != null && lastMessage.messages[0].author.uid != myProfile.account.uid) {
                console.log("buscando manga...");
                let res = await anilist.getManga(mangaMatch[1])
                let textFixed = res
                    .description
                    .replace(/<br>\\*/g, `
                    `)

                const paramsTranslator = {
                    text: textFixed,
                    model_id: 'en-es'
                };

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

Capítulos: ${res.chapters}
Volumenes: ${res.volumes}
                    `
                )

                await languageTranslator.translate(paramsTranslator, function (err, res) {
                    const es_description = res
                        .translations[0]
                        .translation
                    if (err) {
                        console.log("error" + err)
                    } else {
                        (async function () {
                            await amino.sendChat(auth.amino.community, receiver, es_description)
                        })();
                    }
                });

            }

            /* orden para buscar anime */

            if (animeMatch != null && lastMessage.messages[0].author.uid != myProfile.account.uid) {
                console.log("buscando anime...");
                let res = await anilist.getAnime(animeMatch[1])
                let textFixed = res
                    .description
                    .replace(/<br>\\*/g, `
                    `)

                const paramsTranslator = {
                    text: textFixed,
                    model_id: 'en-es'
                };

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

                    await languageTranslator.translate(paramsTranslator, function (err, res) {
                        const es_description = res
                            .translations[0]
                            .translation
                        if (err) {
                            console.log("error" + err)
                        } else {
                            (async function () {
                                await amino.sendChat(auth.amino.community, receiver, es_description)
                            })();
                        }
                    });
            }
            
        })();

        poller.poll(); // Go for the next poll
    });

    // Initial start
    poller.poll();

})();