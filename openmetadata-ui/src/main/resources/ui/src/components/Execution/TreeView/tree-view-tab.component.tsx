import { Card, Col, Row, Space, Typography } from 'antd';
import { uniqueId } from 'lodash';
import React, { useMemo } from 'react';
import { Tooltip } from 'react-tippy';
import {
  PipelineStatus,
  StatusType,
} from '../../../generated/entity/data/pipeline';
import { getTreeViewData } from '../../../utils/executionUtils';
import { getStatusBadgeIcon } from '../../../utils/PipelineDetailsUtils';
import SVGIcons, { Icons } from '../../../utils/SvgUtils';

interface TreeViewProps {
  executions: Array<PipelineStatus> | undefined;
  status: string;
}

const TreeViewTab = ({ executions, status }: TreeViewProps) => {
  const viewData = useMemo(
    () => getTreeViewData(executions as PipelineStatus[], status),
    [executions, status]
  );

  return (
    <Card>
      <Row align="middle" className="m-b-lg m-t-md" justify="center">
        <Space>
          <SVGIcons
            alt="result"
            className="tw-w-4 transform-180 m-r-7 cursor-pointer"
            icon={Icons.ARROW_RIGHT}
          />
        </Space>
        <Space>
          <Typography.Title className="p-b-0" level={5}>
            23 May 2022 to 23 May 2023
          </Typography.Title>
        </Space>
        <Space>
          <SVGIcons
            alt="result"
            className="tw-w-4 m-l-7 cursor-pointer"
            icon={Icons.ARROW_RIGHT}
          />
        </Space>
      </Row>

      {Object.entries(viewData).map(([key, value]) => (
        <Row gutter={16} key={uniqueId()}>
          <Col className="flex items-center justify-center" span={4}>
            <Typography.Text type="secondary">{key}</Typography.Text>
          </Col>

          <Col>
            {value.map((status) => (
              <Space className="m-md" key={uniqueId()}>
                <Tooltip
                  html={
                    <Space direction="vertical">
                      <div>{status.timestamp}</div>
                      <div>{status.executionStatus}</div>
                    </Space>
                  }
                  position="bottom">
                  <SVGIcons
                    alt="result"
                    className="tw-w-6"
                    icon={getStatusBadgeIcon(
                      status.executionStatus as StatusType
                    )}
                  />
                </Tooltip>
              </Space>
            ))}
          </Col>
        </Row>
      ))}
    </Card>
  );
};

export default TreeViewTab;
