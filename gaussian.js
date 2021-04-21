const values = {}
// max Count to run
let maxCount = 1000000
let maxRange = 60

// loading values with all needed keys
for (let i = 0; i < maxRange + 1; i++) { values[i] = 0 }

// gaussian function provided by DaniB
function gaussianRand(n, max, min) {
	var rand = 0; for (var i = 0; i < n; i += 1) {
		rand += Math.random()
	}
	// let translated = Math.floor(max * (rand / n) + min) - Math.round(max / 2)
	// translated += translated < 0
	// 	? max
	// 	: 0
	return Math.ceil(max * (rand / n) + min)
}

// generate a number based on all modifiers
// log that values in values object
// runs recursively {maxCountTimes}
function logModifier() {
	if (count <= 0) return
	let num = gaussianRand(6, maxRange, 0)
	values[num]++
}

let count = 0

// iterate up to maxCount times
while (count < maxCount) {
	logModifier()
	count++
}
console.log("values:", values)

// recursive function to generate many *
function convertToDot(num) {
	if (num <= 0) return ""
	return convertToDot(num - 1) + "*"
}

// Find max amount
let maxVal = 0
for (prop in values) {
	if (values[prop] > maxVal) maxVal = values[prop]
}
// create increment for max amount of * to display
let width = process.stdout.columns - 10
let increment = Math.floor(maxVal / width)

// logging our bell curve
for (prop in values) {
	if (values[prop] < 0) continue
	values[prop] = Math.floor(values[prop] / increment)
	console.log(`${prop}: ${prop < 10 ? " " : ""}${convertToDot(values[prop])}`)
}