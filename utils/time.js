import jalaali from "jalaali-js";

function generatePersianDate() {
  let persianDate = jalaali.toJalaali(new Date());
  return `${persianDate.jy}/${persianDate.jm}/${persianDate.jd}`;
}
export const persianDate = generatePersianDate();
