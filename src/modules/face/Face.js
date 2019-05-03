/**
 * This Face class object will be used to determine the 68 points of the user's face.
 * It receives positions of this different points by face's elements.
 */

class Face {
  constructor (params) {
    this.brfv4 = params.brfv4 // get brfv4 object
    this.brfManager = params.brfManager // get brf manager
    this.facePoints = this.brfManager.getFaces() // get array faces
    this.points = this.facePoints[0].points // get the 68 points of the face's array

    this.rotationX = this.toDegree(this.facePoints[0].rotationX) // up/down
    this.rotationY = this.toDegree(this.facePoints[0].rotationY) // left / right
    this.rotationZ = this.toDegree(this.facePoints[0].rotationZ) // tilt to left / right

    this.p0 = new this.brfv4.Point()
    this.p1 = new this.brfv4.Point()

    this.smileInitial = 0
    this.smileLeftInitial = 0
    this.smileRightInitial = 0
    this.mouthOpenInitial = 0
    this.eyeLeftInitial = 0
    this.eyeRightInitial = 0
    this.eyeBrowLeftInitial = 0
    this.eyeBrowLeftInitial = 0

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

    this.initFace(this.brfv4, this.facePoints)
  }
  init () {
    console.log('Face object')
  }
  initFace (brfv4, faces) {
    for (let i = 0; i < faces.length; i++) {
      const face = faces[i]

      if (face.state === brfv4.BRFState.FACE_TRACKING_START ||
        face.state === brfv4.BRFState.FACE_TRACKING) {
        if (this.getAllExpressionsFunction) {
          this.getAllExpressionsFunction(face)
        }
      }
    }
  }
  restrictToCenter (face) {

  }
  getAllExpressionsFunction (face) {
    this.getMouthOpen(face)
    this.getDuckFace(face)
    this.getSmile(face)
    this.getSmileLeft(face)
    this.getSmileRight(face)
    this.getEyeRightClose(face)
    this.getEyeLeftClose(face)
    this.getEyeBrowRightDown(face)
    this.getEyeBrowLeftDown(face)
    this.getEyeBrowRightUp(face)
    this.getEyeBrowLeftUp(face)
    this.getRotationLeft(face)
    this.getRotationRight(face)
    this.getRotationUp(face)
    this.getRotationDown(face)
    this.getEyeBlink(face)
  }
  /* ALL GETTERS FUNCTIONS */
  getMouthOpen (face) {
    if (this.mouthOpenInitial !== 0) {
      let mouthOpen = this.calcMouthOpen(face)
      if (mouthOpen > this.mouthOpenInitial) {
        let mouthOpenFactor = (mouthOpen - this.mouthOpenInitial) / ((this.mouthOpenInitial + 20) - this.mouthOpenInitial)

        if (mouthOpenFactor > 1.0) { mouthOpenFactor = 1.0 }
        if (mouthOpenFactor < 0.0) { mouthOpenFactor = 0.0 }

        /* let mouthOpenPourcent = (mouthOpenFactor * 100).toFixed(0)
        console.log('Mouth Open :', mouthOpenPourcent,'%') */
      }
    } else {
      this.mouthOpenInitial = this.calcMouthOpen(face)
    }
  }
  getDuckFace (face) {

  }
  getSmile (face) {
    if (this.smileInitial !== 0) {
      let smileFactor = this.calcSmile(face)
      /* let smilePourcent = (smileFactor * 100).toFixed(0)
      console.log('Smile :', smilePourcent,'%') */
    } else {
      this.smileInitial = this.calcSmile(face)
    }
  }
  getSmileLeft (face) {
    if (this.smileLeftInitial !== 0) {
      let smileLeft = this.calcSmileLeft(face)
      if (smileLeft < this.smileLeftInitial) {
        let smileLeftFactor = (smileLeft - this.smileLeftInitial) / ((this.smileLeftInitial - 20) - this.smileLeftInitial)

        if (smileLeftFactor < 0.0) { smileLeftFactor = 0.0 }
        if (smileLeftFactor > 1.0) { smileLeftFactor = 1.0 }

        /* let smileLeftPourcent = (smileLeftFactor * 100).toFixed(0)
        console.log('Smile Left :', smileLeftPourcent,'%') */
      }
    } else {
      this.smileLeftInitial = this.calcSmileLeft(face)
    }
  }
  getSmileRight (face) {
    if (this.smileRightInitial !== 0) {
      let smileRight = this.calcSmileRight(face)
      if (smileRight < this.smileRightInitial) {
        let smileRightFactor = (smileRight - this.smileRightInitial) / ((this.smileRightInitial - 20) - this.smileRightInitial)

        if (smileRightFactor < 0.0) { smileRightFactor = 0.0 }
        if (smileRightFactor > 1.0) { smileRightFactor = 1.0 }

        /* let smileRightPourcent = (smileRightFactor * 100).toFixed(0)
        console.log('Smile Right :', smileRightPourcent,'%') */
      }
    } else {
      this.smileRightInitial = this.calcSmileRight(face)
    }
  }
  getEyeBlink (face) {
    let eyeRight = this.getEyeRightClose(face)
    let eyeLeft = this.getEyeLeftClose(face)

    if (eyeRight < 50 && eyeLeft < 50) {
      if ((eyeRight - eyeLeft) > 10) { // detect that eye left is closed compare to the right
        console.log('LEFT EYE IS CLOSED')
      } else if ((eyeLeft - eyeRight) > 10) { // detect that eye right is closed compose to the left
        console.log('RIGHT EYE IS CLOSED')
      } else { // detect eyes are closed
        console.log('EYES ARE CLOSED')
      }
    }
  }
  getEyeRightClose (face) {
    if (this.eyeRightInitial !== 0) {
      let eyeRightOpen = this.calcEyeRight(face)
      if (eyeRightOpen < this.eyeRightInitial) {
        let eyeRightOpenFactor = (eyeRightOpen - (this.eyeRightInitial / 4)) / (this.eyeRightInitial - (this.eyeRightInitial / 4))

        if (eyeRightOpenFactor > 1.0) { eyeRightOpenFactor = 1.0 }
        if (eyeRightOpenFactor < 0.0) { eyeRightOpenFactor = 0.0 }

        let eyeRightOpenPercent = (eyeRightOpenFactor * 100).toFixed(0)
        return eyeRightOpenPercent
        /* if (eyeRightOpenPercent < 50) {
          console.log('EYE RIGHT CLOSE'
        } */
      }
    } else {
      this.eyeRightInitial = this.calcEyeRight(face)
    }
  }
  getEyeLeftClose (face) {
    if (this.eyeLeftInitial !== 0) {
      let eyeLeftOpen = this.calcEyeLeft(face)
      if (eyeLeftOpen < this.eyeLeftInitial) {
        let eyeLeftOpenFactor = (eyeLeftOpen - (this.eyeLeftInitial / 4)) / (this.eyeLeftInitial - (this.eyeLeftInitial / 4))

        if (eyeLeftOpenFactor > 1.0) { eyeLeftOpenFactor = 1.0 }
        if (eyeLeftOpenFactor < 0.0) { eyeLeftOpenFactor = 0.0 }

        let eyeLeftOpenPercent = (eyeLeftOpenFactor * 100).toFixed(0)
        return eyeLeftOpenPercent
        /* if (eyeLeftOpenPercent < 50) {
          console.log('EYE LEFT CLOSE')
        } */
      }
    } else {
      this.eyeLeftInitial = this.calcEyeLeft(face)
    }
  }
  getEyeBrowRightDown (face) {

  }
  getEyeBrowLeftDown (face) {

  }
  getEyeBrowRightUp (face) {

  }
  getEyeBrowLeftUp (face) {

  }
  getRotationUp (face) {
    let rotationUp = this.toDegree(face.rotationX)
    const X_CENTER_GAP = 5
    const MAX_X_ROTATION = -20

    if (rotationUp < (this.rotationX - X_CENTER_GAP)) {
      let rotationUpFactor = (rotationUp - (this.rotationX - X_CENTER_GAP)) / (MAX_X_ROTATION - (this.rotationX - X_CENTER_GAP))

      if (rotationUpFactor < 0.0) { rotationUpFactor = 0.0 }
      if (rotationUpFactor > 1.0) { rotationUpFactor = 1.0 }

      /* let rotationUpPercent = (rotationUpFactor * 100).toFixed(0)
      console.log('Rotation Up :', rotationUpPercent, '%') */
    }
  }
  getRotationDown (face) {
    let rotationDown = this.toDegree(face.rotationX)
    const X_CENTER_GAP = 5
    const MAX_X_ROTATION = 20

    if (rotationDown > (this.rotationX + X_CENTER_GAP)) {
      let rotationDownFactor = (rotationDown - (this.rotationX + X_CENTER_GAP)) / (MAX_X_ROTATION - (this.rotationX + X_CENTER_GAP))

      if (rotationDownFactor < 0.0) { rotationDownFactor = 0.0 }
      if (rotationDownFactor > 1.0) { rotationDownFactor = 1.0 }

      /* let rotationDownPercent = (rotationDownFactor * 100).toFixed(0)
      console.log('Rotation Down :', rotationDownPercent, '%') */
    }
  }
  getRotationLeft (face) {
    let rotationLeft = this.toDegree(face.rotationY)
    const Y_CENTER_GAP = 5
    const MAX_Y_ROTATION = 30

    if (rotationLeft > (this.rotationY + Y_CENTER_GAP)) { // HEAD TURN TO THE LEFT
      let rotationLeftFactor = (rotationLeft - (this.rotationY + Y_CENTER_GAP)) / (MAX_Y_ROTATION - (this.rotationY + Y_CENTER_GAP))

      if (rotationLeftFactor < 0.0) { rotationLeftFactor = 0.0 }
      if (rotationLeftFactor > 1.0) { rotationLeftFactor = 1.0 }

      /* let rotationLeftPercent = (rotationLeftFactor * 100).toFixed(0)
      console.log('Rotation Left :', rotationLeftPercent,'%') */
    }
  }
  getRotationRight (face) {
    let rotationRight = this.toDegree(face.rotationY)
    const Y_CENTER_GAP = 5
    const MAX_Y_ROTATION = -30

    if (rotationRight < (this.rotationY - Y_CENTER_GAP)) { // HEAD TURN TO THE LEFT
      let rotationRightFactor = (rotationRight - (this.rotationY - Y_CENTER_GAP)) / (MAX_Y_ROTATION - (this.rotationY - Y_CENTER_GAP))

      if (rotationRightFactor < 0.0) { rotationRightFactor = 0.0 }
      if (rotationRightFactor > 1.0) { rotationRightFactor = 1.0 }

      /* let rotationRightPercent = (rotationRightFactor * 100).toFixed(0)
      console.log('Rotation Right :', rotationRightPercent,'%') */
    }
  }
  /* ALL CALCULATE FUNCTIONS */
  calcMouthOpen (face) {
    // Open Mouth Detection
    this.setPoint(face.vertices, 62, this.p0) // mouth upper inner lip
    this.setPoint(face.vertices, 66, this.p1) // mouth lower inner lip

    let mouthOpen = this.calcDistance(this.p0, this.p1)
    return mouthOpen
  }
  calcSmile (face) {
    // Smile Detection
    this.setPoint(face.vertices, 48, this.p0) // mouth corner left
    this.setPoint(face.vertices, 54, this.p1) // mouth corner right

    let mouthWidth = this.calcDistance(this.p0, this.p1)

    this.setPoint(face.vertices, 39, this.p1) // left eye inner corner
    this.setPoint(face.vertices, 42, this.p0) // right eye outer corner

    let eyeDist = this.calcDistance(this.p0, this.p1)
    let smileFactor = mouthWidth / eyeDist

    smileFactor -= 1.40 // 1.40 - neutral, 1.70 smiling

    if (smileFactor > 0.25) smileFactor = 0.25
    if (smileFactor < 0.00) smileFactor = 0.00

    smileFactor *= 4.0

    if (smileFactor < 0.0) { smileFactor = 0.0 }
    if (smileFactor > 1.0) { smileFactor = 1.0 }

    return smileFactor
  }
  calcSmileLeft (face) {
    // Smile Left Detection
    this.setPoint(face.vertices, 36, this.p0)
    this.setPoint(face.vertices, 48, this.p1)

    let smileLeft = this.calcDistance(this.p0, this.p1)
    return smileLeft
  }
  calcSmileRight (face) {
    // Smile Right Detection
    this.setPoint(face.vertices, 45, this.p0)
    this.setPoint(face.vertices, 54, this.p1)

    let smileRight = this.calcDistance(this.p0, this.p1)
    return smileRight
  }
  calcEyeLeft (face) {
    this.setPoint(face.vertices, 37, this.p0) // mouth upper inner lip
    this.setPoint(face.vertices, 41, this.p1) // mouth lower inner lip

    let eyeLeftOpen = this.calcDistance(this.p0, this.p1)
    return eyeLeftOpen
  }
  calcEyeRight (face) {
    this.setPoint(face.vertices, 44, this.p0) // mouth upper inner lip
    this.setPoint(face.vertices, 46, this.p1) // mouth lower inner lip

    let eyeRightOpen = this.calcDistance(this.p0, this.p1)
    return eyeRightOpen
  }
  /* ALL UTILS FUNCTIONS */
  setPoint (v, i, p) {
    p.x = v[i * 2]; p.y = v[i * 2 + 1]
  }
  calcDistance (p0, p1) {
    return Math.sqrt(
      (p1.x - p0.x) * (p1.x - p0.x) + (p1.y - p0.y) * (p1.y - p0.y))
  }
  toDegree (x) {
    return x * 180.0 / Math.PI
  }
}

export default Face
