var lp = require('./print-lib');
// module.exports = {
//     qr_with_text:qr_with_text,
//     qr_x4:qr_x4,
//     all_text:all_text,
//     poems:poems,
//     lyric:lyric
// }
console.log(lp.qr_with_text('123','3131'));
console.log(lp.qr_x4('123','3131'));
console.log(lp.all_text('1233131'));
console.log(lp.poems('1233131','89021cbrn090210b61c65bfc1fc98qfc5q2f9f'));
console.log(lp.lyric('1233131','1234567890123456789012345678901234567890','1234567890123456789'));