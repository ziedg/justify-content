/*
  this function is used to prevent cut a word in the end of the line
the word should be meaningful..

  */

module.exports = chaine => {
  index = 1;
  if (!chaine[chaine.length - 1].match(/[a-zA-Z]/)) {
    return 1;
  }

  for (let i = chaine.length - 1; i > 0; i--) {
    if (chaine[i] != " ") {
      index++;
    } else {
      break;
    }
  }

  return index;
};
