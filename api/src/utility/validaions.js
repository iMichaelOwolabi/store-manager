class Validations {
  static validNumber(input) {
    const validInput = /^[1-9]\d*$/;
    const validate = validInput.test(input);
    if (!validate) {
      return false;
    }
    return true;
  }

  static validPriceAndQuantity(input) {
    if (typeof input !== 'number') {
      return false;
    }
    const validInput = /^[1-9]\d*$/;
    const validate = validInput.test(input);
    if (!validate) {
      return false;
    }
    return true;
  }

  static acceptableString(input) {
    const validInput = /^[A-Za-z]\d*/;
    const validate = validInput.test(input || '');
    if (!validate) {
      return false;
    }
    return true;
  }

  static validImageUrl(input) {
    const validInput = /(http)?s?:?(\/\/[^"']*\.(?:png|jpg|jpeg|gif|png|svg))/;
    const validate = validInput.test(input);
    if (!validate) {
      return false;
    }
    return true;
  }
}

export default Validations;
