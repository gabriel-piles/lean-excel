import {AvgOperator} from "./AvgOperator";

it('array to expression', () => {
    expect(new AvgOperator().arrayToExpression([])).toEqual( '');
    expect(new AvgOperator().arrayToExpression(['a'])).toEqual( '(a)/1');
    expect(new AvgOperator().arrayToExpression(['a','b'])).toEqual( '(a)/2+(b)/2');
    expect(new AvgOperator().arrayToExpression(['abc','b', '2+3'])).toEqual( '(abc)/3+(b)/3+(2+3)/3');
});