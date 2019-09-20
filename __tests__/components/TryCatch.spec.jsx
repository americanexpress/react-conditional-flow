/* eslint-disable no-undef, react/jsx-one-expression-per-line */

/*
 * Copyright 2019 American Express Travel Related Services Company, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License
 * is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
 * or implied. See the License for the specific language governing permissions and limitations under
 * the License.
 */

import React from 'react';
import { shallow } from 'enzyme';
import TryCatch from '../../src/components/TryCatch';

const one = () => 'Im component One!';
const two = () => `Hello from two${bob}`;
const three = lasagna => `Hello from three${lasagna()}`;

const defaultProps = {};

const renderComp = props => shallow(<TryCatch {...defaultProps} {...props} />);

describe('TryCatch', () => {
  it('successfully renders when no error is thrown', () => {
    const component = renderComp({ try: one });
    expect(component.text()).toEqual(one());
  });

  it('renders default catch when error is caught', () => {
    try {
      renderComp({ try: two });
    } catch (e) {
      expect(e).toEqual(new Error('ReferenceError: bob is not defined'));
    }
  });

  it('renders custom catch when error is caught', () => {
    const catcher = e => <span>I got the error: {e.message}</span>;
    const component = renderComp({ try: three, catch: catcher });
    expect(component.text()).toEqual('I got the error: lasagna is not a function');
  });
});
