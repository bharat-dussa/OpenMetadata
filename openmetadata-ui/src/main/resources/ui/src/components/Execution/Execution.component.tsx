import {
  Button,
  Card,
  Col,
  Dropdown,
  Menu,
  Radio,
  RadioChangeEvent,
  Row,
  Space,
  Typography,
} from 'antd';
import React, { useState } from 'react';
import ListView from './ListView/list-view-tab.component';
import TreeViewTab from './TreeView/tree-view-tab.component';

const viewTypes = {
  listView: 'list-view',
  treeView: 'tree-view',
};

const Execution = () => {
  const [view, setView] = useState(viewTypes.listView);

  const handleModeChange = (e: RadioChangeEvent) => {
    setView(e.target.value);
  };

  const menu = (
    <Menu
      items={[
        {
          key: '1',
          label: 'Success',
        },
        {
          key: '2',
          label: 'Failure',
        },
        {
          key: '3',
          label: 'Aborted',
        },
      ]}
    />
  );

  return (
    <Row>
      <Col flex="1 1 200px">
        <Row justify="space-between">
          <Col>
            <Radio.Group
              style={{ marginBottom: 8 }}
              value={view}
              onChange={handleModeChange}>
              <Radio.Button value={viewTypes.listView}>
                {viewTypes.listView}
              </Radio.Button>
              <Radio.Button value={viewTypes.treeView}>
                {viewTypes.treeView}
              </Radio.Button>
            </Radio.Group>
          </Col>
          <Col>
            <Space>
              <Dropdown overlay={menu} placement="bottom">
                <Button>Status</Button>
              </Dropdown>
              <Button>Date Filter</Button>
            </Space>
          </Col>
        </Row>
        {view === viewTypes.listView ? (
          <div className="mt-1">
            <ListView />
          </div>
        ) : null}
        {view === viewTypes.treeView ? (
          <div className="mt-1">
            <TreeViewTab />
          </div>
        ) : null}
      </Col>
      <Col flex="0 1 400px">
        <Card>
          <Space direction="vertical">
            <Typography.Text strong>Summary</Typography.Text>
            <Typography.Text>Basic Configuration</Typography.Text>
            <Row gutter={4}>
              <Col>
                <Typography.Text type="secondary">Name</Typography.Text>
              </Col>
              <Col>
                {' '}
                <Typography.Text>Bharat</Typography.Text>
              </Col>
            </Row>
          </Space>
        </Card>
      </Col>
    </Row>
  );
};

export default Execution;
