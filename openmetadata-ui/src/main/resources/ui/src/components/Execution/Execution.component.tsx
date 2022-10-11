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
import { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import { ReactComponent as Calendar } from '../../assets/svg/calendar.svg';
import { ReactComponent as FilterIcon } from '../../assets/svg/filter.svg';
import { getPipelineStatus } from '../../axiosAPIs/pipelineAPI';
import { PipelineStatus } from '../../generated/entity/data/pipeline';
import jsonData from '../../jsons/en';
import { showErrorToast } from '../../utils/ToastUtils';
import './Execution.style.less';
import ListView from './ListView/list-view-tab.component';
import TreeViewTab from './TreeView/tree-view-tab.component';

const viewTypes = {
  listView: 'list-view',
  treeView: 'tree-view',
};

interface ExecutionProps {
  pipelineFQN: string;
}

interface SummaryCardContentProps {
  heading: string;
  name: string;
}

const Execution = ({ pipelineFQN }: ExecutionProps) => {
  const [view, setView] = useState(viewTypes.listView);
  const [executions, setExecutions] = useState<Array<PipelineStatus>>();

  const fetchPipelineStatus = async () => {
    try {
      const startTs = 164099520000;
      const endTs = 166393890300;

      const response = await getPipelineStatus(pipelineFQN, {
        startTs,
        endTs,
      });
      setExecutions(response.data);
    } catch (error) {
      showErrorToast(
        error as AxiosError,
        jsonData['api-error-messages']['fetch-pipeline-status-error']
      );
    }
  };

  useEffect(() => {
    fetchPipelineStatus();
  }, [pipelineFQN]);

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

  const SummaryCardContent = ({
    heading,
    name,
    ...otherProps
  }: SummaryCardContentProps) => (
    <Space direction="vertical" {...otherProps}>
      <p className="sub-heading">{heading}</p>
      <Row gutter={16}>
        <Col>
          <p className="content-text">{name}</p>
        </Col>
        <Col>
          {' '}
          <Typography.Text>{name}</Typography.Text>
        </Col>
      </Row>
    </Space>
  );

  return executions && executions.length === 0 ? (
    <Row className="h-full" gutter={16}>
      <Col flex="1 1 200px">
        <Row justify="space-between">
          <Col>
            <Radio.Group
              buttonStyle="outline"
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
            <Space
              style={{
                width: '100%',
              }}>
              <Dropdown overlay={menu} placement="bottom">
                <Button ghost type="primary">
                  <Space>
                    <FilterIcon />
                    <p>Status</p>
                  </Space>
                </Button>
              </Dropdown>
              {view === viewTypes.listView ? (
                <Button ghost type="primary">
                  <Space>
                    <Calendar />
                    <p>Date Filter</p>
                  </Space>
                </Button>
              ) : null}
            </Space>
          </Col>
        </Row>
        {view === viewTypes.listView ? (
          <div className="mt-1">
            <ListView executions={executions} />
          </div>
        ) : null}
        {view === viewTypes.treeView ? (
          <div className="mt-1">
            <TreeViewTab />
          </div>
        ) : null}
      </Col>
      <Col flex="0 1 400px">
        <Card className="h-full">
          <Space direction="vertical">
            <Typography.Title level={5}>Summary</Typography.Title>
            <Row gutter={[2, 16]}>
              <SummaryCardContent
                heading="Basic Configuration"
                name="Workflow Name"
              />
              <SummaryCardContent heading="Run Schedule" name="Workflow Name" />
            </Row>
          </Space>
        </Card>
      </Col>
    </Row>
  ) : (
    <Row align="middle" className="h-full w-full">
      No Execution data available
    </Row>
  );
};

export default Execution;
