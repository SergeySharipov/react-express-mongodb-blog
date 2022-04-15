const i = (...params: unknown[]) => {
  console.log(...params)
}

const e = (...params: unknown[]) => {
  console.error(...params)
}

export default {
  i, e
}
