/* 

this function remove the space in the beginging of the line
*/
module.exports = str => {
  while (str[0] === " ") {
    str = str.substr(1);
  }

  return str;
};
