const truncate = (text, max = 150) => {
  if (!text) return "No description provided.";
  return text.length > max ? text.slice(0, max) + "..." : text;
};

export default truncate;