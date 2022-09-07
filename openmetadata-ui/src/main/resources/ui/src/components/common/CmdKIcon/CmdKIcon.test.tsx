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
import { NavigatorHelper } from '../../../utils/NavigatorUtils';
import CmdKIcon from './CmdKIcon.component';

jest.mock('../../../utils/NavigatorUtils', () => {
  return {
    NavigatorHelper: {
      isMacOs: jest.fn().mockReturnValue(true),
    },
  };
});

describe('CardV1', () => {
  it("On mount, if user's device is macOS card should render with command icon", async () => {
    const tree = renderer.create(<CmdKIcon />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("On mount, if user's device is not macOS card should render with Ctrl icon", async () => {
    (NavigatorHelper.isMacOs as jest.Mock).mockReturnValue(false);

    const tree1 = renderer.create(<CmdKIcon />).toJSON();

    expect(tree1).toMatchSnapshot();
  });
});
