const removeStartSpace = require("./removeStartSpaces");
const findSpace = require("./findSpaceIndex");
const justifyLigne = require("./justifyLigne");
const isEmptyLine = require("./isEmptyLine");

module.exports = str => {
  let temp = "";

  //replace every end of line caracter with a space
  let chaine = str.replace(/\n/g, " ");

  const taille = chaine.length;

  if (taille < 80) {
    return chaine;
  }

  let index = 1;
  let i = 0;
  let ligne = "";
  while (i <= Math.floor(taille / 80)) {
    i++;
    chaine = removeStartSpace(chaine);

    ligne = chaine.substr(0, 80);

    try {
      index = findSpace(ligne);
    } catch (e) {
      console.log(e);
    }

    if (index > 1) {
      ligne = chaine.substr(0, 80 - index);

      ligne = justifyLigne(ligne);

      if (isEmptyLine(ligne.replace(/\n/g, " "))) {
        ligne = "";
      }

      chaine = chaine.substring(80 - index);
    } else {
      chaine = chaine.substring(80);
    }
    if (ligne != "") ligne += "\n";

    temp += ligne;
    ligne = "";
  }

  chaine = removeStartSpace(chaine);

  return temp + chaine.replace(/\n/g, " ");
};
