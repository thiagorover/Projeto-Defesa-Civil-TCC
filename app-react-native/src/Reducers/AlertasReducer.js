import { BUSCAR_ALERTA, BUSCAR_ALERTAS } from '../Actions/Constants'

const INITIAL_STATE = {
  all: [],
  selected: null
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case BUSCAR_ALERTAS:
      return { ...state, all: action.payload.data.object.data }
    case BUSCAR_ALERTA:
      return { ...state, selected: action.payload.data.object }
    default:
      return state
  }
}
