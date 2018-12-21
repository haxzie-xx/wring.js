import * as fs from 'fs';
import * as yaml from 'js-yaml';
import * as path from 'path';

// Type for the Yaml document
type keys = string | number;
type doc = {
    [K in keys] : any;
}

export class Wring {

    private Collection = class {
        private data: doc;

        /**
         * Initialize the Collection with the JSON document containing
         * key value pairs
         * @param contents 
         */
        constructor(contents: doc) {
            this.data = contents;
        }

        /**
         * Get a single item from the collection
         * @param key 
         */
        get(key: keys) : any {

            if (key in this.data)
                return this.data[key];
            else{
                console.log(`Couldnt find the key`);
                return null;
            }
        }

        /**
         * Function to return a sub collection within a collection
         * @param key 
         */
        from(key: keys) {
            if (key in this.data) {
                let subCollection: doc = this.get(key);
                return new (new Wring()).Collection(subCollection);
            }
        }

        /**
         *  Function to return the size of the loaded collection
         */
        size() : number {
            return Object.keys(this.data).length;
        }

        /**
         * Class to format a given string with specified objects
         */
        private Formatter = class {
            private message: string;

            constructor (message: string) {
                this.message = message;
            }

            /**
             * Function to format the given string with a specified object
             * object should contain key value pairs
             * @param items 
             */
            format(items: doc) {
                let result = this.message.toString();

                for (let key of Object.keys(items)) {
                    let pattern = new RegExp(`\\{\\{${key}\\}\\}`, 'g');
                    result = result.replace(pattern, items[key]);
                }
                return result;
            }
        }

        /**
         * 
         * @param key 
         */
        with(key: string) {
            if (key in this.data) {
                return new this.Formatter(this.data[key]);
            } else {
                console.error(`Key not found in collection`)
                return null;
            }
        }
    }


    /**
     * Function to load a given yaml file contents
     * Checks for valid files and loads using js-yaml
     * @param filePath 
     */
    load(filePath : string, dirname? : string) : any {

        // generate the path if directory name is provided
        if (dirname) {
            filePath = path.join(dirname, filePath);
        }

        if (filePath && fs.existsSync(filePath)) {
            try {
                
                let yamlContents = yaml.safeLoad(fs.readFileSync(filePath, 'utf-8'));
                
                return new this.Collection(yamlContents);

            } catch (error) {
                // error when opening or parsing file
                console.error(`Unable to load file : ${error}`);
                return process.exit(-1);
            };
        } else {
            // Unable to open file from specified file path
            throw new Error(`Unable to open data file: ${filePath}`)
        }
    }

}
