import React from 'react';
import { shallow } from 'enzyme';
import OverflowWrapper from '../index';

const items = [
  'apple',
  'grape',
  'banana',
  'melon',
  'kiwi',
  'peach',
  'mango',
  'tomato',
  'pineapple',
  'blueberry',
  'avocado',
  'papaya',
  'pear',
];

describe('react-overflow-wrapper', () => {
  let component = null;

  it('renders correctly', () => {
    component = shallow(
      <OverflowWrapper style={{ width: 300, height: 40 }}>
        {items.map(el => (
          <div key={el} style={{ margin: '0 10px' }}>
            {el}
          </div>
        ))}
      </OverflowWrapper>,
    );
    component.setState({
      isOverflow: true,
      wrapWidth: 600,
    });
  });

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });

  describe('right icon', () => {
    it('has a right icon', () => {
      expect(
        component.find('.react-overflow-wrapper__icon-right').exists(),
      ).toBe(true);
    });
    it('simulates right icon click', () => {
      component.find('.react-overflow-wrapper__icon-right').simulate('click', {
        preventDefault: () => {},
        stopPropagation: () => {},
      });
      expect(component.state().x).toBe(-100);
    });
  });

  describe('left icon', () => {
    it('has a left icon', () => {
      component.setState({
        x: -200,
      });
      expect(
        component.find('.react-overflow-wrapper__icon-left').exists(),
      ).toBe(true);
    });
    it('simulates left icon click', () => {
      component.find('.react-overflow-wrapper__icon-left').simulate('click', {
        preventDefault: () => {},
        stopPropagation: () => {},
      });
      expect(component.state().x).toBe(-100);
    });
  });
});
