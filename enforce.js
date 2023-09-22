function checkLeftParen(context, node, paramNode) {
    var sourceCode = context.sourceCode;
    var nodeSource = sourceCode.getText(node);

    const lParenPos = nodeSource.indexOf("(");

    if (nodeSource.charAt(lParenPos + 1) != " " && nodeSource.charAt(lParenPos + 1) != "\n")
    {
        var start = {
            line: paramNode.loc.start.line,
            column: paramNode.loc.start.column - 1
        };
        var end = paramNode.loc.start;

        context.report({
            node,
            message: `No space after left parentheses`,
            loc: {
                start,
                end
            },
            fix(fixer) {
                return fixer.insertTextBefore(paramNode, " ");
            }
        })
    }
}

function checkRightParen(context, node, paramNode, bodyNodes) {
    var sourceCode = context.sourceCode;

    var nodeSource = sourceCode.getText(node);
    var paramSource = sourceCode.getText(paramNode);

    var searchAt = nodeSource.substring(nodeSource.indexOf(paramSource)).replace(paramSource, '');

    for (var node of bodyNodes.filter(n => !!n))
    {
        var nodeSource = sourceCode.getText(node);
        searchAt = searchAt.replace(nodeSource, '')
    }

    var rParenPos = searchAt.indexOf(")");

    if (searchAt.charAt(rParenPos - 1) != " " && searchAt.charAt(rParenPos - 1) != "\n")
    {
        var start = paramNode.loc.end;
        var end = {
            line: paramNode.loc.end.line,
            column: paramNode.loc.end.column + 1
        };

        context.report({
            node,
            message: `No space before right parentheses`,
            loc: {
                start,
                end
            },
            fix(fixer) {
                return fixer.insertTextAfter(paramNode, " ");
            }
        })
    }
}

module.exports = {
    meta: {
        type: "problem",
        docs: {
            description: "Enforce spaces in parentheses after keywords",
        },
        fixable: "code",
        schema: []
    },
    create(context) {
        return {
            IfStatement(node) {
                checkLeftParen(context, node, node.test, [node.consequent, node.alternate]);
                checkRightParen(context, node, node.test, [node.consequent, node.alternate]);
            },
            WhileStatement(node) {
                checkLeftParen(context, node, node.test, [node.body]);
                checkRightParen(context, node, node.test, [node.body]);
            },
            ForStatement(node) {
                checkLeftParen(context, node, node.init, [node.body]);
                checkRightParen(context, node, node.update, [node.body]);
            },
            ForOfStatement(node) {
                checkLeftParen(context, node, node.left, [node.body]);
                checkRightParen(context, node, node.right, [node.body]);
            },
            CatchClause(node) {
                checkLeftParen(context, node, node.param, [node.body]);
                checkRightParen(context, node, node.param, [node.body]);
            },
            SwitchStatement(node) {
                checkLeftParen(context, node, node.discriminant, [...node.cases]);
                checkRightParen(context, node, node.discriminant, [...node.cases]);
            }
        };
    }
};
