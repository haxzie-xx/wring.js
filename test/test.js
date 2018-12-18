const { Wring } = require('../dist'); 

let test = new Wring();

console.log(__dirname);
const collection = test.load('test-strings.yml');
result = collection.use('welcome').format({ user: 'haxzie'});
console.log(result);