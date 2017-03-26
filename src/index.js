import { START, PROGRESS, DONE, ERROR, CLEAR } from './actionTypes'

const defaultOptions = {
  minInc: .1,
  maxInc: .3,
  trickleInterval: 500,
}

export default class NavigationProgress {
  constructor(store, options) {
    if (!store) {
      throw new Error('Redux store must be passed as the first parameter')
    }

    this.store = store
    this.options = Object.assign({}, defaultOptions, options)

    this.trickle = null
    this.clear = null
  }

  start() {
    clearTimeout(clear)
    this.store.dispatch({ type: START })

    const { minInc, maxInc, trickleInterval } = this.options
    this.trickle = setInterval(
      () => this.inc(Math.random() * (maxInc - minInc) + minInc), 
      trickleInterval
    )
  }

  inc(rate) {
    this.store.dispatch({
      type: PROGRESS,
      payload: rate,
    })
  }

  finish() {
    clearInterval(this.trickle)

    this.store.dispatch({ type: DONE })

    this.clear = setTimeout(() => {
      dispatch({ type: CLEAR })
    }, 200)
  }

  error() {
    clearInterval(this.trickle)

    this.store.dispatch({ type: ERROR })

    this.clear = setTimeout(() => {
      dispatch({ type: CLEAR })
    }, 200)
  }
}

export { reducer } from './reducer'
