import categories from '@/config/categories'
import BodyParts from './BodyParts'

const CATEGORIES = {
  HAIR: 0,
  EYES: 1,
  SKIN: 2,
  BEARD: 3,
  GLASSES: 4,
  TOP: 5
}

class AvatarPersonnalisation {
  constructor (params) {
    this.model = params.model
    this.head = params.head
    this.bodyParts = {}

    this.temps = params.elements

    this.init()
  }

  init () {
    this.initHead()
    this.initBeard()
    this.initHair()
    this.initEyes()
    this.initTop()
    this.initGlasses()

    delete this.temps
  }

  initHead () {
    const category = categories[CATEGORIES.SKIN]
    const defaultValues = category.default

    this.bodyParts.skin = new BodyParts({
      bodyParts: [this.head],
      children: [...this.temps.eyeLids, ...this.temps.ears],
      material: {
        color: category.colors[defaultValues.colors],
        matcap: '/models/textures/matcap_skin.jpg'
      }
    })
  }

  initHair () {
    const category = categories[CATEGORIES.HAIR]
    const defaultValues = category.default

    this.temps.hairs.parents.push({ name: 'none' })

    this.bodyParts.hair = new BodyParts({
      bodyParts: this.temps.hairs.parents,
      currentBodyPart: defaultValues.attributes,
      children: [...this.bodyParts.beard.bodyParts, ...this.temps.eyebrows, ...this.temps.hairs.children],
      material: {
        matcap: '/models/textures/matcap-porcelain-white.jpg',
        color: category.colors[defaultValues.colors]
      }
    })
  }

  initBeard () {
    const beardList = []
    beardList.push({ name: 'none' })
    this.head.children.forEach(item => {
      const name = item.name.toLowerCase()
      if (name.indexOf('beard') >= 0 || name.indexOf('mustache') >= 0) {
        beardList.push(item)
      }
    })

    const category = categories[CATEGORIES.BEARD]
    const defaultValues = category.default

    this.bodyParts.beard = new BodyParts({
      bodyParts: beardList,
      currentBodyPart: defaultValues.attributes
    })
  }

  initEyes () {
    const category = categories[CATEGORIES.EYES]
    const defaultValues = category.default

    this.bodyParts.eyes = new BodyParts({
      bodyParts: this.temps.eyeColor,
      material: {
        matcap: '/models/textures/matcap-porcelain-white.jpg',
        color: category.colors[defaultValues.colors]
      }
    })
  }

  initTop () {
    const category = categories[CATEGORIES.TOP]
    const defaultValues = category.default

    this.bodyParts.top = new BodyParts({
      bodyParts: [this.temps.top],
      material: {
        color: category.colors[defaultValues.colors]
      }
    })
  }

  initGlasses () {
    this.temps.glasses.push({ name: 'none' })

    const category = categories[CATEGORIES.GLASSES]
    const defaultValues = category.default

    this.bodyParts.glasses = new BodyParts({
      bodyParts: this.temps.glasses,
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
