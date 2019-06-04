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
        index: 0,
        name: 'center',
        values: {
          min: 0.3,
          max: 0.7
        },
        status: 'todo',
        hasSuccess: true,
        hasErrors: true,
        sprite: {
          advice: 'detection_center_advice',
          success: 'detection_center_success',
          error: 'detection_center_error'
        }
      },
      {
        index: 1,
        name: 'rotationRight',
        values: {
          min: 0.2,
          max: 0.8
        },
        status: 'todo',
        hasSuccess: false,
        hasErrors: true,
        sprite: {
          advice: 'detection_rotationRight_advice',
          errorTooMuch: 'detection_rotationRight_errorTooMuch',
          errorOpposite: 'detection_rotationRight_errorOpposite'
        }
      },
      {
        index: 2,
        name: 'rotationLeft',
        values: {
          min: 0.2,
          max: 0.8
        },
        status: 'todo',
        hasSuccess: false,
        hasErrors: true,
        sprite: {
          advice: 'detection_rotationLeft_advice',
          errorTooMuch: 'detection_rotationLeft_errorTooMuch',
          errorOpposite: 'detection_rotationLeft_errorOpposite'
        }
      },
      {
        index: 3,
        name: 'rotationCentered',
        values: {
          min: 0.3,
          max: 0.7
        },
        status: 'todo',
        hasSuccess: true,
        hasErrors: false,
        sprite: {
          advice: 'detection_rotationCentered_advice',
          success: 'detection_rotationCentered_success'
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
          error: 'decorPersonnalisation_level2_error'
          //   'decorPersonnalisation_level2_2_error',
          //   'decorPersonnalisation_level2_3_error',
          //   'decorPersonnalisation_level2_4_error',
          //   'decorPersonnalisation_level2_5_error'
          // ]
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
        index: 0,
        name: 'rotationLeft',
        type: 'rotation',
        values: {
          min: 0.3,
          max: 1
        },
        status: 'todo',
        hasSuccess: false,
        sprite: {
          advice: 'posing_rotationLeft_advice',
          errorsTooMuch: ['posing_rotationLeft_errorTooMuch_1', 'posing_rotationLeft_errorTooMuch_2'],
          errorsOpposite: 'posing_rotationLeft_errorOpposite',
          errorsNotEnough: ['posing_rotationLeft_errorsNotEnough_1', 'posing_rotationLeft_errorsNotEnough_2']
        }
      },
      {
        index: 1,
        name: 'rotationRight',
        type: 'rotation',
        values: {
          min: 0.3,
          max: 1
        },
        status: 'todo',
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
        index: 2,
        name: 'smile',
        type: 'expression',
        values: {
          min: 0.4
        },
        status: 'todo',
        hasSuccess: true,
        sprite: {
          advice: 'posing_smile_advice',
          errorsNotEnough: 'posing_smile_errorsNotEnough',
          success: 'posing_smile_success'
        }
      },
      {
        index: 3,
        name: 'mouthOpenSmile',
        type: 'expression',
        values: {
          min: 0.2
        },
        status: 'todo',
        hasSuccess: true,
        sprite: {
          advice: 'posing_mouthOpenSmile_advice',
          errorsNotEnough: 'posing_mouthOpenSmile_errorsNotEnough',
          success: 'posing_mouthOpenSmile_success'
        }
      },
      {
        index: 4,
        name: 'tiltRight',
        type: 'rotation',
        values: {
          min: 0.3,
          max: 1
        },
        status: 'todo',
        hasSuccess: true,
        sprite: {
          advice: 'posing_tiltRight_advice',
          errorsNotEnough: ['posing_tiltRight_errorsNotEnough_1', 'posing_tiltRight_errorsNotEnough_2'],
          errorsTooMuch: ['posing_tiltRight_errorTooMuch_1', 'posing_tiltRight_errorTooMuch_2'],
          success: 'posing_tiltRight_success'
        }
      },
      {
        index: 5,
        name: 'rotationUp',
        type: 'expression',
        values: {
          min: 0.3
        },
        status: 'todo',
        hasSuccess: false,
        sprite: {
          advice: 'posing_rotationUp_advice',
          errorsNotEnough: ['posing_rotationUp_errorsNotEnough_1', 'posing_rotationUp_errorsNotEnough_2'],
          errorsTooMuch: ['posing_rotationUp_errorTooMuch_1', 'posing_rotationUp_errorTooMuch_2']
        }
      },
      {
        index: 6,
        name: 'eyeBrowLeftUp',
        type: 'expression',
        values: {
          min: 0.1
        },
        status: 'todo',
        hasSuccess: true,
        sprite: {
          advice: 'posing_eyeBrowUp_advice',
          errorsNotEnough: ['posing_eyeBrowUp_errorsNotEnough_1', 'posing_eyeBrowUp_errorsNotEnough_2'],
          success: 'posing_eyeBrowUp_success'
        }
      },
      {
        index: 7,
        name: 'smileLeft',
        type: 'expression',
        values: {
          min: 0.2
        },
        status: 'todo',
        hasSuccess: true,
        sprite: {
          advice: 'posing_smileLeft_advice',
          errorsNotEnough: ['posing_smileLeft_errorsNotEnough_1', 'posing_smileLeft_errorsNotEnough_2'],
          success: 'posing_smileLeft_success'
        }
      }
    ]
  }
}

export default steps
