export const filterResponse = (query = "") => response => {
  return response.suggestions.filter(suggestion =>
    suggestion.searchterm.toLowerCase().includes(query.toLowerCase())
  );
};
