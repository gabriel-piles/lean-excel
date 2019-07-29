import {Operator} from '../Formula';
import {RegExpEnum} from "../../RegExpEnum";

class AvgOperator implements Operator{
    regularExpression() {
        return RegExpEnum.AVG;
    }
    arrayToExpression(array: Array<string>): string {
        const numberOfInputs = array.length;

        if(!numberOfInputs){
            return '';
        }

        let avgOperation = '(';
        avgOperation += array.join(')/' + numberOfInputs + '+(');
        avgOperation += ')/' + numberOfInputs;
        return avgOperation;
    }
}

export {AvgOperator};