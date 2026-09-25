function addTax(price, taxRate) {
    return price + price * taxRate;
}

// This function rounds a number to 2 decimal places
function roundMoney(amount) {
    return Math.round(amount * 100) / 100;
}

module.exports = { addTax, roundMoney };