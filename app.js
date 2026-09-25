const mathHelper = require("./mathHelper");

const price = 19.99;

const finalPrice = mathHelper.addTax(price, 0.08); // 8% tax

console.log("Price with tax: $" + mathHelper.roundMoney(finalPrice));