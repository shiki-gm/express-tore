const { getFortune } = require('./fortune')
const VALID_EMAIL_REGEXP = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.com)+$/

exports.home = (req, res) => {
    /*     res.type('text/plain')
        res.send('Meadowlark Travel') */
    //  { layout: null} 不使用布局
    //  { layout: 'microsite'} 使用另一个视图模板

    // 只要设置一次就会一直有. path只设置该路径下的cookie
    res.cookie('monster', 'nom nom', {path: '/about'})
    res.cookie('signed_monster', 'nom nom', { signed: true })

    const monster = req.cookies.monster
    const signedMonster = req.signedCookies.signed_monster

    console.log('monster', monster); // monster nom nom
    console.log('signedMonster', signedMonster);  // signedMonster nom nom

    // 只要删除了就再没有了
    // res.clearCookie('monster')

    console.log('req.session', req.session);


    req.session.userName = 'Anonymous'
    const colorScheme = req.session.colorScheme || 'dark'

    console.log('colorScheme', colorScheme);

    req.session.colorScheme = 'green'

    console.log('colorScheme', colorScheme);

    /* 
    首次： 
    req.session Session {
    cookie: { path: '/', _expires: null, originalMaxAge: null, httpOnly: true }
    }
    colorScheme dark
    colorScheme dark

    二次
    req.session Session {
    cookie: { path: '/', _expires: null, originalMaxAge: null, httpOnly: true },
    userName: 'Anonymous',
    colorScheme: 'green'
    }
    colorScheme green
    colorScheme green

    */


    res.render('home', { layout: 'microsite' })
}

exports.about = (req, res) => {
    // res.type('text/plain')
    // res.send('About Meadowlark Travel')
    const monster = req.cookies.monster
    const signedMonster = req.signedCookies.signed_monster

    console.log('monster', monster); // monster nom nom
    console.log('signedMonster', signedMonster);  // signedMonster nom nom
    res.render('about', { fortune: getFortune() })
}

exports.sectionTest = (req, res) => {
    res.render('section-test', { layout: 'microsite' })
}

exports.notFound = (req, res) => {
    // res.type('text/plain')
    res.status(404)
    res.render('404')
    // res.send('404 - Not Found')
}

exports.serverError = (err, req, res, next) => {
    console.error(err.message)
    // res.type('text/plain')
    res.status(500)
    // res.send('500 - Server Error')
    res.render('500')
}

exports.newsletterSignup = (req, res) => {
    // 此处csrf是个模拟值
    res.render('newsletter-signup', { csrf: 'CSRF token goes here' })
}

exports.newsletterSignupProcess = (req, res) => {
    console.log('CSRF token (from hidden form field): ' + req.body._csrf);
    console.log('Name (from visible form field): ' + req.body.name);
    console.log('Email (from visible form field): ' + req.body.email);
    res.redirect(303, '/newsletter-signup/thank-you')
}

exports.newsletterSignupThankYou = (req, res) => {
    res.render('newsletter-signup-thank-you')
}

exports.newsletter = (req, res) => {
    res.render('newsletter', { csrf: 'CSRF token goes here' })
}

exports.api = {
    newsletterSignup: (req, res) => {
        console.log('CSRF TOKEN (from hidden form field): ' + req.body._csrf);
        console.log('Name (from visible form field): ' + req.body.name);
        console.log('Email (from visible form field): ' + req.body.email);
        res.send({ result: 'success' })
    },
    vacationPhotoContest: (req, res, fields, files) => {
        console.log('field data: ', fields);
      /*   {
            _csrf: [ 'CSRF token goes here' ],
            name: [ '问问' ],
            email: [ 'wgm@qibo.com' ]
          } */
        console.log('files data: ', files); 
       /*  { photo: [
            {
              fieldName: 'photo',
              originalFilename: '微信图片_20211216093555.jpg',
              path: 'C:\\Users\\admin\\AppData\\Local\\Temp\\9Jg1fvn49X-LjL3_GS5cx-Bc.jpg',
              headers: [Object],
              size: 13972
            }
          ]} */
        res.send({ result: 'success' })
    }
}

exports.vacationPhoto = (req, res) => {
    res.render('contest/vacation-photo', { csrf: 'CSRF token goes here', year: '2021', month: '12' })
}

exports.vacationPhotoContestProcess = (req, res, fields, files) => {
    console.log('field data: ', fields);
    console.log('files data: ', files);
    res.redirect(303, '/contest/vacation-photo-thank-you')
}

exports.vacationPhotoFetch = (req, res) => {
    res.render('contest/vacation-photo-fetch',  { csrf: 'CSRF token goes here', year: '2021', month: '12' })
}

