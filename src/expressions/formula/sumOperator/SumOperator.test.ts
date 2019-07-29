import {SumOperator} from "./SumOperator";

it('array to expression', () => {
    expect(new SumOperator().arrayToExpression([])).toEqual( '');
    expect(new SumOperator().arrayToExpression(['a'])).toEqual( '(a)');
    expect(new SumOperator().arrayToExpression(['a','b'])).toEqual( '(a)+(b)');
});