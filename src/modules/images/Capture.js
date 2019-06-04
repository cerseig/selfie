import html2canvas from 'html2canvas'
import saveImage from './SaveImage.js'

const Capture = {
  takeScreenshot (element, clb) {
    html2canvas(element, { allowTaint: true }).then(canvas => {
      const imageUrl = canvas.toDataURL('image/png', 1)
      console.log(imageUrl)
      const type = 'avatar'
      saveImage(imageUrl, type, clb)
    })
  }
}

export default Capture
