import { get } from '../request'

function getTitleRandom() {
  return Promise.resolve(
    get({
      url: 'title/random'
    })
  )
}

function getSloganRandom() {
  return Promise.resolve(
    get({
      url: 'slogan/random'
    })
  )
}

export { getTitleRandom, getSloganRandom }
