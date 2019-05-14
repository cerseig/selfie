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
    this.gui = params.gui

    this.init()
    this.initGUI()
  }

  init () {
    this.updateColor(this.color)
  }

  initGUI () {
    const eyesFolder = this.gui.addFolder('eyes : couleur')
    this.gui.addThreeColor(this.eyes[0].material, 'color', eyesFolder)
    this.gui.addThreeColor(this.eyes[1].material, 'emissive', eyesFolder)
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
    const newColor = new THREE.Color(color)
    newColor.convertSRGBToLinear()
    this.eyes[0].material.color = new THREE.Color(newColor)
    this.eyes[1].material.color = new THREE.Color(newColor)
  }
}

export default Eyes
