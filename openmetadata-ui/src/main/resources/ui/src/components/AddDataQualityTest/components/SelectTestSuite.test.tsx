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
import {
  SelectTestSuiteProps,
  SelectTestSuiteType,
} from '../AddDataQualityTest.interface';
import SelectTestSuite from './SelectTestSuite';

const mockFunction = jest.fn();
const mockPushFunction = jest.fn();

const mockInitialValues = {
  description: '',
  data: '{deleted: false, description: "This is a critical t…}',
  isNewTestSuite: false,
} as unknown as SelectTestSuiteType;

const mockProps = {
  initialValue: mockInitialValues,
  onSubmit: mockFunction,
} as SelectTestSuiteProps;

jest.mock('antd', () => {
  const antd = jest.requireActual('antd');

  const Button = jest
    .fn()
    .mockImplementation(({ children }) => <div>{children}</div>);
  const Divider = jest
    .fn()
    .mockImplementation(({ children }) => <div>{children}</div>);
  const Input = jest
    .fn()
    .mockImplementation(({ children }) => <div>{children}</div>);
  const Row = jest
    .fn()
    .mockImplementation(({ children }) => <div>{children}</div>);
  const Select = jest
    .fn()
    .mockImplementation(({ children }) => <div>{children}</div>);
  const Space = jest
    .fn()
    .mockImplementation(({ children }) => <div>{children}</div>);
  const Typography = {
    Paragraph: jest
      .fn()
      .mockImplementation(({ children }) => <div>{children}</div>),
  };

  return {
    ...antd,
    Button,
    Divider,
    Input,
    Row,
    Select,
    Space,
    Typography,
  };
});

jest.mock('lodash', () => ({
  isEmpty: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  useParams: jest.fn().mockReturnValue({
    entityTypeFQN: 'entityTypeFQN',
  }),

  useHistory: jest.fn().mockImplementation(() => ({
    push: mockPushFunction,
  })),
}));

jest.mock('../../../axiosAPIs/testAPI', () => ({
  getListTestSuites: jest.fn().mockImplementation(() => Promise.resolve()),
}));

jest.mock('../../../utils/ToastUtils', () => ({
  showErrorToast: jest.fn(),
}));

jest.mock('../../common/rich-text-editor/RichTextEditor', () => {
  return jest.fn().mockImplementation(({ initialValue, ref }) => (
    <div ref={ref}>
      <p>{initialValue}</p>
    </div>
  ));
});

describe('SelectTestSuite', () => {
  it('On mount, SelectTestSuite should render', async () => {
    const { findByText } = render(<SelectTestSuite {...mockProps} />);

    expect(await findByText('Test Suite:')).toBeInTheDocument();

    expect(await findByText('Create new test suite')).toBeInTheDocument();

    expect(await findByText('Next')).toBeInTheDocument();

    expect(await findByText('Cancel')).toBeInTheDocument();
  });
});
