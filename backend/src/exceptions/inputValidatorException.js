class inputValidatorException extends Error {
  constructor(message) {
    super(message);
  }
}

module.exports = inputValidatorException;