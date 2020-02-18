function contains(person, names, callback) {
  //   if (names.indexOf(person) > -1) callback(true);
  //   else callback(false);

  callback(names.includes(person));
}

const names = ["Tyler", "Cahlan", "Ryan"];
const person = "Cah";

contains(person, names, yes => {
  yes
    ? console.log(`${person} is in the list`)
    : console.log(`${person} is not in the list`);
});
