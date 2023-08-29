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

// const currentDateStr = '2023-08-29';
const Yearly = 365;
const Weekly = 7;

const currentDateStr = new Date(currentDate);
const newDateAfterAdding = new Date(currentDateStr);
newDateAfterAdding.setDate(currentDateStr.getDate() + Yearly);

const newDateAfterAddingFormatted = newDateAfterAdding
  .toISOString()
  .split('T')[0];

console.log(newDateAfterAddingFormatted);
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
