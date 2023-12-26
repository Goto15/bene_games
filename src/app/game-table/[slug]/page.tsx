import GameTable from "@/components/games_table";

export default function SortedGameTable({ params }: { params: { slug: string } }) {
    return <GameTable sort_method={params.slug} />
}
