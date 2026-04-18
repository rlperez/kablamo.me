import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
import timezone from 'dayjs/plugin/timezone.js';

dayjs.extend(utc);
dayjs.extend(timezone);

dayjs.tz.setDefault('America/New_York');

/** Converts the given date string to ISO8610 format. */
export const toISOString = dateString => {
  if (!dateString) return null;
  const date = dayjs.tz(dateString);
  return date.isValid() ? date.toISOString() : null;
};

/** Formats a date using dayjs's conventions: https://day.js.org/docs/en/display/format */
export const formatDate = (date, format) => dayjs.tz(date).format(format);
