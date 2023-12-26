import GameTable from '../components/games_table'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* <GameTotals /> */}
      <GameTable />
    </main>
  )
}
