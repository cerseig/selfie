import store from '@/store/index'
import utils from '@/modules/helpers/utils'

class Step {
  constructor (params) {
    this.step = params
    this.subSteps = this.step.steps
    this.currentSubStep = {}
    this.currentIndex = 0
    this.subStepState = '' // possible state : advice, error, errorTooMuch, errorNotEnough, errorOpposite, success
    this.sound = store.getters.getSound
    this.isVoice = false
  }
  init (callback) {
    this.currentSubStep = this.subSteps[0]
    this.playSpriteVoice('advice', callback)
  }
  changeSubStep (name) {
    if (name) {
      this.subSteps.forEach((item, index) => {
        if (item.name === 'name') {
          this.currentSubStep = item
          this.currentIndex = index
        }
      })
    } else {
      this.currentIndex++
      this.currentSubStep = this.subSteps[this.currentIndex]
    }
    this.subStepState = ''
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

    this.soundId = sound

    console.log('thissound', this.sound)
    console.log('soundID', this.soundId, 'sound', sound)

    this.sound.on('end', () => {
      if (this.soundId === sound) {
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
