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
import { Store } from 'antd/lib/form/interface';
import { isEqual, isUndefined } from 'lodash';
import {
  EVENT_FILTERS_DEFAULT_VALUE,
  EVENT_FILTER_FORM_INITIAL_VALUE,
} from '../components/AddWebhook/WebhookConstants';
import { TERM_ALL } from '../constants/constants';
import {
  EventFilter,
  EventType,
  Filters,
} from '../generated/entity/events/webhook';

export const getEventFilters = (data: Store): EventFilter[] => {
  if (isEqual(data, EVENT_FILTER_FORM_INITIAL_VALUE)) {
    return [EVENT_FILTERS_DEFAULT_VALUE];
  }

  const newFilters = Object.entries(data).reduce((acc, [key, value]) => {
    if (key.includes('-tree')) {
      return acc;
    }
    if (value) {
      const selectedFilter = data[`${key}-tree`] as string[];
      const entityUpdatedFields = selectedFilter
        ?.map((filter) =>
          filter.includes(`${EventType.EntityUpdated}-`)
            ? filter.split('-')[1]
            : undefined
        )
        .filter((filter) => filter);

      const eventFilters = [
        ...selectedFilter.filter(
          (filter) => !filter.includes(`${EventType.EntityUpdated}-`)
        ),
        entityUpdatedFields ? EventType.EntityUpdated : undefined,
      ];

      const includeData = (entityUpdatedFields as string[]).filter(
        (entityUpdatedField) => !isUndefined(entityUpdatedField)
      );

      return [
        ...acc,
        {
          entityType: key,
          filters:
            eventFilters[0] === TERM_ALL
              ? EVENT_FILTERS_DEFAULT_VALUE.filters
              : (eventFilters.map((filter) => ({
                  eventType: filter,
                  include:
                    filter === EventType.EntityUpdated
                      ? includeData
                      : [TERM_ALL],
                  exclude: [],
                })) as Filters[]),
        },
      ];
    }

    return acc;
  }, [] as EventFilter[]);

  return [EVENT_FILTERS_DEFAULT_VALUE, ...newFilters];
};
