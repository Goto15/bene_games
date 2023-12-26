// import axios from 'axios'
// import * as cheerio from "cheerio";
// import { HowLongToBeatEntry, HowLongToBeatService } from "howlongtobeat";

// import { Game } from '@/interfaces/game'
// import { delay } from '@/helpers/time_delay';

// export async function scrapeMeta() {
//     let pagination = 1
//     let id = 1
//     let gamesArray: Game[] = []
//     const baseGameLink = "https://www.metacritic.com"

//     const response = await axios.get(`https://www.metacritic.com/browse/game/pc/all/all-time/metascore/?releaseYearMin=1958&releaseYearMax=2023&platform=pc&page=${pagination}`);
//     const selector = cheerio.load(response.data);
//     let paginationMax = Number(selector('.c-navigationPagination_pages').first().text().replace(/\n/g, '').split(' ').filter(Number).at(-1))

//     for (pagination; pagination <= paginationMax; pagination++) {
//         const response = await axios.get(`https://www.metacritic.com/browse/game/pc/all/all-time/metascore/?releaseYearMin=1958&releaseYearMax=2023&platform=pc&page=${pagination}`);
//         const selector = cheerio.load(response.data);

//         const games = selector('.c-finderProductCard-game').map((i, el) => {
//             return selector(el).html()
//         }).get()

//         await games.map(async game => {
//             const gameCard = cheerio.load(game)
//             const gameLink = gameCard('a').first().attr("href")

//             /* ----- From the list page ----- */
//             const description = gameCard('.c-finderProductCard_description').first().text().trim()
//             const criticScore = Number(gameCard('.c-siteReviewScore').first().text())

//             // This needs to split on the • character for release date and rating
//             const metaInfo = gameCard('.c-finderProductCard_meta').first().text().replace(/\n/g, '').replace(/  /g, '').trim().split('•')
//             const releaseDate = metaInfo[0]?.trim()
//             const esrbRating = metaInfo[1]?.trim()

//             /* ----- From the game's detail page ----- */
//             const gameResp = await axios.get(baseGameLink + gameLink)
//             const gameSelector = cheerio.load(gameResp.data)
//             const userScore = Math.trunc(Number(gameSelector('[aria-label*="User score"]').first().text()) * 10)
//             const genres = gameSelector('.c-genreList').text().trim().split(' ')
//             const title = gameSelector('.c-productHero_title').first().text().trim()

//             /* ----- How Long to Beat ----- */
//             let hltbService = new HowLongToBeatService()
//             let searchResp = await hltbService.search(title)

//             let length = -1
//             if (searchResp.length > 0) {
//                 if (searchResp[0].name === title) {
//                     length = searchResp[0].gameplayMain
//                 } else {
//                     length = searchResp.reduce(function (p, n) {
//                         return (p.similarity > n.similarity ? p : n)
//                     }).gameplayMain
//                 }
//             }

//             gamesArray.push({ id, title, description, genres, releaseDate, length, criticScore, userScore, esrbRating })
//             id++
//             await delay(1000)
//         })
//         await delay(1000)
//     }
//     const games = { "games": gamesArray }
//     return games
// }
