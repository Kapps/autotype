const method = require('./imports');

function foo(x: any): any {
    if (x) {
        return x.toString();
    }
    return "default string";
}
