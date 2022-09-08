/*
 *  Copyright 2022 Collate
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *  http://www.apache.org/licenses/LICENSE-2.0
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

import { getTeamTypeOptions } from './TeamTypeSelect.utils';

const showGroupOption = true;

const resolvedValue = [
  { label: 'BusinessUnit', value: 'BusinessUnit' },
  { label: 'Department', value: 'Department' },
  { label: 'Division', value: 'Division' },
  { label: 'Group', value: 'Group' },
];

const showGroupOptionExcludeGroup = [
  { label: 'BusinessUnit', value: 'BusinessUnit' },
  { label: 'Department', value: 'Department' },
  { label: 'Division', value: 'Division' },
];

describe('getTeamTypeOptions utils', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('if showGroupOption, it should return an array of objects with a label and value property.', async () => {
    const returnValue = getTeamTypeOptions(showGroupOption);

    expect(returnValue).toEqual(resolvedValue);
  });

  it('if not showGroupOption, it should return an array of objects with a label and value property exclude Group label', async () => {
    const returnValue = getTeamTypeOptions(!showGroupOption);

    expect(returnValue).toEqual(showGroupOptionExcludeGroup);
  });
});
