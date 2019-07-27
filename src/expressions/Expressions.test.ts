import {Expressions} from './Expressions';

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

    it('returns formula result when it is a number', () => {
        const expressions = new Expressions();

        expressions.set('A1', '=12');
        expressions.set('A2', '=13');
        expressions.set('A3', '=');
        expressions.set('A4', '=0.3333333333333333');

        expect(expressions.toValues().A1).toEqual( '12');
        expect(expressions.toValues().A2).toEqual( '13');
        expect(expressions.toValues().A3).toEqual( '0');
        expect(expressions.toValues().A4).toEqual( '0.3333333333333333');
    });

    it('returns formula result without spaces', () => {
        const expressions = new Expressions();

        expressions.set('A1', '= 1 2');
        expressions.set('A2', '=21 2  ');

        expect(expressions.toValues().A1).toEqual( '12');
        expect(expressions.toValues().A2).toEqual( '212');
    });

    it('returns #ERROR when the formula is not valid', () => {
        const expressions = new Expressions();

        expressions.set('A1', '=notvalidformula');
        expressions.set('A2', '=other not valid formula');
        expressions.set('A3', '=1=');

        expect(expressions.toValues().A1).toEqual( '#ERROR');
        expect(expressions.toValues().A2).toEqual( '#ERROR');
        expect(expressions.toValues().A3).toEqual( '#ERROR');
    });

    it('returns value from other key', () => {
        const expressions = new Expressions();

        expressions.set('A1', '1');
        expressions.set('A2', '=A1');

        expect(expressions.toValues().A1).toEqual( '1');
        expect(expressions.toValues().A2).toEqual( '1');
    });

    it('sums values', () => {
        const expressions = new Expressions();

        expressions.set('A1', '= 1 + 3');
        expressions.set('A2', '=2 + 3');
        expressions.set('A3', '= 2 + 3 + 1');
        expressions.set('A4', '= 10 + A1');

        expect(expressions.toValues().A1).toEqual( '4');
        expect(expressions.toValues().A2).toEqual( '5');
        expect(expressions.toValues().A3).toEqual( '6');
        expect(expressions.toValues().A4).toEqual( '14');
    });

    it('substract values', () => {
        const expressions = new Expressions();

        expressions.set('A1', '= 1 - 3');
        expressions.set('A2', '= 10 - 2 -5');
        expressions.set('A3', '= 10 - A1');
        expressions.set('A4', '=  - 3');

        expect(expressions.toValues().A1).toEqual( '-2');
        expect(expressions.toValues().A2).toEqual( '3');
        expect(expressions.toValues().A3).toEqual( '12');
        expect(expressions.toValues().A4).toEqual( '-3');
    });

    it('divide values', () => {
        const expressions = new Expressions();

        // expressions.set('A1', '= 1 / 3');
        expressions.set('A2', '= 2 / - 3');
        // expressions.set('A3', '= 1 / A1');
        // expressions.set('A4', '= 1 / 0.5');
        // expressions.set('A5', '= 1 + 1 / 0.5');
        // expressions.set('A6', '= 1 - 1 / 0.5');

        // expect(expressions.toValues().A1).toEqual( '0.3333333333333333');
        expect(expressions.toValues().A2).toEqual( '-0.6666666666666666');
        // expect(expressions.toValues().A3).toEqual( '3');
        // expect(expressions.toValues().A4).toEqual( '2');
        // expect(expressions.toValues().A5).toEqual( '3');
        // expect(expressions.toValues().A6).toEqual( '-1');
    });
});