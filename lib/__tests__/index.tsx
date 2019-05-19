import React from 'react';
import { shallow } from 'enzyme';
import OverflowWrapper from '../index';

describe('index', () => {
  let component = null;

  it('renders correctly', () => {
    component = shallow(
      <OverflowWrapper style={{ width: 300, height: 40 }}>
        <div>test1</div>
        <div>test2</div>
        <div>test3</div>
        <div>test4</div>
        <div>test5</div>
        <div>test6</div>
        <div>test7</div>
        <div>test8</div>
        <div>test9</div>
      </OverflowWrapper>,
    );
  });

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
