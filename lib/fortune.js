const fortunes = [
    'helle dada',
    'your lady',
    'are the',
    'best friend',
    'one tow',
]



const getFortune = () => {
    return fortunes[Math.floor(Math.random() * fortunes.length)]
}

// getFortune

module.exports = { getFortune }