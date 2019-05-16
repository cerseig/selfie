import Decor from './Decor.js'

class Decors {
  constructor (params) {
    this.scene = params.scene
    this.config = params.config
    this.mode = params.mode ? params.mode : 'default'
    this.autoShow = params.autoShow

    console.log(this.config)

    this.decors = []
    this.decor = null
    this.init()
  }

  init () {
    this.config.list.forEach(decor => {
      if (decor.modelPaths) {
        this.decors.push(new Decor({
          scene: this.scene,
          config: decor,
          modelPaths: {
            obj: decor.modelPaths.obj,
            mtl: decor.modelPaths.mtl
          },
          name: decor.title,
          autoShow: this.autoShow,
          isShown: decor.title === this.config.default,
          mode: this.mode
        }))
      }
    })
    this.handleChange('mountain')
  }

  hide () {
    this.decor.hide()
  }

  show () {
    this.decor.show()
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
