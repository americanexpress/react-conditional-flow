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

import ElseIf from '../src/components/ElseIf';
import TryCatch from '../src/components/TryCatch';
import Switch from '../src/components/Switch';
import Case from '../src/components/Case';
import Default from '../src/components/Default';
import ModuleContainer from '../src';

describe('index', () => {
  it('Should export ElseIf', () => {
    expect(ModuleContainer.ElseIf).toEqual(ElseIf);
  });
  it('Should export TryCatch', () => {
    expect(ModuleContainer.TryCatch).toEqual(TryCatch);
  });
  it('Should export Switch', () => {
    expect(ModuleContainer.Switch).toEqual(Switch);
  });
  it('Should export Case', () => {
    expect(ModuleContainer.Case).toEqual(Case);
  });
  it('Should export Default', () => {
    expect(ModuleContainer.Default).toEqual(Default);
  });
});
