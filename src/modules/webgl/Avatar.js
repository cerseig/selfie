import GLTFLoader from 'three-gltf-loader'
import { guiAvatar } from './gui'
import config from '@/config/config'
import utils from '@/modules/helpers/utils.js'
import easings from '@/modules/helpers/easings.js'
import Hair from './personnalisation/Hair'
import Skin from './personnalisation/Skin'
import Eyes from './personnalisation/Eyes'

class Avatar {
  constructor (params) {
    this.paths = {
      model: params.modelPath
    }
    this.mode = params.mode ? params.mode : 'default'
    this.config = config.webgl[this.mode].avatar

    this.onReadyClb = params.onReadyClb
    this.positions = {}

    this.scene = params.scene
    this.model = null

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

    this.bodyParts = {}

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

  initHead () {
    const category = config.categories[2]
    const defaultValues = category.default
    this.model.children.forEach(item => {
      if (item.name === 'Face') {
        this.head = item
        this.bodyParts.skin = new Skin({
          face: item,
          color: category.colors[defaultValues.colors]
        })
      }
    })
  }

  initHair () {
    const hairList = []
    this.head.children.forEach(item => {
      const name = item.name.toLowerCase()
      if (name.indexOf('cheveux') >= 0) {
        hairList.push(item)
      }
    })

    const category = config.categories[0]
    const defaultValues = category.default

    this.bodyParts.hair = new Hair({
      haircutList: hairList,
      haircut: defaultValues.attributes,
      color: category.colors[defaultValues.colors]
    })
  }

  initEyes () {
    const eyes = []
    const category = config.categories[1]
    const defaultValues = category.default

    this.head.children.forEach(item => {
      const name = item.name.toLowerCase()
      if (name.indexOf('pupille') >= 0) {
        eyes.push(item)
      }
    })

    this.bodyParts.eyes = new Eyes({
      eyes: eyes,
      color: category.colors[defaultValues.colors]
    })
  }

  handlePersonnalisation (change) {
    switch (change.title) {
      case 'hair':
        switch (change.type) {
          case 'colors':
            this.bodyParts.hair.switchColor(change.value)
            break
          case 'attributes':
            this.bodyParts.hair.switchHaircut(change.value)
            break
        }
        break
      case 'skin':
        switch (change.type) {
          case 'colors':
            this.bodyParts.skin.switchColor(change.value)
            break
        }
        break
      case 'eye':
        switch (change.type) {
          case 'colors':
            this.bodyParts.eyes.switchColor(change.value)
            break
        }
        break
    }
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

        this.initHead()
        this.initHair()
        this.initEyes()
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
