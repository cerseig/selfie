const webgl = {
  debug: {
    scene: {
      lights: {
        directional: {
          color: 'rgb(255, 241, 226)',
          intensity: 2,
          position: {
            x: 200,
            y: -100,
            z: 500
          }
        }
      }
    },
    avatar: {
      scale: {
        x: 4,
        y: 4,
        z: 4
      },
      position: {
        x: -0.9,
        y: -1.1,
        z: 2
      }
    }
  },
  default: {
    scene: {
      lights: {
        directional: {
          color: 'rgb(253, 252, 255)',
          intensity: 1.5,
          position: {
            x: 200,
            y: -100,
            z: 900
          }
        }
      }
    },
    avatar: {
      scale: {
        x: 3,
        y: 3,
        z: 3
      },
      position: {
        x: 0,
        y: 1,
        z: 0
      }
    }
  }
}

export default webgl
