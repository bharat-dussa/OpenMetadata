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

import { cleanup, render } from '@testing-library/react';
import React from 'react';
import { ProfilerDashboardType } from '../../enums/table.enum';
import AddDataQualityTestPage from './AddDataQualityTestPage';

const mockTableDetailsRes = {
  id: '8cc9a71d-643f-4265-9dad-b8d923c10304',
  name: 'raw_product_catalog',
  fullyQualifiedName: 'sample_data.ecommerce_db.shopify.raw_product_catalog',
  description:
    'This is a raw product catalog table contains the product listing, price, seller etc.. represented in our online DB. ',
  version: 0.1,
  updatedAt: 1662099938848,
  updatedBy: 'anonymous',
  href: 'http://localhost:8585/api/v1/tables/8cc9a71d-643f-4265-9dad-b8d923c10304',
  tableType: 'Regular',
  columns: [
    {
      name: 'comments',
      dataType: 'STRING',
      dataLength: 1,
      dataTypeDisplay: 'string',
      fullyQualifiedName:
        'sample_data.ecommerce_db.shopify.raw_product_catalog.comments',
      constraint: 'NULL',
      ordinalPosition: 1,
    },
    {
      name: 'products',
      dataType: 'ARRAY',
      arrayDataType: 'STRUCT',
      dataLength: 1,
      dataTypeDisplay:
        'array<struct<product_id:character varying(24),price:int,onsale:boolean,tax:int,weight:int,others:int,vendor:character varying(64), stock:int>>',
      fullyQualifiedName:
        'sample_data.ecommerce_db.shopify.raw_product_catalog.products',
      constraint: 'NULL',
      ordinalPosition: 2,
    },
    {
      name: 'platform',
      dataType: 'STRING',
      dataLength: 1,
      dataTypeDisplay: 'string',
      fullyQualifiedName:
        'sample_data.ecommerce_db.shopify.raw_product_catalog.platform',
      constraint: 'NULL',
      ordinalPosition: 3,
    },
    {
      name: 'store_address',
      dataType: 'ARRAY',
      arrayDataType: 'STRUCT',
      dataLength: 1,
      dataTypeDisplay:
        'array<struct<name:character varying(32),street_address:character varying(128),city:character varying(32),postcode:character varying(8)>>',
      fullyQualifiedName:
        'sample_data.ecommerce_db.shopify.raw_product_catalog.store_address',
      constraint: 'NULL',
      ordinalPosition: 4,
    },
    {
      name: 'first_order_date',
      dataType: 'TIMESTAMP',
      dataTypeDisplay: 'timestamp',
      description:
        'The date (ISO 8601) and time (UTC) when the customer placed their first order. The format is YYYY-MM-DD HH:mm:ss (for example, 2016-02-05 17:04:01).',
      fullyQualifiedName:
        'sample_data.ecommerce_db.shopify.raw_product_catalog.first_order_date',
      ordinalPosition: 5,
    },
    {
      name: 'last_order_date',
      dataType: 'TIMESTAMP',
      dataTypeDisplay: 'timestamp',
      description:
        'The date (ISO 8601) and time (UTC) when the customer placed their most recent order. The format is YYYY-MM-DD HH:mm:ss (for example, 2016-02-05 17:04:01).',
      fullyQualifiedName:
        'sample_data.ecommerce_db.shopify.raw_product_catalog.last_order_date',
      ordinalPosition: 6,
    },
  ],
  databaseSchema: {
    id: '88bcf342-21bc-42da-aeb6-8b2af2a201dd',
    type: 'databaseSchema',
    name: 'shopify',
    fullyQualifiedName: 'sample_data.ecommerce_db.shopify',
    description:
      'This **mock** database contains schema related to shopify sales and orders with related dimension tables.',
    deleted: false,
    href: 'http://localhost:8585/api/v1/databaseSchemas/88bcf342-21bc-42da-aeb6-8b2af2a201dd',
  },
  database: {
    id: 'f70fa259-a225-4355-b35a-b6ba79933487',
    type: 'database',
    name: 'ecommerce_db',
    fullyQualifiedName: 'sample_data.ecommerce_db',
    description:
      'This **mock** database contains schemas related to shopify sales and orders with related dimension tables.',
    deleted: false,
    href: 'http://localhost:8585/api/v1/databases/f70fa259-a225-4355-b35a-b6ba79933487',
  },
  service: {
    id: 'd41d28fc-4b7d-4b51-af2a-5b4969498788',
    type: 'databaseService',
    name: 'sample_data',
    fullyQualifiedName: 'sample_data',
    deleted: false,
    href: 'http://localhost:8585/api/v1/services/databaseServices/d41d28fc-4b7d-4b51-af2a-5b4969498788',
  },
  serviceType: 'BigQuery',
  deleted: false,
};

jest.mock('react-router-dom', () => ({
  useParams: jest.fn().mockImplementation(() => ({
    entityTypeFQN: 'entityTypeFQN',
    dashboardType: ProfilerDashboardType.COLUMN,
  })),
}));

jest.mock('../../axiosAPIs/tableAPI', () => ({
  getTableDetailsByFQN: jest
    .fn()
    .mockImplementation(() => Promise.resolve(mockTableDetailsRes)),
}));

// jest.mock('../../components/AddDataQualityTest/AddDataQualityTestV1', () => ({
//   AddDataQualityTestV1: jest.fn().mockImplementation(({ table }) => (
//     <div>
//       AddDataQualityTestV1.component <p>{table}</p>
//     </div>
//   )),
// }));

jest.mock('../../components/containers/PageContainerV1', () => {
  return jest.fn().mockImplementation(({ children }) => (
    <div>
      {children}
      <p>PageContainerV1.container</p>
    </div>
  ));
});

jest.mock('../../components/AddDataQualityTest/AddDataQualityTestV1', () => {
  return jest.fn().mockImplementation(({ table }) => {
    return (
      <div>
        {JSON.stringify(table)}
        <p>AddDataQualityTestV1.component</p>
      </div>
    );
  });
});

jest.mock('../../utils/CommonUtils', () => ({
  getTableFQNFromColumnFQN: jest.fn().mockImplementation(() => 'column'),
}));

jest.mock('../../utils/ToastUtils', () => ({
  showErrorToast: jest.fn(),
}));

describe('AddDataQualityTestPage', () => {
  beforeEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it('On Load, AddDataQualityTestPage should render', async () => {
    const { findByText } = render(<AddDataQualityTestPage />);

    expect(
      await findByText('AddDataQualityTestV1.component')
    ).toBeInTheDocument();
  });
});
