import { ERROR } from '../Actions/Constants'

const INITAL_STATE = {
  errorMessage: null
}

export default (state = INITAL_STATE, action) => {
  switch (action.type) {
    case ERROR:
      console.log(action.payload.data.message)
      return { ...state, errorMessage: action.payload.data.message }
    default:
      return state
  }
}
