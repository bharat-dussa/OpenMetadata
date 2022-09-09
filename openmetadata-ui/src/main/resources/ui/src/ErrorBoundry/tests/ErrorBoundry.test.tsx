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

import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import ErrorBoundry from '../ErrorBoundry';

jest.mock('react-error-boundary', () => ({
  ErrorBoundary: jest.fn().mockImplementation(({ onReset }) => (
    <div>
      <button onClick={onReset}>Reset</button>ErrorBoundary
    </div>
  )),
}));
jest.mock('../ErrorFallback.tsx', () => ({
  ErrorFallback: jest.fn().mockImplementation(() => <div>ErrorFallback</div>),
}));

jest.mock('react-router-dom', () => ({
  useHistory: jest.fn().mockImplementation(() => ({
    push: jest.fn(),
  })),
}));

describe('ErrorBoundry', () => {
  it('On mount, ErrorFallback should render', async () => {
    const { findByText } = render(<ErrorBoundry>Hello</ErrorBoundry>);

    fireEvent.click(await findByText('Reset'));

    expect(await findByText('ErrorBoundary')).toBeInTheDocument();
  });
});
