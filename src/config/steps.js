const steps = {
  intro: {
    index: 0,
    voices: {
      intro: { start: 0, end: 20000 }
    }
  },
  detection: {
    index: 1,
    posingSteps: [
      {
        name: 'center',
        voices: {
          advice: [{ start: 21000, end: 24850 }],
          success: [{ start: 32000, end: 33300 }],
          errors: [{ start: 26000, end: 31200 }]
        }
      },
      {
        name: 'right',
        voices: {
          advice: [{ start: 34000, end: 35600 }],
          errorsTooMuch: [{ start: 38000, end: 42400 }],
          errorsOpposite: [{ start: 36000, end: 37300 }]
        }
      },
      {
        name: 'left',
        voices: {
          advice: [{ start: 43000, end: 45300 }],
          errorsTooMuch: [{ start: 38000, end: 42400 }],
          errorsOpposite: [{ start: 46000, end: 47200 }]
        }
      },
      {
        name: 'normal',
        voices: {
          advice: [{ start: 48000, end: 51400 }, { start: 53000, end: 59000 }]
        }
      }
    ]
  },
  avatarPersonnalisation: {
    index: 2,
    voices: {
      advice: [{ start: 60000, end: 68800 }]
    }
  },
  backgroundPersonnalisation: {
    index: 3,
    backgrounds: [
      {
        name: 'park',
        voices: {
          advice: [{ start: 70000, end: 76300 }],
          errors: [{ start: 86000, end: 88500 }]
        }
      },
      {
        name: 'mountain',
        voices: {
          advice: [{ start: 90000, end: 95700 }],
          errors: [{ start: 97000, end: 99300 }]
        }
      },
      {
        name: 'museum',
        voices: {
          advice: [{ start: 100000, end: 105800 }],
          errors: [{ start: 107000, end: 109800 }]
        }
      },
      {
        name: 'eiffelTower',
        voices: {
          advice: [{ start: 111000, end: 114500 }],
          errors: [{ start: 115000, end: 117400 }]
        }
      },
      {
        name: 'bathroom',
        voices: {
          advice: [{ start: 118000, end: 121500 }],
          errors: [{ start: 122000, end: 124600 }]
        }
      },
      {
        name: 'cocooning',
        voices: {
          advice: [{ start: 126000, end: 131000 }],
          errors: [{ start: 132000, end: 134400 }]
        }
      },
      {
        name: 'beach',
        voices: {
          advice: [{ start: 174000, end: 177400 }],
          errors: [{ start: 178000, end: 184400 }]
        }
      }
    ],
    voices: {
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
    index: 4,
    posing: [
      {
        name: 'rotationLeft',
        voices: {
          advice: [{ start: 185000, end: 187900 }],
          errorsTooMuch: [{ start: 191000, end: 191700 }, { start: 192000, end: 193000 }],
          errorsOpposite: [{ start: 189000, end: 190200 }],
          errorsNotEnough: [{ start: 194000, end: 195000 }, { start: 196000, end: 197100 }]
        }
      },
      {
        name: 'rotationRight',
        voices: {
          advice: [{ start: 198000, end: 202000 }],
          errorsTooMuch: [{ start: 191000, end: 191700 }, { start: 192000, end: 193000 }],
          errorsOpposite: [{ start: 189000, end: 190200 }],
          errorsNotEnough: [{ start: 194000, end: 195000 }, { start: 196000, end: 197100 }],
          success: [{ start: 203000, end: 205100 }]
        }
      },
      {
        name: 'smile',
        voices: {
          advice: [{ start: 206000, end: 207100 }],
          errorsNotEnough: [{ start: 208000, end: 209300 }],
          success: [{ start: 210000, end: 211600 }]
        }
      },
      {
        name: 'teeth',
        voices: {
          advice: [{ start: 212000, end: 213200 }],
          errorsNotEnough: [{ start: 215000, end: 216500 }],
          success: [{ start: 218000, end: 220500 }]
        }
      },
      {
        name: 'tiltRight',
        voices: {
          advice: [{ start: 226000, end: 227700 }],
          errorsNotEnough: [{ start: 194000, end: 195000 }, { start: 196000, end: 197100 }],
          errorsTooMuch: [{ start: 191000, end: 191700 }, { start: 192000, end: 193000 }],
          success: [{ start: 229000, end: 231400 }]
        }
      },
      {
        name: 'rotationUp',
        voices: {
          advice: [{ start: 232000, end: 234800 }],
          errorsNotEnough: [{ start: 194000, end: 195000 }, { start: 196000, end: 197100 }],
          errorsTooMuch: [{ start: 191000, end: 191700 }, { start: 192000, end: 193000 }]
        }
      },
      {
        name: 'rotationDown',
        voices: {
          advice: [{ start: 236000, end: 237800 }],
          errorsNotEnough: [{ start: 194000, end: 195000 }, { start: 196000, end: 197100 }],
          errorsTooMuch: [{ start: 191000, end: 191700 }, { start: 192000, end: 193000 }],
          success: [{ start: 229000, end: 231400 }]
        }
      },
      {
        name: 'eyeBrowUp',
        voices: {
          advice: [{ start: 236000, end: 237800 }],
          errorsNotEnough: [{ start: 194000, end: 195000 }, { start: 196000, end: 197100 }],
          errorsTooMuch: [{ start: 191000, end: 191700 }, { start: 192000, end: 193000 }],
          success: [{ start: 229000, end: 231400 }]
        }
      },
      {
        name: 'eyeBrowUp',
        voices: {
          advice: [{ start: 240000, end: 242400 }],
          errorsNotEnough: [{ start: 194000, end: 195000 }, { start: 196000, end: 197100 }],
          success: [{ start: 243000, end: 244500 }]
        }
      },
      {
        name: 'smileLeft',
        voices: {
          advice: [{ start: 240000, end: 242400 }],
          errorsNotEnough: [{ start: 249000, end: 252600 }, { start: 196000, end: 197100 }]
        }
      },
      {
        name: 'eyeLeftClose',
        voices: {
          advice: [{ start: 254000, end: 257800 }],
          errorsNotEnough: [{ start: 259000, end: 262300 }, { start: 263000, end: 264600 }]
        }
      }
    ]
  },
  application: {
    voices: {
      error: { start: 270000, end: 274100 },
      touch: [
        { start: 275000, end: 275400 },
        { start: 276000, end: 277000 },
        { start: 278000, end: 278700 }
      ]
    }
  }
}

export default steps
