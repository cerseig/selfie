import easings from '@/modules/helpers/easings.js'

class Morphs {
  constructor (params) {
    this.events = {}
    this.elements = params.elements

    console.log(this.elements)
    this.durationTime = params.duration

    this.positions = {
      smileLeft: {
        beginValue: 0,
        currentValue: 0,
        endValue: 0
      },
      smileRight: {
        beginValue: 0,
        currentValue: 0,
        endValue: 0
      },
      eyeLeftClose: {
        beginValue: 0,
        currentValue: 0,
        endValue: 0
      },
      eyeRightClose: {
        beginValue: 0,
        currentValue: 0,
        endValue: 0
      },
      mouthOpen: {
        beginValue: 0,
        currentValue: 0,
        endValue: 0
      }
    }
  }

  updateMorphValue (key, value) {
    this.positions[key].beginValue = this.positions[key].beginValue ? this.positions[key].currentValue : value
    this.positions[key].endValue = value
  }

  updateMouthSmileMorph (deltaTime) {
    this.positions.smileLeft.currentValue = easings.linear(deltaTime, this.positions.smileLeft.beginValue, this.positions.smileLeft.endValue - this.positions.smileLeft.beginValue, this.durationTime) // Get interpolled value
    this.positions.smileRight.currentValue = easings.linear(deltaTime, this.positions.smileRight.beginValue, this.positions.smileRight.endValue - this.positions.smileRight.beginValue, this.durationTime) // Get interpolled value

    this.elements.mouth.mouth_lips.morphTargetInfluences[1] = this.positions.smileRight.currentValue
    this.elements.mouth.mouth_lips.morphTargetInfluences[2] = this.positions.smileLeft.currentValue
  }

  updateMouthOpenMorph (deltaTime) {
    this.positions.mouthOpen.currentValue = easings.linear(deltaTime, this.positions.mouthOpen.beginValue, this.positions.mouthOpen.endValue - this.positions.mouthOpen.beginValue, this.durationTime) // Get interpolled value
    this.elements.mouth.mouth_lips.morphTargetInfluences[8] = this.positions.smileRight.currentValue
  }

  updateEyesMorph (deltaTime) {
    this.positions.eyeLeftClose.currentValue = easings.linear(deltaTime, this.positions.eyeLeftClose.beginValue, this.positions.eyeLeftClose.endValue - this.positions.eyeLeftClose.beginValue, this.durationTime) // Get interpolled value
    this.positions.eyeRightClose.currentValue = easings.linear(deltaTime, this.positions.eyeRightClose.beginValue, this.positions.eyeRightClose.endValue - this.positions.eyeRightClose.beginValue, this.durationTime) // Get interpolled value

    this.elements.eyeLids[0].morphTargetInfluences[0] = this.positions.eyeLeftClose.currentValue
    this.elements.eyeLids[1].morphTargetInfluences[0] = this.positions.eyeRightClose.currentValue
  }

  updateModelMorphs (deltaTime) {
    this.updateMouthSmileMorph(deltaTime)
    // this.updateMouthOpenMorph(deltaTime)
    this.updateEyesMorph(deltaTime)
  }

  updateMorphsValues (events) {
    this.updateMorphValue('smileLeft', events.smileLeft)
    this.updateMorphValue('smileRight', events.smileRight)
    this.updateMorphValue('eyeRightClose', events.eyeRightClose)
    this.updateMorphValue('eyeLeftClose', events.eyeLeftClose)
  }
}

export default Morphs
