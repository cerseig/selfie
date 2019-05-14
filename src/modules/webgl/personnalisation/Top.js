import * as THREE from 'three'

class Top {
  /**
   * @param {*} params
   * @typedef {{
   *   eyes: object,
   *   color: string,
   * }}
   */
  constructor (params) {
    this.top = params.top
    this.color = params.color
    this.gui = params.gui

    this.init()
    this.initGUI()
  }

  init () {
    this.updateColor(this.color)

    const texture = new THREE.TextureLoader().load('/models/textures/matcap_hair.png')
    this.top.material = new THREE.MeshMatcapMaterial({
      matcap: texture
    })
  }

  initGUI () {
    const topFolder = this.gui.addFolder('T-shirt : couleur')
    this.gui.addThreeColor(this.top.material, 'color', topFolder)
  }
  /**
   * @return string
   */
  getColor () {
    return this.color
  }

  getTop () {
    return this.top
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
    this.top.material.color = new THREE.Color(newColor)
  }
}

export default Top
