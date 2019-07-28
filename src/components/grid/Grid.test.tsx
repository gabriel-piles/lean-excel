import React from 'react';
import { shallow } from 'enzyme';
import {Grid} from "./Grid";

it('initialize grid', () => {
    const wrapper = shallow(<Grid cellValues={{A1: 'A1 value'}} setCellSelected={jest.fn} typingFormula={false}/>);
    expect(wrapper.find('.row').length).toEqual(50);
    expect(wrapper.find('.column').length).toEqual(26*50);
    expect(wrapper.findWhere(node => node.key() === 'A1').get(0).props.className).toContain('A1');
    expect(wrapper.findWhere(node => node.key() === 'A1').text()).toContain('A1 value');
});

it('update cell selected', () => {
    let cellSelectedSpy = jest.fn();
    const wrapper = shallow(<Grid cellValues={{A1: 'A1 value'}} setCellSelected={cellSelectedSpy} typingFormula={false}/>);

    wrapper.findWhere(node => node.key() === 'Z50').simulate('click', {currentTarget: {id: 'Z50'}});

    expect(cellSelectedSpy).toHaveBeenCalledWith('Z50');
});

it('highlight cell selected', () => {
    const wrapper = shallow(<Grid cellValues={{A1: 'A1 value'}} setCellSelected={jest.fn()} typingFormula={false}/>);

    expect(wrapper.findWhere(node => node.key() === 'A1').get(0).props.className).toContain('cell-selected');
    expect(wrapper.findWhere(node => node.key() === 'Z50').get(0).props.className).not.toContain('cell-selected');

    wrapper.findWhere(node => node.key() === 'Z50').simulate('click', {currentTarget: {id: 'Z50'}});

    expect(wrapper.findWhere(node => node.key() === 'A1').get(0).props.className).not.toContain('cell-selected');
    expect(wrapper.findWhere(node => node.key() === 'Z50').get(0).props.className).toContain('cell-selected');
});

it('not highlight other cell when typing formula', () => {
    const wrapper = shallow(<Grid cellValues={{A1: 'A1 value'}} setCellSelected={jest.fn()} typingFormula={true}/>);

    wrapper.findWhere(node => node.key() === 'Z50').simulate('click', {currentTarget: {id: 'Z50'}});

    expect(wrapper.findWhere(node => node.key() === 'Z50').get(0).props.className).not.toContain('cell-selected');
});