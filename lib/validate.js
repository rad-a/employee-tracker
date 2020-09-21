const validateInput = (input) =>
  input.length < 2
    ? "Please enter a valid input. Input must be a string longer than 2 characters."
    : true;
const validateNumber = (number) =>
  isNaN(parseFloat(number)) ? "Please enter a valid number" : true;

module.exports = { validateInput, validateNumber };
