import React from 'react';
import { mount } from 'enzyme';
import App from './App';

it.skip('cell value is the sum of two other cells', () => {
    const wrapper = mount(<App />);
    wrapper.find('.A1').simulate('click');
    wrapper.find('.inputBox').get(0).instance().value = "1";

    wrapper.find('.A2').simulate('click');
    wrapper.find('.inputBox').get(0).instance().value = "2";

    wrapper.find('.A3').simulate('click');
    wrapper.find('.inputBox').get(0).instance().value = "= A1 + A2";

    wrapper.find('.A3').simulate('click');

    expect(wrapper.find('.A3').text()).toEqual('3');
});