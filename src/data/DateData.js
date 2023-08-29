import moment from 'moment-timezone';
const indianTimezone = 'Asia/Kolkata';
export const currentDate = moment.tz(indianTimezone).format('YYYY-MM-DD');

export default Month = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];
