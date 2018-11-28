const { getRandomListEntry } = require('./util');

const COUNT = 100;

const bases = ["Base1", "Base2", "Base3", "Base4"]
const eyes = ["Eyes1", "Eyes2"]
const nose = ["Nose1", "Nose2", "Nose3"]
const accessory = ["None", "Eyebags", "NoseRing", "Bandaids", "Mustache", "Hoops", "Stud", "Goatee", "Glasses", "Facemask"]
const eyebrows = ["Eyebrows1", "Eyebrows2", "Eyebrows3"]
const mouth = ["Mouth1", "Mouth2", "Mouth3", "Mouth4"]
const hair = ["Hair1", "Hair2", "Hair3", "Hair4", "Hair5", "Hair6", "Hair7", "Hair8", "Hair9", "Hair10"]
const hairColors = ["#BB794E", "#D5D5D5", "#3F291B", "#000000", "#4F2F18", "#DFBCBC", "#DF5C04", "#7ACE65", "#EFAD00"]

function isValidMale(face) {
  return !(face["Hoops"])
}

function isValidFemale(face) {
  return !(face["Mustache"] || face["Goatee"] || face["Hair6"])
}

const output = []

for (let i = 0; i < COUNT; i++) {
  let face = {};
  const sexValidator = getRandomListEntry([isValidMale, isValidFemale])

  do {
    face = {};
    face[getRandomListEntry(bases)] = true;
    face[getRandomListEntry(eyes)] = true;
    face[getRandomListEntry(nose)] = true;
    face[getRandomListEntry(accessory)] = true;
    face[getRandomListEntry(eyebrows)] = true;
    face[getRandomListEntry(mouth)] = true;
    face[getRandomListEntry(hair)] = true;
    face["HairColor"] = getRandomListEntry(hairColors)
  } while (!sexValidator(face));

  output.push(face);
}

console.log(JSON.stringify(output));