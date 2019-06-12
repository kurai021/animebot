const auth = require("../helpers/auth");
const fetch = require("node-fetch");

async function getRecipe(data){
    let recipe;
    await fetch(`https://test-es.edamam.com/search?q="${data}&app_id=${auth.edamam.id}&app_key=${auth.edamam.password}`)
        .then(data => {
            return data.json();
        })
        .then(food => {
            const keys = Object.keys(food.hits);
            recipe = food.hits[keys[ keys.length * Math.random() << 0]];
            return;
        })
        .catch(err => {
            console.log(err);
        })

    return recipe;
}

module.exports = {
    getRecipe:getRecipe
}