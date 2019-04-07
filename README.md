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
Ejemplo: /getAnime evangelion
```
