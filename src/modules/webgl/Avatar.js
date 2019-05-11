import GLTFLoader from 'three-gltf-loader'
import { guiAvatar, gui } from './gui'
import config from '@/config/config'
import utils from '@/modules/helpers/utils.js'
import easings from '@/modules/helpers/easings.js'
import Hair from './Hair';

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

    this.mode = params.mode ? params.mode : 'default'
    this.config = config.webgl[this.mode].avatar

    this.frameDuration = 8
    this.durationTime = (this.frameDuration / 60) * 1000
    this.startTime = 0
    this.currentFrame = 0

    this.rotation = {
      x: {
        beginValue: 0,
        currentValue: 0,
        endValue: 0
      },
      y: {
        beginValue: 0,
        currentValue: 0,
        endValue: 0
      },
      z: {
        beginValue: 0,
        currentValue: 0,
        endValue: 0
      }
    }

    this.beginValue = 0
    this.endValue = 0

    this.init()
  }

  init () {
    this.loadModel()
  }

  getModel () {
    return this.model
  }

  initGui () {
    if (guiAvatar.__controllers.length <= 0) {
      guiAvatar.open()
      guiAvatar.add(this.model.position, 'x', -10, 10).name('Position X')
      guiAvatar.add(this.model.position, 'y', -10, 10).name('Position Y')
      guiAvatar.add(this.model.position, 'z', -10, 10).name('Position Z')
      guiAvatar.add(this.model.rotation, 'x', -10, 10).name('Rotation X')
      guiAvatar.add(this.model.rotation, 'y', -10, 10).name('Rotation Y')
      guiAvatar.add(this.model.rotation, 'z', -10, 10).name('Rotation Z')
      guiAvatar.add(this.model.scale, 'x', 0, 10).name('Scale X')
      guiAvatar.add(this.model.scale, 'y', 0, 10).name('Scale Y')
      guiAvatar.add(this.model.scale, 'z', 0, 10).name('Scale Z')
    }
  }

  initHair () {
    // this.hair = new Hair({
    //   hairList: ,
    //   hair: 0,
    //   hairColor:
    // })
  }

  loadModel () {
    const loader = new GLTFLoader()

    loader.load(
      this.paths.model,
      (gltf) => {
        this.model = gltf.scene
        this.model.scale.set(this.config.scale.x, this.config.scale.y, this.config.scale.z)
        this.model.position.set(this.config.position.x, this.config.position.y, this.config.position.z)
        this.scene.add(this.model)

        this.initGui()
        this.onReadyClb()
      })
  }

  updateRotationValues (positions) {
    const rotation = positions.rotation

    this.updateRotationValue('x', rotation.x)
    this.updateRotationValue('y', rotation.y)
    this.updateRotationValue('z', rotation.z)
  }

  updateRotationValue (keyAxis, rotation) {
    this.rotation[keyAxis].beginValue = this.rotation[keyAxis].beginValue ? this.rotation[keyAxis].currentValue : rotation // Retrieves former rotation
    this.rotation[keyAxis].endValue = rotation // Retrieves rotation from api
  }

  updateModelRotations (deltaTime) {
    this.updateModelRotation('x', deltaTime)
    this.updateModelRotation('y', deltaTime)
    this.updateModelRotation('z', deltaTime)
  }

  updateModelRotation (key, deltaTime) {
    this.rotation[key].currentValue = easings.linear(deltaTime, this.rotation[key].beginValue, this.rotation[key].endValue - this.rotation[key].beginValue, this.durationTime) // Get interpolled value
    this.model.children[3].rotation[key] = this.rotation[key].currentValue
  }

  handleRotation (positions) {
    if (this.currentFrame % this.frameDuration === 0) {
      this.updateRotationValues(positions)
      this.startTime = Date.now() // Retrieve start time
    }

    const now = Date.now()
    const deltaTime = now - this.startTime // Delta time between start & now

    if (this.model) {
      this.updateModelRotations(deltaTime)
    }

    this.currentFrame++
  }

  /**
   *
   * @param {*} positions Array of Objects
   */
  update (positions) {
    if (utils.isEmptyObject(this.positions)) {
      this.positions = positions
    } else {
      this.handleRotation(positions)
    }
  }
}

export default Avatar
