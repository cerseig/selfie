import categories from '@/config/categories'
import BodyParts from './BodyParts'

class AvatarPersonnalisation {
  constructor (model) {
    this.model = model
    this.bodyParts = {}

    this.init()
  }

  init () {
    this.initHead()
    this.initBeard()
    this.initHair()
    this.initEyes()
    this.initTop()
    this.initGlasses()
  }

  initHead () {
    const category = categories[2]
    const defaultValues = category.default
    const eyeLids = []
    const ears = []

    this.model.children.forEach(item => {
      const name = item.name.toLowerCase()
      if (name === 'head') {
        this.head = item
      }
    })

    this.head.children.forEach(item => {
      const name = item.name.toLowerCase()
      if (name.indexOf('eyelip') >= 0) {
        eyeLids.push(item)
      } else if (name.indexOf('hear') >= 0) {
        ears.push(item)
      }
    })

    this.bodyParts.skin = new BodyParts({
      bodyParts: [this.head],
      children: [...eyeLids, ...ears],
      material: {
        color: category.colors[defaultValues.colors],
        matcap: '/models/textures/matcap_skin.jpg'
      }
    })
  }

  initHair () {
    const hairList = []
    const eyebrowList = []
    let childrenHair = []

    hairList.push({ name: 'none' })
    this.head.children.forEach(item => {
      const name = item.name.toLowerCase()
      if (name.indexOf('hair') >= 0) {
        hairList.push(item)

        if (item.children && item.children.length > 0) {
          childrenHair = [...childrenHair, ...item.children]
        }
      } else if (name.indexOf('eyebrow') >= 0) {
        eyebrowList.push(item)
      }
    })

    const category = categories[0]
    const defaultValues = category.default

    this.bodyParts.hair = new BodyParts({
      bodyParts: hairList,
      currentBodyPart: defaultValues.attributes,
      children: [...this.bodyParts.beard.bodyParts, ...eyebrowList, ...childrenHair],
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
      if (name.indexOf('beard') >= 0) {
        beardList.push(item)
      }
    })

    const category = categories[3]
    const defaultValues = category.default

    this.bodyParts.beard = new BodyParts({
      bodyParts: beardList,
      currentBodyPart: defaultValues.attributes,
      material: {
        matcap: '/models/textures/matcap-porcelain-white.jpg'
      }
    })
  }

  initEyes () {
    const eyes = []
    const category = categories[1]
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
    const category = categories[5]
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

    const category = categories[5]
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
