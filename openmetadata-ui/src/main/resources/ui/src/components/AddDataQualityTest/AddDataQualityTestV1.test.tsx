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

import { render } from '@testing-library/react';
import React from 'react';
import { Table } from '../../generated/entity/data/table';
import AddDataQualityTestV1 from './AddDataQualityTestV1';

const statusRes = {
  status: 200,
};

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
} as Table;

const mockTestSuiteResponse = {
  id: '4ae21a26-d6c1-43a4-a591-31a5c4998e99',
  name: 'test_suite_2',
  fullyQualifiedName: 'test_suite_2',
  description: 'test_suite_2',
  owner: {
    id: 'f4f7a696-c479-4784-9896-8f30d12e74e1',
    type: 'user',
    name: 'aaron_johnson0',
    fullyQualifiedName: 'aaron_johnson0',
    displayName: 'Aaron Johnson',
    deleted: false,
    href: 'http://localhost:8585/api/v1/users/f4f7a696-c479-4784-9896-8f30d12e74e1',
  },
  version: 0.1,
  updatedAt: 1662448232955,
  updatedBy: 'anonymous',
  href: 'http://localhost:8585/api/v1/testSuite/4ae21a26-d6c1-43a4-a591-31a5c4998e99',
  deleted: false,
};

const mockTestCaseResponse = {
  id: '080e6d1e-523e-47a6-baab-dac4081a0b72',
  name: 'raw_product_catalog_TableColumnCountToBeBetween',
  fullyQualifiedName:
    'sample_data.ecommerce_db.shopify.raw_product_catalog.raw_product_catalog_TableColumnCountToBeBetween',
  description: '',
  testDefinition: {
    id: 'f4526a08-7203-4e97-ba0b-58ce180fe59c',
    type: 'testDefinition',
    href: 'http://localhost:8585/api/v1/testDefinition/f4526a08-7203-4e97-ba0b-58ce180fe59c',
  },
  entityLink:
    '<#E::table::sample_data.ecommerce_db.shopify.raw_product_catalog>',
  entityFQN: 'sample_data.ecommerce_db.shopify.raw_product_catalog',
  testSuite: {
    id: '4ae21a26-d6c1-43a4-a591-31a5c4998e99',
    type: 'testSuite',
    href: 'http://localhost:8585/api/v1/testSuite/4ae21a26-d6c1-43a4-a591-31a5c4998e99',
  },
  parameterValues: [
    {
      name: 'minColValue',
      value: '1',
    },
    {
      name: 'maxColValue',
      value: '2',
    },
  ],
  version: 0.1,
  owner: {
    id: 'f4f7a696-c479-4784-9896-8f30d12e74e1',
    type: 'user',
    name: 'aaron_johnson0',
    fullyQualifiedName: 'aaron_johnson0',
    displayName: 'Aaron Johnson',
    deleted: false,
    href: 'http://localhost:8585/api/v1/users/f4f7a696-c479-4784-9896-8f30d12e74e1',
  },
  updatedAt: 1662448233057,
  updatedBy: 'anonymous',
  href: 'http://localhost:8585/api/v1/testCase/080e6d1e-523e-47a6-baab-dac4081a0b72',
  deleted: false,
};

const mockPushFunction = jest.fn();

jest.mock('react-router-dom', () => ({
  useParams: jest.fn().mockReturnValue({
    entityTypeFQN: 'sample_data.ecommerce_db.shopify.raw_product_catalog',
    dashboardType: 'column',
  }),

  useHistory: jest.fn().mockImplementation(() => ({
    push: mockPushFunction,
  })),
}));

jest.mock('antd', () => ({
  Col: jest.fn().mockImplementation(({ children }) => <div>{children}</div>),
  Row: jest.fn().mockImplementation(({ children }) => <div>{children}</div>),
  Typography: {
    Paragraph: jest
      .fn()
      .mockImplementation(({ children }) => <div>{children}</div>),
  },
}));

jest.mock('lodash', () => ({
  isUndefined: jest.fn(),
}));

jest.mock('../../axiosAPIs/ingestionPipelineAPI', () => ({
  checkAirflowStatus: jest
    .fn()
    .mockImplementation(() => Promise.resolve(statusRes)),
}));

jest.mock('../../axiosAPIs/testAPI', () => ({
  createTestCase: jest
    .fn()
    .mockImplementation(() => Promise.resolve(mockTestCaseResponse)),
  createTestSuites: jest
    .fn()
    .mockImplementation(() => Promise.resolve(mockTestSuiteResponse)),
}));

jest.mock('../../utils/CommonUtils', () => ({
  getCurrentUserId: jest.fn().mockImplementation(() => 'userId123'),
  getEntityName: jest.fn().mockImplementation(() => 'test_entity'),
  getPartialNameFromTableFQN: jest
    .fn()
    .mockImplementation(() => 'testTableName'),
}));

jest.mock('../../utils/ToastUtils', () => ({
  showErrorToast: jest.fn(),
}));

jest.mock('../../utils/RouterUtils', () => ({
  getTestSuitePath: jest.fn().mockReturnValue('/test_suite_2'),
}));

jest.mock('../../utils/ServiceUtils', () => ({
  serviceTypeLogo: jest.fn().mockReturnValue(<div>logo</div>),
}));

jest.mock('../common/title-breadcrumb/title-breadcrumb.component', () => {
  return jest.fn().mockImplementation(() => {
    return <div>test-breadcrumb</div>;
  });
});

jest.mock('../common/success-screen/SuccessScreen', () => {
  return jest.fn().mockImplementation(() => {
    return <div>SuccessScreen</div>;
  });
});

jest.mock('../IngestionStepper/IngestionStepper.component', () => {
  return jest.fn().mockImplementation(({ activeStep = 1, steps }) => {
    return (
      <div>
        {(steps as Array<{ name: string; step: number }>).map((step, index) => (
          <div key={index}>{step.step}</div>
        ))}
        <div data-testid="active-step">{activeStep}</div>{' '}
        <p>IngestionStepper</p>
      </div>
    );
  });
});

jest.mock('./components/RightPanel', () => {
  return jest.fn().mockImplementation(({ data }) => {
    return (
      <div>
        <p>RightPanel</p>
        <p>{data.title}</p>
        <p>{data.body}</p>
      </div>
    );
  });
});

jest.mock('./components/SelectTestSuite', () => {
  return jest.fn().mockImplementation(({ initialValue, onSubmit }) => {
    return (
      <div onClick={onSubmit}>
        {JSON.stringify(initialValue)} SelectTestSuite
      </div>
    );
  });
});

jest.mock('./components/TestCaseForm', () => {
  return jest
    .fn()
    .mockImplementation(({ initialValue, onCancel, onSubmit }) => {
      return (
        <div onClick={onSubmit}>
          <div>{initialValue}</div>
          <div onClick={onCancel}>Cancel Button</div>
          <div>TestCaseForm</div>
        </div>
      );
    });
});

jest.mock('./TestSuiteIngestion', () => {
  return jest.fn().mockImplementation(() => {
    return <div>TestSuiteIngestion</div>;
  });
});

jest.mock('./rightPanelData', () => ({
  addTestSuiteRightPanel: jest
    .fn()
    .mockReturnValue(() => 'addTestSuiteRightPanel'),
  INGESTION_DATA: jest.fn().mockReturnValue({
    title: 'Scheduler for Tests',
    body: 'The data quality tests can be scheduled to run at the desired frequency. The timezone is in UTC.',
  }),
}));

describe('AddDataQualityTestV1.tsx', () => {
  it('On mount, AddDataQualityTestV1 should render', async () => {
    const { findByText } = render(
      <AddDataQualityTestV1 table={mockTableDetailsRes} />
    );

    expect(await findByText('RightPanel')).toBeInTheDocument();
    expect(await findByText('SelectTestSuite')).toBeInTheDocument();
    expect(await findByText('IngestionStepper')).toBeInTheDocument();
    expect(await findByText('Add Column Test')).toBeInTheDocument();
  });
});
