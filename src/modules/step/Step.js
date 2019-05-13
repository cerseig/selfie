import store from '@/store/index'

class Step {
  constructor (params) {
    this.step = params
    this.subSteps = this.step.steps
    this.currentSubStep = {}
    this.subStepState = '' // possible state : advice, error, errorTooMuch, errorNotEnough, errorOpposite, success
    this.init()
  }
  changeStep (step) {
    store.commit('setCurrentStep', step)
    console.log('change step')
  }
  changeSubStep () {
    console.log('change sub state')
  }
  changeSubStepState (state) {
    this.subStepState = state
    console.log('change sub step state')
  }
  playSpriteVoice (sprite) {
    let sound = store.getters.getSound
    const spriteSound = sound.play(sprite)
  }
  init () {
    console.log('init Step object')
  }
}

export default Step
