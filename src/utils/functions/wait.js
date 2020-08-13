export const wait = (cb = null, tm = 100) => {
  if (cb === null) return
  return new Promise((resolve) => {
    setTimeout(() => {
      cb()
      resolve()
    }, tm)
  })
}