import * as THREE from 'three'

class Skin {
  /**
   * @param {*} params
   * @typedef {{
   *   face: object,
   * }}
   */
  constructor (params) {
    this.face = params.face
    this.color = params.color
    this.gui = params.gui

    this.eyeLids = params.face.children.filter(item => {
      const name = item.name.toLowerCase()
      if (name.indexOf('paupière') >= 0) {
        return item
      }
    })

    this.init()
  }

  init () {
    // this.face.receiveShadow = true
    this.updateColor(this.color)
    this.initGUI()
  }

  /**
   * @return string
   */
  getColor () {
    return this.color
  }

  getFace () {
    return this.face
  }

  setColor (color) {
    this.color = color
  }

  initGUI () {
    const skinFolder = this.gui.addFolder('Face : couleur')
    this.gui.addThreeColor(this.face.material, 'color', skinFolder)
    this.gui.addThreeColor(this.face.material, 'emissive', skinFolder)
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
    this.face.material.color = new THREE.Color(newColor)
    // this.eyeLids[0].material.color = new THREE.Color(newColor)
    // this.eyeLids[1].material.color = new THREE.Color(newColor)
  }
}

export default Skin
