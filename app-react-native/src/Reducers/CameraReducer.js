import { DEFINIR_IMAGEM } from '../Actions/Constants'

const INITAL_STATE = {
  image: null
}

export default (state = INITAL_STATE, action) => {
  switch (action.type) {
    case DEFINIR_IMAGEM:
      return { ...state, image: action.payload.image }
    default:
      return state
  }
}
