import * as THREE from 'three'
import { gui, guiScene } from './gui'
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
    this.initDecors()
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
    const lightConfig = this.configScene.lights.point
    if (lightConfig) {
      // this.directionalLight = new THREE.DirectionalLight(new THREE.Color(lightConfig.color), lightConfig.intensity, lightConfig.distance, lightConfig.decay)
      this.hemisphereLight1 = new THREE.HemisphereLight(new THREE.Color('rgb(234, 234, 235)'), new THREE.Color('rgb(0, 0, 0)'), 1)
      this.hemisphereLight1.castShadow = true
      this.hemisphereLight1.position.set(lightConfig.position.x, lightConfig.position.y, lightConfig.position.z)
      this.hemisphereLight2 = this.hemisphereLight1.clone()
      this.hemisphereLight2.visible = false
      this.hemisphereLight3 = this.hemisphereLight2.clone()

      this.ambientLight1 = new THREE.AmbientLight(0xffffff)
      this.ambientLight1.castShadow = true
      this.ambientLight1.visible = false
      this.ambientLight2 = this.ambientLight1.clone()
      this.ambientLight3 = this.ambientLight2.clone()

      this.directionalLight1 = new THREE.DirectionalLight(0xffffff, 0.5)
      this.directionalLight1.castShadow = true
      this.directionalLight1.visible = false
      this.directionalLight2 = this.directionalLight1.clone()
      this.directionalLight3 = this.directionalLight2.clone()

      this.reactAreaLight1 = new THREE.RectAreaLight(0xffffff, 0.5, 30, 30)
      this.reactAreaLight1.castShadow = true
      this.reactAreaLight1.visible = false
      this.reactAreaLight2 = this.reactAreaLight1.clone()
      this.reactAreaLight3 = this.reactAreaLight2.clone()

      this.spotLight1 = new THREE.SpotLight(0xffffff)
      this.spotLight1.castShadow = true
      this.spotLight1.visible = false
      this.spotLight2 = this.spotLight1.clone()
      this.spotLight3 = this.spotLight2.clone()

      this.pointLight1 = new THREE.SpotLight(0xffffff)
      this.pointLight1.castShadow = true
      this.pointLight1.visible = false
      this.pointLight2 = this.pointLight1.clone()
      this.pointLight3 = this.pointLight2.clone()

      this.scene.add(this.hemisphereLight1)
      this.scene.add(this.hemisphereLight2)
      this.scene.add(this.hemisphereLight3)
      this.scene.add(this.ambientLight1)
      this.scene.add(this.ambientLight2)
      this.scene.add(this.ambientLight3)
      this.scene.add(this.directionalLight1)
      this.scene.add(this.directionalLight2)
      this.scene.add(this.directionalLight3)
      this.scene.add(this.reactAreaLight1)
      this.scene.add(this.reactAreaLight2)
      this.scene.add(this.reactAreaLight3)
      this.scene.add(this.pointLight1)
      this.scene.add(this.pointLight2)
      this.scene.add(this.pointLight3)
    }
  }

  onAvatarReady () {
    this.state.ready = true
  }

  initGUI () {
    this.gui = gui
    this.gui.closed = true

    document.querySelector('.gui__wrapper').appendChild(gui.domElement)

    if (!gui.__folders['Lights']) {
      const lightFolder = guiScene.addFolder('Lights')
      lightFolder.addLight('HemisphereLight 1', this.hemisphereLight1)
      lightFolder.__folders['HemisphereLight 1'].add(this.hemisphereLight1, 'visible')
      lightFolder.addLight('HemisphereLight 2', this.hemisphereLight2)
      lightFolder.__folders['HemisphereLight 2'].add(this.hemisphereLight2, 'visible')
      lightFolder.addLight('HemisphereLight 3', this.hemisphereLight3)
      lightFolder.__folders['HemisphereLight 3'].add(this.hemisphereLight3, 'visible')

      lightFolder.addLight('Ambient Light 1', this.ambientLight1)
      lightFolder.__folders['Ambient Light 1'].add(this.ambientLight1, 'visible')
      lightFolder.addLight('Ambient Light 2', this.ambientLight2)
      lightFolder.__folders['Ambient Light 2'].add(this.ambientLight2, 'visible')
      lightFolder.addLight('Ambient Light 3', this.ambientLight3)
      lightFolder.__folders['Ambient Light 3'].add(this.ambientLight3, 'visible')

      lightFolder.addLight('Directional Light 1', this.directionalLight1)
      lightFolder.__folders['Directional Light 1'].add(this.directionalLight1, 'visible')
      lightFolder.addLight('Directional Light 2', this.directionalLight2)
      lightFolder.__folders['Directional Light 2'].add(this.directionalLight2, 'visible')
      lightFolder.addLight('Directional Light 3', this.directionalLight3)
      lightFolder.__folders['Directional Light 3'].add(this.directionalLight3, 'visible')

      lightFolder.addLight('React Area Light 1', this.reactAreaLight1)
      lightFolder.__folders['React Area Light 1'].add(this.reactAreaLight1, 'visible')
      lightFolder.addLight('React Area Light 2', this.reactAreaLight2)
      lightFolder.__folders['React Area Light 2'].add(this.reactAreaLight2, 'visible')
      lightFolder.addLight('React Area Light 3', this.reactAreaLight3)
      lightFolder.__folders['React Area Light 3'].add(this.reactAreaLight3, 'visible')

      lightFolder.addLight('Spot Light 1', this.spotLight1)
      lightFolder.__folders['Spot Light 1'].add(this.spotLight1, 'visible')
      lightFolder.addLight('Spot Light 2', this.spotLight2)
      lightFolder.__folders['Spot Light 2'].add(this.spotLight2, 'visible')
      lightFolder.addLight('Spot Light 3', this.spotLight3)
      lightFolder.__folders['Spot Light 3'].add(this.spotLight3, 'visible')

      lightFolder.addLight('Point Light 1', this.pointLight1)
      lightFolder.__folders['Point Light 1'].add(this.pointLight1, 'visible')
      lightFolder.addLight('Point Light 2', this.pointLight2)
      lightFolder.__folders['Point Light 2'].add(this.pointLight2, 'visible')
      lightFolder.addLight('Point Light 3', this.pointLight3)
      lightFolder.__folders['Point Light 3'].add(this.pointLight3, 'visible')
    }
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
