import {CellKey} from '../cellKey/CellKey';

const AVG = /((AVG\()([^\)]+)\))/;

class AvgFormula {
    readonly formula: string;

    constructor(formula: string) {
        this.formula = formula.replace(/\s/g, '');
    }

    public toExtendedExpression(): string {
        const match = AVG.exec(this.formula);

        if (!match) {
            throw new Error('Invalid avg formula');
        }

        let avgFormulaInput = match[3];
        const extendedKeys = avgFormulaInput.includes(':')
            ? this.operationFromRange(avgFormulaInput)
            : avgFormulaInput;

        let extendedExpression = this.getAvgOperation(extendedKeys);
        extendedExpression = '(' + extendedExpression + ')';
        const sumFormula = match[0];
        return this.formula.replace(sumFormula, extendedExpression);
    }

    // Transform from A1,A2 to (A1/2 + A2/2)
    private getAvgOperation(extendedKeys: string) {
        let commaMatches = extendedKeys.match(/,/g);

        const numberOfInputs = commaMatches
            ? commaMatches.length + 1
            : 1;

        let avgOperation = extendedKeys.replace(/,/g, '/' + numberOfInputs + '+');
        avgOperation = avgOperation + '/' + numberOfInputs;
        return avgOperation;
    }

    private operationFromRange(rangeString: string): string {
        const keyRange = CellKey.getRange(rangeString);
        if (!keyRange || !keyRange.length) {
            throw new Error('Invalid avg formula');
        }

        return keyRange.join(',');
    }
}

export {AvgFormula};