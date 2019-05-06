import * as THREE from 'three'
import GLTFLoader from 'three-gltf-loader'

class Avatar {
  constructor (params) {
    this.positions = null

    console.log(params.modelPath)

    this.modelPath = params.modelPath

    console.log(THREE)
  }

  init () {

    this.loadModel()
  }

  loadModel () {
    const loader = new GLTFLoader()

    loader.load(
      this.modelPath,
       (gltf) => {
        this.model = gltf.scene;
        console.log(gltf, this.model)
        this.initGui(model, gltf.animations);
        this.mixer = new THREE.AnimationMixer( model );
    })
  }

  /**
   *
   * @param {*} positions Array of Objects
   */
  interpolate (positions) {

  }

  /**
   *
   * @param {*} positions Array of Objects
   */
  update (positions) {

  }
}

export default Avatar
