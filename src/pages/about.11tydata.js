export const yearsExperience = () => {
  const specificDate = new Date('2011-1-3');
  const currentDate = new Date();

  let yearsDifference = currentDate.getFullYear() - specificDate.getFullYear();

  if (currentDate.getMonth() > 5) {
    yearsDifference++;
  }

  return yearsDifference;
};
