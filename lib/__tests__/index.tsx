import React from 'react';
import { shallow } from 'enzyme';
import OverflowWrapper from '../index';

describe('index', () => {
  let component = null;

  it('renders correctly', () => {
    component = shallow(
      <OverflowWrapper>
        <div>test1</div>
        <div>test2</div>
      </OverflowWrapper>,
    );
  });

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
