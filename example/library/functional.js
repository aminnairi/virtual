export const match = (target, conditions) => {
  const foundCondition = conditions.find(([condition]) => condition(target));

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

export const always = (value) => {
  return () => {
    return value;
  };
};

export const equals = (expectation) => {
  return (value) => {
    return value === expectation;
  };
};
