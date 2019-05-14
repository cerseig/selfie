const backgrounds = {
  default: 'mountain',
  wanted: 'beach',
  list: [
    {
      title: 'park',
      width: 80,
      height: 80
    },
    {
      title: 'beach',
      width: 80,
      height: 80,
      background: '/img/decors/decor_beach.png',
      modelPaths: {
        obj: '/models/decors/beach/beach.obj',
        mtl: '/models/decors/beach/beach.mtl'
      },
      scale: {
        x: 25,
        y: 25,
        z: 25
      },
      position: {
        x: 0,
        y: -5,
        z: -10
      }
    },
    {
      title: 'mountain',
      width: 80,
      height: 80,
      modelPaths: {
        obj: '/models/decors/mountains/mountains.obj',
        mtl: '/models/decors/mountains/mountains.mtl'
      },
      scale: {
        x: 25,
        y: 25,
        z: 25
      },
      position: {
        x: 0,
        y: -5,
        z: -10
      }
    },
    {
      title: 'museum',
      width: 80,
      height: 80
    },
    {
      title: 'bathroom',
      width: 80,
      height: 80
    },
    {
      title: 'cocooning',
      width: 80,
      height: 80
    },
    {
      title: 'eiffelTower',
      width: 80,
      height: 80
    }
  ]
}

export default backgrounds
