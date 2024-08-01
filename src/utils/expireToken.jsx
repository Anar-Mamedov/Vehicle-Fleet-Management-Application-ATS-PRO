export function setItemWithExpiration(key, value, expirationHours, id) {
    const now = new Date()
    const expirationTime = now.getTime() + expirationHours * 60 * 60 * 1000

    localStorage.setItem(key, JSON.stringify(value))
    localStorage.setItem("id", JSON.stringify(id))
    localStorage.setItem(`${key}_expire`, expirationTime.toString())
}

export function getItemWithExpiration(key) {
    const item = localStorage.getItem(key)
    const itemExpire = localStorage.getItem(`${key}_expire`)

    if (!item || !itemExpire) {
        return null
    }

    const expirationTime = parseInt(itemExpire, 10)
    const currentTime = new Date().getTime()

    if (currentTime > expirationTime) {
        localStorage.removeItem(key)
        localStorage.removeItem(`${key}_expire`)
        return null
    }

    return JSON.parse(item)
}
