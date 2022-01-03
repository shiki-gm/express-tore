module.exports = {
    resetValidation(req, res, next) {
        const {cart} = req.session
        if(cart) cart.warnings = cart.errors = []

        next()
    },
    checkWaiver(req, res, next) {
        const {cart} = req.session
        if(!cart) return next()
        if (cart.items.some(item => item.product.requireWaiver)) {
            cart.warnings.push('One or more of your selected tours requires a waiver.')
        }
        next()
    },
    checkGuestCounts(req, res, next) {
        const {cart} = req.session
        if (!cart) return next()
        if(cart.item.some(item => item.guests > item.product.maxGuests)) {
            cart.errors.push('One or more of your selected tours have selected')
        }
        next()
    }
}