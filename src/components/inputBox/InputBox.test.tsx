import React from 'react';
import {shallow} from 'enzyme';
import {InputBox} from './InputBox';

it('display expression', () => {
    const wrapper = shallow(<InputBox cellSelected={'A1'} expression={'expression'} updateCellExpression={jest.fn()}/>);
    expect(wrapper.find('.input-box').props().defaultValue).toEqual('expression');
});

it('display cell selected', () => {
    const wrapper = shallow(<InputBox cellSelected={'A1'} expression={'expression'} updateCellExpression={jest.fn()} />);
    expect(wrapper.find('.label').text()).toEqual('A1')
});

it('call update function on enter pressed', () => {
    let updateCellExpressionSpy = jest.fn();
    const wrapper = shallow(<InputBox cellSelected={'A1'}
                                      expression={'expression'}
                                      updateCellExpression={updateCellExpressionSpy} />);
    wrapper.find('.input-box').simulate('keypress', {key:'Enter', target: {value: 'other expression'}});
    expect(updateCellExpressionSpy).toHaveBeenCalledWith('other expression');
});