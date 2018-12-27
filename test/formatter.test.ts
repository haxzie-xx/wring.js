import { Collection } from '../src/collection';
const testBinaryYaml = 'custom-binary-delims.yml';
const testUnaryYaml = 'custom-unary-delims.yml';
const testResultYaml = 'test-result-strings.yml';

const testObject = {
    user: 'haxzie',
    number: 'first',
    repo: 'wring',
    1: 'haxzie',
    2: 'probot',
    3: 'wring'
};

test('for custom binary delimiter', () => {
    let collection = new Collection(testBinaryYaml, __dirname);
    let resultCollection = new Collection(testResultYaml, __dirname);

    for (let key of collection.getKeys()) {
        let result = collection.with(key).format(testObject, '${ }');
        expect(result).toBe(resultCollection.get(key));
    }
});

test('for custom unary delimiter', () => {
    let collection = new Collection(testUnaryYaml, __dirname);
    let resultCollection = new Collection(testResultYaml, __dirname);

    for (let key of collection.getKeys()) {
        let result = collection.with(key).format(testObject, '$');
        expect(result).toBe(resultCollection.get(key));
    }
});