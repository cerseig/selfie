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

    this.rotationX = this.toDegree(this.facePoints[0].rotationX) // up / down
    this.rotationY = this.toDegree(this.facePoints[0].rotationY) // left / right
    this.rotationZ = this.toDegree(this.facePoints[0].rotationZ) // tilt to left / right

    this.p0 = new this.brfv4.Point()
    this.p1 = new this.brfv4.Point()

    this.eyeBrowLeft = {
      0: { x: this.points[17].x, y: this.points[17].y },
      1: { x: this.points[18].x, y: this.points[18].y },
      2: { x: this.points[19].x, y: this.points[19].y },
      3: { x: this.points[20].x, y: this.points[20].y },
      4: { x: this.points[21].x, y: this.points[21].y }
    }
    this.eyeBrowRight = {
      0: { x: this.points[22].x, y: this.points[22].y },
      1: { x: this.points[23].x, y: this.points[23].y },
      2: { x: this.points[24].x, y: this.points[24].y },
      3: { x: this.points[25].x, y: this.points[25].y },
      4: { x: this.points[26].x, y: this.points[26].y }
    }
    this.eyeLeft = {
      0: { x: this.points[36].x, y: this.points[36].y },
      1: { x: this.points[37].x, y: this.points[37].y },
      2: { x: this.points[38].x, y: this.points[38].y },
      3: { x: this.points[39].x, y: this.points[39].y },
      4: { x: this.points[40].x, y: this.points[40].y },
      5: { x: this.points[41].x, y: this.points[41].y }
    }
    this.eyeRight = {
      0: { x: this.points[42].x, y: this.points[42].y },
      1: { x: this.points[43].x, y: this.points[43].y },
      2: { x: this.points[44].x, y: this.points[44].y },
      3: { x: this.points[45].x, y: this.points[45].y },
      4: { x: this.points[46].x, y: this.points[46].y },
      5: { x: this.points[47].x, y: this.points[47].y }
    }
    this.mouth = {
      0: { x: this.points[48].x, y: this.points[48].y },
      1: { x: this.points[49].x, y: this.points[49].y },
      2: { x: this.points[50].x, y: this.points[50].y },
      3: { x: this.points[51].x, y: this.points[51].y },
      4: { x: this.points[52].x, y: this.points[52].y },
      5: { x: this.points[53].x, y: this.points[53].y },
      6: { x: this.points[54].x, y: this.points[54].y },
      7: { x: this.points[55].x, y: this.points[55].y },
      8: { x: this.points[56].x, y: this.points[56].y },
      9: { x: this.points[57].x, y: this.points[57].y },
      10: { x: this.points[58].x, y: this.points[58].y },
      11: { x: this.points[59].x, y: this.points[59].y },
      12: { x: this.points[60].x, y: this.points[60].y },
      13: { x: this.points[61].x, y: this.points[61].y },
      14: { x: this.points[62].x, y: this.points[62].y },
      15: { x: this.points[63].x, y: this.points[63].y },
      16: { x: this.points[64].x, y: this.points[64].y },
      17: { x: this.points[65].x, y: this.points[65].y },
      18: { x: this.points[66].x, y: this.points[66].y },
      19: { x: this.points[67].x, y: this.points[67].y }
    }

    this.smileLeftInitial = this.calcDistance(this.eyeLeft[0], this.mouth[0])
    this.smileRightInitial = this.calcDistance(this.eyeRight[0], this.mouth[6])
    this.mouthOpenInitial = this.calcDistance(this.mouth[14], this.mouth[18])
    this.eyeLeftInitial = this.calcDistance(this.eyeLeft[1], this.eyeLeft[5])
    this.eyeRightInitial = this.calcDistance(this.eyeRight[2], this.eyeRight[4])
    this.eyeBrowRightInitial = this.calcDistance(this.eyeBrowRight[2], this.eyeRight[2])
    this.eyeBrowLeftInitial = this.calcDistance(this.eyeBrowLeft[2], this.eyeLeft[2])

    this.initFace(this.brfv4, this.facePoints)
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
    this.getTiltRight(face)
    this.getTiltLeft(face)
  }
  /* ----- ALL GETTERS FUNCTIONS ----- */
  getMouthOpen (face) {
    let mouthOpen = this.calcMouthOpen(face)
    if (mouthOpen > this.mouthOpenInitial) {
      let mouthOpenFactor = (mouthOpen - this.mouthOpenInitial) / ((this.mouthOpenInitial + 20) - this.mouthOpenInitial)

      if (mouthOpenFactor > 1.0) { mouthOpenFactor = 1.0 }
      if (mouthOpenFactor < 0.0) { mouthOpenFactor = 0.0 }

      return mouthOpenFactor
    }
  }
  getDuckFace (face) {

  }
  getSmile (face) {
    let smileFactor = this.calcSmile(face)

    return smileFactor
  }
  getSmileLeft (face) {
    let smileLeft = this.calcSmileLeft(face)
    if (smileLeft < this.smileLeftInitial) {
      let smileLeftFactor = (smileLeft - this.smileLeftInitial) / ((this.smileLeftInitial - 20) - this.smileLeftInitial)

      if (smileLeftFactor < 0.0) { smileLeftFactor = 0.0 }
      if (smileLeftFactor > 1.0) { smileLeftFactor = 1.0 }

      return smileLeftFactor
    }
  }
  getSmileRight (face) {
    if (this.smileRightInitial !== 0) {
      let smileRight = this.calcSmileRight(face)
      if (smileRight < this.smileRightInitial) {
        let smileRightFactor = (smileRight - this.smileRightInitial) / ((this.smileRightInitial - 20) - this.smileRightInitial)

        if (smileRightFactor < 0.0) { smileRightFactor = 0.0 }
        if (smileRightFactor > 1.0) { smileRightFactor = 1.0 }

        return smileRightFactor

        /* let smileRightPourcent = (smileRightFactor * 100).toFixed(0)
        console.log('Smile Right :', smileRightPourcent,'%') */
      }
    } else {
      this.smileRightInitial = this.calcSmileRight(face)
    }
  }
  getEyeRightClose (face) {
    let eyeRightOpen = this.calcEyeRight(face)
    if (eyeRightOpen < this.eyeRightInitial) {
      let eyeRightOpenFactor = (eyeRightOpen - this.eyeRightInitial) / ((this.eyeRightInitial / 4) - this.eyeRightInitial)

      if (eyeRightOpenFactor > 1.0) { eyeRightOpenFactor = 1.0 }
      if (eyeRightOpenFactor < 0.0) { eyeRightOpenFactor = 0.0 }

      console.log(eyeRightOpenFactor)
      return eyeRightOpenFactor
    }
  }
  getEyeLeftClose (face) {
    if (this.eyeLeftInitial !== 0) {
      let eyeLeftOpen = this.calcEyeLeft(face)
      if (eyeLeftOpen < this.eyeLeftInitial) {
        let eyeLeftOpenFactor = (eyeLeftOpen - this.eyeLeftInitial) / ((this.eyeLeftInitial / 4) - this.eyeLeftInitial)

        if (eyeLeftOpenFactor > 1.0) { eyeLeftOpenFactor = 1.0 }
        if (eyeLeftOpenFactor < 0.0) { eyeLeftOpenFactor = 0.0 }

        console.log(eyeLeftOpenFactor)
        return eyeLeftOpenFactor
      }
    } else {
      this.eyeLeftInitial = this.calcEyeLeft(face)
    }
  }
  getEyeBrowRightDown (face) {
    let eyeBrowRight = this.calcEyeBrowRight(face)
    if (eyeBrowRight < this.eyeBrowRightInitial) {
      let eyeBrowRightFactor = (eyeBrowRight - (this.eyeBrowRightInitial - 0.5)) / ((this.eyeBrowRightInitial - 3) - (this.eyeBrowRightInitial - 0.5))

      if (eyeBrowRightFactor > 1.0) { eyeBrowRightFactor = 1.0 }
      if (eyeBrowRightFactor < 0.0) { eyeBrowRightFactor = 0.0 }

      return eyeBrowRightFactor
    }
  }
  getEyeBrowLeftDown (face) {
    let eyeBrowLeft = this.calcEyeBrowLeft(face)
    if (eyeBrowLeft < this.eyeBrowLeftInitial) {
      let eyeBrowLeftFactor = (eyeBrowLeft - (this.eyeBrowLeftInitial - 0.5)) / ((this.eyeBrowLeftInitial - 3) - (this.eyeBrowLeftInitial - 0.5))

      if (eyeBrowLeftFactor > 1.0) { eyeBrowLeftFactor = 1.0 }
      if (eyeBrowLeftFactor < 0.0) { eyeBrowLeftFactor = 0.0 }

      return eyeBrowLeftFactor
    }
  }
  getEyeBrowRightUp (face) {
    let eyeBrowRight = this.calcEyeBrowRight(face)
    if (eyeBrowRight > this.eyeBrowRightInitial) {
      let eyeBrowRightFactor = (eyeBrowRight - (this.eyeBrowRightInitial + 0.5)) / ((this.eyeBrowRightInitial + 3) - (this.eyeBrowRightInitial + 0.5))

      if (eyeBrowRightFactor > 1.0) { eyeBrowRightFactor = 1.0 }
      if (eyeBrowRightFactor < 0.0) { eyeBrowRightFactor = 0.0 }

      return eyeBrowRightFactor
    }
  }
  getEyeBrowLeftUp (face) {
    let eyeBrowLeft = this.calcEyeBrowLeft(face)
    if (eyeBrowLeft > this.eyeBrowLeftInitial) {
      let eyeBrowLeftFactor = (eyeBrowLeft - (this.eyeBrowLeftInitial + 0.5)) / ((this.eyeBrowLeftInitial + 3) - (this.eyeBrowLeftInitial + 0.5))

      if (eyeBrowLeftFactor > 1.0) { eyeBrowLeftFactor = 1.0 }
      if (eyeBrowLeftFactor < 0.0) { eyeBrowLeftFactor = 0.0 }

      return eyeBrowLeftFactor
    }
  }
  getRotationUp (face) {
    let rotationUp = this.toDegree(face.rotationX)
    const X_CENTER_GAP = 5
    const MAX_X_ROTATION = -20

    if (rotationUp < (this.rotationX - X_CENTER_GAP)) {
      let rotationUpFactor = (rotationUp - (this.rotationX - X_CENTER_GAP)) / (MAX_X_ROTATION - (this.rotationX - X_CENTER_GAP))

      if (rotationUpFactor < 0.0) { rotationUpFactor = 0.0 }
      if (rotationUpFactor > 1.0) { rotationUpFactor = 1.0 }

      return rotationUpFactor
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

      return rotationDownFactor
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

      return rotationLeftFactor
    }
  }
  getRotationRight (face) {
    let rotationRight = this.toDegree(face.rotationY)
    const Y_CENTER_GAP = 5
    const MAX_Y_ROTATION = -30

    if (rotationRight < (this.rotationY - Y_CENTER_GAP)) { // HEAD TURN TO THE RIGHT
      let rotationRightFactor = (rotationRight - (this.rotationY - Y_CENTER_GAP)) / (MAX_Y_ROTATION - (this.rotationY - Y_CENTER_GAP))

      if (rotationRightFactor < 0.0) { rotationRightFactor = 0.0 }
      if (rotationRightFactor > 1.0) { rotationRightFactor = 1.0 }

      return rotationRightFactor
    }
  }
  getTiltRight (face) {
    let tiltRight = this.toDegree(face.rotationZ)
    const Z_CENTER_GAP = 5
    const MAX_Z_ROTATION = 30

    if (tiltRight > (this.rotationZ + Z_CENTER_GAP)) { // HEAD TILT TO THE RIGHT
      let titltRightFactor = (tiltRight - (this.rotationZ + Z_CENTER_GAP)) / (MAX_Z_ROTATION - (this.rotationZ + Z_CENTER_GAP))

      if (titltRightFactor < 0.0) { titltRightFactor = 0.0 }
      if (titltRightFactor > 1.0) { titltRightFactor = 1.0 }

      return titltRightFactor
    }
  }
  getTiltLeft (face) {
    let tiltLeft = this.toDegree(face.rotationZ)
    const Z_CENTER_GAP = 5
    const MAX_Z_ROTATION = -30

    if (tiltLeft < (this.rotationZ - Z_CENTER_GAP)) { // HEAD TILT TO THE LEFT
      let titltLeftFactor = (tiltLeft - (this.rotationZ - Z_CENTER_GAP)) / (MAX_Z_ROTATION - (this.rotationZ - Z_CENTER_GAP))

      if (titltLeftFactor < 0.0) { titltLeftFactor = 0.0 }
      if (titltLeftFactor > 1.0) { titltLeftFactor = 1.0 }

      return titltLeftFactor
    }
  }
  /* ----- ALL CALCULATE FUNCTIONS ----- */
  calcMouthOpen (face) {
    this.setPoint(face.vertices, 62, this.p0) // mouth upper inner lip
    this.setPoint(face.vertices, 66, this.p1) // mouth lower inner lip

    let mouthOpen = this.calcDistance(this.p0, this.p1) // distance between mouth upper inner lip and mouth lower inner lip
    return mouthOpen
  }
  calcDuckFace (face) {

  }
  calcSmile (face) {
    this.setPoint(face.vertices, 48, this.p0) // mouth corner left
    this.setPoint(face.vertices, 54, this.p1) // mouth corner right

    let mouthWidth = this.calcDistance(this.p0, this.p1) // distance between mouth's corners

    this.setPoint(face.vertices, 39, this.p1) // left eye inner corner
    this.setPoint(face.vertices, 42, this.p0) // right eye outer corner

    let eyeDist = this.calcDistance(this.p0, this.p1) // distance between the 2 eyes
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
    this.setPoint(face.vertices, 36, this.p0)
    this.setPoint(face.vertices, 48, this.p1)

    let smileLeft = this.calcDistance(this.p0, this.p1)
    return smileLeft
  }
  calcSmileRight (face) {
    this.setPoint(face.vertices, 45, this.p0)
    this.setPoint(face.vertices, 54, this.p1)

    let smileRight = this.calcDistance(this.p0, this.p1)
    return smileRight
  }
  calcEyeLeft (face) {
    this.setPoint(face.vertices, 37, this.p0)
    this.setPoint(face.vertices, 41, this.p1)

    let eyeLeftOpen = this.calcDistance(this.p0, this.p1)
    return eyeLeftOpen
  }
  calcEyeRight (face) {
    this.setPoint(face.vertices, 44, this.p0)
    this.setPoint(face.vertices, 46, this.p1)

    let eyeRightOpen = this.calcDistance(this.p0, this.p1)
    return eyeRightOpen
  }
  calcEyeBrowLeft (face) {
    this.setPoint(face.vertices, 37, this.p0)
    this.setPoint(face.vertices, 19, this.p1)

    let eyeBrowLeft = this.calcDistance(this.p0, this.p1)

    return eyeBrowLeft
  }
  calcEyeBrowRight (face) {
    this.setPoint(face.vertices, 44, this.p0)
    this.setPoint(face.vertices, 24, this.p1)

    let eyeBrowRight = this.calcDistance(this.p0, this.p1)

    return eyeBrowRight
  }
  /* ----- ALL UTILS FUNCTIONS ----- */
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
