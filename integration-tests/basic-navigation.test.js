const portfinder = require('portfinder')
const puppeteer = require('puppeteer')

const app = require('../meadowlark')

let server = null
let port = null 

// 测试前启动
beforeEach(async () => {
    port = await portfinder.getPortPromise()
    console.log('port', port);
    server = app.listen(port)
})

// 测试结束启动
afterEach(() => {
    server.close()
})

test('home page links to about page', async () => {
    const browser = await puppeteer.launch({
        executablePath: 'C:/Program Files/Google/Chrome/Application/chrome'
    })
    const page = await browser.newPage()
    await page.goto(`http://localhost:${port}`)
    await Promise.all([
        page.waitForNavigation(),
        page.click('[data-test-id="about"]')
    ])
    expect(page.url()).toBe(`http://localhost:${port}/about`)
    await browser.close()
})