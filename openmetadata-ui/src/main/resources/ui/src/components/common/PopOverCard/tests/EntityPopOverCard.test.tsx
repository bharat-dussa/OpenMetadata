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

import React from 'react';
import renderer from 'react-test-renderer';
import EntityPopOverCard from '../EntityPopOverCard';

const mockProps = {
  entityFQN: 'sample_data.ecommerce_db.shopify.test_raw_catalog',
  entityType: 'table',
};

const mockTableResponse = {
  id: '58d79106-580e-4481-9381-b1d9d6926e15',
  name: 'test_raw_catalog',
  fullyQualifiedName: 'sample_data.ecommerce_db.shopify.test_raw_catalog',
  description:
    'This is a raw product catalog table contains the product listing, price, seller etc.. represented in our online DB. ',
  version: 0.2,
  updatedAt: 1662539497885,
  updatedBy: 'anonymous',
  href: 'http://localhost:8585/api/v1/tables/58d79106-580e-4481-9381-b1d9d6926e15',
  tableType: 'Regular',
  columns: [
    {
      name: 'comments',
      dataType: 'STRING',
      dataLength: 1,
      dataTypeDisplay: 'string',
      fullyQualifiedName:
        'sample_data.ecommerce_db.shopify.test_raw_catalog.comments',
      tags: [],
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
        'sample_data.ecommerce_db.shopify.test_raw_catalog.products',
      tags: [],
      constraint: 'NULL',
      ordinalPosition: 2,
    },
    {
      name: 'platform',
      dataType: 'STRING',
      dataLength: 1,
      dataTypeDisplay: 'string',
      fullyQualifiedName:
        'sample_data.ecommerce_db.shopify.test_raw_catalog.platform',
      tags: [],
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
        'sample_data.ecommerce_db.shopify.test_raw_catalog.store_address',
      tags: [],
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
        'sample_data.ecommerce_db.shopify.test_raw_catalog.first_order_date',
      tags: [],
      ordinalPosition: 5,
    },
    {
      name: 'last_order_date',
      dataType: 'TIMESTAMP',
      dataTypeDisplay: 'timestamp',
      description:
        'The date (ISO 8601) and time (UTC) when the customer placed their most recent order. The format is YYYY-MM-DD HH:mm:ss (for example, 2016-02-05 17:04:01).',
      fullyQualifiedName:
        'sample_data.ecommerce_db.shopify.test_raw_catalog.last_order_date',
      tags: [],
      ordinalPosition: 6,
    },
  ],
  owner: {
    id: 'f4f7a696-c479-4784-9896-8f30d12e74e1',
    type: 'user',
    name: 'aaron_johnson0',
    fullyQualifiedName: 'aaron_johnson0',
    displayName: 'Aaron Johnson',
    deleted: false,
    href: 'http://localhost:8585/api/v1/users/f4f7a696-c479-4784-9896-8f30d12e74e1',
  },
  databaseSchema: {
    id: 'b8e9fe75-4767-44da-a93e-d53da1f4c150',
    type: 'databaseSchema',
    name: 'shopify',
    fullyQualifiedName: 'sample_data.ecommerce_db.shopify',
    description:
      'This **mock** database contains schema related to shopify sales and orders with related dimension tables.',
    deleted: false,
    href: 'http://localhost:8585/api/v1/databaseSchemas/b8e9fe75-4767-44da-a93e-d53da1f4c150',
  },
  database: {
    id: '6e9e83e5-f980-4b71-8e92-beb899829224',
    type: 'database',
    name: 'ecommerce_db',
    fullyQualifiedName: 'sample_data.ecommerce_db',
    description:
      'This **mock** database contains schemas related to shopify sales and orders with related dimension tables.',
    deleted: false,
    href: 'http://localhost:8585/api/v1/databases/6e9e83e5-f980-4b71-8e92-beb899829224',
  },
  service: {
    id: 'd82fd5f5-6e16-4111-aae9-4e149075410d',
    type: 'databaseService',
    name: 'sample_data',
    fullyQualifiedName: 'sample_data',
    deleted: false,
    href: 'http://localhost:8585/api/v1/services/databaseServices/d82fd5f5-6e16-4111-aae9-4e149075410d',
  },
  serviceType: 'BigQuery',
  tags: [],
  changeDescription: {
    fieldsAdded: [
      {
        name: 'owner',
        newValue:
          '{"id":"f4f7a696-c479-4784-9896-8f30d12e74e1","type":"user","name":"aaron_johnson0","fullyQualifiedName":"aaron_johnson0","displayName":"Aaron Johnson","deleted":false}',
      },
    ],
    fieldsUpdated: [],
    fieldsDeleted: [],
    previousVersion: 0.1,
  },
  deleted: false,
};

jest.mock('antd', () => ({
  Popover: jest
    .fn()
    .mockImplementation(({ children }) => <div>{children}</div>),
}));

jest.mock('lodash', () => ({
  uniqueId: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  Link: jest.fn().mockImplementation(({ children }) => <div>{children}</div>),
}));

jest.mock('../../../../AppState', () => ({
  entityData: {
    table: '',
  },
}));

jest.mock('../../../../utils/TableUtils.tsx', () => ({
  getEntityLink: jest.fn().mockReturnValue('/entity-link'),
  getTierTags: jest.fn().mockReturnValue('tags'),
  getTagsWithoutTier: jest
    .fn()
    .mockReturnValue([
      'tagsWithoutTier',
      'tagsWithoutTier2',
      'tagsWithoutTier3',
    ]),
}));

jest.mock('../../../../utils/ToastUtils', () => ({
  showErrorToast: jest.fn(),
}));

jest.mock('../../ProfilePicture/ProfilePicture', () => ({
  ProfilePicture: jest
    .fn()
    .mockImplementation(({ children }) => <div>{children}</div>),
}));

jest.mock('../../rich-text-editor/RichTextEditorPreviewer', () => ({
  RichTextEditorPreviewer: jest
    .fn()
    .mockImplementation(({ children }) => <div>{children}</div>),
}));

jest.mock('../../../../axiosAPIs/tableAPI', () => ({
  getTableDetailsByFQN: jest
    .fn()
    .mockImplementation(() => Promise.resolve(mockTableResponse)),
}));

jest.mock('../../../../axiosAPIs/dashboardAPI', () => ({
  getDashboardByFqn: jest.fn().mockImplementation(() => Promise.resolve()),
}));

jest.mock('../../../../axiosAPIs/databaseAPI', () => ({
  getDatabaseDetailsByFQN: jest
    .fn()
    .mockImplementation(() => Promise.resolve()),
  getDatabaseSchemaDetailsByFQN: jest
    .fn()
    .mockImplementation(() => Promise.resolve()),
}));

jest.mock('../../../../axiosAPIs/mlModelAPI', () => ({
  getMlModelByFQN: jest.fn().mockImplementation(() => Promise.resolve()),
}));

jest.mock('../../../../axiosAPIs/pipelineAPI', () => ({
  getPipelineByFqn: jest.fn().mockImplementation(() => Promise.resolve()),
}));

jest.mock('../../../../axiosAPIs/topicsAPI', () => ({
  getTopicByFqn: jest.fn().mockImplementation(() => Promise.resolve()),
}));

describe('components > common > EntityPopOverCard', () => {
  it('On mount, EntityPopOverCard  should render', async () => {
    const tree = renderer.create(<EntityPopOverCard {...mockProps} />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
