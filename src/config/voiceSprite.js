const voiceSprite = {
  intro_intro_advice: [0, 20000],
  detection_center_advice: [21000, 3850], // end: 24850
  detection_center_errors: [26000, 5200], // end: 31200
  detection_center_success: [32000, 1300], // end: 33300
  detection_right_advice: [34000, 1600], // end: 35600
  detection_right_errorTooMuch: [38000, 4400], // end: 42400
  detection_right_errorOpposite: [36000, 1300], // end: 37300
  detection_left_advice: [43000, 2300], // end: 45300
  detection_left_errorTooMuch: [38000, 4400], // end: 42400
  detection_left_errorOpposite: [46000, 1200], // end: 47200
  detection_normal_advice: [48000, 3400], // end: 51400
  detection_normal_success: [53000, 6000], // end: 59000
  avatarPersonnalisation_avatar_advice: [60000, 8800], // end: 68800
  decorPersonnalisation_park_advice: [70000, 6300], // end: 76300
  decorPersonnalisation_park_error: [86000, 2500], // end: 88500
  decorPersonnalisation_mountain_advice: [90000, 5700], // end: 95700
  decorPersonnalisation_mountain_error: [97000, 2300], // end: 99300
  decorPersonnalisation_museum_advice: [100000, 5800], // end: 105800
  decorPersonnalisation_museum_error: [107000, 2800], // end: 109800
  decorPersonnalisation_eiffelTower_advice: [111000, 3500], // end: 114500
  decorPersonnalisation_eiffelTower_error: [115000, 2400], // end: 117400
  decorPersonnalisation_bathroom_advice: [118000, 3500], // end: 121500
  decorPersonnalisation_bathroom_error: [122000, 2600], // end: 124600
  decorPersonnalisation_cocooning_advice: [126000, 5000], // end: 131000
  decorPersonnalisation_cocooning_error: [132000, 2400], // end: 134400
  decorPersonnalisation_beach_advice: [174000, 3400], // end: 177400
  decorPersonnalisation_beach_success: [178000, 6400], // end: 184400
  decorPersonnalisation_level1_error: [135000, 2700], // end: 137700
  decorPersonnalisation_level2_error: [139000, 2400], // end: 141400
  decorPersonnalisation_level2_2_error: [143000, 3600], // end: 146600
  decorPersonnalisation_level2_3_error: [148000, 4000], // end: 152000
  decorPersonnalisation_level2_4_error: [153000, 5200], // end: 158200
  decorPersonnalisation_level2_5_error: [159000, 3300], // end: 162300
  decorPersonnalisation_level3_error: [163000, 5700], // end: 168700
  decorPersonnalisation_level4_error: [170000, 1200], // end: 171200
  decorPersonnalisation_level5_error: [172000, 900], // end: 172900
  posing_rotationLeft_advice: [185000, 2900], // end: 187900
  posing_rotationLeft_errorTooMuch_1: [191000, 700], // end: 191700
  posing_rotationLeft_errorTooMuch_2: [192000, 1000], // end: 193000
  posing_rotationLeft_errorOpposite: [189000, 1200], // end: 190200
  posing_rotationLeft_errorsNotEnough_1: [194000, 1000], // end: 195000
  posing_rotationLeft_errorsNotEnough_2: [196000, 1100], // end: 197100
  posing_rotationRight_advice: [198000, 4000], // end: 202000
  posing_rotationRight_errorTooMuch_1: [191000, 700], // end: 191700
  posing_rotationRight_errorTooMuch_2: [192000, 1000], // end: 193000
  posing_rotationRight_errorOpposite: [36000, 1300], // end: 190200
  posing_rotationRight_errorsNotEnough_1: [194000, 1000], // end: 195000
  posing_rotationRight_errorsNotEnough_2: [196000, 1100], // end: 197100
  posing_rotationRight_success: [203000, 2100], // end: 205100
  posing_tiltRight_advice: [226000, 1700], // end: 227700
  posing_tiltRight_errorTooMuch_1: [191000, 700], // end: 191700
  posing_tiltRight_errorTooMuch_2: [192000, 1000], // end: 193000
  posing_tiltRight_errorsNotEnough_1: [194000, 1000], // end: 195000
  posing_tiltRight_errorsNotEnough_2: [196000, 1100], // end: 197100
  posing_tiltRight_success: [229000, 2400], // end: 231400
  posing_smile_advice: [206000, 1100], // end: 207100
  posing_smile_errorsNotEnough: [208000, 1300], // end: 209300
  posing_smile_success: [210000, 1600], // end: 211600
  posing_mouthOpen_advice: [212000, 1200], // end: 213200
  posing_mouthOpen_errorsNotEnough: [215000, 1500], // end: 216500
  posing_mouthOpen_success: [218000, 2500], // end: 220500
  posing_rotationUp_advice: [232000, 2800], // end: 234800
  posing_rotationUp_errorTooMuch_1: [191000, 700], // end: 191700
  posing_rotationUp_errorTooMuch_2: [192000, 1000], // end: 193000
  posing_rotationUp_errorsNotEnough_1: [194000, 1000], // end: 195000
  posing_rotationUp_errorsNotEnough_2: [196000, 1100], // end: 197100
  posing_rotationDown_advice: [236000, 1800], // end: 237800
  posing_rotationDown_errorTooMuch_1: [191000, 700], // end: 191700
  posing_rotationDown_errorTooMuch_2: [192000, 1000], // end: 193000
  posing_rotationDown_errorsNotEnough_1: [194000, 1000], // end: 195000
  posing_rotationDown_errorsNotEnough_2: [196000, 1100], // end: 197100
  posing_rotationDown_success: [239000, 500], // end: 239500
  posing_eyeBrowLeftUp_advice: [240000, 2400], // end: 242400
  posing_eyeBrowLeftUp_errorsNotEnough_1: [194000, 1000], // end: 195000
  posing_eyeBrowLeftUp_errorsNotEnough_2: [196000, 1000], // end: 197100
  posing_eyeBrowLeftUp_success: [243000, 1500], // end: 244500
  posing_smileLeft_advice: [246000, 1700], // end: 247700
  posing_smileLeft_errorsNotEnough_1: [249000, 3600], // end: 252600
  posing_smileLeft_errorsNotEnough_2: [196000, 1000], // end: 197100
  posing_smileLeft_success: [266000, 2000], // end: 268000
  // posing_eyeLeftClose_advice: [254000, 3800], // end: 257800
  // posing_eyeLeftClose_errorsNotEnough_1: [259000, 3300], // end: 262300
  // posing_eyeLeftClose_errorsNotEnough_2: [263000, 1600], // end: 264600
  application_lostPosing_error: [270000, 4100] // end: 274100
}

export default voiceSprite
