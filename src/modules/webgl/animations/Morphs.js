import easings from '@/modules/helpers/easings.js'
const MAX_VAL = 1
const MIN_VAL = 0

const MOUTH_MORPHS = {
  SMILE_RIGHT: 0,
  SMILE_LEFT: 1,
  SMILE_OPEN_RIGHT: 2,
  SMILE_OPEN_LEFT: 3,
  SMILE_OPEN: 4,
  MOUTH_OPEN: 5
}

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
      eyeOpen: { currentValue: 1, beginValue: 1, endValue: 1 },
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
    if (!isNaN(value)) {
      this.positions.eyeOpen.beginValue = this.positions.eyeOpen.beginValue ? this.positions.eyeOpen.currentValue : value
      this.positions.eyeOpen.endValue = value
    }
  }

  updateMouthSmileMorph (deltaTime) {
    this.positions.smileLeft.currentValue = easings.linear(deltaTime, this.positions.smileLeft.beginValue, this.positions.smileLeft.endValue - this.positions.smileLeft.beginValue, this.durationTime) // Get interpolled value
    this.positions.smileRight.currentValue = easings.linear(deltaTime, this.positions.smileRight.beginValue, this.positions.smileRight.endValue - this.positions.smileRight.beginValue, this.durationTime) // Get interpolled value

    if (!isNaN(this.positions.smileRight.currentValue) && this.positions.smileRight.currentValue <= MAX_VAL && this.positions.smileRight.currentValue >= MIN_VAL) {
      this.elements.mouth.mouth_lips.morphTargetInfluences[MOUTH_MORPHS.SMILE_RIGHT] = this.positions.smileRight.currentValue
      this.elements.mouth.mouth_teeth.morphTargetInfluences[MOUTH_MORPHS.SMILE_RIGHT] = this.positions.smileRight.currentValue
    }
    if (!isNaN(this.positions.smileLeft.currentValue) && this.positions.smileLeft.currentValue <= MAX_VAL && this.positions.smileLeft.currentValue >= MIN_VAL) {
      this.elements.mouth.mouth_lips.morphTargetInfluences[MOUTH_MORPHS.SMILE_LEFT] = this.positions.smileLeft.currentValue
      this.elements.mouth.mouth_teeth.morphTargetInfluences[MOUTH_MORPHS.SMILE_LEFT] = this.positions.smileLeft.currentValue
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
      this.elements.mouth.mouth_lips.morphTargetInfluences[MOUTH_MORPHS.SMILE_OPEN_LEFT] = this.positions.mouthOpenSmileLeft.currentValue
      this.elements.mouth.mouth_teeth.morphTargetInfluences[MOUTH_MORPHS.SMILE_OPEN_LEFT] = this.positions.mouthOpenSmileLeft.currentValue
    }

    if (!isNaN(this.positions.mouthOpenSmileRight.currentValue) && this.positions.mouthOpenSmileRight.currentValue <= MAX_VAL && this.positions.mouthOpenSmileRight.currentValue >= MIN_VAL) {
      this.elements.mouth.mouth_lips.morphTargetInfluences[MOUTH_MORPHS.SMILE_OPEN_RIGHT] = this.positions.mouthOpenSmileRight.currentValue
      this.elements.mouth.mouth_teeth.morphTargetInfluences[MOUTH_MORPHS.SMILE_OPEN_RIGHT] = this.positions.mouthOpenSmileRight.currentValue
    }
  }

  updateBlinkMorph (deltaTime) {
    this.positions.eyeOpen.currentValue = easings.linear(deltaTime, this.positions.eyeOpen.beginValue, this.positions.eyeOpen.endValue - this.positions.eyeOpen.beginValue, this.durationTime) // Get interpolled value

    if (!isNaN(this.positions.eyeOpen.currentValue) && this.positions.eyeOpen.currentValue <= MAX_VAL && this.positions.eyeOpen.currentValue >= MIN_VAL) {
      this.elements.eyeLids[0].morphTargetInfluences[0] = this.positions.eyeOpen.currentValue
      this.elements.eyeLids[1].morphTargetInfluences[0] = this.positions.eyeOpen.currentValue
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
    this.updateMouthSmileMorph(deltaTime)
    this.updateMouthOpenMorph(deltaTime)
    this.updateMouthOpenSmileMorph(deltaTime)
    this.updateEyebrowsMorph(deltaTime)
  }

  updateMorphsValues (events, blinking) {
    this.updateMorphValue('mouthOpenSmileLeft', events.mouthOpenSmileLeft)
    this.updateMorphValue('mouthOpenSmileRight', events.mouthOpenSmileRight)

    this.updateMorphValue('mouthOpen', events.mouthOpen)

    this.updateMorphValue('smileLeft', events.smileLeft)
    this.updateMorphValue('smileRight', events.smileRight)

    this.updateMorphValue('eyeBrowLeftUp', events.eyeBrowLeftUp)
    this.updateMorphValue('eyeBrowRightUp', events.eyeBrowRightUp)
  }
}

export default Morphs
