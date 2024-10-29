import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(relativeTime);

export default dayjs;

export const calculatorRemainTime = (remain: number) => {
  const d = Math.floor(remain / (60 * 60 * 24));
  const h = Math.floor((remain % (60 * 60 * 24)) / (60 * 60));
  const m = Math.floor((remain % (60 * 60)) / 60);
  const s = Math.floor(remain % 60);
  return { d, h, m, s };
};

export const calculatorTextRemainTime = (remain: number) => {
  const { d, h, m, s } = calculatorRemainTime(remain);
  const arr = d > 0 ? [`${d}`] : [];
  for (const x of [h, m, s]) {
    // if (arr.length > 0 || x > 0) {
    arr.push(`00${x}`.slice(-2));
    // }
  }
  return arr.join(':');
};
