/*
 *  Copyright 2023 Collate.
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
import { FeedFilter } from 'enums/mydata.enum';
import { ReactionOperation } from 'enums/reactions.enum';
import { Operation } from 'fast-json-patch';
import {
  Post,
  ReactionType,
  Thread,
  ThreadType,
} from 'generated/entity/feed/thread';

export interface ActivityFeedProviderContextType {
  loading: boolean;
  isDrawerLoading: boolean;
  entityThread: Thread[];
  selectedThread: Thread | undefined;
  isDrawerOpen: boolean;
  focusReplyEditor: boolean;
  deleteFeed: (
    threadId: string,
    postId: string,
    isThread: boolean
  ) => Promise<void>;
  postFeed: (value: string, id: string) => Promise<void>;
  updateFeed: (
    threadId: string,
    postId: string,
    isThread: boolean,
    data: Operation[]
  ) => void;
  refreshActivityFeed: (threads: Thread[]) => void;
  getFeedData: (
    filterType?: FeedFilter,
    after?: string,
    type?: ThreadType
  ) => Promise<void>;
  showDrawer: (thread: Thread) => void;
  hideDrawer: () => void;
  updateEditorFocus: (isFocused: boolean) => void;
  updateReactions: (
    post: Post,
    feedId: string,
    isThread: boolean,
    reactionType: ReactionType,
    reactionOperation: ReactionOperation
  ) => void;
}
