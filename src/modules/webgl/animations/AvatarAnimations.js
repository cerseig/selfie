import utils from '@/modules/helpers/utils.js'
import Rotations from './Rotations'
import Morphs from './Morphs'

import easings from '@/modules/helpers/easings.js'

class AvatarAnimations {
  constructor (params) {
    this.eventsPositions = {}
    this.elements = params.elements

    this.model = params.model

    this.config = params.config

    this.frameDuration = 8
    this.durationTime = (this.frameDuration / 60) * 1000
    this.startTime = 0
    this.currentFrame = 0

    this.rotations = new Rotations({
      head: this.elements.head,
      duration: this.durationTime
    })

    this.morphs = new Morphs({
      elements: this.elements,
      duration: this.durationTime
    })

    this.isDown = false

    this.posY = {
      startTime: 0,
      currentValue: this.config.position.up.y,
      beginValue: this.config.position.up.y,
      endValue: this.config.position.y
    }
  }

  getDown (deltaTime) {
    if (this.posY.currentValue >= this.posY.endValue) {
      // console.log(this.posY.currentValue, this.posY.endValue)
      this.posY.currentValue = easings.linear(deltaTime, this.posY.beginValue, this.posY.endValue - this.posY.beginValue, 600)
      this.model.position.y = this.posY.currentValue
    } else if (!this.isDown) {
      this.isDown = true
    }
  }

  handleUpdate (positions, getDown) {
    if (this.currentFrame % this.frameDuration === 0) {
      this.rotations.updateRotationValues(positions.rotation)
      this.morphs.updateMorphsValues(positions.events)
      this.startTime = Date.now() // Retrieve start time
    }

    const now = Date.now()
    const deltaTime = now - this.startTime // Delta time between start & now

    this.rotations.updateModelRotations(deltaTime)
    this.morphs.updateModelMorphs(deltaTime)

    if (getDown) {
      if (!this.posY.startTime) {
        this.posY.startTime = Date.now()
      }
      this.getDown(now - this.posY.startTime)
    }

    this.currentFrame++
  }

  /**
   *
   * @param {*} positions Array of Objects
   */
  update (positions, getDown) {
    if (positions) {
      if (utils.isEmptyObject(this.eventsPositions)) {
        this.eventsPositions = positions
      } else {
        this.handleUpdate(positions, getDown)
      }
    }
  }
}

export default AvatarAnimations
