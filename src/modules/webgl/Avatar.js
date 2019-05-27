import GLTFLoader from 'three-gltf-loader'
import { guiAvatar } from './gui'
import avatar from '@/config/avatar'
import AvatarPersonnalisation from './personnalisation/AvatarPersonnalisation'
import AvatarAnimations from './animations/AvatarAnimations';

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

  isType(name, type) {
    const newName = name.toLowerCase()
    return newName.indexOf(type) >= 0
  }

  initElements (head) {
    const elements = {
      head: head,
      eyeLids: [],
      ears: [],
      hairs: {
        parents: [],
        children: []
      },
      beard: [],
      eyebrows: [],
      eyeColor: [],
      top: [],
      glasses: [],
      mouth: []
    }

    console.log(elements)

    head.children.forEach(item => {
      const name = item.name
      if (this.isType(name, 'eyelip')) {
        elements.eyeLids.push(item)

      } else if (this.isType(name, 'hear')) {
        elements.ears.push(item)

      } else if (this.isType(name, 'hair')) {
        elements.hairs.parents.push(item)
        if (item.children && item.children.length > 0) {
          elements.hairs.children.push(item.children)
        }

      } else if (this.isType(name, 'eyebrow')) {
        elements.eyebrows.push(item)

      } else if (this.isType(name, 'beard') || this.isType(name, 'mustache')) {
        elements.beard.push(item)

      } else if (this.isType(name, 'eye_color')) {
        elements.eyeColor.push(item)

      } else if (this.isType(name, 'body')) {
        elements.top.push(item)

      } else if (this.isType(name, 'glasses')) {
        elements.glasses.push(item)
      } else if (this.isType(name, 'mouth')) {
        elements.mouth[name] = item
      }
    })

    return elements
  }

  loadModel () {
    const loader = new GLTFLoader()

    loader.load(
      avatar.modelPath,
      (gltf) => {
        this.model = gltf.scene
        this.model.scale.set(this.config.scale.x, this.config.scale.y, this.config.scale.z)
        this.model.position.set(this.config.position.x, this.config.position.y, this.config.position.z)
        this.scene.add(this.model)

        let head = null
        this.model.children.forEach(item => {
          // console.log(item)
          if (item.name === 'head') {
            head = item
          }
        })

        const elements = this.initElements(head)

        this.personnalisation = new AvatarPersonnalisation({
          head: head,
          elements: elements,
          model: this.model
        })
        this.animations = new AvatarAnimations({
          elements: elements
        })

        this.onReadyClb()
      })
  }
}

export default Avatar
