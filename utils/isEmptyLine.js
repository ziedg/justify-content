/*
  this function elimnate the empty lines
*/

module.exports = chaine => {
  ok = true;
  i = 0;

  while (i < chaine.length) {
    if (chaine[i] !== " ") {
      ok = false;

      break;
    }
    i++;
  }

  return ok;
};
