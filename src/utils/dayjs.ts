import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

export default dayjs;

export const dateTimeFormat = 'DD/MM/YYYY · hh:mm A';

export const dateTimeFormat2 = 'MM/DD/YYYY · hh:mm:ss';
