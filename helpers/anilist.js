const { request } = require("graphql-request")
const endpoint = "https://graphql.anilist.co"

async function getManga(data){
    const query = `{
        Page {
            media(search: "${data}", type: MANGA, format: MANGA) {
                title {
                    romaji
                    native
                }
                coverImage {
                    medium
                    large
                }
                description
                format
                type
                averageScore
                chapters
                volumes
                startDate {
                    year
                    month
                    day
                }
                endDate {
                    year
                    month
                    day
                }
            }
        }
    }`

    const res = await request(endpoint, query)

    return res.Page.media[0]
}
getManga().catch(error => {return error})

async function getAnime(data){
    const query = `{
        Page {
            media(search: "${data}", type: ANIME, format: TV) {
                title {
                    romaji
                    native
                }
                coverImage {
                    medium
                    large
                }
                description
                format
                type
                averageScore
                episodes
                duration
                startDate {
                    year
                    month
                    day
                }
                endDate {
                    year
                    month
                    day
                }
            }
        }
    }`

    const res = await request(endpoint, query)

    return res.Page.media[0]
}
getAnime().catch(error => {return error})

module.exports = {
    getManga: getManga,
    getAnime: getAnime
}