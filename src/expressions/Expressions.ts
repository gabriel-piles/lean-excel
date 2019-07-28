import _ from "lodash";
import {ExpressionsDictionary} from "./ExpressionsDictionary";
import {ValuesDictionary} from "./ValueDictionary";


const FORMULA = /^=/;
const VOID_STRING = /^\s*$/;
const KEY = /[A-Z][0-9]{1,2}/;

class Expressions {
    readonly REGEX_TO_ACTION = [
        {regularExpression: VOID_STRING, action: () => '0'},
        {regularExpression: KEY, action: (formula: string) => this.replaceKeyPerValue(formula, this.expressionsDictionary)},
    ];

    readonly ERROR_MESSAGE = '#ERROR';

    private expressionsDictionary: ExpressionsDictionary = {};

    public set(key: string, expression: string) {
        this.expressionsDictionary[key] = expression;
    }

    public toValues(): ValuesDictionary {
        const valuesDictionary: ValuesDictionary = {};

        _.each(this.expressionsDictionary, (expression, key) => {
            valuesDictionary[key] = this.evaluateExpression(expression)
        });

        return valuesDictionary;
    }

    private replaceKeyPerValue(formula: string, expressionsDictionary: ExpressionsDictionary) {
        const match = KEY.exec(formula);

        if(!match || !this.validKey(match[0])) {
            return this.ERROR_MESSAGE;
        }

        const key = match[0];

        const value = expressionsDictionary[key] ?
            this.evaluateExpression(expressionsDictionary[key])
            : '0';

        return this.evaluateFormula(formula.replace(key, value));
    }

    private validKey(key:string) {
        return eval(key.substring(1)) <= 50;
    }

    private evaluateExpression(expression: string): string {
        if (!FORMULA.exec(expression)) {
            return expression;
        }

        const formula = expression.replace('=', '');
        return this.evaluateFormula(formula);
    }

    private evaluateFormula(formula: string): string {
        try {
            const regularExpressionFulfilled = this.REGEX_TO_ACTION.find(x => x.regularExpression.exec(formula));

            if (regularExpressionFulfilled) {
                return regularExpressionFulfilled.action(formula);
            }

            return eval(formula).toString();
        } catch (e) {
            return this.ERROR_MESSAGE;
        }
    }

    get(key: string): string {
        return this.expressionsDictionary[key] ? this.expressionsDictionary[key] : '';
    }
}

export {Expressions};