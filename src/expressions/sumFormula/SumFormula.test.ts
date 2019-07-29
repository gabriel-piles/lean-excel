import {SumFormula} from './SumFormula';

it('sum formula to operation', () => {
    expect(new SumFormula('SUM(A1,A2,A3)').toExtendedExpression()).toEqual( '(A1+A2+A3)');
    expect(new SumFormula('SUM(A1,B2)').toExtendedExpression()).toEqual( '(A1+B2)');
    expect(new SumFormula('SUM(A1,B2) + 5').toExtendedExpression()).toEqual( '(A1+B2)+5');
});

it('sum function with ranges to operation', () => {
    expect(new SumFormula('SUM(A1:A3)').toExtendedExpression()).toEqual( '(A1+A2+A3)');
    expect(new SumFormula('SUM(A1:A1)').toExtendedExpression()).toEqual( '(A1)');
    expect(new SumFormula('SUM(A4:A7)').toExtendedExpression()).toEqual( '(A4+A5+A6+A7)');
});

it('sum function should fail when no avg formula',   () => {
    try{
        new SumFormula('A1:A3').toExtendedExpression()
    }catch(e){
        expect(e.toString()).toContain('Error');
    }
});

it('sum function should fail when invalid range',   () => {
    try{
        new SumFormula('SUM(A4:A3)').toExtendedExpression()
    }catch(e){
        expect(e.toString()).toContain('Error');
    }
});