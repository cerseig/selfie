const categories = [
  {
    title: 'hair',
    icon: {
      title: 'hair',
      width: 60,
      height: 60
    },
    default: {
      colors: 9,
      attributes: 3
    },
    colors: [
      { item: 'rgb(30,26,20)' },
      { item: 'rgb(84,57,39)' },
      { item: 'rgb(135,93,42)' },
      { item: 'rgb(214,118,54)' },
      { item: 'rgb(216,163,78)' },
      { item: 'rgb(234,220,193)' },
      { item: 'rgb(252,201,200)' },
      { item: 'rgb(244,90,78)' },
      { item: 'rgb(90,177,157)' },
      { item: 'rgb(34,63,145)' },
      { item: 'rgb(113,46,119)' },
      { item: 'rgb(135,37,37)' }
    ],
    attributes: [ // Hair cuts
      {
        icon: '/img/thumbnails/glasses_none.png',
        ref: 'none'
      },
      {
        icon: '/img/thumbnails/glasses_none.png',
        ref: 'hair_1'
      },
      {
        icon: '/img/thumbnails/glasses_none.png',
        ref: 'hair_2'
      },
      {
        icon: '/img/thumbnails/glasses_none.png',
        ref: 'hair_3'
      },
      {
        icon: '/img/thumbnails/glasses_none.png',
        ref: 'hair_4'
      },
      {
        icon: '/img/thumbnails/glasses_none.png',
        ref: 'hair_5'
      },
      {
        icon: '/img/thumbnails/glasses_none.png',
        ref: 'hair_6'
      },
      {
        icon: '/img/thumbnails/glasses_none.png',
        ref: 'hair_7'
      },
      {
        icon: '/img/thumbnails/glasses_none.png',
        ref: 'hair_8'
      },
      {
        icon: '/img/thumbnails/glasses_none.png',
        ref: 'hair_9'
      },
      {
        icon: '/img/thumbnails/glasses_none.png',
        ref: 'hair_10'
      }
    ]
  },
  {
    title: 'eyes',
    icon: {
      title: 'eye',
      width: 60,
      height: 60
    },
    default: {
      colors: 5
    },
    colors: [
      { item: 'rgb(191, 146, 113)' },
      { item: 'rgb(111, 76, 36)' },
      { item: 'rgb(59, 43, 37)' },
      { item: 'rgb(18, 13, 11)' },
      { item: 'rgb(210, 209, 209)' },
      { item: 'rgb(72, 145, 220)' },
      { item: 'rgb(94, 193, 82)' }
    ]
  },
  {
    title: 'skin',
    icon: {
      title: 'face',
      width: 60,
      height: 60
    },
    default: {
      colors: 1
    },
    colors: [
      {
        item: 'rgb(228,198,180)',
        extended: {
          noze: 'rgb(244,90,78)',
          mouth_lips: 'rgb(34,63,145)'
        }
      },
      {
        item: 'rgb(212, 167, 137)',
        extended: {
          noze: 'rgb(220, 40, 29)',
          mouth_lips: 'rgb(94, 193, 82)'
        }
      },
      {
        item: 'rgb(181,139,106)',
        extended: {
          noze: 'rgb(244,90,78)',
          mouth_lips: 'rgb(34,63,145)'
        }
      },
      {
        item: 'rgb(110,88,71)',
        extended: {
          noze: 'rgb(244,90,78)',
          mouth_lips: 'rgb(34,63,145)'
        }
      },
      {
        item: 'rgb(87,67,54)',
        extended: {
          noze: 'rgb(244,90,78)',
          mouth_lips: 'rgb(94, 193, 82)'
        }
      }
    ]
  },
  {
    title: 'beard',
    icon: {
      title: 'moustache',
      width: 60,
      height: 60
    },
    default: {
      attributes: 0
    },
    attributes: [
      {
        icon: '/img/thumbnails/glasses_none.png',
        ref: 'none'
      },
      {
        icon: '/img/thumbnails/glasses_none.png',
        ref: 'beard_1'
      },
      {
        icon: '/img/thumbnails/glasses_none.png',
        ref: 'beard_2'
      },
      {
        icon: '/img/thumbnails/glasses_none.png',
        ref: 'beard_3'
      },
      {
        icon: '/img/thumbnails/glasses_none.png',
        ref: 'beard_4'
      },
      {
        icon: '/img/thumbnails/glasses_none.png',
        ref: 'beard_5'
      },
      {
        icon: '/img/thumbnails/glasses_none.png',
        ref: 'beard_6'
      },
      {
        icon: '/img/thumbnails/glasses_none.png',
        ref: 'beard_7'
      },
      {
        icon: '/img/thumbnails/glasses_none.png',
        ref: 'beard_8'
      }
    ]
  },
  {
    title: 'glasses',
    icon: {
      title: 'glasses',
      width: 60,
      height: 60
    },
    default: {
      colors: 11,
      attributes: 0
    },
    colors: [
      { item: 'rgb(250, 228, 151)' },
      { item: 'rgb(255, 224, 0)' },
      { item: 'rgb(255, 161, 47)' },
      { item: 'rgb(220, 40, 29)' },
      { item: 'rgb(191, 146, 113)' },
      { item: 'rgb(111, 76, 36)' },
      { item: 'rgb(59, 43, 37)' },
      { item: 'rgb(18, 13, 11)' },
      { item: 'rgb(210, 209, 209)' },
      { item: 'rgb(249, 90, 121)' },
      { item: 'rgb(171, 38, 170)' },
      { item: 'rgb(72, 145, 220)' },
      { item: 'rgb(94, 193, 82)' }
    ],
    attributes: [
      {
        icon: '/img/thumbnails/glasses_none.png',
        ref: 'none'
      },
      {
        icon: '/img/thumbnails/glasses_1.png',
        ref: 'glasses_1'
      },
      {
        icon: '/img/thumbnails/glasses_1.png',
        ref: 'glasses_2'
      },
      {
        icon: '/img/thumbnails/glasses_1.png',
        ref: 'glasses_3'
      },
      {
        icon: '/img/thumbnails/glasses_1.png',
        ref: 'glasses_4'
      },
      {
        icon: '/img/thumbnails/glasses_1.png',
        ref: 'glasses_5'
      }
    ]
  },
  {
    title: 'body',
    icon: {
      title: 'tshirt',
      width: 60,
      height: 60
    },
    default: {
      colors: 8,
      attributes: 0
    },
    colors: [
      'rgb(250, 228, 151)',
      'rgb(255, 224, 0)',
      'rgb(255, 161, 47)',
      'rgb(220, 40, 29)',
      'rgb(191, 146, 113)',
      'rgb(111, 76, 36)',
      'rgb(59, 43, 37)',
      'rgb(18, 13, 11)',
      'rgb(210, 209, 209)',
      'rgb(249, 90, 121)',
      '#ab26aa',
      'rgb(72, 145, 220)',
      'rgb(94, 193, 82)'
    ]
  }
]
export default categories
