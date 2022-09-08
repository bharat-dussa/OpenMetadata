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

import { act, fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import TabsPane, { Tab } from './TabsPane';

const mockFunction = jest.fn();
const mockTabs = [
  {
    name: 'tab1',
    icon: {
      alt: 'test_tab_1',
      name: 'icon-test_tab_1',
      title: 'Tab 1',
      selectedName: 'icon-test_tab_1',
    },
    isProtected: false,
    isHidden: false,
    position: 1,
  },
  {
    name: 'tab2',
    icon: {
      alt: 'test_tab_2',
      name: 'icon-test_tab_2',
      title: 'Tab 2',
      selectedName: 'icon-test_tab_2',
    },
    isProtected: false,
    isHidden: false,
    position: 2,
  },
] as Tab[];

const mockProps = {
  activeTab: 1,
  setActiveTab: mockFunction,
  className: '',
  tabs: mockTabs,
};

jest.mock('lodash', () => ({
  camelCase: jest.fn(),
  isNil: jest.fn(),
}));
jest.mock('../../../utils/CommonUtils', () => ({
  getCountBadge: jest.fn().mockReturnValue(2),
}));

describe('components > common > TabsPane', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('On mount, TabsPane Component should render', async () => {
    render(<TabsPane {...mockProps} />);
    const tableBody = screen.getByTestId('tabs-pane');
    const tab1 = screen.getByTestId('tab1');
    const tab2 = screen.getByTestId('tab2');

    expect(tab1).toHaveTextContent('tab1');
    expect(tab2).toHaveTextContent('tab2');
    expect(tableBody).toBeInTheDocument();
  });

  it('On Click, setActiveTab should call', async () => {
    act(() => {
      render(<TabsPane {...mockProps} />);
      const tableBody = screen.getByTestId('tabs-pane');
      const tab1 = screen.getByTestId('tab1');
      const tab2 = screen.getByTestId('tab2');

      expect(tableBody).toBeInTheDocument();

      expect(tab1).toHaveTextContent('tab1');
      expect(tab2).toHaveTextContent('tab2');

      fireEvent.click(tab1);

      expect(mockFunction).toHaveBeenCalled();
    });
  });

  it('If no setActiveTab, then it should not call', async () => {
    act(() => {
      const props = {
        ...mockProps,
        setActiveTab: undefined as unknown as jest.Mock,
      };
      render(<TabsPane {...props} />);
      const tableBody = screen.getByTestId('tabs-pane');
      const tab1 = screen.getByTestId('tab1');
      const tab2 = screen.getByTestId('tab2');

      expect(tableBody).toBeInTheDocument();

      expect(tab1).toHaveTextContent('tab1');
      expect(tab2).toHaveTextContent('tab2');

      fireEvent.click(tab1);

      expect(mockFunction).not.toHaveBeenCalled();
    });
  });

  it('If one of the tab is hidden, it must not render', async () => {
    const props = {
      ...mockProps,
      tabs: [
        ...mockProps.tabs,
        {
          name: 'tab3',
          icon: {
            alt: 'test_tab_3',
            name: 'icon-test_tab_3',
            title: 'Tab 2',
            selectedName: 'icon-test_tab_3',
          },
          isProtected: false,
          isHidden: true,
          position: 2,
        },
      ],
    };

    render(<TabsPane {...props} />);
    const tableBody = screen.getByTestId('tabs-pane');
    const tab1 = screen.queryByTestId('tab1');
    const tab2 = screen.queryByTestId('tab2');
    const tab3 = screen.queryByTestId('tab3');

    expect(tableBody).toBeInTheDocument();
    expect(tab1).toBeInTheDocument();
    expect(tab2).toBeInTheDocument();
    expect(tab3).not.toBeInTheDocument();
  });

  it('If no tabs, TabsPane Component should render with null', async () => {
    const props = {
      ...mockProps,
      tabs: [],
    };
    render(<TabsPane {...props} />);
    const tableBody = screen.getByTestId('tabs-pane');
    const tab1 = screen.queryByTestId('tab1');
    const tab2 = screen.queryByTestId('tab2');

    expect(tableBody).toBeInTheDocument();
    expect(tab1).not.toBeInTheDocument();
    expect(tab2).not.toBeInTheDocument();
  });
});
