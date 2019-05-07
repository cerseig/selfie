import GLTFLoader from 'three-gltf-loader'
import { guiAvatar } from './gui'
import { config } from '@/config/config'
import utils from '@/modules/utils.js'

class Avatar {
  constructor (params) {
    this.positions = null

    this.scene = params.scene
    this.mode = params.mode
    this.paths = {
      model: params.modelPath
    }

    this.onReadyClb = params.onReadyClb
    this.positions = {}

    this.model = null

    this.init()
  }

  getModel () {
    return this.model
  }

  init () {
    this.loadModel()
  }

  initGui() {
    guiAvatar.open()
    guiAvatar.add(this.model.position, 'x', -20, 20).name('Position X')
    guiAvatar.add(this.model.position, 'y', -20, 20).name('Position Y')
    guiAvatar.add(this.model.position, 'z', -20, 20).name('Position Z')
    guiAvatar.add(this.model.rotation, 'x', -20, 20).name('Rotation X')
    guiAvatar.add(this.model.rotation, 'y', -20, 20).name('Rotation Y')
    guiAvatar.add(this.model.rotation, 'z', -20, 20).name('Rotation Z')
    guiAvatar.add(this.model.scale, 'x', 200, 250).name('Scale X')
    guiAvatar.add(this.model.scale, 'y', 200, 250).name('Scale Y')
    guiAvatar.add(this.model.scale, 'z', 200, 250).name('Scale Z')
  }

  loadModel () {
    const loader = new GLTFLoader()

    loader.load(
      this.paths.model,
      (gltf) => {
        this.model = gltf.scene
        this.model.scale.set(250, 250, 250)
        this.model.position.y = 2

        this.scene.add(this.model)
        this.initGui()
        this.onReadyClb()
      })
  }

  /**
   *
   * @param {*} positions Array of Objects
   */
  interpolate (positions) {

  }

  handleRotation(positions) {
    if (positions.rotationLeft) {
      const rotationLeft = utils.lerp(this.positions.rotationLeft, -(positions.rotationLeft * 0.6), .5)
      this.model.rotation.y = rotationLeft
      // this.positions.rotationLeft = rotationLeft
    }
    if (positions.rotationRight) {
      this.model.rotation.y = positions.rotationRight * 0.6
    }
    if (positions.rotationDown) {
      this.model.rotation.x = positions.rotationDown * 0.3
    }
    if (positions.rotationUp) {
      this.model.rotation.x = -(positions.rotationUp * 0.3)
    }
    if (positions.tiltRight) {
      this.model.rotation.z = -(positions.tiltRight * 0.3)
    }
    if (positions.tiltLeft) {
      this.model.rotation.z = positions.tiltLeft * 0.3
    }
  }

  /**
   *
   * @param {*} positions Array of Objects
   */
  update (positions) {
    if (utils.isEmptyObject(this.positions)) {
      this.positions = positions
      console.log(this.positions)
    } else {
      this.handleRotation(positions)
    }
  }
}

export default Avatar
