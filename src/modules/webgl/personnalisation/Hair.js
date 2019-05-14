import * as THREE from 'three'

class Hair {
  /**
   * @param {*} params
   * @typedef {{
   *   haircutList: array,
   *   haircut: int,
   *   color: string
   * }}
   */
  constructor (params) {
    this.haircutList = params.haircutList
    this.haircut = params.haircutList[params.haircut] ? params.haircutList[params.haircut] : params.haircutList[0]
    this.color = params.color
    this.gui = params.gui
    this.haircutListlength = params.haircutList.length

    this.init()
  }

  init () {
    // this.updateColor(this.color)
    this.switchColor(this.color)
    this.hideHaircuts()
    this.initGUI()
  }

  initGUI() {
    const hairFolder = this.gui.addFolder('Cheveux : couleur')
    this.gui.addThreeColor( this.haircut.material, 'color', hairFolder)
    this.gui.addThreeColor( this.haircut.material, 'emissive', hairFolder)
  }

  /**
   * @return string
   */
  getColor () {
    return this.color
  }

  /**
   * @return string
   */
  getHair () {
    return this.hair
  }

  setColor (color) {
    this.color = color
  }

  findHaircut (haircut) {
    for (let i = 0; i < this.haircutListlength; i++) {
      const item = this.haircutList[i]
      if (item.name === haircut) {
        return item
      }
    }
  }

  setHaircut (haircut) {
    const newHaircut = this.findHaircut(haircut)
    if (newHaircut) {
      newHaircut.visible = true
      this.haircut = newHaircut
    }
  }

  /**
   * @param {*} color
   */
  switchColor (color) {
    this.setColor(color)
    this.updateColor(color)
  }

  updateColor (color) {
    this.haircutList.forEach(haircut => {
      const newColor = new THREE.Color(color)
      newColor.convertSRGBToLinear()
      haircut.material.color = newColor
    })
  }

  switchHaircut (haircut) {
    this.haircut.visible = false
    this.setHaircut(haircut)
  }

  hideHaircuts () {
    this.haircutList.forEach(haircut => {
      if (haircut !== this.haircut) {
        haircut.visible = false
      }
    })
  }
}

export default Hair
