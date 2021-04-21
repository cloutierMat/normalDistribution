const values = {}
// max Count to run
let maxCount = 1000000

//
// function to deal with randomness
const randomNumber = () => Math.random()
//
// returns a function to create a random number on a dynamically assigned range
let modifierGenerator = (range) => {
	return () => randomNumber() * range
}

// holds all modifier functions
let modifierArr = []
// total range of the added modifier ranges
let totalRange = 0
// amount of modifier to create
let amountOfModifer = Math.ceil(randomNumber() * 8 + 2)
// generate all modifier functions
for (let i = 0; i < amountOfModifer; i++) {
	let num = Math.ceil(randomNumber() * 15)
	totalRange += num
	modifierArr.push(modifierGenerator(num))
	console.log(`range for generator ${i}: ${num}`)
}
// loading values with all needed keys
for (let i = 0; i < totalRange + 1; i++) {
	values[i] = 0
}

// generate a number based on all modifiers
// log that values in values object
function logModifier() {
	let num = 0
	modifierArr.every(elem => num += elem())
	num = Math.ceil(num)
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
	if (num == 0) return ""
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


