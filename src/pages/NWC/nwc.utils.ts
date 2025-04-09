export function formatString(str: string) {
  // Use a regular expression to match uppercase letters and split words
  const formatted = str
    .replace(/([a-z])([A-Z])/g, "$1 $2") // Add space between lowercase and uppercase letters
    .replace(/([A-Z])/g, (match) => match.toUpperCase()) // Ensure all letters are uppercase
    .replace(/\b\w/g, (match) => match.toUpperCase()) // Capitalize the first letter of each word
    .trim(); // Remove any extra spaces from the beginning or end

  return formatted;
}

export const getArrayFromObject = (obj: { [key: string]: number }) => {
  const array = Object.entries(obj)?.map((item) => {
    return {
      title: formatString(item[0]),
      value: item[1],
    };
  });
  return array;
};
