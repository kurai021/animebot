const amino = require("amino.js");
const anime = require("../modules/anime")
const other = require("../modules/other")
const games = require("../modules/games")
const jokes = require("../modules/jokes")
const auth = require("../helpers/auth");
const Poller = require('../helpers/poller');

let firstPoller = new Poller(500);
let secondPoller = new Poller(3000);

(async function () {
    await amino.login(auth.amino.email, auth.amino.password)
    const myProfile = await amino.getMyProfile()

    let messagesArray = [];
    let titleChat;
    let members;

    firstPoller.onPoll(() => {

        toArray();

        async function toArray(){
            const chatRooms = await amino.getJoinedChats(auth.amino.community);
            let firstChatRoom = chatRooms.threads[0];
            titleChat = firstChatRoom.title

            let receiver = firstChatRoom.threadId;
            let lastMessage = await amino.getChat(auth.amino.community, receiver);

            members = firstChatRoom.memberCount;
            let message = lastMessage.messages[0].msg;

            if (!messagesArray.find(o => o.receiver === receiver && o.message === message && o.title === titleChat && o.members === members)){
                if(lastMessage.messages[0].author.uid != myProfile.account.uid){
                    messagesArray.push({"receiver":receiver, "message":message, "title":titleChat, "members":members});
                }
            }

            console.log(`
            array:

            ${JSON.stringify(messagesArray)}`)

        }
        
        firstPoller.poll(); // Go for the next poll

    });

    firstPoller.poll();


    secondPoller.onPoll(() => {

        processArray();

        async function processArray(){
            if(messagesArray[0] != undefined){
                switch(true){
                    case /\/character (.*)/.test(messagesArray[0].message):
                        anime.reqCharacter(messagesArray[0].message,messagesArray[0].receiver)
                            .then(async function(){
                                await messagesArray.shift();
                            })
                        break;
                    case /\/manga (.*)/.test(messagesArray[0].message):
                        anime.reqManga(messagesArray[0].message,messagesArray[0].receiver)
                            .then(async function(){
                                await messagesArray.shift();
                            })
                        break;
                    case /\/anime (.*)/.test(messagesArray[0].message):
                        anime.reqAnime(messagesArray[0].message,messagesArray[0].receiver)
                            .then(async function(){
                                await messagesArray.shift();
                            })
                        break;
                    case /\/randomAnime (.*)/.test(messagesArray[0].message):
                        anime.reqRandomAnime(messagesArray[0].message,messagesArray[0].receiver)
                            .then(async function(){
                                await messagesArray.shift();
                            })
                        break;
                    case /\/randomManga (.*)/.test(messagesArray[0].message):
                        anime.reqRandomManga(messagesArray[0].message,messagesArray[0].receiver)
                            .then(async function(){
                                await messagesArray.shift();
                            })
                        break;
                    case /\/help/.test(messagesArray[0].message):
                        other.reqHelp(messagesArray[0].receiver)
                            .then(async function(){
                                await messagesArray.shift();
                            })
                        break;
                    case /\/8ball (.*)/.test(messagesArray[0].message):
                        games.eightBall(messagesArray[0].receiver)
                            .then(async function(){
                                await messagesArray.shift();
                            })
                        break;
                    case /\/flipCoin/.test(messagesArray[0].message):
                        games.flipCoin(messagesArray[0].receiver)
                            .then(async function(){
                                await messagesArray.shift();
                            })
                        break;
                    case /\/horoscopo (.*)/.test(messagesArray[0].message):
                        games.getHoroscope(messagesArray[0].message,messagesArray[0].receiver)
                            then(async function(){
                                await messagesArray.shift();
                            })
                        break;
                    case /\/rsp (.*)/.test(messagesArray[0].message):
                        games.rsp(messagesArray[0].message,messagesArray[0].receiver)
                            .then(async function(){
                                await messagesArray.shift();
                            })
                        break;
                    case /\/trump (.*)/.test(messagesArray[0].message):
                        jokes.getTrump(messagesArray[0].message,messagesArray[0].receiver)
                            .then(async function(){
                                await messagesArray.shift();
                            })
                        break;
                    case /\/pokedex (.*)/.test(messagesArray[0].message):
                        other.reqPoke(messagesArray[0].message,messagesArray[0].receiver)
                            .then(async function(){
                                await messagesArray.shift();
                            })
                        break;
                    case /\/wikipedia (.*)/.test(messagesArray[0].message):
                        other.reqWikipedia(messagesArray[0].message,messagesArray[0].receiver)
                            .then(async function(){
                                await messagesArray.shift();
                            })
                        break;
                    case /\/edamam (.*)/.test(messagesArray[0].message):
                        other.reqFood(messagesArray[0].message,messagesArray[0].receiver)
                            .then(async function(){
                                await messagesArray.shift();
                            })
                        break;
                    case /\/bienvenido/.test(messagesArray[0].message):
                        if(messagesArray[0].members != 1){
                            other.welcome(messagesArray[0].title,messagesArray[0].receiver)
                                .then(async function(){
                                    await messagesArray.shift();
                                })
                        }
                        else {
                            other.noPublic(messagesArray[0].receiver)
                                .then(async function(){
                                    await messagesArray.shift();
                                })
                        }
                        break;
                    case /\/loli/.test(messagesArray[0].message):
                        other.reqLoli(messagesArray[0].receiver)
                            .then(async function(){
                                await messagesArray.shift();
                            })
                        break;
                    case /\/trap/.test(messagesArray[0].message):
                        other.reqTrap(messagesArray[0].receiver)
                            .then(async function(){
                                await messagesArray.shift();
                            })
                        break;
                    case /\/abrazo/.test(messagesArray[0].message):
                        other.reqAbrazo(messagesArray[0].receiver)
                            .then(async function(){
                                await messagesArray.shift();
                            })
                        break;
                    case /\/husbando/.test(messagesArray[0].message):
                        other.reqHusbando(messagesArray[0].receiver)
                            .then(async function(){
                                await messagesArray.shift();
                            })
                        break;
                    case /\/beso/.test(messagesArray[0].message):
                        other.reqBeso(messagesArray[0].receiver)
                            .then(async function(){
                                await messagesArray.shift();
                            })
                        break;
                    case /\/caricia/.test(messagesArray[0].message):
                        other.reqCaricia(messagesArray[0].receiver)
                            .then(async function(){
                                await messagesArray.shift();
                            })
                        break;
                    default:
                        if(messagesArray[0].members == 1){
                            other.unknownText(messagesArray[0].receiver)
                                .then(async function(){
                                    await messagesArray.shift();
                                })
                        }
                        else {
                            messagesArray.shift();
                        }
                        break;
                }           
            }
        }

        secondPoller.poll();
    })

    secondPoller.poll();

})();