const method = require('./import');
function foo(x: any): any {
    if (x) {
        return x.toString();
    }
    return "default string";
}
