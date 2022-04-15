const i = (...params: any[]) => {
  console.log(...params)
}

const e = (...params: any[]) => {
  console.error(...params)
}

export default {
  i, e
}