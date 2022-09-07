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
