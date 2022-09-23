import { Table } from 'antd';
import React from 'react';

const ListView = () => {
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
    },
    {
      title: 'Date & Time',
      dataIndex: 'dataAndTime',
      key: 'dataAndTime',
    },
  ];

  const data = [
    {
      key: 'name',
      name: 'John Brown',
      type: 32,
      status: 'New York No. 1 Lake Park',
      dataAndTime: ['nice', 'developer'],
    },
    {
      key: 'type',
      name: 'John Brown',
      type: 32,
      status: 'New York No. 1 Lake Park',
      dataAndTime: ['nice', 'developer'],
    },
    {
      key: 'status',
      name: 'John Brown',
      type: 32,
      status: 'New York No. 1 Lake Park',
      dataAndTime: ['nice', 'developer'],
    },
    {
      key: 'dataAndTime',
      name: 'John Brown',
      type: 32,
      status: 'New York No. 1 Lake Park',
      dataAndTime: ['nice', 'developer'],
    },
  ];

  return (
    <div>
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        size="small"
      />
    </div>
  );
};

export default ListView;
