const express = require('express')
// 视图引擎
const { engine } = require('express-handlebars')
const handlers = require('./lib/handlers')
const weather = require('./lib/middleware/weather')
const bodyParser = require('body-parser')
const multiparty = require('multiparty')
const cookieParser = require('cookie-parser')
const { credentials } = require('./config')
const expressSession = require('express-session')
const flashMiddleware = require('./lib/middleware/flash')

const app = express()

// 设置视图引擎的layout入口时main，并且带后缀名handlebars
app.engine('handlebars', engine({
    defaultLayout: 'main',
    microsite: 'microsite', // 可以设置多个模板视图
    helpers: {
        section: function(name, options) {
            if (!this._section) this._section = {}
            this._section[name] = options.fn(this)
            return null
        }
    }
}))
// 设置功能页引擎后缀名handlebars
app.set('view engine', 'handlebars')
// 设置功能页目录位置
app.set('views', './views');

const port = process.env.PORT || 3000

app.use(express.static(__dirname + '/public'))

app.use(cookieParser(credentials.cookieSecret))

//  注意： express-session在被express链入前，必须要先链入cookie-parser
app.use(expressSession({
    resave: false,
    saveUninitialized: false,
    secret: credentials.cookieSecret
}))
// weather中间件必须经过use才会被使用
app.use(weather)

app.use(flashMiddleware)

app.use(bodyParser.urlencoded({extended: true}))

app.use(bodyParser.json())

app.get('/', handlers.home)


app.get('/about', handlers.about)

app.get('/section', handlers.sectionTest)

app.get('/newsletter', handlers.newsletter)

// app.get('/newsletter-flash', (req, res) => {
//     const name = req.body.name || '', email = req.body.email || ''

//     if(!VALID_EMAIL_REGEXP.test(email)) {
//         res.session.flash = {
//             type: 'danger',
//             intro: 'Validation error!',
//             message: 'The email address you entered was not valid.'
//         }
//         return res.redirect(303, '/newsletter')
//     }
// })

app.post('/api/newsletter-signup', handlers.api.newsletterSignup)

app.get('/newsletter-signup', handlers.newsletterSignup)

app.post('/newsletter-signup/process', handlers.newsletterSignupProcess)

app.get('/newsletter-signup/thank-you', handlers.newsletterSignupThankYou)

app.get('/contest/vacation-photo-toke', handlers.vacationPhoto)

app.post('/contest/vacation-photo/:year/:month', (req, res) => {
    const form = new multiparty.Form()
    form.parse(req, (err, fields, files) => {
        if (err) return res.status(500).send({ error: err.message })
        handlers.vacationPhotoContestProcess(req, res, fields, files)
    })
})

app.get('/contest/vacation-photo-thank-you', (req, res) => {
    res.render('contest/vacation-photo-thank-you')
})

app.get('/contest/vacation-photo-fetch', handlers.vacationPhotoFetch)

app.post('/api/vacation-photo-contest/:year/:month', (req, res) => {
    // handlers.api.vacationPhotoContest
    // 必须通过第三方比如multiparty的form方法，将form中的文件转成字段方式
    const form = new multiparty.Form()
    form.parse(req, (err, fields, files) => {
        console.log('fields, files', fields, files);
        if (err) return res.status(500).send({ error: err.message })
        handlers.api.vacationPhotoContest(req, res, fields, files)
    })
})



app.use(handlers.notFound)

app.use(handlers.serverError)

// module就是nodejs在加载所有模块时，传入的一个变量。
// 也就是说如果require.main是当前模块，那么module就是通过命令行加载的
// module是全局变量
// console.log('require.main == module', require.main == module);
// console.log('require.main', require.main);
if (require.main === module) {
    app.listen(port, () => console.log(
        `Express started on http://localhost:${port}`
    ))
} else {
    // 如果不相等，则说明require.main是从另一个模块导入的
    module.exports = app
}


// 安装Puppeteer, 是一个可控制的无头版Chrome，即不在屏幕上渲染用户界面也能运行
// --ignore-scripts 回头手动设置chrome本地路径
/*
    const browser = await puppeteer.launch({
        executablePath: 'C:\Program Files\Google\Chrome\Application\chrome'
    })
*/
// 安装portfinder, 寻找没被占用的端口
