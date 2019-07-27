import _ from "lodash";
import {ExpressionsDictionary} from "./ExpressionsDictionary";
import {ValuesDictionary} from "./ValueDictionary";


const VOID_STRING = /^\s*$/;
const CELL_KEY = /^[A-Z]{1}[0-9]{1}/;
const NUMBER = /^\d+$/;
const DECIMAL = /^\d*\.\d+/;
const DIVIDED = /(.*)\/(.*)/;
const SUM = /(.*)\+(.*)/;
const SUBSTRACTION = /(.*)-(.*)/;

class Expressions {
    readonly REGEX_TO_ACTION = [
        {regularExpression: VOID_STRING, action: () => '0'},
        {regularExpression: NUMBER, action: (formula:string) => formula},
        {regularExpression: DECIMAL, action: (formula:string) => formula},
        {regularExpression: CELL_KEY, action: (formula:string) => this.replaceCellPerValue(formula, this.expressionsDictionary)},
        {regularExpression: DIVIDED, action: (formula:string) => this.operateTwoFormulas(formula, DIVIDED, (x,y) => x / y)},
        {regularExpression: SUM, action: (formula:string) => this.operateTwoFormulas(formula, SUM, (x,y) => x + y)},
        {regularExpression: SUBSTRACTION, action: (formula:string) => this.operateTwoFormulas(formula, SUBSTRACTION, (x,y) => x - y)},
    ];

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

    private replaceCellPerValue(key:string, expressionsDictionary: ExpressionsDictionary){
        return this.evaluateExpression(expressionsDictionary[key])
    }

    private operateTwoFormulas(formula:string, regularExpression: RegExp, operator:(x:number, y:number)=>number){
        const twoParts = formula.match(regularExpression);
        if(!twoParts){
            return '#ERROR';
        }

        let firstPart = parseFloat(this.evaluateFormula(twoParts[1]));
        let secondPart = parseFloat(this.evaluateFormula(twoParts[2]));
        return (operator(firstPart, secondPart )).toString();
    }

    private evaluateExpression(expression: string): string {
        if (/^=/.exec(expression)) {
            let formula = expression.replace('=', '');
            formula = formula.replace(/ /g, '');
            return this.evaluateFormula(formula);
        }

        return expression;
    }

    private evaluateFormula(formula: string) : string {
        const regularExpressionFulfilled = this.REGEX_TO_ACTION.find(x => x.regularExpression.exec(formula));

        if(!regularExpressionFulfilled){
            return '#ERROR';
        }

        return regularExpressionFulfilled.action(formula);
    }

    get(key: string): string {
        return this.expressionsDictionary[key] ? this.expressionsDictionary[key] : '';
    }
}

export {Expressions};