import { createBrowserHistory, History } from 'history'

let history = createBrowserHistory()

const wrapHistory = {
  push(location: History.LocationDescriptor<unknown>) {
    history.push(location)
  },

  replace(location: History.LocationDescriptor<unknown>) {
    history.replace(location)
  },

  goBack() {
    history.goBack()
  },

  get location() {
    return history.location
  },

  get listen() {
    return history.listen
  }
}

function createHistory() {
  history = createBrowserHistory()
  return history
}

export { createHistory }
export default wrapHistory
