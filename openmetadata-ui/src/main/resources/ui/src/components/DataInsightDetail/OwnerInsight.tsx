/*
 *  Copyright 2021 Collate
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *  http://www.apache.org/licenses/LICENSE-2.0
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

import { Card, Typography } from 'antd';
import { AxiosError } from 'axios';
import { isEmpty } from 'lodash';
import React, { FC, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  CartesianGrid,
  Legend,
  LegendProps,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { getAggregateChartData } from '../../axiosAPIs/DataInsightAPI';
import {
  DEFAULT_CHART_OPACITY,
  GRAPH_BACKGROUND_COLOR,
  HOVER_CHART_OPACITY,
} from '../../constants/constants';
import {
  BAR_CHART_MARGIN,
  ENTITIES_BAR_COLO_MAP,
} from '../../constants/DataInsight.constants';
import { DataReportIndex } from '../../generated/dataInsight/dataInsightChart';
import {
  DataInsightChartResult,
  DataInsightChartType,
} from '../../generated/dataInsight/dataInsightChartResult';
import { Kpi } from '../../generated/dataInsight/kpi/kpi';
import { ChartFilter } from '../../interface/data-insight.interface';
import {
  axisTickFormatter,
  updateActiveChartFilter,
} from '../../utils/ChartUtils';
import {
  CustomTooltip,
  getGraphDataByEntityType,
  renderLegend,
} from '../../utils/DataInsightUtils';
import { showErrorToast } from '../../utils/ToastUtils';
import './DataInsightDetail.less';
import DataInsightProgressBar from './DataInsightProgressBar';
import { EmptyGraphPlaceholder } from './EmptyGraphPlaceholder';

interface Props {
  chartFilter: ChartFilter;
  kpi: Kpi | undefined;
}

const OwnerInsight: FC<Props> = ({ chartFilter, kpi }) => {
  const [totalEntitiesOwnerByType, setTotalEntitiesOwnerByType] =
    useState<DataInsightChartResult>();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeKeys, setActiveKeys] = useState<string[]>([]);
  const [activeMouseHoverKey, setActiveMouseHoverKey] = useState('');

  const { data, entities, total } = useMemo(() => {
    return getGraphDataByEntityType(
      totalEntitiesOwnerByType?.data ?? [],
      DataInsightChartType.PercentageOfEntitiesWithOwnerByType
    );
  }, [totalEntitiesOwnerByType]);

  const targetValue = useMemo(() => {
    if (kpi?.targetDefinition) {
      return Number(kpi.targetDefinition[0].value) * 100;
    }

    return undefined;
  }, [kpi]);

  const { t } = useTranslation();

  const fetchTotalEntitiesOwnerByType = async () => {
    setIsLoading(true);
    try {
      const params = {
        ...chartFilter,
        dataInsightChartName:
          DataInsightChartType.PercentageOfEntitiesWithOwnerByType,
        dataReportIndex: DataReportIndex.EntityReportDataIndex,
      };
      const response = await getAggregateChartData(params);

      setTotalEntitiesOwnerByType(response);
    } catch (error) {
      showErrorToast(error as AxiosError);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLegendClick: LegendProps['onClick'] = (event) => {
    setActiveKeys((prevActiveKeys) =>
      updateActiveChartFilter(event.dataKey, prevActiveKeys)
    );
  };
  const handleLegendMouseEnter: LegendProps['onMouseEnter'] = (event) => {
    setActiveMouseHoverKey(event.dataKey);
  };
  const handleLegendMouseLeave: LegendProps['onMouseLeave'] = () => {
    setActiveMouseHoverKey('');
  };

  useEffect(() => {
    fetchTotalEntitiesOwnerByType();
  }, [chartFilter]);

  return (
    <Card
      className="data-insight-card"
      data-testid="entity-summary-card-percentage"
      id={DataInsightChartType.PercentageOfEntitiesWithOwnerByType}
      loading={isLoading}
      title={
        <>
          <Typography.Title level={5}>
            {t('label.data-insight-owner-summary')}
          </Typography.Title>
          <Typography.Text className="data-insight-label-text">
            {t('message.field-insight', { field: 'owner' })}
          </Typography.Text>
        </>
      }>
      <DataInsightProgressBar
        className="m-b-md"
        progress={Number(total)}
        target={targetValue}
        width={250}
      />
      {data.length ? (
        <ResponsiveContainer debounce={1} minHeight={400}>
          <LineChart data={data} margin={BAR_CHART_MARGIN}>
            <CartesianGrid stroke={GRAPH_BACKGROUND_COLOR} vertical={false} />
            <XAxis dataKey="timestamp" />
            <YAxis
              tickFormatter={(value: number) => axisTickFormatter(value, '%')}
            />
            <Tooltip content={<CustomTooltip isPercentage />} />
            <Legend
              align="left"
              content={(props) =>
                renderLegend(props as LegendProps, total, activeKeys, true)
              }
              layout="vertical"
              verticalAlign="top"
              wrapperStyle={{ left: '0px', top: '0px' }}
              onClick={handleLegendClick}
              onMouseEnter={handleLegendMouseEnter}
              onMouseLeave={handleLegendMouseLeave}
            />
            {entities.map((entity) => (
              <Line
                dataKey={entity}
                hide={
                  activeKeys.length && entity !== activeMouseHoverKey
                    ? !activeKeys.includes(entity)
                    : false
                }
                key={entity}
                stroke={ENTITIES_BAR_COLO_MAP[entity]}
                strokeOpacity={
                  isEmpty(activeMouseHoverKey) || entity === activeMouseHoverKey
                    ? DEFAULT_CHART_OPACITY
                    : HOVER_CHART_OPACITY
                }
                type="monotone"
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <EmptyGraphPlaceholder />
      )}
    </Card>
  );
};

export default OwnerInsight;
