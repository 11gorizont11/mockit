import getNewHeader from '../helpers/getNewHeader'

export const setStatusCode = (state, statusCode) => {
  state.stub.statusCode = statusCode;
}

export const addNewHeader = (state) => {
  state.stub.headers.push(getNewHeader())
}

export const updateHeader = (state, { id, name, value }) => {
  state.stub.headers.find(item => item.id === id)[name] = value;
  console.log("Header", { id, name, value })
}

export const updatePath = (state, newPath) => {
  state.stub.path = newPath;
} 