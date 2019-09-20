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
import EliseIf from '../../src/components/ElseIf';

const one = 'Im component One!';
const two = 'Hello from two';
const three = 'Hello from three';

const condArr = (bOne, bTwo, bThree) => [
  { if: bOne, render: <p>{one}</p> },
  { if: bTwo, render: <p>{two}</p> },
  { if: bThree, render: <p>{three}</p> },
];

const defaultProps = {};

const renderComp = props => shallow(<EliseIf {...defaultProps} {...props} />);

describe('EliseIf', () => {
  it('last condition should render', () => {
    const conditions = condArr(false, false, true);
    const component = renderComp({ conditions });
    expect(component.text()).toEqual(three);
  });

  it('second condition should render', () => {
    const conditions = condArr(false, true, true);
    const component = renderComp({ conditions });
    expect(component.text()).toEqual(two);
  });

  it('first condition should render', () => {
    const conditions = condArr(true, true, true);
    const component = renderComp({ conditions });
    expect(component.text()).toEqual(one);
  });

  it('fallback should render when all cases are false', () => {
    const conditions = condArr(false, false, false);
    const component = renderComp({ conditions });
    expect(component.text()).toEqual('');
  });

  it('fallback should render', () => {
    const component = renderComp({ conditions: [], else: <p>Fallback rendered</p> });
    expect(component.text()).toEqual('Fallback rendered');
  });

  it('null should render', () => {
    const component = renderComp({ conditions: [] });
    expect(component.text()).toEqual('');
  });

  it('handles single if case', () => {
    const component = renderComp({ if: true, render: <p>{one}</p> });
    expect(component.text()).toEqual(one);
  });
});
