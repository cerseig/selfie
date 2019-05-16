import * as THREE from 'three'

class BodyParts {
  constructor (params) {
    this.bodyParts = params.bodyParts

    if (!Number.isNaN(params.currentBodyPart)) {
      this.currentBodyPart = params.bodyParts[params.currentBodyPart]
    }

    this.bodyPartLength = params.bodyParts.length

    this.material = params.material

    this.init()
  }

  init () {
    this.setMaterial(this.material)
    this.switchColor(this.material.color)

    this.bodyParts.forEach(bodyPart => {
      if (this.currentBodyPart && bodyPart !== this.currentBodyPart) {
        bodyPart.visible = false
      }
    })
  }

  /** Getters */
  getMaterial () {
    return this.material
  }

  getColor () {
    return this.material.color
  }

  getBodyParts () {
    return this.bodyParts
  }

  /** Setters */
  setMaterial (material) {
    if (material.matCap) {
      const matcap = new THREE.TextureLoader().load(material.matCap)
      this.bodyParts.forEach(bodyPart => {
        if (bodyPart.material) {
          bodyPart.material = new THREE.MeshMatcapMaterial({
            matcap: matcap
          })
        }
      })
    }
  }

  setColor (color) {
    this.material.color = color
  }

  setBodyPart (bodyPart) {
    if (this.currentBodyPart === 'none') {
      this.currentBodyPart = null
    } else {
      const newBodyPart = this.findBodyPart(bodyPart)
      if (bodyPart) {
        newBodyPart.visible = true
        this.currentBodyPart = newBodyPart
      }
    }
  }

  /** Methods */
  findBodyPart (bodyPart) {
    for (let i = 0; i < this.bodyPartLength; i++) {
      const item = this.bodyParts[i]
      if (item.name === bodyPart) {
        return item
      }
    }
  }

  switchBodyPart (bodyPart) {
    if (this.currentBodyPart) {
      this.currentBodyPart.visible = false
    }
    this.setBodyPart(bodyPart)
  }

  switchColor (color) {
    this.setColor(color)
    this.updateColor(color)
  }

  updateColor (color) {
    const newColor = new THREE.Color(color)
    newColor.convertSRGBToLinear()

    this.bodyParts.forEach(bodyPart => {
      if (bodyPart.material) {
        bodyPart.material.color = new THREE.Color(newColor)
      }
    })
  }
}

export default BodyParts
