import {FETCH_MOVIES} from '../../actionTypes'
import topRatedMovies from '../mocks/topTatedMovies'

export function fetchTopRatedMovies() {
  return {
    type: FETCH_MOVIES,
    payload: topRatedMovies
  }
}
