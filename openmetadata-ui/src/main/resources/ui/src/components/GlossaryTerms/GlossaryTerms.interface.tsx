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
import { EventDataNode, Key } from 'rc-tree/lib/interface';
import { Glossary } from '../../generated/entity/data/glossary';
import { GlossaryTerm } from '../../generated/entity/data/glossaryTerm';
import { TitleBreadcrumbProps } from '../common/title-breadcrumb/title-breadcrumb.interface';

export interface GlossaryTermsProps {
  allowAccess: boolean;
  slashedTableName: TitleBreadcrumbProps['titleLinks'];
  glossaryDetails: Glossary;
  glossaryTermsDetails: Array<GlossaryTerm>;
  activeGlossaryTerm: GlossaryTerm | undefined;
  activeTab: number;
  showGlossaryDetails: boolean;
  selectedKeys: string;
  expandedKeys: string[];
  queryParams: string;
  tagList: string[];
  isTagLoading: boolean;
  fetchTags: () => void;
  activeTabHandler: (value: number) => void;
  updateGlossaryDescription: (value: Glossary) => void;
  updateReviewer: (value: Glossary) => void;
  handleSelectedKey: (value: string) => void;
  handleGlossaryTermUpdate: (data: GlossaryTerm) => void;
  handleExpand: (
    expandedKeys: Key[],
    info?: {
      node: EventDataNode;
      expanded: boolean;
      nativeEvent: MouseEvent;
    }
  ) => void;
  handleActiveGlossaryTerm: (
    term: GlossaryTerm | undefined,
    id: string
  ) => void;
}
