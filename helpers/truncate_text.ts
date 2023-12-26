export default function truncate_text(str: string, n: number) {
    return str.length > n ? str.slice(0, n) + '...' : str
}
