module.exports = (req, res, next) => {
    // 如果session中有一条flash消息，那么将它传给上下文对象，并清楚
    res.locals.flsh = req.session.flash
    delete req.session.flash
    next()
}