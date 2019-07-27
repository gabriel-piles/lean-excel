import _ from "lodash";
import {ExpressionsDictionary} from "./ExpressionsDictionary";
import {ValuesDictionary} from "./ValueDictionary";


class Expressions {
    private expressionsDictionary: ExpressionsDictionary = {};

    public set(key: string, expression: string) {
        this.expressionsDictionary[key] = expression;
    }

    public toValues(): ValuesDictionary {
        const valuesDictionary: ValuesDictionary = {};

        _.each(this.expressionsDictionary, (expression, key) => {
            valuesDictionary[key] = this.evaluateExpression(expression, this.expressionsDictionary)
        });

        return valuesDictionary;
    }

    private evaluateExpression(expression: string, expressionsDictionary: ExpressionsDictionary): string {
        if (/^=/.exec(expression)) {
            let formula = expression.replace('=', '');
            formula = formula.replace(/ /g, '');
            return this.evaluateFormula(formula, expressionsDictionary);
        }

        return expression;
    }

    private evaluateFormula(formula: string, expressionsDictionary: ExpressionsDictionary) : string {
        if(/^[A-Z]{1}[0-9]{1}/.exec(formula)){
            return expressionsDictionary[formula];
        }

        if (/^[0-9]+$/.exec(formula)){
            return formula;
        }

        return '#ERROR';
    }

    get(key: string): string {
        return this.expressionsDictionary[key] ? this.expressionsDictionary[key] : '';
    }
}

export {Expressions};