import * as fs from 'fs';
import * as yaml from 'js-yaml';
import * as path from 'path';
import {doc, keys} from './';
import {Formatter} from './formatter';

export class Collection {

    private data : doc;
    /**
     * Constructor to load a yaml file and convert it into a collection
     * pass the absolute file path or pass the __dirname along with a relative path
     * @param filePath absolute path of the yaml file
     * @param dirname if you got a relative path, pass the current __dirname
     */
    constructor(filePath?: string, dirname?: string) {
        // generate the path if directory name is provided
        if (dirname) {
            filePath = path.join(dirname, filePath);
        }
        // check if the file exists
        if (filePath) {
            if (fs.existsSync(filePath)) {
                try {
                    // load the yaml file using js-yaml
                    this.data = yaml.safeLoad(fs.readFileSync(filePath, 'utf-8'));

                } catch (error) {
                    // error when opening or parsing file
                    console.error(`Unable to load file : ${error}`);
                    throw new Error(error);
                };
            } else {
                // Unable to open file from specified file path
                throw new Error(`Unable to open data file: ${filePath}`)
            }
        }
    }
    // =============================================================================
    /**
     * Method to load a collection with an existing JS object
     * @param data JSON or JS object of the collection
     */
    load(data: doc) {
        if(data) {
            this.data = data;
            return this;
        } else {
            throw new Error(`ERROR: No JSON data passed`);
        }
    }
    // =============================================================================
    /**
     * Method to get a single string value from the loaded collection
     * @param key key of the string item from yaml doc
     */
    get(key : keys) : any {
        // return the value if the key is present in the doc
        if(key in this.data) 
            return this.data[key];
        else {
            throw new Error(`Couldnt find the key: ${key} in collection.`)
        }
    }

    // =============================================================================
    /**
     * Method to generate a new subCollection with the data existing in the loaded
     * collection, as child
     * @param key Key of the subCollection in the loaded collection
     */
    from(key : keys) : Collection{
        if (key in this.data) {
            let subCollection : doc = this.get(key);
            return new Collection().load(subCollection);
        }
    }
    // =============================================================================
    /**
     * Method to get the size of the loaded collection
     */
    size() : number {
        return Object.keys(this.data).length;
    }
    // =============================================================================
    /**
     * Method to create a formatter for a specified string from the collection
     * @param key Key of the string in the collection
     */
    with(key: string) {
        if (key in this.data) {
            return new Formatter(this.data[key]);
        } else {
            throw new Error(`Key not found in collection`)
        }
    }
}