import { LOGAR } from '../Actions/Constants'

const INITIAL_STATE = {
  isLogged: false
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGAR:
      return { ...state, isLogged: action.payload.isLogged }
    default:
      return state
  }
}
