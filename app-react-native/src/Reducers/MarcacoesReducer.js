import { BUSCAR_MARCACAO, BUSCAR_MARCACOES } from '../Actions/Constants'

const INITIAL_STATE = {
  all: [],
  selected: null
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case BUSCAR_MARCACOES:
      return { ...state, all: action.payload.data.object }
    case BUSCAR_MARCACAO:
      return { ...state, selected: action.payload.data.object }
    default:
      return state
  }
}
