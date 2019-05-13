const steps = {
  intro: {
    name: 'intro',
    steps: [
      {
        name: 'intro',
        sprite: {
          intro: 'intro'
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
          errors: 'detection_center_errors'
        }
      },
      {
        name: 'right',
        minValue: 0.5,
        sprite: {
          advice: 'detection_posing_right_advice',
          errorsTooMuch: 'detection_posing_right_errorTooMuch',
          errorsOpposite: 'detection_posing_right_errorOpposite'
        }
      },
      {
        name: 'left',
        minValue: 0.5,
        sprite: {
          advice: 'detection_posing_left_advice',
          errorsTooMuch: 'detection_posing_left_errorTooMuch',
          errorsOpposite: 'detection_posing_left_errorOpposite'
        }
      },
      {
        name: 'normal',
        sprite: {
          advice: ['detection_posing_normal_advice_1', 'detection_posing_normal_advice_2']
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
          advice: 'intro'
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
          advice: [{ start: 70000, end: 76300 }],
          errors: [{ start: 86000, end: 88500 }]
        }
      },
      {
        name: 'mountain',
        sprite: {
          advice: [{ start: 90000, end: 95700 }],
          errors: [{ start: 97000, end: 99300 }]
        }
      },
      {
        name: 'museum',
        sprite: {
          advice: [{ start: 100000, end: 105800 }],
          errors: [{ start: 107000, end: 109800 }]
        }
      },
      {
        name: 'eiffelTower',
        sprite: {
          advice: [{ start: 111000, end: 114500 }],
          errors: [{ start: 115000, end: 117400 }]
        }
      },
      {
        name: 'bathroom',
        sprite: {
          advice: [{ start: 118000, end: 121500 }],
          errors: [{ start: 122000, end: 124600 }]
        }
      },
      {
        name: 'cocooning',
        sprite: {
          advice: [{ start: 126000, end: 131000 }],
          errors: [{ start: 132000, end: 134400 }]
        }
      },
      {
        name: 'beach',
        sprite: {
          advice: [{ start: 174000, end: 177400 }],
          errors: [{ start: 178000, end: 184400 }]
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
  experience: {
    name: 'experience',
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
          errorsNotEnough: [{ start: 259000, end: 262300 }, { start: 263000, end: 264600 }]
        }
      }
    ]
  }
}

export default steps
