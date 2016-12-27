/*eslint-env node, es6 */
var Jasmine = require('jasmine');
var jasmine = new Jasmine();

jasmine.loadConfigFile('./jasmine.json');
jasmine.configureDefaultReporter({
    showColors: false
});
jasmine.execute();
