export class Particle {
  constructor (engine) {
    this.engine = engine

    this.position = engine.createVector()
    this.velocity = engine.createVector()
    this.acceleration = engine.createVector()
  }

  show () {
    this.engine.strokeWeight(16)
    this.engine.stroke(255)
    this.engine.point(this.position.x, this.position.y)
  }
}
