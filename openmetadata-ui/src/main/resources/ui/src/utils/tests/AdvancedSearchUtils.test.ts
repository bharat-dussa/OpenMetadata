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

import { AdvancedFields } from '../../enums/AdvancedSearch.enum';
import {
  getAdvancedField,
  getDropDownItems,
  getItemLabel,
} from '../AdvancedSearchUtils';

const searchIndex = 'table_search_index';
const itemLabel = {
  label: 'Owner',
  key: 'owner.name',
};
const dropDownActualOutput = [
  {
    label: 'Column',
    key: 'columns.name',
  },
  {
    label: 'Schema',
    key: 'databaseSchema.name',
  },
  {
    label: 'Database',
    key: 'database.name',
  },
  {
    label: 'Owner',
    key: 'owner.name',
  },
  {
    label: 'Tag',
    key: 'tags',
  },
  {
    label: 'Service',
    key: 'service.name',
  },
];

describe('utils | AdvancedSearchUtils', () => {
  it('AdvancedSearchUtils | getDropDownItems, with valid index it should return dropDownItems', () => {
    const dropDownItems = getDropDownItems(searchIndex);

    expect(dropDownItems).toEqual(dropDownActualOutput);
  });

  it('AdvancedSearchUtils | getDropDownItems, with non-valid index it should return empty array', () => {
    const dropDownItems = getDropDownItems('');

    expect(dropDownItems).toEqual([]);
  });
});

describe('utils | getItemLabel', () => {
  it('AdvancedSearchUtils | getItemLabel, with valid string it should return string', () => {
    const label = getItemLabel(itemLabel.key);

    expect(label).toEqual(itemLabel.label);
  });

  it('AdvancedSearchUtils | getItemLabel, with non-valid string it should return undefined', () => {
    const label = getItemLabel('');

    expect(label).toEqual('label');
  });
});

describe('utils | getAdvancedField', () => {
  it('AdvancedSearchUtils | getAdvancedField, with valid field it should return string', () => {
    const field = getAdvancedField('columns.name');

    expect(field).toEqual(AdvancedFields.COLUMN);
  });

  it('AdvancedSearchUtils | getAdvancedField, with non-valid field it should return advancedField', () => {
    const field = getAdvancedField('');

    expect(field).toEqual(undefined);
  });
});
