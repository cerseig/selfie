const webgl = {
  debug: {
    scene: {
      lights: {
        directional: {
          color: "rgb(255, 241, 226)",
          intensity: 2,
          position: {
            x: 200,
            y: -100,
            z: 500
          }
        }
      }
    }
  },
  default: {
    scene: {
      lights: {
        directional: {
          color: "rgb(255, 186, 186)",
          intensity: 2,
          position: {
            x: 200,
            y: -100,
            z: 500
          }
        }
      }
    }
  }
}

export default webgl
