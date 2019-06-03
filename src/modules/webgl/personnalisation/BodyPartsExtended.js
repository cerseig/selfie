import BodyParts from './BodyParts'

export default class BodyPartsExtended extends BodyParts {
  constructor (props) {
    super(props)
    this.extendedParts = props.extendedParts
  }


  updateColor (props) {
    super.updateColor(props)
  }

  setMaterial (material) {
    super.setMaterial(material)

    this.extendedParts.forEach(child => {
      if (child.matcap) {
        child.item.material = new THREE.MeshMatcapMaterial({
          morphTargets: this.needMorph && child.item.name.indexOf(this.needMorph) >= 0,
          matcap: child.material.matcap
        })
      }
    })
  }

  updateColor (colors) {
    super.updateColor(colors)

    this.extendedParts.forEach((child, index) => {
      if (child) {
        child.item.material.color = this.convertColor(colors.extended[child.item.name])
      }
    })
  }
}
