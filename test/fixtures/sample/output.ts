const method = require('./import');

function foo(x: any): any {
    autotype.logType("x", x, 1);

    if (x) {
        return x.toString();
    }
    return "default string";
}
