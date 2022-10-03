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
import { xor } from 'lodash';
import { EventFilter, EventType } from '../../generated/settings/settings';

export const getEventFilterFromTree = (
  updatedTree: Record<string, string[]>,
  eventFilters: EventFilter[]
): EventFilter[] => {
  return eventFilters.map((eventFilter) => ({
    ...eventFilter,
    filters: eventFilter.filters?.map((filter) => {
      let includeList = filter.include;
      let excludeList = filter.exclude;

      // derive the merge list
      const mergedList = [
        ...(includeList as string[]),
        ...(excludeList as string[]),
      ];

      // manipulate tree if event type is present
      if (updatedTree[eventFilter.entityType]) {
        // Split the value to get list of [eventType, filter, event]
        const temp = updatedTree[eventFilter.entityType].map((key) =>
          key.split('-')
        );

        // grab the list of current eventType
        const eventList = temp.filter((f) => f[1] === filter.eventType);

        if (eventList.length > 0) {
          if (filter.eventType === EventType.EntityUpdated) {
            // derive include list based on selected events
            includeList = eventList.map((f) => f[2]).filter(Boolean);

            // derive the exclude list by symmetric difference
            excludeList = xor(mergedList, includeList);
          } else {
            includeList = ['all'];
            excludeList = [];
          }
        } else {
          excludeList = [...(includeList ?? []), ...(excludeList ?? [])];
          includeList = [];
        }
      }

      return {
        ...filter,
        include: includeList,
        exclude: excludeList,
      };
    }),
  }));
};
