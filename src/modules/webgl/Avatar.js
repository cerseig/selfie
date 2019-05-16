import GLTFLoader from 'three-gltf-loader'
import * as THREE from 'three'
import { guiAvatar } from './gui'
import config from '@/config/config'
import utils from '@/modules/helpers/utils.js'
import easings from '@/modules/helpers/easings.js'
import BodyParts from './personnalisation/BodyParts'

class Avatar {
  constructor (params) {
    this.paths = {
      model: params.modelPath
    }
    this.mode = params.mode ? params.mode : 'default'
    this.config = config.webgl[this.mode].avatar

    this.renderer = params.renderer

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
      const positionFolder = guiAvatar.addFolder('Geometry')
      positionFolder.add(this.model.position, 'x', -10, 10).name('Position X')
      positionFolder.add(this.model.position, 'y', -10, 10).name('Position Y')
      positionFolder.add(this.model.position, 'z', -10, 10).name('Position Z')
      positionFolder.add(this.model.rotation, 'x', -10, 10).name('Rotation X')
      positionFolder.add(this.model.rotation, 'y', -10, 10).name('Rotation Y')
      positionFolder.add(this.model.rotation, 'z', -10, 10).name('Rotation Z')
      positionFolder.add(this.model.scale, 'x', 0, 10).name('Scale X')
      positionFolder.add(this.model.scale, 'y', 0, 10).name('Scale Y')
      positionFolder.add(this.model.scale, 'z', 0, 10).name('Scale Z')

      this.guiElementsFolder = guiAvatar.addFolder('Material')
    }
  }

  initHead () {
    const category = config.categories[2]
    const defaultValues = category.default
    this.eyeLids = []

    this.model.children.forEach(item => {
      const name = item.name.toLowerCase()
      if (name === 'head') {
        this.head = item
        this.bodyParts.skin = new BodyParts({
          bodyParts: [item],
          material : {
            color: category.colors[defaultValues.colors],
          }
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

    this.bodyParts.hair = new BodyParts({
      bodyParts: hairList,
      currentBodyPart: defaultValues.attributes,
      material: {
        matcap: '/models/textures/matcap-porcelain-white.jpg',
        color: category.colors[defaultValues.colors]
      }
    })
  }

  initEyes () {
    const eyes = []
    const category = config.categories[1]
    const defaultValues = category.default

    this.head.children.forEach(item => {
      const name = item.name.toLowerCase()
      if (name.indexOf('eye_color') >= 0) {
        eyes.push(item)
      }
    })

    this.bodyParts.eyes = new BodyParts({
      bodyParts: eyes,
      material: {
        matcap: '/models/textures/matcap-porcelain-white.jpg',
        color: category.colors[defaultValues.colors]
      }
    })
  }

  initTop () {
    const category = config.categories[5]
    const defaultValues = category.default

    this.model.children.forEach(item => {
      const name = item.name.toLowerCase()
      if (name.indexOf('body') >= 0) {
        this.bodyParts.top = new BodyParts({
          bodyParts: [item],
          material: {
            color: category.colors[defaultValues.colors]
          }
        })
      }
    })
  }

  initGlasses () {
    const glassesList = []
    glassesList.push({ name: 'none' })
    this.head.children.forEach(item => {
      const name = item.name.toLowerCase()
      if (name.indexOf('glasses') >= 0) {
        glassesList.push(item)
      }
    })

    const category = config.categories[5]
    const defaultValues = category.default

    this.bodyParts.glasses = new BodyParts({
      bodyParts: glassesList,
      currentBodyPart: defaultValues.attributes,
      material: {
        color: category.colors[defaultValues.colors]
      }
    })
  }

  handlePersonnalisation (change) {
    switch (change.type) {
      case 'colors':
        this.bodyParts[change.title].switchColor(change.value)
        break
      case 'attributes':
        this.bodyParts[change.title].switchBodyPart(change.value)
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

        this.initGui()
        this.initHead()
        this.initHair()
        this.initEyes()
        this.initTop()
        this.initGlasses()

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
    this.head.rotation[key] = this.rotation[key].currentValue
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
    // console.log(positions.rotation.x)
    if (positions) {
      // console.log(this.positions, utils.isEmptyObject(this.positions))
      if (utils.isEmptyObject(this.positions)) {
        this.positions = positions
      } else {
        this.handleRotation(positions)
      }
    }
  }
}

export default Avatar
