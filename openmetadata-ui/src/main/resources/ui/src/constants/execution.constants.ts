import { StatusType } from '../generated/entity/data/pipeline';

export const MenuOptions = {
  all: 'All',
  [StatusType.Successful]: 'Success',
  [StatusType.Failed]: 'Failure',
  [StatusType.Pending]: 'Aborted',
  Aborted: 'Aborted',
};
