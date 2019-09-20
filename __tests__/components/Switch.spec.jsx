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
import Switch from '../../src/components/Switch';
import Case from '../../src/components/Case';

const childTextOne = 'Im component One!';
const childTextTwo = 'Im component Two!';
const childTextThree = 'Im component Three!';
const childTextFourFiveSix = 'Im component for Four Five and Six!';

const defaultProps = {};

const childOne = <Case value="one">{childTextOne}</Case>;
const childTwo = <Case value="two">{childTextTwo}</Case>;
const childThree = <Case value="three">{childTextThree}</Case>;
const childFourFiveSix = <Case value={['four', 'five', 'six']}>{childTextFourFiveSix}</Case>;
const childEdgeCase = <div>Im a div and Ive come to ruin your component!</div>;

const renderChildlessComp = props => shallow(<Switch {...defaultProps} {...props} />);

const renderCompSingleChild = props => shallow(
  <Switch {...defaultProps} {...props}>
    {childOne}
  </Switch>
);
const renderComp = props => shallow(
  <Switch {...defaultProps} {...props}>
    {childOne}
    {childTwo}
    {childThree}
    {childFourFiveSix}
  </Switch>
);

const renderCompWithEdgeCase = props => shallow(
  <Switch {...defaultProps} {...props}>
    {childOne}
    {childTwo}
    {childThree}
    {childEdgeCase}
  </Switch>
);

describe('Switch', () => {
  it('match and return only first child', () => {
    const component = renderComp({ on: 'one' });
    expect(component.children().length).toEqual(1);
    expect(component.children().text()).toEqual(childTextOne);
  });
  it('match and return only second child', () => {
    const component = renderComp({ on: 'two' });
    expect(component.children().length).toEqual(1);
    expect(component.children().text()).toEqual(childTextTwo);
  });
  it('match and return only third child', () => {
    const component = renderComp({ on: 'three' });
    expect(component.children().length).toEqual(1);
    expect(component.children().text()).toEqual(childTextThree);
  });
  it('matches on an array of values', () => {
    const componentValueFour = renderComp({ on: 'four' });
    expect(componentValueFour.children().length).toEqual(1);
    expect(componentValueFour.children().text()).toEqual(childTextFourFiveSix);

    const componentValueFive = renderComp({ on: 'five' });
    expect(componentValueFive.children().length).toEqual(1);
    expect(componentValueFive.children().text()).toEqual(childTextFourFiveSix);

    const componentValueSix = renderComp({ on: 'six' });
    expect(componentValueSix.children().length).toEqual(1);
    expect(componentValueSix.children().text()).toEqual(childTextFourFiveSix);
  });
  it('functions normally when give a single child', () => {
    const componentOne = renderCompSingleChild({ on: 'one' });
    expect(componentOne.children().length).toEqual(1);
    expect(componentOne.children().text()).toEqual(childTextOne);

    const componentTwo = renderCompSingleChild({ on: 'two' });
    expect(componentTwo.children().length).toEqual(0);
    expect(componentTwo.instance()).toBe(null);
  });
  it('return null when no matches', () => {
    const instance = renderComp({ on: 'five' }).instance();
    expect(instance).toBe(null);
  });
});

describe('Switch Exceptions', () => {
  it('throws error when Case is not immediate child', () => {
    expect(renderCompWithEdgeCase).toThrowError(
      `<Switch /> must only contain <Case/> children. Please wrap <${
        childEdgeCase.type
      }/> in a <Case/>`
    );
  });

  it('throws error when no children proivded to Switch', () => {
    expect(renderChildlessComp).toThrowError(
      '<Switch/> requires at least one <Case/> child component'
    );
  });
});
