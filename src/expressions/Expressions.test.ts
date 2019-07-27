import {Expressions} from './Expressions';

it('get empty string when no value', () => {
    const expressions = new Expressions();
    expect(expressions.get('key')).toEqual('');
});

it('add expressions to expressions', () => {
    const expressions = new Expressions();

    expressions.set('key1', 'value1');
    expressions.set('key2', 'value2');

    expect(expressions.get('key1')).toEqual('value1');
    expect(expressions.get('key2')).toEqual('value2');
});

describe('Expressions to values', () => {

    it('returns expression when no formula', () => {
        const expressions = new Expressions();

        expressions.set('key1', 'value1');
        expressions.set('key2', 'value2');

        expect(expressions.toValues().key1).toEqual( 'value1');
        expect(expressions.toValues().key2).toEqual( 'value2');
    });

    it('returns formula result when it is a number', () => {
        const expressions = new Expressions();

        expressions.set('key1', '=12');
        expressions.set('key2', '12=');

        expect(expressions.toValues().key1).toEqual( '12');
        expect(expressions.toValues().key2).toEqual( '12=');
    });

    it('returns #ERROR when the formula is not valid', () => {
        const expressions = new Expressions();

        expressions.set('key1', '=notvalidformula');
        expressions.set('key2', '=other not valid formul;a');

        expect(expressions.toValues().key1).toEqual( '#ERROR');
        expect(expressions.toValues().key2).toEqual( '#ERROR');
    });

});