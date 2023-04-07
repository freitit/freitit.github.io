Array.prototype.random = function () {
  return this[Math.floor((Math.random()*this.length))];
}

function getRndString(length, possibleChars) {
  const selectedChars = new Array(length);
  for (let i = 0; i < length; i++) {
    selectedChars[i] = possibleChars.random();
  }

  return selectedChars.join("");
}

function getRndDigit() {
  return Math.floor(Math.random() * 10);
}

function getRndSerialNumber() {
  const serialNumberDigits = new Array(6);
  for (let i = 0; i < 6; i++) {
    serialNumberDigits[i] = getRndDigit();
  }

  return serialNumberDigits.join("");
}

function calcCheckDigit(containerNumberWithoutCheckDigit) {
  let sumOfProduct = 0;

  for (let i = 0; i < 4; i++) {
    const charCode = 10 + containerNumberWithoutCheckDigit.charCodeAt(i) - "A".charCodeAt();
    const equivalentValue = charCode + Math.floor((charCode - 1) / 10);
    sumOfProduct = sumOfProduct + (equivalentValue * Math.pow(2, i));
  }

  for (let i = 4; i < 10; i++) {
    const value = parseInt(containerNumberWithoutCheckDigit[i]);
    sumOfProduct = sumOfProduct + (value * Math.pow(2, i));
  }

  const checkDigit = sumOfProduct % 11 % 10;
  return checkDigit;
}

/**
 * Pattern: ^[A-Z]{3}[JUZ][0-9]{6}[0-9]$
 * @returns Container number
 */
function generateContainerNumber() {
  const ownerCodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const categoryIdentifierChars = ["J", "U", "Z"];

  const randomOwnerCode = getRndString(3, ownerCodeChars);
  const categoryIdentifier = categoryIdentifierChars.random();
  const serialNumber = getRndSerialNumber();

  const containerNumberWithoutCheckDigit = randomOwnerCode + categoryIdentifier + serialNumber;
  const checkDigit = calcCheckDigit(containerNumberWithoutCheckDigit);

  return containerNumberWithoutCheckDigit + checkDigit;
}