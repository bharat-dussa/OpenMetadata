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

import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { act } from 'react-test-renderer';
import TeamTypeSelect from './TeamTypeSelect.component';
import { TeamTypeSelectProps } from './TeamTypeSelect.interface';

const mockUpdateTeamType = jest.fn();
const mockShowTypeSelector = jest.fn();

const teamTypeOptions = [
  {
    label: 'BusinessUnit',
    value: 'BusinessUnit',
  },
  {
    label: 'Department',
    value: 'Department',
  },
  {
    label: 'Division',
    value: 'Division',
  },
  {
    label: 'Group',
    value: 'Group',
  },
];

const mockProps = {
  handleShowTypeSelector: mockShowTypeSelector,
  showGroupOption: true,
  teamType: 'Department',
  updateTeamType: mockUpdateTeamType,
} as TeamTypeSelectProps;

jest.mock('antd', () => ({
  ...jest.requireActual('antd'),
}));

jest.mock('./TeamTypeSelect.utils', () => ({
  getTeamTypeOptions: jest.fn().mockReturnValue(teamTypeOptions),
}));

describe('components > common > TeamTypeSelect', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('On mount, TabsPane Component should render', async () => {
    render(<TeamTypeSelect {...mockProps} />);
    const teamTypeSelect = screen.getByTestId('team-type-select');

    expect(teamTypeSelect).toBeInTheDocument();
    expect(await screen.findByText(mockProps.teamType)).toBeInTheDocument();
  });

  it('On Click Cancel, teamTypeSelector should not be visible', async () => {
    act(() => {
      render(<TeamTypeSelect {...mockProps} />);
      const teamTypeSelect = screen.getByTestId('team-type-select');

      expect(teamTypeSelect).toBeInTheDocument();

      const cancelButton = screen.getByTestId('cancel-button');

      fireEvent.click(cancelButton);

      expect(mockShowTypeSelector).toHaveBeenCalled();
    });
  });

  it('On Click Submit, should update team', async () => {
    render(<TeamTypeSelect {...mockProps} />);
    const teamTypeSelect = screen.getByTestId('team-type-select');

    expect(teamTypeSelect).toBeInTheDocument();

    const submitButton = screen.getByTestId('submit-button');

    fireEvent.click(submitButton);

    expect(mockUpdateTeamType).toHaveBeenCalled();
  });
});
