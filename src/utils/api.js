import { queryString } from "./query-string";

const ENDPOINT = "http://localhost:3000";

export const search = (query = "") => {
  return fetch(`${ENDPOINT}/search?${queryString({ q: query })}`)
    .then(response => response.json())
    .then(response =>
      response.suggestions.filter(suggestion =>
        suggestion.searchterm.toLowerCase().includes(query.toLowerCase())
      )
    );
};
