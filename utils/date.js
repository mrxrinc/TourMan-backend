import jalaali from 'jalaali-js';

function generatePersianDate() {
  const jDate = jalaali.toJalaali(new Date());
  return `${jDate.jy}/${jDate.jm}/${jDate.jd}`;
}
const persianDate = generatePersianDate();

export default persianDate;
