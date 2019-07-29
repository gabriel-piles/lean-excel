import _ from 'lodash';
import {ExpressionsDictionary} from './ExpressionsDictionary';
import {ValuesDictionary} from './ValueDictionary';
import {CellKey} from './cellKey/CellKey';
import {SumFormulaParser} from './sumFormulaParser/SumFormulaParser';
import {AvgFormulaParser} from './avgFormulaParser/AvgFormulaParser';

const FORMULA = /^=/;
const VOID_STRING = /^\s*$/;
const KEY = /[A-Z][0-9]{1,2}/;
const SUM = /(SUM\()(.*)(\))/;
const AVG = /(AVG\()(.*)(\))/;
const ERROR_MESSAGE = '#ERROR';

class Expressions {
    readonly REGEX_TO_ACTION = [
        {regularExpression: VOID_STRING, action: () => '0'},
        {regularExpression: SUM, action: (formula: string) => this.evaluateFormula(new SumFormulaParser(formula).toOperation())},
        {regularExpression: AVG, action: (formula: string) => this.evaluateFormula(new AvgFormulaParser(formula).toOperation())},
        {regularExpression: KEY, action: (formula: string) => this.replaceKeyPerValue(formula, this.expressionsDictionary)},
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
    
    private evaluateExpression(expression: string): string {
        if (!FORMULA.exec(expression)) {
            return expression;
        }

        const formula = expression.replace('=', '');
        return this.evaluateFormula(formula);
    }

    private evaluateFormula(formula: string): string {
        try {
            const regExpressionFulfilled = this.REGEX_TO_ACTION.find(x => x.regularExpression.exec(formula));

            if (regExpressionFulfilled) {
                return regExpressionFulfilled.action(formula);
            }

            return eval(formula).toString();
        } catch (e) {
            return ERROR_MESSAGE;
        }
    }

    private replaceKeyPerValue(formula: string, expressionsDictionary: ExpressionsDictionary) {
        const match = KEY.exec(formula);

        if (!match || !new CellKey(match[0]).valid()) {
            return ERROR_MESSAGE;
        }

        const key = match[0];

        const value = expressionsDictionary[key] ?
            this.evaluateExpression(expressionsDictionary[key])
            : '0';

        return this.evaluateFormula(formula.replace(key, value));
    }
}

export {Expressions};