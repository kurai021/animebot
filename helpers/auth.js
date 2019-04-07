module.exports = {
    amino: {
        email: process.env.AMINOEMAIL,
        password: process.env.AMINOPASSWORD,
        community: process.env.AMINOCOMMUNITY
    },
    translator: {
        url: process.env.IAMURL,
        iam_apikey: process.env.IAMAPIKEY,
        version: process.env.VERSION
    }
};
