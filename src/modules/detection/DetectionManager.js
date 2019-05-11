import DetectionInitializer from './DetectionInitializer'
import Face from '../face/Face'
import utils from '@/modules/helpers/utils.js'

/**
 * This class handles Detection Iinitialization with BRFv4
 * It receives tracking events and updates canvas with points
 */

class DetectionManager {
  constructor (params) {
    this.brfv4Example = { stats: {} }

    this.libPath = '/js/libs/BRFv4/brf_wasm/'

    this.ui = {
      $detection: document.querySelector('.js-detection'),
      $imageData: params && params.imageData ? params.imageData : null,
      $camera: params && params.camera ? params.camera : null,
      $pointsData: params && params.pointsData ? params.pointsData : null
    }

    this.ctxs = {
      $imageData: null,
      $camera: null
    }

    this.isDebug = !!(params && params.mode === 'debug')

    this.timeoutId = -1

    this.face = {}
    this.positions = {}
    this.resolutionFrame = {}
    this.outOfCamera = false
    this.tooClose = false
    this.tooFar = false
    this.elementToIncrease = 0
    this.isAnalyse = true

    this.onManagerReady = () => {}

    this.init()
  }

  init () {
    this.createDetectionElements()

    DetectionInitializer.init({
      libPath: this.libPath,
      onReady: (brfv4, brfManager, resolution) => this.onDetectionReady(brfv4, brfManager, resolution),
      isDebug: this.isDebug,
      elements: {
        camera: this.ui.$camera,
        imageData: this.ui.$imageData,
        pointsData: this.ui.$pointsData
      }
    })
  }

  getPositions () {
    return this.positions
  }

  getVideo () {
    return this.ui.$camera
  }

  getResolutionFrame () {
    return this.resolutionFrame
  }

  getOutOfCamera () {
    return this.outOfCamera
  }

  getTooClose () {
    return this.tooClose
  }

  getTooFar () {
    return this.tooFar
  }

  getIsAnalyse () {
    return this.isAnalyse
  }

  destroy () {
    clearTimeout(this.timeoutId)
    DetectionInitializer.destroy()
  }

  createDetectionElements () {

    if (!this.ui.$camera) {
      const camera = document.createElement('video')
      camera.setAttribute('class', 'detection__camera')
      camera.setAttribute('id', '_camera')
      this.ui.$camera = camera
      this.ui.$detection.appendChild(camera)
    }

    if (!this.ui.$imageData) {
      const imageData = document.createElement('canvas')
      imageData.setAttribute('class', 'detection__image')
      imageData.setAttribute('id', '_imageData')
      this.ui.$imageData = imageData
      this.ui.$detection.appendChild(imageData)
    }

    if (!this.ui.$pointsData) {
      const pointsData = document.createElement('canvas')
      pointsData.setAttribute('class', 'detection__points')
      pointsData.setAttribute('id', '_points')
      this.ui.$pointsData = pointsData
      this.ui.$detection.appendChild(pointsData)
    }

  }

  onDetectionReady (brfv4, brfManager, resolution) {
    this.brfv4 = brfv4
    this.brfManager = brfManager
    this.resolution = resolution

    this.ui.$pointsData.width = this.ui.$camera.videoWidth
    this.ui.$pointsData.height = this.ui.$camera.videoHeight
    this.ctxs.imageData = this.ui.$imageData.getContext('2d')
    this.ctxs.pointsData = this.ui.$pointsData.getContext('2d')

    if (!this.isDebug) {
      let faceDetectionFrame = this.onRestrictToCenter(brfv4, brfManager, resolution)
      this.trackFaces(faceDetectionFrame)
    } else {
      this.trackFaces()

      this.face = new Face({
        brfv4: this.brfv4,
        brfManager: this.brfManager
      })
    }
  }

  onRestrictToCenter (brfv4, brfManager, resolution) {
    let faceDetectionRegion = new brfv4.Rectangle()
    let maxFaceSize = faceDetectionRegion.height

    faceDetectionRegion.setTo(
      resolution.width * 0.25, resolution.height * 0.10,
      resolution.width * 0.50, resolution.height * 0.80
    )
    brfManager.setFaceDetectionRoi(faceDetectionRegion)

    if (faceDetectionRegion.width < faceDetectionRegion.height) {
      maxFaceSize = faceDetectionRegion.width
    }
    // Use the usual detection distances to be able to tell the user what to do.
    brfManager.setFaceDetectionParams(maxFaceSize * 0.30, maxFaceSize * 0.90, 12, 8)
    // Face tracking will reset to face detection, if the face turns too much or leaves
    // the desired distance to the camera.
    brfManager.setFaceTrackingResetParams(maxFaceSize * 0.45, maxFaceSize * 0.75, 25, 25, 25)

    this.resolutionFrame = faceDetectionRegion
    return faceDetectionRegion
  }

  drawCenterFrame (faceDetectionFrame, ctx) {
    ctx.strokeStyle = 'green'
    ctx.rect(faceDetectionFrame.x, faceDetectionFrame.y, faceDetectionFrame.width, faceDetectionFrame.height)
    ctx.stroke()
  }

  trackFaces (faceDetectionFrame) {
    if (this.brfv4Example.stats.start) this.brfv4Example.stats.start()

    const timeStart = window.performance.now()

    this.ctxs.pointsData.clearRect(0, 0, this.resolution.width, this.resolution.height)

    this.ctxs.imageData.setTransform(-1.0, 0, 0, 1, this.resolution.width, 0) // A virtual mirror should be... mirrored
    this.ctxs.imageData.drawImage(this.ui.$camera, 0, 0, this.resolution.width, this.resolution.height)
    this.ctxs.imageData.setTransform(1.0, 0, 0, 1, 0, 0) // unmirrored for drawing the results

    this.brfManager.update(this.ctxs.imageData.getImageData(0, 0, this.resolution.width, this.resolution.height).data)

    // this.handleTrackingResults(this.brfv4, this.brfManager.getFaces(), this.ctxs.pointsData, faceDetectionFrame)
    if (!this.isDebug) {
      this.handleTrackingResults(this.brfv4, this.brfManager, this.brfManager.getFaces(), this.ctxs.pointsData, faceDetectionFrame)
    } else {
      this.handleTrackingResults(this.brfv4, this.brfManager, this.brfManager.getFaces(), this.ctxs.pointsData)
    }

    if (this.brfv4Example.stats.end) this.brfv4Example.stats.end()

    if (this.timeoutId >= 0) {
      clearTimeout(this.timeoutId)
    }

    const elapstedMs = window.performance.now() - timeStart

    // We don't need 60 FPS, the camera will deliver at 30 FPS anyway.
    if (!this.isDebug) {
      this.timeoutId = setTimeout(() => { this.trackFaces(faceDetectionFrame) }, (1000 / 30) - elapstedMs)
    } else {
      this.timeoutId = setTimeout(() => { this.trackFaces() }, (1000 / 30) - elapstedMs)
    }
  }

  /**
   *
   * @param {*} brfv4 api
   * @param {*} faces
   * @param {*} pointsDataCtx
   */

  handleTrackingResults (brfv4, brfManager, faces, pointsDataCtx, faceDetectionFrame) {
    // this.drawCenterFrame(faceDetectionFrame, pointsDataCtx)

    for (let i = 0; i < faces.length; i++) {
      const face = faces[i]

      if (!this.isDebug) {
        let positionX = face.bounds.x
        let positionY = face.bounds.y

        var mergedFaces = brfManager.getMergedDetectedFaces()

        if (positionX < faceDetectionFrame.x || (positionX + face.bounds.width) > (faceDetectionFrame.x + faceDetectionFrame.width) || positionY < faceDetectionFrame.y || (positionY + face.bounds.height) > (faceDetectionFrame.y + faceDetectionFrame.height)) {
          this.outOfCamera = true
        } else {
          this.outOfCamera = false
        }

        if (mergedFaces.length > 0) {
          var mergedFace = mergedFaces[0]
          if (mergedFace.width < faceDetectionFrame.width * 0.50) { // startMinFaceSize
            this.tooFar = true
            this.tooClose = false
          } else if (mergedFace.width > faceDetectionFrame.width * 0.70) { // startMaxFaceSize
            this.tooClose = true
            this.tooFar = false
          }
        } else {
          this.tooFar = false
          this.tooClose = false
        }
      }

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

      if (!this.isDebug) {
        if (this.tooFar === false && this.tooClose === false && this.outOfCamera === false) {
          if (this.elementToIncrease < 50) {
            this.elementToIncrease = utils.increase(this.elementToIncrease, 50)
          } else if (this.elementToIncrease === 50) {
            this.isAnalyse = true
            console.log('analysis done')
            this.face = new Face({
              brfv4: this.brfv4,
              brfManager: this.brfManager
            })
            this.elementToIncrease++
          }
        } else {
          this.elementToIncrease = 0
          this.isAnalyse = false
        }
      }
    }
  }
}

export default DetectionManager
