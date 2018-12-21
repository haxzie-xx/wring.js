# Wring.js
[![forthebadge](https://forthebadge.com/images/badges/you-didnt-ask-for-this.svg)](https://forthebadge.com)  
A dead simple string formating and templating utility for working with YAML string collections.
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
`wring.load()` takes the absolute path of the YAML file to be loaded and returns a `Collection`.  
eg:
```javascript
let myCollection = wring.load('/user/home/project/my_strings.yml');
```
If you only have the absolute path of the file, you can achieve this by requiring the `path` module or simply pass the `__dirname` as second argument for the function.
```javascript
// simply pass the __dirname as the second argument
let myCollection = wring.load('path/to/my_strings.yml', __dirname);

// or you can do it yourself by using the path module
const path = require('path');
let myCollection = wring.load(path.join(__dirname, 'path/to/my_strings.yml'));

```
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
# Testing
Wring uses [Jest](https://jetjs.org) for testing and [ts-jest](https://kulshekhar.github.io/ts-jest/) for typescript preprocessing.
```shell
$ npm run test
```
# Contributing
Open and issue and discuss the changes with a maintainer. Submit PRs only for issues that's been discussed. Feel free to submit PRs to fix typos and documentation without opening an issue :heart:

# TODO
- [X] Enable sub collections 
- [ ] Strict checking of given yaml file
- [ ] Support for JSON files
- [ ] Manually load data into collection

# License
[MIT License](https://github.com/haxzie/wring.js/blob/master/LICENSE) © [Musthaq Ahamad](https://github.com/haxzie) 2018-19