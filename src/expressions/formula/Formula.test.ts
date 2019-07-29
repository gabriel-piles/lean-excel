import {FormulaParser} from './Formula';
import {SumOperator} from './sumOperator/SumOperator';
import {AvgOperator} from "./avgOperator/AvgOperator";


it('sum formula to operation', () => {
    expect(new FormulaParser('SUM(A1)', new SumOperator()).toExtendedExpression()).toEqual( '((A1))');
    expect(new FormulaParser('SUM(A1,A2,A3)', new SumOperator()).toExtendedExpression()).toEqual( '((A1)+(A2)+(A3))');
    expect(new FormulaParser('AVG(A1,B2)', new AvgOperator()).toExtendedExpression()).toEqual( '((A1)/2+(B2)/2)');
    expect(new FormulaParser('AVG(A1,B2) + 5', new AvgOperator()).toExtendedExpression()).toEqual( '((A1)/2+(B2)/2)+5');
});

it('sum function with ranges to operation', () => {
    expect(new FormulaParser('SUM(A1:A3)', new SumOperator()).toExtendedExpression()).toEqual( '((A1)+(A2)+(A3))');
    expect(new FormulaParser('SUM(A1:A1)', new SumOperator()).toExtendedExpression()).toEqual( '((A1))');
    expect(new FormulaParser('AVG(A1:A1)', new AvgOperator()).toExtendedExpression()).toEqual( '((A1)/1)');
    expect(new FormulaParser('AVG(A4:A7)', new AvgOperator()).toExtendedExpression()).toEqual( '((A4)/4+(A5)/4+(A6)/4+(A7)/4)');
});

it('sum function should fail when no avg formula',   () => {
    try{
        new FormulaParser('A1:A3', new SumOperator()).toExtendedExpression()
    }catch(e){
        expect(e.toString()).toContain('Error');
    }
});

it('sum function should fail when invalid range',   () => {
    try{
        new FormulaParser('SUM(A4:A3)', new SumOperator()).toExtendedExpression()
    }catch(e){
        expect(e.toString()).toContain('Error');
    }
});