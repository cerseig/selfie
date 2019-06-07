import utils from '@/modules/helpers/utils'
import soundDesignSprite from '@/config/soundDesignSprite'
import { Howl } from 'howler'

class BackgroundMusic {
  constructor () {
    const source = '/sounds/sound_design.mp3'
    this.sound = new Howl({
      src: [source],
      volume: 0.7,
      sprite: soundDesignSprite
    })
  }
  fadeOut (callback) {
    const fadeDuration = 1500
    this.sound.fade(0.7, 0, fadeDuration, this.backgroundMusic)

    const timeOut = setTimeout(() => {
      if (callback && utils.isFunction(callback)) {
        callback()
      }
      clearTimeout(timeOut)
    }, fadeDuration)
  }
  playSpriteBackgroundMusic (name, callback) {
    this.backgroundMusic = this.sound.play('backgroundMusic_' + name)
    this.sound.loop(true, this.backgroundMusic)

    this.sound.on('end', (audioId) => {
      if (audioId === this.backgroundMusic) {
        if (callback && utils.isFunction(callback)) {
          callback()
        }
      }
    })
  }
}

export default BackgroundMusic
