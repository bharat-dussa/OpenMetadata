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
import { capitalize } from 'lodash';
import { ElementLoadingState } from '../components/EntityLineage/EntityLineage.interface';
import { EntityType } from '../enums/entity.enum';

export const foreignObjectSize = 40;
export const zoomValue = 1;

export const entityData = [
  {
    type: EntityType.TABLE,
    label: capitalize(EntityType.TABLE),
  },
  { type: EntityType.PIPELINE, label: capitalize(EntityType.PIPELINE) },
  { type: EntityType.DASHBOARD, label: capitalize(EntityType.DASHBOARD) },
  { type: EntityType.TOPIC, label: capitalize(EntityType.TOPIC) },
  { type: EntityType.MLMODEL, label: capitalize(EntityType.MLMODEL) },
];

export const positionX = 150;
export const positionY = 60;

export const nodeWidth = 400;
export const nodeHeight = 50;

export const ELEMENT_DELETE_STATE = {
  loading: false,
  status: 'initial' as ElementLoadingState,
};
