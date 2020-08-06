import * as p5 from 'p5'
import { normalizeRectangleToRatio } from './util'
import { Boid } from './boid'

export const main = engine => {
  const flock = []
  let root = {}

  engine.setup = function () {
    root = normalizeRectangleToRatio(
      { x: window.innerWidth - 20, y: window.innerHeight - 20 },
      { x: 16, y: 9 }
    )

    flock.push.apply(flock, populateFlock(50, engine, root))

    engine.createCanvas(root.x, root.y)
  }

  engine.draw = function () {
    engine.background(128)

    flock.forEach(boid => {
      wrapPositionAtEdge(boid, root)
      boid.update(flock)
    })
    flock.forEach(boid => boid.show())
  }
}

function populateFlock (count, engine, root) {
  const flock = []

  let i = 0
  while (i++ < count) {
    const boid = new Boid(engine)

    boid.acceleration = p5.Vector.random2D()
    boid.acceleration.setMag(engine.random(0.5, 1.5))

    boid.velocity = p5.Vector.random2D()
    boid.velocity.setMag(engine.random(2, 4))

    boid.position.x = engine.random(root.x)
    boid.position.y = engine.random(root.y)

    flock.push(boid)
  }

  return flock
}

function wrapPositionAtEdge (boid, root) {
  if (boid.position.x > root.x) {
    boid.position.x = 0
  }
  if (boid.position.y > root.y) {
    boid.position.y = 0
  }
  if (boid.position.x < 0) {
    boid.position.x = root.x
  }
  if (boid.position.y < 0) {
    boid.position.y = root.y
  }
}
