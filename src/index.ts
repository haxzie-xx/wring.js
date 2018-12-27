
export { Collection } from './collection';
import { Formatter } from './formatter';

// Type for the Yaml document
export type keys = string | number;
export type doc = {
    [K in keys] : any;
}

/**
 * Main wring class to simply format a given string with data
 */
export class Wring {

    /**
     * Method to format a given string with substitution strings in an object
     * @param message The message to be formatted
     * @param data JSON array of key value pairs as substitution String
     */
    format(message: string, data: doc): string {
        return new Formatter(message).format(data);
    }
}




