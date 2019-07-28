import {AvgFormulaParser} from "./AvgFormulaParser";

it('avg formula to operation', () => {
    expect(new AvgFormulaParser('AVG(A1,A2,A3)').toOperation()).toEqual( 'A1/3+A2/3+A3/3');
    expect(new AvgFormulaParser('AVG(A1,B2)').toOperation()).toEqual( 'A1/2+B2/2');
    expect(new AvgFormulaParser('AVG(A1,B2) + 5').toOperation()).toEqual( 'A1/2+B2/2+5');
    expect(new AvgFormulaParser('AVG(A1,10)').toOperation()).toEqual( 'A1/2+10/2');
});

it('avg function with ranges to operation',  () => {
    expect(new AvgFormulaParser('AVG(A1:A3)').toOperation()).toEqual( 'A1/3+A2/3+A3/3');
    expect(new AvgFormulaParser('AVG(A1:A1)').toOperation()).toEqual( 'A1/1');
    expect(new AvgFormulaParser('AVG(A4:A7)').toOperation()).toEqual( 'A4/4+A5/4+A6/4+A7/4');
});

it('avg function should fail when no avg formula',   () => {
    try{
        new AvgFormulaParser('A1:A3').toOperation()
    }catch(e){
        expect(e.toString()).toContain('Error');
    }
});

it('avg function should fail when invalid range',   () => {
    try{
        new AvgFormulaParser('AVG(A4:A3)').toOperation()
    }catch(e){
        expect(e.toString()).toContain('Error');
    }
});