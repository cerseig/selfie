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
        y: -3,
        z: -8,
        up: {
          y: -3
        }
      }
    },
    default: {
      scale: {
        x: 7,
        y: 7,
        z: 7
      },
      position: {
        x: 0,
        y: -1,
        z: 0,
        up: {
          y: 2
        }
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
