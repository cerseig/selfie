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
    this.face = {
      0: { x: this.points[0].x, y: this.points[0].y },
      1: { x: this.points[1].x, y: this.points[1].y },
      2: { x: this.points[2].x, y: this.points[2].y },
      3: { x: this.points[3].x, y: this.points[3].y },
      4: { x: this.points[4].x, y: this.points[4].y },
      5: { x: this.points[5].x, y: this.points[5].y },
      6: { x: this.points[6].x, y: this.points[6].y },
      7: { x: this.points[7].x, y: this.points[7].y },
      8: { x: this.points[8].x, y: this.points[8].y },
      9: { x: this.points[9].x, y: this.points[9].y },
      10: { x: this.points[10].x, y: this.points[10].y },
      11: { x: this.points[11].x, y: this.points[11].y },
      12: { x: this.points[12].x, y: this.points[12].y },
      13: { x: this.points[13].x, y: this.points[13].y },
      14: { x: this.points[14].x, y: this.points[14].y },
      15: { x: this.points[15].x, y: this.points[15].y },
      16: { x: this.points[16].x, y: this.points[16].y }
    }

    this.mouthOpenFactor = 0
    this.mouthOpenSmileFactor = 0
    this.mouthOpenSmileLeftFactor = 0
    this.mouthOpenSmileRightFactor = 0
    this.smileFactor = 0
    this.smileLeftFactor = 0
    this.smileRightFactor = 0
    this.eyeRightCloseFactor = 0
    this.eyeLeftCloseFactor = 0
    this.eyeBrowRightUpFactor = 0
    this.eyeBrowLeftUpFactor = 0
    this.eyeBrowRightDownFactor = 0
    this.eyeBrowLeftDownFactor = 0
    this.rotationUpFactor = 0
    this.rotationDownFactor = 0
    this.rotationRightFactor = 0
    this.rotationLeftFactor = 0
    this.tiltRightFactor = 0
    this.tiltLeftFactor = 0
    this.rotation = {
      y: 0,
      x: 0
    }

    this.smileLeftInitial = this.calcDistance(this.eyeLeft[0], this.mouth[0])
    this.smileRightInitial = this.calcDistance(this.eyeRight[3], this.mouth[6])
    this.mouthOpenInitial = this.calcDistance(this.mouth[14], this.mouth[18])
    this.mouthOpenLeftInitial = this.calcDistance(this.mouth[13], this.mouth[19])
    this.mouthOpenRightInitial = this.calcDistance(this.mouth[15], this.mouth[17])
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
    this.getSmile(face)
    this.getSmileLeft(face)
    this.getSmileRight(face)
    this.getMouthOpenSmile(face)
    this.getSmileLeftOpen(face)
    this.getSmileRightOpen(face)

    return {
      events: {
        mouthOpen: this.mouthOpenFactor,
        smile: this.smileFactor,
        smileLeft: this.smileLeftFactor,
        smileRight: this.smileRightFactor,
        mouthOpenSmile: this.mouthOpenSmileFactor,
        mouthOpenSmileLeft: this.mouthOpenSmileLeftFactor,
        mouthOpenSmileRight: this.mouthOpenSmileRightFactor,
        rotationLeft: this.getRotationLeft(face),
        rotationRight: this.getRotationRight(face),
        rotationUp: this.getRotationUp(face),
        rotationDown: this.getRotationDown(face),
        rotationCentered: this.getRotationCentered(face),
        eyeBrowLeftDown: this.getEyeBrowLeftDown(face),
        eyeBrowRightDown: this.getEyeBrowRightDown(face),
        eyeBrowLeftUp: this.getEyeBrowLeftUp(face),
        eyeBrowRightUp: this.getEyeBrowRightUp(face),
        tiltRight: this.getTiltRight(face),
        tiltLeft: this.getTiltLeft(face)
      },
      rotation: {
        x: this.getRotationX(face),
        y: this.getRotationY(face),
        z: this.getRotationZ(face)
      }
    }
  }
  /* ----- ALL GETTERS FUNCTIONS ----- */
  getMouthOpen (face) {
    let mouthOpen = this.calcMouthOpen(face)
    let mouthOpenFactor = (mouthOpen - this.mouthOpenInitial) / ((this.mouthOpenInitial + 20) - this.mouthOpenInitial)

    if (mouthOpenFactor > 1.0) { mouthOpenFactor = 1.0 }
    if (mouthOpenFactor < 0.0) { mouthOpenFactor = 0.0 }

    if (this.smileFactor > 0.5) {
      this.mouthOpenFactor = 0
    } else {
      mouthOpenFactor = Number(mouthOpenFactor.toFixed(1))
      this.mouthOpenFactor = mouthOpenFactor
    }
  }
  getMouthOpenSmile (face) {
    let mouthOpen = this.calcMouthOpen(face)
    let mouthOpenFactor = (mouthOpen - this.mouthOpenInitial) / ((this.mouthOpenInitial + 10) - this.mouthOpenInitial)

    if (mouthOpenFactor > 1.0) { mouthOpenFactor = 1.0 }
    if (mouthOpenFactor < 0.0) { mouthOpenFactor = 0.0 }

    if (mouthOpenFactor > 0.4 && this.smileFactor > 0.5) {
      this.mouthOpenSmileFactor = mouthOpenFactor
    } else {
      this.mouthOpenSmileFactor = 0
    }
  }
  getSmileLeftOpen (face) {
    let mouthOpenLeft = this.calcMouthLeftOpen(face)
    let mouthOpenLeftFactor = (mouthOpenLeft - this.mouthOpenLeftInitial) / ((this.mouthOpenLeftInitial + 10) - this.mouthOpenLeftInitial)

    if (mouthOpenLeftFactor > 1.0) { mouthOpenLeftFactor = 1.0 }
    if (mouthOpenLeftFactor < 0.0) { mouthOpenLeftFactor = 0.0 }

    if (mouthOpenLeftFactor > 0.3 && this.smileLeftFactor > 0.7) {
      this.mouthOpenSmileLeftFactor = mouthOpenLeftFactor
    } else {
      this.mouthOpenSmileLeftFactor = 0
    }
  }
  getSmileRightOpen (face) {
    let mouthOpenRight = this.calcMouthRightOpen(face)
    let mouthOpenRightFactor = (mouthOpenRight - this.mouthOpenRightInitial) / ((this.mouthOpenRightInitial + 10) - this.mouthOpenRightInitial)

    if (mouthOpenRightFactor > 1.0) { mouthOpenRightFactor = 1.0 }
    if (mouthOpenRightFactor < 0.0) { mouthOpenRightFactor = 0.0 }

    if (mouthOpenRightFactor > 0.3 && this.smileRightFactor > 0.7) {
      this.mouthOpenSmileRightFactor = mouthOpenRightFactor
    } else {
      this.mouthOpenSmileRightFactor = 0
    }
  }
  getSmile (face) {
    let smileFactor = this.calcSmile(face)

    this.smileFactor = smileFactor
    return smileFactor
  }
  getSmileLeft (face) {
    let smileLeft = this.calcSmileLeft(face)
    let smileLeftFactor = (smileLeft - this.smileLeftInitial) / ((this.smileLeftInitial - 10) - this.smileLeftInitial)

    if (smileLeftFactor < 0.0) { smileLeftFactor = 0.0 }
    if (smileLeftFactor > 1.0) { smileLeftFactor = 1.0 }

    this.smileLeftFactor = smileLeftFactor
  }
  getSmileRight (face) {
    let smileRight = this.calcSmileRight(face)
    let smileRightFactor = (smileRight - this.smileRightInitial) / ((this.smileRightInitial - 10) - this.smileRightInitial)

    if (smileRightFactor < 0.0) { smileRightFactor = 0.0 }
    if (smileRightFactor > 1.0) { smileRightFactor = 1.0 }

    this.smileRightFactor = smileRightFactor
  }
  getEyeRightClose (face) {
    let eyeRightClose = this.calcEyeRight(face)
    if (eyeRightClose < this.eyeRightInitial) {
      let eyeRightCloseFactor = (eyeRightClose - (this.eyeRightInitial / 4)) / (this.eyeRightInitial - (this.eyeRightInitial / 4))

      if (eyeRightCloseFactor > 1.0 || eyeRightCloseFactor > 0.7) { eyeRightCloseFactor = 1.0 }
      if (eyeRightCloseFactor < 0.0 || eyeRightCloseFactor < 0.6) { eyeRightCloseFactor = 0.0 }

      this.eyeRightCloseFactor = eyeRightCloseFactor

      return eyeRightCloseFactor
    }
  }
  getEyeLeftClose (face) {
    let eyeLeftClose = this.calcEyeLeft(face)
    let eyeLeftCloseFactor = (eyeLeftClose - (this.eyeLeftInitial / 4)) / (this.eyeLeftInitial - (this.eyeLeftInitial / 4))

    if (eyeLeftCloseFactor > 1.0 || eyeLeftCloseFactor > 0.7) { eyeLeftCloseFactor = 1.0 }
    if (eyeLeftCloseFactor < 0.0 || eyeLeftCloseFactor < 0.6) { eyeLeftCloseFactor = 0.0 }

    return eyeLeftCloseFactor
  }
  getEyeBrowRightDown (face) {
    let eyeBrowRight = this.calcEyeBrowRight(face)
    if (eyeBrowRight < this.eyeBrowRightInitial) {
      let eyeBrowRightDownFactor = (eyeBrowRight - (this.eyeBrowRightInitial - 0.5)) / ((this.eyeBrowRightInitial - 3) - (this.eyeBrowRightInitial - 0.5))

      if (eyeBrowRightDownFactor > 1.0) { eyeBrowRightDownFactor = 1.0 }
      if (eyeBrowRightDownFactor < 0.0) { eyeBrowRightDownFactor = 0.0 }

      this.eyeBrowRightDownFactor = eyeBrowRightDownFactor
      return eyeBrowRightDownFactor
    }
  }
  getEyeBrowLeftDown (face) {
    let eyeBrowLeft = this.calcEyeBrowLeft(face)
    if (eyeBrowLeft < this.eyeBrowLeftInitial) {
      let eyeBrowLeftDownFactor = (eyeBrowLeft - (this.eyeBrowLeftInitial - 0.5)) / ((this.eyeBrowLeftInitial - 3) - (this.eyeBrowLeftInitial - 0.5))

      if (eyeBrowLeftDownFactor > 1.0) { eyeBrowLeftDownFactor = 1.0 }
      if (eyeBrowLeftDownFactor < 0.0) { eyeBrowLeftDownFactor = 0.0 }

      this.eyeBrowLeftDownFactor = eyeBrowLeftDownFactor
      return eyeBrowLeftDownFactor
    }
  }
  getEyeBrowRightUp (face) {
    let eyeBrowRight = this.calcEyeBrowRight(face)
    let eyeBrowRightUpFactor = (eyeBrowRight - this.eyeBrowRightInitial) / ((this.eyeBrowRightInitial + 5) - this.eyeBrowRightInitial)

    if (eyeBrowRightUpFactor > 1.0) { eyeBrowRightUpFactor = 1.0 }
    if (eyeBrowRightUpFactor < 0.0) { eyeBrowRightUpFactor = 0.0 }

    this.eyeBrowRightUpFactor = eyeBrowRightUpFactor
    return eyeBrowRightUpFactor
  }
  getEyeBrowLeftUp (face) {
    let eyeBrowLeft = this.calcEyeBrowLeft(face)
    let eyeBrowLeftUpFactor = (eyeBrowLeft - this.eyeBrowLeftInitial) / ((this.eyeBrowLeftInitial + 5) - this.eyeBrowLeftInitial)

    if (eyeBrowLeftUpFactor > 1.0) { eyeBrowLeftUpFactor = 1.0 }
    if (eyeBrowLeftUpFactor < 0.0) { eyeBrowLeftUpFactor = 0.0 }

    this.eyeBrowLeftUpFactor = eyeBrowLeftUpFactor
    return eyeBrowLeftUpFactor
  }
  getRotationUp (face) {
    let rotationUp = this.toDegree(face.rotationX)
    const MAX_X_ROTATION = -20

    if (rotationUp < this.rotationX) {
      let rotationUpFactor = (rotationUp - this.rotationX) / (MAX_X_ROTATION - this.rotationX)

      if (rotationUpFactor < 0.0) { rotationUpFactor = 0.0 }
      if (rotationUpFactor > 1.0) { rotationUpFactor = 1.0 }

      this.rotationUpFactor = rotationUpFactor
      return rotationUpFactor
    }
  }
  getRotationDown (face) {
    let rotationDown = this.toDegree(face.rotationX)
    const MAX_X_ROTATION = 20

    if (rotationDown > (this.rotationX)) {
      let rotationDownFactor = (rotationDown - (this.rotationX)) / (MAX_X_ROTATION - (this.rotationX))

      if (rotationDownFactor < 0.0) { rotationDownFactor = 0.0 }
      if (rotationDownFactor > 1.0) { rotationDownFactor = 1.0 }

      this.rotationDownFactor = rotationDownFactor
      return rotationDownFactor
    }
  }

  getRotationX (face) {
    const rotationX = face.rotationX.toFixed(3) * 1
    this.rotation.x = rotationX
    return rotationX
  }

  getRotationY (face) {
    const rotationY = face.rotationY.toFixed(3) * (-1)
    this.rotation.y = rotationY
    return rotationY
  }

  getRotationZ (face) {
    return face.rotationZ.toFixed(3) * (-1)
  }

  getRotationLeft (face) {
    let rotationLeft = this.toDegree(face.rotationY)
    const Y_CENTER_GAP = 10
    const MAX_Y_ROTATION = 40

    if (rotationLeft > (this.rotationY - Y_CENTER_GAP)) { // HEAD TURN TO THE LEFT
      let rotationLeftFactor = (rotationLeft - (this.rotationY - Y_CENTER_GAP)) / (MAX_Y_ROTATION - (this.rotationY - Y_CENTER_GAP))
      if (rotationLeftFactor < 0.0) { rotationLeftFactor = 0.0 }
      if (rotationLeftFactor > 1.0) { rotationLeftFactor = 1.0 }

      this.rotationLeftFactor = rotationLeftFactor
      return rotationLeftFactor
    }
  }
  getRotationRight (face) {
    let rotationRight = this.toDegree(face.rotationY)
    const Y_CENTER_GAP = 10
    const MAX_Y_ROTATION = -40

    if (rotationRight < (this.rotationY - Y_CENTER_GAP)) { // HEAD TURN TO THE RIGHT
      let rotationRightFactor = (rotationRight - (this.rotationY - Y_CENTER_GAP)) / (MAX_Y_ROTATION - (this.rotationY - Y_CENTER_GAP))

      if (rotationRightFactor < 0.0) { rotationRightFactor = 0.0 }
      if (rotationRightFactor > 1.0) { rotationRightFactor = 1.0 }

      this.rotationRightFactor = rotationRightFactor
      return rotationRightFactor
    }
  }
  getRotationCentered (face) {
    let rotationCentered = this.toDegree(face.rotationY)
    const MAX_Y_ROTATION = 30

    let rotationCenteredFactor = (rotationCentered - (this.rotationY - MAX_Y_ROTATION)) / (MAX_Y_ROTATION - (this.rotationY - MAX_Y_ROTATION))

    if (rotationCenteredFactor < 0.0) { rotationCenteredFactor = 0.0 }
    if (rotationCenteredFactor > 1.0) { rotationCenteredFactor = 1.0 }

    this.rotationCenteredFactor = rotationCenteredFactor
    return rotationCenteredFactor
  }
  getTiltRight (face) {
    let tiltRight = this.toDegree(face.rotationZ)
    const Z_CENTER_GAP = 10
    const MAX_Z_ROTATION = 30

    if (tiltRight > (this.rotationZ - Z_CENTER_GAP)) { // HEAD TILT TO THE RIGHT
      let tiltRightFactor = (tiltRight - (this.rotationZ - Z_CENTER_GAP)) / (MAX_Z_ROTATION - (this.rotationZ - Z_CENTER_GAP))

      if (tiltRightFactor < 0.0) { tiltRightFactor = 0.0 }
      if (tiltRightFactor > 1.0) { tiltRightFactor = 1.0 }

      this.tiltRightFactor = tiltRightFactor
      return tiltRightFactor
    }
  }
  getTiltLeft (face) {
    let tiltLeft = this.toDegree(face.rotationZ)
    // const Z_CENTER_GAP = 5
    const MAX_Z_ROTATION = -30

    if (tiltLeft < (this.rotationZ)) { // HEAD TILT TO THE LEFT
      let tiltLeftFactor = (tiltLeft - (this.rotationZ)) / (MAX_Z_ROTATION - (this.rotationZ))

      if (tiltLeftFactor < 0.0) { tiltLeftFactor = 0.0 }
      if (tiltLeftFactor > 1.0) { tiltLeftFactor = 1.0 }

      this.tiltLeftFactor = tiltLeftFactor
      return tiltLeftFactor
    }
  }
  /* ----- ALL CALCULATE FUNCTIONS ----- */
  calcMouthOpen (face) {
    this.setPoint(face.vertices, 62, this.p0) // mouth upper inner lip
    this.setPoint(face.vertices, 66, this.p1) // mouth lower inner lip

    let mouthOpen = this.calcDistance(this.p0, this.p1) // distance between mouth upper inner lip and mouth lower inner lip
    return mouthOpen
  }
  calcMouthLeftOpen (face) {
    this.setPoint(face.vertices, 61, this.p0) // mouth upper inner lip
    this.setPoint(face.vertices, 67, this.p1) // mouth lower inner lip

    let mouthLeftOpen = this.calcDistance(this.p0, this.p1) // distance between mouth left upper inner lip and mouth left lower inner lip
    return mouthLeftOpen
  }
  calcMouthRightOpen (face) {
    this.setPoint(face.vertices, 63, this.p0) // mouth upper inner lip
    this.setPoint(face.vertices, 65, this.p1) // mouth lower inner lip

    let mouthRightOpen = this.calcDistance(this.p0, this.p1) // distance between mouth right upper inner lip and mouth right lower inner lip
    return mouthRightOpen
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
