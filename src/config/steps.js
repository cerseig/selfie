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
  decorPersonnalisation: {
    name: 'decorPersonnalisation',
    steps: [
      {
        name: 'park',
        sprite: {
          advice: 'decorPersonnalisation_park_advice',
          success: 'decorPersonnalisation_park_success'
        }
      },
      {
        name: 'mountain',
        sprite: {
          advice: 'decorPersonnalisation_mountain_advice',
          error: 'decorPersonnalisation_mountain_error'
        }
      },
      {
        name: 'museum',
        sprite: {
          advice: 'decorPersonnalisation_museum_advice',
          error: 'decorPersonnalisation_museum_error'
        }
      },
      {
        name: 'eiffelTower',
        sprite: {
          advice: 'decorPersonnalisation_eiffelTower_advice',
          error: 'decorPersonnalisation_eiffelTower_error'
        }
      },
      {
        name: 'bathroom',
        sprite: {
          advice: 'decorPersonnalisation_bathroom_advice',
          error: 'decorPersonnalisation_bathroom_error'
        }
      },
      {
        name: 'cocooning',
        sprite: {
          advice: 'decorPersonnalisation_cocooning_advice',
          error: 'decorPersonnalisation_cocooning_error'
        }
      },
      {
        name: 'beach',
        sprite: {
          advice: 'decorPersonnalisation_beach_advice',
          error: 'decorPersonnalisation_beach_error'
        }
      },
      {
        name: 'level1',
        sprite: {
          error: 'decorPersonnalisation_level1_error'
        }
      },
      {
        name: 'level2',
        sprite: {
          error: [
            'decorPersonnalisation_level2_1_error',
            'decorPersonnalisation_level2_2_error',
            'decorPersonnalisation_level2_3_error',
            'decorPersonnalisation_level2_4_error',
            'decorPersonnalisation_level2_5_error'
          ]
        }
      },
      {
        name: 'level3',
        sprite: {
          error: 'decorPersonnalisation_level3_error'
        }
      },
      {
        name: 'level4',
        sprite: {
          error: 'decorPersonnalisation_level4_error'
        }
      },
      {
        name: 'level5',
        sprite: {
          error: 'decorPersonnalisation_level5_error'
        }
      }
    ]
  },
  posing: {
    name: 'posing',
    steps: [
      {
        name: 'rotationLeft',
        type: 'rotation',
        values: {
          min: -0.25,
          max: -0.4,
          opposite: 0.2
        },
        hasSuccess: false,
        sprite: {
          advice: 'posing_rotationLeft_advice',
          errorsTooMuch: ['posing_rotationLeft_errorTooMuch_1', 'posing_rotationLeft_errorTooMuch_2'],
          errorsOpposite: 'posing_rotationLeft_errorOpposite',
          errorsNotEnough: ['posing_rotationLeft_errorsNotEnough_1', 'posing_rotationLeft_errorsNotEnough_2']
        }
      },
      {
        name: 'rotationRight',
        type: 'rotation',
        values: {
          min: 0.25,
          max: 0.4,
          opposite: -0.2
        },
        hasSuccess: true,
        sprite: {
          advice: 'posing_rotationRight_advice',
          errorsTooMuch: ['posing_rotationRight_errorTooMuch_1', 'posing_rotationRight_errorTooMuch_2'],
          errorsOpposite: 'posing_rotationRight_errorOpposite',
          errorsNotEnough: ['posing_rotationRight_errorsNotEnough_1', 'posing_rotationRight_errorsNotEnough_2'],
          success: 'posing_rotationRight_success'
        }
      },
      {
        name: 'tiltRight',
        type: 'rotation',
        values: {
          min: '',
          max: '',
          opposite: ''
        },
        hasSuccess: true,
        sprite: {
          advice: 'posing_tiltRight_advice',
          errorsNotEnough: ['posing_tiltRight_errorsNotEnough_1', 'posing_tiltRight_errorsNotEnough_2'],
          errorsTooMuch: ['posing_tiltRight_errorTooMuch_1', 'posing_tiltRight_errorTooMuch_2'],
          success: 'posing_tiltRight_success'
        }
      },
      {
        name: 'smile',
        type: 'expression',
        values: {
          min: '',
          max: '',
          opposite: ''
        },
        hasSuccess: true,
        sprite: {
          advice: 'posing_smile_advice',
          errorsNotEnough: 'posing_smile_errorsNotEnough',
          success: 'posing_smile_success'
        }
      },
      {
        name: 'teeth',
        type: 'expression',
        values: {
          min: '',
          max: '',
          opposite: ''
        },
        hasSuccess: true,
        sprite: {
          advice: 'posing_teeth_advice',
          errorsNotEnough: 'posing_teeth_errorsNotEnough',
          success: 'posing_teeth_success'
        }
      },
      {
        name: 'rotationUp',
        type: 'rotation',
        values: {
          min: '',
          max: '',
          opposite: ''
        },
        hasSuccess: false,
        sprite: {
          advice: 'posing_rotationUp_advice',
          errorsNotEnough: ['posing_rotationUp_errorsNotEnough_1', 'posing_rotationUp_errorsNotEnough_2'],
          errorsTooMuch: ['posing_rotationUp_errorTooMuch_1', 'posing_rotationUp_errorTooMuch_2']
        }
      },
      {
        name: 'rotationDown',
        type: 'rotation',
        values: {
          min: '',
          max: '',
          opposite: ''
        },
        hasSuccess: true,
        sprite: {
          advice: 'posing_rotationDown_advice',
          errorsNotEnough: ['posing_rotationDown_errorsNotEnough_1', 'posing_rotationDown_errorsNotEnough_2'],
          errorsTooMuch: ['posing_rotationDown_errorTooMuch_1', 'posing_rotationDown_errorTooMuch_2'],
          success: 'posing_rotationDown_success'
        }
      },
      {
        name: 'eyeBrowUp',
        type: 'expression',
        values: {
          min: '',
          max: '',
          opposite: ''
        },
        hasSuccess: true,
        sprite: {
          advice: 'posing_eyeBrowUp_advice',
          errorsNotEnough: ['posing_eyeBrowUp_errorsNotEnough_1', 'posing_eyeBrowUp_errorsNotEnough_2'],
          success: 'posing_eyeBrowUp_success'
        }
      },
      {
        name: 'smileLeft',
        type: 'expression',
        values: {
          min: '',
          max: '',
          opposite: ''
        },
        hasSuccess: false,
        sprite: {
          advice: 'posing_smileLeft_advice',
          errorsNotEnough: ['posing_smileLeft_errorsNotEnough_1', 'posing_smileLeft_errorsNotEnough_2']
        }
      }
    ]
  }
}

export default steps
