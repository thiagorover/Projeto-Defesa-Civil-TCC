import axios from 'axios'
import { showError, REQUEST_URL, BUSCAR_MARCACAO, BUSCAR_MARCACOES, CRIAR_MARCACAO, VOTAR } from './Constants'
import { getAuthHeader } from '../Services'

const fetchMarksSuccess = response => {
  return {
    type: BUSCAR_MARCACOES,
    payload: response
  }
}

export const fetchMarks = () => {
  return dispatch => {
    axios.get(`${REQUEST_URL}/markups`)
      .then(response => {
        dispatch(fetchMarksSuccess(response))
      })
      .catch(err => {
        dispatch(showError(err))
      })
  }
}

const fetchMarkSuccess = response => {
  return {
    type: BUSCAR_MARCACAO,
    payload: response
  }
}

export const fetchMark = id => {
  return dispatch => {
    axios.get(`${REQUEST_URL}/markups/${id}`)
      .then(response => {
        dispatch(fetchMarkSuccess(response))
      })
      .catch(err => {
        dispatch(showError(err))
      })
  }
}

const doVoteSuccess = response => {
  console.log(response)
  return {
    type: VOTAR,
    payload: response
  }
}

export const doVote = vote => {
  let header = getAuthHeader()
console.log(vote)
  return dispatch => {
    axios.post(`${REQUEST_URL}/vote`, vote, {
      headers: header
    }).then(response => {
      dispatch(doVoteSuccess(response))
    })
    .catch(err => {
      dispatch(showError(err))
    })
  }
}

export const createMark = mark => {

  mark.id_user = 1;

  // formData.append('image', {
  //   uri: mark.path,
  //   name: 'mark.jpg',
  //   type: 'image/jpg'
  // })
  const request = axios({
    method: 'POST',
    url: `${REQUEST_URL}/markups`,
    headers: getAuthHeader(),
    data: mark
  }).then(e => {
    console.log(e)
  }).catch(e => {
    console.log(e.response)
  })

  return {
    type: CRIAR_MARCACAO
  }
}
