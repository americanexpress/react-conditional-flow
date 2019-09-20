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
import { Switch, Case, Default } from 'react-conditional-flow';

const expressionString = 'mangoes';

const SwitchCase = () => (
  <Switch on={expressionString}>
    <Case value="Papayas">
      <div>Hello Papayas</div>
    </Case>
    <Case value="Mangoes">
      <div>Hello Mangoes</div>
    </Case>
    <Case value="Oranges">
      <div>Hello Oranges</div>
    </Case>
    <Default>
      <div>Default</div>
    </Default>
  </Switch>
);
