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
import RightPanel from '../RightPanel';

const data = {
  title: 'test title',
  body: 'test body',
};
jest.mock('antd', () => ({
  Typography: {
    Paragraph: jest
      .fn()
      .mockImplementation(({ children }) => <div>{children}</div>),
  },
  Row: jest.fn().mockImplementation(({ children }) => <div>{children}</div>),
}));

describe('RightPanel', () => {
  it('On Mount, RightPanel should render', async () => {
    const { findByText } = render(<RightPanel data={data} />);

    expect(await findByText(data.title)).toHaveTextContent(data.title);
    expect(await findByText(data.body)).toHaveTextContent(data.body);
  });
});
