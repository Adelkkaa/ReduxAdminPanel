import {
  filtersFetching,
  filtersFetched,
  filtersFetchingError,
} from "../components/heroesFilters/filterSlice";

export const filterHeroes = (request) => (dispatch) => {
  dispatch(filtersFetching());
  request("http://localhost:3002/filters")
    .then((data) => dispatch(filtersFetched(data)))
    .catch(() => dispatch(filtersFetchingError()));
};
