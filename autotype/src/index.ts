import { NodePath } from 'babel-traverse';
import template from '@babel/template';
import { callExpression, Expression, expressionStatement, FunctionDeclaration, identifier, Identifier, importDeclaration, importDefaultSpecifier, LVAL_TYPES, memberExpression, numericLiteral, Program, SourceLocation, stringLiteral, VariableDeclaration, variableDeclaration, variableDeclarator } from '@babel/types';

const functionLogVariableName = '__autotype_log_function';

const buildLocationLiteral = (loc: SourceLocation) => {
    return <Expression>template.expression(`
        { start: { line: ${loc.start.line}, column: ${loc.start.column} }, end: { line: ${loc.end.line}, column: ${loc.end.column} } }`,
    )();
}

const appendFunctionArgument = (path: NodePath<FunctionDeclaration>, param: Identifier) => {
    const { node } = path;

    const call = callExpression(
        memberExpression(identifier(functionLogVariableName), identifier('appendArgument')),
        [
            stringLiteral(param.name),
            param,
            buildLocationLiteral(param.loc!),
        ],
    );

    const statement = expressionStatement(call);
    node.body.body.splice(1, 0, statement);
    // path.insertAfter(inspectionCall, statement);
    // node.body.body.unshift(statement);
};

const insertFunctionInspectionUpsert = (path: NodePath<FunctionDeclaration>, id: Identifier) => {
    const call = callExpression(identifier('autotype.logFunctionDeclaration'), [
        stringLiteral(id.name),
        identifier('__filename'),
        buildLocationLiteral(path.node.loc!),
    ]);

    const varDec = variableDeclaration(
        'const',
        [variableDeclarator(identifier(functionLogVariableName), call)],
    );
    path.node.body.body.unshift(varDec);
};

const visitor = {
    FunctionDeclaration(path: NodePath<FunctionDeclaration>) {
        insertFunctionInspectionUpsert(path, path.node.id!);
        for (const param of path.node.params) {
            if (param.type === 'Identifier') {
                const identifier = <Identifier>param;
                appendFunctionArgument(path, identifier);
            } else {
                console.error('unknown param:', param);
            }
        }
    },
    Program(path: NodePath<Program>) {
        const autotypeIdentifier = identifier('autotype');
        const importDefault = importDefaultSpecifier(autotypeIdentifier);
        const importDeclarationNode = importDeclaration([importDefault], stringLiteral('typelog/autotype'));
        path.node.body.unshift(importDeclarationNode);
    }
    /*FunctionExpression(path: NodePath) {
        console.log('Function expression:', path.getSource());
    },
    Identifier(path: NodePath) {
        console.log('Identifier:', path.getSource());
    },
    DeclareFunction(path: NodePath) {
        console.log('Declare function:', path.getSource());
    },*/
};

export default function ({ types: t }: any) {
    return {
        visitor
    }
}
