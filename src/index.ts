import * as parser from '@babel/parser'
import * as fs from 'fs';

const testCode = fs.readFileSync('./sample.js', 'utf8');

const res = parser.parse(testCode, {
    sourceType: 'module',
    sourceFilename: 'performanceLogger.js',
    plugins: [
        'flow',
    ]
});

const visitor = {
    Flow(path: any) {
        console.log('Flow declaration:', path);
    },
    FunctionDeclaration(path: any) {
        console.log('Function:', path);
    }
}
console.log(res);

fs.writeFileSync('res.json', JSON.stringify(res), 'utf8');

module.exports = function({types: t}: any) {
    return {
        visitor
    }
}