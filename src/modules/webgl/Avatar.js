import GLTFLoader from 'three-gltf-loader'
import { guiAvatar } from './gui'
import avatar from '@/config/avatar'
import AvatarPersonnalisation from './personnalisation/AvatarPersonnalisation'
import Positions from './positions/Positions'

class Avatar {
  constructor (params) {
    this.mode = params.mode ? params.mode : 'default'
    this.config = avatar.modes[this.mode]

    this.scene = params.scene
    this.model = null

    this.onReadyClb = params.onReadyClb

    this.positions = null
    this.personnalisation = null

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

        this.personnalisation = new AvatarPersonnalisation({
          head: head,
          model: this.model
        })
        this.positions = new Positions({
          head: head
        })

        this.onReadyClb()
      })
  }
}

export default Avatar
