import * as THREE from 'three'

class Glasses {
  /**
   * @param {*} params
   * @typedef {{
   *   glassesList: array,
   *   glasses: int,
   *   color: string
   * }}
   */
  constructor (params) {
    this.glassesList = params.glassesList
    this.glasses = params.glassesList[params.glasses] ? params.glassesList[params.glasses] : params.glassesList[0]
    this.color = params.color
    this.gui = params.gui
    this.glassesListlength = params.glassesList.length

    this.init()
  }

  init () {
    this.switchColor(this.color)
    this.hideGlasses()
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
  getGlasses () {
    return this.glasses
  }

  setColor (color) {
    this.color = color
  }

  findGlasses (glasses) {
    for (let i = 0; i < this.glassesListlength; i++) {
      const item = this.glassesList[i]
      if (item.name === glasses) {
        return item
      }
    }
  }

  setGlasses (glasses) {
    console.log(glasses)
    if (glasses === 'none') {
      this.glasses = null
    } else {
      const newGlasses = this.findGlasses(glasses)
      if (newGlasses) {
        newGlasses.visible = true
        this.glasses = newGlasses
      }
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
    this.glassesList.forEach(glasses => {
      if (glasses.name !== 'none') {
        const newColor = new THREE.Color(color)
        newColor.convertSRGBToLinear()
        glasses.material.color = newColor
      }
    })
  }

  switchGlasses (glasses) {
    if (this.glasses) {
      this.glasses.visible = false
    }
    this.setGlasses(glasses)
  }

  hideGlasses () {
    this.glassesList.forEach(glasses => {
      if (glasses.name !== 'none' && glasses !== this.glasses) {
        glasses.visible = false
      }
    })
  }
}

export default Glasses
