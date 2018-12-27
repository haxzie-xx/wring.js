import { doc, keys } from './';

export class Formatter {
    /**
     * Constructor for the formatter for a particular string
     * @param message String to be formatted
     */
    constructor(private message: string) {
        this.message = message;
    }

    /**
     * Method to generate regular expression from given string and delimiter
     * @param key the string-key to be included in the regex
     */
    private getRegExp(key: keys, delimiter: string = '{{ }}'): RegExp {

        // method to escape each character in the regex
        function escape(dPart: string) {
            // add \\ before each character in the delimiter
            let escaped = dPart.split('').map((letter) => {
                return `\\${letter}`;
            }).join('');
            return(escaped);
        }

        // convert the given delimiter into parts
        let sentinels = delimiter.split(' ');
        // if the delimiter is binary [beg, end]
        if (sentinels.length === 2) {
            // generate the regexp as `beg-key-end`
            return new RegExp(`${escape(sentinels[0])}${key}${escape(sentinels[1])}`, 'g');
        } else if (sentinels.length === 1) { // unary sentinel ie. sentinel-key
            return new RegExp(`${escape(sentinels[0])}${key}`, 'g');
        } else {
            throw new Error(`Invalid delimiter passed for formatter`);
        }
    }

    /**
     * Method to format the string with given key value pairs.
     * Keys in the passed JSON object are the identifiers for the substitution.
     * @param items JSON object with key value pairs of substitution strings
     */
    format(items: doc, delimiter?: string): string {
        let result = this.message.toString();

        for (let key of Object.keys(items)) {
            // if a delimiter is provided, pass the delimiter to the regex function
            let pattern = delimiter? this.getRegExp(key, delimiter) : this.getRegExp(key);
            result = result.replace(pattern, items[key]);
        }
        return result;
    }


}