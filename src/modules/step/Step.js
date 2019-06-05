import store from '@/store/index'
import utils from '@/modules/helpers/utils'
import voiceSprite from '@/config/voiceSprite'
import { Howl } from 'howler'

class Step {
  constructor (params) {
    this.step = params
    this.subSteps = this.step.steps
    this.currentSubStep = {}
    this.currentIndex = 0
    this.subStepState = '' // possible state : advice, error, errorTooMuch, errorNotEnough, errorOpposite, success,
    this.subStepStatus = 'todo' // possible status : todo, inprogress, done, error, advice
    const source = '/sounds/voice_fr.mp3'
    this.sound = store.getters.getSound._webAudio ? store.getters.getSound : new Howl({
      src: [source],
      sprite: voiceSprite
    })
    this.isVoice = false
  }
  init (callback) {
    this.currentSubStep = this.subSteps[0]
    this.playSpriteVoice('advice', callback)
  }
  changeSubStep (name, callback) {
    if (name) {
      this.subSteps.forEach((item, index) => {
        if (item.name === name) {
          this.currentSubStep = item
          this.currentIndex = index
        }
      })
    } else {
      this.currentIndex++
      this.currentSubStep = this.subSteps[this.currentIndex]
    }
    this.subStepState = ''
    if (callback && utils.isFunction(callback)) {
      callback()
    }
  }
  changeSubStepState (state, callback) {
    this.subStepState = state
    if (!this.isVoice) {
      this.playSpriteVoice(state, callback)
    }
  }
  playSpriteVoice (state, callback) {
    this.isVoice = true
    store.commit('setIsVoice', this.isVoice)
    const sound = this.sound.play(this.step.name + '_' + this.currentSubStep.name + '_' + state)

    this.sound.on('end', (audioId) => {
      if (audioId === sound) {
        this.isVoice = false
        store.commit('setIsVoice', this.isVoice)
        if (callback && utils.isFunction(callback)) {
          callback()
        }
      }
    })
  }
}

export default Step
