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
            message: `No space before left parentheses`,
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

function checkRightParen(context, node, paramNode) {
    var sourceCode = context.sourceCode;
    var nodeSource = sourceCode.getText(node);

    const rParenPos = nodeSource.indexOf(")");

    if (nodeSource.charAt(rParenPos - 1) != " " && nodeSource.charAt(rParenPos - 1) != "\n")
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
                checkLeftParen(context, node, node.test);
                checkRightParen(context, node, node.test);
            },
            WhileStatement(node) {
                checkLeftParen(context, node, node.test);
                checkRightParen(context, node, node.test);
            },
            ForStatement(node) {
                checkLeftParen(context, node, node.init);
                checkRightParen(context, node, node.update);
            },
            ForOfStatement(node) {
                checkLeftParen(context, node, node.left);
                checkRightParen(context, node, node.right);
            },
            CatchClause(node) {
                checkLeftParen(context, node, node.param);
                checkRightParen(context, node, node.param);
            },
            SwitchStatement(node) {
                checkLeftParen(context, node, node.discriminant);
                checkRightParen(context, node, node.discriminant);
            }
        };
    }
};
