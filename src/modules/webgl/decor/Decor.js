import { OBJLoader, MTLLoader } from 'three-obj-mtl-loader'
import { guiDecor } from '../gui'
import config from '@/config/config'

class Decor {
  constructor (params) {
    this.scene = params.scene
    this.config = params.config
    this.paths = {
      obj: params.modelPaths.obj,
      mtl: params.modelPaths.mtl,
    }
    this.mode = params.mode ? params.mode : 'default'
    this.isShown = params.isShown

    this.name = params.name

    this.init()
  }

  init () {
    this.loadModel()
  }

  getModel () {
    return this.model
  }

  hide() {
    if (this.model) {
      this.isShown = false
      this.model.visible = false
    }
  }

  show() {
    if (this.model) {
      this.isShown = true
      this.model.visible = true
    }
  }

  initGui () {
    // if (guiDecor.__controllers.length <= 0) {
      const decorFolder = guiDecor.addFolder(this.name)
      decorFolder.add(this.model.position, 'x', -10, 10).name('Position X')
      decorFolder.add(this.model.position, 'y', -10, 10).name('Position Y')
      decorFolder.add(this.model.position, 'z', -10, 10).name('Position Z')
      decorFolder.add(this.model.rotation, 'x', -10, 10).name('Rotation X')
      decorFolder.add(this.model.rotation, 'y', -10, 10).name('Rotation Y')
      decorFolder.add(this.model.rotation, 'z', -10, 10).name('Rotation Z')
      decorFolder.add(this.model.scale, 'x', 0, 10).name('Scale X')
      decorFolder.add(this.model.scale, 'y', 0, 10).name('Scale Y')
      decorFolder.add(this.model.scale, 'z', 0, 10).name('Scale Z')
    // }
  }

  updateColors () {
    this.model.children.forEach(item => {
      const color = item.material.color
      const newColor = new THREE.Color(color)
      newColor.convertSRGBToLinear()
      item.material.color = newColor

      if (item.children && item.children.length > 0) {
        item.children.forEach(childrenItem => {
          const color = childrenItem.material.color
          const newColor = new THREE.Color(color)
          newColor.convertSRGBToLinear()
          childrenItem.material.color = newColor
        })
      }
    })
  }

  loadModel () {
    const objLoader = new OBJLoader()
    const mtlLoader = new MTLLoader()

    mtlLoader.load( this.paths.mtl, (materials) => {
      materials.preload()
      objLoader.setMaterials(materials)

      objLoader.load(this.paths.obj, (obj) => {
        this.model = obj
        this.model.scale.set(this.config.scale.x, this.config.scale.y, this.config.scale.z)
        this.model.position.set(this.config.position.x, this.config.position.y, this.config.position.z)

        // this.updateColors()

        this.scene.add(obj)
        if (!this.isShown) {
          this.hide()
        }
        this.initGui()
      })
    })
  }

}

export default Decor
