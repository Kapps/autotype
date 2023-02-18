import { SourceLocation } from "./common";

export const logFunctionDeclaration = (name: string, filePath: string, loc: SourceLocation) => {
    console.log(`Function declaration: ${name} at ${loc.start.line}:${loc.start.column} - ${loc.end.line}:${loc.end.column}`);
}
