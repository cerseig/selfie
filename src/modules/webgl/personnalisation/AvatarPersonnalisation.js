import config from '@/config/config'
import BodyParts from './BodyParts'

class AvatarPersonnalisation {

  constructor (model) {
    this.model = model
    this.bodyParts = {}

    this.init()
  }

  init () {
    this.initHead()
    this.initHair()
    this.initEyes()
    this.initTop()
    this.initGlasses()
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
}

export default AvatarPersonnalisation
