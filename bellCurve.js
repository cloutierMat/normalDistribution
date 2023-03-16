const { random, floor, ceil, max } = Math, width = process.stdout.columns - 10, modifierAmount = ceil(random() * 8 + 2), modifierArr = [], dist = [0]

for (let i = 0, modifierRange; i < modifierAmount; i++) {
    modifierRange = ceil(random() * 15)
	modifierArr.push(() => random() * modifierRange)
	dist.push(...Array(modifierRange).fill(0))
}
for (let i = 0; i < 1000000; i++) dist[ceil(modifierArr.reduce((result, func) => result + func(), 0))]++
for (const val in dist) console.log('*'.repeat(floor(dist[val] / floor(max(...dist) / width))))
