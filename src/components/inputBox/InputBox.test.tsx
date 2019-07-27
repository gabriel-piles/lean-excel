import React from 'react';
import { shallow } from 'enzyme';
import {InputBox} from './InputBox';

it('display expression', () => {
    const wrapper = shallow(<InputBox cellSelected={'A1'} expression={'expression'} updateCellExpression={jest.fn()}/>);
    expect(wrapper.find('.input-box').props().value).toEqual('expression')
});

it('display cell selected', () => {
    const wrapper = shallow(<InputBox cellSelected={'A1'} expression={'expression'} updateCellExpression={jest.fn()}/>);
    expect(wrapper.find('.cell-name').text()).toEqual('A1')
});

it('call update function on change', () => {
    let updateCellExpressionSpy = jest.fn();
    const wrapper = shallow(<InputBox cellSelected={'A1'} expression={'expression'} updateCellExpression={updateCellExpressionSpy}/>);
    wrapper.find('.input-box').simulate('change', {target: {value: 'other expression'}});
    expect(updateCellExpressionSpy).toHaveBeenCalledWith('other expression');
});