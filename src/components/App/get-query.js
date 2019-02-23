// ⚠️ WARNING
// This is totally incorrect way to get query from search params.
// This function has been created with demonstration purpose and
// has nothing to do with best practice. Consider using react-router
// or similar library instead
export const getQuery = window => {
  if (
    !window ||
    !window.URLSearchParams ||
    !window.location ||
    !window.location.search
  ) {
    return "";
  }

  const params = new window.URLSearchParams(window.location.search);
  return params.get("query") || "";
};
