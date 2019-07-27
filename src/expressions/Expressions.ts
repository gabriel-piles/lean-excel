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

        const myRe = /^=/;

        if (myRe.exec(expression)) {
            return expression.replace('=', '');
        }
        return expression;
    }

    get(key: string): string {
        return this.expressions[key] ? this.expressions[key] : '';
    }
}

export {Expressions};