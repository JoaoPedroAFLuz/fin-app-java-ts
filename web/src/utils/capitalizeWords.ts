export function capitalizeWords(str: string) {
  let words = str.split(' ');

  words = words.map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  });

  return words.join(' ');
}
