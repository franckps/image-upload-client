export const uniqueId = (): number => {
    return Number(new Date().toString().replace(/[^0-9]/g,'') + Math.round(Math.random() * 1000000000))
}