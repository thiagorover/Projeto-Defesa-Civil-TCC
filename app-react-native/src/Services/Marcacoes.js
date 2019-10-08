import { Images } from '../Themes'

const Marcacoes = [{
  id: 1,
  title: 'Alagamento',
  defaultColor: 'blue',
  defaultImage: Images.exemploAlagamento,
  icon: Images.markerBlue
}, {
  id: 2,
  title: 'Deslizamento de terra',
  defaultColor: 'yellow',
  defaultImage: Images.exemploDeslizamento,
  icon: Images.markerYellow
}, {
  id: 3,
  title: 'Árvore caída',
  defaultColor: 'green',
  defaultImage: Images.exemploArvore,
  icon: Images.markerGreen
}]

const GetMarcacao = tipo => {
  switch(tipo) {
    case 2:
      return Marcacoes[1]
    case 3:
      return Marcacoes[2]
    default:
      return Marcacoes[0]
  }
}

export {
  Marcacoes,
  GetMarcacao
}
