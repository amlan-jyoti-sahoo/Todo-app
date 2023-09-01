import moment from 'moment-timezone';
const indianTimezone = 'Asia/Kolkata';
export const currentDate = moment.tz(indianTimezone).format('YYYY-MM-DD');

const currentDateTime = new Date();
const options = {
  timeZone: 'Asia/Kolkata',
  weekday: 'short',
};
export const curDayName = currentDateTime
  .toLocaleString('en-IN', options)
  .substring(0, 3);

export function currentDayIndex() {
  if (curDayName === 'Mon') return 0;
  else if (curDayName === 'Tue') return 1;
  else if (curDayName === 'Wed') return 2;
  else if (curDayName === 'Thu') return 3;
  else if (curDayName === 'Fri') return 4;
  else if (curDayName === 'Sat') return 5;
  else if (curDayName === 'Sun') return 6;
  return 0;
}
// const currentDateStr = '2023-08-29';
const Yearly = 365;
const Weekly = 7;

const currentDateStr = new Date(currentDate);
const newDateAfterAdding = new Date(currentDateStr);
newDateAfterAdding.setDate(currentDateStr.getDate() + Yearly);

const newDateAfterAddingFormatted = newDateAfterAdding
  .toISOString()
  .split('T')[0];

// export const DayName = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

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
