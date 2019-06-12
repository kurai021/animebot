w# Illegalize

A node.js library, pretrent you're Trump for a few seconds, make something illegal, done locally! <br>
The original repo is located [here](https://github.com/ivanseidel/Is-Now-Illegal). <br><br>
This project is based off of [Ivanseidel's](https://github.com/ivanseidel) [Is Now Illegal](http://isnowillegal.com). For a bit, the site was down for a bit and I wanted to still ban things, so I thought I should convert it to a nodejs library! (idk if I'm violating some legal stuff, but I would just like to say, Ivanseidel and the wonderful people down below are the ones who made everything about this project, I simply just took their code and wrapped it in a library).

## Donate

As I mentioned above, the site was down for a bit a while ago. The costs for servers are too high and if they don't get enough donations, the site will shutdown soon. Please donate to them via [Patreon](https://www.patreon.com/isnowillegal).

## Usage

```js
const illegalize = require("illegalize");

const init = async () => {
  await illegalize("sample text", `${__dirname}/sample.gif`);
};

init();
// => <root folder>/sample.gif
```

### phrase

Type: `string` <br>
Description: The phrase that Trump will ban, notice that it has a maximum of 12 characters. <br>
Example: `sample text`

### location

Type: `string` <br>
Description: Determines the PATH where the file should save to. <br>
Example: `./test.gif`, `./files/ban.gif`

## Who made this?

[Ivan Seidel](https://github.com/ivanseidel),
[Bruno Lemos](https://github.com/brunolemos),
& [João Pedro](https://github.com/joaopedrovbs).

For a full list of contributors, click [here](https://github.com/ivanseidel/Is-Now-Illegal/graphs/contributors).
