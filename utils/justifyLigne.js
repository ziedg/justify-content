module.exports = chaine => {


  let taille = chaine.length;
  let startIndex = 80 - taille;
  let index = 80 - taille;
  var k = 0;
  ch = "";
  let sub = "";
  let inde = Math.floor(80 / index);




 
  while (index > 0    ) {
    index -= 1


    sub = chaine.substr(inde * k, inde);

    sub = addSpace(sub);

    ch += sub;
    

    k++;
   if(ch.length+sub.length < 80+inde){
     break;
   }

  }

   
    ch =  ch+ chaine.substring(ch.length - (k+index-1))
  


  return ch



};

const addSpace = (chaine) => {
  

  let ok = true;

  let i = 0;
  while (ok) {
    i++;
    if (chaine[i] === " ") {
      chaine = [chaine.slice(0, i), ' ', chaine.slice(i)].join("");

      ok = false;
    }
    if (i == chaine.length - 1) {
      ok = false;
    }
  }
  return chaine;
};
