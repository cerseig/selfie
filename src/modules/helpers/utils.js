const utils = {
  lerp (a, b, n) {
    return (1 - n) * a + n * b
  },

  getValueInInterval (val, max, min) {
    return (val - min) / (max - min)
  },

  getNormalizedValue (val, min, max, intvalMin, intvalMax) {
    return (intvalMax - intvalMin) * ((val - min) / (max - min)) + intvalMin
  },

  isEmptyObject (obj) {
    return Object.keys(obj).length === 0 && obj.constructor === Object
  },

  increase (i, maxLength) {
    if (i < maxLength) {
      i++
      return i
    }
  },

  isFunction (functionToCheck) {
    return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]'
  }
}

export default utils
