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
import { Filters } from '../../generated/settings/settings';

export const formData = [
  {
    eventType: 'entityCreated',
    include: [],
    exclude: [],
  },
  {
    eventType: 'entityUpdated',
    include: [],
    exclude: [],
  },
  {
    eventType: 'entitySoftDeleted',
    include: [],
    exclude: [],
  },
  {
    eventType: 'entityDeleted',
    include: [],
    exclude: [],
  },
] as Filters[];

export const ActivityFeedEntity = {
  table: 'Table',
  topic: 'Topic',
  dashboard: 'Dashboard',
  pipeline: 'Pipeline',
  mlmodel: 'ML Model',
  testCase: 'Test Case',
} as Record<string, string>;
