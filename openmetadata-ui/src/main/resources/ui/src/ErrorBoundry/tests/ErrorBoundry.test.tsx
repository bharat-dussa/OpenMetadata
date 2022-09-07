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
