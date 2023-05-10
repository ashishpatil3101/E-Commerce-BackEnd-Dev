const { Buffer } = require( 'node:buffer');

const buf = Buffer.from('<Buffer 64 5a 69 cc 11 d4 ff 30 bd ff 1e 37>', 'hex');

console.log(buf.toString('utf8'));
console.log(1)
