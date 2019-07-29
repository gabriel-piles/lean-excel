import {Operator} from '../Formula';
import {RegExpEnum} from '../../RegExpEnum';

class SumOperator implements Operator{
    regularExpression() {
        return RegExpEnum.SUM;
    }

    arrayToExpression(array: Array<string>): string {
        if(!array.length){
            return '';
        }

        let expression = '(';
        expression += array.join(')+(');
        expression += ')';
        return expression;
    }
}

export {SumOperator};