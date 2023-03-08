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
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Button, Col, Input, Row, Space, Tooltip, Typography } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import Description from 'components/common/description/Description';
import ProfilePicture from 'components/common/ProfilePicture/ProfilePicture';
import DropDownList from 'components/dropdown/DropDownList';
import { OperationPermission } from 'components/PermissionProvider/PermissionProvider.interface';
import { WILD_CARD_CHAR } from 'constants/char.constants';
import { getUserPath } from 'constants/constants';
import { EntityReference, Glossary } from 'generated/entity/data/glossary';
import { GlossaryTerm } from 'generated/entity/data/glossaryTerm';
import { cloneDeep, debounce, isEqual, uniqBy } from 'lodash';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { getEntityName } from 'utils/CommonUtils';
import { getOwnerList } from 'utils/ManageUtils';
import SVGIcons, { Icons } from 'utils/SvgUtils';
import {
  isCurrentUserAdmin,
  searchFormattedUsersAndTeams,
  suggestFormattedUsersAndTeams,
} from 'utils/UserDataUtils';

export interface GlossaryHeaderProps {
  supportAddOwner?: boolean;
  selectedData: Glossary | GlossaryTerm;
  permissions: OperationPermission;
  onUpdate: (data: GlossaryTerm | Glossary) => void;
}

const GlossaryHeader = ({
  selectedData,
  permissions,
  onUpdate,
}: GlossaryHeaderProps) => {
  const { t } = useTranslation();

  const [displayName, setDisplayName] = useState<string>();
  const [isNameEditing, setIsNameEditing] = useState<boolean>(false);
  const [isDescriptionEditable, setIsDescriptionEditable] =
    useState<boolean>(false);
  const [listVisible, setListVisible] = useState<boolean>(false);
  const [isUserLoading, setIsUserLoading] = useState<boolean>(false);
  const [listOwners, setListOwners] = useState(getOwnerList());
  const [searchText, setSearchText] = useState<string>('');
  const [showReviewerModal, setShowReviewerModal] = useState<boolean>(false);

  const editDisplayNamePermission = useMemo(() => {
    return permissions.EditAll || permissions.EditDisplayName;
  }, [permissions]);

  const onDisplayNameChange = (value: string) => {
    if (selectedData.displayName !== value) {
      setDisplayName(value);
    }
  };

  const onDisplayNameSave = () => {
    let updatedDetails = cloneDeep(selectedData);

    updatedDetails = {
      ...selectedData,
      displayName: displayName?.trim(),
      name: displayName?.trim() || selectedData.name,
    };

    onUpdate(updatedDetails);

    setIsNameEditing(false);
  };

  const onDescriptionUpdate = async (updatedHTML: string) => {
    if (selectedData.description !== updatedHTML) {
      const updatedTableDetails = {
        ...selectedData,
        description: updatedHTML,
      };
      onUpdate(updatedTableDetails);
      setIsDescriptionEditable(false);
    } else {
      setIsDescriptionEditable(false);
    }
  };
  const getOwnerSearch = useCallback(
    (searchQuery = WILD_CARD_CHAR, from = 1) => {
      setIsUserLoading(true);
      searchFormattedUsersAndTeams(searchQuery, from)
        .then((res) => {
          const { users, teams } = res;
          setListOwners(getOwnerList(users, teams, false, searchQuery));
        })
        .catch(() => {
          setListOwners([]);
        })
        .finally(() => {
          setIsUserLoading(false);
        });
    },
    [setListOwners, setIsUserLoading]
  );
  const handleSelectOwnerDropdown = () => {
    setListVisible((visible) => {
      const newState = !visible;

      if (newState) {
        getOwnerSearch();
      }

      return newState;
    });
  };

  const handleSelectReviewerDropdown = () => {
    setShowReviewerModal((visible) => {
      const newState = !visible;

      if (newState) {
        getOwnerSearch();
      }

      return newState;
    });
  };

  const getOwnerSuggestion = useCallback(
    (qSearchText = '') => {
      setIsUserLoading(true);
      suggestFormattedUsersAndTeams(qSearchText)
        .then((res) => {
          const { users, teams } = res;
          setListOwners(getOwnerList(users, teams, false, qSearchText));
        })
        .catch(() => {
          setListOwners([]);
        })
        .finally(() => {
          setIsUserLoading(false);
        });
    },
    [setListOwners, setIsUserLoading]
  );

  const debouncedOnChange = useCallback(
    (text: string): void => {
      if (text) {
        getOwnerSuggestion(text);
      } else {
        getOwnerSearch();
      }
    },
    [getOwnerSuggestion, getOwnerSearch]
  );

  const debounceOnSearch = useCallback(debounce(debouncedOnChange, 400), [
    debouncedOnChange,
  ]);

  const handleOwnerSearch = (text: string) => {
    setSearchText(text);
    debounceOnSearch(text);
  };

  const handleRemoveReviewer = (id: string) => {
    let updatedGlossary = cloneDeep(selectedData);
    const reviewer = updatedGlossary.reviewers?.filter(
      (glossary) => glossary.id !== id
    );
    updatedGlossary = {
      ...updatedGlossary,
      reviewers: reviewer,
    };

    onUpdate(updatedGlossary);
  };

  const prepareOwner = (updatedOwner?: EntityReference) => {
    return !isEqual(updatedOwner, selectedData.owner)
      ? updatedOwner
      : undefined;
  };
  const handleOwnerSelection = (
    _e: React.MouseEvent<HTMLElement, MouseEvent>,
    value = ''
  ) => {
    const owner = listOwners.find((item) => item.value === value);

    if (owner) {
      const newOwner = prepareOwner({
        type: owner.type,
        id: owner.value || '',
      });
      if (newOwner) {
        const updatedData = {
          ...selectedData,
          owner: newOwner,
        };
        onUpdate(updatedData);
      }
    }
    setListVisible(false);
  };
  const onRemoveOwner = () => {
    const updatedData = {
      ...selectedData,
      owner: undefined,
    };
    onUpdate(updatedData);
    setListVisible(false);
  };

  const onRemoveReviewer = () => {
    const updatedData = {
      ...selectedData,
      owner: undefined,
    };
    onUpdate(updatedData);
  };

  const handleReviewerSave = () => {
    setShowReviewerModal(false);
  };

  const onClickUserTag = (_e: CheckboxChangeEvent, itemId: string) => {
    const removedId = !_e.target.checked ? '' : itemId;
    console.log('removedId:', _e.target.checked, removedId);

    if (selectedData.reviewers) {
      let updatedGlossary = cloneDeep(selectedData);

      const oldReviewers: EntityReference[] = selectedData.reviewers?.map(
        (reviewer) => ({ id: reviewer.id, type: 'user' })
      );

      const newReviewer: EntityReference[] = [{ id: itemId, type: 'user' }];
      const updatedReviewers =
        itemId && _e.target.checked
          ? uniqBy([...oldReviewers, ...newReviewer], 'id')
          : uniqBy([...oldReviewers, ...newReviewer], 'id').filter(
              (reviewer) => reviewer.id !== itemId
            );

      updatedGlossary = {
        ...updatedGlossary,
        reviewers: updatedReviewers,
      };

      onUpdate(updatedGlossary);
    }
  };

  useEffect(() => {
    setDisplayName(selectedData.displayName);
  }, [selectedData]);

  return (
    <Row gutter={[0, 8]}>
      <Col span={24}>
        {isNameEditing ? (
          <Space direction="horizontal">
            <Input
              className="input-width"
              data-testid="displayName"
              name="displayName"
              value={displayName}
              onChange={(e) => onDisplayNameChange(e.target.value)}
            />
            <Button
              data-testid="cancelAssociatedTag"
              icon={<CloseOutlined />}
              size="small"
              type="primary"
              onMouseDown={() => setIsNameEditing(false)}
            />

            <Button
              data-testid="saveAssociatedTag"
              icon={<CheckOutlined />}
              size="small"
              type="primary"
              onMouseDown={onDisplayNameSave}
            />
          </Space>
        ) : (
          <Space direction="horizontal">
            <Typography.Title className="m-b-0" level={5}>
              {getEntityName(selectedData)}
            </Typography.Title>
            <Tooltip
              title={
                editDisplayNamePermission
                  ? t('label.edit-entity', { entity: t('label.name') })
                  : t('message.no-permission-for-action')
              }>
              <Button
                disabled={!editDisplayNamePermission}
                icon={<SVGIcons alt="icon-tag" icon={Icons.EDIT} width="16" />}
                type="text"
                onClick={() => setIsNameEditing(true)}
              />
            </Tooltip>
          </Space>
        )}
      </Col>
      <Col span={24}>
        <Space className="flex-wrap" direction="horizontal">
          <div className="flex items-center">
            <Typography.Text className="text-grey-muted m-r-xs">
              {`${t('label.owner')}:`}
            </Typography.Text>

            {selectedData.owner && getEntityName(selectedData.owner) ? (
              <Space className="m-r-xss" size={4}>
                <ProfilePicture
                  displayName={getEntityName(selectedData.owner)}
                  id={selectedData.owner?.id || ''}
                  name={selectedData.owner?.name || ''}
                  textClass="text-xs"
                  width="20"
                />
                <Link to={getUserPath(selectedData.owner.name ?? '')}>
                  {getEntityName(selectedData.owner)}
                </Link>
              </Space>
            ) : (
              <span className="text-grey-muted">
                {t('label.no-entity', {
                  entity: t('label.owner-lowercase'),
                })}
              </span>
            )}
            <div className="tw-relative">
              <Tooltip
                placement="topRight"
                title={
                  permissions.EditAll || permissions.EditOwner
                    ? t('label.update-entity', {
                        entity: t('label.owner'),
                      })
                    : t('message.no-permission-for-action')
                }>
                <Button
                  className="flex-center p-0"
                  data-testid="owner-dropdown"
                  disabled={!(permissions.EditOwner || permissions.EditAll)}
                  icon={
                    <SVGIcons
                      alt="edit"
                      icon={Icons.EDIT}
                      title="Edit"
                      width="16px"
                    />
                  }
                  size="small"
                  type="text"
                  onClick={handleSelectOwnerDropdown}
                />
              </Tooltip>
              {listVisible && (
                <DropDownList
                  showEmptyList
                  controlledSearchStr={searchText}
                  dropDownList={listOwners}
                  groupType="tab"
                  horzPosRight={false}
                  isLoading={isUserLoading}
                  listGroups={['Teams', 'Users']}
                  removeOwner={onRemoveOwner}
                  showSearchBar={isCurrentUserAdmin()}
                  value={selectedData.owner?.id || ''}
                  onSearchTextChange={handleOwnerSearch}
                  onSelect={handleOwnerSelection}
                />
              )}
            </div>
          </div>
          <span className="tw-mr-1 tw-inline-block tw-text-gray-400">|</span>

          <div
            className="flex items-center tw-flex-wrap"
            data-testid="reviewer-card-container">
            <Typography.Text className="text-grey-muted m-r-xs">
              {`${t('label.reviewer')}:`}
            </Typography.Text>{' '}
            {selectedData.reviewers && selectedData.reviewers.length ? (
              <>
                {selectedData.reviewers.map((reviewer) => (
                  <Space
                    className="m-r-xss"
                    data-testid={`reviewer-${reviewer.displayName}`}
                    key={reviewer.name}
                    size={4}>
                    <ProfilePicture
                      displayName={getEntityName(reviewer)}
                      id={reviewer.id || ''}
                      name={reviewer?.name || ''}
                      textClass="text-xs"
                      width="20"
                    />
                    <Space size={2}>
                      <Link to={getUserPath(reviewer.name ?? '')}>
                        {getEntityName(reviewer)}
                      </Link>
                      <Tooltip
                        title={
                          permissions.EditAll
                            ? t('label.remove-reviewer')
                            : t('message.no-permission-for-action')
                        }>
                        <Button
                          className="p-0 flex-center"
                          data-testid="remove"
                          disabled={!permissions.EditAll}
                          icon={<CloseOutlined />}
                          size="small"
                          type="text"
                          onClick={() => handleRemoveReviewer(reviewer.id)}
                        />
                      </Tooltip>
                    </Space>
                  </Space>
                ))}
              </>
            ) : (
              <span className="text-grey-muted">
                {t('label.no-entity', {
                  entity: t('label.reviewer-plural'),
                })}
              </span>
            )}
            <Tooltip
              placement="topRight"
              title={
                permissions.EditAll
                  ? t('label.add-entity', {
                      entity: t('label.reviewer'),
                    })
                  : t('message.no-permission-for-action')
              }>
              <Button
                className="p-0 flex-center"
                data-testid="add-new-reviewer"
                disabled={!permissions.EditAll}
                icon={
                  <SVGIcons
                    alt="edit"
                    icon={Icons.EDIT}
                    title="Edit"
                    width="16px"
                  />
                }
                size="small"
                type="text"
                onClick={handleSelectReviewerDropdown}
              />
            </Tooltip>
            {showReviewerModal && (
              <DropDownList
                isMultipleSelect
                showEmptyList
                controlledSearchStr={searchText}
                dropDownList={listOwners}
                groupType="tab"
                horzPosRight={false}
                isLoading={isUserLoading}
                listGroups={['Users']}
                removeOwner={onRemoveReviewer}
                selectedItems={selectedData.reviewers}
                showSearchBar={isCurrentUserAdmin()}
                value={selectedData.owner?.id || ''}
                onClickUserTag={onClickUserTag}
                onSearchTextChange={handleOwnerSearch}
                onSelect={handleReviewerSave}
              />
            )}
          </div>
        </Space>
      </Col>
      <Col data-testid="updated-by-container" span={24}>
        <Description
          description={selectedData?.description || ''}
          entityName={selectedData?.displayName ?? selectedData?.name}
          hasEditAccess={permissions.EditDescription || permissions.EditAll}
          isEdit={isDescriptionEditable}
          onCancel={() => setIsDescriptionEditable(false)}
          onDescriptionEdit={() => setIsDescriptionEditable(true)}
          onDescriptionUpdate={onDescriptionUpdate}
        />
      </Col>
    </Row>
  );
};

export default GlossaryHeader;
