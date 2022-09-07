import { cleanup, fireEvent, render } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { act } from 'react-test-renderer';
import { getActivityFeedEventFilters } from '../../../axiosAPIs/eventFiltersAPI';
import ActivityFeedSettingsPage from '../ActivityFeedSettingsPage';

const mockEventFilterRes = [
  {
    entityType: 'all',
    filters: [
      {
        eventType: 'entityCreated',
        include: ['all'],
        exclude: [],
      },
      {
        eventType: 'entityUpdated',
        include: ['all'],
        exclude: ['usageSummary'],
      },
      {
        eventType: 'entityDeleted',
        include: ['all'],
        exclude: [],
      },
      {
        eventType: 'entitySoftDeleted',
        include: ['all'],
        exclude: [],
      },
    ],
  },
  {
    entityType: 'table',
    filters: [
      {
        eventType: 'entityCreated',
        include: ['all'],
        exclude: [],
      },
      {
        eventType: 'entityUpdated',
        include: ['description', 'owner', 'tags', 'followers'],
        exclude: [],
      },
      {
        eventType: 'entityDeleted',
        include: ['all'],
        exclude: [],
      },
      {
        eventType: 'entitySoftDeleted',
        include: ['all'],
        exclude: [],
      },
    ],
  },
  {
    entityType: 'dashboard',
    filters: [
      {
        eventType: 'entityCreated',
        include: ['all'],
        exclude: [],
      },
      {
        eventType: 'entityUpdated',
        include: ['description', 'owner', 'tags', 'followers'],
        exclude: [],
      },
      {
        eventType: 'entityDeleted',
        include: ['all'],
        exclude: [],
      },
      {
        eventType: 'entitySoftDeleted',
        include: ['all'],
        exclude: [],
      },
    ],
  },
  {
    entityType: 'pipeline',
    filters: [
      {
        eventType: 'entityCreated',
        include: ['all'],
        exclude: [],
      },
      {
        eventType: 'entityUpdated',
        include: ['description', 'owner', 'tags', 'followers'],
        exclude: [],
      },
      {
        eventType: 'entityDeleted',
        include: ['all'],
        exclude: [],
      },
      {
        eventType: 'entitySoftDeleted',
        include: ['all'],
        exclude: [],
      },
    ],
  },
  {
    entityType: 'mlmodel',
    filters: [
      {
        eventType: 'entityCreated',
        include: ['all'],
        exclude: [],
      },
      {
        eventType: 'entityUpdated',
        include: ['description', 'owner', 'tags', 'followers'],
        exclude: [],
      },
      {
        eventType: 'entityDeleted',
        include: ['all'],
        exclude: [],
      },
      {
        eventType: 'entitySoftDeleted',
        include: ['all'],
        exclude: [],
      },
    ],
  },
  {
    entityType: 'testCase',
    filters: [
      {
        eventType: 'entityCreated',
        include: ['all'],
        exclude: [],
      },
      {
        eventType: 'entityUpdated',
        include: [],
        exclude: [
          'testCaseResultAborted',
          'testCaseResultSuccess',
          'testCaseResultFailed',
        ],
      },
      {
        eventType: 'entityDeleted',
        include: ['all'],
        exclude: [],
      },
      {
        eventType: 'entitySoftDeleted',
        include: ['all'],
        exclude: [],
      },
    ],
  },
];

const mockSave = jest.fn();

jest.mock('antd', () => ({
  ...jest.requireActual('antd'),
  Row: jest.fn().mockImplementation(({ children }) => <div>{children}</div>),
  Button: jest
    .fn()
    .mockImplementation(({ children }) => (
      <div onClick={mockSave}>{children}</div>
    )),
  Card: jest.fn().mockImplementation(({ children }) => <div>{children}</div>),
  Col: jest.fn().mockImplementation(({ children }) => <div>{children}</div>),
  Divider: jest
    .fn()
    .mockImplementation(({ children }) => <div>{children}</div>),
  Space: jest.fn().mockImplementation(({ children }) => <div>{children}</div>),
  Tree: jest.fn().mockImplementation(({ children, onCheck }) => (
    <div
      data-testid="activity-feed-settings-tree"
      onClick={(keys) => onCheck(keys)}>
      {children}
    </div>
  )),
  Typography: {
    Text: jest.fn().mockImplementation(({ children }) => <div>{children}</div>),
    Title: jest
      .fn()
      .mockImplementation(({ children }) => <div>{children}</div>),
  },
}));

jest.mock('../../../axiosAPIs/eventFiltersAPI', () => {
  return {
    getActivityFeedEventFilters: jest
      .fn()
      .mockImplementation(() => Promise.resolve(mockEventFilterRes)),
    resetAllFilters: jest.fn().mockImplementation(() => Promise.resolve()),
    updateFilters: jest.fn().mockImplementation(() => Promise.resolve()),
  };
});

jest.mock(
  '../../../components/common/error-with-placeholder/ErrorPlaceHolder',
  () => {
    return jest
      .fn()
      .mockImplementation(({ children }) => <div>{children}</div>);
  }
);

jest.mock('../../../utils/ToastUtils', () => ({
  showErrorToast: jest.fn(),
  showSuccessToast: jest.fn(),
}));

jest.mock('lodash', () => ({
  map: jest.fn(),
  startCase: jest.fn(),
  cloneDeep: jest.fn(),
  isUndefined: jest.fn(),
}));

// const mockResetAll = jest.fn();

const activityFeed = 'Activity Feed';
const save = 'Save';
const resetAll = 'Reset all';

describe('Test ActivityFeedSettingsPage', () => {
  beforeEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it('No data placeholder should be visible when no data present', async () => {
    await act(async () => {
      (getActivityFeedEventFilters as jest.Mock).mockImplementationOnce(() =>
        Promise.reject({ message: 'error' })
      );
      const { findByText } = render(<ActivityFeedSettingsPage />);

      expect(
        await findByText(/No activity feed settings available/)
      ).toBeInTheDocument();
    });
  });

  it('If data present, Component should render with Api Data', async () => {
    await act(async () => {
      const { findByText } = render(<ActivityFeedSettingsPage />, {
        wrapper: MemoryRouter,
      });

      expect(await findByText(activityFeed)).toBeInTheDocument();

      expect(await findByText(save)).toBeInTheDocument();

      expect(await findByText(resetAll)).toBeInTheDocument();
    });
  });

  it('On click save, `updateFilters` should call', async () => {
    await act(async () => {
      const { findByText } = render(<ActivityFeedSettingsPage />, {
        wrapper: MemoryRouter,
      });

      fireEvent.click(await findByText(save));

      expect(mockSave).toHaveBeenCalledTimes(1);
    });
  });
});
