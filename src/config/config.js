import steps from './steps'
import categories from './categories'
import webgl from './webgl'

const config = {
  languages: ['fr', 'en'],
  backgrounds: {
    park: 'https://cdn.dribbble.com/users/1803663/screenshots/5570301/mountain_house-1200-x-1600_4x.png',
    beach: 'https://cdn.dribbble.com/users/1803663/screenshots/6408871/evening_kerala_4x.png',
    mountains: 'https://cdn.dribbble.com/users/1803663/screenshots/5477792/1600-final_4x.png',
    museum: 'https://cdn.dribbble.com/users/788099/screenshots/4362954/mona_lisa_kit8-net.png',
    bathroom: 'https://cdn.dribbble.com/users/398658/screenshots/4865939/bath_idea.gif',
    cosy: 'https://cdn.dribbble.com/users/579362/screenshots/5072758/____9-4.jpg'
  },
  server: {
    sendEmail: '/scripts/send-email.php',
    saveImage: '/scripts/save-image.php'
  },
  modelPath: '/models/avatar_1.glb', //Parented
  steps: steps,
  categories: categories,
  webgl: webgl
}

export default config
