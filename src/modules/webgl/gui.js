import * as dat from 'dat.gui'
import 'three-dat.gui'

const gui = new dat.GUI()

dat.GUI.prototype.addThreeColor = (obj, varName) => {
  // threejs & dat.gui have color incompatible formats so we use a dummy data as target :
  const dummy = {}
  // set dummy initial value :
  dummy[varName] = obj[varName].getStyle()
  return this.addColor(dummy, varName)
    .onChange((colorValue) => {
      // set color from result :
      obj[varName].setStyle(colorValue)
    })
}

export const guiScene = gui.addFolder('Scene')
export const guiAvatar = gui.addFolder('Avatar')

export default gui
