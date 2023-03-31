// Package
const validator = require("validator");
const chalk = require("chalk");

// let gmail = validator.isEmail("aimanfadillah@gmail.com")
// let nomor = validator.isNumeric("23423424")
let text = 
chalk`
budi {bgRed.bold sekarang} sedang {bgBlue mandi}
`

// let warna = chalk.bgRed.white(text);
console.log(text);