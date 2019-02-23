import { filterResponse } from "../utils/filter-response";

export const search = query =>
  Promise.resolve({
    search: "default",
    suggestions: [
      { searchterm: "heren truien", nrResults: 1100 },
      { searchterm: "dames truien", nrResults: 1501 },
      { searchterm: "kenzo trui", nrResults: 62 },
      { searchterm: "armani truien", nrResults: 39 },
      { searchterm: "daily paper trui", nrResults: 2 },
      { searchterm: "calvin klein trui", nrResults: 54 },
      { searchterm: "calvin klein trui heren rood", nrResults: 40 },
      { searchterm: "calvin klein trui heren blauw", nrResults: 50 },
      { searchterm: "calvin klein trui heren oranje", nrResults: 42 }
    ]
  }).then(filterResponse(query));
