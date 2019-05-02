/**
 * This Face class object will be used to determine the 67 points of the user's face.
 * It receives positions of this different points by face's elements.
 */

class Face {
  constructor (params) {
    this.points = params.points

    this.rotationX = params.rotationX
    this.rotationY = params.rotationY
    this.rotationZ = params.rotationZ

    this.eyeBrowLeft = {
      1: { x: this.points[17].x, y: this.points[17].y },
      2: { x: this.points[18].x, y: this.points[18].y },
      3: { x: this.points[19].x, y: this.points[19].y },
      4: { x: this.points[20].x, y: this.points[20].y },
      5: { x: this.points[21].x, y: this.points[21].y }
    }

    this.eyeBrowRight = {
      1: { x: this.points[22].x, y: this.points[22].y },
      2: { x: this.points[23].x, y: this.points[23].y },
      3: { x: this.points[24].x, y: this.points[24].y },
      4: { x: this.points[25].x, y: this.points[25].y },
      5: { x: this.points[26].x, y: this.points[26].y }
    }

    this.eyeLeft = {
      1: { x: this.points[36].x, y: this.points[36].y },
      2: { x: this.points[37].x, y: this.points[37].y },
      3: { x: this.points[38].x, y: this.points[38].y },
      4: { x: this.points[39].x, y: this.points[39].y },
      5: { x: this.points[40].x, y: this.points[40].y },
      6: { x: this.points[41].x, y: this.points[41].y }
    }

    this.eyeRight = {
      1: { x: this.points[42].x, y: this.points[42].y },
      2: { x: this.points[43].x, y: this.points[43].y },
      3: { x: this.points[44].x, y: this.points[44].y },
      4: { x: this.points[45].x, y: this.points[45].y },
      5: { x: this.points[46].x, y: this.points[46].y },
      6: { x: this.points[47].x, y: this.points[47].y }
    }

    this.mouth = {
      1: { x: this.points[48].x, y: this.points[48].y },
      2: { x: this.points[49].x, y: this.points[49].y },
      3: { x: this.points[50].x, y: this.points[50].y },
      4: { x: this.points[51].x, y: this.points[51].y },
      5: { x: this.points[52].x, y: this.points[52].y },
      6: { x: this.points[53].x, y: this.points[53].y },
      7: { x: this.points[54].x, y: this.points[54].y },
      9: { x: this.points[55].x, y: this.points[55].y },
      10: { x: this.points[56].x, y: this.points[56].y },
      11: { x: this.points[57].x, y: this.points[57].y },
      12: { x: this.points[58].x, y: this.points[58].y },
      13: { x: this.points[59].x, y: this.points[59].y },
      14: { x: this.points[60].x, y: this.points[60].y },
      15: { x: this.points[61].x, y: this.points[61].y },
      16: { x: this.points[62].x, y: this.points[62].y },
      17: { x: this.points[63].x, y: this.points[63].y },
      18: { x: this.points[64].x, y: this.points[64].y },
      19: { x: this.points[65].x, y: this.points[65].y },
      20: { x: this.points[66].x, y: this.points[66].y },
      21: { x: this.points[67].x, y: this.points[67].y }
    }

    this.init()
  }
  init () {
    console.log('Face object')
  }
  getMouthOpen () {
    console.log(this.mouth)
  }
  getDuckFace () {

  }
  getSmile () {

  }
  getSmileLeft () {

  }
  getSmileRight () {

  }
  getEyeRightClose () {

  }
  getEyeLeftClose () {

  }
  getEyeBrowRightDown () {

  }
  getEyeBrowLeftDown () {

  }
  getEyeBrowRightUp () {

  }
  getEyeBrowLeftUp () {

  }
  getRotationLeft () {

  }
  getRotationRight () {

  }
  getRotationUp () {

  }
  getRotationDown () {

  }
}

export default Face
