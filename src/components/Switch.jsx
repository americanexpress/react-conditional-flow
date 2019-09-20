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

const Switch = ({ on, children }) => {
  if (!children) {
    throw new Error('<Switch/> requires at least one <Case/> child component');
  }

  const arrChildren = Array.isArray(children) ? children : [children];
  const badChild = arrChildren.find(child => !['Case', 'Default'].includes(child.type.name));

  if (badChild) {
    throw new Error(
      `<Switch /> must only contain <Case/> children. Please wrap <${badChild.type}/> in a <Case/>`
    );
  }

  const firstMatch = arrChildren.find((child) => {
    const { value } = child.props;
    if (Array.isArray(value)) return value.includes(on);
    return value === on;
  });
  if (firstMatch) return firstMatch;

  const defaultComp = arrChildren.find(child => child.type.name === 'Default');
  return defaultComp || null;
};

export default Switch;
