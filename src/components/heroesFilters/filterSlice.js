import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/http.hook";

const filterAdapter = createEntityAdapter();

// const initialState = {
//   filters: [],
//   filtersLoadingStatus: "idle",
//   activeFilter: "all",
//   filteredHeroes: [],
// };

const initialState = filterAdapter.getInitialState({
  activeFilter: "all",
  filtersLoadingStatus: "idle",
});

export const filterHeroes = createAsyncThunk(
  "filter/filterHeroes",
  async () => {
    const { request } = useHttp();
    return await request("http://localhost:3002/filters");
  }
);

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    activeFilterChanged: (state, action) => {
      state.activeFilter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(filterHeroes.pending, (state) => {
        state.filtersLoadingStatus = "loading";
      })
      .addCase(filterHeroes.fulfilled, (state, action) => {
        filterAdapter.setAll(state, action.payload);
        state.filtersLoadingStatus = "idle";
      })
      .addCase(filterHeroes.rejected, (state) => {
        state.filtersLoadingStatus = "error";
      })
      .addDefaultCase(() => {});
  },
});
const { actions, reducer } = filterSlice;

export default reducer;

export const {
  filtersFetching,
  filtersFetched,
  filtersFetchingError,
  activeFilterChanged,
} = actions;

export const { selectAll } = filterAdapter.getSelectors(
  (state) => state.filters
);
