import axios from 'axios'

// Config
import config from '@/config/config'

const saveImage = (imageUrl, type, clb) => {
  const formData = new FormData()
  formData.append('imageUrl', imageUrl)
  formData.append('type', type)

  axios
    .post(`${process.env.VUE_APP_SCRIPT_BASEURL}${config.server.saveImage}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Cache-Control': 'no-cache'
      }
    }).then(response => {
      if (response.data && response.data.uniqId) {
        clb({
          uniqId: response.data.uniqId,
          path: response.data.path,
          ...response.data
        })
      }
    }).catch((response) => {
    })
}

export default saveImage
