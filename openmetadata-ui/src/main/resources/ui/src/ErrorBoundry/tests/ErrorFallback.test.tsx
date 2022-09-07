import React from 'react';
import renderer from 'react-test-renderer';
import ErrorFallback from '../ErrorFallback';

jest.mock('antd', () => ({
  Button: jest.fn().mockImplementation(({ children }) => <div>{children}</div>),
  Result: jest.fn().mockImplementation(({ children }) => <div>{children}</div>),
}));

describe('ErrorFallback', () => {
  it('On mount, ErrorFallback should render', () => {
    const tree = renderer
      .create(
        <ErrorFallback
          error={'error' as unknown as Error}
          resetErrorBoundary={() => Promise.reject({ message: 'error!' })}
        />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
