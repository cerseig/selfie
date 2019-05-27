const avatar = {
  modelPath: '/models/avatar.glb',
  modes: {
    debug: {
      scale: {
        x: 12,
        y: 12,
        z: 12
      },
      position: {
        x: 0,
        y: 0,
        z: -8
      }
    },
    default: {
      scale: {
        x: 3,
        y: 3,
        z: 3
      },
      position: {
        x: 0,
        y: 0,
        z: 0
      }
    }
  },
  bodyParts: {
    hair: {
      material: {
        matcap: '/models/textures/matcap-porcelain-white.jpg'
      }
    },
    eyes: {
      material: {
        matcap: '/models/textures/matcap-porcelain-white.jpg'
      }
    }
  }
}

export default avatar
