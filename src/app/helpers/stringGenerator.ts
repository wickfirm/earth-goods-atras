export const truncateText = (text: string, len: number = 50) => {
    return text.length > len ? text.substring(0, len - 3) + '...' : text
}

export const formatText = (text: string) => {
    return text.replace(/_/g, ' ').replace(/^\w/, (c) => c.toUpperCase())
}

const padLeft = (nr: any, chr = `0`) => `${nr}`.padStart(2, chr)

export const toDateTimeString = (date: Date) => {
    return (
        date.toDateString() +
        ', ' +
        padLeft(date.getHours()) +
        ':' +
        padLeft(date.getMinutes()) +
        ':' +
        padLeft(date.getSeconds())
    )
}

export const formatNumberWithSuffix = (number: number): string => {
    const suffixes = ['', 'K', 'M', 'B', 'T']
    const suffixIndex = Math.floor(Math.log10(Math.abs(number)) / 3)
    const normalizedNumber = number / Math.pow(1000, suffixIndex)
    const roundedNumber = Math.round(normalizedNumber)

    return `${roundedNumber}${suffixes[suffixIndex]}`
}
export const formatTextToTitle = (text: string) => {
    // for example: "requires_creative_approval" => "Requires Creative Approval"
    // for example: "REGION" => "Region"
    const words = text.split('_')

    const capitalizedWords = words.map((word) => {
        const firstChar = word.charAt(0).toUpperCase()
        const restOfString = word.slice(1).toLowerCase()
        return firstChar + restOfString
    })

    return capitalizedWords.join(' ')
}

export const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
