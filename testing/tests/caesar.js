function caesar(str, shift) {
  return str
    .split("")
    .map((char) => {
      if (/[a-z]/.test(char)) {
        return String.fromCharCode(
          ((((char.charCodeAt(0) - 97 + shift) % 26) + 26) % 26) + 97
        );
      } else if (/[A-Z]/.test(char)) {
        return String.fromCharCode(
          ((((char.charCodeAt(0) - 65 + shift) % 26) + 26) % 26) + 65
        );
      } else {
        return char; // Keep non-alphabet characters unchanged
      }
    })
    .join("");
}

module.exports = caesar;
