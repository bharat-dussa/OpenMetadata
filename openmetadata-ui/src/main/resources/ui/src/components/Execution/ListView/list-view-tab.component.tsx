import { Table } from 'antd';
import React, { useMemo } from 'react';
import {
  PipelineStatus,
  StatusType,
} from '../../../generated/entity/data/pipeline';
import {
  getTableViewData,
  StatusIndicator,
  ViewDataInterface,
} from '../../../utils/executionUtils';

interface ListViewProps {
  executions: Array<PipelineStatus> | undefined;
  status: string;
}

const ListView = ({ executions, status }: ListViewProps) => {
  const tableData = useMemo(
    () => getTableViewData(executions, status),
    [executions, status]
  );

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
        <StatusIndicator status={data.status as StatusType} />
      ),
    },
    {
      title: 'Date & Time',
      dataIndex: 'timestamp',
      key: 'timestamp',
    },
  ];

  return (
    <div>
      <Table columns={columns} dataSource={tableData} pagination={false} />
    </div>
  );
};

export default ListView;
