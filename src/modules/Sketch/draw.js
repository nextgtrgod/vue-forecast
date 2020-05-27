
let getDistance = (x1, y1, x2, y2) => Math.hypot( abs(x2 - x1), abs(y2 - y1) )

const random = Math.random
const abs = Math.abs
const PI = Math.PI

let draw = (ctx, data = [], { W, H, threshold }) => {

	ctx.clearRect(0, 0, W, H)

	// console.log(dots)

	data.forEach((d, i, arr) => {

		d.x += d.m.x * d.s
		d.y += d.m.y * d.s

		if (d.x - d.r < 0 || d.x + d.r > W) d.m.x = -d.m.x
		if (d.y - d.r < 0 || d.y + d.r > H) d.m.y = -d.m.y

		// draw lines between
		for (let j = i; j < arr.length; j++) {

			let distance = getDistance(d.x, d.y, arr[j].x, arr[j].y)

			if (distance < threshold) {
				ctx.beginPath()
				ctx.moveTo(d.x, d.y)
				ctx.lineTo(arr[j].x, arr[j].y)
				// ctx.strokeStyle = `rgba(255, 255, 255, ${(d.z + arr[j].z) / 2})`

				ctx.strokeStyle = `rgba(0, 0, 0, ${(threshold - distance) / 10})`

				ctx.lineWidth = 2 * d.z + arr[j].z
				ctx.stroke()
			}

		}

		// draw circle
		let color = 0

		ctx.beginPath()
		// ctx.fillStyle = `rgba(255, 255, 255, ${d.z})`
		ctx.fillStyle = `rgba(${color}, ${color}, ${color}, 1)`
		// ctx.fillStyle = '#1D1D1D'
		ctx.arc(d.x, d.y, d.r, 0, 2 * PI)
		ctx.fill()
	})
}

export default draw
