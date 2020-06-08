
let remap = (n, inMin, inMax, outMin, outMax) => (
	( (n - inMin) * (outMax - outMin) / (inMax - inMin) + outMin )
)

module.exports = remap
