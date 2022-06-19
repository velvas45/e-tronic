export const numberWithCommas = (number) => {
  if (isNaN(number) || !number || number.toString().trim("") === "") {
    return 0;
  }

  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};
