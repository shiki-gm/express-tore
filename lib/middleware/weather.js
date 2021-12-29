const getWeatherData = () => Promise.resolve([
    {
        location: {
            name: 'Portaland',
            coordinates: { lat: 45.515, lng: -122/6793}
        },
        forecastUrl: 'https://www.baidu.com',
        iconUrl: 'https://itbilu.com/img/logo.png',
        weather: 'Chance Showers And Thunderstorms',
        temp: '59 F,'
    },
    {
        location: {
            name: 'Portaland2',
            coordinates: { lat: 45.515, lng: -122/6793}
        },
        forecastUrl: 'https://www.baidu.com',
        iconUrl: 'https://itbilu.com/img/logo.png',
        weather: 'Chance Showers And Thunderstorms',
        temp: '59 F,'
    },
    {
        location: {
            name: 'Portaland3',
            coordinates: { lat: 45.515, lng: -122/6793}
        },
        forecastUrl: 'https://www.baidu.com',
        iconUrl: 'https://itbilu.com/img/logo.png',
        weather: 'Chance Showers And Thunderstorms',
        temp: '59 F,'
    }
])

const weatherMiddleware = async (req, res, next) => {
    // res.locals 是公共空间，作为res中的一个变量
    if (!res.locals.partials) res.locals.partials = {}
    res.locals.partials.weatherContext = await getWeatherData()
    next()
}

module.exports = weatherMiddleware