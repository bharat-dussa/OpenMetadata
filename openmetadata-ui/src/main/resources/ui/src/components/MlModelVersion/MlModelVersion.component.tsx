/*
 *  Copyright 2022 Collate.
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

import { Card, Col, Divider, Row, Space, Tabs, Typography } from 'antd';
import classNames from 'classnames';
import ErrorPlaceHolder from 'components/common/error-with-placeholder/ErrorPlaceHolder';
import RichTextEditorPreviewer from 'components/common/rich-text-editor/RichTextEditorPreviewer';
import PageLayoutV1 from 'components/containers/PageLayoutV1';
import SourceList from 'components/MlModelDetail/SourceList.component';
import TagsViewer from 'components/Tag/TagsViewer/tags-viewer';
import { EntityTabs } from 'enums/entity.enum';
import { MlFeature, Mlmodel } from 'generated/entity/data/mlmodel';
import { cloneDeep, isEqual, isUndefined } from 'lodash';
import { ExtraInfo } from 'Models';
import React, { FC, Fragment, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getEntityName } from 'utils/EntityUtils';
import { getFilterTags } from 'utils/TableTags/TableTags.utils';
import { FQN_SEPARATOR_CHAR } from '../../constants/char.constants';
import { EntityField } from '../../constants/Feeds.constants';
import { OwnerType } from '../../enums/user.enum';
import { ChangeDescription } from '../../generated/entity/data/dashboard';
import { TagLabel } from '../../generated/type/tagLabel';
import {
  getColumnDiffNewValue,
  getColumnDiffOldValue,
  getColumnDiffValue,
  getDescriptionDiff,
  getDiffByFieldName,
  getDiffValue,
  getTagsDiff,
  removeDuplicateTags,
} from '../../utils/EntityVersionUtils';
import { TagLabelWithStatus } from '../../utils/EntityVersionUtils.interface';
import Description from '../common/description/Description';
import EntityPageInfo from '../common/entityPageInfo/EntityPageInfo';
import EntityVersionTimeLine from '../EntityVersionTimeLine/EntityVersionTimeLine';
import Loader from '../Loader/Loader';
import { MlModelVersionProp } from './MlModelVersion.interface';

const MlModelVersion: FC<MlModelVersionProp> = ({
  version,
  currentVersionData,
  isVersionLoading,
  owner,
  tier,
  slashedMlModelName,
  versionList,
  deleted = false,
  backHandler,
  versionHandler,
}: MlModelVersionProp) => {
  const { t } = useTranslation();

  const [changeDescription, setChangeDescription] = useState<ChangeDescription>(
    currentVersionData.changeDescription as ChangeDescription
  );
  const tabs = [
    {
      label: t('label.feature-plural'),
      key: EntityTabs.FEATURES,
    },
  ];

  const getDashboardDescription = () => {
    const descriptionDiff = getDiffByFieldName(
      EntityField.DESCRIPTION,
      changeDescription
    );
    const oldDescription =
      descriptionDiff?.added?.oldValue ??
      descriptionDiff?.deleted?.oldValue ??
      descriptionDiff?.updated?.oldValue;
    const newDescription =
      descriptionDiff?.added?.newValue ??
      descriptionDiff?.deleted?.newValue ??
      descriptionDiff?.updated?.newValue;

    return getDescriptionDiff(
      oldDescription,
      newDescription,
      currentVersionData.description
    );
  };

  const getConfigDetails = () => {
    const algorithm = (currentVersionData as Mlmodel).algorithm;
    const server = (currentVersionData as Mlmodel).server;
    const target = (currentVersionData as Mlmodel).target;
    const dashboard = (currentVersionData as Mlmodel).dashboard?.displayName;

    return [
      {
        key: 'Algorithm',
        value: algorithm ? `Algorithm - ${algorithm}` : '--',
      },
      {
        key: 'Target',
        value: target
          ? t('label.entity-hyphen-value', {
              entity: t('label.target'),
              value: target,
            })
          : t('label.no-entity', {
              entity: t('label.target'),
            }),
      },
      {
        key: 'Server',
        value: server
          ? t('label.entity-hyphen-value', {
              entity: t('label.server'),
              value: server,
            })
          : t('label.no-entity', {
              entity: t('label.server'),
            }),
      },
      {
        key: 'Dashboard',
        value: dashboard
          ? t('label.entity-hyphen-value', {
              entity: t('label.dashboard'),
              value: dashboard,
            })
          : t('label.no-entity', {
              entity: t('label.dashboard'),
            }),
      },
    ];
  };

  const getExtraInfo = () => {
    const ownerDiff = getDiffByFieldName('owner', changeDescription);

    const oldOwner = JSON.parse(
      ownerDiff?.added?.oldValue ??
        ownerDiff?.deleted?.oldValue ??
        ownerDiff?.updated?.oldValue ??
        '{}'
    );
    const newOwner = JSON.parse(
      ownerDiff?.added?.newValue ??
        ownerDiff?.deleted?.newValue ??
        ownerDiff?.updated?.newValue ??
        '{}'
    );
    const ownerPlaceHolder = owner?.name ?? owner?.displayName ?? '';

    const tagsDiff = getDiffByFieldName('tags', changeDescription, true);
    const newTier = [
      ...JSON.parse(
        tagsDiff?.added?.newValue ??
          tagsDiff?.deleted?.newValue ??
          tagsDiff?.updated?.newValue ??
          '[]'
      ),
    ].find((t) => (t?.tagFQN as string).startsWith('Tier'));

    const oldTier = [
      ...JSON.parse(
        tagsDiff?.added?.oldValue ??
          tagsDiff?.deleted?.oldValue ??
          tagsDiff?.updated?.oldValue ??
          '[]'
      ),
    ].find((t) => (t?.tagFQN as string).startsWith('Tier'));

    const extraInfo: Array<ExtraInfo> = [
      {
        key: 'Owner',
        value:
          !isUndefined(ownerDiff?.added) ||
          !isUndefined(ownerDiff?.deleted) ||
          !isUndefined(ownerDiff?.updated)
            ? getDiffValue(
                oldOwner?.displayName || oldOwner?.name || '',
                newOwner?.displayName || newOwner?.name || ''
              )
            : ownerPlaceHolder
            ? getDiffValue(ownerPlaceHolder, ownerPlaceHolder)
            : '',
        profileName:
          newOwner?.type === OwnerType.USER ? newOwner?.name : undefined,
      },
      {
        key: 'Tier',
        value:
          !isUndefined(newTier) || !isUndefined(oldTier)
            ? getDiffValue(
                oldTier?.tagFQN?.split(FQN_SEPARATOR_CHAR)[1] || '',
                newTier?.tagFQN?.split(FQN_SEPARATOR_CHAR)[1] || ''
              )
            : tier?.tagFQN
            ? tier?.tagFQN.split(FQN_SEPARATOR_CHAR)[1]
            : '',
      },
      ...getConfigDetails(),
    ];

    return extraInfo;
  };

  const getTags = () => {
    const tagsDiff = getDiffByFieldName('tags', changeDescription, true);
    const oldTags: Array<TagLabel> = JSON.parse(
      tagsDiff?.added?.oldValue ??
        tagsDiff?.deleted?.oldValue ??
        tagsDiff?.updated?.oldValue ??
        '[]'
    );
    const newTags: Array<TagLabel> = JSON.parse(
      tagsDiff?.added?.newValue ??
        tagsDiff?.deleted?.newValue ??
        tagsDiff?.updated?.newValue ??
        '[]'
    );
    const flag: { [x: string]: boolean } = {};
    const uniqueTags: Array<TagLabelWithStatus> = [];

    [
      ...(getTagsDiff(oldTags, newTags) ?? []),
      ...(currentVersionData.tags ?? []),
    ].forEach((elem) => {
      if (!flag[elem.tagFQN as string]) {
        flag[elem.tagFQN as string] = true;
        uniqueTags.push(elem as TagLabelWithStatus);
      }
    });

    return [
      ...uniqueTags.map((t) =>
        t.tagFQN.startsWith('Tier')
          ? { ...t, tagFQN: t.tagFQN.split(FQN_SEPARATOR_CHAR)[1] }
          : t
      ),
    ];
  };

  const handleFeatureDescriptionChangeDiff = (
    colList: Mlmodel['mlFeatures'],
    oldDiff: MlFeature[],
    newDiff: MlFeature[]
  ) => {
    colList?.forEach((i) => {
      if (isEqual(i.name, newDiff[0]?.name)) {
        i.description = getDescriptionDiff(
          oldDiff[0]?.description,
          newDiff[0]?.description,
          i.description
        );
      }
    });
  };

  const handleFeatureTagChangeDiff = (
    colList: Mlmodel['mlFeatures'],
    oldDiff: MlFeature[],
    newDiff: MlFeature[]
  ) => {
    colList?.forEach((i) => {
      if (isEqual(i.name, newDiff[0]?.name)) {
        const flag: { [x: string]: boolean } = {};
        const uniqueTags: Array<TagLabelWithStatus> = [];
        const oldTag = removeDuplicateTags(
          oldDiff[0].tags ?? [],
          newDiff[0].tags ?? []
        );
        const newTag = removeDuplicateTags(
          newDiff[0].tags ?? [],
          oldDiff[0].tags ?? []
        );
        const tagsDiff = getTagsDiff(oldTag, newTag);

        [...tagsDiff, ...((i.tags ?? []) as Array<TagLabelWithStatus>)].forEach(
          (elem: TagLabelWithStatus) => {
            if (!flag[elem.tagFQN]) {
              flag[elem.tagFQN] = true;
              uniqueTags.push(elem);
            }
          }
        );
        i.tags = uniqueTags;
      }
    });
  };

  const mlFeaturesData = useMemo((): Mlmodel['mlFeatures'] => {
    const colList = cloneDeep((currentVersionData as Mlmodel).mlFeatures ?? []);
    const columnsDiff = getDiffByFieldName(
      EntityField.ML_FEATURES,
      changeDescription
    );

    if (getColumnDiffValue(columnsDiff) === EntityField.ML_FEATURES) {
      const oldDiff = JSON.parse(getColumnDiffOldValue(columnsDiff) ?? '[]');
      const newDiff = JSON.parse(getColumnDiffNewValue(columnsDiff) ?? '[]');

      handleFeatureDescriptionChangeDiff(colList, oldDiff, newDiff);

      handleFeatureTagChangeDiff(colList, oldDiff, newDiff);

      return colList;
    }

    return colList;
  }, [
    currentVersionData,
    changeDescription,
    getColumnDiffValue,
    getDiffByFieldName,
    handleFeatureDescriptionChangeDiff,
    handleFeatureTagChangeDiff,
    getColumnDiffOldValue,
    getColumnDiffNewValue,
  ]);

  useEffect(() => {
    setChangeDescription(
      currentVersionData.changeDescription as ChangeDescription
    );
  }, [currentVersionData]);

  return (
    <PageLayoutV1
      pageTitle={t('label.entity-detail-plural', {
        entity: getEntityName(currentVersionData),
      })}>
      {isVersionLoading ? (
        <Loader />
      ) : (
        <div className={classNames('version-data')} data-testid="version-data">
          <EntityPageInfo
            isVersionSelected
            deleted={deleted}
            displayName={currentVersionData.displayName}
            entityName={
              currentVersionData.displayName ?? currentVersionData.name ?? ''
            }
            extraInfo={getExtraInfo()}
            followersList={[]}
            serviceType={currentVersionData.serviceType ?? ''}
            tags={getTags()}
            tier={{} as TagLabel}
            titleLinks={slashedMlModelName}
            version={Number(version)}
            versionHandler={backHandler}
          />
          <div className="m-t-xss">
            <Tabs activeKey={EntityTabs.FEATURES} items={tabs} />
            <Card className="m-y-md">
              <Description isReadOnly description={getDashboardDescription()} />
              <div>
                {(currentVersionData as Mlmodel).mlFeatures &&
                (currentVersionData as Mlmodel).mlFeatures?.length ? (
                  <Fragment>
                    <Row data-testid="feature-list">
                      <Col span={24}>
                        <Divider className="m-y-md" />
                      </Col>
                      <Col span={24}>
                        <Typography.Title level={5}>
                          {t('label.feature-plural-used')}
                        </Typography.Title>
                      </Col>

                      {mlFeaturesData?.map((feature: MlFeature) => (
                        <Col key={feature.fullyQualifiedName} span={24}>
                          <Card
                            bordered
                            className="m-b-xlg"
                            data-testid="feature-card"
                            key={feature.fullyQualifiedName}>
                            <Row>
                              <Col className="m-b-xs" span={24}>
                                <Typography.Text className="font-semibold">
                                  {feature.name}
                                </Typography.Text>
                              </Col>
                              <Col className="m-b-xs" span={24}>
                                <Space align="start">
                                  <Space>
                                    <Typography.Text className="text-grey-muted">
                                      {`${t('label.type')}:`}
                                    </Typography.Text>{' '}
                                    <Typography.Text>
                                      {feature.dataType || '--'}
                                    </Typography.Text>
                                  </Space>
                                  <Divider
                                    className="border-gray"
                                    type="vertical"
                                  />
                                  <Space>
                                    <Typography.Text className="text-grey-muted">
                                      {`${t('label.algorithm')}:`}
                                    </Typography.Text>{' '}
                                    <Typography.Text>
                                      {feature.featureAlgorithm || '--'}
                                    </Typography.Text>
                                  </Space>
                                </Space>
                              </Col>
                              <Col className="m-b-xs" span={24}>
                                <Row gutter={8} wrap={false}>
                                  <Col flex="120px">
                                    <Typography.Text className="text-grey-muted">
                                      {`${t('label.glossary-term-plural')} :`}
                                    </Typography.Text>
                                  </Col>

                                  <Col flex="auto">
                                    <TagsViewer
                                      sizeCap={-1}
                                      tags={
                                        getFilterTags(feature.tags ?? [])
                                          .Glossary
                                      }
                                      type="border"
                                    />
                                  </Col>
                                </Row>
                              </Col>

                              <Col className="m-b-xs" span={24}>
                                <Row gutter={8} wrap={false}>
                                  <Col flex="120px">
                                    <Typography.Text className="text-grey-muted">
                                      {`${t('label.tag-plural')} :`}
                                    </Typography.Text>
                                  </Col>
                                  <Col flex="auto">
                                    <TagsViewer
                                      sizeCap={-1}
                                      tags={
                                        getFilterTags(feature.tags ?? [])
                                          .Classification
                                      }
                                      type="border"
                                    />
                                  </Col>
                                </Row>
                              </Col>

                              <Col className="m-b-xs" span={24}>
                                <Row gutter={8} wrap={false}>
                                  <Col flex="120px">
                                    <Typography.Text className="text-grey-muted">
                                      {`${t('label.description')} :`}
                                    </Typography.Text>
                                  </Col>
                                  <Col flex="auto">
                                    <Space align="start">
                                      {feature.description ? (
                                        <RichTextEditorPreviewer
                                          enableSeeMoreVariant={false}
                                          markdown={feature.description}
                                        />
                                      ) : (
                                        <Typography.Text className="text-grey-muted">
                                          {t('label.no-entity', {
                                            entity: t('label.description'),
                                          })}
                                        </Typography.Text>
                                      )}
                                    </Space>
                                  </Col>
                                </Row>
                              </Col>

                              <Col span={24}>
                                <SourceList feature={feature} />
                              </Col>
                            </Row>
                          </Card>
                        </Col>
                      ))}
                    </Row>
                  </Fragment>
                ) : (
                  <ErrorPlaceHolder />
                )}
              </div>
            </Card>
          </div>
        </div>
      )}

      <EntityVersionTimeLine
        show
        currentVersion={version}
        versionHandler={versionHandler}
        versionList={versionList}
        onBack={backHandler}
      />
    </PageLayoutV1>
  );
};

export default MlModelVersion;
