import {Expressions} from './Expressions';

const ERROR_MESSAGE = '#ERROR';

it('get empty string when no value', () => {
    const expressions = new Expressions();
    expect(expressions.get('key')).toEqual('');
});

it('add expressions to expressions', () => {
    const expressions = new Expressions();

    expressions.set('A1', 'value1');
    expressions.set('A2', 'value2');

    expect(expressions.get('A1')).toEqual('value1');
    expect(expressions.get('A2')).toEqual('value2');
});

describe('Expressions to values', () => {

    it('returns expression when no formula', () => {
        const expressions = new Expressions();

        expressions.set('A1', 'value1');
        expressions.set('A2', 'value2');

        expect(expressions.toValues().A1).toEqual( 'value1');
        expect(expressions.toValues().A2).toEqual( 'value2');
    });

    it('returns formula result when it is an operation', () => {
        const expressions = new Expressions();

        expressions.set('A1', '=12');
        expressions.set('A2', '=13');
        expressions.set('A3', '=');
        expressions.set('A4', '=0.3333333333333333');
        expressions.set('A5', '=(((1 + 6 /2) * 2) - 1)/2');

        expect(expressions.toValues().A1).toEqual( '12');
        expect(expressions.toValues().A2).toEqual( '13');
        expect(expressions.toValues().A3).toEqual( '0');
        expect(expressions.toValues().A4).toEqual( '0.3333333333333333');
        expect(expressions.toValues().A5).toEqual( '3.5');
    });

    it('returns #ERROR when the formula is not valid', () => {
        const expressions = new Expressions();

        expressions.set('A1', '=notvalidformula');
        expressions.set('A2', '=other not valid formula');
        expressions.set('A3', '=1=');

        expect(expressions.toValues().A1).toEqual( ERROR_MESSAGE);
        expect(expressions.toValues().A2).toEqual( ERROR_MESSAGE);
        expect(expressions.toValues().A3).toEqual( ERROR_MESSAGE);
    });

    it('returns value from other key', () => {
        const expressions = new Expressions();

        expressions.set('A1', '1');
        expressions.set('A2', '=A1');
        expressions.set('A3', '= A1');
        expressions.set('A4', '= A2');
        expressions.set('A5', '= A4 + A2');
        expressions.set('Z49', '= 4');
        expressions.set('Z50', '= Z49');
        expressions.set('B2', '= Z51');
        expressions.set('B3', '= B4');

        expect(expressions.toValues().A1).toEqual( '1');
        expect(expressions.toValues().A2).toEqual( '1');
        expect(expressions.toValues().A3).toEqual( '1');
        expect(expressions.toValues().A4).toEqual( '1');
        expect(expressions.toValues().A5).toEqual( '2');
        expect(expressions.toValues().Z49).toEqual( '4');
        expect(expressions.toValues().Z50).toEqual( '4');
        expect(expressions.toValues().B2).toEqual( ERROR_MESSAGE);
        expect(expressions.toValues().B3).toEqual( '0');
    });

    it('sum function', () => {
        const expressions = new Expressions();

        expressions.set('A1', '1');
        expressions.set('A2', '2');
        expressions.set('A3', '3');
        expressions.set('A4', '=SUM(A1,A2,A3)');
        expressions.set('A5', '=SUM(A1,-2)');
        expressions.set('A6', '=SUM(A1) * 2');

        expect(expressions.toValues().A4).toEqual( '6');
        expect(expressions.toValues().A5).toEqual( '-1');
        expect(expressions.toValues().A6).toEqual( '2');
    });

    it('sum function with ranges', () => {
        const expressions = new Expressions();

        expressions.set('A1', '1');
        expressions.set('A2', '2');
        expressions.set('A3', '3');
        expressions.set('A4', '=SUM(A1:A3)');
        expressions.set('A5', '=SUM(A50:A55)');
        expressions.set('A6', '=SUM(A50:A49)');
        expressions.set('A7', '=SUM(A1:B2)');
        expressions.set('A8', '=SUM(A1:A1)');

        expect(expressions.toValues().A4).toEqual( '6');
        expect(expressions.toValues().A4).toEqual( '6');
        expect(expressions.toValues().A5).toEqual( ERROR_MESSAGE);
        expect(expressions.toValues().A6).toEqual( ERROR_MESSAGE);
        expect(expressions.toValues().A7).toEqual( ERROR_MESSAGE);
        expect(expressions.toValues().A8).toEqual( '1');
    });
});