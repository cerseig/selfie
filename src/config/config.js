import steps from './steps'
import categories from './categories'
import webgl from './webgl'
import decors from './decors'

const config = {
  languages: ['fr', 'en'],
  server: {
    sendEmail: '/scripts/send-email.php',
    saveImage: '/scripts/save-image.php'
  },
  decors: decors,
  steps: steps,
  categories: categories,
  webgl: webgl
}

export default config
