import steps from './steps'
import categories from './categories'
import webgl from './webgl'
import decors from './decors'
import assets from './assets'

const config = {
  languages: ['fr', 'en'],
  assets,
  server: {
    sendEmail: '/scripts/send-email.php',
    saveImage: '/scripts/save-image.php'
  },
  decors,
  steps,
  categories,
  webgl
}

export default config
