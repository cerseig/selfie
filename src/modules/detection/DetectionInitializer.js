/**
 * This class handles the BRFv4 detection initialization
 * It asks mediastream and create canvas to detect face landmarks
 * It requires :
 * A video html tag with _webcam id
 * A canvas html tag with _imageData id
 * A _points html tag with _points id
 * It uses a lot of BRFv4 lib exemples behaviors
 */
class DetectionInitializer {
  constructor (params) {
    // this.brfv4Example = { stats: {} }
    this.brfv4 = null // the library namespace
    this.brfManager = null // the API
    this.brfv4WASMBuffer = null

    this.resolution = null // the video stream resolution (usually 640x480)
    this.timeoutId = -1

    this.paths = {
      brfv4BaseURL: '/', // Directory where is located the lib
      brfv4SDKName: 'BRFv4_JS_TK210219_v4.2.0_trial', // The current available library,
      brfv4FilePath: '/BRFv4_JS_TK210219_v4.2.0_trial'
    }

    this.ui = {
      $camera: null,
      $imageData: null
    }

    this.ctxs = {
      webcam: null,
      imageData: null
    }

    this.onReady = () => {}

    // iOS has this weird behavior that it freezes the camera stream, if the CPU get's
    // stressed too much, but it doesn't unfreeze the stream upon CPU relaxation.
    // A workaround is to get the video stream dimension and then turn the stream off
    // until BRFv4 was successfully initialized (takes about 3 seconds of heavy CPU work).
    this.isIOS = (/iPad|iPhone|iPod/.test(window.navigator.userAgent) && !window.MSStream)
  }

  init (params) {
    this.paths.brfv4BaseURL = params.libPath // Directory where is located the lib
    this.paths.brfv4FilePath = `${params.libPath}BRFv4_JS_TK210219_v4.2.0_trial`

    this.onReady = params.onReady
    this.ui = {
      $camera: params.elements.camera,
      $imageData: params.elements.imageData
    }

    this.loadBRFv4Version()
  }

  destroy () {
    this.stopCamera()
    this.removeEvents()
  }

  /**
   * Test storing to and loading from a non-zero location via a parameter.
   * Safari on iOS 11.2.5 returns 0 unexpectedly at non-zero locations
   */
  testSafariWebAssemblyBug () {
    const bin = new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 6, 1, 96, 1, 127, 1, 127, 3, 2, 1, 0, 5, 3, 1, 0, 1, 7, 8, 1, 4, 116, 101, 115, 116, 0, 0, 10, 16, 1, 14, 0, 32, 0, 65, 1, 54, 2, 0, 32, 0, 40, 2, 0, 11])
    const mod = new WebAssembly.Module(bin)
    const inst = new WebAssembly.Instance(mod, {})
    return (inst.exports.test(4) !== 0)
  }

  /**
   * Checks if WebAssembly is supported
   * @return boolean
   */
  isWebAssemblySupported () {
    let isWebAssemblySupported = (typeof WebAssembly === 'object')

    if (isWebAssemblySupported && !this.testSafariWebAssemblyBug()) {
      isWebAssemblySupported = false
    }

    return isWebAssemblySupported
  }

  /**
   * Detect WebAssembly support and load either WASM or ASM version of BRFv4
   */
  loadBRFv4Version () {
    console.log(`Detection Initializer => Checking support of WebAssembly: ${this.isWebAssemblySupported ? 'loading WASM (not ASM).' : 'loading ASM (not WASM).'} `)

    if (this.isWebAssemblySupported) {
      this.readWASMBinary(`${this.paths.brfv4FilePath}.wasm`,
        (r) => {
          this.brfv4WASMBuffer = r // see function waitForSDK. The ArrayBuffer needs to be added to the module object.
          this.addBRFScript()
          this.startCamera()
        },
        (e) => { console.error(e) }
        // (p) => { console.log(p) }
      )
    } else {
      this.addBRFScript()
      this.startCamera()
    }
  }

  /**
   * Load BRFv4 Wasm binary file
   * @param {*} url of the file
   * @param {*} onload callback
   * @param {*} onerror  callback
   * @param {*} onprogress callback
   */
  readWASMBinary (url, onload, onerror, onprogress) {
    const xhr = new XMLHttpRequest()

    xhr.open('GET', url, true)
    xhr.responseType = 'arraybuffer'
    xhr.onload = function xhrOnLoad () {
      if ((xhr.status === 200 || xhr.status === 0) && xhr.response) {
        onload(xhr.response)
        return
      }
      onerror()
    }
    xhr.onerror = onerror
    xhr.onprogress = onprogress
    xhr.send(null)
  }

  /**
   * Creates a script html tag with the wasm file and adds it at the end
   */
  addBRFScript () {
    const script = document.createElement('script')
    script.setAttribute('type', 'text/javascript')
    script.setAttribute('async', true)
    script.setAttribute('src', `${this.paths.brfv4FilePath}.js`)

    document.getElementsByTagName('body')[0].appendChild(script)
  }

  /**
   * The brfv4 namespace is now filled with the API classes and objects.
   * Initializes the BRFManager and the tracking API.
   */
  initSDK () {
    const brfv4 = this.brfv4
    this.resolution = new brfv4.Rectangle(0, 0, this.ui.$imageData.width, this.ui.$imageData.height)
    this.brfManager = new brfv4.BRFManager()
    this.brfManager.init(this.resolution, this.resolution, 'com.tastenkunst.brfv4.js.examples.minimal.webcam')

    if (this.isIOS) {
      // Start the camera stream again on iOS.

      setTimeout(() => {
        console.log('Detection Initializer => delayed camera restart for iOS')

        this.startCamera()
      }, 2000)
    } else {
      this.onInitBRFv4(brfv4, this.brfManager, this.resolution)
    }
  }

  /**
   * Sets up the namespace and initializes BRFv4.
   */
  waitForSDK () {
    if (this.brfv4 === null && window.hasOwnProperty('initializeBRF')) {
      this.brfv4 = {
        locateFile: fileName => `${this.paths.brfv4BaseURL} ${fileName}`, // locateFile tells the asm.js version where to find the .mem file.
        wasmBinary: this.brfv4WASMBuffer // Add loaded WASM file to Module
      }
      window.initializeBRF(this.brfv4)
    }

    if (this.brfv4 && this.brfv4.sdkReady) {
      this.initSDK()
    } else {
      setTimeout(() => this.waitForSDK(), 250) // wait a bit...
    }
  }

  /**
   * Will be called when BRFv4 was initialized.
   * @param {*} brfManager
   * @param {*} resolution
   */
  onInitBRFv4 (brfv4, brfManager, resolution) {
    console.log('Detection Initializer => BRFv4 initialized')
    this.onReady(brfv4, brfManager, resolution)
  }

  /**
   * Resize the canvas to match the webcam video size.
   */
  onResize () {
    if (this.ui) {
      this.ui.$imageData.width = this.ui.$camera.videoWidth
      this.ui.$imageData.height = this.ui.$camera.videoHeight
    }
  }

  startCamera () {
    window.navigator.mediaDevices.getUserMedia({ video: { width: 640, height: 480, frameRate: 30 } })
      .then((mediaStream) => {
        this.onStreamFetched(mediaStream)
      }).catch(() => { alert('No camera available.') })
  }

  stopCamera () {
    this.ui.$camera.srcObject.getTracks().forEach(track => track.stop())
  }

  removeEvents () {
    window.removeEventListener('resize', this.onResize)
  }

  /**
   * @param {*} mediaStream (return by the camera)
   */
  onStreamFetched (mediaStream) {
    const webcam = this.ui.$camera
    webcam.srcObject = mediaStream
    this.ui.$camera.play()

    // Check whether we know the stream dimension yet, if so, start BRFv4.
    // this.ctxs.imageData is not null if we restart the camera stream on iOS.
    if (this.ctxs.imageData === null) {
      this.onStreamDimensionsAvailable()
    }
    // else {
    //   this.trackFaces()
    // }
  }

  onStreamDimensionsAvailable () {
    console.log(`Detection Initializer => onStreamDimensionsAvailable: ${this.ui.$camera.videoWidth !== 0}`)

    if (this.ui.$camera.videoWidth === 0) {
      setTimeout(() => this.onStreamDimensionsAvailable(), 100) // Recursive if no dimensions
    } else {
      this.onResize()
      // this.ctxs.imageData = this.ui.$imageData.getContext('2d')

      window.addEventListener('resize', this.onResize)

      // on iOS we want to close the video stream first and
      // wait for the heavy BRFv4 initialization to finish.
      // Once that is done, we start the stream again.

      // as discussed above, close the stream on iOS and wait for BRFv4 to be initialized.
      if (this.isIOS) {
        this.ui.$camera.pause()
        this.stopCamera()
      }

      this.waitForSDK()
    }
  }
}

export default new DetectionInitializer()
