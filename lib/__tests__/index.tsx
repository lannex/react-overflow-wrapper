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

  beforeEach(() => {
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

  it('renders correctly', () => {
    expect(component.length).toBe(1);
  });

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });

  describe('mouse events', () => {
    it('should call handleMouseDown()', () => {
      component.find('.react-overflow-wrapper__content').simulate('mousedown', {
        type: 'mousedown',
        pageX: 100,
      });
      expect(component.state().isDragging).toBe(true);
    });

    it('should call handleMouseUp()', () => {
      component.setState({
        isDragging: true,
      });
      component.find('.react-overflow-wrapper__content').simulate('mouseup');
      expect(component.state().isDragging).toBe(false);
    });

    it('should call handleWheel()', () => {
      component.setState({
        x: -110,
      });
      component
        .find('.react-overflow-wrapper__content')
        .simulate('wheel', { deltaX: -100 });
      expect(component.state().x).toBe(-106);
    });
  });

  describe('touch events', () => {
    it('should call handleMouseDown() a touch', () => {
      component
        .find('.react-overflow-wrapper__content')
        .simulate('touchstart', {
          type: 'touchstart',
          changedTouches: [{ pageX: 100 }],
        });
      expect(component.state().isDragging).toBe(true);
    });

    it('should call handleMouseUp() a touch', () => {
      component.setState({
        isDragging: true,
      });
      component.find('.react-overflow-wrapper__content').simulate('touchend');
      expect(component.state().isDragging).toBe(false);
    });
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
      component.setState({
        x: -200,
      });
      component.find('.react-overflow-wrapper__icon-left').simulate('click', {
        preventDefault: () => {},
        stopPropagation: () => {},
      });
      expect(component.state().x).toBe(-100);
    });
  });
});
