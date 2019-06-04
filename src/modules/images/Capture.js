import html2canvas from 'html2canvas'
import saveImage from './SaveImage.js'

const Capture = {
  takeScreenshot (element) {
    return new Promise( (resolve, reject) => {
      html2canvas(element, { allowTaint: true }).then(canvas => {
        const imageUrl = canvas.toDataURL('image/png', 1)
        const type = 'avatar'
        saveImage(imageUrl, type, (params) => {
          resolve(params)
        })
      })
    })
  }
}

export default Capture
