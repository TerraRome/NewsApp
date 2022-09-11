const initialState = {
  user: null,
}

const auth = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'SET_AUTH':
      return {
        ...state,
        user: payload,
      }
    default:
      return state
  }
}

export default auth