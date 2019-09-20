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

import {
  arrayOf, shape, bool, element,
} from 'prop-types';

const ElseIf = ({
  if: singleCondition, render: singleRender, conditions, else: fallback,
}) => {
  let render;
  if (singleCondition) {
    render = singleRender;
  }
  if (!singleCondition && conditions.length > 0) {
    ({ render } = conditions.find(o => o.if) || { render: null });
  }

  return render || fallback;
};

ElseIf.propTypes = {
  if: bool,
  render: element,
  conditions: arrayOf(shape({ if: bool.isRequired, render: element.isRequired })),
  else: element,
};

ElseIf.defaultProps = {
  if: false,
  render: null,
  conditions: [],
  else: null,
};

export default ElseIf;
