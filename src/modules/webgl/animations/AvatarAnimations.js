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
    this.durationTime = (this.frameDuration * 1.5 / 60) * 1000
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

    this.blinking = {
      deltaTime: null,
      duration: (60 / 60) * 1000,
      currentFrame: 0,
      frameDuration: 150,
      isInDone: false,
      isInStart: false,
      isOutDone: false,
      isInEnd: false,
      count: 0
    }

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
    const now = Date.now()

    if (this.currentFrame % this.frameDuration === 0) {
      this.rotations.updateRotationValues(positions.rotation)
      this.morphs.updateMorphsValues(positions.events)
      this.startTime = now // Retrieve start time
    }

    if (this.blinking.currentFrame % this.blinking.frameDuration === 0) {
      if (!this.blinking.isInStart) { // Is in not started
        this.blinking.isInStart = true
        this.blinking.startTime = now
        this.morphs.updateBlinkEndValue(0)
      } else {
        let deltaTime = now - this.blinking.startTime

        if (!this.blinking.isOutStart && !this.blinking.isInDone && deltaTime >= this.durationTime) { // Is in done
          this.blinking.isInDone = true
          this.blinking.isOutStart = true

          this.blinking.startTime = now

          deltaTime = now - this.blinking.startTime
          this.morphs.updateBlinkEndValue(1)
        }

        if (this.blinking.isInDone && this.blinking.isOutStart && deltaTime >= this.durationTime) { // Is out not started
          this.blinking.count++
          this.blinking.isInStart = false
          this.blinking.isInDone = false
          this.blinking.isOutDone = false
          this.blinking.isOutStart = false

          const randomValue = utils.getRandomInInterval(0, 2) - 1
          if ((this.blinking.count >= 2) || (randomValue > 0)) {
            this.blinking.count = 0
            this.blinking.currentFrame++
          }
        }

        this.morphs.updateBlinkMorph(deltaTime)
      }
    } else {
      this.blinking.currentFrame++
    }

    const deltaTime = now - this.startTime // Delta time between start & now

    this.rotations.updateModelRotations(deltaTime)
    this.morphs.updateModelMorphs(deltaTime)

    if (getDown) {
      if (!this.posY.startTime) {
        this.posY.startTime = now
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
