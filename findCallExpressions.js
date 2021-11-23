import {SyntaxKind} from "ts-morph";

/**
 *
 * @param {import('ts-morph').SourceFile} file
 * @param {string[]} relevantNames
 */
export function findCallExpressions(file, relevantNames = []) {
    const map = new Map

    const callExpressions = file
        .getDescendantsOfKind(SyntaxKind.CallExpression)
        .filter(e => relevantNames.includes(e.getFirstChild().getText()))

    for (const exp of callExpressions) {
        const [key, value] = exp.getArguments()
        map.set(key.getType().getText(), value.getType().getText())
    }

    return map
}