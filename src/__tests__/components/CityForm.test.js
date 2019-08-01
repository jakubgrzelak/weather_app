import 'jsdom-global/register';
import React from 'react';
import { shallow, mount } from 'enzyme';
import CityForm from '../../components/CityForm';

test('should render city form correctly', () => {
  const wrapper = shallow(<CityForm />);
  expect(wrapper.debug()).toMatchSnapshot();
});

test('should render ExpenseForm correctly with expense data', () => {
  const wrapper = mount(<CityForm values={{ name: 'London'}} />);
  expect(wrapper.debug()).toMatchSnapshot();
});

// test('should set description on input change', () => {
//   const value = 'London';
//   const wrapper = mount(<CityForm />);
//   wrapper.find('input').at(0).simulate('change', {
//     target: { value }
//   });
//   expect(wrapper.props('values')).toBe({ name: value});
// });