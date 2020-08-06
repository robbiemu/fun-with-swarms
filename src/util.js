export function normalizeRectangleToRatio (sample, ratio) {
  let x = sample.x
  let y = x > sample.y ? Math.min(sample.y, (x * ratio.x) / ratio.y) : sample.y
  if (y !== sample.y) {
    let interim = Math.min(sample.x, (y * ratio.x) / ratio.y)

    x = y
    y = interim
  }

  return { x, y }
}
