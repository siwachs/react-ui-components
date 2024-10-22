// Replace but not 1st and last 4 digits
// Return same result for length less than 6
// Should not mask non numeric characters
// Should return empty string for all inputs other than number and string. For example a input is null or function or any other invalid value.

function maskCC(cardNumber) {
  const inputType = typeof cardNumber;
  if (inputType !== "string" && inputType !== "number") return "";

  const cc = String(cardNumber);
  const length = cc.length;

  if (length < 6) return cc;
  const first = cc.slice(0, 1);
  const lastFour = cc.slice(-4);

  // Regex
  // const masked = cc.slice(1, length - 4).replace(/\d/g, "#");

  let masked = "";
  for (let i = 1; i < length - 4; i++) {
    const current = cc[i];

    if (isNaN(parseInt(current, 10))) {
      // use base 10 for int parsing
      masked += current;
    } else {
      masked += "#";
    }
  }

  console.log("First char is", first, "and last four chars is", lastFour);
  return `${first}${masked}${lastFour}`;
}

const maskedCC = maskCC("4012 8888 8888 1881");
console.log(maskedCC);

// Examples
// 5512103073210694 -> 5############0694
// 4556-8499-8339-2903 -> 4###-###-###-2903
// '' -> ''
// XYZ -> XYZ
// S2k32i46 -> S#k#2i46
