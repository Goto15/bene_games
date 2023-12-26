import { BASE_BACKEND_URL } from "../../constants/BASE_BACKEND_URL"
import key_to_title from "../../helpers/key_to_title"
import truncate_text from "../../helpers/truncate_text"
import Image from "next/image"
import Link from "next/link"

async function getGames() {
    const res = await fetch(BASE_BACKEND_URL + "/games/display-table")
    if (!res.ok) throw new Error('Failed to fetch data')

    return await res.json()
}

interface GameTableProps {
    sort_method?: string
}

const stringCols = ['title']
const numberCols = ['length', 'critic_score']
const boolCols = ['completed']

export default async function GameTable(props: GameTableProps) {
    const { sort_method } = props
    const gamesData = await getGames()
    const columns = Object.keys(gamesData[0])
    const sortedGames = sortGames()

    const style = {
        table: "min-w-full text-left text-sm font-light",
        header: "sticky top-0 border-b text-white bg-violet-700 dark:border-neutral-500",
        column_title: "px-4 py-2",
        selected_column: "bg-violet-300 text-black px-4 py-2",
        row: "border-b hover:bg-violet-200",
        cell: "whitespace-nowrap px-4 py-2",
    }

    function sortGames() {
        if (!sort_method) {
            return gamesData
        } else if (stringCols.includes(sort_method)) {
            // TODO: sort strings here
        } else if (numberCols.includes(sort_method)) {
            return gamesData.sort((a: any, b: any) => Number(b[sort_method]) - Number(a[sort_method]))
        } else if (boolCols.includes(sort_method)) {
            // TODO: sort bools here
        }

        return gamesData
    }

    function buildGameTable() {
        return (
            <table className={style.table}>
                <thead className={style.header}>
                    <tr>
                        {columns.map(column => {
                            return (
                                <th className={sort_method === column ? style.selected_column : style.column_title} key={column}>
                                    <Link href={`/game-table/${column}`}>{key_to_title(column)}</Link>
                                </th>
                            )
                        })}
                    </tr>
                </thead>
                <tbody>
                    {sortedGames.map((game: any) => {
                        return (
                            <tr className={style.row} key={game.title}>
                                {columns.map((column) => {
                                    if (column.toLowerCase() === 'complete') {
                                        return (
                                            <td className={style.cell} key={game.title + game[column]} title={game[column]}>
                                                {<Image src="/check-mark.svg" alt="checkmark" width="16" height="16" />}
                                            </td>
                                        )
                                    } else if (column.toLowerCase() === 'title') {
                                        return (
                                            <td className={style.cell} key={game.title + game[column]} title={game[column]}>
                                                {truncate_text(game[column], 35)}
                                            </td>
                                        )
                                    } else {
                                        return (
                                            <td className={style.cell} key={game.title + game[column]}>
                                                {game[column]}
                                            </td>
                                        )
                                    }
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table >
        )
    }

    return buildGameTable()
}
