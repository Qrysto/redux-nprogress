import { START, PROGRESS, DONE, ERROR, CLEAR } from './actionTypes'

// {
//   bool loading,
//   number percentage,
//   bool error,
// }

const startingPercentage = 15

const initialState = {
  shown: false,
  error: false,
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case START: 
      return {
        shown: true,
        percentage: startingPercentage,
        error: false,
      }

    case PROGRESS:
      if (state.shown) {
        const rate = limit(payload, 0, 1)

        return {
          shown: true,
          percentage: state.percentage + (100 - state.percentage) * rate,
          error: false,
        }
      } else {
        return state
      }

    case DONE:
      if (state.shown) {
        return {
          shown: true,
          percentage: 100,
          error: false,
        }
      } else {
        return state
      }

    case ERROR:
      if (state.shown) {
        return {
          shown: true,
          percentage: 100,
          error: true,
        }
      } else {
        return state
      }

    case CLEAR:
      return {
        shown: false,
      }
  }
}

function limit(n, min, max) {
  if (n < min) return min
  if (n > max) return max
  return n
}
