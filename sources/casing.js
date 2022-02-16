export const camelToKebab = (text) => {
  if (text.length === 0) {
    return text;
  }

  return [...text].reduce((kebab, character) => {
    if (character.match(/[A-Z]/)) {
      if (kebab === "") {
        return character.toLowerCase();
      }

      return `${kebab}-${character.toLowerCase()}`;
    }

    return `${kebab}${character}`;
  }, "");
};
