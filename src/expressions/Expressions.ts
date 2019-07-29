import _ from 'lodash';
import {ExpressionsDictionary} from './ExpressionsDictionary';
import {ValuesDictionary} from './ValueDictionary';
import {CellKey} from './cellKey/CellKey';
import {AvgOperator} from './formula/avgOperator/AvgOperator';
import {FormulaParser} from './formula/Formula';
import {SumOperator} from './formula/sumOperator/SumOperator';
import {RegExpEnum} from './RegExpEnum';


class Expressions {
    private ERROR_MESSAGE = '#ERROR';

    readonly REGEX_TO_ACTION = [
        {regExp: RegExpEnum.VOID_STRING, action: () => '0'},
        {regExp: RegExpEnum.SUM, action: (formula: string) => this.evaluateFormula(new FormulaParser(formula, new SumOperator()).toExtendedExpression())},
        {regExp: RegExpEnum.AVG, action: (formula: string) => this.evaluateFormula(new FormulaParser(formula, new AvgOperator()).toExtendedExpression())},
        {regExp: RegExpEnum.KEY, action: (formula: string) => this.replaceKeyPerValue(formula, this.expressionsDictionary)},
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
            valuesDictionary[key] = this.expressionToValue(expression)
        });

        return valuesDictionary;
    }
    
    private expressionToValue(expression: string): string {
        if (!new RegExp(RegExpEnum.FORMULA).exec(expression)) {
            return expression;
        }

        const formula = expression.replace('=', '');
        return this.evaluateFormula(formula);
    }

    private evaluateFormula(formula: string): string {
        try {
            const regexToAction = this.REGEX_TO_ACTION.find(x => new RegExp(x.regExp).exec(formula));

            if (regexToAction) {
                return regexToAction.action(formula);
            }

            return eval(formula).toString();
        } catch (e) {
            return this.ERROR_MESSAGE;
        }
    }

    private replaceKeyPerValue(formula: string, expressionsDictionary: ExpressionsDictionary) {
        const match = new RegExp(RegExpEnum.KEY).exec(formula);

        if (!match || !new CellKey(match[0]).valid()) {
            return this.ERROR_MESSAGE;
        }

        const key = match[0];

        const value = expressionsDictionary[key] ?
            this.expressionToValue(expressionsDictionary[key])
            : '0';

        return this.evaluateFormula(formula.replace(key, value));
    }
}

export {Expressions};