import Decor from './Decor.js'

class Decors {
  constructor (params) {
    this.scene = params.scene
    this.config = params.config
    this.mode = params.mode ? params.mode : 'default'

    this.decors = []
    this.decor = null
    this.init()
  }

  init () {
    this.config.list.forEach(background => {
      if (background.modelPaths) {
        const decor = new Decor({
          scene: this.scene,
          config: background,
          modelPaths: {
            obj: background.modelPaths.obj,
            mtl: background.modelPaths.mtl
          },
          name: background.title,
          isShown: background.title === this.config.default,
          mode: this.mode
        })
        this.decors.push(decor)
      }
    })
    this.handleChange('mountain')
  }

  handleChange (change) {
    this.decors.forEach(item => {
      if (item.name === change) {
        if (this.decor) {
          this.decor.hide()
        }
        this.decor = item
        item.show()
      }
    })
  }

  getModel () {
    return this.model
  }

  initGui () {

  }

  loadModels () {

  }
}

export default Decors
