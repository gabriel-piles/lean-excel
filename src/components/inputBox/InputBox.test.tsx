import React from 'react';
import {shallow} from 'enzyme';
import {InputBox} from './InputBox';

it('display expression', () => {
    const wrapper = shallow(<InputBox cellSelected={'A1'} expression={'expression'} updateCellExpression={jest.fn()}
    setTypingFormula={jest.fn()}/>);
    expect(wrapper.find('.input-box').props().value).toEqual('expression');
});

it('display cell selected', () => {
    const wrapper = shallow(<InputBox cellSelected={'A1'} expression={'expression'} updateCellExpression={jest.fn()}
                                      setTypingFormula={jest.fn}/>);
    expect(wrapper.find('.cell-name').text()).toEqual('A1')
});

it('call update function on change', () => {
    let updateCellExpressionSpy = jest.fn();
    const wrapper = shallow(<InputBox cellSelected={'A1'}
                                      expression={'expression'}
                                      updateCellExpression={updateCellExpressionSpy}
                                      setTypingFormula={jest.fn}/>);
    wrapper.find('.input-box').simulate('change', {target: {value: 'other expression'}});
    expect(updateCellExpressionSpy).toHaveBeenCalledWith('other expression');
});

it('set typing formula to true when formula', () => {
    let typingFormulaSpy = jest.fn();
    const wrapper = shallow(<InputBox
        cellSelected={'A1'}
        expression={'expression'}
        updateCellExpression={jest.fn()}
        setTypingFormula={typingFormulaSpy}/>);
    wrapper.find('.input-box').simulate('change', {target: {value: '=formula'}});
    expect(typingFormulaSpy).toHaveBeenCalledWith(true);
});

it('set typing formula to false when no formula', () => {
    let typingFormulaSpy = jest.fn();
    const wrapper = shallow(<InputBox
        cellSelected={'A1'}
        expression={'expression'}
        updateCellExpression={jest.fn()}
        setTypingFormula={typingFormulaSpy}/>);
    wrapper.find('.input-box').simulate('change', {target: {value: 'no formula'}});
    expect(typingFormulaSpy).toHaveBeenCalledWith(false);
});

it('add cell to formula when typingFormula', () => {
    let updateCellExpressionSpy = jest.fn();
    const wrapper = shallow(<InputBox
        cellSelected={'A1'}
        expression={'expression'}
        updateCellExpression={updateCellExpressionSpy}
        setTypingFormula={jest.fn()}/>);
    wrapper.find('.input-box').simulate('change', {target: {value: '='}});
    wrapper.setProps({cellSelected: 'B1'})
    expect(updateCellExpressionSpy).toHaveBeenCalledWith('=B1');
});