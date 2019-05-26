import * as THREE from 'three'

class BodyParts {
  constructor (params) {
    this.bodyParts = params.bodyParts

    this.children = params.children

    if (!Number.isNaN(params.currentBodyPart)) {
      this.currentBodyPart = params.bodyParts[params.currentBodyPart]
    }

    this.bodyPartLength = params.bodyParts.length

    this.material = params.material

    this.init()
  }

  init () {
    if (this.material) {
      this.setMaterial(this.material)
    }
    if (this.material.color) {
      this.switchColor(this.material.color)
    }

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
    if (material.matcap) {
      const matcap = new THREE.TextureLoader().load(material.matcap)
      this.bodyParts.forEach(bodyPart => {
        if (bodyPart.material) {
          bodyPart.material = new THREE.MeshMatcapMaterial({
            matcap: matcap
          })
        }
      })

      if (this.children) {
        this.children.forEach(child => {
          if (child.material) {
            child.material = new THREE.MeshMatcapMaterial({
              matcap: matcap
            })
          }
        })
      }
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
    const outputColor = new THREE.Color(newColor)

    this.bodyParts.forEach(bodyPart => {
      if (bodyPart.material) {
        bodyPart.material.color = outputColor
      }
    })

    if (this.children) {
      this.children.forEach(child => {
        if (child.material) {
          child.material.color = outputColor
        }
      })
    }
  }
}

export default BodyParts
