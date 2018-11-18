/*
  this function is used to prevent cut a word in the end of the line
the word should be meaningful..

  */

module.exports = chaine => {
  let index = 1;
 
  console.log("f"+chaine)
  if (  !chaine ||  !chaine[chaine.length-1]===' '  ||  !chaine[chaine.length - 1].match(/[a-zA-Z]/) ) {
    return index;

  }

  console.log(chaine[chaine.length-1])

  console.log(chaine[chaine.length-2])

  for (let i = chaine.length - 1; i > 0; i--) {
    if (chaine[i] != " ") {
      index++;
    } else {
      break;
    }
  }


  return index;
};
