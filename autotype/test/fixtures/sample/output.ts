import autotype from "typelog/autotype";
const method = require('./import');
function foo(x: any): any {
  const __autotype_log_function = autotype.logFunctionDeclaration("foo", __filename, {
    start: {
      line: 2,
      column: 0
    },
    end: {
      line: 7,
      column: 1
    }
  });
  __autotype_log_function.appendArgument("x", x, {
    start: {
      line: 2,
      column: 13
    },
    end: {
      line: 2,
      column: 19
    }
  });
  if (x) {
    return x.toString();
  }
  return "default string";
}
