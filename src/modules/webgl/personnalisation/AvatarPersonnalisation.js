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

    this.temps = {}

    this.init()
  }

  init () {
    this.initTemp()
    this.initHead()
    this.initBeard()
    this.initHair()
    this.initEyes()
    this.initTop()
    this.initGlasses()

    delete this.temps
  }

  initTemp () {
    this.temps = {
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
      glasses: []
    }

    this.head.children.forEach(item => {
      const name = item.name
      if (this.isType(name, 'eyelip')) {
        this.temps.eyeLids.push(item)

      } else if (this.isType(name, 'hear')) {
        this.temps.ears.push(item)

      } else if (this.isType(name, 'hair')) {
        this.temps.hairs.parents.push(item)
        if (item.children && item.children.length > 0) {
          this.temps.hairs.children.push(item.children)
        }

      } else if (this.isType(name, 'eyebrow')) {
        this.temps.eyebrows.push(item)

      } else if (this.isType(name, 'beard') || this.isType(name, 'mustache')) {
        this.temps.beard.push(item)

      } else if (this.isType(name, 'eye_color')) {
        this.temps.eyeColor.push(item)

      } else if (this.isType(name, 'body')) {
        this.temps.top.push(item)

      } else if (this.isType(name, 'glasses')) {
        this.temps.glasses.push(item)
      }
    })
  }

  isType(name, type) {
    const newName = name.toLowerCase()
    return newName.indexOf(type) >= 0
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
