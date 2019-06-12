const auth = require("../helpers/auth");
const amino = require("amino.js");
const trump = require("../helpers/trump/main")
let timestamp = Math.floor(Date.now() / 1000);

async function getTrump(req, receiver){
    let trumpMatch = req.match(/\/trump (.*)/)
    await trump(trumpMatch[1], `../../../${timestamp}.gif`)
    .then(async () => {
        await amino.sendGIF(
            auth.amino.community,
            receiver,
            `./${timestamp}.gif`
        )
    });
}

module.exports = {
    getTrump: getTrump
}