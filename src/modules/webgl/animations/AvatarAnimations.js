import utils from '@/modules/helpers/utils.js'
import Rotations from './Rotations';

class AvatarAnimations {
  constructor (params) {
    this.eventsPositions = {}
    this.elements = params.elements

    this.frameDuration = 8
    this.durationTime = (this.frameDuration / 60) * 1000
    this.startTime = 0
    this.currentFrame = 0

    this.rotations = new Rotations({
      head: this.elements.head,
      duration: this.durationTime
    })
  }

  handleUpdate (positions) {
    if (this.currentFrame % this.frameDuration === 0) {
      this.rotations.updateRotationValues(positions.rotation)
      this.startTime = Date.now() // Retrieve start time
    }

    const now = Date.now()
    const deltaTime = now - this.startTime // Delta time between start & now

    this.rotations.updateModelRotations(deltaTime)

    this.currentFrame++
  }

  /**
   *
   * @param {*} positions Array of Objects
   */
  update (positions) {
    if (positions) {
      if (utils.isEmptyObject(this.eventsPositions)) {
        this.eventsPositions = positions
      } else {
        this.handleUpdate(positions)
      }
    }
  }
}

export default AvatarAnimations
