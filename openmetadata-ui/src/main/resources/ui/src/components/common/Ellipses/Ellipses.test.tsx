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

import { render, screen } from '@testing-library/react';
import React from 'react';
import Ellipses from './Ellipses';

const text =
  'A good html page, following the html semantics has a important role for the assistive technologies. Even more than the role tag';
jest.mock('antd', () => ({
  Typography: {
    Paragraph: jest
      .fn()
      .mockImplementation(({ children }) => <div>{children}</div>),
  },
}));

describe('Ellipses', () => {
  it('On mount, ellipses should render', async () => {
    render(<Ellipses>{text}</Ellipses>);

    expect(await screen.findByText(text)).toBeInTheDocument();
  });
});
