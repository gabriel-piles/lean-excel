import _ from "lodash";
import {ExpressionsDictionary} from "./ExpressionsDictionary";
import {ValuesDictionary} from "./ValueDictionary";


class Expressions {
    private expressions: ExpressionsDictionary = {};

    public set(key: string, expression: string) {
        this.expressions[key] = expression;
    }

    public toValues(): ValuesDictionary {
        const valuesDictionary: ValuesDictionary = {};

        _.each(this.expressions, (expression, key) => valuesDictionary[key] = this.evaluateExpression(expression));

        return valuesDictionary;
    }

    private evaluateExpression(expression: string): string {

        if (/^=/.exec(expression)) {
            const formula = expression.replace('=', '');

            if (/^[0-9]+$/.exec(formula)){
                return expression.replace('=', '');
            }

            return '#ERROR';
        }

        return expression;
    }

    get(key: string): string {
        return this.expressions[key] ? this.expressions[key] : '';
    }
}

export {Expressions};