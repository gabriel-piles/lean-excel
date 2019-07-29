import {CellKey} from '../cellKey/CellKey';

export interface Operator{
    regularExpression(): string;
    arrayToExpression(array:Array<string>):string;
}

class FormulaParser{
    readonly formula:string;
    readonly operator: Operator;

    constructor(formula:string, operator:Operator){
        this.operator = operator;
        this.formula = formula.replace(/\s/g, '');
    }

    public toExtendedExpression():string {
        const match = new RegExp(this.operator.regularExpression()).exec(this.formula);

        if (!match) {
            throw new Error('Invalid sum formula');
        }

        const formula = match[0];
        const formulaInput = match[3];

        const extendedFormula = this.inputsToExtendedFormula(formulaInput);
        return this.formula.replace(formula, extendedFormula);
    }

    private inputsToExtendedFormula(formulaInput:string):string {
        const arrayInputs = formulaInput.includes(':')
            ? this.arrayFromRange(formulaInput)
            : this.arrayFromCommas(formulaInput);

        const extendedFormula = '(' + this.operator.arrayToExpression(arrayInputs) + ')';
        return extendedFormula;
    }

    private arrayFromCommas(sumFormulaInput:string):Array<string> {
        return sumFormulaInput.split(/,/);
    }

    private arrayFromRange(rangeString:string):Array<string>{
        const keyRange = CellKey.getRange(rangeString);
        if(!keyRange || !keyRange.length){
            throw new Error('Invalid sum formula');
        }

        return keyRange;
    }
}

export {FormulaParser};