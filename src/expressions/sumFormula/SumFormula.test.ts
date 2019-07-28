import {SumFormula} from "./SumFormula";

const INVALID_FORMULA = '#INVALID_SUM_FORMULA';

it('sum formula to operation', () => {
    expect(new SumFormula('SUM(A1,A2,A3)').toOperation()).toEqual( 'A1+A2+A3');
    expect(new SumFormula('SUM(A1,B2)').toOperation()).toEqual( 'A1+B2');
    expect(new SumFormula('SUM(A1,B2) + 5').toOperation()).toEqual( 'A1+B2+5');
});

it('sum function with ranges to operation', () => {
    expect(new SumFormula('SUM(A1:A3)').toOperation()).toEqual( 'A1+A2+A3');
    expect(new SumFormula('SUM(A1:A1)').toOperation()).toEqual( 'A1');
    expect(new SumFormula('SUM(A4:A7)').toOperation()).toEqual( 'A4+A5+A6+A7');
    expect(new SumFormula('SUM(A4:A3)').toOperation()).toEqual( INVALID_FORMULA);
});