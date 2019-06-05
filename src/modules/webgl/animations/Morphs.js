import easings from '@/modules/helpers/easings.js'
const MAX_VAL = 1
const MIN_VAL = 0

const MOUTH_MORPHS = {
  SMILE: 0,
  SMILE_RIGHT: 1,
  SMILE_LEFT: 2,
  SMILE_OPEN: 3,
  SMILE_OPEN_RIGHT: 4,
  SMILE_OPEN_LEFT: 5,
  SMILE_OPEN_MID_RIGHT: 6,
  SMILE_OPEN_MID_LEFT: 7,
  MOUTH_OPEN: 8
}

// const MOUTH_MORPHS = {
//   SMILE_RIGHT: 0,
//   SMILE_LEFT: 1,
//   SMILE_OPEN: 2,
//   SMILE_OPEN_RIGHT: 4,
//   SMILE_OPEN_LEFT: 5,
//   MOUTH_OPEN: 8
// }

class Morphs {
  constructor (params) {
    this.events = {}
    this.elements = params.elements

    this.durationTime = params.duration

    let defaultValues = {
      beginValue: 0,
      currentValue: 0,
      endValue: 0
    }

    this.positions = {
      smileLeft: { ...defaultValues },
      smileRight: { ...defaultValues },
      eyeClose: { ...defaultValues },
      mouthOpen: { ...defaultValues },
      mouthOpenSmileLeft: { ...defaultValues },
      mouthOpenSmileRight: { ...defaultValues },
      eyeBrowLeftUp: { ...defaultValues },
      eyeBrowRightUp: { ...defaultValues }
    }
  }

  updateMorphValue (key, value) {
    this.positions[key].beginValue = this.positions[key].beginValue ? this.positions[key].currentValue : value
    this.positions[key].endValue = value
  }

  updateBlinkEndValue (value) {
    this.positions.eyeClose.beginValue = this.positions.eyeClose.beginValue ? this.positions.eyeClose.currentValue : value
    this.positions.eyeClose.endValue = value
  }

  updateMouthSmileMorph (deltaTime) {
    this.positions.smileLeft.currentValue = easings.linear(deltaTime, this.positions.smileLeft.beginValue, this.positions.smileLeft.endValue - this.positions.smileLeft.beginValue, this.durationTime) // Get interpolled value
    this.positions.smileRight.currentValue = easings.linear(deltaTime, this.positions.smileRight.beginValue, this.positions.smileRight.endValue - this.positions.smileRight.beginValue, this.durationTime) // Get interpolled value

    if (!isNaN(this.positions.smileRight.currentValue) && this.positions.smileRight.currentValue <= MAX_VAL && this.positions.smileRight.currentValue >= MIN_VAL) {
      this.elements.mouth.mouth_lips.morphTargetInfluences[MOUTH_MORPHS.SMILE_RIGHT] = this.positions.smileRight.currentValue
    }
    if (!isNaN(this.positions.smileLeft.currentValue) && this.positions.smileLeft.currentValue <= MAX_VAL && this.positions.smileLeft.currentValue >= MIN_VAL) {
      this.elements.mouth.mouth_lips.morphTargetInfluences[MOUTH_MORPHS.SMILE_LEFT] = this.positions.smileLeft.currentValue
    }
  }

  updateMouthOpenMorph (deltaTime) {
    this.positions.mouthOpen.currentValue = easings.linear(deltaTime, this.positions.mouthOpen.beginValue, this.positions.mouthOpen.endValue - this.positions.mouthOpen.beginValue, this.durationTime) // Get interpolled value

    if (!isNaN(this.positions.mouthOpen.currentValue) && this.positions.mouthOpen.currentValue <= MAX_VAL && this.positions.mouthOpen.currentValue >= MIN_VAL) {
      this.elements.mouth.mouth_lips.morphTargetInfluences[MOUTH_MORPHS.MOUTH_OPEN] = this.positions.mouthOpen.currentValue
      this.elements.mouth.mouth_teeth.morphTargetInfluences[MOUTH_MORPHS.MOUTH_OPEN] = this.positions.mouthOpen.currentValue
      this.elements.mouth.mouth_inside.morphTargetInfluences[0] = this.positions.mouthOpen.currentValue
    }
  }

  updateMouthOpenSmileMorph (deltaTime) {
    this.positions.mouthOpenSmileLeft.currentValue = easings.linear(deltaTime, this.positions.mouthOpenSmileLeft.beginValue, this.positions.mouthOpenSmileLeft.endValue - this.positions.mouthOpenSmileLeft.beginValue, this.durationTime) // Get interpolled value
    this.positions.mouthOpenSmileRight.currentValue = easings.linear(deltaTime, this.positions.mouthOpenSmileRight.beginValue, this.positions.mouthOpenSmileRight.endValue - this.positions.mouthOpenSmileRight.beginValue, this.durationTime) // Get interpolled value

    if (!isNaN(this.positions.mouthOpenSmileLeft.currentValue) && this.positions.mouthOpenSmileLeft.currentValue <= MAX_VAL && this.positions.mouthOpenSmileLeft.currentValue >= MIN_VAL) {
      this.elements.mouth.mouth_lips.morphTargetInfluences[MOUTH_MORPHS.SMILE_OPEN_RIGHT] = this.positions.mouthOpenSmileLeft.currentValue
      this.elements.mouth.mouth_teeth.morphTargetInfluences[MOUTH_MORPHS.SMILE_OPEN_RIGHT] = this.positions.mouthOpenSmileLeft.currentValue
    }

    if (!isNaN(this.positions.mouthOpenSmileRight.currentValue) && this.positions.mouthOpenSmileRight.currentValue <= MAX_VAL && this.positions.mouthOpenSmileRight.currentValue >= MIN_VAL) {
      this.elements.mouth.mouth_lips.morphTargetInfluences[MOUTH_MORPHS.SMILE_OPEN_LEFT] = this.positions.mouthOpenSmileRight.currentValue
      this.elements.mouth.mouth_teeth.morphTargetInfluences[MOUTH_MORPHS.SMILE_OPEN_LEFT] = this.positions.mouthOpenSmileRight.currentValue
    }
  }

  updateBlinkMorph (deltaTime) {
    this.positions.eyeClose.currentValue = easings.linear(deltaTime, this.positions.eyeClose.beginValue, this.positions.eyeClose.endValue - this.positions.eyeClose.beginValue, this.durationTime) // Get interpolled value

    if (!isNaN(this.positions.eyeClose.currentValue) && this.positions.eyeClose.currentValue <= MAX_VAL && this.positions.eyeClose.currentValue >= MIN_VAL) {
      this.elements.eyeLids[0].morphTargetInfluences[0] = this.positions.eyeClose.currentValue
      this.elements.eyeLids[1].morphTargetInfluences[0] = this.positions.eyeClose.currentValue
    }
  }

  updateEyebrowsMorph (deltaTime) {
    this.positions.eyeBrowLeftUp.currentValue = easings.linear(deltaTime, this.positions.eyeBrowLeftUp.beginValue, this.positions.eyeBrowLeftUp.endValue - this.positions.eyeBrowLeftUp.beginValue, this.durationTime) // Get interpolled value
    this.positions.eyeBrowRightUp.currentValue = easings.linear(deltaTime, this.positions.eyeBrowRightUp.beginValue, this.positions.eyeBrowRightUp.endValue - this.positions.eyeBrowRightUp.beginValue, this.durationTime) // Get interpolled value

    if (!isNaN(this.positions.eyeBrowRightUp.currentValue) && this.positions.eyeBrowRightUp.currentValue <= MAX_VAL && this.positions.eyeBrowRightUp.currentValue >= -(MAX_VAL)) {
      this.elements.eyebrows[0].morphTargetInfluences[0] = this.positions.eyeBrowRightUp.currentValue
    }

    if (!isNaN(this.positions.eyeBrowLeftUp.currentValue) && this.positions.eyeBrowLeftUp.currentValue <= MAX_VAL && this.positions.eyeBrowLeftUp.currentValue >= -(MAX_VAL)) {
      this.elements.eyebrows[1].morphTargetInfluences[0] = this.positions.eyeBrowLeftUp.currentValue
    }
  }

  updateModelMorphs (deltaTime) {
    // this.updateMouthSmileMorph(deltaTime)
    // this.updateMouthOpenMorph(deltaTime)
    this.updateMouthOpenSmileMorph(deltaTime)
    this.updateEyebrowsMorph(deltaTime)
  }

  updateMorphsValues (events, blinking) {
    // this.updateMorphValue('mouthOpen', events.mouthOpen)

    console.log(events.mouthOpenSmileLeft, events.mouthOpenSmileRight)
    this.updateMorphValue('mouthOpenSmileLeft', events.mouthOpenSmileLeft)
    this.updateMorphValue('mouthOpenSmileRight', events.mouthOpenSmileRight)

    this.updateMorphValue('smileLeft', events.smileLeft)
    this.updateMorphValue('smileRight', events.smileRight)

    this.updateMorphValue('eyeBrowLeftUp', events.eyeBrowLeftUp)
    this.updateMorphValue('eyeBrowRightUp', events.eyeBrowRightUp)

    this.updateMorphValue('eyeClose', blinking)

  }
}

export default Morphs
