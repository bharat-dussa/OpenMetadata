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
import { findByTestId, findByText, render } from '@testing-library/react';
import React, { ReactNode } from 'react';
import { MemoryRouter } from 'react-router-dom';
import AddWebhookPage from './AddWebhookPage.component';

jest.mock('../../components/containers/PageContainerV1', () => {
  return jest
    .fn()
    .mockImplementation(({ children }: { children: ReactNode }) => (
      <div data-testid="PageContainerV1">{children}</div>
    ));
});

jest.mock('../../authentication/auth-provider/AuthProvider', () => {
  return {
    useAuthContext: jest.fn(() => ({
      isAuthDisabled: false,
      isAuthenticated: true,
      isProtectedRoute: jest.fn().mockReturnValue(true),
      isTourRoute: jest.fn().mockReturnValue(false),
      onLogoutHandler: jest.fn(),
    })),
  };
});

jest.mock('../../components/AddWebhook/AddWebhook', () => {
  return jest.fn().mockImplementation(() => <div>AddWebhookComponent</div>);
});

jest.mock('../../axiosAPIs/webhookAPI', () => ({
  addWebhook: jest.fn(),
}));

describe('Test AddWebhookPage component', () => {
  it('AddWebhookPage component should render properly', async () => {
    const { container } = render(<AddWebhookPage />, {
      wrapper: MemoryRouter,
    });

    const PageContainerV1 = await findByTestId(container, 'PageContainerV1');
    const AddWebhookComponent = await findByText(
      container,
      /AddWebhookComponent/i
    );

    expect(PageContainerV1).toBeInTheDocument();
    expect(AddWebhookComponent).toBeInTheDocument();
  });
});
