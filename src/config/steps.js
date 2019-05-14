const steps = {
  intro: {
    name: 'intro',
    steps: [
      {
        name: 'intro',
        sprite: {
          advice: 'intro_intro_advice'
        }
      }
    ]
  },
  detection: {
    name: 'detection',
    steps: [
      {
        name: 'center',
        sprite: {
          advice: 'detection_center_advice',
          success: 'detection_center_success',
          error: 'detection_center_error'
        }
      },
      {
        name: 'right',
        interval: [0.25, 0.4],
        oppositeValue: -0.2,
        sprite: {
          advice: 'detection_right_advice',
          errorTooMuch: 'detection_right_errorTooMuch',
          errorOpposite: 'detection_right_errorOpposite'
        }
      },
      {
        name: 'left',
        interval: [-0.4, -0.25],
        oppositeValue: 0.2,
        sprite: {
          advice: 'detection_left_advice',
          errorTooMuch: 'detection_left_errorTooMuch',
          errorOpposite: 'detection_left_errorOpposite'
        }
      },
      {
        name: 'normal',
        interval: [-0.2, 0.2],
        sprite: {
          advice: 'detection_normal_advice',
          success: 'detection_normal_success'
        }
      }
    ]
  },
  avatarPersonnalisation: {
    name: 'avatarPersonnalisation',
    steps: [
      {
        name: 'avatar',
        sprite: {
          advice: 'avatarPersonnalisation_avatar_advice'
        }
      }
    ]
  },
  backgroundPersonnalisation: {
    name: 'backgroundPersonnalisation',
    steps: [
      {
        name: 'park',
        sprite: {
          advice: 'backgroundPersonnalisation_park_advice',
          error: 'backgroundPersonnalisation_park_error'
        }
      },
      {
        name: 'mountain',
        sprite: {
          advice: 'backgroundPersonnalisation_mountain_advice',
          error: 'backgroundPersonnalisation_mountain_error'
        }
      },
      {
        name: 'museum',
        sprite: {
          advice: 'backgroundPersonnalisation_museum_advice',
          error: 'backgroundPersonnalisation_museum_error'
        }
      },
      {
        name: 'eiffelTower',
        sprite: {
          advice: 'backgroundPersonnalisation_eiffelTower_advice',
          error: 'backgroundPersonnalisation_eiffelTower_error'
        }
      },
      {
        name: 'bathroom',
        sprite: {
          advice: 'backgroundPersonnalisation_bathroom_advice',
          error: 'backgroundPersonnalisation_bathroom_error'
        }
      },
      {
        name: 'cocooning',
        sprite: {
          advice: 'backgroundPersonnalisation_cocooning_advice',
          error: 'backgroundPersonnalisation_cocooning_error'
        }
      },
      {
        name: 'beach',
        sprite: {
          advice: 'backgroundPersonnalisation_beach_advice',
          error: 'backgroundPersonnalisation_beach_error'
        }
      }
    ],
    sprite: {
      errors: [
        {
          level: 1,
          random: [{ start: 135000, end: 137700 }]
        },
        {
          level: 2,
          random: [
            { start: 139000, end: 141400 },
            { start: 143000, end: 146600 },
            { start: 148000, end: 152000 },
            { start: 153000, end: 158200 },
            { start: 159000, end: 162300 }
          ]
        },
        {
          level: 3,
          random: [{ start: 163000, end: 168700 }]
        },
        {
          level: 4,
          random: [{ start: 170000, end: 171200 }]
        },
        {
          level: 5,
          random: [{ start: 172000, end: 172900 }]
        }
      ]
    }
  },
  posing: {
    name: 'posing',
    steps: [
      {
        name: 'rotationLeft',
        sprite: {
          advice: [{ start: 185000, end: 187900 }],
          errorsTooMuch: [{ start: 191000, end: 191700 }, { start: 192000, end: 193000 }],
          errorsOpposite: [{ start: 189000, end: 190200 }],
          errorsNotEnough: [{ start: 194000, end: 195000 }, { start: 196000, end: 197100 }]
        }
      },
      {
        name: 'rotationRight',
        sprite: {
          advice: [{ start: 198000, end: 202000 }],
          errorsTooMuch: [{ start: 191000, end: 191700 }, { start: 192000, end: 193000 }],
          errorsOpposite: [{ start: 189000, end: 190200 }],
          errorsNotEnough: [{ start: 194000, end: 195000 }, { start: 196000, end: 197100 }],
          success: [{ start: 203000, end: 205100 }]
        }
      },
      {
        name: 'smile',
        sprite: {
          advice: [{ start: 206000, end: 207100 }],
          errorsNotEnough: [{ start: 208000, end: 195000 }],
          success: [{ start: 203000, end: 205100 }]
        }
      },
      {
        name: 'teeth',
        sprite: {
          advice: [{ start: 212000, end: 213200 }],
          errorsNotEnough: [{ start: 215000, end: 216500 }],
          success: [{ start: 218000, end: 220500 }]
        }
      },
      {
        name: 'tiltRight',
        sprite: {
          advice: [{ start: 226000, end: 227700 }],
          errorsNotEnough: [{ start: 194000, end: 195000 }, { start: 196000, end: 197100 }],
          errorsTooMuch: [{ start: 191000, end: 191700 }, { start: 192000, end: 193000 }],
          success: [{ start: 229000, end: 231400 }]
        }
      },
      {
        name: 'rotationUp',
        sprite: {
          advice: [{ start: 232000, end: 234800 }],
          errorsNotEnough: [{ start: 194000, end: 195000 }, { start: 196000, end: 197100 }],
          errorsTooMuch: [{ start: 191000, end: 191700 }, { start: 192000, end: 193000 }]
        }
      },
      {
        name: 'rotationDown',
        sprite: {
          advice: [{ start: 236000, end: 237800 }],
          errorsNotEnough: [{ start: 194000, end: 195000 }, { start: 196000, end: 197100 }],
          errorsTooMuch: [{ start: 191000, end: 191700 }, { start: 192000, end: 193000 }],
          success: [{ start: 229000, end: 231400 }]
        }
      },
      {
        name: 'eyeBrowUp',
        sprite: {
          advice: [{ start: 240000, end: 242400 }],
          errorsNotEnough: [{ start: 194000, end: 195000 }, { start: 196000, end: 197100 }],
          success: [{ start: 243000, end: 244500 }]
        }
      },
      {
        name: 'smileLeft',
        sprite: {
          advice: [{ start: 246000, end: 247700 }],
          errorsNotEnough: [{ start: 249000, end: 252600 }, { start: 196000, end: 197100 }]
        }
      },
      {
        name: 'eyeLeftClose',
        sprite: {
          advice: [{ start: 254000, end: 257800 }],
          errorNotEnough: [{ start: 259000, end: 262300 }, { start: 263000, end: 264600 }]
        }
      }
    ]
  }
}

export default steps
