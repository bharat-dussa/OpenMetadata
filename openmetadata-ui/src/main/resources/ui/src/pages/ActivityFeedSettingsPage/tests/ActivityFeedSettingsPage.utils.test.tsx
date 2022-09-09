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

import { EventFilter } from '../../../generated/settings/settings';
import { getEventFilterFromTree } from '../ActivityFeedSettingsPage.utils';

const mockData = {
  updatedTree: {
    table: [
      'table-entityCreated',
      'table-entityUpdated-owner',
      'table-entityUpdated-tags',
      'table-entityUpdated-followers',
      'table-entityDeleted',
      'table-entitySoftDeleted',
    ],
  },
  eventFilters: [
    {
      entityType: 'table',
      filters: [
        {
          eventType: 'entityCreated',
          include: ['all'],
          exclude: [],
        },
        {
          eventType: 'entityUpdated',
          include: ['description', 'owner', 'tags', 'followers'],
          exclude: [],
        },
        {
          eventType: 'entityDeleted',
          include: ['all'],
          exclude: [],
        },
        {
          eventType: 'entitySoftDeleted',
          include: ['all'],
          exclude: [],
        },
      ],
    },
  ] as EventFilter[],
};

const actualResponse = [
  {
    entityType: 'table',
    filters: [
      {
        eventType: 'entityCreated',
        include: ['all'],
        exclude: [],
      },
      {
        eventType: 'entityUpdated',
        include: ['owner', 'tags', 'followers'],
        exclude: ['description'],
      },
      {
        eventType: 'entityDeleted',
        include: ['all'],
        exclude: [],
      },
      {
        eventType: 'entitySoftDeleted',
        include: ['all'],
        exclude: [],
      },
    ],
  },
];

jest.mock('../../../utils/CommonUtils.tsx', () => ({
  getDiffArray: jest.fn(),
}));

jest.mock('lodash', () => ({
  isUndefined: jest.fn(),
  isEmpty: jest.fn(),
  xor: jest.fn(),
}));

describe('ActivityFeedSettingsPage.utils', () => {
  it('getEventFilterFromTree should return appropriate data with valid arguments', () => {
    const modifiedData = getEventFilterFromTree(
      mockData.updatedTree,
      mockData.eventFilters
    );
    const stringifiedData = JSON.stringify(modifiedData);
    const stringifiedPayload = JSON.stringify(actualResponse);

    expect(stringifiedData).toEqual(stringifiedPayload);
  });
});
