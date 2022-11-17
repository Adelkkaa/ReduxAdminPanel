const initialState = {
  heroes: [],
  heroesLoadingStatus: "idle",
  filters: [],
  filtersLoadingStatus: "idle",
  activeFilter: "all",
  filteredHeroes: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "HEROES_FETCHING":
      return {
        ...state,
        heroesLoadingStatus: "loading",
      };
    case "HEROES_FETCHED":
      return {
        ...state,
        heroes: action.payload,
        // ЭТО МОЖНО СДЕЛАТЬ И ПО ДРУГОМУ
        // Я специально показываю вариант с действиями тут, но более правильный вариант
        // будет показан в следующем уроке
        heroesLoadingStatus: "idle",
      };
    case "HEROES_FETCHING_ERROR":
      return {
        ...state,
        heroesLoadingStatus: "error",
      };
    case "FILTERS_FETCHING":
      return {
        ...state,
        filtersLoadingStatus: "loading",
      };
    case "FILTERS_FETCHED":
      return {
        ...state,
        filters: action.payload,
        filtersLoadingStatus: "idle",
      };
    case "FILTERS_FETCHING_ERROR":
      return {
        ...state,
        filtersLoadingStatus: "error",
      };
    case "ACTIVE_FILTER_CHANGED":
      return {
        ...state,
        activeFilter: action.payload,
      };
    // Самая сложная часть - это показывать новые элементы по фильтрам
    // при создании или удалении
    case "HERO_CREATED":
      // Формируем новый массив
      return {
        ...state,
        heroes: [...state.heroes, action.payload],
        // Фильтруем новые данные по фильтру, который сейчас применяется
      };
    case "HERO_DELETED":
      // Формируем новый массив
      return {
        ...state,
        heroes: state.heroes.filter((item) => item.id !== action.payload),
        // Фильтруем новые данные по фильтру, который сейчас применяется
      };
    default:
      return state;
  }
};

export default reducer;
