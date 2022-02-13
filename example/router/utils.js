export const match = (target, conditions) => {
  const foundCondition = conditions.find(([condition, output]) => {
    return condition(target);
  });

  if (foundCondition) {
    return foundCondition[1](target);
  }

  return null;
};

export const when = (condition, output) => {
  return [
    condition,
    output
  ];
};

export const equals = (expected) => (value) => {
  return expected === value;
};

export const always = (something) => () => something;
