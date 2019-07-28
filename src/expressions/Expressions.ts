import _ from "lodash";
import {ExpressionsDictionary} from "./ExpressionsDictionary";
import {ValuesDictionary} from "./ValueDictionary";
import {Key} from "./key/Key";


const FORMULA = /^=/;
const VOID_STRING = /^\s*$/;
const KEY = /[A-Z][0-9]{1,2}/;
const SUM = /(SUM\()(.*)(\))/;

class Expressions {
    readonly REGEX_TO_ACTION = [
        {regularExpression: VOID_STRING, action: () => '0'},
        {regularExpression: SUM, action: (formula: string) => this.sumFormula(formula)},
        {
            regularExpression: KEY,
            action: (formula: string) => this.replaceKeyPerValue(formula, this.expressionsDictionary)
        },
    ];

    readonly ERROR_MESSAGE = '#ERROR';

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

    private sumFormula(formula: string) {
        const match = SUM.exec(formula);

        if (!match) {
            return this.ERROR_MESSAGE;
        }

        const sumFormula = match[0];
        const sumExpression = match[2].includes(':')
            ? this.keyRangeToFormula(match[2])
            : match[2].replace(/\,/g, '+');

        return this.evaluateFormula(formula.replace(sumFormula, sumExpression));
    }

    private replaceKeyPerValue(formula: string, expressionsDictionary: ExpressionsDictionary) {
        const match = KEY.exec(formula);

        if (!match || !new Key(match[0]).valid()) {
            return this.ERROR_MESSAGE;
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
            const regularExpressionFulfilled = this.REGEX_TO_ACTION.find(x => x.regularExpression.exec(formula));

            if (regularExpressionFulfilled) {
                return regularExpressionFulfilled.action(formula);
            }

            return eval(formula).toString();
        } catch (e) {
            return this.ERROR_MESSAGE;
        }
    }


    private keyRangeToFormula(keyRange: string) {
        const keys = keyRange.split(':');
        const keyFrom = new Key(keys[0]);
        const keyTo = new Key(keys[1]);

        if(keyFrom.getRowNumber() > keyTo.getRowNumber() || keyFrom.getColumn() !== keyTo.getColumn()){
            return this.ERROR_MESSAGE;
        }

        if(keyFrom.getRowNumber() === keyTo.getRowNumber()){
            return keys[0];
        }

        let formula = keys[0];
        for (let keyNumber = keyFrom.getRowNumber() + 1; keyNumber <= keyTo.getRowNumber(); keyNumber++) {
            formula = formula + '+' + keyFrom.getColumn() + keyNumber;
        }

        return formula;
    }
}

export {Expressions};