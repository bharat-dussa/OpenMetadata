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
import { ResourceEntity } from '../components/PermissionProvider/PermissionProvider.interface';

export const getResourceEntityFromCustomProperty = (property: string) => {
  switch (property) {
    case 'tables':
      return ResourceEntity.TABLE;

    case 'topics':
      return ResourceEntity.TOPIC;

    case 'dashboards':
      return ResourceEntity.DASHBOARD;

    case 'pipelines':
      return ResourceEntity.PIPELINE;

    case 'mlModels':
      return ResourceEntity.ML_MODEL;
  }

  return ResourceEntity.TABLE;
};
