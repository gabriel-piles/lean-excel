import {Key} from './Key';

it('valid key', () => {
    expect(new Key('5').valid()).toEqual(false);
    expect(new Key('A1').valid()).toEqual(true);
    expect(new Key('Z50').valid()).toEqual(true);
    expect(new Key('a1').valid()).toEqual(false);
    expect(new Key('Z51').valid()).toEqual(false);
    expect(new Key('ZZ5').valid()).toEqual(false);
});

it('row number', () => {
    expect(new Key('A1').getRowNumber()).toEqual(1);
    expect(new Key('B34').getRowNumber()).toEqual(34);
    expect(new Key('Z51').getRowNumber()).toEqual(51);
});

it('column', () => {
    expect(new Key('A1').getColumn()).toEqual('A');
    expect(new Key('B34').getColumn()).toEqual('B');
    expect(new Key('Z51').getColumn()).toEqual('Z');
});

it('get range keys ', () => {
    expect(Key.getRange('A1:A3')).toEqual(['A1', 'A2', 'A3']);
    expect(Key.getRange('A2:A5')).toEqual(['A2', 'A3', 'A4', 'A5']);
    expect(Key.getRange('A1:A1')).toEqual(['A1']);
    expect(Key.getRange('A1:B3')).toEqual([]);
    expect(Key.getRange('A3:A1')).toEqual([]);
});


