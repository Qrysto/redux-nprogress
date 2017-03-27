import { START, PROGRESS, DONE, ERROR, CLEAR } from './actionTypes'

const defaultOptions = {
  minInc: .1,
  maxInc: .3,
  trickleInterval: 800,
  fadeDuration: 400, // time in ms to wait for progress bar to fade out before resetting
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

    this.start = this.start.bind(this)
    this.inc = this.inc.bind(this)
    this.complete = this.complete.bind(this)
    this.error = this.error.bind(this)
  }

  setStore(store) {
    this.store = store
  }

  start() {
    clearTimeout(this.clear)
    this.store.dispatch({ type: START })

    const { minInc, maxInc, trickleInterval } = this.options

    const trickle = () => {
      this.inc(Math.random() * (maxInc - minInc) + minInc)
    }
    this.trickle = setInterval(trickle, trickleInterval)
  }

  inc(rate) {
    this.store.dispatch({
      type: PROGRESS,
      payload: rate,
    })
  }

  complete() {
    clearInterval(this.trickle)

    this.store.dispatch({ type: DONE })

    this.clear = setTimeout(() => {
      this.store.dispatch({ type: CLEAR })
    }, this.options.fadeDuration)
  }

  error() {
    clearInterval(this.trickle)

    this.store.dispatch({ type: ERROR })

    this.clear = setTimeout(() => {
      this.store.dispatch({ type: CLEAR })
    }, this.options.fadeDuration)
  }
}

export { default as reducer } from './reducer'
