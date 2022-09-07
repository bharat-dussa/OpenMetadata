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

import { render } from '@testing-library/react';
import React from 'react';
import AssigneeList from './AssigneeList';

const mockPushFunction = jest.fn();
const uniqueId = 'id-12cdhv82bcn-c8bc-27feb2-cgdy70';

let mockProps = {
  assignees: [
    {
      id: 'f4f7a696-c479-4784-9896-8f30d12e74e1',
      type: 'user',
      name: 'aaron_johnson0',
      fullyQualifiedName: 'aaron_johnson0',
      displayName: 'Aaron Johnson',
      deleted: false,
    },
  ],
};

jest.mock('lodash', () => ({
  ...jest.requireActual('lodash'),
  uniqueId: jest.fn().mockReturnValue(() => uniqueId),
}));

jest.mock('react-router-dom', () => ({
  useHistory: jest.fn().mockReturnValue(() => ({
    push: mockPushFunction,
  })),
}));

jest.mock('../../../constants/constants', () => ({
  getUserPath: jest.fn().mockReturnValue(() => ''),
}));

jest.mock('../PopOverCard/UserPopOverCard', () => {
  return jest.fn().mockImplementation(({ children, onClick }) => {
    return (
      <div>
        <span onClick={onClick}>{children}</span>
      </div>
    );
  });
});

const assignee = mockProps.assignees[0];

describe('AssigneeList', () => {
  it('On mount, AssigneeList should render', async () => {
    const { findByTestId, findByText } = render(
      <AssigneeList {...mockProps} />
    );

    const assigneeListPopOver = await findByTestId('assignee-list-popover');

    expect(assigneeListPopOver).toBeInTheDocument();

    expect(
      await findByText(assignee.displayName.split('')[0])
    ).toBeInTheDocument();
    expect(await findByText(assignee.name)).toBeInTheDocument();
  });

  it('If no assignee name, AssigneeList should render with empty data', async () => {
    mockProps = {
      assignees: [
        {
          id: '',
          type: 'user',
          name: '',
          fullyQualifiedName: '',
          displayName: '',
          deleted: false,
        },
      ],
    };
    const { findByTestId, queryByText } = render(
      <AssigneeList {...mockProps} />
    );

    const assigneeListPopOver = await findByTestId('assignee-list-popover');

    expect(assigneeListPopOver).toBeInTheDocument();

    expect(
      queryByText(assignee.displayName.split('')[0])
    ).not.toBeInTheDocument();
    expect(queryByText(assignee.name)).not.toBeInTheDocument();
  });
});
