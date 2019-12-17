class StringValidator {
  validate(string, rules) {
    // validate string
  }
}

class ObjectValidator {
  validate(object, rules) {
    // validate object
  }
}

class NumberValidator {
  validate(number, rules) {
    // validate number
  }
}

class Validator {
  stringValidator = new StringValidator();

  numberValidator = new NumberValidator();

  objectValidator = new ObjectValidator();

  validate(values, validateObj) {
    const keys = Object.keys(values);
    const resultObj = {};
    
    keys.forEach(key => {
      const rules = validateObj[key];
      const value = values[key];

      if (!value && rules.required) {
        return false;
      } else if (!value && !rules.required) {
        return true;
      }

      switch(typeof value) {
        case 'string':
          resultObj[key] = this.stringValidator(value, rules);

        case 'object':
          resultObj[key] = this.objectValidator(value, rules);

        case 'number':
          resultObj[key] = this.numberValidator(value, rules);
      }
    });
  }
}
