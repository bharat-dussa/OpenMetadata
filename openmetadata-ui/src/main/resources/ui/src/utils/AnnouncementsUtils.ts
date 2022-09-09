import { EntityType } from '../enums/entity.enum';

export const ANNOUNCEMENT_ENTITIES = [
  EntityType.TABLE,
  EntityType.DASHBOARD,
  EntityType.TOPIC,
  EntityType.PIPELINE,
];

export const validateMessages = {
  required: '${name} is required!',
  string: {
    range: '${name} must be between ${min} and ${max} character.',
  },
};

/**
 * It returns true if the current time is between the start and end time
 * @param {number} startTime - The time the announcement was created.
 * @param {number} endTime - The time the announcement will end.
 * @returns A function that takes in two parameters, startTime and endTime, and returns a boolean.
 */
export const isActiveAnnouncement = (startTime: number, endTime: number) => {
  const currentTime = Date.now() / 1000;

  return currentTime > startTime && currentTime < endTime;
};

export const announcementInvalidStartTime =
  'Announcement start time must be earlier than the end time';
