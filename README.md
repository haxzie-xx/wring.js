# Wring.js
[![forthebadge](https://forthebadge.com/images/badges/you-didnt-ask-for-this.svg)](https://forthebadge.com)  
A Dead simple string formating and templating utility for working with YAML string collections.
Working with [Probot](https://github.com/probot/probot) or any other chat bots? Want to store all the strings and need an efficient way to format them with user data? This is a simple solution to make the work easier.

# Usage
Install Wring.js in your project
```shell
$ npm install wring-js
```
Import / require the library in your file and create an instance.
```javascript
const { Wring } = require('wring-js');
const wring = new Wring();
```
To format a single string with data
```javascript
let message = wring.format('Hello {{user}}', { user: 'haxzie' });
// results in: Hello haxzie
```
## Working with collections
Wring formats the strings using the delimitter ``{{ }}`` you can specify the identifier inside it to format from the string based on the object's keys you have passed.
Here's an example yaml file:
```yaml
# my_strings.yml

welcome: |
  Welcome, {{user}}!
congratulate: |
  Hey {{user}}, congratulations on your {{number}} PR for {{repo}}!
waywo: |
  This is {{user}} and I am currently working on {{wring}}
user: 
    sayHello: |
        Hello {{user}}
    sayGoodMorning: |
        Good Morning {{user}}
```
Create a new collection of string from the YAML file.  
`new Collection()` takes the absolute path of the YAML file to be loaded and returns a `Collection`.  
eg:
```javascript
import { Collection } from 'wring-js';
let myCollection = new Collection('/user/home/project/my_strings.yml');
```
If you only have the relative path of the file, you can achieve this by requiring the `path` module or simply pass the `__dirname` as second argument for the function.
```javascript
import { Collection } from 'wring-js';

// simply pass the __dirname as the second argument
let myCollection = new Collection('path/to/my_strings.yml', __dirname);

// or you can do it yourself by using the path module
const path = require('path');
let myCollection = new Collection(path.join(__dirname, 'path/to/my_strings.yml'));

```
### Using existing data
Or Create a collection with existing JSON object with key value pairs.
```javascript
let myCollection = new Collection().load(<YOUR_JSON_OBJECT>);
```
### Fetching and Formatting
Pick a string and format it using an object with key value pairs.
```javascript
let welcomeString  = myCollection.with('welcome').format({ user: 'haxzie' });
// this generates -> Welcome, haxzie!
```
Pick a string inside a sub collection
```javascript
let helloString = myCollection.from('user').with('sayHello').format({ user: 'haxzie' });
// this generates -> Hello haxzie
```
## Custom delimiters
Wring `Collection` supports **Unary** and **Binary** delimiters for formating the strings. By default the formatter uses `{{ }}` as the delimiter. To use your own, simply pass the delmiter as a string to the `format()` method.
### Using Binary delimiters
Separate the starting and ending delimiter with a space where the identifier resides. Eg. If you want to use `${key}` as the delimiter in your string as `Hello ${user}!` pass the delimiter as `${ }` to the `format()` method's second argument;
```javascript
let message = myCollection.with('welcome').format({ user: 'haxzie' }, '${ }');
```
### Using unary delimiters
To use a unary delimiter, simply pass the starting delimiter as a string to the `format()` method's second argument. Eg. if you want to use just `$` as the delimiter to specify the substitution strings in the message as `$user`.
```javascript
let message = myCollection.with('welcome').format({ user: 'haxzie' }, '$');
```
# Testing
Wring uses [Jest](https://jetjs.org) for testing and [ts-jest](https://kulshekhar.github.io/ts-jest/) for typescript preprocessing.
```shell
$ npm run test
```
# Contributing
Open and issue and discuss the changes with a maintainer. Submit PRs only for issues that's been discussed. Feel free to submit PRs to fix typos and documentation without opening an issue :heart:

# TODO
- [X] Enable sub collections 
- [X] Manually load data into collection
- [ ] Strict checking of given yaml file
- [ ] Support for JSON files

# License
[MIT License](https://github.com/haxzie/wring.js/blob/master/LICENSE) © [Musthaq Ahamad](https://github.com/haxzie) 2018-19
