import utils from '@/modules/helpers/utils'
import soundDesignSprite from '@/config/soundDesignSprite'
import { Howl } from 'howler'

class BackgroundMusic {
  constructor () {
    const source = '/sounds/sound_design.mp3'
    this.sound = new Howl({
      src: [source],
      volume: 0.5,
      sprite: soundDesignSprite
    })
  }
  playSpriteBackgroundMusic (name, callback) {
    const backgroundMusic = this.sound.play('backgroundMusic_' + name)
    this.sound.loop(true, backgroundMusic)

    this.sound.on('end', (audioId) => {
      if (audioId === backgroundMusic) {
        if (callback && utils.isFunction(callback)) {
          callback()
        }
      }
    })
  }
}

export default BackgroundMusic
