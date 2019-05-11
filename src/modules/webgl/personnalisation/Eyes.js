import * as THREE from 'three'

class Eyes {
  /**
   * @param {*} params
   * @typedef {{
   *   eyes: object,
   *   color: string,
   * }}
   */
  constructor (params) {
    this.eyes = params.eyes
    this.color = params.color

    this.init()
  }

  init () {
    this.updateColor(this.color)
  }

  /**
   * @return string
   */
  getColor () {
    return this.color
  }

  getEyes () {
    return this.eyes
  }

  setColor (color) {
    this.color = color
  }

  /**
   * @param {*} color
   */
  switchColor (color) {
    this.setColor(color)
    this.updateColor(color)
  }

  updateColor (color) {
    this.eyes[0].material.color = new THREE.Color(color)
    this.eyes[1].material.color = new THREE.Color(color)
  }
}

export default Eyes
