export const doSearch = searchFn => query =>
  searchFn(query).then(res =>
    res.map(suggestion => ({
      label: `${suggestion.searchterm} (${suggestion.nrResults})`,
      value: suggestion.searchterm
    }))
  );
