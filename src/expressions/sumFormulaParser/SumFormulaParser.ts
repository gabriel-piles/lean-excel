import {Key} from "../key/Key";

const SUM = /(SUM\()(.*)(\))/;

class SumFormulaParser{
    readonly formula:string;

    constructor(formula:string){
        this.formula = formula.replace(/\s/g, '');
    }

    public toOperation():string {
        const match = SUM.exec(this.formula);

        if (!match) {
            throw new Error('Invalid sum formula');
        }

        const operation = match[2].includes(':')
            ? this.operationFromRange(match[2])
            : match[2].replace(/\,/g, '+');

        const sumFormula = match[0];
        return this.formula.replace(sumFormula, operation);
    }

    private operationFromRange(rangeString:string):string{
        const keyRange = Key.getRange(rangeString);
        if(!keyRange || !keyRange.length){
            throw new Error('Invalid sum formula');
        }

        return keyRange.join('+');
    }
}

export {SumFormulaParser};