import { normalizeRectangleToRatio } from './util'

export const main = render => {
  render.setup = function () {
    const { x, y } = normalizeRectangleToRatio(
      { x: window.innerWidth, y: window.innerHeight },
      { x: 16, y: 9 }
    )

    console.log(x, y)
    render.createCanvas(x, y)
  }

  render.draw = function () {
    render.background(128)
  }
}
