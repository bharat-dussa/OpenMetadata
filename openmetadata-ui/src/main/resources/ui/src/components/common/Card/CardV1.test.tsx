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
import CardV1 from './CardV1';

jest.mock('antd', () => ({
  Card: jest.fn().mockImplementation(({ children }) => <div>{children}</div>),
}));

jest.mock('lodash', () => ({
  lowerCase: jest.fn(),
}));

describe('CardV1', () => {
  it('On mount, card should render', async () => {
    const { findByText } = render(
      <CardV1 heading="test-head" id="test-card-id" />
    );

    expect(await findByText('test-head')).toBeInTheDocument();
  });

  it('If no heading, card should show empty header', async () => {
    const { queryByText } = render(<CardV1 heading="" id="test-card-id" />);

    expect(queryByText('test-head')).not.toBeInTheDocument();
  });
});
