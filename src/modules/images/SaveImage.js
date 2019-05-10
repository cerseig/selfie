import axios from 'axios'

// Config
import config from '@/config/config'

const saveImage = (imageUrl, type, clb) => {
  axios
    .post(`${process.env.VUE_APP_SCRIPT_BASEURL}${config.server.saveImage}`, {
      image: imageUrl,
      type: type
    }).then(response => {
      if (response.data && response.data.uniqId) {
        clb({
          uniqId: response.data.uniqId,
          path: response.data.path
        })
      }
    }).catch((response) => {
    })
}

export default saveImage;
