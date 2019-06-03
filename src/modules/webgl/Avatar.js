import GLTFLoader from 'three-gltf-loader'
import avatar from '@/config/avatar'
import AvatarPersonnalisation from './personnalisation/AvatarPersonnalisation'
import AvatarAnimations from './animations/AvatarAnimations'

class Avatar {
  constructor (params) {
    this.mode = params.mode ? params.mode : 'default'
    this.config = avatar.modes[this.mode]

    this.scene = params.scene
    this.model = null

    this.onReadyClb = params.onReadyClb

    this.positions = null
    this.personnalisation = null
    this.animations = null

    this.init()
  }

  init () {
    this.loadModel()
  }

  getModel () {
    return this.model
  }

  isType (name, type) {
    const newName = name.toLowerCase()
    return newName.indexOf(type) >= 0
  }

  initElements () {
    let elements = {}
    this.model.children.forEach(item => {
      if (item.name === 'head') {
        elements.head = item
      } else {
        elements.body = item
      }
    })

    elements = {
      ...elements,
      eyeLids: [],
      ears: [],
      hairs: {
        parents: [],
        children: []
      },
      beard: [],
      eyebrows: [],
      eyeColor: [],
      glasses: [],
      mouth: [],
      nose: {}
    }

    elements.head.children.forEach(item => {
      const name = item.name
      if (this.isType(name, 'eyelid')) {
        elements.eyeLids.push(item)
      } else if (this.isType(name, 'hear')) {
        elements.ears.push(item)
      } else if (this.isType(name, 'hair')) {
        elements.hairs.parents.push(item)
        if (item.children && item.children.length > 0) {
          elements.hairs.children = [...elements.hairs.children, ...item.children]
        }
      } else if (this.isType(name, 'eyebrow')) {
        elements.eyebrows.push(item)
      } else if (this.isType(name, 'beard')) {
        elements.beard.push(item)
      } else if (this.isType(name, 'eye_iris')) {
        elements.eyeColor.push(item)
      } else if (this.isType(name, 'glasses')) {
        elements.glasses.push(item)
      } else if (this.isType(name, 'mouth')) {
        elements.mouth[name] = item
      } else if (this.isType(name, 'noze')) {
        elements.nose = item
      }
    })

    return elements
  }

  loadModel () {
    const loader = new GLTFLoader()
    loader.load(avatar.modelPath, this.initModel.bind(this))
  }

  initModel (gltf) {
    this.model = gltf.scene
    this.model.scale.set(this.config.scale.x, this.config.scale.y, this.config.scale.z)
    this.model.position.set(this.config.position.x, this.config.position.up.y, this.config.position.z)
    this.scene.add(this.model)

    const elements = this.initElements()

    this.personnalisation = new AvatarPersonnalisation({
      elements: elements,
      model: this.model
    })

    this.animations = new AvatarAnimations({
      elements: elements,
      model: this.model,
      config: this.config
    })

    this.onReadyClb()
  }
}

export default Avatar
