import React from 'react';
import { shallow } from 'enzyme';
import {Grid} from "./Grid";

it('initialize grid', () => {
    const wrapper = shallow(<Grid cellValues={{A1: 'A1 value'}} setCellSelected={jest.fn}/>);
    expect(wrapper.find('.row').length).toEqual(50);
    expect(wrapper.find('.column').length).toEqual(26*50);
    expect(wrapper.find('.column').get(0).props.className).toContain('A1');
});