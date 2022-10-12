import { Space } from 'antd';
import { groupBy, isUndefined, toLower } from 'lodash';
import React from 'react';
import { MenuOptions } from '../constants/execution.constants';
import { PipelineStatus, StatusType } from '../generated/entity/data/pipeline';
import { getStatusBadgeIcon } from './PipelineDetailsUtils';
import SVGIcons from './SvgUtils';
import { getDateTimeByTimeStampWithCommaSeparated } from './TimeUtils';

interface StatusIndicatorInterface {
  status: StatusType;
}

export interface ViewDataInterface {
  name: string;
  status?: StatusType;
  timestamp?: string;
  executionStatus?: StatusType;
  type?: string;
}

export const StatusIndicator = ({ status }: StatusIndicatorInterface) => (
  <Space>
    <SVGIcons
      alt="result"
      className="tw-w-4"
      icon={getStatusBadgeIcon(status)}
    />
    <p>
      {status === StatusType.Successful ? 'Success' : ''}
      {status === StatusType.Failed ? 'Failed' : ''}
      {status === StatusType.Pending ? 'Pending' : ''}
    </p>
  </Space>
);

/**
 * It takes in an array of PipelineStatus objects and a string, and returns an array of
 * ViewDataInterface objects
 * @param {PipelineStatus[] | undefined} executions - PipelineStatus[] | undefined
 * @param {string | undefined} status - The status of the pipeline.
 */
export const getTableViewData = (
  executions: PipelineStatus[] | undefined,
  status: string | undefined
): Array<ViewDataInterface> | undefined => {
  if (isUndefined(executions)) return;

  const viewData: Array<ViewDataInterface> = [];
  executions?.map((execution) => {
    execution.taskStatus?.map((execute) => {
      viewData.push({
        name: execute.name,
        status: execute.executionStatus,
        timestamp: getDateTimeByTimeStampWithCommaSeparated(
          (execution.timestamp as number) * 10
        ),
        executionStatus: execute.executionStatus,
        type: '--',
      });
    });
  });

  return viewData.filter((data) =>
    status !== MenuOptions.all
      ? toLower(data.status)?.includes(toLower(status))
      : data
  );
};

/**
 * It takes an array of objects and groups them by a property
 * @param {PipelineStatus[]} executions - PipelineStatus[] - This is the array of pipeline status
 * objects that we get from the API.
 * @param {string | undefined} status - The status of the pipeline.
 */
export const getTreeViewData = (
  executions: PipelineStatus[],
  status: string | undefined
) => {
  const taskStatusArr = getTableViewData(executions, status);

  return groupBy(taskStatusArr, 'name');
};

export const getStatusLabel = (status: string) => {
  switch (status) {
    case StatusType.Successful:
      return MenuOptions.Successful;

    case StatusType.Pending:
      return MenuOptions.Aborted;

    case StatusType.Failed:
      return MenuOptions.Failed;

    default:
      return;
  }
};
