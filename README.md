# Animebot
The first (EXPERIMENTAL) bot for Amino!

Animebot is a simple anime/manga related bot for Amino when you can find information about Anime and Manga in spanish (maybe in the future I want to support OVA, ONA, music original videos, movies, tv shorts, DVD/Bluray specials, one shots and novels).

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

* /help: command to get the instructions
* /getManga title: Get manga information (title native, romaji, image, start and end of publication, chapters, volumes and description).
```
Example: /getManga death note
```
* /getAnime title: Get anime information (title native, romaji, image, start and end of publication, episodes, duration and description).
```
Example: /getAnime evangelion
```

## Acknowledgments

* This software is unofficial! It's against the Terms of Service to use this Software to interact with Amino APIs. Me (the creator of Animebot) are not responsible for any kind of damage (ban / legal actions) done by Narvii, Inc. 
* I am not responsible for any issue you have with this bot due to improper usage
