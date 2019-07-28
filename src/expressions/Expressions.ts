import _ from "lodash";
import {ExpressionsDictionary} from "./ExpressionsDictionary";
import {ValuesDictionary} from "./ValueDictionary";
import {Key} from "./key/Key";
import {SumFormula} from "./sumFormula/SumFormula";


const FORMULA = /^=/;
const VOID_STRING = /^\s*$/;
const KEY = /[A-Z][0-9]{1,2}/;
const SUM = /(SUM\()(.*)(\))/;
const ERROR_MESSAGE = '#ERROR';

class Expressions {
    readonly REGEX_TO_ACTION = [
        {regExpression: VOID_STRING, action: () => '0'},
        {regExpression: SUM, action: (formula: string) => this.evaluateFormula(new SumFormula(formula).toOperation())},
        {regExpression: KEY, action: (formula: string) => this.replaceKeyPerValue(formula, this.expressionsDictionary)},
    ];

    private expressionsDictionary: ExpressionsDictionary = {};

    public set(key: string, expression: string) {
        this.expressionsDictionary[key] = expression;
    }

    public get(key: string): string {
        return this.expressionsDictionary[key] ? this.expressionsDictionary[key] : '';
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

        if (!match || !new Key(match[0]).valid()) {
            return ERROR_MESSAGE;
        }

        const key = match[0];

        const value = expressionsDictionary[key] ?
            this.evaluateExpression(expressionsDictionary[key])
            : '0';

        return this.evaluateFormula(formula.replace(key, value));
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
            const regExpressionFulfilled = this.REGEX_TO_ACTION.find(x => x.regExpression.exec(formula));

            if (regExpressionFulfilled) {
                return regExpressionFulfilled.action(formula);
            }

            return eval(formula).toString();
        } catch (e) {
            return ERROR_MESSAGE;
        }
    }
}

export {Expressions};