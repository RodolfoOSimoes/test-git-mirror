// eslint-disable-next-line @typescript-eslint/no-var-requires
const moment = require('moment');

const formatDate = (date) => {
  const d = new Date(date);
  let month = '' + (d.getMonth() + 1);
  let day = '' + d.getDate();
  const year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
};

const getDate = (date: string) => {
  return moment(date).add(3, 'hours').format('YYYY-MM-DD hh:mm:ss');
};

const getBrlUtcDate = (date) => {
  return moment(date).utcOffset('-0300').format('YYYY-MM-DD HH:mm');
};

const prepareDate = () => {
  return `${moment(new Date()).format('YYYY-MM-DD')} 00:00:00`;
};

export { formatDate, getDate, getBrlUtcDate, prepareDate };
