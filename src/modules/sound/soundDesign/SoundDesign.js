import utils from '@/modules/helpers/utils'
import soundDesignSprite from '@/config/soundDesignSprite'
import { Howl } from 'howler'

class SoundDesign {
  constructor () {
    const source = '/sounds/sound_design.mp3'
    this.sound = new Howl({
      src: [source],
      volume: 0.7,
      sprite: soundDesignSprite
    })
  }
  playSpriteSoundDesign (name, callback) {
    const sound = this.sound.play(name)

    this.sound.on('end', (audioId) => {
      if (audioId === sound) {
        if (callback && utils.isFunction(callback)) {
          callback()
        }
      }
    })
  }
}

export default SoundDesign
