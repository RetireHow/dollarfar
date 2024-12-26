export const handleKeyDownUtil = (event: React.KeyboardEvent<HTMLInputElement>) => {
  // Prevent 'e' & '-' sign
  if (event.key === "e" || event.key === "-") {
    event.preventDefault();
  }
};
