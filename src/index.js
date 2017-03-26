import { START, PROGRESS, DONE, ERROR, CLEAR } from './actionTypes'

export default class NavigationProgress {
  constructor({
    minInc = .1,
    maxInc = .3,
    trickleInterval = 500,
  }) {
    this.stopTrickling = null
    this.stopClearing = null
  }

  start() {
    clearTimeout(stopClearing)
    store.dispatch({ type: START })

    const trickle = () => store.dispatch({
      type: PROGRESS,
      payload: Math.random() * (maxInc - minInc) + minInc,
    })

    clearInterval(this.stopTrickling)
    this.stopTrickling = setInterval(trickle, trickleInterval)
    trickle()
  }

  finish() {
    clearInterval(this.stopTrickling)

    dispatch({ type: DONE })

    this.stopClearing = setTimeout(() => {
      dispatch({ type: CLEAR })
    }, 200)
  }

  error() {
    clearInterval(this.stopTrickling)

    dispatch({ type: ERROR })

    this.stopClearing = setTimeout(() => {
      dispatch({ type: CLEAR })
    }, 200)
  }
}
