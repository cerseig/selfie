import categories from '@/config/categories'
import BodyParts from './BodyParts'
import BodyPartsExtended from './BodyPartsExtended'

const CATEGORIES = {
  HAIR: 0,
  EYES: 1,
  SKIN: 2,
  BEARD: 3,
  GLASSES: 4,
  BODY: 5
}

class AvatarPersonnalisation {
  constructor (params) {
    this.model = params.model
    this.head = params.elements.head
    this.bodyParts = {}

    this.temps = params.elements

    this.init()
  }

  init () {
    this.initHead()
    this.initBeard()
    this.initHair()
    this.initEyes()
    this.initBody()
    this.initGlasses()

    delete this.temps
  }

  initHead () {
    const category = categories[CATEGORIES.SKIN]
    const defaultValues = category.default

    this.bodyParts.skin = new BodyPartsExtended({
      bodyParts: [this.head],
      children: [...this.temps.eyeLids, ...this.temps.ears],
      extendedParts: [
        {
          item: this.temps.mouth.mouth_lips,
          material: {
            color: category.colors[defaultValues.colors].extended.lips
          }
        },
        {
          item: this.temps.nose,
          material: {
            color: category.colors[defaultValues.colors].extended.nose
          }
        }
      ],
      needMorph: 'eyelid',
      material: {
        color: category.colors[defaultValues.colors],
        matcap: '/models/textures/matcap_skin.jpg'
      }
    })

    this.bodyParts.skin.init()
  }

  initHair () {
    const category = categories[CATEGORIES.HAIR]
    const defaultValues = category.default

    this.temps.hairs.parents.unshift({ name: 'none' })
    this.bodyParts.hair = new BodyParts({
      bodyParts: this.temps.hairs.parents,
      currentBodyPart: defaultValues.attributes,
      needMorph: 'eyebrow',
      children: [...this.bodyParts.beard.bodyParts, ...this.temps.eyebrows, ...this.temps.hairs.children],
      material: {
        matcap: '/models/textures/matcap-porcelain-white.jpg',
        color: category.colors[defaultValues.colors]
      }
    })

    this.bodyParts.hair.init()
  }

  initBeard () {
    this.temps.beard.unshift({ name: 'none' })

    const category = categories[CATEGORIES.BEARD]
    const defaultValues = category.default

    this.bodyParts.beard = new BodyParts({
      bodyParts: this.temps.beard,
      currentBodyPart: defaultValues.attributes
    })

    this.bodyParts.beard.init()
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

    this.bodyParts.eyes.init()
  }

  initBody () {
    const category = categories[CATEGORIES.BODY]
    const defaultValues = category.default

    this.bodyParts.body = new BodyParts({
      bodyParts: [this.temps.body],
      material: {
        color: category.colors[defaultValues.colors]
      }
    })

    this.bodyParts.body.init()
  }

  initGlasses () {
    this.temps.glasses.unshift({ name: 'none' })

    const category = categories[CATEGORIES.GLASSES]
    const defaultValues = category.default

    this.bodyParts.glasses = new BodyParts({
      bodyParts: this.temps.glasses,
      currentBodyPart: defaultValues.attributes,
      material: {
        color: category.colors[defaultValues.colors]
      }
    })

    this.bodyParts.glasses.init()
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
