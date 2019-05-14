import * as THREE from 'three'
import { gui } from './gui'
import Avatar from './Avatar'
import Decors from './decor/Decors'
import config from '@/config/config'

class Scene {
  constructor (params) {
    this.positions = null

    this.config = params.config
    this.element = params.element
    this.sizes = params.sizes

    this.mode = params.mode ? params.mode : 'default'
    this.configScene = config.webgl[this.mode].scene

    this.showDecor = params.showDecor

    this.state = {
      ready: false
    }

    this.timing = {
      duration: 10000
    }

    this.startTime = 'now' in window.performance ? performance.now() : new Date().getTime()

    this.decors = null
    this.avatar = null

    this.initScene()
  }

  initScene () {
    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(45, this.sizes.width / this.sizes.height, 0.1, 50)
    this.camera.position.set(0, 2, 10)
    this.camera.lookAt(new THREE.Vector3(0, 2, 0))

    this.renderer = new THREE.WebGLRenderer({ alpha: true, preserveDrawingBuffer: true, antialias: true })
    this.renderer.gammaOutput = true
    this.renderer.gammaFactor = 2.2
    this.renderer.setClearColor(0x000000, 0)
    this.renderer.setSize(this.sizes.width, this.sizes.height)
    this.renderer.render(this.scene, this.camera)
    this.element.appendChild(this.renderer.domElement)

    this.initAvatar()
    // this.initDecors()
    this.initLights()

    // For threeJS inspector
    window.scene = this.scene
    window.THREE = THREE

    this.initGUI()
  }

  initAvatar () {
    this.avatar = new Avatar({
      scene: this.scene,
      modelPath: this.config.modelPath,
      renderer: this.renderer,
      mode: this.mode,
      onReadyClb: () => this.onAvatarReady()
    })
  }

  initDecors () {
    this.decors = new Decors({
      scene: this.scene,
      config: this.config.backgrounds,
      mode: this.mode,
      autoShow: this.showDecor
    })
  }

  initLights () {
    const lightConfig = this.configScene.lights

    if (lightConfig) {
      this.lights = []
      if (lightConfig.directionals) {
        lightConfig.directionals.forEach(item => {
          const light = new THREE.DirectionalLight(new THREE.Color(item.color), item.intensity)
          light.position.set(item.position.x, item.position.y, item.position.z)
          this.scene.add(light)
        })
      }

      if (lightConfig.hemispheres) {
        lightConfig.hemispheres.forEach(item => {
          const light = new THREE.HemisphereLight(new THREE.Color(item.color), new THREE.Color(item.groundColor), item.intensity)
          light.position.set(item.position.x, item.position.y, item.position.z)
          this.scene.add(light)
        })
      }
    }
  }

  onAvatarReady () {
    this.state.ready = true
  }

  initGUI () {
    this.gui = gui
    this.gui.closed = true

    document.querySelector('.gui__wrapper').appendChild(gui.domElement)
  }

  updateSizes (width, height) {
    this.sizes = {
      width: width,
      height: height
    }
    this.renderer.setSize(width, height)
  }

  /**
   *
   * @param {*} positions Array of Objects
   */
  update (positions) {
    this.renderer.render(this.scene, this.camera)

    this.avatar.update(positions)
  }
}

export default Scene
