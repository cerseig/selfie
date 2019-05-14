const webgl = {
  debug: {
    scene: {
      lights: {
        point: {
          color: 'rgb(253, 252, 255)',
          intensity: 0.7,
          position: {
            x: 0,
            y: 0,
            z: 49
          },
          decay: 0.8,
          distance: 460,
          power: 17
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
        point: {
          color: 'rgb(253, 252, 255)',
          intensity: 0.7,
          position: {
            x: 0,
            y: 0,
            z: 49
          },
          decay: 0.8,
          distance: 460,
          power: 17
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
        x: 0,
        y: 0,
        z: 0
      }
    }
  }
}

export default webgl
