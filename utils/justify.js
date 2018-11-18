const removeStartSpace = require("./removeStartSpaces");
const findSpace = require("./findSpaceIndex");
const justifyLigne = require("./justifyLigne");
const isEmptyLine = require("./isEmptyLine");

module.exports = str => {
  let temp = "";
  console.log(str)

  //replace every end of line caracter with a space
  let chaine = str.replace(/\n/g, " ");
  console.log(chaine.length)

  const taille = chaine.length;

  if (taille < 80) {
    return chaine;
  }

  var index = 1;
  let i = 0;
  let ligne = "";
  while (i <= Math.floor(taille / 80)) {
    i++;
    chaine = removeStartSpace(chaine);

    ligne = chaine.substr(0, 80);

   


      index = findSpace(ligne);
      
  

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
