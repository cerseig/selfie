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

    this.eyeLids = params.face.children.filter(item => {
      const name = item.name.toLowerCase()
      if (name.indexOf('paupière') >= 0) {
        return item
      }
    })

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

  getFace () {
    return this.face
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
    this.face.material.color = new THREE.Color(color)
    this.eyeLids[0].material.color = new THREE.Color(color)
    this.eyeLids[1].material.color = new THREE.Color(color)
  }
}

export default Skin
