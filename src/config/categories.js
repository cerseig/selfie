const categories = [
  {
    title: 'hair',
    icon: {
      title: 'hair',
      width: 60,
      height: 60
    },
    default: {
      colors: 0,
      attributes: 1
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
        icon: '/img/thumbnails/none.png',
        ref: 'none'
      },
      {
        icon: '/img/thumbnails/hair_1.png',
        ref: 'hair_1'
      },
      {
        icon: '/img/thumbnails/hair_2.png',
        ref: 'hair_2'
      },
      {
        icon: '/img/thumbnails/hair_3.png',
        ref: 'hair_3'
      },
      {
        icon: '/img/thumbnails/hair_4.png',
        ref: 'hair_4'
      },
      {
        icon: '/img/thumbnails/hair_5.png',
        ref: 'hair_5'
      },
      {
        icon: '/img/thumbnails/hair_6.png',
        ref: 'hair_6'
      },
      {
        icon: '/img/thumbnails/hair_7.png',
        ref: 'hair_7'
      },
      {
        icon: '/img/thumbnails/hair_8.png',
        ref: 'hair_8'
      },
      {
        icon: '/img/thumbnails/hair_9.png',
        ref: 'hair_9'
      },
      {
        icon: '/img/thumbnails/hair_10.png',
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
      colors: 0
    },
    colors: [
      { item: 'rgb(71, 35, 20)' },
      { item: 'rgb(119, 66, 35)' },
      { item: 'rgb(158, 84, 48)' },
      { item: 'rgb(67, 87, 176)' },
      { item: 'rgb(95, 155, 170)' },
      { item: 'rgb(73, 111, 124)' },
      { item: 'rgb(53, 109, 71)' },
      { item: 'rgb(84, 158, 114)' },
      { item: 'rgb(157, 150, 152)' },
      { item: 'rgb(108, 103, 104)' }
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
      colors: 0
    },
    colors: [
      {
        item: 'rgb(252,218,202)',
        extended: {
          noze: 'rgb(236,71,56)',
          mouth_lips: 'rgb(72,88,190)'
        }
      },
      {
        item: 'rgb(234, 198, 178)',
        extended: {
          noze: 'rgb(208, 69, 50)',
          mouth_lips: 'rgb(64, 84, 174)'
        }
      },
      {
        item: 'rgb(216, 176, 154)',
        extended: {
          noze: 'rgb(198, 62, 48)',
          mouth_lips: 'rgb(56, 79, 160)'
        }
      },
      {
        item: 'rgb(181,139,106)',
        extended: {
          noze: 'rgb(184, 61, 44)',
          mouth_lips: 'rgb(56, 73, 147)'
        }
      },
      {
        item: 'rgb(145,113,88)',
        extended: {
          noze: 'rgb(170, 56, 40)',
          mouth_lips: 'rgb(51, 67, 135)'
        }
      },
      {
        item: 'rgb(110,88,71)',
        extended: {
          noze: 'rgb(156, 51, 37)',
          mouth_lips: 'rgb(47, 61, 123)'
        }
      },
      {
        item: 'rgb(87,67,54)',
        extended: {
          noze: 'rgb(127, 42, 30)',
          mouth_lips: 'rgb(34, 44, 89)'
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
        icon: '/img/thumbnails/beard_none.png',
        ref: 'none'
      },
      {
        icon: '/img/thumbnails/beard_1.png',
        ref: 'beard_1'
      },
      {
        icon: '/img/thumbnails/beard_2.png',
        ref: 'beard_2'
      },
      {
        icon: '/img/thumbnails/beard_3.png',
        ref: 'beard_3'
      },
      {
        icon: '/img/thumbnails/beard_4.png',
        ref: 'beard_4'
      },
      {
        icon: '/img/thumbnails/beard_5.png',
        ref: 'beard_5'
      },
      {
        icon: '/img/thumbnails/beard_6.png',
        ref: 'beard_6'
      },
      {
        icon: '/img/thumbnails/beard_7.png',
        ref: 'beard_7'
      },
      {
        icon: '/img/thumbnails/beard_8.png',
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
      colors: 0,
      attributes: 0
    },
    colors: [
      { item: 'rgb(234,220,193)' },
      { item: 'rgb(250, 228, 151)' },
      { item: 'rgb(252,201,200)' },
      { item: 'rgb(244,90,78)' },
      { item: 'rgb(90,177,157)' },
      { item: 'rgb(201,230,244)' },
      { item: 'rgb(190,160,247)' },
      { item: 'rgb(113,46,119)' },
      { item: 'rgb(34,63,145)' },
      { item: 'rgb(135,37,37)' },
      { item: 'rgb(124,118,112)' },
      { item: 'rgb(18, 13, 11)' }
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
      colors: 0,
      attributes: 0
    },
    colors: [
      { item: 'rgb(234,220,193)' },
      { item: 'rgb(250, 228, 151)' },
      { item: 'rgb(252,201,200)' },
      { item: 'rgb(244,90,78)' },
      { item: 'rgb(90,177,157)' },
      { item: 'rgb(201,230,244)' },
      { item: 'rgb(190,160,247)' },
      { item: 'rgb(113,46,119)' },
      { item: 'rgb(34,63,145)' },
      { item: 'rgb(135,37,37)' },
      { item: 'rgb(124,118,112)' },
      { item: 'rgb(18, 13, 11)' }
    ]
  }
]
export default categories
