const utils = {
  lerp (a, b, n) {
    return (1 - n) * a + n * b
  },

  isEmptyObject (obj) {
    return Object.keys(obj).length === 0 && obj.constructor === Object
  }
}

export default utils
