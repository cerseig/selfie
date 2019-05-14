import * as dat from 'dat.gui'
import 'three-dat.gui'

export const gui = new dat.GUI({ autoPlace: false })

dat.GUI.prototype.addThreeColor = (obj, varName, gui) => {
  // threejs & dat.gui have color incompatible formats so we use a dummy data as target :
  const dummy = {}
  // set dummy initial value :
  dummy[varName] = obj[varName].getStyle()
  return gui.addColor(dummy, varName)
    .onChange((colorValue) => {
      // set color from result :
      obj[varName].setStyle(colorValue)
    })
}

export const guiScene = gui.addFolder('Scene')
export const guiAvatar = gui.addFolder('Avatar')
export const guiDecor = gui.addFolder('Decor')

export default gui
