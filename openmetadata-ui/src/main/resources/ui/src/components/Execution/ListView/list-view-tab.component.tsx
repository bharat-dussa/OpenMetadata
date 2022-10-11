import { Space, Table } from 'antd';
import React, { useMemo } from 'react';
import {
  PipelineStatus,
  StatusType,
} from '../../../generated/entity/data/pipeline';
import { getStatusBadgeIcon } from '../../../utils/PipelineDetailsUtils';
import SVGIcons from '../../../utils/SvgUtils';
import { getTableViewData, ViewDataInterface } from './list-view-tab.util';

interface ListViewProps {
  executions: Array<PipelineStatus> | undefined;
}

interface StatusIndicator {
  status: StatusType;
}
const StatusIndicator = ({ status }: StatusIndicator) => (
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

const ListView = ({ executions }: ListViewProps) => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (_: unknown, data: ViewDataInterface) => (
        <StatusIndicator status={data.status} />
      ),
    },
    {
      title: 'Date & Time',
      dataIndex: 'timeStamp',
      key: 'timeStamp',
    },
  ];

  const tableData = useMemo(() => getTableViewData(executions), [executions]);

  return (
    <div>
      <Table
        columns={columns}
        dataSource={tableData}
        pagination={false}
        size="small"
      />
    </div>
  );
};

export default ListView;
