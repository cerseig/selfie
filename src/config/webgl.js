import avatar from './avatar.js'

const webgl = {
  avatar: avatar,
  debug: {
    scene: {
      lights: {
        hemispheres: [
          {
            position: {
              x: -386,
              y: -200,
              z: 100
            },
            intensity: 0.7,
            color: 'rgb(219, 190, 169)',
            groundColor: 'rgb(0, 0, 0)'
          },
          {
            position: {
              x: 390,
              y: 300,
              z: -300
            },
            intensity: 0.7,
            color: 'rgb(255, 255, 255)',
            groundColor: 'rgb(0, 0, 0)'
          }
        ],
        directionals: [
          {
            position: {
              x: -52,
              y: 28,
              z: 0
            },
            intensity: 0.6,
            color: 'rgb(255, 255, 255)'
          },
          {
            position: {
              x: 10,
              y: 20,
              z: 0
            },
            intensity: 0.6,
            color: 'rgb(255, 255, 255)'
          }
        ]
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
        y: 0,
        z: 0
      }
    }
  },
  default: {
    scene: {
      lights: {
        hemispheres: [
          {
            position: {
              x: -386,
              y: -200,
              z: 100
            },
            intensity: 0.7,
            color: 'rgb(219, 190, 169)',
            groundColor: 'rgb(0, 0, 0)'
          },
          {
            position: {
              x: 390,
              y: 300,
              z: -300
            },
            intensity: 0.7,
            color: 'rgb(255, 255, 255)',
            groundColor: 'rgb(0, 0, 0)'
          }
        ],
        directionals: [
          {
            position: {
              x: -52,
              y: 28,
              z: 0
            },
            intensity: 0.6,
            color: 'rgb(255, 255, 255)'

          },
          {
            position: {
              x: 10,
              y: 20,
              z: 0
            },
            intensity: 0.6,
            color: 'rgb(255, 255, 255)'
          }
        ]
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
        y: 0,
        z: 0
      }
    }
  }
}

export default webgl
