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

import {
  act,
  fireEvent,
  render,
  screen,
  waitForElement,
} from '@testing-library/react';
import React from 'react';
import { getCategory } from '../../../axiosAPIs/tagAPI';
import TierCard, { TierCardProps } from './TierCard';

const mockUpdateTier = jest.fn();
const mockFunction = jest.fn();

const mockCategoryRes = {
  id: 'cbd3fedd-b9c7-4272-b729-e9732a41116f',
  name: 'Tier',
  description:
    'Tags related to tiering of the data. Tiers capture the business importance of data.',
  version: 0.1,
  updatedAt: 1662447802546,
  updatedBy: 'admin',
  categoryType: 'Descriptive',
  href: 'http://localhost:8585/api/v1/tags/Tier',
  children: [
    {
      id: '88768d9e-ebbf-4e42-8ad0-764444c81de5',
      name: 'Tier1',
      fullyQualifiedName: 'Tier.Tier1',
      description:
        'Tags related to tiering of the data. Tiers capture the business importance of data. ',
      version: 0.1,
      updatedAt: 1662447802546,
      updatedBy: 'admin',
      href: 'http://localhost:8585/api/v1/tags/Tier/Tier1',
      deprecated: false,
      deleted: false,
    },
    {
      id: '9e24e4b8-1ce9-4964-8468-e0cc559530ec',
      name: 'Tier2',
      fullyQualifiedName: 'Tier.Tier2',
      description:
        'Tags related to tiering of the data. Tiers capture the business importance of data. ',
      version: 0.1,
      updatedAt: 1662447802546,
      updatedBy: 'admin',
      href: 'http://localhost:8585/api/v1/tags/Tier/Tier2',
      deprecated: false,
      deleted: false,
    },
  ],
  deleted: false,
};

const mockProps = {
  currentTier: 'Tier.Tier1',
  updateTier: mockUpdateTier,
  mode: 'vertical',
  hideTier: false,
  selectable: false,
  expandIcon: '<span />',
  prefixCls: 'ant-dropdown-menu',
  'data-dropdown-inject': true,
  onClick: mockFunction,
} as TierCardProps;

jest.mock('antd', () => ({
  ...jest.requireActual('antd'),
  Typography: {
    Title: jest
      .fn()
      .mockImplementation(({ children }) => <span>{children}</span>),
  },
}));

jest.mock('../../../utils/ToastUtils', () => ({
  showErrorToast: jest.fn(),
}));

jest.mock('../../../axiosAPIs/tagAPI', () => ({
  getCategory: jest
    .fn()
    .mockImplementation(() => Promise.resolve(mockCategoryRes)),
}));

describe('components > common > TabsPane', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('On mount, if response tabsPane component should render', async () => {
    await act(async () => {
      render(<TierCard {...mockProps} />);
    });

    const cards = await screen.findByTestId('cards');
    const editTierText = await screen.findByText('Edit Tier');

    const Select = await screen.findByText('Select');

    expect(cards).toBeInTheDocument();
    expect(editTierText).toBeInTheDocument();
    expect(Select).toBeInTheDocument();

    const selectTierButton = await screen.findByTestId('select-tier-buuton');

    fireEvent.click(selectTierButton);

    expect(mockUpdateTier).toHaveBeenCalled();

    const viewerContainer = await screen.findAllByTestId('viewer-container');

    expect(viewerContainer.length).toEqual(mockCategoryRes.children.length);
  });

  it('On click save, if not updateTier tier should not be able to update', async () => {
    const props = {
      ...mockProps,
      updateTier: null as unknown as jest.Mock,
    };

    render(<TierCard {...props} />);

    const editTier = await screen.findByText('Edit Tier');

    expect(editTier).toBeInTheDocument();

    const selectTierButton = await screen.findByTestId('select-tier-buuton');

    fireEvent.click(selectTierButton);

    expect(mockUpdateTier).not.toHaveBeenCalled();

    const viewerContainer = screen.queryAllByTestId('viewer-container');

    expect(viewerContainer.length).toEqual(2);
  });

  it('If hideTier, popover should not be open', async () => {
    const props = {
      ...mockProps,
      hideTier: true,
    };

    render(<TierCard {...props} />);

    const cards = screen.queryByTestId('cards');
    const editTierText = screen.queryByText('Edit Tier');

    expect(cards).not.toBeInTheDocument();
    expect(editTierText).not.toBeInTheDocument();
    expect(screen.queryByText('Select')).not.toBeInTheDocument();
  });

  it('If getCategory throws error, component should not render', async () => {
    act(() => {
      (getCategory as jest.Mock).mockImplementationOnce(() =>
        Promise.reject({
          message: 'error!',
        })
      );
    });

    const props = {
      ...mockProps,
    };
    render(<TierCard {...props} />);

    const loader = screen.getByTestId('loader');

    expect(loader).toBeInTheDocument();

    const loader1 = await waitForElement(() => screen.queryByTestId('loader'));

    expect(loader1).not.toBeInTheDocument();
  });
});
