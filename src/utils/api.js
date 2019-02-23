import { queryString } from "./query-string";
import { filterResponse } from "./filter-response";

const ENDPOINT = "http://localhost:3000";

export const search = (query = "") => {
  return fetch(`${ENDPOINT}/search?${queryString({ q: query })}`)
    .then(response => response.json())
    .then(filterResponse(query));
};
