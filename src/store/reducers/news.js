const initialState = {
  newsFeed: [],
  searchResults: [],
}

const news = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'SET_NEWS':
      return {
        ...state,
        newsFeed: payload,
      }
    case 'SEARCH_NEWS':
      return {
        ...state,
        searchResults: payload,
      }
    case 'RESET_SEARCH':
      return {
        ...state,
        searchResults: [],
      }
    default:
      return state
  }
}

export default news