export default function key_to_title(str: string) {
    // Split on '_', capitalize the first char then add the rest of the word back, then join the words back
    return str.split("_").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
}
