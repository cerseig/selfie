const backgrounds = {
  default: 'mountain',
  wanted: 'beach',
  list: [
    {
      icon: 'park',
      width: 80,
      height: 80,
    },
    {
      icon: 'beach',
      width: 80,
      height: 80,
    },
    {
      icon: 'mountain',
      width: 80,
      height: 80,
      modelPaths: {
        obj: '/models/decors/mountains/mountains.obj',
        mtl: '/models/decors/mountains/mountains.mtl'
      },
      scale: {
        x: 15,
        y: 15,
        z: 15
      },
      position: {
        x: 0,
        y: 0,
        z: -5
      }
    },
    {
      icon: 'museum',
      width: 80,
      height: 80,
    },
    {
      icon: 'bathroom',
      width: 80,
      height: 80,
    },
    {
      icon: 'cocooning',
      width: 80,
      height: 80,
    },
    {
      icon: 'eiffelTower',
      width: 80,
      height: 80,
    }
  ]
}

export default backgrounds
