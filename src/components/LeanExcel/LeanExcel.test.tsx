import React from 'react';
import { shallow } from 'enzyme';
import {LeanExcel} from './LeanExcel';

it('change cell value', () => {
    const wrapper = shallow(<LeanExcel />);
    wrapper.find('Grid').props<>().setCellSelected('A1');
    wrapper.find('InputBox').props<>().updateCellExpression('1');

    expect(wrapper.find('Grid').props<>().cellValues).toEqual({A1: '1'})
});