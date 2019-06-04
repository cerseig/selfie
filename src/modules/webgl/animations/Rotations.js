import easings from '@/modules/helpers/easings.js'

const MAX_VALUE = 1
const MIN_VALUE = -1

class Rotations {
  constructor (params) {
    this.rotations = {}
    this.head = params.head

    this.durationTime = params.duration

    this.rotation = {
      x: {
        beginValue: 0,
        currentValue: 0,
        endValue: 0
      },
      y: {
        beginValue: 0,
        currentValue: 0,
        endValue: 0
      },
      z: {
        beginValue: 0,
        currentValue: 0,
        endValue: 0
      }
    }
  }

  updateRotationValues (rotations) {
    this.updateRotationValue('x', rotations.x)
    this.updateRotationValue('y', rotations.y)
    this.updateRotationValue('z', rotations.z)
  }

  updateRotationValue (keyAxis, rotation) {
    this.rotation[keyAxis].beginValue = this.rotation[keyAxis].beginValue ? this.rotation[keyAxis].currentValue : rotation // Retrieves former rotation
    this.rotation[keyAxis].endValue = rotation // Retrieves rotation from api
  }

  updateModelRotations (deltaTime) {
    this.updateModelRotation('x', deltaTime)
    this.updateModelRotation('y', deltaTime)
    this.updateModelRotation('z', deltaTime)
  }

  updateModelRotation (key, deltaTime) {
    this.rotation[key].currentValue = easings.linear(deltaTime, this.rotation[key].beginValue, this.rotation[key].endValue - this.rotation[key].beginValue, this.durationTime) // Get interpolled value

    if (!isNaN(this.rotation[key].currentValue) && this.rotation[key].currentValue <= MAX_VALUE && this.rotation[key].currentValue >= MIN_VALUE) {
      this.head.rotation[key] = this.rotation[key].currentValue
    }
  }
}

export default Rotations
