const utils = {
  lerp (a, b, n) {
    return (1 - n) * a + n * b
  },

  getRandomInInterval(min, max) {
    return Math.random() * (max - min + 1) + min
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
  },

  isOverflown (element) {
    return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth
  }
}

export default utils
