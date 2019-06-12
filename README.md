# Animebot
The first (EXPERIMENTAL) bot for Amino!

Animebot is a simple all purpouse related bot for Amino when you can find information about Anime and Manga in spanish (maybe in the future I want to support OVA, ONA, music original videos, movies, tv shorts, DVD/Bluray specials, one shots and novels), find information in Wikipedia, play simple games and more.

## Install

* Install dependencies:
```bash
npm install
```
* Read the [AniList APIv2 Docs](https://anilist.gitbook.io/anilist-apiv2-docs/)
* Create a new account in [Amino](https://aminoapps.com/)
* create a new [translator instance](https://console.bluemix.net/catalog/services/language-translator) you will find IAMURL, IAMAPIKEY, VERSION
* create a .env file with AMINOEMAIL, AMINOPASSWORD, AMINOCOMMUNITY, IAMURL, IAMAPIKEY, VERSION variables
* For know AMINOCOMMUNITY (the id for your Amino Community), test [this code](https://github.com/AminoJS/Amino.JS/blob/master/examples/getChat.js) 

## Use

### Informative commands

* /help: command to get the instructions

### Commands related to anime and manga

* /getManga title: Get manga information (title native, romaji, image, start and end of publication, chapters, volumes and description).
```
Example: /getManga death note
```
* /getAnime title: Get anime information (title native, romaji, image, start and end of publication, episodes, duration and description).
```
Example: /getAnime evangelion
```
* /getRandomAnime categoría: Get anime suggestions randomly
* /getRandomManga categoría: Get manga suggestions randomly
```
The categories in both cases are: Action, Adventure, Comedy, Drama, Ecchi, Fantasy, Horror, Mahou Shoujo, Mecha, Music, Mystery, Psychological, Romance, Sci-Fi, Slice of Life, Sports, Supernatural, Thriller
```
* /getCharacter character: Get character bio
```
Example: /getCharacter Conan Edogawa
```

### Funny commands and games

* /8ball pregunta: Has una pregunta a la bola 8 mágica.
```
Ejemplo: /8ball Él no me vió?
```

* /flipCoin: Lanza una moneda para sacar cara o cruz.

* /rsp: Juega piedra, papel o tijeras con Animebot.
```
Ejemplo: /rsp tijera
```

* /trump: Has que Donald Trump publique una nueva orden ejecutiva
```
Ejemplo: /trump tu madre es hombre
```

### Search commands

* /getHoroscope: Obtiene tu horoscopo y número de la suerte diario.
```
Ejemplo: /getHoroscope aries
```

* /pokedex: Obtiene información de un Pokémon
```
Ejemplo: /pokedex pikachu
```

* /wikipedia: Obtiene información de Wikipedia en español
```
Ejemplo: /wikipedia anime
```

* /edamam: Obtiene información desde la base de datos de Edamam en español sobre alguna receta de cocina al azar basado en un término de busqueda
```
Ejemplo: /edamam chocolate
```

## Acknowledgments

* This software is unofficial! It's against the Terms of Service to use this Software to interact with Amino APIs. I (the creator of Animebot) am not responsible for any kind of damage (ban / legal actions) done by Narvii, Inc.
* content +18 or NSFW is strictly prohibited in Amino, by default Animebot is configured not to show hentai content, yet the Anilist API does not ensure that the adult filter is 100% reliable. It should also be considered that ecchi does not strictly enter as +18, so Animebot could display this content.
* I am not responsible for any issue you have with this bot due to improper usage
