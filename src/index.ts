import { NodePath } from 'babel-traverse';
import { callExpression, expressionStatement, FunctionDeclaration, identifier, Identifier, numericLiteral, stringLiteral } from '@babel/types';

const appendIdentifierQuery = (path: NodePath<FunctionDeclaration>, id: Identifier) => {
    const { node } = path;

    const call = callExpression(identifier('autotype.logType'), [
        stringLiteral(id.name),
        id,
        numericLiteral(node.loc!.start.line),
    ]);

    const statement = expressionStatement(call);

    node.body.body.unshift(statement);
};

const visitor = {
    FunctionDeclaration(path: NodePath<FunctionDeclaration>) {
        console.log('Function declaration:', path.getSource());
        for (const param of path.node.params) {
            if (param.type === 'Identifier') {
                const identifier = <Identifier>param;
                appendIdentifierQuery(path, identifier);
            } else {
                console.log('unknown param:', param);
            }
        }
    },
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
