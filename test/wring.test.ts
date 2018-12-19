import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';
import { Wring } from '../src';
const wring = new Wring();
const testYaml = 'test-strings.yml';
const testResultYaml = 'test-result-strings.yml';

// Type for the Yaml document
type keys = string | number;
type doc = {
    [K in keys] : any;
}

test('Load the strings from yaml to a wring collection', () => {
    let collection = wring.load(testYaml);
    expect(collection.size()).toBe(3);
});

test('Get all the items in a loaded collection', () => {
    let collection = wring.load(testYaml);
    let yamlContents = yaml.safeLoad(fs.readFileSync(path.join(__dirname, testYaml), 'utf-8'));

    for (let key of Object.keys(yamlContents)) {
        expect(collection.get(key)).toBe(yamlContents[key]);
    }
});


test('Format all the test strings', () => {
    let testObject = {
        user: 'haxzie',
        number: 'first',
        repo: 'wring',
        1: 'haxzie',
        2: 'probot',
        3: 'wring'
    };

    let collection = wring.load(testYaml);
    let resultCollection = wring.load(testResultYaml);
    let yamlContents = yaml.safeLoad(fs.readFileSync(path.join(__dirname, testYaml), 'utf-8'));

    for (let key of Object.keys(yamlContents)) {
        let result = collection.with(key).format(testObject);
        expect(result).toBe(resultCollection.get(key));
    }
});