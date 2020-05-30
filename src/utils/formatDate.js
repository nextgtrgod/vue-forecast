
let formatDate = t => {
	let date = new Date(t)
	return `${date.getUTCDate()}.${date.getUTCMonth()}.${date.getUTCFullYear()}`
}

export default formatDate
