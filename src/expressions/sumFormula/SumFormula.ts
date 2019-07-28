import {Key} from "../key/Key";

const SUM = /(SUM\()(.*)(\))/;
const INVALID_FORMULA = '#INVALID_SUM_FORMULA';

class SumFormula{
    readonly formula:string;

    constructor(formula:string){
        this.formula = formula.replace(/\s/g, '');
    }

    public toOperation():string {
        const match = SUM.exec(this.formula);

        if (!match) {
            return INVALID_FORMULA;
        }

        const sumFormula = match[0];
        const sumExpression = match[2].includes(':')
            ? this.keyRangeToFormula(match[2])
            : match[2].replace(/\,/g, '+');

        return this.formula.replace(sumFormula, sumExpression);
    }

    private keyRangeToFormula(keyRange: string) {
        const keys = keyRange.split(':');
        const keyFrom = new Key(keys[0]);
        const keyTo = new Key(keys[1]);

        let keysArray = keyFrom.getRange(keyTo);

        if(!keysArray.length){
            return INVALID_FORMULA;
        }

        return keysArray.join('+');
    }
}

export {SumFormula};