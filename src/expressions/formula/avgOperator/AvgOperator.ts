import {Operator} from '../Formula';

class AvgOperator implements Operator{
    public regularExpression = /((AVG\()([^\)]+)\))/;

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