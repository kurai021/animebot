const amino = require("amino.js");
const anime = require("../modules/anime")
const other = require("../modules/other")
const games = require("../modules/games")
const jokes = require("../modules/jokes")
const auth = require("../helpers/auth");
const Poller = require('../helpers/poller');

let poller = new Poller(3000);

(async function () {
    await amino.login(auth.amino.email, auth.amino.password)
    const myProfile = await amino.getMyProfile()

    poller.onPoll(() => {

        (async function () {

            const chatRooms = await amino.getJoinedChats(auth.amino.community);
            let firstChatRoom = chatRooms.threads[0];
            let titleChat = firstChatRoom.title
            let receiver = firstChatRoom.threadId;
            let lastMessage = await amino.getChat(auth.amino.community, receiver);
            let members = firstChatRoom.memberCount;
            let message = lastMessage.messages[0].msg;
            test(message);

            function test(message){
                if(lastMessage.messages[0].author.uid != myProfile.account.uid){
                    switch(true){
                        case /\/character (.*)/.test(message):
                            anime.reqCharacter(message,receiver);
                            break;
                        case /\/manga (.*)/.test(message):
                            anime.reqManga(message,receiver);
                            break;
                        case /\/anime (.*)/.test(message):
                            anime.reqAnime(message,receiver);
                            break;
                        case /\/randomAnime (.*)/.test(message):
                            anime.reqRandomAnime(message,receiver);
                            break;
                        case /\/randomManga (.*)/.test(message):
                            anime.reqRandomManga(message,receiver);
                            break;
                        case /\/help/.test(message):
                            other.reqHelp(receiver);
                            break;
                        case /\/8ball (.*)/.test(message):
                            games.eightBall(receiver);
                            break;
                        case /\/flipCoin/.test(message):
                            games.flipCoin(receiver);
                            break;
                        case /\/horoscopo (.*)/.test(message):
                            games.getHoroscope(message,receiver);
                            break;
                        case /\/rsp (.*)/.test(message):
                            games.rsp(message,receiver);
                            break;
                        case /\/trump (.*)/.test(message):
                            jokes.getTrump(message,receiver)
                            break;
                        case /\/pokedex (.*)/.test(message):
                            other.reqPoke(message,receiver)
                            break;
                        case /\/wikipedia (.*)/.test(message):
                            other.reqWikipedia(message,receiver)
                            break;
                        case /\/edamam (.*)/.test(message):
                            other.reqFood(message,receiver)
                            break;
                        case /\/bienvenido/.test(message):
                            if(members > 1){
                                other.welcome(titleChat,receiver);
                            }
                            break;
                        case /\/loli/.test(message):
                            other.reqLoli(receiver)
                            break;
                        case /\/trap/.test(message):
                            other.reqTrap(receiver)
                            break;
                        case /\/abrazo/.test(message):
                            other.reqAbrazo(receiver)
                            break;
                        case /\/husbando/.test(message):
                            other.reqHusbando(receiver)
                            break;
                        case /\/beso/.test(message):
                            other.reqBeso(receiver)
                            break;
                        case /\/caricia/.test(message):
                            other.reqCaricia(receiver)
                            break;
                        default:
                            if(members == 1){
                                other.unknownText(receiver);
                            }
                            break;
                    }
                }

                else {
                    console.log("no hacer nada...");
                }
            }
            
        })();

        poller.poll(); // Go for the next poll
    });

    // Initial start
    poller.poll();

})();