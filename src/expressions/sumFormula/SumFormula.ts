import {CellKey} from '../cellKey/CellKey';

const SUM = /((SUM\()([^\)]+)\))/;

class SumFormula{
    readonly formula:string;

    constructor(formula:string){
        this.formula = formula.replace(/\s/g, '');
    }

    public toExtendedExpression():string {
        const match = SUM.exec(this.formula);

        if (!match) {
            throw new Error('Invalid sum formula');
        }

        let sumFormulaInput = match[3];
        let extendedExpression = sumFormulaInput.includes(':')
            ? this.operationFromRange(sumFormulaInput)
            : sumFormulaInput.replace(/,/g, '+');

        extendedExpression = '(' + extendedExpression + ')';

        const sumFormula = match[0];
        return this.formula.replace(sumFormula, extendedExpression);
    }

    private operationFromRange(rangeString:string):string{
        const keyRange = CellKey.getRange(rangeString);
        if(!keyRange || !keyRange.length){
            throw new Error('Invalid sum formula');
        }

        return keyRange.join('+');
    }
}

export {SumFormula};