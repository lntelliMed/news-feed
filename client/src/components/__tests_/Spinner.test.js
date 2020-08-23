import React from 'react';
import { mount } from 'enzyme';

import Spinner from '../layout/Spinner';

// TODO: Complete testing other components..

let wrapped;

describe('the Spinner component', () => {
  beforeEach(() => {
    wrapped = mount(<Spinner />);
  });

  afterEach(() => {
    wrapped.unmount();
  });

  it('has three divs', () => {
    expect(wrapped.find('div').length).toEqual(3);
  });
});
