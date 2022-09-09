import { isActiveAnnouncement } from '../AnnouncementsUtils';

const currentTime = Date.now() / 1000;
const startTime = currentTime - 1000;
const endTime = currentTime + 1000;

describe('utils | isActiveAnnouncement', () => {
  it('AnnouncementsUtils | isActiveAnnouncement, if current time is in between start and end time it returns true', () => {
    const _isActiveAnnouncement = isActiveAnnouncement(startTime, endTime);

    expect(_isActiveAnnouncement).toBeTruthy();
  });

  it('AnnouncementsUtils | isActiveAnnouncement, if current time is not in between start and end time it returns false', () => {
    const _isActiveAnnouncement = isActiveAnnouncement(0, 10);

    expect(_isActiveAnnouncement).toBeFalsy();
  });
});
