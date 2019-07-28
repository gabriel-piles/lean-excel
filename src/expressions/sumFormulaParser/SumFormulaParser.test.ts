import {SumFormulaParser} from './SumFormulaParser';

it('sum formula to operation', () => {
    expect(new SumFormulaParser('SUM(A1,A2,A3)').toOperation()).toEqual( 'A1+A2+A3');
    expect(new SumFormulaParser('SUM(A1,B2)').toOperation()).toEqual( 'A1+B2');
    expect(new SumFormulaParser('SUM(A1,B2) + 5').toOperation()).toEqual( 'A1+B2+5');
});

it('sum function with ranges to operation', () => {
    expect(new SumFormulaParser('SUM(A1:A3)').toOperation()).toEqual( 'A1+A2+A3');
    expect(new SumFormulaParser('SUM(A1:A1)').toOperation()).toEqual( 'A1');
    expect(new SumFormulaParser('SUM(A4:A7)').toOperation()).toEqual( 'A4+A5+A6+A7');
});

it('sum function should fail when no avg formula',   () => {
    try{
        new SumFormulaParser('A1:A3').toOperation()
    }catch(e){
        expect(e.toString()).toContain('Error');
    }
});

it('sum function should fail when invalid range',   () => {
    try{
        new SumFormulaParser('SUM(A4:A3)').toOperation()
    }catch(e){
        expect(e.toString()).toContain('Error');
    }
});