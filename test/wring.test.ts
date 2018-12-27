import { Wring, Collection } from '../src';


const testYaml = 'test-strings.yml';
const testResultYaml = 'test-result-strings.yml';

// Type for the Yaml document
type keys = string | number;
// test object with all values
const testObject = require('./test_object').testObject;

test('Check the formatter through main class', () => {
    let collection = new Collection(testYaml, __dirname);
    let resultCollection = new Collection(testResultYaml, __dirname);
    let wring = new Wring();

    for (let key of collection.getKeys()) {
        let result = wring.format(collection.get(key), testObject);
        expect(result).toBe(resultCollection.get(key));
    }
});