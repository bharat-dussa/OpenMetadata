import {
  Button,
  Card,
  Col,
  DatePicker,
  Dropdown,
  Menu,
  MenuProps,
  Radio,
  RadioChangeEvent,
  Row,
  Space,
  Typography,
} from 'antd';
import { AxiosError } from 'axios';
import classNames from 'classnames';
import { isNil, toNumber } from 'lodash';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { ReactComponent as Calendar } from '../../assets/svg/calendar.svg';
import { ReactComponent as FilterIcon } from '../../assets/svg/filter.svg';
import { getPipelineStatus } from '../../axiosAPIs/pipelineAPI';
import { MenuOptions } from '../../constants/execution.constants';
import { PROFILER_FILTER_RANGE } from '../../constants/profiler.constant';
import {
  PipelineStatus,
  StatusType,
} from '../../generated/entity/data/pipeline';
import jsonData from '../../jsons/en';
import { getStatusLabel } from '../../utils/executionUtils';
import {
  getDateToMilliSecondsOfCurrentDate,
  getPastDatesToMilliSecondsFromCurrentDate,
} from '../../utils/TimeUtils';
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
  const [datesSelected, setDatesSelected] = useState<string[]>();

  const [isLabelVisible, setIsLabelVisible] = useState<boolean>(false);
  const [status, setStatus] = useState(MenuOptions.all);

  const fetchPipelineStatus = async () => {
    try {
      const startTs = getPastDatesToMilliSecondsFromCurrentDate(
        PROFILER_FILTER_RANGE.last365days.days
      );

      const endTs = getDateToMilliSecondsOfCurrentDate();

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

  const handleMenuClick: MenuProps['onClick'] = (event) => {
    if (event?.key) {
      const key = toNumber(event.key);
      if (key === 1) {
        return setStatus(StatusType.Successful);
      }
      if (key === 2) {
        return setStatus(StatusType.Failed);
      }
      if (key === 3) {
        return setStatus(StatusType.Pending);
      }
    }

    return setStatus(MenuOptions.all);
  };

  const menu = (
    <Menu
      items={[
        {
          key: 0,
          label: MenuOptions.all,
        },
        {
          key: 1,
          label: MenuOptions[StatusType.Successful],
        },
        {
          key: 2,
          label: MenuOptions[StatusType.Failed],
        },
        {
          key: 3,
          label: MenuOptions[StatusType.Pending],
        },
      ]}
      onClick={handleMenuClick}
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

  return executions && executions.length > 0 ? (
    <Row className="h-full" gutter={16}>
      <Col className="" flex="1 1 200px">
        <div className="p-y-md p-l-lg p-b-lg">
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
              <Space className="w-full">
                <Dropdown overlay={menu} placement="bottom">
                  <Button ghost type="primary">
                    <Space>
                      <FilterIcon />
                      <p>
                        {status === MenuOptions.all
                          ? 'Status'
                          : getStatusLabel(status)}
                      </p>
                    </Space>
                  </Button>
                </Dropdown>
                {view === viewTypes.listView ? (
                  <>
                    <Button
                      ghost
                      className={classNames(
                        'range-picker-button delay-100',
                        isNil(datesSelected)
                          ? 'range-picker-button-width delay-100'
                          : ''
                      )}
                      type="primary">
                      <Space>
                        <Calendar />
                        {!isLabelVisible || isNil(datesSelected) ? (
                          <label> Date Filter</label>
                        ) : null}
                        <DatePicker.RangePicker
                          showNow
                          bordered={false}
                          className={classNames('range-picker')}
                          getPopupContainer={(trigger) => {
                            setIsLabelVisible(Boolean(trigger));

                            return trigger;
                          }}
                          placeholder={['', '']}
                          ranges={{
                            Today: [moment(), moment()],
                            'This Month': [
                              moment().startOf('month'),
                              moment().endOf('month'),
                            ],
                            'Last 3 months': [
                              moment().subtract(3, 'months'),
                              moment(),
                            ],
                            'Last 6 months': [
                              moment().subtract(6, 'months'),
                              moment(),
                            ],
                            'Last 1 year': [
                              moment().subtract(12, 'months'),
                              moment(),
                            ],
                            "Last 5 year's": [
                              moment().subtract(5, 'year'),
                              moment(),
                            ],
                          }}
                          suffixIcon={null}
                          onChange={(_dates, dateStrings) => {
                            setDatesSelected(dateStrings);
                          }}
                        />
                      </Space>
                    </Button>
                  </>
                ) : null}
              </Space>
            </Col>
          </Row>

          {view === viewTypes.listView ? (
            <div className="mt-1">
              <ListView executions={executions} status={status} />
            </div>
          ) : null}
          {view === viewTypes.treeView ? (
            <div className="mt-1">
              <TreeViewTab executions={executions} status={status} />
            </div>
          ) : null}
        </div>
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
