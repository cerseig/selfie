import DetectionInitializer from './DetectionInitializer'
import Face from '../face/Face'

/**
 * This class handles Detection Iinitialization with BRFv4
 * It receives tracking events and updates canvas with points
 */

class DetectionManager {
  constructor () {
    this.brfv4Example = { stats: {} }

    this.libPath = '/js/libs/BRFv4/brf_wasm/'

    this.ui = {
      $detection: document.querySelector('.js-detection'),
      $imageData: null,
      $camera: null
    }

    this.ctxs = {
      $imageData: null,
      $camera: null
    }

    this.timeoutId = -1

    this.face = {}
    this.positions = {}

    this.init()
  }

  init () {
    this.createDetectionElements()

    DetectionInitializer.init({
      libPath: this.libPath,
      onReady: (brfv4, brfManager, resolution) => this.onDetectionReady(brfv4, brfManager, resolution),
      elements: {
        camera: this.ui.$camera,
        imageData: this.ui.$imageData
      }
    })
  }

  getPositions () {
    return this.positions
  }

  destroy () {
    clearTimeout(this.timeoutId)
    DetectionInitializer.destroy()
  }

  createDetectionElements () {
    const camera = document.createElement('video')
    camera.setAttribute('class', 'detection__camera')
    camera.setAttribute('id', '_camera')

    const imageData = document.createElement('canvas')
    const pointsData = imageData.cloneNode(true)
    imageData.setAttribute('class', 'detection__image')
    imageData.setAttribute('id', '_imageData')

    pointsData.setAttribute('class', 'detection__points')
    pointsData.setAttribute('id', '_points')

    this.ui.$imageData = imageData
    this.ui.$camera = camera
    this.ui.$pointsData = pointsData

    this.ui.$detection.appendChild(camera)
    this.ui.$detection.appendChild(imageData)
    this.ui.$detection.appendChild(pointsData)
  }

  onDetectionReady (brfv4, brfManager, resolution) {
    this.brfv4 = brfv4
    this.brfManager = brfManager
    this.resolution = resolution

    this.ui.$pointsData.width = this.ui.$camera.videoWidth
    this.ui.$pointsData.height = this.ui.$camera.videoHeight
    this.ctxs.imageData = this.ui.$imageData.getContext('2d')
    this.ctxs.pointsData = this.ui.$pointsData.getContext('2d')

    this.trackFaces()

    this.face = new Face({
      brfv4: this.brfv4,
      brfManager: this.brfManager
    })
  }

  trackFaces () {
    if (this.brfv4Example.stats.start) this.brfv4Example.stats.start()

    const timeStart = window.performance.now()

    this.ctxs.pointsData.clearRect(0, 0, this.resolution.width, this.resolution.height)

    this.ctxs.imageData.setTransform(-1.0, 0, 0, 1, this.resolution.width, 0) // A virtual mirror should be... mirrored
    this.ctxs.imageData.drawImage(this.ui.$camera, 0, 0, this.resolution.width, this.resolution.height)
    this.ctxs.imageData.setTransform(1.0, 0, 0, 1, 0, 0) // unmirrored for drawing the results

    this.brfManager.update(this.ctxs.imageData.getImageData(0, 0, this.resolution.width, this.resolution.height).data)

    this.handleTrackingResults(this.brfv4, this.brfManager.getFaces(), this.ctxs.pointsData)

    if (this.brfv4Example.stats.end) this.brfv4Example.stats.end()

    if (this.timeoutId >= 0) {
      clearTimeout(this.timeoutId)
    }

    const elapstedMs = window.performance.now() - timeStart

    // We don't need 60 FPS, the camera will deliver at 30 FPS anyway.
    this.timeoutId = setTimeout(() => { this.trackFaces() }, (1000 / 30) - elapstedMs)
  }

  /**
   *
   * @param {*} brfv4 api
   * @param {*} faces
   * @param {*} pointsDataCtx
   */
  handleTrackingResults (brfv4, faces, pointsDataCtx) {
    // Overwrite this function in your minimal example HTML file.

    for (let i = 0; i < faces.length; i++) {
      const face = faces[i]

      if (face.state === brfv4.BRFState.FACE_TRACKING_START ||
        face.state === brfv4.BRFState.FACE_TRACKING) {
        if (this.face.getAllExpressionsFunction) {
          this.positions = this.face.getAllExpressionsFunction(face)
        }

        pointsDataCtx.strokeStyle = '#000000'

        for (let k = 0; k < face.vertices.length; k += 2) {
          pointsDataCtx.beginPath()
          pointsDataCtx.arc(face.vertices[k], face.vertices[k + 1], 1, 0, 2 * Math.PI)

          pointsDataCtx.stroke()
        }
      }
    }
  }
}

export default DetectionManager
