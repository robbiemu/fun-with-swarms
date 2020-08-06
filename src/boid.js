import * as p5 from 'p5'
import { Particle } from './particle'

export class Boid extends Particle {
  constructor (engine) {
    super(engine)
    this.perception = 160
    this.maxForce = 1
    this.maxSpeed = 4
    this.minSpeed = 1
    this.neighbors = []
  }

  update (flock) {
    this.findNeighbors(flock)
    this.acceleration = this.alignment()
      .add(this.cohesion())
      .add(this.separation())
    this.acceleration.mult(
      1 / (this.neighbors.length || 1),
      1 / (this.neighbors.length || 1)
    )
    this.acceleration.limit(0.025 * this.maxForce)

    this.position.add(this.velocity)
    this.velocity.add(this.acceleration).limit(this.maxSpeed)
    if (this.velocity.mag() < this.minSpeed) {
      this.velocity.setMag(this.minSpeed)
    }
  }

  findNeighbors (flock) {
    this.neighbors = flock.filter(
      boid =>
        boid !== this &&
        this.engine.dist(
          this.position.x,
          this.position.y,
          boid.position.x,
          boid.position.y
        ) < this.perception
    )
  }

  alignment () {
    let avg = this.engine.createVector()

    this.neighbors.forEach(boid => {
      avg.add(boid.velocity)
    })

    if (this.neighbors.length) {
      avg.div(this.neighbors.length)
    }
    return avg
      .setMag(this.maxSpeed)
      .sub(this.velocity)
      .limit(this.maxForce)
  }

  cohesion () {
    let avg = this.engine.createVector()

    this.neighbors.forEach(boid => {
      avg.add(boid.position)
    })

    if (this.neighbors.length) {
      avg.div(this.neighbors.length)
    }
    return avg
      .sub(this.position)
      .setMag(this.maxSpeed)
      .sub(this.velocity)
      .limit(this.maxForce)
  }

  separation () {
    let avg = this.engine.createVector()

    this.neighbors.forEach(boid => {
      const d = this.engine.dist(
        this.position.x,
        this.position.y,
        boid.position.x,
        boid.position.y
      )
      avg.add(p5.Vector.sub(this.position, boid.position).div(d ** 2 - d))
    })

    if (this.neighbors.length) {
      avg.div(this.neighbors.length)
    }
    return avg
      .setMag(this.maxSpeed)
      .sub(this.velocity)
      .limit(this.maxForce)
  }
}
