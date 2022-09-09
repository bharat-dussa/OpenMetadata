/* eslint-disable @typescript-eslint/camelcase */
/*
 *  Copyright 2022 Collate
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

import {
  getAggregationList,
  getAggregationListFromQS,
} from '../AggregationUtils';

const mockSearchAggregation = {
  aggregations: {
    'sterms#Service': {
      doc_count_error_upper_bound: 0,
      sum_other_doc_count: 0,
      buckets: [
        {
          key: 'BigQuery',
          doc_count: 3,
        },
      ],
    },
    'sterms#Dashboard': {
      doc_count_error_upper_bound: 0,
      sum_other_doc_count: 0,
      buckets: [
        {
          key: 'BigQuery',
          doc_count: 3,
        },
      ],
    },
  },
};

const mockAggregationList = [
  {
    title: 'Service',
    buckets: [
      {
        key: 'BigQuery',
        doc_count: 3,
      },
    ],
  },
  {
    title: 'Dashboard',
    buckets: [
      {
        key: 'BigQuery',
        doc_count: 3,
      },
    ],
  },
];

const searchParam = '?searchFilter=service%3DBigQuery';

const mockAggregationFromQS = [
  {
    title: 'Searchfilter',
    buckets: [
      {
        key: 'service%3DBigQuery',
        doc_count: 0,
      },
    ],
  },
];

describe('utils | AggregationUtils', () => {
  it('AggregationUtils | getDropDownItems, with valid params and without aggregationType it should return an array of all aggregations.', () => {
    const aggregationList = getAggregationList(
      mockSearchAggregation.aggregations,
      ''
    );

    expect(aggregationList).toEqual(mockAggregationList);
  });

  it('AggregationUtils | getDropDownItems, with valid params and with aggregationType it should return an array of aggregation.', () => {
    const aggregationList = getAggregationList(
      mockSearchAggregation.aggregations,
      'service'
    );

    const res = [mockAggregationList[0]];

    expect(aggregationList).toEqual(res);
  });

  it('AggregationUtils | getDropDownItems, with empty params it should return an empty array.', () => {
    const aggregationList = getAggregationList({}, '');

    expect(aggregationList).toEqual([]);
  });
});

describe('utils | getAggregationListFromQS', () => {
  it('AdvancedSearchUtils | getAggregationListFromQS, with valid params it should return an array of aggregations', () => {
    const aggregationListQS = getAggregationListFromQS(searchParam);

    expect(aggregationListQS).toEqual(mockAggregationFromQS);
  });

  it('AdvancedSearchUtils | getAggregationListFromQS, with non-valid string it should return undefined', () => {
    const aggregationListQS = getAggregationListFromQS('');

    expect(aggregationListQS).toEqual([]);
  });
});
