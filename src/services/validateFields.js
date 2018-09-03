const getType = item => Object.prototype.toString.call(item).match(/\w+/g)[1];

export const validateFields = (obj, rules) => {
  const ruleKeys = Object.keys(rules);
  const errors = ruleKeys
    .map(field => {
      if (rules[field].require && !obj.hasOwnProperty(field)) {
        return `${field} is required.`;
      } else if (rules[field].type !== getType(obj[field])) {
        return `${field} should be ${rules[field].type} type.`;
      }
    })
    .filter(e => !!e);
  return errors;
};
