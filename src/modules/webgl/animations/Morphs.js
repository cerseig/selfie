import easings from '@/modules/helpers/easings.js'

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
      eyeLeftClose: { ...defaultValues },
      eyeRightClose: { ...defaultValues },
      mouthOpen: { ...defaultValues },
      eyeBrowLeftUp: { ...defaultValues },
      eyeBrowRightUp: { ...defaultValues }
    }
  }

  updateMorphValue (key, value) {
    this.positions[key].beginValue = this.positions[key].beginValue ? this.positions[key].currentValue : value
    this.positions[key].endValue = value
  }

  updateMouthSmileMorph (deltaTime) {
    this.positions.smileLeft.currentValue = easings.linear(deltaTime, this.positions.smileLeft.beginValue, this.positions.smileLeft.endValue - this.positions.smileLeft.beginValue, this.durationTime) // Get interpolled value
    this.positions.smileRight.currentValue = easings.linear(deltaTime, this.positions.smileRight.beginValue, this.positions.smileRight.endValue - this.positions.smileRight.beginValue, this.durationTime) // Get interpolled value

    if (!isNaN(this.positions.smileRight.currentValue) && this.positions.smileRight.currentValue < 1) {
      this.elements.mouth.mouth_lips.morphTargetInfluences[1] = this.positions.smileRight.currentValue
    }
    if (!isNaN(this.positions.smileLeft.currentValue) && this.positions.smileLeft.currentValue < 1) {
      this.elements.mouth.mouth_lips.morphTargetInfluences[2] = this.positions.smileLeft.currentValue
    }
  }

  updateMouthOpenMorph (deltaTime) {
    this.positions.mouthOpen.currentValue = easings.linear(deltaTime, this.positions.mouthOpen.beginValue, this.positions.mouthOpen.endValue - this.positions.mouthOpen.beginValue, this.durationTime) // Get interpolled value

    if (!isNaN(this.positions.mouthOpen.currentValue) && this.positions.mouthOpen.currentValue < 1) {
      this.elements.mouth.mouth_lips.morphTargetInfluences[3] = this.positions.mouthOpen.currentValue
      this.elements.mouth.mouth_teeth.morphTargetInfluences[3] = this.positions.mouthOpen.currentValue
    }
  }

  updateEyesMorph (deltaTime) {
    this.positions.eyeLeftClose.currentValue = easings.linear(deltaTime, this.positions.eyeLeftClose.beginValue, this.positions.eyeLeftClose.endValue - this.positions.eyeLeftClose.beginValue, this.durationTime) // Get interpolled value
    this.positions.eyeRightClose.currentValue = easings.linear(deltaTime, this.positions.eyeRightClose.beginValue, this.positions.eyeRightClose.endValue - this.positions.eyeRightClose.beginValue, this.durationTime) // Get interpolled value

    if (!isNaN(this.positions.eyeRightClose.currentValue) && this.positions.eyeRightClose.currentValue < 1) {
      this.elements.eyeLids[1].morphTargetInfluences[0] = this.positions.eyeRightClose.currentValue
    }

    if (!isNaN(this.positions.eyeLeftClose.currentValue) && this.positions.eyeLeftClose.currentValue < 1) {
      this.elements.eyeLids[0].morphTargetInfluences[0] = this.positions.eyeLeftClose.currentValue
    }
  }

  updateEyebrowsMorph (deltaTime) {
    this.positions.eyeBrowLeftUp.currentValue = easings.linear(deltaTime, this.positions.eyeBrowLeftUp.beginValue, this.positions.eyeBrowLeftUp.endValue - this.positions.eyeBrowLeftUp.beginValue, this.durationTime) // Get interpolled value
    this.positions.eyeBrowRightUp.currentValue = easings.linear(deltaTime, this.positions.eyeBrowRightUp.beginValue, this.positions.eyeBrowRightUp.endValue - this.positions.eyeBrowRightUp.beginValue, this.durationTime) // Get interpolled value

    if (!isNaN(this.positions.eyeBrowRightUp.currentValue) && this.positions.eyeBrowRightUp.currentValue < 1) {
      this.elements.eyebrows[0].morphTargetInfluences[0] = this.positions.eyeBrowRightUp.currentValue
    }

    if (!isNaN(this.positions.eyeBrowLeftUp.currentValue) && this.positions.eyeBrowLeftUp.currentValue < 1) {
      this.elements.eyebrows[1].morphTargetInfluences[0] = this.positions.eyeBrowLeftUp.currentValue
    }
  }

  updateModelMorphs (deltaTime) {
    this.updateMouthSmileMorph(deltaTime)
    this.updateMouthOpenMorph(deltaTime)
    this.updateEyebrowsMorph(deltaTime)
    this.updateEyesMorph(deltaTime)
  }

  updateMorphsValues (events) {
    this.updateMorphValue('mouthOpen', events.mouthOpen)
    this.updateMorphValue('smileLeft', events.smileLeft)
    this.updateMorphValue('smileRight', events.smileRight)
    this.updateMorphValue('eyeBrowLeftUp', events.eyeBrowLeftUp)
    this.updateMorphValue('eyeBrowRightUp', events.eyeBrowRightUp)
    this.updateMorphValue('eyeRightClose', events.eyeRightClose)
    this.updateMorphValue('eyeLeftClose', events.eyeLeftClose)
  }
}

export default Morphs
