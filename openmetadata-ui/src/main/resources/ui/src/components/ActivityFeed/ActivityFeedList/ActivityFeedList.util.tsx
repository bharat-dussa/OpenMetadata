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
import SVGIcons, { Icons } from '../../../utils/SvgUtils';

export const filterList = [
  {
    name: 'All Activity',
    value: 'ALL',
    icon: (
      <SVGIcons
        alt="All Activity"
        className="tw-mr-2"
        icon={Icons.ALL_APPLICATION}
        width="16px"
      />
    ),
  },
  {
    name: 'My Data',
    value: 'OWNER',
    icon: (
      <SVGIcons
        alt="My Data"
        className="tw-mr-2"
        icon={Icons.FOLDER}
        width="16px"
      />
    ),
  },
  {
    name: 'Mentions',
    value: 'MENTIONS',
    icon: (
      <SVGIcons
        alt="Mentions"
        className="tw-mr-2"
        icon={Icons.MENTIONS}
        width="16px"
      />
    ),
  },
  {
    name: 'Following',
    value: 'FOLLOWS',
    icon: (
      <SVGIcons
        alt="Following"
        className="tw-mr-2"
        icon={Icons.STAR}
        width="16px"
      />
    ),
  },
];

export const threadFilterList = [
  {
    name: 'All Threads',
    value: 'ALL',
    icon: (
      <SVGIcons
        alt="All Threads"
        className="tw-mr-2"
        icon={Icons.ALL_APPLICATION}
        width="16px"
      />
    ),
  },
  {
    name: 'Task',
    value: 'Task',
    icon: (
      <SVGIcons alt="Task" className="tw-mr-2" icon={Icons.TASK} width="16px" />
    ),
  },
  {
    name: 'Conversation',
    value: 'Conversation',
    icon: (
      <SVGIcons
        alt="Conversation"
        className="tw-mr-2"
        icon={Icons.COMMENT_GREY}
        width="16px"
      />
    ),
  },
  {
    name: 'Announcement',
    value: 'Announcement',
    icon: (
      <SVGIcons
        alt="Announcement"
        className="tw-mr-2"
        icon={Icons.ANNOUNCEMENT_BLACK}
        width="16px"
      />
    ),
  },
];

export const filterListTasks = [
  { name: 'All Activity', value: 'ALL' },
  { name: 'Assigned to me', value: 'ASSIGNED_TO' },
  { name: 'Created by me', value: 'ASSIGNED_BY' },
];
