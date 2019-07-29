import {Operator} from '../Formula';

class SumOperator implements Operator{
    public regularExpression = /((SUM\()([^\)]+)\))/;

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