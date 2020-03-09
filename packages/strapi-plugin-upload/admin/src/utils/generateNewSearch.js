const generateNewSearch = updatedParams => {
  return {
    ...getSearchParams(),
    filters: generateFiltersFromSearch(search),
    ...updatedParams,
  };
};
