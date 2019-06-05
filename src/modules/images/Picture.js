import saveImage from './SaveImage.js'

const Picture = {
  takePicture (element) {
    return new Promise( (resolve, reject) => {
      const canvas = document.createElement('canvas')
      const width = element.videoWidth
      const height = element.videoHeight

      canvas.width = width
      canvas.height = height

      canvas.getContext('2d').drawImage(element, 0, 0, width, height)
      const imageUrl = canvas.toDataURL('image/png')
      const type = 'picture'

      saveImage(imageUrl, type, (params) => {
        resolve(params)
      })
    })
  }
}

export default Picture
