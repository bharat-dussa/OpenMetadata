import { isUndefined } from 'lodash';
import {
  PipelineStatus,
  StatusType,
} from '../../../generated/entity/data/pipeline';
import { getRelativeDateTimeByTimeStamp } from '../../../utils/TimeUtils';

export interface ViewDataInterface {
  name: string;
  status: StatusType;
  timeStamp: string;
  executionStatus: StatusType;
  type: string;
}

/**
 * It takes an array of PipelineStatus objects and returns an array of ViewDataInterface objects
 * @param {PipelineStatus[] | undefined} executions - PipelineStatus[] | undefined
 * @returns An array of objects with the following properties:
 *   name: string
 *   status: string
 *   timeStamp: string
 *   executionStatus: string
 */
export const getTableViewData = (
  executions: PipelineStatus[] | undefined
): Array<ViewDataInterface> | undefined => {
  if (isUndefined(executions)) return;

  const viewData: Array<ViewDataInterface> = [];
  executions?.map((execution) => {
    execution.taskStatus?.map((execute) => {
      viewData.push({
        name: execute.name,
        status: execute.executionStatus,
        timeStamp: getRelativeDateTimeByTimeStamp(
          execution.timestamp as number
        ) as string,
        executionStatus: execute.executionStatus,
        type: '--',
      });
    });
  });

  return viewData;
};
