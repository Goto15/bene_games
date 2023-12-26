import { BASE_BACKEND_URL } from "../../constants/BASE_BACKEND_URL"

async function getGames() {
    const res = await fetch(BASE_BACKEND_URL + "/games")
    if (!res.ok) throw new Error('Failed to fetch data')

    return await res.json()
}

export default async function GameTotals() {
    const gamesData = await getGames()
    
    const number_of_games = gamesData.length
    const total_hours_needed = gamesData.reduce((accumulator: number, game: any) => {
        return accumulator + Number(game.length > 0 ? game.length : 0)
    }, 0)

    return <p>Hours to complete: {total_hours_needed}, Total games: {number_of_games}</p>
}
