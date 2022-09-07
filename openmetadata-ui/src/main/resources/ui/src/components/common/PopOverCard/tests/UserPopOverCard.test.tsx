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

import React from 'react';
import renderer from 'react-test-renderer';
import { getNonDeletedTeams } from '../../../../utils/CommonUtils';
import UserPopOverCard from '../UserPopOverCard';

const mockPushFunction = jest.fn();

const mockGetUserByName = {
  id: 'f4f7a696-c479-4784-9896-8f30d12e74e1',
  name: 'aaron_johnson0',
  fullyQualifiedName: 'aaron_johnson0',
  displayName: 'Aaron Johnson',
  version: 0.2,
  updatedAt: 1662539885006,
  updatedBy: 'anonymous',
  email: 'aaron_johnson0@gmail.com',
  href: 'http://localhost:8585/api/v1/users/f4f7a696-c479-4784-9896-8f30d12e74e1',
  isAdmin: true,
  teams: [
    {
      id: '66e75cf1-27c1-44ed-a74e-54486f8aef8c',
      type: 'team',
      name: 'Cloud_Infra',
      fullyQualifiedName: 'Cloud_Infra',
      description: 'This is Cloud_Infra description.',
      displayName: 'Cloud_Infra',
      deleted: false,
      href: 'http://localhost:8585/api/v1/teams/66e75cf1-27c1-44ed-a74e-54486f8aef8c',
    },
  ],
  owns: [
    {
      id: 'bd2417c7-5325-4e4d-a31e-cabf8e3420cb',
      type: 'testCase',
      name: 'raw_order_TableColumnCountToBeBetween',
      fullyQualifiedName:
        'sample_data.ecommerce_db.shopify.raw_order.raw_order_TableColumnCountToBeBetween',
      description: '',
      deleted: false,
      href: 'http://localhost:8585/api/v1/testCase/bd2417c7-5325-4e4d-a31e-cabf8e3420cb',
    },
  ],
  follows: [],
  changeDescription: {
    fieldsAdded: [],
    fieldsUpdated: [{ name: 'isAdmin', oldValue: false, newValue: true }],
    fieldsDeleted: [],
    previousVersion: 0.1,
  },
  deleted: false,
  roles: [],
  inheritedRoles: [
    {
      id: '7b1c1aa2-1df9-4522-8d8b-da62d2241c08',
      type: 'role',
      name: 'DataConsumer',
      fullyQualifiedName: 'DataConsumer',
      description:
        'Users with Data Consumer role use different data assets for their day to day work.',
      displayName: 'Data Consumer',
      deleted: false,
      href: 'http://localhost:8585/api/v1/roles/7b1c1aa2-1df9-4522-8d8b-da62d2241c08',
    },
  ],
};

const mockProps = {
  userName: 'aaron_johnson0',
};
jest.mock('antd', () => ({
  Popover: jest
    .fn()
    .mockImplementation(({ children }) => <div>{children}</div>),
}));

jest.mock('lodash', () => ({
  isEmpty: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  useHistory: jest.fn().mockReturnValue(() => ({
    push: mockPushFunction,
  })),
}));

jest.mock('../../../../AppState', () => ({
  userDetails: {
    name: '',
  },
}));
jest.mock('../../../../axiosAPIs/userAPI.ts', () => ({
  getUserByName: jest
    .fn()
    .mockImplementation(() => Promise.resolve(mockGetUserByName)),
}));

jest.mock('../../../../utils/CommonUtils', () => ({
  getEntityName: jest.fn().mockReturnValue(() => mockGetUserByName.displayName),
  getNonDeletedTeams: jest
    .fn()
    .mockReturnValue(() => getNonDeletedTeams(mockGetUserByName.teams)),
}));

describe('UserPopOverCard', () => {
  it('On mount, UserPopOverCard  should render', async () => {
    const tree = renderer
      .create(<UserPopOverCard userName={mockProps.userName} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
