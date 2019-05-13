import steps from './steps'
import categories from './categories'
import webgl from './webgl'
import backgrounds from './backgrounds'

const config = {
  languages: ['fr', 'en'],
  server: {
    sendEmail: '/scripts/send-email.php',
    saveImage: '/scripts/save-image.php'
  },
  modelPath: '/models/avatar_1.glb', // Parented
  backgrounds: backgrounds,
  steps: steps,
  categories: categories,
  webgl: webgl
}

export default config
