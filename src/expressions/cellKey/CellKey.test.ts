import {CellKey} from './CellKey';

it('valid key', () => {
    expect(new CellKey('5').valid()).toEqual(false);
    expect(new CellKey('A1').valid()).toEqual(true);
    expect(new CellKey('Z50').valid()).toEqual(true);
    expect(new CellKey('a1').valid()).toEqual(false);
    expect(new CellKey('Z51').valid()).toEqual(false);
    expect(new CellKey('ZZ5').valid()).toEqual(false);
});

it('row number', () => {
    expect(new CellKey('A1').getRowNumber()).toEqual(1);
    expect(new CellKey('B34').getRowNumber()).toEqual(34);
    expect(new CellKey('Z51').getRowNumber()).toEqual(51);
});

it('column', () => {
    expect(new CellKey('A1').getColumn()).toEqual('A');
    expect(new CellKey('B34').getColumn()).toEqual('B');
    expect(new CellKey('Z51').getColumn()).toEqual('Z');
});

it('get next key ', () => {
    expect(new CellKey('A1').getNextKey()).toEqual('A2');
    expect(new CellKey('A50').getNextKey()).toEqual('A50');
});

it('get range keys ', () => {
    expect(CellKey.getRange('A1:A3')).toEqual(['A1', 'A2', 'A3']);
    expect(CellKey.getRange('A2:A5')).toEqual(['A2', 'A3', 'A4', 'A5']);
    expect(CellKey.getRange('A1:A1')).toEqual(['A1']);
    expect(CellKey.getRange('A1:B3')).toEqual([]);
    expect(CellKey.getRange('A3:A1')).toEqual([]);
});


