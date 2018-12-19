# Wring.js
[![forthebadge](https://forthebadge.com/images/badges/60-percent-of-the-time-works-every-time.svg)](https://forthebadge.com)[![forthebadge](https://forthebadge.com/images/badges/you-didnt-ask-for-this.svg)](https://forthebadge.com)  
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
Create a new collection of string from the YAML file
```javascript
let myCollection = wring.load('my_strings.yml');
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
Send Pull Requests lol :smile:
