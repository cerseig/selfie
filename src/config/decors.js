const decors = {
  default: 'mountain',
  wanted: 'beach',
  list: [
    {
      title: 'park',
      background: '/img/decors/decor_park.png',
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
      background: 'https://i.imgur.com/mmVZxbz.jpg',
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
      background: 'https://news.artnet.com/app/news-upload/2018/02/install-view-of-basquiat-untitled-1024x684.jpg',
      width: 80,
      height: 80
    },
    {
      title: 'bathroom',
      background: '/img/decors/decor_bath.png',
      width: 80,
      height: 80
    },
    {
      title: 'cocooning',
      background: 'https://i.pinimg.com/564x/54/e3/27/54e327913cb2c1350cf879a89de634fe.jpg',
      width: 80,
      height: 80
    },
    {
      title: 'eiffelTower',
      background: 'https://i.pinimg.com/564x/43/a8/bc/43a8bc36bf8d56a279b58d437f09637d.jpg',
      width: 80,
      height: 80
    }
  ]
}

export default decors
